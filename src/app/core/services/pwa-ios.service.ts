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
    // Detectar si estamos en iOS
    if (this.platform.is('ios')) {
      this.setupIOSPWA();
    }
  }

  private setupIOSPWA() {
    // Prevenir el zoom en iOS
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

    // Configurar el viewport para iOS
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 
        'viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
      );
    }

    // Agregar estilos específicos para iOS
    this.addIOSStyles();
  }

  private addIOSStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Estilos específicos para iOS PWA */
      @supports (-webkit-touch-callout: none) {
        body {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Prevenir el bounce scroll en iOS */
        html, body {
          position: fixed;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        
        ion-content {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Ocultar la barra de direcciones en modo standalone */
        @media all and (display-mode: standalone) {
          body {
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
        }
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
} 