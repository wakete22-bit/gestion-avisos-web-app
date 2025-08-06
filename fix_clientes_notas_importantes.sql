-- Script para agregar la columna notas_importantes a la tabla clientes
-- Ejecutar este script en la base de datos PostgreSQL

-- Agregar campo notas_importantes a la tabla clientes
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS notas_importantes text;

-- Agregar comentario para documentación
COMMENT ON COLUMN public.clientes.notas_importantes IS 'Notas importantes sobre el cliente para el equipo técnico';

-- Verificar que la columna se agregó correctamente
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'clientes' AND column_name = 'notas_importantes'; 