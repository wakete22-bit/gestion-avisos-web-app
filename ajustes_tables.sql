-- Script de migración para corregir las relaciones entre tablas
-- Ejecutar en orden para evitar errores de dependencias

-- 1. Primero, eliminar las foreign keys problemáticas si existen
DO $$ 
BEGIN
    -- Eliminar constraint de trabajos_realizados si existe
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'trabajos_realizados_albaran_id_fkey'
    ) THEN
        ALTER TABLE public.trabajos_realizados DROP CONSTRAINT IF EXISTS trabajos_realizados_albaran_id_fkey;
    END IF;
    
    -- Eliminar constraint de albaranes si existe
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_trabajo_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes DROP CONSTRAINT IF EXISTS albaranes_trabajo_id_fkey;
    END IF;
    
    -- Eliminar constraint de albaranes si existe
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes DROP CONSTRAINT IF EXISTS albaranes_aviso_id_fkey;
    END IF;
END $$;

-- 2. Agregar la columna albaran_id a trabajos_realizados si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'trabajos_realizados' AND column_name = 'albaran_id'
    ) THEN
        ALTER TABLE public.trabajos_realizados ADD COLUMN albaran_id uuid;
    END IF;
END $$;

-- 3. Crear las foreign keys correctas
-- Primero la relación trabajos_realizados -> avisos
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'trabajos_realizados_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.trabajos_realizados 
        ADD CONSTRAINT trabajos_realizados_aviso_id_fkey 
        FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);
    END IF;
END $$;

-- Luego la relación albaranes -> trabajos_realizados
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_trabajo_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes 
        ADD CONSTRAINT albaranes_trabajo_id_fkey 
        FOREIGN KEY (trabajo_id) REFERENCES public.trabajos_realizados(id);
    END IF;
END $$;

-- Luego la relación albaranes -> avisos
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'albaranes_aviso_id_fkey'
    ) THEN
        ALTER TABLE public.albaranes 
        ADD CONSTRAINT albaranes_aviso_id_fkey 
        FOREIGN KEY (aviso_id) REFERENCES public.avisos(id);
    END IF;
END $$;

-- Finalmente la relación trabajos_realizados -> albaranes (circular pero opcional)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'trabajos_realizados_albaran_id_fkey'
    ) THEN
        ALTER TABLE public.trabajos_realizados 
        ADD CONSTRAINT trabajos_realizados_albaran_id_fkey 
        FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id);
    END IF;
END $$;

