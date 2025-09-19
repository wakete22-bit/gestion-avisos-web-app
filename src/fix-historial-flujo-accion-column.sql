-- Script para corregir el error de columna 'accion' en historial_flujo
-- El error indica que se está intentando usar 'accion' cuando debería ser 'accion_realizada'

-- ========================================
-- 1. VERIFICAR SI EXISTE UNA FUNCIÓN O TRIGGER PROBLEMÁTICO
-- ========================================

-- Buscar funciones que puedan estar insertando en historial_flujo con la columna incorrecta
SELECT 
    n.nspname as schema_name,
    p.proname as function_name,
    pg_get_functiondef(p.oid) as function_definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE pg_get_functiondef(p.oid) ILIKE '%historial_flujo%'
AND pg_get_functiondef(p.oid) ILIKE '%accion%'
AND n.nspname = 'public';

-- Buscar triggers que puedan estar causando el problema
SELECT 
    t.tgname as trigger_name,
    c.relname as table_name,
    pg_get_triggerdef(t.oid) as trigger_definition
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
WHERE pg_get_triggerdef(t.oid) ILIKE '%historial_flujo%'
AND pg_get_triggerdef(t.oid) ILIKE '%accion%';

-- ========================================
-- 2. CREAR FUNCIÓN CORREGIDA PARA INSERTAR EN HISTORIAL_FLUJO
-- ========================================

-- Función auxiliar para insertar en historial_flujo con la columna correcta
CREATE OR REPLACE FUNCTION insertar_historial_flujo(
    p_aviso_id uuid,
    p_estado_anterior text DEFAULT NULL,
    p_estado_nuevo text,
    p_accion_realizada text,
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
BEGIN
    -- Determinar la acción realizada
    IF TG_OP = 'INSERT' THEN
        accion_text := 'presupuesto_creado';
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.estado != NEW.estado THEN
            accion_text := 'presupuesto_' || LOWER(NEW.estado);
        ELSE
            accion_text := 'presupuesto_actualizado';
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        accion_text := 'presupuesto_eliminado';
    END IF;

    -- Insertar en historial usando la función auxiliar
    PERFORM insertar_historial_flujo(
        NEW.aviso_id,
        CASE WHEN TG_OP = 'UPDATE' THEN OLD.estado ELSE NULL END,
        CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE NEW.estado END,
        accion_text,
        auth.user_id(),
        NULL,
        NEW.albaran_id,
        'Cambio de estado del presupuesto'
    );

    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Crear el trigger en la tabla presupuestos
DROP TRIGGER IF EXISTS trigger_presupuesto_historial ON public.presupuestos;
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
BEGIN
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
        NEW.aviso_id,
        CASE WHEN TG_OP = 'UPDATE' THEN OLD.estado_cierre ELSE NULL END,
        CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE NEW.estado_cierre END,
        accion_text,
        auth.user_id(),
        NULL,
        NEW.id,
        'Cambio de estado del albarán'
    );

    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Crear el trigger en la tabla albaranes
DROP TRIGGER IF EXISTS trigger_albaran_historial ON public.albaranes;
CREATE TRIGGER trigger_albaran_historial
    AFTER INSERT OR UPDATE OR DELETE ON public.albaranes
    FOR EACH ROW
    EXECUTE FUNCTION trigger_historial_albaran();

-- ========================================
-- 5. VERIFICACIÓN
-- ========================================

-- Verificar que la tabla historial_flujo tiene la estructura correcta
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'historial_flujo'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Verificar que las funciones se crearon correctamente
SELECT proname, prosrc
FROM pg_proc
WHERE proname IN ('insertar_historial_flujo', 'trigger_historial_presupuesto', 'trigger_historial_albaran');

-- Verificar que los triggers se crearon correctamente
SELECT tgname, tgrelid::regclass as table_name
FROM pg_trigger
WHERE tgname IN ('trigger_presupuesto_historial', 'trigger_albaran_historial');

-- ========================================
-- 6. PERMISOS
-- ========================================

-- Otorgar permisos para usar las funciones
GRANT EXECUTE ON FUNCTION insertar_historial_flujo(uuid, text, text, text, uuid, uuid, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_historial_presupuesto() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_historial_albaran() TO authenticated;
