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
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-ANYKLJQR.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-KNQSF6OU.js";

// src/app/modules/facturas/services/facturas.service.ts
var _FacturasService = class _FacturasService {
  constructor(supabaseClientService, dataUpdateService) {
    this.supabaseClientService = supabaseClientService;
    this.dataUpdateService = dataUpdateService;
    this.facturasSubject = new BehaviorSubject([]);
    this.facturas$ = this.facturasSubject.asObservable();
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Obtiene la lista de facturas con paginación y filtros
   */
  getFacturas(pagina = 1, porPagina = 10, busqueda, ordenarPor, orden, estado) {
    let query = this.supabase.from("facturas").select(`
        *,
        cliente:clientes(*),
        aviso:avisos(*)
      `, { count: "exact" });
    if (busqueda) {
      query = query.or(`numero_factura.ilike.%${busqueda}%,nombre_cliente.ilike.%${busqueda}%`);
    }
    if (estado) {
      query = query.eq("estado", estado);
    }
    const desde = (pagina - 1) * porPagina;
    query = query.range(desde, desde + porPagina - 1).order(ordenarPor || "fecha_creacion", { ascending: orden === "asc" });
    return from(query).pipe(map(({ data, error, count }) => {
      if (error)
        throw error;
      const facturas = data;
      this.facturasSubject.next(facturas);
      return {
        facturas,
        total: count || 0,
        pagina,
        por_pagina: porPagina
      };
    }), catchError((error) => {
      console.error("Error al obtener facturas:", error);
      throw error;
    }));
  }
  /**
   * Obtiene una factura por su ID con todas sus líneas
   */
  getFactura(id) {
    return from(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("id", id).single()).pipe(switchMap(({ data: factura, error: facturaError }) => {
      if (facturaError)
        throw facturaError;
      return from(this.supabase.from("lineas_factura").select("*").eq("factura_id", id).order("fecha_creacion", { ascending: true })).pipe(map(({ data: lineas, error: lineasError }) => {
        if (lineasError)
          throw lineasError;
        return {
          factura,
          lineas
        };
      }));
    }));
  }
  /**
   * Crea una nueva factura con sus líneas
   */
  crearFactura(facturaCompleta) {
    const _a = facturaCompleta, { lineas } = _a, facturaData = __objRest(_a, ["lineas"]);
    const facturaInsert = __spreadProps(__spreadValues({}, facturaData), {
      subtotal: facturaData.subtotal || 0,
      iva: facturaData.iva || 0,
      total: facturaData.total || 0,
      fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (isNaN(facturaInsert.subtotal) || !isFinite(facturaInsert.subtotal)) {
      console.error("\u274C Subtotal inv\xE1lido:", facturaInsert.subtotal);
      facturaInsert.subtotal = 0;
    }
    if (isNaN(facturaInsert.iva) || !isFinite(facturaInsert.iva)) {
      console.error("\u274C IVA inv\xE1lido:", facturaInsert.iva);
      facturaInsert.iva = 0;
    }
    if (isNaN(facturaInsert.total) || !isFinite(facturaInsert.total)) {
      console.error("\u274C Total inv\xE1lido:", facturaInsert.total);
      facturaInsert.total = 0;
    }
    console.log("\u{1F4CB} Insertando factura con datos:", facturaInsert);
    return from(this.supabase.from("facturas").insert([facturaInsert]).select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).single()).pipe(switchMap(({ data: factura, error: facturaError }) => {
      if (facturaError) {
        if (facturaError.code === "23505" && facturaError.message.includes("numero_factura")) {
          console.warn("N\xFAmero de factura duplicado, generando nuevo n\xFAmero...");
          return this.getSiguienteNumero().pipe(switchMap((nuevoNumero) => {
            const facturaRetry = __spreadProps(__spreadValues({}, facturaInsert), {
              numero_factura: nuevoNumero
            });
            return from(this.supabase.from("facturas").insert([facturaRetry]).select(`
                      *,
                      cliente:clientes(*),
                      aviso:avisos(*)
                    `).single()).pipe(switchMap(({ data: facturaRetryData, error: retryError }) => {
              if (retryError)
                throw retryError;
              return this.procesarLineasFactura(facturaRetryData, lineas);
            }));
          }));
        }
        throw facturaError;
      }
      return this.procesarLineasFactura(factura, lineas);
    }));
  }
  /**
   * Procesa las líneas de factura después de crear la factura
   */
  procesarLineasFactura(factura, lineas) {
    if (!lineas || lineas.length === 0) {
      const facturasActuales = this.facturasSubject.value;
      this.facturasSubject.next([factura, ...facturasActuales]);
      this.dataUpdateService.notifyCreated("facturas");
      return from([{
        factura,
        lineas: []
      }]);
    }
    const lineasInsert = lineas.map((linea) => __spreadProps(__spreadValues({}, linea), {
      factura_id: factura.id,
      fecha_creacion: (/* @__PURE__ */ new Date()).toISOString()
    }));
    return from(this.supabase.from("lineas_factura").insert(lineasInsert).select()).pipe(map(({ data: lineasCreadas, error: lineasError }) => {
      if (lineasError)
        throw lineasError;
      const facturasActuales = this.facturasSubject.value;
      this.facturasSubject.next([factura, ...facturasActuales]);
      this.dataUpdateService.notifyCreated("facturas");
      return {
        factura,
        lineas: lineasCreadas
      };
    }));
  }
  /**
   * Actualiza una factura existente
   */
  actualizarFactura(id, facturaCompleta) {
    const _a = facturaCompleta, { lineas } = _a, facturaData = __objRest(_a, ["lineas"]);
    const facturaUpdate = __spreadProps(__spreadValues({}, facturaData), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("facturas").update(facturaUpdate).eq("id", id).select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).single()).pipe(switchMap(({ data: factura, error: facturaError }) => {
      if (facturaError)
        throw facturaError;
      const facturaActualizada = factura;
      if (!lineas) {
        return this.getFactura(id);
      }
      return from(this.supabase.from("lineas_factura").delete().eq("factura_id", id)).pipe(switchMap(({ error: deleteError }) => {
        if (deleteError)
          throw deleteError;
        if (lineas.length === 0) {
          return from([{
            factura: facturaActualizada,
            lineas: []
          }]);
        }
        const lineasInsert = lineas.map((linea) => __spreadProps(__spreadValues({}, linea), {
          factura_id: id,
          fecha_creacion: (/* @__PURE__ */ new Date()).toISOString()
        }));
        return from(this.supabase.from("lineas_factura").insert(lineasInsert).select()).pipe(map(({ data: lineasCreadas, error: lineasError }) => {
          if (lineasError)
            throw lineasError;
          const facturasActuales = this.facturasSubject.value;
          const index = facturasActuales.findIndex((f) => f.id === id);
          if (index !== -1) {
            facturasActuales[index] = facturaActualizada;
            this.facturasSubject.next([...facturasActuales]);
          }
          this.dataUpdateService.notifyUpdated("facturas");
          return {
            factura: facturaActualizada,
            lineas: lineasCreadas
          };
        }));
      }));
    }));
  }
  /**
   * Elimina una factura y todas sus líneas
   */
  eliminarFactura(id) {
    return from(this.supabase.from("lineas_factura").delete().eq("factura_id", id)).pipe(switchMap(({ error: lineasError }) => {
      if (lineasError)
        throw lineasError;
      return from(this.supabase.from("facturas").delete().eq("id", id));
    }), map(({ error }) => {
      if (error)
        throw error;
      const facturasActuales = this.facturasSubject.value;
      const facturasFiltradas = facturasActuales.filter((f) => f.id !== id);
      this.facturasSubject.next(facturasFiltradas);
      this.dataUpdateService.notifyDeleted("facturas");
    }));
  }
  /**
   * Busca facturas por término de búsqueda
   */
  buscarFacturas(termino) {
    return from(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).or(`numero_factura.ilike.%${termino}%,nombre_cliente.ilike.%${termino}%`).limit(10)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Obtiene facturas por estado
   */
  getFacturasPorEstado(estado) {
    return from(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("estado", estado).order("fecha_creacion", { ascending: false })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Obtiene facturas por cliente
   */
  getFacturasPorCliente(clienteId) {
    return from(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("cliente_id", clienteId).order("fecha_creacion", { ascending: false })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Obtiene facturas por aviso
   */
  getFacturasPorAviso(avisoId) {
    return from(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("aviso_id", avisoId).order("fecha_creacion", { ascending: false })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Cambia el estado de una factura
   */
  cambiarEstado(id, estado) {
    return from(this.supabase.from("facturas").update({
      estado,
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", id).select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const facturaActualizada = data;
      const facturasActuales = this.facturasSubject.value;
      const index = facturasActuales.findIndex((f) => f.id === id);
      if (index !== -1) {
        facturasActuales[index] = facturaActualizada;
        this.facturasSubject.next([...facturasActuales]);
      }
      this.dataUpdateService.notifyUpdated("facturas");
      return facturaActualizada;
    }));
  }
  /**
   * Obtiene el siguiente número de factura de forma atómica
   */
  getSiguienteNumero() {
    return from(this.supabase.rpc("obtener_siguiente_numero_factura")).pipe(map(({ data, error }) => {
      if (error) {
        console.error("Error al obtener n\xFAmero de factura:", error);
        return this.getSiguienteNumeroFallback();
      }
      return data;
    }), catchError((error) => {
      console.error("Error en RPC, usando fallback:", error);
      return this.getSiguienteNumeroFallback();
    }));
  }
  /**
   * Método fallback para obtener el siguiente número de factura con retry
   */
  getSiguienteNumeroFallback() {
    const a\u00F1o = (/* @__PURE__ */ new Date()).getFullYear();
    return from(this.supabase.from("facturas").select("numero_factura").like("numero_factura", `FAC-${a\u00F1o}-%`).order("numero_factura", { ascending: false }).limit(1)).pipe(
      map(({ data, error }) => {
        if (error)
          throw error;
        if (!data || data.length === 0) {
          return `FAC-${a\u00F1o}-001`;
        }
        const ultimoNumero = data[0].numero_factura;
        const match = ultimoNumero.match(/FAC-\d{4}-(\d{3})/);
        if (match) {
          const siguiente = parseInt(match[1]) + 1;
          return `FAC-${a\u00F1o}-${siguiente.toString().padStart(3, "0")}`;
        }
        return `FAC-${a\u00F1o}-001`;
      }),
      // Agregar un pequeño delay para evitar conflictos de concurrencia
      tap(() => new Promise((resolve) => setTimeout(resolve, 100)))
    );
  }
  /**
   * Calcula los totales de las líneas de factura
   */
  calcularTotales(lineas) {
    if (!lineas || !Array.isArray(lineas) || lineas.length === 0) {
      console.warn("\u26A0\uFE0F No hay l\xEDneas de factura para calcular totales");
      return { subtotal: 0, iva: 0, total: 0 };
    }
    const subtotal = lineas.reduce((acc, linea) => {
      const cantidad = linea.cantidad || 0;
      const precio = linea.precio_pvp || 0;
      const subtotalLinea = cantidad * precio;
      if (isNaN(subtotalLinea) || !isFinite(subtotalLinea)) {
        console.warn(`\u26A0\uFE0F L\xEDnea con valores inv\xE1lidos:`, linea);
        return acc;
      }
      return acc + subtotalLinea;
    }, 0);
    if (isNaN(subtotal) || !isFinite(subtotal)) {
      console.warn("\u26A0\uFE0F Subtotal calculado es inv\xE1lido, usando 0");
      return { subtotal: 0, iva: 0, total: 0 };
    }
    const iva = +(subtotal * 0.21).toFixed(2);
    const total = +(subtotal + iva).toFixed(2);
    console.log("\u{1F9EE} C\xE1lculo de totales:", {
      lineas: lineas.length,
      subtotal,
      iva,
      total
    });
    return { subtotal, iva, total };
  }
  /**
   * Obtiene el valor actual de facturas
   */
  getFacturasActuales() {
    return this.facturasSubject.value;
  }
  /**
   * Limpia el estado de facturas
   */
  limpiarFacturas() {
    this.facturasSubject.next([]);
  }
  /**
   * Crea una factura automáticamente desde un presupuesto aprobado
   */
  crearFacturaDesdePresupuesto(presupuestoId) {
    return from(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          ),
          materiales_estimados
        `).eq("id", presupuestoId).single()).pipe(switchMap(({ data: presupuesto, error: presupuestoError }) => {
      if (presupuestoError)
        throw presupuestoError;
      const presupuestoData = presupuesto;
      if (presupuestoData.estado !== "Completado") {
        throw new Error("Solo se pueden facturar presupuestos aprobados");
      }
      if (!presupuestoData.aviso) {
        throw new Error("El presupuesto no tiene un aviso asociado");
      }
      return this.getSiguienteNumero().pipe(switchMap((numeroFactura) => {
        const lineasMateriales = [];
        if (presupuestoData.materiales_estimados && Array.isArray(presupuestoData.materiales_estimados)) {
          presupuestoData.materiales_estimados.forEach((material) => {
            lineasMateriales.push({
              tipo: "repuesto",
              nombre: material.nombre || "Material desconocido",
              cantidad: material.cantidad || 0,
              precio_neto: material.precio_neto || 0,
              precio_pvp: material.precio_pvp || 0,
              descripcion: `Material del presupuesto: ${material.descripcion || ""}`
            });
          });
        }
        if (presupuestoData.horas_estimadas && presupuestoData.horas_estimadas > 0) {
          const precioHora = 50;
          lineasMateriales.push({
            tipo: "mano_obra",
            nombre: "Mano de obra",
            cantidad: presupuestoData.horas_estimadas,
            precio_pvp: precioHora,
            descripcion: `${presupuestoData.horas_estimadas} horas de trabajo t\xE9cnico`
          });
        }
        const totales = this.calcularTotales(lineasMateriales);
        const subtotal = totales.subtotal || 0;
        const iva = totales.iva || 0;
        const total = totales.total || 0;
        console.log("\u{1F4CA} Totales calculados:", { subtotal, iva, total });
        const cliente = presupuestoData.aviso.cliente;
        const facturaData = {
          numero_factura: numeroFactura,
          fecha_emision: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          cliente_id: cliente == null ? void 0 : cliente.id,
          nombre_cliente: (cliente == null ? void 0 : cliente.nombre_completo) || presupuestoData.aviso.nombre_cliente_aviso || "Cliente",
          direccion_cliente: (cliente == null ? void 0 : cliente.direccion) || presupuestoData.aviso.direccion_cliente_aviso || "Sin direcci\xF3n",
          cif_cliente: (cliente == null ? void 0 : cliente.cif) || "Sin CIF",
          email_cliente: (cliente == null ? void 0 : cliente.email) || "sin-email@ejemplo.com",
          aviso_id: presupuestoData.aviso_id,
          subtotal,
          // Valor validado
          iva,
          // Valor validado
          total,
          // Valor validado
          estado: "Pendiente",
          notas: `Factura generada desde presupuesto ${presupuestoId}`,
          lineas: lineasMateriales
        };
        console.log("\u{1F4CB} Datos de factura a crear:", facturaData);
        return this.crearFactura(facturaData).pipe(switchMap((facturaCreada) => {
          return from(this.supabase.from("presupuestos").update({
            estado: "Facturado",
            // Nuevo estado
            fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
          }).eq("id", presupuestoId)).pipe(map(() => facturaCreada));
        }));
      }));
    }), catchError((error) => {
      console.error("Error al crear factura desde presupuesto:", error);
      throw error;
    }));
  }
  /**
   * Obtiene presupuestos listos para facturar
   */
  getPresupuestosListosParaFacturar() {
    return from(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("estado", "Completado").order("fecha_creacion", { ascending: false })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data || [];
    }));
  }
};
_FacturasService.\u0275fac = function FacturasService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FacturasService)(\u0275\u0275inject(SupabaseClientService), \u0275\u0275inject(DataUpdateService));
};
_FacturasService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FacturasService, factory: _FacturasService.\u0275fac, providedIn: "root" });
var FacturasService = _FacturasService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FacturasService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SupabaseClientService }, { type: DataUpdateService }], null);
})();

export {
  FacturasService
};
//# sourceMappingURL=chunk-24UOAN2R.js.map
