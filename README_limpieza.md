# Scripts de Limpieza de Base de Datos

Este conjunto de scripts permite eliminar todos los datos de la base de datos excepto los de las tablas `usuarios` y `roles`.

## ⚠️ ADVERTENCIA IMPORTANTE

**ESTOS SCRIPTS ELIMINAN DATOS PERMANENTEMENTE. NO SE PUEDE HACER ROLLBACK.**
- Hacer backup completo de la base de datos antes de ejecutar
- Verificar que solo se quieren eliminar los datos de las tablas especificadas
- Ejecutar en un entorno de desarrollo/pruebas primero

## Archivos Incluidos

### 1. `limpiar_datos.sql` - Script Principal (DELETE)
- Usa comandos `DELETE` estándar
- Más seguro, permite rollback si se ejecuta dentro de una transacción
- Respeta las restricciones de clave foránea
- Más lento pero más controlado

### 2. `limpiar_datos_truncate.sql` - Script Alternativo (TRUNCATE)
- Usa comandos `TRUNCATE CASCADE` 
- Más rápido y eficiente
- **NO SE PUEDE HACER ROLLBACK**
- Maneja automáticamente las dependencias entre tablas

### 3. `verificar_limpieza.sql` - Script de Verificación
- Verifica que la limpieza se ejecutó correctamente
- Muestra estadísticas de todas las tablas
- Confirma que solo quedan datos en `usuarios` y `roles`

## Tablas que se Limpiarán

Las siguientes tablas serán completamente vaciadas:

### Datos de Negocio
- `avisos` - Avisos de clientes
- `clientes` - Información de clientes
- `facturas` - Facturas generadas
- `inventario` - Stock de materiales
- `trabajos_realizados` - Trabajos técnicos
- `albaranes` - Albaranes de trabajo
- `presupuestos` - Presupuestos pendientes

### Datos de Configuración
- `configuracion_avisos` - Configuración del sistema de avisos
- `configuracion_empresa` - Datos de la empresa
- `configuracion_facturacion` - Configuración de facturación
- `configuracion_flujo` - Configuración del flujo de trabajo
- `configuracion_notificaciones` - Configuración de notificaciones
- `configuracion_sistema` - Configuración general del sistema

### Datos Relacionados
- `materiales_trabajo` - Materiales utilizados en trabajos
- `lineas_factura` - Líneas de facturación
- `historial_flujo` - Historial de cambios de estado
- `fotos_aviso` - Fotos asociadas a avisos

## Tablas que se Conservarán

- `usuarios` - Usuarios del sistema
- `roles` - Roles de usuario

## Instrucciones de Uso

### Opción 1: Usar DELETE (Recomendado para pruebas)
```sql
-- 1. Ejecutar el script de limpieza
\i limpiar_datos.sql

-- 2. Verificar el resultado
\i verificar_limpieza.sql
```

### Opción 2: Usar TRUNCATE (Para producción)
```sql
-- 1. Ejecutar el script de limpieza
\i limpiar_datos_truncate.sql

-- 2. Verificar el resultado
\i verificar_limpieza.sql
```

### Opción 3: Ejecutar desde psql
```bash
psql -d nombre_base_datos -f limpiar_datos.sql
psql -d nombre_base_datos -f verificar_limpieza.sql
```

## Verificación del Resultado

Después de ejecutar la limpieza, el script de verificación debería mostrar:

- **Total de tablas**: 25 tablas
- **Tablas vacías**: 23 tablas
- **Tablas con datos**: 2 tablas (usuarios y roles)

## Consideraciones Adicionales

### Antes de Ejecutar
1. **Backup completo** de la base de datos
2. **Verificar permisos** del usuario de base de datos
3. **Confirmar** que solo se quieren eliminar los datos especificados
4. **Probar** en un entorno de desarrollo primero

### Después de Ejecutar
1. **Verificar** que solo quedan datos en usuarios y roles
2. **Revisar** que las aplicaciones funcionan correctamente
3. **Considerar** si se necesitan datos de configuración por defecto

### Restauración
Si es necesario restaurar datos:
- Usar el backup completo
- O restaurar solo las tablas específicas desde el backup

## Soporte

En caso de problemas o dudas:
1. Verificar los logs de PostgreSQL
2. Revisar que no hay transacciones activas
3. Confirmar que el usuario tiene permisos suficientes
4. Restaurar desde backup si es necesario
