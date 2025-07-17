export interface TrabajoRealizado {
  id?: string;
  aviso_id: string;
  fecha_trabajo: string;
  hora_inicio: string;
  hora_fin: string;
  descripcion: string;
  repuestos: string[];
  estado: 'Pendiente' | 'En curso' | 'Completado' | 'Cancelado';
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  // Relaciones opcionales
  aviso?: any;
  materiales?: MaterialTrabajo[];
}

export interface MaterialTrabajo {
  id: string;
  trabajo_id: string;
  material_id: string;
  cantidad_utilizada: number;
  precio_neto_al_momento: number;
  material?: any;
}

export interface CrearTrabajoRequest {
  aviso_id: string;
  fecha_trabajo: string;
  hora_inicio: string;
  hora_fin: string;
  descripcion: string;
  repuestos: string[];
  estado: 'Pendiente' | 'En curso' | 'Completado' | 'Cancelado';
  materiales?: Omit<MaterialTrabajo, 'id' | 'trabajo_id'>[];
}

export interface ActualizarTrabajoRequest {
  fecha_trabajo?: string;
  hora_inicio?: string;
  hora_fin?: string;
  descripcion?: string;
  repuestos?: string[];
  estado?: 'Pendiente' | 'En curso' | 'Completado' | 'Cancelado';
  materiales?: Omit<MaterialTrabajo, 'id' | 'trabajo_id'>[];
}

export interface TrabajoResponse {
  trabajos: TrabajoRealizado[];
  total: number;
  pagina: number;
  por_pagina: number;
}

export interface TrabajoCompleto {
  trabajo: TrabajoRealizado;
  materiales: MaterialTrabajo[];
} 