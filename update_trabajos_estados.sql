-- Script para actualizar los estados válidos de la tabla trabajos_realizados
-- Agregar los nuevos estados "Presupuesto pendiente" y "Otra visita"

-- 1. Eliminar la restricción existente
ALTER TABLE public.trabajos_realizados DROP CONSTRAINT IF EXISTS trabajos_realizados_estado_check;

-- 2. Agregar la nueva restricción con todos los estados válidos
ALTER TABLE public.trabajos_realizados 
ADD CONSTRAINT trabajos_realizados_estado_check 
CHECK (estado = ANY (ARRAY[
    'Pendiente'::text, 
    'En curso'::text, 
    'Abierto'::text, 
    'Cerrado'::text, 
    'Finalizado'::text,
    'Completado'::text,
    'Cancelado'::text,
    'Presupuesto pendiente'::text,
    'Otra visita'::text
]));

-- 3. Verificar que la restricción se ha aplicado correctamente
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.trabajos_realizados'::regclass 
  AND contype = 'c' 
  AND conname = 'trabajos_realizados_estado_check';

-- 4. Verificar que la tabla tiene la restricción correcta
SELECT 
    tc.constraint_name, 
    tc.constraint_type, 
    cc.check_clause
FROM information_schema.table_constraints tc
JOIN information_schema.check_constraints cc 
    ON tc.constraint_name = cc.constraint_name
WHERE tc.table_name = 'trabajos_realizados' 
    AND tc.constraint_type = 'CHECK';
