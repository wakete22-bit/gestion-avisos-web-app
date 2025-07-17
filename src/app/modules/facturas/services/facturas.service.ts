import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  Factura,
  LineaFactura,
  FacturaCompleta,
  FacturaResponse,
  CrearFacturaRequest,
  ActualizarFacturaRequest,
  FacturaLista
} from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private supabase: SupabaseClient;
  private facturasSubject = new BehaviorSubject<Factura[]>([]);
  public facturas$ = this.facturasSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  /**
   * Obtiene la lista de facturas con paginación y filtros
   */
  getFacturas(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    estado?: string
  ): Observable<FacturaResponse> {
    let query = this.supabase
      .from('facturas')
      .select(`
        *,
        cliente:clientes(*),
        aviso:avisos(*)
      `, { count: 'exact' });

    // Aplicar filtros
    if (busqueda) {
      query = query.or(`numero_factura.ilike.%${busqueda}%,nombre_cliente.ilike.%${busqueda}%`);
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

        const facturas = data as Factura[];
        this.facturasSubject.next(facturas);

        return {
          facturas,
          total: count || 0,
          pagina,
          por_pagina: porPagina
        };
      }),
      catchError(error => {
        console.error('Error al obtener facturas:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene una factura por su ID con todas sus líneas
   */
  getFactura(id: string): Observable<FacturaCompleta> {
    return from(
      this.supabase
        .from('facturas')
        .select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `)
        .eq('id', id)
        .single()
    ).pipe(
      switchMap(({ data: factura, error: facturaError }) => {
        if (facturaError) throw facturaError;

        // Obtener las líneas de la factura
        return from(
          this.supabase
            .from('lineas_factura')
            .select('*')
            .eq('factura_id', id)
            .order('fecha_creacion', { ascending: true })
        ).pipe(
          map(({ data: lineas, error: lineasError }) => {
            if (lineasError) throw lineasError;

            return {
              factura: factura as Factura,
              lineas: lineas as LineaFactura[]
            };
          })
        );
      })
    );
  }

  /**
   * Crea una nueva factura con sus líneas
   */
  crearFactura(facturaCompleta: CrearFacturaRequest): Observable<FacturaCompleta> {
    const { lineas, ...facturaData } = facturaCompleta;
    
    const facturaInsert = {
      ...facturaData,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString()
    };

    return from(
      this.supabase
        .from('facturas')
        .insert([facturaInsert])
        .select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `)
        .single()
    ).pipe(
      switchMap(({ data: factura, error: facturaError }) => {
        if (facturaError) throw facturaError;

        const facturaCreada = factura as Factura;

        // Si no hay líneas, devolver solo la factura
        if (!lineas || lineas.length === 0) {
          return from([{
            factura: facturaCreada,
            lineas: []
          }]);
        }

        // Insertar las líneas de la factura
        const lineasInsert = lineas.map(linea => ({
          ...linea,
          factura_id: facturaCreada.id,
          fecha_creacion: new Date().toISOString()
        }));

        return from(
          this.supabase
            .from('lineas_factura')
            .insert(lineasInsert)
            .select()
        ).pipe(
          map(({ data: lineasCreadas, error: lineasError }) => {
            if (lineasError) throw lineasError;

            const facturasActuales = this.facturasSubject.value;
            this.facturasSubject.next([facturaCreada, ...facturasActuales]);

            return {
              factura: facturaCreada,
              lineas: lineasCreadas as LineaFactura[]
            };
          })
        );
      })
    );
  }

  /**
   * Actualiza una factura existente
   */
  actualizarFactura(id: string, facturaCompleta: ActualizarFacturaRequest): Observable<FacturaCompleta> {
    const { lineas, ...facturaData } = facturaCompleta;
    
    const facturaUpdate = {
      ...facturaData,
      fecha_actualizacion: new Date().toISOString()
    };

    return from(
      this.supabase
        .from('facturas')
        .update(facturaUpdate)
        .eq('id', id)
        .select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `)
        .single()
    ).pipe(
      switchMap(({ data: factura, error: facturaError }) => {
        if (facturaError) throw facturaError;

        const facturaActualizada = factura as Factura;

        // Si no hay líneas para actualizar, devolver solo la factura
        if (!lineas) {
          return this.getFactura(id);
        }

        // Eliminar líneas existentes y crear nuevas
        return from(
          this.supabase
            .from('lineas_factura')
            .delete()
            .eq('factura_id', id)
        ).pipe(
          switchMap(({ error: deleteError }) => {
            if (deleteError) throw deleteError;

            if (lineas.length === 0) {
              return from([{
                factura: facturaActualizada,
                lineas: []
              }]);
            }

            // Insertar las nuevas líneas
            const lineasInsert = lineas.map(linea => ({
              ...linea,
              factura_id: id,
              fecha_creacion: new Date().toISOString()
            }));

            return from(
              this.supabase
                .from('lineas_factura')
                .insert(lineasInsert)
                .select()
            ).pipe(
              map(({ data: lineasCreadas, error: lineasError }) => {
                if (lineasError) throw lineasError;

                const facturasActuales = this.facturasSubject.value;
                const index = facturasActuales.findIndex(f => f.id === id);
                if (index !== -1) {
                  facturasActuales[index] = facturaActualizada;
                  this.facturasSubject.next([...facturasActuales]);
                }

                return {
                  factura: facturaActualizada,
                  lineas: lineasCreadas as LineaFactura[]
                };
              })
            );
          })
        );
      })
    );
  }

  /**
   * Elimina una factura y todas sus líneas
   */
  eliminarFactura(id: string): Observable<void> {
    return from(
      this.supabase
        .from('lineas_factura')
        .delete()
        .eq('factura_id', id)
    ).pipe(
      switchMap(({ error: lineasError }) => {
        if (lineasError) throw lineasError;

        return from(
          this.supabase
            .from('facturas')
            .delete()
            .eq('id', id)
        );
      }),
      map(({ error }) => {
        if (error) throw error;

        const facturasActuales = this.facturasSubject.value;
        const facturasFiltradas = facturasActuales.filter(f => f.id !== id);
        this.facturasSubject.next(facturasFiltradas);
      })
    );
  }

  /**
   * Busca facturas por término de búsqueda
   */
  buscarFacturas(termino: string): Observable<Factura[]> {
    return from(
      this.supabase
        .from('facturas')
        .select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `)
        .or(`numero_factura.ilike.%${termino}%,nombre_cliente.ilike.%${termino}%`)
        .limit(10)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Factura[];
      })
    );
  }

  /**
   * Obtiene facturas por estado
   */
  getFacturasPorEstado(estado: string): Observable<Factura[]> {
    return from(
      this.supabase
        .from('facturas')
        .select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `)
        .eq('estado', estado)
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Factura[];
      })
    );
  }

  /**
   * Obtiene facturas por cliente
   */
  getFacturasPorCliente(clienteId: string): Observable<Factura[]> {
    return from(
      this.supabase
        .from('facturas')
        .select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `)
        .eq('cliente_id', clienteId)
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Factura[];
      })
    );
  }

  /**
   * Obtiene facturas por aviso
   */
  getFacturasPorAviso(avisoId: string): Observable<Factura[]> {
    return from(
      this.supabase
        .from('facturas')
        .select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `)
        .eq('aviso_id', avisoId)
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Factura[];
      })
    );
  }

  /**
   * Cambia el estado de una factura
   */
  cambiarEstado(id: string, estado: 'Pendiente' | 'En curso' | 'Completado'): Observable<Factura> {
    return from(
      this.supabase
        .from('facturas')
        .update({ 
          estado,
          fecha_actualizacion: new Date().toISOString()
        })
        .eq('id', id)
        .select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;

        const facturaActualizada = data as Factura;
        const facturasActuales = this.facturasSubject.value;
        const index = facturasActuales.findIndex(f => f.id === id);
        if (index !== -1) {
          facturasActuales[index] = facturaActualizada;
          this.facturasSubject.next([...facturasActuales]);
        }

        return facturaActualizada;
      })
    );
  }

  /**
   * Genera el siguiente número de factura
   */
  getSiguienteNumero(): Observable<string> {
    const año = new Date().getFullYear();
    
    return from(
      this.supabase
        .from('facturas')
        .select('numero_factura')
        .like('numero_factura', `F${año}-%`)
        .order('numero_factura', { ascending: false })
        .limit(1)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;

        if (!data || data.length === 0) {
          return `F${año}-001`;
        }

        const ultimoNumero = data[0].numero_factura;
        const match = ultimoNumero.match(/F\d{4}-(\d{3})/);
        
        if (match) {
          const siguiente = parseInt(match[1]) + 1;
          return `F${año}-${siguiente.toString().padStart(3, '0')}`;
        }

        return `F${año}-001`;
      })
    );
  }

  /**
   * Calcula los totales de las líneas de factura
   */
  calcularTotales(lineas: LineaFactura[]): { subtotal: number; iva: number; total: number } {
    const subtotal = lineas.reduce((acc, linea) => acc + (linea.cantidad * linea.precio_pvp), 0);
    const iva = +(subtotal * 0.21).toFixed(2);
    const total = +(subtotal + iva).toFixed(2);

    return { subtotal, iva, total };
  }

  /**
   * Obtiene el valor actual de facturas
   */
  getFacturasActuales(): Factura[] {
    return this.facturasSubject.value;
  }

  /**
   * Limpia el estado de facturas
   */
  limpiarFacturas(): void {
    this.facturasSubject.next([]);
  }
} 