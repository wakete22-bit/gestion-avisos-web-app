-- ========================================
-- MIGRACIÓN PASO A PASO - ELIMINACIÓN DE TRABAJOS
-- ========================================
-- Ejecutar estos comandos UNO POR UNO en Supabase SQL Editor

-- PASO 1: Verificar estructura actual
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'albaranes' 
ORDER BY ordinal_position;

-- PASO 2: Verificar si existe la columna trabajo_id
SELECT EXISTS (
  SELECT 1 
  FROM information_schema.columns 
  WHERE table_name = 'albaranes' AND column_name = 'trabajo_id'
);

-- PASO 3: Verificar si existe la tabla trabajos_realizados
SELECT EXISTS (
  SELECT 1 
  FROM information_schema.tables 
  WHERE table_name = 'trabajos_realizados'
);

-- PASO 4: Agregar la nueva columna fecha_trabajo (si no existe)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'albaranes' AND column_name = 'fecha_trabajo'
    ) THEN
        ALTER TABLE public.albaranes ADD COLUMN fecha_trabajo date;
        RAISE NOTICE 'Columna fecha_trabajo agregada';
    ELSE
        RAISE NOTICE 'Columna fecha_trabajo ya existe';
    END IF;
END $$;

-- PASO 5: Migrar datos existentes (si hay albaranes con trabajo_id)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'albaranes' AND column_name = 'trabajo_id'
    ) THEN
        -- Actualizar fecha_trabajo basándose en fecha_cierre
        UPDATE public.albaranes 
        SET fecha_trabajo = DATE(fecha_cierre)
        WHERE fecha_trabajo IS NULL;
        
        RAISE NOTICE 'Datos migrados desde fecha_cierre a fecha_trabajo';
    END IF;
END $$;

-- PASO 6: Hacer NOT NULL la columna fecha_trabajo
ALTER TABLE public.albaranes 
ALTER COLUMN fecha_trabajo SET NOT NULL;

-- PASO 7: Eliminar restricción de foreign key trabajo_id (si existe)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name LIKE '%trabajo%' 
        AND table_name = 'albaranes'
        AND constraint_type = 'FOREIGN KEY'
    ) THEN
        -- Buscar y eliminar la restricción exacta
        EXECUTE (
            SELECT 'ALTER TABLE public.albaranes DROP CONSTRAINT ' || constraint_name || ';'
            FROM information_schema.table_constraints 
            WHERE constraint_name LIKE '%trabajo%' 
            AND table_name = 'albaranes'
            AND constraint_type = 'FOREIGN KEY'
            LIMIT 1
        );
        RAISE NOTICE 'Restricción FK trabajo_id eliminada';
    END IF;
END $$;

-- PASO 8A: Eliminar TODAS las vistas dependientes que usan trabajo_id
DROP VIEW IF EXISTS public.vista_repuestos_albaran CASCADE;
DROP VIEW IF EXISTS public.vista_albaranes_completa CASCADE;
DROP VIEW IF EXISTS public.vista_trabajos_albaranes CASCADE;
DROP VIEW IF EXISTS public.vista_albaranes CASCADE;
DROP VIEW IF EXISTS public.vista_trabajos CASCADE;

-- Verificar que no hay más vistas dependientes
SELECT 'Vistas que aún referencian trabajo_id:' as info;
SELECT 
    v.table_name as vista,
    v.table_schema as esquema
FROM information_schema.views v
JOIN information_schema.view_column_usage vcu ON v.table_name = vcu.view_name
WHERE vcu.column_name = 'trabajo_id' 
AND v.table_schema = 'public';

-- PASO 8A2: Eliminar dinámicamente cualquier vista que aún referencie trabajo_id
DO $$
DECLARE
    vista_nombre text;
