# Conexión de Ajustes con Base de Datos

## Resumen de Cambios Realizados

Hemos conectado completamente el módulo de ajustes con la base de datos PostgreSQL a través de Supabase. Aquí están todos los cambios realizados:

## 1. Estructura de Base de Datos ✅

Las siguientes tablas ya existen en la base de datos:

- `configuracion_empresa` - Datos de la empresa
- `configuracion_facturacion` - Parámetros de facturación  
- `configuracion_notificaciones` - Configuración de notificaciones
- `configuracion_avisos` - Configuración del sistema de avisos
- `configuracion_sistema` - Configuraciones avanzadas del sistema

## 2. Mejoras en el Servicio de Ajustes ✅

### Cambios Principales:

1. **Manejo de Tablas Vacías**: Cambiamos de `.single()` a `.limit(1)` para evitar errores cuando las tablas están vacías
2. **Creación Automática**: Si no hay datos, el servicio crea automáticamente configuraciones por defecto
3. **Actualización Inteligente**: Los métodos de actualización verifican si existe configuración antes de actualizar
4. **Mejor Manejo de Errores**: Mejor logging y manejo de errores en todas las operaciones

### Métodos Mejorados:

- `getConfiguracionEmpresa()`
- `getConfiguracionFacturacion()`
- `getConfiguracionNotificaciones()`
- `getConfiguracionAvisos()`
- `getConfiguracionSistema()`
- `actualizarConfiguracionEmpresa()`
- `actualizarConfiguracionFacturacion()`
- `actualizarConfiguracionNotificaciones()`
- `actualizarConfiguracionAvisos()`
- `actualizarConfiguracionSistema()`

## 3. Scripts de Configuración ✅

### Archivo: `insertar-configuraciones-iniciales.sql`

Este script inserta configuraciones por defecto en todas las tablas:

```sql
-- Ejecutar en tu base de datos PostgreSQL
-- Incluye configuraciones por defecto para:
-- - Empresa
-- - Facturación  
-- - Notificaciones
-- - Avisos
-- - Sistema
```

### Archivo: `test-ajustes-connection.js`

Script de prueba para verificar la conexión (opcional).

## 4. Cómo Usar

### Paso 1: Ejecutar Script SQL

```bash
# Conectarse a tu base de datos PostgreSQL
psql -h tu-host -U tu-usuario -d tu-base-de-datos

# Ejecutar el script
\i src/insertar-configuraciones-iniciales.sql
```

### Paso 2: Verificar Conexión

El servicio de ajustes ahora:

1. **Carga automáticamente** las configuraciones al iniciar
2. **Crea configuraciones por defecto** si no existen
3. **Actualiza correctamente** las configuraciones existentes
4. **Maneja errores** de forma robusta

### Paso 3: Probar en la Aplicación

1. Navega a la sección de Ajustes
2. Las configuraciones se cargarán automáticamente
3. Puedes modificar y guardar cualquier configuración
4. Los cambios se persistirán en la base de datos

## 5. Flujo de Datos

```
Componente Ajustes
       ↓
AjustesService
       ↓
SupabaseClientService
       ↓
Base de Datos PostgreSQL
```

### Carga de Datos:
1. Componente llama a `getAjustesCompletos()`
2. Servicio obtiene datos de todas las tablas
3. Si no hay datos, crea configuraciones por defecto
4. Retorna datos al componente

### Guardado de Datos:
1. Componente llama a método de actualización específico
2. Servicio verifica si existe configuración
3. Si existe: actualiza, Si no existe: crea nueva
4. Actualiza el estado local del servicio

## 6. Configuraciones por Defecto

### Empresa:
- Nombre: "Mi Empresa S.L."
- CIF: "B12345678"
- Dirección: "Calle Principal 123, 28001 Madrid"
- Teléfono: "+34 91 123 4567"
- Email: "info@miempresa.com"

### Facturación:
- IVA: 21%
- Moneda: EUR
- Formato: "FAC-{YEAR}-{NUMBER}"
- Días vencimiento: 30

### Notificaciones:
- Email: Activado
- SMS: Desactivado
- Notificaciones por email: Activadas

### Avisos:
- Tipos urgencia: Baja, Media, Alta, Crítica
- Estados: Pendiente, En curso, Completado, Cancelado
- Tiempo respuesta: 24 horas

### Sistema:
- Backup automático: Activado
- Frecuencia: Diario
- Retención: 30 días
- Modo mantenimiento: Desactivado

## 7. Troubleshooting

### Si las configuraciones no se cargan:

1. Verificar conexión a Supabase
2. Ejecutar script SQL de datos iniciales
3. Revisar logs de consola para errores
4. Verificar permisos de usuario en base de datos

### Si hay errores de permisos:

```sql
-- Otorgar permisos necesarios
GRANT ALL ON configuracion_empresa TO tu_usuario;
GRANT ALL ON configuracion_facturacion TO tu_usuario;
GRANT ALL ON configuracion_notificaciones TO tu_usuario;
GRANT ALL ON configuracion_avisos TO tu_usuario;
GRANT ALL ON configuracion_sistema TO tu_usuario;
```

## 8. Próximos Pasos

1. ✅ **Completado**: Conexión básica con base de datos
2. ✅ **Completado**: Manejo de tablas vacías
3. ✅ **Completado**: Creación automática de configuraciones
4. ✅ **Completado**: Scripts de configuración inicial
5. 🔄 **Pendiente**: Pruebas en entorno de producción
6. 🔄 **Pendiente**: Validación de datos en tiempo real
7. 🔄 **Pendiente**: Sincronización entre usuarios

## 9. Archivos Modificados

- `src/app/modules/ajustes/services/ajustes.service.ts` - Servicio principal
- `src/insertar-configuraciones-iniciales.sql` - Script SQL
- `src/test-ajustes-connection.js` - Script de prueba
- `src/CONEXION-AJUSTES-BBDD.md` - Esta documentación

---

**¡La conexión de ajustes con la base de datos está completa y lista para usar!** 🎉
