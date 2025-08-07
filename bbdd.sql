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
  estado text NOT NULL DEFAULT 'Pendiente'::text CHECK (estado = ANY (ARRAY['No visitado'::text, 'Visitado pendiente'::text, 'Pendiente de presupuesto'::text, 'En curso'::text, 'Pendiente'::text, 'Completado'::text, 'Cancelado'::text])),
  latitud numeric,
  longitud numeric,
  fecha_finalizacion timestamp with time zone,
  requiere_presupuesto boolean DEFAULT false,
  requiere_nueva_visita boolean DEFAULT false,
  tipo text DEFAULT 'correctivo'::text,
  nombre_contacto text,
  es_urgente boolean DEFAULT false,
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT avisos_pkey PRIMARY KEY (id),
  CONSTRAINT avisos_tecnico_asignado_id_fkey FOREIGN KEY (tecnico_asignado_id) REFERENCES public.usuarios(id),
  CONSTRAINT avisos_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id)
);
CREATE TABLE public.clientes (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nombre_completo text NOT NULL,
  direccion text,
  telefono_contacto text,
  email text,
  nivel_urgencia_habitual text,
  es_activo boolean DEFAULT true,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  notas_importantes text,
  CONSTRAINT clientes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.configuracion_avisos (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  tipos_urgencia ARRAY NOT NULL DEFAULT ARRAY['Baja'::text, 'Media'::text, 'Alta'::text, 'Crítica'::text],
  estados_disponibles ARRAY NOT NULL DEFAULT ARRAY['Pendiente'::text, 'En curso'::text, 'Completado'::text, 'Cancelado'::text],
  tiempo_maximo_respuesta integer NOT NULL DEFAULT 24 CHECK (tiempo_maximo_respuesta >= 1 AND tiempo_maximo_respuesta <= 168),
  asignacion_automatica boolean NOT NULL DEFAULT false,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT configuracion_avisos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.configuracion_empresa (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nombre_empresa text NOT NULL,
  cif text NOT NULL,
  direccion text NOT NULL,
  telefono text NOT NULL,
  email text NOT NULL,
  web text,
  logo_url text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT configuracion_empresa_pkey PRIMARY KEY (id)
);
CREATE TABLE public.configuracion_facturacion (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  iva_por_defecto numeric NOT NULL DEFAULT 21 CHECK (iva_por_defecto >= 0::numeric AND iva_por_defecto <= 100::numeric),
  moneda text NOT NULL DEFAULT 'EUR'::text,
  formato_numero_factura text NOT NULL DEFAULT 'FAC-{YEAR}-{NUMBER}'::text,
  dias_vencimiento integer NOT NULL DEFAULT 30 CHECK (dias_vencimiento >= 1 AND dias_vencimiento <= 365),
  texto_pie_factura text,
  condiciones_pago text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT configuracion_facturacion_pkey PRIMARY KEY (id)
);
CREATE TABLE public.configuracion_flujo (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  precio_hora_mano_obra numeric NOT NULL DEFAULT 50.00,
  iva_por_defecto numeric NOT NULL DEFAULT 21.00,
  generar_factura_automatica boolean NOT NULL DEFAULT false,
  requiere_aprobacion_presupuesto boolean NOT NULL DEFAULT true,
  notificar_cambios_estado boolean NOT NULL DEFAULT true,
  plantilla_email_presupuesto text,
  plantilla_email_factura text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT configuracion_flujo_pkey PRIMARY KEY (id)
);
CREATE TABLE public.configuracion_notificaciones (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  email_notificaciones boolean NOT NULL DEFAULT true,
  email_avisos_nuevos boolean NOT NULL DEFAULT true,
  email_facturas_generadas boolean NOT NULL DEFAULT true,
  email_recordatorios boolean NOT NULL DEFAULT false,
  sms_notificaciones boolean NOT NULL DEFAULT false,
  sms_avisos_urgentes boolean NOT NULL DEFAULT false,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT configuracion_notificaciones_pkey PRIMARY KEY (id)
);
CREATE TABLE public.configuracion_sistema (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  backup_automatico boolean NOT NULL DEFAULT true,
  frecuencia_backup text NOT NULL DEFAULT 'diario'::text CHECK (frecuencia_backup = ANY (ARRAY['diario'::text, 'semanal'::text, 'mensual'::text])),
  retencion_backup_dias integer NOT NULL DEFAULT 30 CHECK (retencion_backup_dias >= 1 AND retencion_backup_dias <= 365),
  modo_mantenimiento boolean NOT NULL DEFAULT false,
  mensaje_mantenimiento text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT configuracion_sistema_pkey PRIMARY KEY (id)
);
CREATE TABLE public.facturas (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  numero_factura text NOT NULL UNIQUE,
  fecha_emision date NOT NULL,
  cliente_id uuid,
  nombre_cliente text NOT NULL,
  direccion_cliente text NOT NULL,
  cif_cliente text NOT NULL,
  email_cliente text NOT NULL,
  aviso_id uuid,
  subtotal numeric NOT NULL DEFAULT 0,
  iva numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  estado text NOT NULL DEFAULT 'Pendiente'::text CHECK (estado = ANY (ARRAY['Pendiente'::text, 'En curso'::text, 'Completado'::text])),
  pdf_url text,
  notas text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT facturas_pkey PRIMARY KEY (id),
  CONSTRAINT facturas_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id),
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
CREATE TABLE public.historial_flujo (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  aviso_id uuid NOT NULL,
  estado_anterior text,
  estado_nuevo text NOT NULL,
  accion_realizada text NOT NULL,
  usuario_id uuid,
  presupuesto_id uuid,
  factura_id uuid,
  trabajo_id uuid,
  observaciones text,
  fecha_cambio timestamp with time zone DEFAULT now(),
  CONSTRAINT historial_flujo_pkey PRIMARY KEY (id),
  CONSTRAINT historial_flujo_trabajo_id_fkey FOREIGN KEY (trabajo_id) REFERENCES public.trabajos_realizados(id),
  CONSTRAINT historial_flujo_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id),
  CONSTRAINT historial_flujo_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id),
  CONSTRAINT historial_flujo_factura_id_fkey FOREIGN KEY (factura_id) REFERENCES public.facturas(id),
  CONSTRAINT historial_flujo_presupuesto_id_fkey FOREIGN KEY (presupuesto_id) REFERENCES public.presupuestos(id)
);
CREATE TABLE public.inventario (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nombre text NOT NULL UNIQUE,
  unidad text NOT NULL,
  cantidad_disponible numeric NOT NULL DEFAULT 0 CHECK (cantidad_disponible >= 0::numeric),
  precio_neto numeric NOT NULL CHECK (precio_neto >= 0::numeric),
  codigo text UNIQUE,
  descripcion text,
  pvp numeric CHECK (pvp >= 0::numeric),
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT inventario_pkey PRIMARY KEY (id)
);
CREATE TABLE public.lineas_factura (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  factura_id uuid NOT NULL,
  tipo text NOT NULL CHECK (tipo = ANY (ARRAY['repuesto'::text, 'mano_obra'::text, 'desplazamiento'::text])),
  nombre text NOT NULL,
  cantidad numeric NOT NULL DEFAULT 1,
  precio_neto numeric,
  precio_pvp numeric NOT NULL DEFAULT 0,
  descripcion text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  CONSTRAINT lineas_factura_pkey PRIMARY KEY (id),
  CONSTRAINT lineas_factura_factura_id_fkey FOREIGN KEY (factura_id) REFERENCES public.facturas(id)
);
CREATE TABLE public.materiales_presupuesto (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  presupuesto_id uuid NOT NULL,
  material_id uuid NOT NULL,
  cantidad_estimada numeric NOT NULL CHECK (cantidad_estimada > 0::numeric),
  precio_neto_al_momento numeric NOT NULL,
  CONSTRAINT materiales_presupuesto_pkey PRIMARY KEY (id),
  CONSTRAINT materiales_presupuesto_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.inventario(id),
  CONSTRAINT materiales_presupuesto_presupuesto_id_fkey FOREIGN KEY (presupuesto_id) REFERENCES public.presupuestos(id)
);
CREATE TABLE public.materiales_trabajo (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  trabajo_id uuid NOT NULL,
  material_id uuid NOT NULL,
  cantidad_utilizada numeric NOT NULL CHECK (cantidad_utilizada > 0::numeric),
  precio_neto_al_momento numeric NOT NULL,
  CONSTRAINT materiales_trabajo_pkey PRIMARY KEY (id),
  CONSTRAINT materiales_trabajo_trabajo_id_fkey FOREIGN KEY (trabajo_id) REFERENCES public.trabajos_realizados(id),
  CONSTRAINT materiales_trabajo_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.inventario(id)
);
CREATE TABLE public.presupuestos (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  aviso_id uuid NOT NULL UNIQUE,
  fecha_creacion timestamp with time zone DEFAULT now(),
  horas_estimadas numeric,
  total_estimado numeric,
  pdf_url text,
  estado text NOT NULL DEFAULT 'Pendiente'::text CHECK (estado = ANY (ARRAY['Pendiente'::text, 'En curso'::text, 'Completado'::text, 'Facturado'::text, 'Cancelado'::text])),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT presupuestos_pkey PRIMARY KEY (id),
  CONSTRAINT presupuestos_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
);
CREATE TABLE public.roles (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  nombre_rol text NOT NULL UNIQUE,
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.trabajos_realizados (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  aviso_id uuid NOT NULL,
  fecha_trabajo date NOT NULL,
  hora_inicio time without time zone NOT NULL,
  hora_fin time without time zone NOT NULL,
  descripcion text NOT NULL,
  repuestos ARRAY DEFAULT '{}'::text[],
  estado text NOT NULL DEFAULT 'Pendiente'::text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT trabajos_realizados_pkey PRIMARY KEY (id),
  CONSTRAINT trabajos_realizados_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
);
CREATE TABLE public.usuarios (
  id uuid NOT NULL,
  nombre_completo text NOT NULL,
  email text NOT NULL UNIQUE,
  telefono text,
  rol_id uuid NOT NULL,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  es_activo boolean NOT NULL DEFAULT true,
  fecha_ultimo_acceso timestamp with time zone,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id),
  CONSTRAINT usuarios_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id),
  CONSTRAINT usuarios_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);