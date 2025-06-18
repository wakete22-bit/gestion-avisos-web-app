import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { PwaInstallBannerComponent } from './core/components/pwa-install-banner/pwa-install-banner.component';
import { PwaUpdateService } from './core/services/pwa-update.service';
import { PwaIosService } from './core/services/pwa-ios.service';
import { PwaDebugComponent } from './core/components/pwa-debug/pwa-debug.component';
import { ViewportService } from './core/services/viewport.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
      imports: [IonApp, IonRouterOutlet, PwaInstallBannerComponent, PwaDebugComponent],
})


export class AppComponent {
  constructor(
    private pwaUpdateService: PwaUpdateService,
    private pwaIosService: PwaIosService,
    private viewportService: ViewportService
  ) {

  }
}
