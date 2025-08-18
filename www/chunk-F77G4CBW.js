import {
  DataUpdateService
} from "./chunk-VHAQXQOQ.js";
import {
  BehaviorSubject,
  Injectable,
  SupabaseClientService,
  catchError,
  from,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-ANYKLJQR.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-KNQSF6OU.js";

// src/app/modules/inventario/services/inventario.service.ts
var _InventarioService = class _InventarioService {
  constructor(supabaseClientService, dataUpdateService) {
    this.supabaseClientService = supabaseClientService;
    this.dataUpdateService = dataUpdateService;
    this.inventarioSubject = new BehaviorSubject([]);
    this.inventario$ = this.inventarioSubject.asObservable();
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Obtiene la lista de productos del inventario con paginación y filtros
   */
  getInventario(pagina = 1, porPagina = 10, busqueda, ordenarPor, orden, soloConStock = false) {
    let query = this.supabase.from("inventario").select("*", { count: "exact" });
    if (busqueda) {
      query = query.or(`nombre.ilike.%${busqueda}%,descripcion.ilike.%${busqueda}%,codigo.ilike.%${busqueda}%`);
    }
    if (soloConStock) {
      query = query.gt("cantidad_disponible", 0);
    }
    const desde = (pagina - 1) * porPagina;
    query = query.range(desde, desde + porPagina - 1).order(ordenarPor || "fecha_creacion", { ascending: orden === "asc" });
    return from(query).pipe(map(({ data, error, count }) => {
      if (error)
        throw error;
      const inventario = data;
      this.inventarioSubject.next(inventario);
      return {
        inventario,
        total: count || 0,
        pagina,
        por_pagina: porPagina
      };
    }), catchError((error) => {
      console.error("Error al obtener inventario:", error);
      throw error;
    }));
  }
  /**
   * Obtiene un producto por su ID
   */
  getProducto(id) {
    return from(this.supabase.from("inventario").select("*").eq("id", id).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Obtiene un producto por código
   */
  getProductoPorCodigo(codigo) {
    return from(this.supabase.from("inventario").select("*").eq("codigo", codigo).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Crea un nuevo producto
   */
  crearProducto(producto) {
    const productoData = __spreadProps(__spreadValues({}, producto), {
      fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("inventario").insert([productoData]).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const nuevoProducto = data;
      const inventarioActual = this.inventarioSubject.value;
      this.inventarioSubject.next([nuevoProducto, ...inventarioActual]);
      this.dataUpdateService.notifyCreated("inventario");
      return nuevoProducto;
    }));
  }
  /**
   * Actualiza un producto existente
   */
  actualizarProducto(id, producto) {
    const datosActualizados = __spreadProps(__spreadValues({}, producto), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("inventario").update(datosActualizados).eq("id", id).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const productoActualizado = data;
      const inventarioActual = this.inventarioSubject.value;
      const index = inventarioActual.findIndex((p) => p.id === id);
      if (index !== -1) {
        inventarioActual[index] = productoActualizado;
        this.inventarioSubject.next([...inventarioActual]);
      }
      this.dataUpdateService.notifyUpdated("inventario");
      return productoActualizado;
    }));
  }
  /**
   * Elimina un producto
   */
  eliminarProducto(id) {
    return from(this.supabase.from("inventario").delete().eq("id", id)).pipe(map(({ error }) => {
      if (error)
        throw error;
      const inventarioActual = this.inventarioSubject.value;
      const inventarioFiltrado = inventarioActual.filter((p) => p.id !== id);
      this.inventarioSubject.next(inventarioFiltrado);
      this.dataUpdateService.notifyDeleted("inventario");
    }));
  }
  /**
   * Busca productos por término de búsqueda
   */
  buscarProductos(termino) {
    return from(this.supabase.from("inventario").select("*").or(`nombre.ilike.%${termino}%,descripcion.ilike.%${termino}%,codigo.ilike.%${termino}%`).order("fecha_creacion", { ascending: false }).limit(10)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Obtiene productos con stock bajo (menos de 5 unidades)
   */
  getProductosStockBajo() {
    return from(this.supabase.from("inventario").select("*").lt("cantidad_disponible", 5).gt("cantidad_disponible", 0).order("cantidad_disponible", { ascending: true })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Obtiene productos sin stock
   */
  getProductosSinStock() {
    return from(this.supabase.from("inventario").select("*").eq("cantidad_disponible", 0).order("nombre", { ascending: true })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Actualiza el stock de un producto
   */
  actualizarStock(id, nuevaCantidad) {
    return this.actualizarProducto(id, { cantidad_disponible: nuevaCantidad });
  }
  /**
   * Genera un código único para un producto
   */
  generarCodigoProducto() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `P${timestamp.slice(-6)}${random}`;
  }
  /**
   * Verifica si un código ya existe
   */
  verificarCodigoExistente(codigo) {
    return from(this.supabase.from("inventario").select("codigo").eq("codigo", codigo).limit(1)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data && data.length > 0;
    }));
  }
  /**
   * Obtiene estadísticas del inventario
   */
  getEstadisticas() {
    return from(this.supabase.from("inventario").select("cantidad_disponible")).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const productos = data;
      const totalProductos = productos.length;
      const productosConStock = productos.filter((p) => p.cantidad_disponible > 0).length;
      const productosSinStock = totalProductos - productosConStock;
      const stockTotal = productos.reduce((sum, p) => sum + p.cantidad_disponible, 0);
      return {
        totalProductos,
        productosConStock,
        productosSinStock,
        stockTotal
      };
    }));
  }
  /**
   * Obtiene el valor actual del inventario
   */
  getInventarioActual() {
    return this.inventarioSubject.value;
  }
  /**
   * Limpia el estado del inventario
   */
  limpiarInventario() {
    this.inventarioSubject.next([]);
  }
  /**
   * Obtiene solo productos con stock
   */
  getProductosConStock(pagina = 1, porPagina = 10, busqueda, ordenarPor, orden) {
    return this.getInventario(pagina, porPagina, busqueda, ordenarPor, orden, true);
  }
  /**
   * Obtiene solo productos sin stock
   */
  getProductosSinStockPaginated(pagina = 1, porPagina = 10, busqueda, ordenarPor, orden) {
    let query = this.supabase.from("inventario").select("*", { count: "exact" }).eq("cantidad_disponible", 0);
    if (busqueda) {
      query = query.or(`nombre.ilike.%${busqueda}%,descripcion.ilike.%${busqueda}%,codigo.ilike.%${busqueda}%`);
    }
    const desde = (pagina - 1) * porPagina;
    query = query.range(desde, desde + porPagina - 1).order(ordenarPor || "fecha_creacion", { ascending: orden === "asc" });
    return from(query).pipe(map(({ data, error, count }) => {
      if (error)
        throw error;
      const inventario = data;
      this.inventarioSubject.next(inventario);
      return {
        inventario,
        total: count || 0,
        pagina,
        por_pagina: porPagina
      };
    }), catchError((error) => {
      console.error("Error al obtener productos sin stock:", error);
      throw error;
    }));
  }
};
_InventarioService.\u0275fac = function InventarioService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _InventarioService)(\u0275\u0275inject(SupabaseClientService), \u0275\u0275inject(DataUpdateService));
};
_InventarioService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InventarioService, factory: _InventarioService.\u0275fac, providedIn: "root" });
var InventarioService = _InventarioService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventarioService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SupabaseClientService }, { type: DataUpdateService }], null);
})();

export {
  InventarioService
};
//# sourceMappingURL=chunk-F77G4CBW.js.map
