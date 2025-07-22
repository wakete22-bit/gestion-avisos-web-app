# Módulo de Ajustes - Gestión de Avisos

## Descripción

El módulo de ajustes proporciona una interfaz completa para gestionar todas las configuraciones del sistema desde un solo lugar. Permite a los administradores personalizar el comportamiento de la aplicación según las necesidades específicas de su empresa.

## Características

### 🔧 Configuración de Empresa
- **Datos básicos**: Nombre, CIF, dirección, teléfono, email
- **Información web**: Sitio web y URL del logo
- **Validación**: Campos obligatorios con validación de formato
- **Uso**: Aparece en facturas y documentos generados

### 💳 Configuración de Facturación
- **IVA por defecto**: Porcentaje de IVA aplicado automáticamente
- **Moneda**: Selección de moneda (EUR, USD, GBP)
- **Formato de factura**: Personalización del formato de numeración
- **Vencimiento**: Días de vencimiento por defecto
- **Textos personalizados**: Pie de factura y condiciones de pago

### 📧 Configuración de Notificaciones
- **Email**: Configuración de notificaciones por correo electrónico
  - Notificaciones generales
  - Nuevos avisos
  - Facturas generadas
  - Recordatorios
- **SMS**: Configuración de notificaciones por SMS
  - Notificaciones generales
  - Avisos urgentes

### ⚠️ Configuración de Avisos
- **Tipos de urgencia**: Personalización de niveles de urgencia
- **Estados disponibles**: Configuración de estados del sistema
- **Tiempo de respuesta**: Tiempo máximo de respuesta en horas
- **Asignación automática**: Activación/desactivación de asignación automática

### ⚙️ Configuración del Sistema
- **Backup automático**: Configuración de copias de seguridad
  - Frecuencia (diario, semanal, mensual)
  - Retención de backups en días
- **Modo mantenimiento**: Activación de modo mantenimiento
  - Mensaje personalizado para usuarios

## Estructura del Módulo

```
src/app/modules/ajustes/
├── models/
│   └── ajustes.model.ts          # Interfaces y tipos
├── services/
│   └── ajustes.service.ts        # Lógica de negocio
├── pages/
│   └── ajustes/
│       ├── ajustes.component.ts  # Componente principal
│       ├── ajustes.component.html
│       └── ajustes.component.scss
└── README.md                     # Esta documentación
```

## Base de Datos

### Tablas Creadas

1. **`configuracion_empresa`**: Datos de la empresa
2. **`configuracion_facturacion`**: Parámetros de facturación
3. **`configuracion_notificaciones`**: Configuración de notificaciones
4. **`configuracion_avisos`**: Configuración del sistema de avisos
5. **`configuracion_sistema`**: Configuraciones avanzadas

### Archivo SQL
Ejecutar `ajustes_tables.sql` en tu base de datos PostgreSQL para crear las tablas necesarias.

## Uso

### Navegación
1. Acceder a la aplicación
2. Hacer clic en "Ajustes" en el menú lateral
3. Seleccionar la pestaña correspondiente
4. Modificar las configuraciones
5. Guardar cambios

### Permisos
- **Administradores**: Acceso completo a todas las configuraciones
- **Técnicos**: Acceso limitado (según permisos específicos)
- **Usuarios**: Sin acceso a ajustes del sistema

## Validaciones

### Empresa
- Nombre: Requerido, mínimo 2 caracteres
- CIF: Requerido, mínimo 9 caracteres
- Dirección: Requerida, mínimo 10 caracteres
- Teléfono: Requerido, formato válido
- Email: Requerido, formato válido
- Web: Opcional, debe comenzar con http:// o https://

### Facturación
- IVA: Entre 0 y 100%
- Formato factura: Requerido
- Días vencimiento: Entre 1 y 365 días

### Avisos
- Tipos urgencia: Requerido
- Estados disponibles: Requerido
- Tiempo respuesta: Entre 1 y 168 horas

### Sistema
- Retención backup: Entre 1 y 365 días

## Integración

### Servicios Utilizados
- **AjustesService**: Servicio principal del módulo
- **Supabase**: Cliente de base de datos
- **RxJS**: Manejo de observables y estados

### Componentes Relacionados
- **MainLayoutComponent**: Layout principal
- **SidebarComponent**: Navegación lateral
- **Toast**: Notificaciones de éxito/error

## Estilos

### Diseño Responsive
- **Desktop**: Layout de pestañas con formularios en grid
- **Tablet**: Adaptación de pestañas y formularios
- **Móvil**: Pestañas apiladas, formularios de ancho completo

### Tema
- Colores corporativos (#4F46E5)
- Diseño moderno y limpio
- Iconografía consistente
- Animaciones suaves

## Funcionalidades Avanzadas

### Auto-guardado
- Validación en tiempo real
- Mensajes de error contextuales
- Estados de carga durante guardado

### Configuración por Defecto
- Valores predefinidos para nueva instalación
- Configuraciones sensatas para empresas españolas
- Fácil personalización

### Persistencia
- Guardado automático en base de datos
- Actualización en tiempo real
- Manejo de errores robusto

## Mantenimiento

### Actualizaciones
1. Modificar modelos en `ajustes.model.ts`
2. Actualizar servicio en `ajustes.service.ts`
3. Modificar componente y template
4. Actualizar estilos si es necesario
5. Ejecutar migraciones de base de datos

### Debugging
- Logs detallados en consola
- Estados de error visibles
- Validaciones de formulario
- Mensajes de usuario informativos

## Consideraciones de Seguridad

- Validación de entrada en frontend y backend
- Sanitización de datos
- Control de acceso por roles
- Logs de auditoría para cambios críticos
- Protección contra inyección SQL

## Rendimiento

- Lazy loading del módulo
- Optimización de consultas a base de datos
- Caché de configuraciones
- Debounce en formularios
- Índices en base de datos

## Próximas Mejoras

- [ ] Configuración de temas visuales
- [ ] Exportación/importación de configuraciones
- [ ] Historial de cambios
- [ ] Configuraciones por usuario
- [ ] Integración con servicios externos (email, SMS)
- [ ] Configuración de idiomas
- [ ] Configuración de zonas horarias 