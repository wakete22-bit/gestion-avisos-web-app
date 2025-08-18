import {
  FlujoAvisosService
} from "./chunk-44F4EVDE.js";
import "./chunk-24UOAN2R.js";
import {
  PresupuestosService
} from "./chunk-SKNF6UHJ.js";
import "./chunk-F77G4CBW.js";
import "./chunk-VHAQXQOQ.js";
import {
  MatIconModule,
  MatTableModule
} from "./chunk-776UXQBH.js";
import "./chunk-S2ZT5FDR.js";
import {
  add,
  addCircle,
  addCircleOutline,
  addIcons,
  alertCircle,
  alertCircleOutline,
  arrowForwardOutline,
  checkmarkCircleOutline,
  close,
  createOutline,
  documentOutline,
  documentTextOutline,
  ellipsisHorizontalOutline,
  eyeOutline,
  hourglassOutline,
  mapOutline,
  receiptOutline,
  refreshOutline,
  searchOutline,
  warningOutline
} from "./chunk-YLHOXAZF.js";
import "./chunk-7DTAJMEV.js";
import {
  IonButton,
  IonContent,
  IonIcon,
  PopoverController
} from "./chunk-DJA56OJT.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  NgClass,
  NgForOf,
  NgIf,
  Output,
  Router,
  Subject,
  setClassMetadata,
  switchMap,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction3,
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

