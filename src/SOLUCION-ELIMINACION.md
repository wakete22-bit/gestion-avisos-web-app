# 🔧 SOLUCIÓN: Problema de Eliminación de Presupuestos y Albaranes

## 🚨 **PROBLEMA IDENTIFICADO**
Las operaciones de eliminación (DELETE) no funcionan porque la base de datos tiene **Row Level Security (RLS)** habilitado sin políticas adecuadas.

## ✅ **SOLUCIÓN INMEDIATA (Desarrollo/Testing)**

### **PASO 1: Ejecutar Script para Deshabilitar RLS**
```sql
-- Ejecuta este archivo en tu base de datos Supabase:
src/disable-rls-temporary.sql
```

### **PASO 2: Verificar que RLS está Deshabilitado**
```sql
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

**Resultado esperado:** Todas las tablas deben mostrar `rowsecurity = false`

### **PASO 3: Probar Eliminaciones**
Después de deshabilitar RLS, podrás:
- ✅ Eliminar presupuestos
- ✅ Eliminar albaranes
- ✅ Realizar todas las operaciones CRUD

## 🔒 **SOLUCIÓN PERMANENTE (Producción)**

### **OPCIÓN A: Políticas RLS Permisivas**
```sql
-- Ejecuta este archivo para crear políticas permisivas:
src/rls-policies-complete.sql
```

### **OPCIÓN B: Deshabilitar RLS Completamente**
```sql
-- Si no necesitas RLS, puedes deshabilitarlo permanentemente:
ALTER TABLE public.presupuestos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.albaranes DISABLE ROW LEVEL SECURITY;
-- ... etc para todas las tablas
```

## 📋 **ARCHIVOS CREADOS**

1. **`src/disable-rls-temporary.sql`** - Deshabilita RLS temporalmente
2. **`src/rls-policies-complete.sql`** - Crea políticas RLS permisivas
3. **`src/SOLUCION-ELIMINACION.md`** - Este archivo de instrucciones

## 🎯 **RECOMENDACIÓN**

**Para desarrollo/testing:** Usa `disable-rls-temporary.sql`

**Para producción:** 
- Si quieres mantener seguridad: Usa `rls-policies-complete.sql`
- Si no necesitas RLS: Deshabilítalo completamente

## ⚠️ **ADVERTENCIAS**

- **NO uses `disable-rls-temporary.sql` en producción**
- Las políticas permisivas permiten acceso completo a todos los usuarios
- Para seguridad real, implementa autenticación y roles de usuario

## 🔍 **VERIFICACIÓN**

Después de aplicar la solución:
1. ✅ Los botones de eliminar funcionarán
2. ✅ No habrá errores de permisos
3. ✅ Las operaciones CRUD funcionarán normalmente

## 📞 **SOPORTE**

Si sigues teniendo problemas:
1. Verifica que RLS esté deshabilitado
2. Revisa los logs de la consola del navegador
3. Verifica que no haya restricciones de foreign key
