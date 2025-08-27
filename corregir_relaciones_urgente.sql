-- SCRIPT URGENTE: Corregir relaciones faltantes entre avisos y presupuestos
-- Ejecutar INMEDIATAMENTE en Supabase SQL Editor

-- 1. VERIFICAR ESTADO ACTUAL
SELECT 'ESTADO ACTUAL DE LA BASE DE DATOS' as info;
SELECT table_name, column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name IN ('avisos', 'presupuestos', 'trabajos_realizados', 'albaranes')
ORDER BY table_name, ordinal_position;

-- 2. VERIFICAR RELACIONES EXISTENTES
SELECT 'RELACIONES EXISTENTES' as info;
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
    AND tc.table_name IN ('avisos', 'presupuestos', 'trabajos_realizados', 'albaranes')
ORDER BY tc.table_name, kcu.column_name;

-- 3. ELIMINAR CONSTRAINTS PROBLEMÁTICOS (si existen)
DO $$ 
BEGIN
    -- Eliminar constraint de presupuestos -> avisos si existe
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'presupuestos_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.presupuestos DROP CONSTRAINT presupuestos_aviso_id_fkey;
        RAISE NOTICE 'Constraint presupuestos_aviso_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraint de presupuestos -> albaranes si existe
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'presupuestos_albaran_id_fkey'
    ) THEN
        ALTER TABLE public.presupuestos DROP CONSTRAINT presupuestos_albaran_id_fkey;
        RAISE NOTICE 'Constraint presupuestos_albaran_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraint de albaranes -> trabajos_realizados si existe
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_trabajo_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes DROP CONSTRAINT albaranes_trabajo_id_fkey;
        RAISE NOTICE 'Constraint albaranes_trabajo_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraint de albaranes -> avisos si existe
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes DROP CONSTRAINT albaranes_aviso_id_fkey;
        RAISE NOTICE 'Constraint albaranes_aviso_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraint de trabajos_realizados -> avisos si existe
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'trabajos_realizados_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.trabajos_realizados DROP CONSTRAINT trabajos_realizados_aviso_id_fkey;
        RAISE NOTICE 'Constraint trabajos_realizados_aviso_id_fkey eliminado';
    END IF;
END $$;

-- 4. VERIFICAR QUE LAS COLUMNAS EXISTEN
DO $$ 
BEGIN
    -- Verificar columna aviso_id en presupuestos
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'presupuestos' AND column_name = 'aviso_id'
    ) THEN
        ALTER TABLE public.presupuestos ADD COLUMN aviso_id uuid;
        RAISE NOTICE 'Columna aviso_id agregada a presupuestos';
    END IF;
    
    -- Verificar columna albaran_id en presupuestos
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'presupuestos' AND column_name = 'albaran_id'
    ) THEN
        ALTER TABLE public.presupuestos ADD COLUMN albaran_id uuid;
        RAISE NOTICE 'Columna albaran_id agregada a presupuestos';
    END IF;
    
    -- Verificar columna trabajo_id en albaranes
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'albaranes' AND column_name = 'trabajo_id'
    ) THEN
        ALTER TABLE public.albaranes ADD COLUMN trabajo_id uuid;
        RAISE NOTICE 'Columna trabajo_id agregada a albaranes';
    END IF;
    
    -- Verificar columna aviso_id en albaranes
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'albaranes' AND column_name = 'aviso_id'
    ) THEN
        ALTER TABLE public.albaranes ADD COLUMN aviso_id uuid;
        RAISE NOTICE 'Columna aviso_id agregada a albaranes';
    END IF;
    
    -- Verificar columna aviso_id en trabajos_realizados
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'trabajos_realizados' AND column_name = 'aviso_id'
    ) THEN
        ALTER TABLE public.trabajos_realizados ADD COLUMN aviso_id uuid;
        RAISE NOTICE 'Columna aviso_id agregada a trabajos_realizados';
    END IF;
END $$;

-- 5. CREAR LAS RELACIONES CORRECTAS
DO $$ 
BEGIN
    -- Relación presupuestos -> avisos
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'presupuestos_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.presupuestos 
        ADD CONSTRAINT presupuestos_aviso_id_fkey 
        FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);
        RAISE NOTICE 'Constraint presupuestos_aviso_id_fkey creado';
    END IF;
    
    -- Relación presupuestos -> albaranes
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'presupuestos_albaran_id_fkey'
    ) THEN
        ALTER TABLE public.presupuestos 
        ADD CONSTRAINT presupuestos_albaran_id_fkey 
        FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id);
        RAISE NOTICE 'Constraint presupuestos_albaran_id_fkey creado';
    END IF;
    
    -- Relación albaranes -> trabajos_realizados
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_trabajo_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes 
        ADD CONSTRAINT albaranes_trabajo_id_fkey 
        FOREIGN KEY (trabajo_id) REFERENCES public.trabajos_realizados(id);
        RAISE NOTICE 'Constraint albaranes_trabajo_id_fkey creado';
    END IF;
    
    -- Relación albaranes -> avisos
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes 
        ADD CONSTRAINT albaranes_aviso_id_fkey 
        FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);
        RAISE NOTICE 'Constraint albaranes_aviso_id_fkey creado';
    END IF;
    
    -- Relación trabajos_realizados -> avisos
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'trabajos_realizados_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.trabajos_realizados 
        ADD CONSTRAINT trabajos_realizados_aviso_id_fkey 
        FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);
        RAISE NOTICE 'Constraint trabajos_realizados_aviso_id_fkey creado';
    END IF;
END $$;

-- 6. VERIFICAR QUE LAS RELACIONES SE CREARON CORRECTAMENTE
SELECT 'VERIFICACIÓN FINAL DE RELACIONES' as info;
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
    AND tc.table_name IN ('avisos', 'presupuestos', 'trabajos_realizados', 'albaranes')
ORDER BY tc.table_name, kcu.column_name;

-- 7. VERIFICAR QUE LAS TABLAS TIENEN DATOS
SELECT 'CONTEO DE REGISTROS' as info;
SELECT 
    'avisos' as tabla, COUNT(*) as registros FROM public.avisos
UNION ALL
SELECT 
    'presupuestos' as tabla, COUNT(*) as registros FROM public.presupuestos
UNION ALL
SELECT 
    'trabajos_realizados' as tabla, COUNT(*) as registros FROM public.trabajos_realizados
UNION ALL
SELECT 
    'albaranes' as tabla, COUNT(*) as registros FROM public.albaranes;

-- 8. MENSAJE DE ÉXITO
SELECT 'MIGRACIÓN COMPLETADA' as estado, 'Las relaciones han sido corregidas' as mensaje;
