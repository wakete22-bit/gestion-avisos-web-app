import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class DataUpdateService {

  constructor(private cacheService: CacheService) {}

  /**
   * Notifica que se ha creado un nuevo elemento
   * Limpia el cache relacionado para forzar recarga
   */
  notifyCreated(module: string): void {
    console.log(`🆕 Notifying creation in module: ${module}`);
    this.clearModuleCache(module);
  }

  /**
   * Notifica que se ha actualizado un elemento
   * Limpia el cache relacionado para forzar recarga
   */
  notifyUpdated(module: string): void {
    console.log(`🔄 Notifying update in module: ${module}`);
    this.clearModuleCache(module);
  }

  /**
   * Notifica que se ha eliminado un elemento
   * Limpia el cache relacionado para forzar recarga
   */
  notifyDeleted(module: string): void {
    console.log(`🗑️ Notifying deletion in module: ${module}`);
    this.clearModuleCache(module);
  }

  /**
   * Limpia el cache de un módulo específico
   */
  private clearModuleCache(module: string): void {
    this.cacheService.clearCache(module);
  }

  /**
   * Limpia todo el cache de datos dinámicos
   * Útil cuando se hacen cambios que afectan a múltiples módulos
   */
  clearAllDataCache(): void {
    console.log('🧹 Clearing all data cache');
    this.cacheService.clearAllDataCache();
  }

  /**
   * Limpia cache de múltiples módulos
   * Útil cuando una operación afecta a varios módulos
   */
  clearMultipleModules(modules: string[]): void {
    console.log(`🧹 Clearing cache for modules: ${modules.join(', ')}`);
    this.cacheService.clearMultipleCaches(modules);
  }
} 