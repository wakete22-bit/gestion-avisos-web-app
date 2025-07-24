-- =====================================================
-- MEJORAS PARA EL FLUJO DE AVISOS, PRESUPUESTOS Y FACTURAS
-- =====================================================
-- Este archivo contiene las mejoras para conectar mejor
-- el flujo completo desde avisos hasta facturas
-- =====================================================

-- =====================================================
-- 1. ACTUALIZAR TABLA PRESUPUESTOS CON NUEVOS ESTADOS
-- =====================================================

-- Agregar nuevos estados a los presupuestos
ALTER TABLE public.presupuestos 
DROP CONSTRAINT IF EXISTS presupuestos_estado_check;

ALTER TABLE public.presupuestos 
ADD CONSTRAINT presupuestos_estado_check 
CHECK (estado = ANY (ARRAY['Pendiente'::text, 'En curso'::text, 'Completado'::text, 'Facturado'::text, 'Cancelado'::text]));

-- =====================================================
-- 2. MEJORAR TABLA AVISOS CON NUEVOS ESTADOS
-- =====================================================

-- Actualizar estados disponibles en avisos
ALTER TABLE public.avisos 
DROP CONSTRAINT IF EXISTS avisos_estado_check;

ALTER TABLE public.avisos 
ADD CONSTRAINT avisos_estado_check 
CHECK (estado = ANY (ARRAY[
  'No visitado'::text, 
  'Visitado pendiente'::text, 
  'Pendiente de presupuesto'::text, 
  'En curso'::text, 
  'Pendiente'::text, 
  'Completado'::text,
  'Cancelado'::text
]));

-- =====================================================
-- 3. CREAR TABLA DE CONFIGURACIÓN DEL FLUJO
-- =====================================================

CREATE TABLE IF NOT EXISTS public.configuracion_flujo (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  precio_hora_mano_obra numeric(10,2) NOT NULL DEFAULT 50.00,
  iva_por_defecto numeric(5,2) NOT NULL DEFAULT 21.00,
  generar_factura_automatica boolean NOT NULL DEFAULT false,
  requiere_aprobacion_presupuesto boolean NOT NULL DEFAULT true,
  notificar_cambios_estado boolean NOT NULL DEFAULT true,
  plantilla_email_presupuesto text,
  plantilla_email_factura text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  CONSTRAINT configuracion_flujo_pkey PRIMARY KEY (id)
);

