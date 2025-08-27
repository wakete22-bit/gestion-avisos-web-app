-- ========================================
-- POLÍTICAS DE ROW LEVEL SECURITY (RLS)
-- ========================================
-- Este archivo configura las políticas de seguridad para la tabla repuestos_albaran

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

-- Política para SELECT: Permitir ver repuestos de albaranes que el usuario puede ver
CREATE POLICY "Permitir ver repuestos de albaranes visibles" ON public.repuestos_albaran
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.albaranes a
            JOIN public.avisos av ON a.aviso_id = av.id
            WHERE a.id = albaran_id
            -- Aquí puedes agregar más restricciones si es necesario
            -- Por ejemplo, verificar que el usuario tenga acceso al aviso
        )
    );

-- Política para UPDATE: Permitir actualizar repuestos de albaranes existentes
CREATE POLICY "Permitir actualizar repuestos de albaranes" ON public.repuestos_albaran
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.albaranes 
            WHERE id = albaran_id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.albaranes 
            WHERE id = albaran_id
        )
    );

-- Política para DELETE: Permitir eliminar repuestos de albaranes existentes
CREATE POLICY "Permitir eliminar repuestos de albaranes" ON public.repuestos_albaran
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.albaranes 
            WHERE id = albaran_id
        )
    );

-- ========================================
-- ALTERNATIVA: Política más permisiva para desarrollo
-- ========================================
-- Si las políticas anteriores son muy restrictivas, puedes usar esta:

-- CREATE POLICY "Política permisiva para desarrollo" ON public.repuestos_albaran
--     FOR ALL 
--     USING (true)
--     WITH CHECK (true);

-- ========================================
-- VERIFICACIÓN DE POLÍTICAS
-- ========================================
-- Para verificar que las políticas se crearon correctamente:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
-- FROM pg_policies 
-- WHERE tablename = 'repuestos_albaran';
