-- Script completo para corregir el problema de historial_flujo
-- Elimina TODO y lo recrea desde cero

-- ========================================
-- 1. ELIMINAR COMPLETAMENTE TODO LO RELACIONADO CON HISTORIAL_FLUJO
-- ========================================

-- Eliminar TODOS los triggers que puedan estar relacionados
DROP TRIGGER IF EXISTS trigger_presupuesto_historial ON public.presupuestos;
DROP TRIGGER IF EXISTS trigger_albaran_historial ON public.albaranes;
DROP TRIGGER IF EXISTS trigger_aviso_historial ON public.avisos;
DROP TRIGGER IF EXISTS trigger_factura_historial ON public.facturas;
DROP TRIGGER IF EXISTS trigger_historial_presupuesto ON public.presupuestos;
DROP TRIGGER IF EXISTS trigger_historial_albaran ON public.albaranes;
DROP TRIGGER IF EXISTS trigger_historial_aviso ON public.avisos;
DROP TRIGGER IF EXISTS trigger_historial_factura ON public.facturas;

-- Eliminar TODAS las funciones relacionadas con historial_flujo
DROP FUNCTION IF EXISTS trigger_historial_presupuesto();
DROP FUNCTION IF EXISTS trigger_historial_albaran();
DROP FUNCTION IF EXISTS trigger_historial_aviso();
DROP FUNCTION IF EXISTS trigger_historial_factura();
DROP FUNCTION IF EXISTS insertar_historial_flujo(uuid, text, text, text, uuid, uuid, uuid, text);
DROP FUNCTION IF EXISTS insertar_historial_flujo(uuid, text, text, text, uuid, uuid, uuid, text, text);
DROP FUNCTION IF EXISTS insertar_historial_flujo(uuid, text, text, text, uuid, uuid, uuid, uuid, text);

-- Buscar y eliminar cualquier otra función que pueda estar causando problemas
DO $$
DECLARE
    func_record RECORD;
BEGIN
    FOR func_record IN 
        SELECT proname, oid 
        FROM pg_proc 
        WHERE proname ILIKE '%historial%' 
        AND proname ILIKE '%flujo%'
    LOOP
        EXECUTE 'DROP FUNCTION IF EXISTS ' || func_record.oid || ' CASCADE';
    END LOOP;
END $$;

-- ========================================
-- 2. VERIFICAR QUE LA TABLA HISTORIAL_FLUJO EXISTE Y TIENE LA ESTRUCTURA CORRECTA
-- ========================================

-- Verificar estructura de la tabla
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'historial_flujo'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- ========================================
-- 3. CREAR FUNCIÓN AUXILIAR CORREGIDA
-- ========================================

