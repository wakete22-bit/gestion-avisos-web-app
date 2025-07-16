import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { PwaInstallBannerComponent } from './core/components/pwa-install-banner/pwa-install-banner.component';
import { PwaDebugComponent } from './core/components/pwa-debug/pwa-debug.component';
import { PwaUpdateService } from './core/services/pwa-update.service';
import { PwaIosService } from './core/services/pwa-ios.service';
import { ViewportService } from './core/services/viewport.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, PwaInstallBannerComponent, PwaDebugComponent],
})
export class AppComponent implements OnInit {
  constructor(
    private pwaUpdateService: PwaUpdateService,
    private pwaIosService: PwaIosService,
    private viewportService: ViewportService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Los servicios PWA se inicializan automáticamente en sus constructores
    // Verificar autenticación al iniciar la aplicación
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      console.log('Estado de autenticación:', isAuthenticated);
    });
  }
}
