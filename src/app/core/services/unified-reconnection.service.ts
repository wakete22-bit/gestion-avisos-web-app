import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, fromEvent, interval, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { SupabaseClientService } from './supabase-client.service';
import { ConnectionDebugService } from './connection-debug.service';

export type ConnectionState = 'connected' | 'disconnected' | 'reconnecting';

export interface ReconnectionStats {
  totalAttempts: number;
  successfulReconnections: number;
  lastReconnectionTime: number;
  currentRetryCount: number;
  averageReconnectionTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class UnifiedReconnectionService {
  private connectionState$ = new BehaviorSubject<ConnectionState>('connected');
  private appResumed$ = new BehaviorSubject<boolean>(false);
  private reconnectingFlag = false;
  private retryCount = 0;
  private maxRetries = 5; // Más intentos que antes
  private baseDelay = 2000; // 2 segundos base (más conservador)
  private lastReconnectionAttempt = 0;
  private minReconnectionInterval = 10000; // Mínimo 10 segundos entre reconexiones
  private subscriptions: Subscription[] = [];
  
  // Estadísticas para debug
  private stats: ReconnectionStats = {
    totalAttempts: 0,
    successfulReconnections: 0,
    lastReconnectionTime: 0,
    currentRetryCount: 0,
    averageReconnectionTime: 0
  };

  constructor(
    private supabaseService: SupabaseClientService,
    private ngZone: NgZone,
    private platform: Platform,
    private connectionDebug: ConnectionDebugService
  ) {
    console.log('🔄 UnifiedReconnectionService: Inicializando sistema unificado...');
    console.log('📱 Plataforma detectada:', {
      mobile: this.platform.is('mobile'),
      hybrid: this.platform.is('hybrid'),
      pwa: this.platform.is('pwa'),
      ios: this.platform.is('ios'),
      android: this.platform.is('android')
    });
    
    this.setupIntelligentReconnection();
  }

  /**
   * Configura el sistema inteligente de reconexión
   */
  private setupIntelligentReconnection() {
    console.log('🔧 Configurando listeners de reconexión inteligente...');

    // ÚNICO LISTENER PRINCIPAL - visibilitychange con debounce inteligente
    const visibilityChange$ = fromEvent(document, 'visibilitychange').pipe(
      debounceTime(1000), // Debounce de 1 segundo para evitar múltiples disparos
      distinctUntilChanged(),
      filter(() => {
        const isVisible = document.visibilityState === 'visible';
        console.log('👁️ Cambio de visibilidad:', document.visibilityState);
        return isVisible;
      })
    );

    const visibilitySub = visibilityChange$.subscribe(() => {
      this.handleAppResume();
    });
    
    this.subscriptions.push(visibilitySub);

    // Health check MUY conservador - cada 5 minutos y solo cuando es necesario
    const healthCheck$ = interval(300000).pipe( // 5 minutos
      filter(() => {
        const shouldCheck = document.visibilityState === 'visible' && 
                          !this.reconnectingFlag &&
                          Date.now() - this.lastReconnectionAttempt > this.minReconnectionInterval;
        
        if (!shouldCheck) {
          console.log('🏥 Health check omitido:', {
            visible: document.visibilityState === 'visible',
            reconnecting: this.reconnectingFlag,
            timeSinceLastAttempt: Date.now() - this.lastReconnectionAttempt
          });
        }
        
        return shouldCheck;
      })
    );

    const healthSub = healthCheck$.subscribe(() => {
      console.log('🏥 Health check programado ejecutándose...');
      this.checkConnectionHealth();
    });
    
    this.subscriptions.push(healthSub);

    // Para apps nativas con Capacitor
    if (this.platform.is('hybrid')) {
      this.setupCapacitorListeners();
    }

    // Listener para eventos de red
    this.setupNetworkListeners();

    console.log('✅ Sistema de reconexión configurado correctamente');
  }

  /**
   * Configura listeners específicos para Capacitor
   */
  private setupCapacitorListeners() {
    console.log('📱 Configurando listeners para app nativa...');
    
    document.addEventListener('resume', () => {
      console.log('📱 App nativa resumida - disparando reconexión');
      this.handleAppResume();
    });

    document.addEventListener('pause', () => {
      console.log('📱 App nativa pausada');
    });
  }

  /**
   * Configura listeners de red
   */
  private setupNetworkListeners() {
    window.addEventListener('online', () => {
      console.log('🌐 Red disponible - verificando conexión');
      // Esperar un momento para que la red se estabilice
      setTimeout(() => {
        this.handleAppResume();
      }, 2000);
    });

    window.addEventListener('offline', () => {
      console.log('🌐 Red no disponible');
      this.connectionState$.next('disconnected');
    });
  }

  /**
   * Maneja cuando la app se reanuda
   */
  private async handleAppResume() {
    const now = Date.now();
    
    // Evitar reconexiones muy frecuentes
    if (now - this.lastReconnectionAttempt < this.minReconnectionInterval) {
      console.log('🔄 Reconexión ignorada - muy reciente:', {
        timeSinceLastAttempt: now - this.lastReconnectionAttempt,
        minimumInterval: this.minReconnectionInterval
      });
      return;
    }

    if (this.reconnectingFlag) {
      console.log('🔄 Reconexión ya en progreso - ignorando');
      return;
    }

    console.log('🔄 Iniciando proceso de reconexión...');
    this.lastReconnectionAttempt = now;
    this.reconnectingFlag = true;
    this.connectionState$.next('reconnecting');
    this.stats.totalAttempts++;

    const reconnectionStartTime = Date.now();

    try {
      const success = await this.attemptReconnectionWithIntelligentBackoff();
      
      if (success) {
        this.connectionState$.next('connected');
        this.appResumed$.next(true);
        this.retryCount = 0;
        this.stats.successfulReconnections++;
        this.stats.lastReconnectionTime = Date.now();
        
        const reconnectionTime = Date.now() - reconnectionStartTime;
        this.updateAverageReconnectionTime(reconnectionTime);
        
        console.log('✅ Reconexión exitosa en', reconnectionTime, 'ms');
      } else {
        this.connectionState$.next('disconnected');
        console.log('❌ Reconexión falló después de todos los intentos');
        
        // EJECUTAR DIAGNÓSTICO COMPLETO antes de refresh
        console.log('🩺 Ejecutando diagnóstico completo...');
        await this.connectionDebug.runCompleteDiagnostic();
        
        // SOLO refresh después de MUCHOS fallos consecutivos
        if (this.retryCount >= this.maxRetries) {
          console.log('❌ Múltiples fallos consecutivos - considerando refresh');
          await this.considerForceRefresh();
        }
      }
    } catch (error) {
      console.error('❌ Error crítico en reconexión:', error);
      this.connectionState$.next('disconnected');
    } finally {
      this.reconnectingFlag = false;
      this.stats.currentRetryCount = this.retryCount;
    }
  }

  /**
   * Intenta reconexión con backoff exponencial inteligente
   */
  private async attemptReconnectionWithIntelligentBackoff(): Promise<boolean> {
    console.log('🔄 Iniciando reconexión con backoff inteligente...');
    
    // Pequeño delay inicial para evitar race conditions con auth locks
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        console.log(`🔄 Intento ${attempt + 1}/${this.maxRetries}`);
        
        // Timeouts más realistas para conexiones DB: 3s, 4s, 5s, 6s, 7s
        const timeout = 3000 + (attempt * 1000);
        console.log(`⏱️ Timeout para este intento: ${timeout}ms`);
        
        // Test de conexión ligero
        const isConnected = await this.testLightweightConnection(timeout);
        
        if (isConnected) {
          console.log('✅ Conexión restaurada en intento', attempt + 1);
          
          // 🔧 CRÍTICO: Resetear cliente Supabase para que funcionen las queries posteriores
          console.log('🔧 Reseteando cliente Supabase después de reconexión exitosa...');
          this.supabaseService.resetClientAfterReconnection();
          
          return true;
        }
        
        // Si no es el último intento, esperar con backoff exponencial
        if (attempt < this.maxRetries - 1) {
          // Backoff exponencial con jitter para evitar thundering herd
          const baseDelay = this.baseDelay * Math.pow(1.5, attempt);
          const jitter = Math.random() * 1000; // Jitter de hasta 1 segundo
          const delay = baseDelay + jitter;
          
          console.log(`⏳ Esperando ${Math.round(delay)}ms antes del siguiente intento`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
      } catch (error) {
        console.warn(`❌ Intento ${attempt + 1} falló:`, (error as Error).message || error);
      }
    }
    
    this.retryCount++;
    console.log('❌ Todos los intentos de reconexión fallaron');
    return false;
  }

  /**
   * Test de conexión DIRECTO - BYPASA SUPABASE CLIENT COMPLETAMENTE
   */
  private async testLightweightConnection(timeout: number): Promise<boolean> {
    console.log('🔍 INICIANDO test de conexión DIRECTO con timeout:', timeout, 'ms');
    
    try {
      // USAR EL TEST ALTERNATIVO QUE FUNCIONA
      return await this.connectionDebug.testAlternativeConnection();
    } catch (error) {
      console.error('🔍 EXCEPCIÓN en test de conexión DIRECTO:', {
        message: (error as Error).message,
        stack: (error as Error).stack,
        name: (error as Error).name,
        fullError: error
      });
      return false;
    }
  }

  /**
   * Verifica la salud de la conexión de forma periódica
   */
  private async checkConnectionHealth() {
    try {
      console.log('🏥 Verificando salud de la conexión...');
      const isHealthy = await this.testLightweightConnection(8000);
      
      if (!isHealthy) {
        console.log('🏥 Conexión no saludable - iniciando reconexión');
        await this.handleAppResume();
      } else {
        console.log('🏥 Conexión saludable');
      }
    } catch (error) {
      console.warn('🏥 Error en verificación de salud:', error);
    }
  }

  /**
   * Considera hacer refresh como último recurso
   */
  private async considerForceRefresh() {
    console.log('🔄 Evaluando necesidad de refresh completo...');
    
    // Última verificación antes del refresh con timeout muy generoso
    try {
      console.log('🔄 Última verificación antes del refresh...');
      const isConnected = await this.testLightweightConnection(15000);
      
      if (isConnected) {
        console.log('✅ Conexión restaurada en última verificación - cancelando refresh');
        this.connectionState$.next('connected');
        this.appResumed$.next(true);
        this.retryCount = 0;
        return;
      }
    } catch (error) {
      console.error('❌ Test final falló:', error);
    }

    // Verificar si estamos en línea antes del refresh
    if (!navigator.onLine) {
      console.log('🌐 Sin conexión de red - no hacer refresh');
      return;
    }

    // Solo refresh como ÚLTIMO recurso con advertencia
    console.warn('🔄 ÚLTIMO RECURSO: Programando refresh completo en 5 segundos...');
    console.warn('📊 Estadísticas de reconexión:', this.stats);
    
    // Dar tiempo para que el usuario vea el mensaje
    setTimeout(() => {
      console.warn('🔄 Ejecutando refresh completo...');
      window.location.reload();
    }, 5000);
  }

  /**
   * Actualiza el tiempo promedio de reconexión
   */
  private updateAverageReconnectionTime(newTime: number) {
    if (this.stats.successfulReconnections === 1) {
      this.stats.averageReconnectionTime = newTime;
    } else {
      // Promedio móvil simple
      this.stats.averageReconnectionTime = 
        (this.stats.averageReconnectionTime + newTime) / 2;
    }
  }

  // =================== API PÚBLICA ===================

  /**
   * Observable del estado de conexión
   */
  get connectionState() {
    return this.connectionState$.asObservable();
  }

  /**
   * Observable que emite cuando la app se reanuda exitosamente
   */
  get appResumed() {
    return this.appResumed$.asObservable();
  }

  /**
   * Verifica si está conectado actualmente
   */
  get isConnected() {
    return this.connectionState$.value === 'connected';
  }

  /**
   * Verifica si está reconectando actualmente
   */
  get isReconnecting() {
    return this.connectionState$.value === 'reconnecting';
  }

  /**
   * Obtiene estadísticas de reconexión
   */
  get reconnectionStats(): ReconnectionStats {
    return { ...this.stats };
  }

  /**
   * Fuerza una verificación de conexión manual
   */
  async forceConnectionCheck(): Promise<boolean> {
    if (this.reconnectingFlag) {
      console.log('🔄 Ya hay una reconexión en progreso');
      return false;
    }
    
    console.log('🔄 Verificación de conexión forzada solicitada');
    
    try {
      const isConnected = await this.testLightweightConnection(10000);
      this.connectionState$.next(isConnected ? 'connected' : 'disconnected');
      
      if (!isConnected) {
        console.log('🔄 Conexión falló - iniciando reconexión automática');
        this.handleAppResume();
      }
      
      return isConnected;
    } catch (error) {
      console.error('❌ Error en verificación forzada:', error);
      this.connectionState$.next('disconnected');
      return false;
    }
  }

  /**
   * Reinicia el contador de reintentos (útil después de una conexión exitosa manual)
   */
  resetRetryCount() {
    this.retryCount = 0;
    console.log('🔄 Contador de reintentos reiniciado');
  }

  /**
   * Limpia recursos al destruir el servicio
   */
  cleanup() {
    console.log('🧹 Limpiando recursos de UnifiedReconnectionService...');
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  /**
   * Obtiene información de debug del sistema
   */
  getDebugInfo() {
    return {
      connectionState: this.connectionState$.value,
      isReconnecting: this.reconnectingFlag,
      retryCount: this.retryCount,
      lastReconnectionAttempt: this.lastReconnectionAttempt,
      stats: this.stats,
      platform: {
        mobile: this.platform.is('mobile'),
        hybrid: this.platform.is('hybrid'),
        pwa: this.platform.is('pwa')
      },
      network: {
        online: navigator.onLine,
        effectiveType: (navigator as any).connection?.effectiveType,
        downlink: (navigator as any).connection?.downlink
      },
      document: {
        visibilityState: document.visibilityState,
        hasFocus: document.hasFocus()
      }
    };
  }
}
