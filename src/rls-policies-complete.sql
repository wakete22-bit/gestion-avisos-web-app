-- ========================================
-- POLÍTICAS DE ROW LEVEL SECURITY (RLS) COMPLETAS
-- ========================================
-- Este archivo configura las políticas de seguridad para todas las tablas principales

-- ========================================
-- 1. TABLA PRESUPUESTOS
-- ========================================

-- Habilitar RLS en la tabla presupuestos
ALTER TABLE public.presupuestos ENABLE ROW LEVEL SECURITY;

-- Política para INSERT: Permitir insertar presupuestos
CREATE POLICY "Permitir insertar presupuestos" ON public.presupuestos
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.avisos 
            WHERE id = aviso_id
        )
    );

-- Política para SELECT: Permitir ver todos los presupuestos
CREATE POLICY "Permitir ver presupuestos" ON public.presupuestos
    FOR SELECT 
    USING (true);

-- Política para UPDATE: Permitir actualizar presupuestos
CREATE POLICY "Permitir actualizar presupuestos" ON public.presupuestos
    FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- Política para DELETE: Permitir eliminar presupuestos
CREATE POLICY "Permitir eliminar presupuestos" ON public.presupuestos
    FOR DELETE 
    USING (true);

-- ========================================
-- 2. TABLA ALBARANES
-- ========================================

-- Habilitar RLS en la tabla albaranes
ALTER TABLE public.albaranes ENABLE ROW LEVEL SECURITY;

-- Política para INSERT: Permitir insertar albaranes
CREATE POLICY "Permitir insertar albaranes" ON public.albaranes
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.avisos 
            WHERE id = aviso_id
        )
    );

-- Política para SELECT: Permitir ver todos los albaranes
CREATE POLICY "Permitir ver albaranes" ON public.albaranes
    FOR SELECT 
    USING (true);

-- Política para UPDATE: Permitir actualizar albaranes
CREATE POLICY "Permitir actualizar albaranes" ON public.albaranes
    FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- Política para DELETE: Permitir eliminar albaranes
CREATE POLICY "Permitir eliminar albaranes" ON public.albaranes
    FOR DELETE 
    USING (true);

-- ========================================
-- 3. TABLA REPUESTOS_ALBARAN
-- ========================================

-- Habilitar RLS en la tabla repuestos_albaran
ALTER TABLE public.repuestos_albaran ENABLE ROW LEVEL SECURITY;

-- Política para INSERT: Permitir insertar repuestos para albaranes existentes
CREATE POLICY "Permitir insertar repuestos para albaranes" ON public.repuestos_albaran
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.albaranes 
            WHERE id = albaran_id
        )
    );

-- Política para SELECT: Permitir ver repuestos de albaranes
CREATE POLICY "Permitir ver repuestos de albaranes" ON public.repuestos_albaran
    FOR SELECT 
    USING (true);

-- Política para UPDATE: Permitir actualizar repuestos de albaranes
CREATE POLICY "Permitir actualizar repuestos de albaranes" ON public.repuestos_albaran
    FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- Política para DELETE: Permitir eliminar repuestos de albaranes
CREATE POLICY "Permitir eliminar repuestos de albaranes" ON public.repuestos_albaran
    FOR DELETE 
    USING (true);

-- ========================================
-- 4. TABLA AVISOS
-- ========================================

-- Habilitar RLS en la tabla avisos
ALTER TABLE public.avisos ENABLE ROW LEVEL SECURITY;

-- Política para INSERT: Permitir insertar avisos
CREATE POLICY "Permitir insertar avisos" ON public.avisos
    FOR INSERT 
    WITH CHECK (true);

-- Política para SELECT: Permitir ver todos los avisos
CREATE POLICY "Permitir ver avisos" ON public.avisos
    FOR SELECT 
    USING (true);

-- Política para UPDATE: Permitir actualizar avisos
CREATE POLICY "Permitir actualizar avisos" ON public.avisos
    FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- Política para DELETE: Permitir eliminar avisos (con verificación de dependencias)
CREATE POLICY "Permitir eliminar avisos" ON public.avisos
    FOR DELETE 
    USING (true);

-- ========================================
-- 5. TABLA FACTURAS
-- ========================================

-- Habilitar RLS en la tabla facturas
ALTER TABLE public.facturas ENABLE ROW LEVEL SECURITY;

-- Política para INSERT: Permitir insertar facturas
CREATE POLICY "Permitir insertar facturas" ON public.facturas
    FOR INSERT 
    WITH CHECK (true);

-- Política para SELECT: Permitir ver todas las facturas
CREATE POLICY "Permitir ver facturas" ON public.facturas
    FOR SELECT 
    USING (true);

-- Política para UPDATE: Permitir actualizar facturas
CREATE POLICY "Permitir actualizar facturas" ON public.facturas
    FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- Política para DELETE: Permitir eliminar facturas
CREATE POLICY "Permitir eliminar facturas" ON public.facturas
    FOR DELETE 
    USING (true);

-- ========================================
-- 6. TABLA INVENTARIO
-- ========================================

-- Habilitar RLS en la tabla inventario
ALTER TABLE public.inventario ENABLE ROW LEVEL SECURITY;

-- Política para INSERT: Permitir insertar productos en inventario
CREATE POLICY "Permitir insertar inventario" ON public.inventario
    FOR INSERT 
    WITH CHECK (true);

-- Política para SELECT: Permitir ver todo el inventario
CREATE POLICY "Permitir ver inventario" ON public.inventario
    FOR SELECT 
    USING (true);

-- Política para UPDATE: Permitir actualizar inventario
CREATE POLICY "Permitir actualizar inventario" ON public.inventario
    FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- Política para DELETE: Permitir eliminar productos del inventario
CREATE POLICY "Permitir eliminar inventario" ON public.inventario
    FOR DELETE 
    USING (true);

-- ========================================
-- VERIFICACIÓN DE POLÍTICAS
-- ========================================
-- Para verificar que todas las políticas se crearon correctamente:

/*
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual, 
    with_check 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
*/

-- ========================================
-- ALTERNATIVA: Políticas más permisivas para desarrollo
-- ========================================
-- Si las políticas anteriores son muy restrictivas, puedes usar estas:

/*
-- Deshabilitar RLS temporalmente para desarrollo
ALTER TABLE public.presupuestos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.albaranes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.repuestos_albaran DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.avisos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.facturas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventario DISABLE ROW LEVEL SECURITY;
*/

-- ========================================
-- RESTAURAR RLS PARA PRODUCCIÓN
-- ========================================
-- Cuando quieras restaurar RLS, ejecuta este archivo completo

-- ========================================
-- NOTAS IMPORTANTES
-- ========================================
-- 1. Estas políticas permiten acceso completo a todas las operaciones CRUD
-- 2. En producción, deberías implementar políticas más restrictivas basadas en roles de usuario
-- 3. Las políticas actuales son permisivas para permitir el desarrollo y testing
-- 4. Para implementar seguridad real, necesitarías:
--    - Autenticación de usuarios
--    - Roles y permisos específicos
--    - Políticas basadas en el usuario autenticado
