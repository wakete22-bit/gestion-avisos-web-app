# Módulo de Técnicos

## 📋 Descripción

El módulo de técnicos permite la gestión completa de técnicos en el sistema, incluyendo la creación, visualización, edición y administración de estados.

## ✨ Nuevas Mejoras (2024)

### 🔧 Flujo Mejorado de Creación
- **Roles Dinámicos**: Los roles se cargan automáticamente desde la base de datos
- **Validación Mejorada**: Validaciones tanto en frontend como backend
- **Manejo de Errores Avanzado**: Mensajes de error específicos y descriptivos
- **Rol de Administrador**: Soporte completo para crear usuarios con rol de Administrador
- **Reintentos Inteligentes**: Sistema de reintentos con delay progresivo para mayor fiabilidad

### 🛡️ Roles Soportados
- **Administrador**: Acceso completo al sistema
- **Técnico**: Gestión de avisos, facturas y presupuestos
- **Usuario**: Acceso básico limitado

## 🚀 Configuración Inicial

### 1. Configurar Roles en Base de Datos

Si los roles no existen en tu base de datos, ejecuta este script SQL:

```sql
-- Insertar roles básicos si no existen
INSERT INTO public.roles (id, nombre_rol) VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'Administrador'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Técnico'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Usuario')
ON CONFLICT (nombre_rol) DO NOTHING;
```

### 2. Obtener UUIDs de Roles

Para obtener los UUIDs reales de tu base de datos, ejecuta en la consola del navegador:

```javascript
// En la consola del navegador (F12)
const tecnicosService = angular.element(document.body).injector().get('TecnicosService');
await tecnicosService.mostrarUUIDsRoles();
```

### 3. Verificar Configuración

El sistema ahora carga los roles dinámicamente, pero si hay problemas, verificar:
- Los roles existen en la tabla `roles`
- Supabase RLS está configurado correctamente
- El usuario tiene permisos para leer la tabla `roles`

## 🎯 Funcionalidades

### Crear Técnico
- Formulario con validación completa
- Soporte para todos los roles disponibles
- Validación de email único
- Creación en Supabase Auth + Base de datos
- Manejo robusto de errores

### Gestionar Técnicos
- Vista en tabla responsive
- Filtros y búsqueda
- Activar/Desactivar técnicos
- Paginación

### Estados Visuales
- **Activo**: Usuario activo y operativo
- **Inactivo**: Usuario desactivado
- **Roles**: Códigos de colores por tipo de rol

## 🔍 Debugging

### Logs de Desarrollo
El sistema incluye logs detallados para debugging:
- ✅ Operaciones exitosas
- ❌ Errores con contexto
- 🔧 Pasos del proceso
- ⚠️ Advertencias importantes

### Resolución de Problemas Comunes

1. **"No se pudieron cargar los roles"**
   - Verificar que la tabla `roles` tiene datos
   - Comprobar permisos RLS en Supabase

2. **"Ya existe un usuario con este email"**
   - El email ya está registrado en Supabase Auth
   - Usar email diferente o revisar usuarios existentes

3. **"Rol de Administrador requiere configuración"**
   - Ejecutar el script SQL de configuración de roles
   - Verificar UUIDs con `mostrarUUIDsRoles()`

4. **Timeouts en creación**
   - El sistema incluye reintentos automáticos
   - Verificar conexión a Supabase
   - Revisar logs en consola para detalles

## 📊 Arquitectura

### Componentes
- `TecnicosComponent`: Vista principal con tabla
- `CrearTecnicoModalComponent`: Modal de creación/edición

### Servicios
- `TecnicosService`: Lógica de negocio y comunicación con BD
- `RolesService`: Gestión de permisos y roles
- `AuthService`: Autenticación con Supabase

### Modelos
- `Tecnico`: Modelo principal del técnico
- `CrearTecnicoRequest`: DTO para creación
- `TecnicoResponse`: Respuesta paginada

## 🔐 Seguridad

### Validaciones
- **Frontend**: Validación inmediata de formularios
- **Backend**: Validación antes de insertar en BD
- **Supabase**: RLS para control de acceso

### Permisos
- Solo administradores pueden gestionar técnicos
- Verificación de roles en tiempo real
- Tokens JWT para autenticación

## 📱 Responsive Design

- **Desktop**: Tabla completa con todas las columnas
- **Tablet**: Vista adaptada con columnas esenciales  
- **Mobile**: Vista compacta optimizada

## 🚀 Uso Rápido

1. **Acceder**: Solo administradores ven el enlace "Técnicos"
2. **Crear**: Botón (+) → Llenar formulario → Crear
3. **Gestionar**: Usar filtros, búsqueda y acciones de la tabla
4. **Configurar**: Ejecutar scripts SQL si es primera vez

---

💡 **Consejo**: Para desarrollo, mantén abierta la consola del navegador para ver los logs detallados del proceso de creación. 