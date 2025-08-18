import {
  CacheService
} from "./chunk-7DTAJMEV.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-ANYKLJQR.js";

// src/app/core/services/data-update.service.ts
var _DataUpdateService = class _DataUpdateService {
  constructor(cacheService) {
    this.cacheService = cacheService;
  }
  /**
   * Notifica que se ha creado un nuevo elemento
   * Limpia el cache relacionado para forzar recarga
   */
  notifyCreated(module) {
    console.log(`\u{1F195} Notifying creation in module: ${module}`);
    this.clearModuleCache(module);
  }
  /**
   * Notifica que se ha actualizado un elemento
   * Limpia el cache relacionado para forzar recarga
   */
  notifyUpdated(module) {
    console.log(`\u{1F504} Notifying update in module: ${module}`);
    this.clearModuleCache(module);
  }
  /**
   * Notifica que se ha eliminado un elemento
   * Limpia el cache relacionado para forzar recarga
   */
  notifyDeleted(module) {
    console.log(`\u{1F5D1}\uFE0F Notifying deletion in module: ${module}`);
    this.clearModuleCache(module);
  }
  /**
   * Limpia el cache de un módulo específico
   */
  clearModuleCache(module) {
    this.cacheService.clearCache(module);
  }
  /**
   * Limpia todo el cache de datos dinámicos
   * Útil cuando se hacen cambios que afectan a múltiples módulos
   */
  clearAllDataCache() {
    console.log("\u{1F9F9} Clearing all data cache");
    this.cacheService.clearAllDataCache();
  }
  /**
   * Limpia cache de múltiples módulos
   * Útil cuando una operación afecta a varios módulos
   */
  clearMultipleModules(modules) {
    console.log(`\u{1F9F9} Clearing cache for modules: ${modules.join(", ")}`);
    this.cacheService.clearMultipleCaches(modules);
  }
};
_DataUpdateService.\u0275fac = function DataUpdateService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DataUpdateService)(\u0275\u0275inject(CacheService));
};
_DataUpdateService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DataUpdateService, factory: _DataUpdateService.\u0275fac, providedIn: "root" });
var DataUpdateService = _DataUpdateService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataUpdateService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: CacheService }], null);
})();

export {
  DataUpdateService
};
//# sourceMappingURL=chunk-VHAQXQOQ.js.map
