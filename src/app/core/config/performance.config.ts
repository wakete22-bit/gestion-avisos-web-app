export const PERFORMANCE_CONFIG = {
  // Configuración de cache
  CACHE: {
    DEFAULT_TTL: 2 * 60 * 1000, // 2 minutos
    MAX_SIZE: 25,
    CLEANUP_INTERVAL: 30 * 1000, // 30 segundos
  },
  
  // Configuración de limpieza de memoria
  MEMORY: {
    CLEANUP_INTERVAL: 30 * 1000, // 30 segundos
    FORCE_CLEANUP_INTERVAL: 2 * 60 * 1000, // 2 minutos
  },
  
  // Configuración de observables
  OBSERVABLES: {
    MAX_SUBSCRIPTIONS: 20,
    CLEANUP_INTERVAL: 45 * 1000, // 45 segundos
  },
  
  // Configuración de HTTP
  HTTP: {
    MAX_CONCURRENT_REQUESTS: 5,
    REQUEST_TIMEOUT: 30 * 1000, // 30 segundos
  },
  
  // Configuración de Supabase
  SUPABASE: {
    EVENTS_PER_SECOND: 2,
    MAX_RETRIES: 2,
  },
  
  // Configuración de paginación
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 15,
    MAX_PAGE_SIZE: 25,
  }
};
