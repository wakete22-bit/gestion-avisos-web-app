-- Script para insertar configuraciones iniciales en las tablas de configuración
-- Este script debe ejecutarse después de crear las tablas

-- Insertar configuración de empresa por defecto
INSERT INTO public.configuracion_empresa (
  id,
  nombre_empresa,
  cif,
  direccion,
  telefono,
  email,
  web,
  logo_url,
  precio_hora_mano_obra,
  fecha_creacion,
  fecha_actualizacion
) VALUES (
  uuid_generate_v4(),
  'Mi Empresa S.L.',
  'B12345678',
  'Calle Principal 123, 28001 Madrid',
  '+34 91 123 4567',
  'info@miempresa.com',
  'https://www.miempresa.com',
  '',
  50.00,
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Insertar configuración de facturación por defecto
INSERT INTO public.configuracion_facturacion (
  id,
  iva_por_defecto,
  moneda,
  formato_numero_factura,
  dias_vencimiento,
  texto_pie_factura,
  condiciones_pago,
  fecha_creacion,
  fecha_actualizacion
) VALUES (
  uuid_generate_v4(),
  21,
  'EUR',
  'FAC-{YEAR}-{NUMBER}',
  30,
  'Gracias por confiar en nuestros servicios',
  'Pago a 30 días',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Insertar configuración de notificaciones por defecto
INSERT INTO public.configuracion_notificaciones (
  id,
  email_notificaciones,
  email_avisos_nuevos,
  email_facturas_generadas,
  email_recordatorios,
  sms_notificaciones,
  sms_avisos_urgentes,
  fecha_creacion,
  fecha_actualizacion
) VALUES (
  uuid_generate_v4(),
  true,
  true,
  true,
  false,
  false,
  false,
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Insertar configuración de avisos por defecto
INSERT INTO public.configuracion_avisos (
  id,
  tipos_urgencia,
  estados_disponibles,
  tiempo_maximo_respuesta,
  asignacion_automatica,
  fecha_creacion,
  fecha_actualizacion
) VALUES (
  uuid_generate_v4(),
  ARRAY['Baja', 'Media', 'Alta', 'Crítica'],
  ARRAY['Pendiente', 'En curso', 'Completado', 'Cancelado'],
  24,
  false,
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Insertar configuración del sistema por defecto
INSERT INTO public.configuracion_sistema (
  id,
  backup_automatico,
  frecuencia_backup,
  retencion_backup_dias,
  modo_mantenimiento,
  mensaje_mantenimiento,
  fecha_creacion,
  fecha_actualizacion
) VALUES (
  uuid_generate_v4(),
  true,
  'diario',
  30,
  false,
  'Sistema en mantenimiento. Volveremos pronto.',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Verificar que se insertaron los datos
SELECT 'Configuraciones insertadas correctamente' as resultado;
SELECT 'Empresa' as tabla, count(*) as registros FROM configuracion_empresa
UNION ALL
SELECT 'Facturación' as tabla, count(*) as registros FROM configuracion_facturacion
UNION ALL
SELECT 'Notificaciones' as tabla, count(*) as registros FROM configuracion_notificaciones
UNION ALL
SELECT 'Avisos' as tabla, count(*) as registros FROM configuracion_avisos
UNION ALL
SELECT 'Sistema' as tabla, count(*) as registros FROM configuracion_sistema;
