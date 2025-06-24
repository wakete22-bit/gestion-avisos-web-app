import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {

  constructor(private platform: Platform) {
    this.initializeViewport();
  }

  private initializeViewport() {
    // Configurar el viewport para dispositivos móviles
    this.setupViewport();
    
    // Escuchar cambios de orientación
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.setupViewport();
      }, 100);
    });
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', () => {
      this.setupViewport();
    });
  }

  private setupViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      // Configuración optimizada para PWA
      const content = [
        'viewport-fit=cover',
        'width=device-width',
        'initial-scale=1.0',
        'minimum-scale=1.0',
        'maximum-scale=1.0',
        'user-scalable=no'
      ].join(', ');
      
      viewport.setAttribute('content', content);
    }
  }

  // Obtener información del viewport
  public getViewportInfo() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      orientation: this.getOrientation(),
      isLandscape: window.innerWidth > window.innerHeight,
      isPortrait: window.innerHeight > window.innerWidth
    };
  }

  // Obtener orientación del dispositivo
  private getOrientation(): string {
    if (window.innerWidth > window.innerHeight) {
      return 'landscape';
    } else {
      return 'portrait';
    }
  }

  // Verificar si estamos en un dispositivo móvil
  public isMobile(): boolean {
    return this.platform.is('mobile') || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Verificar si estamos en modo standalone (PWA instalada)
  public isStandalone(): boolean {
    return (window.navigator as any).standalone === true || 
           window.matchMedia('(display-mode: standalone)').matches;
  }

  // Obtener información de las safe areas
  public getSafeAreaInfo() {
    return {
      top: this.getComputedValue('env(safe-area-inset-top)'),
      bottom: this.getComputedValue('env(safe-area-inset-bottom)'),
      left: this.getComputedValue('env(safe-area-inset-left)'),
      right: this.getComputedValue('env(safe-area-inset-right)')
    };
  }

  private getComputedValue(property: string): string {
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    testElement.style[property as any] = property;
    document.body.appendChild(testElement);
    
    const computedValue = getComputedStyle(testElement)[property as any];
    document.body.removeChild(testElement);
    
    return computedValue || '0px';
  }

  // Aplicar estilos de safe area a un elemento
  public applySafeArea(element: HTMLElement, position: 'top' | 'bottom' | 'left' | 'right' | 'all') {
    const safeAreaInfo = this.getSafeAreaInfo();
    
    switch (position) {
      case 'top':
        element.style.paddingTop = safeAreaInfo.top;
        break;
      case 'bottom':
        element.style.paddingBottom = safeAreaInfo.bottom;
        break;
      case 'left':
        element.style.paddingLeft = safeAreaInfo.left;
        break;
      case 'right':
        element.style.paddingRight = safeAreaInfo.right;
        break;
      case 'all':
        element.style.paddingTop = safeAreaInfo.top;
        element.style.paddingBottom = safeAreaInfo.bottom;
        element.style.paddingLeft = safeAreaInfo.left;
        element.style.paddingRight = safeAreaInfo.right;
        break;
    }
  }

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

  // Obtener estilos CSS para safe areas
  public getSafeAreaStyles() {
    const safeAreaInfo = this.getSafeAreaInfo();
    
    return {
      modalContainer: {
        height: `calc(100vh - ${safeAreaInfo.top} - ${safeAreaInfo.bottom})`,
        maxHeight: `calc(100vh - ${safeAreaInfo.top} - ${safeAreaInfo.bottom})`
      },
      modalHeader: {
        paddingTop: `calc(16px + ${safeAreaInfo.top})`
      },
      modalFooter: {
        paddingBottom: `calc(16px + ${safeAreaInfo.bottom})`
      }
    };
  }

  // Forzar el viewport a un tamaño específico (útil para testing)
  public setViewportSize(width: number, height: number) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const content = [
        'viewport-fit=cover',
        `width=${width}`,
        `height=${height}`,
        'initial-scale=1.0',
        'minimum-scale=1.0',
        'maximum-scale=1.0',
        'user-scalable=no'
      ].join(', ');
      
      viewport.setAttribute('content', content);
    }
  }

  // Restaurar el viewport a la configuración por defecto
  public resetViewport() {
    this.setupViewport();
  }
} 