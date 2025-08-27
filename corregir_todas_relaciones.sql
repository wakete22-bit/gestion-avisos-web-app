-- SCRIPT COMPLETO: Corregir TODAS las relaciones faltantes en la base de datos
-- ⚠️ EJECUTAR INMEDIATAMENTE en Supabase SQL Editor para resolver todos los errores

-- 1. VERIFICAR ESTADO ACTUAL DE TODAS LAS TABLAS
SELECT 'ESTADO ACTUAL DE TODAS LAS TABLAS' as info;
SELECT table_name, column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name IN ('avisos', 'presupuestos', 'trabajos_realizados', 'albaranes', 'facturas', 'clientes', 'usuarios', 'inventario', 'materiales_trabajo', 'fotos_aviso', 'lineas_factura', 'repuestos_albaran', 'historial_flujo')
ORDER BY table_name, ordinal_position;

-- 2. VERIFICAR TODAS LAS RELACIONES EXISTENTES
SELECT 'RELACIONES EXISTENTES ACTUALMENTE' as info;
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
ORDER BY tc.table_name, kcu.column_name;

-- 3. ELIMINAR TODAS LAS CONSTRAINTS PROBLEMÁTICAS
DO $$ 
BEGIN
    -- Eliminar constraints de facturas
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'facturas_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.facturas DROP CONSTRAINT IF EXISTS facturas_aviso_id_fkey;
        RAISE NOTICE 'Constraint facturas_aviso_id_fkey eliminado';
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'facturas_cliente_id_fkey'
    ) THEN
        ALTER TABLE public.facturas DROP CONSTRAINT IF EXISTS facturas_cliente_id_fkey;
        RAISE NOTICE 'Constraint facturas_cliente_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraints de presupuestos
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'presupuestos_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.presupuestos DROP CONSTRAINT IF EXISTS presupuestos_aviso_id_fkey;
        RAISE NOTICE 'Constraint presupuestos_aviso_id_fkey eliminado';
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'presupuestos_albaran_id_fkey'
    ) THEN
        ALTER TABLE public.presupuestos DROP CONSTRAINT IF EXISTS presupuestos_albaran_id_fkey;
        RAISE NOTICE 'Constraint presupuestos_albaran_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraints de albaranes
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_trabajo_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes DROP CONSTRAINT IF EXISTS albaranes_trabajo_id_fkey;
        RAISE NOTICE 'Constraint albaranes_trabajo_id_fkey eliminado';
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes DROP CONSTRAINT IF EXISTS albaranes_aviso_id_fkey;
        RAISE NOTICE 'Constraint albaranes_aviso_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraints de trabajos_realizados
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'trabajos_realizados_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.trabajos_realizados DROP CONSTRAINT IF EXISTS trabajos_realizados_aviso_id_fkey;
        RAISE NOTICE 'Constraint trabajos_realizados_aviso_id_fkey eliminado';
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'trabajos_realizados_albaran_id_fkey'
    ) THEN
        ALTER TABLE public.trabajos_realizados DROP CONSTRAINT IF EXISTS trabajos_realizados_albaran_id_fkey;
        RAISE NOTICE 'Constraint trabajos_realizados_albaran_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraints de materiales_trabajo
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'materiales_trabajo_trabajo_id_fkey'
    ) THEN
        ALTER TABLE public.materiales_trabajo DROP CONSTRAINT IF EXISTS materiales_trabajo_trabajo_id_fkey;
        RAISE NOTICE 'Constraint materiales_trabajo_trabajo_id_fkey eliminado';
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'materiales_trabajo_material_id_fkey'
    ) THEN
        ALTER TABLE public.materiales_trabajo DROP CONSTRAINT IF EXISTS materiales_trabajo_material_id_fkey;
        RAISE NOTICE 'Constraint materiales_trabajo_material_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraints de fotos_aviso
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fotos_aviso_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.fotos_aviso DROP CONSTRAINT IF EXISTS fotos_aviso_aviso_id_fkey;
        RAISE NOTICE 'Constraint fotos_aviso_aviso_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraints de lineas_factura
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'lineas_factura_factura_id_fkey'
    ) THEN
        ALTER TABLE public.lineas_factura DROP CONSTRAINT IF EXISTS lineas_factura_factura_id_fkey;
        RAISE NOTICE 'Constraint lineas_factura_factura_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraints de repuestos_albaran
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'repuestos_albaran_albaran_id_fkey'
    ) THEN
        ALTER TABLE public.repuestos_albaran DROP CONSTRAINT IF EXISTS repuestos_albaran_albaran_id_fkey;
        RAISE NOTICE 'Constraint repuestos_albaran_albaran_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraints de historial_flujo
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'historial_flujo_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.historial_flujo DROP CONSTRAINT IF EXISTS historial_flujo_aviso_id_fkey;
        RAISE NOTICE 'Constraint historial_flujo_aviso_id_fkey eliminado';
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'historial_flujo_trabajo_id_fkey'
    ) THEN
        ALTER TABLE public.historial_flujo DROP CONSTRAINT IF EXISTS historial_flujo_trabajo_id_fkey;
        RAISE NOTICE 'Constraint historial_flujo_trabajo_id_fkey eliminado';
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'historial_flujo_factura_id_fkey'
    ) THEN
        ALTER TABLE public.historial_flujo DROP CONSTRAINT IF EXISTS historial_flujo_factura_id_fkey;
        RAISE NOTICE 'Constraint historial_flujo_factura_id_fkey eliminado';
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'historial_flujo_usuario_id_fkey'
    ) THEN
        ALTER TABLE public.historial_flujo DROP CONSTRAINT IF EXISTS historial_flujo_usuario_id_fkey;
        RAISE NOTICE 'Constraint historial_flujo_usuario_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraints de usuarios
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'usuarios_rol_id_fkey'
    ) THEN
        ALTER TABLE public.usuarios DROP CONSTRAINT IF EXISTS usuarios_rol_id_fkey;
        RAISE NOTICE 'Constraint usuarios_rol_id_fkey eliminado';
    END IF;
    
    -- Eliminar constraints de avisos
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'avisos_cliente_id_fkey'
    ) THEN
        ALTER TABLE public.avisos DROP CONSTRAINT IF EXISTS avisos_cliente_id_fkey;
        RAISE NOTICE 'Constraint avisos_cliente_id_fkey eliminado';
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'avisos_tecnico_asignado_id_fkey'
    ) THEN
        ALTER TABLE public.avisos DROP CONSTRAINT IF EXISTS avisos_tecnico_asignado_id_fkey;
        RAISE NOTICE 'Constraint avisos_tecnico_asignado_id_fkey eliminado';
    END IF;
    
