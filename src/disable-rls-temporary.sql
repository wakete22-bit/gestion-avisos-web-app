-- ========================================
-- DESHABILITAR RLS TEMPORALMENTE
-- ========================================
-- Este archivo deshabilita RLS en todas las tablas para permitir operaciones CRUD
-- ÚSALO SOLO EN DESARROLLO/TESTING

-- Deshabilitar RLS en presupuestos
ALTER TABLE public.presupuestos DISABLE ROW LEVEL SECURITY;

-- Deshabilitar RLS en albaranes
ALTER TABLE public.albaranes DISABLE ROW LEVEL SECURITY;

-- Deshabilitar RLS en repuestos_albaran
ALTER TABLE public.repuestos_albaran DISABLE ROW LEVEL SECURITY;

-- Deshabilitar RLS en avisos
ALTER TABLE public.avisos DISABLE ROW LEVEL SECURITY;

-- Deshabilitar RLS en facturas
ALTER TABLE public.facturas DISABLE ROW LEVEL SECURITY;

-- Deshabilitar RLS en inventario
ALTER TABLE public.inventario DISABLE ROW LEVEL SECURITY;

-- Deshabilitar RLS en fotos_aviso
ALTER TABLE public.fotos_aviso DISABLE ROW LEVEL SECURITY;

-- Deshabilitar RLS en lineas_factura
ALTER TABLE public.lineas_factura DISABLE ROW LEVEL SECURITY;

-- Deshabilitar RLS en historial_flujo
ALTER TABLE public.historial_flujo DISABLE ROW LEVEL SECURITY;

-- ========================================
-- VERIFICAR QUE RLS ESTÁ DESHABILITADO
-- ========================================
-- Ejecuta esta consulta para verificar:

/*
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
*/

-- Si rowsecurity = false, entonces RLS está deshabilitado
-- Si rowsecurity = true, entonces RLS está habilitado

-- ========================================
-- NOTA IMPORTANTE
-- ========================================
-- Después de ejecutar este script, podrás:
-- 1. Eliminar presupuestos
-- 2. Eliminar albaranes
-- 3. Realizar todas las operaciones CRUD sin restricciones

-- ⚠️  RECUERDA: Esto es solo para desarrollo/testing
-- ⚠️  NO uses esto en producción
--✔️  Para restaurar RLS, ejecuta el archivo rls-policies-complete.sql
