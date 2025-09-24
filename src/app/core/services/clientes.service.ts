import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { 
  Cliente, 
  ClienteResponse, 
  CrearClienteRequest, 
  ActualizarClienteRequest 
} from '../../modules/clientes/models/cliente.model';
import { SupabaseClientService } from './supabase-client.service';
import { DataUpdateService } from './data-update.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientesSubject.asObservable();

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
    console.log('👥 ClientesService: Obteniendo cliente Supabase actualizado...');
    return this.supabaseClientService.getClient();
  }

  /**
   * Obtiene la lista de clientes con paginación y filtros
   */
  getClientes(
    pagina: number = 1, 
    porPagina: number = 10, 
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    soloActivos: boolean = false
  ): Observable<ClienteResponse> {
    let query = this.getSupabaseClient()
      .from('clientes')
      .select('*', { count: 'exact' });

    // Aplicar filtros
    if (busqueda) {
      query = query.or(`nombre_completo.ilike.%${busqueda}%,email.ilike.%${busqueda}%`);
    }

    // Filtrar por estado activo solo si se solicita explícitamente
    if (soloActivos) {
      query = query.eq('es_activo', true);
    }

    // Aplicar paginación y ordenamiento
    const desde = (pagina - 1) * porPagina;
    query = query
      .range(desde, desde + porPagina - 1)
      .order(ordenarPor || 'fecha_creacion', { ascending: orden === 'asc' });

    return from(query).pipe(
      map(({ data, error, count }) => {
        if (error) throw error;
        
        const clientes = data as Cliente[];
        this.clientesSubject.next(clientes);
        
        return {
          clientes,
          total: count || 0,
          pagina,
          por_pagina: porPagina
        };
      }),
      catchError(error => {
        console.error('Error al obtener clientes:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene la lista de clientes usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  getClientesDirect(
    pagina: number = 1, 
    porPagina: number = 10, 
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    soloActivos: boolean = false
  ): Observable<ClienteResponse> {
    console.log('🚀 ClientesService: Usando FETCH DIRECTO para clientes...');
    
    return from(this.fetchClientesDirect(pagina, porPagina, busqueda, ordenarPor, orden, soloActivos)).pipe(
      map(result => {
        console.log('✅ ClientesService: FETCH DIRECTO completado, clientes:', result.clientes.length);
        
        // Actualizar el subject local
        this.clientesSubject.next(result.clientes);
        
        return result;
      }),
      catchError(error => {
        console.error('❌ ClientesService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para clientes - BYPASA CLIENTE SUPABASE
   */
  private async fetchClientesDirect(
    pagina: number = 1, 
    porPagina: number = 10, 
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    soloActivos: boolean = false
  ): Promise<ClienteResponse> {
    console.log('🚀 ClientesService: Ejecutando fetch directo para clientes...');
    
    try {
      // Construir URL con parámetros
      let url = `${environment.supabaseUrl}/rest/v1/clientes?select=*`;

      // Aplicar filtros
      const filters: string[] = [];
      
      if (busqueda) {
        filters.push(`or=(nombre_completo.ilike.*${busqueda}*,email.ilike.*${busqueda}*)`);
      }
      
      if (soloActivos) {
        filters.push(`es_activo=eq.true`);
      }
      
      if (filters.length > 0) {
        url += '&' + filters.join('&');
      }
      
      // Aplicar paginación y ordenamiento
      const desde = (pagina - 1) * porPagina;
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
      
      console.log('🚀 Datos recibidos:', data?.length || 0, 'clientes, total:', total);
      
      return {
        clientes: data as Cliente[],
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
   * Obtiene un cliente por su ID
   */
  getCliente(id: string): Observable<Cliente> {
    return from(
      this.getSupabaseClient()
        .from('clientes')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Cliente;
      })
    );
  }

  /**
   * Crea un nuevo cliente
   */
  crearCliente(cliente: CrearClienteRequest): Observable<Cliente> {
    const clienteData = {
      ...cliente,
      fecha_creacion: new Date().toISOString(),
      es_activo: cliente.es_activo ?? true
    };

    return from(
      this.getSupabaseClient()
        .from('clientes')
        .insert([clienteData])
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const nuevoCliente = data as Cliente;
        const clientesActuales = this.clientesSubject.value;
        this.clientesSubject.next([nuevoCliente, ...clientesActuales]);
        
        // Notificar creación y limpiar cache
        this.dataUpdateService.notifyCreated('clientes');
        
        return nuevoCliente;
      })
    );
  }

  /**
   * Actualiza un cliente existente
   */
  actualizarCliente(id: string, cliente: ActualizarClienteRequest): Observable<Cliente> {
    const datosActualizados = {
      ...cliente,
      fecha_actualizacion: new Date().toISOString()
    };

    return from(
      this.getSupabaseClient()
        .from('clientes')
        .update(datosActualizados)
        .eq('id', id)
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const clienteActualizado = data as Cliente;
        const clientesActuales = this.clientesSubject.value;
        const index = clientesActuales.findIndex(c => c.id === id);
        if (index !== -1) {
          clientesActuales[index] = clienteActualizado;
          this.clientesSubject.next([...clientesActuales]);
        }
        
        // Notificar actualización y limpiar cache
        this.dataUpdateService.notifyUpdated('clientes');
        
        return clienteActualizado;
      })
    );
  }

  /**
   * Actualiza un cliente existente usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  actualizarClienteDirect(id: string, cliente: ActualizarClienteRequest): Observable<Cliente> {
    console.log('🚀 ClientesService: Usando FETCH DIRECTO para actualizar cliente...');
    
    return from(this.fetchActualizarClienteDirect(id, cliente)).pipe(
      map(result => {
        console.log('✅ ClientesService: FETCH DIRECTO completado, cliente actualizado:', result.id);
        
        // Actualizar el subject local
        const clientesActuales = this.clientesSubject.value;
        const index = clientesActuales.findIndex(c => c.id === id);
        if (index !== -1) {
          clientesActuales[index] = result;
          this.clientesSubject.next([...clientesActuales]);
        }
        
        // Notificar actualización y limpiar cache
        this.dataUpdateService.notifyUpdated('clientes');
        
        return result;
      }),
      catchError(error => {
        console.error('❌ ClientesService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para actualizar cliente - BYPASA CLIENTE SUPABASE
   */
  private async fetchActualizarClienteDirect(id: string, cliente: ActualizarClienteRequest): Promise<Cliente> {
    console.log('🚀 ClientesService: Ejecutando fetch directo para actualizar cliente:', id);
    
    try {
      const datosActualizados = {
        ...cliente,
        fecha_actualizacion: new Date().toISOString()
      };

      const url = `${environment.supabaseUrl}/rest/v1/clientes?id=eq.${id}`;
      
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
      console.log('🚀 Datos recibidos:', data?.length || 0, 'clientes actualizados');
      
      if (!data || data.length === 0) {
        throw new Error('Cliente no encontrado');
      }
      
      return data[0] as Cliente;
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Elimina un cliente (marcar como inactivo)
   */
  eliminarCliente(id: string): Observable<void> {
    return from(
      this.getSupabaseClient()
        .from('clientes')
        .update({ 
          es_activo: false,
          fecha_actualizacion: new Date().toISOString()
        })
        .eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
        
        const clientesActuales = this.clientesSubject.value;
        const index = clientesActuales.findIndex(c => c.id === id);
        if (index !== -1) {
          clientesActuales[index].es_activo = false;
          this.clientesSubject.next([...clientesActuales]);
        }

        // Notificar eliminación y limpiar cache
        this.dataUpdateService.notifyDeleted('clientes');
      })
    );
  }

  /**
   * Elimina un cliente usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  eliminarClienteDirect(id: string): Observable<void> {
    console.log('🚀 ClientesService: Usando FETCH DIRECTO para eliminar cliente...');
    
    return from(this.fetchEliminarClienteDirect(id)).pipe(
      map(() => {
        console.log('✅ ClientesService: FETCH DIRECTO completado, cliente eliminado:', id);
        
        // Actualizar el subject local
        const clientesActuales = this.clientesSubject.value;
        const index = clientesActuales.findIndex(c => c.id === id);
        if (index !== -1) {
          clientesActuales[index].es_activo = false;
          this.clientesSubject.next([...clientesActuales]);
        }

        // Notificar eliminación y limpiar cache
        this.dataUpdateService.notifyDeleted('clientes');
        
        return void 0;
      }),
      catchError(error => {
        console.error('❌ ClientesService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para eliminar cliente - BYPASA CLIENTE SUPABASE
   */
  private async fetchEliminarClienteDirect(id: string): Promise<void> {
    console.log('🚀 ClientesService: Ejecutando fetch directo para eliminar cliente:', id);
    
    try {
      const datosActualizados = {
        es_activo: false,
        fecha_actualizacion: new Date().toISOString()
      };

      const url = `${environment.supabaseUrl}/rest/v1/clientes?id=eq.${id}`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json'
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
      
      console.log('🚀 Cliente eliminado exitosamente');
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Busca clientes por término de búsqueda
   */
  buscarClientes(termino: string): Observable<Cliente[]> {
    return from(
      this.getSupabaseClient()
        .from('clientes')
        .select('*')
        .or(`nombre_completo.ilike.%${termino}%,email.ilike.%${termino}%`)
        .eq('es_activo', true)
        .limit(10)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Cliente[];
      })
    );
  }

  /**
   * Obtiene el valor actual de clientes
   */
  getClientesActuales(): Cliente[] {
    return this.clientesSubject.value;
  }

  /**
   * Limpia el estado de clientes
   */
  limpiarClientes(): void {
    this.clientesSubject.next([]);
  }
} 