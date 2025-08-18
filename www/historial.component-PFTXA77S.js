import {
  NavigationService
} from "./chunk-WOW6T6ZC.js";
import {
  MatIconModule,
  MatTableModule
} from "./chunk-776UXQBH.js";
import {
  AvisosService
} from "./chunk-S2ZT5FDR.js";
import {
  add,
  addCircle,
  addCircleOutline,
  addIcons,
  alertCircle,
  alertCircleOutline,
  calendarOutline,
  chevronBackOutline,
  chevronForwardOutline,
  close,
  eyeOutline,
  locationOutline,
  mapOutline,
  refreshOutline,
  searchOutline,
  timeOutline
} from "./chunk-YLHOXAZF.js";
import "./chunk-7DTAJMEV.js";
import {
  IonContent,
  IonIcon
} from "./chunk-DJA56OJT.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  Router,
  Subject,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵpipe,
  ɵɵpipeBind2,
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

// src/app/modules/historial/pages/historial/historial.component.ts
var _c0 = (a0, a1, a2) => ({ "en-curso": a0, "pendiente": a1, "completado": a2 });
function HistorialComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275element(2, "ion-icon", 5);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando historial...");
    \u0275\u0275elementEnd()()();
  }
}
function HistorialComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7);
    \u0275\u0275element(2, "ion-icon", 8);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 9);
    \u0275\u0275listener("click", function HistorialComponent_div_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refrescarHistorial());
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
function HistorialComponent_section_3_div_30_div_19_ion_icon_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 50);
  }
}
function HistorialComponent_section_3_div_30_div_19_ion_icon_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 51);
  }
}
function HistorialComponent_section_3_div_30_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 40)(6, "div", 41);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 42);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 43);
    \u0275\u0275template(12, HistorialComponent_section_3_div_30_div_19_ion_icon_12_Template, 1, 0, "ion-icon", 44)(13, HistorialComponent_section_3_div_30_div_19_ion_icon_13_Template, 1, 0, "ion-icon", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 46);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 47)(17, "button", 48);
    \u0275\u0275listener("click", function HistorialComponent_section_3_div_30_div_19_Template_button_click_17_listener() {
      const aviso_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.verDetalleAviso(aviso_r4));
    });
    \u0275\u0275element(18, "ion-icon", 49);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const aviso_r4 = ctx.$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(12, _c0, aviso_r4.estado === "En curso", aviso_r4.estado === "Pendiente", aviso_r4.estado === "Completado"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", (aviso_r4.id == null ? null : aviso_r4.id.substring(0, 8)) || "N/A", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(aviso_r4.nombre_cliente_aviso);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", aviso_r4.descripcion_problema);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(aviso_r4.descripcion_problema);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 9, aviso_r4.fecha_creacion, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", aviso_r4.urgencia === "Alta" || aviso_r4.es_urgente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", aviso_r4.urgencia !== "Alta" && !aviso_r4.es_urgente);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(aviso_r4.direccion_cliente_aviso);
  }
}
function HistorialComponent_section_3_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "div", 12)(3, "div", 32)(4, "div", 33);
    \u0275\u0275text(5, "N\xFAmero");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 33);
    \u0275\u0275text(7, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 33);
    \u0275\u0275text(9, "Detalle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 34);
    \u0275\u0275text(11, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 34);
    \u0275\u0275text(13, "Urgente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 34);
    \u0275\u0275text(15, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 33);
    \u0275\u0275text(17, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 35);
    \u0275\u0275template(19, HistorialComponent_section_3_div_30_div_19_Template, 19, 16, "div", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r1.avisos);
  }
}
function HistorialComponent_section_3_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 53);
    \u0275\u0275element(2, "ion-icon", 54);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay servicios completados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "A\xFAn no se han completado servicios. Los servicios completados aparecer\xE1n aqu\xED.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 55);
    \u0275\u0275listener("click", function HistorialComponent_section_3_div_31_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.refrescarHistorial());
    });
    \u0275\u0275element(8, "ion-icon", 10);
    \u0275\u0275text(9, " Actualizar historial ");
    \u0275\u0275elementEnd()()();
  }
}
function HistorialComponent_section_3_div_32_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "button", 66);
    \u0275\u0275listener("click", function HistorialComponent_section_3_div_32_ng_container_9_Template_button_click_1_listener() {
      const pagina_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cambiarPagina(pagina_r8));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const pagina_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", pagina_r8 === ctx_r1.paginaActual);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pagina_r8, " ");
  }
}
function HistorialComponent_section_3_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56)(1, "span", 57);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 58)(4, "button", 59);
    \u0275\u0275listener("click", function HistorialComponent_section_3_div_32_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.primeraPagina());
    });
    \u0275\u0275element(5, "ion-icon", 60)(6, "ion-icon", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 61);
    \u0275\u0275listener("click", function HistorialComponent_section_3_div_32_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.paginaAnterior());
    });
    \u0275\u0275element(8, "ion-icon", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, HistorialComponent_section_3_div_32_ng_container_9_Template, 3, 3, "ng-container", 62);
    \u0275\u0275elementStart(10, "button", 63);
    \u0275\u0275listener("click", function HistorialComponent_section_3_div_32_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.paginaSiguiente());
    });
    \u0275\u0275element(11, "ion-icon", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 65);
    \u0275\u0275listener("click", function HistorialComponent_section_3_div_32_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ultimaPagina());
    });
    \u0275\u0275element(13, "ion-icon", 64)(14, "ion-icon", 64);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Mostrando datos ", (ctx_r1.paginaActual - 1) * ctx_r1.porPagina + 1, " a ", ctx_r1.Math.min(ctx_r1.paginaActual * ctx_r1.porPagina, ctx_r1.totalAvisos), " de ", ctx_r1.totalAvisos, " servicios ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.puedeAnterior());
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r1.puedeAnterior());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.obtenerRangoPaginas());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.puedeSiguiente());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.puedeSiguiente());
  }
}
function HistorialComponent_section_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 11)(1, "div", 12)(2, "div", 13)(3, "div", 14);
    \u0275\u0275text(4, "Tabla de servicios completados");
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
    \u0275\u0275element(17, "ion-icon", 23);
    \u0275\u0275text(18, " Ver facturas ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "div", 24)(20, "select", 25)(21, "option");
    \u0275\u0275text(22, "Ordenar: Recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option");
    \u0275\u0275text(24, "Ordenar: Antiguos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option");
    \u0275\u0275text(26, "Ordenar: Urgentes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 26)(28, "button", 22);
    \u0275\u0275text(29, " Ver facturas ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(30, HistorialComponent_section_3_div_30_Template, 20, 1, "div", 27)(31, HistorialComponent_section_3_div_31_Template, 10, 0, "div", 28)(32, HistorialComponent_section_3_div_32_Template, 15, 8, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Servicios completados: ", ctx_r1.totalAvisos, "");
    \u0275\u0275advance(24);
    \u0275\u0275property("ngIf", ctx_r1.avisos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.avisos.length === 0 && !ctx_r1.loading && !ctx_r1.error);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.avisos.length > 0 && ctx_r1.totalAvisos > 0);
  }
}
var _HistorialComponent = class _HistorialComponent {
  constructor(avisosService, router, cdr, navigationService) {
    this.avisosService = avisosService;
    this.router = router;
    this.cdr = cdr;
    this.navigationService = navigationService;
    this.displayedColumns = ["id", "estado", "nombre_cliente_aviso", "descripcion_problema", "fecha_creacion", "es_urgente", "direccion", "acciones"];
    this.avisos = [];
    this.loading = true;
    this.error = null;
    this.totalAvisos = 0;
    this.paginaActual = 1;
    this.porPagina = 10;
    this.busqueda = "";
    this.ordenarPor = "fecha_creacion";
    this.orden = "desc";
    this.destroy$ = new Subject();
    this.dataLoaded = false;
    this.Math = Math;
    addIcons({ searchOutline, eyeOutline, refreshOutline, alertCircleOutline, alertCircle, close, timeOutline, chevronBackOutline, chevronForwardOutline, mapOutline, addCircle, add, addCircleOutline, locationOutline, calendarOutline });
  }
  ngOnInit() {
    console.log("\u{1F504} HistorialComponent inicializado");
    this.navigationService.getCurrentRoute().pipe(takeUntil(this.destroy$)).subscribe((route) => {
      if (route.includes("/historial") && !this.dataLoaded) {
        console.log("\u{1F9ED} Ruta de historial detectada, preparando carga...");
        setTimeout(() => {
          if (!this.dataLoaded && !this.destroy$.closed) {
            this.cargarHistorial();
          }
        }, 200);
      }
    });
  }
  ngAfterViewInit() {
    console.log("\u{1F4F1} DOM renderizado, cargando historial...");
    setTimeout(() => {
      if (!this.dataLoaded && !this.destroy$.closed) {
        this.cargarHistorial();
      }
    }, 300);
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    console.log("\u{1F9F9} Componente HistorialComponent destruido");
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Carga el historial de avisos completados
   */
  cargarHistorial() {
    if (this.dataLoaded && this.avisos.length > 0) {
      console.log("\u{1F4CA} Datos ya cargados, saltando carga...");
      return;
    }
    this.loading = true;
    this.error = null;
    console.log("\u{1F504} Iniciando carga de historial...");
    this.avisosService.getAvisosCompletados(this.paginaActual, this.porPagina, this.busqueda, this.ordenarPor, this.orden).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        console.log("\u2705 Historial cargado exitosamente:", response.avisos.length, "avisos");
        this.avisos = response.avisos;
        this.totalAvisos = response.total;
        this.loading = false;
        this.dataLoaded = true;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("\u274C Error al cargar historial:", error);
        this.error = "Error al cargar el historial. Por favor, int\xE9ntalo de nuevo.";
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  /**
   * Refresca el historial
   */
  refrescarHistorial() {
    console.log("\u{1F504} Refrescando historial...");
    this.dataLoaded = false;
    this.cargarHistorial();
  }
  /**
   * Cambia a la página especificada
   */
  cambiarPagina(pagina) {
    if (pagina >= 1 && pagina <= this.obtenerTotalPaginas()) {
      this.paginaActual = pagina;
      this.cargarHistorial();
    }
  }
  /**
   * Calcula el total de páginas
   */
  obtenerTotalPaginas() {
    return Math.ceil(this.totalAvisos / this.porPagina);
  }
  /**
   * Obtiene el rango de páginas a mostrar
   */
  obtenerRangoPaginas() {
    const totalPaginas = this.obtenerTotalPaginas();
    const paginaActual = this.paginaActual;
    const rango = 2;
    let inicio = Math.max(1, paginaActual - rango);
    let fin = Math.min(totalPaginas, paginaActual + rango);
    if (fin - inicio < 4) {
      if (inicio === 1) {
        fin = Math.min(totalPaginas, inicio + 4);
      } else {
        inicio = Math.max(1, fin - 4);
      }
    }
    const paginas = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  }
  /**
   * Verifica si se puede ir a la página anterior
   */
  puedeAnterior() {
    return this.paginaActual > 1;
  }
  /**
   * Verifica si se puede ir a la página siguiente
   */
  puedeSiguiente() {
    return this.paginaActual < this.obtenerTotalPaginas();
  }
  /**
   * Va a la página anterior
   */
  paginaAnterior() {
    if (this.puedeAnterior()) {
      this.cambiarPagina(this.paginaActual - 1);
    }
  }
  /**
   * Va a la página siguiente
   */
  paginaSiguiente() {
    if (this.puedeSiguiente()) {
      this.cambiarPagina(this.paginaActual + 1);
    }
  }
  /**
   * Va a la primera página
   */
  primeraPagina() {
    this.cambiarPagina(1);
  }
  /**
   * Va a la última página
   */
  ultimaPagina() {
    this.cambiarPagina(this.obtenerTotalPaginas());
  }
  /**
   * Navega al detalle de un aviso
   */
  verDetalleAviso(aviso) {
    if (aviso.id) {
      this.router.navigate(["/ver-aviso", aviso.id]);
    }
  }
};
_HistorialComponent.\u0275fac = function HistorialComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HistorialComponent)(\u0275\u0275directiveInject(AvisosService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(NavigationService));
};
_HistorialComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HistorialComponent, selectors: [["app-historial"]], decls: 4, vars: 3, consts: [["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "dashboard-table", 4, "ngIf"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "error-state"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "dashboard-table"], [1, "table-header"], [1, "table-header-left"], [1, "table-title"], [1, "table-meta"], [1, "mobile-search"], ["type", "text", "placeholder", "Buscar servicio..."], ["name", "search-outline"], [1, "table-search", "desktop-only"], ["type", "text", "placeholder", "Buscar..."], [1, "header-actions"], [1, "btn-add"], ["name", "eye-outline", 2, "font-size", "18px"], [1, "mobile-actions"], [1, "mobile-filter"], [1, "mobile-buttons"], ["class", "compact-historial-table", 4, "ngIf"], ["class", "no-data-container", 4, "ngIf"], ["class", "table-pagination", 4, "ngIf"], [1, "compact-historial-table"], [1, "historial-table"], [1, "header-row"], [1, "header-cell"], [1, "header-cell", "desktop-only"], [1, "table-body"], ["class", "aviso-row", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "aviso-row", 3, "ngClass"], [1, "aviso-cell", "numero-aviso"], [1, "aviso-cell", "nombre-cliente"], [1, "aviso-cell", "detalle-servicio"], [1, "detalle-texto", 3, "title"], [1, "aviso-cell", "fecha-aviso", "desktop-only"], [1, "aviso-cell", "urgente-aviso", "desktop-only"], ["name", "alert-circle", "class", "urgente-icon", "title", "Aviso urgente", 4, "ngIf"], ["name", "close", "class", "no-urgente-icon", "title", "No urgente", 4, "ngIf"], [1, "aviso-cell", "direccion-aviso", "desktop-only"], [1, "aviso-cell", "acciones"], ["title", "Ver detalles", 1, "btn-ver", 3, "click"], ["name", "eye-outline"], ["name", "alert-circle", "title", "Aviso urgente", 1, "urgente-icon"], ["name", "close", "title", "No urgente", 1, "no-urgente-icon"], [1, "no-data-container"], [1, "no-data-message"], ["name", "time-outline"], [1, "btn-create", 3, "click"], [1, "table-pagination"], [1, "pagination-info"], [1, "pagination"], ["title", "Primera p\xE1gina", 1, "pagination-btn", 3, "click", "disabled"], ["name", "chevron-back-outline"], ["title", "P\xE1gina anterior", 1, "pagination-btn", 3, "click", "disabled"], [4, "ngFor", "ngForOf"], ["title", "P\xE1gina siguiente", 1, "pagination-btn", 3, "click", "disabled"], ["name", "chevron-forward-outline"], ["title", "\xDAltima p\xE1gina", 1, "pagination-btn", 3, "click", "disabled"], [1, "pagination-btn", 3, "click"]], template: function HistorialComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content");
    \u0275\u0275template(1, HistorialComponent_div_1_Template, 5, 0, "div", 0)(2, HistorialComponent_div_2_Template, 8, 1, "div", 1)(3, HistorialComponent_section_3_Template, 33, 4, "section", 2);
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
  padding: 8px 16px;
  background: transparent;
}
.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  background: white;
}
.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 0px 16px;
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
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.mobile-cards[_ngcontent-%COMP%]   .aviso-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
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
  border-top: 1px solid #f1f5f9;
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
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: none;
  transition: all 0.2s ease;
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button.btn-add[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #4F46E5 0%,
      #6366F1 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button.btn-add[_ngcontent-%COMP%]:hover, 
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button.btn-add[_ngcontent-%COMP%]:active {
  background:
    linear-gradient(
      135deg,
      #4338CA 0%,
      #4F46E5 100%);
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button.btn-add[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:active {
  transform: scale(0.95);
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-filter[_ngcontent-%COMP%] {
  flex: 1;
  padding: 12px 16px;
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
}
.mobile-actions[_ngcontent-%COMP%]   .mobile-filter[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #CBD5E1;
  background-color: #fff;
}
.header-container[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 2rem;
  color: white;
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
@media (max-width: 768px) {
  .dashboard-table[_ngcontent-%COMP%] {
    height: 100%;
    margin: 0;
    padding: 16px;
    border-radius: 0;
    box-shadow: none;
  }
  .desktop-only[_ngcontent-%COMP%] {
    display: none !important;
  }
  .mobile-search[_ngcontent-%COMP%], 
   .mobile-actions[_ngcontent-%COMP%], 
   .mobile-cards[_ngcontent-%COMP%] {
    display: flex;
  }
  .table-header[_ngcontent-%COMP%] {
    margin-bottom: 12px;
    padding: 0px 16px;
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
  .dashboard-table[_ngcontent-%COMP%] {
    padding: 0px;
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
    padding: 0px 16px;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-filter[_ngcontent-%COMP%] {
    width: 60%;
    padding: 8px 16px !important;
    height: 40px !important;
    font-size: 14px !important;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%] {
    width: 40%;
    justify-content: stretch;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    flex: 1;
    height: 40px !important;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 20px !important;
  }
}
.compact-historial-table[_ngcontent-%COMP%] {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%] {
  width: 100%;
  display: grid;
  grid-template-columns: 80px 120px minmax(0, 1fr) 80px;
  font-size: 12px;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  display: contents;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%] {
  display: contents;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
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
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%] {
  display: contents;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%] {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #F9FAFB;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.en-curso[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.en-curso[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FFFBEB;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.en-curso[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEF3C7;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #EF4444;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEF2F2;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEE2E2;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.completado[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #10B981;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.completado[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #ECFDF5;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.completado[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #D1FAE5;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  color: #26262A !important;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.numero-aviso[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #111827;
  font-size: 13px;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%] {
  justify-content: center;
  font-size: 11px;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.yellow[_ngcontent-%COMP%] {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.red[_ngcontent-%COMP%] {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.green[_ngcontent-%COMP%] {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.nombre-cliente[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #374151;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  padding-right: 4px;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.detalle-servicio[_ngcontent-%COMP%]   .detalle-texto[_ngcontent-%COMP%] {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 11px;
  line-height: 1.4;
  min-width: 0;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.fecha-aviso[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.urgente-aviso[_ngcontent-%COMP%] {
  justify-content: start;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.urgente-aviso[_ngcontent-%COMP%]   .urgente-icon[_ngcontent-%COMP%] {
  color: #D92D20;
  font-size: 18px;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.urgente-aviso[_ngcontent-%COMP%]   .no-urgente-icon[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 18px;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.direccion-aviso[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%] {
  justify-content: start;
  gap: 4px;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
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
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #6B7280;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover {
  background-color: #10B981;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #059669;
}
@media (min-width: 769px) {
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%] {
    grid-template-columns: 100px 150px 2fr 100px 80px 1.5fr 80px;
    font-size: 13px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 12px;
    padding: 12px 8px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
    padding: 12px 8px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.numero-aviso[_ngcontent-%COMP%] {
    font-size: 13px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.detalle-servicio[_ngcontent-%COMP%]   .detalle-texto[_ngcontent-%COMP%] {
    font-size: 11px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 28px;
    height: 28px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .compact-historial-table[_ngcontent-%COMP%] {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    max-height: none;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
    padding: 8px 4px;
    align-items: start;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.numero-aviso[_ngcontent-%COMP%] {
    font-size: 13px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.detalle-servicio[_ngcontent-%COMP%]   .detalle-texto[_ngcontent-%COMP%] {
    font-size: 11px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 24px;
    height: 24px;
  }
  .compact-historial-table[_ngcontent-%COMP%]   .historial-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 14px;
  }
}
.table-pagination[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 16px 0;
  border-top: 1px solid #e2e8f0;
}
.table-pagination[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 14px;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 4px;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%] {
  min-width: 36px;
  height: 36px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%]:active:not(:disabled) {
  transform: scale(0.95);
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn.active[_ngcontent-%COMP%] {
  background: #4F46E5;
  color: white;
  border-color: #4F46E5;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn.active[_ngcontent-%COMP%]:hover {
  background: #4338ca;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f9fafb;
  color: #9ca3af;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
@media (max-width: 768px) {
  .table-pagination[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  .table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%] {
    justify-content: center;
    flex-wrap: wrap;
  }
  .table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%] {
    min-width: 32px;
    height: 32px;
    font-size: 12px;
  }
  .table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 14px;
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
.error-message[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  border: 1px solid #E2E8F0;
  max-width: 400px;
}
.error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #D92D20;
  margin-bottom: 16px;
}
.error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 14px;
  margin: 0 0 24px 0;
  line-height: 1.5;
}
.btn-retry[_ngcontent-%COMP%] {
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
.btn-retry[_ngcontent-%COMP%]:hover {
  background: #4338CA;
}
.btn-retry[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
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
/*# sourceMappingURL=historial.component.css.map */`] });
var HistorialComponent = _HistorialComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HistorialComponent, [{
    type: Component,
    args: [{ selector: "app-historial", standalone: true, imports: [
      CommonModule,
      IonContent,
      IonIcon,
      MatTableModule,
      MatIconModule
    ], template: `<ion-content>  \r
  <!-- Loading State -->\r
  <div *ngIf="loading" class="loading-state">\r
    <div class="loading-spinner">\r
      <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
      <p>Cargando historial...</p>\r
    </div>\r
  </div>\r
\r
  <!-- Error State -->\r
  <div *ngIf="error && !loading" class="error-state">\r
    <div class="error-message">\r
      <ion-icon name="alert-circle-outline"></ion-icon>\r
      <p>{{ error }}</p>\r
      <button class="btn-retry" (click)="refrescarHistorial()">\r
        <ion-icon name="refresh-outline"></ion-icon>\r
        Reintentar\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Contenido principal -->\r
  <section *ngIf="!loading && !error" class="dashboard-table">\r
    <!-- Header Section -->\r
    <div class="table-header">\r
      <div class="table-header-left">\r
        <div class="table-title">Tabla de servicios completados</div>\r
        <div class="table-meta">Servicios completados: {{ totalAvisos }}</div>  \r
      </div>\r
      \r
      <!-- Mobile Search Bar -->\r
      <div class="mobile-search">\r
        <input type="text" placeholder="Buscar servicio..." />\r
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
          <button class="btn-add">\r
            <ion-icon name="eye-outline" style="font-size: 18px;"></ion-icon>\r
            Ver facturas\r
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
        <option>Ordenar: Urgentes</option>\r
      </select>\r
      <div class="mobile-buttons">\r
        <button class="btn-add">\r
          Ver facturas\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- Compact Table View (grid, igual que avisos) -->\r
    <div *ngIf="avisos.length > 0" class="compact-historial-table">\r
      <div class="historial-table">\r
        <div class="table-header">\r
          <div class="header-row">\r
            <div class="header-cell">N\xFAmero</div>\r
            <div class="header-cell">Cliente</div>\r
            <div class="header-cell">Detalle</div>\r
            <div class="header-cell desktop-only">Fecha</div>\r
            <div class="header-cell desktop-only">Urgente</div>\r
            <div class="header-cell desktop-only">Direcci\xF3n</div>\r
            <div class="header-cell">Acciones</div>\r
          </div>\r
        </div>\r
        <div class="table-body">\r
          <div *ngFor="let aviso of avisos" class="aviso-row"\r
               [ngClass]="{\r
                 'en-curso': aviso.estado === 'En curso',\r
                 'pendiente': aviso.estado === 'Pendiente',\r
                 'completado': aviso.estado === 'Completado'\r
               }">\r
            <div class="aviso-cell numero-aviso">#{{ aviso.id?.substring(0, 8) || 'N/A' }}</div>\r
            <div class="aviso-cell nombre-cliente">{{ aviso.nombre_cliente_aviso }}</div>\r
            <div class="aviso-cell detalle-servicio">\r
              <div class="detalle-texto" [title]="aviso.descripcion_problema">{{ aviso.descripcion_problema }}</div>\r
            </div>\r
            <div class="aviso-cell fecha-aviso desktop-only">{{ aviso.fecha_creacion | date:'dd/MM/yyyy' }}</div>\r
            <div class="aviso-cell urgente-aviso desktop-only">\r
              <ion-icon *ngIf="aviso.urgencia === 'Alta' || aviso.es_urgente" name="alert-circle" class="urgente-icon" title="Aviso urgente"></ion-icon>\r
              <ion-icon *ngIf="aviso.urgencia !== 'Alta' && !aviso.es_urgente" name="close" class="no-urgente-icon" title="No urgente"></ion-icon>\r
            </div>\r
            <div class="aviso-cell direccion-aviso desktop-only">{{ aviso.direccion_cliente_aviso }}</div>\r
            <div class="aviso-cell acciones">\r
              <button class="btn-ver" title="Ver detalles" (click)="verDetalleAviso(aviso)">\r
                <ion-icon name="eye-outline"></ion-icon>\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Estado de datos vac\xEDos -->\r
    <div *ngIf="avisos.length === 0 && !loading && !error" class="no-data-container">\r
      <div class="no-data-message">\r
        <ion-icon name="time-outline"></ion-icon>\r
        <h3>No hay servicios completados</h3>\r
        <p>A\xFAn no se han completado servicios. Los servicios completados aparecer\xE1n aqu\xED.</p>\r
        <button class="btn-create" (click)="refrescarHistorial()">\r
          <ion-icon name="refresh-outline"></ion-icon>\r
          Actualizar historial\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- Pagination -->\r
    <div *ngIf="avisos.length > 0 && totalAvisos > 0" class="table-pagination">\r
      <span class="pagination-info">\r
        Mostrando datos {{ ((paginaActual - 1) * porPagina) + 1 }} a {{ Math.min(paginaActual * porPagina, totalAvisos) }} de {{ totalAvisos }} servicios\r
      </span>\r
      <div class="pagination">\r
        <!-- Bot\xF3n Primera P\xE1gina -->\r
        <button \r
          class="pagination-btn" \r
          [disabled]="!puedeAnterior()"\r
          (click)="primeraPagina()"\r
          title="Primera p\xE1gina">\r
          <ion-icon name="chevron-back-outline"></ion-icon>\r
          <ion-icon name="chevron-back-outline"></ion-icon>\r
        </button>\r
\r
        <!-- Bot\xF3n P\xE1gina Anterior -->\r
        <button \r
          class="pagination-btn" \r
          [disabled]="!puedeAnterior()"\r
          (click)="paginaAnterior()"\r
          title="P\xE1gina anterior">\r
          <ion-icon name="chevron-back-outline"></ion-icon>\r
        </button>\r
\r
        <!-- P\xE1ginas -->\r
        <ng-container *ngFor="let pagina of obtenerRangoPaginas()">\r
          <button \r
            class="pagination-btn" \r
            [class.active]="pagina === paginaActual"\r
            (click)="cambiarPagina(pagina)">\r
            {{ pagina }}\r
          </button>\r
        </ng-container>\r
\r
        <!-- Bot\xF3n P\xE1gina Siguiente -->\r
        <button \r
          class="pagination-btn" \r
          [disabled]="!puedeSiguiente()"\r
          (click)="paginaSiguiente()"\r
          title="P\xE1gina siguiente">\r
          <ion-icon name="chevron-forward-outline"></ion-icon>\r
        </button>\r
\r
        <!-- Bot\xF3n \xDAltima P\xE1gina -->\r
        <button \r
          class="pagination-btn" \r
          [disabled]="!puedeSiguiente()"\r
          (click)="ultimaPagina()"\r
          title="\xDAltima p\xE1gina">\r
          <ion-icon name="chevron-forward-outline"></ion-icon>\r
          <ion-icon name="chevron-forward-outline"></ion-icon>\r
        </button>\r
      </div>\r
    </div>\r
  </section>\r
</ion-content>\r
`, styles: [`/* src/app/modules/historial/pages/historial/historial.component.scss */
ion-content {
  --background: #FFF;
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
  padding: 8px 16px;
  background: transparent;
}
.custom-mat-table tbody tr {
  background: white;
}
.custom-mat-table tbody tr td {
  padding: 0px 16px;
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
.mobile-cards .aviso-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.mobile-cards .aviso-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
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
  border-top: 1px solid #f1f5f9;
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
.mobile-actions .mobile-buttons {
  display: flex;
  gap: 12px;
}
.mobile-actions .mobile-buttons button {
  flex: 1;
  min-width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: none;
  transition: all 0.2s ease;
}
.mobile-actions .mobile-buttons button.btn-add {
  background:
    linear-gradient(
      135deg,
      #4F46E5 0%,
      #6366F1 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);
}
.mobile-actions .mobile-buttons button.btn-add:hover,
.mobile-actions .mobile-buttons button.btn-add:active {
  background:
    linear-gradient(
      135deg,
      #4338CA 0%,
      #4F46E5 100%);
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
}
.mobile-actions .mobile-buttons button.btn-add ion-icon {
  font-size: 24px;
}
.mobile-actions .mobile-buttons button:active {
  transform: scale(0.95);
}
.mobile-actions .mobile-filter {
  flex: 1;
  padding: 12px 16px;
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
}
.mobile-actions .mobile-filter:focus {
  outline: none;
  border-color: #CBD5E1;
  background-color: #fff;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 2rem;
  color: white;
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
@media (max-width: 768px) {
  .dashboard-table {
    height: 100%;
    margin: 0;
    padding: 16px;
    border-radius: 0;
    box-shadow: none;
  }
  .desktop-only {
    display: none !important;
  }
  .mobile-search,
  .mobile-actions,
  .mobile-cards {
    display: flex;
  }
  .table-header {
    margin-bottom: 12px;
    padding: 0px 16px;
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
  .dashboard-table {
    padding: 0px;
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
    padding: 0px 16px;
  }
  .mobile-actions .mobile-filter {
    width: 60%;
    padding: 8px 16px !important;
    height: 40px !important;
    font-size: 14px !important;
  }
  .mobile-actions .mobile-buttons {
    width: 40%;
    justify-content: stretch;
  }
  .mobile-actions .mobile-buttons button {
    flex: 1;
    height: 40px !important;
  }
  .mobile-actions .mobile-buttons button ion-icon {
    font-size: 20px !important;
  }
}
.compact-historial-table {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
}
.compact-historial-table .historial-table {
  width: 100%;
  display: grid;
  grid-template-columns: 80px 120px minmax(0, 1fr) 80px;
  font-size: 12px;
}
.compact-historial-table .historial-table .table-header {
  display: contents;
}
.compact-historial-table .historial-table .table-header .header-row {
  display: contents;
}
.compact-historial-table .historial-table .table-header .header-row .header-cell {
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
}
.compact-historial-table .historial-table .table-body {
  display: contents;
}
.compact-historial-table .historial-table .table-body .aviso-row {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-historial-table .historial-table .table-body .aviso-row:hover .aviso-cell {
  background-color: #F9FAFB;
}
.compact-historial-table .historial-table .table-body .aviso-row:active {
  transform: scale(0.98);
}
.compact-historial-table .historial-table .table-body .aviso-row.en-curso .aviso-cell:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-historial-table .historial-table .table-body .aviso-row.en-curso .aviso-cell {
  background-color: #FFFBEB;
}
.compact-historial-table .historial-table .table-body .aviso-row.en-curso:hover .aviso-cell {
  background-color: #FEF3C7;
}
.compact-historial-table .historial-table .table-body .aviso-row.pendiente .aviso-cell:first-child {
  border-left: 4px solid #EF4444;
}
.compact-historial-table .historial-table .table-body .aviso-row.pendiente .aviso-cell {
  background-color: #FEF2F2;
}
.compact-historial-table .historial-table .table-body .aviso-row.pendiente:hover .aviso-cell {
  background-color: #FEE2E2;
}
.compact-historial-table .historial-table .table-body .aviso-row.completado .aviso-cell:first-child {
  border-left: 4px solid #10B981;
}
.compact-historial-table .historial-table .table-body .aviso-row.completado .aviso-cell {
  background-color: #ECFDF5;
}
.compact-historial-table .historial-table .table-body .aviso-row.completado:hover .aviso-cell {
  background-color: #D1FAE5;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  color: #26262A !important;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.numero-aviso {
  font-weight: 600;
  color: #111827;
  font-size: 13px;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.estado-aviso {
  justify-content: center;
  font-size: 11px;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.estado-aviso .badge {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.yellow {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.red {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.green {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.nombre-cliente {
  font-weight: 500;
  color: #374151;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  padding-right: 4px;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.detalle-servicio .detalle-texto {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 11px;
  line-height: 1.4;
  min-width: 0;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.fecha-aviso {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.urgente-aviso {
  justify-content: start;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.urgente-aviso .urgente-icon {
  color: #D92D20;
  font-size: 18px;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.urgente-aviso .no-urgente-icon {
  color: #64748b;
  font-size: 18px;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.direccion-aviso {
  font-size: 12px;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.acciones {
  justify-content: start;
  gap: 4px;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.acciones button {
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
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.acciones button ion-icon {
  font-size: 16px;
  color: #6B7280;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.acciones button.btn-ver:hover {
  background-color: #10B981;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.acciones button.btn-ver:hover ion-icon {
  color: white;
}
.compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.acciones button.btn-ver:active {
  transform: scale(0.9);
  background-color: #059669;
}
@media (min-width: 769px) {
  .compact-historial-table .historial-table {
    grid-template-columns: 100px 150px 2fr 100px 80px 1.5fr 80px;
    font-size: 13px;
  }
  .compact-historial-table .historial-table .table-header .header-row .header-cell {
    font-size: 12px;
    padding: 12px 8px;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell {
    padding: 12px 8px;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.numero-aviso {
    font-size: 13px;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.nombre-cliente {
    font-size: 12px;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.detalle-servicio .detalle-texto {
    font-size: 11px;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.acciones button {
    width: 28px;
    height: 28px;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.acciones button ion-icon {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .compact-historial-table {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    max-height: none;
  }
  .compact-historial-table .historial-table .table-header .header-row .header-cell {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell {
    padding: 8px 4px;
    align-items: start;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.numero-aviso {
    font-size: 13px;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.nombre-cliente {
    font-size: 12px;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.detalle-servicio .detalle-texto {
    font-size: 11px;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.acciones button {
    width: 24px;
    height: 24px;
  }
  .compact-historial-table .historial-table .table-body .aviso-row .aviso-cell.acciones button ion-icon {
    font-size: 14px;
  }
}
.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 16px 0;
  border-top: 1px solid #e2e8f0;
}
.table-pagination .pagination-info {
  color: #64748b;
  font-size: 14px;
}
.table-pagination .pagination {
  display: flex;
  align-items: center;
  gap: 4px;
}
.table-pagination .pagination .pagination-btn {
  min-width: 36px;
  height: 36px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
}
.table-pagination .pagination .pagination-btn:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}
.table-pagination .pagination .pagination-btn:active:not(:disabled) {
  transform: scale(0.95);
}
.table-pagination .pagination .pagination-btn.active {
  background: #4F46E5;
  color: white;
  border-color: #4F46E5;
}
.table-pagination .pagination .pagination-btn.active:hover {
  background: #4338ca;
}
.table-pagination .pagination .pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f9fafb;
  color: #9ca3af;
}
.table-pagination .pagination .pagination-btn ion-icon {
  font-size: 16px;
}
@media (max-width: 768px) {
  .table-pagination {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  .table-pagination .pagination {
    justify-content: center;
    flex-wrap: wrap;
  }
  .table-pagination .pagination .pagination-btn {
    min-width: 32px;
    height: 32px;
    font-size: 12px;
  }
  .table-pagination .pagination .pagination-btn ion-icon {
    font-size: 14px;
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
.error-message {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  border: 1px solid #E2E8F0;
  max-width: 400px;
}
.error-message ion-icon {
  font-size: 48px;
  color: #D92D20;
  margin-bottom: 16px;
}
.error-message p {
  color: #64748b;
  font-size: 14px;
  margin: 0 0 24px 0;
  line-height: 1.5;
}
.btn-retry {
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
.btn-retry:hover {
  background: #4338CA;
}
.btn-retry ion-icon {
  font-size: 18px;
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
/*# sourceMappingURL=historial.component.css.map */
`] }]
  }], () => [{ type: AvisosService }, { type: Router }, { type: ChangeDetectorRef }, { type: NavigationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HistorialComponent, { className: "HistorialComponent", filePath: "src/app/modules/historial/pages/historial/historial.component.ts", lineNumber: 38 });
})();
export {
  HistorialComponent
};
//# sourceMappingURL=historial.component-PFTXA77S.js.map
