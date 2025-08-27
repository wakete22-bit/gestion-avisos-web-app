-- ========================================
-- COMPARAR POLÍTICAS RLS ENTRE TABLAS
-- ========================================
-- Este script te mostrará exactamente qué políticas RLS tiene cada tabla
-- y por qué algunas permiten eliminaciones y otras no

-- ========================================
-- 1. VER TODAS LAS POLÍTICAS RLS EXISTENTES
-- ========================================
SELECT 
    'Todas las Políticas' as "Sección",
    schemaname as "Esquema",
    tablename as "Tabla",
    policyname as "Nombre Política",
    cmd as "Operación",
    permissive as "Permisiva",
    roles as "Roles Aplicados",
    qual as "Condición USING",
    with_check as "Condición WITH CHECK"
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, cmd, policyname;

-- ========================================
-- 2. COMPARAR POLÍTICAS POR TABLA
-- ========================================
SELECT 
    'Resumen por Tabla' as "Sección",
    tablename as "Tabla",
    COUNT(*) as "Total Políticas",
    COUNT(CASE WHEN cmd = 'SELECT' THEN 1 END) as "Políticas SELECT",
    COUNT(CASE WHEN cmd = 'INSERT' THEN 1 END) as "Políticas INSERT",
    COUNT(CASE WHEN cmd = 'UPDATE' THEN 1 END) as "Políticas UPDATE",
    COUNT(CASE WHEN cmd = 'DELETE' THEN 1 END) as "Políticas DELETE",
    COUNT(CASE WHEN cmd = 'ALL' THEN 1 END) as "Políticas ALL"
FROM pg_policies 
WHERE schemaname = 'public'
    AND tablename IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
GROUP BY tablename
ORDER BY tablename;

-- ========================================
-- 3. COMPARAR POLÍTICAS DE ELIMINACIÓN ESPECÍFICAMENTE
-- ========================================
SELECT 
    'Políticas DELETE' as "Sección",
    tablename as "Tabla",
    policyname as "Nombre Política",
    permissive as "Permisiva",
    qual as "Condición USING (DELETE)",
    with_check as "Condición WITH CHECK (DELETE)",
    CASE 
        WHEN qual IS NULL OR qual = '' THEN '❌ SIN RESTRICCIONES - Permite eliminar TODO'
        WHEN qual = 'true' THEN '✅ PERMISIVA - Permite eliminar TODO'
        WHEN qual LIKE '%auth%' OR qual LIKE '%user%' THEN '🔒 RESTRICTIVA - Solo usuario autenticado'
        ELSE '⚠️ CONDICIONAL - ' || qual
    END as "Análisis"
FROM pg_policies 
WHERE schemaname = 'public'
    AND cmd = 'DELETE'
    AND tablename IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
ORDER BY tablename;

-- ========================================
-- 4. COMPARAR POLÍTICAS ALL (si existen)
-- ========================================
SELECT 
    'Políticas ALL' as "Sección",
    tablename as "Tabla",
    policyname as "Nombre Política",
    permissive as "Permisiva",
    qual as "Condición USING (ALL)",
    with_check as "Condición WITH CHECK (ALL)",
    CASE 
        WHEN qual IS NULL OR qual = '' THEN '❌ SIN RESTRICCIONES - Permite TODO'
        WHEN qual = 'true' THEN '✅ PERMISIVA - Permite TODO'
        WHEN qual LIKE '%auth%' OR qual LIKE '%user%' THEN '🔒 RESTRICTIVA - Solo usuario autenticado'
        ELSE '⚠️ CONDICIONAL - ' || qual
    END as "Análisis"
FROM pg_policies 
WHERE schemaname = 'public'
    AND cmd = 'ALL'
    AND tablename IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
ORDER BY tablename;

-- ========================================
-- 5. VERIFICAR SI HAY POLÍTICAS CONFLICTIVAS
-- ========================================
SELECT 
    'Análisis de Conflictos' as "Sección",
    tablename as "Tabla",
    CASE 
        WHEN COUNT(CASE WHEN cmd = 'DELETE' THEN 1 END) = 0 
             AND COUNT(CASE WHEN cmd = 'ALL' THEN 1 END) = 0 
        THEN '🚫 SIN POLÍTICA DELETE - RLS bloquea eliminaciones'
        
        WHEN COUNT(CASE WHEN cmd = 'DELETE' THEN 1 END) > 0 
             AND COUNT(CASE WHEN cmd = 'DELETE' AND (qual = 'true' OR qual IS NULL) THEN 1 END) > 0
        THEN '✅ CON POLÍTICA DELETE PERMISIVA - Permite eliminar'
        
        WHEN COUNT(CASE WHEN cmd = 'ALL' THEN 1 END) > 0 
             AND COUNT(CASE WHEN cmd = 'ALL' AND (qual = 'true' OR qual IS NULL) THEN 1 END) > 0
        THEN '✅ CON POLÍTICA ALL PERMISIVA - Permite eliminar'
        
        ELSE '⚠️ CON POLÍTICAS RESTRICTIVAS - Verificar condiciones'
    END as "Estado Eliminación"
FROM pg_policies 
WHERE schemaname = 'public'
    AND tablename IN ('presupuestos', 'albaranes', 'facturas', 'avisos')
GROUP BY tablename
ORDER BY tablename;

-- ========================================
-- 6. RESUMEN FINAL
-- ========================================
SELECT 
    'RESUMEN FINAL' as "Sección",
    'Para resolver el problema de eliminación:' as "Recomendación",
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE schemaname = 'public' 
                AND tablename IN ('presupuestos', 'albaranes')
                AND cmd = 'DELETE'
                AND (qual != 'true' AND qual IS NOT NULL)
        ) THEN '🔒 Las políticas RLS son restrictivas - Deshabilitar RLS temporalmente'
        ELSE '✅ Las políticas RLS son permisivas - El problema está en otro lado'
    END as "Diagnóstico"
UNION ALL
SELECT 
    'SOLUCIÓN' as "Sección",
    'Comando para resolver:' as "Recomendación",
    'ALTER TABLE public.presupuestos DISABLE ROW LEVEL SECURITY;' as "Diagnóstico"
UNION ALL
SELECT 
    'SOLUCIÓN' as "Sección",
    'Comando para resolver:' as "Recomendación",
    'ALTER TABLE public.albaranes DISABLE ROW LEVEL SECURITY;' as "Diagnóstico";
