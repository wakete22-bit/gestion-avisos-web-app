# 🔐 SOLUCIÓN RLS PARA AVISOS

## 🎯 PROBLEMA IDENTIFICADO
- **Presupuestos**: No tienen RLS → Funcionan ✅
- **Avisos**: Tienen RLS activado → No funcionan ❌

## 🚀 SOLUCIÓN RECOMENDADA: POLÍTICA RLS PERMISIVA

### 1. Ejecutar en SQL Editor de Supabase:

```sql
-- Verificar estado actual de RLS
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'avisos';

-- Crear política permisiva para usuarios autenticados
CREATE POLICY "Permitir todo a usuarios autenticados" ON avisos
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- Crear política para usuarios anónimos (lectura)
CREATE POLICY "Permitir lectura a anónimos" ON avisos
FOR SELECT TO anon
USING (true);

-- Verificar políticas creadas
SELECT policyname, roles, cmd FROM pg_policies WHERE tablename = 'avisos';
```

### 2. Alternativa: Deshabilitar RLS (más simple)

```sql
-- Deshabilitar RLS completamente
ALTER TABLE avisos DISABLE ROW LEVEL SECURITY;

-- Verificar
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'avisos';
```

## 🎯 RESULTADO ESPERADO
Después de aplicar cualquiera de las soluciones:
- ✅ Avisos se cargarán en el dashboard
- ✅ Avisos se mostrarán en la lista
- ✅ Todas las funcionalidades funcionarán

## 🔍 VERIFICACIÓN
1. Ejecutar SQL en Supabase
2. Recargar la aplicación
3. Verificar que aparecen 3 avisos en el dashboard
4. Confirmar que la lista de avisos funciona
