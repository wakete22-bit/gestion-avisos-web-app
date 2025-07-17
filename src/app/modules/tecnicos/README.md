# Módulo de Técnicos

## Descripción

El módulo de técnicos permite a los administradores gestionar los técnicos y usuarios del sistema. Solo los usuarios con rol de administrador pueden acceder a esta funcionalidad.

## Características

- **Gestión completa de técnicos**: Crear, editar, eliminar y desactivar técnicos
- **Filtrado por rol**: Filtrar técnicos por tipo de rol (Técnico, Usuario)
- **Búsqueda**: Buscar técnicos por nombre, email o teléfono
- **Vista responsive**: Tabla y vista de tarjetas adaptadas a móvil y desktop
- **Control de acceso**: Solo administradores pueden acceder

## Estructura de Archivos

```
src/app/modules/tecnicos/
├── components/
│   └── crear-tecnico-modal/
│       ├── crear-tecnico-modal.component.ts
│       ├── crear-tecnico-modal.component.html
│       └── crear-tecnico-modal.component.scss
├── pages/
│   └── tecnicos/
│       ├── tecnicos.component.ts
│       ├── tecnicos.component.html
│       └── tecnicos.component.scss
└── index.ts
```

## Componentes

### TecnicosComponent

Componente principal que muestra la lista de técnicos con funcionalidades de:
- Listado de técnicos en tabla o tarjetas
- Búsqueda y filtrado
- Acciones de editar y eliminar
- Estados de carga y error

### CrearTecnicoModalComponent

Modal para crear nuevos técnicos con:
- Formulario de registro
- Validación de campos
- Selección de rol
- Integración con Supabase Auth

## Servicios

### TecnicosService

Servicio que maneja todas las operaciones CRUD:
- `getTecnicos()`: Obtener lista de técnicos
- `crearTecnico()`: Crear nuevo técnico
- `actualizarTecnico()`: Actualizar técnico existente
- `desactivarTecnico()`: Desactivar técnico
- `eliminarTecnico()`: Eliminar técnico permanentemente
- `buscarTecnicos()`: Buscar técnicos por término
- `filtrarTecnicosPorRol()`: Filtrar por rol específico

## Rutas

- **Ruta**: `/tecnicos`
- **Componente**: `TecnicosComponent`
- **Acceso**: Solo administradores

## Integración con el Sistema

### Sidebar
El enlace a técnicos se muestra automáticamente en el sidebar solo para usuarios administradores.

### Autenticación
Los técnicos creados se registran tanto en Supabase Auth como en la tabla `usuarios` de la base de datos.

### Roles
Los técnicos pueden tener los siguientes roles:
- **Técnico**: Acceso completo a avisos, facturas y presupuestos
- **Usuario**: Acceso básico limitado

## Estilos

El módulo utiliza los estilos consistentes de la plataforma:
- Colores corporativos (#4F46E5, #111827, etc.)
- Diseño responsive
- Estados visuales (activo/inactivo)
- Iconografía de Ionic

## Uso

1. **Acceder**: Solo administradores pueden ver el enlace "Técnicos" en el sidebar
2. **Ver técnicos**: La página muestra todos los técnicos en una tabla o vista de tarjetas
3. **Crear técnico**: Usar el botón flotante (+) para abrir el modal de creación
4. **Editar/Eliminar**: Usar los botones de acción en cada fila de técnico
5. **Filtrar**: Usar los controles de búsqueda y filtro en la parte superior

## Dependencias

- Angular Core
- Ionic Framework
- Supabase Client
- RxJS
- Modelos de usuario y roles 