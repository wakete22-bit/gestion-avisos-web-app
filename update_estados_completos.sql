-- Script completo para actualizar los estados válidos de las tablas avisos y trabajos_realizados
-- Este script resuelve el error de restricción de verificación que impide usar los nuevos estados

-- ========================================
-- 1. ACTUALIZAR TABLA AVISOS
-- ========================================

-- Eliminar la restricción existente
ALTER TABLE public.avisos DROP CONSTRAINT IF EXISTS avisos_estado_check;

-- Agregar la nueva restricción con todos los estados válidos
ALTER TABLE public.avisos 
ADD CONSTRAINT avisos_estado_check 
CHECK (estado = ANY (ARRAY[
    'No visitado'::text, 
    'Visitado pendiente'::text, 
    'En curso'::text, 
    'Pendiente de presupuesto'::text, 
    'Otra visita requerida'::text,
    'Listo para facturar'::text,
    'Pendiente'::text,
    'Completado'::text, 
    'Cancelado'::text
]));

-- ========================================
-- 2. ACTUALIZAR TABLA TRABAJOS_REALIZADOS
-- ========================================

-- Eliminar la restricción existente
ALTER TABLE public.trabajos_realizados DROP CONSTRAINT IF EXISTS trabajos_realizados_estado_check;

-- Agregar la nueva restricción con todos los estados válidos
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

-- ========================================
-- 3. VERIFICAR CAMBIOS APLICADOS
-- ========================================

-- Verificar restricción de avisos
SELECT 
    'avisos' as tabla,
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.avisos'::regclass 
  AND contype = 'c' 
  AND conname = 'avisos_estado_check'

UNION ALL

-- Verificar restricción de trabajos_realizados
SELECT 
    'trabajos_realizados' as tabla,
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.trabajos_realizados'::regclass 
  AND contype = 'c' 
  AND conname = 'trabajos_realizados_estado_check';

-- ========================================
-- 4. VERIFICAR ESTRUCTURA FINAL
-- ========================================

-- Mostrar todas las restricciones CHECK de ambas tablas
SELECT 
    tc.table_name,
    tc.constraint_name, 
    tc.constraint_type, 
    cc.check_clause
FROM information_schema.table_constraints tc
JOIN information_schema.check_constraints cc 
    ON tc.constraint_name = cc.constraint_name
WHERE tc.table_name IN ('avisos', 'trabajos_realizados')
    AND tc.constraint_type = 'CHECK'
ORDER BY tc.table_name, tc.constraint_name;
