import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { SupabaseClientService } from './supabase-client.service';

@Injectable({
  providedIn: 'root'
})
export class SmartReconnectionService {
  private connectionHealth$ = new BehaviorSubject<boolean>(true);
  private isReconnecting = false;
  private healthCheckInterval: Subscription | null = null;
  private lastSuccessfulConnection = Date.now();
  private consecutiveFailures = 0;
  private maxFailures = 3;
  private lastHealthCheck = 0;
  private minHealthCheckInterval = 30000; // Mínimo 30 segundos entre checks

  constructor(
    private ngZone: NgZone,
    private supabaseService: SupabaseClientService
  ) {
    console.log('🧠 SmartReconnectionService: Inicializando (modo silencioso)...');
    this.startHealthMonitoring();
  }

  /**
   * Inicia el monitoreo de salud de la conexión
   */
  private startHealthMonitoring() {
    // Verificar salud de la conexión cada 30 segundos (mucho menos agresivo)
    this.healthCheckInterval = interval(30000).subscribe(async () => {
      await this.checkConnectionHealth();
    });
  }

  /**
   * Verifica la salud de la conexión de forma inteligente
   */
  private async checkConnectionHealth(): Promise<void> {
    try {
      const now = Date.now();
      
      // Verificar si ha pasado suficiente tiempo desde el último health check
      if (now - this.lastHealthCheck < this.minHealthCheckInterval) {
        return;
      }
      
      this.lastHealthCheck = now;
      
      // Solo verificar si la app está activa Y no se está reconectando
      if (document.visibilityState !== 'visible' || 
          !document.hasFocus() || 
          this.isReconnecting) {
        return;
      }

      // Solo verificar si han pasado más de 2 minutos desde la última conexión exitosa
      const timeSinceLastConnection = now - this.lastSuccessfulConnection;
      if (timeSinceLastConnection < 120000) { // 2 minutos
        return;
      }

      console.log('🧠 SmartReconnectionService: Verificación de salud programada...');
      const isHealthy = await this.supabaseService.testConnection(3000); // Timeout más largo
      
      if (isHealthy) {
        this.handleHealthyConnection();
      } else {
        this.handleUnhealthyConnection();
      }
      
    } catch (error) {
      console.error('❌ Error en health check:', error);
      this.handleUnhealthyConnection();
    }
  }

  /**
   * Maneja cuando la conexión está saludable
   */
  private handleHealthyConnection(): void {
    this.consecutiveFailures = 0;
    this.lastSuccessfulConnection = Date.now();
    
    if (!this.connectionHealth$.value) {
      console.log('✅ SmartReconnectionService: Conexión restaurada');
      this.connectionHealth$.next(true);
    }
  }

  /**
   * Maneja cuando la conexión no está saludable
   */
  private handleUnhealthyConnection(): void {
    this.consecutiveFailures++;
    
    if (this.consecutiveFailures >= this.maxFailures) {
      console.log(`❌ SmartReconnectionService: ${this.consecutiveFailures} fallos consecutivos, iniciando reconexión silenciosa`);
      this.connectionHealth$.next(false);
      this.attemptSilentReconnection();
    }
  }

  /**
   * Intenta una reconexión silenciosa (sin interrumpir al usuario)
   */
  private async attemptSilentReconnection(): Promise<void> {
    if (this.isReconnecting) {
      console.log('🔄 SmartReconnectionService: Ya se está reconectando, saltando...');
      return;
    }

    try {
      this.isReconnecting = true;
      console.log('🧠 SmartReconnectionService: Iniciando reconexión silenciosa...');

      // Estrategia 1: Limpiar conexiones existentes
      await this.clearExistingConnections();
      
      // Estrategia 2: Esperar un momento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Estrategia 3: Intentar reconexión silenciosa
      const isReconnected = await this.supabaseService.testConnection(5000);
      
      if (isReconnected) {
        console.log('✅ SmartReconnectionService: Reconexión silenciosa exitosa');
        this.handleHealthyConnection();
      } else {
        console.log('❌ SmartReconnectionService: Reconexión silenciosa falló, notificando a la app');
        // En lugar de refresh, notificar a la app para que maneje la reconexión
        this.connectionHealth$.next(false);
      }
      
    } catch (error) {
      console.error('❌ Error en reconexión silenciosa:', error);
      this.connectionHealth$.next(false);
    } finally {
      this.isReconnecting = false;
    }
  }

  /**
   * Limpia las conexiones existentes
   */
  private async clearExistingConnections(): Promise<void> {
    try {
      const client = this.supabaseService.getClient();
      client.removeAllChannels();
      console.log('🧠 SmartReconnectionService: Conexiones existentes limpiadas');
    } catch (error) {
      console.warn('⚠️ Error limpiando conexiones:', error);
    }
  }

  /**
   * Fuerza una verificación de conexión inmediata (solo cuando se solicita)
   */
  public async forceConnectionCheck(): Promise<boolean> {
    console.log('🧠 SmartReconnectionService: Verificación forzada solicitada...');
    
    try {
      const isHealthy = await this.supabaseService.testConnection(5000);
      
      if (isHealthy) {
        this.handleHealthyConnection();
      } else {
        this.handleUnhealthyConnection();
      }
      
      return isHealthy;
    } catch (error) {
      console.error('❌ Error en verificación forzada:', error);
      this.handleUnhealthyConnection();
      return false;
    }
  }

  /**
   * Obtiene el observable del estado de salud de la conexión
   */
  get connectionHealth() {
    return this.connectionHealth$.asObservable();
  }

  /**
   * Obtiene si la conexión está saludable
   */
  get isConnectionHealthy(): boolean {
    return this.connectionHealth$.value;
  }

  /**
   * Limpia los recursos del servicio
   */
  cleanup() {
    if (this.healthCheckInterval) {
      this.healthCheckInterval.unsubscribe();
    }
    console.log('🧠 SmartReconnectionService: Recursos limpiados');
  }
}
