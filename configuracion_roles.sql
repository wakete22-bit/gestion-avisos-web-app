-- =====================================================
-- CONFIGURACIÓN DE ROLES PARA MÓDULO DE TÉCNICOS
-- =====================================================
-- Este archivo configura los roles básicos necesarios
-- para el funcionamiento del módulo de técnicos.
-- Ejecutar en la base de datos de Supabase.

-- Verificar estructura de tabla roles
DO $$
BEGIN
    -- Verificar si la tabla roles existe
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'roles') THEN
        RAISE EXCEPTION 'La tabla "roles" no existe. Ejecutar primero las migraciones de la base de datos.';
    END IF;
    
    RAISE NOTICE 'Tabla "roles" encontrada. Procediendo con la configuración...';
END $$;

-- Insertar roles básicos (solo si no existen)
INSERT INTO public.roles (id, nombre_rol) VALUES 
  -- UUID para Administrador (generar nuevo si es necesario)
  ('a1b2c3d4-1234-5678-9abc-123456789001', 'Administrador'),
  
  -- UUID para Técnico (usar existente o generar nuevo)
  ('a0472297-ee16-44d8-a434-810a3868a209', 'Técnico'),
  
  -- UUID para Usuario (usar existente o generar nuevo)
  ('70c12fd8-92c2-4479-bba0-c7b2e934f48a', 'Usuario')

ON CONFLICT (nombre_rol) DO UPDATE SET
  nombre_rol = EXCLUDED.nombre_rol;

-- Verificar que los roles se insertaron correctamente
DO $$
DECLARE
    roles_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO roles_count FROM public.roles;
    
    IF roles_count >= 3 THEN
        RAISE NOTICE '✅ Roles configurados correctamente. Total: %', roles_count;
    ELSE
        RAISE WARNING '⚠️ Solo se encontraron % roles. Se esperaban al menos 3.', roles_count;
    END IF;
END $$;

-- Mostrar roles configurados
SELECT 
    id,
    nombre_rol,
    'Configurado correctamente' as estado
FROM public.roles 
ORDER BY nombre_rol;

-- =====================================================
-- CONFIGURACIÓN DE PERMISOS RLS (Row Level Security)
-- =====================================================

-- Permitir a usuarios autenticados leer roles
CREATE POLICY IF NOT EXISTS "Users can read roles" 
ON public.roles FOR SELECT 
TO authenticated 
USING (true);

-- Solo administradores pueden modificar roles
CREATE POLICY IF NOT EXISTS "Only admins can modify roles" 
ON public.roles FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.usuarios u
        JOIN public.roles r ON u.rol_id = r.id
        WHERE u.id = auth.uid()
        AND r.nombre_rol = 'Administrador'
    )
);

-- Habilitar RLS en la tabla roles
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

-- Mostrar configuración final
\echo '================================================'
\echo 'CONFIGURACIÓN COMPLETADA'
\echo '================================================'

SELECT 
    'Roles configurados:' as info,
    COUNT(*) as total
FROM public.roles;

SELECT 
    'UUID: ' || id as uuid_info,
    nombre_rol as rol
FROM public.roles 
ORDER BY nombre_rol;

\echo '================================================'
\echo 'PRÓXIMOS PASOS:'
\echo '1. Copiar los UUIDs mostrados arriba'
\echo '2. Actualizar el código si es necesario'
\echo '3. Probar la creación de técnicos'
\echo '================================================'

-- NOTA: Si necesitas generar nuevos UUIDs, usa:
-- SELECT uuid_generate_v4() as nuevo_uuid; 