import {
  CacheService
} from "./chunk-7DTAJMEV.js";
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

// src/app/core/services/avisos.service.ts
var _AvisosService = class _AvisosService {
  constructor(supabaseClientService, cacheService) {
    this.supabaseClientService = supabaseClientService;
    this.cacheService = cacheService;
    this.avisosSubject = new BehaviorSubject([]);
    this.avisos$ = this.avisosSubject.asObservable();
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Método de debug para probar la conexión básica
   */
  debugConnection() {
    console.log("\u{1F50D} AvisosService: Probando conexi\xF3n b\xE1sica...");
    return from(this.supabase.from("avisos").select("id").limit(1)).pipe(map(({ data, error }) => {
      if (error) {
        console.error("\u274C AvisosService: Error en conexi\xF3n:", error);
        throw error;
      }
      console.log("\u2705 AvisosService: Conexi\xF3n exitosa, datos:", data);
      return { success: true, data };
    }), catchError((error) => {
      console.error("\u274C AvisosService: Error cr\xEDtico:", error);
      return from(Promise.resolve({ success: false, error }));
    }));
  }
  /**
   * Obtiene la lista de avisos con paginación y filtros - VERSIÓN OPTIMIZADA
   */
  getAvisos(pagina = 1, porPagina = 15, busqueda, ordenarPor, orden, estado, incluirCompletados = false) {
    let query = this.supabase.from("avisos").select(`
                id,
                cliente_id,
                tecnico_asignado_id,
                fecha_creacion,
                nombre_cliente_aviso,
                direccion_cliente_aviso,
                telefono_cliente_aviso,
                nombre_contacto,
                tipo,
                descripcion_problema,
                estado,
                urgencia,
                es_urgente,
                latitud,
                longitud,
                cliente:clientes!inner(id, nombre_completo, direccion, telefono_contacto),
                tecnico_asignado:usuarios(id, nombre_completo, email)
            `, { count: "exact" });
    if (busqueda) {
      query = query.or(`nombre_cliente_aviso.ilike.%${busqueda}%,descripcion_problema.ilike.%${busqueda}%`);
    }
    if (estado) {
      query = query.eq("estado", estado);
    } else if (!incluirCompletados) {
      query = query.neq("estado", "Completado");
    }
    const desde = (pagina - 1) * porPagina;
    query = query.range(desde, desde + porPagina - 1).order(ordenarPor || "fecha_creacion", { ascending: orden === "asc" });
    return from(query).pipe(map(({ data, error, count }) => {
      if (error)
        throw error;
      const avisos = data;
      this.avisosSubject.next(avisos);
      return {
        avisos,
        total: count || 0,
        pagina,
        por_pagina: porPagina
      };
    }), catchError((error) => {
      console.error("Error al obtener avisos:", error);
      throw error;
    }));
  }
  /**
   * Obtiene un aviso por su ID - VERSIÓN OPTIMIZADA
   */
  getAviso(id) {
    return from(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes!inner(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(id, url, descripcion, fecha_subida)
                `).eq("id", id).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }), catchError((error) => {
      console.error("Error al obtener aviso:", error);
      throw error;
    }));
  }
  /**
   * Crea un nuevo aviso
   */
  crearAviso(aviso) {
    const avisoData = __spreadProps(__spreadValues({}, aviso), {
      urgencia: aviso.es_urgente ? "Alta" : "Normal",
      // Mapear es_urgente a urgencia
      fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
      estado: "No visitado",
      requiere_presupuesto: false,
      requiere_nueva_visita: false
    });
    return from(this.supabase.from("avisos").insert([avisoData]).select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const nuevoAviso = data;
      const avisosActuales = this.avisosSubject.value;
      this.avisosSubject.next([nuevoAviso, ...avisosActuales]);
      this.cacheService.clearCache("avisos");
      return nuevoAviso;
    }));
  }
  /**
   * Actualiza un aviso existente
   */
  actualizarAviso(id, aviso) {
    const datosActualizados = __spreadProps(__spreadValues({}, aviso), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("avisos").update(datosActualizados).eq("id", id).select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const avisoActualizado = data;
      const avisosActuales = this.avisosSubject.value;
      const index = avisosActuales.findIndex((a) => a.id === id);
      if (index !== -1) {
        avisosActuales[index] = avisoActualizado;
        this.avisosSubject.next([...avisosActuales]);
      }
      this.cacheService.clearCache("avisos");
      return avisoActualizado;
    }));
  }
  /**
   * Elimina un aviso
   */
  eliminarAviso(id) {
    return from(this.supabase.from("avisos").delete().eq("id", id)).pipe(map(({ error }) => {
      if (error)
        throw error;
      const avisosActuales = this.avisosSubject.value;
      const avisosFiltrados = avisosActuales.filter((a) => a.id !== id);
      this.avisosSubject.next(avisosFiltrados);
      this.cacheService.clearCache("avisos");
    }), catchError((error) => {
      if (error.code === "23503" && error.message.includes("fotos_aviso")) {
        return this.eliminarFotosAviso(id).pipe(switchMap(() => from(this.supabase.from("avisos").delete().eq("id", id))), map(({ error: deleteError }) => {
          if (deleteError)
            throw deleteError;
          const avisosActuales = this.avisosSubject.value;
          const avisosFiltrados = avisosActuales.filter((a) => a.id !== id);
          this.avisosSubject.next(avisosFiltrados);
          this.cacheService.clearCache("avisos");
        }));
      }
      throw error;
    }));
  }
  /**
   * Elimina todas las fotos asociadas a un aviso (incluyendo archivos del storage)
   */
  eliminarFotosAviso(avisoId) {
    return from(this.supabase.from("fotos_aviso").select("*").eq("aviso_id", avisoId)).pipe(switchMap(({ data: fotos, error: selectError }) => {
      if (selectError)
        throw selectError;
      const fotosData = fotos;
      if (fotosData.length === 0) {
        return from(this.supabase.from("fotos_aviso").delete().eq("aviso_id", avisoId)).pipe(map(({ error }) => {
          if (error)
            throw error;
        }));
      }
      const archivosAEliminar = fotosData.map((foto) => {
        const urlParts = foto.url.split("/");
        const fileName = urlParts[urlParts.length - 1];
        return `${avisoId}/${fileName}`;
      });
      return from(this.supabase.storage.from("fotos-avisos").remove(archivosAEliminar)).pipe(switchMap(({ error: storageError }) => {
        if (storageError) {
          console.warn("Error al eliminar archivos del storage:", storageError);
        }
        return from(this.supabase.from("fotos_aviso").delete().eq("aviso_id", avisoId));
      }), map(({ error: deleteError }) => {
        if (deleteError)
          throw deleteError;
      }));
    }), catchError((error) => {
      console.error("Error al eliminar fotos del aviso:", error);
      throw error;
    }));
  }
  /**
   * Sube una foto para un aviso
   */
  subirFoto(avisoId, file, descripcion) {
    const sanitizedFileName = this.sanitizeFileName(file.name);
    const fileName = `${avisoId}/${Date.now()}_${sanitizedFileName}`;
    return from(this.supabase.storage.from("fotos-avisos").upload(fileName, file)).pipe(map(({ data, error }) => {
      if (error) {
        console.error("Error al subir archivo a storage:", error);
        if (error.message === "Bucket not found") {
          throw new Error("El bucket de storage no est\xE1 configurado. Contacta al administrador.");
        }
        throw error;
      }
      const { data: urlData } = this.supabase.storage.from("fotos-avisos").getPublicUrl(fileName);
      return urlData.publicUrl;
    }), switchMap((publicUrl) => from(this.supabase.from("fotos_aviso").insert([{
      aviso_id: avisoId,
      url: publicUrl,
      descripcion
    }]).select().single())), map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }), catchError((error) => {
      console.error("Error completo al subir foto:", error);
      throw error;
    }));
  }
  /**
   * Elimina una foto de un aviso
   */
  eliminarFoto(fotoId) {
    return from(this.supabase.from("fotos_aviso").select("*").eq("id", fotoId).single()).pipe(switchMap(({ data: foto, error: selectError }) => {
      if (selectError)
        throw selectError;
      const fotoData = foto;
      const urlParts = fotoData.url.split("/");
      const fileName = urlParts[urlParts.length - 1];
      const avisoId = fotoData.aviso_id;
      const fullPath = `${avisoId}/${fileName}`;
      return from(this.supabase.storage.from("fotos-avisos").remove([fullPath])).pipe(switchMap(({ error: storageError }) => {
        if (storageError) {
          console.warn("Error al eliminar archivo del storage:", storageError);
        }
        return from(this.supabase.from("fotos_aviso").delete().eq("id", fotoId));
      }), map(({ error: deleteError }) => {
        if (deleteError)
          throw deleteError;
      }));
    }), catchError((error) => {
      console.error("Error al eliminar foto:", error);
      throw error;
    }));
  }
  /**
   * Busca avisos por término de búsqueda
   */
  buscarAvisos(termino) {
    return from(this.supabase.from("avisos").select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).or(`nombre_cliente_aviso.ilike.%${termino}%,descripcion_problema.ilike.%${termino}%`).neq("estado", "Completado").limit(10)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Obtiene solo avisos activos (no completados)
   */
  getAvisosActivos(pagina = 1, porPagina = 10, busqueda, ordenarPor, orden, estado) {
    return this.getAvisos(pagina, porPagina, busqueda, ordenarPor, orden, estado, false);
  }
  /**
   * Obtiene solo avisos completados
   */
  getAvisosCompletados(pagina = 1, porPagina = 10, busqueda, ordenarPor, orden) {
    return this.getAvisos(pagina, porPagina, busqueda, ordenarPor, orden, "Completado", true);
  }
  /**
   * Obtiene el valor actual de avisos
   */
  getAvisosActuales() {
    return this.avisosSubject.value;
  }
  /**
   * Limpia el estado de avisos
   */
  limpiarAvisos() {
    this.avisosSubject.next([]);
  }
  /**
   * Sanitiza el nombre del archivo para evitar caracteres inválidos en Supabase Storage
   */
  sanitizeFileName(fileName) {
    return fileName.replace(/[^a-zA-Z0-9.-]/g, "_").replace(/_{2,}/g, "_").replace(/^_+|_+$/g, "").toLowerCase();
  }
  /**
   * Crea una factura automáticamente desde los trabajos realizados de un aviso
   * Actualizado para el nuevo flujo de albaranes
   */
  crearFacturaDesdeTrabajos(avisoId) {
    return from(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes(*),
                    trabajos:trabajos_realizados(
                        *,
                        materiales:materiales_trabajo(
                            *,
                            material:inventario(*)
                        ),
                        albaran:albaranes!trabajos_realizados_albaran_id_fkey(*)
                    )
                `).eq("id", avisoId).single()).pipe(map(({ data: aviso, error }) => {
      var _a;
      if (error)
        throw error;
      const avisoData = aviso;
      const trabajosFinalizados = ((_a = avisoData.trabajos) == null ? void 0 : _a.filter((t) => {
        var _a2;
        return t.estado === "Finalizado" || ((_a2 = t.albaran) == null ? void 0 : _a2.estado_cierre) === "Finalizado";
      })) || [];
      if (trabajosFinalizados.length === 0) {
        throw new Error("No hay trabajos finalizados para facturar. Debes crear un albar\xE1n primero.");
      }
      const facturaData = {
        avisoId: avisoData.id,
        cliente: avisoData.cliente || {
          nombre_completo: avisoData.nombre_cliente_aviso,
          direccion: avisoData.direccion_cliente_aviso,
          email: "sin-email@ejemplo.com",
          cif: "Sin CIF"
        },
        trabajos: trabajosFinalizados,
        resumen: this.calcularResumenFacturacion(trabajosFinalizados)
      };
      return facturaData;
    }), catchError((error) => {
      console.error("Error al preparar factura desde trabajos:", error);
      throw error;
    }));
  }
  /**
   * Calcula el resumen de facturación desde trabajos realizados
   */
  calcularResumenFacturacion(trabajos) {
    const materiales = [];
    let horasTotales = 0;
    trabajos.forEach((trabajo) => {
      var _a;
      const inicio = /* @__PURE__ */ new Date(`2000-01-01T${trabajo.hora_inicio}`);
      const fin = /* @__PURE__ */ new Date(`2000-01-01T${trabajo.hora_fin}`);
      const horas = (fin.getTime() - inicio.getTime()) / (1e3 * 60 * 60);
      horasTotales += Math.max(0, horas);
      (_a = trabajo.materiales) == null ? void 0 : _a.forEach((mat) => {
        var _a2, _b;
        const existente = materiales.find((m) => m.material_id === mat.material_id);
        if (existente) {
          existente.cantidad_total += mat.cantidad_utilizada;
        } else {
          materiales.push({
            material_id: mat.material_id,
            nombre: ((_a2 = mat.material) == null ? void 0 : _a2.nombre) || "Material desconocido",
            cantidad_total: mat.cantidad_utilizada,
            precio_unitario: mat.precio_neto_al_momento,
            descripcion: ((_b = mat.material) == null ? void 0 : _b.descripcion) || ""
          });
        }
      });
    });
    return {
      materiales,
      horasTotales,
      numeroTrabajos: trabajos.length
    };
  }
  /**
   * Obtiene un resumen completo del aviso con todos sus elementos
   * Actualizado para el nuevo esquema de base de datos
   */
  getResumenCompletoAviso(avisoId) {
    return from(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(*),
                                           trabajos:trabajos_realizados(
                           *,
                           materiales:materiales_trabajo(
                               *,
                               material:inventario(*)
                           ),
                           albaran:albaranes!trabajos_realizados_albaran_id_fkey(*)
                       ),
                    albaranes:albaranes(*),
                    presupuestos:presupuestos(*),
                    facturas:facturas(*)
                `).eq("id", avisoId).single()).pipe(map(({ data, error }) => {
      var _a, _b, _c, _d, _e, _f;
      if (error)
        throw error;
      const avisoCompleto = data;
      const trabajosFinalizados = ((_a = avisoCompleto.trabajos) == null ? void 0 : _a.filter((t) => {
        var _a2;
        return t.estado === "Finalizado" || ((_a2 = t.albaran) == null ? void 0 : _a2.estado_cierre) === "Finalizado";
      })) || [];
      const trabajosConAlbaran = ((_b = avisoCompleto.trabajos) == null ? void 0 : _b.filter((t) => t.albaran_id !== null)) || [];
      const facturasPendientes = ((_c = avisoCompleto.facturas) == null ? void 0 : _c.filter((f) => f.estado !== "Completado")) || [];
      const presupuestoPendiente = ((_d = avisoCompleto.albaranes) == null ? void 0 : _d.some((a) => a.estado_cierre === "Presupuesto pendiente")) || false;
      return __spreadProps(__spreadValues({}, avisoCompleto), {
        estadisticas: {
          totalTrabajos: ((_e = avisoCompleto.trabajos) == null ? void 0 : _e.length) || 0,
          trabajosConAlbaran: trabajosConAlbaran.length,
          trabajosFinalizados: trabajosFinalizados.length,
          tienePresupuesto: presupuestoPendiente,
          estadoPresupuesto: presupuestoPendiente ? "Pendiente" : null,
          totalFacturas: ((_f = avisoCompleto.facturas) == null ? void 0 : _f.length) || 0,
          facturasPendientes: facturasPendientes.length,
          puedeFacturar: trabajosFinalizados.length > 0 && facturasPendientes.length === 0
        }
      });
    }), catchError((error) => {
      console.error("Error al obtener resumen completo:", error);
      throw error;
    }));
  }
  /**
   * Actualiza el estado del aviso basándose en sus elementos relacionados
   * Actualizado para el nuevo flujo de albaranes
   */
  actualizarEstadoAutomatico(avisoId) {
    return this.getResumenCompletoAviso(avisoId).pipe(switchMap((resumen) => {
      var _a, _b;
      let nuevoEstado = resumen.estado;
      console.log("\u{1F50D} Analizando estado del aviso:", {
        estadoActual: resumen.estado,
        estadisticas: resumen.estadisticas,
        trabajos: ((_a = resumen.trabajos) == null ? void 0 : _a.length) || 0,
        albaranes: ((_b = resumen.albaranes) == null ? void 0 : _b.length) || 0
      });
      if (resumen.estadisticas.trabajosFinalizados > 0 && resumen.estadisticas.totalFacturas > 0) {
        nuevoEstado = "Completado";
      } else if (resumen.estadisticas.trabajosFinalizados > 0 && resumen.estadisticas.facturasPendientes === 0) {
        nuevoEstado = "Listo para facturar";
      } else if (resumen.estadisticas.trabajosConAlbaran > 0 && resumen.estadisticas.tienePresupuesto) {
        nuevoEstado = "Pendiente de presupuesto";
      } else if (resumen.estadisticas.trabajosConAlbaran > 0 || resumen.estadisticas.totalTrabajos > 0) {
        nuevoEstado = "En curso";
      } else if (resumen.estadisticas.totalTrabajos === 0 && resumen.estadisticas.trabajosConAlbaran === 0) {
        if (resumen.estado === "No visitado" || resumen.estado === "Pendiente") {
          nuevoEstado = resumen.estado;
        } else {
          nuevoEstado = "Pendiente";
        }
      }
      console.log("\u{1F50D} Estado calculado:", {
        estadoAnterior: resumen.estado,
        estadoNuevo: nuevoEstado,
        cambio: resumen.estado !== nuevoEstado
      });
      if (nuevoEstado !== resumen.estado) {
        console.log(`\u{1F504} Actualizando estado del aviso ${avisoId} de "${resumen.estado}" a "${nuevoEstado}"`);
        return this.actualizarAviso(avisoId, { estado: nuevoEstado });
      }
      return from([resumen]);
    }));
  }
};
_AvisosService.\u0275fac = function AvisosService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AvisosService)(\u0275\u0275inject(SupabaseClientService), \u0275\u0275inject(CacheService));
};
_AvisosService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AvisosService, factory: _AvisosService.\u0275fac, providedIn: "root" });
var AvisosService = _AvisosService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvisosService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SupabaseClientService }, { type: CacheService }], null);
})();

export {
  AvisosService
};
//# sourceMappingURL=chunk-S2ZT5FDR.js.map
