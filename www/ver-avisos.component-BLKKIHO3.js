import {
  FlujoAvisosService,
  TrabajosService
} from "./chunk-44F4EVDE.js";
import "./chunk-24UOAN2R.js";
import "./chunk-SKNF6UHJ.js";
import {
  CrearAvisosModalComponent
} from "./chunk-GUAVXOYN.js";
import "./chunk-4KIVBTE6.js";
import {
  InventarioService
} from "./chunk-F77G4CBW.js";
import "./chunk-VHAQXQOQ.js";
import {
  AvisosService
} from "./chunk-S2ZT5FDR.js";
import {
  add,
  addCircle,
  addCircleOutline,
  addIcons,
  addOutline,
  alertCircleOutline,
  arrowBackOutline,
  arrowForward,
  arrowForwardOutline,
  calendarOutline,
  call,
  checkmarkCircleOutline,
  checkmarkOutline,
  chevronDownOutline,
  close,
  closeOutline,
  cloudUploadOutline,
  constructOutline,
  copyOutline,
  createOutline,
  cubeOutline,
  documentTextOutline,
  ellipsisVertical,
  ellipsisVerticalOutline,
  eyeOutline,
  gridOutline,
  imagesOutline,
  informationCircleOutline,
  listOutline,
  mail,
  mailOutline,
  mapOutline,
  navigate,
  pencilOutline,
  person,
  personOutline,
  receiptOutline,
  refreshOutline,
  save,
  saveOutline,
  searchOutline,
  shieldOutline,
  timeOutline,
  trashOutline,
  warningOutline
} from "./chunk-YLHOXAZF.js";
import {
  ViewportService
} from "./chunk-IXGWTTVF.js";
import {
  IonIcon as IonIcon2,
  IonicModule,
  ModalController as ModalController2
} from "./chunk-N4BFTN3Y.js";
import "./chunk-7DTAJMEV.js";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonTextarea,
  IonTitle,
  IonToolbar,
  ModalController
} from "./chunk-DJA56OJT.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  DefaultValueAccessor,
  ElementRef,
  EventEmitter,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  Injectable,
  Input,
  MaxLengthValidator,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  NgSelectOption,
  Output,
  ReactiveFormsModule,
  Router,
  SelectControlValueAccessor,
  Subject,
  SupabaseClientService,
  Validators,
  ViewChild,
  catchError,
  firstValueFrom,
  from,
  map,
  setClassMetadata,
  takeUntil,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
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
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-KNQSF6OU.js";

// src/app/modules/avisos/components/crear-trabajos-realizados/crear-trabajos-realizados.component.ts
var _c0 = () => ({ standalone: true });
function CrearTrabajosRealizadosComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16);
    \u0275\u0275element(2, "ion-icon", 17);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando datos del trabajo...");
    \u0275\u0275elementEnd()()();
  }
}
function CrearTrabajosRealizadosComponent_div_12_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275element(1, "ion-icon", 47);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Al editar el trabajo, los materiales se ajustar\xE1n autom\xE1ticamente en el inventario.");
    \u0275\u0275elementEnd()();
  }
}
function CrearTrabajosRealizadosComponent_div_12_div_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "ion-icon", 17);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando productos...");
    \u0275\u0275elementEnd()();
  }
}
function CrearTrabajosRealizadosComponent_div_12_div_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorProductos, " ");
  }
}
function CrearTrabajosRealizadosComponent_div_12_div_53_div_4_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const producto_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(producto_r4.descripcion);
  }
}
function CrearTrabajosRealizadosComponent_div_12_div_53_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275listener("click", function CrearTrabajosRealizadosComponent_div_12_div_53_div_4_Template_div_click_0_listener() {
      const producto_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.agregarMaterial(producto_r4));
    });
    \u0275\u0275elementStart(1, "div", 54)(2, "div", 55)(3, "span", 56);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 57);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 58);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, CrearTrabajosRealizadosComponent_div_12_div_53_div_4_span_9_Template, 2, 1, "span", 59);
    \u0275\u0275elementStart(10, "span", 60);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 61);
    \u0275\u0275element(14, "ion-icon", 62);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const producto_r4 = ctx.$implicit;
    \u0275\u0275classProp("sin-stock", producto_r4.cantidad_disponible <= 0)("stock-bajo", producto_r4.cantidad_disponible > 0 && producto_r4.cantidad_disponible <= 5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(producto_r4.codigo);
    \u0275\u0275advance();
    \u0275\u0275classProp("stock-bajo", producto_r4.cantidad_disponible > 0 && producto_r4.cantidad_disponible <= 5)("sin-stock", producto_r4.cantidad_disponible <= 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Stock: ", producto_r4.cantidad_disponible, " ", producto_r4.unidad, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(producto_r4.nombre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", producto_r4.descripcion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(12, 15, producto_r4.precio_neto, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", producto_r4.cantidad_disponible <= 0);
  }
}
function CrearTrabajosRealizadosComponent_div_12_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "h4");
    \u0275\u0275text(2, "Productos disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 51);
    \u0275\u0275template(4, CrearTrabajosRealizadosComponent_div_12_div_53_div_4_Template, 15, 20, "div", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.productosFiltrados);
  }
}
function CrearTrabajosRealizadosComponent_div_12_div_54_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 68)(2, "div", 69)(3, "span", 70);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 71);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 72);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 73)(11, "label");
    \u0275\u0275text(12, "Cantidad:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 74);
    \u0275\u0275listener("change", function CrearTrabajosRealizadosComponent_div_12_div_54_div_3_Template_input_change_13_listener($event) {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.actualizarCantidadMaterial(i_r6, $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 75);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "button", 76);
    \u0275\u0275listener("click", function CrearTrabajosRealizadosComponent_div_12_div_54_div_3_Template_button_click_16_listener() {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.eliminarMaterial(i_r6));
    });
    \u0275\u0275element(17, "ion-icon", 77);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const material_r7 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(material_r7.producto.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 7, material_r7.producto.precio_neto, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(material_r7.producto.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", material_r7.cantidad)("min", 1)("max", material_r7.producto.cantidad_disponible);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(material_r7.producto.unidad);
  }
}
function CrearTrabajosRealizadosComponent_div_12_div_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "h4");
    \u0275\u0275text(2, "Materiales a\xF1adidos");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CrearTrabajosRealizadosComponent_div_12_div_54_div_3_Template, 18, 12, "div", 65);
    \u0275\u0275elementStart(4, "div", 66)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.materiales);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Costo total de materiales: ", \u0275\u0275pipeBind4(7, 2, ctx_r1.calcularCostoTotal(), "EUR", "symbol", "1.2-2"), "");
  }
}
function CrearTrabajosRealizadosComponent_div_12_div_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 78);
    \u0275\u0275element(1, "ion-icon", 47);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No se han a\xF1adido materiales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Selecciona productos del inventario para a\xF1adirlos como materiales");
    \u0275\u0275elementEnd()();
  }
}
function CrearTrabajosRealizadosComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "div", 20)(3, "label");
    \u0275\u0275text(4, "Fecha del trabajo ");
    \u0275\u0275elementStart(5, "span", 21);
    \u0275\u0275text(6, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(7, "input", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 23)(9, "div", 24)(10, "label");
    \u0275\u0275text(11, "Hora de inicio ");
    \u0275\u0275elementStart(12, "span", 21);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(14, "input", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 24)(16, "label");
    \u0275\u0275text(17, "Hora de fin ");
    \u0275\u0275elementStart(18, "span", 21);
    \u0275\u0275text(19, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(20, "input", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 20)(22, "label");
    \u0275\u0275text(23, "Descripci\xF3n del trabajo ");
    \u0275\u0275elementStart(24, "span", 21);
    \u0275\u0275text(25, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "textarea", 27);
    \u0275\u0275text(27, "            ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 28);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 20)(31, "label");
    \u0275\u0275text(32, "Estado del trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "select", 29)(34, "option", 30);
    \u0275\u0275text(35, "Pendiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "option", 31);
    \u0275\u0275text(37, "En curso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "option", 32);
    \u0275\u0275text(39, "Completado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "option", 33);
    \u0275\u0275text(41, "Cancelado");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(42, "div", 34)(43, "div", 35)(44, "h3");
    \u0275\u0275text(45, "Materiales utilizados");
    \u0275\u0275elementEnd();
    \u0275\u0275template(46, CrearTrabajosRealizadosComponent_div_12_div_46_Template, 4, 0, "div", 36);
    \u0275\u0275elementStart(47, "div", 37)(48, "div", 38);
    \u0275\u0275element(49, "ion-icon", 39);
    \u0275\u0275elementStart(50, "input", 40);
    \u0275\u0275twoWayListener("ngModelChange", function CrearTrabajosRealizadosComponent_div_12_Template_input_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.busquedaProducto, $event) || (ctx_r1.busquedaProducto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function CrearTrabajosRealizadosComponent_div_12_Template_input_input_50_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.filtrarProductos($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(51, CrearTrabajosRealizadosComponent_div_12_div_51_Template, 4, 0, "div", 41)(52, CrearTrabajosRealizadosComponent_div_12_div_52_Template, 2, 1, "div", 42)(53, CrearTrabajosRealizadosComponent_div_12_div_53_Template, 5, 1, "div", 43)(54, CrearTrabajosRealizadosComponent_div_12_div_54_Template, 8, 7, "div", 44)(55, CrearTrabajosRealizadosComponent_div_12_div_55_Template, 6, 0, "div", 45);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(29);
    \u0275\u0275textInterpolate1("", ((tmp_1_0 = ctx_r1.trabajoForm.get("descripcion")) == null ? null : tmp_1_0.value == null ? null : tmp_1_0.value.length) || 0, "/500");
    \u0275\u0275advance(17);
    \u0275\u0275property("ngIf", ctx_r1.modoEdicion);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.busquedaProducto);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(9, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loadingProductos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.errorProductos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loadingProductos && !ctx_r1.errorProductos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.materiales.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.materiales.length === 0 && !ctx_r1.loadingProductos && !ctx_r1.errorProductos);
  }
}
var _CrearTrabajosRealizadosComponent = class _CrearTrabajosRealizadosComponent {
  constructor(fb, modalController, viewportService, elementRef, inventarioService, trabajosService) {
    this.fb = fb;
    this.modalController = modalController;
    this.viewportService = viewportService;
    this.elementRef = elementRef;
    this.inventarioService = inventarioService;
    this.trabajosService = trabajosService;
    this.avisoId = "";
    this.materiales = [];
    this.productosInventario = [];
    this.productosFiltrados = [];
    this.loadingProductos = false;
    this.errorProductos = null;
    this.busquedaProducto = "";
    this.modoEdicion = false;
    this.destroy$ = new Subject();
    this.trabajoForm = this.fb.group({
      fecha_trabajo: [(/* @__PURE__ */ new Date()).toISOString().split("T")[0], Validators.required],
      hora_inicio: ["", Validators.required],
      hora_fin: ["", Validators.required],
      descripcion: ["", [Validators.required, Validators.maxLength(500)]],
      estado: ["Pendiente", Validators.required]
    });
  }
  ngOnInit() {
    addIcons({
      arrowForward,
      personOutline,
      mailOutline,
      chevronDownOutline,
      copyOutline,
      shieldOutline,
      informationCircleOutline,
      cloudUploadOutline,
      closeOutline,
      save,
      saveOutline,
      trashOutline,
      timeOutline,
      calendarOutline,
      documentTextOutline,
      addOutline,
      searchOutline
    });
    this.modoEdicion = !!this.trabajoExistente;
    if (this.modoEdicion && this.trabajoExistente) {
      this.cargarDatosTrabajoExistente();
    }
    this.cargarProductosInventario();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const modalContainer = this.elementRef.nativeElement.querySelector(".modal-container");
      if (modalContainer) {
        this.viewportService.applySafeAreaToModal(modalContainer);
      }
    }, 100);
  }
  /**
   * Carga los datos de un trabajo existente para editar
   */
  cargarDatosTrabajoExistente() {
    return __async(this, null, function* () {
      var _a;
      if (!((_a = this.trabajoExistente) == null ? void 0 : _a.id))
        return;
      try {
        const trabajoCompleto = yield firstValueFrom(this.trabajosService.getTrabajo(this.trabajoExistente.id));
        this.trabajoForm.patchValue({
          fecha_trabajo: this.trabajoExistente.fecha_trabajo,
          hora_inicio: this.trabajoExistente.hora_inicio,
          hora_fin: this.trabajoExistente.hora_fin,
          descripcion: this.trabajoExistente.descripcion,
          estado: this.trabajoExistente.estado
        });
        if (trabajoCompleto.materiales && trabajoCompleto.materiales.length > 0) {
          const materialesConProductos = yield Promise.all(trabajoCompleto.materiales.map((material) => __async(this, null, function* () {
            const producto = yield firstValueFrom(this.inventarioService.getProducto(material.material_id));
            return {
              producto,
              cantidad: material.cantidad_utilizada
            };
          })));
          this.materiales = materialesConProductos;
        }
      } catch (error) {
        console.error("Error al cargar datos del trabajo existente:", error);
        alert("Error al cargar los datos del trabajo para editar.");
      }
    });
  }
  /**
   * Carga los productos del inventario
   */
  cargarProductosInventario() {
    this.loadingProductos = true;
    this.errorProductos = null;
    this.inventarioService.getProductosConStock(1, 100, "", "nombre", "asc").pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.productosInventario = response.inventario;
        this.productosFiltrados = response.inventario;
        this.loadingProductos = false;
      },
      error: (error) => {
        console.error("Error al cargar productos:", error);
        this.errorProductos = "Error al cargar los productos del inventario";
        this.loadingProductos = false;
      }
    });
  }
  /**
   * Filtra productos por búsqueda
   */
  filtrarProductos(event) {
    const busqueda = event.target.value.toLowerCase();
    this.busquedaProducto = busqueda;
    if (!busqueda) {
      this.productosFiltrados = this.productosInventario;
    } else {
      this.productosFiltrados = this.productosInventario.filter((producto) => producto.nombre.toLowerCase().includes(busqueda) || producto.codigo.toLowerCase().includes(busqueda) || producto.descripcion && producto.descripcion.toLowerCase().includes(busqueda));
    }
  }
  /**
   * Añade un producto del inventario como material
   */
  agregarMaterial(producto) {
    const yaExiste = this.materiales.find((m) => m.producto.id === producto.id);
    if (yaExiste) {
      const nuevaCantidad = yaExiste.cantidad + 1;
      if (nuevaCantidad > producto.cantidad_disponible) {
        alert(`No hay suficiente stock. Solo quedan ${producto.cantidad_disponible} ${producto.unidad} de ${producto.nombre}`);
        return;
      }
      yaExiste.cantidad = nuevaCantidad;
    } else {
      if (producto.cantidad_disponible <= 0) {
        alert(`No hay stock disponible para ${producto.nombre}`);
        return;
      }
      this.materiales.push({ producto, cantidad: 1 });
    }
  }
  /**
   * Elimina un material de la lista
   */
  eliminarMaterial(index) {
    this.materiales.splice(index, 1);
  }
  /**
   * Actualiza la cantidad de un material
   */
  actualizarCantidadMaterial(index, nuevaCantidad) {
    const material = this.materiales[index];
    const cantidadNueva = parseInt(nuevaCantidad.toString());
    if (isNaN(cantidadNueva) || cantidadNueva <= 0) {
      return;
    }
    if (cantidadNueva > material.producto.cantidad_disponible) {
      alert(`No hay suficiente stock. Solo quedan ${material.producto.cantidad_disponible} ${material.producto.unidad} de ${material.producto.nombre}`);
      return;
    }
    material.cantidad = cantidadNueva;
  }
  /**
   * Calcula el costo total de los materiales
   */
  calcularCostoTotal() {
    return this.materiales.reduce((total, material) => {
      return total + material.cantidad * material.producto.precio_neto;
    }, 0);
  }
  /**
   * Crea o actualiza el trabajo realizado
   */
  crearTrabajo() {
    return __async(this, null, function* () {
      if (this.trabajoForm.valid) {
        const materialesSinStock = this.materiales.filter((material) => material.cantidad > material.producto.cantidad_disponible);
        if (materialesSinStock.length > 0) {
          const mensaje = materialesSinStock.map((m) => `${m.producto.nombre}: solicitado ${m.cantidad} ${m.producto.unidad}, disponible ${m.producto.cantidad_disponible} ${m.producto.unidad}`).join("\n");
          alert(`No hay suficiente stock para los siguientes materiales:

${mensaje}`);
          return;
        }
        const trabajoData = __spreadProps(__spreadValues({}, this.trabajoForm.value), {
          aviso_id: this.avisoId,
          repuestos: this.materiales.map((m) => m.producto.nombre),
          materiales: this.materiales.map((m) => ({
            material_id: m.producto.id,
            cantidad_utilizada: m.cantidad,
            precio_neto_al_momento: m.producto.precio_neto
          }))
        });
        yield this.modalController.dismiss(trabajoData, "confirm");
      }
    });
  }
  /**
   * Cierra el modal
   */
  cerrarModal() {
    return __async(this, null, function* () {
      yield this.modalController.dismiss(null, "cancel");
    });
  }
};
_CrearTrabajosRealizadosComponent.\u0275fac = function CrearTrabajosRealizadosComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CrearTrabajosRealizadosComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ModalController2), \u0275\u0275directiveInject(ViewportService), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(InventarioService), \u0275\u0275directiveInject(TrabajosService));
};
_CrearTrabajosRealizadosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrearTrabajosRealizadosComponent, selectors: [["app-crear-trabajos-realizados"]], inputs: { avisoId: "avisoId", trabajoExistente: "trabajoExistente" }, decls: 20, vars: 7, consts: [[1, "modal-container"], [1, "modal-header"], [1, "header-content"], [1, "close-button", 3, "click"], ["name", "close-outline"], [1, "subtitle"], [1, "modal-body", 3, "ngSubmit", "formGroup"], [1, "modal-content"], ["class", "loading-state", 4, "ngIf"], ["class", "modal-grid", 4, "ngIf"], [1, "modal-footer"], [1, "button-group"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["name", "save-outline"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "modal-grid"], [1, "form-section"], [1, "form-group"], [1, "required"], ["type", "date", "formControlName", "fecha_trabajo", 1, "form-control"], [1, "form-row"], [1, "form-group", "half"], ["type", "time", "formControlName", "hora_inicio", 1, "form-control"], ["type", "time", "formControlName", "hora_fin", 1, "form-control"], ["formControlName", "descripcion", "placeholder", "Describe detalladamente el trabajo realizado...", "rows", "4", "maxlength", "500", 1, "form-control"], [1, "character-count"], ["formControlName", "estado", 1, "form-control"], ["value", "Pendiente"], ["value", "En curso"], ["value", "Completado"], ["value", "Cancelado"], [1, "images-section"], [1, "repuestos-container"], ["class", "info-message", 4, "ngIf"], [1, "search-container"], [1, "search-input"], ["name", "search-outline"], ["type", "text", "placeholder", "Buscar productos del inventario...", 1, "form-control", 3, "ngModelChange", "input", "ngModel", "ngModelOptions"], ["class", "loading-indicator", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["class", "productos-disponibles", 4, "ngIf"], ["class", "repuestos-list", 4, "ngIf"], ["class", "no-repuestos", 4, "ngIf"], [1, "info-message"], ["name", "information-circle-outline"], [1, "loading-indicator"], [1, "error-message"], [1, "productos-disponibles"], [1, "productos-list"], ["class", "producto-item", 3, "sin-stock", "stock-bajo", "click", 4, "ngFor", "ngForOf"], [1, "producto-item", 3, "click"], [1, "producto-info"], [1, "producto-header"], [1, "producto-codigo"], [1, "producto-stock"], [1, "producto-nombre"], ["class", "producto-descripcion", 4, "ngIf"], [1, "producto-precio"], ["type", "button", 1, "add-producto-btn", 3, "disabled"], ["name", "add-outline"], [1, "producto-descripcion"], [1, "repuestos-list"], ["class", "repuesto-item", 4, "ngFor", "ngForOf"], [1, "costo-total"], [1, "repuesto-item"], [1, "repuesto-info"], [1, "repuesto-header"], [1, "repuesto-codigo"], [1, "repuesto-precio"], [1, "repuesto-nombre"], [1, "repuesto-cantidad"], ["type", "number", 1, "cantidad-input", 3, "change", "value", "min", "max"], [1, "unidad"], ["type", "button", 1, "remove-repuesto", 3, "click"], ["name", "trash-outline"], [1, "no-repuestos"]], template: function CrearTrabajosRealizadosComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 3);
    \u0275\u0275listener("click", function CrearTrabajosRealizadosComponent_Template_button_click_5_listener() {
      return ctx.cerrarModal();
    });
    \u0275\u0275element(6, "ion-icon", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 5);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "form", 6);
    \u0275\u0275listener("ngSubmit", function CrearTrabajosRealizadosComponent_Template_form_ngSubmit_9_listener() {
      return ctx.crearTrabajo();
    });
    \u0275\u0275elementStart(10, "div", 7);
    \u0275\u0275template(11, CrearTrabajosRealizadosComponent_div_11_Template, 5, 0, "div", 8)(12, CrearTrabajosRealizadosComponent_div_12_Template, 56, 10, "div", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "footer", 10)(14, "div", 11)(15, "button", 12);
    \u0275\u0275listener("click", function CrearTrabajosRealizadosComponent_Template_button_click_15_listener() {
      return ctx.cerrarModal();
    });
    \u0275\u0275text(16, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 13);
    \u0275\u0275listener("click", function CrearTrabajosRealizadosComponent_Template_button_click_17_listener() {
      return ctx.crearTrabajo();
    });
    \u0275\u0275text(18);
    \u0275\u0275element(19, "ion-icon", 14);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.modoEdicion ? "Editar parte de trabajo" : "Crear parte de trabajo");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.modoEdicion ? "Modifica el trabajo realizado" : "Registra el trabajo realizado en este aviso");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx.trabajoForm);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.modoEdicion && !ctx.trabajoExistente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.modoEdicion || ctx.trabajoExistente);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx.trabajoForm.valid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.modoEdicion ? "Actualizar trabajo" : "Crear trabajo", " ");
  }
}, dependencies: [IonicModule, IonIcon2, CommonModule, NgForOf, NgIf, CurrencyPipe, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, FormsModule, NgModel], styles: [`

.modal-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 90vh;
  background: #fff;
  position: relative;
}
.modal-header[_ngcontent-%COMP%] {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}
.modal-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}
.modal-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
}
.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover {
  color: #111827;
}
.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 24px;
}
.modal-body[_ngcontent-%COMP%] {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.modal-content[_ngcontent-%COMP%] {
  flex: 1;
  overflow: auto;
  position: relative;
  min-height: 0;
}
.modal-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  height: 100%;
  overflow: hidden;
}
@media (max-width: 768px) {
  .modal-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    height: auto;
    overflow: visible;
  }
}
.form-section[_ngcontent-%COMP%] {
  padding: 24px;
  border-right: 1px solid #e5e7eb;
  overflow-y: auto;
  height: 100%;
  max-height: 100%;
}
@media (max-width: 768px) {
  .form-section[_ngcontent-%COMP%] {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    height: auto;
    max-height: none;
    overflow: visible;
    padding-bottom: 30px;
  }
}
.form-section[_ngcontent-%COMP%] {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}
.form-section[_ngcontent-%COMP%]::-webkit-scrollbar {
  width: 6px;
}
.form-section[_ngcontent-%COMP%]::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}
.form-section[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}
.form-section[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
.images-section[_ngcontent-%COMP%] {
  padding: 24px;
  background-color: #f9fafb;
  overflow-y: auto;
  height: 100%;
  max-height: 100%;
}
@media (max-width: 768px) {
  .images-section[_ngcontent-%COMP%] {
    height: auto;
    max-height: none;
    overflow: visible;
    min-height: 300px;
    padding-bottom: 80px;
  }
}
.images-section[_ngcontent-%COMP%] {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}
.images-section[_ngcontent-%COMP%]::-webkit-scrollbar {
  width: 6px;
}
.images-section[_ngcontent-%COMP%]::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}
.images-section[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}
.images-section[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
.form-group[_ngcontent-%COMP%] {
  position: relative;
  margin-bottom: 20px;
}
.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}
.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {
  color: #dc2626;
}
.form-group.half[_ngcontent-%COMP%] {
  flex: 1;
}
.form-control[_ngcontent-%COMP%] {
  position: relative;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background-color: #fff;
  transition: border-color 0.2s;
}
.form-control[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}
.form-control[_ngcontent-%COMP%]:disabled {
  background-color: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}
select.form-control[_ngcontent-%COMP%] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
}
select.form-control[_ngcontent-%COMP%]:disabled {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
}
select.form-control[_ngcontent-%COMP%]::placeholder {
  color: #9ca3af;
}
select.form-control[_ngcontent-%COMP%] {
  padding-right: 40px;
  background-color: #FAFAFB;
  border: 1px solid transparent;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  transition: border-color 0.2s;
}
select.form-control[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #2563eb;
}
input.form-control[_ngcontent-%COMP%] {
  padding-right: 40px;
  background-color: #FAFAFB;
  border: 1px solid transparent;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  transition: border-color 0.2s;
}
input.form-control[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #2563eb;
}
textarea.form-control[_ngcontent-%COMP%] {
  position: relative;
  padding-right: 40px;
  background-color: #FAFAFB;
  border: 1px solid transparent;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  transition: border-color 0.2s;
  resize: vertical;
  min-height: 80px;
}
textarea.form-control[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #2563eb;
}
.character-count[_ngcontent-%COMP%] {
  margin-top: 4px;
  text-align: right;
  font-size: 12px;
  color: #6b7280;
  position: absolute;
  bottom: 13px;
  right: 13px;
}
.form-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}
.form-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {
  margin-bottom: 0;
  flex: 1;
}
.repuestos-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 16px;
  font-size: 16px;
  color: #374151;
  font-weight: 600;
}
.search-container[_ngcontent-%COMP%] {
  margin-bottom: 16px;
}
.search-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {
  position: relative;
  display: flex;
  align-items: center;
}
.search-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  position: absolute;
  left: 12px;
  color: #6B7280;
  font-size: 18px;
  z-index: 1;
}
.search-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  padding-left: 40px;
  width: 100%;
}
.loading-indicator[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  color: #6B7280;
  font-size: 14px;
}
.loading-indicator[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.loading-indicator[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
}
.loading-state[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  text-align: center;
}
.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #4F46E5;
}
.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
}
.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #6B7280;
  margin: 0;
}
@keyframes _ngcontent-%COMP%_spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.error-message[_ngcontent-%COMP%] {
  padding: 12px;
  background: #FEF2F2;
  color: #DC2626;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;
}
.productos-disponibles[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.productos-disponibles[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 12px;
  font-size: 16px;
  color: #374151;
}
.productos-list[_ngcontent-%COMP%] {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
}
.producto-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #F3F4F6;
  cursor: pointer;
  transition: background-color 0.2s;
}
.producto-item[_ngcontent-%COMP%]:hover {
  background-color: #F9FAFB;
}
.producto-item[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.producto-item.sin-stock[_ngcontent-%COMP%] {
  opacity: 0.6;
  cursor: not-allowed;
}
.producto-item.sin-stock[_ngcontent-%COMP%]:hover {
  background-color: transparent;
}
.producto-item.stock-bajo[_ngcontent-%COMP%] {
  border-left: 3px solid #F59E0B;
}
.producto-item[_ngcontent-%COMP%]   .producto-info[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.producto-item[_ngcontent-%COMP%]   .producto-info[_ngcontent-%COMP%]   .producto-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.producto-item[_ngcontent-%COMP%]   .producto-info[_ngcontent-%COMP%]   .producto-header[_ngcontent-%COMP%]   .producto-codigo[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}
.producto-item[_ngcontent-%COMP%]   .producto-info[_ngcontent-%COMP%]   .producto-header[_ngcontent-%COMP%]   .producto-stock[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #059669;
  font-weight: 500;
}
.producto-item[_ngcontent-%COMP%]   .producto-info[_ngcontent-%COMP%]   .producto-header[_ngcontent-%COMP%]   .producto-stock.stock-bajo[_ngcontent-%COMP%] {
  color: #F59E0B;
  font-weight: 600;
}
.producto-item[_ngcontent-%COMP%]   .producto-info[_ngcontent-%COMP%]   .producto-header[_ngcontent-%COMP%]   .producto-stock.sin-stock[_ngcontent-%COMP%] {
  color: #EF4444;
  font-weight: 600;
}
.producto-item[_ngcontent-%COMP%]   .producto-info[_ngcontent-%COMP%]   .producto-nombre[_ngcontent-%COMP%] {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 2px;
}
.producto-item[_ngcontent-%COMP%]   .producto-info[_ngcontent-%COMP%]   .producto-descripcion[_ngcontent-%COMP%] {
  display: block;
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.producto-item[_ngcontent-%COMP%]   .producto-info[_ngcontent-%COMP%]   .producto-precio[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #059669;
  font-weight: 600;
}
.producto-item[_ngcontent-%COMP%]   .add-producto-btn[_ngcontent-%COMP%] {
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}
.producto-item[_ngcontent-%COMP%]   .add-producto-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #3730A3;
}
.producto-item[_ngcontent-%COMP%]   .add-producto-btn[_ngcontent-%COMP%]:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
}
.producto-item[_ngcontent-%COMP%]   .add-producto-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.repuestos-list[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 12px;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}
.repuesto-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  margin-bottom: 8px;
}
.repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-header[_ngcontent-%COMP%]   .repuesto-codigo[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}
.repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-header[_ngcontent-%COMP%]   .repuesto-precio[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #059669;
  font-weight: 600;
}
.repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-nombre[_ngcontent-%COMP%] {
  display: block;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
  margin-bottom: 8px;
}
.repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-cantidad[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-cantidad[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}
.repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-cantidad[_ngcontent-%COMP%]   .cantidad-input[_ngcontent-%COMP%] {
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
}
.repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-cantidad[_ngcontent-%COMP%]   .unidad[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
}
.repuesto-item[_ngcontent-%COMP%]   .remove-repuesto[_ngcontent-%COMP%] {
  background: none;
  border: none;
  padding: 8px;
  color: #dc2626;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.repuesto-item[_ngcontent-%COMP%]   .remove-repuesto[_ngcontent-%COMP%]:hover {
  color: #b91c1c;
}
.repuesto-item[_ngcontent-%COMP%]   .remove-repuesto[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.costo-total[_ngcontent-%COMP%] {
  margin-top: 16px;
  padding: 12px;
  background-color: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 6px;
  text-align: center;
}
.costo-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #0369A1;
  font-size: 14px;
}
.no-repuestos[_ngcontent-%COMP%] {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}
.no-repuestos[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #d1d5db;
  margin-bottom: 16px;
}
.no-repuestos[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0 0 8px;
  font-size: 16px;
  color: #374151;
}
.no-repuestos[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #6b7280;
}
.modal-footer[_ngcontent-%COMP%] {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: #fff;
  flex-shrink: 0;
  z-index: 10;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
}
.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-outline[_ngcontent-%COMP%] {
  background: none;
  border: 1px solid #d1d5db;
  color: #374151;
}
.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-outline[_ngcontent-%COMP%]:hover:not(:disabled) {
  background-color: #f8fafc;
  border-color: #9ca3af;
}
.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {
  background-color: #2563eb;
  border: 1px solid #2563eb;
  color: #fff;
}
.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}
@media (max-width: 768px) {
  .modal-container[_ngcontent-%COMP%] {
    height: 100vh;
    max-height: none;
  }
  .modal-body[_ngcontent-%COMP%] {
    overflow-y: auto;
  }
  .modal-content[_ngcontent-%COMP%] {
    height: auto;
    overflow: auto;
  }
  .modal-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    height: auto;
    overflow: visible;
  }
  .form-section[_ngcontent-%COMP%] {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    height: auto;
    max-height: none;
    overflow: visible;
    padding-bottom: 30px;
  }
  .images-section[_ngcontent-%COMP%] {
    height: auto;
    max-height: none;
    overflow: visible;
    min-height: 300px;
    padding-bottom: 80px;
  }
  .form-control[_ngcontent-%COMP%] {
    font-size: 16px;
    padding: 12px;
  }
  textarea[_ngcontent-%COMP%], 
   select[_ngcontent-%COMP%], 
   input[_ngcontent-%COMP%] {
    font-size: 14px !important;
    padding: 12px;
  }
  .add-repuesto[_ngcontent-%COMP%] {
    flex-direction: column;
  }
  .add-repuesto[_ngcontent-%COMP%]   .add-button[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: center;
  }
}
@media (display-mode: standalone) and (max-width: 768px) {
  .modal-container[_ngcontent-%COMP%] {
    height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));
    max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));
  }
  .modal-header[_ngcontent-%COMP%] {
    padding-top: calc(16px + var(--safe-area-top, 0px));
  }
  .modal-footer[_ngcontent-%COMP%] {
    padding-bottom: calc(16px + var(--safe-area-bottom, 0px));
  }
}
@supports (-webkit-touch-callout: none) {
  @media (display-mode: standalone) and (max-width: 768px) {
    .modal-container[_ngcontent-%COMP%] {
      height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));
      max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));
    }
    .modal-header[_ngcontent-%COMP%] {
      padding-top: calc(16px + var(--safe-area-top, 0px));
    }
    .modal-footer[_ngcontent-%COMP%] {
      padding-bottom: calc(16px + var(--safe-area-bottom, 0px));
    }
  }
}
@supports not (padding-top: env(safe-area-inset-top)) {
  @media (display-mode: standalone) and (max-width: 768px) {
    .modal-container[_ngcontent-%COMP%] {
      height: calc(100vh - 40px);
      max-height: calc(100vh - 40px);
    }
    .modal-header[_ngcontent-%COMP%] {
      padding-top: 36px;
    }
    .modal-footer[_ngcontent-%COMP%] {
      padding-bottom: 36px;
    }
  }
}
.info-message[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background-color: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 6px;
  margin-bottom: 16px;
}
.info-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #3B82F6;
  font-size: 18px;
  margin-top: 2px;
  flex-shrink: 0;
}
.info-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 14px;
  color: #1E40AF;
  line-height: 1.4;
}
/*# sourceMappingURL=crear-trabajos-realizados.component.css.map */`] });
var CrearTrabajosRealizadosComponent = _CrearTrabajosRealizadosComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrearTrabajosRealizadosComponent, [{
    type: Component,
    args: [{ selector: "app-crear-trabajos-realizados", standalone: true, imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule], template: `<div class="modal-container">\r
  <header class="modal-header">\r
    <div class="header-content">\r
      <h2>{{ modoEdicion ? 'Editar parte de trabajo' : 'Crear parte de trabajo' }}</h2>\r
      <button class="close-button" (click)="cerrarModal()">\r
        <ion-icon name="close-outline"></ion-icon>\r
      </button>\r
    </div>\r
    <p class="subtitle">{{ modoEdicion ? 'Modifica el trabajo realizado' : 'Registra el trabajo realizado en este aviso' }}</p>\r
  </header>\r
\r
  <form [formGroup]="trabajoForm" (ngSubmit)="crearTrabajo()" class="modal-body">\r
    <div class="modal-content">\r
      <!-- Indicador de carga para modo edici\xF3n -->\r
      <div *ngIf="modoEdicion && !trabajoExistente" class="loading-state">\r
        <div class="loading-spinner">\r
          <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
          <p>Cargando datos del trabajo...</p>\r
        </div>\r
      </div>\r
\r
      <div class="modal-grid" *ngIf="!modoEdicion || trabajoExistente">\r
        <!-- Secci\xF3n Izquierda - Formulario -->\r
        <div class="form-section">\r
          <div class="form-group">\r
            <label>Fecha del trabajo <span class="required">*</span></label>\r
            <input \r
              type="date" \r
              formControlName="fecha_trabajo" \r
              class="form-control">\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group half">\r
              <label>Hora de inicio <span class="required">*</span></label>\r
              <input \r
                type="time" \r
                formControlName="hora_inicio" \r
                class="form-control">\r
            </div>\r
            <div class="form-group half">\r
              <label>Hora de fin <span class="required">*</span></label>\r
              <input \r
                type="time" \r
                formControlName="hora_fin" \r
                class="form-control">\r
            </div>\r
          </div>\r
\r
          <div class="form-group">\r
            <label>Descripci\xF3n del trabajo <span class="required">*</span></label>\r
            <textarea \r
              formControlName="descripcion" \r
              class="form-control"\r
              placeholder="Describe detalladamente el trabajo realizado..."\r
              rows="4"\r
              maxlength="500">\r
            </textarea>\r
            <div class="character-count">{{trabajoForm.get('descripcion')?.value?.length || 0}}/500</div>\r
          </div>\r
\r
          <div class="form-group">\r
            <label>Estado del trabajo</label>\r
            <select formControlName="estado" class="form-control">\r
              <option value="Pendiente">Pendiente</option>\r
              <option value="En curso">En curso</option>\r
              <option value="Completado">Completado</option>\r
              <option value="Cancelado">Cancelado</option>\r
            </select>\r
          </div>\r
        </div>\r
\r
        <!-- Secci\xF3n Derecha - Materiales -->\r
        <div class="images-section">\r
          <div class="repuestos-container">\r
            <h3>Materiales utilizados</h3>\r
            \r
            <!-- Mensaje informativo para modo edici\xF3n -->\r
            <div *ngIf="modoEdicion" class="info-message">\r
              <ion-icon name="information-circle-outline"></ion-icon>\r
              <p>Al editar el trabajo, los materiales se ajustar\xE1n autom\xE1ticamente en el inventario.</p>\r
            </div>\r
\r
            <!-- B\xFAsqueda de productos -->\r
            <div class="search-container">\r
              <div class="search-input">\r
                <ion-icon name="search-outline"></ion-icon>\r
                <input\r
                  type="text"\r
                  [(ngModel)]="busquedaProducto"\r
                  [ngModelOptions]="{standalone: true}"\r
                  placeholder="Buscar productos del inventario..."\r
                  class="form-control"\r
                  (input)="filtrarProductos($event)">\r
              </div>\r
            </div>\r
\r
            <!-- Loading state -->\r
            <div *ngIf="loadingProductos" class="loading-indicator">\r
              <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
              <span>Cargando productos...</span>\r
            </div>\r
\r
            <!-- Error state -->\r
            <div *ngIf="errorProductos" class="error-message">\r
              {{ errorProductos }}\r
            </div>\r
\r
            <!-- Lista de productos disponibles -->\r
            <div class="productos-disponibles" *ngIf="!loadingProductos && !errorProductos">\r
              <h4>Productos disponibles</h4>\r
              <div class="productos-list">\r
                <div \r
                  class="producto-item" \r
                  *ngFor="let producto of productosFiltrados"\r
                  [class.sin-stock]="producto.cantidad_disponible <= 0"\r
                  [class.stock-bajo]="producto.cantidad_disponible > 0 && producto.cantidad_disponible <= 5"\r
                  (click)="agregarMaterial(producto)">\r
                  <div class="producto-info">\r
                    <div class="producto-header">\r
                      <span class="producto-codigo">{{producto.codigo}}</span>\r
                      <span class="producto-stock" \r
                            [class.stock-bajo]="producto.cantidad_disponible > 0 && producto.cantidad_disponible <= 5"\r
                            [class.sin-stock]="producto.cantidad_disponible <= 0">\r
                        Stock: {{producto.cantidad_disponible}} {{producto.unidad}}\r
                      </span>\r
                    </div>\r
                    <span class="producto-nombre">{{producto.nombre}}</span>\r
                    <span class="producto-descripcion" *ngIf="producto.descripcion">{{producto.descripcion}}</span>\r
                    <span class="producto-precio">{{producto.precio_neto | currency:'EUR':'symbol':'1.2-2'}}</span>\r
                  </div>\r
                  <button type="button" class="add-producto-btn" [disabled]="producto.cantidad_disponible <= 0">\r
                    <ion-icon name="add-outline"></ion-icon>\r
                  </button>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Lista de materiales a\xF1adidos -->\r
            <div class="repuestos-list" *ngIf="materiales.length > 0">\r
              <h4>Materiales a\xF1adidos</h4>\r
              <div class="repuesto-item" *ngFor="let material of materiales; let i = index">\r
                <div class="repuesto-info">\r
                  <div class="repuesto-header">\r
                    <span class="repuesto-codigo">{{material.producto.codigo}}</span>\r
                    <span class="repuesto-precio">{{material.producto.precio_neto | currency:'EUR':'symbol':'1.2-2'}}</span>\r
                  </div>\r
                  <span class="repuesto-nombre">{{material.producto.nombre}}</span>\r
                  <div class="repuesto-cantidad">\r
                    <label>Cantidad:</label>\r
                    <input \r
                      type="number" \r
                      [value]="material.cantidad"\r
                      [min]="1"\r
                      [max]="material.producto.cantidad_disponible"\r
                      (change)="actualizarCantidadMaterial(i, $any($event.target).value)"\r
                      class="cantidad-input">\r
                    <span class="unidad">{{material.producto.unidad}}</span>\r
                  </div>\r
                </div>\r
                <button type="button" class="remove-repuesto" (click)="eliminarMaterial(i)">\r
                  <ion-icon name="trash-outline"></ion-icon>\r
                </button>\r
              </div>\r
\r
              <!-- Resumen de costos -->\r
              <div class="costo-total">\r
                <strong>Costo total de materiales: {{calcularCostoTotal() | currency:'EUR':'symbol':'1.2-2'}}</strong>\r
              </div>\r
            </div>\r
\r
            <div class="no-repuestos" *ngIf="materiales.length === 0 && !loadingProductos && !errorProductos">\r
              <ion-icon name="information-circle-outline"></ion-icon>\r
              <p>No se han a\xF1adido materiales</p>\r
              <span>Selecciona productos del inventario para a\xF1adirlos como materiales</span>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </form>\r
\r
  <footer class="modal-footer">\r
    <div class="button-group">\r
      <button type="button" class="btn btn-outline" (click)="cerrarModal()">\r
        Cancelar\r
      </button>\r
      <button \r
        type="button" \r
        class="btn btn-primary" \r
        (click)="crearTrabajo()"\r
        [disabled]="!trabajoForm.valid">\r
        {{ modoEdicion ? 'Actualizar trabajo' : 'Crear trabajo' }}\r
        <ion-icon name="save-outline"></ion-icon>\r
      </button>\r
    </div>\r
  </footer>\r
</div> `, styles: [`/* src/app/modules/avisos/components/crear-trabajos-realizados/crear-trabajos-realizados.component.scss */
.modal-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 90vh;
  background: #fff;
  position: relative;
}
.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}
.modal-header .header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header .header-content h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}
.modal-header .subtitle {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
}
.modal-header .close-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-header .close-button:hover {
  color: #111827;
}
.modal-header .close-button ion-icon {
  font-size: 24px;
}
.modal-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.modal-content {
  flex: 1;
  overflow: auto;
  position: relative;
  min-height: 0;
}
.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  height: 100%;
  overflow: hidden;
}
@media (max-width: 768px) {
  .modal-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    height: auto;
    overflow: visible;
  }
}
.form-section {
  padding: 24px;
  border-right: 1px solid #e5e7eb;
  overflow-y: auto;
  height: 100%;
  max-height: 100%;
}
@media (max-width: 768px) {
  .form-section {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    height: auto;
    max-height: none;
    overflow: visible;
    padding-bottom: 30px;
  }
}
.form-section {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}
.form-section::-webkit-scrollbar {
  width: 6px;
}
.form-section::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}
.form-section::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}
.form-section::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
.images-section {
  padding: 24px;
  background-color: #f9fafb;
  overflow-y: auto;
  height: 100%;
  max-height: 100%;
}
@media (max-width: 768px) {
  .images-section {
    height: auto;
    max-height: none;
    overflow: visible;
    min-height: 300px;
    padding-bottom: 80px;
  }
}
.images-section {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}
.images-section::-webkit-scrollbar {
  width: 6px;
}
.images-section::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}
.images-section::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}
.images-section::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
.form-group {
  position: relative;
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}
.form-group label .required {
  color: #dc2626;
}
.form-group.half {
  flex: 1;
}
.form-control {
  position: relative;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background-color: #fff;
  transition: border-color 0.2s;
}
.form-control:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}
.form-control:disabled {
  background-color: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}
select.form-control {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
}
select.form-control:disabled {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
}
select.form-control::placeholder {
  color: #9ca3af;
}
select.form-control {
  padding-right: 40px;
  background-color: #FAFAFB;
  border: 1px solid transparent;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  transition: border-color 0.2s;
}
select.form-control:focus {
  outline: none;
  border-color: #2563eb;
}
input.form-control {
  padding-right: 40px;
  background-color: #FAFAFB;
  border: 1px solid transparent;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  transition: border-color 0.2s;
}
input.form-control:focus {
  outline: none;
  border-color: #2563eb;
}
textarea.form-control {
  position: relative;
  padding-right: 40px;
  background-color: #FAFAFB;
  border: 1px solid transparent;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  transition: border-color 0.2s;
  resize: vertical;
  min-height: 80px;
}
textarea.form-control:focus {
  outline: none;
  border-color: #2563eb;
}
.character-count {
  margin-top: 4px;
  text-align: right;
  font-size: 12px;
  color: #6b7280;
  position: absolute;
  bottom: 13px;
  right: 13px;
}
.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}
.form-row .form-group {
  margin-bottom: 0;
  flex: 1;
}
.repuestos-container h3 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #374151;
  font-weight: 600;
}
.search-container {
  margin-bottom: 16px;
}
.search-container .search-input {
  position: relative;
  display: flex;
  align-items: center;
}
.search-container .search-input ion-icon {
  position: absolute;
  left: 12px;
  color: #6B7280;
  font-size: 18px;
  z-index: 1;
}
.search-container .search-input input {
  padding-left: 40px;
  width: 100%;
}
.loading-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  color: #6B7280;
  font-size: 14px;
}
.loading-indicator ion-icon {
  font-size: 18px;
}
.loading-indicator ion-icon.spinning {
  animation: spin 1s linear infinite;
}
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  text-align: center;
}
.loading-state .loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.loading-state .loading-spinner ion-icon {
  font-size: 48px;
  color: #4F46E5;
}
.loading-state .loading-spinner ion-icon.spinning {
  animation: spin 1s linear infinite;
}
.loading-state .loading-spinner p {
  font-size: 16px;
  color: #6B7280;
  margin: 0;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.error-message {
  padding: 12px;
  background: #FEF2F2;
  color: #DC2626;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;
}
.productos-disponibles {
  margin-bottom: 24px;
}
.productos-disponibles h4 {
  margin: 0 0 12px;
  font-size: 16px;
  color: #374151;
}
.productos-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
}
.producto-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #F3F4F6;
  cursor: pointer;
  transition: background-color 0.2s;
}
.producto-item:hover {
  background-color: #F9FAFB;
}
.producto-item:last-child {
  border-bottom: none;
}
.producto-item.sin-stock {
  opacity: 0.6;
  cursor: not-allowed;
}
.producto-item.sin-stock:hover {
  background-color: transparent;
}
.producto-item.stock-bajo {
  border-left: 3px solid #F59E0B;
}
.producto-item .producto-info {
  flex: 1;
  min-width: 0;
}
.producto-item .producto-info .producto-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.producto-item .producto-info .producto-header .producto-codigo {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}
.producto-item .producto-info .producto-header .producto-stock {
  font-size: 12px;
  color: #059669;
  font-weight: 500;
}
.producto-item .producto-info .producto-header .producto-stock.stock-bajo {
  color: #F59E0B;
  font-weight: 600;
}
.producto-item .producto-info .producto-header .producto-stock.sin-stock {
  color: #EF4444;
  font-weight: 600;
}
.producto-item .producto-info .producto-nombre {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 2px;
}
.producto-item .producto-info .producto-descripcion {
  display: block;
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.producto-item .producto-info .producto-precio {
  font-size: 14px;
  color: #059669;
  font-weight: 600;
}
.producto-item .add-producto-btn {
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}
.producto-item .add-producto-btn:hover:not(:disabled) {
  background: #3730A3;
}
.producto-item .add-producto-btn:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
}
.producto-item .add-producto-btn ion-icon {
  font-size: 16px;
}
.repuestos-list h4 {
  margin: 0 0 12px;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}
.repuesto-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  margin-bottom: 8px;
}
.repuesto-item .repuesto-info {
  flex: 1;
  min-width: 0;
}
.repuesto-item .repuesto-info .repuesto-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.repuesto-item .repuesto-info .repuesto-header .repuesto-codigo {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}
.repuesto-item .repuesto-info .repuesto-header .repuesto-precio {
  font-size: 14px;
  color: #059669;
  font-weight: 600;
}
.repuesto-item .repuesto-info .repuesto-nombre {
  display: block;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
  margin-bottom: 8px;
}
.repuesto-item .repuesto-info .repuesto-cantidad {
  display: flex;
  align-items: center;
  gap: 8px;
}
.repuesto-item .repuesto-info .repuesto-cantidad label {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}
.repuesto-item .repuesto-info .repuesto-cantidad .cantidad-input {
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
}
.repuesto-item .repuesto-info .repuesto-cantidad .unidad {
  font-size: 12px;
  color: #6B7280;
}
.repuesto-item .remove-repuesto {
  background: none;
  border: none;
  padding: 8px;
  color: #dc2626;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.repuesto-item .remove-repuesto:hover {
  color: #b91c1c;
}
.repuesto-item .remove-repuesto ion-icon {
  font-size: 20px;
}
.costo-total {
  margin-top: 16px;
  padding: 12px;
  background-color: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 6px;
  text-align: center;
}
.costo-total strong {
  color: #0369A1;
  font-size: 14px;
}
.no-repuestos {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}
.no-repuestos ion-icon {
  font-size: 48px;
  color: #d1d5db;
  margin-bottom: 16px;
}
.no-repuestos p {
  margin: 0 0 8px;
  font-size: 16px;
  color: #374151;
}
.no-repuestos span {
  font-size: 14px;
  color: #6b7280;
}
.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: #fff;
  flex-shrink: 0;
  z-index: 10;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
}
.modal-footer .button-group {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
.modal-footer .button-group .btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.modal-footer .button-group .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.modal-footer .button-group .btn ion-icon {
  font-size: 18px;
}
.modal-footer .button-group .btn-outline {
  background: none;
  border: 1px solid #d1d5db;
  color: #374151;
}
.modal-footer .button-group .btn-outline:hover:not(:disabled) {
  background-color: #f8fafc;
  border-color: #9ca3af;
}
.modal-footer .button-group .btn-primary {
  background-color: #2563eb;
  border: 1px solid #2563eb;
  color: #fff;
}
.modal-footer .button-group .btn-primary:hover:not(:disabled) {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}
@media (max-width: 768px) {
  .modal-container {
    height: 100vh;
    max-height: none;
  }
  .modal-body {
    overflow-y: auto;
  }
  .modal-content {
    height: auto;
    overflow: auto;
  }
  .modal-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    height: auto;
    overflow: visible;
  }
  .form-section {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    height: auto;
    max-height: none;
    overflow: visible;
    padding-bottom: 30px;
  }
  .images-section {
    height: auto;
    max-height: none;
    overflow: visible;
    min-height: 300px;
    padding-bottom: 80px;
  }
  .form-control {
    font-size: 16px;
    padding: 12px;
  }
  textarea,
  select,
  input {
    font-size: 14px !important;
    padding: 12px;
  }
  .add-repuesto {
    flex-direction: column;
  }
  .add-repuesto .add-button {
    width: 100%;
    justify-content: center;
  }
}
@media (display-mode: standalone) and (max-width: 768px) {
  .modal-container {
    height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));
    max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));
  }
  .modal-header {
    padding-top: calc(16px + var(--safe-area-top, 0px));
  }
  .modal-footer {
    padding-bottom: calc(16px + var(--safe-area-bottom, 0px));
  }
}
@supports (-webkit-touch-callout: none) {
  @media (display-mode: standalone) and (max-width: 768px) {
    .modal-container {
      height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));
      max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));
    }
    .modal-header {
      padding-top: calc(16px + var(--safe-area-top, 0px));
    }
    .modal-footer {
      padding-bottom: calc(16px + var(--safe-area-bottom, 0px));
    }
  }
}
@supports not (padding-top: env(safe-area-inset-top)) {
  @media (display-mode: standalone) and (max-width: 768px) {
    .modal-container {
      height: calc(100vh - 40px);
      max-height: calc(100vh - 40px);
    }
    .modal-header {
      padding-top: 36px;
    }
    .modal-footer {
      padding-bottom: 36px;
    }
  }
}
.info-message {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background-color: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 6px;
  margin-bottom: 16px;
}
.info-message ion-icon {
  color: #3B82F6;
  font-size: 18px;
  margin-top: 2px;
  flex-shrink: 0;
}
.info-message p {
  margin: 0;
  font-size: 14px;
  color: #1E40AF;
  line-height: 1.4;
}
/*# sourceMappingURL=crear-trabajos-realizados.component.css.map */
`] }]
  }], () => [{ type: FormBuilder }, { type: ModalController2 }, { type: ViewportService }, { type: ElementRef }, { type: InventarioService }, { type: TrabajosService }], { avisoId: [{
    type: Input
  }], trabajoExistente: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrearTrabajosRealizadosComponent, { className: "CrearTrabajosRealizadosComponent", filePath: "src/app/modules/avisos/components/crear-trabajos-realizados/crear-trabajos-realizados.component.ts", lineNumber: 21 });
})();

