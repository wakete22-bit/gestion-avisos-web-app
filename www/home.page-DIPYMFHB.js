import {
  FacturasService
} from "./chunk-24UOAN2R.js";
import {
  PresupuestosService
} from "./chunk-SKNF6UHJ.js";
import {
  DataUpdateService
} from "./chunk-VHAQXQOQ.js";
import {
  MatIconModule,
  MatTableModule
} from "./chunk-776UXQBH.js";
import {
  AvisosService
} from "./chunk-S2ZT5FDR.js";
import {
  addIcons,
  alertCircle,
  alertCircleOutline,
  calendarOutline,
  cashOutline,
  close,
  createOutline,
  cubeOutline,
  document,
  documentTextOutline,
  eyeOutline,
  gridOutline,
  hourglassOutline,
  locationOutline,
  notificationsOutline,
  peopleOutline,
  personCircleOutline,
  receipt,
  refreshOutline,
  searchOutline,
  settingsOutline,
  timeOutline,
  warning
} from "./chunk-YLHOXAZF.js";
import "./chunk-7DTAJMEV.js";
import {
  IonContent,
  IonIcon
} from "./chunk-DJA56OJT.js";
import {
  BehaviorSubject,
  CommonModule,
  Component,
  DatePipe,
  Injectable,
  NgClass,
  NgForOf,
  NgIf,
  Router,
  Subject,
  SupabaseClientService,
  catchError,
  forkJoin,
  from,
  map,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction6,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-ANYKLJQR.js";
import "./chunk-C4CKOAYC.js";
import "./chunk-KQEJHESJ.js";
import "./chunk-B4OIJSSK.js";
import "./chunk-WGXJSFTS.js";
import "./chunk-D3CZYT4Y.js";
import "./chunk-YQEIF7Z5.js";
import "./chunk-3JL37TVZ.js";
import "./chunk-RLTQ4XA2.js";
import "./chunk-LHYYZWFK.js";
import "./chunk-2HURGHOF.js";
import "./chunk-WMICZ6Q4.js";
import "./chunk-PWUDMNGE.js";
import "./chunk-EV4ZQC67.js";
import "./chunk-7OBOYUXW.js";
import "./chunk-34HBWEZ3.js";
import "./chunk-KNQSF6OU.js";

// src/app/core/services/dashboard.service.ts
var _DashboardService = class _DashboardService {
  constructor(avisosService, facturasService, presupuestosService, supabaseClientService, dataUpdateService) {
    this.avisosService = avisosService;
    this.facturasService = facturasService;
    this.presupuestosService = presupuestosService;
    this.supabaseClientService = supabaseClientService;
    this.dataUpdateService = dataUpdateService;
    this.dashboardSubject = new BehaviorSubject(null);
    this.dashboard$ = this.dashboardSubject.asObservable();
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Obtiene todas las estadísticas del dashboard
   */
  getDashboardData() {
    return forkJoin({
      stats: this.getDashboardStats(),
      avisosRecientes: this.getAvisosRecientes(),
      facturasPendientes: this.getFacturasPendientes(),
      presupuestosPendientes: this.getPresupuestosPendientes()
    }).pipe(map((data) => {
      const dashboardData = {
        stats: data.stats,
        avisosRecientes: data.avisosRecientes,
        facturasPendientes: data.facturasPendientes,
        presupuestosPendientes: data.presupuestosPendientes
      };
      this.dashboardSubject.next(dashboardData);
      return dashboardData;
    }), catchError((error) => {
      console.error("Error al obtener datos del dashboard:", error);
      throw error;
    }));
  }
  /**
   * Obtiene las estadísticas generales del dashboard
   */
  getDashboardStats() {
    return forkJoin({
      avisosEnCurso: this.getAvisosEnCurso(),
      avisosUrgentes: this.getAvisosUrgentes(),
      facturasPendientes: this.getFacturasPendientesCount(),
      presupuestosPendientes: this.getPresupuestosPendientesCount()
    }).pipe(map((data) => {
      return {
        avisosEnCurso: data.avisosEnCurso,
        avisosUrgentes: data.avisosUrgentes,
        facturasPendientes: data.facturasPendientes,
        presupuestosPendientes: data.presupuestosPendientes,
        totalFacturasPendientes: 0,
        // Se calculará después
        totalPresupuestosPendientes: 0
        // Se calculará después
      };
    }));
  }
  /**
   * Obtiene el número de avisos en curso
   */
  getAvisosEnCurso() {
    return from(this.supabase.from("avisos").select("*", { count: "exact", head: true }).in("estado", ["En curso", "Visitado pendiente", "Pendiente de presupuesto"])).pipe(map(({ count, error }) => {
      if (error)
        throw error;
      return count || 0;
    }));
  }
  /**
   * Obtiene el número de avisos urgentes
   */
  getAvisosUrgentes() {
    return from(this.supabase.from("avisos").select("*", { count: "exact", head: true }).eq("es_urgente", true).neq("estado", "Completado")).pipe(map(({ count, error }) => {
      if (error)
        throw error;
      return count || 0;
    }));
  }
  /**
   * Obtiene el número de facturas pendientes
   */
  getFacturasPendientesCount() {
    return from(this.supabase.from("facturas").select("*", { count: "exact", head: true }).eq("estado", "Pendiente")).pipe(map(({ count, error }) => {
      if (error)
        throw error;
      return count || 0;
    }));
  }
  /**
   * Obtiene el número de presupuestos pendientes
   */
  getPresupuestosPendientesCount() {
    return from(this.supabase.from("presupuestos").select("*", { count: "exact", head: true }).eq("estado", "Pendiente")).pipe(map(({ count, error }) => {
      if (error)
        throw error;
      return count || 0;
    }));
  }
  /**
   * Obtiene los avisos más recientes
   */
  getAvisosRecientes() {
    return from(this.supabase.from("avisos").select(`
          *,
          cliente:clientes(*)
        `).order("fecha_creacion", { ascending: false }).limit(10)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data || [];
    }));
  }
  /**
   * Obtiene las facturas pendientes con detalles
   */
  getFacturasPendientes() {
    return from(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("estado", "Pendiente").order("fecha_creacion", { ascending: false }).limit(5)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data || [];
    }));
  }
  /**
   * Obtiene los presupuestos pendientes con detalles
   */
  getPresupuestosPendientes() {
    return from(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("estado", "Pendiente").order("fecha_creacion", { ascending: false }).limit(5)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data || [];
    }));
  }
  /**
   * Calcula el total de facturas pendientes
   */
  calcularTotalFacturasPendientes(facturas) {
    return facturas.reduce((total, factura) => total + (factura.total || 0), 0);
  }
  /**
   * Calcula el total de presupuestos pendientes
   */
  calcularTotalPresupuestosPendientes(presupuestos) {
    return presupuestos.reduce((total, presupuesto) => total + (presupuesto.total_estimado || 0), 0);
  }
  /**
   * Refresca los datos del dashboard
   */
  refreshDashboard() {
    return this.getDashboardData();
  }
  /**
   * Limpia el cache del dashboard cuando se actualizan datos
   */
  clearDashboardCache() {
    console.log("\u{1F9F9} Clearing dashboard cache");
    this.dashboardSubject.next(null);
  }
  /**
   * Suscribe a las actualizaciones de datos para refrescar el dashboard
   */
  subscribeToDataUpdates() {
  }
  /**
   * Obtiene el valor actual del dashboard
   */
  getDashboardActual() {
    return this.dashboardSubject.value;
  }
};
_DashboardService.\u0275fac = function DashboardService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardService)(\u0275\u0275inject(AvisosService), \u0275\u0275inject(FacturasService), \u0275\u0275inject(PresupuestosService), \u0275\u0275inject(SupabaseClientService), \u0275\u0275inject(DataUpdateService));
};
_DashboardService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" });
var DashboardService = _DashboardService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: AvisosService }, { type: FacturasService }, { type: PresupuestosService }, { type: SupabaseClientService }, { type: DataUpdateService }], null);
})();

