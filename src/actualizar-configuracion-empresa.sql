-- Script para añadir el campo precio_hora_mano_obra a la tabla configuracion_empresa
-- Este script debe ejecutarse en la base de datos existente

-- Añadir la columna precio_hora_mano_obra si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'configuracion_empresa' 
        AND column_name = 'precio_hora_mano_obra'
    ) THEN
        ALTER TABLE public.configuracion_empresa 
        ADD COLUMN precio_hora_mano_obra numeric NOT NULL DEFAULT 50.00;
        
        RAISE NOTICE 'Columna precio_hora_mano_obra añadida a configuracion_empresa';
    ELSE
        RAISE NOTICE 'La columna precio_hora_mano_obra ya existe en configuracion_empresa';
    END IF;
END $$;

-- Actualizar registros existentes que tengan NULL en precio_hora_mano_obra
UPDATE public.configuracion_empresa 
SET precio_hora_mano_obra = 50.00 
WHERE precio_hora_mano_obra IS NULL;

-- Verificar que la columna se añadió correctamente
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'configuracion_empresa' 
AND column_name = 'precio_hora_mano_obra';

-- Mostrar los datos actuales
SELECT 
    id,
    nombre_empresa,
    precio_hora_mano_obra,
    fecha_actualizacion
FROM public.configuracion_empresa;