// src/app/core/services/albaranes.service.ts
var _AlbaranesService = class _AlbaranesService {
  constructor(supabaseClientService) {
    this.supabaseClientService = supabaseClientService;
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Crea un nuevo albarán
   */
  crearAlbaran(albaranData) {
    return from(this.supabase.from("albaranes").insert([albaranData]).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }), catchError((error) => {
      console.error("Error al crear albar\xE1n:", error);
      throw error;
    }));
  }
  /**
   * Obtiene un albarán por su ID
   */
  getAlbaran(id) {
    return from(this.supabase.from("albaranes").select(`
          *,
          trabajo:trabajos_realizados(*),
          aviso:avisos(*)
        `).eq("id", id).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }), catchError((error) => {
      console.error("Error al obtener albar\xE1n:", error);
      throw error;
    }));
  }
  /**
   * Obtiene todos los albaranes de un aviso
   */
  getAlbaranesAviso(avisoId) {
    return from(this.supabase.from("albaranes").select(`
          *,
          trabajo:trabajos_realizados(*)
        `).eq("aviso_id", avisoId).order("fecha_cierre", { ascending: false })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }), catchError((error) => {
      console.error("Error al obtener albaranes del aviso:", error);
      throw error;
    }));
  }
  /**
   * Obtiene todos los albaranes de un trabajo
   */
  getAlbaranesTrabajo(trabajoId) {
    return from(this.supabase.from("albaranes").select("*").eq("trabajo_id", trabajoId).order("fecha_cierre", { ascending: false })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }), catchError((error) => {
      console.error("Error al obtener albaranes del trabajo:", error);
      throw error;
    }));
  }
  /**
   * Actualiza un albarán existente
   */
  actualizarAlbaran(id, datos) {
    return from(this.supabase.from("albaranes").update(__spreadProps(__spreadValues({}, datos), {
      fecha_actualizacion: /* @__PURE__ */ new Date()
    })).eq("id", id).select().single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }), catchError((error) => {
      console.error("Error al actualizar albar\xE1n:", error);
      throw error;
    }));
  }
  /**
   * Elimina un albarán
   */
  eliminarAlbaran(id) {
    return from(this.supabase.from("albaranes").delete().eq("id", id)).pipe(map(({ error }) => {
      if (error)
        throw error;
    }), catchError((error) => {
      console.error("Error al eliminar albar\xE1n:", error);
      throw error;
    }));
  }
  /**
   * Obtiene estadísticas de albaranes para un aviso
   */
  getEstadisticasAlbaranes(avisoId) {
    return from(this.supabase.from("albaranes").select("estado_cierre").eq("aviso_id", avisoId)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const albaranes = data;
      const estadisticas = {
        total: albaranes.length,
        finalizados: albaranes.filter((a) => a.estado_cierre === "Finalizado").length,
        presupuestoPendiente: albaranes.filter((a) => a.estado_cierre === "Presupuesto pendiente").length,
        otraVisita: albaranes.filter((a) => a.estado_cierre === "Otra visita").length
      };
      return estadisticas;
    }), catchError((error) => {
      console.error("Error al obtener estad\xEDsticas de albaranes:", error);
      throw error;
    }));
  }
};
_AlbaranesService.\u0275fac = function AlbaranesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AlbaranesService)(\u0275\u0275inject(SupabaseClientService));
};
_AlbaranesService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AlbaranesService, factory: _AlbaranesService.\u0275fac, providedIn: "root" });
var AlbaranesService = _AlbaranesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlbaranesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SupabaseClientService }], null);
})();

