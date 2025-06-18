import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PwaInstallService } from '../../services/pwa-install.service';
import { PwaUpdateService } from '../../services/pwa-update.service';
import { PwaIosService } from '../../services/pwa-ios.service';
import { ViewportService } from '../../services/viewport.service';

@Component({
  selector: 'app-pwa-debug',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div *ngIf="showDebug" class="pwa-debug">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Debug PWA</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="debug-info">
            <p><strong>Modo Standalone:</strong> {{ debugInfo.isStandalone ? 'Sí' : 'No' }}</p>
            <p><strong>Puede Instalar:</strong> {{ debugInfo.canInstall ? 'Sí' : 'No' }}</p>
            <p><strong>PWA Soportada:</strong> {{ debugInfo.isPwaSupported ? 'Sí' : 'No' }}</p>
            <p><strong>Navegador:</strong> {{ debugInfo.browser.name }} {{ debugInfo.browser.version }}</p>
            <p><strong>Móvil:</strong> {{ debugInfo.browser.isMobile ? 'Sí' : 'No' }}</p>
            <p><strong>Plataforma:</strong> {{ debugInfo.platform.join(', ') }}</p>
            
            <div class="safe-area-info" *ngIf="safeAreaInfo">
              <p><strong>Safe Areas:</strong></p>
              <p>Top: {{ safeAreaInfo.top }}</p>
              <p>Bottom: {{ safeAreaInfo.bottom }}</p>
              <p>Left: {{ safeAreaInfo.left }}</p>
              <p>Right: {{ safeAreaInfo.right }}</p>
            </div>
            
            <div class="viewport-info">
              <p><strong>Viewport:</strong></p>
              <p>Width: {{ viewportInfo.width }}px</p>
              <p>Height: {{ viewportInfo.height }}px</p>
              <p>Device Pixel Ratio: {{ viewportInfo.devicePixelRatio }}</p>
              <p>Orientación: {{ viewportInfo.orientation }}</p>
              <p>Es Móvil: {{ viewportService.isMobile() ? 'Sí' : 'No' }}</p>
              <p>Es Standalone: {{ viewportService.isStandalone() ? 'Sí' : 'No' }}</p>
            </div>
          </div>
          <div class="debug-actions">
            <ion-button size="small" (click)="checkForUpdates()">
              Verificar Actualizaciones
            </ion-button>
            <ion-button size="small" (click)="showInstallInstructions()">
              Instrucciones de Instalación
            </ion-button>
            <ion-button size="small" (click)="refreshDebugInfo()">
              Actualizar Info
            </ion-button>
            <ion-button size="small" (click)="toggleDebug()">
              Ocultar Debug
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </div>
  `,
  styles: [`
    .pwa-debug {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1001;
      max-width: 400px;
      max-height: 80vh;
      overflow-y: auto;
    }
    
    .debug-info p {
      margin: 8px 0;
      font-size: 14px;
    }
    
    .safe-area-info, .viewport-info {
      margin-top: 16px;
      padding: 8px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }
    
    .debug-actions {
      margin-top: 16px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  `]
})
export class PwaDebugComponent implements OnInit {
  showDebug = false;
  debugInfo: any = {};
  safeAreaInfo: any = null;
  viewportInfo: any = {};

  constructor(
    private pwaInstallService: PwaInstallService,
    private pwaUpdateService: PwaUpdateService,
    private pwaIosService: PwaIosService,
    public viewportService: ViewportService
  ) {}

  ngOnInit() {
    // Solo mostrar en modo desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      this.showDebug = true;
      this.updateDebugInfo();
      
      // Actualizar información cada 5 segundos
      setInterval(() => {
        this.updateDebugInfo();
      }, 5000);
    }
  }

  updateDebugInfo() {
    this.debugInfo = this.pwaInstallService.getDebugInfo();
    this.safeAreaInfo = this.viewportService.getSafeAreaInfo();
    this.viewportInfo = this.viewportService.getViewportInfo();
  }

  checkForUpdates() {
    this.pwaUpdateService.checkForUpdate();
  }

  showInstallInstructions() {
    const instructions = this.pwaInstallService.getInstallInstructions();
    alert(instructions);
  }

  refreshDebugInfo() {
    this.updateDebugInfo();
  }

  toggleDebug() {
    this.showDebug = !this.showDebug;
  }
} 