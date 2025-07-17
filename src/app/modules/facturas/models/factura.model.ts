export interface Factura {
  id?: string;
  numero_factura: string;
  fecha_emision: string;
  cliente_id?: string;
  nombre_cliente: string;
  direccion_cliente: string;
  cif_cliente: string;
  email_cliente: string;
  aviso_id?: string;
  subtotal: number;
  iva: number;
  total: number;
  estado: 'Pendiente' | 'En curso' | 'Completado';
  pdf_url?: string;
  notas?: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface LineaFactura {
  id?: string;
  factura_id?: string;
  tipo: 'repuesto' | 'mano_obra' | 'desplazamiento';
  nombre: string;
  cantidad: number;
  precio_neto?: number;
  precio_pvp: number;
  descripcion?: string;
  fecha_creacion?: string;
}

export interface FacturaCompleta {
  factura: Factura;
  lineas: LineaFactura[];
}

export interface CrearFacturaRequest {
  numero_factura: string;
  fecha_emision: string;
  cliente_id?: string;
  nombre_cliente: string;
  direccion_cliente: string;
  cif_cliente: string;
  email_cliente: string;
  aviso_id?: string;
  subtotal: number;
  iva: number;
  total: number;
  estado: 'Pendiente' | 'En curso' | 'Completado';
  notas?: string;
  lineas: LineaFactura[];
}

export interface ActualizarFacturaRequest {
  numero_factura?: string;
  fecha_emision?: string;
  cliente_id?: string;
  nombre_cliente?: string;
  direccion_cliente?: string;
  cif_cliente?: string;
  email_cliente?: string;
  aviso_id?: string;
  subtotal?: number;
  iva?: number;
  total?: number;
  estado?: 'Pendiente' | 'En curso' | 'Completado';
  pdf_url?: string;
  notas?: string;
  lineas?: LineaFactura[];
}

export interface FacturaResponse {
  facturas: Factura[];
  total: number;
  pagina: number;
  por_pagina: number;
}

// Interfaces para el componente de listado
export interface FacturaLista {
  id: string;
  numero: string;
  estado: string;
  nombre: string;
  detalle: string;
  fecha: string;
  pvp: string;
} 