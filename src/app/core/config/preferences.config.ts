/**
 * Configuración de claves para Capacitor Preferences
 * Centraliza todas las claves de almacenamiento para evitar conflictos
 */
export const PREFERENCES_KEYS = {
  // Sesión de Supabase
  SUPABASE_SESSION: 'supabase_session',
  
  // Datos del usuario
  USER_DATA: 'user_data',
  
  // Configuración de la app
  APP_SETTINGS: 'app_settings',
  
  // Cache de datos
  DATA_CACHE: 'data_cache',
  
  // Preferencias del usuario
  USER_PREFERENCES: 'user_preferences'
} as const;

/**
 * Configuración de Capacitor Preferences
 */
export const PREFERENCES_CONFIG = {
  // Tiempo de expiración para datos en cache (en milisegundos)
  CACHE_EXPIRY: {
    USER_DATA: 24 * 60 * 60 * 1000, // 24 horas
    APP_SETTINGS: 7 * 24 * 60 * 60 * 1000, // 7 días
    DATA_CACHE: 60 * 60 * 1000 // 1 hora
  },
  
  // Tamaño máximo de datos almacenados (en bytes)
  MAX_STORAGE_SIZE: {
    USER_DATA: 1024 * 1024, // 1MB
    APP_SETTINGS: 512 * 1024, // 512KB
    DATA_CACHE: 5 * 1024 * 1024 // 5MB
  }
} as const;
