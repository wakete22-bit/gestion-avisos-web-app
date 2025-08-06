import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
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

  /**
   * Obtiene datos del caché o ejecuta la función si no existe
   */
  getOrSet<T>(
    key: string, 
    fetchFunction: () => Observable<T>, 
    ttl: number = this.DEFAULT_TTL
  ): Observable<T> {
    const cached = this.cache.get(key);
    
    if (cached && !this.isExpired(cached)) {
      console.log(`📦 Cache hit: ${key}`);
      return of(cached.data);
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
   * Limpia elementos expirados del caché
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (this.isExpired(item)) {
        this.cache.delete(key);
      }
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
} 