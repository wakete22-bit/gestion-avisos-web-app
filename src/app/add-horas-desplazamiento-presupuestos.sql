-- Script para añadir el campo horas_desplazamiento a la tabla presupuestos
-- Ejecutar este script en la base de datos para añadir el campo faltante

ALTER TABLE public.presupuestos 
ADD COLUMN horas_desplazamiento numeric DEFAULT 0;

-- Comentario del campo
COMMENT ON COLUMN public.presupuestos.horas_desplazamiento IS 'Horas de desplazamiento y traslados para el presupuesto';

-- Actualizar presupuestos existentes para que tengan valor por defecto
UPDATE public.presupuestos 
SET horas_desplazamiento = 0 
WHERE horas_desplazamiento IS NULL;

-- Verificar que el campo se añadió correctamente
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'presupuestos' 
AND table_schema = 'public'
AND column_name = 'horas_desplazamiento';
