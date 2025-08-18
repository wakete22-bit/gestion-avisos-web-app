/**
 * Configuración para reintentos y timeouts en la aplicación
 */
export const RETRY_CONFIG = {
  // Configuración para carga de datos
  DATA_LOADING: {
    MAX_RETRIES: 3,
    INITIAL_DELAY: 2000, // 2 segundos
    MAX_DELAY: 10000,    // 10 segundos
    TIMEOUT: 5000        // 5 segundos
  },
  
  // Configuración para navegación
  NAVIGATION: {
    DOM_READY_DELAY: 300,    // 300ms para esperar que el DOM esté listo
    ROUTE_CHANGE_DELAY: 200  // 200ms para cambios de ruta
  },
  
  // Configuración para cache
  CACHE: {
    AVISOS_TTL: 2 * 60 * 1000,  // 2 minutos
    HISTORIAL_TTL: 5 * 60 * 1000 // 5 minutos
  },
  
  // Configuración para debounce
  DEBOUNCE: {
    SEARCH: 500,  // 500ms para búsquedas
    RESIZE: 300   // 300ms para redimensionamiento
  }
};

/**
 * Función para calcular delay exponencial para reintentos
 */
export function calculateRetryDelay(attempt: number, baseDelay: number = RETRY_CONFIG.DATA_LOADING.INITIAL_DELAY): number {
  const delay = baseDelay * Math.pow(2, attempt - 1);
  return Math.min(delay, RETRY_CONFIG.DATA_LOADING.MAX_DELAY);
}

/**
 * Función para verificar si se debe reintentar
 */
export function shouldRetry(attempt: number, maxRetries: number = RETRY_CONFIG.DATA_LOADING.MAX_RETRIES): boolean {
  return attempt < maxRetries;
}
