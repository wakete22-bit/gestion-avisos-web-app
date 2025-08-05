-- =====================================================
-- OPTIMIZACIÓN DE RENDIMIENTO - ÍNDICES CRÍTICOS
-- =====================================================

-- Índices para la tabla avisos (consultas más frecuentes)
CREATE INDEX IF NOT EXISTS idx_avisos_estado ON public.avisos(estado);
CREATE INDEX IF NOT EXISTS idx_avisos_fecha_creacion ON public.avisos(fecha_creacion DESC);
CREATE INDEX IF NOT EXISTS idx_avisos_cliente_id ON public.avisos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_avisos_tecnico_asignado_id ON public.avisos(tecnico_asignado_id);
CREATE INDEX IF NOT EXISTS idx_avisos_es_urgente ON public.avisos(es_urgente);
CREATE INDEX IF NOT EXISTS idx_avisos_estado_fecha ON public.avisos(estado, fecha_creacion DESC);
CREATE INDEX IF NOT EXISTS idx_avisos_nombre_cliente_aviso ON public.avisos USING gin(to_tsvector('spanish', nombre_cliente_aviso));
CREATE INDEX IF NOT EXISTS idx_avisos_descripcion_problema ON public.avisos USING gin(to_tsvector('spanish', descripcion_problema));

-- Índices para la tabla clientes
CREATE INDEX IF NOT EXISTS idx_clientes_nombre_completo ON public.clientes(nombre_completo);
CREATE INDEX IF NOT EXISTS idx_clientes_es_activo ON public.clientes(es_activo);
CREATE INDEX IF NOT EXISTS idx_clientes_email ON public.clientes(email);
CREATE INDEX IF NOT EXISTS idx_clientes_telefono_contacto ON public.clientes(telefono_contacto);

-- Índices para la tabla usuarios
CREATE INDEX IF NOT EXISTS idx_usuarios_rol_id ON public.usuarios(rol_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_es_activo ON public.usuarios(es_activo);
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON public.usuarios(email);

-- Índices para la tabla fotos_aviso
CREATE INDEX IF NOT EXISTS idx_fotos_aviso_aviso_id ON public.fotos_aviso(aviso_id);
CREATE INDEX IF NOT EXISTS idx_fotos_aviso_fecha_subida ON public.fotos_aviso(fecha_subida DESC);

-- Índices para la tabla trabajos_realizados
CREATE INDEX IF NOT EXISTS idx_trabajos_realizados_aviso_id ON public.trabajos_realizados(aviso_id);
CREATE INDEX IF NOT EXISTS idx_trabajos_realizados_fecha_trabajo ON public.trabajos_realizados(fecha_trabajo DESC);
CREATE INDEX IF NOT EXISTS idx_trabajos_realizados_estado ON public.trabajos_realizados(estado);

-- Índices para la tabla inventario
CREATE INDEX IF NOT EXISTS idx_inventario_nombre ON public.inventario(nombre);
CREATE INDEX IF NOT EXISTS idx_inventario_codigo ON public.inventario(codigo);
CREATE INDEX IF NOT EXISTS idx_inventario_cantidad_disponible ON public.inventario(cantidad_disponible);
CREATE INDEX IF NOT EXISTS idx_inventario_fecha_creacion ON public.inventario(fecha_creacion DESC);

-- Índices para la tabla facturas
CREATE INDEX IF NOT EXISTS idx_facturas_cliente_id ON public.facturas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_facturas_aviso_id ON public.facturas(aviso_id);
CREATE INDEX IF NOT EXISTS idx_facturas_estado ON public.facturas(estado);
CREATE INDEX IF NOT EXISTS idx_facturas_fecha_emision ON public.facturas(fecha_emision DESC);

-- Índices para la tabla presupuestos
CREATE INDEX IF NOT EXISTS idx_presupuestos_aviso_id ON public.presupuestos(aviso_id);
CREATE INDEX IF NOT EXISTS idx_presupuestos_estado ON public.presupuestos(estado);
CREATE INDEX IF NOT EXISTS idx_presupuestos_fecha_creacion ON public.presupuestos(fecha_creacion DESC);

-- =====================================================
-- OPTIMIZACIONES ADICIONALES
-- =====================================================

-- Configurar estadísticas de tabla para optimizador
ANALYZE public.avisos;
ANALYZE public.clientes;
ANALYZE public.usuarios;
ANALYZE public.inventario;
ANALYZE public.facturas;
ANALYZE public.presupuestos;

-- Configurar parámetros de rendimiento para Supabase
-- (Estos se aplican a nivel de base de datos)
-- shared_preload_libraries = 'pg_stat_statements'
-- track_activity_query_size = 2048
-- log_statement = 'none'
-- log_min_duration_statement = 1000

-- =====================================================
-- CONSULTAS DE MONITOREO DE RENDIMIENTO
-- =====================================================

-- Consulta para verificar el uso de índices
-- SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
-- FROM pg_stat_user_indexes 
-- WHERE schemaname = 'public'
-- ORDER BY idx_scan DESC;

-- Consulta para verificar consultas lentas
-- SELECT query, calls, total_time, mean_time, rows
-- FROM pg_stat_statements 
-- WHERE query LIKE '%avisos%' OR query LIKE '%clientes%'
-- ORDER BY mean_time DESC
-- LIMIT 10; 