import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { 
  Cliente, 
  ClienteResponse, 
  CrearClienteRequest, 
  ActualizarClienteRequest 
} from '../../modules/clientes/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private supabase: SupabaseClient;
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientesSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
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
    let query = this.supabase
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
   * Obtiene un cliente por su ID
   */
  getCliente(id: string): Observable<Cliente> {
    return from(
      this.supabase
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
      this.supabase
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
      this.supabase
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
        
        return clienteActualizado;
      })
    );
  }

  /**
   * Elimina un cliente (marcar como inactivo)
   */
  eliminarCliente(id: string): Observable<void> {
    return from(
      this.supabase
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
      })
    );
  }

  /**
   * Busca clientes por término de búsqueda
   */
  buscarClientes(termino: string): Observable<Cliente[]> {
    return from(
      this.supabase
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