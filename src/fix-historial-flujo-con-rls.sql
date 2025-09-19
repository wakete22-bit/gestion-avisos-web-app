-- Script para corregir el problema de historial_flujo manteniendo RLS y flujo de aprobación

-- ========================================
-- 1. ELIMINAR SOLO LAS FUNCIONES PROBLEMÁTICAS
-- ========================================

-- Eliminar solo los triggers problemáticos (mantener RLS)
DROP TRIGGER IF EXISTS trigger_presupuesto_historial ON public.presupuestos;
DROP TRIGGER IF EXISTS trigger_albaran_historial ON public.albaranes;
DROP TRIGGER IF EXISTS trigger_aviso_historial ON public.avisos;

-- Eliminar solo las funciones problemáticas
DROP FUNCTION IF EXISTS trigger_historial_presupuesto();
DROP FUNCTION IF EXISTS trigger_historial_albaran();
DROP FUNCTION IF EXISTS trigger_historial_aviso();
DROP FUNCTION IF EXISTS insertar_historial_flujo(uuid, text, text, text, uuid, uuid, uuid, text);
DROP FUNCTION IF EXISTS insertar_historial_flujo(uuid, text, text, text, uuid, uuid, uuid, text, text);

-- ========================================
-- 2. CREAR FUNCIÓN AUXILIAR CORREGIDA
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
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al insertar en historial_flujo: %', SQLERRM;
END;
$$;

-- ========================================
-- 3. CREAR TRIGGER CORREGIDO PARA PRESUPUESTOS
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
-- 4. CREAR TRIGGER CORREGIDO PARA ALBARANES
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
-- 5. CREAR TRIGGER CORREGIDO PARA AVISOS
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
-- 6. FUNCIÓN PARA APROBAR PRESUPUESTO Y ACTUALIZAR AVISO
-- ========================================

-- Función para aprobar presupuesto y actualizar el estado del aviso
CREATE OR REPLACE FUNCTION aprobar_presupuesto(p_presupuesto_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    presupuesto_record RECORD;
    aviso_record RECORD;
BEGIN
    -- Obtener datos del presupuesto
    SELECT p.*, a.estado as aviso_estado_actual
    INTO presupuesto_record
    FROM presupuestos p
    JOIN avisos a ON p.aviso_id = a.id
    WHERE p.id = p_presupuesto_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Presupuesto no encontrado';
    END IF;
    
    -- Actualizar el presupuesto a "Aprobado"
    UPDATE presupuestos 
    SET estado = 'Aprobado',
        fecha_actualizacion = NOW()
    WHERE id = p_presupuesto_id;
    
    -- Actualizar el aviso a "Listo para facturar" si el presupuesto es aprobado
    UPDATE avisos 
    SET estado = 'Listo para facturar',
        fecha_actualizacion = NOW()
    WHERE id = presupuesto_record.aviso_id;
    
    -- Actualizar el albarán asociado a "Finalizado" si existe
    IF presupuesto_record.albaran_id IS NOT NULL THEN
        UPDATE albaranes 
        SET estado_cierre = 'Finalizado',
            fecha_actualizacion = NOW()
        WHERE id = presupuesto_record.albaran_id;
    END IF;
    
    -- Insertar en historial_flujo manualmente para el presupuesto
    PERFORM insertar_historial_flujo(
        presupuesto_record.aviso_id,
        presupuesto_record.estado,
        'Aprobado',
        'presupuesto_aprobado',
        auth.user_id(),
        NULL,
        presupuesto_record.albaran_id,
        'Presupuesto aprobado - aviso listo para facturar'
    );
    
    -- Insertar en historial_flujo para el aviso
    PERFORM insertar_historial_flujo(
        presupuesto_record.aviso_id,
        presupuesto_record.aviso_estado_actual,
        'Listo para facturar',
        'aviso_listo_para_facturar',
        auth.user_id(),
        NULL,
        presupuesto_record.albaran_id,
        'Aviso actualizado a listo para facturar tras aprobación de presupuesto'
    );
    
    -- Insertar en historial_flujo para el albarán si existe
    IF presupuesto_record.albaran_id IS NOT NULL THEN
        PERFORM insertar_historial_flujo(
            presupuesto_record.aviso_id,
            'Presupuesto pendiente',
            'Finalizado',
            'albaran_finalizado',
            auth.user_id(),
            NULL,
            presupuesto_record.albaran_id,
            'Albarán finalizado tras aprobación de presupuesto'
        );
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al aprobar presupuesto: %', SQLERRM;
END;
$$;

-- ========================================
-- 7. PERMISOS
-- ========================================

-- Otorgar permisos para usar las funciones
GRANT EXECUTE ON FUNCTION insertar_historial_flujo(uuid, text, text, text, uuid, uuid, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_historial_presupuesto() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_historial_albaran() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_historial_aviso() TO authenticated;
GRANT EXECUTE ON FUNCTION aprobar_presupuesto(uuid) TO authenticated;

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

SELECT 'aprobar_presupuesto' as funcion, 'OK' as estado
WHERE EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'aprobar_presupuesto'
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

SELECT 'Script ejecutado correctamente. Sistema de historial_flujo corregido manteniendo RLS y flujo de aprobación.' as mensaje;
