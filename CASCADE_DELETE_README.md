# Implementación de Eliminación en Cascada para Avisos

## Descripción del Problema

Actualmente, cuando intentas eliminar un aviso que tiene trabajos realizados, albaranes, presupuestos, facturas o fotos asociadas, la base de datos devuelve un error de restricción de clave foránea:

```
DELETE https://qqoxlnkfcstqfigjjygf.supabase.co/rest/v1/avisos?id=eq.28af8947-a527-4439-8b89-84de47e0b6ee 409 (Conflict)
Key is still referenced from table "trabajos_realizados"
```

## Solución: Eliminación en Cascada

La solución implementa **eliminación en cascada** (`ON DELETE CASCADE`) en todas las tablas que referencian a `avisos`. Esto significa que cuando se elimine un aviso, se eliminarán automáticamente todos los registros relacionados.

## Archivos Creados

1. **`cascade_delete_avisos.sql`** - Script principal para implementar la eliminación en cascada
2. **`revert_cascade_delete_avisos.sql`** - Script para revertir los cambios si es necesario
3. **`update_aviso_estados.sql`** - Script para actualizar los estados válidos de avisos
4. **`CASCADE_DELETE_README.md`** - Este archivo con instrucciones

## Tablas Afectadas

Las siguientes tablas tendrán eliminación en cascada implementada:

| Tabla | Campo | Descripción |
|-------|-------|-------------|
| `trabajos_realizados` | `aviso_id` | Trabajos realizados para el aviso |
| `albaranes` | `aviso_id` | Albaranes de entrega del aviso |
| `presupuestos` | `aviso_id` | Presupuestos generados para el aviso |
| `fotos_aviso` | `aviso_id` | Fotos asociadas al aviso |
| `historial_flujo` | `aviso_id` | Historial de cambios de estado del aviso |
| `facturas` | `aviso_id` | Facturas generadas para el aviso |

## Instrucciones de Implementación

### Paso 1: Actualizar Estados de Avisos (Obligatorio)

**IMPORTANTE**: Este paso debe ejecutarse ANTES del paso 2.

1. Ve a tu proyecto de Supabase
2. Navega a **SQL Editor**
3. Copia y pega el contenido de `update_aviso_estados.sql`
4. Ejecuta el script
5. Verifica que no hay errores

### Paso 2: Implementar Eliminación en Cascada

1. Ve a tu proyecto de Supabase
2. Navega a **SQL Editor**
3. Copia y pega el contenido de `cascade_delete_avisos.sql`
4. Ejecuta el script
5. Verifica que no hay errores

### Opción 2: Ejecutar desde línea de comandos

```bash
# Conectar a tu base de datos Supabase
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Ejecutar el script
\i cascade_delete_avisos.sql
```

### Opción 3: Usar pgAdmin o DBeaver

1. Conecta a tu base de datos Supabase
2. Abre el archivo `cascade_delete_avisos.sql`
3. Ejecuta el script completo

## Verificación

Después de ejecutar el script, puedes verificar que las restricciones se han aplicado correctamente ejecutando la consulta de verificación incluida en el script. Deberías ver que todas las restricciones tienen `delete_rule = 'CASCADE'`.

## Reversión

Si necesitas revertir los cambios por cualquier motivo, ejecuta el script `revert_cascade_delete_avisos.sql` siguiendo las mismas instrucciones.

## Consideraciones de Seguridad

⚠️ **ADVERTENCIA**: Con la eliminación en cascada habilitada, eliminar un aviso eliminará **permanentemente** todos los datos relacionados:

- Trabajos realizados
- Albaranes
- Presupuestos
- Fotos
- Historial de cambios
- Facturas

**Asegúrate de que esto es el comportamiento deseado antes de implementar.**

## Beneficios

✅ **Eliminación limpia**: No más errores de restricción de clave foránea
✅ **Integridad de datos**: Se mantiene la consistencia de la base de datos
✅ **Operaciones más rápidas**: No necesitas eliminar manualmente cada registro relacionado
✅ **Menos código**: No necesitas modificar la lógica de la aplicación

## Alternativas Consideradas

1. **Soft Delete**: Marcar registros como "eliminados" en lugar de eliminarlos físicamente
2. **Eliminación Manual**: Eliminar manualmente cada registro relacionado antes de eliminar el aviso
3. **Triggers**: Usar triggers de base de datos para manejar la eliminación

La eliminación en cascada fue elegida por ser la solución más simple y eficiente para este caso de uso.

## Soporte

Si encuentras algún problema durante la implementación, verifica:

1. Que tienes permisos de administrador en la base de datos
2. Que no hay transacciones activas que puedan interferir
3. Que las tablas mencionadas existen en tu esquema

Para más ayuda, consulta la documentación de Supabase o contacta con el equipo de soporte.
