// Importar la interfaz Albaran
export interface Albaran {
  id: string;
  trabajo_id: string;
  aviso_id: string;
  fecha_cierre: Date;
  hora_entrada: string;
  hora_salida: string;
  descripcion_trabajo_realizado: string;
  repuestos_utilizados: string[];
  estado_cierre: 'Finalizado' | 'Presupuesto pendiente' | 'Otra visita';
  presupuesto_necesario: number;
  dni_cliente: string;
  nombre_firma: string;
  firma_url?: string;
  observaciones?: string;
}

export interface Aviso {
  id: string;
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
  estado: 'No visitado' | 'Visitado pendiente' | 'Pendiente de presupuesto' | 'Otra visita requerida' | 'En curso' | 'Pendiente' | 'Completado' | 'Cancelado';
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
  estado?: 'No visitado' | 'Visitado pendiente' | 'Pendiente de presupuesto' | 'Otra visita requerida' | 'En curso' | 'Pendiente' | 'Completado';
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