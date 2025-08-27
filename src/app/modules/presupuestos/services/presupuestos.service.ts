import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SupabaseClientService } from '../../../core/services/supabase-client.service';
import { DataUpdateService } from '../../../core/services/data-update.service';

export interface Presupuesto {
  id: string;
  aviso_id: string;
  albaran_id?: string;
  fecha_creacion: Date;
  fecha_actualizacion?: Date;
  horas_estimadas?: number;
  total_estimado?: number;
  pdf_url?: string;
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Cancelado';
  // Relaciones
  aviso?: any;
  albaran?: any;
  materiales_estimados?: any; // Campo JSONB en la base de datos
}

export interface MaterialPresupuesto {
  id: string;
  presupuesto_id: string;
  material_id: string;
  cantidad_estimada: number;
  precio_neto_al_momento: number;
  // Relaciones
  material?: any;
}

export interface PresupuestoResponse {
  presupuestos: Presupuesto[];
  total: number;
  pagina: number;
  por_pagina: number;
}

export interface CrearPresupuestoRequest {
  aviso_id: string;
  albaran_id?: string | null; // Campo opcional hasta que se implemente correctamente
  horas_estimadas?: number;
  total_estimado?: number;
  estado?: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Cancelado';
  pdf_url?: string;
  materiales?: any[];
}

