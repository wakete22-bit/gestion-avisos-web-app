import {
  AuthService
} from "./chunk-HVSDGWD4.js";
import {
  Injectable,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-ANYKLJQR.js";

// src/app/core/models/usuario.model.ts
var TipoRol;
(function(TipoRol2) {
  TipoRol2["ADMINISTRADOR"] = "Administrador";
  TipoRol2["TECNICO"] = "T\xE9cnico";
  TipoRol2["USUARIO"] = "Usuario";
})(TipoRol || (TipoRol = {}));
var Permiso;
(function(Permiso2) {
  Permiso2["VER_PERFIL_PROPIO"] = "ver_perfil_propio";
  Permiso2["EDITAR_PERFIL_PROPIO"] = "editar_perfil_propio";
  Permiso2["VER_AVISOS"] = "ver_avisos";
  Permiso2["CREAR_AVISOS"] = "crear_avisos";
  Permiso2["EDITAR_AVISOS"] = "editar_avisos";
  Permiso2["ELIMINAR_AVISOS"] = "eliminar_avisos";
  Permiso2["ASIGNAR_AVISOS"] = "asignar_avisos";
  Permiso2["VER_CLIENTES"] = "ver_clientes";
  Permiso2["CREAR_CLIENTES"] = "crear_clientes";
  Permiso2["EDITAR_CLIENTES"] = "editar_clientes";
  Permiso2["ELIMINAR_CLIENTES"] = "eliminar_clientes";
  Permiso2["VER_INVENTARIO"] = "ver_inventario";
  Permiso2["GESTIONAR_INVENTARIO"] = "gestionar_inventario";
  Permiso2["VER_FACTURAS"] = "ver_facturas";
  Permiso2["CREAR_FACTURAS"] = "crear_facturas";
  Permiso2["EDITAR_FACTURAS"] = "editar_facturas";
  Permiso2["VER_PRESUPUESTOS"] = "ver_presupuestos";
  Permiso2["CREAR_PRESUPUESTOS"] = "crear_presupuestos";
  Permiso2["EDITAR_PRESUPUESTOS"] = "editar_presupuestos";
  Permiso2["VER_REPORTES"] = "ver_reportes";
  Permiso2["GENERAR_REPORTES"] = "generar_reportes";
  Permiso2["GESTIONAR_USUARIOS"] = "gestionar_usuarios";
  Permiso2["GESTIONAR_ROLES"] = "gestionar_roles";
  Permiso2["CONFIGURACION_SISTEMA"] = "configuracion_sistema";
})(Permiso || (Permiso = {}));

// src/app/core/services/roles.service.ts
var _RolesService = class _RolesService {
  constructor(authService) {
    this.authService = authService;
    this.ROLES_PERMISOS = {
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
  }
  /**
   * Obtiene los permisos del usuario actual
   */
  getPermisosUsuario() {
    return this.authService.currentUser$.pipe(map((usuario) => {
      if (!usuario || !usuario.rol) {
        return [];
      }
      return this.ROLES_PERMISOS[usuario.rol.nombre_rol] || [];
    }));
  }
  /**
   * Verifica si el usuario actual tiene un permiso específico
   */
  tienePermiso(permiso) {
    return this.getPermisosUsuario().pipe(map((permisos) => permisos.includes(permiso)));
  }
  /**
   * Verifica si el usuario actual tiene al menos uno de los permisos especificados
   */
  tieneAlgunPermiso(permisos) {
    return this.getPermisosUsuario().pipe(map((permisosUsuario) => permisos.some((permiso) => permisosUsuario.includes(permiso))));
  }
  /**
   * Verifica si el usuario actual tiene todos los permisos especificados
   */
  tieneTodosPermisos(permisos) {
    return this.getPermisosUsuario().pipe(map((permisosUsuario) => permisos.every((permiso) => permisosUsuario.includes(permiso))));
  }
  /**
   * Verifica si el usuario actual es administrador
   */
  esAdministrador() {
    return this.authService.currentUser$.pipe(map((usuario) => {
      var _a;
      return ((_a = usuario == null ? void 0 : usuario.rol) == null ? void 0 : _a.nombre_rol) === TipoRol.ADMINISTRADOR;
    }));
  }
  /**
   * Verifica si el usuario actual es técnico
   */
  esTecnico() {
    return this.authService.currentUser$.pipe(map((usuario) => {
      var _a;
      return ((_a = usuario == null ? void 0 : usuario.rol) == null ? void 0 : _a.nombre_rol) === TipoRol.TECNICO;
    }));
  }
  /**
   * Verifica si el usuario actual es usuario básico
   */
  esUsuario() {
    return this.authService.currentUser$.pipe(map((usuario) => {
      var _a;
      return ((_a = usuario == null ? void 0 : usuario.rol) == null ? void 0 : _a.nombre_rol) === TipoRol.USUARIO;
    }));
  }
  /**
   * Obtiene el rol actual del usuario
   */
  getRolActual() {
    return this.authService.currentUser$.pipe(map((usuario) => {
      var _a;
      return ((_a = usuario == null ? void 0 : usuario.rol) == null ? void 0 : _a.nombre_rol) || null;
    }));
  }
  /**
   * Obtiene todos los roles disponibles
   */
  getRolesDisponibles() {
    return Object.values(TipoRol);
  }
  /**
   * Obtiene los permisos de un rol específico
   */
  getPermisosRol(rol) {
    return this.ROLES_PERMISOS[rol] || [];
  }
  /**
   * Obtiene la descripción de un rol
   */
  getDescripcionRol(rol) {
    const descripciones = {
      [TipoRol.ADMINISTRADOR]: "Acceso completo al sistema. Puede gestionar usuarios, configuraciones y todos los m\xF3dulos.",
      [TipoRol.TECNICO]: "Puede gestionar avisos, crear facturas y presupuestos. Acceso limitado a configuraciones.",
      [TipoRol.USUARIO]: "Acceso b\xE1sico. Solo puede ver informaci\xF3n relacionada con sus avisos y perfil."
    };
    return descripciones[rol];
  }
  /**
   * Verifica si un rol puede realizar una acción específica
   */
  rolPuedeRealizarAccion(rol, accion) {
    const permisos = this.ROLES_PERMISOS[rol] || [];
    const mapeoAcciones = {
      "ver_avisos": [Permiso.VER_AVISOS],
      "crear_avisos": [Permiso.CREAR_AVISOS],
      "editar_avisos": [Permiso.EDITAR_AVISOS],
      "eliminar_avisos": [Permiso.ELIMINAR_AVISOS],
      "asignar_avisos": [Permiso.ASIGNAR_AVISOS],
      "ver_clientes": [Permiso.VER_CLIENTES],
      "crear_clientes": [Permiso.CREAR_CLIENTES],
      "editar_clientes": [Permiso.EDITAR_CLIENTES],
      "eliminar_clientes": [Permiso.ELIMINAR_CLIENTES],
      "ver_inventario": [Permiso.VER_INVENTARIO],
      "gestionar_inventario": [Permiso.GESTIONAR_INVENTARIO],
      "ver_facturas": [Permiso.VER_FACTURAS],
      "crear_facturas": [Permiso.CREAR_FACTURAS],
      "editar_facturas": [Permiso.EDITAR_FACTURAS],
      "ver_presupuestos": [Permiso.VER_PRESUPUESTOS],
      "crear_presupuestos": [Permiso.CREAR_PRESUPUESTOS],
      "editar_presupuestos": [Permiso.EDITAR_PRESUPUESTOS],
      "ver_reportes": [Permiso.VER_REPORTES],
      "generar_reportes": [Permiso.GENERAR_REPORTES],
      "gestionar_usuarios": [Permiso.GESTIONAR_USUARIOS],
      "gestionar_roles": [Permiso.GESTIONAR_ROLES],
      "configuracion_sistema": [Permiso.CONFIGURACION_SISTEMA]
    };
    const permisosRequeridos = mapeoAcciones[accion] || [];
    return permisosRequeridos.every((permiso) => permisos.includes(permiso));
  }
};
_RolesService.\u0275fac = function RolesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RolesService)(\u0275\u0275inject(AuthService));
};
_RolesService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RolesService, factory: _RolesService.\u0275fac, providedIn: "root" });
var RolesService = _RolesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RolesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: AuthService }], null);
})();

export {
  TipoRol,
  RolesService
};
//# sourceMappingURL=chunk-7DHOVE7F.js.map
