import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, fromEvent, merge, Subscription } from 'rxjs';
import { SupabaseClientService } from './supabase-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReconnectionService {
  private appResumed$ = new BehaviorSubject<boolean>(false);
  private subscriptions: Subscription[] = [];
  private isProcessingResume = false;
  private lastVisibilityState = document.visibilityState;

  constructor(
    private platform: Platform,
    private ngZone: NgZone,
    private supabaseService: SupabaseClientService
  ) {
    console.log('🔧 ReconnectionService: Inicializando...');
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
    
    console.log('🔧 ReconnectionService: Listeners configurados correctamente');
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
