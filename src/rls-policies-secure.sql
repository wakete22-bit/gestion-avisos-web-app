-- ========================================
-- POLÍTICAS DE ROW LEVEL SECURITY (RLS) SEGURAS
-- ========================================
-- Este archivo configura políticas de seguridad que aíslan datos por usuario
-- IMPORTANTE: Ejecutar DESPUÉS de eliminar las políticas permisivas actuales

-- ========================================
-- 1. ELIMINAR POLÍTICAS PERMISIVAS EXISTENTES
-- ========================================

-- Eliminar todas las políticas existentes
DROP POLICY IF EXISTS "Permitir insertar presupuestos" ON public.presupuestos;
DROP POLICY IF EXISTS "Permitir ver presupuestos" ON public.presupuestos;
DROP POLICY IF EXISTS "Permitir actualizar presupuestos" ON public.presupuestos;
DROP POLICY IF EXISTS "Permitir eliminar presupuestos" ON public.presupuestos;

DROP POLICY IF EXISTS "Permitir insertar albaranes" ON public.albaranes;
DROP POLICY IF EXISTS "Permitir ver albaranes" ON public.albaranes;
DROP POLICY IF EXISTS "Permitir actualizar albaranes" ON public.albaranes;
DROP POLICY IF EXISTS "Permitir eliminar albaranes" ON public.albaranes;

DROP POLICY IF EXISTS "Permitir insertar repuestos para albaranes" ON public.repuestos_albaran;
DROP POLICY IF EXISTS "Permitir ver repuestos de albaranes" ON public.repuestos_albaran;
DROP POLICY IF EXISTS "Permitir actualizar repuestos de albaranes" ON public.repuestos_albaran;
DROP POLICY IF EXISTS "Permitir eliminar repuestos de albaranes" ON public.repuestos_albaran;

DROP POLICY IF EXISTS "Permitir insertar avisos" ON public.avisos;
DROP POLICY IF EXISTS "Permitir ver avisos" ON public.avisos;
DROP POLICY IF EXISTS "Permitir actualizar avisos" ON public.avisos;
DROP POLICY IF EXISTS "Permitir eliminar avisos" ON public.avisos;

DROP POLICY IF EXISTS "Permitir insertar facturas" ON public.facturas;
DROP POLICY IF EXISTS "Permitir ver facturas" ON public.facturas;
DROP POLICY IF EXISTS "Permitir actualizar facturas" ON public.facturas;
DROP POLICY IF EXISTS "Permitir eliminar facturas" ON public.facturas;

DROP POLICY IF EXISTS "Permitir insertar inventario" ON public.inventario;
DROP POLICY IF EXISTS "Permitir ver inventario" ON public.inventario;
DROP POLICY IF EXISTS "Permitir actualizar inventario" ON public.inventario;
DROP POLICY IF EXISTS "Permitir eliminar inventario" ON public.inventario;

-- ========================================
-- 2. FUNCIÓN AUXILIAR PARA OBTENER USUARIO ACTUAL
-- ========================================

-- Función para obtener el ID del usuario autenticado
CREATE OR REPLACE FUNCTION auth.user_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claims', true)::json->>'sub',
    (current_setting('request.jwt.claims', true)::json->>'user_id')
  )::uuid
$$;

-- ========================================
-- 3. POLÍTICAS SEGURAS PARA AVISOS
-- ========================================

-- Los avisos solo pueden ser vistos por el técnico asignado o usuarios con rol de administrador
CREATE POLICY "Avisos: Ver solo asignados" ON public.avisos
    FOR SELECT 
    USING (
        tecnico_asignado_id = auth.user_id() OR
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol IN ('Administrador', 'Supervisor')
        )
    );

-- Solo administradores y supervisores pueden insertar avisos
CREATE POLICY "Avisos: Insertar solo admin/supervisor" ON public.avisos
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol IN ('Administrador', 'Supervisor')
        )
    );

-- Solo el técnico asignado o administradores pueden actualizar avisos
CREATE POLICY "Avisos: Actualizar asignados" ON public.avisos
    FOR UPDATE 
    USING (
        tecnico_asignado_id = auth.user_id() OR
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol IN ('Administrador', 'Supervisor')
        )
    )
    WITH CHECK (
        tecnico_asignado_id = auth.user_id() OR
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol IN ('Administrador', 'Supervisor')
        )
    );

