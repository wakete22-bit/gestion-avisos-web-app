# Funcionalidad de PDF para Facturas

## Descripción
Se ha implementado un sistema completo para generar e imprimir facturas en formato PDF utilizando las librerías **jsPDF** y **html2canvas**.

## Librerías Instaladas
- `jspdf`: Para generar archivos PDF
- `html2canvas`: Para capturar elementos HTML y convertirlos a imágenes
- `@types/jspdf`: Tipos de TypeScript para jsPDF

## Servicios Implementados

### PdfService (`src/app/core/services/pdf.service.ts`)
Servicio principal que maneja todas las operaciones relacionadas con PDF:

#### Métodos Disponibles:

1. **`generarPdfFactura(elementoHtml, nombreArchivo)`**
   - Genera PDF a partir de un elemento HTML
   - Usa escala 2x para mejor calidad
   - Formato PNG para máxima calidad

2. **`generarPdfFacturaOptimizado(elementoHtml, nombreArchivo)`**
   - Versión optimizada para facturas
   - Usa escala 1.5x para balance calidad/tamaño
   - Formato JPEG para mejor compresión
   - Márgenes optimizados

3. **`imprimirFactura(elementoHtml)`**
   - Abre ventana de impresión del navegador
   - Aplica estilos específicos para impresión
   - Oculta elementos innecesarios

4. **`generarPdfDesdeDatos(datosFactura, nombreArchivo)`**
   - Genera PDF desde datos estructurados
   - No requiere elemento HTML
   - Formato personalizado con estilos

## Configuración

### Estilos PDF (`src/app/core/config/jspdf.config.ts`)
Configuración centralizada para estilos de PDF:
- Colores corporativos
- Tamaños de fuente
- Márgenes estándar
- Funciones helper

## Uso en Componentes

### En CrearFacturaComponent
```typescript
// Inyectar el servicio
constructor(
  private pdfService: PdfService
) {}

// Descargar factura como PDF
async descargarFactura() {
  const elementoPreview = document.querySelector('.factura-preview') as HTMLElement;
  const nombreArchivo = `factura_${numeroFactura}.pdf`;
  await this.pdfService.generarPdfFacturaOptimizado(elementoPreview, nombreArchivo);
}

// Imprimir factura
async imprimirFactura() {
  const elementoPreview = document.querySelector('.factura-preview') as HTMLElement;
  await this.pdfService.imprimirFactura(elementoPreview);
}

// Generar PDF desde datos
generarPdfDesdeDatos() {
  const datosFactura = this.prepararDatosFactura();
  this.pdfService.generarPdfDesdeDatos(datosFactura, nombreArchivo);
}
```

## Botones Implementados

### En Vista Previa
- **Descargar**: Genera PDF optimizado desde la vista previa
- **Imprimir**: Abre ventana de impresión del navegador

### En Formulario
- **PDF desde Datos**: Genera PDF usando datos estructurados (método alternativo)

## Características Técnicas

### Generación desde HTML
- Captura exacta de la vista previa
- Mantiene estilos CSS
- Soporte para múltiples páginas
- Calidad configurable

### Generación desde Datos
- Formato personalizado
- Estilos corporativos
- Información estructurada
- Más rápido y ligero

### Impresión
- Estilos optimizados para impresión
- Oculta elementos de UI
- Ventana de impresión nativa del navegador

## Consideraciones

### Rendimiento
- `html2canvas` puede ser lento en elementos complejos
- Usar `generarPdfDesdeDatos` para mejor rendimiento
- Considerar lazy loading para elementos grandes

### Compatibilidad
- Funciona en navegadores modernos
- Requiere soporte para Canvas API
- Algunas fuentes personalizadas pueden no renderizarse

### Tamaño de Archivo
- PDFs desde HTML: Tamaño variable según complejidad
- PDFs desde datos: Tamaño fijo y pequeño
- Usar compresión JPEG para optimizar

## Próximas Mejoras

1. **Plantillas Personalizables**: Permitir diferentes diseños de factura
2. **Fuentes Personalizadas**: Soporte para fuentes corporativas
3. **Watermarks**: Marcas de agua en PDFs
4. **Firma Digital**: Integración con certificados digitales
5. **Almacenamiento**: Guardar PDFs en Supabase Storage
6. **Email**: Envío automático de facturas por email

## Troubleshooting

### Problemas Comunes

1. **Elemento no encontrado**
   - Verificar que el selector CSS sea correcto
   - Asegurar que el elemento esté visible

2. **Calidad baja**
   - Aumentar escala en html2canvas
   - Usar formato PNG en lugar de JPEG

3. **Tamaño de archivo grande**
   - Reducir escala
   - Usar formato JPEG con compresión
   - Optimizar imágenes

4. **Errores de CORS**
   - Verificar configuración de `useCORS` y `allowTaint`
   - Usar imágenes locales cuando sea posible 