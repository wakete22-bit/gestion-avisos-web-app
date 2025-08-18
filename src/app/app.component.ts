import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { PwaInstallBannerComponent } from './core/components/pwa-install-banner/pwa-install-banner.component';
import { PwaUpdateService } from './core/services/pwa-update.service';
import { PwaIosService } from './core/services/pwa-ios.service';
import { ViewportService } from './core/services/viewport.service';
import { AuthService } from './core/services/auth.service';
import { PerformanceFixService } from './core/services/performance-fix.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, PwaInstallBannerComponent],
})
export class AppComponent implements OnInit {
  constructor(
    private pwaUpdateService: PwaUpdateService,
    private pwaIosService: PwaIosService,
    private viewportService: ViewportService,
    private authService: AuthService,
    private performanceFix: PerformanceFixService
  ) {}

  ngOnInit() {
    // Los servicios PWA se inicializan automáticamente en sus constructores
    // Verificar autenticación al iniciar la aplicación
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      console.log('Estado de autenticación:', isAuthenticated);
    });

    // Iniciar optimización automática de rendimiento en producción
    if (!this.isDevMode()) {
      // Limpieza preventiva cada 2 minutos
      setInterval(() => {
        this.performanceFix.forceCleanup();
      }, 2 * 60 * 1000);
    }
  }

  /**
   * Verifica si estamos en modo desarrollo
   */
  private isDevMode(): boolean {
    return !environment.production;
  }
}
