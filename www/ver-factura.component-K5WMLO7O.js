import {
  PdfService
} from "./chunk-T7RMPGRO.js";
import "./chunk-IHLBIAU3.js";
import "./chunk-7YWLATDR.js";
import {
  FacturasService
} from "./chunk-24UOAN2R.js";
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
  CurrencyPipe,
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
  ɵɵpipe,
  ɵɵpipeBind4,
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

// src/app/modules/facturas/components/ver-factura/ver-factura.component.ts
function VerFacturaComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "button", 9);
    \u0275\u0275listener("click", function VerFacturaComponent_div_6_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editarFactura());
    });
    \u0275\u0275element(2, "ion-icon", 10);
    \u0275\u0275text(3, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 9);
    \u0275\u0275listener("click", function VerFacturaComponent_div_6_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.imprimirFactura());
    });
    \u0275\u0275element(5, "ion-icon", 11);
    \u0275\u0275text(6, " Imprimir ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 12);
    \u0275\u0275listener("click", function VerFacturaComponent_div_6_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.descargarFactura());
    });
    \u0275\u0275element(8, "ion-icon", 13);
    \u0275\u0275text(9, " Descargar PDF ");
    \u0275\u0275elementEnd()();
  }
}
function VerFacturaComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15);
    \u0275\u0275element(2, "ion-icon", 16);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando factura...");
    \u0275\u0275elementEnd()()();
  }
}
function VerFacturaComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    \u0275\u0275element(2, "ion-icon", 19);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 20);
    \u0275\u0275listener("click", function VerFacturaComponent_div_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cargarFactura());
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
function VerFacturaComponent_div_9_div_57_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const repuesto_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(repuesto_r4.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(repuesto_r4.cantidad);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 4, repuesto_r4.precio_neto, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(10, 9, repuesto_r4.precio_pvp, "EUR", "symbol", "1.2-2"));
  }
}
function VerFacturaComponent_div_9_div_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44);
    \u0275\u0275text(2, "Repuestos utilizados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table")(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "Repuestos utilizados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "CANTIDAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "NETO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "PVP");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, VerFacturaComponent_div_9_div_57_tr_15_Template, 11, 14, "tr", 45);
    \u0275\u0275elementStart(16, "tr", 46)(17, "td")(18, "b");
    \u0275\u0275text(19, "TOTAL");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(20, "td");
    \u0275\u0275elementStart(21, "td", 47);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "td", 47);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "currency");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r1.repuestos);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(23, 3, ctx_r1.totalRepuestosNeto, "EUR", "symbol", "1.2-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(26, 8, ctx_r1.totalRepuestosPvp, "EUR", "symbol", "1.2-2"), " ");
  }
}
function VerFacturaComponent_div_9_div_58_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const mano_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(mano_r5.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", mano_r5.cantidad, "h");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 3, mano_r5.precio_pvp, "EUR", "symbol", "1.2-2"));
  }
}
function VerFacturaComponent_div_9_div_58_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const desplazamiento_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(desplazamiento_r6.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(desplazamiento_r6.cantidad);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 3, desplazamiento_r6.precio_pvp, "EUR", "symbol", "1.2-2"));
  }
}
function VerFacturaComponent_div_9_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44);
    \u0275\u0275text(2, "Mano de obra/Kilometraje");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table")(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "Mano de obra/Kilometraje");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "CANTIDAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "PVP");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, VerFacturaComponent_div_9_div_58_tr_13_Template, 8, 8, "tr", 45)(14, VerFacturaComponent_div_9_div_58_tr_14_Template, 8, 8, "tr", 45);
    \u0275\u0275elementStart(15, "tr", 46)(16, "td", 48)(17, "b");
    \u0275\u0275text(18, "TOTAL");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 47);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "currency");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.manoObra);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.desplazamientos);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(21, 3, ctx_r1.totalManoObraDesplazamiento, "EUR", "symbol", "1.2-2"), " ");
  }
}
function VerFacturaComponent_div_9_div_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "b");
    \u0275\u0275text(2, "Notas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 50);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.factura.factura.notas, " ");
  }
}
function VerFacturaComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 24)(5, "span", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 26)(8, "div", 27);
    \u0275\u0275element(9, "img", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 29)(11, "div")(12, "span", 30);
    \u0275\u0275text(13, "Datos de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Nombre de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "address");
    \u0275\u0275text(17, "Direcci\xF3n de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "Ciudad de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "CIF de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 31);
    \u0275\u0275text(23, "ejemplodominio.es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25, "+34 123 45 56 65");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 32)(27, "label", 33);
    \u0275\u0275text(28, "Factura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "label", 34);
    \u0275\u0275text(30, "N\xBA FACTURA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "label");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "label", 34);
    \u0275\u0275text(34, "FECHA DE EMISI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "label");
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(37, "div", 35)(38, "h3");
    \u0275\u0275text(39, "Datos del Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 36)(41, "p")(42, "strong");
    \u0275\u0275text(43, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "p")(46, "strong");
    \u0275\u0275text(47, "Direcci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "p")(50, "strong");
    \u0275\u0275text(51, "CIF:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "p")(54, "strong");
    \u0275\u0275text(55, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(57, VerFacturaComponent_div_9_div_57_Template, 27, 13, "div", 37)(58, VerFacturaComponent_div_9_div_58_Template, 22, 8, "div", 37);
    \u0275\u0275elementStart(59, "div", 38)(60, "div", 39)(61, "span");
    \u0275\u0275text(62, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "span");
    \u0275\u0275text(64);
    \u0275\u0275pipe(65, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 39)(67, "span");
    \u0275\u0275text(68, "IVA (21%)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "span");
    \u0275\u0275text(70);
    \u0275\u0275pipe(71, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div", 40)(73, "span");
    \u0275\u0275text(74, "TOTAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "span");
    \u0275\u0275text(76);
    \u0275\u0275pipe(77, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(78, VerFacturaComponent_div_9_div_78_Template, 5, 1, "div", 41);
    \u0275\u0275elementStart(79, "div", 42)(80, "span");
    \u0275\u0275text(81, "Nombre de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "span");
    \u0275\u0275text(83, "+34 698 12 12 12");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "span");
    \u0275\u0275text(85, "ejemploemail.com");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Factura ", ctx_r1.factura.factura.numero_factura, "");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getEstadoClass(ctx_r1.factura.factura.estado));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.factura.factura.estado, " ");
    \u0275\u0275advance(26);
    \u0275\u0275textInterpolate(ctx_r1.factura.factura.numero_factura);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatearFecha(ctx_r1.factura.factura.fecha_emision));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r1.factura.factura.nombre_cliente, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.factura.factura.direccion_cliente, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.factura.factura.cif_cliente, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.factura.factura.email_cliente, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.repuestos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.manoObra.length > 0 || ctx_r1.desplazamientos.length > 0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(65, 16, ctx_r1.factura.factura.subtotal, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(71, 21, ctx_r1.factura.factura.iva, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(77, 26, ctx_r1.factura.factura.total, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.factura.factura.notas);
  }
}
var _VerFacturaComponent = class _VerFacturaComponent {
  constructor(route, router, facturasService, pdfService) {
    this.route = route;
    this.router = router;
    this.facturasService = facturasService;
    this.pdfService = pdfService;
    this.factura = null;
    this.loading = false;
    this.error = null;
    this.facturaId = null;
    this.modoEdicion = false;
    addIcons({ arrowBackOutline, createOutline, printOutline, downloadOutline, refreshOutline, alertCircleOutline, eyeOutline });
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.facturaId = params["id"];
      if (this.facturaId) {
        this.cargarFactura();
      }
    });
    this.route.queryParams.subscribe((params) => {
      this.modoEdicion = params["edit"] === "true";
    });
  }
  cargarFactura() {
    if (!this.facturaId)
      return;
    this.loading = true;
    this.error = null;
    this.facturasService.getFactura(this.facturaId).subscribe({
      next: (facturaCompleta) => {
        this.factura = facturaCompleta;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar factura:", error);
        this.error = "Error al cargar la factura";
        this.loading = false;
      }
    });
  }
  volver() {
    this.router.navigate(["/facturas"]);
  }
  editarFactura() {
    if (this.facturaId) {
      this.router.navigate(["/facturas/editar", this.facturaId]);
    }
  }
  imprimirFactura() {
    window.print();
  }
  descargarFactura() {
    if (!this.factura) {
      console.error("No hay factura para descargar");
      return;
    }
    try {
      console.log("\u{1F527} Iniciando descarga de factura...");
      const numeroFactura = this.factura.factura.numero_factura || "factura";
      const nombreArchivo = `factura_${numeroFactura}.pdf`;
      const datosFactura = {
        numero_factura: this.factura.factura.numero_factura,
        fecha_emision: this.factura.factura.fecha_emision,
        nombre_cliente: this.factura.factura.nombre_cliente,
        direccion_cliente: this.factura.factura.direccion_cliente,
        cif_cliente: this.factura.factura.cif_cliente,
        email_cliente: this.factura.factura.email_cliente,
        subtotal: this.factura.factura.subtotal,
        iva: this.factura.factura.iva,
        total: this.factura.factura.total,
        estado: this.factura.factura.estado,
        notas: this.factura.factura.notas,
        lineas: this.factura.lineas
      };
      this.pdfService.generarPdfNativo(datosFactura, nombreArchivo);
      console.log("\u2705 Factura descargada exitosamente");
    } catch (error) {
      console.error("\u274C Error al descargar factura:", error);
    }
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
      default:
        return "estado-default";
    }
  }
  // Separar líneas por tipo
  get repuestos() {
    var _a;
    return ((_a = this.factura) == null ? void 0 : _a.lineas.filter((linea) => linea.tipo === "repuesto")) || [];
  }
  get manoObra() {
    var _a;
    return ((_a = this.factura) == null ? void 0 : _a.lineas.filter((linea) => linea.tipo === "mano_obra")) || [];
  }
  get desplazamientos() {
    var _a;
    return ((_a = this.factura) == null ? void 0 : _a.lineas.filter((linea) => linea.tipo === "desplazamiento")) || [];
  }
  // Cálculos de totales
  get totalRepuestosNeto() {
    return this.repuestos.reduce((sum, r) => sum + r.cantidad * (r.precio_neto || 0), 0);
  }
  get totalRepuestosPvp() {
    return this.repuestos.reduce((sum, r) => sum + r.cantidad * r.precio_pvp, 0);
  }
  get totalManoObraDesplazamiento() {
    return [...this.manoObra, ...this.desplazamientos].reduce((sum, item) => sum + item.cantidad * item.precio_pvp, 0);
  }
};
_VerFacturaComponent.\u0275fac = function VerFacturaComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _VerFacturaComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(FacturasService), \u0275\u0275directiveInject(PdfService));
};
_VerFacturaComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VerFacturaComponent, selectors: [["app-ver-factura"]], decls: 10, vars: 4, consts: [[1, "factura-container"], [1, "page-header"], [1, "btn-back", 3, "click"], ["name", "arrow-back-outline"], ["class", "header-actions", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "factura-preview active", 4, "ngIf"], [1, "header-actions"], [1, "btn-secondary", 3, "click"], ["name", "create-outline"], ["name", "print-outline"], [1, "btn-primary", 3, "click"], ["name", "download-outline"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "error-state"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "factura-preview", "active"], [1, "header-container"], [1, "estado-badge"], [1, "badge"], [1, "preview-header"], [1, "logo-box"], ["src", "assets/icon/favicon.png", "alt", "Logo"], [1, "empresa-datos"], [1, "empresa-nombre"], [2, "margin-top", "20px"], [1, "factura-info"], [1, "factura-label"], [2, "color", "#111827", "font-weight", "500"], [1, "cliente-datos"], [1, "cliente-info"], ["class", "preview-tabla", 4, "ngIf"], [1, "preview-totales-box"], [1, "totales-row"], [1, "totales-row", "total-final"], ["class", "preview-notas", 4, "ngIf"], [1, "preview-footer"], [1, "preview-tabla"], [1, "tabla-titulo"], [4, "ngFor", "ngForOf"], [1, "total-row"], [1, "success"], ["colspan", "2"], [1, "preview-notas"], [1, "notas-texto"]], template: function VerFacturaComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content")(1, "div", 0)(2, "div", 1)(3, "button", 2);
    \u0275\u0275listener("click", function VerFacturaComponent_Template_button_click_3_listener() {
      return ctx.volver();
    });
    \u0275\u0275element(4, "ion-icon", 3);
    \u0275\u0275text(5, " Volver a Facturas ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, VerFacturaComponent_div_6_Template, 10, 0, "div", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, VerFacturaComponent_div_7_Template, 5, 0, "div", 5)(8, VerFacturaComponent_div_8_Template, 8, 1, "div", 6)(9, VerFacturaComponent_div_9_Template, 86, 31, "div", 7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.factura);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.factura && !ctx.loading);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, CurrencyPipe, IonContent, IonIcon], styles: ["\n\nion-content[_ngcontent-%COMP%] {\n  --background: #fff;\n}\n.factura-container[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  padding: 20px;\n  gap: 0;\n  display: block;\n  background-color: white;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.btn-back[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: #f7fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  color: #4a5568;\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: #edf2f7;\n  border-color: #cbd5e0;\n}\n.btn-back[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: white;\n  color: #4a5568;\n  border: 1px solid #e2e8f0;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #f7fafc;\n  border-color: #cbd5e0;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n  border: 1px solid #4f46e5;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n  border-color: #4338ca;\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 300px;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #64748b;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n  color: #cbd5e0;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 0;\n}\n.loading-state[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.factura-preview[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 24px;\n  padding: 32px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  border: 1px solid #e2e8f0;\n}\n.factura-preview.active[_ngcontent-%COMP%] {\n  display: flex;\n}\n.factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%]   .estado-badge[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 16px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%]   .estado-badge[_ngcontent-%COMP%]   .badge.estado-pendiente[_ngcontent-%COMP%] {\n  background: var(--estado-pendiente-bg);\n  color: var(--estado-pendiente-color);\n}\n.factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%]   .estado-badge[_ngcontent-%COMP%]   .badge.estado-en-curso[_ngcontent-%COMP%] {\n  background: var(--estado-en-curso-bg);\n  color: var(--estado-en-curso-color);\n}\n.factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%]   .estado-badge[_ngcontent-%COMP%]   .badge.estado-completado[_ngcontent-%COMP%] {\n  background: var(--estado-completado-bg);\n  color: var(--estado-completado-color);\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 32px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .logo-box[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .logo-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 44px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%]   address[_ngcontent-%COMP%] {\n  display: block;\n  color: #6B7280;\n  font-size: 13px;\n  margin-bottom: 2px;\n  font-style: normal;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%]   .empresa-nombre[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 8px;\n  text-transform: capitalize;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .factura-info[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .factura-info[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  color: #6B7280;\n  margin-bottom: 2px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .factura-info[_ngcontent-%COMP%]   .factura-label[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 8px;\n}\n.factura-preview[_ngcontent-%COMP%]   .cliente-datos[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-radius: 12px;\n  padding: 20px;\n  margin: 16px 0;\n}\n.factura-preview[_ngcontent-%COMP%]   .cliente-datos[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n}\n.factura-preview[_ngcontent-%COMP%]   .cliente-datos[_ngcontent-%COMP%]   .cliente-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  color: #4a5568;\n}\n.factura-preview[_ngcontent-%COMP%]   .cliente-datos[_ngcontent-%COMP%]   .cliente-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2d3748;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   .tabla-titulo[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #6B7280;\n  margin-bottom: 8px;\n  font-size: 1rem;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 8px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  font-size: 13px;\n  text-align: left;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: #9CA3AF;\n  font-weight: 400;\n  background: none;\n  border-bottom: 1px solid #E5E7EB;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: #111827;\n  border-bottom: 1px solid #F3F4F6;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .success[_ngcontent-%COMP%] {\n  color: #27C26C;\n  font-weight: 600;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #4F46E5;\n  border-bottom: none;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%] {\n  margin: 24px 0 0 0;\n  background: #EEF2FF;\n  border-radius: 16px;\n  padding: 15px 15px;\n  width: 300px;\n  align-self: flex-end;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #4F46E5;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%]   .totales-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 14px;\n  margin-bottom: 8px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%]   .totales-row.total-final[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #fff;\n  background: #4F46E5;\n  border-radius: 12px;\n  padding: 10px 16px;\n  margin-top: 12px;\n  margin-bottom: 0;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%]   .totales-row.total-final[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #fff !important;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-notas[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-notas[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  font-size: 1rem;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-notas[_ngcontent-%COMP%]   .notas-texto[_ngcontent-%COMP%] {\n  color: #6B7280;\n  font-size: 0.95rem;\n  margin-top: 4px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-footer[_ngcontent-%COMP%] {\n  margin-top: 32px;\n  display: flex;\n  justify-content: space-between;\n  color: #6B7280;\n  font-size: 0.95rem;\n  border-top: 1px solid #E5E7EB;\n  padding-top: 12px;\n}\n@media (max-width: 768px) {\n  .factura-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 16px;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-end;\n  }\n  .factura-preview[_ngcontent-%COMP%] {\n    padding: 16px;\n    border-radius: 12px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 6px 8px;\n  }\n}\n@media (max-width: 480px) {\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .factura-preview[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n}\n/*# sourceMappingURL=ver-factura.component.css.map */"] });
var VerFacturaComponent = _VerFacturaComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VerFacturaComponent, [{
    type: Component,
    args: [{ selector: "app-ver-factura", standalone: true, imports: [CommonModule, IonContent, IonIcon], template: `<ion-content>\r
  <div class="factura-container">\r
    <!-- Header -->\r
    <div class="page-header">\r
      <button class="btn-back" (click)="volver()">\r
        <ion-icon name="arrow-back-outline"></ion-icon>\r
        Volver a Facturas\r
      </button>\r
      \r
      <div class="header-actions" *ngIf="factura">\r
        <button class="btn-secondary" (click)="editarFactura()">\r
          <ion-icon name="create-outline"></ion-icon>\r
          Editar\r
        </button>\r
        <button class="btn-secondary" (click)="imprimirFactura()">\r
          <ion-icon name="print-outline"></ion-icon>\r
          Imprimir\r
        </button>\r
        <button class="btn-primary" (click)="descargarFactura()">\r
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
        <p>Cargando factura...</p>\r
      </div>\r
    </div>\r
\r
    <!-- Error State -->\r
    <div *ngIf="error && !loading" class="error-state">\r
      <div class="error-message">\r
        <ion-icon name="alert-circle-outline"></ion-icon>\r
        <p>{{ error }}</p>\r
        <button class="btn-retry" (click)="cargarFactura()">\r
          <ion-icon name="refresh-outline"></ion-icon>\r
          Reintentar\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- Vista previa de la factura -->\r
    <div *ngIf="factura && !loading" class="factura-preview active">\r
      <div class="header-container">\r
        <h2>Factura {{ factura.factura.numero_factura }}</h2>\r
        <div class="estado-badge">\r
          <span class="badge" [class]="getEstadoClass(factura.factura.estado)">\r
            {{ factura.factura.estado }}\r
          </span>\r
        </div>\r
      </div>\r
\r
      <!-- Header de la factura -->\r
      <div class="preview-header">\r
        <div class="logo-box">\r
          <img src="assets/icon/favicon.png" alt="Logo" />\r
        </div>\r
        <div class="empresa-datos">\r
          <div>\r
            <span class="empresa-nombre">Datos de empresa</span>\r
            <span>Nombre de empresa</span>\r
            <address>Direcci\xF3n de empresa</address>\r
            <span>Ciudad de empresa</span>\r
            <span>CIF de empresa</span>\r
            <span style="margin-top: 20px;">ejemplodominio.es</span>\r
            <span>+34 123 45 56 65</span>\r
          </div>\r
          <div class="factura-info">\r
            <label class="factura-label">Factura</label>\r
            <label style="color: #111827; font-weight: 500;">N\xBA FACTURA</label>\r
            <label>{{ factura.factura.numero_factura }}</label>\r
            <label style="color: #111827; font-weight: 500;">FECHA DE EMISI\xD3N</label>\r
            <label>{{ formatearFecha(factura.factura.fecha_emision) }}</label>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Datos del cliente -->\r
      <div class="cliente-datos">\r
        <h3>Datos del Cliente</h3>\r
        <div class="cliente-info">\r
          <p><strong>Nombre:</strong> {{ factura.factura.nombre_cliente }}</p>\r
          <p><strong>Direcci\xF3n:</strong> {{ factura.factura.direccion_cliente }}</p>\r
          <p><strong>CIF:</strong> {{ factura.factura.cif_cliente }}</p>\r
          <p><strong>Email:</strong> {{ factura.factura.email_cliente }}</p>\r
        </div>\r
      </div>\r
\r
      <!-- Tabla de repuestos -->\r
      <div class="preview-tabla" *ngIf="repuestos.length > 0">\r
        <div class="tabla-titulo">Repuestos utilizados</div>\r
        <table>\r
          <thead>\r
            <tr>\r
              <th>Repuestos utilizados</th>\r
              <th>CANTIDAD</th>\r
              <th>NETO</th>\r
              <th>PVP</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            <tr *ngFor="let repuesto of repuestos">\r
              <td>{{ repuesto.nombre }}</td>\r
              <td>{{ repuesto.cantidad }}</td>\r
              <td>{{ repuesto.precio_neto | currency:'EUR':'symbol':'1.2-2' }}</td>\r
              <td>{{ repuesto.precio_pvp | currency:'EUR':'symbol':'1.2-2' }}</td>\r
            </tr>\r
            <tr class="total-row">\r
              <td><b>TOTAL</b></td>\r
              <td></td>\r
              <td class="success">\r
                {{ totalRepuestosNeto | currency:'EUR':'symbol':'1.2-2' }}\r
              </td>\r
              <td class="success">\r
                {{ totalRepuestosPvp | currency:'EUR':'symbol':'1.2-2' }}\r
              </td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </div>\r
\r
      <!-- Tabla de mano de obra y desplazamientos -->\r
      <div class="preview-tabla" *ngIf="manoObra.length > 0 || desplazamientos.length > 0">\r
        <div class="tabla-titulo">Mano de obra/Kilometraje</div>\r
        <table>\r
          <thead>\r
            <tr>\r
              <th>Mano de obra/Kilometraje</th>\r
              <th>CANTIDAD</th>\r
              <th>PVP</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            <tr *ngFor="let mano of manoObra">\r
              <td>{{ mano.nombre }}</td>\r
              <td>{{ mano.cantidad }}h</td>\r
              <td>{{ mano.precio_pvp | currency:'EUR':'symbol':'1.2-2' }}</td>\r
            </tr>\r
            <tr *ngFor="let desplazamiento of desplazamientos">\r
              <td>{{ desplazamiento.nombre }}</td>\r
              <td>{{ desplazamiento.cantidad }}</td>\r
              <td>{{ desplazamiento.precio_pvp | currency:'EUR':'symbol':'1.2-2' }}</td>\r
            </tr>\r
            <tr class="total-row">\r
              <td colspan="2"><b>TOTAL</b></td>\r
              <td class="success">\r
                {{ totalManoObraDesplazamiento | currency:'EUR':'symbol':'1.2-2' }}\r
              </td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </div>\r
\r
      <!-- Totales -->\r
      <div class="preview-totales-box">\r
        <div class="totales-row">\r
          <span>Subtotal</span>\r
          <span>{{ factura.factura.subtotal | currency:'EUR':'symbol':'1.2-2' }}</span>\r
        </div>\r
        <div class="totales-row">\r
          <span>IVA (21%)</span>\r
          <span>{{ factura.factura.iva | currency:'EUR':'symbol':'1.2-2' }}</span>\r
        </div>\r
        <div class="totales-row total-final">\r
          <span>TOTAL</span>\r
          <span>{{ factura.factura.total | currency:'EUR':'symbol':'1.2-2' }}</span>\r
        </div>\r
      </div>\r
\r
      <!-- Notas -->\r
      <div class="preview-notas" *ngIf="factura.factura.notas">\r
        <b>Notas</b>\r
        <div class="notas-texto">\r
          {{ factura.factura.notas }}\r
        </div>\r
      </div>\r
\r
      <!-- Footer -->\r
      <div class="preview-footer">\r
        <span>Nombre de empresa</span>\r
        <span>+34 698 12 12 12</span>\r
        <span>ejemploemail.com</span>\r
      </div>\r
    </div>\r
  </div>\r
</ion-content> `, styles: ["/* src/app/modules/facturas/components/ver-factura/ver-factura.component.scss */\nion-content {\n  --background: #fff;\n}\n.factura-container {\n  margin: 0 auto;\n  padding: 20px;\n  gap: 0;\n  display: block;\n  background-color: white;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.page-header .header-actions {\n  display: flex;\n  gap: 12px;\n}\n.page-header .header-actions button {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.page-header .header-actions button ion-icon {\n  font-size: 16px;\n}\n.btn-back {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: #f7fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  color: #4a5568;\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-back:hover {\n  background: #edf2f7;\n  border-color: #cbd5e0;\n}\n.btn-back ion-icon {\n  font-size: 18px;\n}\n.btn-secondary {\n  background: white;\n  color: #4a5568;\n  border: 1px solid #e2e8f0;\n}\n.btn-secondary:hover {\n  background: #f7fafc;\n  border-color: #cbd5e0;\n}\n.btn-primary {\n  background: #4f46e5;\n  color: white;\n  border: 1px solid #4f46e5;\n}\n.btn-primary:hover {\n  background: #4338ca;\n  border-color: #4338ca;\n}\n.loading-state,\n.error-state {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 300px;\n}\n.loading-state .loading-spinner,\n.loading-state .error-message,\n.error-state .loading-spinner,\n.error-state .error-message {\n  text-align: center;\n  color: #64748b;\n}\n.loading-state .loading-spinner ion-icon,\n.loading-state .error-message ion-icon,\n.error-state .loading-spinner ion-icon,\n.error-state .error-message ion-icon {\n  font-size: 48px;\n  margin-bottom: 16px;\n  color: #cbd5e0;\n}\n.loading-state .loading-spinner ion-icon.spinning,\n.loading-state .error-message ion-icon.spinning,\n.error-state .loading-spinner ion-icon.spinning,\n.error-state .error-message ion-icon.spinning {\n  animation: spin 1s linear infinite;\n}\n.loading-state .loading-spinner p,\n.loading-state .error-message p,\n.error-state .loading-spinner p,\n.error-state .error-message p {\n  font-size: 16px;\n  margin: 0;\n}\n.loading-state .btn-retry,\n.error-state .btn-retry {\n  margin-top: 16px;\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.factura-preview {\n  background: #fff;\n  border-radius: 24px;\n  padding: 32px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  border: 1px solid #e2e8f0;\n}\n.factura-preview.active {\n  display: flex;\n}\n.factura-preview .header-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.factura-preview .header-container h2 {\n  font-size: 24px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.factura-preview .header-container .estado-badge .badge {\n  padding: 6px 12px;\n  border-radius: 16px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.factura-preview .header-container .estado-badge .badge.estado-pendiente {\n  background: var(--estado-pendiente-bg);\n  color: var(--estado-pendiente-color);\n}\n.factura-preview .header-container .estado-badge .badge.estado-en-curso {\n  background: var(--estado-en-curso-bg);\n  color: var(--estado-en-curso-color);\n}\n.factura-preview .header-container .estado-badge .badge.estado-completado {\n  background: var(--estado-completado-bg);\n  color: var(--estado-completado-color);\n}\n.factura-preview .preview-header {\n  display: flex;\n  align-items: flex-start;\n  gap: 32px;\n}\n.factura-preview .preview-header .logo-box {\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.factura-preview .preview-header .logo-box img {\n  max-width: 44px;\n}\n.factura-preview .preview-header .empresa-datos {\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n}\n.factura-preview .preview-header .empresa-datos span,\n.factura-preview .preview-header .empresa-datos address {\n  display: block;\n  color: #6B7280;\n  font-size: 13px;\n  margin-bottom: 2px;\n  font-style: normal;\n}\n.factura-preview .preview-header .empresa-datos .empresa-nombre {\n  color: #4F46E5;\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 8px;\n  text-transform: capitalize;\n}\n.factura-preview .preview-header .factura-info {\n  text-align: right;\n}\n.factura-preview .preview-header .factura-info label {\n  display: block;\n  font-size: 13px;\n  color: #6B7280;\n  margin-bottom: 2px;\n}\n.factura-preview .preview-header .factura-info .factura-label {\n  color: #4F46E5;\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 8px;\n}\n.factura-preview .cliente-datos {\n  background: #f8fafc;\n  border-radius: 12px;\n  padding: 20px;\n  margin: 16px 0;\n}\n.factura-preview .cliente-datos h3 {\n  color: #4F46E5;\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n}\n.factura-preview .cliente-datos .cliente-info p {\n  margin: 8px 0;\n  color: #4a5568;\n}\n.factura-preview .cliente-datos .cliente-info p strong {\n  color: #2d3748;\n}\n.factura-preview .preview-tabla .tabla-titulo {\n  font-weight: 600;\n  color: #6B7280;\n  margin-bottom: 8px;\n  font-size: 1rem;\n}\n.factura-preview .preview-tabla table {\n  width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 8px;\n}\n.factura-preview .preview-tabla table th,\n.factura-preview .preview-tabla table td {\n  padding: 8px 12px;\n  font-size: 13px;\n  text-align: left;\n}\n.factura-preview .preview-tabla table th {\n  color: #9CA3AF;\n  font-weight: 400;\n  background: none;\n  border-bottom: 1px solid #E5E7EB;\n}\n.factura-preview .preview-tabla table td {\n  color: #111827;\n  border-bottom: 1px solid #F3F4F6;\n}\n.factura-preview .preview-tabla table .success {\n  color: #27C26C;\n  font-weight: 600;\n}\n.factura-preview .preview-tabla table .total-row td {\n  font-weight: 700;\n  color: #4F46E5;\n  border-bottom: none;\n}\n.factura-preview .preview-totales-box {\n  margin: 24px 0 0 0;\n  background: #EEF2FF;\n  border-radius: 16px;\n  padding: 15px 15px;\n  width: 300px;\n  align-self: flex-end;\n}\n.factura-preview .preview-totales-box span {\n  color: #4F46E5;\n}\n.factura-preview .preview-totales-box .totales-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 14px;\n  margin-bottom: 8px;\n}\n.factura-preview .preview-totales-box .totales-row.total-final {\n  font-size: 16px;\n  font-weight: 600;\n  color: #fff;\n  background: #4F46E5;\n  border-radius: 12px;\n  padding: 10px 16px;\n  margin-top: 12px;\n  margin-bottom: 0;\n}\n.factura-preview .preview-totales-box .totales-row.total-final span {\n  color: #fff !important;\n}\n.factura-preview .preview-notas {\n  margin-top: 24px;\n}\n.factura-preview .preview-notas b {\n  color: #4F46E5;\n  font-size: 1rem;\n}\n.factura-preview .preview-notas .notas-texto {\n  color: #6B7280;\n  font-size: 0.95rem;\n  margin-top: 4px;\n}\n.factura-preview .preview-footer {\n  margin-top: 32px;\n  display: flex;\n  justify-content: space-between;\n  color: #6B7280;\n  font-size: 0.95rem;\n  border-top: 1px solid #E5E7EB;\n  padding-top: 12px;\n}\n@media (max-width: 768px) {\n  .factura-container {\n    padding: 16px;\n  }\n  .page-header {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 16px;\n  }\n  .page-header .header-actions {\n    width: 100%;\n    justify-content: flex-end;\n  }\n  .factura-preview {\n    padding: 16px;\n    border-radius: 12px;\n  }\n  .factura-preview .header-container {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .factura-preview .header-container h2 {\n    font-size: 20px;\n  }\n  .factura-preview .preview-header {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .factura-preview .preview-header .empresa-datos {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .factura-preview .preview-totales-box {\n    width: 100%;\n  }\n  .factura-preview .preview-tabla table {\n    font-size: 12px;\n  }\n  .factura-preview .preview-tabla table th,\n  .factura-preview .preview-tabla table td {\n    padding: 6px 8px;\n  }\n}\n@media (max-width: 480px) {\n  .page-header .header-actions {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .page-header .header-actions button {\n    width: 100%;\n    justify-content: center;\n  }\n  .factura-preview {\n    padding: 12px;\n  }\n  .factura-preview .preview-tabla table {\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n}\n/*# sourceMappingURL=ver-factura.component.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: FacturasService }, { type: PdfService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VerFacturaComponent, { className: "VerFacturaComponent", filePath: "src/app/modules/facturas/components/ver-factura/ver-factura.component.ts", lineNumber: 19 });
})();
export {
  VerFacturaComponent
};
//# sourceMappingURL=ver-factura.component-K5WMLO7O.js.map
