import {
  addIcons,
  alertCircleOutline,
  businessOutline,
  calculatorOutline,
  calendarOutline,
  callOutline,
  cardOutline,
  cashOutline,
  checkmarkCircleOutline,
  closeOutline,
  cogOutline,
  constructOutline,
  documentOutline,
  documentTextOutline,
  globeOutline,
  imageOutline,
  informationCircleOutline,
  listOutline,
  locationOutline,
  mailOutline,
  notificationsOutline,
  refreshOutline,
  saveOutline,
  serverOutline,
  settingsOutline,
  shieldCheckmarkOutline,
  timeOutline,
  warningOutline
} from "./chunk-YLHOXAZF.js";
import {
  IonIcon
} from "./chunk-DJA56OJT.js";
import {
  BehaviorSubject,
  CheckboxControlValueAccessor,
  CommonModule,
  Component,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  Injectable,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Subject,
  SupabaseClientService,
  Validators,
  catchError,
  forkJoin,
  from,
  map,
  setClassMetadata,
  switchMap,
  takeUntil,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
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
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-KNQSF6OU.js";

// src/app/modules/ajustes/services/ajustes.service.ts
var _AjustesService = class _AjustesService {
  constructor(supabaseClientService) {
    this.supabaseClientService = supabaseClientService;
    this.ajustesSubject = new BehaviorSubject(null);
    this.ajustes$ = this.ajustesSubject.asObservable();
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Obtiene todas las configuraciones del sistema
   */
  getAjustesCompletos() {
    return forkJoin({
      empresa: this.getConfiguracionEmpresa(),
      facturacion: this.getConfiguracionFacturacion(),
      notificaciones: this.getConfiguracionNotificaciones(),
      avisos: this.getConfiguracionAvisos(),
      sistema: this.getConfiguracionSistema()
    }).pipe(map((ajustes) => {
      this.ajustesSubject.next(ajustes);
      return ajustes;
    }), catchError((error) => {
      console.error("Error al obtener ajustes completos:", error);
      throw error;
    }));
  }
  /**
   * Obtiene la configuración de empresa
   */
  getConfiguracionEmpresa() {
    return from(this.supabase.from("configuracion_empresa").select("*").single()).pipe(switchMap(({ data, error }) => {
      if (error) {
        if (error.code === "PGRST116") {
          return from(this.crearConfiguracionEmpresaPorDefecto());
        }
        throw error;
      }
      return from(Promise.resolve(data));
    }), catchError((error) => {
      console.error("Error al obtener configuraci\xF3n de empresa:", error);
      throw error;
    }));
  }
  /**
   * Obtiene la configuración de facturación
   */
  getConfiguracionFacturacion() {
    return from(this.supabase.from("configuracion_facturacion").select("*").single()).pipe(switchMap(({ data, error }) => {
      if (error) {
        if (error.code === "PGRST116") {
          return from(this.crearConfiguracionFacturacionPorDefecto());
        }
        throw error;
      }
      return from(Promise.resolve(data));
    }), catchError((error) => {
      console.error("Error al obtener configuraci\xF3n de facturaci\xF3n:", error);
      throw error;
    }));
  }
  /**
   * Obtiene la configuración de notificaciones
   */
  getConfiguracionNotificaciones() {
    return from(this.supabase.from("configuracion_notificaciones").select("*").single()).pipe(switchMap(({ data, error }) => {
      if (error) {
        if (error.code === "PGRST116") {
          return from(this.crearConfiguracionNotificacionesPorDefecto());
        }
        throw error;
      }
      return from(Promise.resolve(data));
    }), catchError((error) => {
      console.error("Error al obtener configuraci\xF3n de notificaciones:", error);
      throw error;
    }));
  }
  /**
   * Obtiene la configuración de avisos
   */
  getConfiguracionAvisos() {
    return from(this.supabase.from("configuracion_avisos").select("*").single()).pipe(switchMap(({ data, error }) => {
      if (error) {
        if (error.code === "PGRST116") {
          return from(this.crearConfiguracionAvisosPorDefecto());
        }
        throw error;
      }
      return from(Promise.resolve(data));
    }), catchError((error) => {
      console.error("Error al obtener configuraci\xF3n de avisos:", error);
      throw error;
    }));
  }
  /**
   * Obtiene la configuración del sistema
   */
  getConfiguracionSistema() {
    return from(this.supabase.from("configuracion_sistema").select("*").single()).pipe(switchMap(({ data, error }) => {
      if (error) {
        if (error.code === "PGRST116") {
          return from(this.crearConfiguracionSistemaPorDefecto());
        }
        throw error;
      }
      return from(Promise.resolve(data));
    }), catchError((error) => {
      console.error("Error al obtener configuraci\xF3n del sistema:", error);
      throw error;
    }));
  }
  /**
   * Actualiza la configuración de empresa
   */
  actualizarConfiguracionEmpresa(datos) {
    const datosActualizados = __spreadProps(__spreadValues({}, datos), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("configuracion_empresa").update(datosActualizados).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const configuracionActualizada = data;
      this.actualizarAjustesLocales("empresa", configuracionActualizada);
      return configuracionActualizada;
    }), catchError((error) => {
      console.error("Error al actualizar configuraci\xF3n de empresa:", error);
      throw error;
    }));
  }
  /**
   * Actualiza la configuración de facturación
   */
  actualizarConfiguracionFacturacion(datos) {
    const datosActualizados = __spreadProps(__spreadValues({}, datos), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("configuracion_facturacion").update(datosActualizados).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const configuracionActualizada = data;
      this.actualizarAjustesLocales("facturacion", configuracionActualizada);
      return configuracionActualizada;
    }), catchError((error) => {
      console.error("Error al actualizar configuraci\xF3n de facturaci\xF3n:", error);
      throw error;
    }));
  }
  /**
   * Actualiza la configuración de notificaciones
   */
  actualizarConfiguracionNotificaciones(datos) {
    const datosActualizados = __spreadProps(__spreadValues({}, datos), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("configuracion_notificaciones").update(datosActualizados).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const configuracionActualizada = data;
      this.actualizarAjustesLocales("notificaciones", configuracionActualizada);
      return configuracionActualizada;
    }), catchError((error) => {
      console.error("Error al actualizar configuraci\xF3n de notificaciones:", error);
      throw error;
    }));
  }
  /**
   * Actualiza la configuración de avisos
   */
  actualizarConfiguracionAvisos(datos) {
    const datosActualizados = __spreadProps(__spreadValues({}, datos), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("configuracion_avisos").update(datosActualizados).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const configuracionActualizada = data;
      this.actualizarAjustesLocales("avisos", configuracionActualizada);
      return configuracionActualizada;
    }), catchError((error) => {
      console.error("Error al actualizar configuraci\xF3n de avisos:", error);
      throw error;
    }));
  }
  /**
   * Actualiza la configuración del sistema
   */
  actualizarConfiguracionSistema(datos) {
    const datosActualizados = __spreadProps(__spreadValues({}, datos), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("configuracion_sistema").update(datosActualizados).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const configuracionActualizada = data;
      this.actualizarAjustesLocales("sistema", configuracionActualizada);
      return configuracionActualizada;
    }), catchError((error) => {
      console.error("Error al actualizar configuraci\xF3n del sistema:", error);
      throw error;
    }));
  }
  /**
   * Actualiza los ajustes locales en el BehaviorSubject
   */
  actualizarAjustesLocales(tipo, configuracion) {
    const ajustesActuales = this.ajustesSubject.value;
    if (ajustesActuales) {
      ajustesActuales[tipo] = configuracion;
      this.ajustesSubject.next(__spreadValues({}, ajustesActuales));
    }
  }
  /**
   * Crea configuración de empresa por defecto
   */
  crearConfiguracionEmpresaPorDefecto() {
    return __async(this, null, function* () {
      const configuracionPorDefecto = {
        nombre_empresa: "Mi Empresa",
        cif: "",
        direccion: "",
        telefono: "",
        email: "",
        web: "",
        logo_url: "",
        fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
        fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = yield this.supabase.from("configuracion_empresa").insert([configuracionPorDefecto]).select().single();
      if (error)
        throw error;
      return data;
    });
  }
  /**
   * Crea configuración de facturación por defecto
   */
  crearConfiguracionFacturacionPorDefecto() {
    return __async(this, null, function* () {
      const configuracionPorDefecto = {
        iva_por_defecto: 21,
        moneda: "EUR",
        formato_numero_factura: "FAC-{YEAR}-{NUMBER}",
        dias_vencimiento: 30,
        texto_pie_factura: "Gracias por confiar en nuestros servicios",
        condiciones_pago: "Pago a 30 d\xEDas",
        fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
        fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = yield this.supabase.from("configuracion_facturacion").insert([configuracionPorDefecto]).select().single();
      if (error)
        throw error;
      return data;
    });
  }
  /**
   * Crea configuración de notificaciones por defecto
   */
  crearConfiguracionNotificacionesPorDefecto() {
    return __async(this, null, function* () {
      const configuracionPorDefecto = {
        email_notificaciones: true,
        email_avisos_nuevos: true,
        email_facturas_generadas: true,
        email_recordatorios: false,
        sms_notificaciones: false,
        sms_avisos_urgentes: false,
        fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
        fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = yield this.supabase.from("configuracion_notificaciones").insert([configuracionPorDefecto]).select().single();
      if (error)
        throw error;
      return data;
    });
  }
  /**
   * Crea configuración de avisos por defecto
   */
  crearConfiguracionAvisosPorDefecto() {
    return __async(this, null, function* () {
      const configuracionPorDefecto = {
        tipos_urgencia: ["Baja", "Media", "Alta", "Cr\xEDtica"],
        estados_disponibles: ["Pendiente", "En curso", "Completado", "Cancelado"],
        tiempo_maximo_respuesta: 24,
        asignacion_automatica: false,
        fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
        fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = yield this.supabase.from("configuracion_avisos").insert([configuracionPorDefecto]).select().single();
      if (error)
        throw error;
      return data;
    });
  }
  /**
   * Crea configuración del sistema por defecto
   */
  crearConfiguracionSistemaPorDefecto() {
    return __async(this, null, function* () {
      const configuracionPorDefecto = {
        backup_automatico: true,
        frecuencia_backup: "diario",
        retencion_backup_dias: 30,
        modo_mantenimiento: false,
        mensaje_mantenimiento: "Sistema en mantenimiento. Volveremos pronto.",
        fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
        fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = yield this.supabase.from("configuracion_sistema").insert([configuracionPorDefecto]).select().single();
      if (error)
        throw error;
      return data;
    });
  }
  /**
   * Obtiene el valor actual de ajustes
   */
  getAjustesActuales() {
    return this.ajustesSubject.value;
  }
  /**
   * Limpia el estado de ajustes
   */
  limpiarAjustes() {
    this.ajustesSubject.next(null);
  }
};
_AjustesService.\u0275fac = function AjustesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AjustesService)(\u0275\u0275inject(SupabaseClientService));
};
_AjustesService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AjustesService, factory: _AjustesService.\u0275fac, providedIn: "root" });
var AjustesService = _AjustesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AjustesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SupabaseClientService }], null);
})();

