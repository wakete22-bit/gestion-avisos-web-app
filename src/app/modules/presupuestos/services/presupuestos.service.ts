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
  horas_desplazamiento?: number; // Nuevo campo para desplazamientos
  precio_hora_desplazamiento?: number; // Precio por hora para desplazamientos
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
  horas_desplazamiento?: number; // Nuevo campo para desplazamientos
  precio_hora_desplazamiento?: number; // Precio por hora para desplazamientos
  total_estimado?: number;
  estado?: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Cancelado';
  pdf_url?: string;
  materiales?: any[];
}

export interface ActualizarPresupuestoRequest {
  aviso_id?: string;
  horas_estimadas?: number;
  horas_desplazamiento?: number; // Nuevo campo para desplazamientos
  precio_hora_desplazamiento?: number; // Precio por hora para desplazamientos
  total_estimado?: number;
  estado?: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Cancelado';
  pdf_url?: string;
  materiales?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {
  private presupuestosSubject = new BehaviorSubject<Presupuesto[]>([]);
  public presupuestos$ = this.presupuestosSubject.asObservable();

  constructor(
    private supabaseClientService: SupabaseClientService,
    private dataUpdateService: DataUpdateService
  ) {
    // NO asignar cliente estático - usar método dinámico
  }

  /**
   * Obtiene el cliente Supabase actualizado dinámicamente
   */
  private getSupabaseClient(): SupabaseClient {
    console.log('💼 PresupuestosService: Obteniendo cliente Supabase actualizado...');
    return this.supabaseClientService.getClient();
  }

  /**
   * Obtiene la lista de presupuestos usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  getPresupuestosDirect(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    estado?: string
  ): Observable<PresupuestoResponse> {
    console.log('🚀 PresupuestosService: Usando FETCH DIRECTO para presupuestos...');
    
    return from(this.fetchPresupuestosDirect(pagina, porPagina, busqueda, ordenarPor, orden, estado)).pipe(
      map(result => {
        console.log('✅ PresupuestosService: FETCH DIRECTO completado, presupuestos:', result.presupuestos.length);
        
        // Actualizar el subject local
        this.presupuestosSubject.next(result.presupuestos);
        
        return result;
      }),
      catchError(error => {
        console.error('❌ PresupuestosService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para presupuestos - BYPASA CLIENTE SUPABASE
   */
  private async fetchPresupuestosDirect(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    estado?: string
  ): Promise<PresupuestoResponse> {
    console.log('🚀 PresupuestosService: Ejecutando fetch directo para presupuestos...');
    
    try {
      // Construir URL con parámetros
      let url = `${environment.supabaseUrl}/rest/v1/presupuestos?select=*,aviso:avisos(*,cliente:clientes(*))`;

      // Aplicar filtros
      const filters: string[] = [];
      
      if (busqueda) {
        filters.push(`or=(aviso.nombre_cliente_aviso.ilike.*${busqueda}*,aviso.descripcion_problema.ilike.*${busqueda}*)`);
      }
      
      if (estado) {
        filters.push(`estado=eq.${estado}`);
      }
      
      if (filters.length > 0) {
        url += '&' + filters.join('&');
      }
      
      // Aplicar paginación y ordenamiento
      const desde = (pagina - 1) * porPagina;
      const hasta = desde + porPagina - 1;
      url += `&limit=${porPagina}&offset=${desde}`;
      url += `&order=${ordenarPor || 'fecha_creacion'}.${orden === 'asc' ? 'asc' : 'desc'}`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      };
      
      console.log('🚀 URL construida:', url);
      
      const startTime = Date.now();
      const response = await fetch(url, { method: 'GET', headers });
      const duration = Date.now() - startTime;
      
      console.log('🚀 Fetch completado en', duration, 'ms');
      console.log('🚀 Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('🚀 Error response body:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      const contentRange = response.headers.get('content-range');
      const total = contentRange ? parseInt(contentRange.split('/')[1]) : data.length;
      
      console.log('🚀 Datos recibidos:', data?.length || 0, 'presupuestos, total:', total);
      
      return {
        presupuestos: data as Presupuesto[],
        total,
        pagina,
        por_pagina: porPagina
      };
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de presupuestos con paginación y filtros (método original)
   */
  getPresupuestos(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    estado?: string
  ): Observable<PresupuestoResponse> {
    let query = this.getSupabaseClient()
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
   * Obtiene un presupuesto por su ID usando FETCH DIRECTO
   */
  getPresupuestoDirect(id: string): Observable<Presupuesto> {
    console.log('🚀 PresupuestosService: Usando FETCH DIRECTO para presupuesto individual...');
    
    return from(this.fetchPresupuestoDirect(id)).pipe(
      map(presupuesto => {
        console.log('✅ PresupuestosService: FETCH DIRECTO completado para presupuesto individual');
        return presupuesto;
      }),
      catchError(error => {
        console.error('❌ PresupuestosService: Error en FETCH DIRECTO para presupuesto individual:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para presupuesto individual - BYPASA CLIENTE SUPABASE
   */
  private async fetchPresupuestoDirect(id: string): Promise<Presupuesto> {
    console.log('🚀 PresupuestosService: Ejecutando fetch directo para presupuesto individual...');
    
    try {
      const url = `${environment.supabaseUrl}/rest/v1/presupuestos?select=*,aviso:avisos(*,cliente:clientes(*)),albaran:albaranes(*),materiales_estimados&id=eq.${id}`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json'
      };
      
      console.log('🚀 URL construida para presupuesto individual:', url);
      
      const startTime = Date.now();
      const response = await fetch(url, { method: 'GET', headers });
      const duration = Date.now() - startTime;
      
      console.log('🚀 Fetch completado en', duration, 'ms');
      console.log('🚀 Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('🚀 Error response body:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data || data.length === 0) {
        throw new Error('Presupuesto no encontrado');
      }
      
      console.log('🚀 Datos recibidos para presupuesto individual:', data[0]);
      
      return data[0] as Presupuesto;
      
    } catch (error) {
      console.error('🚀 Error en fetch directo para presupuesto individual:', error);
      throw error;
    }
  }

  /**
   * Obtiene un presupuesto por su ID (método original)
   */
  getPresupuesto(id: string): Observable<Presupuesto> {
    console.log('Servicio: Buscando presupuesto con ID:', id);
    return from(
      this.getSupabaseClient()
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
      horas_desplazamiento: presupuesto.horas_desplazamiento || 0,
      precio_hora_desplazamiento: presupuesto.precio_hora_desplazamiento || 0,
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
      this.getSupabaseClient()
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
   * Actualiza un presupuesto existente usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  actualizarPresupuestoDirect(id: string, presupuesto: ActualizarPresupuestoRequest): Observable<Presupuesto> {
    console.log('🚀 PresupuestosService: Usando FETCH DIRECTO para actualizar presupuesto...');
    
    return from(this.fetchActualizarPresupuestoDirect(id, presupuesto)).pipe(
      map(result => {
        console.log('✅ PresupuestosService: FETCH DIRECTO completado, presupuesto actualizado:', result.id);
        return result;
      }),
      catchError(error => {
        console.error('❌ PresupuestosService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para actualizar presupuesto - BYPASA CLIENTE SUPABASE
   */
  private async fetchActualizarPresupuestoDirect(id: string, presupuesto: ActualizarPresupuestoRequest): Promise<Presupuesto> {
    console.log('🚀 PresupuestosService: Ejecutando fetch directo para actualizar presupuesto:', id);
    
    try {
      // Preparar los datos actualizados, mapeando materiales a materiales_estimados
      const datosActualizados: any = {
        fecha_actualizacion: new Date().toISOString()
      };

      // Añadir campos opcionales solo si están presentes
      if (presupuesto.aviso_id !== undefined) datosActualizados.aviso_id = presupuesto.aviso_id;
      if (presupuesto.horas_estimadas !== undefined) datosActualizados.horas_estimadas = presupuesto.horas_estimadas;
      if (presupuesto.horas_desplazamiento !== undefined) datosActualizados.horas_desplazamiento = presupuesto.horas_desplazamiento;
      if (presupuesto.precio_hora_desplazamiento !== undefined) datosActualizados.precio_hora_desplazamiento = presupuesto.precio_hora_desplazamiento;
      if (presupuesto.total_estimado !== undefined) datosActualizados.total_estimado = presupuesto.total_estimado;
      if (presupuesto.estado !== undefined) datosActualizados.estado = presupuesto.estado;
      if (presupuesto.pdf_url !== undefined) datosActualizados.pdf_url = presupuesto.pdf_url;

      // Si hay materiales, mapearlos al campo materiales_estimados
      if (presupuesto.materiales && presupuesto.materiales.length > 0) {
        datosActualizados.materiales_estimados = presupuesto.materiales;
      }

      const url = `${environment.supabaseUrl}/rest/v1/presupuestos?id=eq.${id}`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      };
      
      console.log('🚀 URL construida:', url);
      console.log('🚀 Datos a actualizar:', datosActualizados);
      
      const startTime = Date.now();
      const response = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(datosActualizados)
      });
      const duration = Date.now() - startTime;
      
      console.log('🚀 Fetch completado en', duration, 'ms');
      console.log('🚀 Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('🚀 Error response body:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('🚀 Datos recibidos:', data?.length || 0, 'presupuestos');
      
      if (!data || data.length === 0) {
        throw new Error('Presupuesto no encontrado');
      }
      
      const presupuestoActualizado = data[0] as Presupuesto;
      console.log('🚀 Presupuesto actualizado:', presupuestoActualizado);
      
      // Actualizar el estado local
      const presupuestosActuales = this.presupuestosSubject.value;
      const index = presupuestosActuales.findIndex(p => p.id === id);
      if (index !== -1) {
        presupuestosActuales[index] = presupuestoActualizado;
        this.presupuestosSubject.next([...presupuestosActuales]);
      }

      // Notificar actualización y limpiar cache
      this.dataUpdateService.notifyUpdated('presupuestos');
      
      return presupuestoActualizado;
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Actualiza un presupuesto existente (método original)
   */
  actualizarPresupuesto(id: string, presupuesto: ActualizarPresupuestoRequest): Observable<Presupuesto> {
    // Usar el método directo por defecto
    return this.actualizarPresupuestoDirect(id, presupuesto);
  }

  /**
   * Elimina un presupuesto usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  eliminarPresupuestoDirect(id: string): Observable<void> {
    console.log('🚀 PresupuestosService: Usando FETCH DIRECTO para eliminar presupuesto...');
    
    return from(this.fetchEliminarPresupuestoDirect(id)).pipe(
      map(() => {
        console.log('✅ PresupuestosService: FETCH DIRECTO completado, presupuesto eliminado');
        return void 0;
      }),
      catchError(error => {
        console.error('❌ PresupuestosService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para eliminar presupuesto - BYPASA CLIENTE SUPABASE
   */
  private async fetchEliminarPresupuestoDirect(id: string): Promise<void> {
    console.log('🚀 PresupuestosService: Ejecutando fetch directo para eliminar presupuesto:', id);
    
    try {
      const url = `${environment.supabaseUrl}/rest/v1/presupuestos?id=eq.${id}`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json'
      };
      
      console.log('🚀 URL construida:', url);
      
      const startTime = Date.now();
      const response = await fetch(url, {
        method: 'DELETE',
        headers
      });
      const duration = Date.now() - startTime;
      
      console.log('🚀 Fetch completado en', duration, 'ms');
      console.log('🚀 Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('🚀 Error response body:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      console.log('✅ Presupuesto eliminado exitosamente');
      
      // Actualizar el estado local
      const presupuestosActuales = this.presupuestosSubject.value;
      const presupuestosFiltrados = presupuestosActuales.filter(p => p.id !== id);
      this.presupuestosSubject.next(presupuestosFiltrados);

      // Notificar eliminación y limpiar cache
      this.dataUpdateService.notifyDeleted('presupuestos');
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Elimina un presupuesto (método original)
   */
  eliminarPresupuesto(id: string): Observable<void> {
    // Usar el método directo por defecto
    return this.eliminarPresupuestoDirect(id);
  }

  /**
   * Busca presupuestos por término de búsqueda
   */
  buscarPresupuestos(termino: string): Observable<Presupuesto[]> {
    return from(
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
   * Aprobar presupuesto actualizando directamente las tablas
   */
  aprobarPresupuesto(id: string): Observable<any> {
    console.log('Servicio: Aprobando presupuesto con ID:', id);
    
    // Actualizar solo el presupuesto primero para verificar que funciona
    return from(
      this.getSupabaseClient()
        .from('presupuestos')
        .update({ 
          estado: 'Aprobado',
          fecha_actualizacion: new Date().toISOString()
        })
        .eq('id', id)
        .select()
    ).pipe(
      tap(({ data, error }) => {
        if (error) {
          console.error('Error al actualizar presupuesto:', error);
        } else {
          console.log('Presupuesto actualizado exitosamente:', data);
        }
      }),
      map(({ data, error }) => {
        if (error) throw error;
        return data;
      })
    );
  }

  /**
   * Limpia el estado de presupuestos
   */
  limpiarPresupuestos(): void {
    this.presupuestosSubject.next([]);
  }
} 