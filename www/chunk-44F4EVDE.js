import {
  FacturasService
} from "./chunk-24UOAN2R.js";
import {
  PresupuestosService
} from "./chunk-SKNF6UHJ.js";
import {
  InventarioService
} from "./chunk-F77G4CBW.js";
import {
  DataUpdateService
} from "./chunk-VHAQXQOQ.js";
import {
  AvisosService
} from "./chunk-S2ZT5FDR.js";
import {
  BehaviorSubject,
  Injectable,
  SupabaseClientService,
  catchError,
  forkJoin,
  from,
  map,
  setClassMetadata,
  switchMap,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-ANYKLJQR.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-KNQSF6OU.js";

// src/app/core/services/materiales-trabajo.service.ts
var _MaterialesTrabajoService = class _MaterialesTrabajoService {
  constructor(inventarioService, supabaseClientService) {
    this.inventarioService = inventarioService;
    this.supabaseClientService = supabaseClientService;
    this.materialesSubject = new BehaviorSubject([]);
    this.materiales$ = this.materialesSubject.asObservable();
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Obtiene los materiales de un trabajo específico
   */
  getMaterialesTrabajo(trabajoId) {
    return from(this.supabase.from("materiales_trabajo").select(`
          *,
          material:inventario(*)
        `).eq("trabajo_id", trabajoId).order("id", { ascending: true })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const materiales = data;
      this.materialesSubject.next(materiales);
      return materiales;
    }), catchError((error) => {
      console.error("Error al obtener materiales del trabajo:", error);
      throw error;
    }));
  }
  /**
   * Añade materiales a un trabajo y descuenta del inventario
   */
  agregarMateriales(trabajoId, materiales) {
    if (materiales.length === 0) {
      return from([[]]);
    }
    const materialesInsert = materiales.map((material) => ({
      trabajo_id: trabajoId,
      material_id: material.material_id,
      cantidad_utilizada: material.cantidad_utilizada,
      precio_neto_al_momento: material.precio_neto_al_momento
    }));
    return from(this.supabase.from("materiales_trabajo").insert(materialesInsert).select(`
          *,
          material:inventario(*)
        `)).pipe(switchMap(({ data, error }) => {
      if (error)
        throw error;
      const nuevosMateriales = data;
      const materialesActuales = this.materialesSubject.value;
      this.materialesSubject.next([...materialesActuales, ...nuevosMateriales]);
      const actualizacionesStock = nuevosMateriales.map((material) => {
        const nuevaCantidad = material.material.cantidad_disponible - material.cantidad_utilizada;
        return this.inventarioService.actualizarStock(material.material_id, nuevaCantidad);
      });
      return forkJoin(actualizacionesStock).pipe(map(() => nuevosMateriales));
    }), catchError((error) => {
      console.error("Error al agregar materiales al trabajo:", error);
      throw error;
    }));
  }
  /**
   * Actualiza un material específico y ajusta el inventario
   */
  actualizarMaterial(materialId, material) {
    return from(this.supabase.from("materiales_trabajo").select(`
          *,
          material:inventario(*)
        `).eq("id", materialId).single()).pipe(switchMap(({ data: materialActual, error: errorActual }) => {
      if (errorActual)
        throw errorActual;
      const materialActualData = materialActual;
      const cantidadAnterior = materialActualData.cantidad_utilizada;
      const cantidadNueva = material.cantidad_utilizada || cantidadAnterior;
      const diferencia = cantidadNueva - cantidadAnterior;
      const datosActualizados = {
        cantidad_utilizada: material.cantidad_utilizada,
        precio_neto_al_momento: material.precio_neto_al_momento
      };
      return from(this.supabase.from("materiales_trabajo").update(datosActualizados).eq("id", materialId).select(`
              *,
              material:inventario(*)
            `).single()).pipe(switchMap(({ data, error }) => {
        if (error)
          throw error;
        const materialActualizado = data;
        const materialesActuales = this.materialesSubject.value;
        const index = materialesActuales.findIndex((m) => m.id === materialId);
        if (index !== -1) {
          materialesActuales[index] = materialActualizado;
          this.materialesSubject.next([...materialesActuales]);
        }
        if (diferencia !== 0) {
          const nuevaCantidad = materialActualData.material.cantidad_disponible - diferencia;
          return this.inventarioService.actualizarStock(materialActualData.material_id, nuevaCantidad).pipe(map(() => materialActualizado));
        }
        return from([materialActualizado]);
      }));
    }), catchError((error) => {
      console.error("Error al actualizar material:", error);
      throw error;
    }));
  }
  /**
   * Elimina un material del trabajo y devuelve al inventario
   */
  eliminarMaterial(materialId) {
    return from(this.supabase.from("materiales_trabajo").select(`
          *,
          material:inventario(*)
        `).eq("id", materialId).single()).pipe(switchMap(({ data: material, error: errorMaterial }) => {
      if (errorMaterial)
        throw errorMaterial;
      const materialData = material;
      return from(this.supabase.from("materiales_trabajo").delete().eq("id", materialId)).pipe(switchMap(({ error }) => {
        if (error)
          throw error;
        const materialesActuales = this.materialesSubject.value;
        const materialesFiltrados = materialesActuales.filter((m) => m.id !== materialId);
        this.materialesSubject.next(materialesFiltrados);
        const nuevaCantidad = materialData.material.cantidad_disponible + materialData.cantidad_utilizada;
        return this.inventarioService.actualizarStock(materialData.material_id, nuevaCantidad).pipe(map(() => {
        }));
      }));
    }), catchError((error) => {
      console.error("Error al eliminar material:", error);
      throw error;
    }));
  }
  /**
   * Elimina todos los materiales de un trabajo y los devuelve al inventario
   */
  eliminarMaterialesTrabajo(trabajoId) {
    return from(this.supabase.from("materiales_trabajo").select(`
          *,
          material:inventario(*)
        `).eq("trabajo_id", trabajoId)).pipe(switchMap(({ data: materiales, error: errorMateriales }) => {
      if (errorMateriales)
        throw errorMateriales;
      const materialesData = materiales;
      return from(this.supabase.from("materiales_trabajo").delete().eq("trabajo_id", trabajoId)).pipe(switchMap(({ error }) => {
        if (error)
          throw error;
        const materialesActuales = this.materialesSubject.value;
        const materialesFiltrados = materialesActuales.filter((m) => m.trabajo_id !== trabajoId);
        this.materialesSubject.next(materialesFiltrados);
        if (materialesData.length > 0) {
          const actualizacionesStock = materialesData.map((material) => {
            const nuevaCantidad = material.material.cantidad_disponible + material.cantidad_utilizada;
            return this.inventarioService.actualizarStock(material.material_id, nuevaCantidad);
          });
          return forkJoin(actualizacionesStock).pipe(map(() => {
          }));
        }
        return from([void 0]);
      }));
    }), catchError((error) => {
      console.error("Error al eliminar materiales del trabajo:", error);
      throw error;
    }));
  }
  /**
   * Calcula el costo total de materiales de un trabajo
   */
  calcularCostoMateriales(materiales) {
    return materiales.reduce((total, material) => {
      return total + material.cantidad_utilizada * material.precio_neto_al_momento;
    }, 0);
  }
  /**
   * Obtiene el valor actual de materiales
   */
  getMaterialesActuales() {
    return this.materialesSubject.value;
  }
  /**
   * Limpia el estado de materiales
   */
  limpiarMateriales() {
    this.materialesSubject.next([]);
  }
};
_MaterialesTrabajoService.\u0275fac = function MaterialesTrabajoService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MaterialesTrabajoService)(\u0275\u0275inject(InventarioService), \u0275\u0275inject(SupabaseClientService));
};
_MaterialesTrabajoService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MaterialesTrabajoService, factory: _MaterialesTrabajoService.\u0275fac, providedIn: "root" });
var MaterialesTrabajoService = _MaterialesTrabajoService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialesTrabajoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: InventarioService }, { type: SupabaseClientService }], null);
})();

