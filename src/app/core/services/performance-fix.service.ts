import { Injectable, OnDestroy } from '@angular/core';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class PerformanceFixService implements OnDestroy {
  private cleanupInterval: any;

  constructor(private cacheService: CacheService) {
    // Limpieza automática cada 30 segundos para prevenir acumulación
    this.cleanupInterval = setInterval(() => {
      this.performCleanup();
    }, 30000);
  }

  /**
   * Realiza limpieza preventiva para mantener el rendimiento
   */
  private performCleanup(): void {
    // Limpiar cache automáticamente
    this.cacheService.clearAllDataCache();
    
    // Limpiar elementos temporales del DOM
    this.cleanupTemporaryElements();
    
    // Forzar garbage collection si está disponible
    this.forceGarbageCollection();
  }

  /**
   * Limpia elementos temporales del DOM
   */
  private cleanupTemporaryElements(): void {
    try {
      // Limpiar elementos que puedan estar acumulándose
      const tempElements = document.querySelectorAll('[data-temp], [data-temp-listener]');
      tempElements.forEach(el => el.remove());
      
      // Limpiar elementos con clases temporales
      const tempClassElements = document.querySelectorAll('.temp-element, .temp-listener');
      tempClassElements.forEach(el => el.remove());
    } catch (error) {
      // Silenciar errores para no afectar la funcionalidad
    }
  }

  /**
   * Fuerza la recolección de basura si está disponible
   */
  private forceGarbageCollection(): void {
    if ('gc' in window) {
      try {
        (window as any).gc();
      } catch (error) {
        // Silenciar errores
      }
    }
  }

  /**
   * Fuerza una limpieza inmediata (útil cuando se detecta lentitud)
   */
  forceCleanup(): void {
    this.performCleanup();
  }

  ngOnDestroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}
