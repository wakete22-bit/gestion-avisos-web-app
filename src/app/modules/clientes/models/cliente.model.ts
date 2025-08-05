export interface Cliente {
  id: string;
  nombre_completo: string;
  direccion?: string;
  telefono_contacto?: string;
  email?: string;
  nivel_urgencia_habitual?: string;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
  es_activo: boolean;
  notas_importantes?: string;
}

export interface CrearClienteRequest {
  nombre_completo: string;
  direccion?: string;
  telefono_contacto?: string;
  email?: string;
  nivel_urgencia_habitual?: string;
  es_activo?: boolean;
  notas_importantes?: string;
}

export interface ActualizarClienteRequest {
  nombre_completo?: string;
  direccion?: string;
  telefono_contacto?: string;
  email?: string;
  nivel_urgencia_habitual?: string;
  es_activo?: boolean;
  notas_importantes?: string;
}

export interface ClienteResponse {
  clientes: Cliente[];
  total: number;
  pagina: number;
  por_pagina: number;
} 