// src/app/core/services/trabajos.service.ts
var _TrabajosService = class _TrabajosService {
  constructor(materialesTrabajoService, supabaseClientService, dataUpdateService) {
    this.materialesTrabajoService = materialesTrabajoService;
    this.supabaseClientService = supabaseClientService;
    this.dataUpdateService = dataUpdateService;
    this.trabajosSubject = new BehaviorSubject([]);
    this.trabajos$ = this.trabajosSubject.asObservable();
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Obtiene los trabajos realizados de un aviso
   */
  getTrabajosAviso(avisoId, pagina = 1, porPagina = 10) {
    const desde = (pagina - 1) * porPagina;
    return from(this.supabase.from("trabajos_realizados").select("*", { count: "exact" }).eq("aviso_id", avisoId).order("fecha_trabajo", { ascending: false }).range(desde, desde + porPagina - 1)).pipe(map(({ data, error, count }) => {
      if (error)
        throw error;
      const trabajos = data;
      this.trabajosSubject.next(trabajos);
      return {
        trabajos,
        total: count || 0,
        pagina,
        por_pagina: porPagina
      };
    }), catchError((error) => {
      console.error("Error al obtener trabajos:", error);
      throw error;
    }));
  }
  /**
   * Obtiene un trabajo por su ID con sus materiales
   */
  getTrabajo(id) {
    return from(this.supabase.from("trabajos_realizados").select("*").eq("id", id).single()).pipe(switchMap(({ data: trabajo, error: trabajoError }) => {
      if (trabajoError)
        throw trabajoError;
      const trabajoData = trabajo;
      return this.materialesTrabajoService.getMaterialesTrabajo(id).pipe(map((materiales) => ({
        trabajo: trabajoData,
        materiales
      })));
    }), catchError((error) => {
      console.error("Error al obtener trabajo:", error);
      throw error;
    }));
  }
  /**
   * Crea un nuevo trabajo realizado con materiales
   */
  crearTrabajo(trabajo) {
    const _a = trabajo, { materiales } = _a, trabajoData = __objRest(_a, ["materiales"]);
    const trabajoInsert = __spreadProps(__spreadValues({}, trabajoData), {
      fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("trabajos_realizados").insert([trabajoInsert]).select().single()).pipe(switchMap(({ data: trabajoCreado, error: trabajoError }) => {
      if (trabajoError)
        throw trabajoError;
      const nuevoTrabajo = trabajoCreado;
      const trabajosActuales = this.trabajosSubject.value;
      this.trabajosSubject.next([nuevoTrabajo, ...trabajosActuales]);
      this.dataUpdateService.notifyCreated("trabajos");
      if (!materiales || materiales.length === 0) {
        return from([{
          trabajo: nuevoTrabajo,
          materiales: []
        }]);
      }
      return this.materialesTrabajoService.agregarMateriales(nuevoTrabajo.id, materiales).pipe(map((materialesCreados) => ({
        trabajo: nuevoTrabajo,
        materiales: materialesCreados
      })));
    }), catchError((error) => {
      console.error("Error al crear trabajo:", error);
      throw error;
    }));
  }
  /**
   * Actualiza un trabajo existente
   */
  actualizarTrabajo(id, trabajo) {
    const _a = trabajo, { materiales } = _a, trabajoData = __objRest(_a, ["materiales"]);
    const datosActualizados = __spreadProps(__spreadValues({}, trabajoData), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("trabajos_realizados").update(datosActualizados).eq("id", id).select().single()).pipe(switchMap(({ data: trabajoActualizado, error: trabajoError }) => {
      if (trabajoError)
        throw trabajoError;
      const trabajo2 = trabajoActualizado;
      const trabajosActuales = this.trabajosSubject.value;
      const index = trabajosActuales.findIndex((t) => t.id === id);
      if (index !== -1) {
        trabajosActuales[index] = trabajo2;
        this.trabajosSubject.next([...trabajosActuales]);
      }
      this.dataUpdateService.notifyUpdated("trabajos");
      if (!materiales) {
        return this.getTrabajo(id);
      }
      return this.materialesTrabajoService.eliminarMaterialesTrabajo(id).pipe(switchMap(() => {
        if (materiales.length === 0) {
          return from([{
            trabajo: trabajo2,
            materiales: []
          }]);
        }
        return this.materialesTrabajoService.agregarMateriales(id, materiales).pipe(map((materialesCreados) => ({
          trabajo: trabajo2,
          materiales: materialesCreados
        })));
      }));
    }), catchError((error) => {
      console.error("Error al actualizar trabajo:", error);
      throw error;
    }));
  }
  /**
   * Elimina un trabajo y sus materiales
   */
  eliminarTrabajo(id) {
    return this.materialesTrabajoService.eliminarMaterialesTrabajo(id).pipe(switchMap(() => {
      return from(this.supabase.from("trabajos_realizados").delete().eq("id", id));
    }), map(({ error }) => {
      if (error)
        throw error;
      const trabajosActuales = this.trabajosSubject.value;
      const trabajosFiltrados = trabajosActuales.filter((t) => t.id !== id);
      this.trabajosSubject.next(trabajosFiltrados);
      this.dataUpdateService.notifyDeleted("trabajos");
    }), catchError((error) => {
      console.error("Error al eliminar trabajo:", error);
      throw error;
    }));
  }
  /**
   * Obtiene estadísticas de trabajos para un aviso
   */
  getEstadisticasTrabajos(avisoId) {
    return from(this.supabase.from("trabajos_realizados").select("*").eq("aviso_id", avisoId)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const trabajos = data;
      const estadisticas = {
        totalTrabajos: trabajos.length,
        trabajosCompletados: trabajos.filter((t) => t.estado === "Completado").length,
        trabajosPendientes: trabajos.filter((t) => t.estado === "Pendiente").length,
        trabajosEnCurso: trabajos.filter((t) => t.estado === "En curso").length,
        trabajosCancelados: trabajos.filter((t) => t.estado === "Cancelado").length,
        totalHoras: trabajos.reduce((total, trabajo) => {
          const inicio = /* @__PURE__ */ new Date(`2000-01-01T${trabajo.hora_inicio}`);
          const fin = /* @__PURE__ */ new Date(`2000-01-01T${trabajo.hora_fin}`);
          const horas = (fin.getTime() - inicio.getTime()) / (1e3 * 60 * 60);
          return total + Math.max(0, horas);
        }, 0)
      };
      return estadisticas;
    }));
  }
  /**
   * Obtiene el valor actual de trabajos
   */
  getTrabajosActuales() {
    return this.trabajosSubject.value;
  }
  /**
   * Limpia el estado de trabajos
   */
  limpiarTrabajos() {
    this.trabajosSubject.next([]);
    this.materialesTrabajoService.limpiarMateriales();
  }
  /**
   * Actualiza el estado del trabajo cuando se crea un albarán
   */
  actualizarEstadoTrabajo(id, nuevoEstado, albaranId) {
    const datosActualizados = {
      estado: nuevoEstado,
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (albaranId) {
      datosActualizados.albaran_id = albaranId;
    }
    return from(this.supabase.from("trabajos_realizados").update(datosActualizados).eq("id", id).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const trabajo = data;
      const trabajosActuales = this.trabajosSubject.value;
      const index = trabajosActuales.findIndex((t) => t.id === id);
      if (index !== -1) {
        trabajosActuales[index] = trabajo;
        this.trabajosSubject.next([...trabajosActuales]);
      }
      this.dataUpdateService.notifyUpdated("trabajos");
      return trabajo;
    }), catchError((error) => {
      console.error("Error al actualizar estado del trabajo:", error);
      throw error;
    }));
  }
};
_TrabajosService.\u0275fac = function TrabajosService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TrabajosService)(\u0275\u0275inject(MaterialesTrabajoService), \u0275\u0275inject(SupabaseClientService), \u0275\u0275inject(DataUpdateService));
};
_TrabajosService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TrabajosService, factory: _TrabajosService.\u0275fac, providedIn: "root" });
var TrabajosService = _TrabajosService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrabajosService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: MaterialesTrabajoService }, { type: SupabaseClientService }, { type: DataUpdateService }], null);
})();

