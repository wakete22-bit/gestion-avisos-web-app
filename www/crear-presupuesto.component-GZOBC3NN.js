import {
  PresupuestosService
} from "./chunk-SKNF6UHJ.js";
import {
  InventarioService
} from "./chunk-F77G4CBW.js";
import "./chunk-VHAQXQOQ.js";
import {
  AvisosService
} from "./chunk-S2ZT5FDR.js";
import {
  addCircle,
  addCircleOutline,
  addIcons,
  alertCircleOutline,
  arrowBackOutline,
  close,
  cubeOutline,
  listOutline,
  refreshOutline,
  saveOutline,
  searchOutline,
  trashOutline
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
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  Router,
  Subject,
  Validators,
  setClassMetadata,
  takeUntil,
  ɵNgNoValidate,
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
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
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

// src/app/modules/presupuestos/components/crear-presupuesto/crear-presupuesto.component.ts
function CrearPresupuestoComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27);
    \u0275\u0275element(2, "ion-icon", 28);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando presupuesto...");
    \u0275\u0275elementEnd()()();
  }
}
function CrearPresupuestoComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p")(4, "strong");
    \u0275\u0275text(5, "Cliente:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p")(8, "strong");
    \u0275\u0275text(9, "Descripci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Aviso: #", ctx_r0.aviso.id == null ? null : ctx_r0.aviso.id.substring(0, 8), "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.aviso.nombre_cliente_aviso, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.aviso.descripcion_problema, "");
  }
}
function CrearPresupuestoComponent_div_18_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Las horas estimadas son requeridas");
    \u0275\u0275elementEnd();
  }
}
function CrearPresupuestoComponent_div_18_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Las horas deben ser mayor o igual a 0");
    \u0275\u0275elementEnd();
  }
}
function CrearPresupuestoComponent_div_18_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Las horas no pueden exceder 1000");
    \u0275\u0275elementEnd();
  }
}
function CrearPresupuestoComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275template(1, CrearPresupuestoComponent_div_18_span_1_Template, 2, 0, "span", 31)(2, CrearPresupuestoComponent_div_18_span_2_Template, 2, 0, "span", 31)(3, CrearPresupuestoComponent_div_18_span_3_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_1_0 = ctx_r0.presupuestoForm.get("horas_estimadas")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r0.presupuestoForm.get("horas_estimadas")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["min"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r0.presupuestoForm.get("horas_estimadas")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["max"]);
  }
}
function CrearPresupuestoComponent_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El total estimado es requerido");
    \u0275\u0275elementEnd();
  }
}
function CrearPresupuestoComponent_div_23_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El total debe ser mayor o igual a 0");
    \u0275\u0275elementEnd();
  }
}
function CrearPresupuestoComponent_div_23_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El total no puede exceder 1,000,000");
    \u0275\u0275elementEnd();
  }
}
function CrearPresupuestoComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275template(1, CrearPresupuestoComponent_div_23_span_1_Template, 2, 0, "span", 31)(2, CrearPresupuestoComponent_div_23_span_2_Template, 2, 0, "span", 31)(3, CrearPresupuestoComponent_div_23_span_3_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_1_0 = ctx_r0.presupuestoForm.get("total_estimado")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r0.presupuestoForm.get("total_estimado")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["min"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r0.presupuestoForm.get("total_estimado")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["max"]);
  }
}
function CrearPresupuestoComponent_div_35_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275element(1, "ion-icon", 28);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando productos...");
    \u0275\u0275elementEnd()();
  }
}
function CrearPresupuestoComponent_div_35_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275element(1, "ion-icon", 45);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.errorProductos);
  }
}
function CrearPresupuestoComponent_div_35_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275listener("click", function CrearPresupuestoComponent_div_35_div_11_div_1_Template_div_click_0_listener() {
      const producto_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.agregarMaterialDelInventario(producto_r4));
    });
    \u0275\u0275elementStart(1, "div", 49)(2, "div", 50)(3, "span", 51);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 52);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 53);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 54)(11, "span", 55);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 56);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(15, "ion-icon", 57);
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
function CrearPresupuestoComponent_div_35_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275template(1, CrearPresupuestoComponent_div_35_div_11_div_1_Template, 16, 11, "div", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.productosFiltrados);
  }
}
function CrearPresupuestoComponent_div_35_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275element(1, "ion-icon", 59);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No se encontraron productos");
    \u0275\u0275elementEnd()();
  }
}
function CrearPresupuestoComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "h4");
    \u0275\u0275text(3, "Seleccionar Materiales del Inventario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 34);
    \u0275\u0275listener("click", function CrearPresupuestoComponent_div_35_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarSelectorMateriales());
    });
    \u0275\u0275element(5, "ion-icon", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 36)(7, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function CrearPresupuestoComponent_div_35_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.busquedaProducto, $event) || (ctx_r0.busquedaProducto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function CrearPresupuestoComponent_div_35_Template_input_input_7_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.filtrarProductos($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "ion-icon", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, CrearPresupuestoComponent_div_35_div_9_Template, 4, 0, "div", 39)(10, CrearPresupuestoComponent_div_35_div_10_Template, 4, 1, "div", 40)(11, CrearPresupuestoComponent_div_35_div_11_Template, 2, 1, "div", 41)(12, CrearPresupuestoComponent_div_35_div_12_Template, 4, 0, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.busquedaProducto);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.loadingProductos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.errorProductos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loadingProductos && !ctx_r0.errorProductos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loadingProductos && !ctx_r0.errorProductos && ctx_r0.productosFiltrados.length === 0);
  }
}
function CrearPresupuestoComponent_div_36_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63)(1, "div", 64)(2, "div", 65)(3, "span", 66);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 67);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 68)(9, "div", 69)(10, "label");
    \u0275\u0275text(11, "Cantidad:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 70);
    \u0275\u0275listener("change", function CrearPresupuestoComponent_div_36_div_3_Template_input_change_12_listener($event) {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.actualizarCantidadMaterial(i_r6, $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 69)(14, "label");
    \u0275\u0275text(15, "Precio unitario:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 71);
    \u0275\u0275listener("input", function CrearPresupuestoComponent_div_36_div_3_Template_input_input_16_listener($event) {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.actualizarPrecioMaterial(i_r6, $event));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "button", 72);
    \u0275\u0275listener("click", function CrearPresupuestoComponent_div_36_div_3_Template_button_click_17_listener() {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.eliminarMaterial(i_r6));
    });
    \u0275\u0275element(18, "ion-icon", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const material_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.getNombreProducto(material_r7.material_id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 4, material_r7.precio_neto_al_momento, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275property("value", material_r7.cantidad_estimada);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", material_r7.precio_neto_al_momento);
  }
}
function CrearPresupuestoComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60)(1, "h4");
    \u0275\u0275text(2, "Materiales a\xF1adidos");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CrearPresupuestoComponent_div_36_div_3_Template, 19, 9, "div", 61);
    \u0275\u0275elementStart(4, "div", 62)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.materiales);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Costo total de materiales: ", \u0275\u0275pipeBind4(7, 2, ctx_r0.calcularCostoTotalMateriales(), "EUR", "symbol", "1.2-2"), "");
  }
}
function CrearPresupuestoComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74)(1, "p");
    \u0275\u0275text(2, "No se han agregado materiales al presupuesto");
    \u0275\u0275elementEnd()();
  }
}
function CrearPresupuestoComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "p", 76);
    \u0275\u0275text(2, "Por favor, complete todos los campos requeridos correctamente");
    \u0275\u0275elementEnd()();
  }
}
function CrearPresupuestoComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "p", 76);
    \u0275\u0275text(2, "No se ha seleccionado un aviso");
    \u0275\u0275elementEnd()();
  }
}
var _CrearPresupuestoComponent = class _CrearPresupuestoComponent {
  constructor(fb, router, route, presupuestosService, avisosService, inventarioService) {
    this.fb = fb;
    this.router = router;
    this.route = route;
    this.presupuestosService = presupuestosService;
    this.avisosService = avisosService;
    this.inventarioService = inventarioService;
    this.avisoId = null;
    this.presupuestoId = null;
    this.aviso = null;
    this.presupuesto = null;
    this.loading = false;
    this.materiales = [];
    this.modoEdicion = false;
    this.productosInventario = [];
    this.productosFiltrados = [];
    this.loadingProductos = false;
    this.errorProductos = null;
    this.busquedaProducto = "";
    this.mostrarSelectorMateriales = false;
    this.destroy$ = new Subject();
    addIcons({
      arrowBackOutline,
      saveOutline,
      addCircleOutline,
      trashOutline,
      refreshOutline,
      listOutline,
      close,
      searchOutline,
      addCircle,
      cubeOutline,
      alertCircleOutline
    });
    this.presupuestoForm = this.fb.group({
      horas_estimadas: [0, [Validators.required, Validators.min(0), Validators.max(1e3)]],
      total_estimado: [0, [Validators.required, Validators.min(0), Validators.max(1e6)]]
    });
    this.formStatusSubscription = this.presupuestoForm.statusChanges.subscribe((status) => {
      console.log("Estado del formulario:", status);
      console.log("Formulario v\xE1lido:", this.presupuestoForm.valid);
      console.log("Errores:", this.presupuestoForm.errors);
    });
  }
  ngOnInit() {
    this.cargarAviso();
    this.cargarProductosInventario();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.formStatusSubscription) {
      this.formStatusSubscription.unsubscribe();
    }
  }
  cargarAviso() {
    this.route.queryParams.subscribe((params) => {
      this.avisoId = params["avisoId"];
      this.presupuestoId = params["id"];
      this.modoEdicion = params["edit"] === "true";
      console.log("Par\xE1metros de ruta:", {
        avisoId: this.avisoId,
        presupuestoId: this.presupuestoId,
        modoEdicion: this.modoEdicion
      });
      if (this.avisoId) {
        this.avisosService.getAviso(this.avisoId).subscribe({
          next: (aviso) => {
            this.aviso = aviso;
            console.log("Aviso cargado:", aviso);
          },
          error: (error) => {
            console.error("Error al cargar aviso:", error);
          }
        });
      }
      if (this.presupuestoId && this.modoEdicion) {
        this.cargarPresupuestoParaEditar();
      }
    });
  }
  /**
   * Verifica los precios de los productos del inventario
   */
  verificarPreciosInventario() {
    console.log("Verificando precios del inventario...");
    this.productosInventario.forEach((producto, index) => {
      console.log(`Producto ${index + 1}:`, {
        id: producto.id,
        nombre: producto.nombre,
        precio_neto: producto.precio_neto,
        tipo_precio: typeof producto.precio_neto,
        es_valido: !isNaN(producto.precio_neto) && isFinite(producto.precio_neto)
      });
    });
  }
  /**
   * Carga los productos del inventario
   */
  cargarProductosInventario() {
    this.loadingProductos = true;
    this.errorProductos = null;
    this.inventarioService.getInventario(1, 1e3, "", "nombre", "asc", false).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.productosInventario = response.inventario;
        this.productosFiltrados = [...this.productosInventario];
        this.loadingProductos = false;
        console.log("Productos del inventario cargados:", this.productosInventario.length);
        this.verificarPreciosInventario();
        if (this.modoEdicion && this.presupuesto && this.presupuesto.materiales) {
          console.log("Reprocesando materiales despu\xE9s de cargar inventario");
          this.procesarMateriales(this.presupuesto.materiales);
        }
      },
      error: (error) => {
        console.error("Error al cargar productos del inventario:", error);
        this.errorProductos = "Error al cargar productos del inventario";
        this.loadingProductos = false;
      }
    });
  }
  /**
   * Filtra productos del inventario por búsqueda
   */
  filtrarProductos(event) {
    var _a;
    const termino = ((_a = event == null ? void 0 : event.target) == null ? void 0 : _a.value) || event || "";
    this.busquedaProducto = termino;
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
   * Abre el selector de materiales
   */
  abrirSelectorMateriales() {
    this.mostrarSelectorMateriales = true;
    this.productosFiltrados = [...this.productosInventario];
    this.busquedaProducto = "";
  }
  /**
   * Cierra el selector de materiales
   */
  cerrarSelectorMateriales() {
    this.mostrarSelectorMateriales = false;
  }
  /**
   * Añade un producto del inventario como material
   */
  agregarMaterialDelInventario(producto) {
    console.log("Agregando material del inventario:", producto);
    console.log("Precio del producto:", producto.precio_neto);
    const yaExiste = this.materiales.find((m) => m.material_id === producto.id);
    if (yaExiste) {
      yaExiste.cantidad_estimada = (yaExiste.cantidad_estimada || 0) + 1;
      console.log("Material existente actualizado:", yaExiste);
    } else {
      const nuevoMaterial = {
        material_id: producto.id,
        cantidad_estimada: 1,
        precio_neto_al_momento: producto.precio_neto,
        producto
        // Guardar referencia al producto para mostrar información
      };
      this.materiales.push(nuevoMaterial);
      console.log("Nuevo material agregado:", nuevoMaterial);
    }
    this.calcularTotal(true);
    this.cerrarSelectorMateriales();
  }
  /**
   * Obtiene el nombre del producto por ID
   */
  getNombreProducto(materialId) {
    const producto = this.productosInventario.find((p) => p.id === materialId);
    if (producto) {
      return producto.nombre;
    }
    const material = this.materiales.find((m) => m.material_id === materialId);
    if (material && material.producto) {
      return material.producto.nombre || "Producto no encontrado";
    }
    return "Producto no encontrado";
  }
  /**
   * Obtiene el precio del producto por ID
   */
  getPrecioProducto(materialId) {
    const producto = this.productosInventario.find((p) => p.id === materialId);
    if (producto) {
      return producto.precio_neto;
    }
    const material = this.materiales.find((m) => m.material_id === materialId);
    if (material && material.producto) {
      return material.producto.precio_neto || 0;
    }
    return 0;
  }
  cargarPresupuestoParaEditar() {
    if (!this.presupuestoId)
      return;
    this.loading = true;
    this.presupuestosService.getPresupuesto(this.presupuestoId).subscribe({
      next: (presupuesto) => {
        console.log("Presupuesto cargado para editar:", presupuesto);
        this.presupuesto = presupuesto;
        if (presupuesto.aviso_id) {
          this.avisoId = presupuesto.aviso_id;
          console.log("AvisoId establecido:", this.avisoId);
        }
        this.presupuestoForm.patchValue({
          horas_estimadas: presupuesto.horas_estimadas,
          total_estimado: presupuesto.total_estimado
        });
        if (presupuesto.materiales && presupuesto.materiales.length > 0) {
          console.log("Materiales encontrados:", presupuesto.materiales);
          if (this.productosInventario.length > 0) {
            this.procesarMateriales(presupuesto.materiales);
          } else {
            setTimeout(() => {
              this.procesarMateriales(presupuesto.materiales);
            }, 500);
          }
        } else {
          console.log("No se encontraron materiales en el presupuesto");
          this.materiales = [];
        }
        setTimeout(() => {
          this.calcularTotal(true);
        }, 100);
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar presupuesto para editar:", error);
        this.loading = false;
      }
    });
  }
  /**
   * Procesa los materiales del presupuesto
   */
  procesarMateriales(materialesPresupuesto) {
    console.log("Procesando materiales:", materialesPresupuesto);
    this.materiales = materialesPresupuesto.map((material) => {
      console.log("Procesando material:", material);
      console.log("Precio del material:", material.precio_neto_al_momento);
      console.log("Material completo:", material);
      const materialProcesado = {
        material_id: material.material_id,
        cantidad_estimada: material.cantidad_estimada || 1,
        precio_neto_al_momento: material.precio_neto_al_momento || 0,
        producto: material.material
        // Guardar referencia al producto del inventario
      };
      console.log("Material procesado:", materialProcesado);
      return materialProcesado;
    });
    console.log("Materiales procesados:", this.materiales);
  }
  agregarMaterial() {
    this.materiales.push({
      material_id: "",
      cantidad_estimada: 1,
      precio_neto_al_momento: 0
    });
  }
  eliminarMaterial(index) {
    var _a;
    console.log("Eliminando material en \xEDndice:", index);
    console.log("Material a eliminar:", this.materiales[index]);
    this.materiales.splice(index, 1);
    console.log("Materiales despu\xE9s de eliminar:", this.materiales);
    this.calcularTotal(true);
    this.presupuestoForm.updateValueAndValidity();
    console.log("Total estimado despu\xE9s de eliminar material:", (_a = this.presupuestoForm.get("total_estimado")) == null ? void 0 : _a.value);
    this.verificarEstadoMateriales();
  }
  /**
   * Actualiza la cantidad de un material
   */
  actualizarCantidadMaterial(index, event) {
    var _a;
    const nuevaCantidad = ((_a = event == null ? void 0 : event.target) == null ? void 0 : _a.value) || event || "1";
    console.log("Actualizando cantidad del material:", index, "Nueva cantidad:", nuevaCantidad);
    if (this.materiales[index]) {
      this.materiales[index].cantidad_estimada = parseInt(nuevaCantidad) || 1;
      console.log("Material actualizado:", this.materiales[index]);
      this.calcularTotal(true);
      this.verificarEstadoMateriales();
    }
  }
  /**
   * Actualiza el precio de un material
   */
  actualizarPrecioMaterial(index, event) {
    var _a;
    const nuevoPrecio = ((_a = event == null ? void 0 : event.target) == null ? void 0 : _a.value) || event || "0";
    console.log("Actualizando precio del material:", index, "Nuevo precio:", nuevoPrecio);
    if (this.materiales[index]) {
      this.materiales[index].precio_neto_al_momento = parseFloat(nuevoPrecio) || 0;
      console.log("Material actualizado:", this.materiales[index]);
      this.calcularTotal(true);
      this.verificarEstadoMateriales();
    }
  }
  /**
   * Verifica el estado de los materiales y el total
   */
  verificarEstadoMateriales() {
    var _a, _b;
    console.log("=== Verificaci\xF3n de Estado de Materiales ===");
    console.log("Cantidad de materiales:", this.materiales.length);
    console.log("Materiales:", this.materiales);
    console.log("Total estimado en formulario:", (_a = this.presupuestoForm.get("total_estimado")) == null ? void 0 : _a.value);
    console.log("Costo total calculado:", this.calcularCostoTotalMateriales());
    const horasEstimadas = ((_b = this.presupuestoForm.get("horas_estimadas")) == null ? void 0 : _b.value) || 0;
    const precioPorHora = 50;
    const costoManoObra = horasEstimadas * precioPorHora;
    const costoMateriales = this.materiales.reduce((total, material) => {
      const cantidad = material.cantidad_estimada || 0;
      const precio = material.precio_neto_al_momento || 0;
      return total + cantidad * precio;
    }, 0);
    const totalCalculado = costoManoObra + costoMateriales;
    console.log("Total calculado (mano obra + materiales):", totalCalculado);
    console.log("==========================================");
  }
  /**
   * Calcula el costo total de materiales
   */
  calcularCostoTotalMateriales() {
    return this.materiales.reduce((total, m) => total + m.cantidad_estimada * m.precio_neto_al_momento, 0);
  }
  calcularTotal(sinVerificacion = false) {
    var _a, _b;
    console.log("Calculando total...");
    console.log("Materiales actuales:", this.materiales);
    const horasEstimadas = ((_a = this.presupuestoForm.get("horas_estimadas")) == null ? void 0 : _a.value) || 0;
    const precioPorHora = 50;
    const costoManoObra = horasEstimadas * precioPorHora;
    const costoMateriales = this.materiales.reduce((total, material) => {
      const cantidad = material.cantidad_estimada || 0;
      const precio = material.precio_neto_al_momento || 0;
      const subtotal = cantidad * precio;
      console.log(`Material: ${material.material_id}, Cantidad: ${cantidad}, Precio: ${precio}, Subtotal: ${subtotal}`);
      return total + subtotal;
    }, 0);
    const totalEstimado = costoManoObra + costoMateriales;
    console.log("Calculando total:", {
      horasEstimadas,
      precioPorHora,
      costoManoObra,
      costoMateriales,
      totalEstimado
    });
    if (isNaN(totalEstimado) || !isFinite(totalEstimado)) {
      console.error("Error: Total calculado no es un n\xFAmero v\xE1lido");
      this.presupuestoForm.patchValue({ total_estimado: 0 });
    } else {
      this.presupuestoForm.patchValue({ total_estimado: totalEstimado });
    }
    this.presupuestoForm.updateValueAndValidity();
    console.log("Formulario despu\xE9s de calcular total:", {
      v\u00E1lido: this.presupuestoForm.valid,
      errores: this.presupuestoForm.errors,
      total_estimado: (_b = this.presupuestoForm.get("total_estimado")) == null ? void 0 : _b.value
    });
    if (!sinVerificacion) {
      this.verificarEstadoMateriales();
    }
  }
  /**
   * Limpia materiales vacíos o inválidos
   */
  limpiarMaterialesInvalidos() {
    console.log("Limpiando materiales inv\xE1lidos...");
    console.log("Materiales antes de limpiar:", this.materiales);
    this.materiales = this.materiales.filter((material) => material.material_id && material.cantidad_estimada > 0 && material.precio_neto_al_momento >= 0);
    console.log("Materiales despu\xE9s de limpiar:", this.materiales);
  }
  /**
   * Verifica el estado de los materiales antes de guardar
   */
  verificarMaterialesAntesDeGuardar() {
    console.log("=== Verificaci\xF3n de Materiales Antes de Guardar ===");
    console.log("Cantidad de materiales:", this.materiales.length);
    console.log("Materiales:", this.materiales);
    console.log("Materiales v\xE1lidos:", this.materiales.filter((m) => m.material_id && m.cantidad_estimada > 0));
    console.log("Materiales con precio v\xE1lido:", this.materiales.filter((m) => m.precio_neto_al_momento > 0));
    console.log("==================================================");
  }
  /**
   * Verifica si el formulario está listo para guardar
   */
  verificarFormulario() {
    var _a, _b, _c, _d;
    console.log("Verificando formulario...");
    console.log("AvisoId actual:", this.avisoId);
    console.log("Modo edici\xF3n:", this.modoEdicion);
    console.log("PresupuestoId:", this.presupuestoId);
    if (!this.avisoId) {
      console.error("No hay avisoId");
      return false;
    }
    if (!this.presupuestoForm.valid) {
      console.error("Formulario inv\xE1lido");
      console.log("Errores del formulario:", this.presupuestoForm.errors);
      console.log("Errores de horas_estimadas:", (_a = this.presupuestoForm.get("horas_estimadas")) == null ? void 0 : _a.errors);
      console.log("Errores de total_estimado:", (_b = this.presupuestoForm.get("total_estimado")) == null ? void 0 : _b.errors);
      return false;
    }
    const horasEstimadas = (_c = this.presupuestoForm.get("horas_estimadas")) == null ? void 0 : _c.value;
    const totalEstimado = (_d = this.presupuestoForm.get("total_estimado")) == null ? void 0 : _d.value;
    if (horasEstimadas < 0 || totalEstimado < 0) {
      console.error("Valores negativos no permitidos");
      return false;
    }
    console.log("Formulario verificado correctamente");
    return true;
  }
  guardarPresupuesto() {
    var _a, _b, _c, _d;
    console.log("Iniciando guardarPresupuesto...");
    console.log("Formulario v\xE1lido:", this.presupuestoForm.valid);
    console.log("Aviso ID:", this.avisoId);
    console.log("Valores del formulario:", this.presupuestoForm.value);
    console.log("Materiales:", this.materiales);
    if (!this.verificarFormulario()) {
      alert("Por favor, complete todos los campos requeridos correctamente");
      return;
    }
    this.loading = true;
    console.log("Iniciando operaci\xF3n de guardado...");
    this.verificarMaterialesAntesDeGuardar();
    this.limpiarMaterialesInvalidos();
    if (this.modoEdicion && this.presupuestoId) {
      console.log("Modo edici\xF3n - actualizando presupuesto:", this.presupuestoId);
      const presupuestoData = {
        horas_estimadas: (_a = this.presupuestoForm.get("horas_estimadas")) == null ? void 0 : _a.value,
        total_estimado: (_b = this.presupuestoForm.get("total_estimado")) == null ? void 0 : _b.value,
        materiales: this.materiales
        // Incluir materiales en la actualización
      };
      console.log("Datos para actualizar:", presupuestoData);
      console.log("Materiales a actualizar:", this.materiales);
      console.log("Cantidad de materiales:", this.materiales.length);
      console.log("Materiales detallados:", JSON.stringify(this.materiales, null, 2));
      this.presupuestosService.actualizarPresupuesto(this.presupuestoId, presupuestoData).subscribe({
        next: (presupuesto) => {
          console.log("Presupuesto actualizado exitosamente:", presupuesto);
          this.loading = false;
          alert("Presupuesto actualizado correctamente");
          this.router.navigate(["/presupuestos"]);
        },
        error: (error) => {
          console.error("Error al actualizar presupuesto:", error);
          this.loading = false;
          alert("Error al actualizar el presupuesto: " + (error.message || "Error desconocido"));
        }
      });
    } else {
      console.log("Modo creaci\xF3n - creando nuevo presupuesto");
      const presupuestoData = {
        aviso_id: this.avisoId || "",
        horas_estimadas: (_c = this.presupuestoForm.get("horas_estimadas")) == null ? void 0 : _c.value,
        total_estimado: (_d = this.presupuestoForm.get("total_estimado")) == null ? void 0 : _d.value,
        materiales: this.materiales
      };
      console.log("Datos para crear:", presupuestoData);
      this.presupuestosService.crearPresupuesto(presupuestoData).subscribe({
        next: (presupuesto) => {
          console.log("Presupuesto creado exitosamente:", presupuesto);
          this.loading = false;
          alert("Presupuesto creado correctamente");
          this.router.navigate(["/presupuestos"]);
        },
        error: (error) => {
          console.error("Error al crear presupuesto:", error);
          this.loading = false;
          alert("Error al crear el presupuesto: " + (error.message || "Error desconocido"));
        }
      });
    }
  }
  volver() {
    this.router.navigate(["/presupuestos"]);
  }
};
_CrearPresupuestoComponent.\u0275fac = function CrearPresupuestoComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CrearPresupuestoComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(PresupuestosService), \u0275\u0275directiveInject(AvisosService), \u0275\u0275directiveInject(InventarioService));
};
_CrearPresupuestoComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrearPresupuestoComponent, selectors: [["app-crear-presupuesto"]], decls: 46, vars: 15, consts: [[1, "presupuesto-container"], [1, "page-header"], [1, "btn-back", 3, "click"], ["name", "arrow-back-outline"], ["class", "loading-state", 4, "ngIf"], ["class", "aviso-info", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "form-group"], ["type", "number", "formControlName", "horas_estimadas", "min", "0", "step", "0.5", "placeholder", "0.0", 3, "input"], ["class", "error-message", 4, "ngIf"], ["type", "number", "formControlName", "total_estimado", "min", "0", "step", "0.01", "placeholder", "0.00"], [1, "section-header"], [1, "header-actions"], ["type", "button", 1, "btn-select-inventory", 3, "click"], ["name", "list-outline"], ["type", "button", 1, "btn-add", 3, "click"], ["name", "add-circle-outline"], ["class", "inventory-selector", 4, "ngIf"], ["class", "materiales-list", 4, "ngIf"], ["class", "no-materiales", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "btn-secondary", 3, "click"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["name", "save-outline"], ["class", "form-status", 4, "ngIf"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "aviso-info"], [1, "error-message"], [4, "ngIf"], [1, "inventory-selector"], [1, "selector-header"], ["type", "button", 1, "btn-close", 3, "click"], ["name", "close"], [1, "search-container"], ["type", "text", "placeholder", "Buscar productos...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["name", "search-outline"], ["class", "loading-products", 4, "ngIf"], ["class", "error-products", 4, "ngIf"], ["class", "products-list", 4, "ngIf"], ["class", "no-products", 4, "ngIf"], [1, "loading-products"], [1, "error-products"], ["name", "alert-circle-outline"], [1, "products-list"], ["class", "product-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "product-item", 3, "click"], [1, "product-info"], [1, "product-header"], [1, "product-code"], [1, "product-price"], [1, "product-name"], [1, "product-details"], [1, "product-stock"], [1, "product-description"], ["name", "add-circle-outline", 1, "add-icon"], [1, "no-products"], ["name", "cube-outline"], [1, "materiales-list"], ["class", "material-item", 4, "ngFor", "ngForOf"], [1, "costo-total"], [1, "material-item"], [1, "material-info"], [1, "material-header"], [1, "material-name"], [1, "material-price"], [1, "material-fields"], [1, "field-group"], ["type", "number", "min", "1", 1, "quantity-input", 3, "change", "value"], ["type", "number", "min", "0", "step", "0.01", "placeholder", "0.00", 3, "input", "value"], ["type", "button", 1, "btn-remove", 3, "click"], ["name", "trash-outline"], [1, "no-materiales"], [1, "form-status"], [1, "status-error"]], template: function CrearPresupuestoComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content")(1, "div", 0)(2, "div", 1)(3, "button", 2);
    \u0275\u0275listener("click", function CrearPresupuestoComponent_Template_button_click_3_listener() {
      return ctx.volver();
    });
    \u0275\u0275element(4, "ion-icon", 3);
    \u0275\u0275text(5, " Volver ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h1");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, CrearPresupuestoComponent_div_8_Template, 5, 0, "div", 4)(9, CrearPresupuestoComponent_div_9_Template, 11, 3, "div", 5);
    \u0275\u0275elementStart(10, "form", 6);
    \u0275\u0275listener("ngSubmit", function CrearPresupuestoComponent_Template_form_ngSubmit_10_listener() {
      return ctx.guardarPresupuesto();
    });
    \u0275\u0275elementStart(11, "div", 7)(12, "h3");
    \u0275\u0275text(13, "Estimaci\xF3n de Trabajo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 8)(15, "label");
    \u0275\u0275text(16, "Horas estimadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 9);
    \u0275\u0275listener("input", function CrearPresupuestoComponent_Template_input_input_17_listener() {
      return ctx.calcularTotal();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, CrearPresupuestoComponent_div_18_Template, 4, 3, "div", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 8)(20, "label");
    \u0275\u0275text(21, "Total estimado (\u20AC)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "input", 11);
    \u0275\u0275template(23, CrearPresupuestoComponent_div_23_Template, 4, 3, "div", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 7)(25, "div", 12)(26, "h3");
    \u0275\u0275text(27, "Materiales Estimados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 13)(29, "button", 14);
    \u0275\u0275listener("click", function CrearPresupuestoComponent_Template_button_click_29_listener() {
      return ctx.abrirSelectorMateriales();
    });
    \u0275\u0275element(30, "ion-icon", 15);
    \u0275\u0275text(31, " Seleccionar del Inventario ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 16);
    \u0275\u0275listener("click", function CrearPresupuestoComponent_Template_button_click_32_listener() {
      return ctx.agregarMaterial();
    });
    \u0275\u0275element(33, "ion-icon", 17);
    \u0275\u0275text(34, " Agregar Manualmente ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(35, CrearPresupuestoComponent_div_35_Template, 13, 5, "div", 18)(36, CrearPresupuestoComponent_div_36_Template, 8, 7, "div", 19)(37, CrearPresupuestoComponent_div_37_Template, 3, 0, "div", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 21)(39, "button", 22);
    \u0275\u0275listener("click", function CrearPresupuestoComponent_Template_button_click_39_listener() {
      return ctx.volver();
    });
    \u0275\u0275text(40, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 23);
    \u0275\u0275element(42, "ion-icon", 24);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(44, CrearPresupuestoComponent_div_44_Template, 3, 0, "div", 25)(45, CrearPresupuestoComponent_div_45_Template, 3, 0, "div", 25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.modoEdicion ? "Editar Presupuesto" : "Crear Presupuesto");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading && ctx.modoEdicion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.aviso && !ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx.presupuestoForm);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.presupuestoForm.get("horas_estimadas")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.presupuestoForm.get("horas_estimadas")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.presupuestoForm.get("total_estimado")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.presupuestoForm.get("total_estimado")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(12);
    \u0275\u0275property("ngIf", ctx.mostrarSelectorMateriales);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.materiales.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.materiales.length === 0);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("btn-disabled", !ctx.presupuestoForm.valid || ctx.loading || !ctx.avisoId);
    \u0275\u0275property("disabled", !ctx.presupuestoForm.valid || ctx.loading || !ctx.avisoId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.loading ? "Guardando..." : ctx.modoEdicion ? "Actualizar Presupuesto" : "Guardar Presupuesto", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.presupuestoForm.valid && ctx.presupuestoForm.touched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.avisoId);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, CurrencyPipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, FormsModule, NgModel, IonContent, IonIcon], styles: ['@charset "UTF-8";\n\n\n\nion-content[_ngcontent-%COMP%] {\n  --background: #fff;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #64748b;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n  color: #cbd5e0;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 0;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.presupuesto-container[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  padding: 20px;\n  background-color: #fff;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1a202c;\n  margin: 0;\n}\n.btn-back[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: #f7fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  color: #4a5568;\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: #edf2f7;\n  border-color: #cbd5e0;\n}\n.btn-back[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.aviso-info[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 24px;\n}\n.aviso-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0 0 12px 0;\n}\n.aviso-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  color: #4a5568;\n}\n.aviso-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2d3748;\n}\n.form-section[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 24px;\n  margin-bottom: 20px;\n}\n.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0 0 20px 0;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  flex: 1;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  color: #4a5568;\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #2d3748;\n  background: #fff;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #a0aec0;\n}\n.form-group[_ngcontent-%COMP%]   input.ng-invalid.ng-touched[_ngcontent-%COMP%] {\n  border-color: #e53e3e;\n  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);\n}\n.form-group[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  font-size: 12px;\n  color: #e53e3e;\n}\n.form-group[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n.btn-add[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-add[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.btn-add[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.materiales-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.material-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n  padding: 16px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}\n.material-fields[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex: 1;\n}\n.material-fields[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 8px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.material-fields[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4f46e5;\n}\n.btn-remove[_ngcontent-%COMP%] {\n  padding: 8px;\n  background: #fed7d7;\n  color: #e53e3e;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-remove[_ngcontent-%COMP%]:hover {\n  background: #feb2b2;\n}\n.btn-remove[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.no-materiales[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #a0aec0;\n  font-style: italic;\n  padding: 20px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 24px;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: white;\n  color: #4a5568;\n  border: 1px solid #e2e8f0;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f7fafc;\n  border-color: #cbd5e0;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n  border: 1px solid #4f46e5;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338ca;\n  border-color: #4338ca;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  background: #a0aec0;\n  border-color: #a0aec0;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.btn-primary.btn-disabled[_ngcontent-%COMP%] {\n  background: #a0aec0;\n  border-color: #a0aec0;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.btn-primary[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.form-status[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  padding: 12px;\n  border-radius: 6px;\n}\n.form-status[_ngcontent-%COMP%]   .status-error[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: #e53e3e;\n  background: #fed7d7;\n  padding: 8px 12px;\n  border-radius: 4px;\n  border-left: 4px solid #e53e3e;\n}\n.inventory-selector[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 20px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.inventory-selector[_ngcontent-%COMP%]   .selector-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .selector-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1F2937;\n  font-size: 18px;\n  font-weight: 600;\n}\n.inventory-selector[_ngcontent-%COMP%]   .selector-header[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #6B7280;\n  font-size: 20px;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.inventory-selector[_ngcontent-%COMP%]   .selector-header[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover {\n  background: #F3F4F6;\n  color: #374151;\n}\n.inventory-selector[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 20px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 40px 12px 16px;\n  border: 1px solid #D1D5DB;\n  border-radius: 8px;\n  font-size: 14px;\n  background: #F9FAFB;\n}\n.inventory-selector[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3B82F6;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.inventory-selector[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9CA3AF;\n  font-size: 18px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .loading-products[_ngcontent-%COMP%], \n.inventory-selector[_ngcontent-%COMP%]   .error-products[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #6B7280;\n  font-size: 14px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .loading-products[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], \n.inventory-selector[_ngcontent-%COMP%]   .error-products[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  font-size: 20px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .loading-products.spinning[_ngcontent-%COMP%], \n.inventory-selector[_ngcontent-%COMP%]   .error-products.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.inventory-selector[_ngcontent-%COMP%]   .error-products[_ngcontent-%COMP%] {\n  color: #DC2626;\n}\n.inventory-selector[_ngcontent-%COMP%]   .error-products[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #DC2626;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%] {\n  max-height: 300px;\n  overflow-y: auto;\n  border: 1px solid #E5E7EB;\n  border-radius: 8px;\n  background: #F9FAFB;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n  border-bottom: 1px solid #E5E7EB;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]:hover {\n  background: #F3F4F6;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 4px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-header[_ngcontent-%COMP%]   .product-code[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6B7280;\n  background: #E5E7EB;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-weight: 500;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-header[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #059669;\n  font-size: 14px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1F2937;\n  font-size: 14px;\n  margin-bottom: 4px;\n  display: block;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   .product-stock[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6B7280;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   .product-description[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9CA3AF;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%]   .product-item[_ngcontent-%COMP%]   .add-icon[_ngcontent-%COMP%] {\n  color: #3B82F6;\n  font-size: 20px;\n  margin-left: 12px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .no-products[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #6B7280;\n}\n.inventory-selector[_ngcontent-%COMP%]   .no-products[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #D1D5DB;\n  margin-bottom: 12px;\n}\n.inventory-selector[_ngcontent-%COMP%]   .no-products[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.header-actions[_ngcontent-%COMP%]   .btn-select-inventory[_ngcontent-%COMP%] {\n  background: #3B82F6;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  transition: all 0.2s;\n}\n.header-actions[_ngcontent-%COMP%]   .btn-select-inventory[_ngcontent-%COMP%]:hover {\n  background: #2563EB;\n}\n.header-actions[_ngcontent-%COMP%]   .btn-select-inventory[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.materiales-list[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.materiales-list[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  color: #1F2937;\n  font-size: 16px;\n  font-weight: 600;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n  background: #F9FAFB;\n  border: 1px solid #E5E7EB;\n  border-radius: 8px;\n  margin-bottom: 12px;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-info[_ngcontent-%COMP%]   .material-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-info[_ngcontent-%COMP%]   .material-header[_ngcontent-%COMP%]   .material-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1F2937;\n  font-size: 14px;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-info[_ngcontent-%COMP%]   .material-header[_ngcontent-%COMP%]   .material-price[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #059669;\n  font-size: 14px;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-info[_ngcontent-%COMP%]   .material-fields[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-info[_ngcontent-%COMP%]   .material-fields[_ngcontent-%COMP%]   .field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-info[_ngcontent-%COMP%]   .material-fields[_ngcontent-%COMP%]   .field-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6B7280;\n  font-weight: 500;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-info[_ngcontent-%COMP%]   .material-fields[_ngcontent-%COMP%]   .field-group[_ngcontent-%COMP%]   .quantity-input[_ngcontent-%COMP%], \n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-info[_ngcontent-%COMP%]   .material-fields[_ngcontent-%COMP%]   .field-group[_ngcontent-%COMP%]   .price-input[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #D1D5DB;\n  border-radius: 6px;\n  font-size: 14px;\n  width: 100px;\n  background-color: #fff;\n  color: #000;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-info[_ngcontent-%COMP%]   .material-fields[_ngcontent-%COMP%]   .field-group[_ngcontent-%COMP%]   .quantity-input[_ngcontent-%COMP%]:focus, \n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-info[_ngcontent-%COMP%]   .material-fields[_ngcontent-%COMP%]   .field-group[_ngcontent-%COMP%]   .price-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3B82F6;\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%] {\n  background: #FEE2E2;\n  color: #DC2626;\n  border: none;\n  padding: 8px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%]:hover {\n  background: #FECACA;\n}\n.materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.materiales-list[_ngcontent-%COMP%]   .costo-total[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 12px 16px;\n  background: #F0F9FF;\n  border: 1px solid #BAE6FD;\n  border-radius: 8px;\n  text-align: center;\n}\n.materiales-list[_ngcontent-%COMP%]   .costo-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0369A1;\n  font-size: 16px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .presupuesto-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n  .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .form-section[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .section-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .material-fields[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .material-fields[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .inventory-selector[_ngcontent-%COMP%]   .products-list[_ngcontent-%COMP%] {\n    max-height: 250px;\n  }\n  .materiales-list[_ngcontent-%COMP%]   .material-item[_ngcontent-%COMP%]   .material-fields[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .header-actions[_ngcontent-%COMP%]   .btn-select-inventory[_ngcontent-%COMP%], \n   .header-actions[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=crear-presupuesto.component.css.map */'] });
var CrearPresupuestoComponent = _CrearPresupuestoComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrearPresupuestoComponent, [{
    type: Component,
    args: [{ selector: "app-crear-presupuesto", standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule, IonContent, IonIcon], template: `<ion-content>\r
  <div class="presupuesto-container">\r
    <!-- Header -->\r
    <div class="page-header">\r
      <button class="btn-back" (click)="volver()">\r
        <ion-icon name="arrow-back-outline"></ion-icon>\r
        Volver\r
      </button>\r
      <h1>{{ modoEdicion ? 'Editar Presupuesto' : 'Crear Presupuesto' }}</h1>\r
    </div>\r
\r
    <!-- Estado de carga -->\r
    <div *ngIf="loading && modoEdicion" class="loading-state">\r
      <div class="loading-spinner">\r
        <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
        <p>Cargando presupuesto...</p>\r
      </div>\r
    </div>\r
\r
    <!-- Informaci\xF3n del Aviso -->\r
    <div class="aviso-info" *ngIf="aviso && !loading">\r
      <h2>Aviso: #{{ aviso.id?.substring(0, 8) }}</h2>\r
      <p><strong>Cliente:</strong> {{ aviso.nombre_cliente_aviso }}</p>\r
      <p><strong>Descripci\xF3n:</strong> {{ aviso.descripcion_problema }}</p>\r
    </div>\r
\r
    <!-- Formulario -->\r
    <form [formGroup]="presupuestoForm" (ngSubmit)="guardarPresupuesto()">\r
      <div class="form-section">\r
        <h3>Estimaci\xF3n de Trabajo</h3>\r
        \r
        <div class="form-group">\r
          <label>Horas estimadas</label>\r
          <input \r
            type="number" \r
            formControlName="horas_estimadas"\r
            (input)="calcularTotal()"\r
            min="0"\r
            step="0.5"\r
            placeholder="0.0">\r
          <div *ngIf="presupuestoForm.get('horas_estimadas')?.invalid && presupuestoForm.get('horas_estimadas')?.touched" class="error-message">\r
            <span *ngIf="presupuestoForm.get('horas_estimadas')?.errors?.['required']">Las horas estimadas son requeridas</span>\r
            <span *ngIf="presupuestoForm.get('horas_estimadas')?.errors?.['min']">Las horas deben ser mayor o igual a 0</span>\r
            <span *ngIf="presupuestoForm.get('horas_estimadas')?.errors?.['max']">Las horas no pueden exceder 1000</span>\r
          </div>\r
        </div>\r
\r
        <div class="form-group">\r
          <label>Total estimado (\u20AC)</label>\r
          <input \r
            type="number" \r
            formControlName="total_estimado"\r
            min="0"\r
            step="0.01"\r
            placeholder="0.00">\r
          <div *ngIf="presupuestoForm.get('total_estimado')?.invalid && presupuestoForm.get('total_estimado')?.touched" class="error-message">\r
            <span *ngIf="presupuestoForm.get('total_estimado')?.errors?.['required']">El total estimado es requerido</span>\r
            <span *ngIf="presupuestoForm.get('total_estimado')?.errors?.['min']">El total debe ser mayor o igual a 0</span>\r
            <span *ngIf="presupuestoForm.get('total_estimado')?.errors?.['max']">El total no puede exceder 1,000,000</span>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Materiales -->\r
      <div class="form-section">\r
        <div class="section-header">\r
          <h3>Materiales Estimados</h3>\r
          <div class="header-actions">\r
            <button type="button" class="btn-select-inventory" (click)="abrirSelectorMateriales()">\r
              <ion-icon name="list-outline"></ion-icon>\r
              Seleccionar del Inventario\r
            </button>\r
            <button type="button" class="btn-add" (click)="agregarMaterial()">\r
              <ion-icon name="add-circle-outline"></ion-icon>\r
              Agregar Manualmente\r
            </button>\r
          </div>\r
        </div>\r
\r
        <!-- Selector de materiales del inventario -->\r
        <div *ngIf="mostrarSelectorMateriales" class="inventory-selector">\r
          <div class="selector-header">\r
            <h4>Seleccionar Materiales del Inventario</h4>\r
            <button type="button" class="btn-close" (click)="cerrarSelectorMateriales()">\r
              <ion-icon name="close"></ion-icon>\r
            </button>\r
          </div>\r
          \r
          <!-- B\xFAsqueda de productos -->\r
          <div class="search-container">\r
            <input \r
              type="text" \r
              [(ngModel)]="busquedaProducto"\r
              (input)="filtrarProductos($event)"\r
              placeholder="Buscar productos..."\r
              class="search-input">\r
            <ion-icon name="search-outline"></ion-icon>\r
          </div>\r
\r
          <!-- Estado de carga de productos -->\r
          <div *ngIf="loadingProductos" class="loading-products">\r
            <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
            <span>Cargando productos...</span>\r
          </div>\r
\r
          <!-- Error al cargar productos -->\r
          <div *ngIf="errorProductos" class="error-products">\r
            <ion-icon name="alert-circle-outline"></ion-icon>\r
            <span>{{ errorProductos }}</span>\r
          </div>\r
\r
          <!-- Lista de productos -->\r
          <div *ngIf="!loadingProductos && !errorProductos" class="products-list">\r
            <div \r
              *ngFor="let producto of productosFiltrados" \r
              class="product-item"\r
              (click)="agregarMaterialDelInventario(producto)">\r
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
\r
          <!-- Sin productos -->\r
          <div *ngIf="!loadingProductos && !errorProductos && productosFiltrados.length === 0" class="no-products">\r
            <ion-icon name="cube-outline"></ion-icon>\r
            <p>No se encontraron productos</p>\r
          </div>\r
        </div>\r
\r
        <!-- Lista de materiales a\xF1adidos -->\r
        <div class="materiales-list" *ngIf="materiales.length > 0">\r
          <h4>Materiales a\xF1adidos</h4>\r
          <div class="material-item" *ngFor="let material of materiales; let i = index">\r
            <div class="material-info">\r
              <div class="material-header">\r
                <span class="material-name">{{ getNombreProducto(material.material_id) }}</span>\r
                <span class="material-price">{{ material.precio_neto_al_momento | currency:'EUR':'symbol':'1.2-2' }}</span>\r
              </div>\r
              <div class="material-fields">\r
                <div class="field-group">\r
                  <label>Cantidad:</label>\r
                  <input \r
                    type="number" \r
                    [value]="material.cantidad_estimada"\r
                    (change)="actualizarCantidadMaterial(i, $event)"\r
                    min="1"\r
                    class="quantity-input">\r
                </div>\r
                \r
                <div class="field-group">\r
                  <label>Precio unitario:</label>\r
                  <input \r
                    type="number" \r
                    [value]="material.precio_neto_al_momento"\r
                    (input)="actualizarPrecioMaterial(i, $event)"\r
                    min="0"\r
                    step="0.01"\r
                    placeholder="0.00">\r
                </div>\r
              </div>\r
            </div>\r
            \r
            <button type="button" class="btn-remove" (click)="eliminarMaterial(i)">\r
              <ion-icon name="trash-outline"></ion-icon>\r
            </button>\r
          </div>\r
\r
          <!-- Resumen de costos -->\r
          <div class="costo-total">\r
            <strong>Costo total de materiales: {{ calcularCostoTotalMateriales() | currency:'EUR':'symbol':'1.2-2' }}</strong>\r
          </div>\r
        </div>\r
\r
        <div class="no-materiales" *ngIf="materiales.length === 0">\r
          <p>No se han agregado materiales al presupuesto</p>\r
        </div>\r
      </div>\r
\r
      <!-- Botones -->\r
      <div class="form-actions">\r
        <button type="button" class="btn-secondary" (click)="volver()">\r
          Cancelar\r
        </button>\r
        <button \r
          type="submit" \r
          class="btn-primary" \r
          [disabled]="!presupuestoForm.valid || loading || !avisoId"\r
          [class.btn-disabled]="!presupuestoForm.valid || loading || !avisoId">\r
          <ion-icon name="save-outline"></ion-icon>\r
          {{ loading ? 'Guardando...' : (modoEdicion ? 'Actualizar Presupuesto' : 'Guardar Presupuesto') }}\r
        </button>\r
      </div>\r
      \r
      <!-- Informaci\xF3n de estado -->\r
      <div *ngIf="!presupuestoForm.valid && presupuestoForm.touched" class="form-status">\r
        <p class="status-error">Por favor, complete todos los campos requeridos correctamente</p>\r
      </div>\r
      <div *ngIf="!avisoId" class="form-status">\r
        <p class="status-error">No se ha seleccionado un aviso</p>\r
      </div>\r
    </form>\r
  </div>\r
</ion-content> `, styles: ['@charset "UTF-8";\n\n/* src/app/modules/presupuestos/components/crear-presupuesto/crear-presupuesto.component.scss */\nion-content {\n  --background: #fff;\n}\n.loading-state {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}\n.loading-state .loading-spinner {\n  text-align: center;\n  color: #64748b;\n}\n.loading-state .loading-spinner ion-icon {\n  font-size: 48px;\n  margin-bottom: 16px;\n  color: #cbd5e0;\n}\n.loading-state .loading-spinner ion-icon.spinning {\n  animation: spin 1s linear infinite;\n}\n.loading-state .loading-spinner p {\n  font-size: 16px;\n  margin: 0;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.presupuesto-container {\n  margin: 0 auto;\n  padding: 20px;\n  background-color: #fff;\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.page-header h1 {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1a202c;\n  margin: 0;\n}\n.btn-back {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: #f7fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  color: #4a5568;\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-back:hover {\n  background: #edf2f7;\n  border-color: #cbd5e0;\n}\n.btn-back ion-icon {\n  font-size: 18px;\n}\n.aviso-info {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 24px;\n}\n.aviso-info h2 {\n  font-size: 18px;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0 0 12px 0;\n}\n.aviso-info p {\n  margin: 8px 0;\n  color: #4a5568;\n}\n.aviso-info p strong {\n  color: #2d3748;\n}\n.form-section {\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 24px;\n  margin-bottom: 20px;\n}\n.form-section h3 {\n  font-size: 16px;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0 0 20px 0;\n}\n.section-header {\n  display: flex;\n  justify-content: between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.section-header h3 {\n  margin: 0;\n  flex: 1;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  color: #4a5568;\n  margin-bottom: 6px;\n}\n.form-group input {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #2d3748;\n  background: #fff;\n  transition: border-color 0.2s;\n}\n.form-group input:focus {\n  outline: none;\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-group input::placeholder {\n  color: #a0aec0;\n}\n.form-group input.ng-invalid.ng-touched {\n  border-color: #e53e3e;\n  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);\n}\n.form-group .error-message {\n  margin-top: 4px;\n  font-size: 12px;\n  color: #e53e3e;\n}\n.form-group .error-message span {\n  display: block;\n}\n.btn-add {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-add:hover {\n  background: #4338ca;\n}\n.btn-add ion-icon {\n  font-size: 16px;\n}\n.materiales-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.material-item {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n  padding: 16px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}\n.material-fields {\n  display: flex;\n  gap: 12px;\n  flex: 1;\n}\n.material-fields input {\n  flex: 1;\n  padding: 8px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.material-fields input:focus {\n  outline: none;\n  border-color: #4f46e5;\n}\n.btn-remove {\n  padding: 8px;\n  background: #fed7d7;\n  color: #e53e3e;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-remove:hover {\n  background: #feb2b2;\n}\n.btn-remove ion-icon {\n  font-size: 16px;\n}\n.no-materiales {\n  text-align: center;\n  color: #a0aec0;\n  font-style: italic;\n  padding: 20px;\n}\n.form-actions {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 24px;\n}\n.form-actions button {\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.form-actions button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-secondary {\n  background: white;\n  color: #4a5568;\n  border: 1px solid #e2e8f0;\n}\n.btn-secondary:hover:not(:disabled) {\n  background: #f7fafc;\n  border-color: #cbd5e0;\n}\n.btn-primary {\n  background: #4f46e5;\n  color: white;\n  border: 1px solid #4f46e5;\n}\n.btn-primary:hover:not(:disabled) {\n  background: #4338ca;\n  border-color: #4338ca;\n}\n.btn-primary:disabled {\n  background: #a0aec0;\n  border-color: #a0aec0;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.btn-primary.btn-disabled {\n  background: #a0aec0;\n  border-color: #a0aec0;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.btn-primary ion-icon {\n  font-size: 16px;\n}\n.form-status {\n  margin-top: 12px;\n  padding: 12px;\n  border-radius: 6px;\n}\n.form-status .status-error {\n  margin: 0;\n  font-size: 14px;\n  color: #e53e3e;\n  background: #fed7d7;\n  padding: 8px 12px;\n  border-radius: 4px;\n  border-left: 4px solid #e53e3e;\n}\n.inventory-selector {\n  background: #fff;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 20px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.inventory-selector .selector-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.inventory-selector .selector-header h4 {\n  margin: 0;\n  color: #1F2937;\n  font-size: 18px;\n  font-weight: 600;\n}\n.inventory-selector .selector-header .btn-close {\n  background: none;\n  border: none;\n  color: #6B7280;\n  font-size: 20px;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.inventory-selector .selector-header .btn-close:hover {\n  background: #F3F4F6;\n  color: #374151;\n}\n.inventory-selector .search-container {\n  position: relative;\n  margin-bottom: 20px;\n}\n.inventory-selector .search-container .search-input {\n  width: 100%;\n  padding: 12px 40px 12px 16px;\n  border: 1px solid #D1D5DB;\n  border-radius: 8px;\n  font-size: 14px;\n  background: #F9FAFB;\n}\n.inventory-selector .search-container .search-input:focus {\n  outline: none;\n  border-color: #3B82F6;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.inventory-selector .search-container ion-icon {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9CA3AF;\n  font-size: 18px;\n}\n.inventory-selector .loading-products,\n.inventory-selector .error-products {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #6B7280;\n  font-size: 14px;\n}\n.inventory-selector .loading-products ion-icon,\n.inventory-selector .error-products ion-icon {\n  margin-right: 8px;\n  font-size: 20px;\n}\n.inventory-selector .loading-products.spinning,\n.inventory-selector .error-products.spinning {\n  animation: spin 1s linear infinite;\n}\n.inventory-selector .error-products {\n  color: #DC2626;\n}\n.inventory-selector .error-products ion-icon {\n  color: #DC2626;\n}\n.inventory-selector .products-list {\n  max-height: 300px;\n  overflow-y: auto;\n  border: 1px solid #E5E7EB;\n  border-radius: 8px;\n  background: #F9FAFB;\n}\n.inventory-selector .products-list .product-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n  border-bottom: 1px solid #E5E7EB;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.inventory-selector .products-list .product-item:last-child {\n  border-bottom: none;\n}\n.inventory-selector .products-list .product-item:hover {\n  background: #F3F4F6;\n}\n.inventory-selector .products-list .product-item .product-info {\n  flex: 1;\n}\n.inventory-selector .products-list .product-item .product-info .product-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 4px;\n}\n.inventory-selector .products-list .product-item .product-info .product-header .product-code {\n  font-size: 12px;\n  color: #6B7280;\n  background: #E5E7EB;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-weight: 500;\n}\n.inventory-selector .products-list .product-item .product-info .product-header .product-price {\n  font-weight: 600;\n  color: #059669;\n  font-size: 14px;\n}\n.inventory-selector .products-list .product-item .product-info .product-name {\n  font-weight: 600;\n  color: #1F2937;\n  font-size: 14px;\n  margin-bottom: 4px;\n  display: block;\n}\n.inventory-selector .products-list .product-item .product-info .product-details {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.inventory-selector .products-list .product-item .product-info .product-details .product-stock {\n  font-size: 12px;\n  color: #6B7280;\n}\n.inventory-selector .products-list .product-item .product-info .product-details .product-description {\n  font-size: 12px;\n  color: #9CA3AF;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.inventory-selector .products-list .product-item .add-icon {\n  color: #3B82F6;\n  font-size: 20px;\n  margin-left: 12px;\n}\n.inventory-selector .no-products {\n  text-align: center;\n  padding: 40px 20px;\n  color: #6B7280;\n}\n.inventory-selector .no-products ion-icon {\n  font-size: 48px;\n  color: #D1D5DB;\n  margin-bottom: 12px;\n}\n.inventory-selector .no-products p {\n  margin: 0;\n  font-size: 14px;\n}\n.header-actions {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.header-actions .btn-select-inventory {\n  background: #3B82F6;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  transition: all 0.2s;\n}\n.header-actions .btn-select-inventory:hover {\n  background: #2563EB;\n}\n.header-actions .btn-select-inventory ion-icon {\n  font-size: 16px;\n}\n.materiales-list {\n  margin-top: 20px;\n}\n.materiales-list h4 {\n  margin: 0 0 16px 0;\n  color: #1F2937;\n  font-size: 16px;\n  font-weight: 600;\n}\n.materiales-list .material-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n  background: #F9FAFB;\n  border: 1px solid #E5E7EB;\n  border-radius: 8px;\n  margin-bottom: 12px;\n}\n.materiales-list .material-item .material-info {\n  flex: 1;\n}\n.materiales-list .material-item .material-info .material-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.materiales-list .material-item .material-info .material-header .material-name {\n  font-weight: 600;\n  color: #1F2937;\n  font-size: 14px;\n}\n.materiales-list .material-item .material-info .material-header .material-price {\n  font-weight: 600;\n  color: #059669;\n  font-size: 14px;\n}\n.materiales-list .material-item .material-info .material-fields {\n  display: flex;\n  gap: 16px;\n}\n.materiales-list .material-item .material-info .material-fields .field-group {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.materiales-list .material-item .material-info .material-fields .field-group label {\n  font-size: 12px;\n  color: #6B7280;\n  font-weight: 500;\n}\n.materiales-list .material-item .material-info .material-fields .field-group .quantity-input,\n.materiales-list .material-item .material-info .material-fields .field-group .price-input {\n  padding: 8px 12px;\n  border: 1px solid #D1D5DB;\n  border-radius: 6px;\n  font-size: 14px;\n  width: 100px;\n  background-color: #fff;\n  color: #000;\n}\n.materiales-list .material-item .material-info .material-fields .field-group .quantity-input:focus,\n.materiales-list .material-item .material-info .material-fields .field-group .price-input:focus {\n  outline: none;\n  border-color: #3B82F6;\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);\n}\n.materiales-list .material-item .btn-remove {\n  background: #FEE2E2;\n  color: #DC2626;\n  border: none;\n  padding: 8px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.materiales-list .material-item .btn-remove:hover {\n  background: #FECACA;\n}\n.materiales-list .material-item .btn-remove ion-icon {\n  font-size: 16px;\n}\n.materiales-list .costo-total {\n  margin-top: 16px;\n  padding: 12px 16px;\n  background: #F0F9FF;\n  border: 1px solid #BAE6FD;\n  border-radius: 8px;\n  text-align: center;\n}\n.materiales-list .costo-total strong {\n  color: #0369A1;\n  font-size: 16px;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .presupuesto-container {\n    padding: 16px;\n  }\n  .page-header {\n    margin-bottom: 16px;\n  }\n  .page-header h1 {\n    font-size: 20px;\n  }\n  .form-section {\n    padding: 16px;\n  }\n  .section-header {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .material-fields {\n    flex-direction: column;\n  }\n  .material-fields input {\n    width: 100%;\n  }\n  .form-actions {\n    flex-direction: column;\n  }\n  .form-actions button {\n    width: 100%;\n    justify-content: center;\n  }\n  .inventory-selector .products-list {\n    max-height: 250px;\n  }\n  .materiales-list .material-item .material-fields {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .header-actions {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .header-actions .btn-select-inventory,\n  .header-actions .btn-add {\n    width: 100%;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=crear-presupuesto.component.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: Router }, { type: ActivatedRoute }, { type: PresupuestosService }, { type: AvisosService }, { type: InventarioService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrearPresupuestoComponent, { className: "CrearPresupuestoComponent", filePath: "src/app/modules/presupuestos/components/crear-presupuesto/crear-presupuesto.component.ts", lineNumber: 33 });
})();
export {
  CrearPresupuestoComponent
};
//# sourceMappingURL=crear-presupuesto.component-GZOBC3NN.js.map
