export interface Tecnico {
  id: string;
  nombre_completo: string;
  email: string;
  telefono?: string;
  rol_id: string;
  rol?: {
    id: string;
    nombre_rol: string;
  };
  es_activo: boolean;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}

export interface CrearTecnicoRequest {
  nombre_completo: string;
  email: string;
  password: string;
  telefono?: string;
  rol_id: string;
  es_activo?: boolean;
}

export interface ActualizarTecnicoRequest {
  nombre_completo?: string;
  email?: string;
  telefono?: string;
  rol_id?: string;
  es_activo?: boolean;
}

export interface TecnicoResponse {
  tecnicos: Tecnico[];
  total: number;
  pagina: number;
  por_pagina: number;
} 