// src/app/core/services/flujo-avisos.service.ts
var _FlujoAvisosService = class _FlujoAvisosService {
  constructor(avisosService, facturasService, presupuestosService, trabajosService) {
    this.avisosService = avisosService;
    this.facturasService = facturasService;
    this.presupuestosService = presupuestosService;
    this.trabajosService = trabajosService;
  }
  /**
   * Obtiene el estado actual del flujo para un aviso
   */
  obtenerEstadoFlujo(avisoId) {
    return this.avisosService.getResumenCompletoAviso(avisoId).pipe(map((resumen) => {
      const estado = {
        avisoId,
        estadoActual: resumen.estado,
        puedeCrearPresupuesto: this.puedeCrearPresupuesto(resumen),
        puedeAprobarPresupuesto: this.puedeAprobarPresupuesto(resumen),
        puedeFacturarPresupuesto: this.puedeFacturarPresupuesto(resumen),
        puedeFacturarTrabajos: this.puedeFacturarTrabajos(resumen),
        puedeCompletarAviso: this.puedeCompletarAviso(resumen),
        resumen
      };
      return estado;
    }));
  }
  /**
   * Ejecuta el flujo completo: Presupuesto → Aprobación → Factura
   */
  ejecutarFlujoCompleto(avisoId, crearPresupuesto = true) {
    if (!crearPresupuesto) {
      return this.flujoDirectoSinPresupuesto(avisoId);
    }
    return this.flujoConPresupuesto(avisoId);
  }
  /**
   * Flujo directo sin presupuesto
   */
  flujoDirectoSinPresupuesto(avisoId) {
    return this.avisosService.actualizarAviso(avisoId, {
      estado: "En curso",
      requiere_presupuesto: false
    }).pipe(tap(() => console.log("\u2705 Aviso actualizado para trabajo directo")), switchMap(() => this.avisosService.getResumenCompletoAviso(avisoId)), map((resumen) => ({
      paso: "flujo_directo_iniciado",
      avisoId,
      mensaje: "Flujo directo iniciado. El t\xE9cnico puede comenzar a trabajar.",
      resumen
    })));
  }
  /**
   * Flujo con presupuesto
   */
  flujoConPresupuesto(avisoId) {
    return this.avisosService.actualizarAviso(avisoId, {
      estado: "Pendiente de presupuesto",
      requiere_presupuesto: true
    }).pipe(tap(() => console.log("\u2705 Aviso marcado como requiere presupuesto")), switchMap(() => this.presupuestosService.crearPresupuesto({
      aviso_id: avisoId,
      horas_estimadas: 2,
      // Estimación por defecto
      total_estimado: 0
    })), tap(() => console.log("\u2705 Presupuesto creado")), map((presupuesto) => ({
      paso: "presupuesto_creado",
      avisoId,
      presupuestoId: presupuesto.id,
      mensaje: "Presupuesto creado. Pendiente de evaluaci\xF3n y aprobaci\xF3n.",
      presupuesto
    })));
  }
  /**
   * Aprueba un presupuesto y cambia el estado del aviso
   */
  aprobarPresupuesto(presupuestoId) {
    return this.presupuestosService.cambiarEstado(presupuestoId, "Completado").pipe(switchMap((presupuesto) => this.avisosService.actualizarAviso(presupuesto.aviso_id, { estado: "En curso" })), tap(() => console.log("\u2705 Presupuesto aprobado y aviso en curso")), map((aviso) => ({
      paso: "presupuesto_aprobado",
      avisoId: aviso.id,
      mensaje: "Presupuesto aprobado. El t\xE9cnico puede comenzar a trabajar.",
      aviso
    })));
  }
  /**
   * Convierte un presupuesto aprobado en factura automáticamente
   */
  facturarPresupuesto(presupuestoId) {
    return this.facturasService.crearFacturaDesdePresupuesto(presupuestoId).pipe(tap(() => console.log("\u2705 Factura creada desde presupuesto")), switchMap((factura) => this.avisosService.actualizarEstadoAutomatico(factura.factura.aviso_id).pipe(map(() => factura))), map((factura) => ({
      paso: "factura_desde_presupuesto",
      avisoId: factura.factura.aviso_id,
      facturaId: factura.factura.id,
      mensaje: "Factura generada autom\xE1ticamente desde presupuesto aprobado.",
      factura
    })));
  }
  /**
   * Factura trabajos realizados sin presupuesto
   * Actualizado para el nuevo flujo de albaranes
   */
  facturarTrabajos(avisoId) {
    console.log("\u{1F527} Iniciando facturaci\xF3n de trabajos para aviso:", avisoId);
    return this.avisosService.getResumenCompletoAviso(avisoId).pipe(switchMap((resumen) => {
      var _a;
      console.log("\u{1F527} Resumen completo obtenido:", resumen);
      if (!resumen.estadisticas.trabajosFinalizados) {
        throw new Error("No hay trabajos finalizados para facturar. Debes crear un albar\xE1n primero.");
      }
      const trabajosSinAlbaranCerrado = ((_a = resumen.trabajos) == null ? void 0 : _a.filter((t) => {
        var _a2;
        return !t.albaran_id || !((_a2 = t.albaran) == null ? void 0 : _a2.estado_cierre) || t.albaran.estado_cierre === "Otra visita";
      })) || [];
      if (trabajosSinAlbaranCerrado.length > 0) {
        const trabajosPendientes = trabajosSinAlbaranCerrado.map((t) => {
          var _a2;
          return `Trabajo #${(_a2 = t.id) == null ? void 0 : _a2.substring(0, 8)} (${t.descripcion})`;
        }).join(", ");
        throw new Error(`No se puede facturar. Los siguientes trabajos no tienen albaranes cerrados: ${trabajosPendientes}. Debes cerrar todos los albaranes antes de facturar.`);
      }
      console.log("\u{1F527} Cliente del resumen:", resumen.cliente);
      const datosFactura = this.convertirDatosAFactura({
        avisoId,
        cliente: resumen.cliente,
        resumen
      });
      return this.facturasService.getSiguienteNumero().pipe(switchMap((numeroFactura) => {
        datosFactura.numero_factura = numeroFactura;
        console.log("\u{1F527} N\xFAmero de factura generado:", numeroFactura);
        return this.facturasService.crearFactura(datosFactura);
      }));
    }), tap(() => console.log("\u2705 Factura creada desde trabajos realizados")), switchMap(() => this.avisosService.getResumenCompletoAviso(avisoId)), map((resumen) => ({
      paso: "factura_creada_desde_trabajos",
      avisoId,
      mensaje: "Factura creada exitosamente desde trabajos realizados",
      resumen
    })));
  }
  /**
   * Verifica si una factura puede ser marcada como "Completado"
   * basándose en el estado del aviso
   */
  verificarEstadoFactura(facturaId, avisoId) {
    return this.avisosService.getResumenCompletoAviso(avisoId).pipe(switchMap((resumen) => {
      if (resumen.estado === "Completado") {
        return this.facturasService.cambiarEstado(facturaId, "Completado");
      }
      if (resumen.estado === "Listo para facturar") {
        return this.facturasService.cambiarEstado(facturaId, "En curso");
      }
      return from([{ id: facturaId, estado: "Pendiente" }]);
    }));
  }
  /**
   * Sincroniza el estado de todas las facturas de un aviso
   * basándose en el estado actual del aviso
   */
  sincronizarEstadosFacturas(avisoId) {
    return this.avisosService.getResumenCompletoAviso(avisoId).pipe(switchMap((resumen) => {
      if (!resumen.facturas || resumen.facturas.length === 0) {
        return from([{ mensaje: "No hay facturas para sincronizar" }]);
      }
      let nuevoEstadoFactura;
      if (resumen.estado === "Completado") {
        nuevoEstadoFactura = "Completado";
      } else if (resumen.estado === "Listo para facturar") {
        nuevoEstadoFactura = "En curso";
      } else {
        nuevoEstadoFactura = "Pendiente";
      }
      const actualizacionesFacturas = resumen.facturas.map((factura) => this.facturasService.cambiarEstado(factura.id, nuevoEstadoFactura));
      return forkJoin(actualizacionesFacturas).pipe(map(() => ({
        mensaje: `Estados de ${resumen.facturas.length} factura(s) sincronizados a "${nuevoEstadoFactura}"`,
        avisoId,
        nuevoEstado: nuevoEstadoFactura
      })));
    }));
  }
  /**
   * Completa un aviso marcándolo como finalizado
   * Actualizado para el nuevo flujo de albaranes
   */
  completarAviso(avisoId) {
    return this.avisosService.getResumenCompletoAviso(avisoId).pipe(switchMap((resumen) => {
      var _a;
      if (!this.puedeCompletarAviso(resumen)) {
        throw new Error("No se puede completar el aviso. Verifica que haya trabajos finalizados y facturas generadas.");
      }
      const trabajosSinAlbaranCerrado = ((_a = resumen.trabajos) == null ? void 0 : _a.filter((t) => {
        var _a2;
        return !t.albaran_id || !((_a2 = t.albaran) == null ? void 0 : _a2.estado_cierre) || t.albaran.estado_cierre === "Otra visita";
      })) || [];
      if (trabajosSinAlbaranCerrado.length > 0) {
        const trabajosPendientes = trabajosSinAlbaranCerrado.map((t) => {
          var _a2;
          return `Trabajo #${(_a2 = t.id) == null ? void 0 : _a2.substring(0, 8)} (${t.descripcion})`;
        }).join(", ");
        throw new Error(`No se puede completar el aviso. Los siguientes trabajos no tienen albaranes cerrados: ${trabajosPendientes}. Debes cerrar todos los albaranes antes de completar el aviso.`);
      }
      return this.avisosService.actualizarAviso(avisoId, {
        estado: "Completado",
        fecha_finalizacion: /* @__PURE__ */ new Date()
      }).pipe(switchMap((avisoActualizado) => {
        if (resumen.facturas && resumen.facturas.length > 0) {
          const actualizacionesFacturas = resumen.facturas.map((factura) => this.facturasService.cambiarEstado(factura.id, "Completado"));
          return forkJoin(actualizacionesFacturas).pipe(map(() => avisoActualizado));
        }
        return from([avisoActualizado]);
      }));
    }), tap(() => console.log("\u2705 Aviso completado exitosamente")), switchMap(() => this.avisosService.getResumenCompletoAviso(avisoId)), map((resumen) => ({
      paso: "aviso_completado",
      avisoId,
      mensaje: "Aviso marcado como completado",
      resumen
    })));
  }
  /**
   * Obtiene todas las acciones disponibles para un aviso
   */
  obtenerAccionesDisponibles(avisoId) {
    return this.obtenerEstadoFlujo(avisoId).pipe(map((estado) => {
      const acciones = [];
      if (estado.puedeFacturarTrabajos) {
        acciones.push("facturar_trabajos");
      }
      if (estado.puedeCompletarAviso) {
        acciones.push("completar_aviso");
      }
      return acciones;
    }));
  }
  // Métodos de validación privados para el nuevo flujo
  puedeCrearPresupuesto(resumen) {
    return false;
  }
  puedeAprobarPresupuesto(resumen) {
    return false;
  }
  puedeFacturarPresupuesto(resumen) {
    return false;
  }
  puedeFacturarTrabajos(resumen) {
    var _a;
    const todosLosTrabajosTienenAlbaranesCerrados = ((_a = resumen.trabajos) == null ? void 0 : _a.every((t) => {
      var _a2;
      return t.albaran_id && ((_a2 = t.albaran) == null ? void 0 : _a2.estado_cierre) && t.albaran.estado_cierre !== "Otra visita";
    })) || false;
    return resumen.estadisticas.trabajosFinalizados > 0 && resumen.estadisticas.facturasPendientes === 0 && todosLosTrabajosTienenAlbaranesCerrados;
  }
  puedeCompletarAviso(resumen) {
    var _a;
    const todosLosTrabajosTienenAlbaranesCerrados = ((_a = resumen.trabajos) == null ? void 0 : _a.every((t) => {
      var _a2;
      return t.albaran_id && ((_a2 = t.albaran) == null ? void 0 : _a2.estado_cierre) && t.albaran.estado_cierre !== "Otra visita";
    })) || false;
    return resumen.estadisticas.trabajosFinalizados > 0 && resumen.estadisticas.totalFacturas > 0 && todosLosTrabajosTienenAlbaranesCerrados;
  }
  convertirDatosAFactura(datosFactura) {
    var _a;
    console.log("\u{1F527} Datos de factura recibidos:", datosFactura);
    if (!datosFactura.cliente || !datosFactura.cliente.id) {
      throw new Error("Datos de cliente incompletos para crear factura");
    }
    const lineasFactura = [];
    let horasTotales = 0;
    if (datosFactura.resumen.albaranes && datosFactura.resumen.albaranes.length > 0) {
      datosFactura.resumen.albaranes.forEach((albaran) => {
        if (albaran.estado_cierre === "Finalizado") {
          const horaEntrada = /* @__PURE__ */ new Date(`2000-01-01T${albaran.hora_entrada}`);
          const horaSalida = /* @__PURE__ */ new Date(`2000-01-01T${albaran.hora_salida}`);
          const horasTrabajo = (horaSalida.getTime() - horaEntrada.getTime()) / (1e3 * 60 * 60);
          horasTotales += Math.max(0, horasTrabajo);
        }
      });
    }
    if (horasTotales > 0) {
      lineasFactura.push({
        tipo: "mano_obra",
        nombre: "Mano de obra t\xE9cnica",
        cantidad: Math.round(horasTotales * 10) / 10,
        // Redondear a 1 decimal
        precio_pvp: 50,
        // Precio por hora
        descripcion: `${Math.round(horasTotales * 10) / 10} horas de trabajo t\xE9cnico`
      });
    }
    const repuestosUtilizados = /* @__PURE__ */ new Map();
    if (datosFactura.resumen.albaranes) {
      datosFactura.resumen.albaranes.forEach((albaran) => {
        if (albaran.repuestos_utilizados && albaran.repuestos_utilizados.length > 0) {
          albaran.repuestos_utilizados.forEach((repuesto) => {
            const existente = repuestosUtilizados.get(repuesto.nombre);
            if (existente) {
              existente.cantidad += repuesto.cantidad || 1;
            } else {
              repuestosUtilizados.set(repuesto.nombre, {
                cantidad: repuesto.cantidad || 1,
                precio_neto: repuesto.precio_neto || 0,
                precio_pvp: repuesto.precio_pvp || 25,
                unidad: repuesto.unidad || "unidad",
                codigo: repuesto.codigo || ""
              });
            }
          });
        }
      });
    }
    repuestosUtilizados.forEach((datos, nombre) => {
      lineasFactura.push({
        tipo: "repuesto",
        nombre,
        cantidad: datos.cantidad,
        // ← CANTIDAD REAL
        precio_neto: datos.precio_neto,
        precio_pvp: datos.precio_pvp,
        descripcion: `Repuesto utilizado: ${nombre} (${datos.cantidad} ${datos.unidad})`
      });
    });
    if (lineasFactura.length === 0) {
      lineasFactura.push({
        tipo: "mano_obra",
        nombre: "Servicio t\xE9cnico b\xE1sico",
        cantidad: 1,
        precio_pvp: 50,
        descripcion: "Servicio t\xE9cnico realizado"
      });
    }
    console.log("\u{1F527} L\xEDneas de factura creadas:", lineasFactura);
    console.log("\u{1F527} Horas totales calculadas:", horasTotales);
    console.log("\u{1F527} Repuestos con cantidades reales:", repuestosUtilizados);
    const totales = this.facturasService.calcularTotales(lineasFactura);
    console.log("\u{1F527} Totales calculados:", totales);
    return {
      numero_factura: "",
      // Se generará automáticamente por el servicio
      fecha_emision: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      cliente_id: datosFactura.cliente.id,
      nombre_cliente: datosFactura.cliente.nombre_completo,
      direccion_cliente: datosFactura.cliente.direccion || "Sin direcci\xF3n",
      cif_cliente: "Sin CIF",
      // El modelo de cliente no tiene CIF
      email_cliente: datosFactura.cliente.email || "Sin email",
      aviso_id: datosFactura.avisoId,
      subtotal: totales.subtotal,
      iva: totales.iva,
      total: totales.total,
      estado: "En curso",
      // Cambiar a 'En curso' para indicar que está siendo procesada
      notas: `Factura generada desde ${((_a = datosFactura.resumen.albaranes) == null ? void 0 : _a.length) || 0} albar\xE1n(es) con ${Math.round(horasTotales * 10) / 10}h de trabajo t\xE9cnico`,
      lineas: lineasFactura
    };
  }
};
_FlujoAvisosService.\u0275fac = function FlujoAvisosService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FlujoAvisosService)(\u0275\u0275inject(AvisosService), \u0275\u0275inject(FacturasService), \u0275\u0275inject(PresupuestosService), \u0275\u0275inject(TrabajosService));
};
_FlujoAvisosService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FlujoAvisosService, factory: _FlujoAvisosService.\u0275fac, providedIn: "root" });
var FlujoAvisosService = _FlujoAvisosService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlujoAvisosService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: AvisosService }, { type: FacturasService }, { type: PresupuestosService }, { type: TrabajosService }], null);
})();

export {
  TrabajosService,
  FlujoAvisosService
};
//# sourceMappingURL=chunk-44F4EVDE.js.map
