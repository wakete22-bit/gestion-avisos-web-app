import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos por defecto
  private cleanupInterval: any;

  constructor() {
    // Iniciar limpieza automática cada 2 minutos
    this.startAutoCleanup();
  }

  /**
   * Inicia la limpieza automática del cache
   */
  private startAutoCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
      console.log('🧹 Limpieza automática de cache completada');
    }, 2 * 60 * 1000); // Cada 2 minutos
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
   * Obtiene datos del caché o los obtiene de la función de fetch si no están en caché
   */
  getOrSet<T>(
    key: string, 
    fetchFunction: () => Observable<T>, 
    ttl: number = this.DEFAULT_TTL
  ): Observable<T> {
    const cached = this.get<T>(key);
    if (cached) {
      console.log(`✅ Cache hit: ${key}`);
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    console.log(`🔄 Cache miss: ${key}`);
    return fetchFunction().pipe(
      tap(data => {
        this.set(key, data, ttl);
      }),
      catchError(error => {
        console.error(`❌ Error fetching data for key ${key}:`, error);
        throw error;
      })
    );
  }

  /**
   * Establece un valor en el caché
   */
  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    // Verificar si el cache está muy lleno
    if (this.cache.size > 100) {
      console.warn('⚠️ Cache muy lleno, limpiando elementos antiguos...');
      this.cleanup();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Obtiene un valor del caché
   */
  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }
    return null;
  }

  /**
   * Elimina un elemento del caché
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Limpia todo el caché
   */
  clear(): void {
    this.cache.clear();
    console.log('🗑️ Cache completamente limpiado');
  }

  /**
   * Limpia elementos del caché que coincidan con un prefijo
   */
  clearCache(prefix: string): void {
    const keysToDelete: string[] = [];
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => this.cache.delete(key));
    console.log(`🗑️ Cleared cache for prefix: ${prefix} (${keysToDelete.length} items)`);
  }

  /**
   * Limpia cache de múltiples módulos a la vez
   */
  clearMultipleCaches(prefixes: string[]): void {
    prefixes.forEach(prefix => this.clearCache(prefix));
    console.log(`🗑️ Cleared multiple caches: ${prefixes.join(', ')}`);
  }

  /**
   * Limpia todo el cache relacionado con datos dinámicos
   */
  clearAllDataCache(): void {
    const dataPrefixes = [
      'avisos',
      'presupuestos', 
      'facturas',
      'inventario',
      'clientes',
      'tecnicos',
      'dashboard'
    ];
    this.clearMultipleCaches(dataPrefixes);
  }

  /**
   * Limpia elementos expirados del caché
   */
  cleanup(): void {
    const now = Date.now();
    let expiredCount = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (this.isExpired(item)) {
        this.cache.delete(key);
        expiredCount++;
      }
    }
    
    if (expiredCount > 0) {
      console.log(`🧹 Limpiados ${expiredCount} elementos expirados del cache`);
    }
  }

  /**
   * Verifica si un elemento del caché ha expirado
   */
  private isExpired(item: CacheItem<any>): boolean {
    return Date.now() - item.timestamp > item.ttl;
  }

  /**
   * Obtiene estadísticas del caché
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  /**
   * Genera una clave de caché basada en parámetros
   */
  generateKey(prefix: string, params: any): string {
    const paramString = JSON.stringify(params);
    return `${prefix}:${paramString}`;
  }

  /**
   * Limpia recursos al destruir el servicio
   */
  ngOnDestroy(): void {
    this.stopAutoCleanup();
    this.clear();
  }
} 