-- =====================================================
-- MIGRACIÓN: AGREGAR FECHA_ACTUALIZACION A PRESUPUESTOS
-- =====================================================
-- Este archivo agrega la columna fecha_actualizacion que falta
-- en la tabla presupuestos para mantener consistencia con facturas
-- =====================================================

-- 1. AGREGAR COLUMNA FECHA_ACTUALIZACION A PRESUPUESTOS
ALTER TABLE public.presupuestos 
ADD COLUMN fecha_actualizacion timestamp with time zone DEFAULT now();

-- 2. ACTUALIZAR REGISTROS EXISTENTES CON LA FECHA DE CREACIÓN
UPDATE public.presupuestos 
SET fecha_actualizacion = fecha_creacion 
WHERE fecha_actualizacion IS NULL;

-- 3. CREAR FUNCIÓN PARA ACTUALIZAR FECHA_ACTUALIZACION AUTOMÁTICAMENTE
CREATE OR REPLACE FUNCTION actualizar_fecha_modificacion_presupuestos()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_actualizacion = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. CREAR TRIGGER PARA ACTUALIZAR FECHA_ACTUALIZACION EN CADA UPDATE
CREATE TRIGGER trigger_actualizar_fecha_presupuestos
  BEFORE UPDATE ON public.presupuestos
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_modificacion_presupuestos();

-- 5. VERIFICAR QUE LA MIGRACIÓN FUNCIONÓ CORRECTAMENTE
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default 
FROM information_schema.columns 
WHERE table_name = 'presupuestos' 
  AND column_name = 'fecha_actualizacion';

-- RESULTADO ESPERADO:
-- column_name         | data_type                   | is_nullable | column_default
-- -------------------|----------------------------|-------------|---------------
-- fecha_actualizacion | timestamp with time zone   | YES         | now()

-- =====================================================
-- NOTAS:
-- =====================================================
-- * Esta migración es segura y no afecta datos existentes
-- * Todos los presupuestos existentes tendrán fecha_actualizacion = fecha_creacion
-- * Los nuevos presupuestos tendrán fecha_actualizacion automática
-- * El trigger se ejecuta automáticamente en cada UPDATE
-- ===================================================== 