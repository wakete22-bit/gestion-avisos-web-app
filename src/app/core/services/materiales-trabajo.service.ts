import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseClientService } from './supabase-client.service';
import { Observable, BehaviorSubject, from, forkJoin } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MaterialTrabajo } from '../../modules/avisos/models/trabajo-realizado.model';
import { InventarioService } from '../../modules/inventario/services/inventario.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialesTrabajoService {
  private supabase: SupabaseClient;
  private materialesSubject = new BehaviorSubject<MaterialTrabajo[]>([]);
  public materiales$ = this.materialesSubject.asObservable();

  constructor(
    private inventarioService: InventarioService,
    private supabaseClientService: SupabaseClientService
  ) {
    this.supabase = this.supabaseClientService.getClient();
  }

  /**
   * Obtiene los materiales de un trabajo específico
   */
  getMaterialesTrabajo(trabajoId: string): Observable<MaterialTrabajo[]> {
    return from(
      this.supabase
        .from('materiales_trabajo')
        .select(`
          *,
          material:inventario(*)
        `)
        .eq('trabajo_id', trabajoId)
        .order('id', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        const materiales = data as MaterialTrabajo[];
        this.materialesSubject.next(materiales);
        return materiales;
      }),
      catchError(error => {
        console.error('Error al obtener materiales del trabajo:', error);
        throw error;
      })
    );
  }

  /**
   * Añade materiales a un trabajo y descuenta del inventario
   */
  agregarMateriales(trabajoId: string, materiales: Omit<MaterialTrabajo, 'id' | 'trabajo_id'>[]): Observable<MaterialTrabajo[]> {
    if (materiales.length === 0) {
      return from([[]]);
    }

    const materialesInsert = materiales.map(material => ({
      trabajo_id: trabajoId,
      material_id: material.material_id,
      cantidad_utilizada: material.cantidad_utilizada,
      precio_neto_al_momento: material.precio_neto_al_momento
    }));

    return from(
      this.supabase
        .from('materiales_trabajo')
        .insert(materialesInsert)
        .select(`
          *,
          material:inventario(*)
        `)
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) throw error;
        const nuevosMateriales = data as MaterialTrabajo[];
        
        // Actualizar el estado local
        const materialesActuales = this.materialesSubject.value;
        this.materialesSubject.next([...materialesActuales, ...nuevosMateriales]);
        
        // Descontar materiales del inventario
        const actualizacionesStock = nuevosMateriales.map(material => {
          const nuevaCantidad = material.material.cantidad_disponible - material.cantidad_utilizada;
          return this.inventarioService.actualizarStock(material.material_id, nuevaCantidad);
        });
        
        return forkJoin(actualizacionesStock).pipe(
          map(() => nuevosMateriales)
        );
      }),
      catchError(error => {
        console.error('Error al agregar materiales al trabajo:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza un material específico y ajusta el inventario
   */
  actualizarMaterial(materialId: string, material: Partial<MaterialTrabajo>): Observable<MaterialTrabajo> {
    // Primero obtener el material actual para calcular la diferencia
    return from(
      this.supabase
        .from('materiales_trabajo')
        .select(`
          *,
          material:inventario(*)
        `)
        .eq('id', materialId)
        .single()
    ).pipe(
      switchMap(({ data: materialActual, error: errorActual }) => {
        if (errorActual) throw errorActual;
        
        const materialActualData = materialActual as MaterialTrabajo;
        const cantidadAnterior = materialActualData.cantidad_utilizada;
        const cantidadNueva = material.cantidad_utilizada || cantidadAnterior;
        const diferencia = cantidadNueva - cantidadAnterior;
        
        const datosActualizados = {
          cantidad_utilizada: material.cantidad_utilizada,
          precio_neto_al_momento: material.precio_neto_al_momento
        };

        return from(
          this.supabase
            .from('materiales_trabajo')
            .update(datosActualizados)
            .eq('id', materialId)
            .select(`
              *,
              material:inventario(*)
            `)
            .single()
        ).pipe(
          switchMap(({ data, error }) => {
            if (error) throw error;
            
            const materialActualizado = data as MaterialTrabajo;
            
            // Actualizar el estado local
            const materialesActuales = this.materialesSubject.value;
            const index = materialesActuales.findIndex(m => m.id === materialId);
            if (index !== -1) {
              materialesActuales[index] = materialActualizado;
              this.materialesSubject.next([...materialesActuales]);
            }
            
            // Ajustar el inventario si la cantidad cambió
            if (diferencia !== 0) {
              const nuevaCantidad = materialActualData.material.cantidad_disponible - diferencia;
              return this.inventarioService.actualizarStock(materialActualData.material_id, nuevaCantidad).pipe(
                map(() => materialActualizado)
              );
            }
            
            return from([materialActualizado]);
          })
        );
      }),
      catchError(error => {
        console.error('Error al actualizar material:', error);
        throw error;
      })
    );
  }

  /**
   * Elimina un material del trabajo y devuelve al inventario
   */
  eliminarMaterial(materialId: string): Observable<void> {
    // Primero obtener el material para saber cuánto devolver al inventario
    return from(
      this.supabase
        .from('materiales_trabajo')
        .select(`
          *,
          material:inventario(*)
        `)
        .eq('id', materialId)
        .single()
    ).pipe(
      switchMap(({ data: material, error: errorMaterial }) => {
        if (errorMaterial) throw errorMaterial;
        
        const materialData = material as MaterialTrabajo;
        
        return from(
          this.supabase
            .from('materiales_trabajo')
            .delete()
            .eq('id', materialId)
        ).pipe(
          switchMap(({ error }) => {
            if (error) throw error;
            
            // Actualizar el estado local
            const materialesActuales = this.materialesSubject.value;
            const materialesFiltrados = materialesActuales.filter(m => m.id !== materialId);
            this.materialesSubject.next(materialesFiltrados);
            
            // Devolver la cantidad al inventario
            const nuevaCantidad = materialData.material.cantidad_disponible + materialData.cantidad_utilizada;
            return this.inventarioService.actualizarStock(materialData.material_id, nuevaCantidad).pipe(
              map(() => {})
            );
          })
        );
      }),
      catchError(error => {
        console.error('Error al eliminar material:', error);
        throw error;
      })
    );
  }

  /**
   * Elimina todos los materiales de un trabajo y los devuelve al inventario
   */
  eliminarMaterialesTrabajo(trabajoId: string): Observable<void> {
    // Primero obtener todos los materiales del trabajo
    return from(
      this.supabase
        .from('materiales_trabajo')
        .select(`
          *,
          material:inventario(*)
        `)
        .eq('trabajo_id', trabajoId)
    ).pipe(
      switchMap(({ data: materiales, error: errorMateriales }) => {
        if (errorMateriales) throw errorMateriales;
        
        const materialesData = materiales as MaterialTrabajo[];
        
        return from(
          this.supabase
            .from('materiales_trabajo')
            .delete()
            .eq('trabajo_id', trabajoId)
        ).pipe(
          switchMap(({ error }) => {
            if (error) throw error;
            
            // Actualizar el estado local
            const materialesActuales = this.materialesSubject.value;
            const materialesFiltrados = materialesActuales.filter(m => m.trabajo_id !== trabajoId);
            this.materialesSubject.next(materialesFiltrados);
            
            // Devolver todas las cantidades al inventario
            if (materialesData.length > 0) {
              const actualizacionesStock = materialesData.map(material => {
                const nuevaCantidad = material.material.cantidad_disponible + material.cantidad_utilizada;
                return this.inventarioService.actualizarStock(material.material_id, nuevaCantidad);
              });
              
              return forkJoin(actualizacionesStock).pipe(
                map(() => {})
              );
            }

            return from([undefined]);
          })
        );
      }),
      catchError(error => {
        console.error('Error al eliminar materiales del trabajo:', error);
        throw error;
      })
    );
  }

  /**
   * Calcula el costo total de materiales de un trabajo
   */
  calcularCostoMateriales(materiales: MaterialTrabajo[]): number {
    return materiales.reduce((total, material) => {
      return total + (material.cantidad_utilizada * material.precio_neto_al_momento);
    }, 0);
  }

  /**
   * Obtiene el valor actual de materiales
   */
  getMaterialesActuales(): MaterialTrabajo[] {
    return this.materialesSubject.value;
  }

  /**
   * Limpia el estado de materiales
   */
  limpiarMateriales(): void {
    this.materialesSubject.next([]);
  }
} 