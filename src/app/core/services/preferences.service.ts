import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { PREFERENCES_KEYS, PREFERENCES_CONFIG } from '../config/preferences.config';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  
  constructor() {}

  /**
   * Guarda un valor en Capacitor Preferences
   */
  async set(key: string, value: any): Promise<void> {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      
      // Verificar tamaño antes de guardar
      if (stringValue.length > this.getMaxSizeForKey(key)) {
        console.warn(`⚠️ Datos demasiado grandes para ${key}, truncando...`);
        // Aquí podrías implementar lógica de truncamiento o compresión
      }
      
      await Preferences.set({ key, value: stringValue });
      console.log(`💾 Datos guardados en ${key}`);
    } catch (error) {
      console.error(`❌ Error guardando en ${key}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene un valor de Capacitor Preferences
   */
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const { value } = await Preferences.get({ key });
      
      if (value === null) {
        return null;
      }
      
      // Intentar parsear como JSON, si falla devolver como string
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    } catch (error) {
      console.error(`❌ Error obteniendo de ${key}:`, error);
      return null;
    }
  }

  /**
   * Elimina un valor de Capacitor Preferences
   */
  async remove(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
      console.log(`🗑️ Datos eliminados de ${key}`);
    } catch (error) {
      console.error(`❌ Error eliminando de ${key}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene todas las claves almacenadas
   */
  async keys(): Promise<string[]> {
    try {
      const { keys } = await Preferences.keys();
      return keys;
    } catch (error) {
      console.error('❌ Error obteniendo claves:', error);
      return [];
    }
  }

  /**
   * Limpia todas las preferencias
   */
  async clear(): Promise<void> {
    try {
      const { keys } = await Preferences.keys();
      
      for (const key of keys) {
        await Preferences.remove({ key });
      }
      
      console.log('🗑️ Todas las preferencias eliminadas');
    } catch (error) {
      console.error('❌ Error limpiando preferencias:', error);
      throw error;
    }
  }

  /**
   * Verifica si una clave existe
   */
  async has(key: string): Promise<boolean> {
    try {
      const { value } = await Preferences.get({ key });
      return value !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtiene el tamaño máximo permitido para una clave específica
   */
  private getMaxSizeForKey(key: string): number {
    if (key.includes('USER_DATA')) {
      return PREFERENCES_CONFIG.MAX_STORAGE_SIZE.USER_DATA;
    } else if (key.includes('APP_SETTINGS')) {
      return PREFERENCES_CONFIG.MAX_STORAGE_SIZE.APP_SETTINGS;
    } else if (key.includes('DATA_CACHE')) {
      return PREFERENCES_CONFIG.MAX_STORAGE_SIZE.DATA_CACHE;
    }
    
    // Tamaño por defecto
    return 1024 * 1024; // 1MB
  }

  /**
   * Verifica si los datos han expirado
   */
  isExpired(timestamp: number, cacheType: keyof typeof PREFERENCES_CONFIG.CACHE_EXPIRY): boolean {
    const now = Date.now();
    const expiryTime = PREFERENCES_CONFIG.CACHE_EXPIRY[cacheType];
    return (now - timestamp) > expiryTime;
  }

  /**
   * Obtiene información del almacenamiento
   */
  async getStorageInfo(): Promise<{
    totalKeys: number;
    totalSize: number;
    keys: string[];
  }> {
    try {
      const keys = await this.keys();
      let totalSize = 0;
      
      for (const key of keys) {
        const { value } = await Preferences.get({ key });
        if (value) {
          totalSize += value.length;
        }
      }
      
      return {
        totalKeys: keys.length,
        totalSize,
        keys
      };
    } catch (error) {
      console.error('❌ Error obteniendo información de almacenamiento:', error);
      return {
        totalKeys: 0,
        totalSize: 0,
        keys: []
      };
    }
  }

  /**
   * Limpia datos expirados automáticamente
   */
  async cleanupExpiredData(): Promise<void> {
    try {
      console.log('🧹 Limpiando datos expirados...');
      
      const keys = await this.keys();
      let cleanedCount = 0;
      
      for (const key of keys) {
        try {
          if (key.includes('CACHE') || key.includes('TEMP')) {
            const data = await this.get(key);
            
            if (data && typeof data === 'object' && 'timestamp' in data) {
              const timestamp = (data as any).timestamp;
              const cacheType = key.includes('USER_DATA') ? 'USER_DATA' : 
                               key.includes('APP_SETTINGS') ? 'APP_SETTINGS' : 'DATA_CACHE';
              
              if (this.isExpired(timestamp, cacheType)) {
                await this.remove(key);
                cleanedCount++;
              }
            }
          }
        } catch (error) {
          console.warn(`⚠️ Error procesando clave ${key}:`, error);
        }
      }
      
      console.log(`🧹 Limpieza completada: ${cleanedCount} elementos eliminados`);
    } catch (error) {
      console.error('❌ Error en limpieza automática:', error);
    }
  }
}
