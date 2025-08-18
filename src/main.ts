import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { PerformanceInterceptor } from './app/core/interceptors/performance.interceptor';
import { ProductionConfig } from './app/core/config/production.config';
import { LoggingConfig } from './app/core/config/logging.config';

if (environment.production) {
  enableProdMode();
  ProductionConfig.initialize();
  LoggingConfig.initialize();
  
  // Limpiar logs en producción
  console.clear();
  
  // Deshabilitar logs de debug en producción
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
  
  // Solo mantener console.error para errores críticos
  const originalError = console.error;
  console.error = (...args: any[]) => {
    // Solo mostrar errores críticos del sistema
    if (args[0] && typeof args[0] === 'string' && 
        (args[0].includes('ERROR') || args[0].includes('CRITICAL') || args[0].includes('FATAL'))) {
      originalError(...args);
    }
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([PerformanceInterceptor])
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
});
