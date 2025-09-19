-- Script para corregir el trigger trigger_actualizar_albaran_por_presupuesto
-- El trigger tiene errores de sintaxis y usa la columna incorrecta

-- ========================================
-- 1. ELIMINAR EL TRIGGER PROBLEMÁTICO
-- ========================================

DROP TRIGGER IF EXISTS trigger_actualizar_albaran_por_presupuesto ON public.presupuestos;
DROP FUNCTION IF EXISTS actualizar_albaran_por_presupuesto();

-- ========================================
-- 2. CREAR LA FUNCIÓN CORREGIDA
-- ========================================

CREATE OR REPLACE FUNCTION actualizar_albaran_por_presupuesto()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Solo actualizar si el presupuesto se aprueba
  IF NEW.estado = 'Aprobado' AND OLD.estado != 'Aprobado' THEN
    -- Actualizar el estado del albarán relacionado
    UPDATE public.albaranes 
    SET estado_cierre = 'Finalizado',
        fecha_actualizacion = NOW()
    WHERE id = NEW.albaran_id;
    
    -- Registrar en el historial con la columna correcta
    INSERT INTO public.historial_flujo (
      aviso_id, 
      estado_anterior,
      estado_nuevo,
      accion_realizada,  -- ✅ Columna correcta
      observaciones,     -- ✅ Usar observaciones en lugar de descripcion
      usuario_id, 
      albaran_id,
      fecha_cambio
    ) VALUES (
      (SELECT aviso_id FROM public.albaranes WHERE id = NEW.albaran_id),
      OLD.estado,
      NEW.estado,
      'presupuesto_aprobado',  -- ✅ Acción más específica
      'El presupuesto ha sido aprobado y el albarán marcado como finalizado',
      auth.uid(),
      NEW.albaran_id,
      NOW()
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- ========================================
-- 3. CREAR EL TRIGGER CORREGIDO
-- ========================================

CREATE TRIGGER trigger_actualizar_albaran_por_presupuesto
    AFTER UPDATE ON public.presupuestos
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_albaran_por_presupuesto();

-- ========================================
-- 4. PERMISOS
-- ========================================

GRANT EXECUTE ON FUNCTION actualizar_albaran_por_presupuesto() TO authenticated;

-- ========================================
-- 5. MENSAJE DE CONFIRMACIÓN
-- ========================================

SELECT 'Trigger trigger_actualizar_albaran_por_presupuesto corregido exitosamente.' as mensaje;
