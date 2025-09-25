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
import { DataUpdateService } from '../../../core/services/data-update.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private inventarioSubject = new BehaviorSubject<Inventario[]>([]);
  public inventario$ = this.inventarioSubject.asObservable();

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
    console.log('📦 InventarioService: Obteniendo cliente Supabase actualizado...');
    return this.supabaseClientService.getClient();
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
    let query = this.getSupabaseClient()
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
   * Obtiene la lista de productos usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  getInventarioDirect(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    soloConStock: boolean = false
  ): Observable<InventarioResponse> {
    console.log('🚀 InventarioService: Usando FETCH DIRECTO para inventario...');
    
    return from(this.fetchInventarioDirect(pagina, porPagina, busqueda, ordenarPor, orden, soloConStock)).pipe(
      map(result => {
        console.log('✅ InventarioService: FETCH DIRECTO completado, productos:', result.inventario.length);
        
        // Actualizar el subject local
        this.inventarioSubject.next(result.inventario);
        
        return result;
      }),
      catchError(error => {
        console.error('❌ InventarioService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para inventario - BYPASA CLIENTE SUPABASE
   */
  private async fetchInventarioDirect(
    pagina: number = 1,
    porPagina: number = 10,
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    soloConStock: boolean = false
  ): Promise<InventarioResponse> {
    console.log('🚀 InventarioService: Ejecutando fetch directo para inventario...');
    
    try {
      // Construir URL con parámetros
      let url = `${environment.supabaseUrl}/rest/v1/inventario?select=*`;

      // Aplicar filtros
      const filters: string[] = [];
      
      if (busqueda) {
        filters.push(`or=(nombre.ilike.*${busqueda}*,descripcion.ilike.*${busqueda}*,codigo.ilike.*${busqueda}*)`);
      }
      
      if (soloConStock) {
        filters.push(`cantidad_disponible=gt.0`);
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
      
      console.log('🚀 Datos recibidos:', data?.length || 0, 'productos, total:', total);
      
      return {
        inventario: data as Inventario[],
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
   * Obtiene un producto por su ID
   */
  getProducto(id: string): Observable<Inventario> {
    return from(
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
        
        // Notificar creación y limpiar cache
        this.dataUpdateService.notifyCreated('inventario');
        
        return nuevoProducto;
      })
    );
  }

  /**
   * Crea un nuevo producto usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  crearProductoDirect(producto: CrearInventarioRequest): Observable<Inventario> {
    console.log('🚀 InventarioService: Usando FETCH DIRECTO para crear producto...');
    
    return from(this.fetchCrearProductoDirect(producto)).pipe(
      map(result => {
        console.log('✅ InventarioService: FETCH DIRECTO completado, producto creado:', result.id);
        return result;
      }),
      catchError(error => {
        console.error('❌ InventarioService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para crear producto - BYPASA CLIENTE SUPABASE
   */
  private async fetchCrearProductoDirect(producto: CrearInventarioRequest): Promise<Inventario> {
    console.log('🚀 InventarioService: Ejecutando fetch directo para crear producto...');
    
    try {
      const productoData = {
        ...producto,
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString()
      };

      const url = `${environment.supabaseUrl}/rest/v1/inventario`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      };
      
      console.log('🚀 URL construida:', url);
      console.log('🚀 Datos a crear:', productoData);
      
      const startTime = Date.now();
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(productoData)
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
      console.log('🚀 Datos recibidos:', data?.length || 0, 'productos');
      
      if (!data || data.length === 0) {
        throw new Error('Error al crear producto');
      }
      
      const nuevoProducto = data[0] as Inventario;
      console.log('🚀 Producto creado:', nuevoProducto);
      
      // Actualizar el subject local
      const inventarioActual = this.inventarioSubject.value;
      this.inventarioSubject.next([nuevoProducto, ...inventarioActual]);
      
      // Notificar creación y limpiar cache
      this.dataUpdateService.notifyCreated('inventario');
      
      return nuevoProducto;
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
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
      this.getSupabaseClient()
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
        
        // Notificar actualización y limpiar cache
        this.dataUpdateService.notifyUpdated('inventario');
        
        return productoActualizado;
      })
    );
  }

  /**
   * Actualiza un producto existente usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  actualizarProductoDirect(id: string, producto: ActualizarInventarioRequest): Observable<Inventario> {
    console.log('🚀 InventarioService: Usando FETCH DIRECTO para actualizar producto...');
    
    return from(this.fetchActualizarProductoDirect(id, producto)).pipe(
      map(result => {
        console.log('✅ InventarioService: FETCH DIRECTO completado, producto actualizado:', result.id);
        return result;
      }),
      catchError(error => {
        console.error('❌ InventarioService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para actualizar producto - BYPASA CLIENTE SUPABASE
   */
  private async fetchActualizarProductoDirect(id: string, producto: ActualizarInventarioRequest): Promise<Inventario> {
    console.log('🚀 InventarioService: Ejecutando fetch directo para actualizar producto:', id);
    
    try {
      const datosActualizados = {
        ...producto,
        fecha_actualizacion: new Date().toISOString()
      };

      const url = `${environment.supabaseUrl}/rest/v1/inventario?id=eq.${id}`;
      
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
      console.log('🚀 Datos recibidos:', data?.length || 0, 'productos');
      
      if (!data || data.length === 0) {
        throw new Error('Producto no encontrado');
      }
      
      const productoActualizado = data[0] as Inventario;
      console.log('🚀 Producto actualizado:', productoActualizado);
      
      // Actualizar el subject local
      const inventarioActual = this.inventarioSubject.value;
      const index = inventarioActual.findIndex(p => p.id === id);
      if (index !== -1) {
        inventarioActual[index] = productoActualizado;
        this.inventarioSubject.next([...inventarioActual]);
      }
      
      // Notificar actualización y limpiar cache
      this.dataUpdateService.notifyUpdated('inventario');
      
      return productoActualizado;
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Elimina un producto
   */
  eliminarProducto(id: string): Observable<void> {
    return from(
      this.getSupabaseClient()
        .from('inventario')
        .delete()
        .eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
        
        const inventarioActual = this.inventarioSubject.value;
        const inventarioFiltrado = inventarioActual.filter(p => p.id !== id);
        this.inventarioSubject.next(inventarioFiltrado);

        // Notificar eliminación y limpiar cache
        this.dataUpdateService.notifyDeleted('inventario');
      })
    );
  }

  /**
   * Elimina un producto usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  eliminarProductoDirect(id: string): Observable<void> {
    console.log('🚀 InventarioService: Usando FETCH DIRECTO para eliminar producto...');
    
    return from(this.fetchEliminarProductoDirect(id)).pipe(
      map(() => {
        console.log('✅ InventarioService: FETCH DIRECTO completado, producto eliminado');
        return void 0;
      }),
      catchError(error => {
        console.error('❌ InventarioService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para eliminar producto - BYPASA CLIENTE SUPABASE
   */
  private async fetchEliminarProductoDirect(id: string): Promise<void> {
    console.log('🚀 InventarioService: Ejecutando fetch directo para eliminar producto:', id);
    
    try {
      const url = `${environment.supabaseUrl}/rest/v1/inventario?id=eq.${id}`;
      
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
      
      console.log('✅ Producto eliminado exitosamente');
      
      // Actualizar el subject local
      const inventarioActual = this.inventarioSubject.value;
      const inventarioFiltrado = inventarioActual.filter(p => p.id !== id);
      this.inventarioSubject.next(inventarioFiltrado);

      // Notificar eliminación y limpiar cache
      this.dataUpdateService.notifyDeleted('inventario');
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Busca productos por término de búsqueda
   */
  buscarProductos(termino: string): Observable<Inventario[]> {
    return from(
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
    let query = this.getSupabaseClient()
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