-- Insertar configuración por defecto
INSERT INTO public.configuracion_flujo (
  precio_hora_mano_obra,
  iva_por_defecto,
  generar_factura_automatica,
  requiere_aprobacion_presupuesto,
  notificar_cambios_estado
) VALUES (
  50.00,
  21.00,
  false,
  true,
  true
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 4. CREAR TABLA DE HISTORIAL DE FLUJO
-- =====================================================

CREATE TABLE IF NOT EXISTS public.historial_flujo (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  aviso_id uuid NOT NULL,
  estado_anterior text,
  estado_nuevo text NOT NULL,
  accion_realizada text NOT NULL,
  usuario_id uuid,
  presupuesto_id uuid,
  factura_id uuid,
  trabajo_id uuid,
  observaciones text,
  fecha_cambio timestamp with time zone DEFAULT now(),
  CONSTRAINT historial_flujo_pkey PRIMARY KEY (id),
  CONSTRAINT historial_flujo_aviso_id_fkey FOREIGN KEY (aviso_id) REFERENCES public.avisos(id) ON DELETE CASCADE,
  CONSTRAINT historial_flujo_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE SET NULL,
  CONSTRAINT historial_flujo_presupuesto_id_fkey FOREIGN KEY (presupuesto_id) REFERENCES public.presupuestos(id) ON DELETE SET NULL,
  CONSTRAINT historial_flujo_factura_id_fkey FOREIGN KEY (factura_id) REFERENCES public.facturas(id) ON DELETE SET NULL,
  CONSTRAINT historial_flujo_trabajo_id_fkey FOREIGN KEY (trabajo_id) REFERENCES public.trabajos_realizados(id) ON DELETE SET NULL
);

-- Crear índices para el historial
CREATE INDEX idx_historial_flujo_aviso_id ON public.historial_flujo(aviso_id);
CREATE INDEX idx_historial_flujo_fecha_cambio ON public.historial_flujo(fecha_cambio);
CREATE INDEX idx_historial_flujo_accion ON public.historial_flujo(accion_realizada);

-- =====================================================
-- 5. CREAR FUNCIÓN PARA REGISTRAR CAMBIOS DE ESTADO
-- =====================================================

CREATE OR REPLACE FUNCTION registrar_cambio_estado()
RETURNS TRIGGER AS $$
BEGIN
  -- Solo registrar si el estado cambió
  IF OLD.estado IS DISTINCT FROM NEW.estado THEN
    INSERT INTO public.historial_flujo (
      aviso_id,
      estado_anterior,
      estado_nuevo,
      accion_realizada,
      observaciones
    ) VALUES (
      NEW.id,
      OLD.estado,
      NEW.estado,
      CASE 
        WHEN NEW.estado = 'Pendiente de presupuesto' THEN 'Marcado para presupuesto'
        WHEN NEW.estado = 'En curso' THEN 'Trabajo iniciado'
        WHEN NEW.estado = 'Completado' THEN 'Aviso completado'
        WHEN NEW.estado = 'Cancelado' THEN 'Aviso cancelado'
        ELSE 'Cambio de estado'
      END,
      'Cambio automático de estado'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para avisos
DROP TRIGGER IF EXISTS trigger_cambio_estado_aviso ON public.avisos;
CREATE TRIGGER trigger_cambio_estado_aviso
  AFTER UPDATE ON public.avisos
  FOR EACH ROW
  EXECUTE FUNCTION registrar_cambio_estado();

-- =====================================================
-- 6. CREAR FUNCIÓN PARA OBTENER RESUMEN DE AVISO
-- =====================================================

CREATE OR REPLACE FUNCTION obtener_resumen_aviso(aviso_uuid uuid)
RETURNS JSON AS $$
DECLARE
  resumen JSON;
BEGIN
  SELECT json_build_object(
    'aviso_id', a.id,
    'estado_aviso', a.estado,
    'requiere_presupuesto', a.requiere_presupuesto,
    'cliente', json_build_object(
      'id', c.id,
      'nombre', c.nombre_completo,
      'direccion', c.direccion,
      'email', c.email
    ),
    'presupuesto', CASE 
      WHEN p.id IS NOT NULL THEN json_build_object(
        'id', p.id,
        'estado', p.estado,
        'total_estimado', p.total_estimado,
        'horas_estimadas', p.horas_estimadas
      )
      ELSE NULL
    END,
    'trabajos', json_build_object(
      'total', COUNT(t.id),
      'completados', COUNT(CASE WHEN t.estado = 'Completado' THEN 1 END),
      'en_curso', COUNT(CASE WHEN t.estado = 'En curso' THEN 1 END),
      'pendientes', COUNT(CASE WHEN t.estado = 'Pendiente' THEN 1 END)
    ),
    'facturas', json_build_object(
      'total', COUNT(f.id),
      'pendientes', COUNT(CASE WHEN f.estado = 'Pendiente' THEN 1 END),
      'completadas', COUNT(CASE WHEN f.estado = 'Completado' THEN 1 END),
      'total_importe', COALESCE(SUM(f.total), 0)
    ),
    'puede_crear_presupuesto', (
      a.estado IN ('No visitado', 'Visitado pendiente') AND p.id IS NULL
    ),
    'puede_aprobar_presupuesto', (
      p.id IS NOT NULL AND p.estado = 'Pendiente'
    ),
    'puede_facturar', (
      COUNT(CASE WHEN t.estado = 'Completado' THEN 1 END) > 0 AND
      COUNT(CASE WHEN f.estado != 'Completado' THEN 1 END) = 0
    )
  ) INTO resumen
  FROM public.avisos a
  LEFT JOIN public.clientes c ON a.cliente_id = c.id
  LEFT JOIN public.presupuestos p ON a.id = p.aviso_id
  LEFT JOIN public.trabajos_realizados t ON a.id = t.aviso_id
  LEFT JOIN public.facturas f ON a.id = f.aviso_id
  WHERE a.id = aviso_uuid
  GROUP BY a.id, a.estado, a.requiere_presupuesto, c.id, c.nombre_completo, 
           c.direccion, c.email, p.id, p.estado, p.total_estimado, p.horas_estimadas;
  
  RETURN resumen;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 7. CREAR VISTA PARA DASHBOARD DE FLUJO
-- =====================================================

CREATE OR REPLACE VIEW v_dashboard_flujo AS
SELECT 
  'avisos_nuevos' as metrica,
  COUNT(*) as valor,
  'Avisos nuevos (últimos 7 días)' as descripcion
FROM public.avisos 
WHERE fecha_creacion >= NOW() - INTERVAL '7 days'

UNION ALL

SELECT 
  'presupuestos_pendientes' as metrica,
  COUNT(*) as valor,
  'Presupuestos pendientes de aprobación' as descripcion
FROM public.presupuestos 
WHERE estado = 'Pendiente'

UNION ALL

SELECT 
  'trabajos_en_curso' as metrica,
  COUNT(*) as valor,
  'Trabajos en curso' as descripcion
FROM public.trabajos_realizados 
WHERE estado = 'En curso'

UNION ALL

SELECT 
  'facturas_pendientes' as metrica,
  COUNT(*) as valor,
  'Facturas pendientes de cobro' as descripcion
FROM public.facturas 
WHERE estado IN ('Pendiente', 'En curso')

UNION ALL

SELECT 
  'ingresos_mes_actual' as metrica,
  COALESCE(SUM(total), 0) as valor,
  'Ingresos del mes actual' as descripcion
FROM public.facturas 
WHERE estado = 'Completado' 
AND DATE_TRUNC('month', fecha_emision) = DATE_TRUNC('month', CURRENT_DATE);

-- =====================================================
-- 8. CREAR FUNCIÓN PARA AUTOMATIZAR FLUJO
-- =====================================================

CREATE OR REPLACE FUNCTION automatizar_flujo_aviso(
  aviso_uuid uuid,
  accion text,
  usuario_uuid uuid DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  resultado JSON;
  aviso_actual RECORD;
  presupuesto_actual RECORD;
BEGIN
  -- Obtener información actual del aviso
  SELECT * INTO aviso_actual FROM public.avisos WHERE id = aviso_uuid;
  
  IF NOT FOUND THEN
    RETURN json_build_object('error', 'Aviso no encontrado');
  END IF;
  
  CASE accion
    WHEN 'crear_presupuesto' THEN
      -- Crear presupuesto y cambiar estado del aviso
      INSERT INTO public.presupuestos (aviso_id, horas_estimadas, total_estimado)
      VALUES (aviso_uuid, 2, 0)
      RETURNING * INTO presupuesto_actual;
      
      UPDATE public.avisos 
      SET estado = 'Pendiente de presupuesto', requiere_presupuesto = true
      WHERE id = aviso_uuid;
      
      resultado := json_build_object(
        'accion', 'presupuesto_creado',
        'presupuesto_id', presupuesto_actual.id,
        'mensaje', 'Presupuesto creado y aviso actualizado'
      );
      
    WHEN 'aprobar_presupuesto' THEN
      -- Aprobar presupuesto y cambiar estado del aviso
      UPDATE public.presupuestos 
      SET estado = 'Completado' 
      WHERE aviso_id = aviso_uuid;
      
      UPDATE public.avisos 
      SET estado = 'En curso' 
      WHERE id = aviso_uuid;
      
      resultado := json_build_object(
        'accion', 'presupuesto_aprobado',
        'mensaje', 'Presupuesto aprobado y aviso en curso'
      );
      
    WHEN 'completar_aviso' THEN
      -- Completar aviso
      UPDATE public.avisos 
      SET estado = 'Completado', fecha_finalizacion = NOW()
      WHERE id = aviso_uuid;
      
      resultado := json_build_object(
        'accion', 'aviso_completado',
        'mensaje', 'Aviso marcado como completado'
      );
      
    ELSE
      resultado := json_build_object('error', 'Acción no reconocida');
  END CASE;
  
  -- Registrar en historial
  INSERT INTO public.historial_flujo (
    aviso_id, accion_realizada, usuario_id, observaciones
  ) VALUES (
    aviso_uuid, accion, usuario_uuid, 'Acción automatizada: ' || accion
  );
  
  RETURN resultado;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 9. INSERTAR DATOS DE CONFIGURACIÓN INICIAL
-- =====================================================

-- Actualizar configuración de avisos con nuevos estados
UPDATE public.configuracion_avisos 
SET estados_disponibles = ARRAY[
  'No visitado', 'Visitado pendiente', 'Pendiente de presupuesto', 
  'En curso', 'Pendiente', 'Completado', 'Cancelado'
]
WHERE id = (SELECT id FROM public.configuracion_avisos LIMIT 1);

-- Si no existe configuración, crearla
INSERT INTO public.configuracion_avisos (
  tipos_urgencia, estados_disponibles, tiempo_maximo_respuesta
) 
SELECT 
  ARRAY['Baja', 'Media', 'Alta', 'Crítica'],
  ARRAY['No visitado', 'Visitado pendiente', 'Pendiente de presupuesto', 'En curso', 'Pendiente', 'Completado', 'Cancelado'],
  24
WHERE NOT EXISTS (SELECT 1 FROM public.configuracion_avisos);

-- =====================================================
-- 10. COMENTARIOS FINALES
-- =====================================================

-- Para usar estas mejoras:
-- 1. Ejecutar este script en la base de datos
-- 2. Actualizar los servicios Angular con los nuevos métodos
-- 3. Implementar el FlujoAvisosService en los componentes
-- 4. Probar el flujo completo: Aviso → Presupuesto → Factura

-- Ejemplo de uso de la función de automatización:
-- SELECT automatizar_flujo_aviso('uuid-del-aviso', 'crear_presupuesto', 'uuid-del-usuario');

-- Ejemplo de obtener resumen:
-- SELECT obtener_resumen_aviso('uuid-del-aviso');

COMMENT ON TABLE public.historial_flujo IS 'Registro de todos los cambios de estado en el flujo de avisos';
COMMENT ON FUNCTION obtener_resumen_aviso(uuid) IS 'Obtiene un resumen completo del estado de un aviso';
COMMENT ON FUNCTION automatizar_flujo_aviso(uuid, text, uuid) IS 'Automatiza acciones comunes en el flujo de avisos';
COMMENT ON VIEW v_dashboard_flujo IS 'Vista para mostrar métricas del flujo en el dashboard'; 