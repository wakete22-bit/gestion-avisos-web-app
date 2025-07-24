import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { 
  Inventario, 
  CrearInventarioRequest, 
  ActualizarInventarioRequest, 
  InventarioResponse 
} from '../models/inventario.model';
import { SupabaseClientService } from '../../../core/services/supabase-client.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private supabase: SupabaseClient;
  private inventarioSubject = new BehaviorSubject<Inventario[]>([]);
  public inventario$ = this.inventarioSubject.asObservable();

  constructor(private supabaseClientService: SupabaseClientService) {
    this.supabase = this.supabaseClientService.getClient();
  }

  /**
   * Obtiene la lista de productos del inventario con paginación y filtros
   */
  getInventario(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    soloConStock: boolean = false
  ): Observable<InventarioResponse> {
    let query = this.supabase
      .from('inventario')
      .select('*', { count: 'exact' });

    // Aplicar filtros
    if (busqueda) {
      query = query.or(`nombre.ilike.%${busqueda}%,descripcion.ilike.%${busqueda}%,codigo.ilike.%${busqueda}%`);
    }

    // Filtrar por stock si se solicita
    if (soloConStock) {
      query = query.gt('cantidad_disponible', 0);
    }

    // Aplicar paginación y ordenamiento
    const desde = (pagina - 1) * porPagina;
    query = query
      .range(desde, desde + porPagina - 1)
      .order(ordenarPor || 'fecha_creacion', { ascending: orden === 'asc' });

    return from(query).pipe(
      map(({ data, error, count }) => {
        if (error) throw error;
        
        const inventario = data as Inventario[];
        this.inventarioSubject.next(inventario);
        
        return {
          inventario,
          total: count || 0,
          pagina,
          por_pagina: porPagina
        };
      }),
      catchError(error => {
        console.error('Error al obtener inventario:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene un producto por su ID
   */
  getProducto(id: string): Observable<Inventario> {
    return from(
      this.supabase
        .from('inventario')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Inventario;
      })
    );
  }

  /**
   * Obtiene un producto por código
   */
  getProductoPorCodigo(codigo: string): Observable<Inventario> {
    return from(
      this.supabase
        .from('inventario')
        .select('*')
        .eq('codigo', codigo)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Inventario;
      })
    );
  }

  /**
   * Crea un nuevo producto
   */
  crearProducto(producto: CrearInventarioRequest): Observable<Inventario> {
    const productoData = {
      ...producto,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString()
    };

    return from(
      this.supabase
        .from('inventario')
        .insert([productoData])
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const nuevoProducto = data as Inventario;
        const inventarioActual = this.inventarioSubject.value;
        this.inventarioSubject.next([nuevoProducto, ...inventarioActual]);
        
        return nuevoProducto;
      })
    );
  }

  /**
   * Actualiza un producto existente
   */
  actualizarProducto(id: string, producto: ActualizarInventarioRequest): Observable<Inventario> {
    const datosActualizados = {
      ...producto,
      fecha_actualizacion: new Date().toISOString()
    };

    return from(
      this.supabase
        .from('inventario')
        .update(datosActualizados)
        .eq('id', id)
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const productoActualizado = data as Inventario;
        const inventarioActual = this.inventarioSubject.value;
        const index = inventarioActual.findIndex(p => p.id === id);
        if (index !== -1) {
          inventarioActual[index] = productoActualizado;
          this.inventarioSubject.next([...inventarioActual]);
        }
        
        return productoActualizado;
      })
    );
  }

  /**
   * Elimina un producto
   */
  eliminarProducto(id: string): Observable<void> {
    return from(
      this.supabase
        .from('inventario')
        .delete()
        .eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
        
        const inventarioActual = this.inventarioSubject.value;
        const inventarioFiltrado = inventarioActual.filter(p => p.id !== id);
        this.inventarioSubject.next(inventarioFiltrado);
      })
    );
  }

  /**
   * Busca productos por término de búsqueda
   */
  buscarProductos(termino: string): Observable<Inventario[]> {
    return from(
      this.supabase
        .from('inventario')
        .select('*')
        .or(`nombre.ilike.%${termino}%,descripcion.ilike.%${termino}%,codigo.ilike.%${termino}%`)
        .order('fecha_creacion', { ascending: false })
        .limit(10)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Inventario[];
      })
    );
  }

  /**
   * Obtiene productos con stock bajo (menos de 5 unidades)
   */
  getProductosStockBajo(): Observable<Inventario[]> {
    return from(
      this.supabase
        .from('inventario')
        .select('*')
        .lt('cantidad_disponible', 5)
        .gt('cantidad_disponible', 0)
        .order('cantidad_disponible', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Inventario[];
      })
    );
  }

  /**
   * Obtiene productos sin stock
   */
  getProductosSinStock(): Observable<Inventario[]> {
    return from(
      this.supabase
        .from('inventario')
        .select('*')
        .eq('cantidad_disponible', 0)
        .order('nombre', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Inventario[];
      })
    );
  }

  /**
   * Actualiza el stock de un producto
   */
  actualizarStock(id: string, nuevaCantidad: number): Observable<Inventario> {
    return this.actualizarProducto(id, { cantidad_disponible: nuevaCantidad });
  }

  /**
   * Genera un código único para un producto
   */
  generarCodigoProducto(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `P${timestamp.slice(-6)}${random}`;
  }

  /**
   * Verifica si un código ya existe
   */
  verificarCodigoExistente(codigo: string): Observable<boolean> {
    return from(
      this.supabase
        .from('inventario')
        .select('codigo')
        .eq('codigo', codigo)
        .limit(1)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data && data.length > 0;
      })
    );
  }

  /**
   * Obtiene estadísticas del inventario
   */
  getEstadisticas(): Observable<any> {
    return from(
      this.supabase
        .from('inventario')
        .select('cantidad_disponible')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const productos = data as any[];
        const totalProductos = productos.length;
        const productosConStock = productos.filter(p => p.cantidad_disponible > 0).length;
        const productosSinStock = totalProductos - productosConStock;
        const stockTotal = productos.reduce((sum, p) => sum + p.cantidad_disponible, 0);
        
        return {
          totalProductos,
          productosConStock,
          productosSinStock,
          stockTotal
        };
      })
    );
  }

  /**
   * Obtiene el valor actual del inventario
   */
  getInventarioActual(): Inventario[] {
    return this.inventarioSubject.value;
  }

  /**
   * Limpia el estado del inventario
   */
  limpiarInventario(): void {
    this.inventarioSubject.next([]);
  }

  /**
   * Obtiene solo productos con stock
   */
  getProductosConStock(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc'
  ): Observable<InventarioResponse> {
    return this.getInventario(pagina, porPagina, busqueda, ordenarPor, orden, true);
  }

  /**
   * Obtiene solo productos sin stock
   */
  getProductosSinStockPaginated(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc'
  ): Observable<InventarioResponse> {
    let query = this.supabase
      .from('inventario')
      .select('*', { count: 'exact' })
      .eq('cantidad_disponible', 0);

    // Aplicar filtros
    if (busqueda) {
      query = query.or(`nombre.ilike.%${busqueda}%,descripcion.ilike.%${busqueda}%,codigo.ilike.%${busqueda}%`);
    }

    // Aplicar paginación y ordenamiento
    const desde = (pagina - 1) * porPagina;
    query = query
      .range(desde, desde + porPagina - 1)
      .order(ordenarPor || 'fecha_creacion', { ascending: orden === 'asc' });

    return from(query).pipe(
      map(({ data, error, count }) => {
        if (error) throw error;
        
        const inventario = data as Inventario[];
        this.inventarioSubject.next(inventario);
        
        return {
          inventario,
          total: count || 0,
          pagina,
          por_pagina: porPagina
        };
      }),
      catchError(error => {
        console.error('Error al obtener productos sin stock:', error);
        throw error;
      })
    );
  }
} 