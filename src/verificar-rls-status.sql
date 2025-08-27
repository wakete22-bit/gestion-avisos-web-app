-- ========================================
-- VERIFICAR ESTADO ACTUAL DE RLS
-- ========================================
-- Este script te mostrará qué tablas tienen RLS habilitado y cuáles no

-- Verificar estado de RLS en todas las tablas
SELECT 
    schemaname,
    tablename,
    rowsecurity as "RLS Habilitado",
    CASE 
        WHEN rowsecurity = true THEN '🔒 RLS ACTIVO - Puede bloquear operaciones'
        WHEN rowsecurity = false THEN '✅ RLS DESHABILITADO - Operaciones permitidas'
        ELSE '❓ Estado desconocido'
    END as "Estado"
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- Verificar si hay políticas RLS creadas
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd as "Operación",
    permissive as "Permisiva"
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Verificar permisos de usuario en las tablas
SELECT 
    schemaname,
    tablename,
    tableowner as "Propietario",
    hasinsert as "Puede INSERT",
    hasselect as "Puede SELECT", 
    hasupdate as "Puede UPDATE",
    hasdelete as "Puede DELETE"
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Verificar restricciones de foreign key que podrían impedir eliminaciones
SELECT
    tc.table_name as "Tabla",
    kcu.column_name as "Columna",
    ccu.table_name AS "Tabla Referenciada",
    ccu.column_name AS "Columna Referenciada",
    rc.delete_rule as "Regla de Eliminación"
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
ORDER BY tc.table_name;
