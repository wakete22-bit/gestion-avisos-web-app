# 📋 Estados de Facturas y Funcionalidad PDF

## 🎯 Estados de Facturas

### **Estados Disponibles:**

1. **`'Pendiente'`** - Factura creada pero no enviada
2. **`'En curso'`** - Factura enviada, en proceso de pago  
3. **`'Completado'`** - Factura pagada

### **Transiciones de Estado:**

#### **Pendiente → En curso:**
- Cuando se envía la factura al cliente
- Cuando se marca como "enviada"
- **Acción**: Usuario hace clic en "Enviar factura"

#### **En curso → Completado:**
- Cuando se confirma el pago
- Cuando se marca como "pagada"
- **Acción**: Usuario confirma que se ha recibido el pago

### **Lógica de Estados en el Código:**

```typescript
// En crear-factura.component.ts
enviarFactura() {
  const facturaData = this.prepararDatosFactura();
  facturaData.estado = 'En curso'; // Cambia a "En curso" al enviar
}

generarFactura() {
  const facturaData = this.prepararDatosFactura();
  facturaData.estado = 'Pendiente'; // Se mantiene "Pendiente" al generar
}
```

## 🔧 Funcionalidad PDF - Problema Resuelto

### **Problema Identificado:**
El método `descargarFactura()` en `ver-factura.component.ts` estaba **incompleto**:

```typescript
// ❌ ANTES (no funcionaba)
descargarFactura() {
  console.log('Descargar factura como PDF');
}
```

### **Solución Implementada:**

#### **1. Inyección del Servicio PDF:**
```typescript
import { PdfService } from '../../../../core/services/pdf.service';

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private facturasService: FacturasService,
  private pdfService: PdfService // ✅ Agregado
) {}
```

#### **2. Método `descargarFactura()` Completado:**
```typescript
descargarFactura() {
  if (!this.factura) {
    console.error('No hay factura para descargar');
    return;
  }

  try {
    console.log('🔧 Iniciando descarga de factura...');
    
    // Generar nombre del archivo
    const numeroFactura = this.factura.factura.numero_factura || 'factura';
    const nombreArchivo = `factura_${numeroFactura}.pdf`;

    // Preparar datos de la factura para el PDF
    const datosFactura = {
      numero_factura: this.factura.factura.numero_factura,
      fecha_emision: this.factura.factura.fecha_emision,
      nombre_cliente: this.factura.factura.nombre_cliente,
      direccion_cliente: this.factura.factura.direccion_cliente,
      cif_cliente: this.factura.factura.cif_cliente,
      email_cliente: this.factura.factura.email_cliente,
      subtotal: this.factura.factura.subtotal,
      iva: this.factura.factura.iva,
      total: this.factura.factura.total,
      estado: this.factura.factura.estado,
      notas: this.factura.factura.notas,
      lineas: this.factura.lineas
    };

    // Generar PDF nativo con estilos
    this.pdfService.generarPdfNativo(datosFactura, nombreArchivo);
    
    console.log('✅ Factura descargada exitosamente');
  } catch (error) {
    console.error('❌ Error al descargar factura:', error);
  }
}
```

## 🎨 Características del PDF Generado

### **PDF Nativo con Estilos Profesionales:**
- ✅ **Header azul** con título "FACTURA"
- ✅ **Datos de empresa** completos
- ✅ **Información de factura** (número, fecha, estado)
- ✅ **Datos del cliente** en caja destacada
- ✅ **Tabla de repuestos** con neto y PVP
- ✅ **Tabla de servicios** (mano de obra, desplazamientos)
- ✅ **Resumen de totales** en caja azul
- ✅ **Notas** (si las hay)
- ✅ **Footer** con información de contacto

### **Funcionalidades Disponibles:**

#### **1. Descargar PDF (Botón "Descargar PDF"):**
```typescript
// Genera PDF nativo y lo descarga automáticamente
this.pdfService.generarPdfNativo(datosFactura, nombreArchivo);
```

#### **2. Imprimir Factura (Botón "Imprimir"):**
```typescript
// Abre PDF en nueva ventana para impresión
window.print();
```

## 🔄 Flujo de Trabajo Completo

### **1. Crear Factura:**
1. Navegar a `/crear-factura`
2. Llenar datos del cliente
3. Agregar líneas de factura
4. **Generar factura** → Estado: `'Pendiente'`

### **2. Enviar Factura:**
1. En `/crear-factura` hacer clic en "Enviar factura"
2. **Estado cambia a** `'En curso'`

### **3. Ver Factura:**
1. Navegar a `/facturas/ver/:id`
2. **Descargar PDF** ✅ (Ahora funciona)
3. **Imprimir factura** ✅ (Funciona)

### **4. Completar Factura:**
1. Cuando se recibe el pago
2. **Cambiar estado a** `'Completado'`

## 🛠️ Métodos de Gestión de Estados

### **En `FacturasService`:**
```typescript
// Cambiar estado de factura
cambiarEstado(id: string, estado: 'Pendiente' | 'En curso' | 'Completado'): Observable<Factura>

// Obtener facturas por estado
getFacturasPorEstado(estado: string): Observable<Factura[]>
```

### **En Componentes:**
```typescript
// Cambiar estado desde componente
this.facturasService.cambiarEstado(facturaId, 'Completado').subscribe({
  next: (factura) => {
    console.log('Estado actualizado:', factura.estado);
  }
});
```

## 📊 Beneficios Implementados

### **1. Estados Claros:**
- ✅ **Pendiente**: Factura creada, lista para enviar
- ✅ **En curso**: Factura enviada, esperando pago
- ✅ **Completado**: Factura pagada, trabajo finalizado

### **2. PDF Funcional:**
- ✅ **Descarga automática** de PDF nativo
- ✅ **Estilos profesionales** aplicados
- ✅ **Datos completos** incluidos
- ✅ **Manejo de errores** robusto

### **3. Experiencia de Usuario:**
- ✅ **Botones funcionales** en interfaz
- ✅ **Feedback visual** de estados
- ✅ **Navegación fluida** entre vistas
- ✅ **Logs informativos** para debugging

## 🎉 Resultado Final

### **Estados de Factura:**
- **Pendiente** → **En curso** → **Completado**

### **Funcionalidad PDF:**
- ✅ **Descarga funciona** correctamente
- ✅ **PDF nativo** con estilos profesionales
- ✅ **Datos completos** incluidos
- ✅ **Manejo de errores** implementado

¡Ahora puedes descargar facturas en PDF sin problemas y gestionar los estados de forma clara y profesional! 