// src/app/shared/components/flujo-boton/flujo-boton.component.ts
function FlujoBotonComponent_div_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9)(1, "span", 10);
    \u0275\u0275text(2, "Completo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 11);
    \u0275\u0275text(4, "\u2713");
    \u0275\u0275elementEnd()();
  }
}
function FlujoBotonComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "ion-icon", 7);
    \u0275\u0275template(2, FlujoBotonComponent_div_1_span_2_Template, 5, 0, "span", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.showText);
  }
}
function FlujoBotonComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "ion-icon", 13);
    \u0275\u0275elementEnd();
  }
}
function FlujoBotonComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "ion-icon", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r0.error);
  }
}
function FlujoBotonComponent_ion_button_4_ion_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 19);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("name", ctx_r0.getAccionIcon(ctx_r0.accionPrimaria));
  }
}
function FlujoBotonComponent_ion_button_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "ion-icon", 20);
    \u0275\u0275elementStart(2, "span", 21);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r0.getAccionIcon(ctx_r0.accionPrimaria));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getAccionTexto(ctx_r0.accionPrimaria));
  }
}
function FlujoBotonComponent_ion_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-button", 16);
    \u0275\u0275listener("click", function FlujoBotonComponent_ion_button_4_Template_ion_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.ejecutarAccionPrimaria());
    });
    \u0275\u0275template(1, FlujoBotonComponent_ion_button_4_ion_icon_1_Template, 1, 1, "ion-icon", 17)(2, FlujoBotonComponent_ion_button_4_ng_container_2_Template, 4, 2, "ng-container", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("fill", ctx_r0.size === "small" ? "clear" : "solid")("size", ctx_r0.size)("color", ctx_r0.getAccionColor(ctx_r0.accionPrimaria))("disabled", ctx_r0.loading)("title", ctx_r0.getAccionTexto(ctx_r0.accionPrimaria));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.showText);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.showText);
  }
}
function FlujoBotonComponent_ion_button_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-button", 22);
    \u0275\u0275element(1, "ion-icon", 23);
    \u0275\u0275elementEnd();
  }
}
var _FlujoBotonComponent = class _FlujoBotonComponent {
  constructor(flujoService, popoverController) {
    this.flujoService = flujoService;
    this.popoverController = popoverController;
    this.size = "small";
    this.showText = false;
    this.accionEjecutada = new EventEmitter();
    this.accionesDisponibles = [];
    this.loading = false;
    this.error = null;
    this.destroy$ = new Subject();
    addIcons({
      ellipsisHorizontalOutline,
      documentTextOutline,
      checkmarkCircleOutline,
      receiptOutline,
      createOutline,
      eyeOutline,
      arrowForwardOutline,
      warningOutline
    });
  }
  ngOnInit() {
    if (this.avisoId) {
      this.cargarAccionesDisponibles();
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Carga las acciones disponibles para el aviso
   */
  cargarAccionesDisponibles() {
    this.loading = true;
    this.error = null;
    this.flujoService.obtenerAccionesDisponibles(this.avisoId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (acciones) => {
        this.accionesDisponibles = acciones;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar acciones:", error);
        this.error = "Error al cargar acciones";
        this.loading = false;
      }
    });
  }
  /**
   * Ejecuta la acción más relevante disponible
   */
  ejecutarAccionPrimaria() {
    if (this.accionesDisponibles.length === 0)
      return;
    const accionPrimaria = this.accionesDisponibles[0];
    this.ejecutarAccion(accionPrimaria);
  }
  /**
   * Ejecuta una acción específica
   */
  ejecutarAccion(accion) {
    this.loading = true;
    this.error = null;
    let accionObservable;
    switch (accion) {
      case "crear_presupuesto":
        accionObservable = this.flujoService.ejecutarFlujoCompleto(this.avisoId, true);
        break;
      case "aprobar_presupuesto":
        accionObservable = this.flujoService.obtenerEstadoFlujo(this.avisoId).pipe(takeUntil(this.destroy$), switchMap((estado) => {
          var _a, _b;
          const presupuestoId = (_b = (_a = estado.resumen) == null ? void 0 : _a.presupuesto) == null ? void 0 : _b.id;
          if (presupuestoId) {
            return this.flujoService.aprobarPresupuesto(presupuestoId);
          }
          throw new Error("No se encontr\xF3 presupuesto para aprobar");
        }));
        break;
      case "facturar_presupuesto":
        accionObservable = this.flujoService.obtenerEstadoFlujo(this.avisoId).pipe(takeUntil(this.destroy$), switchMap((estado) => {
          var _a, _b;
          const presupuestoId = (_b = (_a = estado.resumen) == null ? void 0 : _a.presupuesto) == null ? void 0 : _b.id;
          if (presupuestoId) {
            return this.flujoService.facturarPresupuesto(presupuestoId);
          }
          throw new Error("No se encontr\xF3 presupuesto para facturar");
        }));
        break;
      case "facturar_trabajos":
        accionObservable = this.flujoService.facturarTrabajos(this.avisoId);
        break;
      default:
        this.loading = false;
        return;
    }
    if (accionObservable) {
      accionObservable.pipe(takeUntil(this.destroy$)).subscribe({
        next: (resultado) => {
          console.log("Acci\xF3n ejecutada:", resultado);
          this.accionEjecutada.emit(resultado);
          this.cargarAccionesDisponibles();
          this.loading = false;
        },
        error: (error) => {
          console.error("Error al ejecutar acci\xF3n:", error);
          this.error = `Error: ${error.message}`;
          this.loading = false;
        }
      });
    }
  }
  /**
   * Obtiene el icono para una acción
   */
  getAccionIcon(accion) {
    switch (accion) {
      case "crear_presupuesto":
        return "document-text-outline";
      case "aprobar_presupuesto":
        return "checkmark-circle-outline";
      case "facturar_presupuesto":
      case "facturar_trabajos":
        return "receipt-outline";
      default:
        return "arrow-forward-outline";
    }
  }
  /**
   * Obtiene el texto para una acción
   */
  getAccionTexto(accion) {
    switch (accion) {
      case "crear_presupuesto":
        return "Crear Presupuesto";
      case "aprobar_presupuesto":
        return "Aprobar";
      case "facturar_presupuesto":
        return "Generar Factura";
      case "facturar_trabajos":
        return "Facturar Trabajos";
      default:
        return "Acci\xF3n";
    }
  }
  /**
   * Obtiene el color para una acción
   */
  getAccionColor(accion) {
    switch (accion) {
      case "crear_presupuesto":
        return "primary";
      case "aprobar_presupuesto":
        return "success";
      case "facturar_presupuesto":
      case "facturar_trabajos":
        return "warning";
      default:
        return "medium";
    }
  }
  /**
   * Verifica si hay acciones disponibles
   */
  get tieneAcciones() {
    return this.accionesDisponibles.length > 0;
  }
  /**
   * Obtiene la acción primaria
   */
  get accionPrimaria() {
    return this.accionesDisponibles.length > 0 ? this.accionesDisponibles[0] : null;
  }
};
_FlujoBotonComponent.\u0275fac = function FlujoBotonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FlujoBotonComponent)(\u0275\u0275directiveInject(FlujoAvisosService), \u0275\u0275directiveInject(PopoverController));
};
_FlujoBotonComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FlujoBotonComponent, selectors: [["app-flujo-boton"]], inputs: { avisoId: "avisoId", size: "size", showText: "showText" }, outputs: { accionEjecutada: "accionEjecutada" }, decls: 6, vars: 6, consts: [[1, "flujo-boton-container", 3, "ngClass"], ["class", "sin-acciones", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 3, "title", 4, "ngIf"], ["class", "accion-primaria", 3, "fill", "size", "color", "disabled", "title", "click", 4, "ngIf"], ["fill", "clear", "size", "small", "color", "medium", "class", "mas-acciones", "title", "M\xE1s acciones disponibles", 4, "ngIf"], [1, "sin-acciones"], ["name", "checkmark-circle-outline", 1, "complete-icon"], ["class", "complete-text", 4, "ngIf"], [1, "complete-text"], [1, "desktop-only"], [1, "mobile-only"], [1, "loading-state"], ["name", "ellipsis-horizontal-outline", 1, "loading-icon"], [1, "error-state", 3, "title"], ["name", "warning-outline", 1, "error-icon"], [1, "accion-primaria", 3, "click", "fill", "size", "color", "disabled", "title"], ["slot", "icon-only", 3, "name", 4, "ngIf"], [4, "ngIf"], ["slot", "icon-only", 3, "name"], ["slot", "start", 3, "name"], [1, "accion-text"], ["fill", "clear", "size", "small", "color", "medium", "title", "M\xE1s acciones disponibles", 1, "mas-acciones"], ["name", "ellipsis-horizontal-outline", "slot", "icon-only"]], template: function FlujoBotonComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275template(1, FlujoBotonComponent_div_1_Template, 3, 1, "div", 1)(2, FlujoBotonComponent_div_2_Template, 2, 0, "div", 2)(3, FlujoBotonComponent_div_3_Template, 2, 1, "div", 3)(4, FlujoBotonComponent_ion_button_4_Template, 3, 7, "ion-button", 4)(5, FlujoBotonComponent_ion_button_5_Template, 2, 0, "ion-button", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("ngClass", ctx.size);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.tieneAcciones && !ctx.loading && !ctx.error);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.accionPrimaria && !ctx.loading && !ctx.error);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.accionesDisponibles.length > 1 && !ctx.loading && !ctx.error);
  }
}, dependencies: [
  CommonModule,
  NgClass,
  NgIf,
  IonIcon,
  IonButton
], styles: ["\n\n.flujo-boton-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.flujo-boton-container.small[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%] {\n  --padding-top: 6px;\n  --padding-bottom: 6px;\n  --padding-start: 8px;\n  --padding-end: 8px;\n  font-size: 12px;\n}\n.flujo-boton-container.small[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.flujo-boton-container.medium[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%] {\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  --padding-start: 12px;\n  --padding-end: 12px;\n  font-size: 14px;\n}\n.flujo-boton-container.medium[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.desktop-only[_ngcontent-%COMP%] {\n  display: inline;\n}\n.mobile-only[_ngcontent-%COMP%] {\n  display: none;\n}\n.sin-acciones[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #10B981;\n  font-size: 12px;\n}\n.sin-acciones[_ngcontent-%COMP%]   .complete-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #10B981;\n}\n.sin-acciones[_ngcontent-%COMP%]   .complete-text[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #64748B;\n  animation: _ngcontent-%COMP%_pulse 1.5s ease-in-out infinite;\n}\n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px;\n}\n.error-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #EF4444;\n}\n.accion-primaria[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.accion-primaria.button-clear[_ngcontent-%COMP%] {\n  --color: var(--ion-color-primary);\n}\n.accion-primaria.button-clear[_ngcontent-%COMP%]:hover {\n  --color: var(--ion-color-primary-shade);\n}\n.accion-text[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.mas-acciones[_ngcontent-%COMP%] {\n  margin: 0;\n  --padding-top: 4px;\n  --padding-bottom: 4px;\n  --padding-start: 4px;\n  --padding-end: 4px;\n}\n.mas-acciones[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n@media (max-width: 768px) {\n  .desktop-only[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .mobile-only[_ngcontent-%COMP%] {\n    display: inline;\n  }\n  .flujo-boton-container[_ngcontent-%COMP%] {\n    gap: 3px;\n  }\n  .flujo-boton-container.small[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%] {\n    --padding-top: 5px;\n    --padding-bottom: 5px;\n    --padding-start: 6px;\n    --padding-end: 6px;\n    font-size: 11px;\n  }\n  .flujo-boton-container.small[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .flujo-boton-container.medium[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%] {\n    --padding-top: 6px;\n    --padding-bottom: 6px;\n    --padding-start: 10px;\n    --padding-end: 10px;\n    font-size: 13px;\n  }\n  .flujo-boton-container.medium[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .sin-acciones[_ngcontent-%COMP%] {\n    gap: 4px;\n    font-size: 11px;\n  }\n  .sin-acciones[_ngcontent-%COMP%]   .complete-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .loading-state[_ngcontent-%COMP%] {\n    padding: 4px;\n  }\n  .loading-state[_ngcontent-%COMP%]   .loading-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .error-state[_ngcontent-%COMP%] {\n    padding: 4px;\n  }\n  .error-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .mas-acciones[_ngcontent-%COMP%] {\n    --padding-top: 3px;\n    --padding-bottom: 3px;\n    --padding-start: 3px;\n    --padding-end: 3px;\n  }\n  .mas-acciones[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .flujo-boton-container[_ngcontent-%COMP%] {\n    gap: 2px;\n  }\n  .flujo-boton-container.small[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%] {\n    --padding-top: 4px;\n    --padding-bottom: 4px;\n    --padding-start: 5px;\n    --padding-end: 5px;\n    font-size: 10px;\n  }\n  .flujo-boton-container.small[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .flujo-boton-container.medium[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%] {\n    --padding-top: 5px;\n    --padding-bottom: 5px;\n    --padding-start: 8px;\n    --padding-end: 8px;\n    font-size: 12px;\n  }\n  .flujo-boton-container.medium[_ngcontent-%COMP%]   .accion-primaria[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .sin-acciones[_ngcontent-%COMP%] {\n    gap: 3px;\n    font-size: 10px;\n  }\n  .sin-acciones[_ngcontent-%COMP%]   .complete-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .loading-state[_ngcontent-%COMP%] {\n    padding: 3px;\n  }\n  .loading-state[_ngcontent-%COMP%]   .loading-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .error-state[_ngcontent-%COMP%] {\n    padding: 3px;\n  }\n  .error-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .mas-acciones[_ngcontent-%COMP%] {\n    --padding-top: 2px;\n    --padding-bottom: 2px;\n    --padding-start: 2px;\n    --padding-end: 2px;\n  }\n  .mas-acciones[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n}\n/*# sourceMappingURL=flujo-boton.component.css.map */"] });
var FlujoBotonComponent = _FlujoBotonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlujoBotonComponent, [{
    type: Component,
    args: [{ selector: "app-flujo-boton", standalone: true, imports: [
      CommonModule,
      IonIcon,
      IonButton
    ], template: `<!-- Bot\xF3n de flujo principal -->\r
<div class="flujo-boton-container" [ngClass]="size">\r
  \r
  <!-- Estado sin acciones -->\r
  <div *ngIf="!tieneAcciones && !loading && !error" class="sin-acciones">\r
    <ion-icon name="checkmark-circle-outline" class="complete-icon"></ion-icon>\r
    <span *ngIf="showText" class="complete-text">\r
      <span class="desktop-only">Completo</span>\r
      <span class="mobile-only">\u2713</span>\r
    </span>\r
  </div>\r
\r
  <!-- Estado de carga -->\r
  <div *ngIf="loading" class="loading-state">\r
    <ion-icon name="ellipsis-horizontal-outline" class="loading-icon"></ion-icon>\r
  </div>\r
\r
  <!-- Estado de error -->\r
  <div *ngIf="error && !loading" class="error-state" [title]="error">\r
    <ion-icon name="warning-outline" class="error-icon"></ion-icon>\r
  </div>\r
\r
  <!-- Bot\xF3n de acci\xF3n principal -->\r
  <ion-button \r
    *ngIf="accionPrimaria && !loading && !error"\r
    [fill]="size === 'small' ? 'clear' : 'solid'"\r
    [size]="size"\r
    [color]="getAccionColor(accionPrimaria)"\r
    (click)="ejecutarAccionPrimaria()"\r
    [disabled]="loading"\r
    class="accion-primaria"\r
    [title]="getAccionTexto(accionPrimaria)">\r
    \r
    <ion-icon [name]="getAccionIcon(accionPrimaria)" slot="icon-only" *ngIf="!showText"></ion-icon>\r
    \r
    <ng-container *ngIf="showText">\r
      <ion-icon [name]="getAccionIcon(accionPrimaria)" slot="start"></ion-icon>\r
      <span class="accion-text">{{ getAccionTexto(accionPrimaria) }}</span>\r
    </ng-container>\r
  </ion-button>\r
\r
  <!-- Bot\xF3n de m\xE1s acciones (si hay m\xFAltiples) -->\r
  <ion-button \r
    *ngIf="accionesDisponibles.length > 1 && !loading && !error"\r
    fill="clear"\r
    size="small"\r
    color="medium"\r
    class="mas-acciones"\r
    title="M\xE1s acciones disponibles">\r
    <ion-icon name="ellipsis-horizontal-outline" slot="icon-only"></ion-icon>\r
  </ion-button>\r
\r
</div> `, styles: ["/* src/app/shared/components/flujo-boton/flujo-boton.component.scss */\n.flujo-boton-container {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.flujo-boton-container.small .accion-primaria {\n  --padding-top: 6px;\n  --padding-bottom: 6px;\n  --padding-start: 8px;\n  --padding-end: 8px;\n  font-size: 12px;\n}\n.flujo-boton-container.small .accion-primaria ion-icon {\n  font-size: 16px;\n}\n.flujo-boton-container.medium .accion-primaria {\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  --padding-start: 12px;\n  --padding-end: 12px;\n  font-size: 14px;\n}\n.flujo-boton-container.medium .accion-primaria ion-icon {\n  font-size: 18px;\n}\n.desktop-only {\n  display: inline;\n}\n.mobile-only {\n  display: none;\n}\n.sin-acciones {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #10B981;\n  font-size: 12px;\n}\n.sin-acciones .complete-icon {\n  font-size: 16px;\n  color: #10B981;\n}\n.sin-acciones .complete-text {\n  font-weight: 500;\n}\n.loading-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px;\n}\n.loading-state .loading-icon {\n  font-size: 16px;\n  color: #64748B;\n  animation: pulse 1.5s ease-in-out infinite;\n}\n.error-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px;\n}\n.error-state .error-icon {\n  font-size: 16px;\n  color: #EF4444;\n}\n.accion-primaria {\n  margin: 0;\n}\n.accion-primaria.button-clear {\n  --color: var(--ion-color-primary);\n}\n.accion-primaria.button-clear:hover {\n  --color: var(--ion-color-primary-shade);\n}\n.accion-text {\n  font-weight: 500;\n}\n.mas-acciones {\n  margin: 0;\n  --padding-top: 4px;\n  --padding-bottom: 4px;\n  --padding-start: 4px;\n  --padding-end: 4px;\n}\n.mas-acciones ion-icon {\n  font-size: 14px;\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n@media (max-width: 768px) {\n  .desktop-only {\n    display: none;\n  }\n  .mobile-only {\n    display: inline;\n  }\n  .flujo-boton-container {\n    gap: 3px;\n  }\n  .flujo-boton-container.small .accion-primaria {\n    --padding-top: 5px;\n    --padding-bottom: 5px;\n    --padding-start: 6px;\n    --padding-end: 6px;\n    font-size: 11px;\n  }\n  .flujo-boton-container.small .accion-primaria ion-icon {\n    font-size: 14px;\n  }\n  .flujo-boton-container.medium .accion-primaria {\n    --padding-top: 6px;\n    --padding-bottom: 6px;\n    --padding-start: 10px;\n    --padding-end: 10px;\n    font-size: 13px;\n  }\n  .flujo-boton-container.medium .accion-primaria ion-icon {\n    font-size: 16px;\n  }\n  .sin-acciones {\n    gap: 4px;\n    font-size: 11px;\n  }\n  .sin-acciones .complete-icon {\n    font-size: 14px;\n  }\n  .loading-state {\n    padding: 4px;\n  }\n  .loading-state .loading-icon {\n    font-size: 14px;\n  }\n  .error-state {\n    padding: 4px;\n  }\n  .error-state .error-icon {\n    font-size: 14px;\n  }\n  .mas-acciones {\n    --padding-top: 3px;\n    --padding-bottom: 3px;\n    --padding-start: 3px;\n    --padding-end: 3px;\n  }\n  .mas-acciones ion-icon {\n    font-size: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .flujo-boton-container {\n    gap: 2px;\n  }\n  .flujo-boton-container.small .accion-primaria {\n    --padding-top: 4px;\n    --padding-bottom: 4px;\n    --padding-start: 5px;\n    --padding-end: 5px;\n    font-size: 10px;\n  }\n  .flujo-boton-container.small .accion-primaria ion-icon {\n    font-size: 12px;\n  }\n  .flujo-boton-container.medium .accion-primaria {\n    --padding-top: 5px;\n    --padding-bottom: 5px;\n    --padding-start: 8px;\n    --padding-end: 8px;\n    font-size: 12px;\n  }\n  .flujo-boton-container.medium .accion-primaria ion-icon {\n    font-size: 14px;\n  }\n  .sin-acciones {\n    gap: 3px;\n    font-size: 10px;\n  }\n  .sin-acciones .complete-icon {\n    font-size: 12px;\n  }\n  .loading-state {\n    padding: 3px;\n  }\n  .loading-state .loading-icon {\n    font-size: 12px;\n  }\n  .error-state {\n    padding: 3px;\n  }\n  .error-state .error-icon {\n    font-size: 12px;\n  }\n  .mas-acciones {\n    --padding-top: 2px;\n    --padding-bottom: 2px;\n    --padding-start: 2px;\n    --padding-end: 2px;\n  }\n  .mas-acciones ion-icon {\n    font-size: 10px;\n  }\n}\n/*# sourceMappingURL=flujo-boton.component.css.map */\n"] }]
  }], () => [{ type: FlujoAvisosService }, { type: PopoverController }], { avisoId: [{
    type: Input
  }], size: [{
    type: Input
  }], showText: [{
    type: Input
  }], accionEjecutada: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FlujoBotonComponent, { className: "FlujoBotonComponent", filePath: "src/app/shared/components/flujo-boton/flujo-boton.component.ts", lineNumber: 29 });
})();