BEGIN
    FOR vista_nombre IN 
        SELECT DISTINCT v.table_name
        FROM information_schema.views v
        JOIN information_schema.view_column_usage vcu ON v.table_name = vcu.view_name
        WHERE vcu.column_name = 'trabajo_id' 
        AND v.table_schema = 'public'
    LOOP
        EXECUTE 'DROP VIEW IF EXISTS public.' || quote_ident(vista_nombre) || ' CASCADE';
        RAISE NOTICE 'Vista % eliminada', vista_nombre;
    END LOOP;
END $$;

-- PASO 8B: Eliminar columna trabajo_id (ahora sin dependencias)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'albaranes' AND column_name = 'trabajo_id'
    ) THEN
        ALTER TABLE public.albaranes DROP COLUMN trabajo_id CASCADE;
        RAISE NOTICE 'Columna trabajo_id eliminada';
    END IF;
END $$;

-- PASO 9: Actualizar fecha_cierre para que tenga valor por defecto
ALTER TABLE public.albaranes 
ALTER COLUMN fecha_cierre SET DEFAULT now();

-- PASO 10: Eliminar tabla materiales_trabajo (si existe)
DROP TABLE IF EXISTS public.materiales_trabajo CASCADE;

-- PASO 11: Eliminar tabla trabajos_realizados (si existe)  
DROP TABLE IF EXISTS public.trabajos_realizados CASCADE;

-- PASO 12: Actualizar historial_flujo
DO $$
BEGIN
    -- Agregar columna albaran_id si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'historial_flujo' AND column_name = 'albaran_id'
    ) THEN
        ALTER TABLE public.historial_flujo ADD COLUMN albaran_id uuid;
        RAISE NOTICE 'Columna albaran_id agregada a historial_flujo';
    END IF;
    
    -- Eliminar columna trabajo_id si existe
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'historial_flujo' AND column_name = 'trabajo_id'
    ) THEN
        ALTER TABLE public.historial_flujo DROP COLUMN trabajo_id;
        RAISE NOTICE 'Columna trabajo_id eliminada de historial_flujo';
    END IF;
END $$;

-- PASO 13: Agregar foreign key para albaran_id en historial_flujo
ALTER TABLE public.historial_flujo 
ADD CONSTRAINT fk_historial_flujo_albaran 
FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id) ON DELETE CASCADE;

-- PASO 14A: Verificar estados existentes antes de migrar
SELECT 'Estados existentes ANTES de migración:' as info;
SELECT DISTINCT estado, COUNT(*) as cantidad
FROM public.avisos 
GROUP BY estado 
ORDER BY estado;

-- PASO 14B: Migrar estados de avisos existentes al nuevo esquema
UPDATE public.avisos 
SET estado = CASE 
    WHEN estado = 'No visitado' THEN 'Pendiente'
    WHEN estado = 'Visitado pendiente' THEN 'En curso'
    WHEN estado = 'Otra visita requerida' THEN 'En curso'
    WHEN estado = 'Prueba' THEN 'Pendiente'  -- Estado de prueba → Pendiente
    WHEN estado = 'Listo para facturar' THEN 'Listo para facturar'
    WHEN estado = 'Completado' THEN 'Completado'
    WHEN estado = 'Cancelado' THEN 'Cancelado'
    ELSE 'Pendiente' -- Estado por defecto para cualquier otro valor
END
WHERE estado NOT IN ('Pendiente', 'En curso', 'Pendiente de presupuesto', 'Listo para facturar', 'Completado', 'Cancelado');

-- PASO 14B2: Verificar que TODOS los estados fueron migrados correctamente
SELECT 'Verificación de migración:' as info;
SELECT 
    estado_original,
    estado_actual,
    COUNT(*) as cantidad