END $$;

-- 4. VERIFICAR Y AGREGAR COLUMNAS FALTANTES
DO $$ 
BEGIN
    -- Verificar columnas en facturas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'facturas' AND column_name = 'aviso_id'
    ) THEN
        ALTER TABLE public.facturas ADD COLUMN aviso_id uuid;
        RAISE NOTICE 'Columna aviso_id agregada a facturas';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'facturas' AND column_name = 'cliente_id'
    ) THEN
        ALTER TABLE public.facturas ADD COLUMN cliente_id uuid;
        RAISE NOTICE 'Columna cliente_id agregada a facturas';
    END IF;
    
    -- Verificar columnas en presupuestos
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'presupuestos' AND column_name = 'aviso_id'
    ) THEN
        ALTER TABLE public.presupuestos ADD COLUMN aviso_id uuid;
        RAISE NOTICE 'Columna aviso_id agregada a presupuestos';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'presupuestos' AND column_name = 'albaran_id'
    ) THEN
        ALTER TABLE public.presupuestos ADD COLUMN albaran_id uuid;
        RAISE NOTICE 'Columna albaran_id agregada a presupuestos';
    END IF;
    
    -- Verificar columnas en albaranes
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'albaranes' AND column_name = 'trabajo_id'
    ) THEN
        ALTER TABLE public.albaranes ADD COLUMN trabajo_id uuid;
        RAISE NOTICE 'Columna trabajo_id agregada a albaranes';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'albaranes' AND column_name = 'aviso_id'
    ) THEN
        ALTER TABLE public.albaranes ADD COLUMN aviso_id uuid;
        RAISE NOTICE 'Columna aviso_id agregada a albaranes';
    END IF;
    
    -- Verificar columnas en trabajos_realizados
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'trabajos_realizados' AND column_name = 'aviso_id'
    ) THEN
        ALTER TABLE public.trabajos_realizados ADD COLUMN aviso_id uuid;
        RAISE NOTICE 'Columna aviso_id agregada a trabajos_realizados';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'trabajos_realizados' AND column_name = 'albaran_id'
    ) THEN
        ALTER TABLE public.trabajos_realizados ADD COLUMN albaran_id uuid;
        RAISE NOTICE 'Columna albaran_id agregada a trabajos_realizados';
    END IF;
    
    -- Verificar columnas en materiales_trabajo
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'materiales_trabajo' AND column_name = 'trabajo_id'
    ) THEN
        ALTER TABLE public.materiales_trabajo ADD COLUMN trabajo_id uuid;
        RAISE NOTICE 'Columna trabajo_id agregada a materiales_trabajo';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'materiales_trabajo' AND column_name = 'material_id'
    ) THEN
        ALTER TABLE public.materiales_trabajo ADD COLUMN material_id uuid;
        RAISE NOTICE 'Columna material_id agregada a materiales_trabajo';
    END IF;
    
    -- Verificar columnas en fotos_aviso
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'fotos_aviso' AND column_name = 'aviso_id'
    ) THEN
        ALTER TABLE public.fotos_aviso ADD COLUMN aviso_id uuid;
        RAISE NOTICE 'Columna aviso_id agregada a fotos_aviso';
    END IF;
    
    -- Verificar columnas en lineas_factura
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'lineas_factura' AND column_name = 'factura_id'
    ) THEN
        ALTER TABLE public.lineas_factura ADD COLUMN factura_id uuid;
        RAISE NOTICE 'Columna factura_id agregada a lineas_factura';
    END IF;
    
    -- Verificar columnas en repuestos_albaran
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'repuestos_albaran' AND column_name = 'albaran_id'
    ) THEN
        ALTER TABLE public.repuestos_albaran ADD COLUMN albaran_id uuid;
        RAISE NOTICE 'Columna albaran_id agregada a repuestos_albaran';
    END IF;
    
    -- Verificar columnas en historial_flujo
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'historial_flujo' AND column_name = 'aviso_id'
    ) THEN
        ALTER TABLE public.historial_flujo ADD COLUMN aviso_id uuid;
        RAISE NOTICE 'Columna aviso_id agregada a historial_flujo';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'historial_flujo' AND column_name = 'trabajo_id'
    ) THEN
        ALTER TABLE public.historial_flujo ADD COLUMN trabajo_id uuid;
        RAISE NOTICE 'Columna trabajo_id agregada a historial_flujo';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'historial_flujo' AND column_name = 'factura_id'
    ) THEN
        ALTER TABLE public.historial_flujo ADD COLUMN factura_id uuid;
        RAISE NOTICE 'Columna factura_id agregada a historial_flujo';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'historial_flujo' AND column_name = 'usuario_id'
    ) THEN
        ALTER TABLE public.historial_flujo ADD COLUMN usuario_id uuid;
        RAISE NOTICE 'Columna usuario_id agregada a historial_flujo';
    END IF;
    
    -- Verificar columnas en usuarios
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'usuarios' AND column_name = 'rol_id'
    ) THEN
        ALTER TABLE public.usuarios ADD COLUMN rol_id uuid;
        RAISE NOTICE 'Columna rol_id agregada a usuarios';
    END IF;
    
    -- Verificar columnas en avisos
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'avisos' AND column_name = 'cliente_id'
    ) THEN
        ALTER TABLE public.avisos ADD COLUMN cliente_id uuid;
        RAISE NOTICE 'Columna cliente_id agregada a avisos';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'avisos' AND column_name = 'tecnico_asignado_id'
    ) THEN
        ALTER TABLE public.avisos ADD COLUMN tecnico_asignado_id uuid;
        RAISE NOTICE 'Columna tecnico_asignado_id agregada a avisos';
    END IF;
    
