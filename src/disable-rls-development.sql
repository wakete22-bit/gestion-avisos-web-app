-- ========================================
-- DESHABILITAR RLS PARA DESARROLLO
-- ========================================
-- Este archivo deshabilita RLS temporalmente para permitir desarrollo
-- ⚠️ NO USAR EN PRODUCCIÓN

-- Deshabilitar RLS en la tabla repuestos_albaran
ALTER TABLE public.repuestos_albaran DISABLE ROW LEVEL SECURITY;

-- Verificar que RLS está deshabilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'repuestos_albaran';

-- ========================================
-- ALTERNATIVA: Política permisiva para desarrollo
-- ========================================
-- Si prefieres mantener RLS pero con políticas permisivas:

-- ALTER TABLE public.repuestos_albaran ENABLE ROW LEVEL SECURITY;

-- -- Política que permite todo (solo para desarrollo)
-- DROP POLICY IF EXISTS "Política permisiva para desarrollo" ON public.repuestos_albaran;
-- CREATE POLICY "Política permisiva para desarrollo" ON public.repuestos_albaran
--     FOR ALL 
--     USING (true)
--     WITH CHECK (true);

-- ========================================
-- RESTAURAR RLS PARA PRODUCCIÓN
-- ========================================
-- Cuando quieras restaurar la seguridad:

-- ALTER TABLE public.repuestos_albaran ENABLE ROW LEVEL SECURITY;
-- -- Luego ejecutar las políticas del archivo rls-policies.sql
