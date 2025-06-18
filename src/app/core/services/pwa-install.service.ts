import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PwaInstallService {

  constructor(private platform: Platform) {}

  // Verificar si la PWA puede ser instalada
  public canInstall(): boolean {
    return 'serviceWorker' in navigator && 
           'PushManager' in window &&
           this.isStandalone() === false;
  }

  // Verificar si la app está en modo standalone
  public isStandalone(): boolean {
    return (window.navigator as any).standalone === true || 
           window.matchMedia('(display-mode: standalone)').matches;
  }

  // Obtener instrucciones específicas del navegador
  public getInstallInstructions(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (this.platform.is('ios')) {
      return 'Para instalar en iOS:\n1. Toca el botón compartir (□↑)\n2. Selecciona "Agregar a pantalla de inicio"\n3. Toca "Agregar"';
    } else if (this.platform.is('android')) {
      return 'Para instalar en Android:\n1. Toca el menú (⋮)\n2. Selecciona "Agregar a pantalla de inicio"\n3. Toca "Agregar"';
    } else if (userAgent.includes('chrome')) {
      return 'Para instalar en Chrome:\n1. Busca el ícono de instalación (⬇️) en la barra de direcciones\n2. Haz clic en "Instalar"';
    } else if (userAgent.includes('edge')) {
      return 'Para instalar en Edge:\n1. Busca el ícono de instalación (⬇️) en la barra de direcciones\n2. Haz clic en "Instalar"';
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      return 'Para instalar en Safari:\n1. Ve a Archivo > Agregar a pantalla de inicio\n2. La app aparecerá en tu Launchpad';
    } else {
      return 'Para instalar la aplicación:\nBusca el ícono de instalación en tu navegador o usa las opciones del menú para agregar a pantalla de inicio.';
    }
  }

  // Verificar si el navegador soporta PWA
  public isPwaSupported(): boolean {
    return 'serviceWorker' in navigator && 
           'PushManager' in window &&
           'Notification' in window;
  }

  // Obtener información del navegador
  public getBrowserInfo(): { name: string; version: string; isMobile: boolean } {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      browserName = 'Chrome';
      const match = userAgent.match(/Chrome\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      browserName = 'Safari';
      const match = userAgent.match(/Version\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Firefox')) {
      browserName = 'Firefox';
      const match = userAgent.match(/Firefox\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Edg')) {
      browserName = 'Edge';
      const match = userAgent.match(/Edg\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    }

    return { name: browserName, version: browserVersion, isMobile };
  }

  // Mostrar información de debug
  public getDebugInfo(): any {
    return {
      isStandalone: this.isStandalone(),
      canInstall: this.canInstall(),
      isPwaSupported: this.isPwaSupported(),
      browser: this.getBrowserInfo(),
      userAgent: navigator.userAgent,
      platform: this.platform.platforms()
    };
  }
} 