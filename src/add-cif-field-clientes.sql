-- Script para añadir el campo CIF a la tabla clientes
-- Este campo será requerido para la generación de facturas

-- Añadir la columna CIF a la tabla clientes
ALTER TABLE public.clientes 
ADD COLUMN cif text;

-- Añadir comentario para documentar el campo
COMMENT ON COLUMN public.clientes.cif IS 'CIF/NIF del cliente, requerido para facturación';

-- Crear índice para mejorar las búsquedas por CIF
CREATE INDEX idx_clientes_cif ON public.clientes(cif);

-- Actualizar la fecha de modificación de la tabla
UPDATE public.clientes 
SET fecha_actualizacion = now() 
WHERE cif IS NULL;

-- Verificar que la columna se ha añadido correctamente
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'clientes' 
AND column_name = 'cif';



