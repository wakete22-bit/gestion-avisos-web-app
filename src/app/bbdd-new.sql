-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.albaranes (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  aviso_id uuid NOT NULL,
  fecha_cierre timestamp with time zone DEFAULT now(),
  hora_entrada time without time zone,
  hora_salida time without time zone,
  descripcion_trabajo_realizado text NOT NULL,
  repuestos_utilizados ARRAY DEFAULT '{}'::text[],
  estado_cierre text NOT NULL CHECK (estado_cierre = ANY (ARRAY['Finalizado'::text, 'Presupuesto pendiente'::text, 'Otra visita'::text])),
  presupuesto_necesario numeric DEFAULT 0,
  dni_cliente text,
  nombre_firma text,
  firma_url text,
  observaciones text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  firma_cliente text,
  fecha_trabajo date NOT NULL,
  CONSTRAINT albaranes_pkey PRIMARY KEY (id),
  CONSTRAINT albaranes_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
);
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
  estado text NOT NULL DEFAULT 'Pendiente'::text CHECK (estado = ANY (ARRAY['Pendiente'::text, 'En curso'::text, 'Pendiente de presupuesto'::text, 'Listo para facturar'::text, 'Completado'::text, 'Cancelado'::text])),
  latitud numeric,
  longitud numeric,
  fecha_finalizacion timestamp with time zone,
  requiere_presupuesto boolean DEFAULT false,
  requiere_nueva_visita boolean DEFAULT false,
  tipo text DEFAULT 'correctivo'::text,
  nombre_contacto text,
  es_urgente boolean DEFAULT false,
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  numero_secuencial integer NOT NULL DEFAULT nextval('avisos_numero_secuencial_seq'::regclass),
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
  cif text,
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
  notificar_cambios_estado boolean NOT NULL DEFAULT true,
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
  factura_id uuid,
  observaciones text,
  fecha_cambio timestamp with time zone DEFAULT now(),
  albaran_id uuid,
  CONSTRAINT historial_flujo_pkey PRIMARY KEY (id),
  CONSTRAINT historial_flujo_factura_id_fkey FOREIGN KEY (factura_id) REFERENCES public.facturas(id),
  CONSTRAINT historial_flujo_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id),
  CONSTRAINT historial_flujo_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id),
  CONSTRAINT fk_historial_flujo_albaran FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id)
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
CREATE TABLE public.presupuestos (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  albaran_id uuid NOT NULL,
  aviso_id uuid NOT NULL,
  fecha_creacion timestamp with time zone DEFAULT now(),
  horas_estimadas numeric DEFAULT 0,
  horas_desplazamiento numeric DEFAULT 0,
  total_estimado numeric DEFAULT 0,
  materiales_estimados jsonb DEFAULT '[]'::jsonb,
  estado text NOT NULL DEFAULT 'Pendiente'::text CHECK (estado = ANY (ARRAY['Pendiente'::text, 'Aprobado'::text, 'Rechazado'::text, 'Cancelado'::text])),
  pdf_url text,
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT presupuestos_pkey PRIMARY KEY (id),
  CONSTRAINT presupuestos_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id),
  CONSTRAINT presupuestos_albaran_id_fkey FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id)
);
CREATE TABLE public.repuestos_albaran (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  albaran_id uuid NOT NULL,
  nombre text NOT NULL,
  cantidad numeric NOT NULL DEFAULT 1 CHECK (cantidad > 0::numeric),
  precio_neto numeric NOT NULL DEFAULT 0,
  precio_pvp numeric NOT NULL DEFAULT 0,
  unidad text NOT NULL DEFAULT 'unidad'::text,
  codigo text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  CONSTRAINT repuestos_albaran_pkey PRIMARY KEY (id),
  CONSTRAINT repuestos_albaran_albaran_id_fkey FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id)
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
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  es_activo boolean NOT NULL DEFAULT true,
  fecha_ultimo_acceso timestamp with time zone,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id),
  CONSTRAINT usuarios_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id),
  CONSTRAINT usuarios_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id)
);