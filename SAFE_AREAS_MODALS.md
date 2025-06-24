# Solución para Safe Areas en Modales

## Problema Identificado

Los modales de la aplicación no respetaban los márgenes de seguridad (safe areas) en dispositivos móviles, especialmente en PWA standalone. Esto causaba que el contenido del modal se superpusiera con elementos del sistema como la barra de estado o el área de navegación.

## Solución Implementada

### 1. Estilos CSS Globales

Se actualizaron los estilos en `src/global.scss` para manejar las safe areas en modales:

```scss
// Configuración específica para PWA standalone en móviles
@media all and (display-mode: standalone) {
  ion-modal {
    --height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px)) !important;
    --max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px)) !important;
    --min-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px)) !important;
  }
}

// Configuración específica para iOS
@supports (-webkit-touch-callout: none) {
  @media all and (display-mode: standalone) {
    ion-modal {
      --height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px)) !important;
      --max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px)) !important;
      --min-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px)) !important;
    }
  }
}
```

### 2. Estilos Específicos por Modal

Cada modal tiene estilos específicos para manejar las safe areas:

- `src/app/modules/avisos/components/crear-avisos-modal/crear-avisos-modal.component.scss`
- `src/app/modules/clientes/components/crear-cliente-modal/crear-cliente-modal.component.scss`
- `src/app/modules/inventario/components/crear-producto-modal/crear-producto-modal.component.scss`

### 3. Servicio ViewportService

Se extendió el `ViewportService` con métodos específicos para modales:

```typescript
// Aplicar safe areas a un modal
public applySafeAreaToModal(modalElement: HTMLElement) {
  if (!this.isStandalone() || !this.isMobile()) {
    return; // Solo aplicar en PWA standalone en móviles
  }

  const safeAreaInfo = this.getSafeAreaInfo();
  
  // Aplicar al contenedor principal del modal
  modalElement.style.height = `calc(100vh - ${safeAreaInfo.top} - ${safeAreaInfo.bottom})`;
  modalElement.style.maxHeight = `calc(100vh - ${safeAreaInfo.top} - ${safeAreaInfo.bottom})`;
  
  // Buscar y aplicar al header
  const header = modalElement.querySelector('.modal-header') as HTMLElement;
  if (header) {
    header.style.paddingTop = `calc(16px + ${safeAreaInfo.top})`;
  }
  
  // Buscar y aplicar al footer
  const footer = modalElement.querySelector('.modal-footer') as HTMLElement;
  if (footer) {
    footer.style.paddingBottom = `calc(16px + ${safeAreaInfo.bottom})`;
  }
}
```

### 4. Implementación en Componentes

Cada componente de modal implementa `AfterViewInit` para aplicar las safe areas dinámicamente:

```typescript
ngAfterViewInit() {
  // Aplicar safe areas al modal después de que se renderice
  setTimeout(() => {
    const modalContainer = this.elementRef.nativeElement.querySelector('.modal-container');
    if (modalContainer) {
      this.viewportService.applySafeAreaToModal(modalContainer);
    }
  }, 100);
}
```

## Características de la Solución

### ✅ Compatibilidad Multiplataforma
- Soporte para iOS y Android
- Detección automática de PWA standalone
- Fallbacks para navegadores que no soportan `env()`

### ✅ Aplicación Dinámica
- Las safe areas se aplican automáticamente al abrir modales
- Se adaptan a cambios de orientación del dispositivo
- Respeta las preferencias del usuario

### ✅ Estilos Responsivos
- Diferentes configuraciones para móvil y desktop
- Media queries específicas para PWA standalone
- Soporte para diferentes tamaños de pantalla

### ✅ Fallbacks Robustos
- Valores por defecto para navegadores antiguos
- Detección de capacidades del navegador
- Graceful degradation

## Variables CSS Utilizadas

```scss
:root {
  --safe-area-top: env(safe-area-inset-top, 0px);
  --safe-area-bottom: env(safe-area-inset-bottom, 0px);
  --safe-area-left: env(safe-area-inset-left, 0px);
  --safe-area-right: env(safe-area-inset-right, 0px);
}
```

## Testing

Para verificar que la solución funciona correctamente:

1. **En PWA Standalone**: Los modales deben respetar las safe areas
2. **En Navegador Normal**: Los modales deben funcionar normalmente
3. **En Diferentes Dispositivos**: Probar en iOS y Android
4. **Cambios de Orientación**: Los modales deben adaptarse automáticamente

## Mantenimiento

- Los estilos se aplican automáticamente a nuevos modales
- El `ViewportService` maneja la lógica de detección
- Los fallbacks aseguran compatibilidad futura
- La documentación facilita el mantenimiento del código 