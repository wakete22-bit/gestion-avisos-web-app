-- Script para verificar y corregir la tabla inventario
-- Este script verifica qué columnas existen antes de hacer cambios

-- 1. Verificar qué columnas existen actualmente
DO $$
DECLARE
    column_exists boolean;
BEGIN
    -- Verificar si precio_unitario existe
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inventario' AND column_name = 'precio_unitario'
    ) INTO column_exists;
    
    -- Solo renombrar si precio_unitario existe y precio_neto no existe
    IF column_exists THEN
        SELECT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'inventario' AND column_name = 'precio_neto'
        ) INTO column_exists;
        
        IF NOT column_exists THEN
            ALTER TABLE public.inventario RENAME COLUMN precio_unitario TO precio_neto;
            RAISE NOTICE 'Columna precio_unitario renombrada a precio_neto';
        ELSE
            RAISE NOTICE 'Ambas columnas precio_unitario y precio_neto existen. Eliminando precio_unitario...';
            ALTER TABLE public.inventario DROP COLUMN precio_unitario;
        END IF;
    ELSE
        RAISE NOTICE 'Columna precio_unitario no existe';
    END IF;
END $$;

-- 2. Verificar si nombre_producto existe y renombrarlo a nombre
DO $$
DECLARE
    column_exists boolean;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inventario' AND column_name = 'nombre_producto'
    ) INTO column_exists;
    
    IF column_exists THEN
        SELECT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'inventario' AND column_name = 'nombre'
        ) INTO column_exists;
        
        IF NOT column_exists THEN
            ALTER TABLE public.inventario RENAME COLUMN nombre_producto TO nombre;
            RAISE NOTICE 'Columna nombre_producto renombrada a nombre';
        ELSE
            RAISE NOTICE 'Ambas columnas nombre_producto y nombre existen. Eliminando nombre_producto...';
            ALTER TABLE public.inventario DROP COLUMN nombre_producto;
        END IF;
    ELSE
        RAISE NOTICE 'Columna nombre_producto no existe';
    END IF;
END $$;

-- 3. Agregar columnas faltantes solo si no existen
DO $$
BEGIN
    -- Agregar codigo si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'inventario' AND column_name = 'codigo') THEN
        ALTER TABLE public.inventario ADD COLUMN codigo text;
        RAISE NOTICE 'Columna codigo agregada';
    ELSE
        RAISE NOTICE 'Columna codigo ya existe';
    END IF;
    
    -- Agregar descripcion si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'inventario' AND column_name = 'descripcion') THEN
        ALTER TABLE public.inventario ADD COLUMN descripcion text;
        RAISE NOTICE 'Columna descripcion agregada';
    ELSE
        RAISE NOTICE 'Columna descripcion ya existe';
    END IF;
    
    -- Agregar pvp si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'inventario' AND column_name = 'pvp') THEN
        ALTER TABLE public.inventario ADD COLUMN pvp numeric CHECK (pvp >= 0::numeric);
        RAISE NOTICE 'Columna pvp agregada';
    ELSE
        RAISE NOTICE 'Columna pvp ya existe';
    END IF;
    
    -- Agregar fecha_creacion si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'inventario' AND column_name = 'fecha_creacion') THEN
        ALTER TABLE public.inventario ADD COLUMN fecha_creacion timestamp with time zone DEFAULT now();
        RAISE NOTICE 'Columna fecha_creacion agregada';
    ELSE
        RAISE NOTICE 'Columna fecha_creacion ya existe';
    END IF;
    
    -- Agregar fecha_actualizacion si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'inventario' AND column_name = 'fecha_actualizacion') THEN
        ALTER TABLE public.inventario ADD COLUMN fecha_actualizacion timestamp with time zone DEFAULT now();
        RAISE NOTICE 'Columna fecha_actualizacion agregada';
    ELSE
        RAISE NOTICE 'Columna fecha_actualizacion ya existe';
    END IF;
END $$;

-- 4. Agregar constraint único para código si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE table_name = 'inventario' AND constraint_name = 'inventario_codigo_unique') THEN
        ALTER TABLE public.inventario ADD CONSTRAINT inventario_codigo_unique UNIQUE (codigo);
        RAISE NOTICE 'Constraint único para codigo agregado';
    ELSE
        RAISE NOTICE 'Constraint único para codigo ya existe';
    END IF;
END $$;

-- 5. Actualizar las referencias en otras tablas
DO $$
BEGIN
    -- Renombrar en materiales_parte_trabajo si existe
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'materiales_parte_trabajo' AND column_name = 'precio_unitario_al_momento') THEN
        SELECT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'materiales_parte_trabajo' AND column_name = 'precio_neto_al_momento'
        ) INTO column_exists;
        
        IF NOT column_exists THEN
            ALTER TABLE public.materiales_parte_trabajo 
            RENAME COLUMN precio_unitario_al_momento TO precio_neto_al_momento;
            RAISE NOTICE 'Columna precio_unitario_al_momento renombrada en materiales_parte_trabajo';
        ELSE
            ALTER TABLE public.materiales_parte_trabajo DROP COLUMN precio_unitario_al_momento;
            RAISE NOTICE 'Columna precio_unitario_al_momento eliminada de materiales_parte_trabajo';
        END IF;
    ELSE
        RAISE NOTICE 'Columna precio_unitario_al_momento no existe en materiales_parte_trabajo';
    END IF;
    
    -- Renombrar en materiales_presupuesto si existe
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'materiales_presupuesto' AND column_name = 'precio_unitario_al_momento') THEN
        SELECT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'materiales_presupuesto' AND column_name = 'precio_neto_al_momento'
        ) INTO column_exists;
        
        IF NOT column_exists THEN
            ALTER TABLE public.materiales_presupuesto 
            RENAME COLUMN precio_unitario_al_momento TO precio_neto_al_momento;
            RAISE NOTICE 'Columna precio_unitario_al_momento renombrada en materiales_presupuesto';
        ELSE
            ALTER TABLE public.materiales_presupuesto DROP COLUMN precio_unitario_al_momento;
            RAISE NOTICE 'Columna precio_unitario_al_momento eliminada de materiales_presupuesto';
        END IF;
    ELSE
        RAISE NOTICE 'Columna precio_unitario_al_momento no existe en materiales_presupuesto';
    END IF;
END $$;

-- 6. Mostrar la estructura final de la tabla
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'inventario' 
ORDER BY ordinal_position; 