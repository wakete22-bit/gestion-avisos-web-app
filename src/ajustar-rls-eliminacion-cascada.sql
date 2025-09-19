-- ========================================
-- AJUSTAR RLS PARA ELIMINACIÓN EN CASCADA
-- ========================================
-- Este archivo ajusta las políticas RLS para permitir eliminación en cascada
-- cuando un administrador elimina un aviso

-- ========================================
-- 1. ELIMINAR POLÍTICAS DE ELIMINACIÓN EXISTENTES
-- ========================================

-- Eliminar políticas de eliminación existentes para permitir redefinirlas
DROP POLICY IF EXISTS "Avisos: Eliminar solo admin" ON public.avisos;
DROP POLICY IF EXISTS "Albaranes: Eliminar solo admin" ON public.albaranes;
DROP POLICY IF EXISTS "Repuestos: Eliminar solo admin" ON public.repuestos_albaran;
DROP POLICY IF EXISTS "Presupuestos: Eliminar solo admin" ON public.presupuestos;
DROP POLICY IF EXISTS "Facturas: Eliminar solo admin" ON public.facturas;
DROP POLICY IF EXISTS "Fotos: Eliminar solo admin" ON public.fotos_aviso;
DROP POLICY IF EXISTS "Historial: Eliminar solo admin" ON public.historial_flujo;
DROP POLICY IF EXISTS "LineasFactura: Eliminar solo admin" ON public.lineas_factura;

-- ========================================
-- 2. CREAR POLÍTICAS DE ELIMINACIÓN EN CASCADA
-- ========================================

-- ========================================
-- 2.1. AVISOS - Solo administradores pueden eliminar
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
-- 2.2. ALBARANES - Administradores pueden eliminar directamente o por cascada
-- ========================================
CREATE POLICY "Albaranes: Eliminar admin o cascada" ON public.albaranes
    FOR DELETE 
    USING (
        -- Administradores pueden eliminar directamente
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
        OR
        -- O cuando se elimina por cascada desde un aviso
        EXISTS (
            SELECT 1 FROM public.avisos a
            JOIN public.usuarios u ON a.tecnico_asignado_id = u.id
            JOIN public.roles r ON u.rol_id = r.id
            WHERE a.id = aviso_id 
            AND r.nombre_rol = 'Administrador'
            AND NOT EXISTS (
                -- Verificar que el aviso aún existe (no se está eliminando por cascada)
                SELECT 1 FROM public.avisos a2 WHERE a2.id = aviso_id
            )
        )
    );

-- ========================================
-- 2.3. REPUESTOS_ALBARAN - Administradores pueden eliminar directamente o por cascada
-- ========================================
CREATE POLICY "Repuestos: Eliminar admin o cascada" ON public.repuestos_albaran
    FOR DELETE 
    USING (
        -- Administradores pueden eliminar directamente
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
        OR
        -- O cuando se elimina por cascada desde un albarán
        EXISTS (
            SELECT 1 FROM public.albaranes al
            JOIN public.avisos a ON al.aviso_id = a.id
            JOIN public.usuarios u ON a.tecnico_asignado_id = u.id
            JOIN public.roles r ON u.rol_id = r.id
            WHERE al.id = albaran_id 
            AND r.nombre_rol = 'Administrador'
            AND NOT EXISTS (
                -- Verificar que el albarán aún existe (no se está eliminando por cascada)
                SELECT 1 FROM public.albaranes al2 WHERE al2.id = albaran_id
            )
        )
    );

-- ========================================
-- 2.4. PRESUPUESTOS - Administradores pueden eliminar directamente o por cascada
-- ========================================
CREATE POLICY "Presupuestos: Eliminar admin o cascada" ON public.presupuestos
    FOR DELETE 
    USING (
        -- Administradores pueden eliminar directamente
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
        OR
        -- O cuando se elimina por cascada desde un aviso
        EXISTS (
            SELECT 1 FROM public.avisos a
            JOIN public.usuarios u ON a.tecnico_asignado_id = u.id
            JOIN public.roles r ON u.rol_id = r.id
            WHERE a.id = aviso_id 
            AND r.nombre_rol = 'Administrador'
            AND NOT EXISTS (
                -- Verificar que el aviso aún existe (no se está eliminando por cascada)
                SELECT 1 FROM public.avisos a2 WHERE a2.id = aviso_id
            )
        )
    );

-- ========================================
-- 2.5. FACTURAS - Administradores pueden eliminar directamente o por cascada
-- ========================================
CREATE POLICY "Facturas: Eliminar admin o cascada" ON public.facturas
    FOR DELETE 
    USING (
        -- Administradores pueden eliminar directamente
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
        OR
        -- O cuando se elimina por cascada desde un aviso
        EXISTS (
            SELECT 1 FROM public.avisos a
            JOIN public.usuarios u ON a.tecnico_asignado_id = u.id
            JOIN public.roles r ON u.rol_id = r.id
            WHERE a.id = aviso_id 
            AND r.nombre_rol = 'Administrador'
            AND NOT EXISTS (
                -- Verificar que el aviso aún existe (no se está eliminando por cascada)
                SELECT 1 FROM public.avisos a2 WHERE a2.id = aviso_id
            )
        )
    );