export interface ActualizarPresupuestoRequest {
  aviso_id?: string;
  horas_estimadas?: number;
  total_estimado?: number;
  estado?: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Cancelado';
  pdf_url?: string;
  materiales?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {
  private supabase: SupabaseClient;
  private presupuestosSubject = new BehaviorSubject<Presupuesto[]>([]);
  public presupuestos$ = this.presupuestosSubject.asObservable();

  constructor(
    private supabaseClientService: SupabaseClientService,
    private dataUpdateService: DataUpdateService
  ) {
    this.supabase = this.supabaseClientService.getClient();
  }

  /**
   * Obtiene la lista de presupuestos con paginación y filtros
   */
  getPresupuestos(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    estado?: string
  ): Observable<PresupuestoResponse> {
    let query = this.supabase
      .from('presupuestos')
      .select(`
        *,
        aviso:avisos(
          *,
          cliente:clientes(*)
        )
      `, { count: 'exact' });

    // Aplicar filtros
    if (busqueda) {
      query = query.or(`aviso.nombre_cliente_aviso.ilike.%${busqueda}%`);
    }

    if (estado) {
      query = query.eq('estado', estado);
    }

    // Aplicar paginación y ordenamiento
    const desde = (pagina - 1) * porPagina;
    query = query
      .range(desde, desde + porPagina - 1)
      .order(ordenarPor || 'fecha_creacion', { ascending: orden === 'asc' });

    return from(query).pipe(
      map(({ data, error, count }) => {
        if (error) throw error;

        const presupuestos = data as Presupuesto[];
        this.presupuestosSubject.next(presupuestos);

        return {
          presupuestos,
          total: count || 0,
          pagina,
          por_pagina: porPagina
        };
      }),
      catchError(error => {
        console.error('Error al obtener presupuestos:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene un presupuesto por su ID
   */
  getPresupuesto(id: string): Observable<Presupuesto> {
    console.log('Servicio: Buscando presupuesto con ID:', id);
    return from(
      this.supabase
        .from('presupuestos')
        .select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          ),
          albaran:albaranes(*),
          materiales_estimados
        `)
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        console.log('Servicio: Respuesta de Supabase:', { data, error });
        if (error) throw error;
        return data as Presupuesto;
      })
    );
  }

  /**
   * Crea un nuevo presupuesto
   */
  crearPresupuesto(presupuesto: CrearPresupuestoRequest): Observable<Presupuesto> {
    // Preparar los datos del presupuesto, mapeando materiales a materiales_estimados
    const presupuestoData: any = {
      aviso_id: presupuesto.aviso_id,
      horas_estimadas: presupuesto.horas_estimadas,
      total_estimado: presupuesto.total_estimado,
      fecha_creacion: new Date().toISOString(),
      estado: 'Pendiente'
    };

    // Solo incluir albaran_id si está presente y es válido
    if (presupuesto.albaran_id) {
      presupuestoData.albaran_id = presupuesto.albaran_id;
    }

    // Si hay materiales, añadirlos al campo materiales_estimados
    if (presupuesto.materiales && presupuesto.materiales.length > 0) {
      presupuestoData.materiales_estimados = presupuesto.materiales;
    }

    console.log('Servicio: Creando presupuesto con datos:', presupuestoData);

    return from(
      this.supabase
        .from('presupuestos')
        .insert([presupuestoData])
        .select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `)
        .single()
    ).pipe(
      switchMap(({ data: presupuestoCreado, error: presupuestoError }) => {
        if (presupuestoError) throw presupuestoError;

        const presupuesto = presupuestoCreado as Presupuesto;

                // Los materiales ahora se almacenan directamente en el campo JSONB materiales_estimados
        const presupuestosActuales = this.presupuestosSubject.value;
        this.presupuestosSubject.next([presupuesto, ...presupuestosActuales]);
        
        // Notificar creación y limpiar cache
        this.dataUpdateService.notifyCreated('presupuestos');
        
        return from([presupuesto]);
      })
    );
  }

  /**
   * Actualiza un presupuesto existente
   */
  actualizarPresupuesto(id: string, presupuesto: ActualizarPresupuestoRequest): Observable<Presupuesto> {
    console.log('Servicio: Actualizando presupuesto con ID:', id);
    console.log('Servicio: Datos recibidos:', presupuesto);
    
    // Preparar los datos actualizados, mapeando materiales a materiales_estimados
    const datosActualizados: any = {
      fecha_actualizacion: new Date().toISOString()
    };

    // Añadir campos opcionales solo si están presentes
    if (presupuesto.aviso_id !== undefined) datosActualizados.aviso_id = presupuesto.aviso_id;
    if (presupuesto.horas_estimadas !== undefined) datosActualizados.horas_estimadas = presupuesto.horas_estimadas;
    if (presupuesto.total_estimado !== undefined) datosActualizados.total_estimado = presupuesto.total_estimado;
    if (presupuesto.estado !== undefined) datosActualizados.estado = presupuesto.estado;
    if (presupuesto.pdf_url !== undefined) datosActualizados.pdf_url = presupuesto.pdf_url;

    // Si hay materiales, mapearlos al campo materiales_estimados
    if (presupuesto.materiales && presupuesto.materiales.length > 0) {
      datosActualizados.materiales_estimados = presupuesto.materiales;
    }

    console.log('Servicio: Datos del presupuesto a actualizar:', datosActualizados);

    return from(
      this.supabase
        .from('presupuestos')
        .update(datosActualizados)
        .eq('id', id)
        .select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `)
        .single()
    ).pipe(
      switchMap(({ data: presupuestoActualizado, error: presupuestoError }) => {
        if (presupuestoError) throw presupuestoError;

        const presupuesto = presupuestoActualizado as Presupuesto;
        console.log('Servicio: Presupuesto actualizado:', presupuesto);

        // Los materiales ahora se almacenan directamente en el campo JSONB materiales_estimados
        console.log('Servicio: Presupuesto actualizado:', presupuesto);
        
        // Actualizar el estado local
        const presupuestosActuales = this.presupuestosSubject.value;
        const index = presupuestosActuales.findIndex(p => p.id === id);
        if (index !== -1) {
          presupuestosActuales[index] = presupuesto;
          this.presupuestosSubject.next([...presupuestosActuales]);
        }

        // Notificar actualización y limpiar cache
        this.dataUpdateService.notifyUpdated('presupuestos');

        return from([presupuesto]);
      })
    );
  }

  /**
   * Elimina un presupuesto
   */
  eliminarPresupuesto(id: string): Observable<void> {
    console.log('🔍 eliminarPresupuesto llamado con ID:', id);
    
    return from(
      this.supabase
        .from('presupuestos')
        .delete()
        .eq('id', id)
    ).pipe(
      map(({ data, error }) => {
        console.log('🔍 Respuesta de Supabase:', { data, error });
        
        if (error) {
          console.error('❌ Error de Supabase:', error);
          throw error;
        }

        console.log('✅ Presupuesto eliminado exitosamente de la BD');
        
        const presupuestosActuales = this.presupuestosSubject.value;
        const presupuestosFiltrados = presupuestosActuales.filter(p => p.id !== id);
        this.presupuestosSubject.next(presupuestosFiltrados);

        // Notificar eliminación y limpiar cache
        this.dataUpdateService.notifyDeleted('presupuestos');
        
        console.log('✅ Estado local actualizado');
      }),
      catchError(error => {
        console.error('❌ Error en eliminarPresupuesto:', error);
        throw error;
      })
    );
  }

  /**
   * Busca presupuestos por término de búsqueda
   */
  buscarPresupuestos(termino: string): Observable<Presupuesto[]> {
    return from(
      this.supabase
        .from('presupuestos')
        .select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `)
        .or(`aviso.nombre_cliente_aviso.ilike.%${termino}%`)
        .limit(10)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Presupuesto[];
      })
    );
  }

  /**
   * Obtiene presupuestos por estado
   */
  getPresupuestosPorEstado(estado: string): Observable<Presupuesto[]> {
    return from(
      this.supabase
        .from('presupuestos')
        .select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `)
        .eq('estado', estado)
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Presupuesto[];
      })
    );
  }

  /**
   * Obtiene presupuestos por aviso
   */
  getPresupuestosPorAviso(avisoId: string): Observable<Presupuesto[]> {
    return from(
      this.supabase
        .from('presupuestos')
        .select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `)
        .eq('aviso_id', avisoId)
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Presupuesto[];
      })
    );
  }

  /**
   * Cambia el estado de un presupuesto
   */
  cambiarEstado(id: string, estado: 'Pendiente' | 'En curso' | 'Completado' | 'Facturado' | 'Cancelado'): Observable<Presupuesto> {
    return from(
      this.supabase
        .from('presupuestos')
        .update({ 
          estado,
          fecha_actualizacion: new Date().toISOString()
        })
        .eq('id', id)
        .select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;

        const presupuestoActualizado = data as Presupuesto;
        const presupuestosActuales = this.presupuestosSubject.value;
        const index = presupuestosActuales.findIndex(p => p.id === id);
        if (index !== -1) {
          presupuestosActuales[index] = presupuestoActualizado;
          this.presupuestosSubject.next([...presupuestosActuales]);
        }

        return presupuestoActualizado;
      })
    );
  }

  /**
   * Obtiene el valor actual de presupuestos
   */
  getPresupuestosActuales(): Presupuesto[] {
    return this.presupuestosSubject.value;
  }

  /**
   * Limpia el estado de presupuestos
   */
  limpiarPresupuestos(): void {
    this.presupuestosSubject.next([]);
  }
} 