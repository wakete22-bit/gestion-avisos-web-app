export interface Inventario {
  id: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
  cantidad_disponible: number;
  unidad: string;
  precio_neto: number;
  pvp: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface CrearInventarioRequest {
  codigo: string;
  nombre: string;
  descripcion?: string;
  cantidad_disponible: number;
  unidad: string;
  precio_neto: number;
  pvp: number;
}

export interface ActualizarInventarioRequest {
  codigo?: string;
  nombre?: string;
  descripcion?: string;
  cantidad_disponible?: number;
  unidad?: string;
  precio_neto?: number;
  pvp?: number;
}

export interface InventarioResponse {
  inventario: Inventario[];
  total: number;
  pagina: number;
  por_pagina: number;
} 