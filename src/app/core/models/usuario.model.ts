// Enum para los tipos de roles disponibles
export enum TipoRol {
  ADMINISTRADOR = 'Administrador',
  TECNICO = 'Técnico',
  USUARIO = 'Usuario'
}

// Enum para los permisos disponibles
export enum Permiso {
  // Permisos de usuarios
  VER_PERFIL_PROPIO = 'ver_perfil_propio',
  EDITAR_PERFIL_PROPIO = 'editar_perfil_propio',
  
  // Permisos de avisos
  VER_AVISOS = 'ver_avisos',
  CREAR_AVISOS = 'crear_avisos',
  EDITAR_AVISOS = 'editar_avisos',
  ELIMINAR_AVISOS = 'eliminar_avisos',
  ASIGNAR_AVISOS = 'asignar_avisos',
  
  // Permisos de clientes
  VER_CLIENTES = 'ver_clientes',
  CREAR_CLIENTES = 'crear_clientes',
  EDITAR_CLIENTES = 'editar_clientes',
  ELIMINAR_CLIENTES = 'eliminar_clientes',
  
  // Permisos de inventario
  VER_INVENTARIO = 'ver_inventario',
  GESTIONAR_INVENTARIO = 'gestionar_inventario',
  
  // Permisos de facturas
  VER_FACTURAS = 'ver_facturas',
  CREAR_FACTURAS = 'crear_facturas',
  EDITAR_FACTURAS = 'editar_facturas',
  
  // Permisos de presupuestos
  VER_PRESUPUESTOS = 'ver_presupuestos',
  CREAR_PRESUPUESTOS = 'crear_presupuestos',
  EDITAR_PRESUPUESTOS = 'editar_presupuestos',
  
  // Permisos de reportes
  VER_REPORTES = 'ver_reportes',
  GENERAR_REPORTES = 'generar_reportes',
  
  // Permisos administrativos
  GESTIONAR_USUARIOS = 'gestionar_usuarios',
  GESTIONAR_ROLES = 'gestionar_roles',
  CONFIGURACION_SISTEMA = 'configuracion_sistema'
}

export interface Rol {
  id: string;
  nombre_rol: TipoRol;
  descripcion?: string;
  permisos: Permiso[];
  es_activo: boolean;
  fecha_creacion: Date;
  fecha_actualizacion?: Date;
}

export interface Usuario {
  id: string;
  nombre_completo: string;
  email: string;
  telefono?: string;
  rol_id: string;
  rol?: Rol;
  es_activo: boolean;
  fecha_creacion: Date;
  fecha_ultimo_acceso?: Date;
  fecha_actualizacion?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre_completo: string;
  email: string;
  password: string;
  telefono?: string;
  rol_id?: string;
}

export interface AuthResponse {
  usuario: Usuario;
  token: string;
  refreshToken?: string;
} 