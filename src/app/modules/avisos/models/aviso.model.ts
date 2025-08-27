// Importar la interfaz Albaran actualizada
export interface Albaran {
  id: string;
  aviso_id: string;
  fecha_trabajo: string; // Fecha en que se realizó el trabajo
  fecha_cierre: Date;    // Fecha de cierre del albarán
  hora_entrada: string;
  hora_salida: string;
  descripcion_trabajo_realizado: string;
  repuestos_utilizados: string[]; // Array de nombres de repuestos (legacy)
  estado_cierre: 'Finalizado' | 'Presupuesto pendiente' | 'Otra visita';
  presupuesto_necesario: number;
  dni_cliente: string;
  nombre_firma: string;
  firma_url?: string;
  observaciones?: string;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}

export interface Aviso {
  id: string;
  numero_secuencial?: number; // Número secuencial para mostrar al usuario
  cliente_id: string;
  tecnico_asignado_id?: string;
  fecha_creacion: Date;
  fecha_actualizacion?: Date;
  nombre_cliente_aviso: string;
  direccion_cliente_aviso: string;
  telefono_cliente_aviso: string;
  nombre_contacto: string;
  tipo: 'correctivo' | 'preventivo';
  descripcion_problema: string;
  estado: 'Pendiente' | 'En curso' | 'Pendiente de presupuesto' | 'Listo para facturar' | 'Completado' | 'Cancelado';
  urgencia: string; // Columna original de la base de datos
  es_urgente?: boolean; // Columna adicional para compatibilidad
  latitud?: number;
  longitud?: number;
  fecha_finalizacion?: Date;
  requiere_presupuesto: boolean;
  requiere_nueva_visita: boolean;
  // Relaciones
  cliente?: Cliente;
  tecnico_asignado?: Usuario;
  fotos?: FotoAviso[];
  albaranes?: Albaran[];
  presupuestos?: Presupuesto[];
  facturas?: Factura[];
}

export interface CrearAvisoRequest {
  cliente_id: string;
  nombre_cliente_aviso: string;
  direccion_cliente_aviso: string;
  telefono_cliente_aviso: string;
  nombre_contacto: string;
  tipo: 'correctivo' | 'preventivo';
  descripcion_problema: string;
  es_urgente: boolean;
  latitud?: number;
  longitud?: number;
}

export interface ActualizarAvisoRequest {
  tecnico_asignado_id?: string;
  nombre_cliente_aviso?: string;
  direccion_cliente_aviso?: string;
  telefono_cliente_aviso?: string;
  nombre_contacto?: string;
  tipo?: 'correctivo' | 'preventivo';
  descripcion_problema?: string;
  estado?: 'Pendiente' | 'En curso' | 'Pendiente de presupuesto' | 'Listo para facturar' | 'Completado';
  es_urgente?: boolean;
  latitud?: number;
  longitud?: number;
  fecha_finalizacion?: Date;
  requiere_presupuesto?: boolean;
  requiere_nueva_visita?: boolean;
}

export interface FotoAviso {
  id: string;
  aviso_id: string;
  url: string;
  descripcion?: string;
  fecha_subida: Date;
}

export interface AvisoResponse {
  avisos: Aviso[];
  total: number;
  pagina: number;
  por_pagina: number;
}

// Interfaces auxiliares (importar desde sus respectivos archivos)
export interface Cliente {
  id: string;
  nombre_completo: string;
  direccion?: string;
  telefono_contacto?: string;
  email?: string;
  nivel_urgencia_habitual?: string;
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
  fecha_creacion: Date;
  fecha_actualizacion?: Date;
}

// Interfaces adicionales para el nuevo flujo
export interface Presupuesto {
  id: string;
  albaran_id: string;
  aviso_id: string;
  fecha_creacion: Date;
  horas_estimadas: number;
  total_estimado: number;
  materiales_estimados: any[];
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Cancelado';
  pdf_url?: string;
  fecha_actualizacion?: Date;
}

export interface Factura {
  id: string;
  numero_factura: string;
  fecha_emision: Date;
  cliente_id: string;
  nombre_cliente: string;
  direccion_cliente: string;
  cif_cliente: string;
  email_cliente: string;
  aviso_id: string;
  subtotal: number;
  iva: number;
  total: number;
  estado: 'Pendiente' | 'En curso' | 'Completado';
  pdf_url?: string;
  notas?: string;
  fecha_creacion: Date;
  fecha_actualizacion?: Date;
} 