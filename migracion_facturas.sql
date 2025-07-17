-- =====================================================
-- MIGRACIÓN DEL SISTEMA DE FACTURAS
-- =====================================================
-- Este archivo actualiza la base de datos para soportar
-- el sistema completo de facturas con líneas detalladas
-- =====================================================

-- Hacer backup antes de ejecutar esta migración
-- BACKUP: CREATE TABLE facturas_backup AS SELECT * FROM facturas;

-- =====================================================
-- 1. ELIMINAR TABLA FACTURAS EXISTENTE (si existe)
-- =====================================================

-- Eliminar la tabla facturas existente si tiene la estructura antigua
DROP TABLE IF EXISTS public.facturas CASCADE;

-- =====================================================
-- 2. CREAR NUEVA TABLA FACTURAS
-- =====================================================

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
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  iva numeric(10,2) NOT NULL DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  estado text NOT NULL DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'En curso', 'Completado')),
  pdf_url text,
  notas text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT facturas_pkey PRIMARY KEY (id),
  CONSTRAINT facturas_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON DELETE SET NULL,
  CONSTRAINT facturas_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id) ON DELETE SET NULL
);

-- =====================================================
-- 3. CREAR TABLA LÍNEAS DE FACTURA
-- =====================================================

CREATE TABLE public.lineas_factura (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  factura_id uuid NOT NULL,
  tipo text NOT NULL CHECK (tipo IN ('repuesto', 'mano_obra', 'desplazamiento')),
  nombre text NOT NULL,
  cantidad numeric(10,2) NOT NULL DEFAULT 1,
  precio_neto numeric(10,2),
  precio_pvp numeric(10,2) NOT NULL DEFAULT 0,
  descripcion text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  CONSTRAINT lineas_factura_pkey PRIMARY KEY (id),
  CONSTRAINT lineas_factura_factura_id_fkey FOREIGN KEY (factura_id) REFERENCES public.facturas(id) ON DELETE CASCADE
);

-- =====================================================
-- 4. CREAR ÍNDICES PARA OPTIMIZAR CONSULTAS
-- =====================================================

-- Índices para la tabla facturas
CREATE INDEX idx_facturas_numero_factura ON public.facturas(numero_factura);
CREATE INDEX idx_facturas_fecha_emision ON public.facturas(fecha_emision);
CREATE INDEX idx_facturas_estado ON public.facturas(estado);
CREATE INDEX idx_facturas_cliente_id ON public.facturas(cliente_id);
CREATE INDEX idx_facturas_aviso_id ON public.facturas(aviso_id);
CREATE INDEX idx_facturas_fecha_creacion ON public.facturas(fecha_creacion);

-- Índices para la tabla lineas_factura
CREATE INDEX idx_lineas_factura_factura_id ON public.lineas_factura(factura_id);
CREATE INDEX idx_lineas_factura_tipo ON public.lineas_factura(tipo);
CREATE INDEX idx_lineas_factura_fecha_creacion ON public.lineas_factura(fecha_creacion);

-- =====================================================
-- 5. CREAR FUNCIÓN PARA ACTUALIZAR FECHA_ACTUALIZACION
-- =====================================================

CREATE OR REPLACE FUNCTION update_facturas_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_actualizacion = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 6. CREAR TRIGGER PARA ACTUALIZAR FECHA_ACTUALIZACION
-- =====================================================

CREATE TRIGGER trigger_update_facturas_updated_at
  BEFORE UPDATE ON public.facturas
  FOR EACH ROW
  EXECUTE FUNCTION update_facturas_updated_at();

-- =====================================================
-- 7. CREAR FUNCIÓN PARA GENERAR NÚMERO DE FACTURA
-- =====================================================

CREATE OR REPLACE FUNCTION generar_numero_factura()
RETURNS text AS $$
DECLARE
  año_actual integer;
  ultimo_numero text;
  siguiente_numero integer;
  numero_factura text;
