import {
  Injectable,
  Platform,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-ANYKLJQR.js";

// src/app/core/services/viewport.service.ts
var _ViewportService = class _ViewportService {
  constructor(platform) {
    this.platform = platform;
    this.initializeViewport();
  }
  initializeViewport() {
    this.setupViewport();
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        this.setupViewport();
      }, 100);
    });
    window.addEventListener("resize", () => {
      this.setupViewport();
    });
  }
  setupViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const content = [
        "viewport-fit=cover",
        "width=device-width",
        "initial-scale=1.0",
        "minimum-scale=1.0",
        "maximum-scale=1.0",
        "user-scalable=no"
      ].join(", ");
      viewport.setAttribute("content", content);
    }
  }
  // Obtener información del viewport
  getViewportInfo() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      orientation: this.getOrientation(),
      isLandscape: window.innerWidth > window.innerHeight,
      isPortrait: window.innerHeight > window.innerWidth
    };
  }
  // Obtener orientación del dispositivo
  getOrientation() {
    if (window.innerWidth > window.innerHeight) {
      return "landscape";
    } else {
      return "portrait";
    }
  }
  // Verificar si estamos en un dispositivo móvil
  isMobile() {
    return this.platform.is("mobile") || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  // Verificar si estamos en modo standalone (PWA instalada)
  isStandalone() {
    return window.navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
  }
  // Obtener información de las safe areas
  getSafeAreaInfo() {
    return {
      top: this.getComputedValue("env(safe-area-inset-top)"),
      bottom: this.getComputedValue("env(safe-area-inset-bottom)"),
      left: this.getComputedValue("env(safe-area-inset-left)"),
      right: this.getComputedValue("env(safe-area-inset-right)")
    };
  }
  getComputedValue(property) {
    const testElement = document.createElement("div");
    testElement.style.position = "absolute";
    testElement.style.visibility = "hidden";
    testElement.style[property] = property;
    document.body.appendChild(testElement);
    const computedValue = getComputedStyle(testElement)[property];
    document.body.removeChild(testElement);
    return computedValue || "0px";
  }
  // Aplicar estilos de safe area a un elemento
  applySafeArea(element, position) {
    const safeAreaInfo = this.getSafeAreaInfo();
    switch (position) {
      case "top":
        element.style.paddingTop = safeAreaInfo.top;
        break;
      case "bottom":
        element.style.paddingBottom = safeAreaInfo.bottom;
        break;
      case "left":
        element.style.paddingLeft = safeAreaInfo.left;
        break;
      case "right":
        element.style.paddingRight = safeAreaInfo.right;
        break;
      case "all":
        element.style.paddingTop = safeAreaInfo.top;
        element.style.paddingBottom = safeAreaInfo.bottom;
        element.style.paddingLeft = safeAreaInfo.left;
        element.style.paddingRight = safeAreaInfo.right;
        break;
    }
  }
  // Aplicar safe areas a un modal
  applySafeAreaToModal(modalElement) {
    if (!this.isStandalone() || !this.isMobile()) {
      return;
    }
    const safeAreaInfo = this.getSafeAreaInfo();
    modalElement.style.height = `calc(100vh - ${safeAreaInfo.top} - ${safeAreaInfo.bottom})`;
    modalElement.style.maxHeight = `calc(100vh - ${safeAreaInfo.top} - ${safeAreaInfo.bottom})`;
    const header = modalElement.querySelector(".modal-header");
    if (header) {
      header.style.paddingTop = `calc(16px + ${safeAreaInfo.top})`;
    }
    const footer = modalElement.querySelector(".modal-footer");
    if (footer) {
      footer.style.paddingBottom = `calc(16px + ${safeAreaInfo.bottom})`;
    }
  }
  // Obtener estilos CSS para safe areas
  getSafeAreaStyles() {
    const safeAreaInfo = this.getSafeAreaInfo();
    return {
      modalContainer: {
        height: `calc(100vh - ${safeAreaInfo.top} - ${safeAreaInfo.bottom})`,
        maxHeight: `calc(100vh - ${safeAreaInfo.top} - ${safeAreaInfo.bottom})`
      },
      modalHeader: {
        paddingTop: `calc(16px + ${safeAreaInfo.top})`
      },
      modalFooter: {
        paddingBottom: `calc(16px + ${safeAreaInfo.bottom})`
      }
    };
  }
  // Forzar el viewport a un tamaño específico (útil para testing)
  setViewportSize(width, height) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const content = [
        "viewport-fit=cover",
        `width=${width}`,
        `height=${height}`,
        "initial-scale=1.0",
        "minimum-scale=1.0",
        "maximum-scale=1.0",
        "user-scalable=no"
      ].join(", ");
      viewport.setAttribute("content", content);
    }
  }
  // Restaurar el viewport a la configuración por defecto
  resetViewport() {
    this.setupViewport();
  }
};
_ViewportService.\u0275fac = function ViewportService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewportService)(\u0275\u0275inject(Platform));
};
_ViewportService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ViewportService, factory: _ViewportService.\u0275fac, providedIn: "root" });
var ViewportService = _ViewportService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewportService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: Platform }], null);
})();

export {
  ViewportService
};
//# sourceMappingURL=chunk-IXGWTTVF.js.map
