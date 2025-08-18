import {
  BehaviorSubject,
  Injectable,
  NavigationEnd,
  Router,
  filter,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-ANYKLJQR.js";

// src/app/core/services/navigation.service.ts
var _NavigationService = class _NavigationService {
  constructor(router) {
    this.router = router;
    this.currentRoute$ = new BehaviorSubject("");
    this.isNavigating$ = new BehaviorSubject(false);
    this.setupRouteTracking();
  }
  /**
   * Configura el tracking de rutas
   */
  setupRouteTracking() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      const currentRoute = event.urlAfterRedirects;
      console.log("\u{1F9ED} Navegando a:", currentRoute);
      this.currentRoute$.next(currentRoute);
      this.isNavigating$.next(false);
      setTimeout(() => {
        this.isNavigating$.next(false);
      }, 100);
    });
  }
  /**
   * Obtiene la ruta actual
   */
  getCurrentRoute() {
    return this.currentRoute$.asObservable();
  }
  /**
   * Verifica si se está navegando
   */
  isNavigating() {
    return this.isNavigating$.asObservable();
  }
  /**
   * Marca que se está iniciando una navegación
   */
  startNavigation() {
    this.isNavigating$.next(true);
  }
  /**
   * Verifica si la ruta actual es la especificada
   */
  isCurrentRoute(route) {
    return this.currentRoute$.value === route;
  }
  /**
   * Obtiene el valor actual de la ruta
   */
  getCurrentRouteValue() {
    return this.currentRoute$.value;
  }
};
_NavigationService.\u0275fac = function NavigationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NavigationService)(\u0275\u0275inject(Router));
};
_NavigationService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NavigationService, factory: _NavigationService.\u0275fac, providedIn: "root" });
var NavigationService = _NavigationService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavigationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: Router }], null);
})();

export {
  NavigationService
};
//# sourceMappingURL=chunk-WOW6T6ZC.js.map
