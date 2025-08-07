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
  fecha_creacion: Date;
  fecha_actualizacion?: Date;
  horas_estimadas?: number;
  total_estimado?: number;
  pdf_url?: string;
  estado: 'Pendiente' | 'En curso' | 'Completado' | 'Facturado' | 'Cancelado';
  // Relaciones
  aviso?: any;
  materiales?: any;
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
  horas_estimadas?: number;
  total_estimado?: number;
  estado?: 'Pendiente' | 'En curso' | 'Completado' | 'Facturado' | 'Cancelado';
  pdf_url?: string;
  materiales?: any[];
}

export interface ActualizarPresupuestoRequest {
  aviso_id?: string;
  horas_estimadas?: number;
  total_estimado?: number;
  estado?: 'Pendiente' | 'En curso' | 'Completado' | 'Facturado' | 'Cancelado';
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
          materiales:materiales_presupuesto(
            *,
            material:inventario(*)
          )
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
    const presupuestoData = {
      ...presupuesto,
      fecha_creacion: new Date().toISOString(),
      estado: 'Pendiente'
    };

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

                // Si no hay materiales, devolver solo el presupuesto
        if (!presupuestoData.materiales || presupuestoData.materiales.length === 0) {
          const presupuestosActuales = this.presupuestosSubject.value;
          this.presupuestosSubject.next([presupuesto, ...presupuestosActuales]);
          
          // Notificar creación y limpiar cache
          this.dataUpdateService.notifyCreated('presupuestos');
          
          return from([presupuesto]);
        }

      // Insertar los materiales del presupuesto
      const materialesInsert = presupuestoData.materiales.map(material => ({
        presupuesto_id: presupuesto.id,
        material_id: material.material_id,
        cantidad_estimada: material.cantidad_estimada,
        precio_neto_al_momento: material.precio_neto_al_momento
      }));

      return from(
        this.supabase
          .from('materiales_presupuesto')
          .insert(materialesInsert)
          .select()
      ).pipe(
        map(({ data: materialesCreados, error: materialesError }) => {
          if (materialesError) throw materialesError;

          const presupuestosActuales = this.presupuestosSubject.value;
          this.presupuestosSubject.next([presupuesto, ...presupuestosActuales]);

          // Notificar creación y limpiar cache
          this.dataUpdateService.notifyCreated('presupuestos');

          return presupuesto;
        })
      );
    })
  );
}

  /**
   * Actualiza un presupuesto existente
   */
  actualizarPresupuesto(id: string, presupuesto: ActualizarPresupuestoRequest): Observable<Presupuesto> {
    console.log('Servicio: Actualizando presupuesto con ID:', id);
    console.log('Servicio: Datos recibidos:', presupuesto);
    
    const datosActualizados = {
      ...presupuesto,
      fecha_actualizacion: new Date().toISOString()
    };

    // Remover materiales de los datos del presupuesto para no incluirlos en la actualización
    const { materiales, ...datosPresupuesto } = datosActualizados;
    
    console.log('Servicio: Materiales a procesar:', materiales);
    console.log('Servicio: Datos del presupuesto:', datosPresupuesto);

    return from(
      this.supabase
        .from('presupuestos')
        .update(datosPresupuesto)
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

        console.log('Servicio: Procesando materiales...');
        // Siempre eliminar materiales existentes primero
        return from(
          this.supabase
            .from('materiales_presupuesto')
            .delete()
            .eq('presupuesto_id', id)
        ).pipe(
          switchMap(({ error: deleteError }) => {
            if (deleteError) throw deleteError;
            console.log('Servicio: Materiales existentes eliminados');

            // Si no hay materiales para insertar, devolver solo el presupuesto
            if (!materiales || materiales.length === 0) {
              console.log('Servicio: No hay materiales para insertar');
              const presupuestosActuales = this.presupuestosSubject.value;
              const index = presupuestosActuales.findIndex(p => p.id === id);
              if (index !== -1) {
                presupuestosActuales[index] = presupuesto;
                this.presupuestosSubject.next([...presupuestosActuales]);
              }

              // Notificar actualización y limpiar cache
              this.dataUpdateService.notifyUpdated('presupuestos');

              return from([presupuesto]);
            }

            // Insertar los nuevos materiales (sin fecha_creacion)
            const materialesInsert = materiales.map(material => ({
              presupuesto_id: id,
              material_id: material.material_id,
              cantidad_estimada: material.cantidad_estimada,
              precio_neto_al_momento: material.precio_neto_al_momento
            }));
            
            console.log('Servicio: Materiales a insertar:', materialesInsert);

            return from(
              this.supabase
                .from('materiales_presupuesto')
                .insert(materialesInsert)
                .select()
            );
          }),
          map(({ data: materialesCreados, error: materialesError }) => {
            if (materialesError) throw materialesError;
            console.log('Servicio: Materiales insertados correctamente:', materialesCreados);

            const presupuestosActuales = this.presupuestosSubject.value;
            const index = presupuestosActuales.findIndex(p => p.id === id);
            if (index !== -1) {
              presupuestosActuales[index] = presupuesto;
              this.presupuestosSubject.next([...presupuestosActuales]);
            }

            // Notificar actualización y limpiar cache
            this.dataUpdateService.notifyUpdated('presupuestos');

            return presupuesto;
          })
        );
      })
    );
  }

  /**
   * Elimina un presupuesto
   */
  eliminarPresupuesto(id: string): Observable<void> {
    return from(
      this.supabase
        .from('materiales_presupuesto')
        .delete()
        .eq('presupuesto_id', id)
    ).pipe(
      switchMap(({ error: materialesError }) => {
        if (materialesError) throw materialesError;

        return from(
          this.supabase
            .from('presupuestos')
            .delete()
            .eq('id', id)
        );
      }),
      map(({ error }) => {
        if (error) throw error;

        const presupuestosActuales = this.presupuestosSubject.value;
        const presupuestosFiltrados = presupuestosActuales.filter(p => p.id !== id);
        this.presupuestosSubject.next(presupuestosFiltrados);

        // Notificar eliminación y limpiar cache
        this.dataUpdateService.notifyDeleted('presupuestos');
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