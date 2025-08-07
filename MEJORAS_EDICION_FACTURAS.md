# 🔧 Mejoras en la Edición de Facturas

## 🎯 Problema Resuelto

**Problema anterior**: El componente `crear-factura` usaba datos hardcodeados de ejemplo, lo que impedía editar facturas existentes con valores reales.

**Solución implementada**: Modificación completa del componente para soportar tanto creación como edición de facturas con datos reales.

## ✅ Cambios Implementados

### **1. Componente `CrearFacturaComponent` Mejorado**

#### **Nuevas propiedades**:
```typescript
@Input() facturaId?: string; // Para editar factura existente
isEditing = false; // Indica si estamos editando
facturaOriginal?: FacturaCompleta; // Datos originales
```

#### **Detección automática de modo**:
```typescript
ngOnInit() {
  // Verificar si estamos editando una factura existente
  this.route.params.subscribe(params => {
    const facturaId = params['id'];
    if (facturaId) {
      this.facturaId = facturaId;
      this.isEditing = true;
      this.cargarFacturaParaEditar(facturaId);
    } else {
      // Solo generar número automático si es nueva factura
      this.generarNumeroFactura();
    }
  });
}
```

### **2. Carga de Datos Reales**

#### **Método `cargarFacturaParaEditar`**:
```typescript
private cargarFacturaParaEditar(facturaId: string) {
  this.loading = true;
  this.facturasService.getFactura(facturaId).subscribe({
    next: (facturaCompleta) => {
      this.facturaOriginal = facturaCompleta;
      this.cargarDatosFactura(facturaCompleta);
      this.loading = false;
    },
    error: (error) => {
      console.error('Error al cargar factura para editar:', error);
      this.loading = false;
      this.router.navigate(['/facturas']);
    }
  });
}
```

#### **Método `cargarDatosFactura`**:
```typescript
private cargarDatosFactura(facturaCompleta: FacturaCompleta) {
  const factura = facturaCompleta.factura;
  const lineas = facturaCompleta.lineas;

  // Cargar datos básicos de la factura
  this.facturaForm.patchValue({
    numeroFactura: factura.numero_factura,
    fecha: factura.fecha_emision,
    nombre: factura.nombre_cliente,
    direccion: factura.direccion_cliente,
    cif: factura.cif_cliente,
    email: factura.email_cliente,
    notas: factura.notas || ''
  });

  // Separar líneas por tipo
  this.repuestos = lineas.filter(linea => linea.tipo === 'repuesto');
  this.manoObra = lineas.filter(linea => linea.tipo === 'mano_obra');
  this.desplazamientos = lineas.filter(linea => linea.tipo === 'desplazamiento');
}
```

### **3. Lógica de Guardado Mejorada**

#### **Métodos actualizados**:
```typescript
enviarFactura() {
  if (this.facturaForm.valid) {
    const facturaData = this.prepararDatosFactura();
    facturaData.estado = 'En curso';
    
    if (this.isEditing && this.facturaId) {
      // Actualizar factura existente
      this.facturasService.actualizarFactura(this.facturaId, facturaData)
    } else {
      // Crear nueva factura
      this.facturasService.crearFactura(facturaData)
    }
  }
}

generarFactura() {
  if (this.facturaForm.valid) {
    const facturaData = this.prepararDatosFactura();
    facturaData.estado = 'Pendiente';
    
    if (this.isEditing && this.facturaId) {
      // Actualizar factura existente
      this.facturasService.actualizarFactura(this.facturaId, facturaData)
    } else {
      // Crear nueva factura
      this.facturasService.crearFactura(facturaData)
    }
  }
}
```

### **4. Interfaz de Usuario Mejorada**

#### **Título dinámico**:
```html
<h2>{{ isEditing ? 'Editar Factura' : 'Crear Factura' }}</h2>
```

#### **Botones dinámicos**:
```html
<button type="button" class="btn-outline" (click)="enviarFactura()">
  {{ loading ? 'Enviando...' : (isEditing ? 'Actualizar factura' : 'Enviar factura') }}
</button>
<button type="button" class="btn-primary" (click)="generarFactura()">
  {{ loading ? 'Generando...' : (isEditing ? 'Guardar cambios' : 'Generar factura') }}
</button>
```

#### **Estado de carga**:
```html
<div *ngIf="loading && isEditing" class="loading-state">
  <div class="loading-spinner">
    <ion-icon name="refresh-outline" class="spinning"></ion-icon>
    <p>Cargando factura para editar...</p>
  </div>
</div>
```

### **5. Rutas Configuradas**

#### **Nueva ruta de edición**:
```typescript
{
  path: 'facturas/editar/:id',
  loadComponent: () => import('./modules/facturas/components/crear-factura/crear-factura.component')
    .then((m) => m.CrearFacturaComponent),
}
```

#### **Método de edición en `VerFacturaComponent`**:
```typescript
editarFactura() {
  if (this.facturaId) {
    this.router.navigate(['/facturas/editar', this.facturaId]);
  }
}
```

## 🚀 Beneficios Implementados

### **1. Funcionalidad Completa**
- ✅ **Crear facturas nuevas** con datos reales
- ✅ **Editar facturas existentes** con valores actuales
- ✅ **Carga automática** de datos de la base de datos
- ✅ **Validación de formularios** en ambos modos

### **2. Experiencia de Usuario**
- ✅ **Títulos dinámicos** según el modo
- ✅ **Botones contextuales** con texto apropiado
- ✅ **Estados de carga** informativos
- ✅ **Navegación fluida** entre modos

### **3. Robustez**
- ✅ **Manejo de errores** en carga de datos
- ✅ **Redirección automática** en caso de error
- ✅ **Validación de datos** antes de guardar
- ✅ **Logs detallados** para debugging

### **4. Mantenibilidad**
- ✅ **Código reutilizable** para ambos modos
- ✅ **Separación clara** de responsabilidades
- ✅ **Documentación completa** de cambios
- ✅ **Estructura escalable** para futuras mejoras

## 📋 Flujo de Uso

### **Para Crear Nueva Factura**:
1. Navegar a `/crear-factura`
2. El formulario se carga vacío
3. Generar número automático
4. Llenar datos y líneas
5. Guardar como nueva factura

### **Para Editar Factura Existente**:
1. Navegar a `/facturas/ver/:id`
2. Hacer clic en "Editar"
3. Redirige a `/facturas/editar/:id`
4. Carga datos reales de la factura
5. Modificar según necesidad
6. Guardar cambios

## 🎉 Resultado Final

Ahora el componente `crear-factura` es completamente funcional para:
- **Crear facturas nuevas** con datos reales
- **Editar facturas existentes** con valores actuales
- **Mantener consistencia** en ambos modos
- **Proporcionar experiencia de usuario** fluida y profesional

La aplicación ahora maneja de forma robusta tanto la creación como la edición de facturas, eliminando los datos hardcodeados y proporcionando una experiencia completa y profesional. 