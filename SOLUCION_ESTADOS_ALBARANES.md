# Solución para el Error de Estados de Albaranes

## Problema Identificado

El error que estás experimentando es una **violación de restricción de verificación (check constraint)** en la base de datos. Específicamente:

```
new row for relation "trabajos_realizados" violates check constraint "trabajos_realizados_estado_check"
```

## Causa del Problema

1. **En el código TypeScript**: Hemos agregado nuevos estados para los albaranes:
   - `'Presupuesto pendiente'`
   - `'Otra visita'`

2. **En la base de datos**: La tabla `trabajos_realizados` tiene una restricción que solo permite estos estados:
   - `'Pendiente'`
   - `'En curso'`
   - `'Abierto'`
   - `'Cerrado'`
   - `'Finalizado'`

3. **El conflicto**: Cuando intentas crear un albarán con estado "Otra visita" o "Presupuesto pendiente", el sistema intenta actualizar el trabajo con estos nuevos estados, pero la base de datos los rechaza.

## Solución

### Paso 1: Ejecutar el Script SQL

Ejecuta el archivo `update_estados_completos.sql` en tu base de datos Supabase:

1. Ve a tu proyecto de Supabase
2. Navega a **SQL Editor**
3. Copia y pega el contenido del archivo `update_estados_completos.sql`
4. Ejecuta el script

### Paso 2: Verificar la Aplicación

Después de ejecutar el script, la aplicación debería funcionar correctamente:

- ✅ Los albaranes con estado "Otra visita" se guardarán correctamente
- ✅ Los albaranes con estado "Presupuesto pendiente" se guardarán correctamente
- ✅ Los trabajos se actualizarán con los nuevos estados
- ✅ Los avisos se podrán cerrar y completar correctamente

## Estados Válidos Después de la Actualización

### Tabla `trabajos_realizados`:
- `'Pendiente'`
- `'En curso'`
- `'Abierto'`
- `'Cerrado'`
- `'Finalizado'`
- `'Completado'`
- `'Cancelado'`
- `'Presupuesto pendiente'` ← **NUEVO**
- `'Otra visita'` ← **NUEVO**

### Tabla `avisos`:
- `'No visitado'`
- `'Visitado pendiente'`
- `'En curso'`
- `'Pendiente de presupuesto'`
- `'Otra visita requerida'` ← **NUEVO**
- `'Listo para facturar'`
- `'Pendiente'`
- `'Completado'`
- `'Cancelado'`

## Flujo de Trabajo Corregido

1. **Crear trabajo** → Estado: `'En curso'`
2. **Crear albarán** → Estados disponibles:
   - `'Finalizado'` → Trabajo pasa a `'Finalizado'`
   - `'Presupuesto pendiente'` → Trabajo pasa a `'Presupuesto pendiente'`
   - `'Otra visita'` → Trabajo pasa a `'Otra visita'`
3. **Facturar** → Solo si hay trabajos `'Finalizados'`
4. **Completar aviso** → Solo si hay facturas y todos los trabajos tienen albaranes

## Verificación

Después de ejecutar el script, puedes verificar que los cambios se aplicaron correctamente ejecutando:

```sql
-- Verificar restricciones de trabajos_realizados
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'public.trabajos_realizados'::regclass 
  AND contype = 'c';

-- Verificar restricciones de avisos
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'public.avisos'::regclass 
  AND contype = 'c';
```

## Notas Importantes

- **Backup**: Siempre haz un backup de tu base de datos antes de ejecutar scripts de modificación
- **Testing**: Prueba la funcionalidad en un entorno de desarrollo antes de aplicar en producción
- **Rollback**: Si algo sale mal, puedes revertir los cambios eliminando las restricciones y recreándolas con los valores originales

## Soporte

Si encuentras algún problema después de aplicar esta solución, verifica:

1. Que el script SQL se ejecutó sin errores
2. Que las restricciones se crearon correctamente
3. Que la aplicación se reinició después de los cambios
4. Los logs de la consola para ver si hay otros errores