END $$;

-- 5. CREAR TODAS LAS RELACIONES CORRECTAS
DO $$ 
BEGIN
    -- Relaciones de facturas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'facturas_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.facturas 
        ADD CONSTRAINT facturas_aviso_id_fkey 
        FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);
        RAISE NOTICE 'Constraint facturas_aviso_id_fkey creado';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'facturas_cliente_id_fkey'
    ) THEN
        ALTER TABLE public.facturas 
        ADD CONSTRAINT facturas_cliente_id_fkey 
        FOREIGN KEY (cliente_id) REFERENCES public.clientes(id);
        RAISE NOTICE 'Constraint facturas_cliente_id_fkey creado';
    END IF;
    
    -- Relaciones de presupuestos
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'presupuestos_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.presupuestos 
        ADD CONSTRAINT presupuestos_aviso_id_fkey 
        FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);
        RAISE NOTICE 'Constraint presupuestos_aviso_id_fkey creado';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'presupuestos_albaran_id_fkey'
    ) THEN
        ALTER TABLE public.presupuestos 
        ADD CONSTRAINT presupuestos_albaran_id_fkey 
        FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id);
        RAISE NOTICE 'Constraint presupuestos_albaran_id_fkey creado';
    END IF;
    
    -- Relaciones de albaranes
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_trabajo_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes 
        ADD CONSTRAINT albaranes_trabajo_id_fkey 
        FOREIGN KEY (trabajo_id) REFERENCES public.trabajos_realizados(id);
        RAISE NOTICE 'Constraint albaranes_trabajo_id_fkey creado';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes 
        ADD CONSTRAINT albaranes_aviso_id_fkey 
        FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);
        RAISE NOTICE 'Constraint albaranes_aviso_id_fkey creado';
    END IF;
    
    -- Relaciones de trabajos_realizados
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'trabajos_realizados_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.trabajos_realizados 
        ADD CONSTRAINT trabajos_realizados_aviso_id_fkey 
        FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);
        RAISE NOTICE 'Constraint trabajos_realizados_aviso_id_fkey creado';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'trabajos_realizados_albaran_id_fkey'
    ) THEN
        ALTER TABLE public.trabajos_realizados 
        ADD CONSTRAINT trabajos_realizados_albaran_id_fkey 
        FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id);
        RAISE NOTICE 'Constraint trabajos_realizados_albaran_id_fkey creado';
    END IF;
    
    -- Relaciones de materiales_trabajo
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'materiales_trabajo_trabajo_id_fkey'
    ) THEN
        ALTER TABLE public.materiales_trabajo 
        ADD CONSTRAINT materiales_trabajo_trabajo_id_fkey 
        FOREIGN KEY (trabajo_id) REFERENCES public.trabajos_realizados(id);
        RAISE NOTICE 'Constraint materiales_trabajo_trabajo_id_fkey creado';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'materiales_trabajo_material_id_fkey'
    ) THEN
        ALTER TABLE public.materiales_trabajo 
        ADD CONSTRAINT materiales_trabajo_material_id_fkey 
        FOREIGN KEY (material_id) REFERENCES public.inventario(id);
        RAISE NOTICE 'Constraint materiales_trabajo_material_id_fkey creado';
    END IF;
    
    -- Relaciones de fotos_aviso
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fotos_aviso_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.fotos_aviso 
        ADD CONSTRAINT fotos_aviso_aviso_id_fkey 
        FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);
        RAISE NOTICE 'Constraint fotos_aviso_aviso_id_fkey creado';
    END IF;
    
    -- Relaciones de lineas_factura
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'lineas_factura_factura_id_fkey'
    ) THEN
        ALTER TABLE public.lineas_factura 
        ADD CONSTRAINT lineas_factura_factura_id_fkey 
        FOREIGN KEY (factura_id) REFERENCES public.facturas(id);
        RAISE NOTICE 'Constraint lineas_factura_factura_id_fkey creado';
    END IF;
    
    -- Relaciones de repuestos_albaran
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'repuestos_albaran_albaran_id_fkey'
    ) THEN
        ALTER TABLE public.repuestos_albaran 
        ADD CONSTRAINT repuestos_albaran_albaran_id_fkey 
        FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id);
        RAISE NOTICE 'Constraint repuestos_albaran_albaran_id_fkey creado';
    END IF;
    
    -- Relaciones de historial_flujo
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'historial_flujo_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.historial_flujo 
        ADD CONSTRAINT historial_flujo_aviso_id_fkey 
        FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);
        RAISE NOTICE 'Constraint historial_flujo_aviso_id_fkey creado';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'historial_flujo_trabajo_id_fkey'
    ) THEN
        ALTER TABLE public.historial_flujo 
        ADD CONSTRAINT historial_flujo_trabajo_id_fkey 
        FOREIGN KEY (trabajo_id) REFERENCES public.trabajos_realizados(id);
        RAISE NOTICE 'Constraint historial_flujo_trabajo_id_fkey creado';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'historial_flujo_factura_id_fkey'
    ) THEN
        ALTER TABLE public.historial_flujo 
        ADD CONSTRAINT historial_flujo_factura_id_fkey 
        FOREIGN KEY (factura_id) REFERENCES public.facturas(id);
        RAISE NOTICE 'Constraint historial_flujo_factura_id_fkey creado';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'historial_flujo_usuario_id_fkey'
    ) THEN
        ALTER TABLE public.historial_flujo 
        ADD CONSTRAINT historial_flujo_usuario_id_fkey 
        FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
        RAISE NOTICE 'Constraint historial_flujo_usuario_id_fkey creado';
    END IF;
    
    -- Relaciones de usuarios
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'usuarios_rol_id_fkey'
    ) THEN
        ALTER TABLE public.usuarios 
        ADD CONSTRAINT usuarios_rol_id_fkey 
        FOREIGN KEY (rol_id) REFERENCES public.roles(id);
        RAISE NOTICE 'Constraint usuarios_rol_id_fkey creado';
    END IF;
    
    -- Relaciones de avisos
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'avisos_cliente_id_fkey'
    ) THEN
        ALTER TABLE public.avisos 
        ADD CONSTRAINT avisos_cliente_id_fkey 
        FOREIGN KEY (cliente_id) REFERENCES public.clientes(id);
        RAISE NOTICE 'Constraint avisos_cliente_id_fkey creado';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'avisos_tecnico_asignado_id_fkey'
    ) THEN
        ALTER TABLE public.avisos 
        ADD CONSTRAINT avisos_tecnico_asignado_id_fkey 
        FOREIGN KEY (tecnico_asignado_id) REFERENCES public.usuarios(id);
        RAISE NOTICE 'Constraint avisos_tecnico_asignado_id_fkey creado';
    END IF;
    
