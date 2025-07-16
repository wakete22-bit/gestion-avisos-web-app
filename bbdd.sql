-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.avisos (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  cliente_id uuid NOT NULL,
  tecnico_asignado_id uuid,
  fecha_creacion timestamp with time zone DEFAULT now(),
  nombre_cliente_aviso text,
  direccion_cliente_aviso text,
  telefono_cliente_aviso text,
  urgencia text NOT NULL,
  descripcion_problema text NOT NULL,
  estado text NOT NULL DEFAULT 'Pendiente'::text,
  latitud numeric,
  longitud numeric,
  fecha_finalizacion timestamp with time zone,
  requiere_presupuesto boolean DEFAULT false,
  requiere_nueva_visita boolean DEFAULT false,
  CONSTRAINT avisos_pkey PRIMARY KEY (id),
  CONSTRAINT avisos_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id),
  CONSTRAINT avisos_tecnico_asignado_id_fkey FOREIGN KEY (tecnico_asignado_id) REFERENCES public.usuarios(id)
);
CREATE TABLE public.clientes (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nombre_completo text NOT NULL,
  direccion text,
  telefono_contacto text,
  email text,
  nivel_urgencia_habitual text,
  CONSTRAINT clientes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.facturas (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  aviso_id uuid NOT NULL UNIQUE,
  fecha_creacion timestamp with time zone DEFAULT now(),
  total_factura numeric NOT NULL,
  pdf_url text,
  estado text NOT NULL DEFAULT 'Pendiente'::text,
  CONSTRAINT facturas_pkey PRIMARY KEY (id),
  CONSTRAINT facturas_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
);
CREATE TABLE public.fotos_aviso (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  aviso_id uuid NOT NULL,
  url text NOT NULL,
  descripcion text,
  fecha_subida timestamp with time zone DEFAULT now(),
  CONSTRAINT fotos_aviso_pkey PRIMARY KEY (id),
  CONSTRAINT fotos_aviso_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
);
CREATE TABLE public.inventario (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nombre_producto text NOT NULL UNIQUE,
  unidad text NOT NULL,
  cantidad_disponible numeric NOT NULL DEFAULT 0 CHECK (cantidad_disponible >= 0::numeric),
  precio_unitario numeric NOT NULL CHECK (precio_unitario >= 0::numeric),
  CONSTRAINT inventario_pkey PRIMARY KEY (id)
);
CREATE TABLE public.materiales_parte_trabajo (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  parte_trabajo_id uuid NOT NULL,
  material_id uuid NOT NULL,
  cantidad_utilizada numeric NOT NULL CHECK (cantidad_utilizada > 0::numeric),
  precio_unitario_al_momento numeric NOT NULL,
  CONSTRAINT materiales_parte_trabajo_pkey PRIMARY KEY (id),
  CONSTRAINT materiales_parte_trabajo_parte_trabajo_id_fkey FOREIGN KEY (parte_trabajo_id) REFERENCES public.partes_trabajo(id),
  CONSTRAINT materiales_parte_trabajo_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.inventario(id)
);
CREATE TABLE public.materiales_presupuesto (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  presupuesto_id uuid NOT NULL,
  material_id uuid NOT NULL,
  cantidad_estimada numeric NOT NULL CHECK (cantidad_estimada > 0::numeric),
  precio_unitario_al_momento numeric NOT NULL,
  CONSTRAINT materiales_presupuesto_pkey PRIMARY KEY (id),
  CONSTRAINT materiales_presupuesto_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.inventario(id),
  CONSTRAINT materiales_presupuesto_presupuesto_id_fkey FOREIGN KEY (presupuesto_id) REFERENCES public.presupuestos(id)
);
CREATE TABLE public.partes_trabajo (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  aviso_id uuid NOT NULL UNIQUE,
  tecnico_id uuid NOT NULL,
  hora_entrada timestamp with time zone NOT NULL,
  hora_salida timestamp with time zone NOT NULL,
  descripcion_intervencion text NOT NULL,
  firma_cliente_url text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  CONSTRAINT partes_trabajo_pkey PRIMARY KEY (id),
  CONSTRAINT partes_trabajo_tecnico_id_fkey FOREIGN KEY (tecnico_id) REFERENCES public.usuarios(id),
  CONSTRAINT partes_trabajo_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
);
CREATE TABLE public.presupuestos (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  aviso_id uuid NOT NULL UNIQUE,
  fecha_creacion timestamp with time zone DEFAULT now(),
  horas_estimadas numeric,
  total_estimado numeric,
  pdf_url text,
  estado text NOT NULL DEFAULT 'Pendiente'::text,
  CONSTRAINT presupuestos_pkey PRIMARY KEY (id),
  CONSTRAINT presupuestos_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
);
CREATE TABLE public.roles (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nombre_rol text NOT NULL UNIQUE,
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.usuarios (
  id uuid NOT NULL,
  nombre_completo text NOT NULL,
  email text NOT NULL UNIQUE,
  telefono text,
  rol_id uuid NOT NULL,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id),
  CONSTRAINT usuarios_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id),
  CONSTRAINT usuarios_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);