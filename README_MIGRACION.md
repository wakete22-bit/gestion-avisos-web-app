# 🔄 Migración de Base de Datos - Gestión de Avisos

## 📋 Resumen del Problema

La aplicación está experimentando errores debido a relaciones incorrectas entre tablas en la base de datos. El error principal es:

```
Could not find a relationship between 'avisos' and 'trabajos_realizados' in the schema cache
```

## 🎯 Objetivo de la Migración

Corregir las relaciones entre tablas para que la aplicación funcione correctamente con el nuevo esquema de base de datos.

## 📁 Archivos de Migración

### 1. `ajustes_tables.sql`
Script SQL principal que corrige las relaciones entre tablas.

### 2. `migrar-bbdd.ps1`
Script de PowerShell que prepara y guía la migración.

### 3. `src/bbdd-new.sql`
Esquema completo y corregido de la base de datos.

## 🚀 Pasos para la Migración

### Paso 1: Preparar la Migración
```powershell
# Ejecutar el script de PowerShell
.\migrar-bbdd.ps1
```

### Paso 2: Ejecutar en Supabase

1. **Acceder al Panel de Supabase**
   - Ve a [supabase.com](https://supabase.com)
   - Inicia sesión en tu cuenta
   - Selecciona tu proyecto

2. **Navegar al SQL Editor**
   - En el menú lateral, haz clic en "SQL Editor"
   - Haz clic en "New query"

3. **Ejecutar el Script de Migración**
   - Copia el contenido del archivo `ajustes_tables.sql`
   - Pégalo en el editor SQL
   - Haz clic en "Run" para ejecutar

### Paso 3: Verificar la Migración

Después de ejecutar el script, verifica que:

1. **No hay errores** en la consola SQL
2. **Las relaciones se crearon correctamente**
3. **La aplicación funciona** sin errores de base de datos

## 🔧 Estructura de Relaciones Corregida

### Antes (Problemático)
```
avisos ←→ trabajos_realizados (relación faltante)
```

### Después (Corregido)
```
avisos ←→ trabajos_realizados (relación establecida)
trabajos_realizados ←→ albaranes (relación establecida)
albaranes ←→ presupuestos (relación establecida)
avisos ←→ facturas (relación establecida)
```

## 📊 Tablas Principales

| Tabla | Descripción | Relaciones |
|-------|-------------|------------|
| `avisos` | Avisos de clientes | `clientes`, `usuarios`, `trabajos_realizados` |
| `trabajos_realizados` | Trabajos técnicos | `avisos`, `albaranes`, `materiales_trabajo` |
| `albaranes` | Albaranes de trabajo | `trabajos_realizados`, `avisos`, `presupuestos` |
| `presupuestos` | Presupuestos para clientes | `albaranes`, `avisos` |
| `facturas` | Facturas generadas | `avisos`, `clientes` |

## ⚠️ Consideraciones Importantes

### 1. **Respaldo de Datos**
- **SIEMPRE** haz un respaldo antes de ejecutar la migración
- Usa el comando: `pg_dump --schema-only > respaldo_esquema.sql`

### 2. **Orden de Ejecución**
- El script está diseñado para ejecutarse en el orden correcto
- No modifiques el orden de las operaciones

### 3. **Dependencias**
- Algunas tablas dependen de otras
- El script maneja las dependencias automáticamente

### 4. **Datos Existentes**
- El script preserva los datos existentes
- Solo corrige la estructura de relaciones

## 🔍 Verificación Post-Migración

### 1. **Verificar Relaciones**
```sql
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public';
```

### 2. **Verificar Datos**
```sql
SELECT 
    'avisos' as tabla, COUNT(*) as registros FROM public.avisos
UNION ALL
SELECT 
    'trabajos_realizados' as tabla, COUNT(*) as registros FROM public.trabajos_realizados
UNION ALL
SELECT 
    'albaranes' as tabla, COUNT(*) as registros FROM public.albaranes;
```

### 3. **Probar la Aplicación**
- Navega a la página de avisos
- Verifica que no hay errores en la consola del navegador
- Confirma que los datos se cargan correctamente

## 🚨 Solución de Problemas

### Error: "Table already exists"
- El script usa `IF NOT EXISTS` para evitar este error
- Si persiste, verifica que no hay conflictos de nombres

### Error: "Constraint already exists"
- El script elimina constraints existentes antes de recrearlos
- Si persiste, ejecuta manualmente los comandos DROP

### Error: "Permission denied"
- Verifica que tu usuario tiene permisos de DDL
- Contacta al administrador de la base de datos

### Error: "Connection failed"
- Verifica tu conexión a Supabase
- Confirma que las credenciales son correctas

## 📞 Soporte

Si encuentras problemas durante la migración:

1. **Revisa los logs** de Supabase
2. **Verifica la consola** del navegador
3. **Consulta la documentación** de PostgreSQL
4. **Contacta al equipo** de desarrollo

## ✅ Checklist de Migración

- [ ] Respaldo de base de datos creado
- [ ] Script de migración ejecutado
- [ ] No hay errores en la consola SQL
- [ ] Relaciones verificadas correctamente
- [ ] Aplicación funciona sin errores
- [ ] Datos se cargan correctamente
- [ ] Funcionalidades principales probadas

## 🎉 Migración Completada

Una vez que hayas completado todos los pasos y verificaciones, tu aplicación debería funcionar correctamente con la nueva estructura de base de datos.

¡La migración ha sido exitosa! 🚀
