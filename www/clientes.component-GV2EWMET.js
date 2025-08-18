import {
  CrearClienteModalComponent
} from "./chunk-BRDIOUAH.js";
import {
  ClientesService
} from "./chunk-4KIVBTE6.js";
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
  callOutline,
  close,
  eyeOutline,
  filterOutline,
  locationOutline,
  mailOutline,
  mapOutline,
  pauseCircle,
  peopleOutline,
  playCircle,
  refreshOutline,
  searchOutline
} from "./chunk-YLHOXAZF.js";
import "./chunk-IXGWTTVF.js";
import "./chunk-N4BFTN3Y.js";
import "./chunk-7DTAJMEV.js";
import {
  IonContent,
  IonIcon,
  ModalController
} from "./chunk-DJA56OJT.js";
import {
  CommonModule,
  Component,
  DefaultValueAccessor,
  FormsModule,
  NgClass,
  NgControlStatus,
  NgForOf,
  NgIf,
  NgModel,
  NgSelectOption,
  Subject,
  debounceTime,
  distinctUntilChanged,
  setClassMetadata,
  takeUntil,
  ɵNgSelectMultipleOption,
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
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-ANYKLJQR.js";
import "./chunk-VJOUJMK4.js";
import "./chunk-H7W7X3R4.js";
import "./chunk-OXWL2QOR.js";
import "./chunk-XUM7554F.js";
import "./chunk-XZHZ3MXO.js";
import "./chunk-JESFKDT5.js";
import "./chunk-C4CKOAYC.js";
import "./chunk-KQEJHESJ.js";
import "./chunk-B4OIJSSK.js";
import "./chunk-EK5SLBCN.js";
import "./chunk-53IZP55F.js";
import "./chunk-KBR2FUJ2.js";
import "./chunk-HTUOWPA5.js";
import "./chunk-SZOJCATG.js";
import "./chunk-GY6VWHUS.js";
import "./chunk-7NA53B7M.js";
import "./chunk-J5JVDPFK.js";
import "./chunk-K7PUJUIS.js";
import "./chunk-YSZWGYJT.js";
import "./chunk-IQNHFR3E.js";
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
  __async
} from "./chunk-KNQSF6OU.js";

