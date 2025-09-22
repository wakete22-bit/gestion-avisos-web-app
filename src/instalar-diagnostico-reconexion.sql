-- =============================================
-- SCRIPT MAESTRO PARA INSTALAR DIAGNÓSTICO DE RECONEXIÓN PWA
-- =============================================
-- Este script ejecuta todo en el orden correcto

-- PASO 1: Limpiar instalaciones anteriores
-- =============================================

-- 1.1. Eliminar función log_reconexion si existe
DROP FUNCTION IF EXISTS log_reconexion(UUID, VARCHAR(50), JSONB);

-- 1.2. Eliminar políticas RLS de reconexion_logs si existen
DROP POLICY IF EXISTS "Users can view own reconexion logs" ON reconexion_logs;
DROP POLICY IF EXISTS "Users can insert own reconexion logs" ON reconexion_logs;

-- 1.3. Eliminar tabla reconexion_logs si existe
DROP TABLE IF EXISTS reconexion_logs;

-- PASO 2: Crear nueva instalación
-- =============================================

-- 2.1. Crear tabla de logs de reconexión
CREATE TABLE reconexion_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    evento VARCHAR(50),
    timestamp TIMESTAMP DEFAULT NOW(),
    detalles JSONB,
    ip_address INET,
    user_agent TEXT
);

-- 2.2. Habilitar RLS en la tabla de logs
ALTER TABLE reconexion_logs ENABLE ROW LEVEL SECURITY;

-- 2.3. Crear políticas RLS para reconexion_logs
CREATE POLICY "Users can view own reconexion logs" ON reconexion_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reconexion logs" ON reconexion_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 2.4. Crear función para loggear reconexiones
CREATE OR REPLACE FUNCTION log_reconexion(
    p_user_id UUID,
    p_evento VARCHAR(50),
    p_detalles JSONB DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    INSERT INTO reconexion_logs (user_id, evento, detalles, ip_address, user_agent)
    VALUES (
        p_user_id, 
        p_evento, 
        p_detalles,
        inet_client_addr(),
        current_setting('request.headers', true)::json->>'user-agent'
    );
EXCEPTION
    WHEN OTHERS THEN
        -- Si falla el log, no interrumpir la operación principal
        NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2.5. Dar permisos a authenticated users
GRANT EXECUTE ON FUNCTION log_reconexion TO authenticated;

-- PASO 3: Verificar instalación
-- =============================================

-- 3.1. Verificar que la función se creó correctamente
SELECT 
    'Instalación completada:' as info,
    'Función log_reconexion creada' as estado
WHERE EXISTS (
    SELECT 1 FROM information_schema.routines 
    WHERE routine_name = 'log_reconexion' 
    AND routine_schema = 'public'
);

-- 3.2. Verificar que la tabla se creó correctamente
SELECT 
    'Instalación completada:' as info,
    'Tabla reconexion_logs creada' as estado
WHERE EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'reconexion_logs' 
    AND table_schema = 'public'
);

-- 3.3. Verificar políticas RLS
SELECT 
    'Políticas RLS creadas:' as info,
    policyname,
    cmd
FROM pg_policies 
WHERE tablename = 'reconexion_logs'
ORDER BY policyname;

-- =============================================
-- INSTRUCCIONES DE USO:
-- =============================================
-- 1. Ejecuta este script completo en Supabase SQL Editor
-- 2. Deberías ver mensajes de "Instalación completada"
-- 3. Prueba la reconexión en tu PWA
-- 4. Para ver logs: SELECT * FROM reconexion_logs ORDER BY timestamp DESC LIMIT 10;
