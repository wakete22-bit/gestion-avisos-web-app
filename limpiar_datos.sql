-- Script para limpiar todos los datos excepto usuarios y roles
-- IMPORTANTE: Ejecutar con precaución, esto eliminará TODOS los datos de las tablas especificadas

-- Desactivar temporalmente las restricciones de clave foránea para facilitar la limpieza
SET session_replication_role = replica;

-- 1. Eliminar datos de tablas que dependen de otras (orden inverso de dependencias)

-- Tablas de materiales y trabajo
DELETE FROM public.materiales_trabajo;
DELETE FROM public.lineas_factura;

-- Tablas de albaranes y presupuestos
DELETE FROM public.presupuestos;
DELETE FROM public.albaranes;

-- Tabla de trabajos realizados
DELETE FROM public.trabajos_realizados;

-- Tabla de historial de flujo
DELETE FROM public.historial_flujo;

-- Tabla de fotos de avisos
DELETE FROM public.fotos_aviso;

-- Tabla de facturas
DELETE FROM public.facturas;

-- Tabla de inventario
DELETE FROM public.inventario;

-- Tabla de avisos
DELETE FROM public.avisos;

-- Tabla de clientes
DELETE FROM public.clientes;

-- Tablas de configuración
DELETE FROM public.configuracion_avisos;
DELETE FROM public.configuracion_empresa;
DELETE FROM public.configuracion_facturacion;
DELETE FROM public.configuracion_flujo;
DELETE FROM public.configuracion_notificaciones;
DELETE FROM public.configuracion_sistema;

-- 2. Reiniciar las secuencias de auto-incremento (si las hubiera)
-- Nota: En PostgreSQL con UUIDs, esto no es necesario, pero se incluye por completitud

-- 3. Reactivar las restricciones de clave foránea
SET session_replication_role = DEFAULT;

-- 4. Verificar que solo quedan usuarios y roles
-- SELECT schemaname, tablename, n_tup_ins as registros 
-- FROM pg_stat_user_tables 
-- WHERE schemaname = 'public' 
-- ORDER BY tablename;

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE 'Limpieza completada. Solo se han conservado los datos de usuarios y roles.';
    RAISE NOTICE 'Se han eliminado todos los datos de las siguientes tablas:';
    RAISE NOTICE '- avisos, clientes, facturas, inventario, trabajos_realizados';
    RAISE NOTICE '- albaranes, presupuestos, materiales_trabajo, lineas_factura';
    RAISE NOTICE '- historial_flujo, fotos_aviso, y todas las tablas de configuración';
END $$;
