import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseClientService {
  private static instance: SupabaseClient | null = null;
  
  constructor() {}
  
  public getClient(): SupabaseClient {
    if (!SupabaseClientService.instance) {
      SupabaseClientService.instance = createClient(
        environment.supabaseUrl,
        environment.supabaseAnonKey,
        {
          auth: {
            // Configuración para evitar conflictos de locks
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false,
            // Configurar storage personalizado para evitar locks
            storage: {
              getItem: (key: string) => {
                try {
                  return localStorage.getItem(key);
                } catch (error) {
                  console.warn('Error reading from localStorage:', error);
                  return null;
                }
              },
              setItem: (key: string, value: string) => {
                try {
                  localStorage.setItem(key, value);
                } catch (error) {
                  console.warn('Error writing to localStorage:', error);
                }
              },
              removeItem: (key: string) => {
                try {
                  localStorage.removeItem(key);
                } catch (error) {
                  console.warn('Error removing from localStorage:', error);
                }
              }
            }
          },
          // Configuración global para reducir conflictos
          global: {
            headers: {
              'X-Client-Info': 'gestion-avisos-app'
            }
          },
          // Configuración de rendimiento optimizada
          db: {
            schema: 'public'
          },
          // Configuración de realtime optimizada
          realtime: {
            params: {
              eventsPerSecond: 10 // Limitar eventos por segundo
            }
          }
        }
      );
      
      console.log('🔧 SupabaseClientService: Cliente Supabase singleton creado con optimizaciones');
    }
    
    return SupabaseClientService.instance;
  }
  
  // Método para limpiar la instancia si es necesario (para testing o reinicio)
  public static clearInstance(): void {
    SupabaseClientService.instance = null;
  }
} 