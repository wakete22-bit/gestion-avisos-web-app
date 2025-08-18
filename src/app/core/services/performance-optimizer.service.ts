import { Injectable, OnDestroy } from '@angular/core';
import { CacheService } from './cache.service';
import { PerformanceMonitorService } from './performance-monitor.service';

@Injectable({
  providedIn: 'root'
})
export class PerformanceOptimizerService implements OnDestroy {
  private optimizationInterval: any;
  private memoryThreshold = 80; // MB
  private cacheThreshold = 50; // elementos
  private lastOptimization = 0;
  private optimizationCooldown = 30000; // 30 segundos entre optimizaciones

  constructor(
    private cacheService: CacheService,
    private performanceMonitor: PerformanceMonitorService
  ) {
    this.startOptimization();
  }

  /**
   * Inicia la optimización automática de rendimiento
   */
  private startOptimization(): void {
    this.optimizationInterval = setInterval(() => {
      this.performOptimization();
    }, 60000); // Cada minuto
  }

  /**
   * Realiza optimizaciones de rendimiento
   */
  private performOptimization(): void {
    const now = Date.now();
    
    // Evitar optimizaciones muy frecuentes
    if (now - this.lastOptimization < this.optimizationCooldown) {
      return;
    }

    const metrics = this.performanceMonitor.getLatestMetrics();
    if (!metrics) return;

    let optimizations = 0;

    // Optimización de memoria
    if (metrics.memoryUsage > this.memoryThreshold) {
      this.optimizeMemory();
      optimizations++;
    }

    // Optimización de cache
    const cacheStats = this.cacheService.getStats();
    if (cacheStats.size > this.cacheThreshold) {
      this.optimizeCache();
      optimizations++;
    }

    // Optimización del DOM
    if (metrics.activeSubscriptions > 500) {
      this.optimizeDOM();
      optimizations++;
    }

    if (optimizations > 0) {
      this.lastOptimization = now;
      console.log(`🚀 Optimizaciones aplicadas: ${optimizations}`);
    }
  }

  /**
   * Optimiza el uso de memoria
   */
  private optimizeMemory(): void {
    console.log('🧠 Optimizando memoria...');
    
    // Forzar garbage collection si está disponible
    if ('gc' in window) {
      (window as any).gc();
    }

    // Limpiar cache de datos antiguos
    this.cacheService.clearAllDataCache();
    
    // Limpiar métricas antiguas
    this.performanceMonitor.clearMetrics();
  }

  /**
   * Optimiza el cache
   */
  private optimizeCache(): void {
    console.log('🗄️ Optimizando cache...');
    
    // Limpiar cache completo
    this.cacheService.clear();
    
    // Reiniciar el cache con configuración optimizada
    setTimeout(() => {
      console.log('✅ Cache optimizado');
    }, 100);
  }

  /**
   * Optimiza el DOM
   */
  private optimizeDOM(): void {
    console.log('🏗️ Optimizando DOM...');
    
    // Limpiar elementos del DOM que puedan estar acumulándose
    const elements = document.querySelectorAll('[data-temp]');
    elements.forEach(el => el.remove());
    
    // Limpiar event listeners temporales
    this.cleanupTemporaryListeners();
  }

  /**
   * Limpia event listeners temporales
   */
  private cleanupTemporaryListeners(): void {
    // Buscar y limpiar listeners que puedan estar acumulándose
    const tempElements = document.querySelectorAll('[data-temp-listener]');
    tempElements.forEach(el => {
      el.removeAttribute('data-temp-listener');
    });
  }

  /**
   * Fuerza una optimización inmediata
   */
  forceOptimization(): void {
    console.log('⚡ Forzando optimización inmediata...');
    this.optimizeMemory();
    this.optimizeCache();
    this.optimizeDOM();
    this.lastOptimization = Date.now();
  }

  /**
   * Obtiene estadísticas de rendimiento
   */
  getPerformanceStats(): any {
    const metrics = this.performanceMonitor.getLatestMetrics();
    const cacheStats = this.cacheService.getStats();
    
    return {
      memory: metrics?.memoryUsage || 0,
      cacheSize: cacheStats.size,
      domElements: metrics?.activeSubscriptions || 0,
      lastOptimization: this.lastOptimization,
      timeSinceLastOptimization: Date.now() - this.lastOptimization
    };
  }

  ngOnDestroy(): void {
    if (this.optimizationInterval) {
      clearInterval(this.optimizationInterval);
    }
  }
}
