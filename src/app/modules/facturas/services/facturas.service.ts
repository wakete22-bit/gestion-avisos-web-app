import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from, combineLatest, of } from 'rxjs';
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
import { SupabaseClientService } from '../../../core/services/supabase-client.service';
import { DataUpdateService } from '../../../core/services/data-update.service';
import { ConfiguracionService } from '../../../core/services/configuracion.service';
import { AvisosService } from '../../../core/services/avisos.service';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private facturasSubject = new BehaviorSubject<Factura[]>([]);
  public facturas$ = this.facturasSubject.asObservable();

  constructor(
    private supabaseClientService: SupabaseClientService,
    private dataUpdateService: DataUpdateService,
    private configuracionService: ConfiguracionService,
    private avisosService: AvisosService
  ) {
    // NO asignar cliente estático - usar método dinámico
  }

  /**
   * Obtiene el cliente Supabase actualizado dinámicamente
   */
  private getSupabaseClient(): SupabaseClient {
    console.log('💰 FacturasService: Obteniendo cliente Supabase actualizado...');
    return this.supabaseClientService.getClient();
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
    let query = this.getSupabaseClient()
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
   * Obtiene la lista de facturas usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  getFacturasDirect(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    estado?: string
  ): Observable<FacturaResponse> {
    console.log('🚀 FacturasService: Usando FETCH DIRECTO para facturas...');
    
    return from(this.fetchFacturasDirect(pagina, porPagina, busqueda, ordenarPor, orden, estado)).pipe(
      map(result => {
        console.log('✅ FacturasService: FETCH DIRECTO completado, facturas:', result.facturas.length);
        
        // Actualizar el subject local
        this.facturasSubject.next(result.facturas);
        
        return result;
      }),
      catchError(error => {
        console.error('❌ FacturasService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para facturas - BYPASA CLIENTE SUPABASE
   */
  private async fetchFacturasDirect(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    estado?: string
  ): Promise<FacturaResponse> {
    console.log('🚀 FacturasService: Ejecutando fetch directo para facturas...');
    
    try {
      // Construir URL con parámetros
      let url = `${environment.supabaseUrl}/rest/v1/facturas?select=*,cliente:clientes(*),aviso:avisos(*)`;

      // Aplicar filtros
      const filters: string[] = [];
      
      if (busqueda) {
        filters.push(`or=(numero_factura.ilike.*${busqueda}*,nombre_cliente.ilike.*${busqueda}*)`);
      }
      
      if (estado) {
        filters.push(`estado=eq.${estado}`);
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
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      const contentRange = response.headers.get('content-range');
      const total = contentRange ? parseInt(contentRange.split('/')[1]) : data.length;
      
      console.log('🚀 Datos recibidos:', data?.length || 0, 'facturas, total:', total);
      
      return {
        facturas: data as Factura[],
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
   * Obtiene una factura por su ID usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  getFacturaDirect(id: string): Observable<FacturaCompleta> {
    console.log('🚀 FacturasService: Usando FETCH DIRECTO para factura individual...');
    
    return from(this.fetchFacturaDirect(id)).pipe(
      map(factura => {
        console.log('✅ FacturasService: FETCH DIRECTO completado, factura:', factura?.factura?.id);
        return factura;
      }),
      catchError(error => {
        console.error('❌ FacturasService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para factura individual - BYPASA CLIENTE SUPABASE
   */
  private async fetchFacturaDirect(id: string): Promise<FacturaCompleta> {
    console.log('🚀 FacturasService: Ejecutando fetch directo para factura:', id);
    
    try {
      const url = `${environment.supabaseUrl}/rest/v1/facturas?select=*,cliente:clientes(*),aviso:avisos(*),lineas:lineas_factura(*)&id=eq.${id}`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json'
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
      console.log('🚀 Datos recibidos:', data?.length || 0, 'facturas');
      
      if (!data || data.length === 0) {
        throw new Error('Factura no encontrada');
      }
      
      const facturaData = data[0];
      console.log('🚀 Estructura de factura recibida:', facturaData);
      
      // Devolver en formato FacturaCompleta: { factura, lineas }
      return {
        factura: facturaData,
        lineas: facturaData.lineas || []
      } as FacturaCompleta;
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Obtiene una factura por su ID con todas sus líneas (método original)
   */
  getFactura(id: string): Observable<FacturaCompleta> {
    return from(
      this.getSupabaseClient()
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
          this.getSupabaseClient()
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
    
    // Validar y asegurar que los campos numéricos tengan valores válidos
    const facturaInsert = {
      ...facturaData,
      subtotal: facturaData.subtotal || 0,
      iva: facturaData.iva || 0,
      total: facturaData.total || 0,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString()
    };

    // Validar que los valores numéricos sean válidos
    if (isNaN(facturaInsert.subtotal) || !isFinite(facturaInsert.subtotal)) {
      console.error('❌ Subtotal inválido:', facturaInsert.subtotal);
      facturaInsert.subtotal = 0;
    }
    if (isNaN(facturaInsert.iva) || !isFinite(facturaInsert.iva)) {
      console.error('❌ IVA inválido:', facturaInsert.iva);
      facturaInsert.iva = 0;
    }
    if (isNaN(facturaInsert.total) || !isFinite(facturaInsert.total)) {
      console.error('❌ Total inválido:', facturaInsert.total);
      facturaInsert.total = 0;
    }

    console.log('📋 Insertando factura con datos:', facturaInsert);

    return from(
      this.getSupabaseClient()
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
        if (facturaError) {
          // Si es un error de duplicación, intentar con un nuevo número
          if (facturaError.code === '23505' && facturaError.message.includes('numero_factura')) {
            console.warn('Número de factura duplicado, generando nuevo número...');
            return this.getSiguienteNumero().pipe(
              switchMap(nuevoNumero => {
                const facturaRetry = {
                  ...facturaInsert,
                  numero_factura: nuevoNumero
                };
                
                return from(
                  this.getSupabaseClient()
                    .from('facturas')
                    .insert([facturaRetry])
                    .select(`
                      *,
                      cliente:clientes(*),
                      aviso:avisos(*)
                    `)
                    .single()
                ).pipe(
                  switchMap(({ data: facturaRetryData, error: retryError }) => {
                    if (retryError) throw retryError;
                    return this.procesarLineasFactura(facturaRetryData as Factura, lineas);
                  })
                );
              })
            );
          }
          throw facturaError;
        }

        return this.procesarLineasFactura(factura as Factura, lineas);
      })
    );
  }

  /**
   * Procesa las líneas de factura después de crear la factura
   */
  private procesarLineasFactura(factura: Factura, lineas: LineaFactura[]): Observable<FacturaCompleta> {
    // Si no hay líneas, devolver solo la factura
    if (!lineas || lineas.length === 0) {
      const facturasActuales = this.facturasSubject.value;
      this.facturasSubject.next([factura, ...facturasActuales]);
      
      // Notificar creación y limpiar cache
      this.dataUpdateService.notifyCreated('facturas');
      
      return from([{
        factura,
        lineas: []
      }]);
    }

    // Insertar las líneas de la factura
    const lineasInsert = lineas.map(linea => ({
      ...linea,
      factura_id: factura.id,
      fecha_creacion: new Date().toISOString()
    }));

    return from(
      this.getSupabaseClient()
        .from('lineas_factura')
        .insert(lineasInsert)
        .select()
    ).pipe(
      map(({ data: lineasCreadas, error: lineasError }) => {
        if (lineasError) throw lineasError;

        const facturasActuales = this.facturasSubject.value;
        this.facturasSubject.next([factura, ...facturasActuales]);

        // Notificar creación y limpiar cache
        this.dataUpdateService.notifyCreated('facturas');

        return {
          factura,
          lineas: lineasCreadas as LineaFactura[]
        };
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
      this.getSupabaseClient()
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
          this.getSupabaseClient()
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
              this.getSupabaseClient()
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

                // Notificar actualización y limpiar cache
                this.dataUpdateService.notifyUpdated('facturas');

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
   * Elimina una factura usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  eliminarFacturaDirect(id: string): Observable<void> {
    console.log('🚀 FacturasService: Usando FETCH DIRECTO para eliminar factura...');
    
    return from(this.fetchEliminarFacturaDirect(id)).pipe(
      map(() => {
        console.log('✅ FacturasService: FETCH DIRECTO completado, factura eliminada');
        return void 0;
      }),
      catchError(error => {
        console.error('❌ FacturasService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para eliminar factura - BYPASA CLIENTE SUPABASE
   */
  private async fetchEliminarFacturaDirect(id: string): Promise<void> {
    console.log('🚀 FacturasService: Ejecutando fetch directo para eliminar factura:', id);
    
    try {
      // Primero obtener la información de la factura para saber el aviso asociado
      const getUrl = `${environment.supabaseUrl}/rest/v1/facturas?select=aviso_id&id=eq.${id}`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json'
      };
      
      console.log('🚀 Obteniendo información de la factura:', getUrl);
      
      const getResponse = await fetch(getUrl, { method: 'GET', headers });
      
      if (!getResponse.ok) {
        throw new Error(`HTTP ${getResponse.status}: ${getResponse.statusText}`);
      }
      
      const facturaData = await getResponse.json();
      
      if (!facturaData || facturaData.length === 0) {
        throw new Error('Factura no encontrada');
      }
      
      const avisoId = facturaData[0].aviso_id;
      console.log('🗑️ Eliminando factura y actualizando aviso:', avisoId);

      // Eliminar las líneas de factura primero
      const deleteLineasUrl = `${environment.supabaseUrl}/rest/v1/lineas_factura?factura_id=eq.${id}`;
      
      console.log('🚀 Eliminando líneas de factura:', deleteLineasUrl);
      
      const deleteLineasResponse = await fetch(deleteLineasUrl, {
        method: 'DELETE',
        headers
      });
      
      if (!deleteLineasResponse.ok) {
        console.warn('⚠️ Error al eliminar líneas de factura:', deleteLineasResponse.status);
        // Continuar aunque falle la eliminación de líneas
      } else {
        console.log('✅ Líneas de factura eliminadas');
      }

      // Eliminar la factura
      const deleteFacturaUrl = `${environment.supabaseUrl}/rest/v1/facturas?id=eq.${id}`;
      
      console.log('🚀 Eliminando factura:', deleteFacturaUrl);
      
      const deleteFacturaResponse = await fetch(deleteFacturaUrl, {
        method: 'DELETE',
        headers
      });
      
      if (!deleteFacturaResponse.ok) {
        throw new Error(`HTTP ${deleteFacturaResponse.status}: ${deleteFacturaResponse.statusText}`);
      }
      
      console.log('✅ Factura eliminada exitosamente');

      // Actualizar el estado local
      const facturasActuales = this.facturasSubject.value;
      const facturasFiltradas = facturasActuales.filter(f => f.id !== id);
      this.facturasSubject.next(facturasFiltradas);

      // Notificar eliminación y limpiar cache
      this.dataUpdateService.notifyDeleted('facturas');
      
      // Actualizar el estado del aviso después de eliminar la factura (solo si no está completado)
      if (avisoId) {
        console.log('🔄 Verificando estado del aviso antes de actualizar:', avisoId);
        try {
          // Primero obtener el estado actual del aviso
          const getAvisoUrl = `${environment.supabaseUrl}/rest/v1/avisos?select=estado&id=eq.${avisoId}`;
          
          const getAvisoResponse = await fetch(getAvisoUrl, {
            method: 'GET',
            headers
          });
          
          if (getAvisoResponse.ok) {
            const avisoData = await getAvisoResponse.json();
            
            if (avisoData && avisoData.length > 0) {
              const estadoActual = avisoData[0].estado;
              console.log('📊 Estado actual del aviso:', estadoActual);
              
              // Solo actualizar si no está completado
              if (estadoActual !== 'Completado') {
                console.log('🔄 Actualizando estado del aviso a "En curso"...');
                await this.avisosService.actualizarAvisoDirect(avisoId, { estado: 'En curso' }).toPromise();
                console.log('✅ Estado del aviso actualizado a "En curso"');
              } else {
                console.log('ℹ️ El aviso ya está completado, no se actualiza el estado');
              }
            } else {
              console.log('⚠️ No se pudo obtener información del aviso');
            }
          } else {
            console.log('⚠️ No se pudo verificar el estado del aviso');
          }
        } catch (error) {
          console.error('❌ Error al verificar/actualizar estado del aviso:', error);
          // Continuar aunque falle la actualización del estado
        }
      }
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Elimina una factura y todas sus líneas (método original - DEPRECATED)
   */
  eliminarFactura(id: string): Observable<void> {
    // Usar el método directo por defecto
    return this.eliminarFacturaDirect(id);
  }

  /**
   * Busca facturas por término de búsqueda usando FETCH DIRECTO
   */
  buscarFacturasDirect(termino: string): Observable<Factura[]> {
    console.log('🚀 FacturasService: Usando FETCH DIRECTO para búsqueda de facturas...');
    
    return from(this.fetchBuscarFacturasDirect(termino)).pipe(
      map(facturas => {
        console.log('✅ FacturasService: FETCH DIRECTO completado para búsqueda, facturas:', facturas.length);
        return facturas;
      }),
      catchError(error => {
        console.error('❌ FacturasService: Error en FETCH DIRECTO para búsqueda:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para búsqueda de facturas - BYPASA CLIENTE SUPABASE
   */
  private async fetchBuscarFacturasDirect(termino: string): Promise<Factura[]> {
    console.log('🚀 FacturasService: Ejecutando fetch directo para búsqueda de facturas...');
    
    try {
      const url = `${environment.supabaseUrl}/rest/v1/facturas?select=*,cliente:clientes(*),aviso:avisos(*)&or=(numero_factura.ilike.*${termino}*,nombre_cliente.ilike.*${termino}*)&limit=10`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json'
      };
      
      console.log('🚀 URL construida para búsqueda:', url);
      
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
      
      console.log('🚀 Datos recibidos para búsqueda:', data?.length || 0, 'facturas');
      
      return data as Factura[];
      
    } catch (error) {
      console.error('🚀 Error en fetch directo para búsqueda:', error);
      throw error;
    }
  }

  /**
   * Busca facturas por término de búsqueda (método original)
   */
  buscarFacturas(termino: string): Observable<Factura[]> {
    return from(
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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

        // Notificar actualización y limpiar cache
        this.dataUpdateService.notifyUpdated('facturas');

        return facturaActualizada;
      })
    );
  }

  /**
   * Obtiene el siguiente número de factura de forma atómica
   */
  getSiguienteNumero(): Observable<string> {
    return from(
      this.getSupabaseClient()
        .rpc('obtener_siguiente_numero_factura')
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('Error al obtener número de factura:', error);
          // Fallback al método anterior si la función no existe
          return this.getSiguienteNumeroFallback();
        }
        return data;
      }),
      catchError(error => {
        console.error('Error en RPC, usando fallback:', error);
        return this.getSiguienteNumeroFallback();
      })
    );
  }

  /**
   * Método fallback para obtener el siguiente número de factura con retry
   */
  private getSiguienteNumeroFallback(): Observable<string> {
    const año = new Date().getFullYear();
    
    return from(
      this.getSupabaseClient()
        .from('facturas')
        .select('numero_factura')
        .like('numero_factura', `FAC-${año}-%`)
        .order('numero_factura', { ascending: false })
        .limit(1)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;

        if (!data || data.length === 0) {
          return `FAC-${año}-001`;
        }

        const ultimoNumero = data[0].numero_factura;
        const match = ultimoNumero.match(/FAC-\d{4}-(\d{3})/);
        
        if (match) {
          const siguiente = parseInt(match[1]) + 1;
          return `FAC-${año}-${siguiente.toString().padStart(3, '0')}`;
        }

        return `FAC-${año}-001`;
      }),
      // Agregar un pequeño delay para evitar conflictos de concurrencia
      tap(() => new Promise(resolve => setTimeout(resolve, 100)))
    );
  }

  /**
   * Calcula los totales de las líneas de factura usando configuración de BD
   */
  calcularTotales(lineas: LineaFactura[]): Observable<{ subtotal: number; iva: number; total: number }> {
    // Validar que lineas sea un array válido
    if (!lineas || !Array.isArray(lineas) || lineas.length === 0) {
      console.warn('⚠️ No hay líneas de factura para calcular totales');
      return of({ subtotal: 0, iva: 0, total: 0 });
    }

    // Obtener IVA de la configuración
    return this.configuracionService.getIvaPorDefecto().pipe(
      map(ivaPorcentaje => {
        // Calcular subtotal con validación de valores
        const subtotal = lineas.reduce((acc, linea) => {
          const cantidad = linea.cantidad || 0;
          const precio = linea.precio_pvp || 0;
          const subtotalLinea = cantidad * precio;
          
          // Validar que el resultado sea un número válido
          if (isNaN(subtotalLinea) || !isFinite(subtotalLinea)) {
            console.warn(`⚠️ Línea con valores inválidos:`, linea);
            return acc;
          }
          
          return acc + subtotalLinea;
        }, 0);

        // Validar subtotal
        if (isNaN(subtotal) || !isFinite(subtotal)) {
          console.warn('⚠️ Subtotal calculado es inválido, usando 0');
          return { subtotal: 0, iva: 0, total: 0 };
        }

        // Calcular IVA usando el porcentaje de la configuración
        const iva = +(subtotal * (ivaPorcentaje / 100)).toFixed(2);
        
        // Calcular total
        const total = +(subtotal + iva).toFixed(2);

        console.log('🧮 Cálculo de totales:', {
          lineas: lineas.length,
          subtotal,
          iva,
          total,
          ivaPorcentaje
        });

        return { subtotal, iva, total };
      })
    );
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

  /**
   * Crea una factura automáticamente desde un presupuesto aprobado
   */
  crearFacturaDesdePresupuesto(presupuestoId: string): Observable<FacturaCompleta> {
    // Primero obtener el presupuesto completo con materiales
    return from(
      this.getSupabaseClient()
        .from('presupuestos')
        .select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          ),
          materiales_estimados
        `)
        .eq('id', presupuestoId)
        .single()
    ).pipe(
      switchMap(({ data: presupuesto, error: presupuestoError }) => {
        if (presupuestoError) throw presupuestoError;

        const presupuestoData = presupuesto as any;
        
        // Validar que el presupuesto esté aprobado
        if (presupuestoData.estado !== 'Completado') {
          throw new Error('Solo se pueden facturar presupuestos aprobados');
        }
        
        // Validar que el presupuesto tenga un aviso asociado
        if (!presupuestoData.aviso) {
          throw new Error('El presupuesto no tiene un aviso asociado');
        }

        // Generar número de factura
        return this.getSiguienteNumero().pipe(
          switchMap(numeroFactura => {
            // Convertir materiales del presupuesto en líneas de factura
            const lineasMateriales: LineaFactura[] = [];
            
            // Procesar materiales estimados del presupuesto (JSONB)
            if (presupuestoData.materiales_estimados && Array.isArray(presupuestoData.materiales_estimados)) {
              presupuestoData.materiales_estimados.forEach((material: any) => {
                lineasMateriales.push({
                  tipo: 'repuesto' as const,
                  nombre: material.nombre || 'Material desconocido',
                  cantidad: material.cantidad || 0,
                  precio_neto: material.precio_neto || 0,
                  precio_pvp: material.precio_pvp || 0,
                  descripcion: `Material del presupuesto: ${material.descripcion || ''}`
                });
              });
            }

            // Agregar línea de mano de obra si hay horas estimadas
            if (presupuestoData.horas_estimadas && presupuestoData.horas_estimadas > 0) {
              // Obtener precio por hora de la configuración
              return this.configuracionService.getPrecioHoraManoObra().pipe(
                switchMap(precioHora => {
                  lineasMateriales.push({
                    tipo: 'mano_obra',
                    nombre: 'Mano de obra',
                    cantidad: presupuestoData.horas_estimadas,
                    precio_pvp: precioHora,
                    descripcion: `${presupuestoData.horas_estimadas} horas de trabajo técnico`
                  });

                  // Calcular totales ANTES de crear la factura
                  return this.calcularTotales(lineasMateriales);
                }),
                switchMap(totales => {
                  return this.crearFacturaConDatos(presupuestoData, numeroFactura, lineasMateriales, totales, presupuestoId);
                })
              );
            } else {
              // Calcular totales sin mano de obra
              return this.calcularTotales(lineasMateriales).pipe(
                switchMap(totales => {
                  return this.crearFacturaConDatos(presupuestoData, numeroFactura, lineasMateriales, totales, presupuestoId);
                })
              );
            }
          })
        );
      }),
      catchError(error => {
        console.error('Error al crear factura desde presupuesto:', error);
        throw error;
      })
    );
  }

  /**
   * Método auxiliar para crear la factura con los datos preparados
   */
  private crearFacturaConDatos(
    presupuestoData: any, 
    numeroFactura: string, 
    lineasMateriales: LineaFactura[], 
    totales: { subtotal: number; iva: number; total: number },
    presupuestoId: string
  ): Observable<FacturaCompleta> {
    // Validar que los totales sean números válidos
    const subtotal = totales.subtotal || 0;
    const iva = totales.iva || 0;
    const total = totales.total || 0;

    console.log('📊 Totales calculados:', { subtotal, iva, total });

    // Preparar datos de la factura con valores validados
    const cliente = presupuestoData.aviso.cliente;
    const facturaData: CrearFacturaRequest = {
      numero_factura: numeroFactura,
      fecha_emision: new Date().toISOString().split('T')[0],
      cliente_id: cliente?.id,
      nombre_cliente: cliente?.nombre_completo || presupuestoData.aviso.nombre_cliente_aviso || 'Cliente',
      direccion_cliente: cliente?.direccion || presupuestoData.aviso.direccion_cliente_aviso || 'Sin dirección',
      cif_cliente: cliente?.cif || 'Sin CIF',
      email_cliente: cliente?.email || 'sin-email@ejemplo.com',
      aviso_id: presupuestoData.aviso_id,
      subtotal: subtotal,
      iva: iva,
      total: total,
      estado: 'Pendiente',
      notas: `Factura generada desde presupuesto ${presupuestoId}`,
      lineas: lineasMateriales
    };

    console.log('📋 Datos de factura a crear:', facturaData);

    // Crear la factura
    return this.crearFactura(facturaData).pipe(
      switchMap(facturaCreada => {
        // Actualizar el presupuesto para marcar que ya fue facturado
        return from(
          this.getSupabaseClient()
            .from('presupuestos')
            .update({ 
              estado: 'Facturado',
              fecha_actualizacion: new Date().toISOString() 
            })
            .eq('id', presupuestoId)
        ).pipe(
          map(() => facturaCreada)
        );
      })
    );
  }

  /**
   * Obtiene presupuestos listos para facturar
   */
  getPresupuestosListosParaFacturar(): Observable<any[]> {
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
        .eq('estado', 'Completado')
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data || [];
      })
    );
  }
} 