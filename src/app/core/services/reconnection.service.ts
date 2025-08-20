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

  constructor(
    private platform: Platform,
    private ngZone: NgZone,
    private supabaseService: SupabaseClientService
  ) {
    this.initReconnectionListeners();
  }

  /**
   * Inicializa los listeners para detectar cuando la app se reanuda
   */
  private initReconnectionListeners() {
    if (this.platform.is('hybrid')) {
      // Para app nativa con Capacitor
      document.addEventListener('resume', () => this.handleAppResume());
    } else {
      // Para PWA en navegador
      const visibilityChange$ = fromEvent(document, 'visibilitychange');
      const focus$ = fromEvent(window, 'focus');
      
      const resumeEvents$ = merge(visibilityChange$, focus$);
      
      const resumeSub = resumeEvents$.subscribe(() => {
        if (!document.hidden) {
          this.handleAppResume();
        }
      });
      
      this.subscriptions.push(resumeSub);
    }
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
