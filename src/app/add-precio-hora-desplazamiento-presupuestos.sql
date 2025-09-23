-- Script para añadir el campo precio_hora_desplazamiento a la tabla presupuestos
-- Ejecutar este script en la base de datos para añadir el campo faltante

ALTER TABLE public.presupuestos 
ADD COLUMN precio_hora_desplazamiento numeric DEFAULT 0;

-- Comentario del campo
COMMENT ON COLUMN public.presupuestos.precio_hora_desplazamiento IS 'Precio por hora específico para desplazamientos y traslados';

-- Actualizar presupuestos existentes para que tengan valor por defecto (0)
UPDATE public.presupuestos 
SET precio_hora_desplazamiento = 0 
WHERE precio_hora_desplazamiento IS NULL;

-- Verificar que el campo se añadió correctamente
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'presupuestos' 
AND table_schema = 'public'
AND column_name IN ('horas_desplazamiento', 'precio_hora_desplazamiento')
ORDER BY column_name;
