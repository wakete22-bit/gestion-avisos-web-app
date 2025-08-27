-- ========================================
-- DIAGNÓSTICO RÁPIDO: PROBLEMA DE ELIMINACIÓN
-- ========================================
-- Ejecuta este script para identificar rápidamente el problema

-- 1. VERIFICAR ESTADO DE RLS (Row Level Security)
SELECT 
    'RLS Status' as "Verificación",
    tablename as "Tabla",
    CASE 
        WHEN rowsecurity = true THEN '🔒 ACTIVO - Bloquea operaciones'
        WHEN rowsecurity = false THEN '✅ DESHABILITADO - Permite operaciones'
        ELSE '❓ DESCONOCIDO'
    END as "Estado RLS"
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
ORDER BY tablename;

-- 2. VERIFICAR POLÍTICAS RLS EXISTENTES
SELECT 
    'Políticas RLS' as "Verificación",
    tablename as "Tabla",
    COUNT(*) as "Número de Políticas",
    CASE 
        WHEN COUNT(*) = 0 THEN '❌ SIN POLÍTICAS - RLS bloquea todo'
        ELSE '✅ CON POLÍTICAS - Verificar permisos'
    END as "Estado"
FROM pg_policies 
WHERE schemaname = 'public'
    AND tablename IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
GROUP BY tablename
ORDER BY tablename;

-- 3. VERIFICAR RESTRICCIONES DE FOREIGN KEY
SELECT 
    'Foreign Keys' as "Verificación",
    tc.table_name as "Tabla",
    ccu.table_name AS "Referencia",
    rc.delete_rule as "Regla Eliminación",
    CASE 
        WHEN rc.delete_rule = 'CASCADE' THEN '✅ CASCADA - Eliminación permitida'
        WHEN rc.delete_rule = 'SET NULL' THEN '⚠️ SET NULL - Se establece NULL'
        WHEN rc.delete_rule = 'RESTRICT' THEN '🚫 RESTRICT - Eliminación bloqueada'
        WHEN rc.delete_rule = 'NO ACTION' THEN '🚫 NO ACTION - Eliminación bloqueada'
        ELSE '❓ DESCONOCIDO: ' || rc.delete_rule
    END as "Explicación"
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
    JOIN information_schema.referential_constraints AS rc
      ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
    AND tc.table_name IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
ORDER BY tc.table_name;

-- 4. VERIFICAR PERMISOS DE USUARIO (versión corregida)
SELECT 
    'Permisos Usuario' as "Verificación",
    schemaname as "Esquema",
    tablename as "Tabla",
    tableowner as "Propietario"
FROM pg_tables 
WHERE schemaname = 'public'
    AND tablename IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
ORDER BY tablename;

-- 5. VERIFICAR USUARIO ACTUAL
SELECT 
    'Usuario Actual' as "Verificación",
    current_user as "Usuario",
    current_database() as "Base de Datos",
    current_schema as "Esquema";

-- 6. VERIFICAR PERMISOS ESPECÍFICOS DEL USUARIO ACTUAL
SELECT 
    'Permisos Específicos' as "Verificación",
    table_name as "Tabla",
    privilege_type as "Tipo de Permiso",
    is_grantable as "Puede Otorgar"
FROM information_schema.table_privileges 
WHERE table_schema = 'public'
    AND table_name IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
    AND grantee = current_user
ORDER BY table_name, privilege_type;

-- ========================================
-- RESUMEN DEL DIAGNÓSTICO
-- ========================================
-- Basándote en los resultados anteriores:

-- 🔒 Si RLS está ACTIVO y NO hay políticas:
--    → Ejecuta: src/disable-rls-temporary.sql

-- 🚫 Si hay restricciones RESTRICT/NO ACTION:
--    → Necesitas cambiar las reglas de foreign key

-- ❌ Si el usuario no tiene permisos DELETE:
--    → Necesitas otorgar permisos al usuario

-- ✅ Si todo está bien pero sigue fallando:
--    → Revisa los logs de error específicos
