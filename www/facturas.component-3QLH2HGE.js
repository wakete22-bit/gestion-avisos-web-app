import {
  FacturasService
} from "./chunk-24UOAN2R.js";
import "./chunk-VHAQXQOQ.js";
import {
  MatIconModule,
  MatTableModule
} from "./chunk-776UXQBH.js";
import {
  add,
  addCircle,
  addCircleOutline,
  addIcons,
  alertCircle,
  alertCircleOutline,
  close,
  document,
  eyeOutline,
  hourglassOutline,
  mapOutline,
  receipt,
  receiptOutline,
  refreshOutline,
  searchOutline,
  warning
} from "./chunk-YLHOXAZF.js";
import "./chunk-7DTAJMEV.js";
import {
  IonContent,
  IonIcon
} from "./chunk-DJA56OJT.js";
import {
  CommonModule,
  Component,
  CurrencyPipe,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
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

// src/app/modules/facturas/pages/facturas/facturas.component.ts
var _c0 = (a0, a1, a2) => ({ "en-curso": a0, "pendiente": a1, "completado": a2 });
var _c1 = (a0, a1, a2) => ({ "yellow": a0, "red": a1, "green": a2 });
function FacturasComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275element(2, "ion-icon", 5);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando facturas...");
    \u0275\u0275elementEnd()()();
  }
}
function FacturasComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7);
    \u0275\u0275element(2, "ion-icon", 8);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 9);
    \u0275\u0275listener("click", function FacturasComponent_div_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cargarFacturas());
    });
    \u0275\u0275element(6, "ion-icon", 10);
    \u0275\u0275text(7, " Reintentar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function FacturasComponent_section_3_div_30_div_19_Template(rf, ctx) {
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
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 45);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 46)(18, "button", 47);
    \u0275\u0275listener("click", function FacturasComponent_section_3_div_30_div_19_Template_button_click_18_listener() {
      const factura_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.verFactura(factura_r5.id));
    });
    \u0275\u0275element(19, "ion-icon", 48);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const factura_r5 = ctx.$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(17, _c0, factura_r5.estado === "En curso", factura_r5.estado === "Pendiente", factura_r5.estado === "Completado"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", factura_r5.numero_factura, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(21, _c1, factura_r5.estado === "En curso", factura_r5.estado === "Pendiente", factura_r5.estado === "Completado"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", factura_r5.estado, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(factura_r5.nombre_cliente);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", factura_r5.notas || "Sin descripci\xF3n");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", factura_r5.notas || "Sin descripci\xF3n", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 9, factura_r5.fecha_emision, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(16, 12, factura_r5.total, "EUR", "symbol", "1.2-2"));
  }
}
function FacturasComponent_section_3_div_30_Template(rf, ctx) {
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
    \u0275\u0275template(19, FacturasComponent_section_3_div_30_div_19_Template, 20, 25, "div", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r1.facturas);
  }
}
function FacturasComponent_section_3_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50);
    \u0275\u0275element(2, "ion-icon", 51);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay facturas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "A\xFAn no se han creado facturas. Crea la primera para comenzar.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 52);
    \u0275\u0275listener("click", function FacturasComponent_section_3_div_31_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.abrirCrearFactura());
    });
    \u0275\u0275element(8, "ion-icon", 23);
    \u0275\u0275text(9, " Crear factura ");
    \u0275\u0275elementEnd()()();
  }
}
function FacturasComponent_section_3_div_32_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function FacturasComponent_section_3_div_32_button_4_Template_button_click_0_listener() {
      const pagina_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onCambiarPagina(pagina_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pagina_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", pagina_r8 === ctx_r1.paginaActual);
    \u0275\u0275property("disabled", pagina_r8 === "...");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pagina_r8, " ");
  }
}
function FacturasComponent_section_3_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "span", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 55);
    \u0275\u0275template(4, FacturasComponent_section_3_div_32_button_4_Template, 2, 4, "button", 56);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Mostrando datos ", (ctx_r1.paginaActual - 1) * ctx_r1.porPagina + 1, " a ", ctx_r1.Math.min(ctx_r1.paginaActual * ctx_r1.porPagina, ctx_r1.totalFacturas), " de ", ctx_r1.totalFacturas, " facturas ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.getPaginas());
  }
}
function FacturasComponent_section_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 11)(1, "div", 12)(2, "div", 13)(3, "div", 14);
    \u0275\u0275text(4, "Tabla de facturas");
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
    \u0275\u0275listener("click", function FacturasComponent_section_3_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirCrearFactura());
    });
    \u0275\u0275element(17, "ion-icon", 23);
    \u0275\u0275text(18, " A\xF1adir factura ");
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
    \u0275\u0275listener("click", function FacturasComponent_section_3_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirCrearFactura());
    });
    \u0275\u0275element(29, "ion-icon", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(30, FacturasComponent_section_3_div_30_Template, 20, 1, "div", 27)(31, FacturasComponent_section_3_div_31_Template, 10, 0, "div", 28)(32, FacturasComponent_section_3_div_32_Template, 5, 4, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Facturas: ", ctx_r1.totalFacturas, "");
    \u0275\u0275advance(24);
    \u0275\u0275property("ngIf", !ctx_r1.loading && ctx_r1.facturas.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.facturas.length === 0 && !ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.facturas.length > 0 && ctx_r1.totalFacturas > 0);
  }
}
var _FacturasComponent = class _FacturasComponent {
  constructor(router, facturasService) {
    this.router = router;
    this.facturasService = facturasService;
    this.displayedColumns = ["numero", "estado", "nombre", "detalle", "fecha", "pvp"];
    this.facturas = [];
    this.loading = true;
    this.error = null;
    this.totalFacturas = 0;
    this.paginaActual = 1;
    this.porPagina = 10;
    addIcons({ refreshOutline, alertCircleOutline, searchOutline, addCircle, eyeOutline, receiptOutline, mapOutline, alertCircle, close, add, addCircleOutline, receipt, hourglassOutline, warning, document });
  }
  ngOnInit() {
    this.cargarFacturas();
  }
  cargarFacturas() {
    this.loading = true;
    this.error = null;
    this.facturasService.getFacturas(this.paginaActual, this.porPagina).subscribe({
      next: (response) => {
        this.facturas = response.facturas;
        this.totalFacturas = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar facturas:", error);
        this.error = "Error al cargar las facturas. Por favor, int\xE9ntalo de nuevo.";
        this.loading = false;
      }
    });
  }
  abrirCrearFactura() {
    this.router.navigate(["/crear-factura"]);
  }
  verFactura(id) {
    this.router.navigate(["/facturas", id]);
  }
  cambiarPagina(pagina) {
    if (pagina !== this.paginaActual) {
      this.paginaActual = pagina;
      this.cargarFacturas();
    }
  }
  // Función helper para manejar el cambio de página de forma segura
  onCambiarPagina(pagina) {
    if (typeof pagina === "number") {
      this.cambiarPagina(pagina);
    }
  }
  getPaginas() {
    const totalPaginas = Math.ceil(this.totalFacturas / this.porPagina);
    const paginas = [];
    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      if (this.paginaActual <= 4) {
        for (let i = 1; i <= 5; i++) {
          paginas.push(i);
        }
        paginas.push("...");
        paginas.push(totalPaginas);
      } else if (this.paginaActual >= totalPaginas - 3) {
        paginas.push(1);
        paginas.push("...");
        for (let i = totalPaginas - 4; i <= totalPaginas; i++) {
          paginas.push(i);
        }
      } else {
        paginas.push(1);
        paginas.push("...");
        for (let i = this.paginaActual - 1; i <= this.paginaActual + 1; i++) {
          paginas.push(i);
        }
        paginas.push("...");
        paginas.push(totalPaginas);
      }
    }
    return paginas;
  }
  // Propiedad para usar Math en el template
  get Math() {
    return Math;
  }
};
_FacturasComponent.\u0275fac = function FacturasComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FacturasComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(FacturasService));
};
_FacturasComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FacturasComponent, selectors: [["app-facturas"]], decls: 4, vars: 3, consts: [["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "dashboard-table", 4, "ngIf"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "error-state"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "dashboard-table"], [1, "table-header"], [1, "table-header-left"], [1, "table-title"], [1, "table-meta"], [1, "mobile-search"], ["type", "text", "placeholder", "Buscar factura..."], ["name", "search-outline"], [1, "table-search", "desktop-only"], ["type", "text", "placeholder", "Buscar..."], [1, "header-actions"], [1, "btn-add", 3, "click"], ["name", "add-circle"], [1, "mobile-actions"], [1, "mobile-filter"], [1, "mobile-buttons"], ["class", "compact-facturas-table", 4, "ngIf"], ["class", "no-data-container", 4, "ngIf"], ["class", "table-pagination", 4, "ngIf"], [1, "compact-facturas-table"], [1, "facturas-table"], [1, "header-row"], [1, "header-cell"], [1, "header-cell", "desktop-only"], [1, "table-body"], ["class", "factura-row", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "factura-row", 3, "ngClass"], [1, "factura-cell", "numero-factura"], [1, "factura-cell", "estado-factura", "desktop-only"], [1, "badge", 3, "ngClass"], [1, "factura-cell", "nombre-cliente"], [1, "factura-cell", "descripcion-factura"], [1, "descripcion-texto", 3, "title"], [1, "factura-cell", "fecha-factura", "desktop-only"], [1, "factura-cell", "pvp-factura", "desktop-only"], [1, "factura-cell", "acciones"], ["title", "Ver detalles", 1, "btn-ver", 3, "click"], ["name", "eye-outline"], [1, "no-data-container"], [1, "no-data-message"], ["name", "receipt-outline"], [1, "btn-create", 3, "click"], [1, "table-pagination"], [1, "pagination-info"], [1, "pagination"], [3, "active", "disabled", "click", 4, "ngFor", "ngForOf"], [3, "click", "disabled"]], template: function FacturasComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content");
    \u0275\u0275template(1, FacturasComponent_div_1_Template, 5, 0, "div", 0)(2, FacturasComponent_div_2_Template, 8, 1, "div", 1)(3, FacturasComponent_section_3_Template, 33, 4, "section", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading && !ctx.error);
  }
}, dependencies: [
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  CurrencyPipe,
  DatePipe,
  IonContent,
  IonIcon,
  MatTableModule,
  MatIconModule
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
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-number[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #64748b;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
  padding: 16px;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
  color: #334155;
  font-size: 14px;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row.detail[_ngcontent-%COMP%] {
  color: #64748b;
  margin: 8px 0;
  justify-content: flex-start;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   .item-label[_ngcontent-%COMP%] {
  color: #64748b;
  font-weight: 500;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   .item-value[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%] {
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {
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
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:hover {
  background: #F1F5F9;
}
.mobile-cards[_ngcontent-%COMP%]   .factura-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:active {
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
  .compact-facturas-table[_ngcontent-%COMP%] {
    border-radius: 0px !important;
    border-left: none !important;
    border-right: none !important;
    max-height: none;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell[_ngcontent-%COMP%] {
    padding: 8px 4px;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.numero-factura[_ngcontent-%COMP%] {
    font-size: 13px;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.descripcion-factura[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
    font-size: 11px;
    line-height: 1.3;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 24px;
    height: 24px;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
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
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%] {
    grid-template-columns: minmax(110px, 120px) 1fr minmax(0, 1.5fr) 70px;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell[_ngcontent-%COMP%] {
    padding: 6px 2px;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.numero-factura[_ngcontent-%COMP%] {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 11px;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.descripcion-factura[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
    font-size: 10px;
    line-height: 1.2;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 22px;
    height: 22px;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 12px;
  }
}
.compact-facturas-table[_ngcontent-%COMP%] {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%] {
  width: 100%;
  display: grid;
  grid-template-columns: 60px 1fr minmax(0, 1.5fr) 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  display: contents;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%] {
  display: contents;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
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
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%] {
  display: contents;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%] {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]:hover   .factura-cell[_ngcontent-%COMP%] {
  background-color: #F9FAFB;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row.en-curso[_ngcontent-%COMP%]   .factura-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row.en-curso[_ngcontent-%COMP%]   .factura-cell[_ngcontent-%COMP%] {
  background-color: #FFFBEB;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row.en-curso[_ngcontent-%COMP%]:hover   .factura-cell[_ngcontent-%COMP%] {
  background-color: #FEF3C7;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row.pendiente[_ngcontent-%COMP%]   .factura-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #EF4444;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row.pendiente[_ngcontent-%COMP%]   .factura-cell[_ngcontent-%COMP%] {
  background-color: #FEF2F2;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row.pendiente[_ngcontent-%COMP%]:hover   .factura-cell[_ngcontent-%COMP%] {
  background-color: #FEE2E2;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row.completado[_ngcontent-%COMP%]   .factura-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #10B981;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row.completado[_ngcontent-%COMP%]   .factura-cell[_ngcontent-%COMP%] {
  background-color: #ECFDF5;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row.completado[_ngcontent-%COMP%]:hover   .factura-cell[_ngcontent-%COMP%] {
  background-color: #D1FAE5;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell[_ngcontent-%COMP%] {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.numero-factura[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: start;
  flex-shrink: 0;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.estado-factura[_ngcontent-%COMP%] {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.estado-factura[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.estado-factura[_ngcontent-%COMP%]   .badge.yellow[_ngcontent-%COMP%] {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.estado-factura[_ngcontent-%COMP%]   .badge.red[_ngcontent-%COMP%] {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.estado-factura[_ngcontent-%COMP%]   .badge.green[_ngcontent-%COMP%] {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.nombre-cliente[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #374151;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.descripcion-factura[_ngcontent-%COMP%] {
  min-width: 0;
  flex: 1;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.descripcion-factura[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
  max-width: 100%;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.fecha-factura[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.pvp-factura[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #374151;
  font-weight: 500;
  justify-content: start;
  flex-shrink: 0;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%] {
  justify-content: start;
  gap: 4px;
  flex-shrink: 0;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
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
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #6B7280;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover {
  background-color: #10B981;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #059669;
}
@media (min-width: 769px) {
  .compact-facturas-table[_ngcontent-%COMP%] {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%] {
    grid-template-columns: 130px 140px minmax(150px, 1fr) minmax(200px, 2fr) 120px 100px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell[_ngcontent-%COMP%] {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.numero-factura[_ngcontent-%COMP%] {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.estado-factura[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 13px;
    min-width: 0;
    flex: 1;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.descripcion-factura[_ngcontent-%COMP%] {
    min-width: 0;
    flex: 1;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.descripcion-factura[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
    font-size: 12px;
    max-width: 100%;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.fecha-factura[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.pvp-factura[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 28px;
    height: 28px;
  }
  .compact-facturas-table[_ngcontent-%COMP%]   .facturas-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .factura-row[_ngcontent-%COMP%]   .factura-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
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
.loading-state[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #FAFBFF;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.loading-spinner[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  border: 1px solid #E2E8F0;
}
.loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #4F46E5;
  margin-bottom: 16px;
}
.loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 16px;
  margin: 0;
}
.spinning[_ngcontent-%COMP%] {
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
.error-state[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #FAFBFF;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  border: 1px solid #E2E8F0;
  max-width: 400px;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #D92D20;
  margin-bottom: 16px;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  color: #26262A;
  font-size: 20px;
  margin: 0 0 8px 0;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 14px;
  margin: 0 0 24px 0;
  line-height: 1.5;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%] {
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
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: white;
  margin: 0;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]:active {
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
/*# sourceMappingURL=facturas.component.css.map */`] });
var FacturasComponent = _FacturasComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FacturasComponent, [{
    type: Component,
    args: [{ selector: "app-facturas", standalone: true, imports: [
      CommonModule,
      IonContent,
      IonIcon,
      MatTableModule,
      MatIconModule
    ], template: `<ion-content>
  <!-- Loading State -->
  <div *ngIf="loading" class="loading-state">
    <div class="loading-spinner">
      <ion-icon name="refresh-outline" class="spinning"></ion-icon>
      <p>Cargando facturas...</p>
    </div>
  </div>

  <!-- Error State -->
  <div *ngIf="error && !loading" class="error-state">
    <div class="error-message">
      <ion-icon name="alert-circle-outline"></ion-icon>
      <p>{{ error }}</p>
      <button class="btn-retry" (click)="cargarFacturas()">
        <ion-icon name="refresh-outline"></ion-icon>
        Reintentar
      </button>
    </div>
  </div>

  <!-- Contenido principal -->
  <section *ngIf="!loading && !error" class="dashboard-table">
    <!-- Header Section -->
    <div class="table-header">
      <div class="table-header-left">
        <div class="table-title">Tabla de facturas</div>
        <div class="table-meta">Facturas: {{ totalFacturas }}</div>  
      </div>
      
      <!-- Mobile Search Bar -->
      <div class="mobile-search">
        <input type="text" placeholder="Buscar factura..." />
        <ion-icon name="search-outline"></ion-icon>
      </div>

      <!-- Desktop Search and Actions -->
      <div class="table-search desktop-only">
        <input type="text" placeholder="Buscar..." />
        <select>
          <option>Ordenar por: Recientes</option>
        </select>
        <div class="header-actions">
          <button class="btn-add" (click)="abrirCrearFactura()">
            <ion-icon name="add-circle"></ion-icon>
            A\xF1adir factura
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Actions -->
    <div class="mobile-actions">
      <select class="mobile-filter">
        <option>Ordenar: Recientes</option>
        <option>Ordenar: Antiguos</option>
        <option>Ordenar: Estado</option>
      </select>
      <div class="mobile-buttons">
        <button class="btn-add" (click)="abrirCrearFactura()">
          <ion-icon name="add-circle"></ion-icon>
        </button>
      </div>
    </div>

    <!-- Compact Table View (replaces desktop table and mobile cards) -->
    <div *ngIf="!loading && facturas.length > 0" class="compact-facturas-table">
      <div class="facturas-table">
        <div class="table-header">
          <div class="header-row">
            <div class="header-cell">N\xFAmero</div>
            <div class="header-cell desktop-only">Estado</div>
            <div class="header-cell">Cliente</div>
            <div class="header-cell">Descripci\xF3n</div>
            <div class="header-cell desktop-only">Fecha</div>
            <div class="header-cell desktop-only">PVP</div>
            <div class="header-cell">Acciones</div>
          </div>
        </div>
        <div class="table-body">
          <div *ngFor="let factura of facturas" class="factura-row" [ngClass]="{
                 'en-curso': factura.estado === 'En curso',
                 'pendiente': factura.estado === 'Pendiente',
                 'completado': factura.estado === 'Completado'
               }">
            <div class="factura-cell numero-factura">#{{ factura.numero_factura }}</div>
            <div class="factura-cell estado-factura desktop-only">
              <span class="badge" [ngClass]="{
                      'yellow': factura.estado === 'En curso',
                      'red': factura.estado === 'Pendiente',
                      'green': factura.estado === 'Completado'
                    }">
                {{ factura.estado }}
              </span>
            </div>
            <div class="factura-cell nombre-cliente">{{ factura.nombre_cliente }}</div>
            <div class="factura-cell descripcion-factura">
              <div class="descripcion-texto" [title]="factura.notas || 'Sin descripci\xF3n'">
                {{ factura.notas || 'Sin descripci\xF3n' }}
              </div>
            </div>
            <div class="factura-cell fecha-factura desktop-only">{{ factura.fecha_emision | date:'dd/MM/yyyy' }}</div>
            <div class="factura-cell pvp-factura desktop-only">{{ factura.total | currency:'EUR':'symbol':'1.2-2' }}</div>
            <div class="factura-cell acciones">
              <button class="btn-ver" title="Ver detalles" (click)="verFactura(factura.id!)">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado de datos vac\xEDos -->
    <div *ngIf="facturas.length === 0 && !loading" class="no-data-container">
      <div class="no-data-message">
        <ion-icon name="receipt-outline"></ion-icon>
        <h3>No hay facturas</h3>
        <p>A\xFAn no se han creado facturas. Crea la primera para comenzar.</p>
        <button class="btn-create" (click)="abrirCrearFactura()">
          <ion-icon name="add-circle"></ion-icon>
          Crear factura
        </button>
      </div>
    </div>

    <!-- Pagination -->
    <div *ngIf="facturas.length > 0 && totalFacturas > 0" class="table-pagination">
      <span class="pagination-info">
        Mostrando datos {{ (paginaActual - 1) * porPagina + 1 }} a {{ Math.min(paginaActual * porPagina, totalFacturas) }} de {{ totalFacturas }} facturas
      </span>
      <div class="pagination">
        <button 
          *ngFor="let pagina of getPaginas()" 
          [class.active]="pagina === paginaActual"
          (click)="onCambiarPagina(pagina)"
          [disabled]="pagina === '...'">
          {{ pagina }}
        </button>
      </div>
    </div>
  </section>
</ion-content>
`, styles: [`/* src/app/modules/facturas/pages/facturas/facturas.component.scss */
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
.mobile-cards .factura-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.mobile-cards .factura-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.mobile-cards .factura-card .card-header .card-number {
  font-weight: 500;
  color: #64748b;
}
.mobile-cards .factura-card .card-body {
  padding: 16px;
}
.mobile-cards .factura-card .card-body .card-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
  color: #334155;
  font-size: 14px;
}
.mobile-cards .factura-card .card-body .card-row.detail {
  color: #64748b;
  margin: 8px 0;
  justify-content: flex-start;
}
.mobile-cards .factura-card .card-body .card-row .item-label {
  color: #64748b;
  font-weight: 500;
}
.mobile-cards .factura-card .card-body .card-row .item-value {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards .factura-card .card-body .card-row strong {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards .factura-card .card-actions {
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
}
.mobile-cards .factura-card .card-actions .action-btn {
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
.mobile-cards .factura-card .card-actions .action-btn ion-icon {
  font-size: 20px;
}
.mobile-cards .factura-card .card-actions .action-btn:hover {
  background: #F1F5F9;
}
.mobile-cards .factura-card .card-actions .action-btn:active {
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
  .compact-facturas-table {
    border-radius: 0px !important;
    border-left: none !important;
    border-right: none !important;
    max-height: none;
  }
  .compact-facturas-table .facturas-table .table-header .header-row .header-cell {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell {
    padding: 8px 4px;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.numero-factura {
    font-size: 13px;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.nombre-cliente {
    font-size: 12px;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.descripcion-factura .descripcion-texto {
    font-size: 11px;
    line-height: 1.3;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones button {
    width: 24px;
    height: 24px;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones button ion-icon {
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
  .compact-facturas-table .facturas-table {
    grid-template-columns: minmax(110px, 120px) 1fr minmax(0, 1.5fr) 70px;
  }
  .compact-facturas-table .facturas-table .table-header .header-row .header-cell {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell {
    padding: 6px 2px;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.numero-factura {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.nombre-cliente {
    font-size: 11px;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.descripcion-factura .descripcion-texto {
    font-size: 10px;
    line-height: 1.2;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones button {
    width: 22px;
    height: 22px;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones button ion-icon {
    font-size: 12px;
  }
}
.compact-facturas-table {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-facturas-table .facturas-table {
  width: 100%;
  display: grid;
  grid-template-columns: 60px 1fr minmax(0, 1.5fr) 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-facturas-table .facturas-table .table-header {
  display: contents;
}
.compact-facturas-table .facturas-table .table-header .header-row {
  display: contents;
}
.compact-facturas-table .facturas-table .table-header .header-row .header-cell {
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
.compact-facturas-table .facturas-table .table-body {
  display: contents;
}
.compact-facturas-table .facturas-table .table-body .factura-row {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-facturas-table .facturas-table .table-body .factura-row:hover .factura-cell {
  background-color: #F9FAFB;
}
.compact-facturas-table .facturas-table .table-body .factura-row:active {
  transform: scale(0.98);
}
.compact-facturas-table .facturas-table .table-body .factura-row.en-curso .factura-cell:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-facturas-table .facturas-table .table-body .factura-row.en-curso .factura-cell {
  background-color: #FFFBEB;
}
.compact-facturas-table .facturas-table .table-body .factura-row.en-curso:hover .factura-cell {
  background-color: #FEF3C7;
}
.compact-facturas-table .facturas-table .table-body .factura-row.pendiente .factura-cell:first-child {
  border-left: 4px solid #EF4444;
}
.compact-facturas-table .facturas-table .table-body .factura-row.pendiente .factura-cell {
  background-color: #FEF2F2;
}
.compact-facturas-table .facturas-table .table-body .factura-row.pendiente:hover .factura-cell {
  background-color: #FEE2E2;
}
.compact-facturas-table .facturas-table .table-body .factura-row.completado .factura-cell:first-child {
  border-left: 4px solid #10B981;
}
.compact-facturas-table .facturas-table .table-body .factura-row.completado .factura-cell {
  background-color: #ECFDF5;
}
.compact-facturas-table .facturas-table .table-body .factura-row.completado:hover .factura-cell {
  background-color: #D1FAE5;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.numero-factura {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: start;
  flex-shrink: 0;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.estado-factura {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.estado-factura .badge {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.estado-factura .badge.yellow {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.estado-factura .badge.red {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.estado-factura .badge.green {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.nombre-cliente {
  font-weight: 500;
  color: #374151;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.descripcion-factura {
  min-width: 0;
  flex: 1;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.descripcion-factura .descripcion-texto {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
  max-width: 100%;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.fecha-factura {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.pvp-factura {
  font-size: 12px;
  color: #374151;
  font-weight: 500;
  justify-content: start;
  flex-shrink: 0;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones {
  justify-content: start;
  gap: 4px;
  flex-shrink: 0;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones button {
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
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones button ion-icon {
  font-size: 16px;
  color: #6B7280;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones button.btn-ver:hover {
  background-color: #10B981;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones button.btn-ver:hover ion-icon {
  color: white;
}
.compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones button.btn-ver:active {
  transform: scale(0.9);
  background-color: #059669;
}
@media (min-width: 769px) {
  .compact-facturas-table {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-facturas-table .facturas-table {
    grid-template-columns: 130px 140px minmax(150px, 1fr) minmax(200px, 2fr) 120px 100px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-facturas-table .facturas-table .table-header .header-row .header-cell {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.numero-factura {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.estado-factura {
    flex-shrink: 0;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.nombre-cliente {
    font-size: 13px;
    min-width: 0;
    flex: 1;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.descripcion-factura {
    min-width: 0;
    flex: 1;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.descripcion-factura .descripcion-texto {
    font-size: 12px;
    max-width: 100%;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.fecha-factura {
    flex-shrink: 0;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.pvp-factura {
    flex-shrink: 0;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones {
    flex-shrink: 0;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones button {
    width: 28px;
    height: 28px;
  }
  .compact-facturas-table .facturas-table .table-body .factura-row .factura-cell.acciones button ion-icon {
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
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #FAFBFF;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.loading-spinner {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  border: 1px solid #E2E8F0;
}
.loading-spinner ion-icon {
  font-size: 48px;
  color: #4F46E5;
  margin-bottom: 16px;
}
.loading-spinner p {
  color: #64748b;
  font-size: 16px;
  margin: 0;
}
.spinning {
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
.error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #FAFBFF;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.error-state .error-message {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  border: 1px solid #E2E8F0;
  max-width: 400px;
}
.error-state .error-message ion-icon {
  font-size: 48px;
  color: #D92D20;
  margin-bottom: 16px;
}
.error-state .error-message h3 {
  color: #26262A;
  font-size: 20px;
  margin: 0 0 8px 0;
}
.error-state .error-message p {
  color: #64748b;
  font-size: 14px;
  margin: 0 0 24px 0;
  line-height: 1.5;
}
.error-state .error-message .btn-retry {
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
.error-state .error-message .btn-retry ion-icon {
  font-size: 18px;
  color: white;
  margin: 0;
}
.error-state .error-message .btn-retry:hover {
  background: #4338CA;
  transform: translateY(-1px);
}
.error-state .error-message .btn-retry:active {
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
/*# sourceMappingURL=facturas.component.css.map */
`] }]
  }], () => [{ type: Router }, { type: FacturasService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FacturasComponent, { className: "FacturasComponent", filePath: "src/app/modules/facturas/pages/facturas/facturas.component.ts", lineNumber: 37 });
})();
export {
  FacturasComponent
};
//# sourceMappingURL=facturas.component-3QLH2HGE.js.map