END $$;

-- 6. VERIFICACIÓN FINAL DE TODAS LAS RELACIONES
SELECT 'VERIFICACIÓN FINAL DE TODAS LAS RELACIONES' as info;
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
ORDER BY tc.table_name, kcu.column_name;

-- 7. VERIFICAR QUE TODAS LAS TABLAS TIENEN DATOS
SELECT 'CONTEO DE REGISTROS EN TODAS LAS TABLAS' as info;
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
    'albaranes' as tabla, COUNT(*) as registros FROM public.albaranes
UNION ALL
SELECT 
    'facturas' as tabla, COUNT(*) as registros FROM public.facturas
UNION ALL
SELECT 
    'clientes' as tabla, COUNT(*) as registros FROM public.clientes
UNION ALL
SELECT 
    'usuarios' as tabla, COUNT(*) as registros FROM public.usuarios
UNION ALL
SELECT 
    'inventario' as tabla, COUNT(*) as registros FROM public.inventario
UNION ALL
SELECT 
    'materiales_trabajo' as tabla, COUNT(*) as registros FROM public.materiales_trabajo
UNION ALL
SELECT 
    'fotos_aviso' as tabla, COUNT(*) as registros FROM public.fotos_aviso
UNION ALL
SELECT 
    'lineas_factura' as tabla, COUNT(*) as registros FROM public.lineas_factura
UNION ALL
SELECT 
    'repuestos_albaran' as tabla, COUNT(*) as registros FROM public.repuestos_albaran
UNION ALL
SELECT 
    'historial_flujo' as tabla, COUNT(*) as registros FROM public.historial_flujo
UNION ALL
SELECT 
    'roles' as tabla, COUNT(*) as registros FROM public.roles;

-- 8. MENSAJE DE ÉXITO FINAL
SELECT 'MIGRACIÓN COMPLETADA EXITOSAMENTE' as estado, 'Todas las relaciones han sido corregidas' as mensaje;
SELECT 'La aplicación debería funcionar correctamente ahora' as recomendacion;
