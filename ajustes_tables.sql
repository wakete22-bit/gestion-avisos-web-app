-- Tablas para el módulo de ajustes
-- Ejecutar este archivo en tu base de datos PostgreSQL

-- Tabla de configuración de empresa
CREATE TABLE IF NOT EXISTS public.configuracion_empresa (
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

-- Tabla de configuración de facturación
CREATE TABLE IF NOT EXISTS public.configuracion_facturacion (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  iva_por_defecto numeric NOT NULL DEFAULT 21 CHECK (iva_por_defecto >= 0 AND iva_por_defecto <= 100),
  moneda text NOT NULL DEFAULT 'EUR',
  formato_numero_factura text NOT NULL DEFAULT 'FAC-{YEAR}-{NUMBER}',
  dias_vencimiento integer NOT NULL DEFAULT 30 CHECK (dias_vencimiento >= 1 AND dias_vencimiento <= 365),
  texto_pie_factura text,
  condiciones_pago text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT configuracion_facturacion_pkey PRIMARY KEY (id)
);

-- Tabla de configuración de notificaciones
CREATE TABLE IF NOT EXISTS public.configuracion_notificaciones (
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

-- Tabla de configuración de avisos
CREATE TABLE IF NOT EXISTS public.configuracion_avisos (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  tipos_urgencia text[] NOT NULL DEFAULT ARRAY['Baja', 'Media', 'Alta', 'Crítica'],
  estados_disponibles text[] NOT NULL DEFAULT ARRAY['Pendiente', 'En curso', 'Completado', 'Cancelado'],
  tiempo_maximo_respuesta integer NOT NULL DEFAULT 24 CHECK (tiempo_maximo_respuesta >= 1 AND tiempo_maximo_respuesta <= 168),
  asignacion_automatica boolean NOT NULL DEFAULT false,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT configuracion_avisos_pkey PRIMARY KEY (id)
);

-- Tabla de configuración del sistema
CREATE TABLE IF NOT EXISTS public.configuracion_sistema (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  backup_automatico boolean NOT NULL DEFAULT true,
  frecuencia_backup text NOT NULL DEFAULT 'diario' CHECK (frecuencia_backup IN ('diario', 'semanal', 'mensual')),
  retencion_backup_dias integer NOT NULL DEFAULT 30 CHECK (retencion_backup_dias >= 1 AND retencion_backup_dias <= 365),
  modo_mantenimiento boolean NOT NULL DEFAULT false,
  mensaje_mantenimiento text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT configuracion_sistema_pkey PRIMARY KEY (id)
);

-- Insertar configuraciones por defecto
INSERT INTO public.configuracion_empresa (nombre_empresa, cif, direccion, telefono, email) 
VALUES ('Mi Empresa', 'B12345678', 'Calle Ejemplo 123, 28001 Madrid', '+34 123 456 789', 'info@miempresa.com')
ON CONFLICT DO NOTHING;

INSERT INTO public.configuracion_facturacion (iva_por_defecto, moneda, formato_numero_factura, dias_vencimiento, texto_pie_factura, condiciones_pago)
VALUES (21, 'EUR', 'FAC-{YEAR}-{NUMBER}', 30, 'Gracias por confiar en nuestros servicios', 'Pago a 30 días')
ON CONFLICT DO NOTHING;

INSERT INTO public.configuracion_notificaciones (email_notificaciones, email_avisos_nuevos, email_facturas_generadas, email_recordatorios, sms_notificaciones, sms_avisos_urgentes)
VALUES (true, true, true, false, false, false)
ON CONFLICT DO NOTHING;

INSERT INTO public.configuracion_avisos (tipos_urgencia, estados_disponibles, tiempo_maximo_respuesta, asignacion_automatica)
VALUES (ARRAY['Baja', 'Media', 'Alta', 'Crítica'], ARRAY['Pendiente', 'En curso', 'Completado', 'Cancelado'], 24, false)
ON CONFLICT DO NOTHING;

INSERT INTO public.configuracion_sistema (backup_automatico, frecuencia_backup, retencion_backup_dias, modo_mantenimiento, mensaje_mantenimiento)
VALUES (true, 'diario', 30, false, 'Sistema en mantenimiento. Volveremos pronto.')
ON CONFLICT DO NOTHING;

-- Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_configuracion_empresa_fecha_actualizacion ON public.configuracion_empresa(fecha_actualizacion);
CREATE INDEX IF NOT EXISTS idx_configuracion_facturacion_fecha_actualizacion ON public.configuracion_facturacion(fecha_actualizacion);
CREATE INDEX IF NOT EXISTS idx_configuracion_notificaciones_fecha_actualizacion ON public.configuracion_notificaciones(fecha_actualizacion);
CREATE INDEX IF NOT EXISTS idx_configuracion_avisos_fecha_actualizacion ON public.configuracion_avisos(fecha_actualizacion);
CREATE INDEX IF NOT EXISTS idx_configuracion_sistema_fecha_actualizacion ON public.configuracion_sistema(fecha_actualizacion);

-- Comentarios para documentación
COMMENT ON TABLE public.configuracion_empresa IS 'Configuración de datos de la empresa para facturas y documentos';
COMMENT ON TABLE public.configuracion_facturacion IS 'Configuración de parámetros de facturación';
COMMENT ON TABLE public.configuracion_notificaciones IS 'Configuración de notificaciones por email y SMS';
COMMENT ON TABLE public.configuracion_avisos IS 'Configuración del sistema de avisos';
COMMENT ON TABLE public.configuracion_sistema IS 'Configuración avanzada del sistema'; 

-- Agregar campo notas_importantes a la tabla clientes
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS notas_importantes text;

-- Comentario sobre el campo
COMMENT ON COLUMN public.clientes.notas_importantes IS 'Notas importantes sobre el cliente para el equipo técnico'; 