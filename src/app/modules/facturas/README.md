# Módulo de Facturas - Plantillas PDF

Este módulo incluye un sistema completo de generación de facturas con múltiples plantillas PDF personalizables.

## Características

- **Plantilla Completa**: Diseño profesional con cajas, colores y elementos visuales avanzados
- **Plantilla Simple**: Diseño minimalista y elegante para facturas básicas
- **Configuración centralizada** de datos de la empresa
- **Generación nativa** usando jsPDF para mejor rendimiento
- **Soporte para múltiples tipos** de líneas de factura (repuestos, mano de obra, desplazamientos)

## Plantillas Disponibles

### 1. Plantilla Completa (`generarPdfNativo`)

**Características:**
- Header con logo y número de factura
- Cajas organizadas para datos de empresa y factura
- Tablas separadas para repuestos y servicios
- Caja de totales destacada
- Footer profesional con información de contacto
- Colores corporativos y diseño moderno

**Uso:**
```typescript
this.pdfService.generarPdfNativo(datosFactura, 'factura.pdf');
```

### 2. Plantilla Simple (`generarPlantillaFacturaSimple`)

**Características:**
- Diseño limpio y minimalista
- Header centrado con título grande
- Información organizada en secciones claras
- Tabla única para todos los servicios
- Totales alineados a la derecha
- Footer simple con mensaje de agradecimiento

**Uso:**
```typescript
this.pdfService.generarPlantillaFacturaSimple(datosFactura, 'factura.pdf');
```

## Configuración de la Empresa

Los datos de la empresa se configuran en `src/app/core/config/empresa.config.ts`:

```typescript
export const configuracionEmpresa = {
  nombre: 'TÉCNICOS CLIMATIZACIÓN S.L.',
  direccion: 'Calle de la Tecnología, 123',
  ciudad: '28001 Madrid, España',
  cif: 'B12345678',
  telefono: '+34 91 123 45 67',
  email: 'info@tecnicosclimatizacion.es',
  web: 'www.tecnicosclimatizacion.es',
  // ... más configuraciones
};
```

## Estructura de Datos

La factura debe tener la siguiente estructura:

```typescript
interface DatosFactura {
  numero_factura: string;
  fecha_emision: string;
  nombre_cliente: string;
  direccion_cliente: string;
  cif_cliente: string;
  email_cliente: string;
  cliente_id?: string;
  subtotal: number;
  iva: number;
  total: number;
  estado: string;
  notas?: string;
  lineas: LineaFactura[];
}

interface LineaFactura {
  tipo: 'repuesto' | 'mano_obra' | 'desplazamiento';
  nombre: string;
  cantidad: number;
  precio_neto?: number;
  precio_pvp: number;
}
```

## Uso en el Componente

El componente `ver-factura` incluye un selector para elegir entre plantillas:

```html
<div class="pdf-options">
  <select class="pdf-template-selector" [(ngModel)]="plantillaSeleccionada">
    <option value="completa">Plantilla Completa</option>
    <option value="simple">Plantilla Simple</option>
  </select>
  <button class="btn-primary" (click)="descargarFactura()">
    <ion-icon name="download-outline"></ion-icon>
    Descargar PDF
  </button>
</div>
```

## Personalización

### Cambiar Colores

Los colores se definen en `src/app/core/config/jspdf.config.ts`:

```typescript
export const estilosPDF = {
  colores: {
    primario: [79, 70, 229], // #4F46E5
    secundario: [107, 114, 128], // #6B7280
    exito: [39, 194, 108], // #27C26C
    // ... más colores
  }
};
```

### Agregar Nueva Plantilla

1. Crear un nuevo método en `PdfService`
2. Agregar la opción en el selector del componente
3. Actualizar la lógica de selección

### Modificar Datos de Empresa

Editar `src/app/core/config/empresa.config.ts` y todos los cambios se reflejarán automáticamente en todas las plantillas.

## Dependencias

- **jsPDF**: Generación nativa de PDFs
- **html2canvas**: Conversión de HTML a imagen (para plantillas basadas en HTML)
- **Ionic**: Componentes de interfaz

## Notas de Implementación

- Las plantillas usan coordenadas en milímetros (mm)
- El tamaño de página es A4 (210mm x 297mm)
- Los márgenes están configurados para optimizar el espacio
- Se incluyen funciones helper para dibujar elementos comunes
- El sistema maneja automáticamente el salto de página si es necesario

## Troubleshooting

### Problemas Comunes

1. **PDF no se genera**: Verificar que los datos de factura sean válidos
2. **Texto cortado**: Ajustar posiciones Y en la plantilla
3. **Colores incorrectos**: Verificar que los valores RGB estén en el rango 0-255
4. **Fuentes no disponibles**: jsPDF usa fuentes estándar por defecto

### Debug

Activar logs en la consola del navegador para ver el proceso de generación:

```typescript
console.log('🔧 Generando PDF...');
console.log('📊 Datos de factura:', datosFactura);
```
