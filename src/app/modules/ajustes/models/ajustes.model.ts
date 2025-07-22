export interface ConfiguracionEmpresa {
  id: string;
  nombre_empresa: string;
  cif: string;
  direccion: string;
  telefono: string;
  email: string;
  web?: string;
  logo_url?: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface ConfiguracionFacturacion {
  id: string;
  iva_por_defecto: number;
  moneda: string;
  formato_numero_factura: string;
  dias_vencimiento: number;
  texto_pie_factura?: string;
  condiciones_pago?: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface ConfiguracionNotificaciones {
  id: string;
  email_notificaciones: boolean;
  email_avisos_nuevos: boolean;
  email_facturas_generadas: boolean;
  email_recordatorios: boolean;
  sms_notificaciones: boolean;
  sms_avisos_urgentes: boolean;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface ConfiguracionAvisos {
  id: string;
  tipos_urgencia: string[];
  estados_disponibles: string[];
  tiempo_maximo_respuesta: number; // en horas
  asignacion_automatica: boolean;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface ConfiguracionSistema {
  id: string;
  backup_automatico: boolean;
  frecuencia_backup: string; // 'diario', 'semanal', 'mensual'
  retencion_backup_dias: number;
  modo_mantenimiento: boolean;
  mensaje_mantenimiento?: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface AjustesCompletos {
  empresa: ConfiguracionEmpresa;
  facturacion: ConfiguracionFacturacion;
  notificaciones: ConfiguracionNotificaciones;
  avisos: ConfiguracionAvisos;
  sistema: ConfiguracionSistema;
}

// Interfaces para actualización
export interface ActualizarEmpresaRequest {
  nombre_empresa?: string;
  cif?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  web?: string;
  logo_url?: string;
}

export interface ActualizarFacturacionRequest {
  iva_por_defecto?: number;
  moneda?: string;
  formato_numero_factura?: string;
  dias_vencimiento?: number;
  texto_pie_factura?: string;
  condiciones_pago?: string;
}

export interface ActualizarNotificacionesRequest {
  email_notificaciones?: boolean;
  email_avisos_nuevos?: boolean;
  email_facturas_generadas?: boolean;
  email_recordatorios?: boolean;
  sms_notificaciones?: boolean;
  sms_avisos_urgentes?: boolean;
}

export interface ActualizarAvisosRequest {
  tipos_urgencia?: string[];
  estados_disponibles?: string[];
  tiempo_maximo_respuesta?: number;
  asignacion_automatica?: boolean;
}

export interface ActualizarSistemaRequest {
  backup_automatico?: boolean;
  frecuencia_backup?: string;
  retencion_backup_dias?: number;
  modo_mantenimiento?: boolean;
  mensaje_mantenimiento?: string;
} 