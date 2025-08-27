-- Script para agregar numeración secuencial a los avisos
-- Este script agrega un campo numero_secuencial que se auto-incrementa

-- 1. Agregar el campo numero_secuencial a la tabla avisos
ALTER TABLE public.avisos 
ADD COLUMN IF NOT EXISTS numero_secuencial SERIAL;

-- 2. Crear una secuencia personalizada para controlar la numeración
CREATE SEQUENCE IF NOT EXISTS avisos_numero_secuencial_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- 3. Crear función para generar el número secuencial
CREATE OR REPLACE FUNCTION generar_numero_secuencial_aviso()
RETURNS TRIGGER AS $$
BEGIN
    -- Obtener el siguiente número de la secuencia
    NEW.numero_secuencial := nextval('avisos_numero_secuencial_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Crear trigger que se ejecute antes de insertar
DROP TRIGGER IF EXISTS trigger_generar_numero_secuencial_aviso ON public.avisos;
CREATE TRIGGER trigger_generar_numero_secuencial_aviso
    BEFORE INSERT ON public.avisos
    FOR EACH ROW
    EXECUTE FUNCTION generar_numero_secuencial_aviso();

-- 5. Actualizar registros existentes con números secuenciales
-- Primero, reiniciar la secuencia al valor máximo actual + 1
SELECT setval('avisos_numero_secuencial_seq', COALESCE((SELECT MAX(numero_secuencial) FROM public.avisos), 0) + 1, false);

-- Luego, actualizar registros existentes que no tengan número secuencial
UPDATE public.avisos 
SET numero_secuencial = nextval('avisos_numero_secuencial_seq')
WHERE numero_secuencial IS NULL;

-- 6. Hacer el campo NOT NULL después de actualizar todos los registros
ALTER TABLE public.avisos 
ALTER COLUMN numero_secuencial SET NOT NULL;

-- 7. Crear índice para mejorar el rendimiento de consultas por número secuencial
CREATE INDEX IF NOT EXISTS idx_avisos_numero_secuencial 
ON public.avisos(numero_secuencial);

-- 8. Verificar que todo se ha aplicado correctamente
SELECT 
    'Campo numero_secuencial agregado' as accion,
    COUNT(*) as total_avisos,
    MIN(numero_secuencial) as min_numero,
    MAX(numero_secuencial) as max_numero
FROM public.avisos;

-- 9. Mostrar algunos ejemplos de avisos con sus números secuenciales
SELECT 
    id,
    numero_secuencial,
    nombre_cliente_aviso,
    fecha_creacion
FROM public.avisos 
ORDER BY numero_secuencial 
LIMIT 10;