-- ========================================
-- 2.6. FOTOS_AVISO - Administradores pueden eliminar directamente o por cascada
-- ========================================
CREATE POLICY "Fotos: Eliminar admin o cascada" ON public.fotos_aviso
    FOR DELETE 
    USING (
        -- Administradores pueden eliminar directamente
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
        OR
        -- O cuando se elimina por cascada desde un aviso
        EXISTS (
            SELECT 1 FROM public.avisos a
            JOIN public.usuarios u ON a.tecnico_asignado_id = u.id
            JOIN public.roles r ON u.rol_id = r.id
            WHERE a.id = aviso_id 
            AND r.nombre_rol = 'Administrador'
            AND NOT EXISTS (
                -- Verificar que el aviso aún existe (no se está eliminando por cascada)
                SELECT 1 FROM public.avisos a2 WHERE a2.id = aviso_id
            )
        )
    );

-- ========================================
-- 2.7. HISTORIAL_FLUJO - Administradores pueden eliminar directamente o por cascada
-- ========================================
CREATE POLICY "Historial: Eliminar admin o cascada" ON public.historial_flujo
    FOR DELETE 
    USING (
        -- Administradores pueden eliminar directamente
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
        OR
        -- O cuando se elimina por cascada desde un aviso
        EXISTS (
            SELECT 1 FROM public.avisos a
            JOIN public.usuarios u ON a.tecnico_asignado_id = u.id
            JOIN public.roles r ON u.rol_id = r.id
            WHERE a.id = aviso_id 
            AND r.nombre_rol = 'Administrador'
            AND NOT EXISTS (
                -- Verificar que el aviso aún existe (no se está eliminando por cascada)
                SELECT 1 FROM public.avisos a2 WHERE a2.id = aviso_id
            )
        )
    );

-- ========================================
-- 2.8. LINEAS_FACTURA - Administradores pueden eliminar directamente o por cascada
-- ========================================
CREATE POLICY "LineasFactura: Eliminar admin o cascada" ON public.lineas_factura
    FOR DELETE 
    USING (
        -- Administradores pueden eliminar directamente
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
        OR
        -- O cuando se elimina por cascada desde una factura
        EXISTS (
            SELECT 1 FROM public.facturas f
            JOIN public.avisos a ON f.aviso_id = a.id
            JOIN public.usuarios u ON a.tecnico_asignado_id = u.id
            JOIN public.roles r ON u.rol_id = r.id
            WHERE f.id = factura_id 
            AND r.nombre_rol = 'Administrador'
            AND NOT EXISTS (
                -- Verificar que la factura aún existe (no se está eliminando por cascada)
                SELECT 1 FROM public.facturas f2 WHERE f2.id = factura_id
            )
        )
    );

-- ========================================
-- 3. CREAR FUNCIÓN AUXILIAR PARA ELIMINACIÓN EN CASCADA
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
    DELETE FROM public.historial_flujo WHERE aviso_id = aviso_id_param;
    DELETE FROM public.lineas_factura WHERE factura_id IN (
        SELECT id FROM public.facturas WHERE aviso_id = aviso_id_param
    );
    DELETE FROM public.facturas WHERE aviso_id = aviso_id_param;
    DELETE FROM public.presupuestos WHERE aviso_id = aviso_id_param;
    DELETE FROM public.repuestos_albaran WHERE albaran_id IN (
        SELECT id FROM public.albaranes WHERE aviso_id = aviso_id_param
    );
    DELETE FROM public.albaranes WHERE aviso_id = aviso_id_param;
    DELETE FROM public.fotos_aviso WHERE aviso_id = aviso_id_param;
    DELETE FROM public.avisos WHERE id = aviso_id_param;
    
END;
$$;

-- ========================================
-- 4. CREAR POLÍTICA PARA USAR LA FUNCIÓN DE CASCADA
-- ========================================

-- Permitir a los administradores usar la función de eliminación en cascada
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
    cmd, 
    qual, 
    with_check 
FROM pg_policies 
WHERE schemaname = 'public'
AND policyname LIKE '%Eliminar%'
ORDER BY tablename, policyname;

-- ========================================
-- NOTAS IMPORTANTES
-- ========================================
-- 1. Las políticas ahora permiten eliminación en cascada para administradores
-- 2. Se creó una función segura para eliminar avisos con todas sus dependencias
-- 3. La función verifica que el usuario sea administrador antes de proceder
-- 4. El orden de eliminación respeta las restricciones de clave foránea
-- 5. Para usar la función: SELECT eliminar_aviso_cascada('uuid-del-aviso');
