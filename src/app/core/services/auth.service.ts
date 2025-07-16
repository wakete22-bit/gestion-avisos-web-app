import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Usuario, LoginRequest, RegisterRequest, AuthResponse, Rol, TipoRol } from '../models/usuario.model';
import { environment } from '../../../environments/environment';
import { createClient, SupabaseClient, User, AuthResponse as SupabaseAuthResponse } from '@supabase/supabase-js';

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

  constructor(private http: HttpClient) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
    this.initializeAuth();
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

  private async clearProblematicLocks(): Promise<void> {
    try {
      // Limpiar localStorage si hay problemas de locks
      const hasLockIssues = localStorage.getItem('supabase_lock_issue');
      if (hasLockIssues) {
        console.log('🔧 AuthService: Detectados problemas de locks, limpiando...');
        localStorage.removeItem('supabase_lock_issue');
        
        // Limpiar datos de Supabase del localStorage
        const keysToRemove = Object.keys(localStorage).filter(key => 
          key.includes('supabase') || key.includes('sb-')
        );
        
        keysToRemove.forEach(key => {
          localStorage.removeItem(key);
          console.log(`🔧 AuthService: Eliminado ${key}`);
        });
      }
    } catch (error) {
      console.warn('⚠️ AuthService: Error al limpiar locks:', error);
    }
  }

  private async loadStoredAuth(): Promise<void> {
    try {
      console.log('🔧 AuthService: Cargando autenticación almacenada...');
      
      // Usar un timeout para evitar bloqueos indefinidos
      const sessionPromise = this.supabase.auth.getSession();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout getting session')), 5000)
      );
      
      const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]) as any;
      
      if (session?.user) {
        console.log('🔧 AuthService: Sesión encontrada, cargando datos del usuario...');
        await this.loadUserData(session.user.id);
      } else {
        console.log('🔧 AuthService: No hay sesión almacenada');
      }
    } catch (error) {
      console.error('❌ AuthService: Error loading stored auth:', error);
      
      // Marcar que hay problemas de locks
      if (error instanceof Error && error.message.includes('NavigatorLockAcquireTimeoutError')) {
        localStorage.setItem('supabase_lock_issue', 'true');
        console.log('🔧 AuthService: Problema de Navigator Lock detectado');
      }
      
      this.clearAuth();
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
      
      // Crear usuario básico sin consultar la base de datos
      const usuario: Usuario = {
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

      console.log('🔧 AuthService: Usuario básico creado:', usuario);
      
      this.currentUserSubject.next(usuario);
      this.isAuthenticatedSubject.next(true);
      
      console.log('🔧 AuthService: Usuario cargado exitosamente');
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
} 