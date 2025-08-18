import {
  PresupuestosService
} from "./chunk-SKNF6UHJ.js";
import "./chunk-VHAQXQOQ.js";
import {
  addIcons,
  alertCircleOutline,
  arrowBackOutline,
  createOutline,
  downloadOutline,
  eyeOutline,
  printOutline,
  refreshOutline
} from "./chunk-YLHOXAZF.js";
import "./chunk-7DTAJMEV.js";
import {
  IonContent,
  IonIcon
} from "./chunk-DJA56OJT.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  NgForOf,
  NgIf,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
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
import "./chunk-KNQSF6OU.js";

// src/app/modules/presupuestos/components/ver-presupuesto/ver-presupuesto.component.ts
function VerPresupuestoComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "button", 9);
    \u0275\u0275listener("click", function VerPresupuestoComponent_div_6_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editarPresupuesto());
    });
    \u0275\u0275element(2, "ion-icon", 10);
    \u0275\u0275text(3, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 9);
    \u0275\u0275listener("click", function VerPresupuestoComponent_div_6_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.imprimirPresupuesto());
    });
    \u0275\u0275element(5, "ion-icon", 11);
    \u0275\u0275text(6, " Imprimir ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 12);
    \u0275\u0275listener("click", function VerPresupuestoComponent_div_6_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.descargarPresupuesto());
    });
    \u0275\u0275element(8, "ion-icon", 13);
    \u0275\u0275text(9, " Descargar PDF ");
    \u0275\u0275elementEnd()();
  }
}
function VerPresupuestoComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15);
    \u0275\u0275element(2, "ion-icon", 16);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando presupuesto...");
    \u0275\u0275elementEnd()()();
  }
}
function VerPresupuestoComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    \u0275\u0275element(2, "ion-icon", 19);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 20);
    \u0275\u0275listener("click", function VerPresupuestoComponent_div_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cargarPresupuesto());
    });
    \u0275\u0275element(6, "ion-icon", 21);
    \u0275\u0275text(7, " Reintentar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function VerPresupuestoComponent_div_9_div_32_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.presupuesto.aviso.cliente.email, " ");
  }
}
function VerPresupuestoComponent_div_9_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "h3");
    \u0275\u0275text(2, "Datos del Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 45)(4, "p")(5, "strong");
    \u0275\u0275text(6, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p")(9, "strong");
    \u0275\u0275text(10, "Direcci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p")(13, "strong");
    \u0275\u0275text(14, "Tel\xE9fono:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, VerPresupuestoComponent_div_9_div_32_p_16_Template, 4, 1, "p", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r1.presupuesto.aviso.nombre_cliente_aviso, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.presupuesto.aviso.direccion_cliente_aviso, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.presupuesto.aviso.telefono_cliente_aviso, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuesto.aviso.cliente == null ? null : ctx_r1.presupuesto.aviso.cliente.email);
  }
}
function VerPresupuestoComponent_div_9_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "h3");
    \u0275\u0275text(2, "Descripci\xF3n del Trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.presupuesto.aviso.descripcion_problema);
  }
}
function VerPresupuestoComponent_div_9_div_34_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const material_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((material_r4.material == null ? null : material_r4.material.nombre) || "Material sin nombre");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(material_r4.cantidad_estimada);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda(material_r4.precio_neto_al_momento));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda(material_r4.cantidad_estimada * material_r4.precio_neto_al_momento));
  }
}
function VerPresupuestoComponent_div_9_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "h3");
    \u0275\u0275text(2, "Materiales Estimados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 49)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "Material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Precio Unit.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Total");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, VerPresupuestoComponent_div_9_div_34_tr_15_Template, 9, 4, "tr", 50);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r1.presupuesto.materiales);
  }
}
function VerPresupuestoComponent_div_9_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "h3");
    \u0275\u0275text(2, "Mano de Obra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 52)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "Concepto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Horas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Precio/Hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Total");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody")(15, "tr")(16, "td");
    \u0275\u0275text(17, "Trabajo t\xE9cnico especializado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(19);
    \u0275\u0275textInterpolate1("", ctx_r1.presupuesto.horas_estimadas, "h");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda(50));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda((ctx_r1.presupuesto.horas_estimadas || 0) * 50));
  }
}
function VerPresupuestoComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23)(2, "div", 24);
    \u0275\u0275element(3, "img", 25);
    \u0275\u0275elementStart(4, "div", 26)(5, "h3");
    \u0275\u0275text(6, "Tu Empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Direcci\xF3n de la empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "Tel\xE9fono: +34 123 456 789");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "Email: info@tuempresa.com");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 27)(14, "h1");
    \u0275\u0275text(15, "PRESUPUESTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 28)(17, "div", 29)(18, "span", 30);
    \u0275\u0275text(19, "N\xFAmero:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 31);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 29)(23, "span", 30);
    \u0275\u0275text(24, "Fecha:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 31);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 29)(28, "span", 30);
    \u0275\u0275text(29, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 32);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275template(32, VerPresupuestoComponent_div_9_div_32_Template, 17, 4, "div", 33)(33, VerPresupuestoComponent_div_9_div_33_Template, 5, 1, "div", 34)(34, VerPresupuestoComponent_div_9_div_34_Template, 16, 1, "div", 35)(35, VerPresupuestoComponent_div_9_div_35_Template, 24, 3, "div", 36);
    \u0275\u0275elementStart(36, "div", 37)(37, "div", 38)(38, "div", 39)(39, "span");
    \u0275\u0275text(40, "Subtotal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span");
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 39)(44, "span");
    \u0275\u0275text(45, "IVA (21%):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "span");
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 40)(49, "span");
    \u0275\u0275text(50, "TOTAL:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span");
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(53, "div", 41)(54, "h3");
    \u0275\u0275text(55, "Condiciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "ul")(57, "li");
    \u0275\u0275text(58, "Este presupuesto tiene una validez de 30 d\xEDas desde su emisi\xF3n.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "li");
    \u0275\u0275text(60, "Los precios incluyen IVA.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "li");
    \u0275\u0275text(62, "El pago se realizar\xE1 seg\xFAn las condiciones acordadas.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "li");
    \u0275\u0275text(64, "Los materiales podr\xE1n variar seg\xFAn disponibilidad.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "div", 42)(66, "p");
    \u0275\u0275text(67, "Gracias por confiar en nuestros servicios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 43)(69, "span");
    \u0275\u0275text(70, "Tu Empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "span");
    \u0275\u0275text(72, "+34 123 456 789");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "span");
    \u0275\u0275text(74, "info@tuempresa.com");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(21);
    \u0275\u0275textInterpolate1("#", ctx_r1.presupuesto.id == null ? null : ctx_r1.presupuesto.id.substring(0, 8), "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatearFecha(ctx_r1.presupuesto.fecha_creacion));
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r1.getEstadoClass(ctx_r1.presupuesto.estado));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.presupuesto.estado, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuesto.aviso);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuesto.aviso);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuesto.materiales && ctx_r1.presupuesto.materiales.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.presupuesto.horas_estimadas);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda(ctx_r1.presupuesto.total_estimado || 0));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda((ctx_r1.presupuesto.total_estimado || 0) * 0.21));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatearMoneda((ctx_r1.presupuesto.total_estimado || 0) * 1.21));
  }
}
var _VerPresupuestoComponent = class _VerPresupuestoComponent {
  constructor(route, router, presupuestosService) {
    this.route = route;
    this.router = router;
    this.presupuestosService = presupuestosService;
    this.presupuesto = null;
    this.loading = false;
    this.error = null;
    this.presupuestoId = null;
    console.log("VerPresupuestoComponent constructor");
    addIcons({ arrowBackOutline, createOutline, printOutline, downloadOutline, refreshOutline, alertCircleOutline, eyeOutline });
  }
  ngOnInit() {
    console.log("VerPresupuestoComponent ngOnInit");
    this.route.params.subscribe((params) => {
      this.presupuestoId = params["id"];
      console.log("ID del presupuesto recibido:", this.presupuestoId);
      if (this.presupuestoId) {
        this.cargarPresupuesto();
      }
    });
  }
  cargarPresupuesto() {
    if (!this.presupuestoId)
      return;
    console.log("Cargando presupuesto con ID:", this.presupuestoId);
    this.loading = true;
    this.error = null;
    this.presupuestosService.getPresupuesto(this.presupuestoId).subscribe({
      next: (presupuesto) => {
        console.log("Presupuesto cargado:", presupuesto);
        this.presupuesto = presupuesto;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar presupuesto:", error);
        this.error = `Error al cargar el presupuesto: ${error.message || error}`;
        this.loading = false;
      }
    });
  }
  volver() {
    this.router.navigate(["/presupuestos"]);
  }
  editarPresupuesto() {
    if (this.presupuestoId) {
      this.router.navigate(["/presupuestos/crear"], {
        queryParams: {
          id: this.presupuestoId,
          edit: "true"
        }
      });
    }
  }
  imprimirPresupuesto() {
    window.print();
  }
  descargarPresupuesto() {
    console.log("Descargar presupuesto como PDF");
  }
  formatearMoneda(valor) {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR"
    }).format(valor);
  }
  formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString("es-ES");
  }
  getEstadoClass(estado) {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return "estado-pendiente";
      case "en curso":
        return "estado-en-curso";
      case "completado":
        return "estado-completado";
      case "facturado":
        return "estado-facturado";
      case "cancelado":
        return "estado-cancelado";
      default:
        return "estado-default";
    }
  }
};
_VerPresupuestoComponent.\u0275fac = function VerPresupuestoComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _VerPresupuestoComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PresupuestosService));
};
_VerPresupuestoComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VerPresupuestoComponent, selectors: [["app-ver-presupuesto"]], decls: 10, vars: 4, consts: [[1, "presupuesto-container"], [1, "page-header"], [1, "btn-back", 3, "click"], ["name", "arrow-back-outline"], ["class", "header-actions", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "presupuesto-content", 4, "ngIf"], [1, "header-actions"], [1, "btn-secondary", 3, "click"], ["name", "create-outline"], ["name", "print-outline"], [1, "btn-primary", 3, "click"], ["name", "download-outline"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "error-state"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "presupuesto-content"], [1, "presupuesto-header"], [1, "logo-section"], ["src", "assets/icon/favicon.png", "alt", "Logo empresa", 1, "company-logo"], [1, "company-info"], [1, "presupuesto-info"], [1, "presupuesto-details"], [1, "detail-row"], [1, "label"], [1, "value"], [1, "badge"], ["class", "cliente-section", 4, "ngIf"], ["class", "trabajo-section", 4, "ngIf"], ["class", "materiales-section", 4, "ngIf"], ["class", "mano-obra-section", 4, "ngIf"], [1, "totales-section"], [1, "totales-container"], [1, "total-row"], [1, "total-row", "total-final"], [1, "condiciones-section"], [1, "presupuesto-footer"], [1, "footer-contact"], [1, "cliente-section"], [1, "cliente-info"], [4, "ngIf"], [1, "trabajo-section"], [1, "materiales-section"], [1, "materiales-table"], [4, "ngFor", "ngForOf"], [1, "mano-obra-section"], [1, "mano-obra-table"]], template: function VerPresupuestoComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content")(1, "div", 0)(2, "div", 1)(3, "button", 2);
    \u0275\u0275listener("click", function VerPresupuestoComponent_Template_button_click_3_listener() {
      return ctx.volver();
    });
    \u0275\u0275element(4, "ion-icon", 3);
    \u0275\u0275text(5, " Volver a Presupuestos ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, VerPresupuestoComponent_div_6_Template, 10, 0, "div", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, VerPresupuestoComponent_div_7_Template, 5, 0, "div", 5)(8, VerPresupuestoComponent_div_8_Template, 8, 1, "div", 6)(9, VerPresupuestoComponent_div_9_Template, 75, 12, "div", 7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.presupuesto);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.presupuesto && !ctx.loading);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, IonContent, IonIcon], styles: ['@charset "UTF-8";\n\n\n\nion-content[_ngcontent-%COMP%] {\n  --background: #fff;\n}\n.presupuesto-container[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  padding: 20px;\n  background-color: #fff;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.btn-back[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: #f7fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  color: #4a5568;\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: #edf2f7;\n  border-color: #cbd5e0;\n}\n.btn-back[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: white;\n  color: #4a5568;\n  border: 1px solid #e2e8f0;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #f7fafc;\n  border-color: #cbd5e0;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n  border: 1px solid #4f46e5;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n  border-color: #4338ca;\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 300px;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #64748b;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n  color: #cbd5e0;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 0;\n}\n.loading-state[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.presupuesto-content[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 24px;\n  padding: 32px;\n  border: 1px solid #e2e8f0;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.presupuesto-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 32px;\n  padding-bottom: 24px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]   .company-logo[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  object-fit: contain;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]   .company-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  font-size: 18px;\n  font-weight: 600;\n  margin: 0 0 8px 0;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]   .company-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 13px;\n  margin: 2px 0;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  font-size: 24px;\n  font-weight: 700;\n  margin: 0 0 16px 0;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%]   .presupuesto-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 8px;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%]   .presupuesto-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 13px;\n  font-weight: 500;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%]   .presupuesto-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #1f2937;\n  font-size: 13px;\n  font-weight: 600;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%]   .presupuesto-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%]   .presupuesto-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .badge.estado-pendiente[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%]   .presupuesto-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .badge.estado-en-curso[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%]   .presupuesto-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .badge.estado-completado[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%]   .presupuesto-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .badge.estado-facturado[_ngcontent-%COMP%] {\n  background: #e0e7ff;\n  color: #3730a3;\n}\n.presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%]   .presupuesto-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   .badge.estado-cancelado[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.cliente-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.trabajo-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n}\n.cliente-section[_ngcontent-%COMP%]   .cliente-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.trabajo-section[_ngcontent-%COMP%]   .cliente-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  color: #4a5568;\n  font-size: 14px;\n}\n.cliente-section[_ngcontent-%COMP%]   .cliente-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.trabajo-section[_ngcontent-%COMP%]   .cliente-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2d3748;\n}\n.cliente-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.trabajo-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #4a5568;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.materiales-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.mano-obra-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 16px 0;\n}\n.materiales-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%], \n.materiales-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%], \n.mano-obra-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%], \n.mano-obra-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 16px;\n}\n.materiales-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.materiales-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.materiales-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.materiales-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.mano-obra-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.mano-obra-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.mano-obra-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.mano-obra-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px;\n  text-align: left;\n  border-bottom: 1px solid #e2e8f0;\n}\n.materiales-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.materiales-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.mano-obra-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.mano-obra-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: #6b7280;\n  font-weight: 600;\n  font-size: 13px;\n}\n.materiales-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.materiales-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.mano-obra-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.mano-obra-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: #1f2937;\n  font-size: 14px;\n}\n.materiales-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover, \n.materiales-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover, \n.mano-obra-section[_ngcontent-%COMP%]   .materiales-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover, \n.mano-obra-section[_ngcontent-%COMP%]   .mano-obra-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.totales-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin: 24px 0;\n}\n.totales-section[_ngcontent-%COMP%]   .totales-container[_ngcontent-%COMP%] {\n  background: #eef2ff;\n  border-radius: 16px;\n  padding: 20px;\n  min-width: 300px;\n}\n.totales-section[_ngcontent-%COMP%]   .totales-container[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 12px;\n  font-size: 14px;\n  color: #4f46e5;\n}\n.totales-section[_ngcontent-%COMP%]   .totales-container[_ngcontent-%COMP%]   .total-row.total-final[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n  margin: 12px -20px -20px -20px;\n  padding: 16px 20px;\n  border-radius: 0 0 16px 16px;\n  font-size: 16px;\n  font-weight: 700;\n}\n.condiciones-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n}\n.condiciones-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.condiciones-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  color: #4a5568;\n  font-size: 14px;\n  margin-bottom: 8px;\n  position: relative;\n  padding-left: 20px;\n}\n.condiciones-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before {\n  content: "\\2022";\n  color: #4f46e5;\n  position: absolute;\n  left: 0;\n  font-weight: bold;\n}\n.presupuesto-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-top: 24px;\n  border-top: 1px solid #e2e8f0;\n}\n.presupuesto-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n}\n.presupuesto-footer[_ngcontent-%COMP%]   .footer-contact[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 24px;\n  color: #6b7280;\n  font-size: 13px;\n}\n@media (max-width: 768px) {\n  .presupuesto-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 16px;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-end;\n  }\n  .presupuesto-content[_ngcontent-%COMP%] {\n    padding: 20px;\n    border-radius: 12px;\n  }\n  .presupuesto-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 20px;\n  }\n  .presupuesto-header[_ngcontent-%COMP%]   .logo-section[_ngcontent-%COMP%]   .company-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n  .presupuesto-header[_ngcontent-%COMP%]   .presupuesto-info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .materiales-table[_ngcontent-%COMP%], \n   .mano-obra-table[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .materiales-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .materiales-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n   .mano-obra-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .mano-obra-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 8px;\n  }\n  .totales-section[_ngcontent-%COMP%]   .totales-container[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n  .footer-contact[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n}\n@media (max-width: 480px) {\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .presupuesto-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .materiales-table[_ngcontent-%COMP%], \n   .mano-obra-table[_ngcontent-%COMP%] {\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n}\n/*# sourceMappingURL=ver-presupuesto.component.css.map */'] });
var VerPresupuestoComponent = _VerPresupuestoComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VerPresupuestoComponent, [{
    type: Component,
    args: [{ selector: "app-ver-presupuesto", standalone: true, imports: [CommonModule, IonContent, IonIcon], template: `<ion-content>\r
  <div class="presupuesto-container">\r
    <!-- Header -->\r
    <div class="page-header">\r
      <button class="btn-back" (click)="volver()">\r
        <ion-icon name="arrow-back-outline"></ion-icon>\r
        Volver a Presupuestos\r
      </button>\r
      \r
      <div class="header-actions" *ngIf="presupuesto">\r
        <button class="btn-secondary" (click)="editarPresupuesto()">\r
          <ion-icon name="create-outline"></ion-icon>\r
          Editar\r
        </button>\r
        <button class="btn-secondary" (click)="imprimirPresupuesto()">\r
          <ion-icon name="print-outline"></ion-icon>\r
          Imprimir\r
        </button>\r
        <button class="btn-primary" (click)="descargarPresupuesto()">\r
          <ion-icon name="download-outline"></ion-icon>\r
          Descargar PDF\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- Loading State -->\r
    <div *ngIf="loading" class="loading-state">\r
      <div class="loading-spinner">\r
        <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
        <p>Cargando presupuesto...</p>\r
      </div>\r
    </div>\r
\r
    <!-- Error State -->\r
    <div *ngIf="error && !loading" class="error-state">\r
      <div class="error-message">\r
        <ion-icon name="alert-circle-outline"></ion-icon>\r
        <p>{{ error }}</p>\r
        <button class="btn-retry" (click)="cargarPresupuesto()">\r
          <ion-icon name="refresh-outline"></ion-icon>\r
          Reintentar\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- Presupuesto Content -->\r
    <div *ngIf="presupuesto && !loading" class="presupuesto-content">\r
      <!-- Header del Presupuesto -->\r
      <div class="presupuesto-header">\r
        <div class="logo-section">\r
          <img src="assets/icon/favicon.png" alt="Logo empresa" class="company-logo">\r
          <div class="company-info">\r
            <h3>Tu Empresa</h3>\r
            <p>Direcci\xF3n de la empresa</p>\r
            <p>Tel\xE9fono: +34 123 456 789</p>\r
            <p>Email: info&#64;tuempresa.com</p>\r
          </div>\r
        </div>\r
        \r
        <div class="presupuesto-info">\r
          <h1>PRESUPUESTO</h1>\r
          <div class="presupuesto-details">\r
            <div class="detail-row">\r
              <span class="label">N\xFAmero:</span>\r
              <span class="value">#{{ presupuesto.id?.substring(0, 8) }}</span>\r
            </div>\r
            <div class="detail-row">\r
              <span class="label">Fecha:</span>\r
              <span class="value">{{ formatearFecha(presupuesto.fecha_creacion) }}</span>\r
            </div>\r
            <div class="detail-row">\r
              <span class="label">Estado:</span>\r
              <span class="badge" [class]="getEstadoClass(presupuesto.estado)">\r
                {{ presupuesto.estado }}\r
              </span>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Informaci\xF3n del Cliente -->\r
      <div class="cliente-section" *ngIf="presupuesto.aviso">\r
        <h3>Datos del Cliente</h3>\r
        <div class="cliente-info">\r
          <p><strong>Nombre:</strong> {{ presupuesto.aviso.nombre_cliente_aviso }}</p>\r
          <p><strong>Direcci\xF3n:</strong> {{ presupuesto.aviso.direccion_cliente_aviso }}</p>\r
          <p><strong>Tel\xE9fono:</strong> {{ presupuesto.aviso.telefono_cliente_aviso }}</p>\r
          <p *ngIf="presupuesto.aviso.cliente?.email">\r
            <strong>Email:</strong> {{ presupuesto.aviso.cliente.email }}\r
          </p>\r
        </div>\r
      </div>\r
\r
      <!-- Descripci\xF3n del Trabajo -->\r
      <div class="trabajo-section" *ngIf="presupuesto.aviso">\r
        <h3>Descripci\xF3n del Trabajo</h3>\r
        <p>{{ presupuesto.aviso.descripcion_problema }}</p>\r
      </div>\r
\r
      <!-- Detalle de Materiales -->\r
      <div class="materiales-section" *ngIf="presupuesto.materiales && presupuesto.materiales.length > 0">\r
        <h3>Materiales Estimados</h3>\r
        <table class="materiales-table">\r
          <thead>\r
            <tr>\r
              <th>Material</th>\r
              <th>Cantidad</th>\r
              <th>Precio Unit.</th>\r
              <th>Total</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            <tr *ngFor="let material of presupuesto.materiales">\r
              <td>{{ material.material?.nombre || 'Material sin nombre' }}</td>\r
              <td>{{ material.cantidad_estimada }}</td>\r
              <td>{{ formatearMoneda(material.precio_neto_al_momento) }}</td>\r
              <td>{{ formatearMoneda(material.cantidad_estimada * material.precio_neto_al_momento) }}</td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </div>\r
\r
      <!-- Mano de Obra -->\r
      <div class="mano-obra-section" *ngIf="presupuesto.horas_estimadas">\r
        <h3>Mano de Obra</h3>\r
        <table class="mano-obra-table">\r
          <thead>\r
            <tr>\r
              <th>Concepto</th>\r
              <th>Horas</th>\r
              <th>Precio/Hora</th>\r
              <th>Total</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            <tr>\r
              <td>Trabajo t\xE9cnico especializado</td>\r
              <td>{{ presupuesto.horas_estimadas }}h</td>\r
              <td>{{ formatearMoneda(50) }}</td>\r
              <td>{{ formatearMoneda((presupuesto.horas_estimadas || 0) * 50) }}</td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </div>\r
\r
      <!-- Totales -->\r
      <div class="totales-section">\r
        <div class="totales-container">\r
          <div class="total-row">\r
            <span>Subtotal:</span>\r
            <span>{{ formatearMoneda(presupuesto.total_estimado || 0) }}</span>\r
          </div>\r
          <div class="total-row">\r
            <span>IVA (21%):</span>\r
            <span>{{ formatearMoneda((presupuesto.total_estimado || 0) * 0.21) }}</span>\r
          </div>\r
          <div class="total-row total-final">\r
            <span>TOTAL:</span>\r
            <span>{{ formatearMoneda((presupuesto.total_estimado || 0) * 1.21) }}</span>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Condiciones -->\r
      <div class="condiciones-section">\r
        <h3>Condiciones</h3>\r
        <ul>\r
          <li>Este presupuesto tiene una validez de 30 d\xEDas desde su emisi\xF3n.</li>\r
          <li>Los precios incluyen IVA.</li>\r
          <li>El pago se realizar\xE1 seg\xFAn las condiciones acordadas.</li>\r
          <li>Los materiales podr\xE1n variar seg\xFAn disponibilidad.</li>\r
        </ul>\r
      </div>\r
\r
      <!-- Footer -->\r
      <div class="presupuesto-footer">\r
        <p>Gracias por confiar en nuestros servicios</p>\r
        <div class="footer-contact">\r
          <span>Tu Empresa</span>\r
          <span>+34 123 456 789</span>\r
          <span>info&#64;tuempresa.com</span>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</ion-content> `, styles: ['@charset "UTF-8";\n\n/* src/app/modules/presupuestos/components/ver-presupuesto/ver-presupuesto.component.scss */\nion-content {\n  --background: #fff;\n}\n.presupuesto-container {\n  margin: 0 auto;\n  padding: 20px;\n  background-color: #fff;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.page-header .header-actions {\n  display: flex;\n  gap: 12px;\n}\n.page-header .header-actions button {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.page-header .header-actions button ion-icon {\n  font-size: 16px;\n}\n.btn-back {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: #f7fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  color: #4a5568;\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-back:hover {\n  background: #edf2f7;\n  border-color: #cbd5e0;\n}\n.btn-back ion-icon {\n  font-size: 18px;\n}\n.btn-secondary {\n  background: white;\n  color: #4a5568;\n  border: 1px solid #e2e8f0;\n}\n.btn-secondary:hover {\n  background: #f7fafc;\n  border-color: #cbd5e0;\n}\n.btn-primary {\n  background: #4f46e5;\n  color: white;\n  border: 1px solid #4f46e5;\n}\n.btn-primary:hover {\n  background: #4338ca;\n  border-color: #4338ca;\n}\n.loading-state,\n.error-state {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 300px;\n}\n.loading-state .loading-spinner,\n.loading-state .error-message,\n.error-state .loading-spinner,\n.error-state .error-message {\n  text-align: center;\n  color: #64748b;\n}\n.loading-state .loading-spinner ion-icon,\n.loading-state .error-message ion-icon,\n.error-state .loading-spinner ion-icon,\n.error-state .error-message ion-icon {\n  font-size: 48px;\n  margin-bottom: 16px;\n  color: #cbd5e0;\n}\n.loading-state .loading-spinner ion-icon.spinning,\n.loading-state .error-message ion-icon.spinning,\n.error-state .loading-spinner ion-icon.spinning,\n.error-state .error-message ion-icon.spinning {\n  animation: spin 1s linear infinite;\n}\n.loading-state .loading-spinner p,\n.loading-state .error-message p,\n.error-state .loading-spinner p,\n.error-state .error-message p {\n  font-size: 16px;\n  margin: 0;\n}\n.loading-state .btn-retry,\n.error-state .btn-retry {\n  margin-top: 16px;\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.presupuesto-content {\n  background: #fff;\n  border-radius: 24px;\n  padding: 32px;\n  border: 1px solid #e2e8f0;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.presupuesto-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 32px;\n  padding-bottom: 24px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.presupuesto-header .logo-section {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n}\n.presupuesto-header .logo-section .company-logo {\n  width: 60px;\n  height: 60px;\n  object-fit: contain;\n}\n.presupuesto-header .logo-section .company-info h3 {\n  color: #4f46e5;\n  font-size: 18px;\n  font-weight: 600;\n  margin: 0 0 8px 0;\n}\n.presupuesto-header .logo-section .company-info p {\n  color: #6b7280;\n  font-size: 13px;\n  margin: 2px 0;\n}\n.presupuesto-header .presupuesto-info {\n  text-align: right;\n}\n.presupuesto-header .presupuesto-info h1 {\n  color: #4f46e5;\n  font-size: 24px;\n  font-weight: 700;\n  margin: 0 0 16px 0;\n}\n.presupuesto-header .presupuesto-info .presupuesto-details .detail-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 8px;\n}\n.presupuesto-header .presupuesto-info .presupuesto-details .detail-row .label {\n  color: #6b7280;\n  font-size: 13px;\n  font-weight: 500;\n}\n.presupuesto-header .presupuesto-info .presupuesto-details .detail-row .value {\n  color: #1f2937;\n  font-size: 13px;\n  font-weight: 600;\n}\n.presupuesto-header .presupuesto-info .presupuesto-details .detail-row .badge {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.presupuesto-header .presupuesto-info .presupuesto-details .detail-row .badge.estado-pendiente {\n  background: #fef3c7;\n  color: #92400e;\n}\n.presupuesto-header .presupuesto-info .presupuesto-details .detail-row .badge.estado-en-curso {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.presupuesto-header .presupuesto-info .presupuesto-details .detail-row .badge.estado-completado {\n  background: #d1fae5;\n  color: #065f46;\n}\n.presupuesto-header .presupuesto-info .presupuesto-details .detail-row .badge.estado-facturado {\n  background: #e0e7ff;\n  color: #3730a3;\n}\n.presupuesto-header .presupuesto-info .presupuesto-details .detail-row .badge.estado-cancelado {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.cliente-section h3,\n.trabajo-section h3 {\n  color: #4f46e5;\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n}\n.cliente-section .cliente-info p,\n.trabajo-section .cliente-info p {\n  margin: 8px 0;\n  color: #4a5568;\n  font-size: 14px;\n}\n.cliente-section .cliente-info p strong,\n.trabajo-section .cliente-info p strong {\n  color: #2d3748;\n}\n.cliente-section p,\n.trabajo-section p {\n  color: #4a5568;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.materiales-section h3,\n.mano-obra-section h3 {\n  color: #4f46e5;\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 16px 0;\n}\n.materiales-section .materiales-table,\n.materiales-section .mano-obra-table,\n.mano-obra-section .materiales-table,\n.mano-obra-section .mano-obra-table {\n  width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 16px;\n}\n.materiales-section .materiales-table th,\n.materiales-section .materiales-table td,\n.materiales-section .mano-obra-table th,\n.materiales-section .mano-obra-table td,\n.mano-obra-section .materiales-table th,\n.mano-obra-section .materiales-table td,\n.mano-obra-section .mano-obra-table th,\n.mano-obra-section .mano-obra-table td {\n  padding: 12px;\n  text-align: left;\n  border-bottom: 1px solid #e2e8f0;\n}\n.materiales-section .materiales-table th,\n.materiales-section .mano-obra-table th,\n.mano-obra-section .materiales-table th,\n.mano-obra-section .mano-obra-table th {\n  background: #f8fafc;\n  color: #6b7280;\n  font-weight: 600;\n  font-size: 13px;\n}\n.materiales-section .materiales-table td,\n.materiales-section .mano-obra-table td,\n.mano-obra-section .materiales-table td,\n.mano-obra-section .mano-obra-table td {\n  color: #1f2937;\n  font-size: 14px;\n}\n.materiales-section .materiales-table tr:hover,\n.materiales-section .mano-obra-table tr:hover,\n.mano-obra-section .materiales-table tr:hover,\n.mano-obra-section .mano-obra-table tr:hover {\n  background: #f9fafb;\n}\n.totales-section {\n  display: flex;\n  justify-content: flex-end;\n  margin: 24px 0;\n}\n.totales-section .totales-container {\n  background: #eef2ff;\n  border-radius: 16px;\n  padding: 20px;\n  min-width: 300px;\n}\n.totales-section .totales-container .total-row {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 12px;\n  font-size: 14px;\n  color: #4f46e5;\n}\n.totales-section .totales-container .total-row.total-final {\n  background: #4f46e5;\n  color: white;\n  margin: 12px -20px -20px -20px;\n  padding: 16px 20px;\n  border-radius: 0 0 16px 16px;\n  font-size: 16px;\n  font-weight: 700;\n}\n.condiciones-section h3 {\n  color: #4f46e5;\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n}\n.condiciones-section ul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.condiciones-section ul li {\n  color: #4a5568;\n  font-size: 14px;\n  margin-bottom: 8px;\n  position: relative;\n  padding-left: 20px;\n}\n.condiciones-section ul li:before {\n  content: "\\2022";\n  color: #4f46e5;\n  position: absolute;\n  left: 0;\n  font-weight: bold;\n}\n.presupuesto-footer {\n  text-align: center;\n  padding-top: 24px;\n  border-top: 1px solid #e2e8f0;\n}\n.presupuesto-footer p {\n  color: #4f46e5;\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n}\n.presupuesto-footer .footer-contact {\n  display: flex;\n  justify-content: center;\n  gap: 24px;\n  color: #6b7280;\n  font-size: 13px;\n}\n@media (max-width: 768px) {\n  .presupuesto-container {\n    padding: 16px;\n  }\n  .page-header {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 16px;\n  }\n  .page-header .header-actions {\n    width: 100%;\n    justify-content: flex-end;\n  }\n  .presupuesto-content {\n    padding: 20px;\n    border-radius: 12px;\n  }\n  .presupuesto-header {\n    flex-direction: column;\n    gap: 20px;\n  }\n  .presupuesto-header .logo-section .company-info h3 {\n    font-size: 16px;\n  }\n  .presupuesto-header .presupuesto-info {\n    text-align: left;\n  }\n  .presupuesto-header .presupuesto-info h1 {\n    font-size: 20px;\n  }\n  .materiales-table,\n  .mano-obra-table {\n    font-size: 12px;\n  }\n  .materiales-table th,\n  .materiales-table td,\n  .mano-obra-table th,\n  .mano-obra-table td {\n    padding: 8px;\n  }\n  .totales-section .totales-container {\n    min-width: 100%;\n  }\n  .footer-contact {\n    flex-direction: column;\n    gap: 8px;\n  }\n}\n@media (max-width: 480px) {\n  .page-header .header-actions {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .page-header .header-actions button {\n    width: 100%;\n    justify-content: center;\n  }\n  .presupuesto-content {\n    padding: 16px;\n  }\n  .materiales-table,\n  .mano-obra-table {\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n}\n/*# sourceMappingURL=ver-presupuesto.component.css.map */\n'] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: PresupuestosService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VerPresupuestoComponent, { className: "VerPresupuestoComponent", filePath: "src/app/modules/presupuestos/components/ver-presupuesto/ver-presupuesto.component.ts", lineNumber: 17 });
})();
export {
  VerPresupuestoComponent
};
//# sourceMappingURL=ver-presupuesto.component-UPCV3VKZ.js.map
