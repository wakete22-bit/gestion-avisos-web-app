# 📋 Documentación Completa - Sistema de Gestión de Avisos

## 🎯 Descripción General

Esta aplicación es un **Sistema Integral de Gestión de Avisos** desarrollado con **Ionic/Angular** y **Supabase** como backend. Permite a empresas de servicios técnicos gestionar completamente su operativa diaria, desde la recepción de avisos hasta la facturación final.

---

## 🏗️ Arquitectura del Sistema

### Tecnologías Utilizadas
- **Frontend**: Ionic/Angular 19
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **UI Framework**: Angular Material + Ionic Components
- **Mapas**: MapLibre GL
- **PDF**: jsPDF + html2canvas
- **Geolocalización**: Servicios de geocodificación

### Estructura de Módulos
```
src/app/modules/
├── auth/           # Autenticación y registro
├── avisos/         # Gestión de avisos
├── clientes/       # Gestión de clientes
├── facturas/       # Sistema de facturación
├── presupuestos/   # Gestión de presupuestos
├── inventario/     # Control de inventario
├── tecnicos/       # Gestión de técnicos
├── historial/      # Historial de actividades
├── mi-cuenta/      # Perfil de usuario
└── ajustes/        # Configuración del sistema
```

---

## 🔐 Sistema de Autenticación y Roles

### Roles Disponibles
1. **Administrador**: Acceso completo al sistema
2. **Técnico**: Gestión de avisos, facturas y presupuestos
3. **Usuario**: Acceso básico limitado

### Flujo de Autenticación
1. **Acceso inicial**: `/auth/login`
2. **Registro**: `/auth/register` (solo para nuevos usuarios)
3. **Validación**: Supabase Auth + RLS (Row Level Security)
4. **Redirección**: Dashboard principal según rol

---

## 🏠 Dashboard Principal (`/home`)

### Funcionalidades del Dashboard
- **Resumen estadístico**: Avisos pendientes, facturas, presupuestos
- **Avisos urgentes**: Lista de avisos prioritarios
- **Accesos rápidos**: Navegación directa a módulos principales
- **Gráficos y métricas**: Visualización de datos en tiempo real

### Métricas Mostradas
- Total de avisos por estado
- Facturas pendientes de pago
- Presupuestos en revisión
- Ingresos del mes actual

---

## 📢 Módulo de Avisos (`/avisos`)

### Funcionalidades Principales

#### 1. **Gestión de Avisos**
- **Crear aviso**: Modal con formulario completo
- **Listar avisos**: Tabla responsive con filtros
- **Vista mapa**: Visualización geográfica de avisos
- **Estados**: Pendiente → En curso → Completado → Cancelado

#### 2. **Campos del Aviso**
- **Información básica**: Número, cliente, descripción
- **Ubicación**: Dirección + coordenadas GPS
- **Urgencia**: Baja, Media, Alta, Crítica
- **Asignación**: Técnico responsable
- **Fotos**: Documentación visual del problema

#### 3. **Flujo de Trabajo**
```
Nuevo Aviso → Asignación → Visita → Trabajo → Completado
     ↓              ↓         ↓        ↓         ↓
  Pendiente    En Curso   En Curso  En Curso  Completado
```

#### 4. **Vista Mapa**
- **Mapa interactivo**: MapLibre GL
- **Marcadores**: Ubicación de avisos
- **Filtros**: Por estado, urgencia, técnico
- **Pantalla completa**: Modo expandido para móviles

---

## 👥 Módulo de Clientes (`/clientes`)

### Gestión de Clientes
- **Crear cliente**: Datos completos del cliente
- **Editar información**: Actualización de datos
- **Historial**: Avisos y facturas del cliente
- **Nivel de urgencia**: Configuración por cliente

### Datos del Cliente
- Nombre completo
- Dirección
- Teléfono de contacto
- Email
- Nivel de urgencia habitual
- Estado activo/inactivo

---

## 🛠️ Módulo de Técnicos (`/tecnicos`)

### Gestión de Técnicos (Solo Administradores)
- **Crear técnico**: Registro con rol específico
- **Asignar roles**: Administrador, Técnico, Usuario
- **Activar/Desactivar**: Control de acceso
- **Permisos**: Según rol asignado

### Roles y Permisos
- **Administrador**: Acceso completo
- **Técnico**: Gestión de avisos y facturas
- **Usuario**: Acceso básico limitado

---

## 📄 Módulo de Facturas (`/facturas`)

### Sistema de Facturación Completo

#### 1. **Crear Factura**
- **Datos del cliente**: Automático desde aviso
- **Líneas de factura**: Repuestos, mano de obra, desplazamiento
- **Cálculos automáticos**: Subtotal, IVA, Total
- **Vista previa**: Antes de generar

#### 2. **Tipos de Líneas**
- **Repuestos**: Materiales utilizados
- **Mano de obra**: Horas de trabajo
- **Desplazamiento**: Costes de desplazamiento

#### 3. **Estados de Factura**
- **Pendiente**: Recién creada
- **En curso**: En proceso de pago
- **Completado**: Pagada

#### 4. **Funcionalidades Avanzadas**
- **Generar PDF**: Documento profesional
- **Enviar por email**: Notificación automática
- **Numeración automática**: Formato configurable
- **Historial**: Seguimiento de pagos

---

## 💰 Módulo de Presupuestos (`/presupuestos`)

### Gestión de Presupuestos

