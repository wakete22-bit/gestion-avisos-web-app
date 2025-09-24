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
  private static isCreating = false; // Flag para evitar creación múltiple
  private isInitialized = false;
  private appStateListener: any;
  private connectionStatus$ = new BehaviorSubject<boolean>(true);
  private isReconnecting = false;
  private authLockTimeout: any;
  
  constructor(private ngZone: NgZone) {}
  
  /**
   * Obtiene la instancia singleton del cliente Supabase
   * Si no existe, la crea con la configuración optimizada para móviles
   */
  public getClient(): SupabaseClient {
    if (!SupabaseClientService.instance && !SupabaseClientService.isCreating) {
      SupabaseClientService.isCreating = true;
      console.log('🔧 SupabaseClientService: Creando nueva instancia del cliente...');
      
      // LOGS CRÍTICOS PARA DEBUG
      console.log('🔧 ENVIRONMENT DEBUG:');
      console.log('🔧 Supabase URL:', environment.supabaseUrl);
      console.log('🔧 Supabase Key presente:', !!environment.supabaseAnonKey);
      console.log('🔧 Supabase Key length:', environment.supabaseAnonKey?.length);
      
      SupabaseClientService.instance = createClient(
        environment.supabaseUrl,
        environment.supabaseAnonKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true, // ✅ HABILITADO para renovación automática
            detectSessionInUrl: false, // ❌ DESHABILITADO para evitar conflictos de locks
            // Usar localStorage nativo para evitar conflictos con NavigatorLockManager
            // El storage personalizado con Capacitor puede causar race conditions
            storage: {
              getItem: (key: string): string | null => {
                try {
                  return localStorage.getItem(key);
                } catch (error) {
                  console.warn('⚠️ Error leyendo de localStorage:', error);
                  return null;
                }
              },
              setItem: (key: string, value: string): void => {
                try {
                  localStorage.setItem(key, value);
                } catch (error) {
                  console.warn('⚠️ Error escribiendo en localStorage:', error);
                }
              },
              removeItem: (key: string): void => {
                try {
                  localStorage.removeItem(key);
                } catch (error) {
                  console.warn('⚠️ Error eliminando de localStorage:', error);
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
              eventsPerSecond: 10 // Optimizado para mejor respuesta
            },
            // Configuración adicional para PWAs móviles
            heartbeatIntervalMs: 30000, // 30 segundos entre heartbeats
            reconnectAfterMs: (tries: number) => Math.min(tries * 1000, 10000) // Backoff hasta 10 segundos
          }
        }
      );
      
      // Inicializar el servicio una sola vez
      if (!this.isInitialized) {
        this.initializeService();
      }
      
      SupabaseClientService.isCreating = false;
      console.log('🔧 SupabaseClientService: Cliente Supabase singleton creado con localStorage nativo');
    }
    
    // Si ya existe una instancia, simplemente devolverla
    return SupabaseClientService.instance!;
  }

  /**
   * Inicializa el servicio con listeners esenciales
   */
  private async initializeService(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      console.log('🔧 SupabaseClientService: Inicializando servicio...');
      
      // Solo configurar listener para cambios de autenticación
      this.setupAuthStateListener();
      
      // Configurar monitoreo básico de conexión realtime
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
   * Verifica la conexión usando fetch directo - BYPASA AUTH LOCKS
   */
  public async testConnection(timeoutMs: number = 5000): Promise<boolean> {
    console.log('🔧 SupabaseClientService: INICIANDO test DIRECTO (timeout:', timeoutMs, 'ms)...');
    
    try {
      // Usar fetch directo en lugar del cliente Supabase
      const url = `${environment.supabaseUrl}/rest/v1/avisos?select=id&limit=1`;
      const headers = {
        'apikey': environment.supabaseAnonKey,
        'Authorization': `Bearer ${environment.supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      };
      
      console.log('🔧 URL construida:', url);
      console.log('🔧 Headers preparados');
      
      const startTime = Date.now();
      const connectionTest = Promise.race([
        fetch(url, { method: 'GET', headers }),
        new Promise<never>((_, reject) => 
          setTimeout(() => {
            console.log('🔧 ⏰ TIMEOUT del SupabaseClientService después de', timeoutMs, 'ms');
            reject(new Error('Connection timeout'));
          }, timeoutMs)
        )
      ]);

      console.log('🔧 Esperando respuesta de fetch directo...');
      const response = await connectionTest;
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log('🔧 Fetch completado en', duration, 'ms');
      console.log('🔧 Status:', response.status);
      console.log('🔧 StatusText:', response.statusText);
      
      const isValid = response.ok;
      
      if (isValid) {
        console.log('✅ SupabaseClientService: Conexión DIRECTA verificada en', duration, 'ms');
        const responseText = await response.text();
        console.log('✅ Response body:', responseText);
      } else {
        console.error('❌ SupabaseClientService: Test de conexión DIRECTA falló');
        console.error('❌ Status:', response.status, response.statusText);
      }
      
      return isValid;
      
    } catch (error) {
      console.error('❌ SupabaseClientService: EXCEPCIÓN en test DIRECTO:', {
        message: (error as any).message,
        stack: (error as any).stack,
        name: (error as any).name,
        fullError: error
      });
      return false;
    }
  }

  /**
   * Resetea el cliente después de una reconexión exitosa
   */
  public resetClientAfterReconnection(): void {
    console.log('🔧 Reseteando cliente Supabase después de reconexión...');
    
    try {
      // Limpiar la instancia actual
      SupabaseClientService.instance = null;
      SupabaseClientService.isCreating = false;
      
      // Crear una nueva instancia limpia
      const newClient = this.getClient();
      console.log('🔧 Cliente Supabase reseteado exitosamente');
      
      // Actualizar estado de conexión
      this.connectionStatus$.next(true);
      
    } catch (error) {
      console.error('❌ Error reseteando cliente Supabase:', error);
    }
  }

  /**
   * Limpia la instancia singleton (útil para testing o reinicio)
   */
  public static clearInstance(): void {
    SupabaseClientService.instance = null;
    SupabaseClientService.isCreating = false;
    console.log('🔧 SupabaseClientService: Instancia singleton limpiada');
  }

  /**
   * Limpia recursos básicos al destruir el servicio
   */
  public async cleanup(): Promise<void> {
    try {
      console.log('🧹 SupabaseClientService: Limpiando recursos básicos...');
      this.isInitialized = false;
    } catch (error) {
      console.error('❌ Error en cleanup:', error);
    }
  }
} 