// src/app/modules/ajustes/pages/ajustes/ajustes.component.ts
function AjustesComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7);
    \u0275\u0275element(2, "ion-icon", 8);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando configuraciones...");
    \u0275\u0275elementEnd()()();
  }
}
function AjustesComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10);
    \u0275\u0275element(2, "ion-icon", 11);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 12);
    \u0275\u0275listener("click", function AjustesComponent_div_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onReintentar());
    });
    \u0275\u0275element(6, "ion-icon", 13);
    \u0275\u0275text(7, " Reintentar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function AjustesComponent_div_3_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "El nombre es requerido y debe tener al menos 2 caracteres");
    \u0275\u0275elementEnd()();
  }
}
function AjustesComponent_div_3_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "El CIF es requerido y debe tener al menos 9 caracteres");
    \u0275\u0275elementEnd()();
  }
}
function AjustesComponent_div_3_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "La direcci\xF3n es requerida y debe tener al menos 10 caracteres");
    \u0275\u0275elementEnd()();
  }
}
function AjustesComponent_div_3_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "El tel\xE9fono es requerido y debe tener un formato v\xE1lido");
    \u0275\u0275elementEnd()();
  }
}
function AjustesComponent_div_3_div_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "El email es requerido y debe tener un formato v\xE1lido");
    \u0275\u0275elementEnd()();
  }
}
function AjustesComponent_div_3_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "La URL debe comenzar con http:// o https://");
    \u0275\u0275elementEnd()();
  }
}
function AjustesComponent_div_3_div_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "El IVA debe estar entre 0 y 100");
    \u0275\u0275elementEnd()();
  }
}
function AjustesComponent_div_3_option_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 94);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const moneda_r4 = ctx.$implicit;
    \u0275\u0275property("value", moneda_r4.valor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", moneda_r4.texto, " ");
  }
}
function AjustesComponent_div_3_div_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Los d\xEDas deben estar entre 1 y 365");
    \u0275\u0275elementEnd()();
  }
}
function AjustesComponent_div_3_div_210_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "El tiempo debe estar entre 1 y 168 horas");
    \u0275\u0275elementEnd()();
  }
}
function AjustesComponent_div_3_option_241_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 94);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const frecuencia_r5 = ctx.$implicit;
    \u0275\u0275property("value", frecuencia_r5.valor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", frecuencia_r5.texto, " ");
  }
}
function AjustesComponent_div_3_div_248_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Los d\xEDas deben estar entre 1 y 365");
    \u0275\u0275elementEnd()();
  }
}
function AjustesComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "button", 16);
    \u0275\u0275listener("click", function AjustesComponent_div_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarTab("empresa"));
    });
    \u0275\u0275element(3, "ion-icon", 17);
    \u0275\u0275text(4, " Empresa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 18);
    \u0275\u0275listener("click", function AjustesComponent_div_3_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarTab("facturacion"));
    });
    \u0275\u0275element(6, "ion-icon", 19);
    \u0275\u0275text(7, " Facturaci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 20);
    \u0275\u0275listener("click", function AjustesComponent_div_3_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarTab("notificaciones"));
    });
    \u0275\u0275element(9, "ion-icon", 21);
    \u0275\u0275text(10, " Notificaciones ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 22);
    \u0275\u0275listener("click", function AjustesComponent_div_3_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarTab("avisos"));
    });
    \u0275\u0275element(12, "ion-icon", 23);
    \u0275\u0275text(13, " Avisos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 24);
    \u0275\u0275listener("click", function AjustesComponent_div_3_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarTab("sistema"));
    });
    \u0275\u0275element(15, "ion-icon", 25);
    \u0275\u0275text(16, " Sistema ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 26)(18, "div", 27)(19, "div", 28)(20, "div", 29)(21, "form", 30);
    \u0275\u0275listener("ngSubmit", function AjustesComponent_div_3_Template_form_ngSubmit_21_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guardarEmpresa());
    });
    \u0275\u0275elementStart(22, "div", 31)(23, "div", 32)(24, "label");
    \u0275\u0275text(25, "Nombre de la Empresa *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 33);
    \u0275\u0275element(27, "ion-icon", 17)(28, "input", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, AjustesComponent_div_3_div_29_Template, 4, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 32)(31, "label");
    \u0275\u0275text(32, "CIF/NIF *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 33);
    \u0275\u0275element(34, "ion-icon", 19)(35, "input", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275template(36, AjustesComponent_div_3_div_36_Template, 4, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 37)(38, "label");
    \u0275\u0275text(39, "Direcci\xF3n *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 33);
    \u0275\u0275element(41, "ion-icon", 38)(42, "textarea", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275template(43, AjustesComponent_div_3_div_43_Template, 4, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 32)(45, "label");
    \u0275\u0275text(46, "Tel\xE9fono *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 33);
    \u0275\u0275element(48, "ion-icon", 40)(49, "input", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275template(50, AjustesComponent_div_3_div_50_Template, 4, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 32)(52, "label");
    \u0275\u0275text(53, "Email *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 33);
    \u0275\u0275element(55, "ion-icon", 42)(56, "input", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275template(57, AjustesComponent_div_3_div_57_Template, 4, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 32)(59, "label");
    \u0275\u0275text(60, "Sitio Web");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "div", 33);
    \u0275\u0275element(62, "ion-icon", 44)(63, "input", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275template(64, AjustesComponent_div_3_div_64_Template, 4, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 32)(66, "label");
    \u0275\u0275text(67, "URL del Logo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 33);
    \u0275\u0275element(69, "ion-icon", 46)(70, "input", 47);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(71, "div", 48)(72, "button", 49);
    \u0275\u0275element(73, "ion-icon", 50);
    \u0275\u0275text(74, " Guardar Configuraci\xF3n ");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(75, "div", 51)(76, "div", 28)(77, "div", 29)(78, "form", 30);
    \u0275\u0275listener("ngSubmit", function AjustesComponent_div_3_Template_form_ngSubmit_78_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guardarFacturacion());
    });
    \u0275\u0275elementStart(79, "div", 31)(80, "div", 32)(81, "label");
    \u0275\u0275text(82, "IVA por Defecto (%) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "div", 33);
    \u0275\u0275element(84, "ion-icon", 52)(85, "input", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275template(86, AjustesComponent_div_3_div_86_Template, 4, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "div", 32)(88, "label");
    \u0275\u0275text(89, "Moneda *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "div", 33);
    \u0275\u0275element(91, "ion-icon", 54);
    \u0275\u0275elementStart(92, "select", 55);
    \u0275\u0275template(93, AjustesComponent_div_3_option_93_Template, 2, 2, "option", 56);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(94, "div", 32)(95, "label");
    \u0275\u0275text(96, "Formato N\xFAmero Factura *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "div", 33);
    \u0275\u0275element(98, "ion-icon", 57)(99, "input", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "div", 59);
    \u0275\u0275element(101, "ion-icon", 60);
    \u0275\u0275elementStart(102, "span");
    \u0275\u0275text(103, "Usa YEAR para el a\xF1o y NUMBER para el n\xFAmero secuencial");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(104, "div", 32)(105, "label");
    \u0275\u0275text(106, "D\xEDas de Vencimiento *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "div", 33);
    \u0275\u0275element(108, "ion-icon", 61)(109, "input", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275template(110, AjustesComponent_div_3_div_110_Template, 4, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(111, "div", 37)(112, "label");
    \u0275\u0275text(113, "Texto del Pie de Factura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(114, "div", 33);
    \u0275\u0275element(115, "ion-icon", 63)(116, "textarea", 64);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(117, "div", 37)(118, "label");
    \u0275\u0275text(119, "Condiciones de Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(120, "div", 33);
    \u0275\u0275element(121, "ion-icon", 63)(122, "textarea", 65);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(123, "div", 48)(124, "button", 49);
    \u0275\u0275element(125, "ion-icon", 50);
    \u0275\u0275text(126, " Guardar Configuraci\xF3n ");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(127, "div", 66)(128, "div", 28)(129, "div", 29)(130, "form", 30);
    \u0275\u0275listener("ngSubmit", function AjustesComponent_div_3_Template_form_ngSubmit_130_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guardarNotificaciones());
    });
    \u0275\u0275elementStart(131, "div", 67)(132, "h3");
    \u0275\u0275text(133, "Notificaciones por Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(134, "div", 68)(135, "div", 69)(136, "label");
    \u0275\u0275text(137, "Activar notificaciones por email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(138, "div", 70);
    \u0275\u0275element(139, "input", 71)(140, "span", 72);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(141, "div", 69)(142, "label");
    \u0275\u0275text(143, "Nuevos avisos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(144, "div", 70);
    \u0275\u0275element(145, "input", 73)(146, "span", 72);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(147, "div", 69)(148, "label");
    \u0275\u0275text(149, "Facturas generadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(150, "div", 70);
    \u0275\u0275element(151, "input", 74)(152, "span", 72);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(153, "div", 69)(154, "label");
    \u0275\u0275text(155, "Recordatorios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(156, "div", 70);
    \u0275\u0275element(157, "input", 75)(158, "span", 72);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(159, "div", 67)(160, "h3");
    \u0275\u0275text(161, "Notificaciones por SMS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(162, "div", 68)(163, "div", 69)(164, "label");
    \u0275\u0275text(165, "Activar notificaciones por SMS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(166, "div", 70);
    \u0275\u0275element(167, "input", 76)(168, "span", 72);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(169, "div", 69)(170, "label");
    \u0275\u0275text(171, "Avisos urgentes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(172, "div", 70);
    \u0275\u0275element(173, "input", 77)(174, "span", 72);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(175, "div", 48)(176, "button", 49);
    \u0275\u0275element(177, "ion-icon", 50);
    \u0275\u0275text(178, " Guardar Configuraci\xF3n ");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(179, "div", 78)(180, "div", 28)(181, "div", 29)(182, "form", 30);
    \u0275\u0275listener("ngSubmit", function AjustesComponent_div_3_Template_form_ngSubmit_182_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guardarAvisos());
    });
    \u0275\u0275elementStart(183, "div", 31)(184, "div", 32)(185, "label");
    \u0275\u0275text(186, "Tipos de Urgencia *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(187, "div", 33);
    \u0275\u0275element(188, "ion-icon", 11)(189, "textarea", 79);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(190, "div", 59);
    \u0275\u0275element(191, "ion-icon", 60);
    \u0275\u0275elementStart(192, "span");
    \u0275\u0275text(193, "Separa los tipos con comas");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(194, "div", 32)(195, "label");
    \u0275\u0275text(196, "Estados Disponibles *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(197, "div", 33);
    \u0275\u0275element(198, "ion-icon", 80)(199, "textarea", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(200, "div", 59);
    \u0275\u0275element(201, "ion-icon", 60);
    \u0275\u0275elementStart(202, "span");
    \u0275\u0275text(203, "Separa los estados con comas");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(204, "div", 32)(205, "label");
    \u0275\u0275text(206, "Tiempo M\xE1ximo de Respuesta (horas) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(207, "div", 33);
    \u0275\u0275element(208, "ion-icon", 82)(209, "input", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275template(210, AjustesComponent_div_3_div_210_Template, 4, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(211, "div", 32)(212, "label");
    \u0275\u0275text(213, "Asignaci\xF3n Autom\xE1tica de T\xE9cnicos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(214, "div", 70);
    \u0275\u0275element(215, "input", 84)(216, "span", 72);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(217, "div", 48)(218, "button", 49);
    \u0275\u0275element(219, "ion-icon", 50);
    \u0275\u0275text(220, " Guardar Configuraci\xF3n ");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(221, "div", 85)(222, "div", 28)(223, "div", 29)(224, "form", 30);
    \u0275\u0275listener("ngSubmit", function AjustesComponent_div_3_Template_form_ngSubmit_224_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guardarSistema());
    });
    \u0275\u0275elementStart(225, "div", 31)(226, "div", 86)(227, "h3");
    \u0275\u0275text(228, "Configuraci\xF3n de Backup");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(229, "div", 69)(230, "label");
    \u0275\u0275text(231, "Backup Autom\xE1tico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(232, "div", 70);
    \u0275\u0275element(233, "input", 87)(234, "span", 72);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(235, "div", 32)(236, "label");
    \u0275\u0275text(237, "Frecuencia de Backup *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(238, "div", 33);
    \u0275\u0275element(239, "ion-icon", 13);
    \u0275\u0275elementStart(240, "select", 88);
    \u0275\u0275template(241, AjustesComponent_div_3_option_241_Template, 2, 2, "option", 56);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(242, "div", 32)(243, "label");
    \u0275\u0275text(244, "Retenci\xF3n de Backups (d\xEDas) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(245, "div", 33);
    \u0275\u0275element(246, "ion-icon", 61)(247, "input", 89);
    \u0275\u0275elementEnd();
    \u0275\u0275template(248, AjustesComponent_div_3_div_248_Template, 4, 0, "div", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(249, "div", 90)(250, "h3");
    \u0275\u0275text(251, "Modo Mantenimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(252, "div", 69)(253, "label");
    \u0275\u0275text(254, "Activar Modo Mantenimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(255, "div", 70);
    \u0275\u0275element(256, "input", 91)(257, "span", 72);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(258, "div", 37)(259, "label");
    \u0275\u0275text(260, "Mensaje de Mantenimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(261, "div", 33);
    \u0275\u0275element(262, "ion-icon", 92)(263, "textarea", 93);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(264, "div", 48)(265, "button", 49);
    \u0275\u0275element(266, "ion-icon", 50);
    \u0275\u0275text(267, " Guardar Configuraci\xF3n ");
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(21);
    \u0275\u0275property("formGroup", ctx_r1.empresaForm);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("error", ctx_r1.empresaFormErrors.nombre_empresa);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.empresaFormErrors.nombre_empresa);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.empresaFormErrors.cif);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.empresaFormErrors.cif);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.empresaFormErrors.direccion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.empresaFormErrors.direccion);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.empresaFormErrors.telefono);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.empresaFormErrors.telefono);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.empresaFormErrors.email);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.empresaFormErrors.email);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.empresaFormErrors.web);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.empresaFormErrors.web);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.empresaForm.invalid || ctx_r1.loading);
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r1.facturacionForm);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("error", ctx_r1.facturacionFormErrors.iva_por_defecto);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.facturacionFormErrors.iva_por_defecto);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.monedas);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.facturacionFormErrors.formato_numero_factura);
    \u0275\u0275advance(10);
    \u0275\u0275classProp("error", ctx_r1.facturacionFormErrors.dias_vencimiento);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.facturacionFormErrors.dias_vencimiento);
    \u0275\u0275advance(14);
    \u0275\u0275property("disabled", ctx_r1.facturacionForm.invalid || ctx_r1.loading);
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r1.notificacionesForm);
    \u0275\u0275advance(46);
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r1.avisosForm);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("error", ctx_r1.avisosFormErrors.tipos_urgencia);
    \u0275\u0275advance(10);
    \u0275\u0275classProp("error", ctx_r1.avisosFormErrors.estados_disponibles);
    \u0275\u0275advance(10);
    \u0275\u0275classProp("error", ctx_r1.avisosFormErrors.tiempo_maximo_respuesta);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.avisosFormErrors.tiempo_maximo_respuesta);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.avisosForm.invalid || ctx_r1.loading);
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r1.sistemaForm);
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", ctx_r1.frecuenciasBackup);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.sistemaFormErrors.retencion_backup_dias);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.sistemaFormErrors.retencion_backup_dias);
    \u0275\u0275advance(17);
    \u0275\u0275property("disabled", ctx_r1.sistemaForm.invalid || ctx_r1.loading);
  }
}
function AjustesComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 95);
    \u0275\u0275element(1, "ion-icon", 96);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 97);
    \u0275\u0275listener("click", function AjustesComponent_div_4_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mostrarExito = false);
    });
    \u0275\u0275element(5, "ion-icon", 98);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.mensajeExito);
  }
}
function AjustesComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 97);
    \u0275\u0275listener("click", function AjustesComponent_div_5_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mostrarError = false);
    });
    \u0275\u0275element(5, "ion-icon", 98);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
