import {
  Injectable,
  Observable,
  catchError,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable
} from "./chunk-ANYKLJQR.js";

// src/app/core/config/performance.config.ts
var PERFORMANCE_CONFIG = {
  // Configuración de cache
  CACHE: {
    DEFAULT_TTL: 2 * 60 * 1e3,
    // 2 minutos
    MAX_SIZE: 25,
    CLEANUP_INTERVAL: 30 * 1e3
    // 30 segundos
  },
  // Configuración de limpieza de memoria
  MEMORY: {
    CLEANUP_INTERVAL: 30 * 1e3,
    // 30 segundos
    FORCE_CLEANUP_INTERVAL: 2 * 60 * 1e3
    // 2 minutos
  },
  // Configuración de observables
  OBSERVABLES: {
    MAX_SUBSCRIPTIONS: 20,
    CLEANUP_INTERVAL: 45 * 1e3
    // 45 segundos
  },
  // Configuración de HTTP
  HTTP: {
    MAX_CONCURRENT_REQUESTS: 5,
    REQUEST_TIMEOUT: 30 * 1e3
    // 30 segundos
  },
  // Configuración de Supabase
  SUPABASE: {
    EVENTS_PER_SECOND: 2,
    MAX_RETRIES: 2
  },
  // Configuración de paginación
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 15,
    MAX_PAGE_SIZE: 25
  }
};

// src/app/core/services/cache.service.ts
var _CacheService = class _CacheService {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.DEFAULT_TTL = PERFORMANCE_CONFIG.CACHE.DEFAULT_TTL;
    this.MAX_CACHE_SIZE = PERFORMANCE_CONFIG.CACHE.MAX_SIZE;
    this.startAutoCleanup();
  }
  /**
   * Inicia la limpieza automática del cache
   */
  startAutoCleanup() {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, PERFORMANCE_CONFIG.CACHE.CLEANUP_INTERVAL);
  }
  /**
   * Detiene la limpieza automática
   */
  stopAutoCleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
  /**
   * Obtiene datos del caché o los obtiene de la función de fetch si no están en caché
   */
  getOrSet(key, fetchFunction, ttl = this.DEFAULT_TTL) {
    const cached = this.get(key);
    if (cached) {
      console.log(`\u2705 Cache hit: ${key}`);
      return new Observable((observer) => {
        observer.next(cached);
        observer.complete();
      });
    }
    console.log(`\u{1F504} Cache miss: ${key}`);
    return fetchFunction().pipe(tap((data) => {
      this.set(key, data, ttl);
    }), catchError((error) => {
      console.error(`\u274C Error fetching data for key ${key}:`, error);
      throw error;
    }));
  }
  /**
   * Establece un valor en el caché
   */
  set(key, data, ttl = this.DEFAULT_TTL) {
    if (this.cache.size > this.MAX_CACHE_SIZE) {
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
  get(key) {
    const cached = this.cache.get(key);
    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }
    return null;
  }
  /**
   * Elimina un elemento del caché
   */
  delete(key) {
    this.cache.delete(key);
  }
  /**
   * Limpia todo el caché
   */
  clear() {
    this.cache.clear();
    console.log("\u{1F5D1}\uFE0F Cache completamente limpiado");
  }
  /**
   * Limpia elementos del caché que coincidan con un prefijo
   */
  clearCache(prefix) {
    const keysToDelete = [];
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach((key) => this.cache.delete(key));
    console.log(`\u{1F5D1}\uFE0F Cleared cache for prefix: ${prefix} (${keysToDelete.length} items)`);
  }
  /**
   * Limpia cache de múltiples módulos a la vez
   */
  clearMultipleCaches(prefixes) {
    prefixes.forEach((prefix) => this.clearCache(prefix));
    console.log(`\u{1F5D1}\uFE0F Cleared multiple caches: ${prefixes.join(", ")}`);
  }
  /**
   * Limpia todo el cache relacionado con datos dinámicos
   */
  clearAllDataCache() {
    const dataPrefixes = [
      "avisos",
      "presupuestos",
      "facturas",
      "inventario",
      "clientes",
      "tecnicos",
      "dashboard"
    ];
    this.clearMultipleCaches(dataPrefixes);
  }
  /**
   * Limpia elementos expirados del caché
   */
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (this.isExpired(item)) {
        this.cache.delete(key);
      }
    }
    if (this.cache.size > this.MAX_CACHE_SIZE) {
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      const toDelete = entries.slice(0, entries.length - this.MAX_CACHE_SIZE);
      toDelete.forEach(([key]) => this.cache.delete(key));
    }
  }
  /**
   * Verifica si un elemento del caché ha expirado
   */
  isExpired(item) {
    return Date.now() - item.timestamp > item.ttl;
  }
  /**
   * Obtiene estadísticas del caché
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
  /**
   * Genera una clave de caché basada en parámetros
   */
  generateKey(prefix, params) {
    const paramString = JSON.stringify(params);
    return `${prefix}:${paramString}`;
  }
  /**
   * Limpia recursos al destruir el servicio
   */
  ngOnDestroy() {
    this.stopAutoCleanup();
    this.clear();
  }
};
_CacheService.\u0275fac = function CacheService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CacheService)();
};
_CacheService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CacheService, factory: _CacheService.\u0275fac, providedIn: "root" });
var CacheService = _CacheService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CacheService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  CacheService
};
//# sourceMappingURL=chunk-7DTAJMEV.js.map
