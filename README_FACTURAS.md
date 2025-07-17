# Sistema de Facturas - Gestión de Avisos

## Descripción General

El sistema de facturas ha sido completamente adaptado para funcionar con la estructura existente del frontend, manteniendo todos los componentes y funcionalidades actuales. Se ha creado una base de datos robusta que soporta la gestión completa de facturas con líneas detalladas.

## Estructura de la Base de Datos

### Tabla `facturas`
- **id**: UUID (clave primaria)
- **numero_factura**: Texto único (formato: F2025-001)
- **fecha_emision**: Fecha de emisión
- **cliente_id**: Referencia al cliente (opcional)
- **nombre_cliente**: Nombre del cliente
- **direccion_cliente**: Dirección del cliente
- **cif_cliente**: CIF del cliente
- **email_cliente**: Email del cliente
- **aviso_id**: Referencia al aviso (opcional)
- **subtotal**: Subtotal sin IVA
- **iva**: Importe del IVA (21%)
- **total**: Total de la factura
- **estado**: Estado de la factura (Pendiente, En curso, Completado)
- **pdf_url**: URL del PDF generado
- **notas**: Notas adicionales
- **fecha_creacion**: Fecha de creación
- **fecha_actualizacion**: Fecha de última actualización

### Tabla `lineas_factura`
- **id**: UUID (clave primaria)
- **factura_id**: Referencia a la factura
- **tipo**: Tipo de línea (repuesto, mano_obra, desplazamiento)
- **nombre**: Nombre/descripción de la línea
- **cantidad**: Cantidad
- **precio_neto**: Precio neto (solo para repuestos)
- **precio_pvp**: Precio PVP
- **descripcion**: Descripción adicional
- **fecha_creacion**: Fecha de creación

## Componentes del Frontend

### 1. Listado de Facturas (`facturas.component.ts`)
- Muestra todas las facturas en una tabla responsive
- Filtrado por estado
- Búsqueda de facturas
- Navegación a crear nueva factura

### 2. Crear Factura (`crear-factura.component.ts`)
- Formulario completo para crear facturas
- Gestión dinámica de líneas (repuestos, mano de obra, desplazamientos)
- Vista previa en tiempo real
- Cálculo automático de totales
- Validación de formularios

## Servicios Implementados

### `FacturasService`
Métodos principales:
- `getFacturas()`: Obtener todas las facturas
- `getFactura(id)`: Obtener factura por ID
- `crearFactura(facturaCompleta)`: Crear nueva factura
- `actualizarFactura(id, facturaCompleta)`: Actualizar factura
- `eliminarFactura(id)`: Eliminar factura
- `getFacturasPorEstado(estado)`: Filtrar por estado
- `getFacturasPorCliente(clienteId)`: Filtrar por cliente
- `getFacturasPorAviso(avisoId)`: Filtrar por aviso
- `generarPDF(id)`: Generar PDF de factura
- `enviarFactura(id, email)`: Enviar factura por email
- `cambiarEstado(id, estado)`: Cambiar estado de factura
- `getSiguienteNumero()`: Obtener siguiente número de factura
- `calcularTotales(lineas)`: Calcular totales de líneas

## Modelos de Datos

### `Factura`
```typescript
interface Factura {
  id?: string;
  numero_factura: string;
  fecha_emision: string;
  cliente_id?: string;
  nombre_cliente: string;
  direccion_cliente: string;
  cif_cliente: string;
  email_cliente: string;
  aviso_id?: string;
  subtotal: number;
  iva: number;
  total: number;
  estado: 'Pendiente' | 'En curso' | 'Completado';
  pdf_url?: string;
  notas?: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}
```

### `LineaFactura`
```typescript
interface LineaFactura {
  id?: string;
  factura_id?: string;
  tipo: 'repuesto' | 'mano_obra' | 'desplazamiento';
  nombre: string;
  cantidad: number;
  precio_neto?: number;
  precio_pvp: number;
  descripcion?: string;
}
```

### `FacturaCompleta`
```typescript
interface FacturaCompleta {
  factura: Factura;
  lineas: LineaFactura[];
}
```

## Funcionalidades Implementadas

### 1. Creación de Facturas
- Formulario completo con validación
- Gestión dinámica de líneas de factura
- Cálculo automático de totales e IVA
- Vista previa en tiempo real
- Generación automática de números de factura

### 2. Gestión de Líneas
- **Repuestos**: Nombre, cantidad, precio neto, PVP
- **Mano de obra**: Descripción, horas, precio por hora
- **Desplazamientos**: Tipo, cantidad, precio

### 3. Estados de Factura
- **Pendiente**: Factura creada pero no enviada
- **En curso**: Factura enviada, en proceso de pago
- **Completado**: Factura pagada

### 4. Funciones Avanzadas
- Generación de PDF
- Envío por email
- Búsqueda y filtrado
- Paginación
- Responsive design

## Instalación y Configuración

### 1. Ejecutar Migración de Base de Datos
```sql
-- Ejecutar el archivo migracion_facturas.sql
-- Hacer backup antes de ejecutar
```

### 2. Configurar Variables de Entorno
```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api' // URL de tu API
};
```

### 3. Importar Servicios
Los servicios ya están configurados con `providedIn: 'root'`, por lo que están disponibles automáticamente.

## Uso del Sistema

### Crear Nueva Factura
1. Navegar a `/facturas`
2. Hacer clic en "Añadir factura"
3. Completar datos del cliente
4. Añadir líneas de factura (repuestos, mano de obra, desplazamientos)
5. Revisar vista previa
6. Generar o enviar factura

### Gestionar Facturas Existentes
1. Ver listado en `/facturas`
2. Filtrar por estado o buscar
3. Ver detalles de factura
4. Cambiar estado
5. Generar PDF o enviar por email

## Características Técnicas

### Frontend
- **Framework**: Angular 17 (standalone components)
- **UI**: Ionic + Material Design
- **Formularios**: Reactive Forms
- **Estado**: Servicios con observables
- **Responsive**: Mobile-first design

### Backend (Base de Datos)
- **SGBD**: PostgreSQL
- **UUIDs**: Para identificadores únicos
- **Índices**: Optimizados para consultas frecuentes
- **Triggers**: Actualización automática de fechas
- **Funciones**: Generación automática de números

### Seguridad
- Validación de formularios
- Sanitización de datos
- Control de acceso por roles
- Logs de auditoría

## Archivos Principales

### Modelos
- `src/app/modules/facturas/models/factura.model.ts`

### Servicios
- `src/app/modules/facturas/services/facturas.service.ts`

### Componentes
- `src/app/modules/facturas/pages/facturas/facturas.component.ts`
- `src/app/modules/facturas/components/crear-factura/crear-factura.component.ts`

### Base de Datos
- `migracion_facturas.sql`

## Próximas Mejoras

1. **Generación de PDF**: Integración con librerías como jsPDF
2. **Envío por Email**: Integración con servicios de email
3. **Firma Digital**: Implementación de firma electrónica
4. **Plantillas**: Sistema de plantillas personalizables
5. **Reportes**: Generación de reportes y estadísticas
6. **Integración con Contabilidad**: Exportación a sistemas contables

## Soporte

Para cualquier consulta o problema con el sistema de facturas, contactar al equipo de desarrollo. 