-- Script para añadir políticas RLS faltantes para las tablas de configuración
-- Este script debe ejecutarse en la base de datos para permitir INSERT/UPDATE

-- Políticas para configuracion_empresa
CREATE POLICY "Usuarios autenticados pueden insertar configuraciones de empresa"
ON public.configuracion_empresa
FOR INSERT
TO public
WITH CHECK (auth.role() = 'authenticated'::text);

CREATE POLICY "Usuarios autenticados pueden actualizar configuraciones de empresa"
ON public.configuracion_empresa
FOR UPDATE
TO public
USING (auth.role() = 'authenticated'::text)
WITH CHECK (auth.role() = 'authenticated'::text);

-- Políticas para configuracion_facturacion
CREATE POLICY "Usuarios autenticados pueden insertar configuraciones de facturación"
ON public.configuracion_facturacion
FOR INSERT
TO public
WITH CHECK (auth.role() = 'authenticated'::text);

CREATE POLICY "Usuarios autenticados pueden actualizar configuraciones de facturación"
ON public.configuracion_facturacion
FOR UPDATE
TO public
USING (auth.role() = 'authenticated'::text)
WITH CHECK (auth.role() = 'authenticated'::text);

-- Políticas para configuracion_notificaciones
CREATE POLICY "Usuarios autenticados pueden insertar configuraciones de notificaciones"
ON public.configuracion_notificaciones
FOR INSERT
TO public
WITH CHECK (auth.role() = 'authenticated'::text);

CREATE POLICY "Usuarios autenticados pueden actualizar configuraciones de notificaciones"
ON public.configuracion_notificaciones
FOR UPDATE
TO public
USING (auth.role() = 'authenticated'::text)
WITH CHECK (auth.role() = 'authenticated'::text);

-- Políticas para configuracion_avisos
CREATE POLICY "Usuarios autenticados pueden insertar configuraciones de avisos"
ON public.configuracion_avisos
FOR INSERT
TO public
WITH CHECK (auth.role() = 'authenticated'::text);

CREATE POLICY "Usuarios autenticados pueden actualizar configuraciones de avisos"
ON public.configuracion_avisos
FOR UPDATE
TO public
USING (auth.role() = 'authenticated'::text)
WITH CHECK (auth.role() = 'authenticated'::text);

-- Políticas para configuracion_sistema
CREATE POLICY "Usuarios autenticados pueden insertar configuraciones del sistema"
ON public.configuracion_sistema
FOR INSERT
TO public
WITH CHECK (auth.role() = 'authenticated'::text);

CREATE POLICY "Usuarios autenticados pueden actualizar configuraciones del sistema"
ON public.configuracion_sistema
FOR UPDATE
TO public
USING (auth.role() = 'authenticated'::text)
WITH CHECK (auth.role() = 'authenticated'::text);

-- Políticas para lineas_factura
CREATE POLICY "Usuarios autenticados pueden insertar líneas de factura"
ON public.lineas_factura
FOR INSERT
TO public
WITH CHECK (auth.role() = 'authenticated'::text);

CREATE POLICY "Usuarios autenticados pueden actualizar líneas de factura"
ON public.lineas_factura
FOR UPDATE
TO public
USING (auth.role() = 'authenticated'::text)
WITH CHECK (auth.role() = 'authenticated'::text);

CREATE POLICY "Usuarios autenticados pueden eliminar líneas de factura"
ON public.lineas_factura
FOR DELETE
TO public
USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Usuarios autenticados pueden ver líneas de factura"
ON public.lineas_factura
FOR SELECT
TO public
USING (auth.role() = 'authenticated'::text);

-- Verificar que las políticas se crearon correctamente
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE tablename LIKE 'configuracion_%' OR tablename = 'lineas_factura'
ORDER BY tablename, cmd;
