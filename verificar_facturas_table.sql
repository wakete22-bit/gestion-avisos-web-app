-- Script para verificar y corregir la estructura de la tabla facturas
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar la estructura actual de la tabla facturas
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'facturas' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Verificar las restricciones de la tabla (corregido)
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    ccu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.constraint_column_usage ccu 
    ON tc.constraint_name = ccu.constraint_name
WHERE tc.table_name = 'facturas' 
AND tc.table_schema = 'public';

-- 3. Verificar si hay datos con valores NULL en campos NOT NULL
SELECT 
    COUNT(*) as total_facturas,
    COUNT(subtotal) as facturas_con_subtotal,
    COUNT(iva) as facturas_con_iva,
    COUNT(total) as facturas_con_total
FROM facturas;

-- 4. Mostrar facturas con valores NULL problemáticos
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

-- 5. Corregir facturas con valores NULL (si existen)
UPDATE facturas 
SET 
    subtotal = COALESCE(subtotal, 0),
    iva = COALESCE(iva, 0),
    total = COALESCE(total, 0),
    fecha_actualizacion = NOW()
WHERE subtotal IS NULL 
   OR iva IS NULL 
   OR total IS NULL;

-- 6. Verificar que no hay valores NULL después de la corrección
SELECT 
    COUNT(*) as total_facturas,
    COUNT(subtotal) as facturas_con_subtotal,
    COUNT(iva) as facturas_con_iva,
    COUNT(total) as facturas_con_total
FROM facturas;

-- 7. Mostrar estadísticas de valores numéricos
SELECT 
    MIN(subtotal) as min_subtotal,
    MAX(subtotal) as max_subtotal,
    AVG(subtotal) as avg_subtotal,
    MIN(iva) as min_iva,
    MAX(iva) as max_iva,
    AVG(iva) as avg_iva,
    MIN(total) as min_total,
    MAX(total) as max_total,
    AVG(total) as avg_total
FROM facturas;

-- 8. Verificar que los totales son coherentes (total = subtotal + iva)
SELECT 
    id,
    numero_factura,
    subtotal,
    iva,
    total,
    (subtotal + iva) as total_calculado,
    ABS(total - (subtotal + iva)) as diferencia
FROM facturas 
WHERE ABS(total - (subtotal + iva)) > 0.01; -- Tolerancia de 1 céntimo

-- 9. Corregir totales incoherentes
UPDATE facturas 
SET 
    total = (subtotal + iva),
    fecha_actualizacion = NOW()
WHERE ABS(total - (subtotal + iva)) > 0.01;

-- 10. Verificar la estructura de la tabla lineas_factura
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'lineas_factura' 
AND table_schema = 'public'
ORDER BY ordinal_position; 