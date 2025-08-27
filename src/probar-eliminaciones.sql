-- ========================================
-- PROBAR ELIMINACIONES EN CADA TABLA
-- ========================================
-- Este script te ayudará a identificar exactamente qué está impidiendo las eliminaciones

-- ========================================
-- 1. PROBAR ELIMINACIÓN EN PRESUPUESTOS
-- ========================================
-- Primero, veamos qué presupuestos existen
SELECT 
    id, 
    aviso_id, 
    estado,
    fecha_creacion
FROM public.presupuestos 
LIMIT 5;

-- Intentar eliminar un presupuesto (cambia el ID por uno real)
-- DELETE FROM public.presupuestos WHERE id = 'ID_DEL_PRESUPUESTO';

-- ========================================
-- 2. PROBAR ELIMINACIÓN EN ALBARANES
-- ========================================
-- Ver qué albaranes existen
SELECT 
    id, 
    aviso_id, 
    estado_cierre,
    fecha_creacion
FROM public.albaranes 
LIMIT 5;

-- Intentar eliminar un albarán (cambia el ID por uno real)
-- DELETE FROM public.albaranes WHERE id = 'ID_DEL_ALBARAN';

-- ========================================
-- 3. PROBAR ELIMINACIÓN EN FACTURAS
-- ========================================
-- Ver qué facturas existen
SELECT 
    id, 
    numero_factura,
    estado,
    fecha_creacion
FROM public.facturas 
LIMIT 5;

-- Intentar eliminar una factura (cambia el ID por uno real)
-- DELETE FROM public.facturas WHERE id = 'ID_DE_LA_FACTURA';

-- ========================================
-- 4. VERIFICAR DEPENDENCIAS
-- ========================================
-- Ver si hay presupuestos que dependan de albaranes
SELECT 
    p.id as presupuesto_id,
    p.aviso_id,
    p.albaran_id,
    a.id as albaran_existe
FROM public.presupuestos p
LEFT JOIN public.albaranes a ON p.albaran_id = a.id
WHERE p.albaran_id IS NOT NULL
LIMIT 10;

-- Ver si hay albaranes que dependan de avisos
SELECT 
    al.id as albaran_id,
    al.aviso_id,
    av.id as aviso_existe
FROM public.albaranes al
LEFT JOIN public.avisos av ON al.aviso_id = av.id
LIMIT 10;

-- ========================================
-- 5. VERIFICAR RESTRICCIONES DE FOREIGN KEY
-- ========================================
-- Ver todas las restricciones que podrían impedir eliminaciones
SELECT
    tc.constraint_name,
    tc.table_name as "Tabla",
    kcu.column_name as "Columna",
    ccu.table_name AS "Tabla Referenciada",
    ccu.column_name AS "Columna Referenciada",
    rc.delete_rule as "Regla de Eliminación",
    CASE 
        WHEN rc.delete_rule = 'CASCADE' THEN '✅ Eliminación en cascada permitida'
        WHEN rc.delete_rule = 'SET NULL' THEN '⚠️ Se establece NULL en eliminación'
        WHEN rc.delete_rule = 'RESTRICT' THEN '🚫 Eliminación restringida'
        WHEN rc.delete_rule = 'NO ACTION' THEN '🚫 Eliminación bloqueada'
        ELSE '❓ Regla desconocida: ' || rc.delete_rule
    END as "Explicación"
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    JOIN information_schema.referential_constraints AS rc
      ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
ORDER BY tc.table_name;

-- ========================================
-- 6. VERIFICAR PERMISOS DE USUARIO
-- ========================================
-- Ver qué usuario está ejecutando las consultas
SELECT current_user as "Usuario Actual";

-- Ver permisos en las tablas principales
SELECT 
    schemaname,
    tablename,
    tableowner as "Propietario",
    hasinsert as "Puede INSERT",
    hasselect as "Puede SELECT", 
    hasupdate as "Puede UPDATE",
    hasdelete as "Puede DELETE"
FROM pg_tables 
WHERE schemaname = 'public'
    AND tablename IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
ORDER BY tablename;
