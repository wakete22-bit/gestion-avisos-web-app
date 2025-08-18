import { Injectable } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DebugService {

  constructor(private supabaseClientService: SupabaseClientService) {}

  /**
   * Prueba la conexión básica a Supabase
   */
  testSupabaseConnection(): Observable<{ success: boolean; message: string; data?: any }> {
    console.log('🔍 Probando conexión a Supabase...');
    
    const supabase = this.supabaseClientService.getClient();
    
    return from(
      supabase
        .from('avisos')
        .select('id')
        .limit(1)
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('❌ Error en conexión Supabase:', error);
          return {
            success: false,
            message: `Error de conexión: ${error.message}`,
            data: error
          };
        }
        
        console.log('✅ Conexión a Supabase exitosa');
        return {
          success: true,
          message: 'Conexión exitosa',
          data: data
        };
      }),
      catchError(error => {
        console.error('❌ Error crítico en conexión:', error);
        return from(Promise.resolve({
          success: false,
          message: `Error crítico: ${error.message}`,
          data: error
        }));
      })
    );
  }

  /**
   * Prueba una consulta simple de avisos
   */
  testAvisosQuery(): Observable<{ success: boolean; message: string; data?: any }> {
    console.log('🔍 Probando consulta de avisos...');
    
    const supabase = this.supabaseClientService.getClient();
    
    return from(
      supabase
        .from('avisos')
        .select(`
          id,
          nombre_cliente_aviso,
          estado
        `)
        .limit(5)
    ).pipe(
      map(({ data, error, count }) => {
        if (error) {
          console.error('❌ Error en consulta de avisos:', error);
          return {
            success: false,
            message: `Error en consulta: ${error.message}`,
            data: error
          };
        }
        
        console.log('✅ Consulta de avisos exitosa:', data?.length, 'registros');
        return {
          success: true,
          message: `Consulta exitosa: ${data?.length || 0} avisos encontrados`,
          data: { avisos: data, total: count }
        };
      }),
      catchError(error => {
        console.error('❌ Error crítico en consulta:', error);
        return from(Promise.resolve({
          success: false,
          message: `Error crítico: ${error.message}`,
          data: error
        }));
      })
    );
  }
}
