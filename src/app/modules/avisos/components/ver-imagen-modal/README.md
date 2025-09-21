# Modal de Visualización de Imágenes

Este componente permite visualizar imágenes en pantalla completa con funcionalidades adicionales.

## Características

- **Visualización en pantalla completa**: Las imágenes se muestran en modo fullscreen
- **Zoom avanzado**: 
  - Zoom con rueda del mouse (50% - 300%)
  - Zoom con gestos táctiles (pellizco en móviles)
  - Arrastre para navegar cuando hay zoom
  - Botón de reset para volver al zoom original
- **Descarga de imágenes**: Botón para descargar la imagen actual
- **Eliminación de imágenes**: Botón para eliminar la imagen (con confirmación)
- **Diseño responsive**: Adaptado para móviles y desktop
- **Animaciones suaves**: Transiciones y efectos visuales
- **Fondo oscuro**: Mejor contraste para visualizar imágenes
- **Indicador de zoom**: Muestra el nivel de zoom actual en tiempo real

## Uso

```typescript
// En el componente padre
async verImagenCompleta(foto: { id: string; url: string; descripcion?: string }) {
  const modal = await this.modalController.create({
    component: VerImagenModalComponent,
    componentProps: {
      imagen: foto
    },
    cssClass: 'modal-imagen-completa',
    backdropDismiss: true,
    showBackdrop: true
  });

  await modal.present();

  const { data, role } = await modal.onWillDismiss();
  
  // Manejar acciones del modal
  if (role === 'confirm' && data?.accion === 'eliminar') {
    // Recargar datos después de eliminar
    this.cargarAviso();
  }
}
```

## Estructura del Componente

### Inputs
- `imagen`: Objeto con la información de la imagen
  - `id`: ID único de la imagen
  - `url`: URL de la imagen
  - `descripcion`: Descripción opcional de la imagen

### Outputs
- `modal.dismiss()`: Cierra el modal
- `modal.dismiss({ accion: 'eliminar', imagen })`: Cierra el modal e indica que se eliminó la imagen

## Estilos

El componente incluye estilos CSS personalizados para:
- Modal de pantalla completa
- Botones de acción con efectos hover
- Imagen responsive con zoom
- Información de la imagen con fondo translúcido
- Animaciones de entrada y transiciones

## Responsive

- **Desktop**: Botones grandes, imagen con zoom hover
- **Tablet**: Botones medianos, layout optimizado
- **Móvil**: Botones pequeños, imagen adaptada a pantalla

## Alternativas Consideradas

1. **Librerías externas** (ngx-gallery, ng-image-viewer):
   - ❌ Dependencias adicionales
   - ❌ Mayor tamaño del bundle
   - ❌ Menos control sobre el diseño

2. **Implementación nativa con CSS**:
   - ✅ Sin dependencias
   - ✅ Control total del diseño
   - ✅ Integración perfecta con Ionic
   - ✅ Menor tamaño del bundle

## Controles de Zoom

### Desktop
- **Rueda del mouse**: Zoom in/out
- **Click y arrastrar**: Navegar por la imagen cuando hay zoom
- **Botón reset**: Volver al zoom original (100%)

### Móvil/Tablet
- **Gestos de pellizco**: Zoom in/out con dos dedos
- **Arrastre**: Navegar por la imagen cuando hay zoom
- **Botón reset**: Volver al zoom original (100%)

### Indicadores Visuales
- **Nivel de zoom**: Se muestra en tiempo real en el header
- **Cursor**: Cambia según el estado (zoom-in, grab, grabbing)
- **Transiciones suaves**: Animaciones fluidas en todos los cambios

## Mejoras Futuras

- [x] Zoom con scroll/pinch en móviles
- [ ] Navegación entre múltiples imágenes
- [ ] Rotación de imágenes
- [ ] Filtros y efectos básicos
- [ ] Compartir imagen
- [ ] Zoom con doble tap
- [ ] Límites de arrastre inteligentes
