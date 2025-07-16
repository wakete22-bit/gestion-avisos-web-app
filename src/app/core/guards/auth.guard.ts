import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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
      return false;
    }
  }
} 