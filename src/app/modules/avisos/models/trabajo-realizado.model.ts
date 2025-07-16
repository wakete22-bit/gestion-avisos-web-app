export interface TrabajoRealizado {
  id?: string;
  aviso_id: string;
  fecha_trabajo: string;
  hora_inicio: string;
  hora_fin: string;
  descripcion: string;
  repuestos: string[];
  estado: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface CrearTrabajoRequest {
  aviso_id: string;
  fecha_trabajo: string;
  hora_inicio: string;
  hora_fin: string;
  descripcion: string;
  repuestos: string[];
  estado: string;
}

export interface ActualizarTrabajoRequest {
  fecha_trabajo?: string;
  hora_inicio?: string;
  hora_fin?: string;
  descripcion?: string;
  repuestos?: string[];
  estado?: string;
}

export interface TrabajoResponse {
  trabajos: TrabajoRealizado[];
  total: number;
  pagina: number;
  por_pagina: number;
} 