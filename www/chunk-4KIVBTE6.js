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

// src/app/core/services/clientes.service.ts
var _ClientesService = class _ClientesService {
  constructor(supabaseClientService, dataUpdateService) {
    this.supabaseClientService = supabaseClientService;
    this.dataUpdateService = dataUpdateService;
    this.clientesSubject = new BehaviorSubject([]);
    this.clientes$ = this.clientesSubject.asObservable();
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Obtiene la lista de clientes con paginación y filtros
   */
  getClientes(pagina = 1, porPagina = 10, busqueda, ordenarPor, orden, soloActivos = false) {
    let query = this.supabase.from("clientes").select("*", { count: "exact" });
    if (busqueda) {
      query = query.or(`nombre_completo.ilike.%${busqueda}%,email.ilike.%${busqueda}%`);
    }
    if (soloActivos) {
      query = query.eq("es_activo", true);
    }
    const desde = (pagina - 1) * porPagina;
    query = query.range(desde, desde + porPagina - 1).order(ordenarPor || "fecha_creacion", { ascending: orden === "asc" });
    return from(query).pipe(map(({ data, error, count }) => {
      if (error)
        throw error;
      const clientes = data;
      this.clientesSubject.next(clientes);
      return {
        clientes,
        total: count || 0,
        pagina,
        por_pagina: porPagina
      };
    }), catchError((error) => {
      console.error("Error al obtener clientes:", error);
      throw error;
    }));
  }
  /**
   * Obtiene un cliente por su ID
   */
  getCliente(id) {
    return from(this.supabase.from("clientes").select("*").eq("id", id).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Crea un nuevo cliente
   */
  crearCliente(cliente) {
    var _a;
    const clienteData = __spreadProps(__spreadValues({}, cliente), {
      fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
      es_activo: (_a = cliente.es_activo) != null ? _a : true
    });
    return from(this.supabase.from("clientes").insert([clienteData]).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const nuevoCliente = data;
      const clientesActuales = this.clientesSubject.value;
      this.clientesSubject.next([nuevoCliente, ...clientesActuales]);
      this.dataUpdateService.notifyCreated("clientes");
      return nuevoCliente;
    }));
  }
  /**
   * Actualiza un cliente existente
   */
  actualizarCliente(id, cliente) {
    const datosActualizados = __spreadProps(__spreadValues({}, cliente), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("clientes").update(datosActualizados).eq("id", id).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const clienteActualizado = data;
      const clientesActuales = this.clientesSubject.value;
      const index = clientesActuales.findIndex((c) => c.id === id);
      if (index !== -1) {
        clientesActuales[index] = clienteActualizado;
        this.clientesSubject.next([...clientesActuales]);
      }
      this.dataUpdateService.notifyUpdated("clientes");
      return clienteActualizado;
    }));
  }
  /**
   * Elimina un cliente (marcar como inactivo)
   */
  eliminarCliente(id) {
    return from(this.supabase.from("clientes").update({
      es_activo: false,
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", id)).pipe(map(({ error }) => {
      if (error)
        throw error;
      const clientesActuales = this.clientesSubject.value;
      const index = clientesActuales.findIndex((c) => c.id === id);
      if (index !== -1) {
        clientesActuales[index].es_activo = false;
        this.clientesSubject.next([...clientesActuales]);
      }
      this.dataUpdateService.notifyDeleted("clientes");
    }));
  }
  /**
   * Busca clientes por término de búsqueda
   */
  buscarClientes(termino) {
    return from(this.supabase.from("clientes").select("*").or(`nombre_completo.ilike.%${termino}%,email.ilike.%${termino}%`).eq("es_activo", true).limit(10)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Obtiene el valor actual de clientes
   */
  getClientesActuales() {
    return this.clientesSubject.value;
  }
  /**
   * Limpia el estado de clientes
   */
  limpiarClientes() {
    this.clientesSubject.next([]);
  }
};
_ClientesService.\u0275fac = function ClientesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ClientesService)(\u0275\u0275inject(SupabaseClientService), \u0275\u0275inject(DataUpdateService));
};
_ClientesService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ClientesService, factory: _ClientesService.\u0275fac, providedIn: "root" });
var ClientesService = _ClientesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClientesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SupabaseClientService }, { type: DataUpdateService }], null);
})();

export {
  ClientesService
};
//# sourceMappingURL=chunk-4KIVBTE6.js.map