BEGIN
  -- Obtener el año actual
  año_actual := EXTRACT(YEAR FROM CURRENT_DATE);
  
  -- Buscar el último número de factura del año actual
  SELECT numero_factura INTO ultimo_numero
  FROM public.facturas
  WHERE numero_factura LIKE 'F' || año_actual || '-%'
  ORDER BY numero_factura DESC
  LIMIT 1;
  
  -- Si no hay facturas este año, empezar con 001
  IF ultimo_numero IS NULL THEN
    numero_factura := 'F' || año_actual || '-001';
  ELSE
    -- Extraer el número y incrementarlo
    siguiente_numero := (SUBSTRING(ultimo_numero FROM 'F\d{4}-(\d{3})')::integer) + 1;
    numero_factura := 'F' || año_actual || '-' || LPAD(siguiente_numero::text, 3, '0');
  END IF;
  
  RETURN numero_factura;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 8. CREAR FUNCIÓN PARA CALCULAR TOTALES DE FACTURA
-- =====================================================

CREATE OR REPLACE FUNCTION calcular_totales_factura(factura_uuid uuid)
RETURNS void AS $$
DECLARE
  subtotal_calculado numeric(10,2);
  iva_calculado numeric(10,2);
  total_calculado numeric(10,2);
BEGIN
  -- Calcular subtotal sumando todas las líneas
  SELECT COALESCE(SUM(cantidad * precio_pvp), 0) INTO subtotal_calculado
  FROM public.lineas_factura
  WHERE factura_id = factura_uuid;
  
  -- Calcular IVA (21%)
  iva_calculado := subtotal_calculado * 0.21;
  
  -- Calcular total
  total_calculado := subtotal_calculado + iva_calculado;
  
  -- Actualizar la factura con los totales calculados
  UPDATE public.facturas
  SET 
    subtotal = subtotal_calculado,
    iva = iva_calculado,
    total = total_calculado,
    fecha_actualizacion = now()
  WHERE id = factura_uuid;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 9. CREAR TRIGGER PARA RECALCULAR TOTALES
-- =====================================================

CREATE OR REPLACE FUNCTION trigger_recalcular_totales()
RETURNS TRIGGER AS $$
BEGIN
  -- Si se inserta o actualiza una línea, recalcular totales
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    PERFORM calcular_totales_factura(NEW.factura_id);
    RETURN NEW;
  END IF;
  
  -- Si se elimina una línea, recalcular totales
  IF TG_OP = 'DELETE' THEN
    PERFORM calcular_totales_factura(OLD.factura_id);
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_lineas_factura_totales
  AFTER INSERT OR UPDATE OR DELETE ON public.lineas_factura
  FOR EACH ROW
  EXECUTE FUNCTION trigger_recalcular_totales();

-- =====================================================
-- 10. CREAR VISTA PARA FACTURAS CON TOTALES
-- =====================================================

CREATE OR REPLACE VIEW v_facturas_completas AS
SELECT 
  f.*,
  c.nombre_completo as nombre_cliente_completo,
  c.email as email_cliente_original,
  a.nombre_cliente_aviso,
  a.descripcion_problema,
  COUNT(lf.id) as total_lineas,
  COALESCE(SUM(CASE WHEN lf.tipo = 'repuesto' THEN lf.cantidad * lf.precio_pvp ELSE 0 END), 0) as total_repuestos,
  COALESCE(SUM(CASE WHEN lf.tipo = 'mano_obra' THEN lf.cantidad * lf.precio_pvp ELSE 0 END), 0) as total_mano_obra,
  COALESCE(SUM(CASE WHEN lf.tipo = 'desplazamiento' THEN lf.cantidad * lf.precio_pvp ELSE 0 END), 0) as total_desplazamiento
FROM public.facturas f
LEFT JOIN public.clientes c ON f.cliente_id = c.id
LEFT JOIN public.avisos a ON f.aviso_id = a.id
LEFT JOIN public.lineas_factura lf ON f.id = lf.factura_id
GROUP BY f.id, c.nombre_completo, c.email, a.nombre_cliente_aviso, a.descripcion_problema;

-- =====================================================
-- 11. INSERTAR DATOS DE PRUEBA (OPCIONAL)
-- =====================================================

