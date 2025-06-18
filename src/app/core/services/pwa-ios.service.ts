import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PwaIosService {

  constructor(private platform: Platform) {
    this.initializeIOSPWA();
  }

  private initializeIOSPWA() {
    // Detectar si estamos en iOS o Android
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.setupMobilePWA();
    }
  }

  private setupMobilePWA() {
    // Prevenir el zoom en dispositivos móviles
    document.addEventListener('gesturestart', (e) => {
      e.preventDefault();
    });

    // Prevenir el zoom con doble tap
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      const lastTouch = (window as any).lastTouch || 0;
      const timeDiff = now - lastTouch;
      
      if (timeDiff < 500 && timeDiff > 0) {
        e.preventDefault();
      }
      
      (window as any).lastTouch = now;
    });

    // Configurar el viewport para dispositivos móviles
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 
        'viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
      );
    }

    // Agregar estilos específicos para móviles
    this.addMobileStyles();
  }

  private addMobileStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Estilos específicos para dispositivos móviles */
      html {
        height: 100%;
        overflow: hidden;
      }
      
      body {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        background-color: var(--ion-background-color, #ffffff);
      }
      
      /* Configuración para PWA standalone */
      @media all and (display-mode: standalone) {
        body {
          /* Usar env() para las safe areas en iOS */
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
        
        /* Asegurar que ion-app ocupe todo el espacio disponible */
        ion-app {
          height: 100vh;
          height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
          margin-top: env(safe-area-inset-top);
          margin-bottom: env(safe-area-inset-bottom);
        }
        
        /* Configurar ion-content para que ocupe el espacio correcto */
        ion-content {
          --offset-top: env(safe-area-inset-top);
          --offset-bottom: env(safe-area-inset-bottom);
          --padding-top: env(safe-area-inset-top);
          --padding-bottom: env(safe-area-inset-bottom);
        }
        
        /* Configurar ion-header para que respete la safe area superior */
        ion-header {
          padding-top: env(safe-area-inset-top);
        }
        
        /* Configurar ion-footer para que respete la safe area inferior */
        ion-footer {
          padding-bottom: env(safe-area-inset-bottom);
        }
      }
      
      /* Fallback para navegadores que no soportan env() */
      @supports not (padding-top: env(safe-area-inset-top)) {
        @media all and (display-mode: standalone) {
          body {
            padding-top: 20px;
            padding-bottom: 20px;
          }
          
          ion-app {
            height: calc(100vh - 40px);
            margin-top: 20px;
            margin-bottom: 20px;
          }
        }
      }
      
      /* Configuración específica para iOS */
      @supports (-webkit-touch-callout: none) {
        body {
          /* Prevenir el bounce scroll en iOS */
          position: fixed;
          width: 100%;
          height: 100%;
        }
        
        ion-content {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
      }
      
      /* Configuración para Android */
      @supports not (-webkit-touch-callout: none) {
        body {
          /* Configuración específica para Android */
          position: relative;
        }
      }
      
      /* Asegurar que el contenido principal ocupe todo el espacio */
      .ion-page {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      
      /* Configurar el router outlet para que ocupe el espacio disponible */
      ion-router-outlet {
        flex: 1;
        height: 100%;
      }
    `;
    document.head.appendChild(style);
  }

  // Método para mostrar instrucciones de instalación específicas de iOS
  public showIOSInstallInstructions() {
    const isStandalone = (window.navigator as any).standalone === true;
    
    if (!isStandalone) {
      // Mostrar instrucciones específicas para iOS
      const instructions = `
        Para instalar esta aplicación en tu iPhone:
        
        1. Toca el botón compartir (□↑) en Safari
        2. Desplázate hacia abajo y toca "Agregar a pantalla de inicio"
        3. Toca "Agregar"
        
        La aplicación aparecerá en tu pantalla de inicio como una app nativa.
      `;
      
      alert(instructions);
    }
  }

  // Método para verificar si la app está en modo standalone
  public isStandalone(): boolean {
    return (window.navigator as any).standalone === true || 
           window.matchMedia('(display-mode: standalone)').matches;
  }

  // Método para obtener información de las safe areas
  public getSafeAreaInfo(): any {
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
} 