-- Solo administradores pueden eliminar avisos
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
-- 4. POLÍTICAS SEGURAS PARA ALBARANES
-- ========================================

-- Los albaranes solo pueden ser vistos por el técnico del aviso relacionado
CREATE POLICY "Albaranes: Ver solo relacionados" ON public.albaranes
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND (
                a.tecnico_asignado_id = auth.user_id() OR
                EXISTS (
                    SELECT 1 FROM public.usuarios u
                    JOIN public.roles r ON u.rol_id = r.id
                    WHERE u.id = auth.user_id() 
                    AND r.nombre_rol IN ('Administrador', 'Supervisor')
                )
            )
        )
    );

-- Solo el técnico asignado puede insertar albaranes
CREATE POLICY "Albaranes: Insertar solo técnico asignado" ON public.albaranes
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    );

-- Solo el técnico asignado puede actualizar albaranes
CREATE POLICY "Albaranes: Actualizar solo técnico asignado" ON public.albaranes
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    );

-- Solo administradores pueden eliminar albaranes
CREATE POLICY "Albaranes: Eliminar solo admin" ON public.albaranes
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
-- 5. POLÍTICAS SEGURAS PARA REPUESTOS_ALBARAN
-- ========================================

-- Los repuestos solo pueden ser vistos por el técnico del albarán relacionado
CREATE POLICY "Repuestos: Ver solo relacionados" ON public.repuestos_albaran
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.albaranes al
            JOIN public.avisos a ON al.aviso_id = a.id
            WHERE al.id = albaran_id 
            AND (
                a.tecnico_asignado_id = auth.user_id() OR
                EXISTS (
                    SELECT 1 FROM public.usuarios u
                    JOIN public.roles r ON u.rol_id = r.id
                    WHERE u.id = auth.user_id() 
                    AND r.nombre_rol IN ('Administrador', 'Supervisor')
                )
            )
        )
    );

-- Solo el técnico asignado puede insertar repuestos
CREATE POLICY "Repuestos: Insertar solo técnico asignado" ON public.repuestos_albaran
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.albaranes al
            JOIN public.avisos a ON al.aviso_id = a.id
            WHERE al.id = albaran_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    );

-- Solo el técnico asignado puede actualizar repuestos
CREATE POLICY "Repuestos: Actualizar solo técnico asignado" ON public.repuestos_albaran
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.albaranes al
            JOIN public.avisos a ON al.aviso_id = a.id
            WHERE al.id = albaran_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.albaranes al
            JOIN public.avisos a ON al.aviso_id = a.id
            WHERE al.id = albaran_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    );

-- Solo administradores pueden eliminar repuestos
CREATE POLICY "Repuestos: Eliminar solo admin" ON public.repuestos_albaran
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
-- 6. POLÍTICAS SEGURAS PARA PRESUPUESTOS
-- ========================================

-- Los presupuestos solo pueden ser vistos por el técnico del aviso relacionado
CREATE POLICY "Presupuestos: Ver solo relacionados" ON public.presupuestos
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND (
                a.tecnico_asignado_id = auth.user_id() OR
                EXISTS (
                    SELECT 1 FROM public.usuarios u
                    JOIN public.roles r ON u.rol_id = r.id
                    WHERE u.id = auth.user_id() 
                    AND r.nombre_rol IN ('Administrador', 'Supervisor')
                )
            )
        )
    );

-- Solo el técnico asignado puede insertar presupuestos
CREATE POLICY "Presupuestos: Insertar solo técnico asignado" ON public.presupuestos
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    );

-- Solo el técnico asignado puede actualizar presupuestos
CREATE POLICY "Presupuestos: Actualizar solo técnico asignado" ON public.presupuestos
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    );

-- Solo administradores pueden eliminar presupuestos
CREATE POLICY "Presupuestos: Eliminar solo admin" ON public.presupuestos
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
-- 7. POLÍTICAS SEGURAS PARA FACTURAS
-- ========================================

-- Las facturas solo pueden ser vistas por administradores y supervisores
CREATE POLICY "Facturas: Ver solo admin/supervisor" ON public.facturas
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol IN ('Administrador', 'Supervisor')
        )
    );

