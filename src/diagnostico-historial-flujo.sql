-- Script de diagnóstico para identificar el problema con historial_flujo

-- ========================================
-- 1. VERIFICAR ESTRUCTURA DE LA TABLA
-- ========================================

-- Verificar que la tabla historial_flujo existe y tiene la estructura correcta
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'historial_flujo'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- ========================================
-- 2. BUSCAR FUNCIONES QUE USAN HISTORIAL_FLUJO
-- ========================================

-- Buscar todas las funciones que mencionan historial_flujo
SELECT 
    n.nspname as schema_name,
    p.proname as function_name,
    pg_get_functiondef(p.oid) as function_definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE pg_get_functiondef(p.oid) ILIKE '%historial_flujo%'
AND n.nspname = 'public'
ORDER BY p.proname;

-- ========================================
-- 3. BUSCAR TRIGGERS EN PRESUPUESTOS
-- ========================================

-- Buscar todos los triggers en la tabla presupuestos
SELECT 
    t.tgname as trigger_name,
    c.relname as table_name,
    pg_get_triggerdef(t.oid) as trigger_definition
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
WHERE c.relname = 'presupuestos'
AND t.tgisinternal = false
ORDER BY t.tgname;

-- ========================================
-- 4. BUSCAR FUNCIONES QUE USAN LA COLUMNA 'accion'
-- ========================================

-- Buscar funciones que mencionan la columna 'accion' (incorrecta)
SELECT 
    n.nspname as schema_name,
    p.proname as function_name,
    pg_get_functiondef(p.oid) as function_definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE pg_get_functiondef(p.oid) ILIKE '%accion%'
AND pg_get_functiondef(p.oid) ILIKE '%historial_flujo%'
AND n.nspname = 'public'
ORDER BY p.proname;

-- ========================================
-- 5. VERIFICAR SI EXISTEN FUNCIONES PROBLEMÁTICAS
-- ========================================

-- Verificar si existen las funciones que podrían estar causando el problema
SELECT 
    proname as function_name,
    pronargs as num_args,
    proargnames as arg_names,
    proargtypes::regtype[] as arg_types
FROM pg_proc 
WHERE proname IN (
    'insertar_historial_flujo',
    'trigger_historial_presupuesto',
    'trigger_historial_albaran',
    'trigger_historial_aviso'
)
ORDER BY proname;

-- ========================================
-- 6. VERIFICAR TRIGGERS ACTIVOS
-- ========================================

-- Verificar qué triggers están activos en presupuestos
SELECT 
    t.tgname as trigger_name,
    t.tgenabled as enabled,
    t.tgisinternal as is_internal,
    pg_get_triggerdef(t.oid) as definition
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
WHERE c.relname = 'presupuestos'
AND t.tgisinternal = false;
