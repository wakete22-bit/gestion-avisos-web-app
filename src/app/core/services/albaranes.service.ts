import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseClientService } from './supabase-client.service';
import { Albaran, CrearAlbaranRequest } from '../../modules/avisos/models/albaran.model';
import { InventarioService } from '../../modules/inventario/services/inventario.service';

// Las interfaces ahora se importan del modelo albaran.model.ts

@Injectable({
  providedIn: 'root'
})
export class AlbaranesService {
  private supabase: SupabaseClient;

  constructor(
    private supabaseClientService: SupabaseClientService,
    private inventarioService: InventarioService
  ) {
    this.supabase = this.supabaseClientService.getClient();
  }

  /**
   * Crea un nuevo albarán
   */
  crearAlbaran(albaranData: CrearAlbaranRequest): Observable<Albaran> {
    console.log('📋 Creando albarán con datos:', albaranData);
    
    // Extraer repuestos para procesarlos por separado
    const { repuestos_utilizados, ...albaranBasico } = albaranData;
    
    // Primero crear el albarán básico (sin repuestos)
    return from(
      this.supabase
        .from('albaranes')
        .insert([albaranBasico])
        .select()
        .single()
    ).pipe(
      switchMap(({ data: albaran, error: albaranError }) => {
        if (albaranError) throw albaranError;
        
        console.log('✅ Albarán básico creado:', albaran.id);
        
        // Si no hay repuestos, devolver directamente el albarán
        if (!repuestos_utilizados || repuestos_utilizados.length === 0) {
          console.log('📋 Sin repuestos que procesar');
          return from([albaran as Albaran]);
        }
        
        // Preparar repuestos para insertar en la tabla repuestos_albaran
        const repuestosParaInsertar = repuestos_utilizados.map(repuesto => ({
          albaran_id: albaran.id,
          nombre: repuesto.nombre,
          cantidad: repuesto.cantidad,
          precio_neto: repuesto.precio_neto || 0,
          precio_pvp: repuesto.precio_pvp || 0,
          unidad: repuesto.unidad || 'unidad',
          codigo: repuesto.codigo || ''
        }));
        
        console.log('📋 Insertando repuestos en tabla repuestos_albaran:', repuestosParaInsertar);
        
        // Insertar repuestos en la tabla repuestos_albaran
        return from(
          this.supabase
            .from('repuestos_albaran')
            .insert(repuestosParaInsertar)
            .select()
        ).pipe(
          switchMap(({ data: repuestos, error: repuestosError }) => {
            if (repuestosError) {
              console.error('❌ Error al insertar repuestos:', repuestosError);
              throw repuestosError;
            }
            
            console.log('✅ Repuestos insertados correctamente:', repuestos?.length || 0, 'repuestos');
            
            // Actualizar stock del inventario para cada repuesto
            if (repuestos && repuestos.length > 0) {
              console.log('📦 Actualizando stock del inventario...');
              
              const actualizacionesStock = repuestos.map(repuesto => {
                // Buscar el producto en inventario por código o nombre
                return this.actualizarStockInventario(repuesto);
              });
              
              // Ejecutar todas las actualizaciones de stock en paralelo
              return forkJoin(actualizacionesStock).pipe(
                map(() => {
                  console.log('✅ Stock del inventario actualizado correctamente');
                  
                  // Devolver el albarán con los repuestos agregados
                  return {
                    ...albaran,
                    repuestos: repuestos || []
                  } as Albaran;
                })
              );
            }
            
            // Si no hay repuestos, devolver directamente el albarán
            return from([{
              ...albaran,
              repuestos: repuestos || []
            } as Albaran]);
          })
        );
      }),
      catchError(error => {
        console.error('❌ Error al crear albarán:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene un albarán por su ID con sus repuestos
   */
  getAlbaran(id: string): Observable<Albaran> {
    return from(
      this.supabase
        .from('albaranes')
        .select(`
          *,
          aviso:avisos(*),
          repuestos:repuestos_albaran(*)
        `)
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        console.log('📋 Albarán obtenido con repuestos:', data);
        
        return data as Albaran;
      }),
      catchError(error => {
        console.error('Error al obtener albarán:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza el stock del inventario cuando se usa un repuesto
   */
  private actualizarStockInventario(repuesto: any): Observable<void> {
    console.log('📦 Actualizando stock para repuesto:', repuesto);
    
    // Buscar el producto en inventario por código o nombre
    let query = this.supabase
      .from('inventario')
      .select('*');
    
    if (repuesto.codigo) {
      // Priorizar búsqueda por código
      query = query.eq('codigo', repuesto.codigo);
    } else {
      // Búsqueda por nombre si no hay código
      query = query.eq('nombre', repuesto.nombre);
    }
    
    return from(query.single()).pipe(
      switchMap(({ data: producto, error: productoError }) => {
        if (productoError) {
          console.warn('⚠️ Producto no encontrado en inventario:', repuesto.nombre || repuesto.codigo);
          return from([void 0]); // Continuar sin error
        }
        
        const productoInventario = producto as any;
        const cantidadActual = productoInventario.cantidad_disponible || 0;
        const cantidadUsada = repuesto.cantidad || 1;
        const nuevaCantidad = Math.max(0, cantidadActual - cantidadUsada);
        
        console.log(`📦 Stock actual: ${cantidadActual}, Cantidad usada: ${cantidadUsada}, Nueva cantidad: ${nuevaCantidad}`);
        
        // Actualizar el stock en inventario
        return from(
          this.supabase
            .from('inventario')
            .update({ 
              cantidad_disponible: nuevaCantidad,
              fecha_actualizacion: new Date().toISOString()
            })
            .eq('id', productoInventario.id)
        ).pipe(
          map(({ error: updateError }) => {
            if (updateError) {
              console.error('❌ Error al actualizar stock:', updateError);
              throw updateError;
            }
            
            console.log(`✅ Stock actualizado: ${productoInventario.nombre} - ${cantidadActual} → ${nuevaCantidad}`);
            
            // Notificar cambio en inventario
            this.inventarioService.getInventario().subscribe();
            
            return void 0;
          })
        );
      }),
      catchError(error => {
        console.error('❌ Error en actualizarStockInventario:', error);
        // No fallar la creación del albarán por errores de stock
        return from([void 0]);
      })
    );
  }

  /**
   * Obtiene todos los albaranes de un aviso con sus repuestos
   */
  getAlbaranesAviso(avisoId: string): Observable<Albaran[]> {
    return from(
      this.supabase
        .from('albaranes')
        .select(`
          *,
          repuestos:repuestos_albaran(*)
        `)
        .eq('aviso_id', avisoId)
        .order('fecha_trabajo', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        console.log('📋 Albaranes obtenidos con repuestos:', data?.length || 0, 'albaranes');
        
        return data as Albaran[];
      }),
      catchError(error => {
        console.error('Error al obtener albaranes del aviso:', error);
        throw error;
      })
    );
  }

  // Método getAlbaranesTrabajo eliminado - ya no gestionamos trabajos

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
   * Elimina un albarán y devuelve los repuestos al inventario
   */
  eliminarAlbaran(id: string): Observable<void> {
    console.log('🔍 eliminarAlbaran llamado con ID:', id);
    
    // Primero obtener el albarán con sus repuestos
    return this.getAlbaran(id).pipe(
      switchMap(albaran => {
        console.log('📋 Albarán obtenido para eliminación:', albaran);
        
        // Si hay repuestos, devolverlos al inventario
        if (albaran.repuestos && albaran.repuestos.length > 0) {
          console.log('📦 Devolviendo repuestos al inventario:', albaran.repuestos.length, 'repuestos');
          
          const restauracionesStock = albaran.repuestos.map((repuesto: any) => {
            return this.restaurarStockInventario(repuesto);
          });
          
          // Ejecutar todas las restauraciones de stock en paralelo
          return forkJoin(restauracionesStock).pipe(
            switchMap(() => {
              console.log('✅ Stock del inventario restaurado correctamente');
              
              // Ahora eliminar el albarán
              return this.eliminarAlbaranDeBD(id);
            })
          );
        } else {
          console.log('📋 Sin repuestos que devolver al inventario');
          // Si no hay repuestos, eliminar directamente
          return this.eliminarAlbaranDeBD(id);
        }
      }),
      catchError(error => {
        console.error('❌ Error en eliminarAlbaran:', error);
        throw error;
      })
    );
  }

  /**
   * Elimina el albarán de la base de datos
   */
  private eliminarAlbaranDeBD(id: string): Observable<void> {
    return from(
      this.supabase
        .from('albaranes')
        .delete()
        .eq('id', id)
    ).pipe(
      map(({ data, error }) => {
        console.log('🔍 Respuesta de Supabase:', { data, error });
        
        if (error) {
          console.error('❌ Error de Supabase:', error);
          throw error;
        }

        console.log('✅ Albarán eliminado exitosamente de la BD');
        return void 0;
      })
    );
  }

  /**
   * Restaura el stock del inventario cuando se elimina un albarán
   */
  private restaurarStockInventario(repuesto: any): Observable<void> {
    console.log('📦 Restaurando stock para repuesto:', repuesto);
    
    // Buscar el producto en inventario por código o nombre
    let query = this.supabase
      .from('inventario')
      .select('*');
    
    if (repuesto.codigo) {
      // Priorizar búsqueda por código
      query = query.eq('codigo', repuesto.codigo);
    } else {
      // Búsqueda por nombre si no hay código
      query = query.eq('nombre', repuesto.nombre);
    }
    
    return from(query.single()).pipe(
      switchMap(({ data: producto, error: productoError }) => {
        if (productoError) {
          console.warn('⚠️ Producto no encontrado en inventario para restaurar:', repuesto.nombre || repuesto.codigo);
          return from([void 0]); // Continuar sin error
        }
        
        const productoInventario = producto as any;
        const cantidadActual = productoInventario.cantidad_disponible || 0;
        const cantidadARestaurar = repuesto.cantidad || 1;
        const nuevaCantidad = cantidadActual + cantidadARestaurar;
        
        console.log(`📦 Stock actual: ${cantidadActual}, Cantidad a restaurar: ${cantidadARestaurar}, Nueva cantidad: ${nuevaCantidad}`);
        
        // Actualizar el stock en inventario
        return from(
          this.supabase
            .from('inventario')
            .update({ 
              cantidad_disponible: nuevaCantidad,
              fecha_actualizacion: new Date().toISOString()
            })
            .eq('id', productoInventario.id)
        ).pipe(
          map(({ error: updateError }) => {
            if (updateError) {
              console.error('❌ Error al restaurar stock:', updateError);
              throw updateError;
            }
            
            console.log(`✅ Stock restaurado: ${productoInventario.nombre} - ${cantidadActual} → ${nuevaCantidad}`);
            
            // Notificar cambio en inventario
            this.inventarioService.getInventario().subscribe();
            
            return void 0;
          })
        );
      }),
      catchError(error => {
        console.error('❌ Error en restaurarStockInventario:', error);
        // No fallar la eliminación del albarán por errores de stock
        return from([void 0]);
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