// src/app/modules/presupuestos/pages/presupuestos/presupuestos.component.ts
var _c0 = (a0, a1, a2) => ({ "en-curso": a0, "pendiente": a1, "completado": a2 });
var _c1 = (a0, a1, a2) => ({ "yellow": a0, "red": a1, "green": a2 });
function PresupuestosComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275element(2, "ion-icon", 5);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando presupuestos...");
    \u0275\u0275elementEnd()()();
  }
}
function PresupuestosComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7);
    \u0275\u0275element(2, "ion-icon", 8);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Error al cargar datos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "No se pudieron cargar los presupuestos. Int\xE9ntalo de nuevo.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 9);
    \u0275\u0275listener("click", function PresupuestosComponent_div_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refreshPresupuestos());
    });
    \u0275\u0275element(8, "ion-icon", 10);
    \u0275\u0275text(9, " Reintentar ");
    \u0275\u0275elementEnd()()();
  }
}
function PresupuestosComponent_section_3_div_30_div_19_app_flujo_boton_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-flujo-boton", 52);
    \u0275\u0275listener("accionEjecutada", function PresupuestosComponent_section_3_div_30_div_19_app_flujo_boton_16_Template_app_flujo_boton_accionEjecutada_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onAccionFlujoEjecutada($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const presupuesto_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("avisoId", presupuesto_r6.aviso_id);
  }
}
function PresupuestosComponent_section_3_div_30_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 39)(4, "span", 40);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 41);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 42)(9, "div", 43);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 44);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 45);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 46);
    \u0275\u0275template(16, PresupuestosComponent_section_3_div_30_div_19_app_flujo_boton_16_Template, 1, 1, "app-flujo-boton", 47);
    \u0275\u0275elementStart(17, "button", 48);
    \u0275\u0275listener("click", function PresupuestosComponent_section_3_div_30_div_19_Template_button_click_17_listener() {
      const presupuesto_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.verPresupuesto(presupuesto_r6));
    });
    \u0275\u0275element(18, "ion-icon", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 50);
    \u0275\u0275listener("click", function PresupuestosComponent_section_3_div_30_div_19_Template_button_click_19_listener() {
      const presupuesto_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.editarPresupuesto(presupuesto_r6));
    });
    \u0275\u0275element(20, "ion-icon", 51);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const presupuesto_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(10, _c0, presupuesto_r6.estado === "En curso", presupuesto_r6.estado === "Pendiente", presupuesto_r6.estado === "Completado"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", ctx_r1.getNumeroPresupuesto(presupuesto_r6), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(14, _c1, presupuesto_r6.estado === "En curso", presupuesto_r6.estado === "Pendiente", presupuesto_r6.estado === "Completado"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", presupuesto_r6.estado, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getNombreCliente(presupuesto_r6));
    \u0275\u0275advance(2);
    \u0275\u0275property("title", (presupuesto_r6.aviso == null ? null : presupuesto_r6.aviso.descripcion_problema) || "Sin descripci\xF3n");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (presupuesto_r6.aviso == null ? null : presupuesto_r6.aviso.descripcion_problema) || "Sin descripci\xF3n", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getFechaFormateada(presupuesto_r6));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getImporteFormateado(presupuesto_r6));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", presupuesto_r6.aviso_id);
  }
}
function PresupuestosComponent_section_3_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "div", 12)(3, "div", 32)(4, "div", 33);
    \u0275\u0275text(5, "N\xFAmero");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 34);
    \u0275\u0275text(7, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 33);
    \u0275\u0275text(9, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 33);
    \u0275\u0275text(11, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 34);
    \u0275\u0275text(13, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 34);
    \u0275\u0275text(15, "PVP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 33);
    \u0275\u0275text(17, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 35);
    \u0275\u0275template(19, PresupuestosComponent_section_3_div_30_div_19_Template, 21, 18, "div", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r1.presupuestos);
  }
}
function PresupuestosComponent_section_3_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 54);
    \u0275\u0275element(2, "ion-icon", 55);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay presupuestos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "A\xFAn no se han creado presupuestos. Crea el primero para comenzar.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 56);
    \u0275\u0275listener("click", function PresupuestosComponent_section_3_div_31_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.crearPresupuesto());
    });
    \u0275\u0275element(8, "ion-icon", 23);
    \u0275\u0275text(9, " Crear presupuesto ");
    \u0275\u0275elementEnd()()();
  }
}
function PresupuestosComponent_section_3_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 59)(4, "button", 60);
    \u0275\u0275text(5, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button");
    \u0275\u0275text(7, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button");
    \u0275\u0275text(9, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 61);
    \u0275\u0275text(11, "4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 61);
    \u0275\u0275text(13, "...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 61);
    \u0275\u0275text(15, "40");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Mostrando datos 1 a ", ctx_r1.presupuestos.length, " de ", ctx_r1.totalPresupuestos, " presupuesto");
  }
}
function PresupuestosComponent_section_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 11)(1, "div", 12)(2, "div", 13)(3, "div", 14);
    \u0275\u0275text(4, "Tabla de presupuestos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 15);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 16);
    \u0275\u0275element(8, "input", 17)(9, "ion-icon", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 19);
    \u0275\u0275element(11, "input", 20);
    \u0275\u0275elementStart(12, "select")(13, "option");
    \u0275\u0275text(14, "Ordenar por: Recientes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 21)(16, "button", 22);
    \u0275\u0275listener("click", function PresupuestosComponent_section_3_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.crearPresupuesto());
    });
    \u0275\u0275element(17, "ion-icon", 23);
    \u0275\u0275text(18, " A\xF1adir presupuesto ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "div", 24)(20, "select", 25)(21, "option");
    \u0275\u0275text(22, "Ordenar: Recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option");
    \u0275\u0275text(24, "Ordenar: Antiguos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option");
    \u0275\u0275text(26, "Ordenar: Estado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 26)(28, "button", 22);
    \u0275\u0275listener("click", function PresupuestosComponent_section_3_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.crearPresupuesto());
    });
    \u0275\u0275element(29, "ion-icon", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(30, PresupuestosComponent_section_3_div_30_Template, 20, 1, "div", 27)(31, PresupuestosComponent_section_3_div_31_Template, 10, 0, "div", 28)(32, PresupuestosComponent_section_3_div_32_Template, 16, 2, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Presupuestos: ", ctx_r1.totalPresupuestos, "");
    \u0275\u0275advance(24);
    \u0275\u0275property("ngIf", ctx_r1.presupuestos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuestos.length === 0 && !ctx_r1.isLoading && !ctx_r1.hasError);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuestos.length > 0);
  }
}
var _PresupuestosComponent = class _PresupuestosComponent {
  constructor(router, presupuestosService) {
    this.router = router;
    this.presupuestosService = presupuestosService;
    this.displayedColumns = ["numero", "estado", "nombre", "detalle", "fecha", "pvp", "acciones"];
    this.presupuestos = [];
    this.loading = false;
    this.error = false;
    this.totalPresupuestos = 0;
    this.paginaActual = 1;
    this.porPagina = 10;
    this.destroy$ = new Subject();
    addIcons({ hourglassOutline, alertCircleOutline, refreshOutline, searchOutline, addCircle, eyeOutline, createOutline, documentOutline, mapOutline, alertCircle, close, add, addCircleOutline });
  }
  ngOnInit() {
    this.cargarPresupuestos();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Carga los presupuestos desde el backend
   */
  cargarPresupuestos() {
    this.loading = true;
    this.error = false;
    this.presupuestosService.getPresupuestos(this.paginaActual, this.porPagina).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.presupuestos = response.presupuestos;
        this.totalPresupuestos = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar presupuestos:", error);
        this.error = true;
        this.loading = false;
      }
    });
  }
  /**
   * Refresca los presupuestos
   */
  refreshPresupuestos() {
    this.cargarPresupuestos();
  }
  /**
   * Navega a crear nuevo presupuesto
   */
  crearPresupuesto() {
    this.router.navigate(["/presupuestos/crear"]);
  }
  /**
   * Ver detalles de un presupuesto
   */
  verPresupuesto(presupuesto) {
    console.log("Navegando a presupuesto:", presupuesto.id);
    this.router.navigate(["/presupuestos", presupuesto.id]);
  }
  /**
   * Editar un presupuesto
   */
  editarPresupuesto(presupuesto) {
    this.router.navigate(["/presupuestos/crear"], { queryParams: { id: presupuesto.id, edit: "true" } });
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
   * Obtiene el número de presupuesto formateado
   */
  getNumeroPresupuesto(presupuesto) {
    return presupuesto.id.substring(0, 8).toUpperCase();
  }
  /**
   * Obtiene el nombre del cliente del presupuesto
   */
  getNombreCliente(presupuesto) {
    var _a;
    return ((_a = presupuesto.aviso) == null ? void 0 : _a.nombre_cliente_aviso) || "N/A";
  }
  /**
   * Obtiene la fecha formateada
   */
  getFechaFormateada(presupuesto) {
    return new Date(presupuesto.fecha_creacion).toLocaleDateString("es-ES");
  }
  /**
   * Obtiene el importe formateado
   */
  getImporteFormateado(presupuesto) {
    return this.formatearMoneda(presupuesto.total_estimado || 0);
  }
  /**
   * Maneja las acciones ejecutadas desde el botón de flujo
   */
  onAccionFlujoEjecutada(resultado) {
    console.log("Acci\xF3n de flujo ejecutada desde presupuestos:", resultado);
    this.cargarPresupuestos();
    if (resultado.mensaje) {
      console.log("Mensaje de \xE9xito:", resultado.mensaje);
    }
  }
};
_PresupuestosComponent.\u0275fac = function PresupuestosComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PresupuestosComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PresupuestosService));
};
_PresupuestosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PresupuestosComponent, selectors: [["app-presupuestos"]], decls: 4, vars: 3, consts: [["class", "loading-container", 4, "ngIf"], ["class", "error-container", 4, "ngIf"], ["class", "dashboard-table", 4, "ngIf"], [1, "loading-container"], [1, "loading-spinner"], ["name", "hourglass-outline", 1, "spinning"], [1, "error-container"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "dashboard-table"], [1, "table-header"], [1, "table-header-left"], [1, "table-title"], [1, "table-meta"], [1, "mobile-search"], ["type", "text", "placeholder", "Buscar presupuesto..."], ["name", "search-outline"], [1, "table-search", "desktop-only"], ["type", "text", "placeholder", "Buscar..."], [1, "header-actions"], [1, "btn-add", 3, "click"], ["name", "add-circle"], [1, "mobile-actions"], [1, "mobile-filter"], [1, "mobile-buttons"], ["class", "compact-presupuestos-table", 4, "ngIf"], ["class", "no-data-container", 4, "ngIf"], ["class", "table-pagination", 4, "ngIf"], [1, "compact-presupuestos-table"], [1, "presupuestos-table"], [1, "header-row"], [1, "header-cell"], [1, "header-cell", "desktop-only"], [1, "table-body"], ["class", "presupuesto-row", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "presupuesto-row", 3, "ngClass"], [1, "presupuesto-cell", "numero-presupuesto"], [1, "presupuesto-cell", "estado-presupuesto", "desktop-only"], [1, "badge", 3, "ngClass"], [1, "presupuesto-cell", "nombre-cliente"], [1, "presupuesto-cell", "descripcion-presupuesto"], [1, "descripcion-texto", 3, "title"], [1, "presupuesto-cell", "fecha-presupuesto", "desktop-only"], [1, "presupuesto-cell", "pvp-presupuesto", "desktop-only"], [1, "presupuesto-cell", "acciones"], ["size", "small", 3, "avisoId", "accionEjecutada", 4, "ngIf"], ["title", "Ver detalles", 1, "btn-ver", 3, "click"], ["name", "eye-outline"], ["title", "Editar presupuesto", 1, "btn-editar", 3, "click"], ["name", "create-outline"], ["size", "small", 3, "accionEjecutada", "avisoId"], [1, "no-data-container"], [1, "no-data-message"], ["name", "document-outline"], [1, "btn-create", 3, "click"], [1, "table-pagination"], [1, "pagination-info"], [1, "pagination"], [1, "active"], [1, "desktop-only"]], template: function PresupuestosComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content");
    \u0275\u0275template(1, PresupuestosComponent_div_1_Template, 5, 0, "div", 0)(2, PresupuestosComponent_div_2_Template, 10, 0, "div", 1)(3, PresupuestosComponent_section_3_Template, 33, 4, "section", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
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
  IonContent,
  IonIcon,
  MatTableModule,
  MatIconModule,
  FlujoBotonComponent
], styles: [`

ion-content[_ngcontent-%COMP%] {
  --background: #FFF;
}
.dashboard-table[_ngcontent-%COMP%] {
  background: #fff;
  padding: 25px;
}
.table-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
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
  gap: 20px;
}
.table-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 1rem;
  border: none;
  background: #F9FBFF;
  color: #26262A;
}
.table-search[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 1rem;
  background: #F9FBFF;
  border: none;
  color: #26262A;
}
.mobile-search[_ngcontent-%COMP%] {
  display: none;
  position: relative;
  width: 100%;
  padding: 0px 16px;
}
.mobile-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 8px 16px;
  padding-right: 40px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  background: #fff;
}
.mobile-search[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  position: absolute;
  right: 26px;
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
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
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
  background: transparent;
}
.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  background: white;
}
.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  color: #26262A;
  font-size: 14px;
}
.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.mobile-cards[_ngcontent-%COMP%] {
  display: none;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-number[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #64748b;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
  padding: 16px;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
  color: #334155;
  font-size: 14px;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row.detail[_ngcontent-%COMP%] {
  color: #64748b;
  margin: 8px 0;
  justify-content: flex-start;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   .item-label[_ngcontent-%COMP%] {
  color: #64748b;
  font-weight: 500;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   .item-value[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%] {
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {
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
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:hover {
  background: #F1F5F9;
}
.mobile-cards[_ngcontent-%COMP%]   .presupuesto-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:active {
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
  background: #FFF7E6;
  color: #B25E02;
}
.badge.red[_ngcontent-%COMP%] {
  background: #FEE4E2;
  color: #D92D20;
}
.badge.green[_ngcontent-%COMP%] {
  background: #E6F4EA;
  color: #137333;
}
.view-icon[_ngcontent-%COMP%] {
  color: #64748B;
  font-size: 20px;
  cursor: pointer;
}
.table-header-left[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
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
.header-container[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 2rem;
  color: white;
  gap: 2rem;
  padding-top: 20px;
}
.header-title[_ngcontent-%COMP%] {
  font-size: 1.5rem;
  font-weight: 500;
  color: #26262A;
}
.header-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 1rem;
}
.btn-map[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 15px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid rgba(125, 131, 152, 0.2431372549);
  text-wrap: nowrap;
}
.btn-add[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  min-height: 42px;
  background-color: #4F46E5;
  color: white;
  box-shadow: 0 1px 2px rgba(79, 70, 229, 0.1);
}
.btn-add[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.btn-add[_ngcontent-%COMP%]:hover {
  background-color: #4338CA;
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
}
.btn-add[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.header-left[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  margin-bottom: 0px;
  margin-top: 0px;
}
.header-left[_ngcontent-%COMP%]   .header-subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
}
@media (max-width: 768px) {
  .dashboard-table[_ngcontent-%COMP%] {
    height: 100%;
    margin: 0;
    padding: 0px;
    border-radius: 0;
    box-shadow: none;
  }
  .desktop-only[_ngcontent-%COMP%] {
    display: none !important;
  }
  .mobile-search[_ngcontent-%COMP%], 
   .mobile-actions[_ngcontent-%COMP%] {
    display: flex;
  }
  .table-header[_ngcontent-%COMP%] {
    margin-bottom: 12px;
    align-items: center;
    gap: 12px;
  }
  .table-header-left[_ngcontent-%COMP%] {
    flex: 1;
    padding: 0px 16px;
  }
  .table-header-container[_ngcontent-%COMP%] {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
    width: 100%;
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
  .compact-presupuestos-table[_ngcontent-%COMP%] {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    max-height: none;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
    padding: 8px 4px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.numero-presupuesto[_ngcontent-%COMP%] {
    font-size: 13px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
    font-size: 11px;
    line-height: 1.3;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 24px;
    height: 24px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 14px;
  }
}
@media (max-width: 480px) {
  .dashboard-table[_ngcontent-%COMP%] {
    height: 100%;
    padding: 0px;
  }
  .mobile-actions[_ngcontent-%COMP%] {
    gap: 12px;
    padding: 0px 16px;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%] {
    display: flex;
    width: 20%;
    justify-content: stretch;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    flex: 1;
    height: 40px;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 20px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%] {
    border-radius: 0px !important;
    border-left: none !important;
    border-right: none !important;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%] {
    grid-template-columns: 50px 1fr minmax(0, 1.5fr) 70px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
    padding: 6px 2px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.numero-presupuesto[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 11px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
    font-size: 10px;
    line-height: 1.2;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 22px;
    height: 22px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 12px;
  }
}
.compact-presupuestos-table[_ngcontent-%COMP%] {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%] {
  width: 100%;
  display: grid;
  grid-template-columns: 60px 1fr minmax(0, 1.5fr) 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  display: contents;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%] {
  display: contents;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
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
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%] {
  display: contents;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%] {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]:hover   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #F9FAFB;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.en-curso[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.en-curso[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #FFFBEB;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.en-curso[_ngcontent-%COMP%]:hover   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #FEF3C7;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.pendiente[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #EF4444;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.pendiente[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #FEF2F2;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.pendiente[_ngcontent-%COMP%]:hover   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #FEE2E2;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.completado[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #10B981;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.completado[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #ECFDF5;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.completado[_ngcontent-%COMP%]:hover   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #D1FAE5;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.numero-presupuesto[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: start;
  flex-shrink: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%] {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%]   .badge.yellow[_ngcontent-%COMP%] {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%]   .badge.red[_ngcontent-%COMP%] {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%]   .badge.green[_ngcontent-%COMP%] {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.nombre-cliente[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #374151;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%] {
  min-width: 0;
  flex: 1;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
  max-width: 100%;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.fecha-presupuesto[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.pvp-presupuesto[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #374151;
  font-weight: 500;
  justify-content: start;
  flex-shrink: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%] {
  justify-content: start;
  gap: 4px;
  flex-shrink: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
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
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #6B7280;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover {
  background-color: #10B981;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #059669;
}
@media (min-width: 769px) {
  .compact-presupuestos-table[_ngcontent-%COMP%] {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%] {
    grid-template-columns: 130px 140px minmax(150px, 1fr) minmax(200px, 2fr) 120px 100px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.numero-presupuesto[_ngcontent-%COMP%] {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 13px;
    min-width: 0;
    flex: 1;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%] {
    min-width: 0;
    flex: 1;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
    font-size: 12px;
    max-width: 100%;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.fecha-presupuesto[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.pvp-presupuesto[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 28px;
    height: 28px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 16px;
  }
}
.mobile-only[_ngcontent-%COMP%] {
  display: none;
}
@media (max-width: 768px) {
  .mobile-only[_ngcontent-%COMP%] {
    display: flex !important;
  }
}
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
.no-data-container[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
}
.no-data-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px;
  max-width: 400px;
}
.no-data-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 64px;
  color: #ACACAC;
  margin-bottom: 16px;
}
.no-data-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  color: #26262A;
  font-size: 20px;
  margin: 0 0 8px 0;
}
.no-data-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 14px;
  margin: 0 0 24px 0;
  line-height: 1.5;
}
.no-data-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%] {
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
.no-data-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: white;
  margin: 0;
}
.no-data-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%]:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.no-data-container[_ngcontent-%COMP%]   .no-data-message[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%]:active {
  transform: translateY(0);
}
.dashboard-table[_ngcontent-%COMP%] {
  background: #fff;
  padding: 25px;
  min-height: 100vh;
}
.table-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 16px;
}
.table-header-left[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  align-items: center;
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
.table-search[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.table-search[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.table-search[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%]:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.table-search[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%]:active {
  transform: translateY(0);
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
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%]:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%]:active {
  transform: translateY(0);
}
.compact-presupuestos-table[_ngcontent-%COMP%] {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%] {
  width: 100%;
  display: grid;
  grid-template-columns: 60px 1fr minmax(0, 1.5fr) 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  display: contents;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%] {
  display: contents;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
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
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%] {
  display: contents;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%] {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]:hover   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #F9FAFB;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.en-curso[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.en-curso[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #FFFBEB;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.en-curso[_ngcontent-%COMP%]:hover   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #FEF3C7;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.pendiente[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #EF4444;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.pendiente[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #FEF2F2;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.pendiente[_ngcontent-%COMP%]:hover   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #FEE2E2;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.completado[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #10B981;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.completado[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #ECFDF5;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row.completado[_ngcontent-%COMP%]:hover   .presupuesto-cell[_ngcontent-%COMP%] {
  background-color: #D1FAE5;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.numero-presupuesto[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: start;
  flex-shrink: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%] {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%]   .badge.yellow[_ngcontent-%COMP%] {
  background: #FFF7E6;
  color: #B25E02;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%]   .badge.red[_ngcontent-%COMP%] {
  background: #FEE4E2;
  color: #D92D20;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%]   .badge.green[_ngcontent-%COMP%] {
  background: #E6F4EA;
  color: #137333;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.nombre-cliente[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #374151;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%] {
  min-width: 0;
  flex: 1;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
  max-width: 100%;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.fecha-presupuesto[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.pvp-presupuesto[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
  font-weight: 500;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%] {
  justify-content: center;
  gap: 4px;
  flex-shrink: 0;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
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
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #6B7280;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover {
  background-color: #10B981;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #059669;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button.btn-editar[_ngcontent-%COMP%]:hover {
  background-color: #F59E0B;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button.btn-editar[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button.btn-editar[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #D97706;
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
@media (max-width: 768px) {
  .dashboard-table[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .desktop-only[_ngcontent-%COMP%] {
    display: none !important;
  }
  .mobile-search[_ngcontent-%COMP%], 
   .mobile-actions[_ngcontent-%COMP%] {
    display: flex;
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
@media (min-width: 769px) {
  .compact-presupuestos-table[_ngcontent-%COMP%] {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%] {
    grid-template-columns: 130px 140px minmax(150px, 1fr) minmax(200px, 2fr) 120px 100px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.numero-presupuesto[_ngcontent-%COMP%] {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.estado-presupuesto[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 13px;
    min-width: 0;
    flex: 1;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%] {
    min-width: 0;
    flex: 1;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
    font-size: 12px;
    max-width: 100%;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.fecha-presupuesto[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.pvp-presupuesto[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 28px;
    height: 28px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .compact-presupuestos-table[_ngcontent-%COMP%] {
    border-radius: 8px;
    max-height: none;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
    padding: 8px 4px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.numero-presupuesto[_ngcontent-%COMP%] {
    font-size: 13px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
    font-size: 11px;
    line-height: 1.3;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 24px;
    height: 24px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 14px;
  }
}
@media (max-width: 480px) {
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%] {
    grid-template-columns: 50px 1fr minmax(0, 1.5fr) 70px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell[_ngcontent-%COMP%] {
    padding: 6px 2px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.numero-presupuesto[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 11px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.descripcion-presupuesto[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
    font-size: 10px;
    line-height: 1.2;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 22px;
    height: 22px;
  }
  .compact-presupuestos-table[_ngcontent-%COMP%]   .presupuestos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .presupuesto-row[_ngcontent-%COMP%]   .presupuesto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 12px;
  }
}
/*# sourceMappingURL=presupuestos.component.css.map */`] });
var PresupuestosComponent = _PresupuestosComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PresupuestosComponent, [{
    type: Component,
    args: [{ selector: "app-presupuestos", standalone: true, imports: [
      CommonModule,
      IonContent,
      IonIcon,
      MatTableModule,
      MatIconModule,
      FlujoBotonComponent
    ], template: `<ion-content>\r
  <!-- Estado de carga -->\r
  <div *ngIf="isLoading" class="loading-container">\r
    <div class="loading-spinner">\r
      <ion-icon name="hourglass-outline" class="spinning"></ion-icon>\r
      <p>Cargando presupuestos...</p>\r
    </div>\r
  </div>\r
\r
  <!-- Estado de error -->\r
  <div *ngIf="hasError" class="error-container">\r
    <div class="error-message">\r
      <ion-icon name="alert-circle-outline"></ion-icon>\r
      <h3>Error al cargar datos</h3>\r
      <p>No se pudieron cargar los presupuestos. Int\xE9ntalo de nuevo.</p>\r
      <button class="btn-retry" (click)="refreshPresupuestos()">\r
        <ion-icon name="refresh-outline"></ion-icon>\r
        Reintentar\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Contenido principal -->\r
  <section *ngIf="!isLoading && !hasError" class="dashboard-table">\r
    <!-- Header Section -->\r
    <div class="table-header">\r
      <div class="table-header-left">\r
        <div class="table-title">Tabla de presupuestos</div>\r
        <div class="table-meta">Presupuestos: {{ totalPresupuestos }}</div>\r
      </div>\r
      \r
      <!-- Mobile Search Bar -->\r
      <div class="mobile-search">\r
        <input type="text" placeholder="Buscar presupuesto..." />\r
        <ion-icon name="search-outline"></ion-icon>\r
      </div>\r
\r
      <!-- Desktop Search and Actions -->\r
      <div class="table-search desktop-only">\r
        <input type="text" placeholder="Buscar..." />\r
        <select>\r
          <option>Ordenar por: Recientes</option>\r
        </select>\r
        <div class="header-actions">\r
          <button class="btn-add" (click)="crearPresupuesto()">\r
            <ion-icon name="add-circle"></ion-icon>\r
            A\xF1adir presupuesto\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Mobile Actions -->\r
    <div class="mobile-actions">\r
      <select class="mobile-filter">\r
        <option>Ordenar: Recientes</option>\r
        <option>Ordenar: Antiguos</option>\r
        <option>Ordenar: Estado</option>\r
      </select>\r
      <div class="mobile-buttons">\r
        <button class="btn-add" (click)="crearPresupuesto()">\r
          <ion-icon name="add-circle"></ion-icon>\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- Compact Table View (replaces desktop table and mobile cards) -->\r
    <div class="compact-presupuestos-table" *ngIf="presupuestos.length > 0">\r
      <div class="presupuestos-table">\r
        <div class="table-header">\r
          <div class="header-row">\r
            <div class="header-cell">N\xFAmero</div>\r
            <div class="header-cell desktop-only">Estado</div>\r
            <div class="header-cell">Cliente</div>\r
            <div class="header-cell">Descripci\xF3n</div>\r
            <div class="header-cell desktop-only">Fecha</div>\r
            <div class="header-cell desktop-only">PVP</div>\r
            <div class="header-cell">Acciones</div>\r
          </div>\r
        </div>\r
        <div class="table-body">\r
          <div *ngFor="let presupuesto of presupuestos" class="presupuesto-row" [ngClass]="{\r
                 'en-curso': presupuesto.estado === 'En curso',\r
                 'pendiente': presupuesto.estado === 'Pendiente',\r
                 'completado': presupuesto.estado === 'Completado'\r
               }">\r
            <div class="presupuesto-cell numero-presupuesto">#{{ getNumeroPresupuesto(presupuesto) }}</div>\r
            <div class="presupuesto-cell estado-presupuesto desktop-only">\r
              <span class="badge" [ngClass]="{\r
                      'yellow': presupuesto.estado === 'En curso',\r
                      'red': presupuesto.estado === 'Pendiente',\r
                      'green': presupuesto.estado === 'Completado'\r
                    }">\r
                {{ presupuesto.estado }}\r
              </span>\r
            </div>\r
            <div class="presupuesto-cell nombre-cliente">{{ getNombreCliente(presupuesto) }}</div>\r
            <div class="presupuesto-cell descripcion-presupuesto">\r
              <div class="descripcion-texto" [title]="presupuesto.aviso?.descripcion_problema || 'Sin descripci\xF3n'">\r
                {{ presupuesto.aviso?.descripcion_problema || 'Sin descripci\xF3n' }}\r
              </div>\r
            </div>\r
            <div class="presupuesto-cell fecha-presupuesto desktop-only">{{ getFechaFormateada(presupuesto) }}</div>\r
            <div class="presupuesto-cell pvp-presupuesto desktop-only">{{ getImporteFormateado(presupuesto) }}</div>\r
            <div class="presupuesto-cell acciones">\r
              <!-- Bot\xF3n de flujo r\xE1pido (para el aviso asociado) -->\r
              <app-flujo-boton \r
                *ngIf="presupuesto.aviso_id"\r
                [avisoId]="presupuesto.aviso_id"\r
                size="small"\r
                (accionEjecutada)="onAccionFlujoEjecutada($event)">\r
              </app-flujo-boton>\r
              \r
              <button class="btn-ver" title="Ver detalles" (click)="verPresupuesto(presupuesto)">\r
                <ion-icon name="eye-outline"></ion-icon>\r
              </button>\r
              <button class="btn-editar" title="Editar presupuesto" (click)="editarPresupuesto(presupuesto)">\r
                <ion-icon name="create-outline"></ion-icon>\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Estado de datos vac\xEDos -->\r
    <div *ngIf="presupuestos.length === 0 && !isLoading && !hasError" class="no-data-container">\r
      <div class="no-data-message">\r
        <ion-icon name="document-outline"></ion-icon>\r
        <h3>No hay presupuestos</h3>\r
        <p>A\xFAn no se han creado presupuestos. Crea el primero para comenzar.</p>\r
        <button class="btn-create" (click)="crearPresupuesto()">\r
          <ion-icon name="add-circle"></ion-icon>\r
          Crear presupuesto\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- Pagination -->\r
    <div *ngIf="presupuestos.length > 0" class="table-pagination">\r
      <span class="pagination-info">Mostrando datos 1 a {{ presupuestos.length }} de {{ totalPresupuestos }} presupuesto</span>\r
      <div class="pagination">\r
        <button class="active">1</button>\r
        <button>2</button>\r
        <button>3</button>\r
        <button class="desktop-only">4</button>\r
        <span class="desktop-only">...</span>\r
        <button class="desktop-only">40</button>\r
      </div>\r
    </div>\r
  </section>\r
</ion-content>`, styles: [`/* src/app/modules/presupuestos/pages/presupuestos/presupuestos.component.scss */
ion-content {
  --background: #FFF;
}
.dashboard-table {
  background: #fff;
  padding: 25px;
}
.table-header {
  display: flex;
  align-items: center;
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
  gap: 20px;
}
.table-search input {
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 1rem;
  border: none;
  background: #F9FBFF;
  color: #26262A;
}
.table-search select {
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 1rem;
  background: #F9FBFF;
  border: none;
  color: #26262A;
}
.mobile-search {
  display: none;
  position: relative;
  width: 100%;
  padding: 0px 16px;
}
.mobile-search input {
  width: 100%;
  padding: 8px 16px;
  padding-right: 40px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  background: #fff;
}
.mobile-search ion-icon {
  position: absolute;
  right: 26px;
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
.mobile-actions .mobile-buttons {
  display: flex;
  gap: 8px;
}
.mobile-actions .mobile-buttons button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
}
.mobile-actions .mobile-buttons button ion-icon {
  font-size: 20px;
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
  background: transparent;
}
.custom-mat-table tbody tr {
  background: white;
}
.custom-mat-table tbody tr td {
  color: #26262A;
  font-size: 14px;
}
.custom-mat-table tbody tr td:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.custom-mat-table tbody tr td:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.mobile-cards {
  display: none;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}
.mobile-cards .presupuesto-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.mobile-cards .presupuesto-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.mobile-cards .presupuesto-card .card-header .card-number {
  font-weight: 500;
  color: #64748b;
}
.mobile-cards .presupuesto-card .card-body {
  padding: 16px;
}
.mobile-cards .presupuesto-card .card-body .card-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
  color: #334155;
  font-size: 14px;
}
.mobile-cards .presupuesto-card .card-body .card-row.detail {
  color: #64748b;
  margin: 8px 0;
  justify-content: flex-start;
}
.mobile-cards .presupuesto-card .card-body .card-row .item-label {
  color: #64748b;
  font-weight: 500;
}
.mobile-cards .presupuesto-card .card-body .card-row .item-value {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards .presupuesto-card .card-body .card-row strong {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards .presupuesto-card .card-actions {
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
}
.mobile-cards .presupuesto-card .card-actions .action-btn {
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
.mobile-cards .presupuesto-card .card-actions .action-btn ion-icon {
  font-size: 20px;
}
.mobile-cards .presupuesto-card .card-actions .action-btn:hover {
  background: #F1F5F9;
}
.mobile-cards .presupuesto-card .card-actions .action-btn:active {
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
  background: #FFF7E6;
  color: #B25E02;
}
.badge.red {
  background: #FEE4E2;
  color: #D92D20;
}
.badge.green {
  background: #E6F4EA;
  color: #137333;
}
.view-icon {
  color: #64748B;
  font-size: 20px;
  cursor: pointer;
}
.table-header-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
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
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 2rem;
  color: white;
  gap: 2rem;
  padding-top: 20px;
}
.header-title {
  font-size: 1.5rem;
  font-weight: 500;
  color: #26262A;
}
.header-actions {
  display: flex;
  gap: 1rem;
}
.btn-map {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 15px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid rgba(125, 131, 152, 0.2431372549);
  text-wrap: nowrap;
}
.btn-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  min-height: 42px;
  background-color: #4F46E5;
  color: white;
  box-shadow: 0 1px 2px rgba(79, 70, 229, 0.1);
}
.btn-add ion-icon {
  font-size: 20px;
}
.btn-add:hover {
  background-color: #4338CA;
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
}
.btn-add:active {
  transform: scale(0.98);
}
.header-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.header-left h1 {
  margin-bottom: 0px;
  margin-top: 0px;
}
.header-left .header-subtitle {
  font-size: 14px;
  color: #64748b;
}
@media (max-width: 768px) {
  .dashboard-table {
    height: 100%;
    margin: 0;
    padding: 0px;
    border-radius: 0;
    box-shadow: none;
  }
  .desktop-only {
    display: none !important;
  }
  .mobile-search,
  .mobile-actions {
    display: flex;
  }
  .table-header {
    margin-bottom: 12px;
    align-items: center;
    gap: 12px;
  }
  .table-header-left {
    flex: 1;
    padding: 0px 16px;
  }
  .table-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
    width: 100%;
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
  .compact-presupuestos-table {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    max-height: none;
  }
  .compact-presupuestos-table .presupuestos-table .table-header .header-row .header-cell {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell {
    padding: 8px 4px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.numero-presupuesto {
    font-size: 13px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.nombre-cliente {
    font-size: 12px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto .descripcion-texto {
    font-size: 11px;
    line-height: 1.3;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button {
    width: 24px;
    height: 24px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button ion-icon {
    font-size: 14px;
  }
}
@media (max-width: 480px) {
  .dashboard-table {
    height: 100%;
    padding: 0px;
  }
  .mobile-actions {
    gap: 12px;
    padding: 0px 16px;
  }
  .mobile-actions .mobile-buttons {
    display: flex;
    width: 20%;
    justify-content: stretch;
  }
  .mobile-actions .mobile-buttons button {
    flex: 1;
    height: 40px;
  }
  .mobile-actions .mobile-buttons button ion-icon {
    font-size: 20px;
  }
  .compact-presupuestos-table {
    border-radius: 0px !important;
    border-left: none !important;
    border-right: none !important;
  }
  .compact-presupuestos-table .presupuestos-table {
    grid-template-columns: 50px 1fr minmax(0, 1.5fr) 70px;
  }
  .compact-presupuestos-table .presupuestos-table .table-header .header-row .header-cell {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell {
    padding: 6px 2px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.numero-presupuesto {
    font-size: 12px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.nombre-cliente {
    font-size: 11px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto .descripcion-texto {
    font-size: 10px;
    line-height: 1.2;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button {
    width: 22px;
    height: 22px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button ion-icon {
    font-size: 12px;
  }
}
.compact-presupuestos-table {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-presupuestos-table .presupuestos-table {
  width: 100%;
  display: grid;
  grid-template-columns: 60px 1fr minmax(0, 1.5fr) 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-presupuestos-table .presupuestos-table .table-header {
  display: contents;
}
.compact-presupuestos-table .presupuestos-table .table-header .header-row {
  display: contents;
}
.compact-presupuestos-table .presupuestos-table .table-header .header-row .header-cell {
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
.compact-presupuestos-table .presupuestos-table .table-body {
  display: contents;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row:hover .presupuesto-cell {
  background-color: #F9FAFB;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row:active {
  transform: scale(0.98);
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.en-curso .presupuesto-cell:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.en-curso .presupuesto-cell {
  background-color: #FFFBEB;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.en-curso:hover .presupuesto-cell {
  background-color: #FEF3C7;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.pendiente .presupuesto-cell:first-child {
  border-left: 4px solid #EF4444;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.pendiente .presupuesto-cell {
  background-color: #FEF2F2;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.pendiente:hover .presupuesto-cell {
  background-color: #FEE2E2;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.completado .presupuesto-cell:first-child {
  border-left: 4px solid #10B981;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.completado .presupuesto-cell {
  background-color: #ECFDF5;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.completado:hover .presupuesto-cell {
  background-color: #D1FAE5;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.numero-presupuesto {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: start;
  flex-shrink: 0;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto .badge {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto .badge.yellow {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto .badge.red {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto .badge.green {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.nombre-cliente {
  font-weight: 500;
  color: #374151;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto {
  min-width: 0;
  flex: 1;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto .descripcion-texto {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
  max-width: 100%;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.fecha-presupuesto {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.pvp-presupuesto {
  font-size: 12px;
  color: #374151;
  font-weight: 500;
  justify-content: start;
  flex-shrink: 0;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones {
  justify-content: start;
  gap: 4px;
  flex-shrink: 0;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button {
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
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button ion-icon {
  font-size: 16px;
  color: #6B7280;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button.btn-ver:hover {
  background-color: #10B981;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button.btn-ver:hover ion-icon {
  color: white;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button.btn-ver:active {
  transform: scale(0.9);
  background-color: #059669;
}
@media (min-width: 769px) {
  .compact-presupuestos-table {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-presupuestos-table .presupuestos-table {
    grid-template-columns: 130px 140px minmax(150px, 1fr) minmax(200px, 2fr) 120px 100px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-header .header-row .header-cell {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.numero-presupuesto {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto {
    flex-shrink: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.nombre-cliente {
    font-size: 13px;
    min-width: 0;
    flex: 1;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto {
    min-width: 0;
    flex: 1;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto .descripcion-texto {
    font-size: 12px;
    max-width: 100%;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.fecha-presupuesto {
    flex-shrink: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.pvp-presupuesto {
    flex-shrink: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones {
    flex-shrink: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button {
    width: 28px;
    height: 28px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button ion-icon {
    font-size: 16px;
  }
}
.mobile-only {
  display: none;
}
@media (max-width: 768px) {
  .mobile-only {
    display: flex !important;
  }
}
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
.no-data-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
}
.no-data-container .no-data-message {
  text-align: center;
  padding: 40px;
  max-width: 400px;
}
.no-data-container .no-data-message ion-icon {
  font-size: 64px;
  color: #ACACAC;
  margin-bottom: 16px;
}
.no-data-container .no-data-message h3 {
  color: #26262A;
  font-size: 20px;
  margin: 0 0 8px 0;
}
.no-data-container .no-data-message p {
  color: #64748b;
  font-size: 14px;
  margin: 0 0 24px 0;
  line-height: 1.5;
}
.no-data-container .no-data-message .btn-create {
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
.no-data-container .no-data-message .btn-create ion-icon {
  font-size: 18px;
  color: white;
  margin: 0;
}
.no-data-container .no-data-message .btn-create:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.no-data-container .no-data-message .btn-create:active {
  transform: translateY(0);
}
.dashboard-table {
  background: #fff;
  padding: 25px;
  min-height: 100vh;
}
.table-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 16px;
}
.table-header-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  align-items: center;
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
.table-search .header-actions .btn-add {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.table-search .header-actions .btn-add ion-icon {
  font-size: 18px;
}
.table-search .header-actions .btn-add:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.table-search .header-actions .btn-add:active {
  transform: translateY(0);
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
.mobile-actions .mobile-buttons .btn-add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.mobile-actions .mobile-buttons .btn-add ion-icon {
  font-size: 20px;
}
.mobile-actions .mobile-buttons .btn-add:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.mobile-actions .mobile-buttons .btn-add:active {
  transform: translateY(0);
}
.compact-presupuestos-table {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-presupuestos-table .presupuestos-table {
  width: 100%;
  display: grid;
  grid-template-columns: 60px 1fr minmax(0, 1.5fr) 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-presupuestos-table .presupuestos-table .table-header {
  display: contents;
}
.compact-presupuestos-table .presupuestos-table .table-header .header-row {
  display: contents;
}
.compact-presupuestos-table .presupuestos-table .table-header .header-row .header-cell {
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
.compact-presupuestos-table .presupuestos-table .table-body {
  display: contents;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row:hover .presupuesto-cell {
  background-color: #F9FAFB;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row:active {
  transform: scale(0.98);
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.en-curso .presupuesto-cell:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.en-curso .presupuesto-cell {
  background-color: #FFFBEB;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.en-curso:hover .presupuesto-cell {
  background-color: #FEF3C7;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.pendiente .presupuesto-cell:first-child {
  border-left: 4px solid #EF4444;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.pendiente .presupuesto-cell {
  background-color: #FEF2F2;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.pendiente:hover .presupuesto-cell {
  background-color: #FEE2E2;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.completado .presupuesto-cell:first-child {
  border-left: 4px solid #10B981;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.completado .presupuesto-cell {
  background-color: #ECFDF5;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row.completado:hover .presupuesto-cell {
  background-color: #D1FAE5;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.numero-presupuesto {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: start;
  flex-shrink: 0;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto .badge {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto .badge.yellow {
  background: #FFF7E6;
  color: #B25E02;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto .badge.red {
  background: #FEE4E2;
  color: #D92D20;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto .badge.green {
  background: #E6F4EA;
  color: #137333;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.nombre-cliente {
  font-weight: 500;
  color: #374151;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto {
  min-width: 0;
  flex: 1;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto .descripcion-texto {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
  max-width: 100%;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.fecha-presupuesto {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.pvp-presupuesto {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
  font-weight: 500;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones {
  justify-content: center;
  gap: 4px;
  flex-shrink: 0;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button {
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
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button ion-icon {
  font-size: 16px;
  color: #6B7280;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button.btn-ver:hover {
  background-color: #10B981;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button.btn-ver:hover ion-icon {
  color: white;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button.btn-ver:active {
  transform: scale(0.9);
  background-color: #059669;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button.btn-editar:hover {
  background-color: #F59E0B;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button.btn-editar:hover ion-icon {
  color: white;
}
.compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button.btn-editar:active {
  transform: scale(0.9);
  background-color: #D97706;
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
@media (max-width: 768px) {
  .dashboard-table {
    padding: 16px;
  }
  .desktop-only {
    display: none !important;
  }
  .mobile-search,
  .mobile-actions {
    display: flex;
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
@media (min-width: 769px) {
  .compact-presupuestos-table {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-presupuestos-table .presupuestos-table {
    grid-template-columns: 130px 140px minmax(150px, 1fr) minmax(200px, 2fr) 120px 100px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-header .header-row .header-cell {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.numero-presupuesto {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.estado-presupuesto {
    flex-shrink: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.nombre-cliente {
    font-size: 13px;
    min-width: 0;
    flex: 1;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto {
    min-width: 0;
    flex: 1;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto .descripcion-texto {
    font-size: 12px;
    max-width: 100%;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.fecha-presupuesto {
    flex-shrink: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.pvp-presupuesto {
    flex-shrink: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones {
    flex-shrink: 0;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button {
    width: 28px;
    height: 28px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button ion-icon {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .compact-presupuestos-table {
    border-radius: 8px;
    max-height: none;
  }
  .compact-presupuestos-table .presupuestos-table .table-header .header-row .header-cell {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell {
    padding: 8px 4px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.numero-presupuesto {
    font-size: 13px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.nombre-cliente {
    font-size: 12px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto .descripcion-texto {
    font-size: 11px;
    line-height: 1.3;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button {
    width: 24px;
    height: 24px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button ion-icon {
    font-size: 14px;
  }
}
@media (max-width: 480px) {
  .compact-presupuestos-table .presupuestos-table {
    grid-template-columns: 50px 1fr minmax(0, 1.5fr) 70px;
  }
  .compact-presupuestos-table .presupuestos-table .table-header .header-row .header-cell {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell {
    padding: 6px 2px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.numero-presupuesto {
    font-size: 12px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.nombre-cliente {
    font-size: 11px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.descripcion-presupuesto .descripcion-texto {
    font-size: 10px;
    line-height: 1.2;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button {
    width: 22px;
    height: 22px;
  }
  .compact-presupuestos-table .presupuestos-table .table-body .presupuesto-row .presupuesto-cell.acciones button ion-icon {
    font-size: 12px;
  }
}
/*# sourceMappingURL=presupuestos.component.css.map */
`] }]
  }], () => [{ type: Router }, { type: PresupuestosService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PresupuestosComponent, { className: "PresupuestosComponent", filePath: "src/app/modules/presupuestos/pages/presupuestos/presupuestos.component.ts", lineNumber: 36 });
})();
export {
  PresupuestosComponent
};
//# sourceMappingURL=presupuestos.component-YVFTXDFW.js.map
