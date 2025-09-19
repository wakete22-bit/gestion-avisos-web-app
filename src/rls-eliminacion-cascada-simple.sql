-- ========================================
-- RLS PARA ELIMINACIÓN EN CASCADA - VERSIÓN SIMPLE
-- ========================================
-- Este archivo ajusta las políticas RLS para permitir eliminación en cascada
-- de forma más simple y práctica

-- ========================================
-- 1. ELIMINAR POLÍTICAS DE ELIMINACIÓN EXISTENTES
-- ========================================

-- Eliminar políticas de eliminación existentes
DROP POLICY IF EXISTS "Avisos: Eliminar solo admin" ON public.avisos;
DROP POLICY IF EXISTS "Albaranes: Eliminar solo admin" ON public.albaranes;
DROP POLICY IF EXISTS "Repuestos: Eliminar solo admin" ON public.repuestos_albaran;
DROP POLICY IF EXISTS "Presupuestos: Eliminar solo admin" ON public.presupuestos;
DROP POLICY IF EXISTS "Facturas: Eliminar solo admin" ON public.facturas;
DROP POLICY IF EXISTS "Fotos: Eliminar solo admin" ON public.fotos_aviso;
DROP POLICY IF EXISTS "Historial: Eliminar solo admin" ON public.historial_flujo;
DROP POLICY IF EXISTS "LineasFactura: Eliminar solo admin" ON public.lineas_factura;

-- ========================================
-- 2. CREAR POLÍTICAS DE ELIMINACIÓN PERMISIVAS PARA ADMINISTRADORES
-- ========================================

-- ========================================
-- 2.1. AVISOS - Solo administradores
-- ========================================
CREATE POLICY "Avisos: Eliminar solo admin" ON public.avisos
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- ========================================
-- 2.2. ALBARANES - Administradores pueden eliminar
-- ========================================
CREATE POLICY "Albaranes: Eliminar admin" ON public.albaranes
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- ========================================
-- 2.3. REPUESTOS_ALBARAN - Administradores pueden eliminar
-- ========================================
CREATE POLICY "Repuestos: Eliminar admin" ON public.repuestos_albaran
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- ========================================
-- 2.4. PRESUPUESTOS - Administradores pueden eliminar
-- ========================================
CREATE POLICY "Presupuestos: Eliminar admin" ON public.presupuestos
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- ========================================
-- 2.5. FACTURAS - Administradores pueden eliminar
-- ========================================
CREATE POLICY "Facturas: Eliminar admin" ON public.facturas
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- ========================================
-- 2.6. FOTOS_AVISO - Administradores pueden eliminar
-- ========================================
CREATE POLICY "Fotos: Eliminar admin" ON public.fotos_aviso
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- ========================================
-- 2.7. HISTORIAL_FLUJO - Administradores pueden eliminar
-- ========================================
CREATE POLICY "Historial: Eliminar admin" ON public.historial_flujo
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- ========================================
-- 2.8. LINEAS_FACTURA - Administradores pueden eliminar
-- ========================================
CREATE POLICY "LineasFactura: Eliminar admin" ON public.lineas_factura
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- ========================================
-- 3. CREAR FUNCIÓN DE ELIMINACIÓN EN CASCADA
-- ========================================

-- Función que permite a los administradores eliminar avisos con todas sus dependencias
CREATE OR REPLACE FUNCTION eliminar_aviso_cascada(aviso_id_param uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    es_admin boolean := false;
BEGIN
    -- Verificar que el usuario actual es administrador
    SELECT EXISTS (
        SELECT 1 FROM public.usuarios u
        JOIN public.roles r ON u.rol_id = r.id
        WHERE u.id = auth.user_id() 
        AND r.nombre_rol = 'Administrador'
    ) INTO es_admin;
    
    IF NOT es_admin THEN
        RAISE EXCEPTION 'Solo los administradores pueden eliminar avisos';
    END IF;
    
    -- Eliminar en orden: dependencias primero, aviso al final
    -- 1. Historial de flujo
    DELETE FROM public.historial_flujo WHERE aviso_id = aviso_id_param;
    
    -- 2. Líneas de factura (a través de facturas)
    DELETE FROM public.lineas_factura WHERE factura_id IN (
        SELECT id FROM public.facturas WHERE aviso_id = aviso_id_param
    );
    
    -- 3. Facturas
    DELETE FROM public.facturas WHERE aviso_id = aviso_id_param;
    
    -- 4. Presupuestos
    DELETE FROM public.presupuestos WHERE aviso_id = aviso_id_param;
    
    -- 5. Repuestos de albaranes
    DELETE FROM public.repuestos_albaran WHERE albaran_id IN (
        SELECT id FROM public.albaranes WHERE aviso_id = aviso_id_param
    );
    
    -- 6. Albaranes
    DELETE FROM public.albaranes WHERE aviso_id = aviso_id_param;
    
    -- 7. Fotos del aviso
    DELETE FROM public.fotos_aviso WHERE aviso_id = aviso_id_param;
    
    -- 8. Finalmente, el aviso
    DELETE FROM public.avisos WHERE id = aviso_id_param;
    
    -- Log de la eliminación
    RAISE NOTICE 'Aviso % eliminado exitosamente con todas sus dependencias', aviso_id_param;
    
END;
$$;

-- ========================================
-- 4. PERMISOS Y GRANTS
-- ========================================

-- Permitir a los usuarios autenticados ejecutar la función
GRANT EXECUTE ON FUNCTION eliminar_aviso_cascada(uuid) TO authenticated;

-- ========================================
-- 5. VERIFICACIÓN
-- ========================================

-- Verificar que las políticas se crearon correctamente
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd
FROM pg_policies 
WHERE schemaname = 'public'
AND policyname LIKE '%Eliminar%'
ORDER BY tablename, policyname;

-- ========================================
-- 6. INSTRUCCIONES DE USO
-- ========================================

-- Para eliminar un aviso con todas sus dependencias, usar:
-- SELECT eliminar_aviso_cascada('uuid-del-aviso');

-- ========================================
-- NOTAS IMPORTANTES
-- ========================================
-- 1. Las políticas RLS ahora permiten a los administradores eliminar cualquier registro
-- 2. Se creó una función segura que elimina avisos con todas sus dependencias
-- 3. La función verifica que el usuario sea administrador antes de proceder
-- 4. El orden de eliminación respeta las restricciones de clave foránea
-- 5. La función es SECURITY DEFINER, por lo que ejecuta con privilegios de definidor
-- 6. Para usar desde la aplicación, llamar a la función en lugar de DELETE directo
