# 🔧 Instrucciones para Aplicar RLS de Eliminación en Cascada

## 📋 Resumen
Este documento explica cómo aplicar las políticas RLS (Row Level Security) para permitir la eliminación en cascada de avisos y todas sus dependencias.

## 🚀 Pasos para Aplicar

### 1. **Ejecutar el Script SQL**
Ejecuta el archivo `rls-eliminacion-cascada-simple.sql` en tu base de datos Supabase:

```sql
-- Ejecutar en el SQL Editor de Supabase
-- Archivo: src/rls-eliminacion-cascada-simple.sql
```

### 2. **Verificar la Aplicación**
Después de ejecutar el script, verifica que se aplicaron correctamente:

```sql
-- Verificar políticas de eliminación
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd
FROM pg_policies 
WHERE schemaname = 'public'
AND policyname LIKE '%Eliminar%'
ORDER BY tablename, policyname;
```

### 3. **Probar la Función de Cascada**
Prueba que la función funciona correctamente:

```sql
-- Probar con un aviso existente (reemplaza con un UUID real)
SELECT eliminar_aviso_cascada('uuid-del-aviso-aqui');
```

## 🔄 Cambios Realizados

### **Políticas RLS Actualizadas**
- ✅ **Avisos**: Solo administradores pueden eliminar
- ✅ **Albaranes**: Solo administradores pueden eliminar
- ✅ **Repuestos**: Solo administradores pueden eliminar
- ✅ **Presupuestos**: Solo administradores pueden eliminar
- ✅ **Facturas**: Solo administradores pueden eliminar
- ✅ **Fotos**: Solo administradores pueden eliminar
- ✅ **Historial**: Solo administradores pueden eliminar
- ✅ **Líneas de Factura**: Solo administradores pueden eliminar

### **Función de Eliminación en Cascada**
- ✅ **`eliminar_aviso_cascada(uuid)`**: Función segura que elimina un aviso con todas sus dependencias
- ✅ **Verificación de permisos**: Solo administradores pueden usar la función
- ✅ **Orden correcto**: Elimina dependencias antes que el aviso principal
- ✅ **Logging**: Registra la eliminación exitosa

### **Servicio de Avisos Actualizado**
- ✅ **Método `eliminarAviso()`**: Ahora usa la función de cascada de la BD
- ✅ **Fallback manual**: Si la función no existe, usa eliminación manual
- ✅ **Manejo de errores**: Captura y maneja errores apropiadamente

## 🧪 Pruebas Recomendadas

### **1. Prueba de Eliminación Simple**
1. Crear un aviso sin dependencias
2. Intentar eliminarlo como administrador
3. Verificar que se elimina correctamente

### **2. Prueba de Eliminación Compleja**
1. Crear un aviso con:
   - Albaranes con repuestos
   - Presupuestos
   - Facturas con líneas
   - Fotos
   - Historial de flujo
2. Eliminar el aviso como administrador
3. Verificar que se eliminan todas las dependencias

### **3. Prueba de Permisos**
1. Intentar eliminar un aviso como técnico (no administrador)
2. Verificar que se deniega el acceso
3. Verificar que no se elimina nada

## ⚠️ Consideraciones Importantes

### **Seguridad**
- Solo los administradores pueden eliminar avisos
- La función verifica permisos antes de proceder
- Todas las eliminaciones se registran en logs

### **Integridad de Datos**
- El orden de eliminación respeta las restricciones de clave foránea
- Si falla cualquier paso, se detiene toda la operación
- No se pueden eliminar avisos parcialmente

### **Rendimiento**
- La función de cascada es más eficiente que múltiples consultas
- Se ejecuta en una sola transacción
- Reduce la carga en la base de datos

## 🔍 Solución de Problemas

### **Error: "function eliminar_aviso_cascada does not exist"**
- **Causa**: El script SQL no se ejecutó correctamente
- **Solución**: Ejecutar el script `rls-eliminacion-cascada-simple.sql` en Supabase

### **Error: "Solo los administradores pueden eliminar avisos"**
- **Causa**: El usuario actual no tiene rol de administrador
- **Solución**: Verificar que el usuario tenga el rol correcto en la tabla `usuarios`

### **Error: "update or delete on table violates foreign key constraint"**
- **Causa**: Las políticas RLS no se aplicaron correctamente
- **Solución**: Verificar que todas las políticas de eliminación estén activas

## 📞 Soporte

Si encuentras problemas al aplicar estos cambios:

1. **Verifica los logs** de la consola del navegador
2. **Revisa la consola** de Supabase para errores SQL
3. **Confirma que el usuario** tenga rol de administrador
4. **Ejecuta las consultas de verificación** para confirmar que las políticas están activas

## ✅ Lista de Verificación

- [ ] Script SQL ejecutado en Supabase
- [ ] Políticas de eliminación verificadas
- [ ] Función `eliminar_aviso_cascada` creada
- [ ] Usuario actual tiene rol de administrador
- [ ] Pruebas de eliminación realizadas
- [ ] Aplicación actualizada y funcionando