-- Descomentar para insertar datos de prueba
/*
INSERT INTO public.facturas (
  numero_factura,
  fecha_emision,
  nombre_cliente,
  direccion_cliente,
  cif_cliente,
  email_cliente,
  subtotal,
  iva,
  total,
  estado,
  notas
) VALUES 
(
  'F2025-001',
  '2025-01-15',
  'Restaurante El Sol',
  'Calle Mayor 123, Madrid',
  'B12345678',
  'info@restauranteelsol.com',
  450.00,
  94.50,
  544.50,
  'En curso',
  'Mantenimiento preventivo de 3 equipos A/C'
),
(
  'F2025-002',
  '2025-01-14',
  'Hotel Marina',
  'Avenida del Mar 45, Barcelona',
  'A87654321',
  'admin@hotelmarina.com',
  1250.00,
  262.50,
  1512.50,
  'Pendiente',
  'Reparación urgente de caldera'
);

-- Insertar líneas de factura de prueba
INSERT INTO public.lineas_factura (
  factura_id,
  tipo,
  nombre,
  cantidad,
  precio_neto,
  precio_pvp,
  descripcion
) VALUES 
-- Líneas para F2025-001
(
  (SELECT id FROM public.facturas WHERE numero_factura = 'F2025-001'),
  'repuesto',
  'Válvula de expansión',
  1,
  25.00,
  35.00,
  'Válvula de expansión para sistema de refrigeración'
),
(
  (SELECT id FROM public.facturas WHERE numero_factura = 'F2025-001'),
  'repuesto',
  'Filtro de Aire Hepa',
  2,
  18.00,
  25.00,
  'Filtros de aire de alta eficiencia'
),
(
  (SELECT id FROM public.facturas WHERE numero_factura = 'F2025-001'),
  'mano_obra',
  'Mano de obra Técnico',
  2.25,
  NULL,
  45.00,
  'Trabajo técnico especializado'
),
(
  (SELECT id FROM public.facturas WHERE numero_factura = 'F2025-001'),
  'desplazamiento',
  'Kilometraje',
  10,
  NULL,
  3.50,
  'Desplazamiento al lugar de trabajo'
),
-- Líneas para F2025-002
(
  (SELECT id FROM public.facturas WHERE numero_factura = 'F2025-002'),
  'repuesto',
  'Caldera industrial',
  1,
  800.00,
  1000.00,
  'Caldera industrial de alta eficiencia'
),
(
  (SELECT id FROM public.facturas WHERE numero_factura = 'F2025-002'),
  'mano_obra',
  'Instalación y configuración',
  5.00,
  NULL,
  50.00,
  'Instalación y puesta en marcha de caldera'
);
*/

-- =====================================================
-- 12. CONFIGURAR PERMISOS RLS (ROW LEVEL SECURITY)
-- =====================================================

-- Habilitar RLS en las tablas
ALTER TABLE public.facturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lineas_factura ENABLE ROW LEVEL SECURITY;

-- Políticas para facturas (ajustar según necesidades de seguridad)
CREATE POLICY "Permitir lectura de facturas" ON public.facturas
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserción de facturas" ON public.facturas
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización de facturas" ON public.facturas
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminación de facturas" ON public.facturas
  FOR DELETE USING (true);

-- Políticas para líneas de factura
CREATE POLICY "Permitir lectura de líneas de factura" ON public.lineas_factura
  FOR SELECT USING (true);

CREATE POLICY "Permitir inserción de líneas de factura" ON public.lineas_factura
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualización de líneas de factura" ON public.lineas_factura
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminación de líneas de factura" ON public.lineas_factura
  FOR DELETE USING (true);

-- =====================================================
-- 13. COMENTARIOS Y DOCUMENTACIÓN
-- =====================================================

COMMENT ON TABLE public.facturas IS 'Tabla principal de facturas del sistema';
COMMENT ON COLUMN public.facturas.numero_factura IS 'Número único de factura (formato: FYYYY-NNN)';
COMMENT ON COLUMN public.facturas.estado IS 'Estado de la factura: Pendiente, En curso, Completado';
COMMENT ON COLUMN public.facturas.subtotal IS 'Subtotal sin IVA';
COMMENT ON COLUMN public.facturas.iva IS 'Importe del IVA (21%)';
COMMENT ON COLUMN public.facturas.total IS 'Total de la factura (subtotal + IVA)';

COMMENT ON TABLE public.lineas_factura IS 'Líneas detalladas de cada factura';
COMMENT ON COLUMN public.lineas_factura.tipo IS 'Tipo de línea: repuesto, mano_obra, desplazamiento';
COMMENT ON COLUMN public.lineas_factura.precio_neto IS 'Precio neto (solo para repuestos)';
COMMENT ON COLUMN public.lineas_factura.precio_pvp IS 'Precio PVP (precio de venta al público)';

-- =====================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================

-- Verificar que todo se creó correctamente
SELECT 'Migración completada exitosamente' as resultado;

-- Mostrar las tablas creadas
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('facturas', 'lineas_factura')
ORDER BY table_name; 