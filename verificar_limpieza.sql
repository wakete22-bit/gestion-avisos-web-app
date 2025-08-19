-- Script para verificar que solo quedan datos en las tablas usuarios y roles
-- Ejecutar después de la limpieza para confirmar el resultado

-- 1. Mostrar todas las tablas del esquema public y su número de registros
SELECT 
    schemaname,
    tablename,
    n_tup_ins as registros_insertados,
    n_tup_upd as registros_actualizados,
    n_tup_del as registros_eliminados
FROM pg_stat_user_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- 2. Verificar específicamente que las tablas principales están vacías
SELECT 'avisos' as tabla, COUNT(*) as registros FROM public.avisos
UNION ALL
SELECT 'clientes', COUNT(*) FROM public.clientes
UNION ALL
SELECT 'facturas', COUNT(*) FROM public.facturas
UNION ALL
SELECT 'inventario', COUNT(*) FROM public.inventario
UNION ALL
SELECT 'trabajos_realizados', COUNT(*) FROM public.trabajos_realizados
UNION ALL
SELECT 'albaranes', COUNT(*) FROM public.albaranes
UNION ALL
SELECT 'presupuestos', COUNT(*) FROM public.presupuestos
UNION ALL
SELECT 'materiales_trabajo', COUNT(*) FROM public.materiales_trabajo
UNION ALL
SELECT 'lineas_factura', COUNT(*) FROM public.lineas_factura
UNION ALL
SELECT 'historial_flujo', COUNT(*) FROM public.historial_flujo
UNION ALL
SELECT 'fotos_aviso', COUNT(*) FROM public.fotos_aviso
ORDER BY tabla;

-- 3. Verificar que las tablas de usuarios y roles tienen datos
SELECT 'usuarios' as tabla, COUNT(*) as registros FROM public.usuarios
UNION ALL
SELECT 'roles', COUNT(*) FROM public.roles
ORDER BY tabla;

-- 4. Mostrar un resumen
DO $$
DECLARE
    total_tablas INTEGER;
    tablas_vacias INTEGER;
    tablas_con_datos INTEGER;
BEGIN
    -- Contar tablas vacías
    SELECT COUNT(*) INTO tablas_vacias
    FROM pg_stat_user_tables 
    WHERE schemaname = 'public' AND n_tup_ins = 0;
    
    -- Contar tablas con datos
    SELECT COUNT(*) INTO tablas_con_datos
    FROM pg_stat_user_tables 
    WHERE schemaname = 'public' AND n_tup_ins > 0;
    
    -- Total de tablas
    SELECT COUNT(*) INTO total_tablas
    FROM pg_stat_user_tables 
    WHERE schemaname = 'public';
    
    RAISE NOTICE 'RESUMEN DE LA LIMPIEZA:';
    RAISE NOTICE 'Total de tablas: %', total_tablas;
    RAISE NOTICE 'Tablas vacías: %', tablas_vacias;
    RAISE NOTICE 'Tablas con datos: %', tablas_con_datos;
    
    IF tablas_con_datos = 2 THEN
        RAISE NOTICE '✓ LIMPIEZA EXITOSA: Solo quedan datos en usuarios y roles';
    ELSE
        RAISE NOTICE '⚠ ADVERTENCIA: Hay más tablas con datos de las esperadas';
    END IF;
END $$;
