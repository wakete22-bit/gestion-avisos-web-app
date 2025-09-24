import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { UnifiedReconnectionService } from './unified-reconnection.service';

@Injectable({
  providedIn: 'root'
})
export class DebugReconnectionService {
  private debugLog$ = new BehaviorSubject<string[]>([]);
  private maxLogs = 50;
  private isMobile = false;

  constructor(
    private platform: Platform,
    private unifiedReconnectionService: UnifiedReconnectionService
  ) {
    console.log('🔍 DebugReconnectionService: Inicializado para sistema unificado');
    this.isMobile = this.platform.is('mobile') || this.platform.is('hybrid');
    console.log('🔍 DebugReconnectionService: Es móvil?', this.isMobile);
    
    // Log automático de eventos de visibilidad
    this.setupVisibilityDebug();
    
    // Log específico para móviles
    if (this.isMobile) {
      this.setupMobileDebug();
    }

    // Suscribirse a eventos del servicio unificado
    this.setupUnifiedServiceDebug();
  }

  private setupVisibilityDebug() {
    // Log automático de cambios de visibilidad
    document.addEventListener('visibilitychange', () => {
      this.log(`👁️ Visibility change: ${document.visibilityState}`);
    });

    // Log automático de focus/blur
    window.addEventListener('focus', () => {
      this.log(`🎯 Window focused`);
    });

    window.addEventListener('blur', () => {
      this.log(`💨 Window blurred`);
    });

    // Log automático de pageshow/pagehide
    window.addEventListener('pageshow', () => {
      this.log(`📄 Page shown`);
    });

    window.addEventListener('pagehide', () => {
      this.log(`📄 Page hidden`);
    });
  }

  private setupMobileDebug() {
    console.log('🔍 DebugReconnectionService: Configurando debug específico para móviles');
    
    // Detectar cambios de orientación
    window.addEventListener('orientationchange', () => {
      this.log(`📱 Orientation change: ${window.orientation}`);
    });

    // Detectar eventos de touch (útil para móviles)
    document.addEventListener('touchstart', () => {
      this.log(`👆 Touch start`);
    }, { passive: true });

    document.addEventListener('touchend', () => {
      this.log(`👆 Touch end`);
    }, { passive: true });

    // Detectar cuando la app se vuelve visible (específico para PWAs móviles)
    if ('onpagevisibilitychange' in document) {
      document.addEventListener('pagevisibilitychange', () => {
        this.log(`📱 Page visibility change (móvil): ${document.visibilityState}`);
      });
    }

    // Detectar eventos específicos de PWAs móviles
    if ('onfreeze' in document) {
      document.addEventListener('freeze', () => {
        this.log(`❄️ App congelada (móvil)`);
      });
    }

    if ('onresume' in document) {
      document.addEventListener('resume', () => {
        this.log(`▶️ App resumida (móvil)`);
      });
    }

    // Detectar cambios de estado de red
    window.addEventListener('online', () => {
      this.log(`🌐 Network online`);
    });

    window.addEventListener('offline', () => {
      this.log(`🌐 Network offline`);
    });

    // Log periódico del estado de la app
    setInterval(() => {
      const visibility = document.visibilityState;
      const hasFocus = document.hasFocus();
      const isOnline = navigator.onLine;
      
      this.log(`📊 Estado: visible=${visibility}, focus=${hasFocus}, online=${isOnline}`);
    }, 10000); // Cada 10 segundos
  }

  private setupUnifiedServiceDebug() {
    // Suscribirse a cambios de estado de conexión
    this.unifiedReconnectionService.connectionState.subscribe(state => {
      this.log(`🔄 Estado de conexión: ${state}`);
    });

    // Suscribirse a eventos de app resumed
    this.unifiedReconnectionService.appResumed.subscribe(resumed => {
      if (resumed) {
        this.log(`✅ App reanudada exitosamente`);
      }
    });

    // Log periódico de estadísticas del servicio unificado
    setInterval(() => {
      const debugInfo = this.unifiedReconnectionService.getDebugInfo();
      this.log(`📈 Stats: intentos=${debugInfo.stats.totalAttempts}, exitosos=${debugInfo.stats.successfulReconnections}, reintentos=${debugInfo.retryCount}`);
    }, 30000); // Cada 30 segundos
  }

  log(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    
    console.log(logEntry);
    
    const currentLogs = this.debugLog$.value;
    const newLogs = [...currentLogs, logEntry];
    
    // Mantener solo los últimos logs
    if (newLogs.length > this.maxLogs) {
      newLogs.splice(0, newLogs.length - this.maxLogs);
    }
    
    this.debugLog$.next(newLogs);
  }

  getLogs() {
    return this.debugLog$.asObservable();
  }

  clearLogs() {
    this.debugLog$.next([]);
  }

  getCurrentLogs() {
    return this.debugLog$.value;
  }

  getUnifiedServiceDebugInfo() {
    return this.unifiedReconnectionService.getDebugInfo();
  }

  getReconnectionStats() {
    return this.unifiedReconnectionService.reconnectionStats;
  }
}