// src/app/modules/avisos/components/hacer-albaran/hacer-albaran.component.ts
var _c02 = ["signaturePad"];
function HacerAlbaranComponent_div_47_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_47_div_10_Template_div_click_0_listener() {
      const producto_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.agregarRepuesto(producto_r4));
    });
    \u0275\u0275elementStart(1, "div", 52)(2, "div", 53)(3, "span", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 55);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 56);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 57)(11, "span", 58);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 59);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(15, "ion-icon", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const producto_r4 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(producto_r4.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 6, producto_r4.precio_neto, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(producto_r4.nombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Stock: ", producto_r4.cantidad_disponible, " ", producto_r4.unidad, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(producto_r4.descripcion);
  }
}
function HacerAlbaranComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44)(2, "h4");
    \u0275\u0275text(3, "Seleccionar Repuestos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 45);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_47_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarSelectorRepuestos());
    });
    \u0275\u0275element(5, "ion-icon", 3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 46)(7, "ion-input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function HacerAlbaranComponent_div_47_Template_ion_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.busquedaRepuesto, $event) || (ctx_r1.busquedaRepuesto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ionInput", function HacerAlbaranComponent_div_47_Template_ion_input_ionInput_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.filtrarProductos($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "ion-icon", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 49);
    \u0275\u0275template(10, HacerAlbaranComponent_div_47_div_10_Template, 16, 11, "div", 50);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.busquedaRepuesto);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.productosFiltrados);
  }
}
function HacerAlbaranComponent_div_48_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63)(1, "div", 64)(2, "span", 65);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 66)(5, "label");
    \u0275\u0275text(6, "Cantidad:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 67);
    \u0275\u0275listener("change", function HacerAlbaranComponent_div_48_div_3_Template_input_change_7_listener($event) {
      const repuesto_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.actualizarCantidadRepuesto(repuesto_r6, $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 68);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 69);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 70);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_48_div_3_Template_button_click_13_listener() {
      const repuesto_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eliminarRepuesto(repuesto_r6));
    });
    \u0275\u0275element(14, "ion-icon", 71);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const repuesto_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(repuesto_r6.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", repuesto_r6.cantidad)("min", 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(repuesto_r6.unidad);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(12, 5, repuesto_r6.precio_pvp, "EUR", "symbol", "1.2-2"));
  }
}
function HacerAlbaranComponent_div_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "h4");
    \u0275\u0275text(2, "Repuestos Seleccionados:");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, HacerAlbaranComponent_div_48_div_3_Template, 15, 10, "div", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.repuestosSeleccionados);
  }
}
function HacerAlbaranComponent_div_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275element(1, "ion-icon", 21);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay repuestos seleccionados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5, "Selecciona repuestos del inventario o agrega manualmente");
    \u0275\u0275elementEnd()();
  }
}
function HacerAlbaranComponent_div_54_ion_icon_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 76);
  }
}
function HacerAlbaranComponent_div_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_54_Template_div_click_0_listener() {
      const estado_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.albaranForm.patchValue({ estado_cierre: estado_r8.valor }));
    });
    \u0275\u0275elementStart(1, "div", 74)(2, "h4");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, HacerAlbaranComponent_div_54_ion_icon_6_Template, 1, 0, "ion-icon", 75);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_5_0;
    const estado_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ((tmp_2_0 = ctx_r1.albaranForm.get("estado_cierre")) == null ? null : tmp_2_0.value) === estado_r8.valor);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(estado_r8.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(estado_r8.descripcion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_5_0 = ctx_r1.albaranForm.get("estado_cierre")) == null ? null : tmp_5_0.value) === estado_r8.valor);
  }
}
function HacerAlbaranComponent_div_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "h3");
    \u0275\u0275text(2, "Presupuesto Necesario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 10);
    \u0275\u0275element(4, "ion-input", 77);
    \u0275\u0275elementEnd()();
  }
}
function HacerAlbaranComponent_div_77_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 78);
    \u0275\u0275element(1, "canvas", 79, 0);
    \u0275\u0275elementStart(3, "div", 80)(4, "button", 81);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_77_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.limpiarFirma());
    });
    \u0275\u0275element(5, "ion-icon", 71);
    \u0275\u0275text(6, " Limpiar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 82);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_77_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guardarFirma());
    });
    \u0275\u0275element(8, "ion-icon", 83);
    \u0275\u0275text(9, " Guardar Firma ");
    \u0275\u0275elementEnd()()();
  }
}
function HacerAlbaranComponent_div_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 84);
    \u0275\u0275element(1, "img", 85);
    \u0275\u0275elementStart(2, "div", 86)(3, "button", 87);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_78_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editarFirma());
    });
    \u0275\u0275element(4, "ion-icon", 88);
    \u0275\u0275text(5, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 70);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_78_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.eliminarFirma());
    });
    \u0275\u0275element(7, "ion-icon", 71);
    \u0275\u0275text(8, " Eliminar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.firmaDataUrl, \u0275\u0275sanitizeUrl);
  }
}
function HacerAlbaranComponent_div_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 89)(1, "span");
    \u0275\u0275text(2, "\xC1rea de firma digital");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4, "Haz clic para comenzar a firmar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 90);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_79_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.iniciarFirma());
    });
    \u0275\u0275element(6, "ion-icon", 88);
    \u0275\u0275text(7, " Comenzar Firma ");
    \u0275\u0275elementEnd()();
  }
}
function HacerAlbaranComponent_div_88_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_88_div_10_Template_div_click_0_listener() {
      const producto_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.agregarRepuesto(producto_r14));
    });
    \u0275\u0275elementStart(1, "div", 52)(2, "div", 53)(3, "span", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 55);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 56);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 57)(11, "span", 58);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 59);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(15, "ion-icon", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const producto_r14 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(producto_r14.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 6, producto_r14.precio_neto, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(producto_r14.nombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Stock: ", producto_r14.cantidad_disponible, " ", producto_r14.unidad, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(producto_r14.descripcion);
  }
}
function HacerAlbaranComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44)(2, "h4");
    \u0275\u0275text(3, "Seleccionar Repuestos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 45);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_88_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarSelectorRepuestos());
    });
    \u0275\u0275element(5, "ion-icon", 3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 46)(7, "ion-input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function HacerAlbaranComponent_div_88_Template_ion_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.busquedaRepuesto, $event) || (ctx_r1.busquedaRepuesto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ionInput", function HacerAlbaranComponent_div_88_Template_ion_input_ionInput_7_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.filtrarProductos($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "ion-icon", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 49);
    \u0275\u0275template(10, HacerAlbaranComponent_div_88_div_10_Template, 16, 11, "div", 50);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.busquedaRepuesto);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.productosFiltrados);
  }
}
function HacerAlbaranComponent_div_89_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63)(1, "div", 64)(2, "span", 65);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 66)(5, "label");
    \u0275\u0275text(6, "Cantidad:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 67);
    \u0275\u0275listener("change", function HacerAlbaranComponent_div_89_div_3_Template_input_change_7_listener($event) {
      const repuesto_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.actualizarCantidadRepuesto(repuesto_r16, $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 68);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 69);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 70);
    \u0275\u0275listener("click", function HacerAlbaranComponent_div_89_div_3_Template_button_click_13_listener() {
      const repuesto_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eliminarRepuesto(repuesto_r16));
    });
    \u0275\u0275element(14, "ion-icon", 71);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const repuesto_r16 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(repuesto_r16.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", repuesto_r16.cantidad)("min", 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(repuesto_r16.unidad);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(12, 5, repuesto_r16.precio_pvp, "EUR", "symbol", "1.2-2"));
  }
}
function HacerAlbaranComponent_div_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "h4");
    \u0275\u0275text(2, "Repuestos Seleccionados:");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, HacerAlbaranComponent_div_89_div_3_Template, 15, 10, "div", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.repuestosSeleccionados);
  }
}
function HacerAlbaranComponent_div_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275element(1, "ion-icon", 21);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay repuestos seleccionados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5, "Selecciona repuestos del inventario o agrega manualmente");
    \u0275\u0275elementEnd()();
  }
}
function HacerAlbaranComponent_div_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91);
    \u0275\u0275element(1, "ion-icon", 92);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function HacerAlbaranComponent_ion_icon_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 93);
  }
}
function HacerAlbaranComponent_ion_icon_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 94);
  }
}
var _HacerAlbaranComponent = class _HacerAlbaranComponent {
  constructor(fb, modalController, inventarioService, albaranesService, trabajosService, avisosService) {
    this.fb = fb;
    this.modalController = modalController;
    this.inventarioService = inventarioService;
    this.albaranesService = albaranesService;
    this.trabajosService = trabajosService;
    this.avisosService = avisosService;
    this.loading = false;
    this.error = null;
    this.productosInventario = [];
    this.productosFiltrados = [];
    this.busquedaRepuesto = "";
    this.mostrarSelectorRepuestos = false;
    this.repuestosSeleccionados = [];
    this.firmaCapturada = false;
    this.firmaDataUrl = "";
    this.mostrarCanvas = false;
    this.estadosCierre = [
      { valor: "Finalizado", label: "Finalizado", descripcion: "Trabajo completado, listo para facturar" },
      { valor: "Presupuesto pendiente", label: "Presupuesto pendiente", descripcion: "Se requiere presupuesto adicional" },
      { valor: "Otra visita", label: "Otra visita", descripcion: "Se necesita realizar otra visita" }
    ];
    console.log("HacerAlbaranComponent constructor called");
    addIcons({ close, timeOutline, cubeOutline, addCircleOutline, searchOutline, trashOutline, checkmarkCircleOutline, checkmarkOutline, createOutline, warningOutline, saveOutline, refreshOutline, calendarOutline, personOutline, pencilOutline, documentTextOutline });
    this.albaranForm = this.fb.group({
      fecha_cierre: [/* @__PURE__ */ new Date(), Validators.required],
      hora_entrada: ["", Validators.required],
      hora_salida: ["", Validators.required],
      descripcion_trabajo_realizado: ["", Validators.required],
      repuestos_utilizados: [[]],
      estado_cierre: ["", Validators.required],
      presupuesto_necesario: [0, [Validators.min(0)]],
      dni_cliente: [""],
      nombre_firma: [""],
      firma_cliente: [""],
      observaciones: [""]
    });
  }
  ngOnInit() {
    console.log("\u{1F3AF} HacerAlbaranComponent ngOnInit - Trabajo:", this.trabajo);
    console.log("\u{1F3AF} HacerAlbaranComponent ngOnInit - Aviso:", this.aviso);
    console.log("\u{1F3AF} Formulario inicializado:", this.albaranForm);
    this.cargarProductosInventario();
    this.inicializarFormulario();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.inicializarSignaturePad();
    }, 100);
  }
  /**
   * Inicializa el formulario con datos del trabajo
   */
  inicializarFormulario() {
    if (this.trabajo) {
      this.albaranForm.patchValue({
        hora_entrada: this.trabajo.hora_inicio,
        hora_salida: this.trabajo.hora_fin,
        repuestos_utilizados: this.trabajo.repuestos || []
      });
      if (this.trabajo.repuestos && this.trabajo.repuestos.length > 0) {
        this.repuestosSeleccionados = this.trabajo.repuestos.map((nombre) => ({
          nombre,
          cantidad: 1,
          // Cantidad por defecto si no hay información previa
          precio_neto: 0,
          precio_pvp: 25,
          // Precio por defecto
          unidad: "unidad",
          codigo: ""
        }));
      }
    }
  }
  /**
   * Carga los productos del inventario
   */
  cargarProductosInventario() {
    this.inventarioService.getInventario(1, 1e3, "", "nombre", "asc", false).subscribe({
      next: (response) => {
        this.productosInventario = response.inventario;
        this.productosFiltrados = [...this.productosInventario];
      },
      error: (error) => {
        console.error("Error al cargar productos del inventario:", error);
      }
    });
  }
  /**
   * Filtra productos del inventario por búsqueda
   */
  filtrarProductos(event) {
    var _a;
    const termino = ((_a = event == null ? void 0 : event.target) == null ? void 0 : _a.value) || event || "";
    this.busquedaRepuesto = termino;
    if (!termino.trim()) {
      this.productosFiltrados = [...this.productosInventario];
    } else {
      this.productosFiltrados = this.productosInventario.filter((producto) => {
        var _a2;
        return producto.nombre.toLowerCase().includes(termino.toLowerCase()) || producto.codigo.toLowerCase().includes(termino.toLowerCase()) || (((_a2 = producto.descripcion) == null ? void 0 : _a2.toLowerCase()) || "").includes(termino.toLowerCase());
      });
    }
  }
  /**
   * Abre el selector de repuestos
   */
  abrirSelectorRepuestos() {
    this.mostrarSelectorRepuestos = true;
    this.productosFiltrados = [...this.productosInventario];
    this.busquedaRepuesto = "";
  }
  /**
   * Cierra el selector de repuestos
   */
  cerrarSelectorRepuestos() {
    this.mostrarSelectorRepuestos = false;
  }
  /**
   * Agrega un repuesto del inventario con cantidad
   */
  agregarRepuesto(producto) {
    const repuestoExistente = this.repuestosSeleccionados.find((r) => r.nombre === producto.nombre);
    if (repuestoExistente) {
      repuestoExistente.cantidad += 1;
    } else {
      const nuevoRepuesto = {
        nombre: producto.nombre,
        cantidad: 1,
        precio_neto: producto.precio_neto || 0,
        precio_pvp: producto.pvp || producto.precio_neto || 25,
        unidad: producto.unidad || "unidad",
        codigo: producto.codigo || ""
      };
      this.repuestosSeleccionados.push(nuevoRepuesto);
    }
    this.albaranForm.patchValue({
      repuestos_utilizados: this.repuestosSeleccionados
    });
    this.cerrarSelectorRepuestos();
  }
  /**
   * Elimina un repuesto de la lista
   */
  eliminarRepuesto(repuesto) {
    this.repuestosSeleccionados = this.repuestosSeleccionados.filter((r) => r !== repuesto);
    this.albaranForm.patchValue({
      repuestos_utilizados: this.repuestosSeleccionados
    });
  }
  /**
   * Actualiza la cantidad de un repuesto
   */
  actualizarCantidadRepuesto(repuesto, nuevaCantidad) {
    if (nuevaCantidad > 0) {
      repuesto.cantidad = nuevaCantidad;
      this.albaranForm.patchValue({
        repuestos_utilizados: this.repuestosSeleccionados
      });
    }
  }
  /**
   * Agrega un repuesto manualmente
   */
  agregarRepuestoManual() {
    const nombreRepuesto = prompt("Introduce el nombre del repuesto:");
    if (nombreRepuesto && nombreRepuesto.trim()) {
      const cantidadStr = prompt("Introduce la cantidad utilizada:");
      const cantidad = parseInt(cantidadStr || "1");
      if (cantidad > 0) {
        const repuestoManual = {
          nombre: nombreRepuesto.trim(),
          cantidad,
          precio_neto: 0,
          precio_pvp: 25,
          // Precio por defecto
          unidad: "unidad",
          codigo: ""
        };
        this.repuestosSeleccionados.push(repuestoManual);
        this.albaranForm.patchValue({
          repuestos_utilizados: this.repuestosSeleccionados
        });
      }
    }
  }
  /**
   * Genera hora actual en formato HH:MM
   */
  generarHoraActual() {
    const ahora = /* @__PURE__ */ new Date();
    return `${ahora.getHours().toString().padStart(2, "0")}:${ahora.getMinutes().toString().padStart(2, "0")}`;
  }
  /**
   * Establece la hora actual
   */
  establecerHoraActual() {
    const horaActual = this.generarHoraActual();
    this.albaranForm.patchValue({
      hora_salida: horaActual
    });
  }
  /**
   * Establece la fecha actual
   */
  establecerFechaActual() {
    this.albaranForm.patchValue({
      fecha_cierre: /* @__PURE__ */ new Date()
    });
  }
  /**
   * Guarda el albarán
   */
  guardarAlbaran() {
    if (this.albaranForm.valid) {
      this.loading = true;
      this.error = null;
      const albaranData = {
        trabajo_id: this.trabajo.id,
        aviso_id: this.aviso.id,
        fecha_cierre: this.albaranForm.value.fecha_cierre,
        hora_entrada: this.albaranForm.value.hora_entrada,
        hora_salida: this.albaranForm.value.hora_salida,
        descripcion_trabajo_realizado: this.albaranForm.value.descripcion_trabajo_realizado,
        repuestos_utilizados: this.albaranForm.value.repuestos_utilizados,
        estado_cierre: this.albaranForm.value.estado_cierre,
        presupuesto_necesario: this.albaranForm.value.presupuesto_necesario,
        dni_cliente: this.albaranForm.value.dni_cliente,
        nombre_firma: this.albaranForm.value.nombre_firma,
        firma_cliente: this.albaranForm.value.firma_cliente,
        observaciones: this.albaranForm.value.observaciones
      };
      console.log("Datos del albar\xE1n:", albaranData);
      this.albaranesService.crearAlbaran(albaranData).subscribe({
        next: (albaran) => {
          console.log("Albar\xE1n guardado exitosamente:", albaran);
          let nuevoEstado = "Abierto";
          if (albaran.estado_cierre === "Finalizado") {
            nuevoEstado = "Finalizado";
          } else if (albaran.estado_cierre === "Presupuesto pendiente") {
            nuevoEstado = "Cerrado";
          } else if (albaran.estado_cierre === "Otra visita") {
            nuevoEstado = "Cerrado";
          }
          this.trabajosService.actualizarEstadoTrabajo(this.trabajo.id, nuevoEstado, albaran.id).subscribe({
            next: (trabajoActualizado) => {
              console.log("Trabajo actualizado exitosamente:", trabajoActualizado);
              this.avisosService.actualizarEstadoAutomatico(this.aviso.id).subscribe({
                next: (avisoActualizado) => {
                  this.loading = false;
                  console.log("Estado del aviso actualizado autom\xE1ticamente:", avisoActualizado);
                  this.modalController.dismiss({
                    success: true,
                    albaran,
                    trabajo: trabajoActualizado,
                    aviso: avisoActualizado,
                    mensaje: "Albar\xE1n guardado exitosamente"
                  });
                },
                error: (error) => {
                  console.error("Error al actualizar estado del aviso:", error);
                  this.loading = false;
                  this.modalController.dismiss({
                    success: true,
                    albaran,
                    trabajo: trabajoActualizado,
                    mensaje: "Albar\xE1n guardado exitosamente"
                  });
                }
              });
            },
            error: (error) => {
              this.loading = false;
              this.error = "Error al actualizar el trabajo: " + (error.message || "Error desconocido");
              console.error("Error al actualizar trabajo:", error);
            }
          });
        },
        error: (error) => {
          this.loading = false;
          this.error = "Error al guardar el albar\xE1n: " + (error.message || "Error desconocido");
          console.error("Error al guardar albar\xE1n:", error);
        }
      });
    } else {
      this.error = "Por favor, complete todos los campos requeridos";
      this.marcarCamposComoTocados();
    }
  }
  /**
   * Marca todos los campos como tocados para mostrar errores
   */
  marcarCamposComoTocados() {
    Object.keys(this.albaranForm.controls).forEach((key) => {
      const control = this.albaranForm.get(key);
      control == null ? void 0 : control.markAsTouched();
    });
  }
  /**
   * Cierra el modal
   */
  cancelar() {
    this.modalController.dismiss();
  }
  /**
   * Verifica si el estado requiere presupuesto
   */
  requierePresupuesto() {
    var _a;
    return ((_a = this.albaranForm.get("estado_cierre")) == null ? void 0 : _a.value) === "Presupuesto pendiente";
  }
  /**
   * Verifica si el estado requiere otra visita
   */
  requiereOtraVisita() {
    var _a;
    return ((_a = this.albaranForm.get("estado_cierre")) == null ? void 0 : _a.value) === "Otra visita";
  }
  // ========================================
  // MÉTODOS PARA LA FIRMA DIGITAL
  // ========================================
  /**
   * Inicia el proceso de firma
   */
  iniciarFirma() {
    this.mostrarCanvas = true;
    this.firmaCapturada = false;
    this.firmaDataUrl = "";
  }
  /**
   * Inicializa el signature pad
   */
  inicializarSignaturePad() {
    var _a;
    if (!((_a = this.signaturePadElement) == null ? void 0 : _a.nativeElement)) {
      console.warn("Canvas no encontrado");
      return;
    }
    const canvas = this.signaturePadElement.nativeElement;
    import("./signature_pad-RXXPTIPZ.js").then(({ default: SignaturePad }) => {
      this.signaturePad = new SignaturePad(canvas, {
        backgroundColor: "white",
        penColor: "black",
        minWidth: 1,
        maxWidth: 2.5,
        throttle: 16,
        velocityFilterWeight: 0.7,
        dotSize: 1
      });
      this.ajustarCanvas();
      window.addEventListener("resize", () => this.ajustarCanvas());
    });
  }
  ajustarCanvas() {
    var _a;
    if (!((_a = this.signaturePadElement) == null ? void 0 : _a.nativeElement) || !this.signaturePad) {
      return;
    }
    const canvas = this.signaturePadElement.nativeElement;
    const container = canvas.parentElement;
    if (!container)
      return;
    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width - 40, 200);
    const height = 150;
    canvas.width = width;
    canvas.height = height;
    this.signaturePad.resizeCanvas();
  }
  /**
   * Limpia el canvas de firma
   */
  limpiarFirma() {
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
  }
  /**
   * Guarda la firma capturada
   */
  guardarFirma() {
    if (this.signaturePad && !this.signaturePad.isEmpty()) {
      this.firmaDataUrl = this.signaturePad.toDataURL();
      this.firmaCapturada = true;
      this.mostrarCanvas = false;
      this.albaranForm.patchValue({
        firma_cliente: this.firmaDataUrl
      });
      console.log("Firma guardada exitosamente");
    } else {
      console.warn("No hay firma para guardar");
    }
  }
  /**
   * Permite editar la firma existente
   */
  editarFirma() {
    this.mostrarCanvas = true;
    this.firmaCapturada = false;
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
  }
  /**
   * Elimina la firma completamente
   */
  eliminarFirma() {
    this.firmaCapturada = false;
    this.firmaDataUrl = "";
    this.mostrarCanvas = false;
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
    this.albaranForm.patchValue({
      firma_cliente: ""
    });
    console.log("Firma eliminada");
  }
};
_HacerAlbaranComponent.\u0275fac = function HacerAlbaranComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HacerAlbaranComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ModalController), \u0275\u0275directiveInject(InventarioService), \u0275\u0275directiveInject(AlbaranesService), \u0275\u0275directiveInject(TrabajosService), \u0275\u0275directiveInject(AvisosService));
};
_HacerAlbaranComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HacerAlbaranComponent, selectors: [["app-hacer-albaran"]], viewQuery: function HacerAlbaranComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c02, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.signaturePadElement = _t.first);
  }
}, inputs: { trabajo: "trabajo", aviso: "aviso" }, decls: 99, vars: 17, consts: [["signaturePad", ""], ["slot", "end"], [3, "click"], ["name", "close"], [1, "albaran-container"], [3, "ngSubmit", "formGroup"], [1, "form-layout"], [1, "form-main"], [1, "form-section"], [1, "form-row"], [1, "form-group"], ["type", "date", "formControlName", "fecha_cierre", 3, "click"], [1, "help-text"], ["type", "time", "formControlName", "hora_entrada", "step", "900"], ["type", "time", "formControlName", "hora_salida", "step", "900", 3, "click"], ["type", "button", 1, "btn-now", 3, "click"], ["name", "time-outline"], ["formControlName", "descripcion_trabajo_realizado", "placeholder", "Describe detalladamente el trabajo realizado...", "rows", "3"], [1, "form-section", "repuestos-section", "mobile-only"], [1, "repuestos-actions"], ["type", "button", 1, "btn-select-inventory", 3, "click"], ["name", "cube-outline"], ["class", "inventory-selector", 4, "ngIf"], ["class", "repuestos-list", 4, "ngIf"], ["class", "repuestos-empty", 4, "ngIf"], [1, "estados-grid"], ["class", "estado-option", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["class", "form-section", 4, "ngIf"], ["formControlName", "observaciones", "placeholder", "Observaciones adicionales...", "rows", "2"], ["type", "text", "formControlName", "dni_cliente", "placeholder", "DNI del cliente"], ["type", "text", "formControlName", "nombre_firma", "placeholder", "Nombre de la persona que firma"], [1, "signature-area"], ["class", "signature-canvas-container", 4, "ngIf"], ["class", "signature-preview", 4, "ngIf"], ["class", "signature-placeholder", 4, "ngIf"], [1, "form-sidebar"], [1, "form-section", "repuestos-section", "desktop-only"], ["class", "error-message", 4, "ngIf"], [1, "form-actions"], ["type", "button", "fill", "outline", 3, "click"], ["type", "submit", 3, "disabled"], ["name", "save-outline", 4, "ngIf"], ["name", "refresh-outline", "class", "spinning", 4, "ngIf"], [1, "inventory-selector"], [1, "selector-header"], ["type", "button", 1, "btn-close", 3, "click"], [1, "search-container"], ["type", "text", "placeholder", "Buscar repuestos...", 1, "search-input", 3, "ngModelChange", "ionInput", "ngModel"], ["name", "search-outline"], [1, "products-list"], ["class", "product-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "product-item", 3, "click"], [1, "product-info"], [1, "product-header"], [1, "product-code"], [1, "product-price"], [1, "product-name"], [1, "product-details"], [1, "product-stock"], [1, "product-description"], ["name", "add-circle-outline", 1, "add-icon"], [1, "repuestos-list"], ["class", "repuesto-item", 4, "ngFor", "ngForOf"], [1, "repuesto-item"], [1, "repuesto-info"], [1, "repuesto-nombre"], [1, "repuesto-cantidad"], ["type", "number", 1, "cantidad-input", 3, "change", "value", "min"], [1, "unidad"], [1, "repuesto-precio"], ["type", "button", 1, "btn-remove", 3, "click"], ["name", "trash-outline"], [1, "repuestos-empty"], [1, "estado-option", 3, "click"], [1, "estado-content"], ["name", "checkmark-circle-outline", 4, "ngIf"], ["name", "checkmark-circle-outline"], ["type", "number", "formControlName", "presupuesto_necesario", "placeholder", "0.00", "step", "0.01"], [1, "signature-canvas-container"], [1, "signature-canvas"], [1, "signature-controls"], ["type", "button", 1, "btn-clear", 3, "click"], ["type", "button", 1, "btn-save", 3, "click"], ["name", "checkmark-outline"], [1, "signature-preview"], ["alt", "Firma del cliente", 1, "firma-image", 3, "src"], [1, "signature-actions"], ["type", "button", 1, "btn-edit", 3, "click"], ["name", "create-outline"], [1, "signature-placeholder"], ["type", "button", 1, "btn-start-signature", 3, "click"], [1, "error-message"], ["name", "warning-outline"], ["name", "save-outline"], ["name", "refresh-outline", 1, "spinning"]], template: function HacerAlbaranComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
    \u0275\u0275text(3, "VISTA CIERRE ALBAR\xC1N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-buttons", 1)(5, "ion-button", 2);
    \u0275\u0275listener("click", function HacerAlbaranComponent_Template_ion_button_click_5_listener() {
      return ctx.cancelar();
    });
    \u0275\u0275element(6, "ion-icon", 3);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(7, "ion-content")(8, "div", 4)(9, "form", 5);
    \u0275\u0275listener("ngSubmit", function HacerAlbaranComponent_Template_form_ngSubmit_9_listener() {
      return ctx.guardarAlbaran();
    });
    \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "div", 8)(13, "h3");
    \u0275\u0275text(14, "Fecha y Horarios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 9)(16, "div", 10)(17, "ion-label");
    \u0275\u0275text(18, "FECHA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "ion-input", 11);
    \u0275\u0275listener("click", function HacerAlbaranComponent_Template_ion_input_click_19_listener() {
      return ctx.establecerFechaActual();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "small", 12);
    \u0275\u0275text(21, "Autom\xE1tica d\xEDa actual");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 10)(23, "ion-label");
    \u0275\u0275text(24, "HORA ENTRADA");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "ion-input", 13);
    \u0275\u0275elementStart(26, "small", 12);
    \u0275\u0275text(27, "Men\xFA interactivo 15 en 15 min");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 10)(29, "ion-label");
    \u0275\u0275text(30, "HORA SALIDA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "ion-input", 14);
    \u0275\u0275listener("click", function HacerAlbaranComponent_Template_ion_input_click_31_listener() {
      return ctx.establecerHoraActual();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 15);
    \u0275\u0275listener("click", function HacerAlbaranComponent_Template_button_click_32_listener() {
      return ctx.establecerHoraActual();
    });
    \u0275\u0275element(33, "ion-icon", 16);
    \u0275\u0275text(34, " Ahora ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(35, "div", 8)(36, "h3");
    \u0275\u0275text(37, "Descripci\xF3n del Trabajo Realizado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 10);
    \u0275\u0275element(39, "ion-textarea", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 18)(41, "h3");
    \u0275\u0275text(42, "Repuestos Utilizados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 19)(44, "button", 20);
    \u0275\u0275listener("click", function HacerAlbaranComponent_Template_button_click_44_listener() {
      return ctx.abrirSelectorRepuestos();
    });
    \u0275\u0275element(45, "ion-icon", 21);
    \u0275\u0275text(46, " Seleccionar del Inventario ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(47, HacerAlbaranComponent_div_47_Template, 11, 2, "div", 22)(48, HacerAlbaranComponent_div_48_Template, 4, 1, "div", 23)(49, HacerAlbaranComponent_div_49_Template, 6, 0, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 8)(51, "h3");
    \u0275\u0275text(52, "Estado de Cierre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 25);
    \u0275\u0275template(54, HacerAlbaranComponent_div_54_Template, 7, 5, "div", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(55, HacerAlbaranComponent_div_55_Template, 5, 0, "div", 27);
    \u0275\u0275elementStart(56, "div", 8)(57, "h3");
    \u0275\u0275text(58, "Observaciones Adicionales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 10);
    \u0275\u0275element(60, "ion-textarea", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 8)(62, "h3");
    \u0275\u0275text(63, "Identificaci\xF3n y Firma");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "div", 9)(65, "div", 10)(66, "ion-label");
    \u0275\u0275text(67, "DNI");
    \u0275\u0275elementEnd();
    \u0275\u0275element(68, "ion-input", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "div", 10)(70, "ion-label");
    \u0275\u0275text(71, "NOMBRE FIRMA");
    \u0275\u0275elementEnd();
    \u0275\u0275element(72, "ion-input", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 10)(74, "ion-label");
    \u0275\u0275text(75, "FIRMA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "div", 31);
    \u0275\u0275template(77, HacerAlbaranComponent_div_77_Template, 10, 0, "div", 32)(78, HacerAlbaranComponent_div_78_Template, 9, 1, "div", 33)(79, HacerAlbaranComponent_div_79_Template, 8, 0, "div", 34);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(80, "div", 35)(81, "div", 36)(82, "h3");
    \u0275\u0275text(83, "Repuestos Utilizados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "div", 19)(85, "button", 20);
    \u0275\u0275listener("click", function HacerAlbaranComponent_Template_button_click_85_listener() {
      return ctx.abrirSelectorRepuestos();
    });
    \u0275\u0275element(86, "ion-icon", 21);
    \u0275\u0275text(87, " Seleccionar del Inventario ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(88, HacerAlbaranComponent_div_88_Template, 11, 2, "div", 22)(89, HacerAlbaranComponent_div_89_Template, 4, 1, "div", 23)(90, HacerAlbaranComponent_div_90_Template, 6, 0, "div", 24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(91, HacerAlbaranComponent_div_91_Template, 4, 1, "div", 37);
    \u0275\u0275elementStart(92, "div", 38)(93, "ion-button", 39);
    \u0275\u0275listener("click", function HacerAlbaranComponent_Template_ion_button_click_93_listener() {
      return ctx.cancelar();
    });
    \u0275\u0275text(94, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "ion-button", 40);
    \u0275\u0275template(96, HacerAlbaranComponent_ion_icon_96_Template, 1, 0, "ion-icon", 41)(97, HacerAlbaranComponent_ion_icon_97_Template, 1, 0, "ion-icon", 42);
    \u0275\u0275text(98);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(9);
    \u0275\u0275property("formGroup", ctx.albaranForm);
    \u0275\u0275advance(38);
    \u0275\u0275property("ngIf", ctx.mostrarSelectorRepuestos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.repuestosSeleccionados.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.repuestosSeleccionados.length === 0 && !ctx.mostrarSelectorRepuestos);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx.estadosCierre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.requierePresupuesto());
    \u0275\u0275advance(22);
    \u0275\u0275property("ngIf", !ctx.firmaCapturada);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.firmaCapturada);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.firmaCapturada && !ctx.mostrarCanvas);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx.mostrarSelectorRepuestos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.repuestosSeleccionados.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.repuestosSeleccionados.length === 0 && !ctx.mostrarSelectorRepuestos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx.albaranForm.valid || ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.loading ? "Guardando..." : "Guardar Albar\xE1n", " ");
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  CurrencyPipe,
  ReactiveFormsModule,
  \u0275NgNoValidate,
  NgControlStatus,
  NgControlStatusGroup,
  FormGroupDirective,
  FormControlName,
  FormsModule,
  NgModel,
  IonIcon,
  IonButton,
  IonInput,
  IonTextarea,
  IonLabel,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons
], styles: ["\n\nion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n  --background: #fff;\n  --border-color: #e5e7eb;\n  --color: #111827;\n}\nion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n  color: #111827;\n}\nion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --color: #6b7280;\n}\nion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]:hover {\n  --color: #111827;\n}\n.albaran-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: #fff;\n}\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  gap: 20px;\n  overflow-y: auto;\n  padding-right: 4px;\n}\nform[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\nform[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 3px;\n}\nform[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 3px;\n}\nform[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #a8a8a8;\n}\n.form-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 24px;\n  flex: 1;\n}\n@media (min-width: 1200px) {\n  .form-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 2fr 1fr;\n    gap: 32px;\n  }\n}\n.form-main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  order: 1;\n}\n.form-sidebar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  order: 2;\n}\n.form-section[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  flex-shrink: 0;\n}\n.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 20px 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #1F2937;\n  border-bottom: 2px solid #4F46E5;\n  padding-bottom: 8px;\n}\n.repuestos-section[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 20px;\n}\n.repuestos-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  border-bottom-color: #10B981;\n}\n@media (max-width: 1199px) {\n  .repuestos-section[_ngcontent-%COMP%] {\n    position: static;\n    top: auto;\n  }\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n}\n@media (min-width: 1200px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 24px;\n  }\n}\n.form-group[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 8px;\n  text-transform: none;\n  letter-spacing: normal;\n}\n.form-group[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {\n  --background: #FAFAFB;\n  --border-radius: 6px;\n  --border-width: 1px;\n  --border-color: transparent;\n  --padding-start: 12px;\n  --padding-end: 12px;\n  --padding-top: 10px;\n  --padding-bottom: 10px;\n  --color: #111827;\n  --placeholder-color: #9CA3AF;\n  font-size: 14px;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]:focus-within, \n.form-group[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%]:focus-within, \n.form-group[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]:focus-within {\n  --border-color: #2563eb;\n  --background: #fff;\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);\n}\n.form-group[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%] {\n  --min-height: 80px;\n  resize: vertical;\n}\n.help-text[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: #6B7280;\n  margin-top: 4px;\n  font-style: italic;\n  line-height: 1.4;\n}\n.btn-now[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 12px;\n  background: #2563eb;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  margin-top: 8px;\n  transition: all 0.2s ease;\n}\n.btn-now[_ngcontent-%COMP%]:hover {\n  background: #1d4ed8;\n}\n.btn-now[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.estados-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n@media (min-width: 1200px) {\n  .estados-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 20px;\n  }\n}\n.estado-option[_ngcontent-%COMP%] {\n  border: 2px solid #E5E7EB;\n  border-radius: 8px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n  background: #fff;\n}\n.estado-option[_ngcontent-%COMP%]:hover {\n  border-color: #2563eb;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.estado-option.selected[_ngcontent-%COMP%] {\n  border-color: #2563eb;\n  background: #EFF6FF;\n}\n.estado-option.selected[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.estado-option[_ngcontent-%COMP%]   .estado-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #111827;\n}\n.estado-option[_ngcontent-%COMP%]   .estado-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  color: #6B7280;\n  line-height: 1.4;\n}\n.estado-option[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  font-size: 20px;\n  color: #9CA3AF;\n}\n.signature-area[_ngcontent-%COMP%] {\n  border: 2px dashed #D1D5DB;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n  background: #F9FAFB;\n  transition: all 0.2s ease;\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.signature-area[_ngcontent-%COMP%]:hover {\n  border-color: #2563eb;\n  background: #EFF6FF;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-canvas-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-canvas-container[_ngcontent-%COMP%]   .signature-canvas[_ngcontent-%COMP%] {\n  border: 1px solid #E5E7EB;\n  border-radius: 6px;\n  background: #fff;\n  cursor: crosshair;\n  touch-action: none;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-canvas-container[_ngcontent-%COMP%]   .signature-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-canvas-container[_ngcontent-%COMP%]   .signature-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-canvas-container[_ngcontent-%COMP%]   .signature-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-canvas-container[_ngcontent-%COMP%]   .signature-controls[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%] {\n  background: #FEE2E2;\n  color: #DC2626;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-canvas-container[_ngcontent-%COMP%]   .signature-controls[_ngcontent-%COMP%]   .btn-clear[_ngcontent-%COMP%]:hover {\n  background: #FECACA;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-canvas-container[_ngcontent-%COMP%]   .signature-controls[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%] {\n  background: #10B981;\n  color: white;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-canvas-container[_ngcontent-%COMP%]   .signature-controls[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]:hover {\n  background: #059669;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-preview[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-preview[_ngcontent-%COMP%]   .firma-image[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 120px;\n  border: 1px solid #E5E7EB;\n  border-radius: 6px;\n  background: #fff;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-preview[_ngcontent-%COMP%]   .signature-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-preview[_ngcontent-%COMP%]   .signature-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-preview[_ngcontent-%COMP%]   .signature-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-preview[_ngcontent-%COMP%]   .signature-actions[_ngcontent-%COMP%]   .btn-edit[_ngcontent-%COMP%] {\n  background: #DBEAFE;\n  color: #1D4ED8;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-preview[_ngcontent-%COMP%]   .signature-actions[_ngcontent-%COMP%]   .btn-edit[_ngcontent-%COMP%]:hover {\n  background: #BFDBFE;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-preview[_ngcontent-%COMP%]   .signature-actions[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%] {\n  background: #FEE2E2;\n  color: #DC2626;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-preview[_ngcontent-%COMP%]   .signature-actions[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%]:hover {\n  background: #FECACA;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  color: #6B7280;\n  margin-top: 15px;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #9CA3AF;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9CA3AF;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   .btn-start-signature[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 20px;\n  background: #2563eb;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-top: 8px;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   .btn-start-signature[_ngcontent-%COMP%]:hover {\n  background: #1d4ed8;\n}\n.signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   .btn-start-signature[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.error-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  background: #FEF2F2;\n  border: 1px solid #FECACA;\n  border-radius: 6px;\n  color: #DC2626;\n  margin-bottom: 20px;\n  font-size: 14px;\n}\n.error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #DC2626;\n  flex-shrink: 0;\n}\n.error-message[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: auto;\n  padding-top: 24px;\n  border-top: 1px solid #E5E7EB;\n  flex-shrink: 0;\n  background: #fff;\n  position: sticky;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 10;\n}\n.form-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  font-weight: 500;\n  font-size: 14px;\n  min-width: 140px;\n  border-radius: 6px;\n  transition: all 0.2s;\n}\n.form-actions[_ngcontent-%COMP%]   ion-button[fill=outline][_ngcontent-%COMP%] {\n  --border-color: #d1d5db;\n  --color: #374151;\n}\n.form-actions[_ngcontent-%COMP%]   ion-button[fill=outline][_ngcontent-%COMP%]:hover {\n  --background: #f8fafc;\n  --border-color: #9ca3af;\n}\n.form-actions[_ngcontent-%COMP%]   ion-button[type=submit][_ngcontent-%COMP%] {\n  --background: #2563eb;\n  --border-color: #2563eb;\n  --color: #fff;\n}\n.form-actions[_ngcontent-%COMP%]   ion-button[type=submit][_ngcontent-%COMP%]:hover {\n  --background: #1d4ed8;\n  --border-color: #1d4ed8;\n}\n.repuestos-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.repuestos-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 10px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  width: 100%;\n}\n.repuestos-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.repuestos-actions[_ngcontent-%COMP%]   .btn-select-inventory[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: white;\n}\n.repuestos-actions[_ngcontent-%COMP%]   .btn-select-inventory[_ngcontent-%COMP%]:hover {\n  background: #1d4ed8;\n}\n.repuestos-actions[_ngcontent-%COMP%]   .btn-add-manual[_ngcontent-%COMP%] {\n  background: #10B981;\n  color: white;\n}\n.repuestos-actions[_ngcontent-%COMP%]   .btn-add-manual[_ngcontent-%COMP%]:hover {\n  background: #059669;\n}\n.repuestos-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #9CA3AF;\n}\n.repuestos-empty[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.repuestos-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 16px;\n  font-weight: 500;\n  color: #6B7280;\n}\n.repuestos-empty[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #9CA3AF;\n  line-height: 1.4;\n}\n.inventory-selector[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #E2E8F0;\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  max-height: 400px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.inventory-selector[_ngcontent-%COMP%]   .selector-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .selector-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1F2937;\n  font-size: 16px;\n  font-weight: 600;\n}\n.inventory-selector[_ngcontent-%COMP%]   .selector-header[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #6B7280;\n  font-size: 20px;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.inventory-selector[_ngcontent-%COMP%]   .selector-header[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover {\n  background: #F3F4F6;\n  color: #374151;\n}\n.inventory-selector[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 16px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  --background: #FAFAFB;\n  --border-radius: 6px;\n  --border-width: 1px;\n  --border-color: transparent;\n  --padding-start: 40px 12px 12px;\n  --padding-end: 12px;\n  --padding-top: 10px;\n  --padding-bottom: 10px;\n  --color: #111827;\n  --placeholder-color: #9CA3AF;\n  font-size: 14px;\n  transition: border-color 0.2s;\n}\n.inventory-selector[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus-within {\n  --border-color: #2563eb;\n  --background: #fff;\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);\n}\n.inventory-selector[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9CA3AF;\n  font-size: 18px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%] {\n  flex: 1;\n  max-height: 250px;\n  overflow-y: auto;\n  border: 1px solid #E5E7EB;\n  border-radius: 6px;\n  background: #F9FAFB;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px;\n  border-bottom: 1px solid #E5E7EB;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]:hover {\n  background: #F3F4F6;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 4px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-header[_ngcontent-%COMP%]   .product-code[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #6B7280;\n  background: #E5E7EB;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-weight: 500;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-header[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #059669;\n  font-size: 13px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1F2937;\n  font-size: 13px;\n  margin-bottom: 4px;\n  display: block;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   .product-stock[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #6B7280;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   .product-description[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9CA3AF;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .add-icon[_ngcontent-%COMP%] {\n  color: #3B82F6;\n  font-size: 18px;\n  margin-left: 8px;\n}\n.repuestos-list[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.repuestos-list[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  color: #1F2937;\n  font-size: 16px;\n  font-weight: 600;\n}\n.repuestos-list[_ngcontent-%COMP%]   .repuesto-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n  background: #F0F9FF;\n  border: 1px solid #BAE6FD;\n  border-radius: 6px;\n  margin-bottom: 8px;\n}\n.repuestos-list[_ngcontent-%COMP%]   .repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.repuestos-list[_ngcontent-%COMP%]   .repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-nombre[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #0369A1;\n  font-size: 14px;\n  min-width: 120px;\n}\n.repuestos-list[_ngcontent-%COMP%]   .repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-cantidad[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.repuestos-list[_ngcontent-%COMP%]   .repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-cantidad[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6B7280;\n  font-weight: 500;\n}\n.repuestos-list[_ngcontent-%COMP%]   .repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-cantidad[_ngcontent-%COMP%]   .cantidad-input[_ngcontent-%COMP%] {\n  width: 60px;\n  padding: 4px 8px;\n  border: 1px solid #D1D5DB;\n  border-radius: 4px;\n  font-size: 12px;\n  text-align: center;\n}\n.repuestos-list[_ngcontent-%COMP%]   .repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-cantidad[_ngcontent-%COMP%]   .unidad[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #6B7280;\n  font-weight: 500;\n}\n.repuestos-list[_ngcontent-%COMP%]   .repuesto-item[_ngcontent-%COMP%]   .repuesto-info[_ngcontent-%COMP%]   .repuesto-precio[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #059669;\n  font-size: 13px;\n  min-width: 80px;\n  text-align: right;\n}\n.repuestos-list[_ngcontent-%COMP%]   .repuesto-item[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%] {\n  background: #FEE2E2;\n  color: #DC2626;\n  border: none;\n  padding: 6px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.repuestos-list[_ngcontent-%COMP%]   .repuesto-item[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%]:hover {\n  background: #FECACA;\n}\n.repuestos-list[_ngcontent-%COMP%]   .repuesto-item[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\nion-button[type=submit][disabled][_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\nion-button[type=submit][_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n.mobile-only[_ngcontent-%COMP%] {\n  display: block;\n}\n.desktop-only[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (min-width: 1200px) {\n  .mobile-only[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .desktop-only[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n@media (max-width: 768px) {\n  .albaran-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .form-main[_ngcontent-%COMP%] {\n    order: 1;\n  }\n  .form-sidebar[_ngcontent-%COMP%] {\n    order: 2;\n  }\n  .form-section[_ngcontent-%COMP%] {\n    padding: 20px;\n    margin-bottom: 20px;\n  }\n  .form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 16px;\n    margin-bottom: 16px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n  .estados-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n  .estado-option[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .estado-option[_ngcontent-%COMP%]   .estado-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  .estado-option[_ngcontent-%COMP%]   .estado-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .estado-option[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 18px;\n    top: 12px;\n    right: 12px;\n  }\n  .repuestos-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .repuestos-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .form-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .signature-area[_ngcontent-%COMP%] {\n    padding: 30px;\n  }\n  .signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 36px;\n  }\n  .signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n}\n@media (min-width: 769px) and (max-width: 1199px) {\n  .albaran-container[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n  .form-main[_ngcontent-%COMP%] {\n    order: 1;\n  }\n  .form-sidebar[_ngcontent-%COMP%] {\n    order: 2;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n  }\n  .estados-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 16px;\n  }\n  .repuestos-actions[_ngcontent-%COMP%] {\n    flex-direction: row;\n    gap: 12px;\n  }\n  .repuestos-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 0;\n  }\n}\n@media (min-width: 1200px) {\n  .albaran-container[_ngcontent-%COMP%] {\n    padding: 32px;\n  }\n  .form-main[_ngcontent-%COMP%] {\n    order: 1;\n  }\n  .form-sidebar[_ngcontent-%COMP%] {\n    order: 2;\n  }\n  .form-section[_ngcontent-%COMP%] {\n    padding: 28px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    gap: 28px;\n  }\n  .estados-grid[_ngcontent-%COMP%] {\n    gap: 24px;\n  }\n  .repuestos-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .repuestos-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 14px 20px;\n    font-size: 15px;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    gap: 20px;\n  }\n  .form-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n    min-width: 160px;\n    --padding-start: 28px;\n    --padding-end: 28px;\n    --padding-top: 14px;\n    --padding-bottom: 14px;\n    font-size: 15px;\n  }\n}\n@media (max-width: 480px) {\n  .albaran-container[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .form-main[_ngcontent-%COMP%] {\n    order: 1;\n  }\n  .form-sidebar[_ngcontent-%COMP%] {\n    order: 2;\n  }\n  .form-section[_ngcontent-%COMP%] {\n    padding: 16px;\n    margin-bottom: 16px;\n  }\n  .form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 15px;\n    margin-bottom: 12px;\n  }\n  .form-group[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n  .form-group[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n    font-size: 13px;\n    margin-bottom: 6px;\n  }\n  .estado-option[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .estado-option[_ngcontent-%COMP%]   .estado-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .estado-option[_ngcontent-%COMP%]   .estado-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .estado-option[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n    top: 8px;\n    right: 8px;\n  }\n  .signature-area[_ngcontent-%COMP%] {\n    padding: 15px 0px;\n    border-color: #2563eb;\n    background: #EFF6FF;\n    display: flex;\n    flex-direction: column;\n  }\n  .signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 32px;\n  }\n  .signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .signature-area[_ngcontent-%COMP%]   .signature-placeholder[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .help-text[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .btn-now[_ngcontent-%COMP%] {\n    padding: 4px 8px;\n    font-size: 11px;\n  }\n  .btn-now[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=hacer-albaran.component.css.map */"] });
var HacerAlbaranComponent = _HacerAlbaranComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HacerAlbaranComponent, [{
    type: Component,
    args: [{ selector: "app-hacer-albaran", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      IonIcon,
      IonButton,
      IonInput,
      IonTextarea,
      IonLabel,
      IonContent,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonButtons
    ], template: `<ion-header>\r
  <ion-toolbar>\r
    <ion-title>VISTA CIERRE ALBAR\xC1N</ion-title>\r
    <ion-buttons slot="end">\r
      <ion-button (click)="cancelar()">\r
        <ion-icon name="close"></ion-icon>\r
      </ion-button>\r
    </ion-buttons>\r
  </ion-toolbar>\r
</ion-header>\r
\r
<ion-content>\r
  <div class="albaran-container">\r
    <form [formGroup]="albaranForm" (ngSubmit)="guardarAlbaran()">\r
\r
      <!-- Layout de dos columnas -->\r
      <div class="form-layout">\r
\r
        <!-- COLUMNA IZQUIERDA: Formulario principal -->\r
        <div class="form-main">\r
\r
          <!-- Fecha y Horarios -->\r
          <div class="form-section">\r
            <h3>Fecha y Horarios</h3>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <ion-label>FECHA</ion-label>\r
                <ion-input type="date" formControlName="fecha_cierre" (click)="establecerFechaActual()">\r
                </ion-input>\r
                <small class="help-text">Autom\xE1tica d\xEDa actual</small>\r
              </div>\r
\r
              <div class="form-group">\r
                <ion-label>HORA ENTRADA</ion-label>\r
                <ion-input type="time" formControlName="hora_entrada" step="900">\r
                </ion-input>\r
                <small class="help-text">Men\xFA interactivo 15 en 15 min</small>\r
              </div>\r
\r
              <div class="form-group">\r
                <ion-label>HORA SALIDA</ion-label>\r
                <ion-input type="time" formControlName="hora_salida" step="900" (click)="establecerHoraActual()">\r
                </ion-input>\r
                <button type="button" class="btn-now" (click)="establecerHoraActual()">\r
                  <ion-icon name="time-outline"></ion-icon>\r
                  Ahora\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- Descripci\xF3n del Trabajo -->\r
          <div class="form-section">\r
            <h3>Descripci\xF3n del Trabajo Realizado</h3>\r
            <div class="form-group">\r
              <ion-textarea formControlName="descripcion_trabajo_realizado"\r
                placeholder="Describe detalladamente el trabajo realizado..." rows="3">\r
              </ion-textarea>\r
            </div>\r
          </div>\r
\r
          <!-- Repuestos Utilizados (visible solo en m\xF3vil) -->\r
          <div class="form-section repuestos-section mobile-only">\r
            <h3>Repuestos Utilizados</h3>\r
\r
            <!-- Botones de acci\xF3n -->\r
            <div class="repuestos-actions">\r
              <button type="button" class="btn-select-inventory" (click)="abrirSelectorRepuestos()">\r
                <ion-icon name="cube-outline"></ion-icon>\r
                Seleccionar del Inventario\r
              </button>\r
            </div>\r
\r
            <!-- Selector de repuestos del inventario -->\r
            <div *ngIf="mostrarSelectorRepuestos" class="inventory-selector">\r
              <div class="selector-header">\r
                <h4>Seleccionar Repuestos</h4>\r
                <button type="button" class="btn-close" (click)="cerrarSelectorRepuestos()">\r
                  <ion-icon name="close"></ion-icon>\r
                </button>\r
              </div>\r
\r
              <div class="search-container">\r
                <ion-input type="text" [(ngModel)]="busquedaRepuesto" (ionInput)="filtrarProductos($event)"\r
                  placeholder="Buscar repuestos..." class="search-input">\r
                </ion-input>\r
                <ion-icon name="search-outline"></ion-icon>\r
              </div>\r
\r
              <div class="products-list">\r
                <div *ngFor="let producto of productosFiltrados" class="product-item"\r
                  (click)="agregarRepuesto(producto)">\r
                  <div class="product-info">\r
                    <div class="product-header">\r
                      <span class="product-code">{{ producto.codigo }}</span>\r
                      <span class="product-price">{{ producto.precio_neto | currency:'EUR':'symbol':'1.2-2' }}</span>\r
                    </div>\r
                    <span class="product-name">{{ producto.nombre }}</span>\r
                    <div class="product-details">\r
                      <span class="product-stock">Stock: {{ producto.cantidad_disponible }} {{ producto.unidad }}</span>\r
                      <span class="product-description">{{ producto.descripcion }}</span>\r
                    </div>\r
                  </div>\r
                  <ion-icon name="add-circle-outline" class="add-icon"></ion-icon>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Lista de repuestos seleccionados -->\r
            <div class="repuestos-list" *ngIf="repuestosSeleccionados.length > 0">\r
              <h4>Repuestos Seleccionados:</h4>\r
              <div class="repuesto-item" *ngFor="let repuesto of repuestosSeleccionados">\r
                <div class="repuesto-info">\r
                  <span class="repuesto-nombre">{{ repuesto.nombre }}</span>\r
                  <div class="repuesto-cantidad">\r
                    <label>Cantidad:</label>\r
                    <input \r
                      type="number" \r
                      [value]="repuesto.cantidad"\r
                      [min]="1"\r
                      (change)="actualizarCantidadRepuesto(repuesto, $any($event.target).value)"\r
                      class="cantidad-input">\r
                    <span class="unidad">{{ repuesto.unidad }}</span>\r
                  </div>\r
                  <span class="repuesto-precio">{{ repuesto.precio_pvp | currency:'EUR':'symbol':'1.2-2' }}</span>\r
                </div>\r
                <button type="button" class="btn-remove" (click)="eliminarRepuesto(repuesto)">\r
                  <ion-icon name="trash-outline"></ion-icon>\r
                </button>\r
              </div>\r
            </div>\r
\r
            <!-- Estado vac\xEDo -->\r
            <div class="repuestos-empty" *ngIf="repuestosSeleccionados.length === 0 && !mostrarSelectorRepuestos">\r
              <ion-icon name="cube-outline"></ion-icon>\r
              <p>No hay repuestos seleccionados</p>\r
              <small>Selecciona repuestos del inventario o agrega manualmente</small>\r
            </div>\r
          </div>\r
\r
          <!-- Estado de Cierre -->\r
          <div class="form-section">\r
            <h3>Estado de Cierre</h3>\r
            <div class="estados-grid">\r
              <div *ngFor="let estado of estadosCierre" class="estado-option"\r
                [class.selected]="albaranForm.get('estado_cierre')?.value === estado.valor"\r
                (click)="albaranForm.patchValue({estado_cierre: estado.valor})">\r
                <div class="estado-content">\r
                  <h4>{{ estado.label }}</h4>\r
                  <p>{{ estado.descripcion }}</p>\r
                </div>\r
                <ion-icon name="checkmark-circle-outline"\r
                  *ngIf="albaranForm.get('estado_cierre')?.value === estado.valor"></ion-icon>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- Presupuesto Necesario (solo si es Presupuesto pendiente) -->\r
          <div class="form-section" *ngIf="requierePresupuesto()">\r
            <h3>Presupuesto Necesario</h3>\r
            <div class="form-group">\r
              <ion-input type="number" formControlName="presupuesto_necesario" placeholder="0.00" step="0.01">\r
              </ion-input>\r
            </div>\r
          </div>\r
\r
          <!-- Observaciones -->\r
          <div class="form-section">\r
            <h3>Observaciones Adicionales</h3>\r
            <div class="form-group">\r
              <ion-textarea formControlName="observaciones" placeholder="Observaciones adicionales..." rows="2">\r
              </ion-textarea>\r
            </div>\r
          </div>\r
\r
          <!-- Identificaci\xF3n y Firma -->\r
          <div class="form-section">\r
            <h3>Identificaci\xF3n y Firma</h3>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <ion-label>DNI</ion-label>\r
                <ion-input type="text" formControlName="dni_cliente" placeholder="DNI del cliente">\r
                </ion-input>\r
              </div>\r
\r
              <div class="form-group">\r
                <ion-label>NOMBRE FIRMA</ion-label>\r
                <ion-input type="text" formControlName="nombre_firma" placeholder="Nombre de la persona que firma">\r
                </ion-input>\r
              </div>\r
            </div>\r
\r
            <div class="form-group">\r
              <ion-label>FIRMA</ion-label>\r
              <div class="signature-area">\r
                                 <!-- Canvas de firma -->\r
                 <div class="signature-canvas-container" *ngIf="!firmaCapturada">\r
                   <canvas #signaturePad class="signature-canvas"></canvas>\r
                   <div class="signature-controls">\r
                     <button type="button" class="btn-clear" (click)="limpiarFirma()">\r
                       <ion-icon name="trash-outline"></ion-icon>\r
                       Limpiar\r
                     </button>\r
                     <button type="button" class="btn-save" (click)="guardarFirma()">\r
                       <ion-icon name="checkmark-outline"></ion-icon>\r
                       Guardar Firma\r
                     </button>\r
                   </div>\r
                 </div>\r
                \r
                <!-- Vista previa de la firma -->\r
                <div class="signature-preview" *ngIf="firmaCapturada">\r
                  <img [src]="firmaDataUrl" alt="Firma del cliente" class="firma-image">\r
                  <div class="signature-actions">\r
                    <button type="button" class="btn-edit" (click)="editarFirma()">\r
                      <ion-icon name="create-outline"></ion-icon>\r
                      Editar\r
                    </button>\r
                    <button type="button" class="btn-remove" (click)="eliminarFirma()">\r
                      <ion-icon name="trash-outline"></ion-icon>\r
                      Eliminar\r
                    </button>\r
                  </div>\r
                </div>\r
                \r
                <!-- Placeholder cuando no hay firma -->\r
                <div class="signature-placeholder" *ngIf="!firmaCapturada && !mostrarCanvas">\r
                  <span>\xC1rea de firma digital</span>\r
                  <small>Haz clic para comenzar a firmar</small>\r
                  <button type="button" class="btn-start-signature" (click)="iniciarFirma()">\r
                    <ion-icon name="create-outline"></ion-icon>\r
                    Comenzar Firma\r
                  </button>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
\r
        </div>\r
\r
        <!-- COLUMNA DERECHA: Gesti\xF3n de repuestos -->\r
        <div class="form-sidebar">\r
\r
          <!-- Secci\xF3n de Repuestos -->\r
          <div class="form-section repuestos-section desktop-only">\r
            <h3>Repuestos Utilizados</h3>\r
\r
            <!-- Botones de acci\xF3n -->\r
            <div class="repuestos-actions">\r
              <button type="button" class="btn-select-inventory" (click)="abrirSelectorRepuestos()">\r
                <ion-icon name="cube-outline"></ion-icon>\r
                Seleccionar del Inventario\r
              </button>\r
            </div>\r
\r
            <!-- Selector de repuestos del inventario -->\r
            <div *ngIf="mostrarSelectorRepuestos" class="inventory-selector">\r
              <div class="selector-header">\r
                <h4>Seleccionar Repuestos</h4>\r
                <button type="button" class="btn-close" (click)="cerrarSelectorRepuestos()">\r
                  <ion-icon name="close"></ion-icon>\r
                </button>\r
              </div>\r
\r
              <div class="search-container">\r
                <ion-input type="text" [(ngModel)]="busquedaRepuesto" (ionInput)="filtrarProductos($event)"\r
                  placeholder="Buscar repuestos..." class="search-input">\r
                </ion-input>\r
                <ion-icon name="search-outline"></ion-icon>\r
              </div>\r
\r
              <div class="products-list">\r
                <div *ngFor="let producto of productosFiltrados" class="product-item"\r
                  (click)="agregarRepuesto(producto)">\r
                  <div class="product-info">\r
                    <div class="product-header">\r
                      <span class="product-code">{{ producto.codigo }}</span>\r
                      <span class="product-price">{{ producto.precio_neto | currency:'EUR':'symbol':'1.2-2' }}</span>\r
                    </div>\r
                    <span class="product-name">{{ producto.nombre }}</span>\r
                    <div class="product-details">\r
                      <span class="product-stock">Stock: {{ producto.cantidad_disponible }} {{ producto.unidad }}</span>\r
                      <span class="product-description">{{ producto.descripcion }}</span>\r
                    </div>\r
                  </div>\r
                  <ion-icon name="add-circle-outline" class="add-icon"></ion-icon>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Lista de repuestos seleccionados -->\r
            <div class="repuestos-list" *ngIf="repuestosSeleccionados.length > 0">\r
              <h4>Repuestos Seleccionados:</h4>\r
              <div class="repuesto-item" *ngFor="let repuesto of repuestosSeleccionados">\r
                <div class="repuesto-info">\r
                  <span class="repuesto-nombre">{{ repuesto.nombre }}</span>\r
                  <div class="repuesto-cantidad">\r
                    <label>Cantidad:</label>\r
                    <input \r
                      type="number" \r
                      [value]="repuesto.cantidad"\r
                      [min]="1"\r
                      (change)="actualizarCantidadRepuesto(repuesto, $any($event.target).value)"\r
                      class="cantidad-input">\r
                    <span class="unidad">{{ repuesto.unidad }}</span>\r
                  </div>\r
                  <span class="repuesto-precio">{{ repuesto.precio_pvp | currency:'EUR':'symbol':'1.2-2' }}</span>\r
                </div>\r
                <button type="button" class="btn-remove" (click)="eliminarRepuesto(repuesto)">\r
                  <ion-icon name="trash-outline"></ion-icon>\r
                </button>\r
              </div>\r
            </div>\r
\r
            <!-- Estado vac\xEDo -->\r
            <div class="repuestos-empty" *ngIf="repuestosSeleccionados.length === 0 && !mostrarSelectorRepuestos">\r
              <ion-icon name="cube-outline"></ion-icon>\r
              <p>No hay repuestos seleccionados</p>\r
              <small>Selecciona repuestos del inventario o agrega manualmente</small>\r
            </div>\r
          </div>\r
\r
        </div>\r
\r
      </div>\r
\r
      <!-- Mensaje de error -->\r
      <div *ngIf="error" class="error-message">\r
        <ion-icon name="warning-outline"></ion-icon>\r
        <span>{{ error }}</span>\r
      </div>\r
\r
      <!-- Botones de acci\xF3n -->\r
      <div class="form-actions">\r
        <ion-button type="button" fill="outline" (click)="cancelar()">\r
          Cancelar\r
        </ion-button>\r
\r
        <ion-button type="submit" [disabled]="!albaranForm.valid || loading">\r
          <ion-icon name="save-outline" *ngIf="!loading"></ion-icon>\r
          <ion-icon name="refresh-outline" class="spinning" *ngIf="loading"></ion-icon>\r
          {{ loading ? 'Guardando...' : 'Guardar Albar\xE1n' }}\r
        </ion-button>\r
      </div>\r
\r
    </form>\r
  </div>\r
</ion-content>`, styles: ["/* src/app/modules/avisos/components/hacer-albaran/hacer-albaran.component.scss */\nion-header ion-toolbar {\n  --background: #fff;\n  --border-color: #e5e7eb;\n  --color: #111827;\n}\nion-header ion-toolbar ion-title {\n  font-size: 20px;\n  font-weight: 600;\n  color: #111827;\n}\nion-header ion-toolbar ion-button {\n  --color: #6b7280;\n}\nion-header ion-toolbar ion-button:hover {\n  --color: #111827;\n}\n.albaran-container {\n  padding: 24px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: #fff;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  gap: 20px;\n  overflow-y: auto;\n  padding-right: 4px;\n}\nform::-webkit-scrollbar {\n  width: 6px;\n}\nform::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 3px;\n}\nform::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 3px;\n}\nform::-webkit-scrollbar-thumb:hover {\n  background: #a8a8a8;\n}\n.form-layout {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 24px;\n  flex: 1;\n}\n@media (min-width: 1200px) {\n  .form-layout {\n    grid-template-columns: 2fr 1fr;\n    gap: 32px;\n  }\n}\n.form-main {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  order: 1;\n}\n.form-sidebar {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  order: 2;\n}\n.form-section {\n  background: #fff;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  flex-shrink: 0;\n}\n.form-section h3 {\n  margin: 0 0 20px 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #1F2937;\n  border-bottom: 2px solid #4F46E5;\n  padding-bottom: 8px;\n}\n.repuestos-section {\n  position: sticky;\n  top: 20px;\n}\n.repuestos-section h3 {\n  border-bottom-color: #10B981;\n}\n@media (max-width: 1199px) {\n  .repuestos-section {\n    position: static;\n    top: auto;\n  }\n}\n.form-row {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n}\n@media (min-width: 1200px) {\n  .form-row {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 24px;\n  }\n}\n.form-group {\n  position: relative;\n  margin-bottom: 20px;\n}\n.form-group ion-label {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 8px;\n  text-transform: none;\n  letter-spacing: normal;\n}\n.form-group ion-input,\n.form-group ion-textarea,\n.form-group ion-select {\n  --background: #FAFAFB;\n  --border-radius: 6px;\n  --border-width: 1px;\n  --border-color: transparent;\n  --padding-start: 12px;\n  --padding-end: 12px;\n  --padding-top: 10px;\n  --padding-bottom: 10px;\n  --color: #111827;\n  --placeholder-color: #9CA3AF;\n  font-size: 14px;\n  transition: border-color 0.2s;\n}\n.form-group ion-input:focus-within,\n.form-group ion-textarea:focus-within,\n.form-group ion-select:focus-within {\n  --border-color: #2563eb;\n  --background: #fff;\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);\n}\n.form-group ion-textarea {\n  --min-height: 80px;\n  resize: vertical;\n}\n.help-text {\n  display: block;\n  font-size: 11px;\n  color: #6B7280;\n  margin-top: 4px;\n  font-style: italic;\n  line-height: 1.4;\n}\n.btn-now {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 12px;\n  background: #2563eb;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  margin-top: 8px;\n  transition: all 0.2s ease;\n}\n.btn-now:hover {\n  background: #1d4ed8;\n}\n.btn-now ion-icon {\n  font-size: 14px;\n}\n.estados-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n@media (min-width: 1200px) {\n  .estados-grid {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 20px;\n  }\n}\n.estado-option {\n  border: 2px solid #E5E7EB;\n  border-radius: 8px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n  background: #fff;\n}\n.estado-option:hover {\n  border-color: #2563eb;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.estado-option.selected {\n  border-color: #2563eb;\n  background: #EFF6FF;\n}\n.estado-option.selected ion-icon {\n  color: #2563eb;\n}\n.estado-option .estado-content h4 {\n  margin: 0 0 8px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #111827;\n}\n.estado-option .estado-content p {\n  margin: 0;\n  font-size: 13px;\n  color: #6B7280;\n  line-height: 1.4;\n}\n.estado-option ion-icon {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  font-size: 20px;\n  color: #9CA3AF;\n}\n.signature-area {\n  border: 2px dashed #D1D5DB;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n  background: #F9FAFB;\n  transition: all 0.2s ease;\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.signature-area:hover {\n  border-color: #2563eb;\n  background: #EFF6FF;\n}\n.signature-area .signature-canvas-container {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.signature-area .signature-canvas-container .signature-canvas {\n  border: 1px solid #E5E7EB;\n  border-radius: 6px;\n  background: #fff;\n  cursor: crosshair;\n  touch-action: none;\n}\n.signature-area .signature-canvas-container .signature-controls {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n.signature-area .signature-canvas-container .signature-controls button {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.signature-area .signature-canvas-container .signature-controls button ion-icon {\n  font-size: 14px;\n}\n.signature-area .signature-canvas-container .signature-controls .btn-clear {\n  background: #FEE2E2;\n  color: #DC2626;\n}\n.signature-area .signature-canvas-container .signature-controls .btn-clear:hover {\n  background: #FECACA;\n}\n.signature-area .signature-canvas-container .signature-controls .btn-save {\n  background: #10B981;\n  color: white;\n}\n.signature-area .signature-canvas-container .signature-controls .btn-save:hover {\n  background: #059669;\n}\n.signature-area .signature-preview {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.signature-area .signature-preview .firma-image {\n  max-width: 100%;\n  max-height: 120px;\n  border: 1px solid #E5E7EB;\n  border-radius: 6px;\n  background: #fff;\n}\n.signature-area .signature-preview .signature-actions {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n.signature-area .signature-preview .signature-actions button {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.signature-area .signature-preview .signature-actions button ion-icon {\n  font-size: 14px;\n}\n.signature-area .signature-preview .signature-actions .btn-edit {\n  background: #DBEAFE;\n  color: #1D4ED8;\n}\n.signature-area .signature-preview .signature-actions .btn-edit:hover {\n  background: #BFDBFE;\n}\n.signature-area .signature-preview .signature-actions .btn-remove {\n  background: #FEE2E2;\n  color: #DC2626;\n}\n.signature-area .signature-preview .signature-actions .btn-remove:hover {\n  background: #FECACA;\n}\n.signature-area .signature-placeholder {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  color: #6B7280;\n  margin-top: 15px;\n}\n.signature-area .signature-placeholder ion-icon {\n  font-size: 48px;\n  color: #9CA3AF;\n}\n.signature-area .signature-placeholder span {\n  font-size: 16px;\n  font-weight: 500;\n}\n.signature-area .signature-placeholder small {\n  font-size: 12px;\n  color: #9CA3AF;\n}\n.signature-area .signature-placeholder .btn-start-signature {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 20px;\n  background: #2563eb;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-top: 8px;\n}\n.signature-area .signature-placeholder .btn-start-signature:hover {\n  background: #1d4ed8;\n}\n.signature-area .signature-placeholder .btn-start-signature ion-icon {\n  font-size: 16px;\n}\n.error-message {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  background: #FEF2F2;\n  border: 1px solid #FECACA;\n  border-radius: 6px;\n  color: #DC2626;\n  margin-bottom: 20px;\n  font-size: 14px;\n}\n.error-message ion-icon {\n  font-size: 18px;\n  color: #DC2626;\n  flex-shrink: 0;\n}\n.error-message span {\n  font-size: 14px;\n  font-weight: 500;\n}\n.form-actions {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: auto;\n  padding-top: 24px;\n  border-top: 1px solid #E5E7EB;\n  flex-shrink: 0;\n  background: #fff;\n  position: sticky;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 10;\n}\n.form-actions ion-button {\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  font-weight: 500;\n  font-size: 14px;\n  min-width: 140px;\n  border-radius: 6px;\n  transition: all 0.2s;\n}\n.form-actions ion-button[fill=outline] {\n  --border-color: #d1d5db;\n  --color: #374151;\n}\n.form-actions ion-button[fill=outline]:hover {\n  --background: #f8fafc;\n  --border-color: #9ca3af;\n}\n.form-actions ion-button[type=submit] {\n  --background: #2563eb;\n  --border-color: #2563eb;\n  --color: #fff;\n}\n.form-actions ion-button[type=submit]:hover {\n  --background: #1d4ed8;\n  --border-color: #1d4ed8;\n}\n.repuestos-actions {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.repuestos-actions button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 10px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  width: 100%;\n}\n.repuestos-actions button ion-icon {\n  font-size: 16px;\n}\n.repuestos-actions .btn-select-inventory {\n  background: #2563eb;\n  color: white;\n}\n.repuestos-actions .btn-select-inventory:hover {\n  background: #1d4ed8;\n}\n.repuestos-actions .btn-add-manual {\n  background: #10B981;\n  color: white;\n}\n.repuestos-actions .btn-add-manual:hover {\n  background: #059669;\n}\n.repuestos-empty {\n  text-align: center;\n  padding: 40px 20px;\n  color: #9CA3AF;\n}\n.repuestos-empty ion-icon {\n  font-size: 48px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.repuestos-empty p {\n  margin: 0 0 8px 0;\n  font-size: 16px;\n  font-weight: 500;\n  color: #6B7280;\n}\n.repuestos-empty small {\n  font-size: 13px;\n  color: #9CA3AF;\n  line-height: 1.4;\n}\n.inventory-selector {\n  background: #fff;\n  border: 1px solid #E2E8F0;\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  max-height: 400px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.inventory-selector .selector-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.inventory-selector .selector-header h4 {\n  margin: 0;\n  color: #1F2937;\n  font-size: 16px;\n  font-weight: 600;\n}\n.inventory-selector .selector-header .btn-close {\n  background: none;\n  border: none;\n  color: #6B7280;\n  font-size: 20px;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.inventory-selector .selector-header .btn-close:hover {\n  background: #F3F4F6;\n  color: #374151;\n}\n.inventory-selector .search-container {\n  position: relative;\n  margin-bottom: 16px;\n}\n.inventory-selector .search-container .search-input {\n  --background: #FAFAFB;\n  --border-radius: 6px;\n  --border-width: 1px;\n  --border-color: transparent;\n  --padding-start: 40px 12px 12px;\n  --padding-end: 12px;\n  --padding-top: 10px;\n  --padding-bottom: 10px;\n  --color: #111827;\n  --placeholder-color: #9CA3AF;\n  font-size: 14px;\n  transition: border-color 0.2s;\n}\n.inventory-selector .search-container .search-input:focus-within {\n  --border-color: #2563eb;\n  --background: #fff;\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);\n}\n.inventory-selector .search-container ion-icon {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9CA3AF;\n  font-size: 18px;\n}\n.inventory-selector .products-list {\n  flex: 1;\n  max-height: 250px;\n  overflow-y: auto;\n  border: 1px solid #E5E7EB;\n  border-radius: 6px;\n  background: #F9FAFB;\n}\n.inventory-selector .products-list .product-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px;\n  border-bottom: 1px solid #E5E7EB;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.inventory-selector .products-list .product-item:last-child {\n  border-bottom: none;\n}\n.inventory-selector .products-list .product-item:hover {\n  background: #F3F4F6;\n}\n.inventory-selector .products-list .product-item .product-info {\n  flex: 1;\n}\n.inventory-selector .products-list .product-item .product-info .product-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 4px;\n}\n.inventory-selector .products-list .product-item .product-info .product-header .product-code {\n  font-size: 11px;\n  color: #6B7280;\n  background: #E5E7EB;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-weight: 500;\n}\n.inventory-selector .products-list .product-item .product-info .product-header .product-price {\n  font-weight: 600;\n  color: #059669;\n  font-size: 13px;\n}\n.inventory-selector .products-list .product-item .product-info .product-name {\n  font-weight: 600;\n  color: #1F2937;\n  font-size: 13px;\n  margin-bottom: 4px;\n  display: block;\n}\n.inventory-selector .products-list .product-item .product-info .product-details {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.inventory-selector .products-list .product-item .product-info .product-details .product-stock {\n  font-size: 11px;\n  color: #6B7280;\n}\n.inventory-selector .products-list .product-item .product-info .product-details .product-description {\n  font-size: 11px;\n  color: #9CA3AF;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.inventory-selector .products-list .product-item .add-icon {\n  color: #3B82F6;\n  font-size: 18px;\n  margin-left: 8px;\n}\n.repuestos-list {\n  margin-top: 20px;\n}\n.repuestos-list h4 {\n  margin: 0 0 16px 0;\n  color: #1F2937;\n  font-size: 16px;\n  font-weight: 600;\n}\n.repuestos-list .repuesto-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n  background: #F0F9FF;\n  border: 1px solid #BAE6FD;\n  border-radius: 6px;\n  margin-bottom: 8px;\n}\n.repuestos-list .repuesto-item .repuesto-info {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.repuestos-list .repuesto-item .repuesto-info .repuesto-nombre {\n  font-weight: 500;\n  color: #0369A1;\n  font-size: 14px;\n  min-width: 120px;\n}\n.repuestos-list .repuesto-item .repuesto-info .repuesto-cantidad {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.repuestos-list .repuesto-item .repuesto-info .repuesto-cantidad label {\n  font-size: 12px;\n  color: #6B7280;\n  font-weight: 500;\n}\n.repuestos-list .repuesto-item .repuesto-info .repuesto-cantidad .cantidad-input {\n  width: 60px;\n  padding: 4px 8px;\n  border: 1px solid #D1D5DB;\n  border-radius: 4px;\n  font-size: 12px;\n  text-align: center;\n}\n.repuestos-list .repuesto-item .repuesto-info .repuesto-cantidad .unidad {\n  font-size: 11px;\n  color: #6B7280;\n  font-weight: 500;\n}\n.repuestos-list .repuesto-item .repuesto-info .repuesto-precio {\n  font-weight: 600;\n  color: #059669;\n  font-size: 13px;\n  min-width: 80px;\n  text-align: right;\n}\n.repuestos-list .repuesto-item .btn-remove {\n  background: #FEE2E2;\n  color: #DC2626;\n  border: none;\n  padding: 6px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.repuestos-list .repuesto-item .btn-remove:hover {\n  background: #FECACA;\n}\n.repuestos-list .repuesto-item .btn-remove ion-icon {\n  font-size: 14px;\n}\n.spinning {\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\nion-button[type=submit][disabled] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\nion-button[type=submit] ion-icon.spinning {\n  margin-right: 8px;\n}\n.mobile-only {\n  display: block;\n}\n.desktop-only {\n  display: none;\n}\n@media (min-width: 1200px) {\n  .mobile-only {\n    display: none;\n  }\n  .desktop-only {\n    display: block;\n  }\n}\n@media (max-width: 768px) {\n  .albaran-container {\n    padding: 16px;\n  }\n  .form-main {\n    order: 1;\n  }\n  .form-sidebar {\n    order: 2;\n  }\n  .form-section {\n    padding: 20px;\n    margin-bottom: 20px;\n  }\n  .form-section h3 {\n    font-size: 16px;\n    margin-bottom: 16px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n  .estados-grid {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n  .estado-option {\n    padding: 16px;\n  }\n  .estado-option .estado-content h4 {\n    font-size: 15px;\n  }\n  .estado-option .estado-content p {\n    font-size: 12px;\n  }\n  .estado-option ion-icon {\n    font-size: 18px;\n    top: 12px;\n    right: 12px;\n  }\n  .repuestos-actions {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .repuestos-actions button {\n    width: 100%;\n    justify-content: center;\n  }\n  .form-actions {\n    gap: 12px;\n  }\n  .form-actions ion-button {\n    width: 100%;\n    justify-content: center;\n  }\n  .signature-area {\n    padding: 30px;\n  }\n  .signature-area .signature-placeholder ion-icon {\n    font-size: 36px;\n  }\n  .signature-area .signature-placeholder span {\n    font-size: 14px;\n  }\n  .signature-area .signature-placeholder small {\n    font-size: 11px;\n  }\n}\n@media (min-width: 769px) and (max-width: 1199px) {\n  .albaran-container {\n    padding: 24px;\n  }\n  .form-main {\n    order: 1;\n  }\n  .form-sidebar {\n    order: 2;\n  }\n  .form-row {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n  }\n  .estados-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 16px;\n  }\n  .repuestos-actions {\n    flex-direction: row;\n    gap: 12px;\n  }\n  .repuestos-actions button {\n    flex: 1;\n    min-width: 0;\n  }\n}\n@media (min-width: 1200px) {\n  .albaran-container {\n    padding: 32px;\n  }\n  .form-main {\n    order: 1;\n  }\n  .form-sidebar {\n    order: 2;\n  }\n  .form-section {\n    padding: 28px;\n  }\n  .form-row {\n    gap: 28px;\n  }\n  .estados-grid {\n    gap: 24px;\n  }\n  .repuestos-actions {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .repuestos-actions button {\n    padding: 14px 20px;\n    font-size: 15px;\n  }\n  .form-actions {\n    gap: 20px;\n  }\n  .form-actions ion-button {\n    min-width: 160px;\n    --padding-start: 28px;\n    --padding-end: 28px;\n    --padding-top: 14px;\n    --padding-bottom: 14px;\n    font-size: 15px;\n  }\n}\n@media (max-width: 480px) {\n  .albaran-container {\n    padding: 12px;\n  }\n  .form-main {\n    order: 1;\n  }\n  .form-sidebar {\n    order: 2;\n  }\n  .form-section {\n    padding: 16px;\n    margin-bottom: 16px;\n  }\n  .form-section h3 {\n    font-size: 15px;\n    margin-bottom: 12px;\n  }\n  .form-group {\n    margin-bottom: 16px;\n  }\n  .form-group ion-label {\n    font-size: 13px;\n    margin-bottom: 6px;\n  }\n  .estado-option {\n    padding: 12px;\n  }\n  .estado-option .estado-content h4 {\n    font-size: 14px;\n  }\n  .estado-option .estado-content p {\n    font-size: 11px;\n  }\n  .estado-option ion-icon {\n    font-size: 16px;\n    top: 8px;\n    right: 8px;\n  }\n  .signature-area {\n    padding: 15px 0px;\n    border-color: #2563eb;\n    background: #EFF6FF;\n    display: flex;\n    flex-direction: column;\n  }\n  .signature-area .signature-placeholder ion-icon {\n    font-size: 32px;\n  }\n  .signature-area .signature-placeholder span {\n    font-size: 13px;\n  }\n  .signature-area .signature-placeholder small {\n    font-size: 10px;\n  }\n  .help-text {\n    font-size: 10px;\n  }\n  .btn-now {\n    padding: 4px 8px;\n    font-size: 11px;\n  }\n  .btn-now ion-icon {\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=hacer-albaran.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ModalController }, { type: InventarioService }, { type: AlbaranesService }, { type: TrabajosService }, { type: AvisosService }], { trabajo: [{
    type: Input
  }], aviso: [{
    type: Input
  }], signaturePadElement: [{
    type: ViewChild,
    args: ["signaturePad"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HacerAlbaranComponent, { className: "HacerAlbaranComponent", filePath: "src/app/modules/avisos/components/hacer-albaran/hacer-albaran.component.ts", lineNumber: 72 });
})();

// src/app/shared/components/flujo-estado/flujo-estado.component.ts
function FlujoEstadoComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "ion-icon", 5);
    \u0275\u0275elementStart(2, "span", 6);
    \u0275\u0275text(3, "Cargando estado del flujo...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 7);
    \u0275\u0275text(5, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function FlujoEstadoComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "ion-icon", 9);
    \u0275\u0275elementStart(2, "span", 10);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 11);
    \u0275\u0275listener("click", function FlujoEstadoComponent_div_2_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.recargar());
    });
    \u0275\u0275element(5, "ion-icon", 12);
    \u0275\u0275elementStart(6, "span", 6);
    \u0275\u0275text(7, "Reintentar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 7);
    \u0275\u0275text(9, "Reintentar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function FlujoEstadoComponent_div_3_div_9_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function FlujoEstadoComponent_div_3_div_9_button_4_Template_button_click_0_listener() {
      const accion_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.ejecutarAccion(accion_r5));
    });
    \u0275\u0275element(1, "ion-icon", 17);
    \u0275\u0275elementStart(2, "span", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const accion_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.loading)("title", ctx_r1.getAccionTexto(accion_r5));
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.getAccionIcon(accion_r5));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getAccionTexto(accion_r5));
  }
}
function FlujoEstadoComponent_div_3_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "h4", 23);
    \u0275\u0275text(2, "Acciones disponibles:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 24);
    \u0275\u0275template(4, FlujoEstadoComponent_div_3_div_9_button_4_Template, 4, 4, "button", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.accionesDisponibles);
  }
}
function FlujoEstadoComponent_div_3_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275element(1, "ion-icon", 31);
    \u0275\u0275elementStart(2, "span", 32);
    \u0275\u0275text(3, "No hay acciones pendientes");
    \u0275\u0275elementEnd()();
  }
}
function FlujoEstadoComponent_div_3_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275template(1, FlujoEstadoComponent_div_3_div_10_div_1_Template, 4, 0, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.accionesDisponibles.length === 0 && !ctx_r1.estadoFlujo.puedeCrearPresupuesto);
  }
}
function FlujoEstadoComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "div", 15)(3, "div", 16);
    \u0275\u0275element(4, "ion-icon", 17);
    \u0275\u0275elementStart(5, "span", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 19);
    \u0275\u0275listener("click", function FlujoEstadoComponent_div_3_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.recargar());
    });
    \u0275\u0275element(8, "ion-icon", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(9, FlujoEstadoComponent_div_3_div_9_Template, 5, 1, "div", 20)(10, FlujoEstadoComponent_div_3_div_10_Template, 2, 1, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.getEstadoClass());
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.getEstadoIcon());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.estadoFlujo.estadoActual);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.accionesDisponibles.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.estadoFlujo.estadoActual === "No visitado" || ctx_r1.estadoFlujo.estadoActual === "Visitado pendiente");
  }
}
var _FlujoEstadoComponent = class _FlujoEstadoComponent {
  constructor(flujoService) {
    this.flujoService = flujoService;
    this.accionEjecutada = new EventEmitter();
    this.estadoFlujo = null;
    this.accionesDisponibles = [];
    this.loading = false;
    this.error = null;
    this.destroy$ = new Subject();
    addIcons({
      documentTextOutline,
      checkmarkCircleOutline,
      timeOutline,
      receiptOutline,
      createOutline,
      eyeOutline,
      arrowForwardOutline,
      warningOutline,
      refreshOutline
    });
  }
  ngOnInit() {
    if (this.avisoId) {
      this.cargarEstadoFlujo();
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Carga el estado actual del flujo
   */
  cargarEstadoFlujo() {
    this.loading = true;
    this.error = null;
    this.flujoService.obtenerEstadoFlujo(this.avisoId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (estado) => {
        this.estadoFlujo = estado;
        this.cargarAccionesDisponibles();
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar estado del flujo:", error);
        this.error = "Error al cargar el estado del flujo";
        this.loading = false;
      }
    });
  }
  /**
   * Carga las acciones disponibles
   */
  cargarAccionesDisponibles() {
    this.flujoService.obtenerAccionesDisponibles(this.avisoId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (acciones) => {
        this.accionesDisponibles = acciones;
      },
      error: (error) => {
        console.error("Error al cargar acciones:", error);
      }
    });
  }
  /**
   * Ejecuta una acción del flujo
   */
  ejecutarAccion(accion) {
    var _a, _b, _c, _d, _e, _f;
    this.loading = true;
    this.error = null;
    let accionObservable;
    switch (accion) {
      case "crear_presupuesto":
        accionObservable = this.flujoService.ejecutarFlujoCompleto(this.avisoId, true);
        break;
      case "aprobar_presupuesto":
        const presupuestoId = (_c = (_b = (_a = this.estadoFlujo) == null ? void 0 : _a.resumen) == null ? void 0 : _b.presupuesto) == null ? void 0 : _c.id;
        if (presupuestoId) {
          accionObservable = this.flujoService.aprobarPresupuesto(presupuestoId);
        }
        break;
      case "facturar_presupuesto":
        const presupuestoIdFacturar = (_f = (_e = (_d = this.estadoFlujo) == null ? void 0 : _d.resumen) == null ? void 0 : _e.presupuesto) == null ? void 0 : _f.id;
        if (presupuestoIdFacturar) {
          accionObservable = this.flujoService.facturarPresupuesto(presupuestoIdFacturar);
        }
        break;
      case "facturar_trabajos":
        accionObservable = this.flujoService.facturarTrabajos(this.avisoId);
        break;
      case "completar_aviso":
        this.completarAviso();
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
          this.cargarEstadoFlujo();
          this.loading = false;
        },
        error: (error) => {
          console.error("Error al ejecutar acci\xF3n:", error);
          this.error = `Error al ejecutar ${accion}: ${error.message}`;
          this.loading = false;
        }
      });
    }
  }
  /**
   * Inicia flujo directo sin presupuesto
   */
  iniciarFlujoDirecto() {
    this.loading = true;
    this.flujoService.ejecutarFlujoCompleto(this.avisoId, false).pipe(takeUntil(this.destroy$)).subscribe({
      next: (resultado) => {
        console.log("Flujo directo iniciado:", resultado);
        this.accionEjecutada.emit(resultado);
        this.cargarEstadoFlujo();
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al iniciar flujo directo:", error);
        this.error = `Error al iniciar flujo directo: ${error.message}`;
        this.loading = false;
      }
    });
  }
  /**
   * Completa el aviso actual
   */
  completarAviso() {
    if (!this.avisoId) {
      console.error("No hay aviso seleccionado para completar");
      return;
    }
    console.log("\u{1F504} Completando aviso:", this.avisoId);
    this.loading = true;
    this.flujoService.completarAviso(this.avisoId).subscribe({
      next: (resultado) => {
        console.log("\u2705 Aviso completado exitosamente:", resultado);
        this.loading = false;
        this.mostrarMensaje("Aviso completado exitosamente", "success");
        this.cargarEstadoFlujo();
      },
      error: (error) => {
        console.error("\u274C Error al completar aviso:", error);
        this.loading = false;
        this.mostrarMensaje(error.message || "Error al completar el aviso. Verifica que haya trabajos realizados y facturas generadas.", "error");
      }
    });
  }
  /**
   * Muestra un mensaje al usuario
   */
  mostrarMensaje(mensaje, tipo = "info") {
    console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
  }
  /**
   * Obtiene el icono para el estado actual
   */
  getEstadoIcon() {
    if (!this.estadoFlujo)
      return "time-outline";
    switch (this.estadoFlujo.estadoActual) {
      case "No visitado":
        return "time-outline";
      case "Visitado pendiente":
        return "eye-outline";
      case "Pendiente de presupuesto":
        return "document-text-outline";
      case "En curso":
        return "create-outline";
      case "Completado":
        return "checkmark-circle-outline";
      default:
        return "time-outline";
    }
  }
  /**
   * Obtiene la clase CSS para el estado
   */
  getEstadoClass() {
    if (!this.estadoFlujo)
      return "pendiente";
    switch (this.estadoFlujo.estadoActual) {
      case "No visitado":
      case "Visitado pendiente":
        return "pendiente";
      case "Pendiente de presupuesto":
        return "presupuesto";
      case "En curso":
        return "en-curso";
      case "Completado":
        return "completado";
      default:
        return "pendiente";
    }
  }
  /**
   * Obtiene el texto descriptivo para una acción
   */
  getAccionTexto(accion) {
    switch (accion) {
      case "crear_presupuesto":
        return "Crear Presupuesto";
      case "aprobar_presupuesto":
        return "Aprobar Presupuesto";
      case "facturar_presupuesto":
        return "Generar Factura desde Presupuesto";
      case "facturar_trabajos":
        return "Facturar Trabajos Realizados";
      case "completar_aviso":
        return "Completar Aviso";
      default:
        return accion;
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
      case "completar_aviso":
        return "checkmark-circle-outline";
      default:
        return "arrow-forward-outline";
    }
  }
  /**
   * Recarga el estado del flujo
   */
  recargar() {
    this.cargarEstadoFlujo();
  }
};
_FlujoEstadoComponent.\u0275fac = function FlujoEstadoComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FlujoEstadoComponent)(\u0275\u0275directiveInject(FlujoAvisosService));
};
_FlujoEstadoComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FlujoEstadoComponent, selectors: [["app-flujo-estado"]], inputs: { avisoId: "avisoId" }, outputs: { accionEjecutada: "accionEjecutada" }, decls: 4, vars: 3, consts: [[1, "flujo-estado-container"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "flujo-content", 4, "ngIf"], [1, "loading-state"], ["name", "refresh-outline", 1, "spinning"], [1, "desktop-only"], [1, "mobile-only"], [1, "error-state"], ["name", "warning-outline"], [1, "error-text"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "flujo-content"], [1, "estado-actual"], [1, "estado-header"], [1, "estado-badge", 3, "ngClass"], [3, "name"], [1, "estado-text"], ["title", "Actualizar estado", 1, "btn-refresh", 3, "click"], ["class", "acciones-disponibles", 4, "ngIf"], ["class", "flujo-inicial", 4, "ngIf"], [1, "acciones-disponibles"], [1, "section-title"], [1, "acciones-grid"], ["class", "btn-accion", 3, "disabled", "title", "click", 4, "ngFor", "ngForOf"], [1, "btn-accion", 3, "click", "disabled", "title"], [1, "accion-text"], [1, "flujo-inicial"], ["class", "sin-acciones", 4, "ngIf"], [1, "sin-acciones"], ["name", "checkmark-circle-outline", 1, "complete-icon"], [1, "complete-text"]], template: function FlujoEstadoComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275template(1, FlujoEstadoComponent_div_1_Template, 6, 0, "div", 1)(2, FlujoEstadoComponent_div_2_Template, 10, 1, "div", 2)(3, FlujoEstadoComponent_div_3_Template, 11, 5, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.estadoFlujo && !ctx.loading && !ctx.error);
  }
}, dependencies: [CommonModule, NgClass, NgForOf, NgIf, IonIcon], styles: ["\n\n.flujo-estado-container[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid #E2E8F0;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.desktop-only[_ngcontent-%COMP%] {\n  display: inline;\n}\n.mobile-only[_ngcontent-%COMP%] {\n  display: none;\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 24px;\n  text-align: center;\n  color: #64748B;\n  font-size: 14px;\n}\n.loading-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #4F46E5;\n}\n.loading-state.error-state[_ngcontent-%COMP%], \n.error-state.error-state[_ngcontent-%COMP%] {\n  color: #DC2626;\n}\n.loading-state.error-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.error-state.error-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #DC2626;\n}\n.error-text[_ngcontent-%COMP%] {\n  word-break: break-word;\n  line-height: 1.4;\n}\n.btn-retry[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: #F1F5F9;\n  border: 1px solid #CBD5E1;\n  border-radius: 8px;\n  font-size: 12px;\n  color: #475569;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-retry[_ngcontent-%COMP%]:hover {\n  background: #E2E8F0;\n  border-color: #94A3B8;\n}\n.btn-retry[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.flujo-content[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.estado-actual[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  border-radius: 20px;\n  font-size: 14px;\n  font-weight: 500;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-badge.pendiente[_ngcontent-%COMP%] {\n  background: #FEF3C7;\n  color: #92400E;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-badge.pendiente[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #D97706;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-badge.presupuesto[_ngcontent-%COMP%] {\n  background: #DBEAFE;\n  color: #1E40AF;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-badge.presupuesto[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #3B82F6;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-badge.en-curso[_ngcontent-%COMP%] {\n  background: #DCFCE7;\n  color: #166534;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-badge.en-curso[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #22C55E;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-badge.completado[_ngcontent-%COMP%] {\n  background: #ECFDF5;\n  color: #14532D;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-badge.completado[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #10B981;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.estado-actual[_ngcontent-%COMP%]   .estado-text[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.estado-actual[_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  background: #F8FAFC;\n  border: 1px solid #E2E8F0;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.estado-actual[_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%]:hover {\n  background: #F1F5F9;\n  border-color: #CBD5E1;\n}\n.estado-actual[_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #64748B;\n}\n.resumen-info[_ngcontent-%COMP%] {\n  background: #F8FAFC;\n  border-radius: 8px;\n  padding: 16px;\n}\n.resumen-info[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 12px;\n}\n.resumen-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.resumen-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #64748B;\n  font-weight: 500;\n}\n.resumen-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #1E293B;\n  font-weight: 600;\n}\n.resumen-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .value.si[_ngcontent-%COMP%] {\n  color: #059669;\n}\n.resumen-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .value.no[_ngcontent-%COMP%] {\n  color: #DC2626;\n}\n.acciones-disponibles[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.acciones-disponibles[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-size: 16px;\n  color: #1E293B;\n  font-weight: 600;\n}\n.acciones-disponibles[_ngcontent-%COMP%]   .acciones-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 12px;\n}\n.acciones-disponibles[_ngcontent-%COMP%]   .btn-accion[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  background: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-align: left;\n}\n.acciones-disponibles[_ngcontent-%COMP%]   .btn-accion[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338CA;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(79, 70, 229, 0.3);\n}\n.acciones-disponibles[_ngcontent-%COMP%]   .btn-accion[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.acciones-disponibles[_ngcontent-%COMP%]   .btn-accion[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.acciones-disponibles[_ngcontent-%COMP%]   .btn-accion[_ngcontent-%COMP%]   .accion-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.flujo-inicial[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.flujo-inicial[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  font-size: 16px;\n  color: #1E293B;\n  font-weight: 600;\n}\n.flujo-inicial[_ngcontent-%COMP%]   .flujo-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px;\n  background: #F8FAFC;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  transition: all 0.2s ease;\n}\n.flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%]:hover {\n  background: #F0F9FF;\n  border-color: #4F46E5;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #4F46E5;\n  flex-shrink: 0;\n  background: #EEF2FF;\n  padding: 12px;\n  border-radius: 50%;\n}\n.flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%]   .step-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n.flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%]   .step-content[_ngcontent-%COMP%]   .step-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #1E293B;\n}\n.flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%]   .step-content[_ngcontent-%COMP%]   .step-description[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748B;\n  line-height: 1.4;\n}\n.sin-acciones[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 20px;\n  color: #64748B;\n  font-size: 14px;\n  text-align: center;\n}\n.sin-acciones[_ngcontent-%COMP%]   .complete-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #10B981;\n}\n.sin-acciones[_ngcontent-%COMP%]   .complete-text[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n@media (max-width: 768px) {\n  .desktop-only[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .mobile-only[_ngcontent-%COMP%] {\n    display: inline;\n  }\n  .flujo-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .estado-actual[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n  .estado-actual[_ngcontent-%COMP%]   .estado-header[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 12px;\n  }\n  .estado-actual[_ngcontent-%COMP%]   .estado-badge[_ngcontent-%COMP%] {\n    padding: 6px 12px;\n    font-size: 13px;\n  }\n  .estado-actual[_ngcontent-%COMP%]   .estado-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .estado-actual[_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%] {\n    width: 28px;\n    height: 28px;\n  }\n  .estado-actual[_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .resumen-info[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .resumen-info[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n  .resumen-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .resumen-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .acciones-disponibles[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n  .acciones-disponibles[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n    font-size: 15px;\n    margin-bottom: 10px;\n  }\n  .acciones-disponibles[_ngcontent-%COMP%]   .acciones-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n  .acciones-disponibles[_ngcontent-%COMP%]   .btn-accion[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    font-size: 13px;\n  }\n  .acciones-disponibles[_ngcontent-%COMP%]   .btn-accion[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n    font-size: 15px;\n    margin-bottom: 10px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .flujo-info[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%] {\n    padding: 16px;\n    gap: 12px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 24px;\n    padding: 10px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%]   .step-content[_ngcontent-%COMP%]   .step-title[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%]   .step-content[_ngcontent-%COMP%]   .step-description[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .sin-acciones[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .sin-acciones[_ngcontent-%COMP%]   .complete-icon[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .sin-acciones[_ngcontent-%COMP%]   .complete-text[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .loading-state[_ngcontent-%COMP%], \n   .error-state[_ngcontent-%COMP%] {\n    padding: 20px;\n    font-size: 13px;\n  }\n  .loading-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n   .error-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .btn-retry[_ngcontent-%COMP%] {\n    padding: 6px 12px;\n    font-size: 11px;\n  }\n  .btn-retry[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .flujo-content[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .estado-actual[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n  .estado-actual[_ngcontent-%COMP%]   .estado-header[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n  }\n  .estado-actual[_ngcontent-%COMP%]   .estado-badge[_ngcontent-%COMP%] {\n    justify-content: center;\n    padding: 4px 10px;\n    font-size: 12px;\n  }\n  .estado-actual[_ngcontent-%COMP%]   .estado-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .estado-actual[_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%] {\n    align-self: center;\n    width: 24px;\n    height: 24px;\n  }\n  .estado-actual[_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .resumen-info[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .resumen-info[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .resumen-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .resumen-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .acciones-disponibles[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n  .acciones-disponibles[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n    font-size: 14px;\n    margin-bottom: 8px;\n  }\n  .acciones-disponibles[_ngcontent-%COMP%]   .acciones-grid[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .acciones-disponibles[_ngcontent-%COMP%]   .btn-accion[_ngcontent-%COMP%] {\n    padding: 8px 10px;\n    font-size: 12px;\n  }\n  .acciones-disponibles[_ngcontent-%COMP%]   .btn-accion[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n    font-size: 14px;\n    margin-bottom: 8px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .flujo-info[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%] {\n    padding: 12px;\n    gap: 8px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 20px;\n    padding: 8px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%]   .step-content[_ngcontent-%COMP%]   .step-title[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .flujo-inicial[_ngcontent-%COMP%]   .flujo-step[_ngcontent-%COMP%]   .step-content[_ngcontent-%COMP%]   .step-description[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .sin-acciones[_ngcontent-%COMP%] {\n    padding: 12px;\n    gap: 8px;\n  }\n  .sin-acciones[_ngcontent-%COMP%]   .complete-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .sin-acciones[_ngcontent-%COMP%]   .complete-text[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .loading-state[_ngcontent-%COMP%], \n   .error-state[_ngcontent-%COMP%] {\n    padding: 16px;\n    font-size: 12px;\n    gap: 8px;\n  }\n  .loading-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n   .error-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .btn-retry[_ngcontent-%COMP%] {\n    padding: 4px 8px;\n    font-size: 10px;\n  }\n  .btn-retry[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n}\n/*# sourceMappingURL=flujo-estado.component.css.map */"] });
var FlujoEstadoComponent = _FlujoEstadoComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlujoEstadoComponent, [{
    type: Component,
    args: [{ selector: "app-flujo-estado", standalone: true, imports: [
      CommonModule,
      IonIcon
    ], template: `<div class="flujo-estado-container">\r
  <!-- Estado de carga -->\r
  <div *ngIf="loading" class="loading-state">\r
    <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
    <span class="desktop-only">Cargando estado del flujo...</span>\r
    <span class="mobile-only">Cargando...</span>\r
  </div>\r
\r
  <!-- Estado de error -->\r
  <div *ngIf="error && !loading" class="error-state">\r
    <ion-icon name="warning-outline"></ion-icon>\r
    <span class="error-text">{{ error }}</span>\r
    <button (click)="recargar()" class="btn-retry">\r
      <ion-icon name="refresh-outline"></ion-icon>\r
      <span class="desktop-only">Reintentar</span>\r
      <span class="mobile-only">Reintentar</span>\r
    </button>\r
  </div>\r
\r
  <!-- Estado del flujo normal -->\r
  <div *ngIf="estadoFlujo && !loading && !error" class="flujo-content">\r
    \r
    <!-- Estado actual -->\r
    <div class="estado-actual">\r
      <div class="estado-header">\r
        <div class="estado-badge" [ngClass]="getEstadoClass()">\r
          <ion-icon [name]="getEstadoIcon()"></ion-icon>\r
          <span class="estado-text">{{ estadoFlujo.estadoActual }}</span>\r
        </div>\r
        <button (click)="recargar()" class="btn-refresh" title="Actualizar estado">\r
          <ion-icon name="refresh-outline"></ion-icon>\r
        </button>\r
      </div>\r
      \r
      <!-- Informaci\xF3n del resumen -->\r
      <!-- <div class="resumen-info" *ngIf="estadoFlujo.resumen">\r
        <div class="info-grid">\r
          <div class="info-item" *ngIf="estadoFlujo.resumen.estadisticas">\r
            <span class="label">Trabajos completados:</span>\r
            <span class="value">{{ estadoFlujo.resumen.estadisticas.trabajosCompletados }}</span>\r
          </div>\r
          <div class="info-item" *ngIf="estadoFlujo.resumen.estadisticas">\r
            <span class="label">Tiene presupuesto:</span>\r
            <span class="value" [ngClass]="estadoFlujo.resumen.estadisticas.tienePresupuesto ? 'si' : 'no'">\r
              {{ estadoFlujo.resumen.estadisticas.tienePresupuesto ? 'S\xED' : 'No' }}\r
            </span>\r
          </div>\r
          <div class="info-item" *ngIf="estadoFlujo.resumen.estadisticas && estadoFlujo.resumen.estadisticas.tienePresupuesto">\r
            <span class="label">Estado presupuesto:</span>\r
            <span class="value">{{ estadoFlujo.resumen.estadisticas.estadoPresupuesto }}</span>\r
          </div>\r
          <div class="info-item" *ngIf="estadoFlujo.resumen.estadisticas">\r
            <span class="label">Total facturas:</span>\r
            <span class="value">{{ estadoFlujo.resumen.estadisticas.totalFacturas }}</span>\r
          </div>\r
        </div>\r
      </div> -->\r
    </div>\r
\r
    <!-- Acciones disponibles -->\r
    <div class="acciones-disponibles" *ngIf="accionesDisponibles.length > 0">\r
      <h4 class="section-title">Acciones disponibles:</h4>\r
      <div class="acciones-grid">\r
        <button \r
          *ngFor="let accion of accionesDisponibles" \r
          (click)="ejecutarAccion(accion)"\r
          class="btn-accion"\r
          [disabled]="loading"\r
          [title]="getAccionTexto(accion)">\r
          <ion-icon [name]="getAccionIcon(accion)"></ion-icon>\r
          <span class="accion-text">{{ getAccionTexto(accion) }}</span>\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- Informaci\xF3n del nuevo flujo -->\r
    <div class="flujo-inicial" *ngIf="estadoFlujo.estadoActual === 'No visitado' || estadoFlujo.estadoActual === 'Visitado pendiente'">\r
      <!-- <h4 class="section-title">Nuevo Flujo de Trabajo:</h4>\r
      <div class="flujo-info">\r
        <div class="flujo-step">\r
          <ion-icon name="create-outline"></ion-icon>\r
          <div class="step-content">\r
            <span class="step-title">1. Crear Trabajo</span>\r
            <span class="step-description">Crear un nuevo parte de trabajo para el aviso</span>\r
          </div>\r
        </div>\r
        \r
        <div class="flujo-step">\r
          <ion-icon name="document-text-outline"></ion-icon>\r
          <div class="step-content">\r
            <span class="step-title">2. Hacer Albar\xE1n</span>\r
            <span class="step-description">Al finalizar el trabajo, crear albar\xE1n con firma del cliente</span>\r
          </div>\r
        </div>\r
        \r
        <div class="flujo-step">\r
          <ion-icon name="receipt-outline"></ion-icon>\r
          <div class="step-content">\r
            <span class="step-title">3. Facturar</span>\r
            <span class="step-description">Generar factura basada en el albar\xE1n completado</span>\r
          </div>\r
        </div>\r
      </div>\r
    </div> -->\r
\r
    <!-- Sin acciones disponibles -->\r
    <div class="sin-acciones" *ngIf="accionesDisponibles.length === 0 && !estadoFlujo.puedeCrearPresupuesto">\r
      <ion-icon name="checkmark-circle-outline" class="complete-icon"></ion-icon>\r
      <span class="complete-text">No hay acciones pendientes</span>\r
    </div>\r
\r
  </div>\r
</div> `, styles: ["/* src/app/shared/components/flujo-estado/flujo-estado.component.scss */\n.flujo-estado-container {\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid #E2E8F0;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.desktop-only {\n  display: inline;\n}\n.mobile-only {\n  display: none;\n}\n.loading-state,\n.error-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 24px;\n  text-align: center;\n  color: #64748B;\n  font-size: 14px;\n}\n.loading-state ion-icon,\n.error-state ion-icon {\n  font-size: 20px;\n  color: #4F46E5;\n}\n.loading-state.error-state,\n.error-state.error-state {\n  color: #DC2626;\n}\n.loading-state.error-state ion-icon,\n.error-state.error-state ion-icon {\n  color: #DC2626;\n}\n.error-text {\n  word-break: break-word;\n  line-height: 1.4;\n}\n.btn-retry {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: #F1F5F9;\n  border: 1px solid #CBD5E1;\n  border-radius: 8px;\n  font-size: 12px;\n  color: #475569;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-retry:hover {\n  background: #E2E8F0;\n  border-color: #94A3B8;\n}\n.btn-retry ion-icon {\n  font-size: 14px;\n}\n.spinning {\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.flujo-content {\n  padding: 20px;\n}\n.estado-actual {\n  margin-bottom: 24px;\n}\n.estado-actual .estado-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.estado-actual .estado-badge {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  border-radius: 20px;\n  font-size: 14px;\n  font-weight: 500;\n}\n.estado-actual .estado-badge.pendiente {\n  background: #FEF3C7;\n  color: #92400E;\n}\n.estado-actual .estado-badge.pendiente ion-icon {\n  color: #D97706;\n}\n.estado-actual .estado-badge.presupuesto {\n  background: #DBEAFE;\n  color: #1E40AF;\n}\n.estado-actual .estado-badge.presupuesto ion-icon {\n  color: #3B82F6;\n}\n.estado-actual .estado-badge.en-curso {\n  background: #DCFCE7;\n  color: #166534;\n}\n.estado-actual .estado-badge.en-curso ion-icon {\n  color: #22C55E;\n}\n.estado-actual .estado-badge.completado {\n  background: #ECFDF5;\n  color: #14532D;\n}\n.estado-actual .estado-badge.completado ion-icon {\n  color: #10B981;\n}\n.estado-actual .estado-badge ion-icon {\n  font-size: 16px;\n}\n.estado-actual .estado-text {\n  font-weight: 500;\n}\n.estado-actual .btn-refresh {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  background: #F8FAFC;\n  border: 1px solid #E2E8F0;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.estado-actual .btn-refresh:hover {\n  background: #F1F5F9;\n  border-color: #CBD5E1;\n}\n.estado-actual .btn-refresh ion-icon {\n  font-size: 16px;\n  color: #64748B;\n}\n.resumen-info {\n  background: #F8FAFC;\n  border-radius: 8px;\n  padding: 16px;\n}\n.resumen-info .info-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 12px;\n}\n.resumen-info .info-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.resumen-info .info-item .label {\n  font-size: 13px;\n  color: #64748B;\n  font-weight: 500;\n}\n.resumen-info .info-item .value {\n  font-size: 13px;\n  color: #1E293B;\n  font-weight: 600;\n}\n.resumen-info .info-item .value.si {\n  color: #059669;\n}\n.resumen-info .info-item .value.no {\n  color: #DC2626;\n}\n.acciones-disponibles {\n  margin-bottom: 24px;\n}\n.acciones-disponibles .section-title {\n  margin: 0 0 12px 0;\n  font-size: 16px;\n  color: #1E293B;\n  font-weight: 600;\n}\n.acciones-disponibles .acciones-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 12px;\n}\n.acciones-disponibles .btn-accion {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  background: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-align: left;\n}\n.acciones-disponibles .btn-accion:hover:not(:disabled) {\n  background: #4338CA;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(79, 70, 229, 0.3);\n}\n.acciones-disponibles .btn-accion:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.acciones-disponibles .btn-accion ion-icon {\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.acciones-disponibles .btn-accion .accion-text {\n  flex: 1;\n}\n.flujo-inicial {\n  margin-bottom: 24px;\n}\n.flujo-inicial .section-title {\n  margin: 0 0 16px 0;\n  font-size: 16px;\n  color: #1E293B;\n  font-weight: 600;\n}\n.flujo-inicial .flujo-info {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.flujo-inicial .flujo-step {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px;\n  background: #F8FAFC;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  transition: all 0.2s ease;\n}\n.flujo-inicial .flujo-step:hover {\n  background: #F0F9FF;\n  border-color: #4F46E5;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.flujo-inicial .flujo-step ion-icon {\n  font-size: 28px;\n  color: #4F46E5;\n  flex-shrink: 0;\n  background: #EEF2FF;\n  padding: 12px;\n  border-radius: 50%;\n}\n.flujo-inicial .flujo-step .step-content {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n.flujo-inicial .flujo-step .step-content .step-title {\n  font-size: 16px;\n  font-weight: 600;\n  color: #1E293B;\n}\n.flujo-inicial .flujo-step .step-content .step-description {\n  font-size: 14px;\n  color: #64748B;\n  line-height: 1.4;\n}\n.sin-acciones {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 20px;\n  color: #64748B;\n  font-size: 14px;\n  text-align: center;\n}\n.sin-acciones .complete-icon {\n  font-size: 20px;\n  color: #10B981;\n}\n.sin-acciones .complete-text {\n  font-weight: 500;\n}\n@media (max-width: 768px) {\n  .desktop-only {\n    display: none;\n  }\n  .mobile-only {\n    display: inline;\n  }\n  .flujo-content {\n    padding: 16px;\n  }\n  .estado-actual {\n    margin-bottom: 20px;\n  }\n  .estado-actual .estado-header {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 12px;\n  }\n  .estado-actual .estado-badge {\n    padding: 6px 12px;\n    font-size: 13px;\n  }\n  .estado-actual .estado-badge ion-icon {\n    font-size: 14px;\n  }\n  .estado-actual .btn-refresh {\n    width: 28px;\n    height: 28px;\n  }\n  .estado-actual .btn-refresh ion-icon {\n    font-size: 14px;\n  }\n  .resumen-info {\n    padding: 12px;\n  }\n  .resumen-info .info-grid {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n  .resumen-info .info-item .label {\n    font-size: 12px;\n  }\n  .resumen-info .info-item .value {\n    font-size: 12px;\n  }\n  .acciones-disponibles {\n    margin-bottom: 20px;\n  }\n  .acciones-disponibles .section-title {\n    font-size: 15px;\n    margin-bottom: 10px;\n  }\n  .acciones-disponibles .acciones-grid {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n  .acciones-disponibles .btn-accion {\n    padding: 10px 12px;\n    font-size: 13px;\n  }\n  .acciones-disponibles .btn-accion ion-icon {\n    font-size: 16px;\n  }\n  .flujo-inicial {\n    margin-bottom: 20px;\n  }\n  .flujo-inicial .section-title {\n    font-size: 15px;\n    margin-bottom: 10px;\n  }\n  .flujo-inicial .flujo-info {\n    gap: 12px;\n  }\n  .flujo-inicial .flujo-step {\n    padding: 16px;\n    gap: 12px;\n  }\n  .flujo-inicial .flujo-step ion-icon {\n    font-size: 24px;\n    padding: 10px;\n  }\n  .flujo-inicial .flujo-step .step-content .step-title {\n    font-size: 14px;\n  }\n  .flujo-inicial .flujo-step .step-content .step-description {\n    font-size: 12px;\n  }\n  .sin-acciones {\n    padding: 16px;\n  }\n  .sin-acciones .complete-icon {\n    font-size: 18px;\n  }\n  .sin-acciones .complete-text {\n    font-size: 13px;\n  }\n  .loading-state,\n  .error-state {\n    padding: 20px;\n    font-size: 13px;\n  }\n  .loading-state ion-icon,\n  .error-state ion-icon {\n    font-size: 18px;\n  }\n  .btn-retry {\n    padding: 6px 12px;\n    font-size: 11px;\n  }\n  .btn-retry ion-icon {\n    font-size: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .flujo-content {\n    padding: 12px;\n  }\n  .estado-actual {\n    margin-bottom: 16px;\n  }\n  .estado-actual .estado-header {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n  }\n  .estado-actual .estado-badge {\n    justify-content: center;\n    padding: 4px 10px;\n    font-size: 12px;\n  }\n  .estado-actual .estado-badge ion-icon {\n    font-size: 12px;\n  }\n  .estado-actual .btn-refresh {\n    align-self: center;\n    width: 24px;\n    height: 24px;\n  }\n  .estado-actual .btn-refresh ion-icon {\n    font-size: 12px;\n  }\n  .resumen-info {\n    padding: 10px;\n  }\n  .resumen-info .info-grid {\n    gap: 6px;\n  }\n  .resumen-info .info-item .label {\n    font-size: 11px;\n  }\n  .resumen-info .info-item .value {\n    font-size: 11px;\n  }\n  .acciones-disponibles {\n    margin-bottom: 16px;\n  }\n  .acciones-disponibles .section-title {\n    font-size: 14px;\n    margin-bottom: 8px;\n  }\n  .acciones-disponibles .acciones-grid {\n    gap: 6px;\n  }\n  .acciones-disponibles .btn-accion {\n    padding: 8px 10px;\n    font-size: 12px;\n  }\n  .acciones-disponibles .btn-accion ion-icon {\n    font-size: 14px;\n  }\n  .flujo-inicial {\n    margin-bottom: 16px;\n  }\n  .flujo-inicial .section-title {\n    font-size: 14px;\n    margin-bottom: 8px;\n  }\n  .flujo-inicial .flujo-info {\n    gap: 8px;\n  }\n  .flujo-inicial .flujo-step {\n    padding: 12px;\n    gap: 8px;\n  }\n  .flujo-inicial .flujo-step ion-icon {\n    font-size: 20px;\n    padding: 8px;\n  }\n  .flujo-inicial .flujo-step .step-content .step-title {\n    font-size: 13px;\n  }\n  .flujo-inicial .flujo-step .step-content .step-description {\n    font-size: 11px;\n  }\n  .sin-acciones {\n    padding: 12px;\n    gap: 8px;\n  }\n  .sin-acciones .complete-icon {\n    font-size: 16px;\n  }\n  .sin-acciones .complete-text {\n    font-size: 12px;\n  }\n  .loading-state,\n  .error-state {\n    padding: 16px;\n    font-size: 12px;\n    gap: 8px;\n  }\n  .loading-state ion-icon,\n  .error-state ion-icon {\n    font-size: 16px;\n  }\n  .btn-retry {\n    padding: 4px 8px;\n    font-size: 10px;\n  }\n  .btn-retry ion-icon {\n    font-size: 10px;\n  }\n}\n/*# sourceMappingURL=flujo-estado.component.css.map */\n"] }]
  }], () => [{ type: FlujoAvisosService }], { avisoId: [{
    type: Input
  }], accionEjecutada: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FlujoEstadoComponent, { className: "FlujoEstadoComponent", filePath: "src/app/shared/components/flujo-estado/flujo-estado.component.ts", lineNumber: 29 });
})();

