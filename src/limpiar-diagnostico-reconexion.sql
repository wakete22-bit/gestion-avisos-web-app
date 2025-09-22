-- =============================================
-- SCRIPT DE LIMPIEZA PARA DIAGNÓSTICO DE RECONEXIÓN PWA
-- =============================================

-- 1. Eliminar función log_reconexion si existe
DROP FUNCTION IF EXISTS log_reconexion(UUID, VARCHAR(50), JSONB);

-- 2. Eliminar políticas RLS de reconexion_logs si existen
DROP POLICY IF EXISTS "Users can view own reconexion logs" ON reconexion_logs;
DROP POLICY IF EXISTS "Users can insert own reconexion logs" ON reconexion_logs;

-- 3. Eliminar tabla reconexion_logs si existe
DROP TABLE IF EXISTS reconexion_logs;

-- 4. Verificar que se eliminó todo correctamente
SELECT 
    'Verificación de limpieza:' as info,
    'Funciones eliminadas' as estado
WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.routines 
    WHERE routine_name = 'log_reconexion' 
    AND routine_schema = 'public'
);

-- 5. Verificar que la tabla se eliminó
SELECT 
    'Verificación de limpieza:' as info,
    'Tabla eliminada' as estado
WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'reconexion_logs' 
    AND table_schema = 'public'
);

-- =============================================
-- INSTRUCCIONES:
-- =============================================
-- 1. Ejecuta este script PRIMERO en Supabase SQL Editor
-- 2. Luego ejecuta el script diagnostico-reconexion-essencial.sql
-- 3. Esto asegura que no hay conflictos con funciones/tablas anteriores
