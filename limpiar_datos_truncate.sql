-- Script alternativo usando TRUNCATE CASCADE para limpiar todos los datos excepto usuarios y roles
-- IMPORTANTE: Ejecutar con precaución, esto eliminará TODOS los datos de las tablas especificadas
-- TRUNCATE es más rápido que DELETE pero no se puede hacer rollback

-- Opción 1: TRUNCATE CASCADE (más rápido, no se puede hacer rollback)
-- Desactivar temporalmente las restricciones de clave foránea
SET session_replication_role = replica;

-- Truncar todas las tablas excepto usuarios y roles
-- El orden no importa con TRUNCATE CASCADE ya que maneja las dependencias automáticamente

TRUNCATE TABLE public.materiales_trabajo CASCADE;
TRUNCATE TABLE public.lineas_factura CASCADE;
TRUNCATE TABLE public.presupuestos CASCADE;
TRUNCATE TABLE public.albaranes CASCADE;
TRUNCATE TABLE public.trabajos_realizados CASCADE;
TRUNCATE TABLE public.historial_flujo CASCADE;
TRUNCATE TABLE public.fotos_aviso CASCADE;
TRUNCATE TABLE public.facturas CASCADE;
TRUNCATE TABLE public.inventario CASCADE;
TRUNCATE TABLE public.avisos CASCADE;
TRUNCATE TABLE public.clientes CASCADE;
TRUNCATE TABLE public.configuracion_avisos CASCADE;
TRUNCATE TABLE public.configuracion_empresa CASCADE;
TRUNCATE TABLE public.configuracion_facturacion CASCADE;
TRUNCATE TABLE public.configuracion_flujo CASCADE;
TRUNCATE TABLE public.configuracion_notificaciones CASCADE;
TRUNCATE TABLE public.configuracion_sistema CASCADE;

-- Reactivar las restricciones de clave foránea
SET session_replication_role = DEFAULT;

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE 'Limpieza completada usando TRUNCATE CASCADE. Solo se han conservado los datos de usuarios y roles.';
    RAISE NOTICE 'ADVERTENCIA: TRUNCATE no se puede hacer rollback. Los datos han sido eliminados permanentemente.';
END $$;
