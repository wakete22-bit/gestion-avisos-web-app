import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SupabaseClientService } from '../services/supabase-client.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isReconnecting = new BehaviorSubject<boolean>(false);
  
  constructor(
    private authService: AuthService,
    private supabaseClientService: SupabaseClientService,
    private router: Router
  ) {
    this.setupReconnectionListener();
  }

  private setupReconnectionListener(): void {
    // Escuchar eventos de reconexión de Supabase
    document.addEventListener('supabase-reconnection', (event: any) => {
      const { success } = event.detail;
      console.log('🔍 AuthGuard: Evento de reconexión recibido:', success);
      
      if (success) {
        this.isReconnecting.next(false);
      } else {
        this.isReconnecting.next(true);
      }
    });
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('🚀 AuthGuard: canActivate() llamado');
    
    return from(this.checkAuthStatus()).pipe(
      map(isAuthenticated => {
        console.log('🚀 AuthGuard: Resultado de checkAuthStatus:', isAuthenticated);
        if (!isAuthenticated) {
          console.log('🚀 AuthGuard: Redirigiendo a login');
          return this.router.createUrlTree(['/auth/login']);
        }
        console.log('🚀 AuthGuard: Permitiendo acceso');
        return true;
      }),
      catchError(error => {
        console.error('❌ AuthGuard: Error en canActivate:', error);
        return of(this.router.createUrlTree(['/auth/login']));
      })
    );
  }

  private async checkAuthStatus(): Promise<boolean> {
    try {
      console.log('🔍 AuthGuard: Verificación rápida de autenticación');
      
      // Si estamos reconectando, esperar un poco
      if (this.isReconnecting.value) {
        console.log('🔍 AuthGuard: Reconexión en progreso, esperando...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Verificar que la conexión esté saludable antes de continuar
      const isConnectionHealthy = await this.supabaseClientService.ensureConnection();
      if (!isConnectionHealthy) {
        console.log('🔍 AuthGuard: Conexión no saludable después de intentar reconectar');
        return false;
      }
      
      // Verificar token de forma rápida
      const token = await this.authService.getToken();
      console.log('🔍 AuthGuard: Token obtenido:', token ? 'SÍ' : 'NO');
      
      if (!token) {
        console.log('🔍 AuthGuard: No hay token, redirigiendo a login');
        return false;
      }

      // Si el usuario ya está cargado, permitir acceso inmediatamente
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        console.log('🔍 AuthGuard: Usuario ya cargado, acceso inmediato');
        return true;
      }

      // Asegurar que el token sea válido antes de continuar
      const isTokenValid = await this.authService.ensureValidToken();
      if (!isTokenValid) {
        console.log('🔍 AuthGuard: Token no válido, redirigiendo a login');
        return false;
      }

      // Cargar usuario básico de forma rápida
      console.log('🔍 AuthGuard: Cargando usuario básico...');
      const { data: { session } } = await this.authService.getCurrentSession();
      if (session?.user) {
        await this.authService.loadUserData(session.user.id);
        console.log('🔍 AuthGuard: Usuario básico cargado, permitiendo acceso');
        return true;
      }

      console.log('🔍 AuthGuard: No hay sesión válida');
      return false;
      
    } catch (error) {
      console.error('❌ AuthGuard: Error en verificación rápida:', error);
      
      // Si es un error de lock, intentar limpiar y reintentar una vez
      if (error instanceof Error && error.message.includes('NavigatorLockAcquireTimeoutError')) {
        console.log('🔍 AuthGuard: Error de lock detectado, intentando limpiar...');
        try {
          // Forzar limpieza de locks
          localStorage.setItem('supabase_lock_issue', 'true');
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Reintentar una vez
          const retryResult = await this.checkAuthStatus();
          if (retryResult) {
            console.log('🔍 AuthGuard: Reintento exitoso después de limpiar locks');
            return true;
          }
        } catch (retryError) {
          console.error('❌ AuthGuard: Error en reintento:', retryError);
        }
      }
      
      return false;
    }
  }
} 