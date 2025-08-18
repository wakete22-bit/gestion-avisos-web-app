import { Injectable, OnDestroy } from '@angular/core';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryCleanupService implements OnDestroy {
  private cleanupInterval: any;
  private readonly CLEANUP_INTERVAL = 45000; // 45 segundos
  private readonly MEMORY_THRESHOLD = 70; // MB

  constructor(private cacheService: CacheService) {
    this.startAutomaticCleanup();
  }

  /**
   * Inicia la limpieza automática de memoria
   */
  private startAutomaticCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      this.performMemoryCleanup();
    }, this.CLEANUP_INTERVAL);
  }

  /**
   * Realiza limpieza de memoria
   */
  private performMemoryCleanup(): void {
    const memoryUsage = this.getMemoryUsage();
    
    if (memoryUsage > this.MEMORY_THRESHOLD) {
      console.log(`🧹 Limpieza de memoria iniciada (uso actual: ${memoryUsage.toFixed(2)}MB)`);
      
      // Limpiar cache
      this.cacheService.clearAllDataCache();
      
      // Limpiar elementos temporales del DOM
      this.cleanupTemporaryElements();
      
      // Forzar garbage collection si está disponible
      this.forceGarbageCollection();
      
      console.log('✅ Limpieza de memoria completada');
    }
  }

  /**
   * Obtiene el uso actual de memoria
   */
  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024;
    }
    return 0;
  }

  /**
   * Limpia elementos temporales del DOM
   */
  private cleanupTemporaryElements(): void {
    // Limpiar elementos con atributos temporales
    const tempElements = document.querySelectorAll('[data-temp], [data-temp-listener]');
    tempElements.forEach(el => el.remove());
    
    // Limpiar elementos con clases temporales
    const tempClassElements = document.querySelectorAll('.temp-element, .temp-listener');
    tempClassElements.forEach(el => el.remove());
  }

  /**
   * Fuerza la recolección de basura si está disponible
   */
  private forceGarbageCollection(): void {
    if ('gc' in window) {
      try {
        (window as any).gc();
        console.log('🗑️ Garbage collection forzada');
      } catch (error) {
        console.warn('No se pudo forzar garbage collection:', error);
      }
    }
  }

  /**
   * Fuerza una limpieza inmediata
   */
  forceCleanup(): void {
    console.log('⚡ Forzando limpieza de memoria...');
    this.performMemoryCleanup();
  }

  /**
   * Obtiene estadísticas de memoria
   */
  getMemoryStats(): any {
    const memoryUsage = this.getMemoryUsage();
    const cacheStats = this.cacheService.getStats();
    
    return {
      memoryUsage: memoryUsage,
      memoryThreshold: this.MEMORY_THRESHOLD,
      cacheSize: cacheStats.size,
      isAboveThreshold: memoryUsage > this.MEMORY_THRESHOLD,
      lastCleanup: Date.now()
    };
  }

  ngOnDestroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}
