import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, fromEvent, merge, Subscription, interval } from 'rxjs';
import { SupabaseClientService } from './supabase-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReconnectionService {
  private appResumed$ = new BehaviorSubject<boolean>(false);
  private subscriptions: Subscription[] = [];
  private isProcessingResume = false;
  private lastVisibilityState = document.visibilityState;
  private lastActiveTime = Date.now();
  private isMobile = false;

  constructor(
    private platform: Platform,
    private ngZone: NgZone,
    private supabaseService: SupabaseClientService
  ) {
    console.log('🔧 ReconnectionService: Inicializando...');
    this.isMobile = this.platform.is('mobile') || this.platform.is('hybrid');
    console.log('🔧 ReconnectionService: Es móvil?', this.isMobile);
    this.initReconnectionListeners();
  }

  /**
   * Inicializa los listeners para detectar cuando la app se reanuda
   */
  private initReconnectionListeners() {
    console.log('🔧 ReconnectionService: Configurando listeners...');
    
    // Para PWA en navegador - múltiples eventos para mayor compatibilidad
    const visibilityChange$ = fromEvent(document, 'visibilitychange');
    const focus$ = fromEvent(window, 'focus');
    const blur$ = fromEvent(window, 'blur');
    const pageshow$ = fromEvent(window, 'pageshow');
    const pagehide$ = fromEvent(window, 'pagehide');
    
    // Combinar todos los eventos
    const resumeEvents$ = merge(
      visibilityChange$, 
      focus$, 
      blur$, 
      pageshow$, 
      pagehide$
    );
    
    const resumeSub = resumeEvents$.subscribe((event) => {
      console.log('🔧 ReconnectionService: Evento detectado:', event.type);
      
      if (event.type === 'visibilitychange') {
        const currentState = document.visibilityState;
        console.log('🔧 ReconnectionService: Estado de visibilidad:', this.lastVisibilityState, '->', currentState);
        
        if (this.lastVisibilityState === 'hidden' && currentState === 'visible') {
          console.log('🔧 ReconnectionService: Documento se volvió visible');
          this.handleAppResume();
        }
        this.lastVisibilityState = currentState;
      } else if (event.type === 'focus') {
        console.log('🔧 ReconnectionService: Ventana enfocada');
        this.handleAppResume();
      } else if (event.type === 'pageshow') {
        console.log('🔧 ReconnectionService: Página mostrada');
        this.handleAppResume();
      }
    });
    
    this.subscriptions.push(resumeSub);
    
    // Para app nativa con Capacitor
    if (this.platform.is('hybrid')) {
      console.log('🔧 ReconnectionService: Configurando listeners para app nativa');
      document.addEventListener('resume', () => {
        console.log('🔧 ReconnectionService: App nativa resumida');
        this.handleAppResume();
      });
    }

    // DETECCIÓN ESPECÍFICA PARA MÓVILES
    if (this.isMobile) {
      console.log('🔧 ReconnectionService: Configurando detección específica para móviles');
      this.setupMobileDetection();
    }
    
    console.log('🔧 ReconnectionService: Listeners configurados correctamente');
  }

  /**
   * Configuración específica para detectar reconexión en móviles
   */
  private setupMobileDetection() {
    // 1. Detectar cuando la app vuelve a estar activa usando user activity
    const userActivityEvents = ['touchstart', 'touchend', 'mousedown', 'mousemove', 'keypress', 'scroll'];
    
    userActivityEvents.forEach(eventType => {
      document.addEventListener(eventType, () => {
        this.lastActiveTime = Date.now();
      }, { passive: true });
    });

    // 2. Monitoreo periódico para detectar cuando la app vuelve del background
    const mobileCheckInterval = interval(2000); // Cada 2 segundos
    
    const mobileSub = mobileCheckInterval.subscribe(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - this.lastActiveTime;
      
      // Si han pasado más de 5 segundos sin actividad, probablemente la app estaba en background
      if (timeSinceLastActivity > 5000) {
        // Verificar si ahora hay actividad reciente
        const recentActivity = document.visibilityState === 'visible' && 
                             (document.hasFocus() || window.navigator.onLine);
        
        if (recentActivity) {
          console.log('🔧 ReconnectionService: Móvil detectado como activo tras inactividad');
          this.handleAppResume();
        }
      }
    });

    this.subscriptions.push(mobileSub);

    // 3. Detectar cambios de orientación (útil en móviles)
    window.addEventListener('orientationchange', () => {
      console.log('🔧 ReconnectionService: Cambio de orientación detectado');
      setTimeout(() => {
        this.handleAppResume();
      }, 500);
    });

    // 4. Detectar cuando la ventana se vuelve visible (específico para PWAs móviles)
    if ('onpagevisibilitychange' in document) {
      document.addEventListener('pagevisibilitychange', () => {
        console.log('🔧 ReconnectionService: Page visibility change (móvil)');
        if (document.visibilityState === 'visible') {
          this.handleAppResume();
        }
      });
    }

    // 5. Detectar cuando la app vuelve del estado suspendido (específico para PWAs)
    if ('onfreeze' in document) {
      document.addEventListener('freeze', () => {
        console.log('🔧 ReconnectionService: App congelada (móvil)');
      });
    }

    if ('onresume' in document) {
      document.addEventListener('resume', () => {
        console.log('🔧 ReconnectionService: App resumida (móvil)');
        this.handleAppResume();
      });
    }

    // 6. VERIFICACIÓN AGRESIVA PARA MÓVILES - Verificar conexión cada 10 segundos
    console.log('🔧 ReconnectionService: Configurando verificación agresiva para móviles');
    const aggressiveCheckInterval = interval(10000); // Cada 10 segundos
    
    const aggressiveSub = aggressiveCheckInterval.subscribe(async () => {
      // Solo verificar si la app está visible y activa
      if (document.visibilityState === 'visible' && document.hasFocus()) {
        console.log('🔧 ReconnectionService: Verificación agresiva de conexión (móvil)');
        
        try {
          const isConnected = await this.supabaseService.testConnection(3000);
          if (!isConnected) {
            console.log('🔧 ReconnectionService: Conexión perdida detectada en verificación agresiva');
            this.handleAppResume();
          }
        } catch (error) {
          console.log('🔧 ReconnectionService: Error en verificación agresiva:', error);
        }
      }
    });

    this.subscriptions.push(aggressiveSub);
  }

  /**
   * Maneja cuando la app se reanuda (desde background o pantalla apagada)
   */
  private async handleAppResume() {
    if (this.isProcessingResume) {
      console.log('🔄 Ya se está procesando una reconexión, saltando...');
      return;
    }

    try {
      this.isProcessingResume = true;
      console.log('🔄 App resumed - verificando conexiones...');
      
      this.ngZone.run(async () => {
        try {
          // Verificar conexión Supabase con timeout
          console.log('🔄 Verificando conexión Supabase...');
          const isConnected = await this.supabaseService.testConnection(5000);
          
          if (isConnected) {
            console.log('✅ Supabase connection OK');
            // Notificar que la app se reanudó exitosamente
            this.appResumed$.next(true);
          } else {
            console.log('❌ Supabase connection failed, forcing refresh');
            this.forceAppRefresh();
          }
          
        } catch (error) {
          console.error('❌ Error en verificación de conexión:', error);
          this.forceAppRefresh();
        }
      });
      
    } catch (error) {
      console.error('❌ Error en handleAppResume:', error);
      this.forceAppRefresh();
    } finally {
      this.isProcessingResume = false;
    }
  }

  /**
   * Fuerza el refresh de la app si la reconexión falla
   */
  private forceAppRefresh() {
    console.log('🔄 Forzando refresh de la app...');
    
    // Pequeño delay para evitar refreshes múltiples
    setTimeout(() => {
      try {
        window.location.reload();
      } catch (error) {
        console.error('❌ Error forzando refresh:', error);
      }
    }, 1000);
  }

  /**
   * Obtiene el observable que emite cuando la app se reanuda
   */
  get appResumed() {
    return this.appResumed$.asObservable();
  }

  /**
   * Obtiene el observable del estado de conexión de Supabase
   */
  get connectionStatus() {
    return this.supabaseService.getConnectionStatus();
  }

  /**
   * Limpia los recursos del servicio
   */
  cleanup() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    console.log('🔧 ReconnectionService: Recursos limpiados');
  }
}
