-- ========================================
-- MIGRACIÓN: ELIMINAR GESTIÓN DE TRABAJOS
-- ========================================
-- Este script elimina la gestión de trabajos realizados y simplifica el flujo a:
-- Aviso → Albarán → Facturación

-- 1. Primero, eliminar las referencias foráneas que dependen de trabajos_realizados
ALTER TABLE public.albaranes DROP CONSTRAINT IF EXISTS albaranes_trabajo_id_fkey;
ALTER TABLE public.historial_flujo DROP CONSTRAINT IF EXISTS historial_flujo_trabajo_id_fkey;

-- 2. Eliminar las tablas dependientes de trabajos_realizados
DROP TABLE IF EXISTS public.materiales_trabajo CASCADE;

-- 3. Eliminar la tabla trabajos_realizados
DROP TABLE IF EXISTS public.trabajos_realizados CASCADE;

-- 4. Eliminar las columnas que referencian trabajos
ALTER TABLE public.albaranes DROP COLUMN IF EXISTS trabajo_id;
ALTER TABLE public.historial_flujo DROP COLUMN IF EXISTS trabajo_id;

-- 5. Actualizar la tabla albaranes para que sea autocontenida
-- Ya tiene aviso_id, repuestos_utilizados como array, y repuestos_albaran como tabla relacionada
-- No necesita más cambios estructurales

-- 6. Actualizar estados permitidos en avisos (simplificar)
ALTER TABLE public.avisos DROP CONSTRAINT IF EXISTS avisos_estado_check;
ALTER TABLE public.avisos ADD CONSTRAINT avisos_estado_check 
  CHECK (estado = ANY (ARRAY[
    'Pendiente'::text, 
    'En curso'::text, 
    'Pendiente de presupuesto'::text, 
    'Listo para facturar'::text,
    'Completado'::text, 
    'Cancelado'::text
  ]));

-- 7. Limpiar historial_flujo de referencias a trabajos (opcional, para limpiar datos históricos)
-- UPDATE public.historial_flujo SET observaciones = CONCAT(observaciones, ' [Trabajo ID eliminado durante migración]') 
-- WHERE trabajo_id IS NOT NULL;

COMMENT ON TABLE public.albaranes IS 'Albaranes que representan visitas/intervenciones en avisos. Cada albarán es una intervención completa.';
COMMENT ON COLUMN public.albaranes.aviso_id IS 'Referencia directa al aviso. Un aviso puede tener múltiples albaranes (múltiples visitas).';
COMMENT ON TABLE public.repuestos_albaran IS 'Repuestos utilizados en cada albarán. Reemplaza la gestión de materiales_trabajo.';
