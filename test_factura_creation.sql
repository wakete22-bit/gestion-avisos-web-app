-- Script de prueba para verificar creación de facturas
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar que la tabla facturas existe y tiene la estructura correcta
SELECT 
    EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_name = 'facturas' 
        AND table_schema = 'public'
    ) as tabla_facturas_existe;

-- 2. Verificar que los campos numéricos tienen restricciones NOT NULL
SELECT 
    column_name,
    is_nullable,
    data_type
FROM information_schema.columns 
WHERE table_name = 'facturas' 
AND table_schema = 'public'
AND column_name IN ('subtotal', 'iva', 'total')
ORDER BY ordinal_position;

-- 3. Crear una factura de prueba con valores válidos
INSERT INTO facturas (
    numero_factura,
    fecha_emision,
    nombre_cliente,
    direccion_cliente,
    cif_cliente,
    email_cliente,
    subtotal,
    iva,
    total,
    estado,
    notas,
    fecha_creacion,
    fecha_actualizacion
) VALUES (
    'TEST-' || EXTRACT(EPOCH FROM NOW())::text,
    CURRENT_DATE,
    'Cliente de Prueba',
    'Dirección de Prueba',
    'TEST-CIF',
    'test@ejemplo.com',
    100.00,
    21.00,
    121.00,
    'Pendiente',
    'Factura de prueba para verificar estructura',
    NOW(),
    NOW()
) RETURNING id, numero_factura, subtotal, iva, total;

-- 4. Verificar que la factura de prueba se creó correctamente
SELECT 
    id,
    numero_factura,
    subtotal,
    iva,
    total,
    (subtotal + iva) as total_calculado,
    ABS(total - (subtotal + iva)) as diferencia
FROM facturas 
WHERE numero_factura LIKE 'TEST-%'
ORDER BY fecha_creacion DESC
LIMIT 1;

-- 5. Limpiar facturas de prueba
DELETE FROM facturas 
WHERE numero_factura LIKE 'TEST-%';

-- 6. Verificar que no hay valores NULL en campos numéricos
SELECT 
    COUNT(*) as total_facturas,
    COUNT(subtotal) as facturas_con_subtotal,
    COUNT(iva) as facturas_con_iva,
    COUNT(total) as facturas_con_total
FROM facturas;

-- 7. Mostrar las últimas 5 facturas para verificar estructura
SELECT 
    id,
    numero_factura,
    nombre_cliente,
    subtotal,
    iva,
    total,
    estado,
    fecha_creacion
FROM facturas 
ORDER BY fecha_creacion DESC
LIMIT 5; 