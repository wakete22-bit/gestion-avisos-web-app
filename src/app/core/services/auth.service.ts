import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Usuario, LoginRequest, RegisterRequest, AuthResponse, Rol, TipoRol } from '../models/usuario.model';
import { environment } from '../../../environments/environment';
import { SupabaseClient, User, AuthResponse as SupabaseAuthResponse } from '@supabase/supabase-js';
import { UsuariosService } from './usuarios.service';
import { SupabaseClientService } from './supabase-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  supabase: SupabaseClient;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  private isInitializing = false;

  constructor(
    private http: HttpClient,
    private usuariosService: UsuariosService,
    private supabaseClientService: SupabaseClientService
  ) {
    this.supabase = this.supabaseClientService.getClient();
    this.initializeAuth();
    this.setupReconnectionHandler();
  }

  /**
   * Configura el manejador de reconexión automática
   */
  private setupReconnectionHandler(): void {
    // Escuchar eventos de reconexión de Supabase
    document.addEventListener('supabase-reconnection', async (event: any) => {
      const { success } = event.detail;
      console.log('🔧 AuthService: Evento de reconexión recibido:', success);
      
      if (success) {
        // Reconexión exitosa, verificar y actualizar estado de autenticación
        await this.handleSuccessfulReconnection();
      } else {
        // Reconexión fallida, marcar como no autenticado
        console.log('🔧 AuthService: Reconexión fallida, limpiando estado...');
        this.clearAuth();
      }
    });
  }

  /**
   * Maneja la reconexión exitosa
   */
  private async handleSuccessfulReconnection(): Promise<void> {
    try {
      console.log('🔧 AuthService: Manejando reconexión exitosa...');
      
      // Verificar si hay una sesión válida
      const { data: { session } } = await this.supabase.auth.getSession();
      if (session?.user) {
        console.log('🔧 AuthService: Sesión válida después de reconexión, actualizando estado...');
        
        // Actualizar el estado de autenticación
        this.isAuthenticatedSubject.next(true);
        
        // Cargar datos del usuario si no están cargados
        if (!this.currentUserSubject.value) {
          await this.loadUserData(session.user.id);
        }
        
        console.log('🔧 AuthService: Estado de autenticación actualizado después de reconexión');
      } else {
        console.log('🔧 AuthService: No hay sesión válida después de reconexión');
        this.clearAuth();
      }
    } catch (error) {
      console.error('❌ AuthService: Error manejando reconexión exitosa:', error);
      this.clearAuth();
    }
  }

  private async initializeAuth(): Promise<void> {
    if (this.isInitializing) {
      console.log('🔧 AuthService: Ya se está inicializando, esperando...');
      return;
    }

    this.isInitializing = true;
    try {
      console.log('🔧 AuthService: Iniciando autenticación...');

      // Intentar limpiar locks problemáticos
      await this.clearProblematicLocks();

      await this.loadStoredAuth();
      this.setupAuthListener();

      console.log('🔧 AuthService: Inicialización completada');
    } catch (error) {
      console.error('❌ AuthService: Error en inicialización:', error);
      this.clearAuth();
    } finally {
      this.isInitializing = false;
    }
  }

  private async loadStoredAuth(): Promise<void> {
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        console.log(`🔧 AuthService: Intento ${retryCount + 1} de ${maxRetries}`);

        const sessionPromise = this.supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout getting session')), 10000) // ✅ Aumentar timeout
        );

        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]) as any;

        if (session?.user) {
          console.log('🔧 AuthService: Sesión encontrada, cargando datos del usuario...');
          await this.loadUserData(session.user.id);
          return; // ✅ Éxito, salir del bucle
        } else {
          console.log('🔧 AuthService: No hay sesión almacenada');
          return;
        }
      } catch (error) {
        retryCount++;
        console.error(`❌ AuthService: Error en intento ${retryCount}:`, error);

        if (retryCount >= maxRetries) {
          console.error('❌ AuthService: Máximo de reintentos alcanzado');
          this.clearAuth();
          return;
        }

        // Esperar antes del siguiente intento
        await new Promise(resolve => setTimeout(resolve, 2000 * retryCount));
      }
    }
  }
  private setupAuthListener(): void {
    this.supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.id);

      if (event === 'SIGNED_IN' && session?.user) {
        await this.loadUserData(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        this.clearAuth();
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        await this.loadUserData(session.user.id);
      }
    });
  }

  async loadUserData(userId: string): Promise<void> {
    try {
      console.log('🔧 AuthService: Cargando datos del usuario:', userId);

      // Intentar obtener el usuario de la base de datos
      try {
        const usuario = await this.usuariosService.getUsuario(userId).toPromise();
        console.log('🔧 AuthService: Usuario encontrado en BD:', usuario);
        this.currentUserSubject.next(usuario || null);
        this.isAuthenticatedSubject.next(true);
        console.log('🔧 AuthService: Usuario cargado exitosamente desde BD');
      } catch (dbError) {
        console.warn('⚠️ AuthService: Usuario no encontrado en BD, esperando a que se complete la creación:', dbError);

        // En lugar de crear un usuario por defecto, esperar un poco más
        // para que se complete la creación del usuario en la BD
        await new Promise(resolve => setTimeout(resolve, 3000));

        try {
          const usuario = await this.usuariosService.getUsuario(userId).toPromise();
          console.log('🔧 AuthService: Usuario encontrado después de esperar:', usuario);
          this.currentUserSubject.next(usuario || null);
          this.isAuthenticatedSubject.next(true);
          console.log('🔧 AuthService: Usuario cargado exitosamente después de esperar');
        } catch (finalError) {
          console.error('❌ AuthService: Usuario no encontrado después de esperar, creando usuario por defecto:', finalError);

          // Solo crear usuario por defecto si realmente no existe
          const usuarioDefault: Usuario = {
            id: userId,
            nombre_completo: 'Usuario',
            email: 'usuario@example.com',
            telefono: '',
            rol_id: 'default-role-id',
            rol: {
              id: 'default-role-id',
              nombre_rol: 'Cliente' as TipoRol,
              descripcion: '',
              permisos: [],
              es_activo: true,
              fecha_creacion: new Date(),
              fecha_actualizacion: new Date()
            },
            es_activo: true,
            fecha_creacion: new Date()
          };

          console.log('🔧 AuthService: Usuario por defecto creado:', usuarioDefault);
          this.currentUserSubject.next(usuarioDefault);
          this.isAuthenticatedSubject.next(true);
          console.log('🔧 AuthService: Usuario por defecto cargado exitosamente');
        }
      }
    } catch (error) {
      console.error('❌ AuthService: Error loading user data:', error);
      this.clearAuth();
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) throw error;

      if (data.user) {
        await this.loadUserData(data.user.id);
        return {
          usuario: this.currentUserSubject.value!,
          token: data.session?.access_token || ''
        };
      }

      throw new Error('No se pudo obtener información del usuario');
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Registrar usuario en Supabase Auth
      const { data, error } = await this.supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            nombre_completo: userData.nombre_completo,
            telefono: userData.telefono
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Esperar a que se complete el registro
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Crear el usuario en la tabla usuarios
        const userDataWithId = {
          ...userData,
          id: data.user.id
        };

        try {
          await this.usuariosService.crearUsuario(userDataWithId).toPromise();
          console.log('🔧 AuthService: Usuario creado en tabla usuarios');
        } catch (createError) {
          console.warn('⚠️ AuthService: Error al crear usuario en tabla usuarios:', createError);
          // Continuar aunque falle la creación en la tabla usuarios
        }

        // Intentar cargar los datos del usuario
        await this.loadUserData(data.user.id);

        return {
          usuario: this.currentUserSubject.value!,
          token: data.session?.access_token || ''
        };
      }

      throw new Error('No se pudo crear el usuario');
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    this.clearAuth();
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const { data, error } = await this.supabase.auth.refreshSession();

      if (error) throw error;

      if (data.user) {
        await this.loadUserData(data.user.id);
        return {
          usuario: this.currentUserSubject.value!,
          token: data.session?.access_token || ''
        };
      }

      throw new Error('No se pudo refrescar la sesión');
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const isAuth = this.isAuthenticatedSubject.value;
    console.log('🔧 AuthService: isAuthenticated() - Estado:', isAuth);
    return isAuth;
  }

  async getToken(): Promise<string | null> {
    const { data: { session } } = await this.supabase.auth.getSession();
    const token = session?.access_token || null;
    console.log('🔧 AuthService: getToken() - Token obtenido:', token ? 'SÍ' : 'NO');
    return token;
  }

  private clearAuth(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  // Método para obtener headers con token para requests autenticados
  async getAuthHeaders(): Promise<HttpHeaders> {
    const token = await this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Verificar si el token ha expirado
  async isTokenExpired(): Promise<boolean> {
    const { data: { session } } = await this.supabase.auth.getSession();
    if (!session) return true;

    return new Date(session.expires_at! * 1000) < new Date();
  }

  // Método público para obtener la sesión actual
  async getCurrentSession() {
    return await this.supabase.auth.getSession();
  }

  // Método para refresh manual de token (solución para NavigatorLockAcquireTimeoutError)
  async manualRefreshToken(): Promise<boolean> {
    try {
      console.log('🔄 AuthService: Iniciando refresh manual de token...');

      // Verificar si hay una sesión activa
      const { data: { session } } = await this.supabase.auth.getSession();
      if (!session) {
        console.log('🔄 AuthService: No hay sesión activa para refrescar');
        return false;
      }

      // Verificar si el token está próximo a expirar (menos de 5 minutos)
      const expiresAt = session.expires_at! * 1000; // Convertir a milisegundos
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;
      const fiveMinutes = 5 * 60 * 1000;

      if (timeUntilExpiry > fiveMinutes) {
        console.log('🔄 AuthService: Token aún válido, no es necesario refrescar');
        return true;
      }

      console.log('🔄 AuthService: Token próximo a expirar, refrescando...');

      // Intentar refresh con timeout para evitar bloqueos
      const refreshPromise = this.supabase.auth.refreshSession();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Refresh timeout')), 10000)
      );

      const { data, error } = await Promise.race([refreshPromise, timeoutPromise]) as any;

      if (error) {
        console.error('❌ AuthService: Error en refresh manual:', error);
        return false;
      }

      if (data.session) {
        console.log('🔄 AuthService: Token refrescado exitosamente');
        // Recargar datos del usuario si es necesario
        if (data.user) {
          await this.loadUserData(data.user.id);
        }
        return true;
      }

      console.log('🔄 AuthService: No se pudo refrescar el token');
      return false;

    } catch (error) {
      console.error('❌ AuthService: Error en refresh manual:', error);

      // Si es un error de lock, limpiar y reintentar
      if (error instanceof Error && error.message.includes('NavigatorLockAcquireTimeoutError')) {
        console.log('🔄 AuthService: Error de lock detectado, limpiando...');
        await this.clearProblematicLocks();
        localStorage.setItem('supabase_lock_issue', 'true');
      }

      return false;
    }
  }

  // Método para asegurar que el token sea válido
  async ensureValidToken(): Promise<boolean> {
    try {
      // Primero verificar que la conexión esté saludable
      const isConnectionHealthy = await this.supabaseClientService.ensureConnection();
      if (!isConnectionHealthy) {
        console.log('🔧 AuthService: Conexión no saludable, no se puede verificar el token');
        return false;
      }
      
      const { data: { session } } = await this.supabase.auth.getSession();
      if (!session) {
        return false;
      }

      const expiresAt = session.expires_at! * 1000;
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;
      const fiveMinutes = 5 * 60 * 1000;

      if (timeUntilExpiry <= fiveMinutes) {
        return await this.manualRefreshToken();
      }

      return true;
    } catch (error) {
      console.error('❌ AuthService: Error verificando validez del token:', error);
      return false;
    }
  }

  // Método para limpiar locks problemáticos de forma más agresiva
  private async clearProblematicLocks(): Promise<void> {
    try {
      console.log('🔧 AuthService: Limpiando locks problemáticos...');

      // Limpiar localStorage si hay problemas de locks
      const hasLockIssues = localStorage.getItem('supabase_lock_issue');
      if (hasLockIssues) {
        console.log('🔧 AuthService: Detectados problemas de locks, limpiando...');
        localStorage.removeItem('supabase_lock_issue');

        // Limpiar datos de Supabase del localStorage de forma más agresiva
        const keysToRemove = Object.keys(localStorage).filter(key =>
          key.includes('supabase') ||
          key.includes('sb-') ||
          key.includes('auth') ||
          key.includes('token')
        );

        keysToRemove.forEach(key => {
          try {
            localStorage.removeItem(key);
            console.log(`🔧 AuthService: Eliminado ${key}`);
          } catch (error) {
            console.warn(`⚠️ AuthService: Error eliminando ${key}:`, error);
          }
        });

        // Esperar un poco para que se liberen los locks
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.warn('⚠️ AuthService: Error al limpiar locks:', error);
    }
  }

  // Métodos de debug para diagnóstico
  async debugTokenStatus(): Promise<any> {
    try {
      const { data: { session } } = await this.supabase.auth.getSession();
      if (!session) {
        return {
          hasSession: false,
          message: 'No hay sesión activa'
        };
      }

      const expiresAt = session.expires_at! * 1000;
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;
      const fiveMinutes = 5 * 60 * 1000;

      return {
        hasSession: true,
        userId: session.user.id,
        expiresAt: new Date(expiresAt).toISOString(),
        timeUntilExpiry: Math.floor(timeUntilExpiry / 1000), // en segundos
        needsRefresh: timeUntilExpiry <= fiveMinutes,
        isExpired: timeUntilExpiry <= 0
      };
    } catch (error) {
      return {
        hasSession: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  async debugLocalStorage(): Promise<any> {
    try {
      const supabaseKeys = Object.keys(localStorage).filter(key =>
        key.includes('supabase') || key.includes('sb-') || key.includes('auth')
      );

      return {
        totalKeys: Object.keys(localStorage).length,
        supabaseKeys: supabaseKeys,
        hasLockIssue: localStorage.getItem('supabase_lock_issue') !== null
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  async forceClearLocks(): Promise<void> {
    try {
      console.log('🔧 AuthService: Forzando limpieza de locks...');

      // Limpiar todos los datos de Supabase
      const keysToRemove = Object.keys(localStorage).filter(key =>
        key.includes('supabase') ||
        key.includes('sb-') ||
        key.includes('auth') ||
        key.includes('token')
      );

      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key);
          console.log(`🔧 AuthService: Eliminado ${key}`);
        } catch (error) {
          console.warn(`⚠️ AuthService: Error eliminando ${key}:`, error);
        }
      });

      // Marcar problema de locks para futuras limpiezas
      localStorage.setItem('supabase_lock_issue', 'true');

      // Esperar para que se liberen los locks
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('🔧 AuthService: Limpieza de locks completada');
    } catch (error) {
      console.error('❌ AuthService: Error en limpieza forzada:', error);
    }
  }
} 