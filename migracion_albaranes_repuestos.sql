-- ========================================
-- MIGRACIÓN: ALBARANES CON CANTIDADES REALES DE REPUESTOS
-- ========================================
-- Este script actualiza la base de datos para soportar cantidades reales
-- de repuestos en los albaranes, resolviendo el problema de facturación

-- 1. Crear nueva tabla para repuestos de albaranes con cantidades
CREATE TABLE IF NOT EXISTS public.repuestos_albaran (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  albaran_id uuid NOT NULL,
  nombre text NOT NULL,
  cantidad numeric NOT NULL DEFAULT 1 CHECK (cantidad > 0::numeric),
  precio_neto numeric NOT NULL DEFAULT 0,
  precio_pvp numeric NOT NULL DEFAULT 0,
  unidad text NOT NULL DEFAULT 'unidad',
  codigo text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  CONSTRAINT repuestos_albaran_pkey PRIMARY KEY (id),
  CONSTRAINT repuestos_albaran_albaran_id_fkey FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id) ON DELETE CASCADE
);

-- 2. Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_repuestos_albaran_albaran_id ON public.repuestos_albaran(albaran_id);
CREATE INDEX IF NOT EXISTS idx_repuestos_albaran_nombre ON public.repuestos_albaran(nombre);

-- 3. Agregar comentarios a la tabla
COMMENT ON TABLE public.repuestos_albaran IS 'Repuestos utilizados en albaranes con cantidades reales y precios';
COMMENT ON COLUMN public.repuestos_albaran.cantidad IS 'Cantidad real utilizada del repuesto';
COMMENT ON COLUMN public.repuestos_albaran.precio_neto IS 'Precio neto del repuesto al momento del uso';
COMMENT ON COLUMN public.repuestos_albaran.precio_pvp IS 'Precio PVP del repuesto al momento del uso';
COMMENT ON COLUMN public.repuestos_albaran.unidad IS 'Unidad de medida del repuesto (unidad, kg, m, etc.)';

-- 4. Crear función para migrar datos existentes
CREATE OR REPLACE FUNCTION migrar_repuestos_albaranes_existentes()
RETURNS void AS $$
DECLARE
    albaran_record RECORD;
    repuesto_nombre text;
BEGIN
    -- Migrar repuestos existentes de albaranes
    FOR albaran_record IN 
        SELECT id, repuestos_utilizados 
        FROM public.albaranes 
        WHERE repuestos_utilizados IS NOT NULL 
        AND array_length(repuestos_utilizados, 1) > 0
    LOOP
        -- Para cada repuesto en el array
        FOREACH repuesto_nombre IN ARRAY albaran_record.repuestos_utilizados
        LOOP
            -- Insertar en la nueva tabla con cantidad por defecto
            INSERT INTO public.repuestos_albaran (
                albaran_id, 
                nombre, 
                cantidad, 
                precio_neto, 
                precio_pvp, 
                unidad, 
                codigo
            ) VALUES (
                albaran_record.id,
                repuesto_nombre,
                1, -- Cantidad por defecto
                0, -- Precio neto por defecto
                25, -- Precio PVP por defecto
                'unidad', -- Unidad por defecto
                '' -- Código vacío
            );
        END LOOP;
    END LOOP;
    
    RAISE NOTICE 'Migración completada. Se migraron repuestos de albaranes existentes.';
END;
$$ LANGUAGE plpgsql;

-- 5. Ejecutar la migración
SELECT migrar_repuestos_albaranes_existentes();

-- 6. Crear vista para facilitar consultas de repuestos con cantidades
CREATE OR REPLACE VIEW public.vista_repuestos_albaran AS
SELECT 
    ra.id,
    ra.albaran_id,
    ra.nombre,
    ra.cantidad,
    ra.precio_neto,
    ra.precio_pvp,
    ra.unidad,
    ra.codigo,
    ra.fecha_creacion,
    a.estado_cierre,
    a.fecha_cierre,
    a.aviso_id,
    a.trabajo_id
FROM public.repuestos_albaran ra
JOIN public.albaranes a ON ra.albaran_id = a.id;

-- 7. Crear función para obtener resumen de repuestos por aviso
CREATE OR REPLACE FUNCTION obtener_resumen_repuestos_aviso(p_aviso_id uuid)
RETURNS TABLE(
    nombre text,
    cantidad_total numeric,
    precio_neto_promedio numeric,
    precio_pvp_promedio numeric,
    unidad text,
    codigo text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ra.nombre,
        SUM(ra.cantidad) as cantidad_total,
        AVG(ra.precio_neto) as precio_neto_promedio,
        AVG(ra.precio_pvp) as precio_pvp_promedio,
        ra.unidad,
        ra.codigo
    FROM public.repuestos_albaran ra
    JOIN public.albaranes a ON ra.albaran_id = a.id
    WHERE a.aviso_id = p_aviso_id
    GROUP BY ra.nombre, ra.unidad, ra.codigo
    ORDER BY ra.nombre;
END;
$$ LANGUAGE plpgsql;

-- 8. Crear función para calcular total de repuestos por albarán
CREATE OR REPLACE FUNCTION calcular_total_repuestos_albaran(p_albaran_id uuid)
RETURNS numeric AS $$
DECLARE
    total numeric;
BEGIN
    SELECT COALESCE(SUM(cantidad * precio_pvp), 0)
    INTO total
    FROM public.repuestos_albaran
    WHERE albaran_id = p_albaran_id;
    
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- 9. Agregar comentarios a las funciones
COMMENT ON FUNCTION migrar_repuestos_albaranes_existentes() IS 'Migra repuestos existentes de albaranes a la nueva estructura con cantidades';
COMMENT ON FUNCTION obtener_resumen_repuestos_aviso(uuid) IS 'Obtiene resumen de repuestos utilizados en un aviso con cantidades totales';
COMMENT ON FUNCTION calcular_total_repuestos_albaran(uuid) IS 'Calcula el total monetario de repuestos en un albarán';

-- 10. Crear trigger para mantener sincronización (opcional)
CREATE OR REPLACE FUNCTION actualizar_repuestos_albaran()
RETURNS TRIGGER AS $$
BEGIN
    -- Aquí se pueden agregar validaciones o lógica adicional
    -- Por ejemplo, verificar que la cantidad sea positiva
    IF NEW.cantidad <= 0 THEN
        RAISE EXCEPTION 'La cantidad debe ser mayor que 0';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_repuestos_albaran
    BEFORE INSERT OR UPDATE ON public.repuestos_albaran
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_repuestos_albaran();

-- ========================================
-- VERIFICACIÓN DE LA MIGRACIÓN
-- ========================================

-- Verificar que la tabla se creó correctamente
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'repuestos_albaran'
ORDER BY ordinal_position;

-- Verificar que se migraron los datos
SELECT 
    COUNT(*) as total_repuestos_migrados,
    COUNT(DISTINCT albaran_id) as albaranes_con_repuestos
FROM public.repuestos_albaran;

-- Verificar la vista
SELECT * FROM public.vista_repuestos_albaran LIMIT 5;

-- ========================================
-- INSTRUCCIONES POST-MIGRACIÓN
-- ========================================
/*
1. Ejecutar este script en la base de datos
2. Verificar que no hay errores en la migración
3. Actualizar la aplicación para usar la nueva estructura
4. Probar la generación de facturas con cantidades reales
5. Verificar que las facturas muestran cantidades correctas

NOTA: Después de la migración, los albaranes existentes tendrán cantidades por defecto (1).
Es recomendable revisar y actualizar manualmente las cantidades reales si es necesario.
*/