// src/app/modules/avisos/components/ver-avisos/ver-avisos.component.ts
var _c03 = ["fileInput"];
function VerAvisosComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32);
    \u0275\u0275element(2, "ion-icon", 33);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando aviso...");
    \u0275\u0275elementEnd()()();
  }
}
function VerAvisosComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35);
    \u0275\u0275element(2, "ion-icon", 36);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 37);
    \u0275\u0275listener("click", function VerAvisosComponent_div_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cargarAviso());
    });
    \u0275\u0275element(6, "ion-icon", 38);
    \u0275\u0275text(7, " Reintentar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.error);
  }
}
function VerAvisosComponent_div_2_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", function VerAvisosComponent_div_2_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.completarAviso());
    });
    \u0275\u0275element(1, "ion-icon", 67);
    \u0275\u0275elementStart(2, "span", 17);
    \u0275\u0275text(3, "Completar Aviso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 18);
    \u0275\u0275text(5, "Completar");
    \u0275\u0275elementEnd()();
  }
}
function VerAvisosComponent_div_2_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function VerAvisosComponent_div_2_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editarAviso());
    });
    \u0275\u0275element(1, "ion-icon", 68);
    \u0275\u0275elementStart(2, "span", 17);
    \u0275\u0275text(3, "Editar aviso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 18);
    \u0275\u0275text(5, "Editar");
    \u0275\u0275elementEnd()();
  }
}
function VerAvisosComponent_div_2_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275element(1, "ion-icon", 70);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Aviso completado");
    \u0275\u0275elementEnd()();
  }
}
function VerAvisosComponent_div_2_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275element(1, "ion-icon", 72);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.aviso.nombre_contacto);
  }
}
function VerAvisosComponent_div_2_div_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275element(1, "ion-icon", 74);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.aviso.telefono_cliente_aviso);
  }
}
function VerAvisosComponent_div_2_div_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275element(1, "ion-icon", 75);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.aviso.cliente == null ? null : ctx_r2.aviso.cliente.email);
  }
}
function VerAvisosComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 12)(2, "div", 39)(3, "div", 40)(4, "button", 41);
    \u0275\u0275listener("click", function VerAvisosComponent_div_2_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.volverALista());
    });
    \u0275\u0275element(5, "ion-icon", 42);
    \u0275\u0275elementStart(6, "span", 17);
    \u0275\u0275text(7, "Volver");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 18);
    \u0275\u0275text(9, "Volver");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "div", 43);
    \u0275\u0275template(11, VerAvisosComponent_div_2_button_11_Template, 6, 0, "button", 44)(12, VerAvisosComponent_div_2_button_12_Template, 6, 0, "button", 45)(13, VerAvisosComponent_div_2_div_13_Template, 4, 0, "div", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 47);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "h2", 48)(17, "span", 17);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 49)(20, "div", 50)(21, "div", 9)(22, "label");
    \u0275\u0275text(23, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 51);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 9)(27, "label");
    \u0275\u0275text(28, "Urgente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 52);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 9)(32, "label");
    \u0275\u0275text(33, "Fecha de creaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span");
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 53)(38, "label");
    \u0275\u0275text(39, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 54)(41, "span", 55);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "a", 56);
    \u0275\u0275listener("click", function VerAvisosComponent_div_2_Template_a_click_43_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.verCliente());
    });
    \u0275\u0275elementStart(44, "span", 17);
    \u0275\u0275text(45, "Ver cliente");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(46, "div", 57)(47, "label");
    \u0275\u0275text(48, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 58)(50, "span", 59);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "button", 60);
    \u0275\u0275listener("click", function VerAvisosComponent_div_2_Template_button_click_52_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.verMapa());
    });
    \u0275\u0275element(53, "ion-icon", 61);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(54, "div", 62)(55, "label");
    \u0275\u0275text(56, "Contacto Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 63);
    \u0275\u0275template(58, VerAvisosComponent_div_2_div_58_Template, 4, 1, "div", 64)(59, VerAvisosComponent_div_2_div_59_Template, 4, 1, "div", 65)(60, VerAvisosComponent_div_2_div_60_Template, 4, 1, "div", 65);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", (ctx_r2.aviso == null ? null : ctx_r2.aviso.estado) !== "Completado");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r2.aviso == null ? null : ctx_r2.aviso.estado) !== "Completado");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r2.aviso == null ? null : ctx_r2.aviso.estado) === "Completado");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Aviso #", ctx_r2.aviso.id == null ? null : ctx_r2.aviso.id.substring(0, 8), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Informaci\xF3n general del Aviso - #", ctx_r2.aviso.id == null ? null : ctx_r2.aviso.id.substring(0, 8), "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.aviso.estado);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("urgent", ctx_r2.aviso.urgencia === "Alta" || ctx_r2.aviso.es_urgente);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.aviso.urgencia === "Alta" || ctx_r2.aviso.es_urgente ? "S\xED" : "No", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(36, 15, ctx_r2.aviso.fecha_creacion, "dd/MM/yyyy"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.aviso.nombre_cliente_aviso);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.aviso.direccion_cliente_aviso);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r2.aviso.nombre_contacto);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.aviso.telefono_cliente_aviso);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.aviso.cliente == null ? null : ctx_r2.aviso.cliente.email);
  }
}
function VerAvisosComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 76)(1, "div", 77)(2, "app-flujo-estado", 78);
    \u0275\u0275listener("accionEjecutada", function VerAvisosComponent_div_31_Template_app_flujo_estado_accionEjecutada_2_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onAccionFlujoEjecutada($event));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("avisoId", (ctx_r2.aviso == null ? null : ctx_r2.aviso.id) || "");
  }
}
function VerAvisosComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32);
    \u0275\u0275element(2, "ion-icon", 33);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando trabajos...");
    \u0275\u0275elementEnd()()();
  }
}
function VerAvisosComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "div", 80);
    \u0275\u0275element(2, "ion-icon", 81);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No hay trabajos realizados para este aviso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6, "Crea el primer parte de trabajo para comenzar");
    \u0275\u0275elementEnd()()();
  }
}
function VerAvisosComponent_table_38_tr_18_ul_17_li_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const material_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", (material_r8.material == null ? null : material_r8.material.nombre) || "Material", ": ", material_r8.cantidad_utilizada, " ", (material_r8.material == null ? null : material_r8.material.unidad) || "unidad", " ");
  }
}
function VerAvisosComponent_table_38_tr_18_ul_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 101);
    \u0275\u0275template(1, VerAvisosComponent_table_38_tr_18_ul_17_li_1_Template, 2, 3, "li", 83);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trabajo_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", trabajo_r9.materiales);
  }
}
function VerAvisosComponent_table_38_tr_18_ul_18_li_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const repuesto_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(repuesto_r10);
  }
}
function VerAvisosComponent_table_38_tr_18_ul_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 101);
    \u0275\u0275template(1, VerAvisosComponent_table_38_tr_18_ul_18_li_1_Template, 2, 1, "li", 83);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trabajo_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", trabajo_r9.repuestos);
  }
}
function VerAvisosComponent_table_38_tr_18_span_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 102);
    \u0275\u0275text(1, " Sin materiales ");
    \u0275\u0275elementEnd();
  }
}
function VerAvisosComponent_table_38_tr_18_button_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 103);
    \u0275\u0275listener("click", function VerAvisosComponent_table_38_tr_18_button_25_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const trabajo_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.hacerAlbaran(trabajo_r9));
    });
    \u0275\u0275element(1, "ion-icon", 104);
    \u0275\u0275elementStart(2, "span", 17);
    \u0275\u0275text(3, "Crear Albar\xE1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 18);
    \u0275\u0275text(5, "Albar\xE1n");
    \u0275\u0275elementEnd()();
  }
}
function VerAvisosComponent_table_38_tr_18_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105)(1, "span", 106);
    \u0275\u0275element(2, "ion-icon", 70);
    \u0275\u0275text(3, " Albar\xE1n Cerrado ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 107);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trabajo_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap("badge-" + ctx_r2.getAlbaranEstado(trabajo_r9));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getAlbaranEstado(trabajo_r9), " ");
  }
}
function VerAvisosComponent_table_38_tr_18_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 108);
    \u0275\u0275listener("click", function VerAvisosComponent_table_38_tr_18_button_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const trabajo_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editarTrabajo(trabajo_r9));
    });
    \u0275\u0275element(1, "ion-icon", 68);
    \u0275\u0275elementStart(2, "span", 17);
    \u0275\u0275text(3, "Editar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 18);
    \u0275\u0275text(5, "Editar");
    \u0275\u0275elementEnd()();
  }
}
function VerAvisosComponent_table_38_tr_18_button_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 109);
    \u0275\u0275listener("click", function VerAvisosComponent_table_38_tr_18_button_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const trabajo_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.eliminarTrabajo(trabajo_r9));
    });
    \u0275\u0275element(1, "ion-icon", 110);
    \u0275\u0275elementStart(2, "span", 17);
    \u0275\u0275text(3, "Eliminar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 18);
    \u0275\u0275text(5, "Eliminar");
    \u0275\u0275elementEnd()();
  }
}
function VerAvisosComponent_table_38_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 84);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 85);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 86);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 87)(10, "div", 88)(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "small");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "td", 89)(16, "div", 90);
    \u0275\u0275template(17, VerAvisosComponent_table_38_tr_18_ul_17_Template, 2, 1, "ul", 91)(18, VerAvisosComponent_table_38_tr_18_ul_18_Template, 2, 1, "ul", 91)(19, VerAvisosComponent_table_38_tr_18_span_19_Template, 2, 0, "span", 92);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td", 93)(21, "span", 94);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "td", 95)(24, "div", 96);
    \u0275\u0275template(25, VerAvisosComponent_table_38_tr_18_button_25_Template, 6, 0, "button", 97)(26, VerAvisosComponent_table_38_tr_18_div_26_Template, 6, 3, "div", 98)(27, VerAvisosComponent_table_38_tr_18_button_27_Template, 6, 0, "button", 99)(28, VerAvisosComponent_table_38_tr_18_button_28_Template, 6, 0, "button", 100);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const trabajo_r9 = ctx.$implicit;
    const i_r14 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", i_r14 + 1, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 16, trabajo_r9.fecha_trabajo, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 19, ctx_r2.calcularHorasTrabajo(trabajo_r9), "1.1-1"), "h");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(trabajo_r9.descripcion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", trabajo_r9.hora_inicio, " - ", trabajo_r9.hora_fin, "");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", trabajo_r9.materiales && trabajo_r9.materiales.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (!trabajo_r9.materiales || trabajo_r9.materiales.length === 0) && trabajo_r9.repuestos && trabajo_r9.repuestos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (!trabajo_r9.materiales || trabajo_r9.materiales.length === 0) && (!trabajo_r9.repuestos || trabajo_r9.repuestos.length === 0));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("badge-" + trabajo_r9.estado.toLowerCase().replace(" ", "-"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", trabajo_r9.estado, " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", trabajo_r9.estado === "En curso" || trabajo_r9.estado === "Abierto");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", trabajo_r9.albaran_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", trabajo_r9.estado !== "Cerrado" && trabajo_r9.estado !== "Finalizado");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", trabajo_r9.estado !== "Cerrado" && trabajo_r9.estado !== "Finalizado");
  }
}
function VerAvisosComponent_table_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 82)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "N\xFAmero");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Fecha trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Horas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Materiales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, VerAvisosComponent_table_38_tr_18_Template, 29, 22, "tr", 83);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r2.trabajosRealizados);
  }
}
function VerAvisosComponent_div_39_div_8_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 119)(1, "label");
    \u0275\u0275text(2, "Presupuesto:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const albaran_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(5, 1, albaran_r15.presupuesto_necesario, "EUR", "symbol", "1.2-2"));
  }
}
function VerAvisosComponent_div_39_div_8_div_24_span_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const repuesto_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", repuesto_r16.nombre, ": ", repuesto_r16.cantidad, " ", repuesto_r16.unidad || "unidad", " ");
  }
}
function VerAvisosComponent_div_39_div_8_div_24_span_4_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const repuesto_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", repuesto_r16, " ");
  }
}
function VerAvisosComponent_div_39_div_8_div_24_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 126);
    \u0275\u0275template(1, VerAvisosComponent_div_39_div_8_div_24_span_4_ng_container_1_Template, 2, 3, "ng-container", 127)(2, VerAvisosComponent_div_39_div_8_div_24_span_4_ng_template_2_Template, 1, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const repuesto_r16 = ctx.$implicit;
    const repuestoBasico_r17 = \u0275\u0275reference(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", repuesto_r16.cantidad)("ngIfElse", repuestoBasico_r17);
  }
}
function VerAvisosComponent_div_39_div_8_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 121)(1, "label");
    \u0275\u0275text(2, "Repuestos utilizados:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 124);
    \u0275\u0275template(4, VerAvisosComponent_div_39_div_8_div_24_span_4_Template, 4, 2, "span", 125);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const albaran_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", albaran_r15.repuestos_utilizados);
  }
}
function VerAvisosComponent_div_39_div_8_div_25_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 119)(1, "label");
    \u0275\u0275text(2, "DNI Cliente:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const albaran_r15 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(albaran_r15.dni_cliente);
  }
}
function VerAvisosComponent_div_39_div_8_div_25_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 119)(1, "label");
    \u0275\u0275text(2, "Firmado por:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const albaran_r15 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(albaran_r15.nombre_firma);
  }
}
function VerAvisosComponent_div_39_div_8_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 118);
    \u0275\u0275template(1, VerAvisosComponent_div_39_div_8_div_25_div_1_Template, 5, 1, "div", 120)(2, VerAvisosComponent_div_39_div_8_div_25_div_2_Template, 5, 1, "div", 120);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const albaran_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", albaran_r15.dni_cliente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", albaran_r15.nombre_firma);
  }
}
function VerAvisosComponent_div_39_div_8_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 121)(1, "label");
    \u0275\u0275text(2, "Observaciones:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const albaran_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(albaran_r15.observaciones);
  }
}
function VerAvisosComponent_div_39_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "div", 115)(2, "div", 105)(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 116);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 117)(9, "span", 94);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 107)(12, "div", 118)(13, "div", 119)(14, "label");
    \u0275\u0275text(15, "Horario:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, VerAvisosComponent_div_39_div_8_div_18_Template, 6, 6, "div", 120);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 121)(20, "label");
    \u0275\u0275text(21, "Descripci\xF3n del trabajo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(24, VerAvisosComponent_div_39_div_8_div_24_Template, 5, 1, "div", 122)(25, VerAvisosComponent_div_39_div_8_div_25_Template, 3, 2, "div", 123)(26, VerAvisosComponent_div_39_div_8_div_26_Template, 5, 1, "div", 122);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const albaran_r15 = ctx.$implicit;
    const i_r18 = ctx.index;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Albar\xE1n #", i_r18 + 1, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 12, albaran_r15.fecha_cierre, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge-" + albaran_r15.estado_cierre.toLowerCase().replace(" ", "-"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", albaran_r15.estado_cierre, " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("", albaran_r15.hora_entrada, " - ", albaran_r15.hora_salida, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", albaran_r15.presupuesto_necesario > 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(albaran_r15.descripcion_trabajo_realizado);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", albaran_r15.repuestos_utilizados && albaran_r15.repuestos_utilizados.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", albaran_r15.dni_cliente || albaran_r15.nombre_firma);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", albaran_r15.observaciones);
  }
}
function VerAvisosComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 12)(2, "h2");
    \u0275\u0275text(3, "Albaranes Cerrados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 43)(5, "span", 111);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 112);
    \u0275\u0275template(8, VerAvisosComponent_div_39_div_8_Template, 27, 15, "div", 113);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Total: ", ctx_r2.aviso.albaranes.length, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.aviso.albaranes);
  }
}
function VerAvisosComponent_div_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 128);
    \u0275\u0275element(1, "ion-icon", 33);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Subiendo im\xE1genes...");
    \u0275\u0275elementEnd()();
  }
}
function VerAvisosComponent_div_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275element(1, "ion-icon", 130);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay im\xE1genes disponibles para este aviso");
    \u0275\u0275elementEnd()();
  }
}
function VerAvisosComponent_div_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 131);
    \u0275\u0275element(1, "img", 132);
    \u0275\u0275elementStart(2, "div", 133)(3, "span", 134);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 135);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 136);
    \u0275\u0275listener("click", function VerAvisosComponent_div_56_Template_button_click_8_listener() {
      const foto_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.eliminarFoto(foto_r20));
    });
    \u0275\u0275element(9, "ion-icon", 110);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const foto_r20 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", foto_r20.url, \u0275\u0275sanitizeUrl)("alt", foto_r20.descripcion || "Imagen del aviso");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(foto_r20.descripcion || "Imagen del aviso");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 4, foto_r20.fecha_subida, "dd/MM/yyyy HH:mm"));
  }
}
addIcons({ close, pencilOutline, navigate, person, call, mail, mapOutline, arrowBackOutline });
var _VerAvisosComponent = class _VerAvisosComponent {
  constructor(route, router, avisosService, trabajosService, modalController, flujoAvisosService) {
    this.route = route;
    this.router = router;
    this.avisosService = avisosService;
    this.trabajosService = trabajosService;
    this.modalController = modalController;
    this.flujoAvisosService = flujoAvisosService;
    this.vistaGaleria = "grid";
    this.aviso = null;
    this.loading = false;
    this.error = null;
    this.subiendoImagenes = false;
    this.destroy$ = new Subject();
    this.trabajosRealizados = [];
    this.loadingTrabajos = false;
    addIcons({ refreshOutline, alertCircleOutline, arrowBackOutline, close, pencilOutline, checkmarkCircleOutline, navigate, person, call, mail, addCircle, constructOutline, documentTextOutline, trashOutline, imagesOutline, personOutline, gridOutline, listOutline, chevronDownOutline, eyeOutline, ellipsisVerticalOutline, ellipsisVertical, add, mapOutline });
  }
  ngOnInit() {
    this.cargarAviso();
  }
  /**
   * Carga los trabajos realizados del aviso
   */
  cargarTrabajos() {
    var _a;
    if (!((_a = this.aviso) == null ? void 0 : _a.id))
      return;
    this.loadingTrabajos = true;
    this.trabajosService.getTrabajosAviso(this.aviso.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.trabajosRealizados = response.trabajos;
        this.loadingTrabajos = false;
      },
      error: (error) => {
        console.error("Error al cargar trabajos:", error);
        this.loadingTrabajos = false;
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Carga el aviso basado en el ID de la URL
   */
  cargarAviso() {
    this.loading = true;
    this.error = null;
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const avisoId = params["id-aviso"];
      if (avisoId) {
        this.avisosService.getAviso(avisoId).pipe(takeUntil(this.destroy$)).subscribe({
          next: (aviso) => {
            this.aviso = aviso;
            this.loading = false;
            this.cargarTrabajos();
          },
          error: (error) => {
            console.error("Error al cargar el aviso:", error);
            this.error = "Error al cargar el aviso. Por favor, int\xE9ntalo de nuevo.";
            this.loading = false;
          }
        });
      } else {
        this.error = "ID de aviso no v\xE1lido";
        this.loading = false;
      }
    });
  }
  cambiarVistaGaleria(event) {
    this.vistaGaleria = event.detail.value;
  }
  /**
   * Navega de vuelta a la lista de avisos
   */
  volverALista() {
    const referrer = document.referrer;
    if (referrer && referrer.includes("/historial")) {
      this.router.navigate(["/historial"]);
    } else {
      this.router.navigate(["/avisos"]);
    }
  }
  verCliente() {
    var _a, _b;
    if ((_b = (_a = this.aviso) == null ? void 0 : _a.cliente) == null ? void 0 : _b.id) {
      console.log("Navegar al cliente:", this.aviso.cliente.id);
    }
  }
  verMapa() {
    var _a;
    if ((_a = this.aviso) == null ? void 0 : _a.direccion_cliente_aviso) {
      const direccion = encodeURIComponent(this.aviso.direccion_cliente_aviso);
      window.open(`https://www.google.com/maps/search/?api=1&query=${direccion}`, "_blank");
    }
  }
  editarAviso() {
    var _a;
    if ((_a = this.aviso) == null ? void 0 : _a.id) {
      this.abrirModalEditarAviso();
    }
  }
  /**
   * Abre el modal para editar el aviso
   */
  abrirModalEditarAviso() {
    return __async(this, null, function* () {
      var _a;
      if (!((_a = this.aviso) == null ? void 0 : _a.id))
        return;
      const modal = yield this.modalController.create({
        component: CrearAvisosModalComponent,
        cssClass: "modal-crear-aviso",
        componentProps: {
          modoEdicion: true,
          avisoExistente: this.aviso
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        try {
          console.log("Datos del formulario de edici\xF3n:", data);
          const datosActualizacion = {
            tipo: data.tipo,
            nombre_cliente_aviso: data.nombreContacto,
            direccion_cliente_aviso: data.direccionLocal,
            telefono_cliente_aviso: data.telefono,
            nombre_contacto: data.nombreContacto,
            descripcion_problema: data.descripcion,
            es_urgente: data.esUrgente,
            urgencia: data.esUrgente ? "Alta" : "Normal"
          };
          this.loading = true;
          this.avisosService.actualizarAviso(this.aviso.id, datosActualizacion).pipe(takeUntil(this.destroy$)).subscribe({
            next: (avisoActualizado) => {
              console.log("Aviso actualizado exitosamente:", avisoActualizado);
              this.loading = false;
              this.mostrarMensaje("Aviso actualizado exitosamente", "success");
              this.cargarAviso();
            },
            error: (error) => {
              console.error("Error al actualizar aviso:", error);
              this.loading = false;
              this.mostrarMensaje(error.message || "Error al actualizar el aviso. Por favor, int\xE9ntalo de nuevo.", "error");
            }
          });
        } catch (error) {
          console.error("Error al procesar la edici\xF3n:", error);
          this.mostrarMensaje("Error al procesar la edici\xF3n. Por favor, int\xE9ntalo de nuevo.", "error");
        }
      }
    });
  }
  cerrarAlbaran() {
    var _a;
    if ((_a = this.aviso) == null ? void 0 : _a.id) {
      console.log("Cerrar albar\xE1n para aviso:", this.aviso.id);
    }
  }
  /**
   * Abre el selector de archivos
   */
  seleccionarImagenes() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
  /**
   * Maneja la selección de archivos
   */
  onFileSelected(event) {
    var _a;
    const files = event.target.files;
    if (files.length > 0 && ((_a = this.aviso) == null ? void 0 : _a.id)) {
      this.subirImagenes(Array.from(files));
    }
    event.target.value = "";
  }
  /**
   * Sube múltiples imágenes al aviso
   */
  subirImagenes(files) {
    return __async(this, null, function* () {
      var _a;
      if (!((_a = this.aviso) == null ? void 0 : _a.id)) {
        console.error("No se puede subir im\xE1genes: aviso no v\xE1lido");
        return;
      }
      this.subiendoImagenes = true;
      this.error = null;
      try {
        const subidasCompletadas = new Promise((resolve) => {
          let fotosSubidas = 0;
          const totalFotos = files.length;
          files.forEach((file) => {
            this.avisosService.subirFoto(this.aviso.id, file).pipe(takeUntil(this.destroy$)).subscribe({
              next: (foto) => {
                console.log("Foto subida:", foto);
                fotosSubidas++;
                if (fotosSubidas === totalFotos) {
                  resolve();
                }
              },
              error: (error) => {
                console.error("Error al subir foto:", error);
                fotosSubidas++;
                if (fotosSubidas === totalFotos) {
                  resolve();
                }
              }
            });
          });
        });
        yield subidasCompletadas;
        this.cargarAviso();
      } catch (error) {
        console.error("Error al subir im\xE1genes:", error);
        this.error = "Error al subir las im\xE1genes. Por favor, int\xE9ntalo de nuevo.";
      } finally {
        this.subiendoImagenes = false;
      }
    });
  }
  /**
   * Abre el modal para crear un nuevo trabajo realizado
   */
  crearTrabajoRealizado(trabajoExistente) {
    return __async(this, null, function* () {
      var _a;
      if (!((_a = this.aviso) == null ? void 0 : _a.id))
        return;
      const modal = yield this.modalController.create({
        component: CrearTrabajosRealizadosComponent,
        componentProps: {
          avisoId: this.aviso.id,
          trabajoExistente
          // Pasar el trabajo existente si se está editando
        },
        cssClass: "modal-crear-trabajo"
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        try {
          if (trabajoExistente) {
            const resultado = yield firstValueFrom(this.trabajosService.actualizarTrabajo(trabajoExistente.id, data));
            console.log("Trabajo actualizado exitosamente:", resultado);
            alert("Trabajo actualizado exitosamente.");
          } else {
            const resultado = yield firstValueFrom(this.trabajosService.crearTrabajo(data));
            console.log("Trabajo creado exitosamente:", resultado);
            alert("Trabajo creado exitosamente. Los materiales han sido descontados del inventario.");
          }
          this.cargarTrabajos();
        } catch (error) {
          console.error("Error al procesar trabajo:", error);
          alert("Error al procesar el trabajo. Por favor, int\xE9ntalo de nuevo.");
        }
      }
    });
  }
  /**
   * Edita un trabajo existente
   */
  editarTrabajo(trabajo) {
    return __async(this, null, function* () {
      try {
        const trabajoCompleto = yield firstValueFrom(this.trabajosService.getTrabajo(trabajo.id));
        yield this.crearTrabajoRealizado(trabajoCompleto.trabajo);
      } catch (error) {
        console.error("Error al cargar el trabajo para editar:", error);
        alert("Error al cargar el trabajo para editar. Por favor, int\xE9ntalo de nuevo.");
      }
    });
  }
  /**
   * Elimina un trabajo
   */
  eliminarTrabajo(trabajo) {
    return __async(this, null, function* () {
      const confirmacion = confirm(`\xBFEst\xE1s seguro de que quieres eliminar este trabajo?

Fecha: ${trabajo.fecha_trabajo}
Descripci\xF3n: ${trabajo.descripcion}

Esta acci\xF3n no se puede deshacer y los materiales ser\xE1n devueltos al inventario.`);
      if (confirmacion) {
        try {
          yield firstValueFrom(this.trabajosService.eliminarTrabajo(trabajo.id));
          console.log("Trabajo eliminado exitosamente");
          alert("Trabajo eliminado exitosamente. Los materiales han sido devueltos al inventario.");
          this.cargarTrabajos();
        } catch (error) {
          console.error("Error al eliminar el trabajo:", error);
          alert("Error al eliminar el trabajo. Por favor, int\xE9ntalo de nuevo.");
        }
      }
    });
  }
  /**
   * Abre el modal para hacer albarán
   */
  hacerAlbaran(trabajo) {
    return __async(this, null, function* () {
      var _a;
      console.log("Abriendo modal de hacer albar\xE1n para trabajo:", trabajo);
      if (!((_a = this.aviso) == null ? void 0 : _a.id))
        return;
      const modal = yield this.modalController.create({
        component: HacerAlbaranComponent,
        componentProps: {
          trabajo,
          aviso: this.aviso
        },
        cssClass: "modal-hacer-albaran modal-fullscreen",
        backdropDismiss: false
      });
      console.log("Modal creado:", modal);
      console.log("Presentando modal...");
      yield modal.present();
      console.log("Modal presentado");
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && (data == null ? void 0 : data.success)) {
        try {
          console.log("Albar\xE1n creado exitosamente:", data.albaran);
          console.log("Trabajo actualizado:", data.trabajo);
          console.log("Aviso actualizado:", data.aviso);
          alert(data.mensaje || "Albar\xE1n creado exitosamente");
          this.cargarTrabajos();
          if (data.aviso) {
            this.aviso = data.aviso;
          }
          if (data.albaran.estado_cierre === "Finalizado") {
            console.log("Trabajo finalizado, listo para facturar");
          }
          if (data.albaran.estado_cierre === "Presupuesto pendiente") {
            console.log("Presupuesto pendiente, se puede crear presupuesto");
          }
          if (data.albaran.estado_cierre === "Otra visita") {
            console.log("Otra visita requerida");
          }
        } catch (error) {
          console.error("Error al procesar albar\xE1n:", error);
          alert("Error al procesar el albar\xE1n. Por favor, int\xE9ntalo de nuevo.");
        }
      }
    });
  }
  realizarOtraVisita(trabajo) {
    console.log("Realizar otra visita para el trabajo:", trabajo);
  }
  /**
   * Elimina una foto del aviso
   */
  eliminarFoto(foto) {
    return __async(this, null, function* () {
      var _a;
      if (!((_a = this.aviso) == null ? void 0 : _a.id) || !(foto == null ? void 0 : foto.id)) {
        console.error("No se puede eliminar la foto: faltan datos");
        return;
      }
      const confirmacion = confirm(`\xBFEst\xE1s seguro de que quieres eliminar esta imagen?

Esta acci\xF3n no se puede deshacer.`);
      if (confirmacion) {
        try {
          yield firstValueFrom(this.avisosService.eliminarFoto(foto.id));
          console.log("Foto eliminada exitosamente");
          this.cargarAviso();
        } catch (error) {
          console.error("Error al eliminar la foto:", error);
          alert("Error al eliminar la imagen. Por favor, int\xE9ntalo de nuevo.");
        }
      }
    });
  }
  /**
   * Calcula las horas de trabajo de un trabajo
   */
  calcularHorasTrabajo(trabajo) {
    const inicio = /* @__PURE__ */ new Date(`2000-01-01T${trabajo.hora_inicio}`);
    const fin = /* @__PURE__ */ new Date(`2000-01-01T${trabajo.hora_fin}`);
    const horas = (fin.getTime() - inicio.getTime()) / (1e3 * 60 * 60);
    return Math.max(0, horas);
  }
  /**
   * Obtiene el estado del albarán asociado al trabajo
   */
  getAlbaranEstado(trabajo) {
    var _a;
    if (!trabajo.albaran_id || !((_a = this.aviso) == null ? void 0 : _a.albaranes)) {
      return "pendiente";
    }
    const albaran = this.aviso.albaranes.find((a) => a.id === trabajo.albaran_id);
    if (!albaran) {
      return "pendiente";
    }
    return albaran.estado_cierre.toLowerCase().replace(/ /g, "-");
  }
  /**
   * Convierte el estado del aviso a una clase CSS válida
   */
  getEstadoClass(estado) {
    if (!estado)
      return "badge-pendiente";
    return "badge-" + estado.toLowerCase().replace(/ /g, "-");
  }
  /**
   * Maneja las acciones ejecutadas desde el componente de flujo
   */
  onAccionFlujoEjecutada(resultado) {
    console.log("Acci\xF3n de flujo ejecutada:", resultado);
    this.cargarAviso();
    if (resultado.mensaje) {
      console.log("Mensaje de \xE9xito:", resultado.mensaje);
      alert(resultado.mensaje);
    }
    if (resultado.facturaId) {
      const navegarFactura = confirm("Se ha generado una factura. \xBFDeseas ver la factura creada?");
      if (navegarFactura) {
        this.router.navigate(["/facturas", resultado.facturaId]);
      }
    }
  }
  completarAviso() {
    var _a;
    if ((_a = this.aviso) == null ? void 0 : _a.id) {
      console.log("\u{1F504} Completando aviso:", this.aviso.id);
      if (confirm("\xBFEst\xE1s seguro de que quieres marcar este aviso como completado? Esta acci\xF3n no se puede deshacer.")) {
        this.loading = true;
        this.flujoAvisosService.completarAviso(this.aviso.id).subscribe({
          next: (resultado) => {
            console.log("\u2705 Aviso completado exitosamente:", resultado);
            this.loading = false;
            this.mostrarMensaje("Aviso completado exitosamente", "success");
            this.cargarAviso();
          },
          error: (error) => {
            console.error("\u274C Error al completar aviso:", error);
            this.loading = false;
            this.mostrarMensaje(error.message || "Error al completar el aviso. Verifica que haya trabajos realizados y facturas generadas.", "error");
          }
        });
      }
    } else {
      console.error("No hay aviso seleccionado para completar");
      this.mostrarMensaje("No hay aviso seleccionado para completar", "error");
    }
  }
  /**
   * Muestra un mensaje al usuario
   */
  mostrarMensaje(mensaje, tipo = "info") {
    console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
    if (tipo === "error") {
      alert(mensaje);
    }
  }
};
_VerAvisosComponent.\u0275fac = function VerAvisosComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _VerAvisosComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AvisosService), \u0275\u0275directiveInject(TrabajosService), \u0275\u0275directiveInject(ModalController), \u0275\u0275directiveInject(FlujoAvisosService));
};
_VerAvisosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VerAvisosComponent, selectors: [["app-ver-avisos"]], viewQuery: function VerAvisosComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c03, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInput = _t.first);
  }
}, decls: 57, vars: 19, consts: [["fileInput", ""], ["repuestoBasico", ""], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "info-card", 4, "ngIf"], [1, "info-card"], [1, "card-header", 2, "justify-content", "space-between!important"], [1, "badge-estado-aviso"], [1, "descripcion-content"], [1, "info-item"], [1, "tipo-aviso"], [1, "descripcion-texto"], [1, "card-header"], [2, "text-wrap", "nowrap"], [1, "header-actions-jobs"], [1, "btn-primary", 3, "click"], ["name", "add-circle"], [1, "desktop-only"], [1, "mobile-only"], ["class", "flujo-section", 4, "ngIf"], [1, "section-divider"], [1, "table-container"], ["class", "no-trabajos", 4, "ngIf"], ["class", "custom-mat-table", 4, "ngIf"], [1, "gallery-actions"], [1, "btn-primary", 3, "click", "disabled"], ["type", "file", "multiple", "", "accept", "image/*", 2, "display", "none", 3, "change"], [1, "gallery-items"], ["class", "uploading-indicator", 4, "ngIf"], ["class", "no-images", 4, "ngIf"], ["class", "gallery-item", 4, "ngFor", "ngForOf"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "error-state"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "header-container"], [1, "back-button"], [1, "btn-back", 3, "click"], ["name", "arrow-back-outline"], [1, "header-actions"], ["class", "btn-secondary", 3, "click", 4, "ngIf"], ["class", "btn-primary", 3, "click", 4, "ngIf"], ["class", "aviso-completado-message", 4, "ngIf"], [1, "mobile-only", "title"], [1, "title"], [1, "info-grid"], [1, "info-row"], [1, "estado-pendiente"], [1, "urgent-badge"], [1, "info-item", "cliente-section"], [1, "cliente-info"], [1, "cliente-nombre"], [1, "ver-cliente", 3, "click"], [1, "info-item", "direccion-section"], [1, "direccion-info"], [1, "direccion-texto"], ["title", "Ver en mapa", 1, "btn-map", 3, "click"], ["name", "navigate"], [1, "contacto-section"], [1, "contacto-items"], ["class", "contacto-item nombre-contacto", 4, "ngIf"], ["class", "contacto-item", 4, "ngIf"], [1, "btn-secondary", 3, "click"], ["name", "close"], ["name", "pencil-outline"], [1, "aviso-completado-message"], ["name", "checkmark-circle-outline"], [1, "contacto-item", "nombre-contacto"], ["name", "person"], [1, "contacto-item"], ["name", "call"], ["name", "mail"], [1, "flujo-section"], [1, "flujo-container"], [3, "accionEjecutada", "avisoId"], [1, "no-trabajos"], [1, "empty-state"], ["name", "construct-outline"], [1, "custom-mat-table"], [4, "ngFor", "ngForOf"], ["data-label", "N\xFAmero"], ["data-label", "Fecha trabajo"], ["data-label", "Horas"], ["data-label", "Descripci\xF3n"], [1, "descripcion-trabajo"], ["data-label", "Materiales"], [1, "materiales-info"], ["class", "repuestos-list", 4, "ngIf"], ["class", "no-repuestos", 4, "ngIf"], ["data-label", "Estado"], [1, "badge-estado"], ["data-label", "Acciones"], [1, "estado-actions"], ["class", "btn-primary btn-small", "title", "Hacer albar\xE1n", 3, "click", 4, "ngIf"], ["class", "albaran-info", 4, "ngIf"], ["class", "btn-secondary btn-small", "title", "Editar trabajo", 3, "click", 4, "ngIf"], ["class", "btn-danger btn-small", "title", "Eliminar trabajo", 3, "click", 4, "ngIf"], [1, "repuestos-list"], [1, "no-repuestos"], ["title", "Hacer albar\xE1n", 1, "btn-primary", "btn-small", 3, "click"], ["name", "document-text-outline"], [1, "albaran-info"], [1, "badge-albaran"], [1, "albaran-details"], ["title", "Editar trabajo", 1, "btn-secondary", "btn-small", 3, "click"], ["title", "Eliminar trabajo", 1, "btn-danger", "btn-small", 3, "click"], ["name", "trash-outline"], [1, "badge-info"], [1, "albaranes-container"], ["class", "albaran-item", 4, "ngFor", "ngForOf"], [1, "albaran-item"], [1, "albaran-header"], [1, "fecha-albaran"], [1, "estado-albaran"], [1, "detail-row"], [1, "detail-item"], ["class", "detail-item", 4, "ngIf"], [1, "detail-item", "full-width"], ["class", "detail-item full-width", 4, "ngIf"], ["class", "detail-row", 4, "ngIf"], [1, "repuestos-tags"], ["class", "repuesto-tag", 4, "ngFor", "ngForOf"], [1, "repuesto-tag"], [4, "ngIf", "ngIfElse"], [1, "uploading-indicator"], [1, "no-images"], ["name", "images-outline"], [1, "gallery-item"], [3, "src", "alt"], [1, "image-info"], [1, "image-title"], [1, "file-info"], ["title", "Eliminar imagen", 1, "btn-delete", 3, "click"]], template: function VerAvisosComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, VerAvisosComponent_div_0_Template, 5, 0, "div", 2)(1, VerAvisosComponent_div_1_Template, 8, 1, "div", 3)(2, VerAvisosComponent_div_2_Template, 61, 18, "div", 4);
    \u0275\u0275elementStart(3, "div", 5)(4, "div", 6)(5, "h2");
    \u0275\u0275text(6, "Descripci\xF3n del Aviso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 7);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 8)(10, "div", 9)(11, "label");
    \u0275\u0275text(12, "Tipo de Aviso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 10);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 9)(16, "label");
    \u0275\u0275text(17, "Descripci\xF3n Detallada del Problema/Petici\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p", 11);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(20, "div", 5)(21, "div", 12)(22, "h2", 13);
    \u0275\u0275text(23, "Gesti\xF3n de Albaranes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 14)(25, "button", 15);
    \u0275\u0275listener("click", function VerAvisosComponent_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.crearTrabajoRealizado());
    });
    \u0275\u0275element(26, "ion-icon", 16);
    \u0275\u0275elementStart(27, "span", 17);
    \u0275\u0275text(28, "Crear parte de trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 18);
    \u0275\u0275text(30, "Crear trabajo");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(31, VerAvisosComponent_div_31_Template, 3, 1, "div", 19);
    \u0275\u0275elementStart(32, "div", 20)(33, "span");
    \u0275\u0275text(34, "Lista de Trabajos Registrados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 21);
    \u0275\u0275template(36, VerAvisosComponent_div_36_Template, 5, 0, "div", 2)(37, VerAvisosComponent_div_37_Template, 7, 0, "div", 22)(38, VerAvisosComponent_table_38_Template, 19, 1, "table", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(39, VerAvisosComponent_div_39_Template, 9, 2, "div", 4);
    \u0275\u0275elementStart(40, "div", 5)(41, "div", 6)(42, "h2");
    \u0275\u0275text(43, "Galer\xEDa de im\xE1genes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 24)(45, "button", 25);
    \u0275\u0275listener("click", function VerAvisosComponent_Template_button_click_45_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.seleccionarImagenes());
    });
    \u0275\u0275element(46, "ion-icon", 16);
    \u0275\u0275elementStart(47, "span", 17);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span", 18);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "input", 26, 0);
    \u0275\u0275listener("change", function VerAvisosComponent_Template_input_change_51_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onFileSelected($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 27);
    \u0275\u0275template(54, VerAvisosComponent_div_54_Template, 4, 0, "div", 28)(55, VerAvisosComponent_div_55_Template, 4, 0, "div", 29)(56, VerAvisosComponent_div_56_Template, 10, 7, "div", 30);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275property("ngIf", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.aviso && !ctx.loading);
    \u0275\u0275advance(5);
    \u0275\u0275classMap(ctx.getEstadoClass(ctx.aviso == null ? null : ctx.aviso.estado));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx.aviso == null ? null : ctx.aviso.estado) || "Pendiente", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((ctx.aviso == null ? null : ctx.aviso.tipo) || "No especificado");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.aviso == null ? null : ctx.aviso.descripcion_problema);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngIf", ctx.aviso == null ? null : ctx.aviso.id);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx.loadingTrabajos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loadingTrabajos && (!ctx.trabajosRealizados || ctx.trabajosRealizados.length === 0));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loadingTrabajos && ctx.trabajosRealizados.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.aviso && ctx.aviso.albaranes && ctx.aviso.albaranes.length > 0);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx.subiendoImagenes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.subiendoImagenes ? "Subiendo..." : "A\xF1adir im\xE1genes");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.subiendoImagenes ? "Subiendo..." : "A\xF1adir");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx.subiendoImagenes);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx.aviso == null ? null : ctx.aviso.fotos) || (ctx.aviso == null ? null : ctx.aviso.fotos == null ? null : ctx.aviso.fotos.length) === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.aviso == null ? null : ctx.aviso.fotos);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe, CurrencyPipe, DatePipe, IonIcon, FlujoEstadoComponent], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  padding: 24px;\n}\n.back-button[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.back-button[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 16px;\n  background-color: white;\n  color: #4F46E5;\n  border: 1px solid #E5E7EB;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s ease;\n}\n.back-button[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%]:hover {\n  background-color: #F9FAFB;\n  border-color: #4F46E5;\n}\n.back-button[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n  text-align: center;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #4F46E5;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #6B7280;\n  margin: 0;\n}\n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #EF4444;\n}\n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: background-color 0.2s ease;\n}\n.loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]:hover, \n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]:hover {\n  background-color: rgb(57.7298578199, 47.6421800948, 225.8578199052);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.aviso-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.aviso-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #111827;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: rgb(57.7298578199, 47.6421800948, 225.8578199052);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: white;\n  color: #26262A;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  border: 1px solid rgba(125, 131, 152, 0.2431372549);\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #F9FAFB;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #EF4444;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background-color: #DC2626;\n}\n.btn-danger.btn-small[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 13px;\n}\n.info-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 18px;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n  margin-bottom: 24px;\n  overflow: hidden;\n}\n.info-card[_ngcontent-%COMP%]   h2.title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 500;\n  color: #111827;\n  margin: 0;\n  padding: 25px;\n}\n.info-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 500;\n  color: #111827;\n  margin: 0;\n}\n.info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 25px;\n  padding-bottom: 0px;\n}\n.info-card[_ngcontent-%COMP%]   .descripcion-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.info-card[_ngcontent-%COMP%]   .descripcion-content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  color: #6B7280;\n  font-size: 14px;\n  margin-bottom: 4px;\n}\n.info-card[_ngcontent-%COMP%]   .descripcion-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #111827;\n  font-size: 16px;\n}\n.badge-pendiente[_ngcontent-%COMP%] {\n  background-color: rgba(245, 158, 11, 0.1);\n  color: #F59E0B;\n  padding: 4px 12px;\n  border-radius: 16px;\n  font-size: 14px;\n  font-weight: 500;\n}\n.badge-estado-aviso[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.badge-estado-aviso.badge-pendiente[_ngcontent-%COMP%] {\n  background: #FEF3C7;\n  color: #92400E;\n}\n.badge-estado-aviso.badge-en-curso[_ngcontent-%COMP%] {\n  background: #DBEAFE;\n  color: #1E40AF;\n}\n.badge-estado-aviso.badge-pendiente[_ngcontent-%COMP%] {\n  background: #FEF3C7;\n  color: #92400E;\n}\n.badge-estado-aviso.badge-completado[_ngcontent-%COMP%] {\n  background: #10B981;\n  color: white;\n}\n.badge-estado-aviso.badge-pendiente-de-presupuesto[_ngcontent-%COMP%] {\n  background: #FCD34D;\n  color: #92400E;\n}\n.badge-estado-aviso.badge-listo-para-facturar[_ngcontent-%COMP%] {\n  background: #D1FAE5;\n  color: #059669;\n}\n.info-grid[_ngcontent-%COMP%] {\n  padding: 25px;\n  padding-top: 0px !important;\n  display: grid;\n  gap: 24px;\n}\n.info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  color: #6B7280;\n  font-size: 14px;\n  margin-bottom: 4px;\n}\n.info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #111827;\n  font-size: 16px;\n}\n.info-grid[_ngcontent-%COMP%]   .direccion-section[_ngcontent-%COMP%]   .btn-map[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: none;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n  color: white;\n  background-color: #4F46E5;\n  font-size: 16px;\n  border-radius: 50%;\n}\n.info-grid[_ngcontent-%COMP%]   .contacto-section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  color: #6B7280;\n  font-size: 14px;\n  margin-bottom: 4px;\n}\n.info-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n.cliente-info[_ngcontent-%COMP%], \n.direccion-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.cliente-info[_ngcontent-%COMP%]   .ver-cliente[_ngcontent-%COMP%], \n.direccion-info[_ngcontent-%COMP%]   .ver-cliente[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  text-decoration: none;\n  font-size: 14px;\n  cursor: pointer;\n}\n.cliente-info[_ngcontent-%COMP%]   .ver-cliente[_ngcontent-%COMP%]:hover, \n.direccion-info[_ngcontent-%COMP%]   .ver-cliente[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.contacto-items[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  margin-top: 8px;\n}\n.contacto-items[_ngcontent-%COMP%]   .contacto-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background-color: #EEF2FF;\n  color: #4F46E5;\n  padding: 6px 15px;\n  border-radius: 10px;\n  font-size: 14px;\n  font-weight: 500;\n}\n.estado-pendiente[_ngcontent-%COMP%] {\n  color: #F59E0B !important;\n  font-weight: 500;\n}\n.descripcion-content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.descripcion-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.5;\n}\n.gallery-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%] {\n  background: #F3F4F6;\n  border-radius: 30px;\n  width: auto;\n  height: auto;\n  padding: 2px 4px;\n}\n.gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]::part(indicator) {\n  background: none;\n}\n.gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {\n  --background: transparent;\n  --background-checked: white;\n  --background-hover: rgba(255,255,255,0.1);\n  --background-focused: rgba(255,255,255,0.2);\n  --border-radius: 50%;\n  --border-width: 0;\n  --indicator-color: transparent;\n  --color: #6B7280;\n  --color-checked: #4F46E5;\n  --margin-top: 0;\n  --margin-bottom: 0;\n  --margin-start: 0;\n  --margin-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  --padding-end: 0;\n  min-height: 30px;\n  min-width: 30px;\n  transition: all 0.2s ease;\n  position: relative;\n}\n.gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]::part(native) {\n  margin: 0;\n  padding: 0 6px;\n  height: 100%;\n}\n.gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]::part(indicator) {\n  display: none;\n}\n.gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button.segment-button-checked[_ngcontent-%COMP%] {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.gallery-actions[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.gallery-items[_ngcontent-%COMP%] {\n  padding: 24px;\n  display: grid;\n  gap: 16px;\n}\n.gallery-items[_ngcontent-%COMP%]   .uploading-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #4F46E5;\n}\n.gallery-items[_ngcontent-%COMP%]   .uploading-indicator[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-bottom: 12px;\n}\n.gallery-items[_ngcontent-%COMP%]   .uploading-indicator[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.gallery-items[_ngcontent-%COMP%]   .uploading-indicator[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 500;\n}\n.gallery-items[_ngcontent-%COMP%]   .no-images[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #6B7280;\n}\n.gallery-items[_ngcontent-%COMP%]   .no-images[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n}\n.gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 12px;\n  border: 1px solid #E5E7EB;\n  border-radius: 6px;\n}\n.gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: 4px;\n  margin-right: 16px;\n}\n.gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .image-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .image-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  color: #26262A;\n}\n.gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .image-info[_ngcontent-%COMP%]   span.file-info[_ngcontent-%COMP%] {\n  color: #6B7280;\n  font-size: 14px;\n  margin-top: 4px;\n}\n.gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .btn-delete[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n  color: #EF4444;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n}\n.gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .btn-delete[_ngcontent-%COMP%]:hover {\n  background-color: rgba(239, 68, 68, 0.1);\n  color: rgb(234.9802955665, 21.0197044335, 21.0197044335);\n}\n.gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .btn-delete[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.table-container[_ngcontent-%COMP%] {\n  padding: 0 24px 24px;\n}\n.table-search[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n}\n.table-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  padding: 7px 14px;\n  font-size: 1rem;\n  border: none;\n  background: #F9FBFF;\n  color: #26262A;\n}\n.table-search[_ngcontent-%COMP%]   .order-by[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #26262A;\n  font-size: 14px;\n}\n.table-search[_ngcontent-%COMP%]   .order-by[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  font-weight: 500;\n}\n.table-search[_ngcontent-%COMP%]   .order-by[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  font-size: 16px;\n}\n.custom-mat-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0 8px;\n  margin-bottom: 12px;\n}\n.custom-mat-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 14px;\n  font-weight: 400;\n  text-align: left;\n  padding: 8px 16px;\n  background: transparent;\n}\n.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: #F9FAFB;\n}\n.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  color: #26262A;\n  font-size: 14px;\n}\n.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n  border-top-left-radius: 8px;\n  border-bottom-left-radius: 8px;\n}\n.custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n  border-top-right-radius: 8px;\n  border-bottom-right-radius: 8px;\n}\n.descripcion-trabajo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 14px;\n  line-height: 1.4;\n}\n.descripcion-trabajo[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #6B7280;\n  font-size: 12px;\n}\n.materiales-info[_ngcontent-%COMP%]   .repuestos-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.materiales-info[_ngcontent-%COMP%]   .repuestos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #4B5563;\n  margin-bottom: 2px;\n  padding: 2px 6px;\n  background-color: #F3F4F6;\n  border-radius: 4px;\n  display: inline-block;\n  margin-right: 4px;\n  margin-bottom: 4px;\n}\n.materiales-info[_ngcontent-%COMP%]   .repuestos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.badge-estado[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.badge-estado.badge-pendiente[_ngcontent-%COMP%] {\n  background-color: var(--estado-pendiente-bg);\n  color: var(--estado-pendiente-color);\n}\n.badge-estado.badge-en-curso[_ngcontent-%COMP%] {\n  background-color: var(--estado-en-curso-bg);\n  color: var(--estado-en-curso-color);\n}\n.badge-estado.badge-completado[_ngcontent-%COMP%] {\n  background-color: var(--estado-completado-bg);\n  color: var(--estado-completado-color);\n}\n.badge-estado.badge-cancelado[_ngcontent-%COMP%] {\n  background-color: var(--estado-cancelado-bg);\n  color: var(--estado-cancelado-color);\n}\n.repuestos-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.repuestos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #4B5563;\n  margin-bottom: 4px;\n}\n.repuestos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.estado-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.estado-actions[_ngcontent-%COMP%]   .btn-small[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 13px;\n}\n.estado-actions[_ngcontent-%COMP%]   .estado-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-left: auto;\n}\n.estado-actions[_ngcontent-%COMP%]   .estado-badge.estado-pendiente[_ngcontent-%COMP%] {\n  background-color: #FEF3C7;\n  color: #92400E;\n}\n.estado-actions[_ngcontent-%COMP%]   .estado-badge.estado-en-curso[_ngcontent-%COMP%] {\n  background-color: #DCFCE7;\n  color: #166534;\n}\n.estado-actions[_ngcontent-%COMP%]   .estado-badge.estado-abierto[_ngcontent-%COMP%] {\n  background-color: #DBEAFE;\n  color: #1E40AF;\n}\n.estado-actions[_ngcontent-%COMP%]   .estado-badge.estado-cerrado[_ngcontent-%COMP%] {\n  background-color: #F3F4F6;\n  color: #374151;\n}\n.estado-actions[_ngcontent-%COMP%]   .estado-badge.estado-finalizado[_ngcontent-%COMP%] {\n  background-color: #ECFDF5;\n  color: #14532D;\n}\n.albaran-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  margin: 8px 0;\n}\n.albaran-info[_ngcontent-%COMP%]   .badge-albaran[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 10px;\n  border-radius: 16px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n  background: #10B981;\n  color: white;\n}\n.albaran-info[_ngcontent-%COMP%]   .badge-albaran[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.albaran-info[_ngcontent-%COMP%]   .badge-albaran.badge-finalizado[_ngcontent-%COMP%] {\n  background: #10B981;\n  color: white;\n}\n.albaran-info[_ngcontent-%COMP%]   .badge-albaran.badge-presupuesto-pendiente[_ngcontent-%COMP%] {\n  background: #F59E0B;\n  color: white;\n}\n.albaran-info[_ngcontent-%COMP%]   .badge-albaran.badge-otra-visita[_ngcontent-%COMP%] {\n  background: #EF4444;\n  color: white;\n}\n.albaran-info[_ngcontent-%COMP%]   .albaran-details[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #6B7280;\n  text-transform: capitalize;\n}\n.no-trabajos[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 20px 20px;\n  color: #6B7280;\n}\n.no-trabajos[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n}\n.no-repuestos[_ngcontent-%COMP%] {\n  color: #6B7280;\n  font-style: italic;\n  font-size: 14px;\n}\n.flujo-container[_ngcontent-%COMP%] {\n  padding: 0px 25px;\n}\n.flujo-subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6B7280;\n  font-weight: 400;\n  margin-left: 12px;\n}\n.card-header[_ngcontent-%COMP%]   .flujo-subtitle[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 4px;\n  margin-left: 0;\n}\n.flujo-section[_ngcontent-%COMP%] {\n  margin-top: 25px;\n  margin-bottom: 5px;\n}\n.flujo-section[_ngcontent-%COMP%]   .flujo-header[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.flujo-section[_ngcontent-%COMP%]   .flujo-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #1a202c;\n  margin: 0 0 4px 0;\n}\n.flujo-section[_ngcontent-%COMP%]   .flujo-header[_ngcontent-%COMP%]   .flujo-subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748b;\n  font-weight: 400;\n}\n.section-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin: 24px 0 20px 0;\n}\n.section-divider[_ngcontent-%COMP%]::before, \n.section-divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: #e2e8f0;\n}\n.section-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0 16px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #64748b;\n  background: white;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #64748b;\n}\n.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #cbd5e0;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  margin: 0 0 8px 0;\n  color: #4a5568;\n}\n.empty-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #a0aec0;\n}\n.desktop-only[_ngcontent-%COMP%] {\n  display: inline;\n}\n.mobile-only[_ngcontent-%COMP%] {\n  display: none;\n}\n.urgent-badge[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.urgent-badge.urgent[_ngcontent-%COMP%] {\n  background-color: #FEF2F2;\n  color: #DC2626;\n}\n.urgent-badge[_ngcontent-%COMP%]:not(.urgent) {\n  background-color: #F3F4F6;\n  color: #6B7280;\n}\n.cliente-nombre[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #111827;\n}\n.direccion-texto[_ngcontent-%COMP%] {\n  word-break: break-word;\n  line-height: 1.4;\n}\n.tipo-aviso[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #4F46E5;\n}\n.descripcion-texto[_ngcontent-%COMP%] {\n  line-height: 1.6;\n  color: #111827;\n}\n.image-title[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #111827;\n}\n.ver-cliente[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  color: #4F46E5;\n  text-decoration: none;\n  font-size: 14px;\n  cursor: pointer;\n  transition: color 0.2s ease;\n}\n.ver-cliente[_ngcontent-%COMP%]:hover {\n  color: rgb(41.1374407583, 30.5592417062, 217.4407582938);\n}\n.ver-cliente[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.no-images[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #6B7280;\n}\n.no-images[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #CBD5E0;\n  margin-bottom: 16px;\n}\n.no-images[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n}\n@media (max-width: 768px) {\n  [_nghost-%COMP%] {\n    padding: 16px;\n  }\n  .desktop-only[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .mobile-only[_ngcontent-%COMP%] {\n    display: inline;\n  }\n  .info-card[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n    border-radius: 12px;\n  }\n  .info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n    padding: 20px;\n    flex-direction: row;\n    align-items: center;\n    justify-content: start;\n    gap: 25px !important;\n  }\n  .info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .mobile-only.title[_ngcontent-%COMP%] {\n    display: block;\n    font-size: 18px;\n    font-weight: 500;\n    color: #111827;\n    margin: 0;\n  }\n  .info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%] {\n    width: auto;\n    justify-content: space-between;\n    gap: 12px;\n  }\n  .info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    display: none;\n    width: 100%;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .header-actions-jobs[_ngcontent-%COMP%] {\n    display: flex;\n    width: 100%;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .header-actions-jobs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .info-card[_ngcontent-%COMP%]   h2.title[_ngcontent-%COMP%] {\n    font-size: 16px;\n    padding: 20px;\n  }\n  .info-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .info-grid[_ngcontent-%COMP%] {\n    padding: 15px;\n    gap: 16px;\n  }\n  .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n    gap: 20px;\n  }\n  .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%] {\n    width: auto;\n  }\n  .info-grid[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    width: max-content;\n  }\n  .info-grid[_ngcontent-%COMP%]   .cliente-info[_ngcontent-%COMP%], \n   .info-grid[_ngcontent-%COMP%]   .direccion-info[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n  }\n  .info-grid[_ngcontent-%COMP%]   .contacto-items[_ngcontent-%COMP%] {\n    flex-direction: row;\n    gap: 8px;\n  }\n  .info-grid[_ngcontent-%COMP%]   .contacto-items[_ngcontent-%COMP%]   .contacto-item[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-start;\n  }\n  .info-grid[_ngcontent-%COMP%]   .contacto-items[_ngcontent-%COMP%]   .contacto-item.nombre-contacto[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .descripcion-content[_ngcontent-%COMP%] {\n    padding: 20px;\n    gap: 16px;\n  }\n  .gallery-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n    align-items: stretch;\n  }\n  .gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%] {\n    align-self: center;\n  }\n  .gallery-actions[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n    margin-left: 0;\n    width: 100%;\n    justify-content: center;\n  }\n  .gallery-items[_ngcontent-%COMP%] {\n    padding: 20px;\n    gap: 12px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 200px;\n    object-fit: cover;\n    border-radius: 8px;\n    margin-right: 0;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .image-info[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .btn-delete[_ngcontent-%COMP%] {\n    align-self: flex-end;\n  }\n  .table-container[_ngcontent-%COMP%] {\n    padding: 0 20px 20px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 8px 12px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    font-size: 12px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .descripcion-trabajo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .descripcion-trabajo[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .estado-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 6px;\n  }\n  .estado-actions[_ngcontent-%COMP%]   .btn-small[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    padding: 8px 12px;\n    font-size: 12px;\n  }\n  .flujo-container[_ngcontent-%COMP%] {\n    padding: 0 20px 20px;\n  }\n  .flujo-section[_ngcontent-%COMP%] {\n    margin-top: 20px;\n    margin-bottom: 0;\n  }\n  .section-divider[_ngcontent-%COMP%] {\n    margin: 20px 0 16px 0;\n  }\n  .section-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 13px;\n    padding: 0 12px;\n  }\n  .back-button[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n  .back-button[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n    font-size: 13px;\n  }\n  .badge-pendiente[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding: 3px 8px;\n  }\n  .materiales-info[_ngcontent-%COMP%]   .repuestos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 2px 4px;\n  }\n  .no-repuestos[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .empty-state[_ngcontent-%COMP%] {\n    padding: 30px 16px;\n  }\n  .empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 40px;\n  }\n  .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .empty-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .urgent-badge[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 2px 6px;\n  }\n  .ver-cliente[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .ver-cliente[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .no-images[_ngcontent-%COMP%] {\n    padding: 30px 16px;\n  }\n  .no-images[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 40px;\n  }\n  .no-images[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\n@media (max-width: 480px) {\n  [_nghost-%COMP%] {\n    padding: 0px;\n  }\n  .info-card[_ngcontent-%COMP%] {\n    margin-bottom: 12px;\n    border-radius: 8px;\n  }\n  .info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n    padding: 16px;\n    gap: 8px;\n  }\n  .info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .info-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .info-card[_ngcontent-%COMP%]   h2.title[_ngcontent-%COMP%] {\n    font-size: 15px;\n    padding: 16px;\n    display: none;\n  }\n  .info-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 15px !important;\n  }\n  .descripcion-content[_ngcontent-%COMP%] {\n    padding: 16px;\n    gap: 12px;\n  }\n  .descripcion-content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .descripcion-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .gallery-actions[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .gallery-actions[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n    font-size: 13px;\n  }\n  .gallery-items[_ngcontent-%COMP%] {\n    padding: 16px;\n    gap: 8px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    height: 150px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .image-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .image-info[_ngcontent-%COMP%]   span.file-info[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .table-container[_ngcontent-%COMP%] {\n    padding: 0 16px 16px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    font-size: 10px;\n    padding: 6px 8px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 8px;\n    font-size: 11px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .descripcion-trabajo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .descripcion-trabajo[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .estado-actions[_ngcontent-%COMP%] {\n    gap: 4px;\n  }\n  .estado-actions[_ngcontent-%COMP%]   .btn-small[_ngcontent-%COMP%] {\n    padding: 6px 8px;\n    font-size: 11px;\n  }\n  .flujo-container[_ngcontent-%COMP%] {\n    padding: 0 16px 16px;\n  }\n  .flujo-section[_ngcontent-%COMP%] {\n    margin-top: 16px;\n  }\n  .section-divider[_ngcontent-%COMP%] {\n    margin: 16px 0 12px 0;\n  }\n  .section-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding: 0 8px;\n  }\n  .back-button[_ngcontent-%COMP%] {\n    margin-bottom: 12px;\n  }\n  .back-button[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%] {\n    padding: 6px 10px;\n    font-size: 12px;\n  }\n  .badge-pendiente[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 2px 6px;\n  }\n  .materiales-info[_ngcontent-%COMP%]   .repuestos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    font-size: 10px;\n    padding: 1px 3px;\n  }\n  .no-repuestos[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .empty-state[_ngcontent-%COMP%] {\n    padding: 24px 12px;\n  }\n  .empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 36px;\n  }\n  .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .empty-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .btn-primary[_ngcontent-%COMP%], \n   .btn-secondary[_ngcontent-%COMP%], \n   .btn-danger[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n    font-size: 13px;\n  }\n  ion-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .urgent-badge[_ngcontent-%COMP%] {\n    font-size: 10px;\n    padding: 1px 4px;\n  }\n  .ver-cliente[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .ver-cliente[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .no-images[_ngcontent-%COMP%] {\n    padding: 24px 12px;\n  }\n  .no-images[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 36px;\n  }\n  .no-images[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n}\n@media (max-width: 768px) {\n  .custom-mat-table[_ngcontent-%COMP%] {\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    display: block;\n    margin-bottom: 8px;\n    border-radius: 8px;\n    background: #F9FAFB;\n    padding: 12px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .custom-mat-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: block;\n    text-align: left;\n    padding: 4px 0;\n    border: none;\n    white-space: normal;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:before, \n   .custom-mat-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:before {\n    content: attr(data-label) ": ";\n    font-weight: 600;\n    color: #6B7280;\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    font-size: 13px;\n    line-height: 1.4;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   td.descripcion-trabajo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 0 0 4px 0;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   td.materiales-info[_ngcontent-%COMP%]   .repuestos-list[_ngcontent-%COMP%] {\n    margin-top: 4px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   td.materiales-info[_ngcontent-%COMP%]   .repuestos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    display: inline-block;\n    margin: 2px 4px 2px 0;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   td.estado-actions[_ngcontent-%COMP%] {\n    margin-top: 8px;\n    padding-top: 8px;\n    border-top: 1px solid #E5E7EB;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   td.estado-actions[_ngcontent-%COMP%]:before {\n    content: "Acciones: ";\n  }\n  .estado-actions[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 8px;\n    flex-wrap: wrap;\n  }\n  .estado-actions[_ngcontent-%COMP%]   .btn-small[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 80px;\n    max-width: 120px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%] {\n    border: 1px solid #E5E7EB;\n    border-radius: 8px;\n    padding: 12px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    border-radius: 6px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .image-info[_ngcontent-%COMP%] {\n    margin: 8px 0;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .image-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: block;\n    margin-bottom: 2px;\n  }\n  .badge-estado[_ngcontent-%COMP%] {\n    display: inline-block;\n    margin: 2px 0;\n  }\n  .btn-map[_ngcontent-%COMP%] {\n    min-width: 36px;\n    height: 36px;\n  }\n  .btn-map[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .contacto-items[_ngcontent-%COMP%]   .contacto-item[_ngcontent-%COMP%] {\n    border-radius: 6px;\n    padding: 6px 10px;\n    font-size: 13px;\n  }\n  .contacto-items[_ngcontent-%COMP%]   .contacto-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .empty-state[_ngcontent-%COMP%] {\n    background: #F9FAFB;\n    border-radius: 8px;\n    margin: 16px 0;\n  }\n  .loading-state[_ngcontent-%COMP%] {\n    min-height: 150px;\n  }\n  .error-state[_ngcontent-%COMP%] {\n    min-height: 150px;\n  }\n  .error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n    background: #FEF2F2;\n    border: 1px solid #FECACA;\n    border-radius: 8px;\n    padding: 20px;\n  }\n  .error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    color: #DC2626;\n  }\n  .header-container[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%] {\n    margin-bottom: 0;\n  }\n  .gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%] {\n    --background: #F3F4F6;\n    --background-checked: white;\n    --color: #6B7280;\n    --color-checked: #4F46E5;\n  }\n  .gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {\n    --background: transparent;\n    --background-checked: white;\n    --color: #6B7280;\n    --color-checked: #4F46E5;\n    --indicator-color: transparent;\n    --border-radius: 50%;\n    --margin: 0;\n    --padding: 0;\n    min-height: 32px;\n    min-width: 32px;\n  }\n  .gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .flujo-section[_ngcontent-%COMP%]   .flujo-container[_ngcontent-%COMP%] {\n    padding: 0 16px 16px;\n  }\n  .section-divider[_ngcontent-%COMP%] {\n    margin: 16px 0 12px 0;\n  }\n  .section-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding: 0 10px;\n    background: white;\n    color: #6B7280;\n  }\n  .cliente-info[_ngcontent-%COMP%]   .cliente-nombre[_ngcontent-%COMP%] {\n    font-size: 14px;\n    line-height: 1.3;\n  }\n  .direccion-info[_ngcontent-%COMP%]   .direccion-texto[_ngcontent-%COMP%] {\n    font-size: 13px;\n    line-height: 1.4;\n  }\n  .descripcion-content[_ngcontent-%COMP%]   .tipo-aviso[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .descripcion-content[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n}\n@media (max-width: 480px) {\n  .custom-mat-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:before {\n    font-size: 10px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   .estado-actions[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: end;\n    gap: 20px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   .estado-actions[_ngcontent-%COMP%]   .btn-small[_ngcontent-%COMP%] {\n    min-width: 70px;\n    max-width: 100px;\n    font-size: 11px;\n    padding: 6px 8px;\n  }\n  .custom-mat-table[_ngcontent-%COMP%]   .estado-actions[_ngcontent-%COMP%]   .btn-small[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%] {\n    padding: 8px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    height: 120px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .image-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .gallery-items[_ngcontent-%COMP%]   .gallery-item[_ngcontent-%COMP%]   .image-info[_ngcontent-%COMP%]   span.file-info[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .contacto-items[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n  }\n  .contacto-items[_ngcontent-%COMP%]   .contacto-item[_ngcontent-%COMP%] {\n    padding: 4px 8px;\n    font-size: 12px;\n  }\n  .contacto-items[_ngcontent-%COMP%]   .contacto-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .btn-map[_ngcontent-%COMP%] {\n    min-width: 32px;\n    height: 32px;\n  }\n  .btn-map[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .empty-state[_ngcontent-%COMP%] {\n    padding: 20px 12px;\n  }\n  .empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 32px;\n  }\n  .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .empty-state[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .loading-state[_ngcontent-%COMP%], \n   .error-state[_ngcontent-%COMP%] {\n    min-height: 120px;\n  }\n  .loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n   .loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n   .error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n   .error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 36px;\n  }\n  .loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .loading-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .error-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {\n    min-height: 28px;\n    min-width: 28px;\n  }\n  .gallery-actions[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .btn-primary[_ngcontent-%COMP%], \n   .btn-secondary[_ngcontent-%COMP%], \n   .btn-danger[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n    font-size: 13px;\n    min-height: 40px;\n  }\n  .flujo-section[_ngcontent-%COMP%]   .flujo-container[_ngcontent-%COMP%] {\n    padding: 0 12px 12px;\n  }\n  .section-divider[_ngcontent-%COMP%] {\n    margin: 12px 0 8px 0;\n  }\n  .section-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 0 8px;\n  }\n  .cliente-info[_ngcontent-%COMP%]   .cliente-nombre[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .direccion-info[_ngcontent-%COMP%]   .direccion-texto[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .descripcion-content[_ngcontent-%COMP%]   .tipo-aviso[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .descripcion-content[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n.albaranes-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.albaran-item[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s ease;\n}\n.albaran-item[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transform: translateY(-2px);\n}\n.albaran-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 16px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid #E5E7EB;\n}\n.albaran-header[_ngcontent-%COMP%]   .albaran-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #1F2937;\n}\n.albaran-header[_ngcontent-%COMP%]   .albaran-info[_ngcontent-%COMP%]   .fecha-albaran[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6B7280;\n  font-weight: 500;\n}\n.albaran-header[_ngcontent-%COMP%]   .estado-albaran[_ngcontent-%COMP%]   .badge-estado[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.albaran-header[_ngcontent-%COMP%]   .estado-albaran[_ngcontent-%COMP%]   .badge-estado.badge-finalizado[_ngcontent-%COMP%] {\n  background: #D1FAE5;\n  color: #065F46;\n}\n.albaran-header[_ngcontent-%COMP%]   .estado-albaran[_ngcontent-%COMP%]   .badge-estado.badge-presupuesto-pendiente[_ngcontent-%COMP%] {\n  background: #FEF3C7;\n  color: #92400E;\n}\n.albaran-header[_ngcontent-%COMP%]   .estado-albaran[_ngcontent-%COMP%]   .badge-estado.badge-otra-visita[_ngcontent-%COMP%] {\n  background: #DBEAFE;\n  color: #1E40AF;\n}\n.albaran-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.albaran-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n.albaran-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.albaran-details[_ngcontent-%COMP%]   .detail-item.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.albaran-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #6B7280;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.albaran-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.albaran-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #1F2937;\n  margin: 0;\n}\n.albaran-details[_ngcontent-%COMP%]   .detail-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.5;\n  background: #F9FAFB;\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid #E5E7EB;\n}\n.albaran-details[_ngcontent-%COMP%]   .repuestos-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.albaran-details[_ngcontent-%COMP%]   .repuestos-tags[_ngcontent-%COMP%]   .repuesto-tag[_ngcontent-%COMP%] {\n  background: #E0F2FE;\n  color: #0C4A6E;\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  border: 1px solid #BAE6FD;\n}\n@media (max-width: 768px) {\n  .albaranes-container[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n  .albaran-item[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .albaran-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n    align-items: flex-start;\n  }\n  .albaran-header[_ngcontent-%COMP%]   .estado-albaran[_ngcontent-%COMP%] {\n    align-self: flex-start;\n  }\n  .albaran-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n}\n/*# sourceMappingURL=ver-avisos.component.css.map */'] });
var VerAvisosComponent = _VerAvisosComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VerAvisosComponent, [{
    type: Component,
    args: [{ selector: "app-ver-avisos", standalone: true, imports: [CommonModule, IonIcon, FlujoEstadoComponent], template: `<!-- Loading State -->\r
<div *ngIf="loading" class="loading-state">\r
  <div class="loading-spinner">\r
    <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
    <p>Cargando aviso...</p>\r
  </div>\r
</div>\r
\r
<!-- Error State -->\r
<div *ngIf="error && !loading" class="error-state">\r
  <div class="error-message">\r
    <ion-icon name="alert-circle-outline"></ion-icon>\r
    <p>{{ error }}</p>\r
    <button class="btn-retry" (click)="cargarAviso()">\r
      <ion-icon name="refresh-outline"></ion-icon>\r
      Reintentar\r
    </button>\r
  </div>\r
</div>\r
\r
<!-- Informaci\xF3n General -->\r
<div *ngIf="aviso && !loading" class="info-card">\r
  <div class="card-header">\r
    <div class="header-container">\r
      <!-- Bot\xF3n de volver -->\r
      <div class="back-button">\r
        <button class="btn-back" (click)="volverALista()">\r
          <ion-icon name="arrow-back-outline"></ion-icon>\r
          <span class="desktop-only">Volver</span>\r
          <span class="mobile-only">Volver</span>\r
        </button>\r
      </div>\r
    </div>\r
    <div class="header-actions">\r
      <!-- Solo mostrar bot\xF3n de completar si el aviso NO est\xE1 completado -->\r
      <button \r
        *ngIf="aviso?.estado !== 'Completado'" \r
        class="btn-secondary" \r
        (click)="completarAviso()">\r
        <ion-icon name="close"></ion-icon>\r
        <span class="desktop-only">Completar Aviso</span>\r
        <span class="mobile-only">Completar</span>\r
      </button>\r
      \r
      <!-- Solo mostrar bot\xF3n de editar si el aviso NO est\xE1 completado -->\r
      <button \r
        *ngIf="aviso?.estado !== 'Completado'" \r
        class="btn-primary" \r
        (click)="editarAviso()">\r
        <ion-icon name="pencil-outline"></ion-icon>\r
        <span class="desktop-only">Editar aviso</span>\r
        <span class="mobile-only">Editar</span>\r
      </button>\r
      \r
      <!-- Mostrar mensaje cuando el aviso est\xE9 completado -->\r
      <div *ngIf="aviso?.estado === 'Completado'" class="aviso-completado-message">\r
        <ion-icon name="checkmark-circle-outline"></ion-icon>\r
        <span>Aviso completado</span>\r
      </div>\r
    </div>\r
    <span class="mobile-only title">Aviso #{{aviso.id?.substring(0, 8)}}</span>\r
  </div>\r
\r
  <h2 class="title">\r
    <span class="desktop-only">Informaci\xF3n general del Aviso - #{{aviso.id?.substring(0, 8)}}</span>\r
  </h2>\r
\r
  <div class="info-grid">\r
    <div class="info-row">\r
      <div class="info-item">\r
        <label>Estado</label>\r
        <span class="estado-pendiente">{{aviso.estado}}</span>\r
      </div>\r
      <div class="info-item">\r
        <label>Urgente</label>\r
        <span class="urgent-badge" [class.urgent]="aviso.urgencia === 'Alta' || aviso.es_urgente">\r
          {{aviso.urgencia === 'Alta' || aviso.es_urgente ? 'S\xED' : 'No'}}\r
        </span>\r
      </div>\r
      <div class="info-item">\r
        <label>Fecha de creaci\xF3n</label>\r
        <span>{{aviso.fecha_creacion | date:'dd/MM/yyyy'}}</span>\r
      </div>\r
    </div>\r
\r
    <div class="info-item cliente-section">\r
      <label>Cliente</label>\r
      <div class="cliente-info">\r
        <span class="cliente-nombre">{{aviso.nombre_cliente_aviso}}</span>\r
        <a class="ver-cliente" (click)="verCliente()">\r
          <span class="desktop-only">Ver cliente</span>\r
        </a>\r
      </div>\r
    </div>\r
\r
    <div class="info-item direccion-section">\r
      <label>Direcci\xF3n</label>\r
      <div class="direccion-info">\r
        <span class="direccion-texto">{{aviso.direccion_cliente_aviso}}</span>\r
        <button class="btn-map" (click)="verMapa()" title="Ver en mapa">\r
          <ion-icon name="navigate"></ion-icon>\r
        </button>\r
      </div>\r
    </div>\r
\r
    <div class="contacto-section">\r
      <label>Contacto Cliente</label>\r
      <div class="contacto-items">\r
        <div class="contacto-item nombre-contacto" *ngIf="aviso.nombre_contacto">\r
          <ion-icon name="person"></ion-icon>\r
          <span>{{aviso.nombre_contacto}}</span>\r
        </div>\r
        <div class="contacto-item" *ngIf="aviso.telefono_cliente_aviso">\r
          <ion-icon name="call"></ion-icon>\r
          <span>{{aviso.telefono_cliente_aviso}}</span>\r
        </div>\r
        <div class="contacto-item" *ngIf="aviso.cliente?.email">\r
          <ion-icon name="mail"></ion-icon>\r
          <span>{{aviso.cliente?.email}}</span>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- Descripci\xF3n del Aviso -->\r
<div class="info-card">\r
  <div class="card-header" style="justify-content: space-between!important;">\r
    <h2>Descripci\xF3n del Aviso</h2>\r
    <span class="badge-estado-aviso" [class]="getEstadoClass(aviso?.estado)">\r
      {{aviso?.estado || 'Pendiente'}}\r
    </span>\r
  </div>\r
\r
  <div class="descripcion-content">\r
    <div class="info-item">\r
      <label>Tipo de Aviso</label>\r
      <p class="tipo-aviso">{{aviso?.tipo || 'No especificado'}}</p>\r
    </div>\r
\r
    <div class="info-item">\r
      <label>Descripci\xF3n Detallada del Problema/Petici\xF3n</label>\r
      <p class="descripcion-texto">{{aviso?.descripcion_problema}}</p>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- ================================= -->\r
<!-- SECCI\xD3N REORGANIZADA: TRABAJOS Y FLUJO JUNTOS -->\r
<!-- ================================= -->\r
\r
<!-- Trabajos Realizados y Gesti\xF3n del Flujo -->\r
<div class="info-card">\r
  <div class="card-header">\r
    <h2 style="text-wrap: nowrap;">Gesti\xF3n de Albaranes</h2>\r
    <div class="header-actions-jobs">\r
      <button class="btn-primary" (click)="crearTrabajoRealizado()">\r
        <ion-icon name="add-circle"></ion-icon>\r
        <span class="desktop-only">Crear parte de trabajo</span>\r
        <span class="mobile-only">Crear trabajo</span>\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Gesti\xF3n del Flujo Autom\xE1tico - MOVIDO AQU\xCD -->\r
  <div class="flujo-section" *ngIf="aviso?.id">\r
    <div class="flujo-container">\r
      <app-flujo-estado [avisoId]="aviso?.id || ''" (accionEjecutada)="onAccionFlujoEjecutada($event)">\r
      </app-flujo-estado>\r
    </div>\r
  </div>\r
\r
  <!-- Separador visual -->\r
  <div class="section-divider">\r
    <span>Lista de Trabajos Registrados</span>\r
  </div>\r
\r
  <!-- Tabla de trabajos realizados -->\r
  <div class="table-container">\r
    <!-- Loading State -->\r
    <div *ngIf="loadingTrabajos" class="loading-state">\r
      <div class="loading-spinner">\r
        <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
        <p>Cargando trabajos...</p>\r
      </div>\r
    </div>\r
\r
    <!-- No hay trabajos -->\r
    <div *ngIf="!loadingTrabajos && (!trabajosRealizados || trabajosRealizados.length === 0)" class="no-trabajos">\r
      <div class="empty-state">\r
        <ion-icon name="construct-outline"></ion-icon>\r
        <p>No hay trabajos realizados para este aviso</p>\r
        <small>Crea el primer parte de trabajo para comenzar</small>\r
      </div>\r
    </div>\r
\r
    <!-- Tabla de trabajos -->\r
    <table *ngIf="!loadingTrabajos && trabajosRealizados.length > 0" class="custom-mat-table">\r
      <thead>\r
        <tr>\r
          <th>N\xFAmero</th>\r
          <th>Fecha trabajo</th>\r
          <th>Horas</th>\r
          <th>Descripci\xF3n</th>\r
          <th>Materiales</th>\r
          <th>Estado</th>\r
          <th>Acciones</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
        <tr *ngFor="let trabajo of trabajosRealizados; let i = index">\r
          <td data-label="N\xFAmero">#{{i + 1}}</td>\r
          <td data-label="Fecha trabajo">{{trabajo.fecha_trabajo | date:'dd/MM/yyyy'}}</td>\r
          <td data-label="Horas">{{calcularHorasTrabajo(trabajo) | number:'1.1-1'}}h</td>\r
          <td data-label="Descripci\xF3n">\r
            <div class="descripcion-trabajo">\r
              <p>{{trabajo.descripcion}}</p>\r
              <small>{{trabajo.hora_inicio}} - {{trabajo.hora_fin}}</small>\r
            </div>\r
          </td>\r
          <td data-label="Materiales">\r
            <div class="materiales-info">\r
              <!-- Mostrar materiales con cantidades reales si est\xE1n disponibles -->\r
              <ul class="repuestos-list" *ngIf="trabajo.materiales && trabajo.materiales.length > 0">\r
                <li *ngFor="let material of trabajo.materiales">\r
                  {{material.material?.nombre || 'Material'}}: {{material.cantidad_utilizada}} {{material.material?.unidad || 'unidad'}}\r
                </li>\r
              </ul>\r
              <!-- Fallback a repuestos b\xE1sicos si no hay materiales detallados -->\r
              <ul class="repuestos-list" *ngIf="(!trabajo.materiales || trabajo.materiales.length === 0) && trabajo.repuestos && trabajo.repuestos.length > 0">\r
                <li *ngFor="let repuesto of trabajo.repuestos">{{repuesto}}</li>\r
              </ul>\r
              <span *ngIf="(!trabajo.materiales || trabajo.materiales.length === 0) && (!trabajo.repuestos || trabajo.repuestos.length === 0)" class="no-repuestos">\r
                Sin materiales\r
              </span>\r
            </div>\r
          </td>\r
          <td data-label="Estado">\r
            <span class="badge-estado" [class]="'badge-' + trabajo.estado.toLowerCase().replace(' ', '-')">\r
              {{trabajo.estado}}\r
            </span>\r
          </td>\r
          <td data-label="Acciones">\r
            <div class="estado-actions">\r
              <!-- Bot\xF3n de Hacer Albar\xE1n (solo si el trabajo est\xE1 en estado "En curso" o "Abierto") -->\r
              <button \r
                *ngIf="trabajo.estado === 'En curso' || trabajo.estado === 'Abierto'"\r
                class="btn-primary btn-small" \r
                (click)="hacerAlbaran(trabajo)" \r
                title="Hacer albar\xE1n">\r
                <ion-icon name="document-text-outline"></ion-icon>\r
                <span class="desktop-only">Crear Albar\xE1n</span>\r
                <span class="mobile-only">Albar\xE1n</span>\r
              </button>\r
              \r
              <!-- Mostrar informaci\xF3n del albar\xE1n si existe -->\r
              <div *ngIf="trabajo.albaran_id" class="albaran-info">\r
                <span class="badge-albaran" [class]="'badge-' + getAlbaranEstado(trabajo)">\r
                  <ion-icon name="checkmark-circle-outline"></ion-icon>\r
                  Albar\xE1n Cerrado\r
                </span>\r
                <small class="albaran-details">\r
                  {{ getAlbaranEstado(trabajo) }}\r
                </small>\r
              </div>\r
              \r
              <!-- Bot\xF3n de Editar (solo si no est\xE1 cerrado) -->\r
              <button \r
                *ngIf="trabajo.estado !== 'Cerrado' && trabajo.estado !== 'Finalizado'"\r
                class="btn-secondary btn-small" \r
                (click)="editarTrabajo(trabajo)" \r
                title="Editar trabajo">\r
                <ion-icon name="pencil-outline"></ion-icon>\r
                <span class="desktop-only">Editar</span>\r
                <span class="mobile-only">Editar</span>\r
              </button>\r
              \r
              <!-- Bot\xF3n de Eliminar (solo si no est\xE1 cerrado) -->\r
              <button \r
                *ngIf="trabajo.estado !== 'Cerrado' && trabajo.estado !== 'Finalizado'"\r
                class="btn-danger btn-small" \r
                (click)="eliminarTrabajo(trabajo)" \r
                title="Eliminar trabajo">\r
                <ion-icon name="trash-outline"></ion-icon>\r
                <span class="desktop-only">Eliminar</span>\r
                <span class="mobile-only">Eliminar</span>\r
              </button>\r
            </div>\r
          </td>\r
        </tr>\r
      </tbody>\r
    </table>\r
  </div>\r
</div>\r
\r
<!-- Albaranes Cerrados -->\r
<div class="info-card" *ngIf="aviso && aviso.albaranes && aviso.albaranes.length > 0">\r
  <div class="card-header">\r
    <h2>Albaranes Cerrados</h2>\r
    <div class="header-actions">\r
      <span class="badge-info">Total: {{aviso.albaranes.length}}</span>\r
    </div>\r
  </div>\r
\r
  <div class="albaranes-container">\r
    <div class="albaran-item" *ngFor="let albaran of aviso.albaranes; let i = index">\r
      <div class="albaran-header">\r
        <div class="albaran-info">\r
          <h4>Albar\xE1n #{{i + 1}}</h4>\r
          <span class="fecha-albaran">{{albaran.fecha_cierre | date:'dd/MM/yyyy'}}</span>\r
        </div>\r
        <div class="estado-albaran">\r
          <span class="badge-estado" [class]="'badge-' + albaran.estado_cierre.toLowerCase().replace(' ', '-')">\r
            {{albaran.estado_cierre}}\r
          </span>\r
        </div>\r
      </div>\r
      \r
      <div class="albaran-details">\r
        <div class="detail-row">\r
          <div class="detail-item">\r
            <label>Horario:</label>\r
            <span>{{albaran.hora_entrada}} - {{albaran.hora_salida}}</span>\r
          </div>\r
          <div class="detail-item" *ngIf="albaran.presupuesto_necesario > 0">\r
            <label>Presupuesto:</label>\r
            <span>{{albaran.presupuesto_necesario | currency:'EUR':'symbol':'1.2-2'}}</span>\r
          </div>\r
        </div>\r
        \r
        <div class="detail-item full-width">\r
          <label>Descripci\xF3n del trabajo:</label>\r
          <p>{{albaran.descripcion_trabajo_realizado}}</p>\r
        </div>\r
        \r
        <div class="detail-item full-width" *ngIf="albaran.repuestos_utilizados && albaran.repuestos_utilizados.length > 0">\r
          <label>Repuestos utilizados:</label>\r
          <div class="repuestos-tags">\r
            <!-- Mostrar repuestos con cantidades reales si est\xE1n disponibles -->\r
            <span class="repuesto-tag" *ngFor="let repuesto of albaran.repuestos_utilizados">\r
              <ng-container *ngIf="repuesto.cantidad; else repuestoBasico">\r
                {{repuesto.nombre}}: {{repuesto.cantidad}} {{repuesto.unidad || 'unidad'}}\r
              </ng-container>\r
              <ng-template #repuestoBasico>\r
                {{repuesto}}\r
              </ng-template>\r
            </span>\r
          </div>\r
        </div>\r
        \r
        <div class="detail-row" *ngIf="albaran.dni_cliente || albaran.nombre_firma">\r
          <div class="detail-item" *ngIf="albaran.dni_cliente">\r
            <label>DNI Cliente:</label>\r
            <span>{{albaran.dni_cliente}}</span>\r
          </div>\r
          <div class="detail-item" *ngIf="albaran.nombre_firma">\r
            <label>Firmado por:</label>\r
            <span>{{albaran.nombre_firma}}</span>\r
          </div>\r
        </div>\r
        \r
        <div class="detail-item full-width" *ngIf="albaran.observaciones">\r
          <label>Observaciones:</label>\r
          <p>{{albaran.observaciones}}</p>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- Galer\xEDa de im\xE1genes -->\r
<div class="info-card">\r
  <div class="card-header" style="justify-content: space-between!important;">\r
    <h2>Galer\xEDa de im\xE1genes</h2>\r
    <div class="gallery-actions">\r
      <!-- <ion-segment [value]="vistaGaleria" (ionChange)="cambiarVistaGaleria($event)" mode="ios">\r
        <ion-segment-button value="grid">\r
          <ion-icon name="grid-outline"></ion-icon>\r
        </ion-segment-button>\r
        <ion-segment-button value="list">\r
          <ion-icon name="list-outline"></ion-icon>\r
        </ion-segment-button>\r
      </ion-segment> -->\r
      <button class="btn-primary" (click)="seleccionarImagenes()" [disabled]="subiendoImagenes">\r
        <ion-icon name="add-circle"></ion-icon>\r
        <span class="desktop-only">{{ subiendoImagenes ? 'Subiendo...' : 'A\xF1adir im\xE1genes' }}</span>\r
        <span class="mobile-only">{{ subiendoImagenes ? 'Subiendo...' : 'A\xF1adir' }}</span>\r
      </button>\r
      <input #fileInput type="file" multiple accept="image/*" style="display: none;" (change)="onFileSelected($event)">\r
    </div>\r
  </div>\r
\r
  <div class="gallery-items">\r
    <!-- Indicador de carga al subir im\xE1genes -->\r
    <div *ngIf="subiendoImagenes" class="uploading-indicator">\r
      <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
      <p>Subiendo im\xE1genes...</p>\r
    </div>\r
\r
    <div *ngIf="!aviso?.fotos || aviso?.fotos?.length === 0" class="no-images">\r
      <ion-icon name="images-outline"></ion-icon>\r
      <p>No hay im\xE1genes disponibles para este aviso</p>\r
    </div>\r
    <div class="gallery-item" *ngFor="let foto of aviso?.fotos">\r
      <img [src]="foto.url" [alt]="foto.descripcion || 'Imagen del aviso'">\r
      <div class="image-info">\r
        <span class="image-title">{{foto.descripcion || 'Imagen del aviso'}}</span>\r
        <span class="file-info">{{foto.fecha_subida | date:'dd/MM/yyyy HH:mm'}}</span>\r
      </div>\r
      <button class="btn-delete" (click)="eliminarFoto(foto)" title="Eliminar imagen">\r
        <ion-icon name="trash-outline"></ion-icon>\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ['/* src/app/modules/avisos/components/ver-avisos/ver-avisos.component.scss */\n:host {\n  display: block;\n  padding: 24px;\n}\n.back-button {\n  margin-bottom: 24px;\n}\n.back-button .btn-back {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 16px;\n  background-color: white;\n  color: #4F46E5;\n  border: 1px solid #E5E7EB;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s ease;\n}\n.back-button .btn-back:hover {\n  background-color: #F9FAFB;\n  border-color: #4F46E5;\n}\n.back-button .btn-back ion-icon {\n  font-size: 18px;\n}\n.loading-state,\n.error-state {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n  text-align: center;\n}\n.loading-state .loading-spinner,\n.loading-state .error-message,\n.error-state .loading-spinner,\n.error-state .error-message {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.loading-state .loading-spinner ion-icon,\n.loading-state .error-message ion-icon,\n.error-state .loading-spinner ion-icon,\n.error-state .error-message ion-icon {\n  font-size: 48px;\n  color: #4F46E5;\n}\n.loading-state .loading-spinner ion-icon.spinning,\n.loading-state .error-message ion-icon.spinning,\n.error-state .loading-spinner ion-icon.spinning,\n.error-state .error-message ion-icon.spinning {\n  animation: spin 1s linear infinite;\n}\n.loading-state .loading-spinner p,\n.loading-state .error-message p,\n.error-state .loading-spinner p,\n.error-state .error-message p {\n  font-size: 16px;\n  color: #6B7280;\n  margin: 0;\n}\n.loading-state .error-message ion-icon,\n.error-state .error-message ion-icon {\n  color: #EF4444;\n}\n.loading-state .error-message .btn-retry,\n.error-state .error-message .btn-retry {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: background-color 0.2s ease;\n}\n.loading-state .error-message .btn-retry:hover,\n.error-state .error-message .btn-retry:hover {\n  background-color: rgb(57.7298578199, 47.6421800948, 225.8578199052);\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.aviso-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.aviso-header h1 {\n  font-size: 24px;\n  font-weight: 600;\n  color: #111827;\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.btn-primary {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n}\n.btn-primary:hover {\n  background-color: rgb(57.7298578199, 47.6421800948, 225.8578199052);\n}\n.btn-secondary {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: white;\n  color: #26262A;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  border: 1px solid rgba(125, 131, 152, 0.2431372549);\n}\n.btn-secondary:hover {\n  background-color: #F9FAFB;\n}\n.btn-danger {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #EF4444;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n}\n.btn-danger:hover {\n  background-color: #DC2626;\n}\n.btn-danger.btn-small {\n  padding: 6px 12px;\n  font-size: 13px;\n}\n.info-card {\n  background: #fff;\n  border-radius: 18px;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n  margin-bottom: 24px;\n  overflow: hidden;\n}\n.info-card h2.title {\n  font-size: 18px;\n  font-weight: 500;\n  color: #111827;\n  margin: 0;\n  padding: 25px;\n}\n.info-card h2 {\n  font-size: 18px;\n  font-weight: 500;\n  color: #111827;\n  margin: 0;\n}\n.info-card .card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 25px;\n  padding-bottom: 0px;\n}\n.info-card .descripcion-content {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.info-card .descripcion-content label {\n  display: block;\n  color: #6B7280;\n  font-size: 14px;\n  margin-bottom: 4px;\n}\n.info-card .descripcion-content p {\n  color: #111827;\n  font-size: 16px;\n}\n.badge-pendiente {\n  background-color: rgba(245, 158, 11, 0.1);\n  color: #F59E0B;\n  padding: 4px 12px;\n  border-radius: 16px;\n  font-size: 14px;\n  font-weight: 500;\n}\n.badge-estado-aviso {\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.badge-estado-aviso.badge-pendiente {\n  background: #FEF3C7;\n  color: #92400E;\n}\n.badge-estado-aviso.badge-en-curso {\n  background: #DBEAFE;\n  color: #1E40AF;\n}\n.badge-estado-aviso.badge-pendiente {\n  background: #FEF3C7;\n  color: #92400E;\n}\n.badge-estado-aviso.badge-completado {\n  background: #10B981;\n  color: white;\n}\n.badge-estado-aviso.badge-pendiente-de-presupuesto {\n  background: #FCD34D;\n  color: #92400E;\n}\n.badge-estado-aviso.badge-listo-para-facturar {\n  background: #D1FAE5;\n  color: #059669;\n}\n.info-grid {\n  padding: 25px;\n  padding-top: 0px !important;\n  display: grid;\n  gap: 24px;\n}\n.info-grid .info-item label {\n  display: block;\n  color: #6B7280;\n  font-size: 14px;\n  margin-bottom: 4px;\n}\n.info-grid .info-item span {\n  color: #111827;\n  font-size: 16px;\n}\n.info-grid .direccion-section .btn-map {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: none;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n  color: white;\n  background-color: #4F46E5;\n  font-size: 16px;\n  border-radius: 50%;\n}\n.info-grid .contacto-section label {\n  display: block;\n  color: #6B7280;\n  font-size: 14px;\n  margin-bottom: 4px;\n}\n.info-row {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n.cliente-info,\n.direccion-info {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.cliente-info .ver-cliente,\n.direccion-info .ver-cliente {\n  color: #4F46E5;\n  text-decoration: none;\n  font-size: 14px;\n  cursor: pointer;\n}\n.cliente-info .ver-cliente:hover,\n.direccion-info .ver-cliente:hover {\n  text-decoration: underline;\n}\n.contacto-items {\n  display: flex;\n  gap: 24px;\n  margin-top: 8px;\n}\n.contacto-items .contacto-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background-color: #EEF2FF;\n  color: #4F46E5;\n  padding: 6px 15px;\n  border-radius: 10px;\n  font-size: 14px;\n  font-weight: 500;\n}\n.estado-pendiente {\n  color: #F59E0B !important;\n  font-weight: 500;\n}\n.descripcion-content {\n  padding: 24px;\n}\n.descripcion-content p {\n  margin: 0;\n  line-height: 1.5;\n}\n.gallery-actions {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.gallery-actions ion-segment {\n  background: #F3F4F6;\n  border-radius: 30px;\n  width: auto;\n  height: auto;\n  padding: 2px 4px;\n}\n.gallery-actions ion-segment::part(indicator) {\n  background: none;\n}\n.gallery-actions ion-segment ion-segment-button {\n  --background: transparent;\n  --background-checked: white;\n  --background-hover: rgba(255,255,255,0.1);\n  --background-focused: rgba(255,255,255,0.2);\n  --border-radius: 50%;\n  --border-width: 0;\n  --indicator-color: transparent;\n  --color: #6B7280;\n  --color-checked: #4F46E5;\n  --margin-top: 0;\n  --margin-bottom: 0;\n  --margin-start: 0;\n  --margin-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  --padding-end: 0;\n  min-height: 30px;\n  min-width: 30px;\n  transition: all 0.2s ease;\n  position: relative;\n}\n.gallery-actions ion-segment ion-segment-button::part(native) {\n  margin: 0;\n  padding: 0 6px;\n  height: 100%;\n}\n.gallery-actions ion-segment ion-segment-button::part(indicator) {\n  display: none;\n}\n.gallery-actions ion-segment ion-segment-button ion-icon {\n  font-size: 20px;\n}\n.gallery-actions ion-segment ion-segment-button.segment-button-checked {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.gallery-actions .btn-primary {\n  margin-left: auto;\n}\n.gallery-items {\n  padding: 24px;\n  display: grid;\n  gap: 16px;\n}\n.gallery-items .uploading-indicator {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #4F46E5;\n}\n.gallery-items .uploading-indicator ion-icon {\n  font-size: 32px;\n  margin-bottom: 12px;\n}\n.gallery-items .uploading-indicator ion-icon.spinning {\n  animation: spin 1s linear infinite;\n}\n.gallery-items .uploading-indicator p {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 500;\n}\n.gallery-items .no-images {\n  text-align: center;\n  padding: 40px 20px;\n  color: #6B7280;\n}\n.gallery-items .no-images p {\n  margin: 0;\n  font-size: 16px;\n}\n.gallery-items .gallery-item {\n  display: flex;\n  align-items: center;\n  padding: 12px;\n  border: 1px solid #E5E7EB;\n  border-radius: 6px;\n}\n.gallery-items .gallery-item img {\n  width: 48px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: 4px;\n  margin-right: 16px;\n}\n.gallery-items .gallery-item .image-info {\n  flex: 1;\n}\n.gallery-items .gallery-item .image-info span {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  color: #26262A;\n}\n.gallery-items .gallery-item .image-info span.file-info {\n  color: #6B7280;\n  font-size: 14px;\n  margin-top: 4px;\n}\n.gallery-items .gallery-item .btn-delete {\n  background: none;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n  color: #EF4444;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n}\n.gallery-items .gallery-item .btn-delete:hover {\n  background-color: rgba(239, 68, 68, 0.1);\n  color: rgb(234.9802955665, 21.0197044335, 21.0197044335);\n}\n.gallery-items .gallery-item .btn-delete ion-icon {\n  font-size: 18px;\n}\n.table-container {\n  padding: 0 24px 24px;\n}\n.table-search {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n}\n.table-search input {\n  border-radius: 8px;\n  padding: 7px 14px;\n  font-size: 1rem;\n  border: none;\n  background: #F9FBFF;\n  color: #26262A;\n}\n.table-search .order-by {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #26262A;\n  font-size: 14px;\n}\n.table-search .order-by span {\n  color: #4F46E5;\n  font-weight: 500;\n}\n.table-search .order-by ion-icon {\n  color: #4F46E5;\n  font-size: 16px;\n}\n.custom-mat-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0 8px;\n  margin-bottom: 12px;\n}\n.custom-mat-table thead tr th {\n  color: #64748b;\n  font-size: 14px;\n  font-weight: 400;\n  text-align: left;\n  padding: 8px 16px;\n  background: transparent;\n}\n.custom-mat-table tbody tr {\n  background: #F9FAFB;\n}\n.custom-mat-table tbody tr td {\n  padding: 12px 16px;\n  color: #26262A;\n  font-size: 14px;\n}\n.custom-mat-table tbody tr td:first-child {\n  border-top-left-radius: 8px;\n  border-bottom-left-radius: 8px;\n}\n.custom-mat-table tbody tr td:last-child {\n  border-top-right-radius: 8px;\n  border-bottom-right-radius: 8px;\n}\n.descripcion-trabajo p {\n  margin: 0 0 4px 0;\n  font-size: 14px;\n  line-height: 1.4;\n}\n.descripcion-trabajo small {\n  color: #6B7280;\n  font-size: 12px;\n}\n.materiales-info .repuestos-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.materiales-info .repuestos-list li {\n  font-size: 13px;\n  color: #4B5563;\n  margin-bottom: 2px;\n  padding: 2px 6px;\n  background-color: #F3F4F6;\n  border-radius: 4px;\n  display: inline-block;\n  margin-right: 4px;\n  margin-bottom: 4px;\n}\n.materiales-info .repuestos-list li:last-child {\n  margin-bottom: 0;\n}\n.badge-estado {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.badge-estado.badge-pendiente {\n  background-color: var(--estado-pendiente-bg);\n  color: var(--estado-pendiente-color);\n}\n.badge-estado.badge-en-curso {\n  background-color: var(--estado-en-curso-bg);\n  color: var(--estado-en-curso-color);\n}\n.badge-estado.badge-completado {\n  background-color: var(--estado-completado-bg);\n  color: var(--estado-completado-color);\n}\n.badge-estado.badge-cancelado {\n  background-color: var(--estado-cancelado-bg);\n  color: var(--estado-cancelado-color);\n}\n.repuestos-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.repuestos-list li {\n  font-size: 14px;\n  color: #4B5563;\n  margin-bottom: 4px;\n}\n.repuestos-list li:last-child {\n  margin-bottom: 0;\n}\n.estado-actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.estado-actions .btn-small {\n  padding: 6px 12px;\n  font-size: 13px;\n}\n.estado-actions .estado-badge {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-left: auto;\n}\n.estado-actions .estado-badge.estado-pendiente {\n  background-color: #FEF3C7;\n  color: #92400E;\n}\n.estado-actions .estado-badge.estado-en-curso {\n  background-color: #DCFCE7;\n  color: #166534;\n}\n.estado-actions .estado-badge.estado-abierto {\n  background-color: #DBEAFE;\n  color: #1E40AF;\n}\n.estado-actions .estado-badge.estado-cerrado {\n  background-color: #F3F4F6;\n  color: #374151;\n}\n.estado-actions .estado-badge.estado-finalizado {\n  background-color: #ECFDF5;\n  color: #14532D;\n}\n.albaran-info {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  margin: 8px 0;\n}\n.albaran-info .badge-albaran {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 10px;\n  border-radius: 16px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n  background: #10B981;\n  color: white;\n}\n.albaran-info .badge-albaran ion-icon {\n  font-size: 12px;\n}\n.albaran-info .badge-albaran.badge-finalizado {\n  background: #10B981;\n  color: white;\n}\n.albaran-info .badge-albaran.badge-presupuesto-pendiente {\n  background: #F59E0B;\n  color: white;\n}\n.albaran-info .badge-albaran.badge-otra-visita {\n  background: #EF4444;\n  color: white;\n}\n.albaran-info .albaran-details {\n  font-size: 10px;\n  color: #6B7280;\n  text-transform: capitalize;\n}\n.no-trabajos {\n  text-align: center;\n  padding: 20px 20px;\n  color: #6B7280;\n}\n.no-trabajos p {\n  margin: 0;\n  font-size: 16px;\n}\n.no-repuestos {\n  color: #6B7280;\n  font-style: italic;\n  font-size: 14px;\n}\n.flujo-container {\n  padding: 0px 25px;\n}\n.flujo-subtitle {\n  font-size: 14px;\n  color: #6B7280;\n  font-weight: 400;\n  margin-left: 12px;\n}\n.card-header .flujo-subtitle {\n  display: block;\n  margin-top: 4px;\n  margin-left: 0;\n}\n.flujo-section {\n  margin-top: 25px;\n  margin-bottom: 5px;\n}\n.flujo-section .flujo-header {\n  margin-bottom: 16px;\n}\n.flujo-section .flujo-header h3 {\n  font-size: 18px;\n  font-weight: 600;\n  color: #1a202c;\n  margin: 0 0 4px 0;\n}\n.flujo-section .flujo-header .flujo-subtitle {\n  font-size: 14px;\n  color: #64748b;\n  font-weight: 400;\n}\n.section-divider {\n  display: flex;\n  align-items: center;\n  margin: 24px 0 20px 0;\n}\n.section-divider::before,\n.section-divider::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: #e2e8f0;\n}\n.section-divider span {\n  padding: 0 16px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #64748b;\n  background: white;\n}\n.empty-state {\n  text-align: center;\n  padding: 40px 20px;\n  color: #64748b;\n}\n.empty-state ion-icon {\n  font-size: 48px;\n  color: #cbd5e0;\n  margin-bottom: 16px;\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 500;\n  margin: 0 0 8px 0;\n  color: #4a5568;\n}\n.empty-state small {\n  font-size: 14px;\n  color: #a0aec0;\n}\n.desktop-only {\n  display: inline;\n}\n.mobile-only {\n  display: none;\n}\n.urgent-badge {\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.urgent-badge.urgent {\n  background-color: #FEF2F2;\n  color: #DC2626;\n}\n.urgent-badge:not(.urgent) {\n  background-color: #F3F4F6;\n  color: #6B7280;\n}\n.cliente-nombre {\n  font-weight: 500;\n  color: #111827;\n}\n.direccion-texto {\n  word-break: break-word;\n  line-height: 1.4;\n}\n.tipo-aviso {\n  font-weight: 500;\n  color: #4F46E5;\n}\n.descripcion-texto {\n  line-height: 1.6;\n  color: #111827;\n}\n.image-title {\n  font-weight: 500;\n  color: #111827;\n}\n.ver-cliente {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  color: #4F46E5;\n  text-decoration: none;\n  font-size: 14px;\n  cursor: pointer;\n  transition: color 0.2s ease;\n}\n.ver-cliente:hover {\n  color: rgb(41.1374407583, 30.5592417062, 217.4407582938);\n}\n.ver-cliente ion-icon {\n  font-size: 14px;\n}\n.no-images {\n  text-align: center;\n  padding: 40px 20px;\n  color: #6B7280;\n}\n.no-images ion-icon {\n  font-size: 48px;\n  color: #CBD5E0;\n  margin-bottom: 16px;\n}\n.no-images p {\n  margin: 0;\n  font-size: 16px;\n}\n@media (max-width: 768px) {\n  :host {\n    padding: 16px;\n  }\n  .desktop-only {\n    display: none;\n  }\n  .mobile-only {\n    display: inline;\n  }\n  .info-card {\n    margin-bottom: 16px;\n    border-radius: 12px;\n  }\n  .info-card .card-header {\n    padding: 20px;\n    flex-direction: row;\n    align-items: center;\n    justify-content: start;\n    gap: 25px !important;\n  }\n  .info-card .card-header .mobile-only.title {\n    display: block;\n    font-size: 18px;\n    font-weight: 500;\n    color: #111827;\n    margin: 0;\n  }\n  .info-card .card-header .header-container {\n    width: auto;\n    justify-content: space-between;\n    gap: 12px;\n  }\n  .info-card .card-header .header-actions {\n    display: none;\n    width: 100%;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .info-card .card-header .header-actions button {\n    width: 100%;\n    justify-content: center;\n  }\n  .info-card .card-header .header-actions-jobs {\n    display: flex;\n    width: 100%;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .info-card .card-header .header-actions-jobs button {\n    width: 100%;\n    justify-content: center;\n  }\n  .info-card h2.title {\n    font-size: 16px;\n    padding: 20px;\n  }\n  .info-card h2 {\n    font-size: 16px;\n  }\n  .info-grid {\n    padding: 15px;\n    gap: 16px;\n  }\n  .info-grid .info-row {\n    gap: 20px;\n  }\n  .info-grid .info-row .info-item {\n    width: auto;\n  }\n  .info-grid .info-row .info-item label {\n    width: max-content;\n  }\n  .info-grid .cliente-info,\n  .info-grid .direccion-info {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n  }\n  .info-grid .contacto-items {\n    flex-direction: row;\n    gap: 8px;\n  }\n  .info-grid .contacto-items .contacto-item {\n    width: 100%;\n    justify-content: flex-start;\n  }\n  .info-grid .contacto-items .contacto-item.nombre-contacto {\n    display: none;\n  }\n  .descripcion-content {\n    padding: 20px;\n    gap: 16px;\n  }\n  .gallery-actions {\n    flex-direction: column;\n    gap: 12px;\n    align-items: stretch;\n  }\n  .gallery-actions ion-segment {\n    align-self: center;\n  }\n  .gallery-actions .btn-primary {\n    margin-left: 0;\n    width: 100%;\n    justify-content: center;\n  }\n  .gallery-items {\n    padding: 20px;\n    gap: 12px;\n  }\n  .gallery-items .gallery-item {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .gallery-items .gallery-item img {\n    width: 100%;\n    height: 200px;\n    object-fit: cover;\n    border-radius: 8px;\n    margin-right: 0;\n  }\n  .gallery-items .gallery-item .image-info {\n    width: 100%;\n  }\n  .gallery-items .gallery-item .btn-delete {\n    align-self: flex-end;\n  }\n  .table-container {\n    padding: 0 20px 20px;\n  }\n  .custom-mat-table {\n    font-size: 12px;\n  }\n  .custom-mat-table thead tr th {\n    font-size: 11px;\n    padding: 8px 12px;\n  }\n  .custom-mat-table tbody tr td {\n    padding: 10px 12px;\n    font-size: 12px;\n  }\n  .custom-mat-table tbody tr td .descripcion-trabajo p {\n    font-size: 12px;\n  }\n  .custom-mat-table tbody tr td .descripcion-trabajo small {\n    font-size: 10px;\n  }\n  .estado-actions {\n    flex-direction: column;\n    gap: 6px;\n  }\n  .estado-actions .btn-small {\n    width: 100%;\n    justify-content: center;\n    padding: 8px 12px;\n    font-size: 12px;\n  }\n  .flujo-container {\n    padding: 0 20px 20px;\n  }\n  .flujo-section {\n    margin-top: 20px;\n    margin-bottom: 0;\n  }\n  .section-divider {\n    margin: 20px 0 16px 0;\n  }\n  .section-divider span {\n    font-size: 13px;\n    padding: 0 12px;\n  }\n  .back-button {\n    margin-bottom: 16px;\n  }\n  .back-button .btn-back {\n    padding: 8px 12px;\n    font-size: 13px;\n  }\n  .badge-pendiente {\n    font-size: 12px;\n    padding: 3px 8px;\n  }\n  .materiales-info .repuestos-list li {\n    font-size: 11px;\n    padding: 2px 4px;\n  }\n  .no-repuestos {\n    font-size: 12px;\n  }\n  .empty-state {\n    padding: 30px 16px;\n  }\n  .empty-state ion-icon {\n    font-size: 40px;\n  }\n  .empty-state p {\n    font-size: 14px;\n  }\n  .empty-state small {\n    font-size: 12px;\n  }\n  .urgent-badge {\n    font-size: 11px;\n    padding: 2px 6px;\n  }\n  .ver-cliente {\n    font-size: 12px;\n  }\n  .ver-cliente ion-icon {\n    font-size: 12px;\n  }\n  .no-images {\n    padding: 30px 16px;\n  }\n  .no-images ion-icon {\n    font-size: 40px;\n  }\n  .no-images p {\n    font-size: 14px;\n  }\n}\n@media (max-width: 480px) {\n  :host {\n    padding: 0px;\n  }\n  .info-card {\n    margin-bottom: 12px;\n    border-radius: 8px;\n  }\n  .info-card .card-header {\n    padding: 16px;\n    gap: 8px;\n  }\n  .info-card .card-header .header-container {\n    gap: 8px;\n  }\n  .info-card .card-header .header-actions {\n    gap: 6px;\n  }\n  .info-card h2.title {\n    font-size: 15px;\n    padding: 16px;\n    display: none;\n  }\n  .info-card h2 {\n    font-size: 15px !important;\n  }\n  .descripcion-content {\n    padding: 16px;\n    gap: 12px;\n  }\n  .descripcion-content label {\n    font-size: 12px;\n  }\n  .descripcion-content p {\n    font-size: 14px;\n  }\n  .gallery-actions {\n    gap: 8px;\n  }\n  .gallery-actions .btn-primary {\n    padding: 8px 12px;\n    font-size: 13px;\n  }\n  .gallery-items {\n    padding: 16px;\n    gap: 8px;\n  }\n  .gallery-items .gallery-item {\n    gap: 8px;\n  }\n  .gallery-items .gallery-item img {\n    height: 150px;\n  }\n  .gallery-items .gallery-item .image-info span {\n    font-size: 12px;\n  }\n  .gallery-items .gallery-item .image-info span.file-info {\n    font-size: 11px;\n  }\n  .table-container {\n    padding: 0 16px 16px;\n  }\n  .custom-mat-table {\n    font-size: 11px;\n  }\n  .custom-mat-table thead tr th {\n    font-size: 10px;\n    padding: 6px 8px;\n  }\n  .custom-mat-table tbody tr td {\n    padding: 8px;\n    font-size: 11px;\n  }\n  .custom-mat-table tbody tr td .descripcion-trabajo p {\n    font-size: 11px;\n  }\n  .custom-mat-table tbody tr td .descripcion-trabajo small {\n    font-size: 9px;\n  }\n  .estado-actions {\n    gap: 4px;\n  }\n  .estado-actions .btn-small {\n    padding: 6px 8px;\n    font-size: 11px;\n  }\n  .flujo-container {\n    padding: 0 16px 16px;\n  }\n  .flujo-section {\n    margin-top: 16px;\n  }\n  .section-divider {\n    margin: 16px 0 12px 0;\n  }\n  .section-divider span {\n    font-size: 12px;\n    padding: 0 8px;\n  }\n  .back-button {\n    margin-bottom: 12px;\n  }\n  .back-button .btn-back {\n    padding: 6px 10px;\n    font-size: 12px;\n  }\n  .badge-pendiente {\n    font-size: 11px;\n    padding: 2px 6px;\n  }\n  .materiales-info .repuestos-list li {\n    font-size: 10px;\n    padding: 1px 3px;\n  }\n  .no-repuestos {\n    font-size: 11px;\n  }\n  .empty-state {\n    padding: 24px 12px;\n  }\n  .empty-state ion-icon {\n    font-size: 36px;\n  }\n  .empty-state p {\n    font-size: 13px;\n  }\n  .empty-state small {\n    font-size: 11px;\n  }\n  .btn-primary,\n  .btn-secondary,\n  .btn-danger {\n    padding: 8px 12px;\n    font-size: 13px;\n  }\n  ion-icon {\n    font-size: 16px;\n  }\n  .urgent-badge {\n    font-size: 10px;\n    padding: 1px 4px;\n  }\n  .ver-cliente {\n    font-size: 11px;\n  }\n  .ver-cliente ion-icon {\n    font-size: 11px;\n  }\n  .no-images {\n    padding: 24px 12px;\n  }\n  .no-images ion-icon {\n    font-size: 36px;\n  }\n  .no-images p {\n    font-size: 13px;\n  }\n}\n@media (max-width: 768px) {\n  .custom-mat-table {\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n  .custom-mat-table tbody {\n    display: block;\n  }\n  .custom-mat-table thead {\n    display: none;\n  }\n  .custom-mat-table tr {\n    display: block;\n    margin-bottom: 8px;\n    border-radius: 8px;\n    background: #F9FAFB;\n    padding: 12px;\n  }\n  .custom-mat-table th,\n  .custom-mat-table td {\n    display: block;\n    text-align: left;\n    padding: 4px 0;\n    border: none;\n    white-space: normal;\n  }\n  .custom-mat-table th:before,\n  .custom-mat-table td:before {\n    content: attr(data-label) ": ";\n    font-weight: 600;\n    color: #6B7280;\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n  }\n  .custom-mat-table th {\n    display: none;\n  }\n  .custom-mat-table td {\n    font-size: 13px;\n    line-height: 1.4;\n  }\n  .custom-mat-table td.descripcion-trabajo p {\n    margin: 0 0 4px 0;\n  }\n  .custom-mat-table td.materiales-info .repuestos-list {\n    margin-top: 4px;\n  }\n  .custom-mat-table td.materiales-info .repuestos-list li {\n    display: inline-block;\n    margin: 2px 4px 2px 0;\n  }\n  .custom-mat-table td.estado-actions {\n    margin-top: 8px;\n    padding-top: 8px;\n    border-top: 1px solid #E5E7EB;\n  }\n  .custom-mat-table td.estado-actions:before {\n    content: "Acciones: ";\n  }\n  .estado-actions {\n    display: flex;\n    gap: 8px;\n    flex-wrap: wrap;\n  }\n  .estado-actions .btn-small {\n    flex: 1;\n    min-width: 80px;\n    max-width: 120px;\n  }\n  .gallery-items .gallery-item {\n    border: 1px solid #E5E7EB;\n    border-radius: 8px;\n    padding: 12px;\n  }\n  .gallery-items .gallery-item img {\n    border-radius: 6px;\n  }\n  .gallery-items .gallery-item .image-info {\n    margin: 8px 0;\n  }\n  .gallery-items .gallery-item .image-info span {\n    display: block;\n    margin-bottom: 2px;\n  }\n  .badge-estado {\n    display: inline-block;\n    margin: 2px 0;\n  }\n  .btn-map {\n    min-width: 36px;\n    height: 36px;\n  }\n  .btn-map ion-icon {\n    font-size: 16px;\n  }\n  .contacto-items .contacto-item {\n    border-radius: 6px;\n    padding: 6px 10px;\n    font-size: 13px;\n  }\n  .contacto-items .contacto-item ion-icon {\n    font-size: 14px;\n  }\n  .empty-state {\n    background: #F9FAFB;\n    border-radius: 8px;\n    margin: 16px 0;\n  }\n  .loading-state {\n    min-height: 150px;\n  }\n  .error-state {\n    min-height: 150px;\n  }\n  .error-state .error-message {\n    background: #FEF2F2;\n    border: 1px solid #FECACA;\n    border-radius: 8px;\n    padding: 20px;\n  }\n  .error-state .error-message ion-icon {\n    color: #DC2626;\n  }\n  .header-container .back-button {\n    margin-bottom: 0;\n  }\n  .gallery-actions ion-segment {\n    --background: #F3F4F6;\n    --background-checked: white;\n    --color: #6B7280;\n    --color-checked: #4F46E5;\n  }\n  .gallery-actions ion-segment ion-segment-button {\n    --background: transparent;\n    --background-checked: white;\n    --color: #6B7280;\n    --color-checked: #4F46E5;\n    --indicator-color: transparent;\n    --border-radius: 50%;\n    --margin: 0;\n    --padding: 0;\n    min-height: 32px;\n    min-width: 32px;\n  }\n  .gallery-actions ion-segment ion-segment-button ion-icon {\n    font-size: 18px;\n  }\n  .flujo-section .flujo-container {\n    padding: 0 16px 16px;\n  }\n  .section-divider {\n    margin: 16px 0 12px 0;\n  }\n  .section-divider span {\n    font-size: 12px;\n    padding: 0 10px;\n    background: white;\n    color: #6B7280;\n  }\n  .cliente-info .cliente-nombre {\n    font-size: 14px;\n    line-height: 1.3;\n  }\n  .direccion-info .direccion-texto {\n    font-size: 13px;\n    line-height: 1.4;\n  }\n  .descripcion-content .tipo-aviso {\n    font-size: 14px;\n  }\n  .descripcion-content .descripcion-texto {\n    font-size: 13px;\n  }\n}\n@media (max-width: 480px) {\n  .custom-mat-table td {\n    font-size: 12px;\n  }\n  .custom-mat-table td:before {\n    font-size: 10px;\n  }\n  .custom-mat-table .estado-actions {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: end;\n    gap: 20px;\n  }\n  .custom-mat-table .estado-actions .btn-small {\n    min-width: 70px;\n    max-width: 100px;\n    font-size: 11px;\n    padding: 6px 8px;\n  }\n  .custom-mat-table .estado-actions .btn-small ion-icon {\n    font-size: 12px;\n  }\n  .gallery-items .gallery-item {\n    padding: 8px;\n  }\n  .gallery-items .gallery-item img {\n    height: 120px;\n  }\n  .gallery-items .gallery-item .image-info span {\n    font-size: 11px;\n  }\n  .gallery-items .gallery-item .image-info span.file-info {\n    font-size: 10px;\n  }\n  .contacto-items {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n  }\n  .contacto-items .contacto-item {\n    padding: 4px 8px;\n    font-size: 12px;\n  }\n  .contacto-items .contacto-item ion-icon {\n    font-size: 12px;\n  }\n  .btn-map {\n    min-width: 32px;\n    height: 32px;\n  }\n  .btn-map ion-icon {\n    font-size: 14px;\n  }\n  .empty-state {\n    padding: 20px 12px;\n  }\n  .empty-state ion-icon {\n    font-size: 32px;\n  }\n  .empty-state p {\n    font-size: 12px;\n  }\n  .empty-state small {\n    font-size: 10px;\n  }\n  .loading-state,\n  .error-state {\n    min-height: 120px;\n  }\n  .loading-state .loading-spinner ion-icon,\n  .loading-state .error-message ion-icon,\n  .error-state .loading-spinner ion-icon,\n  .error-state .error-message ion-icon {\n    font-size: 36px;\n  }\n  .loading-state .loading-spinner p,\n  .loading-state .error-message p,\n  .error-state .loading-spinner p,\n  .error-state .error-message p {\n    font-size: 13px;\n  }\n  .gallery-actions ion-segment ion-segment-button {\n    min-height: 28px;\n    min-width: 28px;\n  }\n  .gallery-actions ion-segment ion-segment-button ion-icon {\n    font-size: 16px;\n  }\n  .btn-primary,\n  .btn-secondary,\n  .btn-danger {\n    padding: 8px 12px;\n    font-size: 13px;\n    min-height: 40px;\n  }\n  .flujo-section .flujo-container {\n    padding: 0 12px 12px;\n  }\n  .section-divider {\n    margin: 12px 0 8px 0;\n  }\n  .section-divider span {\n    font-size: 11px;\n    padding: 0 8px;\n  }\n  .cliente-info .cliente-nombre {\n    font-size: 13px;\n  }\n  .direccion-info .direccion-texto {\n    font-size: 12px;\n  }\n  .descripcion-content .tipo-aviso {\n    font-size: 13px;\n  }\n  .descripcion-content .descripcion-texto {\n    font-size: 12px;\n  }\n}\n.albaranes-container {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.albaran-item {\n  background: #fff;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s ease;\n}\n.albaran-item:hover {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transform: translateY(-2px);\n}\n.albaran-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 16px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid #E5E7EB;\n}\n.albaran-header .albaran-info h4 {\n  margin: 0 0 4px 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #1F2937;\n}\n.albaran-header .albaran-info .fecha-albaran {\n  font-size: 14px;\n  color: #6B7280;\n  font-weight: 500;\n}\n.albaran-header .estado-albaran .badge-estado {\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.albaran-header .estado-albaran .badge-estado.badge-finalizado {\n  background: #D1FAE5;\n  color: #065F46;\n}\n.albaran-header .estado-albaran .badge-estado.badge-presupuesto-pendiente {\n  background: #FEF3C7;\n  color: #92400E;\n}\n.albaran-header .estado-albaran .badge-estado.badge-otra-visita {\n  background: #DBEAFE;\n  color: #1E40AF;\n}\n.albaran-details {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.albaran-details .detail-row {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n.albaran-details .detail-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.albaran-details .detail-item.full-width {\n  grid-column: 1/-1;\n}\n.albaran-details .detail-item label {\n  font-size: 12px;\n  font-weight: 600;\n  color: #6B7280;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.albaran-details .detail-item span,\n.albaran-details .detail-item p {\n  font-size: 14px;\n  color: #1F2937;\n  margin: 0;\n}\n.albaran-details .detail-item p {\n  line-height: 1.5;\n  background: #F9FAFB;\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid #E5E7EB;\n}\n.albaran-details .repuestos-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.albaran-details .repuestos-tags .repuesto-tag {\n  background: #E0F2FE;\n  color: #0C4A6E;\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  border: 1px solid #BAE6FD;\n}\n@media (max-width: 768px) {\n  .albaranes-container {\n    gap: 16px;\n  }\n  .albaran-item {\n    padding: 16px;\n  }\n  .albaran-header {\n    flex-direction: column;\n    gap: 12px;\n    align-items: flex-start;\n  }\n  .albaran-header .estado-albaran {\n    align-self: flex-start;\n  }\n  .albaran-details .detail-row {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n}\n/*# sourceMappingURL=ver-avisos.component.css.map */\n'] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: AvisosService }, { type: TrabajosService }, { type: ModalController }, { type: FlujoAvisosService }], { fileInput: [{
    type: ViewChild,
    args: ["fileInput", { static: false }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VerAvisosComponent, { className: "VerAvisosComponent", filePath: "src/app/modules/avisos/components/ver-avisos/ver-avisos.component.ts", lineNumber: 27 });
})();
export {
  VerAvisosComponent
};
//# sourceMappingURL=ver-avisos.component-BLKKIHO3.js.map