-- 4. Verificar que todas las tablas necesarias existen
DO $$ 
BEGIN
    -- Crear tabla roles si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'roles') THEN
        CREATE TABLE public.roles (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            nombre_rol text NOT NULL UNIQUE,
            CONSTRAINT roles_pkey PRIMARY KEY (id)
        );
    END IF;
    
    -- Crear tabla usuarios si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'usuarios') THEN
        CREATE TABLE public.usuarios (
            id uuid NOT NULL,
            nombre_completo text NOT NULL,
            email text NOT NULL UNIQUE,
            telefono text,
            rol_id uuid NOT NULL,
            fecha_creacion timestamp with time zone DEFAULT now(),
            fecha_actualizacion timestamp with time zone DEFAULT now(),
            es_activo boolean NOT NULL DEFAULT true,
            fecha_ultimo_acceso timestamp with time zone,
            CONSTRAINT usuarios_pkey PRIMARY KEY (id),
            CONSTRAINT usuarios_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id)
        );
    END IF;
    
    -- Crear tabla clientes si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'clientes') THEN
        CREATE TABLE public.clientes (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            nombre_completo text NOT NULL,
            direccion text,
            telefono_contacto text,
            email text,
            nivel_urgencia_habitual text,
            es_activo boolean DEFAULT true,
            fecha_creacion timestamp with time zone DEFAULT now(),
            fecha_actualizacion timestamp with time zone DEFAULT now(),
            notas_importantes text,
            CONSTRAINT clientes_pkey PRIMARY KEY (id)
        );
    END IF;
    
    -- Crear tabla avisos si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'avisos') THEN
        CREATE TABLE public.avisos (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            cliente_id uuid NOT NULL,
            tecnico_asignado_id uuid,
            fecha_creacion timestamp with time zone DEFAULT now(),
            nombre_cliente_aviso text,
            direccion_cliente_aviso text,
            telefono_cliente_aviso text,
            urgencia text NOT NULL,
            descripcion_problema text NOT NULL,
            estado text NOT NULL DEFAULT 'Pendiente'::text,
            latitud numeric,
            longitud numeric,
            fecha_finalizacion timestamp with time zone,
            requiere_presupuesto boolean DEFAULT false,
            requiere_nueva_visita boolean DEFAULT false,
            tipo text DEFAULT 'correctivo'::text,
            nombre_contacto text,
            es_urgente boolean DEFAULT false,
            fecha_actualizacion timestamp with time zone DEFAULT now(),
            CONSTRAINT avisos_pkey PRIMARY KEY (id),
            CONSTRAINT avisos_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id)
        );
    END IF;
    
    -- Crear tabla trabajos_realizados si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'trabajos_realizados') THEN
        CREATE TABLE public.trabajos_realizados (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            aviso_id uuid NOT NULL,
            fecha_trabajo date NOT NULL,
            hora_inicio time without time zone NOT NULL,
            hora_fin time without time zone NOT NULL,
            descripcion text NOT NULL,
            repuestos text[] DEFAULT '{}'::text[],
            estado text NOT NULL DEFAULT 'Pendiente'::text,
            fecha_creacion timestamp with time zone DEFAULT now(),
            fecha_actualizacion timestamp with time zone DEFAULT now(),
            CONSTRAINT trabajos_realizados_pkey PRIMARY KEY (id),
            CONSTRAINT trabajos_realizados_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
        );
    END IF;
    
    -- Crear tabla albaranes si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'albaranes') THEN
        CREATE TABLE public.albaranes (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            trabajo_id uuid NOT NULL,
            aviso_id uuid NOT NULL,
            fecha_cierre timestamp with time zone DEFAULT now(),
            hora_entrada time without time zone,
            hora_salida time without time zone,
            descripcion_trabajo_realizado text NOT NULL,
            repuestos_utilizados text[] DEFAULT '{}'::text[],
            estado_cierre text NOT NULL,
            presupuesto_necesario numeric DEFAULT 0,
            dni_cliente text,
            nombre_firma text,
            firma_url text,
            observaciones text,
            fecha_creacion timestamp with time zone DEFAULT now(),
            fecha_actualizacion timestamp with time zone DEFAULT now(),
            firma_cliente text,
            CONSTRAINT albaranes_pkey PRIMARY KEY (id),
            CONSTRAINT albaranes_trabajo_id_fkey FOREIGN KEY (trabajo_id) REFERENCES public.trabajos_realizados(id),
            CONSTRAINT albaranes_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
        );
    END IF;
    
    -- Crear tabla presupuestos si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'presupuestos') THEN
        CREATE TABLE public.presupuestos (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            albaran_id uuid NOT NULL,
            aviso_id uuid NOT NULL,
            fecha_creacion timestamp with time zone DEFAULT now(),
            horas_estimadas numeric DEFAULT 0,
            total_estimado numeric DEFAULT 0,
            materiales_estimados jsonb DEFAULT '[]'::jsonb,
            estado text NOT NULL DEFAULT 'Pendiente'::text,
            pdf_url text,
            fecha_actualizacion timestamp with time zone DEFAULT now(),
            CONSTRAINT presupuestos_pkey PRIMARY KEY (id),
            CONSTRAINT presupuestos_albaran_id_fkey FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id),
            CONSTRAINT presupuestos_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
        );
    END IF;
    
    -- Crear tabla facturas si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'facturas') THEN
        CREATE TABLE public.facturas (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            numero_factura text NOT NULL UNIQUE,
            fecha_emision date NOT NULL,
            cliente_id uuid,
            nombre_cliente text NOT NULL,
            direccion_cliente text NOT NULL,
            cif_cliente text NOT NULL,
            email_cliente text NOT NULL,
            aviso_id uuid,
            subtotal numeric NOT NULL DEFAULT 0,
            iva numeric NOT NULL DEFAULT 0,
            total numeric NOT NULL DEFAULT 0,
            estado text NOT NULL DEFAULT 'Pendiente'::text,
            pdf_url text,
            notas text,
            fecha_creacion timestamp with time zone DEFAULT now(),
            fecha_actualizacion timestamp with time zone DEFAULT now(),
            CONSTRAINT facturas_pkey PRIMARY KEY (id),
            CONSTRAINT facturas_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id),
            CONSTRAINT facturas_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
        );
    END IF;
    
    -- Crear tabla inventario si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'inventario') THEN
        CREATE TABLE public.inventario (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            nombre text NOT NULL UNIQUE,
            unidad text NOT NULL,
            cantidad_disponible numeric NOT NULL DEFAULT 0,
            precio_neto numeric NOT NULL,
            codigo text UNIQUE,
            descripcion text,
            pvp numeric,
            fecha_creacion timestamp with time zone DEFAULT now(),
            fecha_actualizacion timestamp with time zone DEFAULT now(),
            CONSTRAINT inventario_pkey PRIMARY KEY (id)
        );
    END IF;
    
    -- Crear tabla materiales_trabajo si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'materiales_trabajo') THEN
        CREATE TABLE public.materiales_trabajo (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            trabajo_id uuid NOT NULL,
            material_id uuid NOT NULL,
            cantidad_utilizada numeric NOT NULL,
            precio_neto_al_momento numeric NOT NULL,
            CONSTRAINT materiales_trabajo_pkey PRIMARY KEY (id),
            CONSTRAINT materiales_trabajo_trabajo_id_fkey FOREIGN KEY (trabajo_id) REFERENCES public.trabajos_realizados(id),
            CONSTRAINT materiales_trabajo_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.inventario(id)
        );
    END IF;
    
    -- Crear tabla fotos_aviso si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'fotos_aviso') THEN
        CREATE TABLE public.fotos_aviso (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            aviso_id uuid NOT NULL,
            url text NOT NULL,
            descripcion text,
            fecha_subida timestamp with time zone DEFAULT now(),
            CONSTRAINT fotos_aviso_pkey PRIMARY KEY (id),
            CONSTRAINT fotos_aviso_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
        );
    END IF;
    
    -- Crear tabla lineas_factura si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'lineas_factura') THEN
        CREATE TABLE public.lineas_factura (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            factura_id uuid NOT NULL,
            tipo text NOT NULL,
            nombre text NOT NULL,
            cantidad numeric NOT NULL DEFAULT 1,
            precio_neto numeric,
            precio_pvp numeric NOT NULL DEFAULT 0,
            descripcion text,
            fecha_creacion timestamp with time zone DEFAULT now(),
            CONSTRAINT lineas_factura_pkey PRIMARY KEY (id),
            CONSTRAINT lineas_factura_factura_id_fkey FOREIGN KEY (factura_id) REFERENCES public.facturas(id)
        );
    END IF;
    
    -- Crear tabla repuestos_albaran si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'repuestos_albaran') THEN
        CREATE TABLE public.repuestos_albaran (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            albaran_id uuid NOT NULL,
            nombre text NOT NULL,
            cantidad numeric NOT NULL DEFAULT 1,
            precio_neto numeric NOT NULL DEFAULT 0,
            precio_pvp numeric NOT NULL DEFAULT 0,
            unidad text NOT NULL DEFAULT 'unidad'::text,
            codigo text,
            fecha_creacion timestamp with time zone DEFAULT now(),
            CONSTRAINT repuestos_albaran_pkey PRIMARY KEY (id),
            CONSTRAINT repuestos_albaran_albaran_id_fkey FOREIGN KEY (albaran_id) REFERENCES public.albaranes(id)
        );
    END IF;
    
    -- Crear tabla historial_flujo si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'historial_flujo') THEN
        CREATE TABLE public.historial_flujo (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            aviso_id uuid NOT NULL,
            estado_anterior text,
            estado_nuevo text NOT NULL,
            accion_realizada text NOT NULL,
            usuario_id uuid,
            factura_id uuid,
            trabajo_id uuid,
            observaciones text,
            fecha_cambio timestamp with time zone DEFAULT now(),
            CONSTRAINT historial_flujo_pkey PRIMARY KEY (id),
            CONSTRAINT historial_flujo_factura_id_fkey FOREIGN KEY (factura_id) REFERENCES public.facturas(id),
            CONSTRAINT historial_flujo_trabajo_id_fkey FOREIGN KEY (trabajo_id) REFERENCES public.trabajos_realizados(id),
            CONSTRAINT historial_flujo_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id),
            CONSTRAINT historial_flujo_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id)
        );
    END IF;
END $$;

-- 5. Verificar que todas las foreign keys están correctamente configuradas
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;

-- 6. Verificar que las tablas principales tienen datos
SELECT 
    'roles' as tabla, COUNT(*) as registros FROM public.roles
UNION ALL
SELECT 
    'usuarios' as tabla, COUNT(*) as registros FROM public.usuarios
UNION ALL
SELECT 
    'clientes' as tabla, COUNT(*) as registros FROM public.clientes
UNION ALL
SELECT 
    'avisos' as tabla, COUNT(*) as registros FROM public.avisos
UNION ALL
SELECT 
    'trabajos_realizados' as tabla, COUNT(*) as registros FROM public.trabajos_realizados
UNION ALL
SELECT 
    'albaranes' as tabla, COUNT(*) as registros FROM public.albaranes
UNION ALL
SELECT 
    'presupuestos' as tabla, COUNT(*) as registros FROM public.presupuestos
UNION ALL
SELECT 
    'facturas' as tabla, COUNT(*) as registros FROM public.facturas; 