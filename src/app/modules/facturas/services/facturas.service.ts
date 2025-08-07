import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
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
import { SupabaseClientService } from '../../../core/services/supabase-client.service';
import { DataUpdateService } from '../../../core/services/data-update.service';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private supabase: SupabaseClient;
  private facturasSubject = new BehaviorSubject<Factura[]>([]);
  public facturas$ = this.facturasSubject.asObservable();

  constructor(
    private supabaseClientService: SupabaseClientService,
    private dataUpdateService: DataUpdateService
  ) {
    this.supabase = this.supabaseClientService.getClient();
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
                  this.supabase
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
      this.supabase
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

        // Notificar eliminación y limpiar cache
        this.dataUpdateService.notifyDeleted('facturas');
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
      this.supabase
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
      }),
      // Agregar un pequeño delay para evitar conflictos de concurrencia
      tap(() => new Promise(resolve => setTimeout(resolve, 100)))
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

  /**
   * Crea una factura automáticamente desde un presupuesto aprobado
   */
  crearFacturaDesdePresupuesto(presupuestoId: string): Observable<FacturaCompleta> {
    // Primero obtener el presupuesto completo con materiales
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
            // Preparar datos de la factura
            const cliente = presupuestoData.aviso.cliente;
            const facturaData: CrearFacturaRequest = {
              numero_factura: numeroFactura,
              fecha_emision: new Date().toISOString().split('T')[0],
              cliente_id: cliente?.id,
              nombre_cliente: cliente?.nombre_completo || presupuestoData.aviso.nombre_cliente_aviso,
              direccion_cliente: cliente?.direccion || presupuestoData.aviso.direccion_cliente_aviso,
              cif_cliente: cliente?.cif || 'Sin CIF',
              email_cliente: cliente?.email || 'sin-email@ejemplo.com',
              aviso_id: presupuestoData.aviso_id,
              subtotal: 0,
              iva: 0,
              total: 0,
              estado: 'Pendiente',
              notas: `Factura generada desde presupuesto ${presupuestoId}`,
              lineas: []
            };

            // Convertir materiales del presupuesto en líneas de factura
            const lineasMateriales: LineaFactura[] = presupuestoData.materiales?.map((material: any) => ({
              tipo: 'repuesto' as const,
              nombre: material.material?.nombre || 'Material desconocido',
              cantidad: material.cantidad_estimada,
              precio_neto: material.material?.precio_neto || 0,
              precio_pvp: material.precio_unitario_al_momento,
              descripcion: `Material del presupuesto: ${material.material?.descripcion || ''}`
            })) || [];

            // Agregar línea de mano de obra si hay horas estimadas
            if (presupuestoData.horas_estimadas && presupuestoData.horas_estimadas > 0) {
              const precioHora = 50; // Esto debería venir de configuración
              lineasMateriales.push({
                tipo: 'mano_obra',
                nombre: 'Mano de obra',
                cantidad: presupuestoData.horas_estimadas,
                precio_pvp: precioHora,
                descripcion: `${presupuestoData.horas_estimadas} horas de trabajo técnico`
              });
            }

            facturaData.lineas = lineasMateriales;

            // Calcular totales
            const totales = this.calcularTotales(lineasMateriales);
            facturaData.subtotal = totales.subtotal;
            facturaData.iva = totales.iva;
            facturaData.total = totales.total;

            // Crear la factura
            return this.crearFactura(facturaData).pipe(
              switchMap(facturaCreada => {
                // Actualizar el presupuesto para marcar que ya fue facturado
                return from(
                  this.supabase
                    .from('presupuestos')
                    .update({ 
                      estado: 'Facturado', // Nuevo estado
                      fecha_actualizacion: new Date().toISOString() 
                    })
                    .eq('id', presupuestoId)
                ).pipe(
                  map(() => facturaCreada)
                );
              })
            );
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
   * Obtiene presupuestos listos para facturar
   */
  getPresupuestosListosParaFacturar(): Observable<any[]> {
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