-- Solo administradores pueden insertar facturas
CREATE POLICY "Facturas: Insertar solo admin" ON public.facturas
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Solo administradores pueden actualizar facturas
CREATE POLICY "Facturas: Actualizar solo admin" ON public.facturas
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Solo administradores pueden eliminar facturas
CREATE POLICY "Facturas: Eliminar solo admin" ON public.facturas
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
-- 8. POLÍTICAS SEGURAS PARA INVENTARIO
-- ========================================

-- El inventario puede ser visto por todos los usuarios autenticados
CREATE POLICY "Inventario: Ver todos autenticados" ON public.inventario
    FOR SELECT 
    USING (auth.user_id() IS NOT NULL);

-- Solo administradores pueden insertar en inventario
CREATE POLICY "Inventario: Insertar solo admin" ON public.inventario
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Solo administradores pueden actualizar inventario
CREATE POLICY "Inventario: Actualizar solo admin" ON public.inventario
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Solo administradores pueden eliminar del inventario
CREATE POLICY "Inventario: Eliminar solo admin" ON public.inventario
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
-- 9. POLÍTICAS SEGURAS PARA CLIENTES
-- ========================================

-- Los clientes pueden ser vistos por todos los usuarios autenticados
CREATE POLICY "Clientes: Ver todos autenticados" ON public.clientes
    FOR SELECT 
    USING (auth.user_id() IS NOT NULL);

-- Solo administradores y supervisores pueden insertar clientes
CREATE POLICY "Clientes: Insertar admin/supervisor" ON public.clientes
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol IN ('Administrador', 'Supervisor')
        )
    );

-- Solo administradores y supervisores pueden actualizar clientes
CREATE POLICY "Clientes: Actualizar admin/supervisor" ON public.clientes
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol IN ('Administrador', 'Supervisor')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol IN ('Administrador', 'Supervisor')
        )
    );

-- Solo administradores pueden eliminar clientes
CREATE POLICY "Clientes: Eliminar solo admin" ON public.clientes
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
-- 10. POLÍTICAS SEGURAS PARA FOTOS_AVISO
-- ========================================

-- Las fotos solo pueden ser vistas por el técnico del aviso relacionado
CREATE POLICY "Fotos: Ver solo relacionadas" ON public.fotos_aviso
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND (
                a.tecnico_asignado_id = auth.user_id() OR
                EXISTS (
                    SELECT 1 FROM public.usuarios u
                    JOIN public.roles r ON u.rol_id = r.id
                    WHERE u.id = auth.user_id() 
                    AND r.nombre_rol IN ('Administrador', 'Supervisor')
                )
            )
        )
    );

-- Solo el técnico asignado puede insertar fotos
CREATE POLICY "Fotos: Insertar solo técnico asignado" ON public.fotos_aviso
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    );

-- Solo el técnico asignado puede actualizar fotos
CREATE POLICY "Fotos: Actualizar solo técnico asignado" ON public.fotos_aviso
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    );

-- Solo administradores pueden eliminar fotos
CREATE POLICY "Fotos: Eliminar solo admin" ON public.fotos_aviso
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
-- 11. POLÍTICAS SEGURAS PARA HISTORIAL_FLUJO
-- ========================================

-- El historial solo puede ser visto por el técnico del aviso relacionado
CREATE POLICY "Historial: Ver solo relacionado" ON public.historial_flujo
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND (
                a.tecnico_asignado_id = auth.user_id() OR
                EXISTS (
                    SELECT 1 FROM public.usuarios u
                    JOIN public.roles r ON u.rol_id = r.id
                    WHERE u.id = auth.user_id() 
                    AND r.nombre_rol IN ('Administrador', 'Supervisor')
                )
            )
        )
    );

-- Solo el técnico asignado puede insertar en historial
CREATE POLICY "Historial: Insertar solo técnico asignado" ON public.historial_flujo
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.avisos a
            WHERE a.id = aviso_id 
            AND a.tecnico_asignado_id = auth.user_id()
        )
    );

-- Solo administradores pueden actualizar historial
CREATE POLICY "Historial: Actualizar solo admin" ON public.historial_flujo
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Solo administradores pueden eliminar historial
CREATE POLICY "Historial: Eliminar solo admin" ON public.historial_flujo
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
-- 12. POLÍTICAS SEGURAS PARA LINEAS_FACTURA
-- ========================================

