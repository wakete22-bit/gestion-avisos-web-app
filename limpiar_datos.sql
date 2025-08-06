-- ===========================================
-- COMANDOS PARA ELIMINAR EL CONTENIDO DE TODAS LAS TABLAS EXCEPTO USUARIOS Y ROLES
-- ===========================================

-- Eliminar contenido de tablas en orden (respetando foreign keys)
TRUNCATE TABLE public.materiales_trabajo CASCADE;
TRUNCATE TABLE public.materiales_presupuesto CASCADE;
TRUNCATE TABLE public.lineas_factura CASCADE;
TRUNCATE TABLE public.historial_flujo CASCADE;
TRUNCATE TABLE public.fotos_aviso CASCADE;
TRUNCATE TABLE public.trabajos_realizados CASCADE;
TRUNCATE TABLE public.presupuestos CASCADE;
TRUNCATE TABLE public.facturas CASCADE;
TRUNCATE TABLE public.inventario CASCADE;
TRUNCATE TABLE public.avisos CASCADE;
TRUNCATE TABLE public.clientes CASCADE;

-- Eliminar contenido de tablas de configuración
TRUNCATE TABLE public.configuracion_avisos CASCADE;
TRUNCATE TABLE public.configuracion_empresa CASCADE;
TRUNCATE TABLE public.configuracion_facturacion CASCADE;
TRUNCATE TABLE public.configuracion_flujo CASCADE;
TRUNCATE TABLE public.configuracion_notificaciones CASCADE;
TRUNCATE TABLE public.configuracion_sistema CASCADE;

-- NOTA: Las tablas usuarios y roles mantienen su contenido
-- TRUNCATE TABLE public.usuarios CASCADE;  -- NO EJECUTAR
-- TRUNCATE TABLE public.roles CASCADE;     -- NO EJECUTAR 