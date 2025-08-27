// ========================================
// MODELO DE ALBARÁN ACTUALIZADO
// ========================================
// Este modelo representa cada visita/intervención realizada en un aviso

export interface RepuestoAlbaran {
  id?: string;
  nombre: string;
  cantidad: number;
  precio_neto: number;
  precio_pvp: number;
  unidad: string;
  codigo?: string;
  fecha_creacion?: Date;
}

export interface Albaran {
  id?: string;
  aviso_id: string;
  fecha_trabajo: string; // Fecha en que se realizó el trabajo (YYYY-MM-DD)
  fecha_cierre: Date;    // Fecha de cierre del albarán (automática)
  hora_entrada: string;  // Hora de inicio (HH:MM)
  hora_salida: string;   // Hora de finalización (HH:MM)
  descripcion_trabajo_realizado: string;
  repuestos_utilizados: RepuestoAlbaran[]; // Repuestos con cantidades y precios
  estado_cierre: 'Finalizado' | 'Presupuesto pendiente' | 'Otra visita';
  presupuesto_necesario: number;
  dni_cliente?: string;
  nombre_firma?: string;
  firma_cliente?: string; // Data URL de la firma digital
  firma_url?: string;     // URL de la imagen de firma (legacy)
  observaciones?: string;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}

export interface CrearAlbaranRequest {
  aviso_id: string;
  fecha_trabajo: string;
  fecha_cierre: Date;
  hora_entrada: string;
  hora_salida: string;
  descripcion_trabajo_realizado: string;
  repuestos_utilizados: RepuestoAlbaran[];
  estado_cierre: 'Finalizado' | 'Presupuesto pendiente' | 'Otra visita';
  presupuesto_necesario: number;
  dni_cliente?: string;
  nombre_firma?: string;
  firma_cliente?: string;
  observaciones?: string;
}

export interface ActualizarAlbaranRequest {
  fecha_trabajo?: string;
  hora_entrada?: string;
  hora_salida?: string;
  descripcion_trabajo_realizado?: string;
  repuestos_utilizados?: RepuestoAlbaran[];
  estado_cierre?: 'Finalizado' | 'Presupuesto pendiente' | 'Otra visita';
  presupuesto_necesario?: number;
  dni_cliente?: string;
  nombre_firma?: string;
  firma_cliente?: string;
  observaciones?: string;
}

export interface AlbaranResponse {
  albaranes: Albaran[];
  total: number;
  pagina: number;
  por_pagina: number;
}

// Estados de cierre disponibles
export const ESTADOS_CIERRE_ALBARAN = [
  { valor: 'Finalizado', label: 'Finalizado', descripcion: 'Trabajo completado, listo para facturar' },
  { valor: 'Presupuesto pendiente', label: 'Presupuesto pendiente', descripcion: 'Se requiere presupuesto adicional' },
  { valor: 'Otra visita', label: 'Otra visita', descripcion: 'Se necesita realizar otra visita' }
] as const;

export type EstadoCierreAlbaran = typeof ESTADOS_CIERRE_ALBARAN[number]['valor'];
