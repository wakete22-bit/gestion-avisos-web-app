import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SafeAreaService {
  private isIOS: boolean = false;
  private isAndroid: boolean = false;
  private isStandalone: boolean = false;
  private safeAreaTop: string = '0px';
  private safeAreaBottom: string = '0px';
  private safeAreaLeft: string = '0px';
  private safeAreaRight: string = '0px';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.detectPlatform();
    this.detectStandalone();
    this.initializeSafeAreas();
  }

  private detectPlatform() {
    this.isIOS = isPlatform('ios');
    this.isAndroid = isPlatform('android');
    
    // Agregar clases CSS al body
    if (this.isIOS) {
      document.body.classList.add('ios');
    } else if (this.isAndroid) {
      document.body.classList.add('android');
    }
  }

  private detectStandalone() {
    // Detectar si la PWA está en modo standalone
    this.isStandalone = (window.navigator as any).standalone === true || 
                       window.matchMedia('(display-mode: standalone)').matches;
    
    if (this.isStandalone) {
      document.body.classList.add('pwa-standalone');
    }
  }

  private initializeSafeAreas() {
    // Obtener valores de safe areas usando env() o fallbacks
    this.safeAreaTop = this.getComputedSafeArea('env(safe-area-inset-top)', '0px');
    this.safeAreaBottom = this.getComputedSafeArea('env(safe-area-inset-bottom)', '0px');
    this.safeAreaLeft = this.getComputedSafeArea('env(safe-area-inset-left)', '0px');
    this.safeAreaRight = this.getComputedSafeArea('env(safe-area-inset-right)', '0px');

    // Aplicar valores CSS personalizados
    this.applySafeAreaCSS();
  }

  private getComputedSafeArea(property: string, fallback: string): string {
    try {
      // Crear un elemento temporal para medir la safe area
      const testElement = document.createElement('div');
      testElement.style.position = 'absolute';
      testElement.style.visibility = 'hidden';
      testElement.style.top = property;
      testElement.style.bottom = property;
      testElement.style.left = property;
      testElement.style.right = property;
      document.body.appendChild(testElement);
      
      const computedStyle = getComputedStyle(testElement);
      const topValue = computedStyle.top;
      const bottomValue = computedStyle.bottom;
      const leftValue = computedStyle.left;
      const rightValue = computedStyle.right;
      
      document.body.removeChild(testElement);
      
      // Retornar el valor apropiado según la propiedad
      if (property.includes('top')) return topValue !== 'auto' ? topValue : fallback;
      if (property.includes('bottom')) return bottomValue !== 'auto' ? bottomValue : fallback;
      if (property.includes('left')) return leftValue !== 'auto' ? leftValue : fallback;
      if (property.includes('right')) return rightValue !== 'auto' ? rightValue : fallback;
      
      return fallback;
    } catch (error) {
      console.warn('Error obteniendo safe area:', error);
      return fallback;
    }
  }

  private applySafeAreaCSS() {
    // Aplicar valores CSS personalizados
    const root = document.documentElement;
    root.style.setProperty('--safe-area-top', this.safeAreaTop);
    root.style.setProperty('--safe-area-bottom', this.safeAreaBottom);
    root.style.setProperty('--safe-area-left', this.safeAreaLeft);
    root.style.setProperty('--safe-area-right', this.safeAreaRight);
    
    // Aplicar márgenes calculados
    root.style.setProperty('--safe-margin-top', `calc(${this.safeAreaTop} + 4px)`);
    root.style.setProperty('--safe-margin-bottom', `calc(${this.safeAreaBottom} + 8px)`);
    root.style.setProperty('--safe-margin-left', `calc(${this.safeAreaLeft} + 16px)`);
    root.style.setProperty('--safe-margin-right', `calc(${this.safeAreaRight} + 16px)`);
  }

  // Métodos públicos para obtener información de la plataforma
  public getPlatformInfo() {
    return {
      isIOS: this.isIOS,
      isAndroid: this.isAndroid,
      isStandalone: this.isStandalone,
      isMobile: this.isIOS || this.isAndroid
    };
  }

  public getSafeAreas() {
    return {
      top: this.safeAreaTop,
      bottom: this.safeAreaBottom,
      left: this.safeAreaLeft,
      right: this.safeAreaRight
    };
  }

  public isIOSPlatform(): boolean {
    return this.isIOS;
  }

  public isAndroidPlatform(): boolean {
    return this.isAndroid;
  }

  public isPWAStandalone(): boolean {
    return this.isStandalone;
  }

  public isMobilePlatform(): boolean {
    return this.isIOS || this.isAndroid;
  }

  // Método para recalcular safe areas (útil para cambios de orientación)
  public recalculateSafeAreas() {
    this.initializeSafeAreas();
  }

  // Método para obtener el margen superior recomendado para headers
  public getHeaderMargin(): string {
    if (this.isStandalone) {
      return `calc(80px + ${this.safeAreaTop})`;
    }
    return '80px';
  }

  // Método para obtener el margen inferior recomendado para footers
  public getFooterMargin(): string {
    if (this.isStandalone) {
      return `calc(16px + ${this.safeAreaBottom})`;
    }
    return '16px';
  }

  // Método para obtener la altura mínima del contenido
  public getContentMinHeight(): string {
    const headerHeight = this.isStandalone ? 60 : 60;
    return `calc(100vh - ${headerHeight}px)`;
  }
}
