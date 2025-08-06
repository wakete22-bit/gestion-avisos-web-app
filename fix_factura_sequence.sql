-- Script para crear una secuencia para los números de factura
-- Esto evitará conflictos de números duplicados

-- Crear secuencia para números de factura
CREATE SEQUENCE IF NOT EXISTS public.factura_numero_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 999999
    CACHE 1;

-- Función para generar el siguiente número de factura de forma atómica
CREATE OR REPLACE FUNCTION obtener_siguiente_numero_factura()
RETURNS text AS $$
DECLARE
    siguiente_numero integer;
    año_actual integer;
    numero_factura text;
BEGIN
    -- Obtener el año actual
    año_actual := EXTRACT(YEAR FROM CURRENT_DATE);
    
    -- Obtener el siguiente número de la secuencia
    siguiente_numero := nextval('public.factura_numero_seq');
    
    -- Formatear el número de factura
    numero_factura := 'F' || año_actual || '-' || LPAD(siguiente_numero::text, 3, '0');
    
    RETURN numero_factura;
END;
$$ LANGUAGE plpgsql;

-- Función para reiniciar la secuencia al cambiar de año
CREATE OR REPLACE FUNCTION reiniciar_secuencia_factura()
RETURNS void AS $$
BEGIN
    -- Reiniciar la secuencia al 1
    ALTER SEQUENCE public.factura_numero_seq RESTART WITH 1;
END;
$$ LANGUAGE plpgsql;

-- Trigger para reiniciar la secuencia automáticamente al cambiar de año
CREATE OR REPLACE FUNCTION check_year_change()
RETURNS trigger AS $$
DECLARE
    año_actual integer;
    año_ultima_factura integer;
BEGIN
    -- Obtener el año actual
    año_actual := EXTRACT(YEAR FROM CURRENT_DATE);
    
    -- Obtener el año de la última factura creada
    SELECT EXTRACT(YEAR FROM fecha_creacion) INTO año_ultima_factura
    FROM public.facturas
    ORDER BY fecha_creacion DESC
    LIMIT 1;
    
    -- Si es un año nuevo, reiniciar la secuencia
    IF año_actual > año_ultima_factura THEN
        PERFORM reiniciar_secuencia_factura();
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para verificar cambio de año
DROP TRIGGER IF EXISTS trigger_check_year_change ON public.facturas;
CREATE TRIGGER trigger_check_year_change
    BEFORE INSERT ON public.facturas
    FOR EACH ROW
    EXECUTE FUNCTION check_year_change();

-- Verificar que la secuencia se creó correctamente
SELECT 'Secuencia creada: ' || sequence_name AS resultado
FROM information_schema.sequences 
WHERE sequence_name = 'factura_numero_seq';

-- Probar la función
SELECT obtener_siguiente_numero_factura() AS numero_prueba; 