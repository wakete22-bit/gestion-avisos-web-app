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

  constructor(
    private ngZone: NgZone,
    private supabaseService: SupabaseClientService
  ) {
    console.log('🧠 SmartReconnectionService: Inicializando...');
    this.startHealthMonitoring();
  }

  /**
   * Inicia el monitoreo de salud de la conexión
   */
  private startHealthMonitoring() {
    // Verificar salud de la conexión cada 3 segundos
    this.healthCheckInterval = interval(3000).subscribe(async () => {
      await this.checkConnectionHealth();
    });
  }

  /**
   * Verifica la salud de la conexión de forma inteligente
   */
  private async checkConnectionHealth(): Promise<void> {
    try {
      // Solo verificar si la app está activa
      if (document.visibilityState !== 'visible' || !document.hasFocus()) {
        return;
      }

      const isHealthy = await this.supabaseService.testConnection(1000); // Timeout muy corto
      
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
      console.log(`❌ SmartReconnectionService: ${this.consecutiveFailures} fallos consecutivos, iniciando reconexión inteligente`);
      this.connectionHealth$.next(false);
      this.attemptSmartReconnection();
    }
  }

  /**
   * Intenta una reconexión inteligente
   */
  private async attemptSmartReconnection(): Promise<void> {
    if (this.isReconnecting) {
      console.log('🔄 SmartReconnectionService: Ya se está reconectando, saltando...');
      return;
    }

    try {
      this.isReconnecting = true;
      console.log('🧠 SmartReconnectionService: Iniciando reconexión inteligente...');

      // Estrategia 1: Limpiar conexiones existentes
      await this.clearExistingConnections();
      
      // Estrategia 2: Esperar un momento muy corto
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Estrategia 3: Intentar reconexión con timeout muy corto
      const isReconnected = await this.supabaseService.testConnection(1500);
      
      if (isReconnected) {
        console.log('✅ SmartReconnectionService: Reconexión inteligente exitosa');
        this.handleHealthyConnection();
      } else {
        console.log('❌ SmartReconnectionService: Reconexión inteligente falló, usando estrategia de respaldo');
        await this.fallbackReconnectionStrategy();
      }
      
    } catch (error) {
      console.error('❌ Error en reconexión inteligente:', error);
      await this.fallbackReconnectionStrategy();
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
   * Estrategia de respaldo para reconexión
   */
  private async fallbackReconnectionStrategy(): Promise<void> {
    console.log('🔄 SmartReconnectionService: Usando estrategia de respaldo...');
    
    try {
      // Último intento: refresh de la página
      console.log('🔄 SmartReconnectionService: Forzando refresh como último recurso');
      window.location.reload();
    } catch (error) {
      console.error('❌ Error en estrategia de respaldo:', error);
    }
  }

  /**
   * Fuerza una verificación de conexión inmediata
   */
  public async forceConnectionCheck(): Promise<boolean> {
    console.log('🧠 SmartReconnectionService: Verificación forzada de conexión...');
    
    try {
      const isHealthy = await this.supabaseService.testConnection(2000);
      
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
