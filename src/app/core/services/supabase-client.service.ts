import { Injectable, NgZone } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';
import { App } from '@capacitor/app';
import { environment } from '../../../environments/environment';
import { PREFERENCES_KEYS } from '../config/preferences.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseClientService {
  private static instance: SupabaseClient | null = null;
  private isInitialized = false;
  private appStateListener: any;
  private connectionStatus$ = new BehaviorSubject<boolean>(true);
  private isReconnecting = false;
  
  constructor(private ngZone: NgZone) {}
  
  /**
   * Obtiene la instancia singleton del cliente Supabase
   * Si no existe, la crea con la configuración optimizada para móviles
   */
  public getClient(): SupabaseClient {
    if (!SupabaseClientService.instance) {
      console.log('🔧 SupabaseClientService: Creando nueva instancia del cliente...');
      
      SupabaseClientService.instance = createClient(
        environment.supabaseUrl,
        environment.supabaseAnonKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true, // ✅ HABILITADO para renovación automática
            detectSessionInUrl: false,
            // Usar Capacitor Preferences en lugar de localStorage para mejor persistencia en móviles
            storage: {
              getItem: async (key: string): Promise<string | null> => {
                try {
                  const { value } = await Preferences.get({ key });
                  return value;
                } catch (error) {
                  console.warn('⚠️ Error leyendo de Capacitor Preferences:', error);
                  return null;
                }
              },
              setItem: async (key: string, value: string): Promise<void> => {
                try {
                  await Preferences.set({ key, value });
                } catch (error) {
                  console.warn('⚠️ Error escribiendo en Capacitor Preferences:', error);
                }
              },
              removeItem: async (key: string): Promise<void> => {
                try {
                  await Preferences.remove({ key });
                } catch (error) {
                  console.warn('⚠️ Error eliminando de Capacitor Preferences:', error);
                }
              }
            }
          },
          // Configuración global para reducir conflictos
          global: {
            headers: {
              'X-Client-Info': 'gestion-avisos-app'
            }
          },
          // Configuración de rendimiento optimizada
          db: {
            schema: 'public'
          },
          // Configuración de realtime optimizada para móviles
          realtime: {
            params: {
              eventsPerSecond: 2 // Reducido para máximo rendimiento en móviles
            }
          }
        }
      );
      
      // Inicializar el servicio una sola vez
      if (!this.isInitialized) {
        this.initializeService();
      }
      
      console.log('🔧 SupabaseClientService: Cliente Supabase singleton creado con Capacitor Preferences');
    }
    
    return SupabaseClientService.instance;
  }

  /**
   * Inicializa el servicio con listeners para cambios de estado de la app
   */
  private async initializeService(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      console.log('🔧 SupabaseClientService: Inicializando servicio...');
      
      // Configurar listener para cambios de estado de la app (background/foreground)
      await this.setupAppStateListener();
      
      // Configurar listener para cambios de autenticación
      this.setupAuthStateListener();
      
      // Configurar listener para cambios de visibilidad del documento
      this.setupVisibilityChangeListener();
      
      // Configurar monitoreo de conexión realtime
      this.setupConnectionMonitoring();
      
      this.isInitialized = true;
      console.log('🔧 SupabaseClientService: Servicio inicializado correctamente');
    } catch (error) {
      console.error('❌ SupabaseClientService: Error en inicialización:', error);
    }
  }

  /**
   * Configura el monitoreo de conexión realtime
   */
  private setupConnectionMonitoring(): void {
    const client = this.getClient();
    
    // Monitorear estado de conexión usando el estado actual y cambios de estado
    const checkConnectionStatus = () => {
      const isConnected = client.realtime.isConnected();
      this.ngZone.run(() => {
        this.connectionStatus$.next(isConnected);
      });
    };

    // Verificar estado inicial
    checkConnectionStatus();

    // Monitorear cambios de estado cada 2 segundos
    setInterval(() => {
      checkConnectionStatus();
    }, 2000);

    // También verificar cuando se realizan operaciones
    const originalFrom = client.from;
    client.from = function(table: string) {
      const result = originalFrom.call(this, table);
      
      // Verificar conexión después de operaciones
      setTimeout(() => {
        checkConnectionStatus();
      }, 100);
      
      return result;
    };
  }

  /**
   * Configura el listener para cambios de estado de la app (background/foreground)
   */
  private async setupAppStateListener(): Promise<void> {
    try {
      this.appStateListener = await App.addListener('appStateChange', ({ isActive }) => {
        this.ngZone.run(() => {
          if (isActive) {
            console.log('📱 App vuelve al foreground, reconectando...');
            this.handleAppResume();
          } else {
            console.log('📱 App va al background');
            this.handleAppBackground();
          }
        });
      });
      
      console.log('🔧 SupabaseClientService: Listener de estado de app configurado');
    } catch (error) {
      console.warn('⚠️ No se pudo configurar listener de estado de app (probablemente en web):', error);
    }
  }

  /**
   * Configura el listener para cambios de autenticación
   */
  private setupAuthStateListener(): void {
    const client = this.getClient();
    
    client.auth.onAuthStateChange(async (event, session) => {
      console.log('🔐 SupabaseClientService: Cambio de estado de autenticación:', event);
      
      if (event === 'SIGNED_IN' && session) {
        console.log('✅ Usuario autenticado, guardando sesión...');
        await this.saveSessionToPreferences(session);
      } else if (event === 'SIGNED_OUT') {
        console.log('❌ Usuario desconectado, limpiando sesión...');
        await this.clearSessionFromPreferences();
      } else if (event === 'TOKEN_REFRESHED' && session) {
        console.log('🔄 Token refrescado, actualizando sesión...');
        await this.saveSessionToPreferences(session);
      }
    });
    
    console.log('🔧 SupabaseClientService: Listener de autenticación configurado');
  }

  /**
   * Configura el listener para cambios de visibilidad del documento
   */
  private setupVisibilityChangeListener(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        console.log('👁️ Documento visible, verificando conexión...');
        this.handleDocumentVisible();
      }
    });
    
    console.log('🔧 SupabaseClientService: Listener de visibilidad configurado');
  }

  /**
   * Maneja cuando la app vuelve del background
   */
  private async handleAppResume(): Promise<void> {
    if (this.isReconnecting) {
      console.log('🔄 Ya hay una reconexión en progreso, saltando...');
      return;
    }

    try {
      this.isReconnecting = true;
      console.log('🔄 SupabaseClientService: Reconectando tras resumen de app...');
      
      // Verificar si hay una sesión válida
      const session = await this.getCurrentSession();
      if (session) {
        console.log('✅ Sesión válida encontrada, reconectando realtime...');
        
        // Reconectar realtime
        await this.reconnectRealtime();
        
        // Verificar si el token necesita refresh
        if (await this.shouldRefreshToken(session)) {
          console.log('🔄 Token próximo a expirar, refrescando...');
          await this.refreshSession();
        }
      } else {
        console.log('ℹ️ No hay sesión activa para reconectar');
      }
    } catch (error) {
      console.error('❌ Error en reconexión tras resumen:', error);
      // Forzar refresh si la reconexión falla
      this.forceReconnection();
    } finally {
      this.isReconnecting = false;
    }
  }

  /**
   * Maneja cuando la app va al background
   */
  private handleAppBackground(): void {
    console.log('📱 App en background, pausando operaciones no críticas...');
    // Aquí podrías implementar lógica para pausar operaciones no críticas
  }

  /**
   * Maneja cuando el documento se vuelve visible
   */
  private async handleDocumentVisible(): Promise<void> {
    if (this.isReconnecting) {
      console.log('🔄 Ya hay una reconexión en progreso, saltando...');
      return;
    }

    try {
      this.isReconnecting = true;
      console.log('👁️ Documento visible, verificando estado de la sesión...');
      
      const session = await this.getCurrentSession();
      if (session) {
        // Verificar si la sesión sigue siendo válida
        if (await this.isSessionValid(session)) {
          console.log('✅ Sesión válida, reconectando realtime...');
          await this.reconnectRealtime();
        } else {
          console.log('⚠️ Sesión expirada, intentando refresh...');
          await this.refreshSession();
        }
      }
    } catch (error) {
      console.error('❌ Error verificando estado de sesión:', error);
      // Forzar refresh si la verificación falla
      this.forceReconnection();
    } finally {
      this.isReconnecting = false;
    }
  }

  /**
   * Fuerza la reconexión completa si fallan los métodos normales
   */
  private forceReconnection(): void {
    console.log('🔄 Forzando reconexión completa...');
    
    // Limpiar instancia y reconectar
    setTimeout(() => {
      try {
        const client = this.getClient();
        client.removeAllChannels();
        
        // Notificar cambio de estado
        this.connectionStatus$.next(false);
        
        // Intentar reconectar después de un breve delay
        setTimeout(() => {
          this.connectionStatus$.next(true);
        }, 1000);
        
      } catch (error) {
        console.error('❌ Error en reconexión forzada:', error);
      }
    }, 500);
  }

  /**
   * Reconecta el realtime de Supabase
   */
  private async reconnectRealtime(): Promise<void> {
    try {
      const client = this.getClient();
      
      // Desconectar realtime actual
      client.removeAllChannels();
      
      // Reconectar (se hará automáticamente en la próxima suscripción)
      console.log('🔄 Realtime desconectado, se reconectará automáticamente');
    } catch (error) {
      console.error('❌ Error reconectando realtime:', error);
    }
  }

  /**
   * Verifica si el token necesita ser refrescado
   */
  private async shouldRefreshToken(session: Session): Promise<boolean> {
    if (!session.expires_at) return false;
    
    const expiresAt = session.expires_at * 1000; // Convertir a milisegundos
    const now = Date.now();
    const timeUntilExpiry = expiresAt - now;
    const fiveMinutes = 5 * 60 * 1000; // 5 minutos
    
    return timeUntilExpiry <= fiveMinutes;
  }

  /**
   * Refresca la sesión actual
   */
  private async refreshSession(): Promise<void> {
    try {
      const client = this.getClient();
      const { data, error } = await client.auth.refreshSession();
      
      if (error) {
        console.error('❌ Error refrescando sesión:', error);
        throw error;
      }
      
      if (data.session) {
        console.log('✅ Sesión refrescada exitosamente');
        await this.saveSessionToPreferences(data.session);
      }
    } catch (error) {
      console.error('❌ Error en refresh de sesión:', error);
      // Si falla el refresh, limpiar la sesión
      await this.clearSessionFromPreferences();
    }
  }

  /**
   * Verifica si la sesión es válida
   */
  private async isSessionValid(session: Session): Promise<boolean> {
    if (!session.expires_at) return false;
    
    const expiresAt = session.expires_at * 1000;
    const now = Date.now();
    
    return expiresAt > now;
  }

  /**
   * Guarda la sesión en Capacitor Preferences
   */
  private async saveSessionToPreferences(session: Session): Promise<void> {
    try {
      const sessionData = {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at,
        user_id: session.user?.id
      };
      
      await Preferences.set({
        key: PREFERENCES_KEYS.SUPABASE_SESSION,
        value: JSON.stringify(sessionData)
      });
      
      console.log('💾 Sesión guardada en Capacitor Preferences');
    } catch (error) {
      console.error('❌ Error guardando sesión en Preferences:', error);
    }
  }

  /**
   * Limpia la sesión de Capacitor Preferences
   */
  public async clearSessionFromPreferences(): Promise<void> {
    try {
      await Preferences.remove({ key: PREFERENCES_KEYS.SUPABASE_SESSION });
      console.log('🗑️ Sesión eliminada de Capacitor Preferences');
    } catch (error) {
      console.error('❌ Error eliminando sesión de Preferences:', error);
    }
  }

  /**
   * Obtiene la sesión actual
   */
  public async getCurrentSession(): Promise<Session | null> {
    try {
      const client = this.getClient();
      const { data: { session }, error } = await client.auth.getSession();
      
      if (error) {
        console.error('❌ Error obteniendo sesión:', error);
        return null;
      }
      
      return session;
    } catch (error) {
      console.error('❌ Error en getCurrentSession:', error);
      return null;
    }
  }

  /**
   * Recupera la sesión almacenada al iniciar la app
   */
  public async restoreSession(): Promise<Session | null> {
    try {
      console.log('🔧 SupabaseClientService: Restaurando sesión almacenada...');
      
      const { value } = await Preferences.get({ key: PREFERENCES_KEYS.SUPABASE_SESSION });
      if (!value) {
        console.log('ℹ️ No hay sesión almacenada para restaurar');
        return null;
      }
      
      const sessionData = JSON.parse(value);
      console.log('📱 Sesión encontrada en Capacitor Preferences');
      
      // Verificar si la sesión sigue siendo válida
      if (sessionData.expires_at && sessionData.expires_at * 1000 > Date.now()) {
        console.log('✅ Sesión válida encontrada');
        return sessionData;
      } else {
        console.log('⚠️ Sesión expirada, eliminando...');
        await this.clearSessionFromPreferences();
        return null;
      }
    } catch (error) {
      console.error('❌ Error restaurando sesión:', error);
      await this.clearSessionFromPreferences();
      return null;
    }
  }

  /**
   * Obtiene el observable del estado de conexión
   */
  public getConnectionStatus() {
    return this.connectionStatus$.asObservable();
  }

  /**
   * Verifica la conexión con timeout para evitar loadings infinitos
   */
  public async testConnection(timeoutMs: number = 5000): Promise<boolean> {
    try {
      const client = this.getClient();
      
      // Usar Promise.race para implementar timeout
      const connectionTest = Promise.race([
        // Test de conexión real
        client.from('avisos').select('count').limit(1),
        // Timeout
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), timeoutMs)
        )
      ]);

      await connectionTest;
      console.log('✅ Conexión Supabase verificada correctamente');
      return true;
      
    } catch (error) {
      console.error('❌ Error verificando conexión Supabase:', error);
      return false;
    }
  }

  /**
   * Limpia la instancia singleton (útil para testing o reinicio)
   */
  public static clearInstance(): void {
    SupabaseClientService.instance = null;
    console.log('🔧 SupabaseClientService: Instancia singleton limpiada');
  }

  /**
   * Limpia todos los listeners al destruir el servicio
   */
  public async cleanup(): Promise<void> {
    try {
      if (this.appStateListener) {
        await this.appStateListener.remove();
        console.log('🔧 SupabaseClientService: Listener de app eliminado');
      }
      
      // Limpiar listener de visibilidad
      document.removeEventListener('visibilitychange', this.handleDocumentVisible.bind(this));
      console.log('🔧 SupabaseClientService: Listener de visibilidad eliminado');
      
      this.isInitialized = false;
    } catch (error) {
      console.error('❌ Error en cleanup:', error);
    }
  }
} 