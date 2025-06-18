import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PwaIosService } from '../../services/pwa-ios.service';
import { PwaInstallService } from '../../services/pwa-install.service';

@Component({
  selector: 'app-pwa-install-banner',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div *ngIf="showBanner" class="pwa-banner">
      <ion-card>
        <ion-card-content>
          <div class="banner-content">
            <div class="banner-text">
              <h3>Instalar aplicación</h3>
              <p>Agrega esta aplicación a tu pantalla de inicio para un acceso más rápido</p>
            </div>
            <div class="banner-actions">
              <ion-button fill="clear" (click)="dismissBanner()">
                <ion-icon name="close" slot="icon-only"></ion-icon>
              </ion-button>
              <ion-button (click)="installPWA()">
                Instalar
              </ion-button>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </div>
  `,
  styles: [`
    .banner-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    
    .banner-text h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }
    
    .banner-text p {
      margin: 0;
      font-size: 14px;
      opacity: 0.8;
    }
    
    .banner-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class PwaInstallBannerComponent implements OnInit, OnDestroy {
  showBanner = false;
  private deferredPrompt: any;

  constructor(
    private pwaIosService: PwaIosService,
    private pwaInstallService: PwaInstallService
  ) {}

  ngOnInit() {
    this.checkPWAInstallation();
    window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt.bind(this));
  }

  private checkPWAInstallation() {
    // Verificar si la app ya está instalada
    if (this.pwaInstallService.isStandalone()) {
      this.showBanner = false;
      return;
    }

    // Verificar si el navegador soporta PWA
    if (!this.pwaInstallService.isPwaSupported()) {
      this.showBanner = false;
      return;
    }

    // Verificar si el usuario ya ha descartado el banner
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (dismissed) {
      this.showBanner = false;
      return;
    }

    // Mostrar el banner después de un delay
    setTimeout(() => {
      this.showBanner = true;
    }, 3000);
  }

  private handleBeforeInstallPrompt(e: Event) {
    e.preventDefault();
    this.deferredPrompt = e;
  }

  async installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('Usuario aceptó instalar la PWA');
      }
      this.deferredPrompt = null;
      this.showBanner = false;
    } else {
      // Fallback para navegadores que no soportan beforeinstallprompt
      this.showInstallInstructions();
    }
  }

  dismissBanner() {
    this.showBanner = false;
    localStorage.setItem('pwa-banner-dismissed', 'true');
  }

  private showInstallInstructions() {
    // Usar el servicio de instalación para mostrar instrucciones específicas
    const instructions = this.pwaInstallService.getInstallInstructions();
    alert(instructions);
  }
} 