-- Función auxiliar para insertar en historial_flujo con la columna correcta
CREATE OR REPLACE FUNCTION insertar_historial_flujo(
    p_aviso_id uuid,
    p_estado_anterior text DEFAULT NULL,
    p_estado_nuevo text DEFAULT NULL,
    p_accion_realizada text DEFAULT NULL,
    p_usuario_id uuid DEFAULT NULL,
    p_factura_id uuid DEFAULT NULL,
    p_albaran_id uuid DEFAULT NULL,
    p_observaciones text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Verificar que los parámetros requeridos no sean NULL
    IF p_aviso_id IS NULL THEN
        RAISE EXCEPTION 'aviso_id no puede ser NULL';
    END IF;
    
    -- Insertar en historial_flujo usando la columna correcta
    INSERT INTO public.historial_flujo (
        aviso_id,
        estado_anterior,
        estado_nuevo,
        accion_realizada,  -- ✅ Columna correcta
        usuario_id,
        factura_id,
        albaran_id,
        observaciones,
        fecha_cambio
    ) VALUES (
        p_aviso_id,
        p_estado_anterior,
        p_estado_nuevo,
        p_accion_realizada,  -- ✅ Usando la columna correcta
        p_usuario_id,
        p_factura_id,
        p_albaran_id,
        p_observaciones,
        NOW()
    );
    
    -- Log para debugging
    RAISE NOTICE 'Historial insertado: aviso_id=%, accion=%, estado_nuevo=%', 
        p_aviso_id, p_accion_realizada, p_estado_nuevo;
        
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al insertar en historial_flujo: %', SQLERRM;
END;
$$;

-- ========================================
-- 4. CREAR TRIGGER CORREGIDO PARA PRESUPUESTOS
-- ========================================

-- Función de trigger para registrar cambios en presupuestos
CREATE OR REPLACE FUNCTION trigger_historial_presupuesto()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    accion_text text;
    aviso_id_val uuid;
BEGIN
    -- Obtener el aviso_id del presupuesto
    aviso_id_val := COALESCE(NEW.aviso_id, OLD.aviso_id);
    
    -- Determinar la acción realizada
    IF TG_OP = 'INSERT' THEN
        accion_text := 'presupuesto_creado';
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.estado != NEW.estado THEN
            accion_text := 'presupuesto_' || LOWER(REPLACE(NEW.estado, ' ', '_'));
        ELSE
            accion_text := 'presupuesto_actualizado';
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        accion_text := 'presupuesto_eliminado';
    END IF;

    -- Insertar en historial usando la función auxiliar
    PERFORM insertar_historial_flujo(
        aviso_id_val,
        CASE WHEN TG_OP = 'UPDATE' THEN OLD.estado ELSE NULL END,
        CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE NEW.estado END,
        accion_text,
        auth.user_id(),
        NULL,
        COALESCE(NEW.albaran_id, OLD.albaran_id),
        'Cambio de estado del presupuesto'
    );

    RETURN COALESCE(NEW, OLD);
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error en trigger_historial_presupuesto: %', SQLERRM;
        RETURN COALESCE(NEW, OLD);
END;
$$;

-- Crear el trigger en la tabla presupuestos
CREATE TRIGGER trigger_presupuesto_historial
    AFTER INSERT OR UPDATE OR DELETE ON public.presupuestos
    FOR EACH ROW
    EXECUTE FUNCTION trigger_historial_presupuesto();

-- ========================================
-- 5. CREAR TRIGGER CORREGIDO PARA ALBARANES
-- ========================================

-- Función de trigger para registrar cambios en albaranes
CREATE OR REPLACE FUNCTION trigger_historial_albaran()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    accion_text text;
    aviso_id_val uuid;
BEGIN
    -- Obtener el aviso_id del albarán
    aviso_id_val := COALESCE(NEW.aviso_id, OLD.aviso_id);
    
    -- Determinar la acción realizada
    IF TG_OP = 'INSERT' THEN
        accion_text := 'albaran_creado';
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.estado_cierre != NEW.estado_cierre THEN
            accion_text := 'albaran_' || LOWER(REPLACE(NEW.estado_cierre, ' ', '_'));
        ELSE
            accion_text := 'albaran_actualizado';
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        accion_text := 'albaran_eliminado';
    END IF;

    -- Insertar en historial usando la función auxiliar
    PERFORM insertar_historial_flujo(
        aviso_id_val,
        CASE WHEN TG_OP = 'UPDATE' THEN OLD.estado_cierre ELSE NULL END,
        CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE NEW.estado_cierre END,
        accion_text,
        auth.user_id(),
        NULL,
        COALESCE(NEW.id, OLD.id),
        'Cambio de estado del albarán'
    );

    RETURN COALESCE(NEW, OLD);
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error en trigger_historial_albaran: %', SQLERRM;
        RETURN COALESCE(NEW, OLD);
END;
$$;

-- Crear el trigger en la tabla albaranes
CREATE TRIGGER trigger_albaran_historial
    AFTER INSERT OR UPDATE OR DELETE ON public.albaranes
    FOR EACH ROW
    EXECUTE FUNCTION trigger_historial_albaran();

-- ========================================
-- 6. CREAR TRIGGER CORREGIDO PARA AVISOS
-- ========================================

-- Función de trigger para registrar cambios en avisos
CREATE OR REPLACE FUNCTION trigger_historial_aviso()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    accion_text text;
BEGIN
    -- Determinar la acción realizada
    IF TG_OP = 'INSERT' THEN
        accion_text := 'aviso_creado';
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.estado != NEW.estado THEN
            accion_text := 'aviso_' || LOWER(REPLACE(NEW.estado, ' ', '_'));
        ELSE
            accion_text := 'aviso_actualizado';
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        accion_text := 'aviso_eliminado';
    END IF;

    -- Insertar en historial usando la función auxiliar
    PERFORM insertar_historial_flujo(
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP = 'UPDATE' THEN OLD.estado ELSE NULL END,
        CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE NEW.estado END,
        accion_text,
        auth.user_id(),
        NULL,
        NULL,
        'Cambio de estado del aviso'
    );

    RETURN COALESCE(NEW, OLD);
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error en trigger_historial_aviso: %', SQLERRM;
        RETURN COALESCE(NEW, OLD);
END;
$$;

-- Crear el trigger en la tabla avisos
CREATE TRIGGER trigger_aviso_historial
    AFTER INSERT OR UPDATE OR DELETE ON public.avisos
    FOR EACH ROW
    EXECUTE FUNCTION trigger_historial_aviso();

-- ========================================
-- 7. PERMISOS
-- ========================================

-- Otorgar permisos para usar las funciones
GRANT EXECUTE ON FUNCTION insertar_historial_flujo(uuid, text, text, text, uuid, uuid, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_historial_presupuesto() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_historial_albaran() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_historial_aviso() TO authenticated;

-- ========================================
-- 8. VERIFICACIÓN FINAL
-- ========================================

-- Verificar que las funciones se crearon correctamente
SELECT 'insertar_historial_flujo' as funcion, 'OK' as estado
WHERE EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'insertar_historial_flujo'
);

SELECT 'trigger_historial_presupuesto' as funcion, 'OK' as estado
WHERE EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'trigger_historial_presupuesto'
);

SELECT 'trigger_historial_albaran' as funcion, 'OK' as estado
WHERE EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'trigger_historial_albaran'
);

SELECT 'trigger_historial_aviso' as funcion, 'OK' as estado
WHERE EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'trigger_historial_aviso'
);

-- Verificar que los triggers se crearon correctamente
SELECT 'trigger_presupuesto_historial' as trigger, 'OK' as estado
WHERE EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'trigger_presupuesto_historial'
);

SELECT 'trigger_albaran_historial' as trigger, 'OK' as estado
WHERE EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'trigger_albaran_historial'
);

SELECT 'trigger_aviso_historial' as trigger, 'OK' as estado
WHERE EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'trigger_aviso_historial'
);

-- ========================================
-- 9. MENSAJE DE CONFIRMACIÓN
-- ========================================

SELECT 'Script ejecutado correctamente. Sistema de historial_flujo recreado completamente.' as mensaje;
