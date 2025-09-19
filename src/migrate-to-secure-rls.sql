-- ========================================
-- SCRIPT DE MIGRACIÓN A RLS SEGURO
-- ========================================
-- Este script migra de políticas permisivas a políticas seguras
-- EJECUTAR CON CUIDADO - HACER BACKUP ANTES

-- ========================================
-- 1. VERIFICAR ESTADO ACTUAL
-- ========================================

-- Verificar políticas actuales
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    cmd,
    permissive
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ========================================
-- 2. CREAR ROLES SI NO EXISTEN
-- ========================================

-- Insertar roles básicos si no existen
INSERT INTO public.roles (nombre_rol) 
VALUES 
    ('Administrador'),
    ('Supervisor'), 
    ('Técnico')
ON CONFLICT (nombre_rol) DO NOTHING;

-- ========================================
-- 3. APLICAR POLÍTICAS SEGURAS
-- ========================================

-- Ejecutar el archivo de políticas seguras
\i src/rls-policies-secure.sql

-- ========================================
-- 4. VERIFICAR MIGRACIÓN
-- ========================================

-- Verificar que las nuevas políticas están activas
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    cmd,
    permissive,
    CASE 
        WHEN qual LIKE '%auth.user_id()%' THEN 'SEGURA'
        WHEN qual = 'true' THEN 'PERMISIVA'
        ELSE 'OTRA'
    END as tipo_politica
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ========================================
-- 5. TEST DE AISLAMIENTO
-- ========================================

-- Verificar que la función auth.user_id() funciona
SELECT auth.user_id() as usuario_actual;

-- Verificar roles de usuarios
SELECT 
    u.id,
    u.nombre_completo,
    u.email,
    r.nombre_rol
FROM public.usuarios u
JOIN public.roles r ON u.rol_id = r.id
ORDER BY u.nombre_completo;

-- ========================================
-- 6. INSTRUCCIONES DE PRUEBA
-- ========================================

/*
PASOS PARA PROBAR EL AISLAMIENTO:

1. Crear usuarios de prueba con diferentes roles:
   - Un técnico
   - Un supervisor  
   - Un administrador

2. Asignar avisos a diferentes técnicos

3. Iniciar sesión con cada usuario y verificar que:
   - Los técnicos solo ven avisos asignados a ellos
   - Los supervisores ven todos los avisos
   - Los administradores tienen acceso completo

4. Verificar que las configuraciones solo son accesibles por administradores

5. Verificar que el inventario y clientes son visibles por todos los usuarios autenticados
*/

-- ========================================
-- 7. ROLLBACK (EN CASO DE PROBLEMAS)
-- ========================================

/*
Si necesitas volver a las políticas permisivas:

-- Deshabilitar RLS temporalmente
ALTER TABLE public.presupuestos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.albaranes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.repuestos_albaran DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.avisos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.facturas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventario DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.fotos_aviso DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.historial_flujo DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.lineas_factura DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracion_avisos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracion_empresa DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracion_facturacion DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracion_flujo DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracion_notificaciones DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracion_sistema DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles DISABLE ROW LEVEL SECURITY;

-- O ejecutar el archivo original
\i src/rls-policies-complete.sql
*/