// src/app/modules/clientes/pages/clientes/clientes.component.ts
var _c0 = (a0, a1) => ({ "activo": a0, "inactivo": a1 });
function ClientesComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275element(2, "ion-icon", 5);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando clientes...");
    \u0275\u0275elementEnd()()();
  }
}
function ClientesComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7);
    \u0275\u0275element(2, "ion-icon", 8);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 9);
    \u0275\u0275listener("click", function ClientesComponent_div_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refrescarClientes());
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
function ClientesComponent_section_3_div_37_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 45);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 46);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 47)(8, "div", 48);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 49);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 50)(13, "span", 51);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 52)(16, "button", 53);
    \u0275\u0275listener("click", function ClientesComponent_section_3_div_37_div_19_Template_button_click_16_listener() {
      const cliente_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.abrirModalEditarCliente(cliente_r5));
    });
    \u0275\u0275element(17, "ion-icon", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 55);
    \u0275\u0275listener("click", function ClientesComponent_section_3_div_37_div_19_Template_button_click_18_listener() {
      const cliente_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleEstadoCliente(cliente_r5));
    });
    \u0275\u0275element(19, "ion-icon", 56);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cliente_r5 = ctx.$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(11, _c0, cliente_r5.es_activo, !cliente_r5.es_activo));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cliente_r5.nombre_completo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cliente_r5.telefono_contacto || "No especificado");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cliente_r5.email || "No especificado");
    \u0275\u0275advance(2);
    \u0275\u0275property("title", cliente_r5.direccion);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cliente_r5.direccion || "No especificada", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cliente_r5.nivel_urgencia_habitual || "No especificado");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(14, _c0, cliente_r5.es_activo, !cliente_r5.es_activo));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cliente_r5.es_activo ? "Activo" : "Inactivo", " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("title", cliente_r5.es_activo ? "Desactivar cliente" : "Activar cliente");
    \u0275\u0275advance();
    \u0275\u0275property("name", cliente_r5.es_activo ? "pause-circle" : "play-circle");
  }
}
function ClientesComponent_section_3_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 37)(2, "div", 12)(3, "div", 38)(4, "div", 39);
    \u0275\u0275text(5, "Nombre/Raz\xF3n Social");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 40);
    \u0275\u0275text(7, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 40);
    \u0275\u0275text(9, "Correo electr\xF3nico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 40);
    \u0275\u0275text(11, "Direcci\xF3n local");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 40);
    \u0275\u0275text(13, "\xDAltimo aviso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 40);
    \u0275\u0275text(15, "Activo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 39);
    \u0275\u0275text(17, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 41);
    \u0275\u0275template(19, ClientesComponent_section_3_div_37_div_19_Template, 20, 17, "div", 42);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r1.clientesFiltrados);
  }
}
function ClientesComponent_section_3_div_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "div", 58);
    \u0275\u0275element(2, "ion-icon", 59);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay clientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "A\xFAn no se han creado clientes. Crea el primero para comenzar.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 60);
    \u0275\u0275listener("click", function ClientesComponent_section_3_div_38_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.abrirModalCrearCliente());
    });
    \u0275\u0275element(8, "ion-icon", 29);
    \u0275\u0275text(9, " Crear cliente ");
    \u0275\u0275elementEnd()()();
  }
}
function ClientesComponent_section_3_div_39_ng_container_4_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 67);
    \u0275\u0275listener("click", function ClientesComponent_section_3_div_39_ng_container_4_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const pagina_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onCambiarPagina(pagina_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pagina_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", pagina_r8 === ctx_r1.paginaActual);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pagina_r8, " ");
  }
}
function ClientesComponent_section_3_div_39_ng_container_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1, "...");
    \u0275\u0275elementEnd();
  }
}
function ClientesComponent_section_3_div_39_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, ClientesComponent_section_3_div_39_ng_container_4_button_1_Template, 2, 3, "button", 65)(2, ClientesComponent_section_3_div_39_ng_container_4_span_2_Template, 2, 0, "span", 66);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const pagina_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isNumber(pagina_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", pagina_r8 === "...");
  }
}
function ClientesComponent_section_3_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 63);
    \u0275\u0275template(4, ClientesComponent_section_3_div_39_ng_container_4_Template, 3, 2, "ng-container", 64);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Mostrando datos ", (ctx_r1.paginaActual - 1) * ctx_r1.porPagina + 1, " a ", ctx_r1.Math.min(ctx_r1.paginaActual * ctx_r1.porPagina, ctx_r1.totalClientes), " de ", ctx_r1.totalClientes, " clientes ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.getPaginas());
  }
}
function ClientesComponent_section_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 11)(1, "div", 12)(2, "div", 13)(3, "div", 14);
    \u0275\u0275text(4, "Tabla de clientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 15);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 16)(8, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function ClientesComponent_section_3_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.busqueda, $event) || (ctx_r1.busqueda = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ClientesComponent_section_3_Template_input_input_8_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBuscar($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "ion-icon", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 19)(11, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function ClientesComponent_section_3_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.busqueda, $event) || (ctx_r1.busqueda = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ClientesComponent_section_3_Template_input_input_11_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBuscar($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 21);
    \u0275\u0275listener("change", function ClientesComponent_section_3_Template_select_change_12_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOrdenar($event.target.value));
    });
    \u0275\u0275elementStart(13, "option", 22);
    \u0275\u0275text(14, "Ordenar por: Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 23);
    \u0275\u0275text(16, "Ordenar por: Recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 24);
    \u0275\u0275text(18, "Ordenar por: Urgencia");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "button", 25);
    \u0275\u0275listener("click", function ClientesComponent_section_3_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarFiltroActivos());
    });
    \u0275\u0275element(20, "ion-icon", 26);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 27)(23, "button", 28);
    \u0275\u0275listener("click", function ClientesComponent_section_3_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirModalCrearCliente());
    });
    \u0275\u0275element(24, "ion-icon", 29);
    \u0275\u0275text(25, " A\xF1adir cliente ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(26, "div", 30)(27, "select", 31);
    \u0275\u0275listener("change", function ClientesComponent_section_3_Template_select_change_27_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOrdenar($event.target.value));
    });
    \u0275\u0275elementStart(28, "option", 22);
    \u0275\u0275text(29, "Ordenar: Alfab\xE9tico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 23);
    \u0275\u0275text(31, "Ordenar: Recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option", 24);
    \u0275\u0275text(33, "Ordenar: Urgencia");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 32)(35, "button", 28);
    \u0275\u0275listener("click", function ClientesComponent_section_3_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirModalCrearCliente());
    });
    \u0275\u0275element(36, "ion-icon", 29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(37, ClientesComponent_section_3_div_37_Template, 20, 1, "div", 33)(38, ClientesComponent_section_3_div_38_Template, 10, 0, "div", 34)(39, ClientesComponent_section_3_div_39_Template, 5, 4, "div", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Clientes: ", ctx_r1.clientesFiltrados.length, "");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.busqueda);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.busqueda);
    \u0275\u0275advance(8);
    \u0275\u0275classProp("active", ctx_r1.mostrarSoloActivos);
    \u0275\u0275property("title", ctx_r1.mostrarSoloActivos ? "Mostrar todos los clientes" : "Mostrar solo activos");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.mostrarSoloActivos ? "Solo Activos" : "Todos", " ");
    \u0275\u0275advance(16);
    \u0275\u0275property("ngIf", !ctx_r1.loading && !ctx_r1.error && ctx_r1.clientesFiltrados.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.clientesFiltrados.length === 0 && !ctx_r1.loading && !ctx_r1.error);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.clientesFiltrados.length > 0 && ctx_r1.totalClientes > 0);
  }
}
var _ClientesComponent = class _ClientesComponent {
  // Helper para paginación
  isNumber(value) {
    return typeof value === "number";
  }
  constructor(modalController, clientesService) {
    this.modalController = modalController;
    this.clientesService = clientesService;
    this.clientes = [];
    this.loading = true;
    this.error = null;
    this.totalClientes = 0;
    this.paginaActual = 1;
    this.porPagina = 10;
    this.busqueda = "";
    this.ordenarPor = "nombre_completo";
    this.orden = "asc";
    this.mostrarSoloActivos = false;
    this.Math = Math;
    this.destroy$ = new Subject();
    this.busquedaSubject = new Subject();
    addIcons({ searchOutline, filterOutline, addCircle, refreshOutline, alertCircleOutline, peopleOutline, eyeOutline, mapOutline, alertCircle, close, add, addCircleOutline, callOutline, mailOutline, locationOutline, pauseCircle, playCircle });
  }
  ngOnInit() {
    this.cargarClientes();
    this.suscribirseAClientes();
    this.configurarBusqueda();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Carga la lista de clientes desde el servicio
   */
  cargarClientes() {
    this.loading = true;
    this.error = null;
    this.clientesService.getClientes(this.paginaActual, this.porPagina, this.busqueda, this.ordenarPor, this.orden, this.mostrarSoloActivos).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.clientes = response.clientes;
        this.totalClientes = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar clientes:", error);
        this.error = "Error al cargar los clientes. Por favor, int\xE9ntalo de nuevo.";
        this.loading = false;
      }
    });
  }
  /**
   * Se suscribe a los cambios en la lista de clientes
   */
  suscribirseAClientes() {
    this.clientesService.clientes$.pipe(takeUntil(this.destroy$)).subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
  /**
   * Configura la búsqueda con debounce
   */
  configurarBusqueda() {
    this.busquedaSubject.pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged()).subscribe((termino) => {
      this.busqueda = termino;
      this.paginaActual = 1;
      this.cargarClientes();
    });
  }
  /**
   * Maneja la búsqueda de clientes
   */
  onBuscar(termino) {
    this.busquedaSubject.next(termino);
  }
  /**
   * Filtra clientes por búsqueda
   */
  get clientesFiltrados() {
    if (!this.busqueda) {
      return this.clientes;
    }
    return this.clientes.filter((cliente) => {
      var _a, _b;
      return cliente.nombre_completo.toLowerCase().includes(this.busqueda.toLowerCase()) || ((_a = cliente.email) == null ? void 0 : _a.toLowerCase().includes(this.busqueda.toLowerCase())) || ((_b = cliente.telefono_contacto) == null ? void 0 : _b.includes(this.busqueda));
    });
  }
  /**
   * Maneja el cambio de ordenamiento
   */
  onOrdenar(campo) {
    if (this.ordenarPor === campo) {
      this.orden = this.orden === "asc" ? "desc" : "asc";
    } else {
      this.ordenarPor = campo;
      this.orden = "asc";
    }
    this.cargarClientes();
  }
  /**
   * Maneja el cambio de página
   */
  onCambiarPagina(pagina) {
    if (typeof pagina === "number") {
      this.paginaActual = pagina;
      this.cargarClientes();
    }
  }
  /**
   * Refresca la lista de clientes
   */
  refrescarClientes() {
    this.cargarClientes();
  }
  /**
   * Cambia el filtro de mostrar solo activos
   */
  cambiarFiltroActivos() {
    this.mostrarSoloActivos = !this.mostrarSoloActivos;
    this.paginaActual = 1;
    this.cargarClientes();
  }
  /**
   * Genera el array de páginas para la paginación
   */
  getPaginas() {
    const totalPaginas = Math.ceil(this.totalClientes / this.porPagina);
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
  abrirModalCrearCliente() {
    return __async(this, null, function* () {
      const modal = yield this.modalController.create({
        component: CrearClienteModalComponent,
        cssClass: "modal-crear-cliente",
        showBackdrop: true,
        backdropDismiss: true,
        componentProps: {
          modo: "crear"
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        console.log("Datos del formulario:", data);
        this.loading = true;
        this.error = null;
        this.clientesService.crearCliente(data).pipe(takeUntil(this.destroy$)).subscribe({
          next: (clienteCreado) => {
            console.log("Cliente creado exitosamente:", clienteCreado);
            this.loading = false;
          },
          error: (error) => {
            console.error("Error al crear cliente:", error);
            this.error = "Error al crear el cliente. Por favor, int\xE9ntalo de nuevo.";
            this.loading = false;
          }
        });
      }
    });
  }
  abrirModalEditarCliente(cliente) {
    return __async(this, null, function* () {
      const modal = yield this.modalController.create({
        component: CrearClienteModalComponent,
        cssClass: "modal-crear-cliente",
        showBackdrop: true,
        backdropDismiss: true,
        componentProps: {
          modo: "editar",
          cliente
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        console.log("Datos actualizados del cliente:", data);
        this.loading = true;
        this.error = null;
        this.clientesService.actualizarCliente(cliente.id, data).pipe(takeUntil(this.destroy$)).subscribe({
          next: (clienteActualizado) => {
            console.log("Cliente actualizado exitosamente:", clienteActualizado);
            this.loading = false;
          },
          error: (error) => {
            console.error("Error al actualizar cliente:", error);
            this.error = "Error al actualizar el cliente. Por favor, int\xE9ntalo de nuevo.";
            this.loading = false;
          }
        });
      }
    });
  }
  /**
   * Cambia el estado activo/inactivo de un cliente
   */
  toggleEstadoCliente(cliente) {
    const nuevoEstado = !cliente.es_activo;
    const accion = nuevoEstado ? "activar" : "desactivar";
    if (confirm(`\xBFEst\xE1s seguro de que quieres ${accion} al cliente "${cliente.nombre_completo}"?`)) {
      this.clientesService.actualizarCliente(cliente.id, { es_activo: nuevoEstado }).pipe(takeUntil(this.destroy$)).subscribe({
        next: (clienteActualizado) => {
          console.log(`Cliente ${accion}do:`, clienteActualizado);
        },
        error: (error) => {
          console.error(`Error al ${accion} cliente:`, error);
          this.error = `Error al ${accion} el cliente. Por favor, int\xE9ntalo de nuevo.`;
        }
      });
    }
  }
};
_ClientesComponent.\u0275fac = function ClientesComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ClientesComponent)(\u0275\u0275directiveInject(ModalController), \u0275\u0275directiveInject(ClientesService));
};
_ClientesComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientesComponent, selectors: [["app-clientes"]], decls: 4, vars: 3, consts: [["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "dashboard-table", 4, "ngIf"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "error-state"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "dashboard-table"], [1, "table-header"], [1, "table-header-left"], [1, "table-title"], [1, "table-meta"], [1, "mobile-search"], ["type", "text", "placeholder", "Buscar cliente...", 3, "ngModelChange", "input", "ngModel"], ["name", "search-outline"], [1, "table-search", "desktop-only"], ["type", "text", "placeholder", "Buscar...", 3, "ngModelChange", "input", "ngModel"], [3, "change"], ["value", "nombre_completo"], ["value", "fecha_creacion"], ["value", "nivel_urgencia_habitual"], [1, "btn-filter", 3, "click", "title"], ["name", "filter-outline"], [1, "header-actions"], [1, "btn-add", 3, "click"], ["name", "add-circle"], [1, "mobile-actions"], [1, "mobile-filter", 3, "change"], [1, "mobile-buttons"], ["class", "compact-clientes-table", 4, "ngIf"], ["class", "no-data-container", 4, "ngIf"], ["class", "table-pagination", 4, "ngIf"], [1, "compact-clientes-table"], [1, "clientes-table"], [1, "header-row"], [1, "header-cell"], [1, "header-cell", "desktop-only"], [1, "table-body"], ["class", "cliente-row", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "cliente-row", 3, "ngClass"], [1, "cliente-cell", "nombre-cliente"], [1, "cliente-cell", "telefono-cliente", "desktop-only"], [1, "cliente-cell", "email-cliente", "desktop-only"], [1, "cliente-cell", "direccion-cliente", "desktop-only"], [1, "direccion-texto", 3, "title"], [1, "cliente-cell", "ultimo-aviso", "desktop-only"], [1, "cliente-cell", "estado-activo", "desktop-only"], [1, "badge-estado", 3, "ngClass"], [1, "cliente-cell", "acciones"], ["title", "Ver detalles", 1, "btn-ver", 3, "click"], ["name", "eye-outline"], [1, "btn-toggle-estado", 3, "click", "title"], [3, "name"], [1, "no-data-container"], [1, "no-data-message"], ["name", "people-outline"], [1, "btn-create", 3, "click"], [1, "table-pagination"], [1, "pagination-info"], [1, "pagination"], [4, "ngFor", "ngForOf"], ["class", "pagination-btn", 3, "active", "click", 4, "ngIf"], ["class", "pagination-ellipsis", 4, "ngIf"], [1, "pagination-btn", 3, "click"], [1, "pagination-ellipsis"]], template: function ClientesComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content");
    \u0275\u0275template(1, ClientesComponent_div_1_Template, 5, 0, "div", 0)(2, ClientesComponent_div_2_Template, 8, 1, "div", 1)(3, ClientesComponent_section_3_Template, 40, 10, "section", 2);
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
  FormsModule,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  DefaultValueAccessor,
  NgControlStatus,
  NgModel,
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
.table-search[_ngcontent-%COMP%]   .btn-filter[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 1rem;
  border: 1px solid #E2E8F0;
  background: #F9FBFF;
  color: #26262A;
  cursor: pointer;
  transition: all 0.2s ease;
}
.table-search[_ngcontent-%COMP%]   .btn-filter[_ngcontent-%COMP%]:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
}
.table-search[_ngcontent-%COMP%]   .btn-filter.active[_ngcontent-%COMP%] {
  background: #4F46E5;
  color: white;
  border-color: #4F46E5;
}
.table-search[_ngcontent-%COMP%]   .btn-filter.active[_ngcontent-%COMP%]:hover {
  background: #4338CA;
}
.table-search[_ngcontent-%COMP%]   .btn-filter[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
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
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-name[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #0f172a;
  font-size: 16px;
}
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
  padding: 16px;
}
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #334155;
  font-size: 14px;
}
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #64748b;
  min-width: 20px;
}
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   .item-label[_ngcontent-%COMP%] {
  color: #64748b;
  font-weight: 500;
  min-width: 80px;
}
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   .item-value[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%] {
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
}
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {
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
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:hover {
  background: #F1F5F9;
}
.mobile-cards[_ngcontent-%COMP%]   .cliente-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:active {
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
  .compact-clientes-table[_ngcontent-%COMP%] {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    max-height: none;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell[_ngcontent-%COMP%] {
    padding: 8px 4px;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 13px;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 24px;
    height: 24px;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
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
  .compact-clientes-table[_ngcontent-%COMP%] {
    border-radius: 0px !important;
    border-left: none !important;
    border-right: none !important;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 70px;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell[_ngcontent-%COMP%] {
    padding: 6px 2px;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 22px;
    height: 22px;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 12px;
  }
}
.compact-clientes-table[_ngcontent-%COMP%] {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%] {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  display: contents;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%] {
  display: contents;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
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
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%] {
  display: contents;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%] {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]:hover:not(.activo):not(.inactivo)   .cliente-cell[_ngcontent-%COMP%] {
  background-color: #F9FAFB;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row.activo[_ngcontent-%COMP%]   .cliente-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #10B981;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row.activo[_ngcontent-%COMP%]   .cliente-cell[_ngcontent-%COMP%] {
  background-color: #ECFDF5;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row.activo[_ngcontent-%COMP%]:hover   .cliente-cell[_ngcontent-%COMP%] {
  background-color: #D1FAE5;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row.inactivo[_ngcontent-%COMP%]   .cliente-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #EF4444;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row.inactivo[_ngcontent-%COMP%]   .cliente-cell[_ngcontent-%COMP%] {
  background-color: #FEF2F2;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row.inactivo[_ngcontent-%COMP%]:hover   .cliente-cell[_ngcontent-%COMP%] {
  background-color: #FEE2E2;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell[_ngcontent-%COMP%] {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.nombre-cliente[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: start;
  flex-shrink: 0;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.telefono-cliente[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.email-cliente[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.direccion-cliente[_ngcontent-%COMP%] {
  min-width: 0;
  flex: 1;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.direccion-cliente[_ngcontent-%COMP%]   .direccion-texto[_ngcontent-%COMP%] {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
  max-width: 100%;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.ultimo-aviso[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.estado-activo[_ngcontent-%COMP%] {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.estado-activo[_ngcontent-%COMP%]   .badge-estado[_ngcontent-%COMP%] {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.estado-activo[_ngcontent-%COMP%]   .badge-estado.activo[_ngcontent-%COMP%] {
  background: #E6F4EA;
  color: #137333;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.estado-activo[_ngcontent-%COMP%]   .badge-estado.inactivo[_ngcontent-%COMP%] {
  background: #FEE4E2;
  color: #D92D20;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%] {
  justify-content: start;
  gap: 4px;
  flex-shrink: 0;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
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
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #6B7280;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover {
  background-color: #10B981;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #059669;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button.btn-toggle-estado[_ngcontent-%COMP%]:hover   ion-icon[name=pause-circle][_ngcontent-%COMP%] {
  color: #DC2626;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button.btn-toggle-estado[_ngcontent-%COMP%]:hover   ion-icon[name=play-circle][_ngcontent-%COMP%] {
  color: #059669;
}
.compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button.btn-toggle-estado[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
}
@media (min-width: 769px) {
  .compact-clientes-table[_ngcontent-%COMP%] {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%] {
    grid-template-columns: 2fr 140px 180px 2fr 120px 80px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell[_ngcontent-%COMP%] {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.nombre-cliente[_ngcontent-%COMP%] {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.telefono-cliente[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.email-cliente[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.direccion-cliente[_ngcontent-%COMP%] {
    min-width: 0;
    flex: 1;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.direccion-cliente[_ngcontent-%COMP%]   .direccion-texto[_ngcontent-%COMP%] {
    font-size: 12px;
    max-width: 100%;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.ultimo-aviso[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.estado-activo[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 28px;
    height: 28px;
  }
  .compact-clientes-table[_ngcontent-%COMP%]   .clientes-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .cliente-row[_ngcontent-%COMP%]   .cliente-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
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
/*# sourceMappingURL=clientes.component.css.map */`] });
var ClientesComponent = _ClientesComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClientesComponent, [{
    type: Component,
    args: [{ selector: "app-clientes", standalone: true, imports: [
      CommonModule,
      FormsModule,
      IonContent,
      IonIcon,
      MatTableModule,
      MatIconModule
    ], template: `<ion-content>
  <!-- Loading State -->
  <div *ngIf="loading" class="loading-state">
    <div class="loading-spinner">
      <ion-icon name="refresh-outline" class="spinning"></ion-icon>
      <p>Cargando clientes...</p>
    </div>
  </div>

  <!-- Error State -->
  <div *ngIf="error && !loading" class="error-state">
    <div class="error-message">
      <ion-icon name="alert-circle-outline"></ion-icon>
      <p>{{ error }}</p>
      <button class="btn-retry" (click)="refrescarClientes()">
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
        <div class="table-title">Tabla de clientes</div>
        <div class="table-meta">Clientes: {{ clientesFiltrados.length }}</div>  
      </div>
      
      <!-- Mobile Search Bar -->
      <div class="mobile-search">
        <input 
          type="text" 
          placeholder="Buscar cliente..." 
          [(ngModel)]="busqueda"
          (input)="onBuscar($any($event.target).value)" />
        <ion-icon name="search-outline"></ion-icon>
      </div>

      <!-- Desktop Search and Actions -->
      <div class="table-search desktop-only">
        <input 
          type="text" 
          placeholder="Buscar..." 
          [(ngModel)]="busqueda"
          (input)="onBuscar($any($event.target).value)" />
        <select (change)="onOrdenar($any($event.target).value)">
          <option value="nombre_completo">Ordenar por: Nombre</option>
          <option value="fecha_creacion">Ordenar por: Recientes</option>
          <option value="nivel_urgencia_habitual">Ordenar por: Urgencia</option>
        </select>
        <button 
          class="btn-filter" 
          [class.active]="mostrarSoloActivos"
          (click)="cambiarFiltroActivos()"
          [title]="mostrarSoloActivos ? 'Mostrar todos los clientes' : 'Mostrar solo activos'">
          <ion-icon name="filter-outline"></ion-icon>
          {{ mostrarSoloActivos ? 'Solo Activos' : 'Todos' }}
        </button>
        <div class="header-actions">
          <button class="btn-add" (click)="abrirModalCrearCliente()">
            <ion-icon name="add-circle"></ion-icon>
            A\xF1adir cliente
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Actions -->
    <div class="mobile-actions">
      <select class="mobile-filter" (change)="onOrdenar($any($event.target).value)">
        <option value="nombre_completo">Ordenar: Alfab\xE9tico</option>
        <option value="fecha_creacion">Ordenar: Recientes</option>
        <option value="nivel_urgencia_habitual">Ordenar: Urgencia</option>
      </select>
      <div class="mobile-buttons">
        <button class="btn-add" (click)="abrirModalCrearCliente()">
          <ion-icon name="add-circle"></ion-icon>
        </button>
      </div>
    </div>

    <!-- Compact Table View (replaces desktop table and mobile cards) -->
    <div *ngIf="!loading && !error && clientesFiltrados.length > 0" class="compact-clientes-table">
      <div class="clientes-table">
        <div class="table-header">
          <div class="header-row">
            <div class="header-cell">Nombre/Raz\xF3n Social</div>
            <div class="header-cell desktop-only">Tel\xE9fono</div>
            <div class="header-cell desktop-only">Correo electr\xF3nico</div>
            <div class="header-cell desktop-only">Direcci\xF3n local</div>
            <div class="header-cell desktop-only">\xDAltimo aviso</div>
            <div class="header-cell desktop-only">Activo</div>
            <div class="header-cell">Acciones</div>
          </div>
        </div>
        <div class="table-body">
          <div *ngFor="let cliente of clientesFiltrados" class="cliente-row" [ngClass]="{
                 'activo': cliente.es_activo,
                 'inactivo': !cliente.es_activo
               }">
            <div class="cliente-cell nombre-cliente">{{ cliente.nombre_completo }}</div>
            <div class="cliente-cell telefono-cliente desktop-only">{{ cliente.telefono_contacto || 'No especificado' }}</div>
            <div class="cliente-cell email-cliente desktop-only">{{ cliente.email || 'No especificado' }}</div>
            <div class="cliente-cell direccion-cliente desktop-only">
              <div class="direccion-texto" [title]="cliente.direccion">
                {{ cliente.direccion || 'No especificada' }}
              </div>
            </div>
            <div class="cliente-cell ultimo-aviso desktop-only">{{ cliente.nivel_urgencia_habitual || 'No especificado' }}</div>
            <div class="cliente-cell estado-activo desktop-only">
              <span class="badge-estado" [ngClass]="{
                      'activo': cliente.es_activo,
                      'inactivo': !cliente.es_activo
                    }">
                {{ cliente.es_activo ? 'Activo' : 'Inactivo' }}
              </span>
            </div>
            <div class="cliente-cell acciones">
              <button class="btn-ver" title="Ver detalles" (click)="abrirModalEditarCliente(cliente)">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
              <button 
                class="btn-toggle-estado" 
                [title]="cliente.es_activo ? 'Desactivar cliente' : 'Activar cliente'"
                (click)="toggleEstadoCliente(cliente)">
                <ion-icon [name]="cliente.es_activo ? 'pause-circle' : 'play-circle'"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado de datos vac\xEDos -->
    <div *ngIf="clientesFiltrados.length === 0 && !loading && !error" class="no-data-container">
      <div class="no-data-message">
        <ion-icon name="people-outline"></ion-icon>
        <h3>No hay clientes</h3>
        <p>A\xFAn no se han creado clientes. Crea el primero para comenzar.</p>
        <button class="btn-create" (click)="abrirModalCrearCliente()">
          <ion-icon name="add-circle"></ion-icon>
          Crear cliente
        </button>
      </div>
    </div>

    <!-- Pagination -->
    <div *ngIf="clientesFiltrados.length > 0 && totalClientes > 0" class="table-pagination">
      <span class="pagination-info">
        Mostrando datos {{ ((paginaActual - 1) * porPagina) + 1 }} a {{ Math.min(paginaActual * porPagina, totalClientes) }} de {{ totalClientes }} clientes
      </span>
      <div class="pagination">
        <ng-container *ngFor="let pagina of getPaginas()">
          <button 
            *ngIf="isNumber(pagina)"
            [class.active]="pagina === paginaActual"
            (click)="onCambiarPagina(pagina)"
            class="pagination-btn">
            {{ pagina }}
          </button>
          <span *ngIf="pagina === '...'" class="pagination-ellipsis">...</span>
        </ng-container>
      </div>
    </div>
  </section>
</ion-content>
`, styles: [`/* src/app/modules/clientes/pages/clientes/clientes.component.scss */
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
.table-search .btn-filter {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 1rem;
  border: 1px solid #E2E8F0;
  background: #F9FBFF;
  color: #26262A;
  cursor: pointer;
  transition: all 0.2s ease;
}
.table-search .btn-filter:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
}
.table-search .btn-filter.active {
  background: #4F46E5;
  color: white;
  border-color: #4F46E5;
}
.table-search .btn-filter.active:hover {
  background: #4338CA;
}
.table-search .btn-filter ion-icon {
  font-size: 16px;
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
.mobile-cards .cliente-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.mobile-cards .cliente-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.mobile-cards .cliente-card .card-header .card-name {
  font-weight: 500;
  color: #0f172a;
  font-size: 16px;
}
.mobile-cards .cliente-card .card-body {
  padding: 16px;
}
.mobile-cards .cliente-card .card-body .card-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #334155;
  font-size: 14px;
}
.mobile-cards .cliente-card .card-body .card-row ion-icon {
  font-size: 18px;
  color: #64748b;
  min-width: 20px;
}
.mobile-cards .cliente-card .card-body .card-row .item-label {
  color: #64748b;
  font-weight: 500;
  min-width: 80px;
}
.mobile-cards .cliente-card .card-body .card-row .item-value {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards .cliente-card .card-actions {
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
}
.mobile-cards .cliente-card .card-actions .action-btn {
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
.mobile-cards .cliente-card .card-actions .action-btn ion-icon {
  font-size: 20px;
}
.mobile-cards .cliente-card .card-actions .action-btn:hover {
  background: #F1F5F9;
}
.mobile-cards .cliente-card .card-actions .action-btn:active {
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
  .compact-clientes-table {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    max-height: none;
  }
  .compact-clientes-table .clientes-table .table-header .header-row .header-cell {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell {
    padding: 8px 4px;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.nombre-cliente {
    font-size: 13px;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button {
    width: 24px;
    height: 24px;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button ion-icon {
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
  .compact-clientes-table {
    border-radius: 0px !important;
    border-left: none !important;
    border-right: none !important;
  }
  .compact-clientes-table .clientes-table {
    grid-template-columns: 1fr 70px;
  }
  .compact-clientes-table .clientes-table .table-header .header-row .header-cell {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell {
    padding: 6px 2px;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.nombre-cliente {
    font-size: 12px;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button {
    width: 22px;
    height: 22px;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button ion-icon {
    font-size: 12px;
  }
}
.compact-clientes-table {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-clientes-table .clientes-table {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-clientes-table .clientes-table .table-header {
  display: contents;
}
.compact-clientes-table .clientes-table .table-header .header-row {
  display: contents;
}
.compact-clientes-table .clientes-table .table-header .header-row .header-cell {
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
.compact-clientes-table .clientes-table .table-body {
  display: contents;
}
.compact-clientes-table .clientes-table .table-body .cliente-row {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-clientes-table .clientes-table .table-body .cliente-row:hover:not(.activo):not(.inactivo) .cliente-cell {
  background-color: #F9FAFB;
}
.compact-clientes-table .clientes-table .table-body .cliente-row:active {
  transform: scale(0.98);
}
.compact-clientes-table .clientes-table .table-body .cliente-row.activo .cliente-cell:first-child {
  border-left: 4px solid #10B981;
}
.compact-clientes-table .clientes-table .table-body .cliente-row.activo .cliente-cell {
  background-color: #ECFDF5;
}
.compact-clientes-table .clientes-table .table-body .cliente-row.activo:hover .cliente-cell {
  background-color: #D1FAE5;
}
.compact-clientes-table .clientes-table .table-body .cliente-row.inactivo .cliente-cell:first-child {
  border-left: 4px solid #EF4444;
}
.compact-clientes-table .clientes-table .table-body .cliente-row.inactivo .cliente-cell {
  background-color: #FEF2F2;
}
.compact-clientes-table .clientes-table .table-body .cliente-row.inactivo:hover .cliente-cell {
  background-color: #FEE2E2;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.nombre-cliente {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: start;
  flex-shrink: 0;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.telefono-cliente {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.email-cliente {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.direccion-cliente {
  min-width: 0;
  flex: 1;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.direccion-cliente .direccion-texto {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
  max-width: 100%;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.ultimo-aviso {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.estado-activo {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.estado-activo .badge-estado {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.estado-activo .badge-estado.activo {
  background: #E6F4EA;
  color: #137333;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.estado-activo .badge-estado.inactivo {
  background: #FEE4E2;
  color: #D92D20;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones {
  justify-content: start;
  gap: 4px;
  flex-shrink: 0;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button {
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
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button ion-icon {
  font-size: 16px;
  color: #6B7280;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button.btn-ver:hover {
  background-color: #10B981;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button.btn-ver:hover ion-icon {
  color: white;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button.btn-ver:active {
  transform: scale(0.9);
  background-color: #059669;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button.btn-toggle-estado:hover ion-icon[name=pause-circle] {
  color: #DC2626;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button.btn-toggle-estado:hover ion-icon[name=play-circle] {
  color: #059669;
}
.compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button.btn-toggle-estado:active {
  transform: scale(0.9);
}
@media (min-width: 769px) {
  .compact-clientes-table {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-clientes-table .clientes-table {
    grid-template-columns: 2fr 140px 180px 2fr 120px 80px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-clientes-table .clientes-table .table-header .header-row .header-cell {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.nombre-cliente {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.telefono-cliente {
    flex-shrink: 0;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.email-cliente {
    flex-shrink: 0;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.direccion-cliente {
    min-width: 0;
    flex: 1;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.direccion-cliente .direccion-texto {
    font-size: 12px;
    max-width: 100%;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.ultimo-aviso {
    flex-shrink: 0;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.estado-activo {
    flex-shrink: 0;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones {
    flex-shrink: 0;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button {
    width: 28px;
    height: 28px;
  }
  .compact-clientes-table .clientes-table .table-body .cliente-row .cliente-cell.acciones button ion-icon {
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
/*# sourceMappingURL=clientes.component.css.map */
`] }]
  }], () => [{ type: ModalController }, { type: ClientesService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientesComponent, { className: "ClientesComponent", filePath: "src/app/modules/clientes/pages/clientes/clientes.component.ts", lineNumber: 46 });
})();
export {
  ClientesComponent
};
//# sourceMappingURL=clientes.component-GV2EWMET.js.map
