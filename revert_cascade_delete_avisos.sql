-- Script para revertir la eliminación en cascada de la tabla avisos
-- Este script restaura las restricciones originales sin CASCADE DELETE

-- 1. Eliminar las restricciones con CASCADE DELETE
ALTER TABLE public.trabajos_realizados DROP CONSTRAINT IF EXISTS trabajos_realizados_aviso_id_fkey;
ALTER TABLE public.albaranes DROP CONSTRAINT IF EXISTS albaranes_aviso_id_fkey;
ALTER TABLE public.presupuestos DROP CONSTRAINT IF EXISTS presupuestos_aviso_id_fkey;
ALTER TABLE public.fotos_aviso DROP CONSTRAINT IF EXISTS fotos_aviso_aviso_id_fkey;
ALTER TABLE public.historial_flujo DROP CONSTRAINT IF EXISTS historial_flujo_aviso_id_fkey;
ALTER TABLE public.facturas DROP CONSTRAINT IF EXISTS facturas_aviso_id_fkey;

-- 2. Recrear las restricciones originales (sin CASCADE DELETE)
ALTER TABLE public.trabajos_realizados 
ADD CONSTRAINT trabajos_realizados_aviso_id_fkey 
FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);

ALTER TABLE public.albaranes 
ADD CONSTRAINT albaranes_aviso_id_fkey 
FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);

ALTER TABLE public.presupuestos 
ADD CONSTRAINT presupuestos_aviso_id_fkey 
FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);

ALTER TABLE public.fotos_aviso 
ADD CONSTRAINT fotos_aviso_aviso_id_fkey 
FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);

ALTER TABLE public.historial_flujo 
ADD CONSTRAINT historial_flujo_aviso_id_fkey 
FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);

ALTER TABLE public.facturas 
ADD CONSTRAINT facturas_aviso_id_fkey 
FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);

-- 3. Verificar que las restricciones se han restaurado correctamente
SELECT 
    tc.table_name, 
    tc.constraint_name, 
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    rc.delete_rule
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
  AND ccu.table_name = 'avisos'
ORDER BY tc.table_name;

