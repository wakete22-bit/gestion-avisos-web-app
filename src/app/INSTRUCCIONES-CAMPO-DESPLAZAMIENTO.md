# 🔧 Instrucciones para Añadir Campo de Desplazamientos

## 📋 Problema Identificado
El campo `horas_desplazamiento` no existe en la tabla `presupuestos` de la base de datos, por lo que los datos se pierden al recargar la página.

## ✅ Solución Implementada

### 1. **Código Corregido**
- ✅ Servicio actualizado para incluir `horas_desplazamiento` en creación y actualización
- ✅ Interfaces actualizadas con el campo
- ✅ Componente corregido para manejar el campo

### 2. **Script SQL Creado**
Se ha creado el archivo `add-horas-desplazamiento-presupuestos.sql` con el siguiente contenido:

```sql
ALTER TABLE public.presupuestos 
ADD COLUMN horas_desplazamiento numeric DEFAULT 0;

COMMENT ON COLUMN public.presupuestos.horas_desplazamiento IS 'Horas de desplazamiento y traslados para el presupuesto';

UPDATE public.presupuestos 
SET horas_desplazamiento = 0 
WHERE horas_desplazamiento IS NULL;
```

## 🚀 Pasos para Aplicar la Solución

### **Paso 1: Ejecutar Script SQL**
1. Conectarse a la base de datos PostgreSQL
2. Ejecutar el contenido del archivo `add-horas-desplazamiento-presupuestos.sql`
3. Verificar que el campo se añadió correctamente

### **Paso 2: Verificar en Supabase**
1. Ir al dashboard de Supabase
2. Navegar a Table Editor > presupuestos
3. Verificar que existe la columna `horas_desplazamiento`

### **Paso 3: Probar la Funcionalidad**
1. Crear un nuevo presupuesto con horas de desplazamiento
2. Guardar el presupuesto
3. Recargar la página
4. Verificar que los datos se mantienen

## 🔍 Verificación

### **Consulta de Verificación:**
```sql
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'presupuestos' 
AND table_schema = 'public'
AND column_name = 'horas_desplazamiento';
```

### **Resultado Esperado:**
```
column_name        | data_type | is_nullable | column_default
-------------------|-----------|-------------|---------------
horas_desplazamiento | numeric   | YES         | 0
```

## 📊 Estructura Final de la Tabla

```sql
CREATE TABLE public.presupuestos (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  albaran_id uuid NOT NULL,
  aviso_id uuid NOT NULL,
  fecha_creacion timestamp with time zone DEFAULT now(),
  horas_estimadas numeric DEFAULT 0,
  horas_desplazamiento numeric DEFAULT 0,  -- ← NUEVO CAMPO
  total_estimado numeric DEFAULT 0,
  materiales_estimados jsonb DEFAULT '[]'::jsonb,
  estado text NOT NULL DEFAULT 'Pendiente'::text,
  pdf_url text,
  fecha_actualizacion timestamp with time zone DEFAULT now(),
  -- ... constraints
);
```

## ⚠️ Importante
- **Hacer backup** de la base de datos antes de ejecutar el script
- **Verificar** que no hay datos en la tabla antes de añadir el campo (para evitar problemas)
- **Probar** en un entorno de desarrollo antes de aplicar en producción

## 🎯 Resultado Final
Después de aplicar estos cambios:
- ✅ Los presupuestos guardarán correctamente las horas de desplazamiento
- ✅ Los datos se mantendrán al recargar la página
- ✅ La funcionalidad de desplazamientos funcionará completamente
