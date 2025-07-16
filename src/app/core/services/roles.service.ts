import { Injectable } from '@angular/core';
import { TipoRol, Permiso, Rol } from '../models/usuario.model';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  // Definición de roles con sus permisos
  private readonly ROLES_PERMISOS: Record<TipoRol, Permiso[]> = {
    [TipoRol.ADMINISTRADOR]: [
      // Todos los permisos
      ...Object.values(Permiso)
    ],
    [TipoRol.TECNICO]: [
      // Permisos de perfil
      Permiso.VER_PERFIL_PROPIO,
      Permiso.EDITAR_PERFIL_PROPIO,
      
      // Permisos de avisos
      Permiso.VER_AVISOS,
      Permiso.EDITAR_AVISOS,
      
      // Permisos de clientes (solo ver)
      Permiso.VER_CLIENTES,
      
      // Permisos de inventario (solo ver)
      Permiso.VER_INVENTARIO,
      
      // Permisos de facturas
      Permiso.VER_FACTURAS,
      Permiso.CREAR_FACTURAS,
      
      // Permisos de presupuestos
      Permiso.VER_PRESUPUESTOS,
      Permiso.CREAR_PRESUPUESTOS,
      
      // Permisos de reportes (solo ver)
      Permiso.VER_REPORTES
    ],
    [TipoRol.USUARIO]: [
      // Permisos básicos
      Permiso.VER_PERFIL_PROPIO,
      Permiso.EDITAR_PERFIL_PROPIO,
      
      // Solo puede ver avisos relacionados
      Permiso.VER_AVISOS,
      
      // Solo puede ver facturas relacionadas
      Permiso.VER_FACTURAS,
      
      // Solo puede ver presupuestos relacionados
      Permiso.VER_PRESUPUESTOS
    ]
  };

  constructor(private authService: AuthService) {}

  /**
   * Obtiene los permisos del usuario actual
   */
  getPermisosUsuario(): Observable<Permiso[]> {
    return this.authService.currentUser$.pipe(
      map(usuario => {
        if (!usuario || !usuario.rol) {
          return [];
        }
        return this.ROLES_PERMISOS[usuario.rol.nombre_rol] || [];
      })
    );
  }

  /**
   * Verifica si el usuario actual tiene un permiso específico
   */
  tienePermiso(permiso: Permiso): Observable<boolean> {
    return this.getPermisosUsuario().pipe(
      map(permisos => permisos.includes(permiso))
    );
  }

  /**
   * Verifica si el usuario actual tiene al menos uno de los permisos especificados
   */
  tieneAlgunPermiso(permisos: Permiso[]): Observable<boolean> {
    return this.getPermisosUsuario().pipe(
      map(permisosUsuario => 
        permisos.some(permiso => permisosUsuario.includes(permiso))
      )
    );
  }

  /**
   * Verifica si el usuario actual tiene todos los permisos especificados
   */
  tieneTodosPermisos(permisos: Permiso[]): Observable<boolean> {
    return this.getPermisosUsuario().pipe(
      map(permisosUsuario => 
        permisos.every(permiso => permisosUsuario.includes(permiso))
      )
    );
  }

  /**
   * Verifica si el usuario actual es administrador
   */
  esAdministrador(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(usuario => 
        usuario?.rol?.nombre_rol === TipoRol.ADMINISTRADOR
      )
    );
  }

  /**
   * Verifica si el usuario actual es técnico
   */
  esTecnico(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(usuario => 
        usuario?.rol?.nombre_rol === TipoRol.TECNICO
      )
    );
  }

  /**
   * Verifica si el usuario actual es usuario básico
   */
  esUsuario(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(usuario => 
        usuario?.rol?.nombre_rol === TipoRol.USUARIO
      )
    );
  }

  /**
   * Obtiene el rol actual del usuario
   */
  getRolActual(): Observable<TipoRol | null> {
    return this.authService.currentUser$.pipe(
      map(usuario => usuario?.rol?.nombre_rol || null)
    );
  }

  /**
   * Obtiene todos los roles disponibles
   */
  getRolesDisponibles(): TipoRol[] {
    return Object.values(TipoRol);
  }

  /**
   * Obtiene los permisos de un rol específico
   */
  getPermisosRol(rol: TipoRol): Permiso[] {
    return this.ROLES_PERMISOS[rol] || [];
  }

  /**
   * Obtiene la descripción de un rol
   */
  getDescripcionRol(rol: TipoRol): string {
    const descripciones: Record<TipoRol, string> = {
      [TipoRol.ADMINISTRADOR]: 'Acceso completo al sistema. Puede gestionar usuarios, configuraciones y todos los módulos.',
      [TipoRol.TECNICO]: 'Puede gestionar avisos, crear facturas y presupuestos. Acceso limitado a configuraciones.',
      [TipoRol.USUARIO]: 'Acceso básico. Solo puede ver información relacionada con sus avisos y perfil.'
    };
    return descripciones[rol];
  }

  /**
   * Verifica si un rol puede realizar una acción específica
   */
  rolPuedeRealizarAccion(rol: TipoRol, accion: string): boolean {
    const permisos = this.ROLES_PERMISOS[rol] || [];
    
    // Mapeo de acciones a permisos
    const mapeoAcciones: Record<string, Permiso[]> = {
      'ver_avisos': [Permiso.VER_AVISOS],
      'crear_avisos': [Permiso.CREAR_AVISOS],
      'editar_avisos': [Permiso.EDITAR_AVISOS],
      'eliminar_avisos': [Permiso.ELIMINAR_AVISOS],
      'asignar_avisos': [Permiso.ASIGNAR_AVISOS],
      'ver_clientes': [Permiso.VER_CLIENTES],
      'crear_clientes': [Permiso.CREAR_CLIENTES],
      'editar_clientes': [Permiso.EDITAR_CLIENTES],
      'eliminar_clientes': [Permiso.ELIMINAR_CLIENTES],
      'ver_inventario': [Permiso.VER_INVENTARIO],
      'gestionar_inventario': [Permiso.GESTIONAR_INVENTARIO],
      'ver_facturas': [Permiso.VER_FACTURAS],
      'crear_facturas': [Permiso.CREAR_FACTURAS],
      'editar_facturas': [Permiso.EDITAR_FACTURAS],
      'ver_presupuestos': [Permiso.VER_PRESUPUESTOS],
      'crear_presupuestos': [Permiso.CREAR_PRESUPUESTOS],
      'editar_presupuestos': [Permiso.EDITAR_PRESUPUESTOS],
      'ver_reportes': [Permiso.VER_REPORTES],
      'generar_reportes': [Permiso.GENERAR_REPORTES],
      'gestionar_usuarios': [Permiso.GESTIONAR_USUARIOS],
      'gestionar_roles': [Permiso.GESTIONAR_ROLES],
      'configuracion_sistema': [Permiso.CONFIGURACION_SISTEMA]
    };

    const permisosRequeridos = mapeoAcciones[accion] || [];
    return permisosRequeridos.every(permiso => permisos.includes(permiso));
  }
} 