import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { PerformanceMonitorService } from './performance-monitor.service';

@Injectable({
  providedIn: 'root'
})
export class CacheCleanupService {
  private cleanupInterval: any;

  constructor(
    private cacheService: CacheService,
    private performanceMonitor: PerformanceMonitorService
  ) {
    // Iniciar limpieza automática cada 10 minutos
    this.startAutoCleanup();
  }

  /**
   * Inicia la limpieza automática
   */
  private startAutoCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      this.performCleanup();
    }, 10 * 60 * 1000); // Cada 10 minutos
  }

  /**
   * Detiene la limpieza automática
   */
  private stopAutoCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Realiza limpieza completa de cache y recursos
   */
  performCleanup(): void {
    console.log('🧹 Iniciando limpieza de cache y recursos...');

    // Limpiar cache de datos dinámicos
    this.cacheService.clearAllDataCache();

    // Limpiar localStorage si es muy grande
    this.cleanupLocalStorage();

    // Forzar garbage collection si está disponible
    this.forceGarbageCollection();

    // Limpiar métricas de rendimiento antiguas
    this.performanceMonitor.clearMetrics();

    console.log('✅ Limpieza completada');
  }

  /**
   * Limpia localStorage si es muy grande
   */
  private cleanupLocalStorage(): void {
    try {
      const localStorageSize = JSON.stringify(localStorage).length;
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (localStorageSize > maxSize) {
        console.warn(`⚠️ localStorage muy grande (${(localStorageSize / 1024 / 1024).toFixed(2)}MB), limpiando...`);
        
        // Mantener solo las claves esenciales
        const essentialKeys = ['supabase.auth.token', 'user_preferences'];
        const keysToRemove: string[] = [];

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && !essentialKeys.includes(key)) {
            keysToRemove.push(key);
          }
        }

        // Remover claves no esenciales
        keysToRemove.forEach(key => localStorage.removeItem(key));
        console.log(`🗑️ Removidas ${keysToRemove.length} claves de localStorage`);
      }
    } catch (error) {
      console.warn('Error al limpiar localStorage:', error);
    }
  }

  /**
   * Fuerza garbage collection si está disponible
   */
  private forceGarbageCollection(): void {
    if ('gc' in window) {
      try {
        (window as any).gc();
        console.log('♻️ Garbage collection forzada');
      } catch (error) {
        console.warn('Error al forzar garbage collection:', error);
      }
    }
  }

  /**
   * Limpia cache específico de un módulo
   */
  cleanupModuleCache(moduleName: string): void {
    this.cacheService.clearCache(moduleName);
    console.log(`🗑️ Cache del módulo ${moduleName} limpiado`);
  }

  /**
   * Limpia todos los caches
   */
  cleanupAllCaches(): void {
    this.cacheService.clear();
    console.log('🗑️ Todos los caches limpiados');
  }

  /**
   * Limpia recursos al destruir el servicio
   */
  ngOnDestroy(): void {
    this.stopAutoCleanup();
  }
} 