-- =============================================
-- SCRIPT ESENCIAL PARA DIAGNÓSTICO DE RECONEXIÓN PWA
-- =============================================
-- IMPORTANTE: Ejecutar primero limpiar-diagnostico-reconexion.sql

-- 1. Crear tabla de logs de reconexión
CREATE TABLE reconexion_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    evento VARCHAR(50),
    timestamp TIMESTAMP DEFAULT NOW(),
    detalles JSONB,
    ip_address INET,
    user_agent TEXT
);

-- 2. Habilitar RLS en la tabla de logs
ALTER TABLE reconexion_logs ENABLE ROW LEVEL SECURITY;

-- 3. Crear políticas RLS para reconexion_logs
CREATE POLICY "Users can view own reconexion logs" ON reconexion_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reconexion logs" ON reconexion_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Crear función para loggear reconexiones
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

-- 5. Dar permisos a authenticated users
GRANT EXECUTE ON FUNCTION log_reconexion TO authenticated;

-- 6. Verificar que la función se creó correctamente
SELECT 
    'Función log_reconexion creada:' as info,
    routine_name,
    routine_type,
    security_type
FROM information_schema.routines 
WHERE routine_name = 'log_reconexion' 
AND routine_schema = 'public';

-- 7. Ver logs de reconexión (si existen)
SELECT 
    'Logs de reconexión:' as info,
    rl.id,
    rl.user_id,
    u.email,
    rl.evento,
    rl.timestamp,
    rl.detalles
FROM reconexion_logs rl
LEFT JOIN auth.users u ON u.id = rl.user_id
ORDER BY rl.timestamp DESC
LIMIT 10;

-- 8. Verificar políticas RLS de la tabla avisos
SELECT 
    'Políticas RLS de avisos:' as info,
    policyname,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'avisos'
ORDER BY cmd, policyname;

-- 9. Verificar políticas RLS de la tabla usuarios
SELECT 
    'Políticas RLS de usuarios:' as info,
    policyname,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'usuarios'
ORDER BY cmd, policyname;

-- =============================================
-- INSTRUCCIONES:
-- =============================================
-- 1. Ejecuta este script en Supabase SQL Editor
-- 2. Prueba la reconexión en tu PWA
-- 3. Ejecuta solo la consulta del punto 7 para ver los logs
-- 4. Si no hay logs, la función no se está ejecutando
