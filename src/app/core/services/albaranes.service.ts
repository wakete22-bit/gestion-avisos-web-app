import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseClientService } from './supabase-client.service';

// Nueva interfaz para repuestos con cantidades reales
export interface RepuestoAlbaran {
  nombre: string;
  cantidad: number;
  precio_neto: number;
  precio_pvp: number;
  unidad: string;
  codigo: string;
}

export interface Albaran {
  id?: string;
  trabajo_id: string;
  aviso_id: string;
  fecha_cierre: Date;
  hora_entrada: string;
  hora_salida: string;
  descripcion_trabajo_realizado: string;
  repuestos_utilizados: RepuestoAlbaran[]; // ← CAMBIADO: Ahora incluye cantidades
  estado_cierre: 'Finalizado' | 'Presupuesto pendiente' | 'Otra visita';
  presupuesto_necesario: number;
  dni_cliente?: string;
  nombre_firma?: string;
  firma_url?: string;
  observaciones?: string;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}

export interface CrearAlbaranRequest {
  trabajo_id: string;
  aviso_id: string;
  fecha_cierre: Date;
  hora_entrada: string;
  hora_salida: string;
  descripcion_trabajo_realizado: string;
  repuestos_utilizados: RepuestoAlbaran[]; // ← CAMBIADO: Ahora incluye cantidades
  estado_cierre: 'Finalizado' | 'Presupuesto pendiente' | 'Otra visita';
  presupuesto_necesario: number;
  dni_cliente?: string;
  nombre_firma?: string;
  firma_cliente?: string;
  firma_url?: string;
  observaciones?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlbaranesService {
  private supabase: SupabaseClient;

  constructor(private supabaseClientService: SupabaseClientService) {
    this.supabase = this.supabaseClientService.getClient();
  }

  /**
   * Crea un nuevo albarán
   */
  crearAlbaran(albaranData: CrearAlbaranRequest): Observable<Albaran> {
    return from(
      this.supabase
        .from('albaranes')
        .insert([albaranData])
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Albaran;
      }),
      catchError(error => {
        console.error('Error al crear albarán:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene un albarán por su ID
   */
  getAlbaran(id: string): Observable<Albaran> {
    return from(
      this.supabase
        .from('albaranes')
        .select(`
          *,
          trabajo:trabajos_realizados(*),
          aviso:avisos(*)
        `)
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Albaran;
      }),
      catchError(error => {
        console.error('Error al obtener albarán:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene todos los albaranes de un aviso
   */
  getAlbaranesAviso(avisoId: string): Observable<Albaran[]> {
    return from(
      this.supabase
        .from('albaranes')
        .select(`
          *,
          trabajo:trabajos_realizados(*)
        `)
        .eq('aviso_id', avisoId)
        .order('fecha_cierre', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Albaran[];
      }),
      catchError(error => {
        console.error('Error al obtener albaranes del aviso:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene todos los albaranes de un trabajo
   */
  getAlbaranesTrabajo(trabajoId: string): Observable<Albaran[]> {
    return from(
      this.supabase
        .from('albaranes')
        .select('*')
        .eq('trabajo_id', trabajoId)
        .order('fecha_cierre', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Albaran[];
      }),
      catchError(error => {
        console.error('Error al obtener albaranes del trabajo:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza un albarán existente
   */
  actualizarAlbaran(id: string, datos: Partial<Albaran>): Observable<Albaran> {
    return from(
      this.supabase
        .from('albaranes')
        .update({
          ...datos,
          fecha_actualizacion: new Date()
        })
        .eq('id', id)
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Albaran;
      }),
      catchError(error => {
        console.error('Error al actualizar albarán:', error);
        throw error;
      })
    );
  }

  /**
   * Elimina un albarán
   */
  eliminarAlbaran(id: string): Observable<void> {
    return from(
      this.supabase
        .from('albaranes')
        .delete()
        .eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      }),
      catchError(error => {
        console.error('Error al eliminar albarán:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene estadísticas de albaranes para un aviso
   */
  getEstadisticasAlbaranes(avisoId: string): Observable<any> {
    return from(
      this.supabase
        .from('albaranes')
        .select('estado_cierre')
        .eq('aviso_id', avisoId)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const albaranes = data as any[];
        const estadisticas = {
          total: albaranes.length,
          finalizados: albaranes.filter(a => a.estado_cierre === 'Finalizado').length,
          presupuestoPendiente: albaranes.filter(a => a.estado_cierre === 'Presupuesto pendiente').length,
          otraVisita: albaranes.filter(a => a.estado_cierre === 'Otra visita').length
        };
        
        return estadisticas;
      }),
      catchError(error => {
        console.error('Error al obtener estadísticas de albaranes:', error);
        throw error;
      })
    );
  }
}