-- Las líneas de factura solo pueden ser vistas por administradores y supervisores
CREATE POLICY "LineasFactura: Ver solo admin/supervisor" ON public.lineas_factura
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol IN ('Administrador', 'Supervisor')
        )
    );

-- Solo administradores pueden insertar líneas de factura
CREATE POLICY "LineasFactura: Insertar solo admin" ON public.lineas_factura
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Solo administradores pueden actualizar líneas de factura
CREATE POLICY "LineasFactura: Actualizar solo admin" ON public.lineas_factura
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Solo administradores pueden eliminar líneas de factura
CREATE POLICY "LineasFactura: Eliminar solo admin" ON public.lineas_factura
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
-- 13. POLÍTICAS SEGURAS PARA CONFIGURACIONES
-- ========================================

-- Las configuraciones solo pueden ser vistas por administradores
CREATE POLICY "Configuraciones: Ver solo admin" ON public.configuracion_avisos
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

CREATE POLICY "Configuraciones: Ver solo admin" ON public.configuracion_empresa
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

CREATE POLICY "Configuraciones: Ver solo admin" ON public.configuracion_facturacion
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

CREATE POLICY "Configuraciones: Ver solo admin" ON public.configuracion_flujo
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

CREATE POLICY "Configuraciones: Ver solo admin" ON public.configuracion_notificaciones
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

CREATE POLICY "Configuraciones: Ver solo admin" ON public.configuracion_sistema
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Solo administradores pueden modificar configuraciones
CREATE POLICY "Configuraciones: Modificar solo admin" ON public.configuracion_avisos
    FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

CREATE POLICY "Configuraciones: Modificar solo admin" ON public.configuracion_empresa
    FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

CREATE POLICY "Configuraciones: Modificar solo admin" ON public.configuracion_facturacion
    FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

CREATE POLICY "Configuraciones: Modificar solo admin" ON public.configuracion_flujo
    FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

CREATE POLICY "Configuraciones: Modificar solo admin" ON public.configuracion_notificaciones
    FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

CREATE POLICY "Configuraciones: Modificar solo admin" ON public.configuracion_sistema
    FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- ========================================
-- 14. POLÍTICAS SEGURAS PARA USUARIOS Y ROLES
-- ========================================

-- Los usuarios solo pueden ver su propia información y administradores pueden ver todos
CREATE POLICY "Usuarios: Ver propios o admin" ON public.usuarios
    FOR SELECT 
    USING (
        id = auth.user_id() OR
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Solo administradores pueden insertar usuarios
CREATE POLICY "Usuarios: Insertar solo admin" ON public.usuarios
    FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Los usuarios pueden actualizar su propia información, administradores pueden actualizar todos
CREATE POLICY "Usuarios: Actualizar propios o admin" ON public.usuarios
    FOR UPDATE 
    USING (
        id = auth.user_id() OR
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        id = auth.user_id() OR
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Solo administradores pueden eliminar usuarios
CREATE POLICY "Usuarios: Eliminar solo admin" ON public.usuarios
    FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Los roles solo pueden ser vistos por administradores
CREATE POLICY "Roles: Ver solo admin" ON public.roles
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- Solo administradores pueden modificar roles
CREATE POLICY "Roles: Modificar solo admin" ON public.roles
    FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.usuarios u
            JOIN public.roles r ON u.rol_id = r.id
            WHERE u.id = auth.user_id() 
            AND r.nombre_rol = 'Administrador'
        )
    );

-- ========================================
-- 15. VERIFICACIÓN FINAL
-- ========================================

-- Verificar que todas las políticas se crearon correctamente
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

-- ========================================
-- NOTAS IMPORTANTES
-- ========================================
-- 1. Estas políticas aíslan completamente los datos por usuario
-- 2. Los técnicos solo ven avisos asignados a ellos
-- 3. Los administradores y supervisores tienen acceso completo
-- 4. Las configuraciones solo son accesibles por administradores
-- 5. Los clientes e inventario son visibles por todos los usuarios autenticados
-- 6. Para probar, inicia sesión con diferentes usuarios y verifica el aislamiento