// src/app/home/home.page.ts
var _c0 = (a0, a1, a2, a3, a4, a5) => ({ "no-visitado": a0, "visitado-pendiente": a1, "pendiente-presupuesto": a2, "en-curso": a3, "pendiente": a4, "completado": a5 });
var _c1 = (a0, a1, a2, a3, a4, a5) => ({ "yellow": a0, "red": a1, "green": a2, "no-visitado": a3, "visitado-pendiente": a4, "pendiente-presupuesto": a5 });
function HomePage_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5);
    \u0275\u0275element(2, "ion-icon", 6);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando dashboard...");
    \u0275\u0275elementEnd()()();
  }
}
function HomePage_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8);
    \u0275\u0275element(2, "ion-icon", 9);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Error al cargar datos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "No se pudieron cargar los datos del dashboard. Int\xE9ntalo de nuevo.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 10);
    \u0275\u0275listener("click", function HomePage_div_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refreshDashboard());
    });
    \u0275\u0275element(8, "ion-icon", 11);
    \u0275\u0275text(9, " Reintentar ");
    \u0275\u0275elementEnd()()();
  }
}
function HomePage_main_3_table_99_tr_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const presupuesto_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((presupuesto_r4.aviso == null ? null : presupuesto_r4.aviso.nombre_cliente_aviso) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 3, presupuesto_r4.fecha_creacion, "shortDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda(presupuesto_r4.total_estimado || 0));
  }
}
function HomePage_main_3_table_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 80)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Fecha emisi\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Importe");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275template(10, HomePage_main_3_table_99_tr_10_Template, 8, 6, "tr", 81);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r1.presupuestosPendientes.slice(0, 3));
  }
}
function HomePage_main_3_div_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "p");
    \u0275\u0275text(2, "No hay presupuestos pendientes");
    \u0275\u0275elementEnd()();
  }
}
function HomePage_main_3_table_113_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const factura_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(factura_r5.numero_factura);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((factura_r5.aviso == null ? null : factura_r5.aviso.id == null ? null : (tmp_5_0 = factura_r5.aviso.id.substring(0, 8)) == null ? null : tmp_5_0.toUpperCase()) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 4, factura_r5.fecha_emision, "shortDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda(factura_r5.total || 0));
  }
}
function HomePage_main_3_table_113_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 80)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "N\xBA Factura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "N\xBA Aviso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Fecha emisi\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Importe total");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275template(12, HomePage_main_3_table_113_tr_12_Template, 10, 7, "tr", 81);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r1.facturasPendientes.slice(0, 3));
  }
}
function HomePage_main_3_div_114_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "p");
    \u0275\u0275text(2, "No hay facturas pendientes");
    \u0275\u0275elementEnd()();
  }
}
function HomePage_main_3_div_128_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83)(1, "div", 84);
    \u0275\u0275text(2, "Cliente:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 85);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((ctx_r1.presupuestosPendientes[0] == null ? null : ctx_r1.presupuestosPendientes[0].aviso == null ? null : ctx_r1.presupuestosPendientes[0].aviso.nombre_cliente_aviso) || "N/A");
  }
}
function HomePage_main_3_div_129_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83)(1, "div", 84);
    \u0275\u0275text(2, "Fecha:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 85);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r1.presupuestosPendientes[0] == null ? null : ctx_r1.presupuestosPendientes[0].fecha_creacion, "shortDate"));
  }
}
function HomePage_main_3_div_130_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83)(1, "div", 84);
    \u0275\u0275text(2, "Importe:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 85);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda((ctx_r1.presupuestosPendientes[0] == null ? null : ctx_r1.presupuestosPendientes[0].total_estimado) || 0));
  }
}
function HomePage_main_3_div_131_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86)(1, "p");
    \u0275\u0275text(2, "No hay presupuestos pendientes");
    \u0275\u0275elementEnd()();
  }
}
function HomePage_main_3_div_146_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83)(1, "div", 84);
    \u0275\u0275text(2, "N\xBA Factura:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 85);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.facturasPendientes[0] == null ? null : ctx_r1.facturasPendientes[0].numero_factura);
  }
}
function HomePage_main_3_div_147_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83)(1, "div", 84);
    \u0275\u0275text(2, "Fecha:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 85);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r1.facturasPendientes[0] == null ? null : ctx_r1.facturasPendientes[0].fecha_emision, "shortDate"));
  }
}
function HomePage_main_3_div_148_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83)(1, "div", 84);
    \u0275\u0275text(2, "Importe:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 85);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda((ctx_r1.facturasPendientes[0] == null ? null : ctx_r1.facturasPendientes[0].total) || 0));
  }
}
function HomePage_main_3_div_149_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86)(1, "p");
    \u0275\u0275text(2, "No hay facturas pendientes");
    \u0275\u0275elementEnd()();
  }
}
function HomePage_main_3_div_192_ion_icon_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 103);
  }
}
function HomePage_main_3_div_192_ion_icon_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 104);
  }
}
function HomePage_main_3_div_192_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 87)(1, "div", 88);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 89)(4, "span", 90);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 91);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 92)(9, "div", 93);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 94);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 95);
    \u0275\u0275template(14, HomePage_main_3_div_192_ion_icon_14_Template, 1, 0, "ion-icon", 96)(15, HomePage_main_3_div_192_ion_icon_15_Template, 1, 0, "ion-icon", 97);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 98)(17, "button", 99);
    \u0275\u0275listener("click", function HomePage_main_3_div_192_Template_button_click_17_listener() {
      const aviso_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.verAviso(aviso_r7));
    });
    \u0275\u0275element(18, "ion-icon", 100);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 101);
    \u0275\u0275listener("click", function HomePage_main_3_div_192_Template_button_click_19_listener() {
      const aviso_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editarAviso(aviso_r7));
    });
    \u0275\u0275element(20, "ion-icon", 102);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const aviso_r7 = ctx.$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction6(10, _c0, aviso_r7.estado === "No visitado", aviso_r7.estado === "Visitado pendiente", aviso_r7.estado === "Pendiente de presupuesto", aviso_r7.estado === "En curso", aviso_r7.estado === "Pendiente", aviso_r7.estado === "Completado"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", aviso_r7.numero, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction6(17, _c1, aviso_r7.estado === "En curso", aviso_r7.estado === "Pendiente", aviso_r7.estado === "Completado", aviso_r7.estado === "No visitado", aviso_r7.estado === "Visitado pendiente", aviso_r7.estado === "Pendiente de presupuesto"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", aviso_r7.estado, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(aviso_r7.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", aviso_r7.detalle);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", aviso_r7.detalle, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(aviso_r7.fecha);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", aviso_r7.urgente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !aviso_r7.urgente);
  }
}
function HomePage_main_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 12)(1, "section", 13)(2, "div", 14)(3, "div", 15)(4, "div", 16);
    \u0275\u0275element(5, "ion-icon", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "div", 18);
    \u0275\u0275text(8, "Avisos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 19);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 20);
    \u0275\u0275text(12, "En curso");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 15)(14, "div", 21);
    \u0275\u0275element(15, "ion-icon", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div")(17, "div", 18);
    \u0275\u0275text(18, "Avisos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 19);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 20);
    \u0275\u0275text(22, "Urgentes");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 15)(24, "div", 23);
    \u0275\u0275element(25, "ion-icon", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div")(27, "div", 18);
    \u0275\u0275text(28, "Facturas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 19);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 20);
    \u0275\u0275text(32, "Pendientes");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 15)(34, "div", 25);
    \u0275\u0275element(35, "ion-icon", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div")(37, "div", 18);
    \u0275\u0275text(38, "Presupuestos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 19);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 20);
    \u0275\u0275text(42, "Pendientes");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(43, "div", 27)(44, "div", 28)(45, "div", 29)(46, "div", 16);
    \u0275\u0275element(47, "ion-icon", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 31)(49, "div", 18);
    \u0275\u0275text(50, "Avisos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 19);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 20);
    \u0275\u0275text(54, "En curso");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "div", 29)(56, "div", 21);
    \u0275\u0275element(57, "ion-icon", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 31)(59, "div", 18);
    \u0275\u0275text(60, "Avisos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "div", 19);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 20);
    \u0275\u0275text(64, "Urgentes");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "div", 29)(66, "div", 23);
    \u0275\u0275element(67, "ion-icon", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 31)(69, "div", 18);
    \u0275\u0275text(70, "Facturas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "div", 19);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 20);
    \u0275\u0275text(74, "Pendientes");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(75, "div", 29)(76, "div", 25);
    \u0275\u0275element(77, "ion-icon", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "div", 31)(79, "div", 18);
    \u0275\u0275text(80, "Presupuestos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "div", 19);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "div", 20);
    \u0275\u0275text(84, "Pendientes");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(85, "section", 34)(86, "div", 35)(87, "div", 36)(88, "div", 37)(89, "div", 38);
    \u0275\u0275text(90, "Presupuestos Pendientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "a", 39);
    \u0275\u0275listener("click", function HomePage_main_3_Template_a_click_91_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.irAPresupuestos());
    });
    \u0275\u0275text(92, "Mostrar m\xE1s >");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(93, "div", 40)(94, "div", 41)(95, "div", 42);
    \u0275\u0275text(96);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "span", 43);
    \u0275\u0275text(98);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(99, HomePage_main_3_table_99_Template, 11, 1, "table", 44)(100, HomePage_main_3_div_100_Template, 3, 0, "div", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(101, "div", 36)(102, "div", 37)(103, "div", 38);
    \u0275\u0275text(104, "Facturas Pendientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "a", 39);
    \u0275\u0275listener("click", function HomePage_main_3_Template_a_click_105_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.irAFacturas());
    });
    \u0275\u0275text(106, "Mostrar m\xE1s >");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(107, "div", 40)(108, "div", 41)(109, "div", 42);
    \u0275\u0275text(110);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(111, "span", 43);
    \u0275\u0275text(112);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(113, HomePage_main_3_table_113_Template, 13, 1, "table", 44)(114, HomePage_main_3_div_114_Template, 3, 0, "div", 45);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(115, "div", 46)(116, "div", 47)(117, "div", 48)(118, "div", 38);
    \u0275\u0275text(119, "Presupuestos Pendientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(120, "div", 49);
    \u0275\u0275element(121, "ion-icon", 50);
    \u0275\u0275text(122, " Pendientes ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(123, "div", 51)(124, "div", 52);
    \u0275\u0275text(125);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(126, "div", 53);
    \u0275\u0275text(127);
    \u0275\u0275elementEnd();
    \u0275\u0275template(128, HomePage_main_3_div_128_Template, 5, 1, "div", 54)(129, HomePage_main_3_div_129_Template, 6, 4, "div", 54)(130, HomePage_main_3_div_130_Template, 5, 1, "div", 54)(131, HomePage_main_3_div_131_Template, 3, 0, "div", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(132, "a", 39);
    \u0275\u0275listener("click", function HomePage_main_3_Template_a_click_132_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.irAPresupuestos());
    });
    \u0275\u0275text(133, "Mostrar m\xE1s >");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(134, "div", 47)(135, "div", 48)(136, "div", 38);
    \u0275\u0275text(137, "Facturas Pendientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(138, "div", 49);
    \u0275\u0275element(139, "ion-icon", 50);
    \u0275\u0275text(140, " Pendientes ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(141, "div", 51)(142, "div", 52);
    \u0275\u0275text(143);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(144, "div", 53);
    \u0275\u0275text(145);
    \u0275\u0275elementEnd();
    \u0275\u0275template(146, HomePage_main_3_div_146_Template, 5, 1, "div", 54)(147, HomePage_main_3_div_147_Template, 6, 4, "div", 54)(148, HomePage_main_3_div_148_Template, 5, 1, "div", 54)(149, HomePage_main_3_div_149_Template, 3, 0, "div", 55);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(150, "section", 56)(151, "div", 57)(152, "div", 58)(153, "div", 59);
    \u0275\u0275text(154, "Avisos recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(155, "div", 60);
    \u0275\u0275text(156);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(157, "div", 61);
    \u0275\u0275element(158, "input", 62)(159, "ion-icon", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(160, "div", 64);
    \u0275\u0275element(161, "input", 65);
    \u0275\u0275elementStart(162, "select")(163, "option");
    \u0275\u0275text(164, "Ordenar por: Recientes");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(165, "div", 66)(166, "select", 67)(167, "option");
    \u0275\u0275text(168, "Ordenar: Recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(169, "option");
    \u0275\u0275text(170, "Ordenar: Antiguos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(171, "option");
    \u0275\u0275text(172, "Ordenar: Urgentes");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(173, "div", 68)(174, "div", 69)(175, "div", 57)(176, "div", 70)(177, "div", 71);
    \u0275\u0275text(178, "N\xFAmero");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(179, "div", 72);
    \u0275\u0275text(180, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(181, "div", 71);
    \u0275\u0275text(182, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(183, "div", 71);
    \u0275\u0275text(184, "Detalle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(185, "div", 72);
    \u0275\u0275text(186, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(187, "div", 72);
    \u0275\u0275text(188, "Urgente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(189, "div", 71);
    \u0275\u0275text(190, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(191, "div", 73);
    \u0275\u0275template(192, HomePage_main_3_div_192_Template, 21, 24, "div", 74);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(193, "div", 75)(194, "span", 76);
    \u0275\u0275text(195);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(196, "div", 77)(197, "button", 78);
    \u0275\u0275text(198, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(199, "button");
    \u0275\u0275text(200, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(201, "button");
    \u0275\u0275text(202, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(203, "button", 79);
    \u0275\u0275text(204, "4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(205, "span", 79);
    \u0275\u0275text(206, "...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(207, "button", 79);
    \u0275\u0275text(208, "40");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate((ctx_r1.stats == null ? null : ctx_r1.stats.avisosEnCurso) || 0);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate((ctx_r1.stats == null ? null : ctx_r1.stats.avisosUrgentes) || 0);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate((ctx_r1.stats == null ? null : ctx_r1.stats.facturasPendientes) || 0);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate((ctx_r1.stats == null ? null : ctx_r1.stats.presupuestosPendientes) || 0);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate((ctx_r1.stats == null ? null : ctx_r1.stats.avisosEnCurso) || 0);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate((ctx_r1.stats == null ? null : ctx_r1.stats.avisosUrgentes) || 0);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate((ctx_r1.stats == null ? null : ctx_r1.stats.facturasPendientes) || 0);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate((ctx_r1.stats == null ? null : ctx_r1.stats.presupuestosPendientes) || 0);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda(ctx_r1.totalPresupuestosPendientes));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Presupuestos: ", ctx_r1.presupuestosPendientes.length, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuestosPendientes.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuestosPendientes.length === 0);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda(ctx_r1.totalFacturasPendientes));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Facturas: ", ctx_r1.facturasPendientes.length, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.facturasPendientes.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.facturasPendientes.length === 0);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda(ctx_r1.totalPresupuestosPendientes));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Presupuestos: ", ctx_r1.presupuestosPendientes.length, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuestosPendientes.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuestosPendientes.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuestosPendientes.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuestosPendientes.length === 0);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda(ctx_r1.totalFacturasPendientes));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Facturas: ", ctx_r1.facturasPendientes.length, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.facturasPendientes.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.facturasPendientes.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.facturasPendientes.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.facturasPendientes.length === 0);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("Avisos: ", ctx_r1.avisos.length, "");
    \u0275\u0275advance(36);
    \u0275\u0275property("ngForOf", ctx_r1.avisos);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Mostrando datos 1 a ", ctx_r1.avisos.length, " de ", ctx_r1.avisos.length, " aviso");
  }
}
addIcons({
  "grid-outline": gridOutline,
  "notifications-outline": notificationsOutline,
  "time-outline": timeOutline,
  "cube-outline": cubeOutline,
  "document-text-outline": documentTextOutline,
  "cash-outline": cashOutline,
  "people-outline": peopleOutline,
  "settings-outline": settingsOutline,
  "person-circle-outline": personCircleOutline,
  "receipt": receipt,
  "hourglass-outline": hourglassOutline,
  "alert-circle-outline": alertCircleOutline,
  "warning": warning,
  "document": document,
  "alert-circle": alertCircle,
  "search-outline": searchOutline,
  "location-outline": locationOutline,
  "calendar-outline": calendarOutline,
  "create-outline": createOutline
});
var _HomePage = class _HomePage {
  constructor(router, dashboardService, avisosService, facturasService, presupuestosService) {
    this.router = router;
    this.dashboardService = dashboardService;
    this.avisosService = avisosService;
    this.facturasService = facturasService;
    this.presupuestosService = presupuestosService;
    this.displayedColumns = ["numero", "estado", "nombre", "detalle", "fecha", "urgente", "direccion", "acciones"];
    this.dashboardData = null;
    this.loading = true;
    this.error = false;
    this.avisos = [];
    this.totalFacturasPendientes = 0;
    this.totalPresupuestosPendientes = 0;
    this.destroy$ = new Subject();
    addIcons({ hourglassOutline, alertCircleOutline, refreshOutline, warning, receipt, document, alertCircle, searchOutline, close, eyeOutline, createOutline, locationOutline, calendarOutline });
  }
  ngOnInit() {
    this.cargarDashboard();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Carga los datos del dashboard
   */
  cargarDashboard() {
    this.loading = true;
    this.error = false;
    this.dashboardService.getDashboardData().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.procesarDatosDashboard(data);
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar dashboard:", error);
        this.error = true;
        this.loading = false;
      }
    });
  }
  /**
   * Procesa los datos del dashboard para mostrarlos en la vista
   */
  procesarDatosDashboard(data) {
    this.avisos = data.avisosRecientes.map((aviso) => ({
      id: aviso.id,
      numero: aviso.id.substring(0, 8).toUpperCase(),
      estado: aviso.estado,
      nombre: aviso.nombre_cliente_aviso,
      detalle: aviso.descripcion_problema,
      fecha: new Date(aviso.fecha_creacion).toLocaleDateString("es-ES"),
      urgente: aviso.es_urgente || false,
      direccion: aviso.direccion_cliente_aviso
    }));
    this.totalFacturasPendientes = this.dashboardService.calcularTotalFacturasPendientes(data.facturasPendientes);
    this.totalPresupuestosPendientes = this.dashboardService.calcularTotalPresupuestosPendientes(data.presupuestosPendientes);
  }
  /**
   * Refresca los datos del dashboard
   */
  refreshDashboard() {
    this.cargarDashboard();
  }
  /**
   * Navega a la página de avisos
   */
  irAAvisos() {
    this.router.navigate(["/avisos"]);
  }
  /**
   * Navega a la página de facturas
   */
  irAFacturas() {
    this.router.navigate(["/facturas"]);
  }
  /**
   * Navega a la página de presupuestos
   */
  irAPresupuestos() {
    this.router.navigate(["/presupuestos"]);
  }
  /**
   * Ver detalles de un aviso
   */
  verAviso(aviso) {
    this.router.navigate(["/avisos"], { queryParams: { id: aviso.id } });
  }
  /**
   * Editar un aviso
   */
  editarAviso(aviso) {
    this.router.navigate(["/avisos"], { queryParams: { id: aviso.id, edit: "true" } });
  }
  /**
   * Formatea un número como moneda
   */
  formatearMoneda(valor) {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR"
    }).format(valor);
  }
  /**
   * Obtiene el estado de carga
   */
  get isLoading() {
    return this.loading;
  }
  /**
   * Obtiene si hay error
   */
  get hasError() {
    return this.error;
  }
  /**
   * Obtiene las estadísticas del dashboard
   */
  get stats() {
    var _a;
    return (_a = this.dashboardData) == null ? void 0 : _a.stats;
  }
  /**
   * Obtiene las facturas pendientes
   */
  get facturasPendientes() {
    var _a;
    return ((_a = this.dashboardData) == null ? void 0 : _a.facturasPendientes) || [];
  }
  /**
   * Obtiene los presupuestos pendientes
   */
  get presupuestosPendientes() {
    var _a;
    return ((_a = this.dashboardData) == null ? void 0 : _a.presupuestosPendientes) || [];
  }
};
_HomePage.\u0275fac = function HomePage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HomePage)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(DashboardService), \u0275\u0275directiveInject(AvisosService), \u0275\u0275directiveInject(FacturasService), \u0275\u0275directiveInject(PresupuestosService));
};
_HomePage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomePage, selectors: [["app-home"]], decls: 4, vars: 4, consts: [[3, "fullscreen"], ["class", "loading-container", 4, "ngIf"], ["class", "error-container", 4, "ngIf"], ["class", "dashboard-main", 4, "ngIf"], [1, "loading-container"], [1, "loading-spinner"], ["name", "hourglass-outline", 1, "spinning"], [1, "error-container"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "dashboard-main"], [1, "dashboard-summary"], [1, "summary-cards-desktop"], [1, "summary-card"], [1, "icon", "yellow-bg"], ["name", "hourglass-outline", 2, "font-size", "42px"], [1, "summary-title"], [1, "summary-value"], [1, "summary-subtitle"], [1, "icon", "red-bg"], ["name", "warning", 2, "font-size", "42px"], [1, "icon", "purple-bg"], ["name", "receipt"], [1, "icon", "blue-bg"], ["name", "document", 2, "font-size", "40px"], [1, "summary-cards-mobile"], [1, "summary-grid"], [1, "summary-card-mobile"], ["name", "hourglass-outline"], [1, "mobile-card-content"], ["name", "warning"], ["name", "document"], [1, "dashboard-cards"], [1, "pending-cards-desktop"], [1, "pending-card"], [2, "display", "flex", "justify-content", "space-between", "align-items", "center"], [1, "pending-title"], [1, "pending-more", 3, "click"], [1, "pending-details-container"], [1, "pending-details-title"], [1, "pending-amount"], [1, "pending-details-subtitle"], ["class", "pending-details-table", 4, "ngIf"], ["class", "no-data", 4, "ngIf"], [1, "pending-cards-mobile"], [1, "pending-card-mobile"], [1, "mobile-card-header"], [1, "pending-status", "orange"], ["name", "alert-circle"], [1, "mobile-card-body"], [1, "mobile-amount"], [1, "mobile-subtitle"], ["class", "mobile-item", 4, "ngIf"], ["class", "no-data-mobile", 4, "ngIf"], [1, "dashboard-table"], [1, "table-header"], [1, "table-header-left"], [1, "table-title"], [1, "table-meta"], [1, "mobile-search"], ["type", "text", "placeholder", "Buscar aviso..."], ["name", "search-outline"], [1, "table-search", "desktop-only"], ["type", "text", "placeholder", "Buscar..."], [1, "mobile-actions"], [1, "mobile-filter"], [1, "compact-avisos-table"], [1, "avisos-table"], [1, "header-row"], [1, "header-cell"], [1, "header-cell", "desktop-only"], [1, "table-body"], ["class", "aviso-row", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "table-pagination"], [1, "pagination-info"], [1, "pagination"], [1, "active"], [1, "desktop-only"], [1, "pending-details-table"], [4, "ngFor", "ngForOf"], [1, "no-data"], [1, "mobile-item"], [1, "item-label"], [1, "item-value"], [1, "no-data-mobile"], [1, "aviso-row", 3, "ngClass"], [1, "aviso-cell", "numero-aviso"], [1, "aviso-cell", "estado-aviso", "desktop-only"], [1, "badge", 3, "ngClass"], [1, "aviso-cell", "nombre-cliente"], [1, "aviso-cell", "detalle-servicio"], [1, "detalle-texto", 3, "title"], [1, "aviso-cell", "fecha-aviso", "desktop-only"], [1, "aviso-cell", "urgente-aviso", "desktop-only"], ["name", "alert-circle", "class", "urgente-icon", "title", "Aviso urgente", 4, "ngIf"], ["name", "close", "class", "no-urgente-icon", "title", "No urgente", 4, "ngIf"], [1, "aviso-cell", "acciones"], ["title", "Ver detalles", 1, "btn-ver", 3, "click"], ["name", "eye-outline"], ["title", "Editar aviso", 1, "btn-editar", 3, "click"], ["name", "create-outline"], ["name", "alert-circle", "title", "Aviso urgente", 1, "urgente-icon"], ["name", "close", "title", "No urgente", 1, "no-urgente-icon"]], template: function HomePage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0);
    \u0275\u0275template(1, HomePage_div_1_Template, 5, 0, "div", 1)(2, HomePage_div_2_Template, 10, 0, "div", 2)(3, HomePage_main_3_Template, 209, 32, "main", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.hasError);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.isLoading && !ctx.hasError);
  }
}, dependencies: [
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  DatePipe,
  IonContent,
  IonIcon,
  MatTableModule,
  MatIconModule
], styles: [`

.loading-container[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #FAFBFF;
}
.loading-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  border: 1px solid #E2E8F0;
}
.loading-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #4F46E5;
  margin-bottom: 16px;
}
.loading-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 16px;
  margin: 0;
}
.loading-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   .spinning[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
}
@keyframes _ngcontent-%COMP%_spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.error-container[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #FAFBFF;
}
.error-container[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  border: 1px solid #E2E8F0;
  max-width: 400px;
}
.error-container[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #D92D20;
  margin-bottom: 16px;
}
.error-container[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  color: #26262A;
  font-size: 20px;
  margin: 0 0 8px 0;
}
.error-container[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 14px;
  margin: 0 0 24px 0;
  line-height: 1.5;
}
.error-container[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.error-container[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: white;
  margin: 0;
}
.error-container[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.error-container[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]:active {
  transform: translateY(0);
}
.no-data[_ngcontent-%COMP%] {
  width: 100%;
  text-align: center;
  padding: 24px;
  color: #64748b;
  font-size: 14px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px dashed #E2E8F0;
}
.no-data[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
}
.no-data-mobile[_ngcontent-%COMP%] {
  text-align: center;
  padding: 16px;
  color: #64748b;
  font-size: 12px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px dashed #E2E8F0;
  margin-top: 8px;
}
.no-data-mobile[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
}
.home-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
}
.home-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: 2.2rem;
  color: #4F46E5;
  margin-bottom: 12px;
}
.home-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 1.1rem;
  color: #64748b;
}
ion-content[_ngcontent-%COMP%] {
  --background: $bg-light;
}
#container[_ngcontent-%COMP%] {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-size: 20px;
  line-height: 26px;
}
#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}
#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  text-decoration: none;
}
.dashboard-main[_ngcontent-%COMP%] {
  background: white;
  min-height: 100vh;
  padding: 10px 0px;
}
.dashboard-summary[_ngcontent-%COMP%] {
  width: fit-content;
  max-width: 100%;
  background: #fff;
  padding: 30px;
  margin-right: auto;
}
.summary-cards-desktop[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}
.summary-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 220px;
  flex-shrink: 0;
}
.summary-card[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {
  width: 74px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 36px;
}
.summary-cards-mobile[_ngcontent-%COMP%] {
  display: none;
}
.summary-grid[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  width: fit-content;
  max-width: 100%;
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.summary-grid[_ngcontent-%COMP%]::-webkit-scrollbar {
  display: none;
}
.summary-card-mobile[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  min-width: 200px;
  flex-shrink: 0;
}
.summary-card-mobile[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 24px;
  flex-shrink: 0;
}
.summary-card-mobile[_ngcontent-%COMP%]   .mobile-card-content[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.purple-bg[_ngcontent-%COMP%] {
  background: rgba(78, 70, 229, 0.13);
  color: #605BFF;
}
.yellow-bg[_ngcontent-%COMP%] {
  background: #FEF0C7;
  color: #DC6803;
}
.red-bg[_ngcontent-%COMP%] {
  background: #FEE4E2;
  color: #D92D20;
}
.blue-bg[_ngcontent-%COMP%] {
  background: #EEF2FF;
  color: #0F5FC2;
}
.summary-title[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #ACACAC;
  margin-bottom: 2px;
}
.summary-value[_ngcontent-%COMP%] {
  font-size: 31px;
  color: #333333;
  font-weight: 600;
  line-height: 30px;
}
.summary-value[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 400;
  margin-left: 4px;
}
.summary-subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #26262A;
  font-weight: 500;
}
.dashboard-cards[_ngcontent-%COMP%] {
  margin-bottom: 0px;
}
.pending-cards-desktop[_ngcontent-%COMP%] {
  display: flex;
}
.pending-card[_ngcontent-%COMP%] {
  background: #fff;
  padding: 15px 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pending-cards-mobile[_ngcontent-%COMP%] {
  display: none;
  flex-direction: row;
  gap: 16px;
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.pending-cards-mobile[_ngcontent-%COMP%]::-webkit-scrollbar {
  display: none;
}
.pending-card-mobile[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  padding: 20px;
  border: 1px solid #E2E8F0;
  min-width: 280px;
  height: min-content;
  flex-shrink: 0;
}
.pending-card-mobile[_ngcontent-%COMP%]   .mobile-card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #F1F5F9;
}
.pending-card-mobile[_ngcontent-%COMP%]   .pending-title[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #26262A;
  font-weight: 500;
  margin-right: 20px;
}
.pending-card-mobile[_ngcontent-%COMP%]   .pending-status[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
  font-weight: 400;
}
.pending-card-mobile[_ngcontent-%COMP%]   .pending-status[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  display: none;
}
.pending-card-mobile[_ngcontent-%COMP%]   .pending-status.red[_ngcontent-%COMP%] {
  color: #D92D20;
}
.pending-card-mobile[_ngcontent-%COMP%]   .mobile-card-body[_ngcontent-%COMP%] {
  margin-bottom: 16px;
}
.pending-card-mobile[_ngcontent-%COMP%]   .mobile-amount[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #4F46E5;
  font-weight: 600;
  margin-bottom: 4px;
}
.pending-card-mobile[_ngcontent-%COMP%]   .mobile-subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
}
.pending-card-mobile[_ngcontent-%COMP%]   .mobile-item[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F1F5F9;
}
.pending-card-mobile[_ngcontent-%COMP%]   .mobile-item[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.pending-card-mobile[_ngcontent-%COMP%]   .mobile-item[_ngcontent-%COMP%]   .item-label[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}
.pending-card-mobile[_ngcontent-%COMP%]   .mobile-item[_ngcontent-%COMP%]   .item-value[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #26262A;
  font-weight: 500;
}
.pending-title[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #26262A;
  font-weight: 500;
}
.pending-details-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  gap: 25px;
}
.pending-details-container[_ngcontent-%COMP%]   .pending-details-subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
  font-weight: 400;
  text-wrap: nowrap;
}
.pending-details-title[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}
.pending-amount[_ngcontent-%COMP%] {
  font-size: 22px;
  color: #4F46E5;
  font-weight: 500;
}
.pending-details[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: #64748b;
  font-size: 0.98rem;
}
.pending-status.orange[_ngcontent-%COMP%] {
  color: #DC6803;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.pending-more[_ngcontent-%COMP%] {
  color: #4F46E5;
  font-size: 0.98rem;
  text-decoration: none;
  margin-top: 8px;
  align-self: flex-end;
  cursor: pointer;
  transition: color 0.2s ease;
}
.pending-more[_ngcontent-%COMP%]:hover {
  color: #4338CA;
  text-decoration: underline;
}
.pending-details-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0px;
  font-size: 14px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.pending-details-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  text-align: left;
  padding: 12px 16px;
  background: transparent;
  color: #64748b;
  font-weight: 500;
  border-bottom: 1px solid #E2E8F0;
  white-space: nowrap;
}
.pending-details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 12px 16px;
  border-bottom: 1px solid #F1F5F9;
  color: #26262A;
  vertical-align: top;
}
.pending-details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {
  border-bottom: none;
}
.pending-details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  background: #F8FAFC;
}
.dashboard-table[_ngcontent-%COMP%] {
  background: #fff;
  padding: 25px;
}
.table-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 16px;
}
.table-title[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #26262A;
  font-weight: 500;
}
.table-meta[_ngcontent-%COMP%] {
  color: #4F46E5;
  font-size: 14px;
}
.table-search[_ngcontent-%COMP%] {
  display: flex;
  gap: 10px;
}
.table-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], 
.table-search[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 1rem;
  border: none;
  background: #F9FBFF;
  color: #26262A;
}
.mobile-search[_ngcontent-%COMP%] {
  display: none;
  position: relative;
  width: 100%;
}
.mobile-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 8px 16px;
  padding-right: 40px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  font-size: 14px;
  background: #fff;
}
.mobile-search[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #64748b;
}
.mobile-actions[_ngcontent-%COMP%] {
  display: none;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-filter[_ngcontent-%COMP%] {
  flex: 1;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  font-size: 14px;
  color: #475569;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
  height: 40px;
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-filter[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #CBD5E1;
  background-color: #fff;
}
.custom-mat-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  margin-bottom: 12px;
}
.custom-mat-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  padding: 8px 16px;
  background: transparent;
}
.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  background: white;
}
.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 16px;
  color: #26262A;
  font-size: 14px;
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
}
.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {
  border-left: 1px solid #F0F0F0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {
  border-right: 1px solid #F0F0F0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.mobile-cards[_ngcontent-%COMP%] {
  display: none;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  overflow: hidden;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F1F5F9;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-number[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #64748b;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
  padding: 16px;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #334155;
  font-size: 14px;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row.detail[_ngcontent-%COMP%] {
  color: #64748b;
  margin: 8px 0;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #64748b;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   .urgente-icon[_ngcontent-%COMP%] {
  color: #D92D20;
  margin-left: auto;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%] {
  padding: 12px 16px;
  border-top: 1px solid #F1F5F9;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  border: none;
  border-radius: 10px;
  background: #F8FAFC;
  color: #4F46E5;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:hover {
  background: #F1F5F9;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.badge[_ngcontent-%COMP%] {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.badge.yellow[_ngcontent-%COMP%] {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.badge.red[_ngcontent-%COMP%] {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.badge.green[_ngcontent-%COMP%] {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.view-icon[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 20px;
  cursor: pointer;
}
ion-icon[name=close][_ngcontent-%COMP%] {
  font-size: 20px;
  color: #64748b;
}
ion-icon[name=alert-circle][_ngcontent-%COMP%] {
  font-size: 20px;
  color: #D92D20;
}
.table-pagination[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  flex-wrap: wrap;
  gap: 12px;
}
.table-pagination[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  background: #f3f4f6;
  min-width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 14px;
  color: #26262A;
  cursor: pointer;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {
  background: #4F46E5;
  color: #fff;
}
.table-header-left[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
@media (max-width: 768px) {
  .dashboard-main[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .dashboard-summary[_ngcontent-%COMP%] {
    margin-bottom: 0px;
    background-color: transparent;
    padding: 0px !important;
    width: fit-content;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .desktop-only[_ngcontent-%COMP%] {
    display: none !important;
  }
  .summary-cards-desktop[_ngcontent-%COMP%], 
   .pending-cards-desktop[_ngcontent-%COMP%] {
    display: none;
  }
  .summary-cards-mobile[_ngcontent-%COMP%], 
   .pending-cards-mobile[_ngcontent-%COMP%], 
   .mobile-search[_ngcontent-%COMP%], 
   .mobile-actions[_ngcontent-%COMP%], 
   .mobile-cards[_ngcontent-%COMP%] {
    display: flex;
  }
  .dashboard-table[_ngcontent-%COMP%] {
    margin: 0;
    padding: 16px;
    border-radius: 0;
    box-shadow: none;
  }
  .table-header[_ngcontent-%COMP%] {
    margin-bottom: 12px;
  }
  .table-pagination[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%] {
    width: 100%;
    text-align: center;
    margin-bottom: 8px;
  }
  .table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: center;
  }
}
@media (max-width: 480px) {
  .dashboard-main[_ngcontent-%COMP%] {
    padding: 12px;
    margin-top: 10px;
  }
  .dashboard-summary[_ngcontent-%COMP%] {
    padding: 16px;
    width: fit-content;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .summary-grid[_ngcontent-%COMP%] {
    width: fit-content;
    max-width: 100%;
  }
  .mobile-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
    padding: 8px 16px !important;
    font-size: 14px !important;
  }
  .mobile-search[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 18px !important;
  }
  .mobile-actions[_ngcontent-%COMP%] {
    gap: 12px;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-filter[_ngcontent-%COMP%] {
    padding: 8px 16px !important;
    height: 40px !important;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: stretch;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    flex: 1;
    height: 40px !important;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 20px !important;
  }
  .summary-title[_ngcontent-%COMP%] {
    font-size: 12px;
    color: #ACACAC;
    margin-bottom: 2px;
  }
  .summary-value[_ngcontent-%COMP%] {
    font-size: 28px;
    color: #333333;
    font-weight: 600;
    line-height: 30px;
  }
  .summary-subtitle[_ngcontent-%COMP%] {
    font-size: 12px;
    color: #26262A;
    font-weight: 500;
  }
  .summary-card-mobile[_ngcontent-%COMP%] {
    padding: 12px;
    background-color: #fff;
  }
  .summary-card-mobile[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
  .pending-card-mobile[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .dashboard-table[_ngcontent-%COMP%] {
    padding: 0px;
  }
}
.compact-avisos-table[_ngcontent-%COMP%] {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%] {
  width: 100%;
  display: grid;
  grid-template-columns: 60px 1fr minmax(0, 1.5fr) 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  display: contents;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%] {
  display: contents;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
  padding: 12px 8px;
  background: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
  font-weight: 500;
  color: #374151;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%] {
  display: contents;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%] {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #F9FAFB;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.no-visitado[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #EF4444;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.no-visitado[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEF2F2;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.no-visitado[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEE2E2;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.visitado-pendiente[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.visitado-pendiente[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FFFBEB;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.visitado-pendiente[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEF3C7;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente-presupuesto[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #3B82F6;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente-presupuesto[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #EFF6FF;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente-presupuesto[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #DBEAFE;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.en-curso[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.en-curso[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FFFBEB;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.en-curso[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEF3C7;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #EF4444;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEF2F2;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEE2E2;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.completado[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #10B981;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.completado[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #ECFDF5;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.completado[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #D1FAE5;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.numero-aviso[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: center;
  flex-shrink: 0;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%] {
  justify-content: center;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.yellow[_ngcontent-%COMP%] {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.red[_ngcontent-%COMP%] {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.green[_ngcontent-%COMP%] {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.no-visitado[_ngcontent-%COMP%] {
  background: var(--estado-no-visitado-bg);
  color: var(--estado-no-visitado-color);
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.visitado-pendiente[_ngcontent-%COMP%] {
  background: var(--estado-visitado-pendiente-bg);
  color: var(--estado-visitado-pendiente-color);
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.pendiente-presupuesto[_ngcontent-%COMP%] {
  background: var(--estado-pendiente-presupuesto-bg);
  color: var(--estado-pendiente-presupuesto-color);
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.nombre-cliente[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #374151;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.detalle-servicio[_ngcontent-%COMP%] {
  min-width: 0;
  flex: 1;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.detalle-servicio[_ngcontent-%COMP%]   .detalle-texto[_ngcontent-%COMP%] {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
  max-width: 100%;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.fecha-aviso[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: center;
  flex-shrink: 0;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.urgente-aviso[_ngcontent-%COMP%] {
  justify-content: center;
  flex-shrink: 0;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.urgente-aviso[_ngcontent-%COMP%]   .urgente-icon[_ngcontent-%COMP%] {
  color: #D92D20;
  font-size: 18px;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.urgente-aviso[_ngcontent-%COMP%]   .no-urgente-icon[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 18px;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%] {
  justify-content: center;
  gap: 4px;
  flex-shrink: 0;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #6B7280;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover {
  background-color: #10B981;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #059669;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-editar[_ngcontent-%COMP%]:hover {
  background-color: #F59E0B;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-editar[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-editar[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #D97706;
}
@media (min-width: 769px) {
  .compact-avisos-table[_ngcontent-%COMP%] {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%] {
    grid-template-columns: 80px 140px minmax(150px, 1.5fr) minmax(200px, 2fr) 120px 100px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.numero-aviso[_ngcontent-%COMP%] {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 13px;
    min-width: 0;
    flex: 1;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.detalle-servicio[_ngcontent-%COMP%] {
    min-width: 0;
    flex: 1;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.detalle-servicio[_ngcontent-%COMP%]   .detalle-texto[_ngcontent-%COMP%] {
    font-size: 12px;
    max-width: 100%;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.fecha-aviso[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.urgente-aviso[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 28px;
    height: 28px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .compact-avisos-table[_ngcontent-%COMP%] {
    border-radius: 8px;
    max-height: none;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
    padding: 8px 4px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.numero-aviso[_ngcontent-%COMP%] {
    font-size: 13px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.detalle-servicio[_ngcontent-%COMP%]   .detalle-texto[_ngcontent-%COMP%] {
    font-size: 11px;
    line-height: 1.3;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 24px;
    height: 24px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 14px;
  }
}
@media (max-width: 480px) {
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%] {
    grid-template-columns: 50px 1fr minmax(0, 1.5fr) 70px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
    padding: 6px 2px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.numero-aviso[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 11px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.detalle-servicio[_ngcontent-%COMP%]   .detalle-texto[_ngcontent-%COMP%] {
    font-size: 10px;
    line-height: 1.2;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 22px;
    height: 22px;
  }
  .compact-avisos-table[_ngcontent-%COMP%]   .avisos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 12px;
  }
}
/*# sourceMappingURL=home.page.css.map */`] });
var HomePage = _HomePage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomePage, [{
    type: Component,
    args: [{ selector: "app-home", standalone: true, imports: [
      CommonModule,
      IonContent,
      IonIcon,
      MatTableModule,
      MatIconModule
    ], template: `<!-- <ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>
      Blank
    </ion-title>
  </ion-toolbar>
</ion-header> -->

<ion-content [fullscreen]="true">
  <!-- Estado de carga -->
  <div *ngIf="isLoading" class="loading-container">
    <div class="loading-spinner">
      <ion-icon name="hourglass-outline" class="spinning"></ion-icon>
      <p>Cargando dashboard...</p>
    </div>
  </div>

  <!-- Estado de error -->
  <div *ngIf="hasError" class="error-container">
    <div class="error-message">
      <ion-icon name="alert-circle-outline"></ion-icon>
      <h3>Error al cargar datos</h3>
      <p>No se pudieron cargar los datos del dashboard. Int\xE9ntalo de nuevo.</p>
      <button class="btn-retry" (click)="refreshDashboard()">
        <ion-icon name="refresh-outline"></ion-icon>
        Reintentar
      </button>
    </div>
  </div>

  <!-- Dashboard principal -->
  <main *ngIf="!isLoading && !hasError" class="dashboard-main">
    <!-- Resumen de tarjetas -->
    <section class="dashboard-summary">
      <!-- Desktop Summary Cards -->
      <div class="summary-cards-desktop">
        <div class="summary-card">
          <div class="icon yellow-bg">
            <ion-icon name="hourglass-outline" style="font-size: 42px;"></ion-icon>
          </div>
          <div>
            <div class="summary-title">Avisos</div>
            <div class="summary-value">{{ stats?.avisosEnCurso || 0 }}</div>
            <div class="summary-subtitle">En curso</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="icon red-bg">
            <ion-icon name="warning" style="font-size: 42px;"></ion-icon>
          </div>
          <div>
            <div class="summary-title">Avisos</div>
            <div class="summary-value">{{ stats?.avisosUrgentes || 0 }}</div>
            <div class="summary-subtitle">Urgentes</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="icon purple-bg">
            <ion-icon name="receipt"></ion-icon>
          </div>
          <div>
            <div class="summary-title">Facturas</div>
            <div class="summary-value">{{ stats?.facturasPendientes || 0 }}</div>
            <div class="summary-subtitle">Pendientes</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="icon blue-bg">
            <ion-icon name="document" style="font-size: 40px;"></ion-icon>
          </div>
          <div>
            <div class="summary-title">Presupuestos</div>
            <div class="summary-value">{{ stats?.presupuestosPendientes || 0 }}</div>
            <div class="summary-subtitle">Pendientes</div>
          </div>
        </div>
      </div>

      <!-- Mobile Summary Cards -->
      <div class="summary-cards-mobile">
        <div class="summary-grid">
          <div class="summary-card-mobile">
            <div class="icon yellow-bg">
              <ion-icon name="hourglass-outline"></ion-icon>
            </div>
            <div class="mobile-card-content">
              <div class="summary-title">Avisos</div>
              <div class="summary-value">{{ stats?.avisosEnCurso || 0 }}</div>
              <div class="summary-subtitle">En curso</div>
            </div>
          </div>
          <div class="summary-card-mobile">
            <div class="icon red-bg">
              <ion-icon name="warning"></ion-icon>
            </div>
            <div class="mobile-card-content">
              <div class="summary-title">Avisos</div>
              <div class="summary-value">{{ stats?.avisosUrgentes || 0 }}</div>
              <div class="summary-subtitle">Urgentes</div>
            </div>
          </div>
          <div class="summary-card-mobile">
            <div class="icon purple-bg">
              <ion-icon name="receipt"></ion-icon>
            </div>
            <div class="mobile-card-content">
              <div class="summary-title">Facturas</div>
              <div class="summary-value">{{ stats?.facturasPendientes || 0 }}</div>
              <div class="summary-subtitle">Pendientes</div>
            </div>
          </div>
          <div class="summary-card-mobile">
            <div class="icon blue-bg">
              <ion-icon name="document"></ion-icon>
            </div>
            <div class="mobile-card-content">
              <div class="summary-title">Presupuestos</div>
              <div class="summary-value">{{ stats?.presupuestosPendientes || 0 }}</div>
              <div class="summary-subtitle">Pendientes</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Presupuestos y Facturas Pendientes -->
    <section class="dashboard-cards">
      <!-- Desktop Cards -->
      <div class="pending-cards-desktop">
        <div class="pending-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="pending-title">Presupuestos Pendientes</div>
            <a class="pending-more" (click)="irAPresupuestos()">Mostrar m\xE1s &gt;</a>  
          </div>
          <div class="pending-details-container">
            <div class="pending-details-title">
              <div class="pending-amount">{{ formatearMoneda(totalPresupuestosPendientes) }}</div>
              <span class="pending-details-subtitle">Presupuestos: {{ presupuestosPendientes.length }}</span>
            </div>
            <table class="pending-details-table" *ngIf="presupuestosPendientes.length > 0">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Fecha emisi\xF3n</th>
                  <th>Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let presupuesto of presupuestosPendientes.slice(0, 3)">
                  <td>{{ presupuesto.aviso?.nombre_cliente_aviso || 'N/A' }}</td>
                  <td>{{ presupuesto.fecha_creacion | date:'shortDate' }}</td>
                  <td>{{ formatearMoneda(presupuesto.total_estimado || 0) }}</td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="presupuestosPendientes.length === 0" class="no-data">
              <p>No hay presupuestos pendientes</p>
            </div>
          </div>
        </div>
        <div class="pending-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="pending-title">Facturas Pendientes</div>
            <a class="pending-more" (click)="irAFacturas()">Mostrar m\xE1s &gt;</a>  
          </div>
          <div class="pending-details-container">
            <div class="pending-details-title">
              <div class="pending-amount">{{ formatearMoneda(totalFacturasPendientes) }}</div>
              <span class="pending-details-subtitle">Facturas: {{ facturasPendientes.length }}</span>
            </div>
            <table class="pending-details-table" *ngIf="facturasPendientes.length > 0">
              <thead>
                <tr>
                  <th>N\xBA Factura</th>
                  <th>N\xBA Aviso</th>
                  <th>Fecha emisi\xF3n</th>
                  <th>Importe total</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let factura of facturasPendientes.slice(0, 3)">
                  <td>{{ factura.numero_factura }}</td>
                  <td>{{ factura.aviso?.id?.substring(0, 8)?.toUpperCase() || 'N/A' }}</td>
                  <td>{{ factura.fecha_emision | date:'shortDate' }}</td>
                  <td>{{ formatearMoneda(factura.total || 0) }}</td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="facturasPendientes.length === 0" class="no-data">
              <p>No hay facturas pendientes</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Cards -->
      <div class="pending-cards-mobile">
        <div class="pending-card-mobile">
          <div class="mobile-card-header">
            <div class="pending-title">Presupuestos Pendientes</div>
            <div class="pending-status orange">
              <ion-icon name="alert-circle"></ion-icon>
              Pendientes
            </div>
          </div>
          <div class="mobile-card-body">
            <div class="mobile-amount">{{ formatearMoneda(totalPresupuestosPendientes) }}</div>
            <div class="mobile-subtitle">Presupuestos: {{ presupuestosPendientes.length }}</div>
            <div *ngIf="presupuestosPendientes.length > 0" class="mobile-item">
              <div class="item-label">Cliente:</div>
              <div class="item-value">{{ presupuestosPendientes[0]?.aviso?.nombre_cliente_aviso || 'N/A' }}</div>
            </div>
            <div *ngIf="presupuestosPendientes.length > 0" class="mobile-item">
              <div class="item-label">Fecha:</div>
              <div class="item-value">{{ presupuestosPendientes[0]?.fecha_creacion | date:'shortDate' }}</div>
            </div>
            <div *ngIf="presupuestosPendientes.length > 0" class="mobile-item">
              <div class="item-label">Importe:</div>
              <div class="item-value">{{ formatearMoneda(presupuestosPendientes[0]?.total_estimado || 0) }}</div>
            </div>
            <div *ngIf="presupuestosPendientes.length === 0" class="no-data-mobile">
              <p>No hay presupuestos pendientes</p>
            </div>
          </div>
          <a class="pending-more" (click)="irAPresupuestos()">Mostrar m\xE1s &gt;</a>
        </div>

        <div class="pending-card-mobile">
          <div class="mobile-card-header">
            <div class="pending-title">Facturas Pendientes</div>
            <div class="pending-status orange">
              <ion-icon name="alert-circle"></ion-icon>
              Pendientes
            </div>
          </div>
          <div class="mobile-card-body">
            <div class="mobile-amount">{{ formatearMoneda(totalFacturasPendientes) }}</div>
            <div class="mobile-subtitle">Facturas: {{ facturasPendientes.length }}</div>
            <div *ngIf="facturasPendientes.length > 0" class="mobile-item">
              <div class="item-label">N\xBA Factura:</div>
              <div class="item-value">{{ facturasPendientes[0]?.numero_factura }}</div>
            </div>
            <div *ngIf="facturasPendientes.length > 0" class="mobile-item">
              <div class="item-label">Fecha:</div>
              <div class="item-value">{{ facturasPendientes[0]?.fecha_emision | date:'shortDate' }}</div>
            </div>
            <div *ngIf="facturasPendientes.length > 0" class="mobile-item">
              <div class="item-label">Importe:</div>
              <div class="item-value">{{ formatearMoneda(facturasPendientes[0]?.total || 0) }}</div>
            </div>
            <div *ngIf="facturasPendientes.length === 0" class="no-data-mobile">
              <p>No hay facturas pendientes</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Avisos recientes -->
    <section class="dashboard-table">
      <!-- Header Section -->
      <div class="table-header">
        <div class="table-header-left">
          <div class="table-title">Avisos recientes</div>
          <div class="table-meta">Avisos: {{ avisos.length }}</div>  
        </div>
        
        <!-- Mobile Search Bar -->
        <div class="mobile-search">
          <input type="text" placeholder="Buscar aviso..." />
          <ion-icon name="search-outline"></ion-icon>
        </div>

        <!-- Desktop Search and Actions -->
        <div class="table-search desktop-only">
          <input type="text" placeholder="Buscar..." />
          <select>
            <option>Ordenar por: Recientes</option>
          </select>
        </div>
      </div>

      <!-- Mobile Actions -->
      <div class="mobile-actions">
        <select class="mobile-filter">
          <option>Ordenar: Recientes</option>
          <option>Ordenar: Antiguos</option>
          <option>Ordenar: Urgentes</option>
        </select>
      </div>

      <!-- Compact Table View -->
      <div class="compact-avisos-table">
        <div class="avisos-table">
          <div class="table-header">
            <div class="header-row">
              <div class="header-cell">N\xFAmero</div>
              <div class="header-cell desktop-only">Estado</div>
              <div class="header-cell">Cliente</div>
              <div class="header-cell">Detalle</div>
              <div class="header-cell desktop-only">Fecha</div>
              <div class="header-cell desktop-only">Urgente</div>
              <div class="header-cell">Acciones</div>
            </div>
          </div>
          <div class="table-body">
            <div *ngFor="let aviso of avisos" class="aviso-row" [ngClass]="{
                   'no-visitado': aviso.estado === 'No visitado',
                   'visitado-pendiente': aviso.estado === 'Visitado pendiente',
                   'pendiente-presupuesto': aviso.estado === 'Pendiente de presupuesto',
                   'en-curso': aviso.estado === 'En curso',
                   'pendiente': aviso.estado === 'Pendiente',
                   'completado': aviso.estado === 'Completado'
                 }">
              <div class="aviso-cell numero-aviso">#{{ aviso.numero }}</div>
              <div class="aviso-cell estado-aviso desktop-only">
                <span class="badge" [ngClass]="{
                        'yellow': aviso.estado === 'En curso',
                        'red': aviso.estado === 'Pendiente',
                        'green': aviso.estado === 'Completado',
                        'no-visitado': aviso.estado === 'No visitado',
                        'visitado-pendiente': aviso.estado === 'Visitado pendiente',
                        'pendiente-presupuesto': aviso.estado === 'Pendiente de presupuesto'
                      }">
                  {{ aviso.estado }}
                </span>
              </div>
              <div class="aviso-cell nombre-cliente">{{ aviso.nombre }}</div>
              <div class="aviso-cell detalle-servicio">
                <div class="detalle-texto" [title]="aviso.detalle">
                  {{ aviso.detalle }}
                </div>
              </div>
              <div class="aviso-cell fecha-aviso desktop-only">{{ aviso.fecha }}</div>
              <div class="aviso-cell urgente-aviso desktop-only">
                <ion-icon *ngIf="aviso.urgente" name="alert-circle" class="urgente-icon" title="Aviso urgente">
                </ion-icon>
                <ion-icon *ngIf="!aviso.urgente" name="close" class="no-urgente-icon" title="No urgente">
                </ion-icon>
              </div>
              <div class="aviso-cell acciones">
                <button class="btn-ver" title="Ver detalles" (click)="verAviso(aviso)">
                  <ion-icon name="eye-outline"></ion-icon>
                </button>
                <button class="btn-editar" title="Editar aviso" (click)="editarAviso(aviso)">
                  <ion-icon name="create-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="table-pagination">
        <span class="pagination-info">Mostrando datos 1 a {{ avisos.length }} de {{ avisos.length }} aviso</span>
        <div class="pagination">
          <button class="active">1</button>
          <button>2</button>
          <button>3</button>
          <button class="desktop-only">4</button>
          <span class="desktop-only">...</span>
          <button class="desktop-only">40</button>
        </div>
      </div>
    </section>
  </main>
</ion-content>`, styles: [`/* src/app/home/home.page.scss */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #FAFBFF;
}
.loading-container .loading-spinner {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  border: 1px solid #E2E8F0;
}
.loading-container .loading-spinner ion-icon {
  font-size: 48px;
  color: #4F46E5;
  margin-bottom: 16px;
}
.loading-container .loading-spinner p {
  color: #64748b;
  font-size: 16px;
  margin: 0;
}
.loading-container .loading-spinner .spinning {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #FAFBFF;
}
.error-container .error-message {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  border: 1px solid #E2E8F0;
  max-width: 400px;
}
.error-container .error-message ion-icon {
  font-size: 48px;
  color: #D92D20;
  margin-bottom: 16px;
}
.error-container .error-message h3 {
  color: #26262A;
  font-size: 20px;
  margin: 0 0 8px 0;
}
.error-container .error-message p {
  color: #64748b;
  font-size: 14px;
  margin: 0 0 24px 0;
  line-height: 1.5;
}
.error-container .error-message .btn-retry {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.error-container .error-message .btn-retry ion-icon {
  font-size: 18px;
  color: white;
  margin: 0;
}
.error-container .error-message .btn-retry:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.error-container .error-message .btn-retry:active {
  transform: translateY(0);
}
.no-data {
  width: 100%;
  text-align: center;
  padding: 24px;
  color: #64748b;
  font-size: 14px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px dashed #E2E8F0;
}
.no-data p {
  margin: 0;
}
.no-data-mobile {
  text-align: center;
  padding: 16px;
  color: #64748b;
  font-size: 12px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px dashed #E2E8F0;
  margin-top: 8px;
}
.no-data-mobile p {
  margin: 0;
}
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
}
.home-container h1 {
  font-size: 2.2rem;
  color: #4F46E5;
  margin-bottom: 12px;
}
.home-container p {
  font-size: 1.1rem;
  color: #64748b;
}
ion-content {
  --background: $bg-light;
}
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
#container strong {
  font-size: 20px;
  line-height: 26px;
}
#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}
#container a {
  text-decoration: none;
}
.dashboard-main {
  background: white;
  min-height: 100vh;
  padding: 10px 0px;
}
.dashboard-summary {
  width: fit-content;
  max-width: 100%;
  background: #fff;
  padding: 30px;
  margin-right: auto;
}
.summary-cards-desktop {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}
.summary-card {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 220px;
  flex-shrink: 0;
}
.summary-card .icon {
  width: 74px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 36px;
}
.summary-cards-mobile {
  display: none;
}
.summary-grid {
  display: flex;
  gap: 16px;
  width: fit-content;
  max-width: 100%;
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.summary-grid::-webkit-scrollbar {
  display: none;
}
.summary-card-mobile {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  min-width: 200px;
  flex-shrink: 0;
}
.summary-card-mobile .icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 24px;
  flex-shrink: 0;
}
.summary-card-mobile .mobile-card-content {
  flex: 1;
  min-width: 0;
}
.purple-bg {
  background: rgba(78, 70, 229, 0.13);
  color: #605BFF;
}
.yellow-bg {
  background: #FEF0C7;
  color: #DC6803;
}
.red-bg {
  background: #FEE4E2;
  color: #D92D20;
}
.blue-bg {
  background: #EEF2FF;
  color: #0F5FC2;
}
.summary-title {
  font-size: 14px;
  color: #ACACAC;
  margin-bottom: 2px;
}
.summary-value {
  font-size: 31px;
  color: #333333;
  font-weight: 600;
  line-height: 30px;
}
.summary-value span {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 400;
  margin-left: 4px;
}
.summary-subtitle {
  font-size: 14px;
  color: #26262A;
  font-weight: 500;
}
.dashboard-cards {
  margin-bottom: 0px;
}
.pending-cards-desktop {
  display: flex;
}
.pending-card {
  background: #fff;
  padding: 15px 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pending-cards-mobile {
  display: none;
  flex-direction: row;
  gap: 16px;
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.pending-cards-mobile::-webkit-scrollbar {
  display: none;
}
.pending-card-mobile {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  padding: 20px;
  border: 1px solid #E2E8F0;
  min-width: 280px;
  height: min-content;
  flex-shrink: 0;
}
.pending-card-mobile .mobile-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #F1F5F9;
}
.pending-card-mobile .pending-title {
  font-size: 14px;
  color: #26262A;
  font-weight: 500;
  margin-right: 20px;
}
.pending-card-mobile .pending-status {
  font-size: 14px;
  color: #64748b;
  font-weight: 400;
}
.pending-card-mobile .pending-status ion-icon {
  display: none;
}
.pending-card-mobile .pending-status.red {
  color: #D92D20;
}
.pending-card-mobile .mobile-card-body {
  margin-bottom: 16px;
}
.pending-card-mobile .mobile-amount {
  font-size: 20px;
  color: #4F46E5;
  font-weight: 600;
  margin-bottom: 4px;
}
.pending-card-mobile .mobile-subtitle {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
}
.pending-card-mobile .mobile-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F1F5F9;
}
.pending-card-mobile .mobile-item:last-child {
  border-bottom: none;
}
.pending-card-mobile .mobile-item .item-label {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}
.pending-card-mobile .mobile-item .item-value {
  font-size: 14px;
  color: #26262A;
  font-weight: 500;
}
.pending-title {
  font-size: 16px;
  color: #26262A;
  font-weight: 500;
}
.pending-details-container {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  gap: 25px;
}
.pending-details-container .pending-details-subtitle {
  font-size: 14px;
  color: #64748b;
  font-weight: 400;
  text-wrap: nowrap;
}
.pending-details-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}
.pending-amount {
  font-size: 22px;
  color: #4F46E5;
  font-weight: 500;
}
.pending-details {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: #64748b;
  font-size: 0.98rem;
}
.pending-status.orange {
  color: #DC6803;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.pending-more {
  color: #4F46E5;
  font-size: 0.98rem;
  text-decoration: none;
  margin-top: 8px;
  align-self: flex-end;
  cursor: pointer;
  transition: color 0.2s ease;
}
.pending-more:hover {
  color: #4338CA;
  text-decoration: underline;
}
.pending-details-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0px;
  font-size: 14px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.pending-details-table th {
  text-align: left;
  padding: 12px 16px;
  background: transparent;
  color: #64748b;
  font-weight: 500;
  border-bottom: 1px solid #E2E8F0;
  white-space: nowrap;
}
.pending-details-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #F1F5F9;
  color: #26262A;
  vertical-align: top;
}
.pending-details-table tr:last-child td {
  border-bottom: none;
}
.pending-details-table tr:hover {
  background: #F8FAFC;
}
.dashboard-table {
  background: #fff;
  padding: 25px;
}
.table-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 16px;
}
.table-title {
  font-size: 18px;
  color: #26262A;
  font-weight: 500;
}
.table-meta {
  color: #4F46E5;
  font-size: 14px;
}
.table-search {
  display: flex;
  gap: 10px;
}
.table-search input,
.table-search select {
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 1rem;
  border: none;
  background: #F9FBFF;
  color: #26262A;
}
.mobile-search {
  display: none;
  position: relative;
  width: 100%;
}
.mobile-search input {
  width: 100%;
  padding: 8px 16px;
  padding-right: 40px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  font-size: 14px;
  background: #fff;
}
.mobile-search ion-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #64748b;
}
.mobile-actions {
  display: none;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
}
.mobile-actions .mobile-filter {
  flex: 1;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  font-size: 14px;
  color: #475569;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
  height: 40px;
}
.mobile-actions .mobile-filter:focus {
  outline: none;
  border-color: #CBD5E1;
  background-color: #fff;
}
.custom-mat-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  margin-bottom: 12px;
}
.custom-mat-table thead tr th {
  color: #64748b;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  padding: 8px 16px;
  background: transparent;
}
.custom-mat-table tbody tr {
  background: white;
}
.custom-mat-table tbody tr td {
  padding: 16px;
  color: #26262A;
  font-size: 14px;
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
}
.custom-mat-table tbody tr td:first-child {
  border-left: 1px solid #F0F0F0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.custom-mat-table tbody tr td:last-child {
  border-right: 1px solid #F0F0F0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.mobile-cards {
  display: none;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}
.mobile-cards .aviso-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  overflow: hidden;
}
.mobile-cards .aviso-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F1F5F9;
}
.mobile-cards .aviso-card .card-header .card-number {
  font-weight: 500;
  color: #64748b;
}
.mobile-cards .aviso-card .card-body {
  padding: 16px;
}
.mobile-cards .aviso-card .card-body .card-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #334155;
  font-size: 14px;
}
.mobile-cards .aviso-card .card-body .card-row.detail {
  color: #64748b;
  margin: 8px 0;
}
.mobile-cards .aviso-card .card-body .card-row ion-icon {
  font-size: 18px;
  color: #64748b;
}
.mobile-cards .aviso-card .card-body .card-row .urgente-icon {
  color: #D92D20;
  margin-left: auto;
}
.mobile-cards .aviso-card .card-body .card-row strong {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards .aviso-card .card-actions {
  padding: 12px 16px;
  border-top: 1px solid #F1F5F9;
}
.mobile-cards .aviso-card .card-actions .action-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  border: none;
  border-radius: 10px;
  background: #F8FAFC;
  color: #4F46E5;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
}
.mobile-cards .aviso-card .card-actions .action-btn ion-icon {
  font-size: 20px;
}
.mobile-cards .aviso-card .card-actions .action-btn:hover {
  background: #F1F5F9;
}
.mobile-cards .aviso-card .card-actions .action-btn:active {
  transform: scale(0.98);
}
.badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.badge.yellow {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.badge.red {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.badge.green {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.view-icon {
  color: #64748b;
  font-size: 20px;
  cursor: pointer;
}
ion-icon[name=close] {
  font-size: 20px;
  color: #64748b;
}
ion-icon[name=alert-circle] {
  font-size: 20px;
  color: #D92D20;
}
.table-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  flex-wrap: wrap;
  gap: 12px;
}
.table-pagination .pagination-info {
  font-size: 14px;
  color: #64748b;
}
.table-pagination .pagination {
  display: flex;
  gap: 8px;
}
.table-pagination .pagination button {
  background: #f3f4f6;
  min-width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 14px;
  color: #26262A;
  cursor: pointer;
}
.table-pagination .pagination button.active {
  background: #4F46E5;
  color: #fff;
}
.table-header-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
@media (max-width: 768px) {
  .dashboard-main {
    padding: 16px;
  }
  .dashboard-summary {
    margin-bottom: 0px;
    background-color: transparent;
    padding: 0px !important;
    width: fit-content;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .desktop-only {
    display: none !important;
  }
  .summary-cards-desktop,
  .pending-cards-desktop {
    display: none;
  }
  .summary-cards-mobile,
  .pending-cards-mobile,
  .mobile-search,
  .mobile-actions,
  .mobile-cards {
    display: flex;
  }
  .dashboard-table {
    margin: 0;
    padding: 16px;
    border-radius: 0;
    box-shadow: none;
  }
  .table-header {
    margin-bottom: 12px;
  }
  .table-pagination .pagination-info {
    width: 100%;
    text-align: center;
    margin-bottom: 8px;
  }
  .table-pagination .pagination {
    width: 100%;
    justify-content: center;
  }
}
@media (max-width: 480px) {
  .dashboard-main {
    padding: 12px;
    margin-top: 10px;
  }
  .dashboard-summary {
    padding: 16px;
    width: fit-content;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .summary-grid {
    width: fit-content;
    max-width: 100%;
  }
  .mobile-search input {
    padding: 8px 16px !important;
    font-size: 14px !important;
  }
  .mobile-search ion-icon {
    font-size: 18px !important;
  }
  .mobile-actions {
    gap: 12px;
  }
  .mobile-actions .mobile-filter {
    padding: 8px 16px !important;
    height: 40px !important;
  }
  .mobile-actions .mobile-buttons {
    width: 100%;
    justify-content: stretch;
  }
  .mobile-actions .mobile-buttons button {
    flex: 1;
    height: 40px !important;
  }
  .mobile-actions .mobile-buttons button ion-icon {
    font-size: 20px !important;
  }
  .summary-title {
    font-size: 12px;
    color: #ACACAC;
    margin-bottom: 2px;
  }
  .summary-value {
    font-size: 28px;
    color: #333333;
    font-weight: 600;
    line-height: 30px;
  }
  .summary-subtitle {
    font-size: 12px;
    color: #26262A;
    font-weight: 500;
  }
  .summary-card-mobile {
    padding: 12px;
    background-color: #fff;
  }
  .summary-card-mobile .icon {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
  .pending-card-mobile {
    padding: 16px;
  }
  .dashboard-table {
    padding: 0px;
  }
}
.compact-avisos-table {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-avisos-table .avisos-table {
  width: 100%;
  display: grid;
  grid-template-columns: 60px 1fr minmax(0, 1.5fr) 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-avisos-table .avisos-table .table-header {
  display: contents;
}
.compact-avisos-table .avisos-table .table-header .header-row {
  display: contents;
}
.compact-avisos-table .avisos-table .table-header .header-row .header-cell {
  padding: 12px 8px;
  background: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
  font-weight: 500;
  color: #374151;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-avisos-table .avisos-table .table-body {
  display: contents;
}
.compact-avisos-table .avisos-table .table-body .aviso-row {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-avisos-table .avisos-table .table-body .aviso-row:hover .aviso-cell {
  background-color: #F9FAFB;
}
.compact-avisos-table .avisos-table .table-body .aviso-row:active {
  transform: scale(0.98);
}
.compact-avisos-table .avisos-table .table-body .aviso-row.no-visitado .aviso-cell:first-child {
  border-left: 4px solid #EF4444;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.no-visitado .aviso-cell {
  background-color: #FEF2F2;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.no-visitado:hover .aviso-cell {
  background-color: #FEE2E2;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.visitado-pendiente .aviso-cell:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.visitado-pendiente .aviso-cell {
  background-color: #FFFBEB;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.visitado-pendiente:hover .aviso-cell {
  background-color: #FEF3C7;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.pendiente-presupuesto .aviso-cell:first-child {
  border-left: 4px solid #3B82F6;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.pendiente-presupuesto .aviso-cell {
  background-color: #EFF6FF;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.pendiente-presupuesto:hover .aviso-cell {
  background-color: #DBEAFE;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.en-curso .aviso-cell:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.en-curso .aviso-cell {
  background-color: #FFFBEB;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.en-curso:hover .aviso-cell {
  background-color: #FEF3C7;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.pendiente .aviso-cell:first-child {
  border-left: 4px solid #EF4444;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.pendiente .aviso-cell {
  background-color: #FEF2F2;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.pendiente:hover .aviso-cell {
  background-color: #FEE2E2;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.completado .aviso-cell:first-child {
  border-left: 4px solid #10B981;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.completado .aviso-cell {
  background-color: #ECFDF5;
}
.compact-avisos-table .avisos-table .table-body .aviso-row.completado:hover .aviso-cell {
  background-color: #D1FAE5;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.numero-aviso {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: center;
  flex-shrink: 0;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.estado-aviso {
  justify-content: center;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.estado-aviso .badge {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.yellow {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.red {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.green {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.no-visitado {
  background: var(--estado-no-visitado-bg);
  color: var(--estado-no-visitado-color);
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.visitado-pendiente {
  background: var(--estado-visitado-pendiente-bg);
  color: var(--estado-visitado-pendiente-color);
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.pendiente-presupuesto {
  background: var(--estado-pendiente-presupuesto-bg);
  color: var(--estado-pendiente-presupuesto-color);
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.nombre-cliente {
  font-weight: 500;
  color: #374151;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.detalle-servicio {
  min-width: 0;
  flex: 1;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.detalle-servicio .detalle-texto {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
  max-width: 100%;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.fecha-aviso {
  font-size: 12px;
  color: #6B7280;
  justify-content: center;
  flex-shrink: 0;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.urgente-aviso {
  justify-content: center;
  flex-shrink: 0;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.urgente-aviso .urgente-icon {
  color: #D92D20;
  font-size: 18px;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.urgente-aviso .no-urgente-icon {
  color: #64748b;
  font-size: 18px;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones {
  justify-content: center;
  gap: 4px;
  flex-shrink: 0;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button ion-icon {
  font-size: 16px;
  color: #6B7280;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button.btn-ver:hover {
  background-color: #10B981;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button.btn-ver:hover ion-icon {
  color: white;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button.btn-ver:active {
  transform: scale(0.9);
  background-color: #059669;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button.btn-editar:hover {
  background-color: #F59E0B;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button.btn-editar:hover ion-icon {
  color: white;
}
.compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button.btn-editar:active {
  transform: scale(0.9);
  background-color: #D97706;
}
@media (min-width: 769px) {
  .compact-avisos-table {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-avisos-table .avisos-table {
    grid-template-columns: 80px 140px minmax(150px, 1.5fr) minmax(200px, 2fr) 120px 100px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-avisos-table .avisos-table .table-header .header-row .header-cell {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.numero-aviso {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.estado-aviso {
    flex-shrink: 0;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.nombre-cliente {
    font-size: 13px;
    min-width: 0;
    flex: 1;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.detalle-servicio {
    min-width: 0;
    flex: 1;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.detalle-servicio .detalle-texto {
    font-size: 12px;
    max-width: 100%;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.fecha-aviso {
    flex-shrink: 0;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.urgente-aviso {
    flex-shrink: 0;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones {
    flex-shrink: 0;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button {
    width: 28px;
    height: 28px;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button ion-icon {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .compact-avisos-table {
    border-radius: 8px;
    max-height: none;
  }
  .compact-avisos-table .avisos-table .table-header .header-row .header-cell {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell {
    padding: 8px 4px;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.numero-aviso {
    font-size: 13px;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.nombre-cliente {
    font-size: 12px;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.detalle-servicio .detalle-texto {
    font-size: 11px;
    line-height: 1.3;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button {
    width: 24px;
    height: 24px;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button ion-icon {
    font-size: 14px;
  }
}
@media (max-width: 480px) {
  .compact-avisos-table .avisos-table {
    grid-template-columns: 50px 1fr minmax(0, 1.5fr) 70px;
  }
  .compact-avisos-table .avisos-table .table-header .header-row .header-cell {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell {
    padding: 6px 2px;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.numero-aviso {
    font-size: 12px;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.nombre-cliente {
    font-size: 11px;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.detalle-servicio .detalle-texto {
    font-size: 10px;
    line-height: 1.2;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button {
    width: 22px;
    height: 22px;
  }
  .compact-avisos-table .avisos-table .table-body .aviso-row .aviso-cell.acciones button ion-icon {
    font-size: 12px;
  }
}
/*# sourceMappingURL=home.page.css.map */
`] }]
  }], () => [{ type: Router }, { type: DashboardService }, { type: AvisosService }, { type: FacturasService }, { type: PresupuestosService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomePage, { className: "HomePage", filePath: "src/app/home/home.page.ts", lineNumber: 86 });
})();
export {
  HomePage
};
//# sourceMappingURL=home.page-DIPYMFHB.js.map
