import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RolesService } from '../services/roles.service';
import { Permiso } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  
  constructor(
    private rolesService: RolesService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Obtener permisos requeridos de la ruta
    const permisosRequeridos = route.data['permisos'] as Permiso[];
    
    if (!permisosRequeridos || permisosRequeridos.length === 0) {
      return new Observable(observer => observer.next(true));
    }

    // Verificar si el usuario tiene los permisos requeridos
    return this.rolesService.tieneTodosPermisos(permisosRequeridos).pipe(
      map(tienePermisos => {
        if (!tienePermisos) {
          // Redirigir a una página de acceso denegado o al home
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
} 