#### 1. **Crear Presupuesto**
- **Cliente**: Selección automática
- **Descripción**: Detalle del trabajo
- **Materiales**: Lista de materiales necesarios
- **Mano de obra**: Estimación de horas
- **Total**: Cálculo automático

#### 2. **Estados del Presupuesto**
- **Borrador**: En elaboración
- **Enviado**: Enviado al cliente
- **Aceptado**: Cliente acepta
- **Rechazado**: Cliente rechaza
- **Convertido**: Convertido a factura

#### 3. **Funcionalidades**
- **Vista previa**: Antes de enviar
- **PDF**: Documento profesional
- **Conversión**: A factura automática
- **Seguimiento**: Estado de aceptación

---

## 📦 Módulo de Inventario (`/inventario`)

### Control de Inventario
- **Productos**: Lista de materiales disponibles
- **Stock**: Cantidad disponible
- **Precios**: Precio de compra y venta
- **Categorías**: Organización por tipo
- **Alertas**: Stock mínimo

### Funcionalidades
- **Añadir producto**: Nuevos materiales
- **Actualizar stock**: Movimientos de inventario
- **Búsqueda**: Filtros por categoría
- **Reportes**: Consumo y valoración

---

## 📊 Módulo de Historial (`/historial`)

### Seguimiento de Actividades
- **Avisos completados**: Historial de trabajos
- **Facturas emitidas**: Registro de facturación
- **Presupuestos**: Estado de presupuestos
- **Filtros**: Por fecha, técnico, cliente

---

## ⚙️ Módulo de Ajustes (`/ajustes`)

### Configuración del Sistema
- **Empresa**: Datos de la empresa
- **Facturación**: Configuración de IVA, moneda
- **Notificaciones**: Configuración de emails/SMS
- **Sistema**: Backup, mantenimiento

---

## 👤 Módulo Mi Cuenta (`/cuenta`)

### Perfil de Usuario
- **Datos personales**: Información del usuario
- **Cambiar contraseña**: Seguridad
- **Preferencias**: Configuración personal
- **Sesión**: Cerrar sesión

---

## 📱 Experiencia de Usuario

### Diseño Responsive
- **Desktop**: Vista completa con sidebar
- **Tablet**: Adaptación de columnas
- **Mobile**: Navegación optimizada

### Navegación
- **Sidebar**: Menú principal
- **Header móvil**: Botón hamburguesa
- **Breadcrumbs**: Navegación contextual

---

## 🔄 Flujo Completo de Trabajo

### 1. **Recepción de Aviso**
```
Cliente contacta → Crear aviso → Asignar técnico → Notificar
```

### 2. **Gestión del Aviso**
```
Técnico visita → Evaluar problema → Crear presupuesto → Cliente decide
```

### 3. **Ejecución del Trabajo**
```
Cliente acepta → Ejecutar trabajo → Actualizar estado → Completar aviso
```

### 4. **Facturación**
```
Trabajo completado → Crear factura → Generar PDF → Enviar al cliente
```

### 5. **Seguimiento**
```
Cliente paga → Actualizar estado → Registrar en historial → Cerrar caso
```

---

## 🛡️ Seguridad y Permisos

### Autenticación
- **Supabase Auth**: JWT tokens
- **Sesiones seguras**: Timeout automático
- **Contraseñas**: Encriptación fuerte

### Autorización
- **RLS (Row Level Security)**: Control a nivel de base de datos
- **Roles**: Permisos granulares
- **Validación**: Frontend y backend

---

## 📈 Reportes y Analytics

### Dashboard
- **Métricas en tiempo real**: Avisos, facturas, ingresos
- **Gráficos**: Visualización de datos
- **Filtros**: Por período, técnico, cliente

### Exportación
- **PDF**: Facturas y presupuestos
- **Datos**: Exportación de reportes
- **Backup**: Respaldo automático

---

## 🔧 Configuración Inicial

### Requisitos
1. **Supabase**: Proyecto configurado
2. **Base de datos**: Scripts SQL ejecutados
3. **Variables de entorno**: Configuración de API keys
4. **Roles**: Configuración inicial de usuarios

### Instalación
```bash
npm install
npm start
```

---

## 📞 Soporte y Mantenimiento

### Logs del Sistema
- **Consola del navegador**: Logs detallados
- **Supabase**: Logs de base de datos
- **Errores**: Captura automática

### Resolución de Problemas
1. **Verificar conexión**: Supabase
2. **Revisar permisos**: Roles y RLS
3. **Comprobar datos**: Base de datos
4. **Logs**: Análisis de errores

---

## 🚀 Mejoras Futuras

### Funcionalidades Planificadas
- **App móvil nativa**: iOS/Android
- **Notificaciones push**: Tiempo real
- **Integración GPS**: Seguimiento de técnicos
- **API externa**: Conexión con otros sistemas
- **Analytics avanzado**: Machine Learning

---

## 📋 Checklist de Uso

### Para Administradores
- [ ] Configurar roles de usuarios
- [ ] Establecer parámetros de facturación
- [ ] Configurar datos de empresa
- [ ] Crear técnicos iniciales

### Para Técnicos
- [ ] Revisar avisos asignados
- [ ] Actualizar estados de trabajo
- [ ] Crear presupuestos cuando sea necesario
- [ ] Generar facturas al completar

### Para Usuarios Básicos
- [ ] Crear avisos
- [ ] Revisar historial
- [ ] Gestionar perfil

---

## 📞 Contacto y Soporte

Para soporte técnico o consultas sobre el sistema, contactar con el equipo de desarrollo.

---

*Documentación actualizada: Enero 2025*
*Versión del sistema: 1.0.0* 