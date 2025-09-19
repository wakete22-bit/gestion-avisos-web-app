-- Script para habilitar RLS en la tabla lineas_factura
-- Este script corrige el problema de que no se muestran las líneas de factura

-- Habilitar RLS en la tabla lineas_factura
ALTER TABLE public.lineas_factura ENABLE ROW LEVEL SECURITY;

-- Verificar que las políticas existan (si no existen, crearlas)
-- Política para SELECT - permitir a administradores y supervisores
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'lineas_factura' 
        AND policyname = 'LineasFactura: Ver solo admin/supervisor'
    ) THEN
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
    END IF;
END $$;

-- Política para INSERT - solo administradores
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'lineas_factura' 
        AND policyname = 'LineasFactura: Insertar solo admin'
    ) THEN
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
    END IF;
END $$;

-- Política para UPDATE - solo administradores
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'lineas_factura' 
        AND policyname = 'LineasFactura: Actualizar solo admin'
    ) THEN
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
    END IF;
END $$;

-- Política para DELETE - solo administradores
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'lineas_factura' 
        AND policyname = 'LineasFactura: Eliminar solo admin'
    ) THEN
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
    END IF;
END $$;

-- Verificar el estado de RLS
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled,
    (SELECT count(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = 'lineas_factura') as policies_count
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'lineas_factura';
