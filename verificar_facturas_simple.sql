-- Script simple para verificar y corregir problemas de facturas
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar estructura básica de la tabla facturas
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'facturas' 
AND table_schema = 'public'
AND column_name IN ('subtotal', 'iva', 'total')
ORDER BY ordinal_position;

-- 2. Contar facturas y verificar valores NULL
SELECT 
    COUNT(*) as total_facturas,
    COUNT(subtotal) as facturas_con_subtotal,
    COUNT(iva) as facturas_con_iva,
    COUNT(total) as facturas_con_total
FROM facturas;

-- 3. Mostrar facturas con valores NULL (si existen)
SELECT 
    id,
    numero_factura,
    subtotal,
    iva,
    total,
    fecha_creacion
FROM facturas 
WHERE subtotal IS NULL 
   OR iva IS NULL 
   OR total IS NULL;

-- 4. Corregir facturas con valores NULL (ejecutar solo si hay problemas)
UPDATE facturas 
SET 
    subtotal = COALESCE(subtotal, 0),
    iva = COALESCE(iva, 0),
    total = COALESCE(total, 0),
    fecha_actualizacion = NOW()
WHERE subtotal IS NULL 
   OR iva IS NULL 
   OR total IS NULL;

-- 5. Verificar que no hay valores NULL después de la corrección
SELECT 
    COUNT(*) as total_facturas,
    COUNT(subtotal) as facturas_con_subtotal,
    COUNT(iva) as facturas_con_iva,
    COUNT(total) as facturas_con_total
FROM facturas;

-- 6. Mostrar estadísticas básicas
SELECT 
    MIN(subtotal) as min_subtotal,
    MAX(subtotal) as max_subtotal,
    MIN(iva) as min_iva,
    MAX(iva) as max_iva,
    MIN(total) as min_total,
    MAX(total) as max_total
FROM facturas;

-- 7. Verificar coherencia de totales
SELECT 
    id,
    numero_factura,
    subtotal,
    iva,
    total,
    (subtotal + iva) as total_calculado,
    ABS(total - (subtotal + iva)) as diferencia
FROM facturas 
WHERE ABS(total - (subtotal + iva)) > 0.01
LIMIT 10;

-- 8. Corregir totales incoherentes (ejecutar solo si hay problemas)
UPDATE facturas 
SET 
    total = (subtotal + iva),
    fecha_actualizacion = NOW()
WHERE ABS(total - (subtotal + iva)) > 0.01;

-- 9. Verificar estructura de lineas_factura
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'lineas_factura' 
AND table_schema = 'public'
ORDER BY ordinal_position; 