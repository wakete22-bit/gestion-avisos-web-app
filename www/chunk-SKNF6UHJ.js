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
  switchMap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-ANYKLJQR.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-KNQSF6OU.js";

// src/app/modules/presupuestos/services/presupuestos.service.ts
var _PresupuestosService = class _PresupuestosService {
  constructor(supabaseClientService, dataUpdateService) {
    this.supabaseClientService = supabaseClientService;
    this.dataUpdateService = dataUpdateService;
    this.presupuestosSubject = new BehaviorSubject([]);
    this.presupuestos$ = this.presupuestosSubject.asObservable();
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Obtiene la lista de presupuestos con paginación y filtros
   */
  getPresupuestos(pagina = 1, porPagina = 10, busqueda, ordenarPor, orden, estado) {
    let query = this.supabase.from("presupuestos").select(`
        *,
        aviso:avisos(
          *,
          cliente:clientes(*)
        )
      `, { count: "exact" });
    if (busqueda) {
      query = query.or(`aviso.nombre_cliente_aviso.ilike.%${busqueda}%`);
    }
    if (estado) {
      query = query.eq("estado", estado);
    }
    const desde = (pagina - 1) * porPagina;
    query = query.range(desde, desde + porPagina - 1).order(ordenarPor || "fecha_creacion", { ascending: orden === "asc" });
    return from(query).pipe(map(({ data, error, count }) => {
      if (error)
        throw error;
      const presupuestos = data;
      this.presupuestosSubject.next(presupuestos);
      return {
        presupuestos,
        total: count || 0,
        pagina,
        por_pagina: porPagina
      };
    }), catchError((error) => {
      console.error("Error al obtener presupuestos:", error);
      throw error;
    }));
  }
  /**
   * Obtiene un presupuesto por su ID
   */
  getPresupuesto(id) {
    console.log("Servicio: Buscando presupuesto con ID:", id);
    return from(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          ),
          materiales_estimados
        `).eq("id", id).single()).pipe(map(({ data, error }) => {
      console.log("Servicio: Respuesta de Supabase:", { data, error });
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Crea un nuevo presupuesto
   */
  crearPresupuesto(presupuesto) {
    const presupuestoData = __spreadProps(__spreadValues({}, presupuesto), {
      fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
      estado: "Pendiente"
    });
    return from(this.supabase.from("presupuestos").insert([presupuestoData]).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(switchMap(({ data: presupuestoCreado, error: presupuestoError }) => {
      if (presupuestoError)
        throw presupuestoError;
      const presupuesto2 = presupuestoCreado;
      const presupuestosActuales = this.presupuestosSubject.value;
      this.presupuestosSubject.next([presupuesto2, ...presupuestosActuales]);
      this.dataUpdateService.notifyCreated("presupuestos");
      return from([presupuesto2]);
    }));
  }
  /**
   * Actualiza un presupuesto existente
   */
  actualizarPresupuesto(id, presupuesto) {
    console.log("Servicio: Actualizando presupuesto con ID:", id);
    console.log("Servicio: Datos recibidos:", presupuesto);
    const datosActualizados = __spreadProps(__spreadValues({}, presupuesto), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log("Servicio: Datos del presupuesto:", datosActualizados);
    return from(this.supabase.from("presupuestos").update(datosActualizados).eq("id", id).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(switchMap(({ data: presupuestoActualizado, error: presupuestoError }) => {
      if (presupuestoError)
        throw presupuestoError;
      const presupuesto2 = presupuestoActualizado;
      console.log("Servicio: Presupuesto actualizado:", presupuesto2);
      console.log("Servicio: Presupuesto actualizado:", presupuesto2);
      const presupuestosActuales = this.presupuestosSubject.value;
      const index = presupuestosActuales.findIndex((p) => p.id === id);
      if (index !== -1) {
        presupuestosActuales[index] = presupuesto2;
        this.presupuestosSubject.next([...presupuestosActuales]);
      }
      this.dataUpdateService.notifyUpdated("presupuestos");
      return from([presupuesto2]);
    }));
  }
  /**
   * Elimina un presupuesto
   */
  eliminarPresupuesto(id) {
    return from(this.supabase.from("presupuestos").delete().eq("id", id)).pipe(map(({ error }) => {
      if (error)
        throw error;
      const presupuestosActuales = this.presupuestosSubject.value;
      const presupuestosFiltrados = presupuestosActuales.filter((p) => p.id !== id);
      this.presupuestosSubject.next(presupuestosFiltrados);
      this.dataUpdateService.notifyDeleted("presupuestos");
    }));
  }
  /**
   * Busca presupuestos por término de búsqueda
   */
  buscarPresupuestos(termino) {
    return from(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).or(`aviso.nombre_cliente_aviso.ilike.%${termino}%`).limit(10)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Obtiene presupuestos por estado
   */
  getPresupuestosPorEstado(estado) {
    return from(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("estado", estado).order("fecha_creacion", { ascending: false })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Obtiene presupuestos por aviso
   */
  getPresupuestosPorAviso(avisoId) {
    return from(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("aviso_id", avisoId).order("fecha_creacion", { ascending: false })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Cambia el estado de un presupuesto
   */
  cambiarEstado(id, estado) {
    return from(this.supabase.from("presupuestos").update({
      estado,
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", id).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const presupuestoActualizado = data;
      const presupuestosActuales = this.presupuestosSubject.value;
      const index = presupuestosActuales.findIndex((p) => p.id === id);
      if (index !== -1) {
        presupuestosActuales[index] = presupuestoActualizado;
        this.presupuestosSubject.next([...presupuestosActuales]);
      }
      return presupuestoActualizado;
    }));
  }
  /**
   * Obtiene el valor actual de presupuestos
   */
  getPresupuestosActuales() {
    return this.presupuestosSubject.value;
  }
  /**
   * Limpia el estado de presupuestos
   */
  limpiarPresupuestos() {
    this.presupuestosSubject.next([]);
  }
};
_PresupuestosService.\u0275fac = function PresupuestosService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PresupuestosService)(\u0275\u0275inject(SupabaseClientService), \u0275\u0275inject(DataUpdateService));
};
_PresupuestosService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PresupuestosService, factory: _PresupuestosService.\u0275fac, providedIn: "root" });
var PresupuestosService = _PresupuestosService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PresupuestosService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SupabaseClientService }, { type: DataUpdateService }], null);
})();

export {
  PresupuestosService
};
//# sourceMappingURL=chunk-SKNF6UHJ.js.map