FROM (
    SELECT 
        estado as estado_original,
        CASE 
            WHEN estado = 'No visitado' THEN 'Pendiente'
            WHEN estado = 'Visitado pendiente' THEN 'En curso'
            WHEN estado = 'Otra visita requerida' THEN 'En curso'
            WHEN estado = 'Prueba' THEN 'Pendiente'
            WHEN estado = 'Listo para facturar' THEN 'Listo para facturar'
            WHEN estado = 'Completado' THEN 'Completado'
            WHEN estado = 'Cancelado' THEN 'Cancelado'
            ELSE 'Pendiente'
        END as estado_actual
    FROM public.avisos
) subquery
GROUP BY estado_original, estado_actual
ORDER BY estado_original;

-- PASO 14B3: Forzar migración de estados problemáticos (por si acaso)
UPDATE public.avisos 
SET estado = 'Pendiente'
WHERE estado = 'Prueba';

UPDATE public.avisos 
SET estado = 'Pendiente'
WHERE estado = 'No visitado';

UPDATE public.avisos 
SET estado = 'En curso'
WHERE estado = 'Visitado pendiente';

UPDATE public.avisos 
SET estado = 'En curso'
WHERE estado = 'Otra visita requerida';

-- PASO 14C: Verificar que no hay estados inválidos
SELECT DISTINCT estado FROM public.avisos ORDER BY estado;

-- PASO 14D: Actualizar estados de avisos
ALTER TABLE public.avisos 
DROP CONSTRAINT IF EXISTS avisos_estado_check;

ALTER TABLE public.avisos 
ADD CONSTRAINT avisos_estado_check 
CHECK (estado IN ('Pendiente', 'En curso', 'Pendiente de presupuesto', 'Listo para facturar', 'Completado', 'Cancelado'));

-- PASO 14E: Verificar que la restricción se aplicó correctamente
SELECT 'Estados válidos DESPUÉS de migración:' as info;
SELECT DISTINCT estado, COUNT(*) as cantidad
FROM public.avisos 
GROUP BY estado 
ORDER BY estado;

-- PASO 15: Verificar estructura final
SELECT 'albaranes' as tabla, column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'albaranes' 
UNION ALL
SELECT 'historial_flujo' as tabla, column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'historial_flujo'
ORDER BY tabla, column_name;

-- PASO 16: Verificar que las tablas trabajos fueron eliminadas
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'trabajos_realizados')
    THEN 'ERROR: trabajos_realizados aún existe'
    ELSE 'OK: trabajos_realizados eliminada'
  END as estado_trabajos,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'materiales_trabajo')
    THEN 'ERROR: materiales_trabajo aún existe'
    ELSE 'OK: materiales_trabajo eliminada'
  END as estado_materiales;

-- PASO 17A: Verificar estructura de la tabla repuestos_albaran
SELECT 'Estructura de repuestos_albaran:' as info;
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'repuestos_albaran' 
ORDER BY ordinal_position;

-- PASO 17B: Recrear vista actualizada para repuestos_albaran (basada en estructura real)
CREATE OR REPLACE VIEW public.vista_repuestos_albaran AS
SELECT 
    ra.id,
    ra.albaran_id,
    ra.nombre as nombre_repuesto,  -- Asumiendo que existe 'nombre' en lugar de 'repuesto_id'
    ra.cantidad,
    ra.precio_neto as precio_unitario,  -- Asumiendo que existe 'precio_neto'
    ra.precio_pvp as precio_total,      -- Asumiendo que existe 'precio_pvp'
    a.aviso_id,
    a.fecha_trabajo,
    a.fecha_cierre,
    a.estado_cierre,
    av.numero_secuencial as numero_aviso,
    av.descripcion_problema
FROM public.repuestos_albaran ra
JOIN public.albaranes a ON ra.albaran_id = a.id
JOIN public.avisos av ON a.aviso_id = av.id;

-- PASO 18: Confirmación final
DO $$
BEGIN
    RAISE NOTICE 'MIGRACIÓN COMPLETADA EXITOSAMENTE';
    RAISE NOTICE 'Estructura actualizada al nuevo flujo: Aviso → Albarán → Factura';
    RAISE NOTICE 'Vista vista_repuestos_albaran recreada con estructura real de repuestos_albaran';
END $$;
