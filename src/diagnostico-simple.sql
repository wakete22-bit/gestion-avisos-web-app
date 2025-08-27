-- ========================================
-- DIAGNÓSTICO SIMPLE: PROBLEMA DE ELIMINACIÓN
-- ========================================
-- Script simple que funciona en todas las versiones de PostgreSQL

-- 1. VERIFICAR ESTADO DE RLS
SELECT 
    tablename as "Tabla",
    CASE 
        WHEN rowsecurity = true THEN '🔒 RLS ACTIVO'
        WHEN rowsecurity = false THEN '✅ RLS DESHABILITADO'
        ELSE '❓ DESCONOCIDO'
    END as "Estado RLS"
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
ORDER BY tablename;

-- 2. VERIFICAR POLÍTICAS RLS
SELECT 
    tablename as "Tabla",
    COUNT(*) as "Políticas RLS"
FROM pg_policies 
WHERE schemaname = 'public'
    AND tablename IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
GROUP BY tablename
ORDER BY tablename;

-- 3. VERIFICAR FOREIGN KEYS
SELECT
    tc.table_name as "Tabla",
    ccu.table_name AS "Referencia",
    rc.delete_rule as "Regla Eliminación"
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

-- 4. VERIFICAR USUARIO ACTUAL
SELECT 
    current_user as "Usuario",
    current_database() as "Base de Datos";

-- 5. VERIFICAR PERMISOS DEL USUARIO
SELECT 
    table_name as "Tabla",
    privilege_type as "Permiso"
FROM information_schema.table_privileges 
WHERE table_schema = 'public'
    AND table_name IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
    AND grantee = current_user
ORDER BY table_name, privilege_type;
