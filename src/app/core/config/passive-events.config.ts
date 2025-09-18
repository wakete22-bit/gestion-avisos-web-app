/**
 * Configuración para eventos pasivos y optimización de rendimiento
 * Soluciona las violaciones de event listeners no-pasivos que bloquean el scroll
 */

// Configuración global para eventos pasivos
export const PASSIVE_EVENTS_CONFIG = {
  // Eventos que deben ser pasivos para mejorar el rendimiento
  passiveEvents: [
    'touchstart',
    'touchmove',
    'wheel',
    'mousewheel',
    'DOMMouseScroll'
  ],
  
  // Configuración para Mapbox GL JS
  mapboxConfig: {
    // Configuraciones de rendimiento
    antialias: false,
    maxTileCacheSize: 50,
    renderWorldCopies: false,
    preserveDrawingBuffer: false,
    cooperativeGestures: true,
    
    // Configuraciones de eventos
    scrollZoom: true,
    boxZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true
  }
};

// Configuración para geocodificación
export const GEOCODING_CONFIG = {
  maxConcurrentRequests: 2, // Reducido de 3 a 2
  requestDelay: 500, // Aumentado de 300ms a 500ms
  maxRetries: 3,
  timeout: 10000
};

/**
 * Aplica configuración de eventos pasivos globalmente
 */
export function setupPassiveEventListeners() {
  if (typeof window === 'undefined') return;
  
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  
  EventTarget.prototype.addEventListener = function(type: string, listener: any, options?: any) {
    // Si es un evento que debe ser pasivo, forzar la opción pasiva
    if (PASSIVE_EVENTS_CONFIG.passiveEvents.includes(type)) {
      if (typeof options === 'boolean') {
        options = { capture: options, passive: true };
      } else if (typeof options === 'object') {
        options = { ...options, passive: true };
      } else {
        options = { passive: true };
      }
    }
    
    return originalAddEventListener.call(this, type, listener, options);
  };
}

/**
 * Configuración de rendimiento para Mapbox
 */
export function getOptimizedMapboxConfig() {
  return {
    ...PASSIVE_EVENTS_CONFIG.mapboxConfig,
    // Configuraciones adicionales de rendimiento
    maxZoom: 18,
    minZoom: 1,
    maxBounds: undefined,
    fadeDuration: 0,
    crossSourceCollisions: false,
    optimizeForTerrain: true
  };
}