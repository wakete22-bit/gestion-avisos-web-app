-- Script para actualizar los estados válidos de la tabla avisos
-- Agregar el estado "Listo para facturar" que falta

-- 1. Eliminar la restricción existente
ALTER TABLE public.avisos DROP CONSTRAINT IF EXISTS avisos_estado_check;

-- 2. Agregar la nueva restricción con todos los estados válidos
ALTER TABLE public.avisos 
ADD CONSTRAINT avisos_estado_check 
CHECK (estado = ANY (ARRAY[
    'No visitado'::text, 
    'Visitado pendiente'::text, 
    'En curso'::text, 
    'Pendiente de presupuesto'::text, 
    'Listo para facturar'::text,
    'Completado'::text, 
    'Cancelado'::text
]));

-- 3. Verificar que la restricción se ha aplicado correctamente
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.avisos'::regclass 
  AND contype = 'c' 
  AND conname = 'avisos_estado_check';