var _AjustesComponent = class _AjustesComponent {
  constructor(ajustesService, formBuilder) {
    this.ajustesService = ajustesService;
    this.formBuilder = formBuilder;
    this.ajustes = null;
    this.loading = false;
    this.error = "";
    this.mensajeExito = "";
    this.mostrarExito = false;
    this.mostrarError = false;
    this.tabActivo = "empresa";
    this.empresaForm = new FormGroup({});
    this.facturacionForm = new FormGroup({});
    this.notificacionesForm = new FormGroup({});
    this.avisosForm = new FormGroup({});
    this.sistemaForm = new FormGroup({});
    this.monedas = [
      { valor: "EUR", texto: "Euro (\u20AC)" },
      { valor: "USD", texto: "D\xF3lar ($)" },
      { valor: "GBP", texto: "Libra (\xA3)" }
    ];
    this.frecuenciasBackup = [
      { valor: "diario", texto: "Diario" },
      { valor: "semanal", texto: "Semanal" },
      { valor: "mensual", texto: "Mensual" }
    ];
    this.destroy$ = new Subject();
    addIcons({ settingsOutline, refreshOutline, alertCircleOutline, businessOutline, cardOutline, notificationsOutline, warningOutline, cogOutline, locationOutline, callOutline, mailOutline, globeOutline, imageOutline, saveOutline, calculatorOutline, cashOutline, documentTextOutline, informationCircleOutline, calendarOutline, documentOutline, listOutline, timeOutline, constructOutline, checkmarkCircleOutline, closeOutline, shieldCheckmarkOutline, serverOutline });
    this.inicializarFormularios();
  }
  ngOnInit() {
    this.cargarAjustes();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  inicializarFormularios() {
    this.empresaForm = this.formBuilder.group({
      nombre_empresa: ["", [Validators.required, Validators.minLength(2)]],
      cif: ["", [Validators.required, Validators.minLength(9)]],
      direccion: ["", [Validators.required, Validators.minLength(10)]],
      telefono: ["", [Validators.required, Validators.pattern(/^[+]?[\d\s\-\(\)]+$/)]],
      email: ["", [Validators.required, Validators.email]],
      web: ["", [Validators.pattern(/^https?:\/\/.+/)]],
      logo_url: [""]
    });
    this.facturacionForm = this.formBuilder.group({
      iva_por_defecto: [21, [Validators.required, Validators.min(0), Validators.max(100)]],
      moneda: ["EUR", [Validators.required]],
      formato_numero_factura: ["FAC-{YEAR}-{NUMBER}", [Validators.required]],
      dias_vencimiento: [30, [Validators.required, Validators.min(1), Validators.max(365)]],
      texto_pie_factura: [""],
      condiciones_pago: [""]
    });
    this.notificacionesForm = this.formBuilder.group({
      email_notificaciones: [true],
      email_avisos_nuevos: [true],
      email_facturas_generadas: [true],
      email_recordatorios: [false],
      sms_notificaciones: [false],
      sms_avisos_urgentes: [false]
    });
    this.avisosForm = this.formBuilder.group({
      tipos_urgencia: [["Baja", "Media", "Alta", "Cr\xEDtica"], [Validators.required]],
      estados_disponibles: [["Pendiente", "En curso", "Completado", "Cancelado"], [Validators.required]],
      tiempo_maximo_respuesta: [24, [Validators.required, Validators.min(1), Validators.max(168)]],
      asignacion_automatica: [false]
    });
    this.sistemaForm = this.formBuilder.group({
      backup_automatico: [true],
      frecuencia_backup: ["diario", [Validators.required]],
      retencion_backup_dias: [30, [Validators.required, Validators.min(1), Validators.max(365)]],
      modo_mantenimiento: [false],
      mensaje_mantenimiento: [""]
    });
  }
  cargarAjustes() {
    this.loading = true;
    this.error = "";
    this.ajustesService.getAjustesCompletos().pipe(takeUntil(this.destroy$)).subscribe({
      next: (ajustes) => {
        this.ajustes = ajustes;
        this.cargarDatosEnFormularios();
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar ajustes:", error);
        this.error = "Error al cargar los ajustes. Por favor, intenta de nuevo.";
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }
  cargarDatosEnFormularios() {
    if (!this.ajustes)
      return;
    this.empresaForm.patchValue({
      nombre_empresa: this.ajustes.empresa.nombre_empresa,
      cif: this.ajustes.empresa.cif,
      direccion: this.ajustes.empresa.direccion,
      telefono: this.ajustes.empresa.telefono,
      email: this.ajustes.empresa.email,
      web: this.ajustes.empresa.web || "",
      logo_url: this.ajustes.empresa.logo_url || ""
    });
    this.facturacionForm.patchValue({
      iva_por_defecto: this.ajustes.facturacion.iva_por_defecto,
      moneda: this.ajustes.facturacion.moneda,
      formato_numero_factura: this.ajustes.facturacion.formato_numero_factura,
      dias_vencimiento: this.ajustes.facturacion.dias_vencimiento,
      texto_pie_factura: this.ajustes.facturacion.texto_pie_factura || "",
      condiciones_pago: this.ajustes.facturacion.condiciones_pago || ""
    });
    this.notificacionesForm.patchValue({
      email_notificaciones: this.ajustes.notificaciones.email_notificaciones,
      email_avisos_nuevos: this.ajustes.notificaciones.email_avisos_nuevos,
      email_facturas_generadas: this.ajustes.notificaciones.email_facturas_generadas,
      email_recordatorios: this.ajustes.notificaciones.email_recordatorios,
      sms_notificaciones: this.ajustes.notificaciones.sms_notificaciones,
      sms_avisos_urgentes: this.ajustes.notificaciones.sms_avisos_urgentes
    });
    this.avisosForm.patchValue({
      tipos_urgencia: this.ajustes.avisos.tipos_urgencia,
      estados_disponibles: this.ajustes.avisos.estados_disponibles,
      tiempo_maximo_respuesta: this.ajustes.avisos.tiempo_maximo_respuesta,
      asignacion_automatica: this.ajustes.avisos.asignacion_automatica
    });
    this.sistemaForm.patchValue({
      backup_automatico: this.ajustes.sistema.backup_automatico,
      frecuencia_backup: this.ajustes.sistema.frecuencia_backup,
      retencion_backup_dias: this.ajustes.sistema.retencion_backup_dias,
      modo_mantenimiento: this.ajustes.sistema.modo_mantenimiento,
      mensaje_mantenimiento: this.ajustes.sistema.mensaje_mantenimiento || ""
    });
  }
  guardarEmpresa() {
    if (this.empresaForm.invalid)
      return;
    this.loading = true;
    this.error = "";
    this.ajustesService.actualizarConfiguracionEmpresa(this.empresaForm.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.mensajeExito = "Configuraci\xF3n de empresa actualizada correctamente";
        this.mostrarExito = true;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al actualizar empresa:", error);
        this.error = "Error al actualizar la configuraci\xF3n de empresa";
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }
  guardarFacturacion() {
    if (this.facturacionForm.invalid)
      return;
    this.loading = true;
    this.error = "";
    this.ajustesService.actualizarConfiguracionFacturacion(this.facturacionForm.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.mensajeExito = "Configuraci\xF3n de facturaci\xF3n actualizada correctamente";
        this.mostrarExito = true;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al actualizar facturaci\xF3n:", error);
        this.error = "Error al actualizar la configuraci\xF3n de facturaci\xF3n";
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }
  guardarNotificaciones() {
    this.loading = true;
    this.error = "";
    this.ajustesService.actualizarConfiguracionNotificaciones(this.notificacionesForm.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.mensajeExito = "Configuraci\xF3n de notificaciones actualizada correctamente";
        this.mostrarExito = true;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al actualizar notificaciones:", error);
        this.error = "Error al actualizar la configuraci\xF3n de notificaciones";
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }
  guardarAvisos() {
    if (this.avisosForm.invalid)
      return;
    this.loading = true;
    this.error = "";
    this.ajustesService.actualizarConfiguracionAvisos(this.avisosForm.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.mensajeExito = "Configuraci\xF3n de avisos actualizada correctamente";
        this.mostrarExito = true;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al actualizar avisos:", error);
        this.error = "Error al actualizar la configuraci\xF3n de avisos";
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }
  guardarSistema() {
    if (this.sistemaForm.invalid)
      return;
    this.loading = true;
    this.error = "";
    this.ajustesService.actualizarConfiguracionSistema(this.sistemaForm.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.mensajeExito = "Configuraci\xF3n del sistema actualizada correctamente";
        this.mostrarExito = true;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al actualizar sistema:", error);
        this.error = "Error al actualizar la configuraci\xF3n del sistema";
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }
  onReintentar() {
    this.cargarAjustes();
  }
  cambiarTab(tab) {
    this.tabActivo = tab;
    const buttons = document.querySelectorAll(".tab-button");
    buttons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-tab") === tab) {
        btn.classList.add("active");
      }
    });
    const panels = document.querySelectorAll(".tab-panel");
    panels.forEach((panel) => {
      panel.classList.remove("active");
      if (panel.id === tab) {
        panel.classList.add("active");
      }
    });
  }
  // Métodos helper para el template
  getMonedaTexto(valor) {
    const moneda = this.monedas.find((m) => m.valor === valor);
    return moneda ? moneda.texto : valor;
  }
  getFrecuenciaTexto(valor) {
    const frecuencia = this.frecuenciasBackup.find((f) => f.valor === valor);
    return frecuencia ? frecuencia.texto : valor;
  }
  // Validaciones de formularios
  get empresaFormErrors() {
    var _a, _b, _c, _d, _e, _f;
    return {
      nombre_empresa: (_a = this.empresaForm.get("nombre_empresa")) == null ? void 0 : _a.errors,
      cif: (_b = this.empresaForm.get("cif")) == null ? void 0 : _b.errors,
      direccion: (_c = this.empresaForm.get("direccion")) == null ? void 0 : _c.errors,
      telefono: (_d = this.empresaForm.get("telefono")) == null ? void 0 : _d.errors,
      email: (_e = this.empresaForm.get("email")) == null ? void 0 : _e.errors,
      web: (_f = this.empresaForm.get("web")) == null ? void 0 : _f.errors
    };
  }
  get facturacionFormErrors() {
    var _a, _b, _c;
    return {
      iva_por_defecto: (_a = this.facturacionForm.get("iva_por_defecto")) == null ? void 0 : _a.errors,
      formato_numero_factura: (_b = this.facturacionForm.get("formato_numero_factura")) == null ? void 0 : _b.errors,
      dias_vencimiento: (_c = this.facturacionForm.get("dias_vencimiento")) == null ? void 0 : _c.errors
    };
  }
  get avisosFormErrors() {
    var _a, _b, _c;
    return {
      tipos_urgencia: (_a = this.avisosForm.get("tipos_urgencia")) == null ? void 0 : _a.errors,
      estados_disponibles: (_b = this.avisosForm.get("estados_disponibles")) == null ? void 0 : _b.errors,
      tiempo_maximo_respuesta: (_c = this.avisosForm.get("tiempo_maximo_respuesta")) == null ? void 0 : _c.errors
    };
  }
  get sistemaFormErrors() {
    var _a;
    return {
      retencion_backup_dias: (_a = this.sistemaForm.get("retencion_backup_dias")) == null ? void 0 : _a.errors
    };
  }
};
_AjustesComponent.\u0275fac = function AjustesComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AjustesComponent)(\u0275\u0275directiveInject(AjustesService), \u0275\u0275directiveInject(FormBuilder));
};
_AjustesComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AjustesComponent, selectors: [["app-ajustes"]], decls: 6, vars: 5, consts: [[1, "ajustes-container"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "ajustes-content", 4, "ngIf"], ["class", "toast toast-success", 4, "ngIf"], ["class", "toast toast-error", 4, "ngIf"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "error-state"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "ajustes-content"], [1, "tabs-navigation"], ["data-tab", "empresa", 1, "tab-button", "active", 3, "click"], ["name", "business-outline"], ["data-tab", "facturacion", 1, "tab-button", 3, "click"], ["name", "card-outline"], ["data-tab", "notificaciones", 1, "tab-button", 3, "click"], ["name", "notifications-outline"], ["data-tab", "avisos", 1, "tab-button", 3, "click"], ["name", "warning-outline"], ["data-tab", "sistema", 1, "tab-button", 3, "click"], ["name", "cog-outline"], [1, "tab-content"], ["id", "empresa", 1, "tab-panel", "active"], [1, "config-card"], [1, "card-content"], [3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "form-group"], [1, "input-container"], ["type", "text", "formControlName", "nombre_empresa", "placeholder", "Ej: Mi Empresa S.L."], ["class", "error-message", 4, "ngIf"], ["type", "text", "formControlName", "cif", "placeholder", "Ej: B12345678"], [1, "form-group", "full-width"], ["name", "location-outline"], ["formControlName", "direccion", "placeholder", "Direcci\xF3n completa de la empresa", "rows", "3"], ["name", "call-outline"], ["type", "tel", "formControlName", "telefono", "placeholder", "Ej: +34 123 456 789"], ["name", "mail-outline"], ["type", "email", "formControlName", "email", "placeholder", "info@miempresa.com"], ["name", "globe-outline"], ["type", "url", "formControlName", "web", "placeholder", "https://www.miempresa.com"], ["name", "image-outline"], ["type", "url", "formControlName", "logo_url", "placeholder", "https://ejemplo.com/logo.png"], [1, "form-actions"], ["type", "submit", 1, "btn-save", 3, "disabled"], ["name", "save-outline"], ["id", "facturacion", 1, "tab-panel"], ["name", "calculator-outline"], ["type", "number", "formControlName", "iva_por_defecto", "min", "0", "max", "100"], ["name", "cash-outline"], ["formControlName", "moneda"], [3, "value", 4, "ngFor", "ngForOf"], ["name", "document-text-outline"], ["type", "text", "formControlName", "formato_numero_factura", "placeholder", "Ej: FAC-YEAR-NUMBER"], [1, "help-text"], ["name", "information-circle-outline"], ["name", "calendar-outline"], ["type", "number", "formControlName", "dias_vencimiento", "min", "1", "max", "365"], ["name", "document-outline"], ["formControlName", "texto_pie_factura", "placeholder", "Mensaje que aparecer\xE1 al final de las facturas", "rows", "3"], ["formControlName", "condiciones_pago", "placeholder", "Condiciones de pago por defecto", "rows", "2"], ["id", "notificaciones", 1, "tab-panel"], [1, "notifications-section"], [1, "toggle-group"], [1, "toggle-item"], [1, "toggle-switch"], ["type", "checkbox", "formControlName", "email_notificaciones"], [1, "slider"], ["type", "checkbox", "formControlName", "email_avisos_nuevos"], ["type", "checkbox", "formControlName", "email_facturas_generadas"], ["type", "checkbox", "formControlName", "email_recordatorios"], ["type", "checkbox", "formControlName", "sms_notificaciones"], ["type", "checkbox", "formControlName", "sms_avisos_urgentes"], ["id", "avisos", 1, "tab-panel"], ["formControlName", "tipos_urgencia", "placeholder", "Baja, Media, Alta, Cr\xEDtica", "rows", "2"], ["name", "list-outline"], ["formControlName", "estados_disponibles", "placeholder", "Pendiente, En curso, Completado, Cancelado", "rows", "2"], ["name", "time-outline"], ["type", "number", "formControlName", "tiempo_maximo_respuesta", "min", "1", "max", "168"], ["type", "checkbox", "formControlName", "asignacion_automatica"], ["id", "sistema", 1, "tab-panel"], [1, "backup-section"], ["type", "checkbox", "formControlName", "backup_automatico"], ["formControlName", "frecuencia_backup"], ["type", "number", "formControlName", "retencion_backup_dias", "min", "1", "max", "365"], [1, "maintenance-section"], ["type", "checkbox", "formControlName", "modo_mantenimiento"], ["name", "construct-outline"], ["formControlName", "mensaje_mantenimiento", "placeholder", "Mensaje que ver\xE1n los usuarios durante el mantenimiento", "rows", "3"], [3, "value"], [1, "toast", "toast-success"], ["name", "checkmark-circle-outline"], [1, "toast-close", 3, "click"], ["name", "close-outline"], [1, "toast", "toast-error"]], template: function AjustesComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275template(1, AjustesComponent_div_1_Template, 5, 0, "div", 1)(2, AjustesComponent_div_2_Template, 8, 1, "div", 2)(3, AjustesComponent_div_3_Template, 268, 48, "div", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AjustesComponent_div_4_Template, 6, 1, "div", 4)(5, AjustesComponent_div_5_Template, 6, 1, "div", 5);
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.ajustes);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.mostrarExito);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.mostrarError);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, ReactiveFormsModule, FormGroupDirective, FormControlName, IonIcon], styles: [`

ion-content[_ngcontent-%COMP%] {
  --background: #FFF;
}
.ajustes-container[_ngcontent-%COMP%] {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.ajustes-header[_ngcontent-%COMP%] {
  margin-bottom: 32px;
  padding: 24px;
  background:
    linear-gradient(
      135deg,
      #4F46E5 0%,
      #6366F1 100%);
  border-radius: 16px;
  color: white;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
}
.ajustes-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.ajustes-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 32px;
  color: white;
}
.ajustes-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: white;
}
.ajustes-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-description[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.5;
}
.loading-state[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #64748b;
}
.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  color: #4F46E5;
}
.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}
.error-state[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  color: #EF4444;
  max-width: 400px;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #EF4444;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  color: #EF4444;
  border: 1px solid #EF4444;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]:hover {
  background: #EF4444;
  color: white;
}
.ajustes-content[_ngcontent-%COMP%]   .tabs-navigation[_ngcontent-%COMP%] {
  display: flex;
  background: #fff;
  border-radius: 12px 12px 0 0;
  border: 1px solid #E2E8F0;
  border-bottom: none;
  margin-bottom: 0;
  overflow-x: auto;
}
.ajustes-content[_ngcontent-%COMP%]   .tabs-navigation[_ngcontent-%COMP%]   .tab-button[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  padding: 16px 24px;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.ajustes-content[_ngcontent-%COMP%]   .tabs-navigation[_ngcontent-%COMP%]   .tab-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.ajustes-content[_ngcontent-%COMP%]   .tabs-navigation[_ngcontent-%COMP%]   .tab-button.active[_ngcontent-%COMP%] {
  color: #4F46E5;
  background: #FAFBFF;
  border-bottom: 3px solid #4F46E5;
}
.ajustes-content[_ngcontent-%COMP%]   .tabs-navigation[_ngcontent-%COMP%]   .tab-button[_ngcontent-%COMP%]:hover {
  background: #FAFBFF;
  color: #4F46E5;
}
.ajustes-content[_ngcontent-%COMP%]   .tabs-navigation[_ngcontent-%COMP%]   .tab-button[_ngcontent-%COMP%]:focus {
  outline: none;
}
.ajustes-content[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%] {
  background: #fff;
  border-top: none;
  border-radius: 0 0 12px 12px;
  min-height: 600px;
}
.ajustes-content[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%]   .tab-panel[_ngcontent-%COMP%] {
  display: none;
}
.ajustes-content[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%]   .tab-panel.active[_ngcontent-%COMP%] {
  display: block;
}
.config-card[_ngcontent-%COMP%] {
  margin: 0;
  border-radius: 12px;
  padding: 20px;
}
.config-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  border-bottom: 1px solid #E2E8F0;
  border-radius: 12px 12px 0 0;
}
.config-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #26262A;
}
.config-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
  color: #4F46E5;
}
.config-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
}
.config-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {
  padding: 24px;
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}
.form-grid[_ngcontent-%COMP%]   .form-group.full-width[_ngcontent-%COMP%] {
  grid-column: 1/-1;
}
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  color: #26262A;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
}
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%] {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background: #fff;
  transition: all 0.2s ease;
}
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container.error[_ngcontent-%COMP%] {
  border-color: #EF4444;
  background: rgba(239, 68, 68, 0.05);
}
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]:focus-within {
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  position: absolute;
  left: 12px;
  color: #ACACAC;
  font-size: 18px;
  z-index: 1;
}
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], 
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], 
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: none;
  background: transparent;
  color: #26262A;
  font-size: 14px;
  outline: none;
}
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   input.error[_ngcontent-%COMP%], 
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   textarea.error[_ngcontent-%COMP%], 
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   select.error[_ngcontent-%COMP%] {
  color: #EF4444;
}
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, 
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder, 
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder {
  color: #ACACAC;
}
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 80px;
  padding-top: 12px;
  padding-bottom: 12px;
}
.form-grid[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
}
.error-message[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  color: #EF4444;
  font-size: 12px;
}
.error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
  flex-shrink: 0;
}
.error-message[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  line-height: 1.4;
}
.help-text[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  color: #64748b;
  font-size: 12px;
}
.help-text[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
  flex-shrink: 0;
}
.help-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  line-height: 1.4;
}
.form-actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
  border-top: 1px solid #F1F5F9;
}
.form-actions[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.form-actions[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.form-actions[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.form-actions[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]:disabled {
  background: #ACACAC;
  color: white;
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.form-actions[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]:active {
  transform: translateY(0);
}
.notifications-section[_ngcontent-%COMP%] {
  margin-bottom: 32px;
}
.notifications-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  color: #26262A;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #F1F5F9;
}
.notifications-section[_ngcontent-%COMP%]   .toggle-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.notifications-section[_ngcontent-%COMP%]   .toggle-group[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}
.notifications-section[_ngcontent-%COMP%]   .toggle-group[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #26262A;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin: 0;
}
.notifications-section[_ngcontent-%COMP%]   .toggle-group[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%] {
  position: relative;
  width: 50px;
  height: 24px;
}
.notifications-section[_ngcontent-%COMP%]   .toggle-group[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  opacity: 0;
  width: 0;
  height: 0;
}
.notifications-section[_ngcontent-%COMP%]   .toggle-group[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%] {
  background-color: #4F46E5;
}
.notifications-section[_ngcontent-%COMP%]   .toggle-group[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%]:before {
  transform: translateX(26px);
}
.notifications-section[_ngcontent-%COMP%]   .toggle-group[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   .slider[_ngcontent-%COMP%] {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E2E8F0;
  transition: 0.3s;
  border-radius: 24px;
}
.notifications-section[_ngcontent-%COMP%]   .toggle-group[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   .slider[_ngcontent-%COMP%]:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.backup-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], 
.maintenance-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  color: #26262A;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #F1F5F9;
}
.backup-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%], 
.maintenance-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  margin-bottom: 16px;
}
.backup-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], 
.maintenance-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #26262A;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin: 0;
}
.backup-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%], 
.maintenance-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%] {
  position: relative;
  width: 50px;
  height: 24px;
}
.backup-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], 
.maintenance-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  opacity: 0;
  width: 0;
  height: 0;
}
.backup-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%], 
.maintenance-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%] {
  background-color: #4F46E5;
}
.backup-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%]:before, 
.maintenance-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%]:before {
  transform: translateX(26px);
}
.backup-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   .slider[_ngcontent-%COMP%], 
.maintenance-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   .slider[_ngcontent-%COMP%] {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E2E8F0;
  transition: 0.3s;
  border-radius: 24px;
}
.backup-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   .slider[_ngcontent-%COMP%]:before, 
.maintenance-section[_ngcontent-%COMP%]   .toggle-item[_ngcontent-%COMP%]   .toggle-switch[_ngcontent-%COMP%]   .slider[_ngcontent-%COMP%]:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
@media (max-width: 768px) {
  .ajustes-container[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .ajustes-header[_ngcontent-%COMP%] {
    padding: 20px;
    margin-bottom: 24px;
  }
  .ajustes-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
    font-size: 24px;
  }
  .ajustes-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 28px;
  }
  .ajustes-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-description[_ngcontent-%COMP%] {
    font-size: 14px;
  }
  .tab-content[_ngcontent-%COMP%] {
    padding: 0px;
  }
  .config-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {
    padding: 20px;
  }
  .config-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
    font-size: 18px;
  }
  .config-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 20px;
  }
  .config-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {
    padding: 20px;
  }
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .ajustes-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-group .mat-mdc-tab-header .mat-mdc-tab-label-container .mat-mdc-tab-label {
    min-width: 100px;
    padding: 12px 16px;
    font-size: 14px;
  }
}
@media (max-width: 480px) {
  .ajustes-container[_ngcontent-%COMP%] {
    padding: 12px;
  }
  .ajustes-header[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .ajustes-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  .ajustes-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
    font-size: 20px;
  }
  .tab-content[_ngcontent-%COMP%] {
    padding: 0px;
  }
  .config-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .config-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {
    font-size: 16px;
  }
  .config-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 18px;
  }
  .config-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .form-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {
    width: 100%;
    --padding-start: 16px;
    --padding-end: 16px;
  }
}
.toast[_ngcontent-%COMP%] {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 400px;
  animation: _ngcontent-%COMP%_slideIn 0.3s ease;
}
.toast[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
  flex-shrink: 0;
}
.toast[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}
.toast[_ngcontent-%COMP%]   .toast-close[_ngcontent-%COMP%] {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s ease;
}
.toast[_ngcontent-%COMP%]   .toast-close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.toast[_ngcontent-%COMP%]   .toast-close[_ngcontent-%COMP%]:hover {
  background: rgba(255, 255, 255, 0.2);
}
.toast.toast-success[_ngcontent-%COMP%] {
  background: #10B981;
  color: white;
}
.toast.toast-error[_ngcontent-%COMP%] {
  background: #EF4444;
  color: white;
}
@keyframes _ngcontent-%COMP%_slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.form-item[_ngcontent-%COMP%] {
  transition: all 0.2s ease;
}
.form-item[_ngcontent-%COMP%]:focus-within {
  --border-color: $primary-color;
  --background: rgba(79, 70, 229, 0.02);
}
ion-textarea[_ngcontent-%COMP%]     textarea {
  scrollbar-width: thin;
  scrollbar-color: #E2E8F0 transparent;
}
ion-textarea[_ngcontent-%COMP%]     textarea::-webkit-scrollbar {
  width: 6px;
}
ion-textarea[_ngcontent-%COMP%]     textarea::-webkit-scrollbar-track {
  background: transparent;
}
ion-textarea[_ngcontent-%COMP%]     textarea::-webkit-scrollbar-thumb {
  background-color: #E2E8F0;
  border-radius: 3px;
}
/*# sourceMappingURL=ajustes.component.css.map */`] });
var AjustesComponent = _AjustesComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AjustesComponent, [{
    type: Component,
    args: [{ selector: "app-ajustes", standalone: true, imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      IonIcon
    ], template: `<div class="ajustes-container">\r
  <!-- Header -->\r
  <!-- <div class="ajustes-header">\r
    <div class="header-content">\r
      <div class="header-title">\r
        <ion-icon name="settings-outline"></ion-icon>\r
        <h1>Configuraci\xF3n del Sistema</h1>\r
      </div>\r
      <p class="header-description">\r
        Gestiona todas las configuraciones de tu aplicaci\xF3n desde un solo lugar\r
      </p>\r
    </div>\r
  </div> -->\r
\r
  <!-- Loading State -->\r
  <div *ngIf="loading" class="loading-state">\r
    <div class="loading-spinner">\r
      <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
      <p>Cargando configuraciones...</p>\r
    </div>\r
  </div>\r
\r
  <!-- Error State -->\r
  <div *ngIf="error && !loading" class="error-state">\r
    <div class="error-message">\r
      <ion-icon name="alert-circle-outline"></ion-icon>\r
      <p>{{ error }}</p>\r
      <button class="btn-retry" (click)="onReintentar()">\r
        <ion-icon name="refresh-outline"></ion-icon>\r
        Reintentar\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Content -->\r
  <div *ngIf="!loading && !error && ajustes" class="ajustes-content">\r
    <!-- Tabs Navigation -->\r
    <div class="tabs-navigation">\r
      <button \r
        class="tab-button active" \r
        data-tab="empresa"\r
        (click)="cambiarTab('empresa')">\r
        <ion-icon name="business-outline"></ion-icon>\r
        Empresa\r
      </button>\r
      <button \r
        class="tab-button" \r
        data-tab="facturacion"\r
        (click)="cambiarTab('facturacion')">\r
        <ion-icon name="card-outline"></ion-icon>\r
        Facturaci\xF3n\r
      </button>\r
      <button \r
        class="tab-button" \r
        data-tab="notificaciones"\r
        (click)="cambiarTab('notificaciones')">\r
        <ion-icon name="notifications-outline"></ion-icon>\r
        Notificaciones\r
      </button>\r
      <button \r
        class="tab-button" \r
        data-tab="avisos"\r
        (click)="cambiarTab('avisos')">\r
        <ion-icon name="warning-outline"></ion-icon>\r
        Avisos\r
      </button>\r
      <button \r
        class="tab-button" \r
        data-tab="sistema"\r
        (click)="cambiarTab('sistema')">\r
        <ion-icon name="cog-outline"></ion-icon>\r
        Sistema\r
      </button>\r
    </div>\r
\r
    <!-- Tab Content -->\r
    <div class="tab-content">\r
      \r
      <!-- Pesta\xF1a Empresa -->\r
      <div id="empresa" class="tab-panel active">\r
        <div class="config-card">\r
          <!-- <div class="card-header">\r
            <div class="card-title">\r
              <ion-icon name="business-outline"></ion-icon>\r
              Informaci\xF3n de la Empresa\r
            </div>\r
            <p>Configura los datos de tu empresa que aparecer\xE1n en facturas y documentos</p>\r
          </div> -->\r
          <div class="card-content">\r
            <form [formGroup]="empresaForm" (ngSubmit)="guardarEmpresa()">\r
              <div class="form-grid">\r
                <div class="form-group">\r
                  <label>Nombre de la Empresa *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="business-outline"></ion-icon>\r
                    <input \r
                      type="text" \r
                      formControlName="nombre_empresa" \r
                      placeholder="Ej: Mi Empresa S.L."\r
                      [class.error]="empresaFormErrors.nombre_empresa">\r
                  </div>\r
                  <div *ngIf="empresaFormErrors.nombre_empresa" class="error-message">\r
                    <ion-icon name="alert-circle-outline"></ion-icon>\r
                    <span>El nombre es requerido y debe tener al menos 2 caracteres</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label>CIF/NIF *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="card-outline"></ion-icon>\r
                    <input \r
                      type="text" \r
                      formControlName="cif" \r
                      placeholder="Ej: B12345678"\r
                      [class.error]="empresaFormErrors.cif">\r
                  </div>\r
                  <div *ngIf="empresaFormErrors.cif" class="error-message">\r
                    <ion-icon name="alert-circle-outline"></ion-icon>\r
                    <span>El CIF es requerido y debe tener al menos 9 caracteres</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group full-width">\r
                  <label>Direcci\xF3n *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="location-outline"></ion-icon>\r
                    <textarea \r
                      formControlName="direccion" \r
                      placeholder="Direcci\xF3n completa de la empresa"\r
                      rows="3"\r
                      [class.error]="empresaFormErrors.direccion"></textarea>\r
                  </div>\r
                  <div *ngIf="empresaFormErrors.direccion" class="error-message">\r
                    <ion-icon name="alert-circle-outline"></ion-icon>\r
                    <span>La direcci\xF3n es requerida y debe tener al menos 10 caracteres</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label>Tel\xE9fono *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="call-outline"></ion-icon>\r
                    <input \r
                      type="tel" \r
                      formControlName="telefono" \r
                      placeholder="Ej: +34 123 456 789"\r
                      [class.error]="empresaFormErrors.telefono">\r
                  </div>\r
                  <div *ngIf="empresaFormErrors.telefono" class="error-message">\r
                    <ion-icon name="alert-circle-outline"></ion-icon>\r
                    <span>El tel\xE9fono es requerido y debe tener un formato v\xE1lido</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label>Email *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="mail-outline"></ion-icon>\r
                    <input \r
                      type="email" \r
                      formControlName="email" \r
                      placeholder="info@miempresa.com"\r
                      [class.error]="empresaFormErrors.email">\r
                  </div>\r
                  <div *ngIf="empresaFormErrors.email" class="error-message">\r
                    <ion-icon name="alert-circle-outline"></ion-icon>\r
                    <span>El email es requerido y debe tener un formato v\xE1lido</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label>Sitio Web</label>\r
                  <div class="input-container">\r
                    <ion-icon name="globe-outline"></ion-icon>\r
                    <input \r
                      type="url" \r
                      formControlName="web" \r
                      placeholder="https://www.miempresa.com"\r
                      [class.error]="empresaFormErrors.web">\r
                  </div>\r
                  <div *ngIf="empresaFormErrors.web" class="error-message">\r
                    <ion-icon name="alert-circle-outline"></ion-icon>\r
                    <span>La URL debe comenzar con http:// o https://</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label>URL del Logo</label>\r
                  <div class="input-container">\r
                    <ion-icon name="image-outline"></ion-icon>\r
                    <input \r
                      type="url" \r
                      formControlName="logo_url" \r
                      placeholder="https://ejemplo.com/logo.png">\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <div class="form-actions">\r
                <button \r
                  type="submit" \r
                  class="btn-save"\r
                  [disabled]="empresaForm.invalid || loading">\r
                  <ion-icon name="save-outline"></ion-icon>\r
                  Guardar Configuraci\xF3n\r
                </button>\r
              </div>\r
            </form>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Pesta\xF1a Facturaci\xF3n -->\r
      <div id="facturacion" class="tab-panel">\r
        <div class="config-card">\r
          <div class="card-content">\r
            <form [formGroup]="facturacionForm" (ngSubmit)="guardarFacturacion()">\r
              <div class="form-grid">\r
                <div class="form-group">\r
                  <label>IVA por Defecto (%) *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="calculator-outline"></ion-icon>\r
                    <input \r
                      type="number" \r
                      formControlName="iva_por_defecto" \r
                      min="0"\r
                      max="100"\r
                      [class.error]="facturacionFormErrors.iva_por_defecto">\r
                  </div>\r
                  <div *ngIf="facturacionFormErrors.iva_por_defecto" class="error-message">\r
                    <ion-icon name="alert-circle-outline"></ion-icon>\r
                    <span>El IVA debe estar entre 0 y 100</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label>Moneda *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="cash-outline"></ion-icon>\r
                    <select formControlName="moneda">\r
                      <option *ngFor="let moneda of monedas" [value]="moneda.valor">\r
                        {{ moneda.texto }}\r
                      </option>\r
                    </select>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label>Formato N\xFAmero Factura *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="document-text-outline"></ion-icon>\r
                    <input \r
                      type="text" \r
                      formControlName="formato_numero_factura" \r
                      placeholder="Ej: FAC-YEAR-NUMBER"\r
                      [class.error]="facturacionFormErrors.formato_numero_factura">\r
                  </div>\r
                  <div class="help-text">\r
                    <ion-icon name="information-circle-outline"></ion-icon>\r
                    <span>Usa YEAR para el a\xF1o y NUMBER para el n\xFAmero secuencial</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label>D\xEDas de Vencimiento *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="calendar-outline"></ion-icon>\r
                    <input \r
                      type="number" \r
                      formControlName="dias_vencimiento" \r
                      min="1"\r
                      max="365"\r
                      [class.error]="facturacionFormErrors.dias_vencimiento">\r
                  </div>\r
                  <div *ngIf="facturacionFormErrors.dias_vencimiento" class="error-message">\r
                    <ion-icon name="alert-circle-outline"></ion-icon>\r
                    <span>Los d\xEDas deben estar entre 1 y 365</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group full-width">\r
                  <label>Texto del Pie de Factura</label>\r
                  <div class="input-container">\r
                    <ion-icon name="document-outline"></ion-icon>\r
                    <textarea \r
                      formControlName="texto_pie_factura" \r
                      placeholder="Mensaje que aparecer\xE1 al final de las facturas"\r
                      rows="3"></textarea>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group full-width">\r
                  <label>Condiciones de Pago</label>\r
                  <div class="input-container">\r
                    <ion-icon name="document-outline"></ion-icon>\r
                    <textarea \r
                      formControlName="condiciones_pago" \r
                      placeholder="Condiciones de pago por defecto"\r
                      rows="2"></textarea>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <div class="form-actions">\r
                <button \r
                  type="submit" \r
                  class="btn-save"\r
                  [disabled]="facturacionForm.invalid || loading">\r
                  <ion-icon name="save-outline"></ion-icon>\r
                  Guardar Configuraci\xF3n\r
                </button>\r
              </div>\r
            </form>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Pesta\xF1a Notificaciones -->\r
      <div id="notificaciones" class="tab-panel">\r
        <div class="config-card">\r
          <!-- <div class="card-header">\r
            <div class="card-title">\r
              <ion-icon name="notifications-outline"></ion-icon>\r
              Configuraci\xF3n de Notificaciones\r
            </div>\r
            <p>Gestiona c\xF3mo y cu\xE1ndo recibir notificaciones</p>\r
          </div> -->\r
          <div class="card-content">\r
            <form [formGroup]="notificacionesForm" (ngSubmit)="guardarNotificaciones()">\r
              <div class="notifications-section">\r
                <h3>Notificaciones por Email</h3>\r
                <div class="toggle-group">\r
                  <div class="toggle-item">\r
                    <label>Activar notificaciones por email</label>\r
                    <div class="toggle-switch">\r
                      <input type="checkbox" formControlName="email_notificaciones">\r
                      <span class="slider"></span>\r
                    </div>\r
                  </div>\r
                  \r
                  <div class="toggle-item">\r
                    <label>Nuevos avisos</label>\r
                    <div class="toggle-switch">\r
                      <input type="checkbox" formControlName="email_avisos_nuevos">\r
                      <span class="slider"></span>\r
                    </div>\r
                  </div>\r
                  \r
                  <div class="toggle-item">\r
                    <label>Facturas generadas</label>\r
                    <div class="toggle-switch">\r
                      <input type="checkbox" formControlName="email_facturas_generadas">\r
                      <span class="slider"></span>\r
                    </div>\r
                  </div>\r
                  \r
                  <div class="toggle-item">\r
                    <label>Recordatorios</label>\r
                    <div class="toggle-switch">\r
                      <input type="checkbox" formControlName="email_recordatorios">\r
                      <span class="slider"></span>\r
                    </div>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <div class="notifications-section">\r
                <h3>Notificaciones por SMS</h3>\r
                <div class="toggle-group">\r
                  <div class="toggle-item">\r
                    <label>Activar notificaciones por SMS</label>\r
                    <div class="toggle-switch">\r
                      <input type="checkbox" formControlName="sms_notificaciones">\r
                      <span class="slider"></span>\r
                    </div>\r
                  </div>\r
                  \r
                  <div class="toggle-item">\r
                    <label>Avisos urgentes</label>\r
                    <div class="toggle-switch">\r
                      <input type="checkbox" formControlName="sms_avisos_urgentes">\r
                      <span class="slider"></span>\r
                    </div>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <div class="form-actions">\r
                <button \r
                  type="submit" \r
                  class="btn-save"\r
                  [disabled]="loading">\r
                  <ion-icon name="save-outline"></ion-icon>\r
                  Guardar Configuraci\xF3n\r
                </button>\r
              </div>\r
            </form>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Pesta\xF1a Avisos -->\r
      <div id="avisos" class="tab-panel">\r
        <div class="config-card">\r
          <div class="card-content">\r
            <form [formGroup]="avisosForm" (ngSubmit)="guardarAvisos()">\r
              <div class="form-grid">\r
                <div class="form-group">\r
                  <label>Tipos de Urgencia *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="alert-circle-outline"></ion-icon>\r
                    <textarea \r
                      formControlName="tipos_urgencia" \r
                      placeholder="Baja, Media, Alta, Cr\xEDtica"\r
                      rows="2"\r
                      [class.error]="avisosFormErrors.tipos_urgencia"></textarea>\r
                  </div>\r
                  <div class="help-text">\r
                    <ion-icon name="information-circle-outline"></ion-icon>\r
                    <span>Separa los tipos con comas</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label>Estados Disponibles *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="list-outline"></ion-icon>\r
                    <textarea \r
                      formControlName="estados_disponibles" \r
                      placeholder="Pendiente, En curso, Completado, Cancelado"\r
                      rows="2"\r
                      [class.error]="avisosFormErrors.estados_disponibles"></textarea>\r
                  </div>\r
                  <div class="help-text">\r
                    <ion-icon name="information-circle-outline"></ion-icon>\r
                    <span>Separa los estados con comas</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label>Tiempo M\xE1ximo de Respuesta (horas) *</label>\r
                  <div class="input-container">\r
                    <ion-icon name="time-outline"></ion-icon>\r
                    <input \r
                      type="number" \r
                      formControlName="tiempo_maximo_respuesta" \r
                      min="1"\r
                      max="168"\r
                      [class.error]="avisosFormErrors.tiempo_maximo_respuesta">\r
                  </div>\r
                  <div *ngIf="avisosFormErrors.tiempo_maximo_respuesta" class="error-message">\r
                    <ion-icon name="alert-circle-outline"></ion-icon>\r
                    <span>El tiempo debe estar entre 1 y 168 horas</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label>Asignaci\xF3n Autom\xE1tica de T\xE9cnicos</label>\r
                  <div class="toggle-switch">\r
                    <input type="checkbox" formControlName="asignacion_automatica">\r
                    <span class="slider"></span>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <div class="form-actions">\r
                <button \r
                  type="submit" \r
                  class="btn-save"\r
                  [disabled]="avisosForm.invalid || loading">\r
                  <ion-icon name="save-outline"></ion-icon>\r
                  Guardar Configuraci\xF3n\r
                </button>\r
              </div>\r
            </form>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Pesta\xF1a Sistema -->\r
      <div id="sistema" class="tab-panel">\r
        <div class="config-card">\r
          <!-- <div class="card-header">\r
            <div class="card-title">\r
              <ion-icon name="cog-outline"></ion-icon>\r
              Configuraci\xF3n del Sistema\r
            </div>\r
            <p>Configuraciones avanzadas del sistema</p>\r
          </div> -->\r
          <div class="card-content">\r
            <form [formGroup]="sistemaForm" (ngSubmit)="guardarSistema()">\r
              <div class="form-grid">\r
                <div class="backup-section">\r
                  <h3>Configuraci\xF3n de Backup</h3>\r
                  \r
                  <div class="toggle-item">\r
                    <label>Backup Autom\xE1tico</label>\r
                    <div class="toggle-switch">\r
                      <input type="checkbox" formControlName="backup_automatico">\r
                      <span class="slider"></span>\r
                    </div>\r
                  </div>\r
                  \r
                  <div class="form-group">\r
                    <label>Frecuencia de Backup *</label>\r
                    <div class="input-container">\r
                      <ion-icon name="refresh-outline"></ion-icon>\r
                      <select formControlName="frecuencia_backup">\r
                        <option *ngFor="let frecuencia of frecuenciasBackup" [value]="frecuencia.valor">\r
                          {{ frecuencia.texto }}\r
                        </option>\r
                      </select>\r
                    </div>\r
                  </div>\r
                  \r
                  <div class="form-group">\r
                    <label>Retenci\xF3n de Backups (d\xEDas) *</label>\r
                    <div class="input-container">\r
                      <ion-icon name="calendar-outline"></ion-icon>\r
                      <input \r
                        type="number" \r
                        formControlName="retencion_backup_dias" \r
                        min="1"\r
                        max="365"\r
                        [class.error]="sistemaFormErrors.retencion_backup_dias">\r
                    </div>\r
                    <div *ngIf="sistemaFormErrors.retencion_backup_dias" class="error-message">\r
                      <ion-icon name="alert-circle-outline"></ion-icon>\r
                      <span>Los d\xEDas deben estar entre 1 y 365</span>\r
                    </div>\r
                  </div>\r
                </div>\r
\r
                <div class="maintenance-section">\r
                  <h3>Modo Mantenimiento</h3>\r
                  \r
                  <div class="toggle-item">\r
                    <label>Activar Modo Mantenimiento</label>\r
                    <div class="toggle-switch">\r
                      <input type="checkbox" formControlName="modo_mantenimiento">\r
                      <span class="slider"></span>\r
                    </div>\r
                  </div>\r
                  \r
                  <div class="form-group full-width">\r
                    <label>Mensaje de Mantenimiento</label>\r
                    <div class="input-container">\r
                      <ion-icon name="construct-outline"></ion-icon>\r
                      <textarea \r
                        formControlName="mensaje_mantenimiento" \r
                        placeholder="Mensaje que ver\xE1n los usuarios durante el mantenimiento"\r
                        rows="3"></textarea>\r
                    </div>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <div class="form-actions">\r
                <button \r
                  type="submit" \r
                  class="btn-save"\r
                  [disabled]="sistemaForm.invalid || loading">\r
                  <ion-icon name="save-outline"></ion-icon>\r
                  Guardar Configuraci\xF3n\r
                </button>\r
              </div>\r
            </form>\r
          </div>\r
        </div>\r
      </div>\r
\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- Toast de \xE9xito -->\r
<div *ngIf="mostrarExito" class="toast toast-success">\r
  <ion-icon name="checkmark-circle-outline"></ion-icon>\r
  <span>{{ mensajeExito }}</span>\r
  <button class="toast-close" (click)="mostrarExito = false">\r
    <ion-icon name="close-outline"></ion-icon>\r
  </button>\r
</div>\r
\r
<!-- Toast de error -->\r
<div *ngIf="mostrarError" class="toast toast-error">\r
  <ion-icon name="alert-circle-outline"></ion-icon>\r
  <span>{{ error }}</span>\r
  <button class="toast-close" (click)="mostrarError = false">\r
    <ion-icon name="close-outline"></ion-icon>\r
  </button>\r
</div>\r
`, styles: [`/* src/app/modules/ajustes/pages/ajustes/ajustes.component.scss */
ion-content {
  --background: #FFF;
}
.ajustes-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.ajustes-header {
  margin-bottom: 32px;
  padding: 24px;
  background:
    linear-gradient(
      135deg,
      #4F46E5 0%,
      #6366F1 100%);
  border-radius: 16px;
  color: white;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
}
.ajustes-header .header-content .header-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.ajustes-header .header-content .header-title ion-icon {
  font-size: 32px;
  color: white;
}
.ajustes-header .header-content .header-title h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: white;
}
.ajustes-header .header-content .header-description {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.5;
}
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
.loading-state .loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #64748b;
}
.loading-state .loading-spinner ion-spinner {
  width: 48px;
  height: 48px;
  color: #4F46E5;
}
.loading-state .loading-spinner p {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}
.error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
.error-state .error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  color: #EF4444;
  max-width: 400px;
}
.error-state .error-message ion-icon {
  font-size: 48px;
  color: #EF4444;
}
.error-state .error-message p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
}
.error-state .error-message .btn-retry {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  color: #EF4444;
  border: 1px solid #EF4444;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.error-state .error-message .btn-retry ion-icon {
  font-size: 18px;
}
.error-state .error-message .btn-retry:hover {
  background: #EF4444;
  color: white;
}
.ajustes-content .tabs-navigation {
  display: flex;
  background: #fff;
  border-radius: 12px 12px 0 0;
  border: 1px solid #E2E8F0;
  border-bottom: none;
  margin-bottom: 0;
  overflow-x: auto;
}
.ajustes-content .tabs-navigation .tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  padding: 16px 24px;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.ajustes-content .tabs-navigation .tab-button ion-icon {
  font-size: 18px;
}
.ajustes-content .tabs-navigation .tab-button.active {
  color: #4F46E5;
  background: #FAFBFF;
  border-bottom: 3px solid #4F46E5;
}
.ajustes-content .tabs-navigation .tab-button:hover {
  background: #FAFBFF;
  color: #4F46E5;
}
.ajustes-content .tabs-navigation .tab-button:focus {
  outline: none;
}
.ajustes-content .tab-content {
  background: #fff;
  border-top: none;
  border-radius: 0 0 12px 12px;
  min-height: 600px;
}
.ajustes-content .tab-content .tab-panel {
  display: none;
}
.ajustes-content .tab-content .tab-panel.active {
  display: block;
}
.config-card {
  margin: 0;
  border-radius: 12px;
  padding: 20px;
}
.config-card .card-header {
  border-bottom: 1px solid #E2E8F0;
  border-radius: 12px 12px 0 0;
}
.config-card .card-header .card-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #26262A;
}
.config-card .card-header .card-title ion-icon {
  font-size: 24px;
  color: #4F46E5;
}
.config-card .card-header p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
}
.config-card ion-card-content {
  padding: 24px;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}
.form-grid .form-group.full-width {
  grid-column: 1/-1;
}
.form-grid .form-group label {
  display: block;
  color: #26262A;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
}
.form-grid .form-group .input-container {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background: #fff;
  transition: all 0.2s ease;
}
.form-grid .form-group .input-container.error {
  border-color: #EF4444;
  background: rgba(239, 68, 68, 0.05);
}
.form-grid .form-group .input-container:focus-within {
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
.form-grid .form-group .input-container ion-icon {
  position: absolute;
  left: 12px;
  color: #ACACAC;
  font-size: 18px;
  z-index: 1;
}
.form-grid .form-group .input-container input,
.form-grid .form-group .input-container textarea,
.form-grid .form-group .input-container select {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: none;
  background: transparent;
  color: #26262A;
  font-size: 14px;
  outline: none;
}
.form-grid .form-group .input-container input.error,
.form-grid .form-group .input-container textarea.error,
.form-grid .form-group .input-container select.error {
  color: #EF4444;
}
.form-grid .form-group .input-container input::placeholder,
.form-grid .form-group .input-container textarea::placeholder,
.form-grid .form-group .input-container select::placeholder {
  color: #ACACAC;
}
.form-grid .form-group .input-container textarea {
  resize: vertical;
  min-height: 80px;
  padding-top: 12px;
  padding-bottom: 12px;
}
.form-grid .form-group .input-container select {
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
}
.error-message {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  color: #EF4444;
  font-size: 12px;
}
.error-message ion-icon {
  font-size: 14px;
  flex-shrink: 0;
}
.error-message span {
  line-height: 1.4;
}
.help-text {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  color: #64748b;
  font-size: 12px;
}
.help-text ion-icon {
  font-size: 14px;
  flex-shrink: 0;
}
.help-text span {
  line-height: 1.4;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
  border-top: 1px solid #F1F5F9;
}
.form-actions .btn-save {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.form-actions .btn-save ion-icon {
  font-size: 18px;
}
.form-actions .btn-save:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.form-actions .btn-save:disabled {
  background: #ACACAC;
  color: white;
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.form-actions .btn-save:active {
  transform: translateY(0);
}
.notifications-section {
  margin-bottom: 32px;
}
.notifications-section h3 {
  color: #26262A;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #F1F5F9;
}
.notifications-section .toggle-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.notifications-section .toggle-group .toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}
.notifications-section .toggle-group .toggle-item label {
  color: #26262A;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin: 0;
}
.notifications-section .toggle-group .toggle-item .toggle-switch {
  position: relative;
  width: 50px;
  height: 24px;
}
.notifications-section .toggle-group .toggle-item .toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.notifications-section .toggle-group .toggle-item .toggle-switch input:checked + .slider {
  background-color: #4F46E5;
}
.notifications-section .toggle-group .toggle-item .toggle-switch input:checked + .slider:before {
  transform: translateX(26px);
}
.notifications-section .toggle-group .toggle-item .toggle-switch .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E2E8F0;
  transition: 0.3s;
  border-radius: 24px;
}
.notifications-section .toggle-group .toggle-item .toggle-switch .slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.backup-section h3,
.maintenance-section h3 {
  color: #26262A;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #F1F5F9;
}
.backup-section .toggle-item,
.maintenance-section .toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  margin-bottom: 16px;
}
.backup-section .toggle-item label,
.maintenance-section .toggle-item label {
  color: #26262A;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin: 0;
}
.backup-section .toggle-item .toggle-switch,
.maintenance-section .toggle-item .toggle-switch {
  position: relative;
  width: 50px;
  height: 24px;
}
.backup-section .toggle-item .toggle-switch input,
.maintenance-section .toggle-item .toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.backup-section .toggle-item .toggle-switch input:checked + .slider,
.maintenance-section .toggle-item .toggle-switch input:checked + .slider {
  background-color: #4F46E5;
}
.backup-section .toggle-item .toggle-switch input:checked + .slider:before,
.maintenance-section .toggle-item .toggle-switch input:checked + .slider:before {
  transform: translateX(26px);
}
.backup-section .toggle-item .toggle-switch .slider,
.maintenance-section .toggle-item .toggle-switch .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E2E8F0;
  transition: 0.3s;
  border-radius: 24px;
}
.backup-section .toggle-item .toggle-switch .slider:before,
.maintenance-section .toggle-item .toggle-switch .slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
@media (max-width: 768px) {
  .ajustes-container {
    padding: 16px;
  }
  .ajustes-header {
    padding: 20px;
    margin-bottom: 24px;
  }
  .ajustes-header .header-content .header-title h1 {
    font-size: 24px;
  }
  .ajustes-header .header-content .header-title ion-icon {
    font-size: 28px;
  }
  .ajustes-header .header-content .header-description {
    font-size: 14px;
  }
  .tab-content {
    padding: 0px;
  }
  .config-card ion-card-header {
    padding: 20px;
  }
  .config-card ion-card-header ion-card-title {
    font-size: 18px;
  }
  .config-card ion-card-header ion-card-title ion-icon {
    font-size: 20px;
  }
  .config-card ion-card-content {
    padding: 20px;
  }
  .form-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .ajustes-tabs ::ng-deep .mat-mdc-tab-group .mat-mdc-tab-header .mat-mdc-tab-label-container .mat-mdc-tab-label {
    min-width: 100px;
    padding: 12px 16px;
    font-size: 14px;
  }
}
@media (max-width: 480px) {
  .ajustes-container {
    padding: 12px;
  }
  .ajustes-header {
    padding: 16px;
  }
  .ajustes-header .header-content .header-title {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  .ajustes-header .header-content .header-title h1 {
    font-size: 20px;
  }
  .tab-content {
    padding: 0px;
  }
  .config-card ion-card-header {
    padding: 16px;
  }
  .config-card ion-card-header ion-card-title {
    font-size: 16px;
  }
  .config-card ion-card-header ion-card-title ion-icon {
    font-size: 18px;
  }
  .config-card ion-card-content {
    padding: 16px;
  }
  .form-actions ion-button {
    width: 100%;
    --padding-start: 16px;
    --padding-end: 16px;
  }
}
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 400px;
  animation: slideIn 0.3s ease;
}
.toast ion-icon {
  font-size: 20px;
  flex-shrink: 0;
}
.toast span {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}
.toast .toast-close {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s ease;
}
.toast .toast-close ion-icon {
  font-size: 16px;
}
.toast .toast-close:hover {
  background: rgba(255, 255, 255, 0.2);
}
.toast.toast-success {
  background: #10B981;
  color: white;
}
.toast.toast-error {
  background: #EF4444;
  color: white;
}
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.form-item {
  transition: all 0.2s ease;
}
.form-item:focus-within {
  --border-color: $primary-color;
  --background: rgba(79, 70, 229, 0.02);
}
ion-textarea ::ng-deep textarea {
  scrollbar-width: thin;
  scrollbar-color: #E2E8F0 transparent;
}
ion-textarea ::ng-deep textarea::-webkit-scrollbar {
  width: 6px;
}
ion-textarea ::ng-deep textarea::-webkit-scrollbar-track {
  background: transparent;
}
ion-textarea ::ng-deep textarea::-webkit-scrollbar-thumb {
  background-color: #E2E8F0;
  border-radius: 3px;
}
/*# sourceMappingURL=ajustes.component.css.map */
`] }]
  }], () => [{ type: AjustesService }, { type: FormBuilder }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AjustesComponent, { className: "AjustesComponent", filePath: "src/app/modules/ajustes/pages/ajustes/ajustes.component.ts", lineNumber: 46 });
})();
export {
  AjustesComponent
};
//# sourceMappingURL=ajustes.component-PCD5XBKQ.js.map
