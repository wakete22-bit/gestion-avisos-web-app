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
  closeOutline,
  createOutline,
  download,
  downloadOutline,
  eyeOutline,
  print,
  printOutline,
  refreshOutline,
  trash,
  trashOutline
} from "./chunk-YLHOXAZF.js";
import "./chunk-7DTAJMEV.js";
import {
  IonIcon
} from "./chunk-DJA56OJT.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  CurrencyPipe,
  DatePipe,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  Input,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  Router,
  Validators,
  setClassMetadata,
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
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
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
import {
  __async
} from "./chunk-KNQSF6OU.js";

// src/app/modules/facturas/components/crear-factura/crear-factura.component.ts
var _c0 = () => ({ standalone: true });
function CrearFacturaComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33);
    \u0275\u0275element(2, "ion-icon", 34);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando factura para editar...");
    \u0275\u0275elementEnd()()();
  }
}
function CrearFacturaComponent_div_2_tr_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function CrearFacturaComponent_div_2_tr_49_Template_input_ngModelChange_2_listener($event) {
      const repuesto_r4 = \u0275\u0275restoreView(_r3).$implicit;
      \u0275\u0275twoWayBindingSet(repuesto_r4.nombre, $event) || (repuesto_r4.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", function CrearFacturaComponent_div_2_tr_49_Template_input_ngModelChange_4_listener($event) {
      const repuesto_r4 = \u0275\u0275restoreView(_r3).$implicit;
      \u0275\u0275twoWayBindingSet(repuesto_r4.cantidad, $event) || (repuesto_r4.cantidad = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td")(6, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function CrearFacturaComponent_div_2_tr_49_Template_input_ngModelChange_6_listener($event) {
      const repuesto_r4 = \u0275\u0275restoreView(_r3).$implicit;
      \u0275\u0275twoWayBindingSet(repuesto_r4.precio_neto, $event) || (repuesto_r4.precio_neto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 57)(8, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function CrearFacturaComponent_div_2_tr_49_Template_input_ngModelChange_8_listener($event) {
      const repuesto_r4 = \u0275\u0275restoreView(_r3).$implicit;
      \u0275\u0275twoWayBindingSet(repuesto_r4.precio_pvp, $event) || (repuesto_r4.precio_pvp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 58)(10, "button", 59);
    \u0275\u0275listener("click", function CrearFacturaComponent_div_2_tr_49_Template_button_click_10_listener() {
      const i_r5 = \u0275\u0275restoreView(_r3).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eliminarRepuesto(i_r5));
    });
    \u0275\u0275element(11, "ion-icon", 60);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const repuesto_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", repuesto_r4.nombre);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", repuesto_r4.cantidad);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(9, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", repuesto_r4.precio_neto);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(10, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", repuesto_r4.precio_pvp);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(11, _c0));
  }
}
function CrearFacturaComponent_div_2_tr_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 61)(1, "td", 62);
    \u0275\u0275text(2, "No hay repuestos a\xF1adidos");
    \u0275\u0275elementEnd()();
  }
}
function CrearFacturaComponent_div_2_tr_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 63)(1, "td", 64);
    \u0275\u0275text(2, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 57);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "td");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(5, 2, ctx_r1.totalRepuestosNeto, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(8, 7, ctx_r1.totalRepuestosPvp, "EUR", "symbol", "1.2-2"));
  }
}
function CrearFacturaComponent_div_2_tr_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "input", 65);
    \u0275\u0275twoWayListener("ngModelChange", function CrearFacturaComponent_div_2_tr_70_Template_input_ngModelChange_2_listener($event) {
      const mano_r7 = \u0275\u0275restoreView(_r6).$implicit;
      \u0275\u0275twoWayBindingSet(mano_r7.nombre, $event) || (mano_r7.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "input", 66);
    \u0275\u0275twoWayListener("ngModelChange", function CrearFacturaComponent_div_2_tr_70_Template_input_ngModelChange_4_listener($event) {
      const mano_r7 = \u0275\u0275restoreView(_r6).$implicit;
      \u0275\u0275twoWayBindingSet(mano_r7.cantidad, $event) || (mano_r7.cantidad = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td", 57)(6, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function CrearFacturaComponent_div_2_tr_70_Template_input_ngModelChange_6_listener($event) {
      const mano_r7 = \u0275\u0275restoreView(_r6).$implicit;
      \u0275\u0275twoWayBindingSet(mano_r7.precio_pvp, $event) || (mano_r7.precio_pvp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 58)(8, "button", 59);
    \u0275\u0275listener("click", function CrearFacturaComponent_div_2_tr_70_Template_button_click_8_listener() {
      const i_r8 = \u0275\u0275restoreView(_r6).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eliminarManoObra(i_r8));
    });
    \u0275\u0275element(9, "ion-icon", 60);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const mano_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", mano_r7.nombre);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(6, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", mano_r7.cantidad);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(7, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", mano_r7.precio_pvp);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c0));
  }
}
function CrearFacturaComponent_div_2_tr_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 61)(1, "td", 67);
    \u0275\u0275text(2, "No hay mano de obra a\xF1adida");
    \u0275\u0275elementEnd()();
  }
}
function CrearFacturaComponent_div_2_tr_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 63)(1, "td", 64);
    \u0275\u0275text(2, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 57);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "td");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(5, 1, ctx_r1.totalManoObra, "EUR", "symbol", "1.2-2"));
  }
}
function CrearFacturaComponent_div_2_tr_91_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "input", 68);
    \u0275\u0275twoWayListener("ngModelChange", function CrearFacturaComponent_div_2_tr_91_Template_input_ngModelChange_2_listener($event) {
      const desplazamiento_r10 = \u0275\u0275restoreView(_r9).$implicit;
      \u0275\u0275twoWayBindingSet(desplazamiento_r10.nombre, $event) || (desplazamiento_r10.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", function CrearFacturaComponent_div_2_tr_91_Template_input_ngModelChange_4_listener($event) {
      const desplazamiento_r10 = \u0275\u0275restoreView(_r9).$implicit;
      \u0275\u0275twoWayBindingSet(desplazamiento_r10.cantidad, $event) || (desplazamiento_r10.cantidad = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td", 57)(6, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function CrearFacturaComponent_div_2_tr_91_Template_input_ngModelChange_6_listener($event) {
      const desplazamiento_r10 = \u0275\u0275restoreView(_r9).$implicit;
      \u0275\u0275twoWayBindingSet(desplazamiento_r10.precio_pvp, $event) || (desplazamiento_r10.precio_pvp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 58)(8, "button", 59);
    \u0275\u0275listener("click", function CrearFacturaComponent_div_2_tr_91_Template_button_click_8_listener() {
      const i_r11 = \u0275\u0275restoreView(_r9).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eliminarDesplazamiento(i_r11));
    });
    \u0275\u0275element(9, "ion-icon", 60);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const desplazamiento_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", desplazamiento_r10.nombre);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(6, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", desplazamiento_r10.cantidad);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(7, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", desplazamiento_r10.precio_pvp);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c0));
  }
}
function CrearFacturaComponent_div_2_tr_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 61)(1, "td", 67);
    \u0275\u0275text(2, "No hay desplazamientos a\xF1adidos");
    \u0275\u0275elementEnd()();
  }
}
function CrearFacturaComponent_div_2_tr_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 63)(1, "td", 64);
    \u0275\u0275text(2, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 57);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "td");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(5, 1, ctx_r1.totalDesplazamiento, "EUR", "symbol", "1.2-2"));
  }
}
function CrearFacturaComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 36)(4, "div", 37)(5, "div", 38)(6, "label");
    \u0275\u0275text(7, "N\xFAmero Factura");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 38)(10, "label");
    \u0275\u0275text(11, "Fecha de emisi\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 38)(14, "label");
    \u0275\u0275text(15, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 38)(18, "label");
    \u0275\u0275text(19, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "input", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 38)(22, "label");
    \u0275\u0275text(23, "CIF");
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "input", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 38)(26, "label");
    \u0275\u0275text(27, "Correo electr\xF3nico");
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "input", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "section", 45)(30, "div", 46)(31, "span");
    \u0275\u0275text(32, "Repuestos Utilizados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 47);
    \u0275\u0275listener("click", function CrearFacturaComponent_div_2_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.agregarRepuesto());
    });
    \u0275\u0275elementStart(34, "span");
    \u0275\u0275text(35, "+");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "table")(37, "thead")(38, "tr")(39, "th");
    \u0275\u0275text(40, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "th");
    \u0275\u0275text(42, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "th");
    \u0275\u0275text(44, "Neto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "th");
    \u0275\u0275text(46, "PVP");
    \u0275\u0275elementEnd();
    \u0275\u0275element(47, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "tbody");
    \u0275\u0275template(49, CrearFacturaComponent_div_2_tr_49_Template, 12, 12, "tr", 21)(50, CrearFacturaComponent_div_2_tr_50_Template, 3, 0, "tr", 48)(51, CrearFacturaComponent_div_2_tr_51_Template, 10, 12, "tr", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "section", 45)(53, "div", 46)(54, "span");
    \u0275\u0275text(55, "Mano de Obra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "button", 47);
    \u0275\u0275listener("click", function CrearFacturaComponent_div_2_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.agregarManoObra());
    });
    \u0275\u0275elementStart(57, "span");
    \u0275\u0275text(58, "+");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "table")(60, "thead")(61, "tr")(62, "th");
    \u0275\u0275text(63, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "th");
    \u0275\u0275text(65, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "th");
    \u0275\u0275text(67, "PVP");
    \u0275\u0275elementEnd();
    \u0275\u0275element(68, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "tbody");
    \u0275\u0275template(70, CrearFacturaComponent_div_2_tr_70_Template, 10, 9, "tr", 21)(71, CrearFacturaComponent_div_2_tr_71_Template, 3, 0, "tr", 48)(72, CrearFacturaComponent_div_2_tr_72_Template, 7, 6, "tr", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(73, "section", 45)(74, "div", 46)(75, "span");
    \u0275\u0275text(76, "Desplazamiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "button", 47);
    \u0275\u0275listener("click", function CrearFacturaComponent_div_2_Template_button_click_77_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.agregarDesplazamiento());
    });
    \u0275\u0275elementStart(78, "span");
    \u0275\u0275text(79, "+");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(80, "table")(81, "thead")(82, "tr")(83, "th");
    \u0275\u0275text(84, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "th");
    \u0275\u0275text(86, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "th");
    \u0275\u0275text(88, "PVP");
    \u0275\u0275elementEnd();
    \u0275\u0275element(89, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(90, "tbody");
    \u0275\u0275template(91, CrearFacturaComponent_div_2_tr_91_Template, 10, 9, "tr", 21)(92, CrearFacturaComponent_div_2_tr_92_Template, 3, 0, "tr", 48)(93, CrearFacturaComponent_div_2_tr_93_Template, 7, 6, "tr", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(94, "section", 45)(95, "div", 49)(96, "span");
    \u0275\u0275text(97, "Detalles descripci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(98, "div", 38);
    \u0275\u0275element(99, "textarea", 50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(100, "div", 51)(101, "button", 52);
    \u0275\u0275listener("click", function CrearFacturaComponent_div_2_Template_button_click_101_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.enviarFactura());
    });
    \u0275\u0275text(102);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "button", 53);
    \u0275\u0275listener("click", function CrearFacturaComponent_div_2_Template_button_click_103_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generarFactura());
    });
    \u0275\u0275text(104);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isEditing ? "Editar Factura" : "Crear Factura");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.facturaForm);
    \u0275\u0275advance(46);
    \u0275\u0275property("ngForOf", ctx_r1.repuestos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.repuestos.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.repuestos.length > 0);
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r1.manoObra);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.manoObra.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.manoObra.length > 0);
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r1.desplazamientos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.desplazamientos.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.desplazamientos.length > 0);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.loading || !ctx_r1.facturaForm.valid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loading ? "Enviando..." : ctx_r1.isEditing ? "Actualizar factura" : "Enviar factura", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loading || !ctx_r1.facturaForm.valid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loading ? "Generando..." : ctx_r1.isEditing ? "Guardar cambios" : "Generar factura", " ");
  }
}
function CrearFacturaComponent_tr_60_Template(rf, ctx) {
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
    const repuesto_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(repuesto_r12.nombre || "Sin nombre");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(repuesto_r12.cantidad || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 4, repuesto_r12.precio_neto || 0, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(10, 9, repuesto_r12.precio_pvp || 0, "EUR", "symbol", "1.2-2"));
  }
}
function CrearFacturaComponent_tr_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 67);
    \u0275\u0275text(2, "No hay repuestos");
    \u0275\u0275elementEnd()();
  }
}
function CrearFacturaComponent_tr_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 63)(1, "td")(2, "b");
    \u0275\u0275text(3, "TOTAL");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(4, "td");
    \u0275\u0275elementStart(5, "td", 57);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 57);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 2, ctx_r1.totalRepuestosNeto, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(10, 7, ctx_r1.totalRepuestosPvp, "EUR", "symbol", "1.2-2"));
  }
}
function CrearFacturaComponent_tr_74_Template(rf, ctx) {
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
    const mano_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(mano_r13.nombre || "Sin descripci\xF3n");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", mano_r13.cantidad || 0, "h");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 3, mano_r13.precio_pvp || 0, "EUR", "symbol", "1.2-2"));
  }
}
function CrearFacturaComponent_tr_75_Template(rf, ctx) {
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
    const desplazamiento_r14 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(desplazamiento_r14.nombre || "Sin descripci\xF3n");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(desplazamiento_r14.cantidad || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 3, desplazamiento_r14.precio_pvp || 0, "EUR", "symbol", "1.2-2"));
  }
}
function CrearFacturaComponent_tr_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 70);
    \u0275\u0275text(2, "No hay mano de obra ni desplazamientos");
    \u0275\u0275elementEnd()();
  }
}
function CrearFacturaComponent_tr_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 63)(1, "td", 64)(2, "b");
    \u0275\u0275text(3, "TOTAL");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 57);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(6, 1, ctx_r1.totalManoObra + ctx_r1.totalDesplazamiento, "EUR", "symbol", "1.2-2"));
  }
}
var _CrearFacturaComponent = class _CrearFacturaComponent {
  constructor(fb, facturasService, router, route, pdfService) {
    this.fb = fb;
    this.facturasService = facturasService;
    this.router = router;
    this.route = route;
    this.pdfService = pdfService;
    this.repuestos = [];
    this.manoObra = [];
    this.desplazamientos = [];
    this.mostrarVistaPrevia = false;
    this.loading = false;
    this.isEditing = false;
    this.facturaForm = this.fb.group({
      numeroFactura: ["", Validators.required],
      fecha: [(/* @__PURE__ */ new Date()).toISOString().split("T")[0], Validators.required],
      nombre: ["", Validators.required],
      direccion: ["", Validators.required],
      cif: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      notas: [""]
    });
    addIcons({ refreshOutline, trash, download, print, eyeOutline, downloadOutline, printOutline, trashOutline, createOutline });
  }
  ngOnInit() {
    addIcons({ trash, closeOutline, download, print });
    this.route.params.subscribe((params) => {
      const facturaId = params["id"];
      if (facturaId) {
        this.facturaId = facturaId;
        this.isEditing = true;
        this.cargarFacturaParaEditar(facturaId);
      } else {
        this.generarNumeroFactura();
      }
    });
  }
  /**
   * Carga una factura existente para editar
   */
  cargarFacturaParaEditar(facturaId) {
    this.loading = true;
    this.facturasService.getFactura(facturaId).subscribe({
      next: (facturaCompleta) => {
        this.facturaOriginal = facturaCompleta;
        this.cargarDatosFactura(facturaCompleta);
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar factura para editar:", error);
        this.loading = false;
        this.router.navigate(["/facturas"]);
      }
    });
  }
  /**
   * Carga los datos de la factura en el formulario
   */
  cargarDatosFactura(facturaCompleta) {
    const factura = facturaCompleta.factura;
    const lineas = facturaCompleta.lineas;
    this.facturaForm.patchValue({
      numeroFactura: factura.numero_factura,
      fecha: factura.fecha_emision,
      nombre: factura.nombre_cliente,
      direccion: factura.direccion_cliente,
      cif: factura.cif_cliente,
      email: factura.email_cliente,
      notas: factura.notas || ""
    });
    this.repuestos = lineas.filter((linea) => linea.tipo === "repuesto");
    this.manoObra = lineas.filter((linea) => linea.tipo === "mano_obra");
    this.desplazamientos = lineas.filter((linea) => linea.tipo === "desplazamiento");
    console.log("\u2705 Factura cargada para edici\xF3n:", {
      factura,
      lineas,
      repuestos: this.repuestos,
      manoObra: this.manoObra,
      desplazamientos: this.desplazamientos
    });
  }
  // Generar número de factura automáticamente (solo para nuevas facturas)
  generarNumeroFactura() {
    if (!this.isEditing) {
      this.facturasService.getSiguienteNumero().subscribe({
        next: (numero) => {
          this.facturaForm.patchValue({ numeroFactura: numero });
        },
        error: (error) => {
          console.error("Error al generar n\xFAmero de factura:", error);
          const a\u00F1o = (/* @__PURE__ */ new Date()).getFullYear();
          this.facturaForm.patchValue({ numeroFactura: `F${a\u00F1o}-001` });
        }
      });
    }
  }
  // Repuestos
  agregarRepuesto() {
    this.repuestos.push({
      tipo: "repuesto",
      nombre: "",
      cantidad: 1,
      precio_neto: 0,
      precio_pvp: 0
    });
  }
  eliminarRepuesto(i) {
    this.repuestos.splice(i, 1);
  }
  // Mano de obra
  agregarManoObra() {
    this.manoObra.push({
      tipo: "mano_obra",
      nombre: "",
      cantidad: 1,
      precio_pvp: 0
    });
  }
  eliminarManoObra(i) {
    this.manoObra.splice(i, 1);
  }
  // Desplazamiento
  agregarDesplazamiento() {
    this.desplazamientos.push({
      tipo: "desplazamiento",
      nombre: "",
      cantidad: 1,
      precio_pvp: 0
    });
  }
  eliminarDesplazamiento(i) {
    this.desplazamientos.splice(i, 1);
  }
  // Totales
  get totalRepuestosNeto() {
    return this.repuestos.reduce((acc, r) => acc + r.cantidad * (r.precio_neto || 0), 0);
  }
  get totalRepuestosPvp() {
    return this.repuestos.reduce((acc, r) => acc + r.cantidad * r.precio_pvp, 0);
  }
  get totalManoObra() {
    return this.manoObra.reduce((acc, m) => acc + m.cantidad * m.precio_pvp, 0);
  }
  get totalDesplazamiento() {
    return this.desplazamientos.reduce((acc, d) => acc + d.cantidad * d.precio_pvp, 0);
  }
  get subtotal() {
    return this.totalRepuestosPvp + this.totalManoObra + this.totalDesplazamiento;
  }
  get iva() {
    return +(this.subtotal * 0.21).toFixed(2);
  }
  get total() {
    return +(this.subtotal + this.iva).toFixed(2);
  }
  enviarFactura() {
    console.log("Bot\xF3n enviar factura clickeado");
    console.log("Formulario v\xE1lido:", this.facturaForm.valid);
    console.log("Errores del formulario:", this.facturaForm.errors);
    console.log("Valores del formulario:", this.facturaForm.value);
    if (this.facturaForm.valid) {
      console.log("Formulario es v\xE1lido, procediendo...");
      this.loading = true;
      const facturaData = this.prepararDatosFactura();
      facturaData.estado = "En curso";
      console.log("Datos de factura a enviar:", facturaData);
      if (this.isEditing && this.facturaId) {
        this.facturasService.actualizarFactura(this.facturaId, facturaData).subscribe({
          next: (response) => {
            console.log("Factura actualizada exitosamente:", response);
            this.loading = false;
            this.router.navigate(["/facturas"]);
          },
          error: (error) => {
            console.error("Error al actualizar factura:", error);
            this.loading = false;
          }
        });
      } else {
        this.facturasService.crearFactura(facturaData).subscribe({
          next: (response) => {
            console.log("Factura creada exitosamente:", response);
            this.loading = false;
            this.router.navigate(["/facturas"]);
          },
          error: (error) => {
            console.error("Error al crear factura:", error);
            this.loading = false;
          }
        });
      }
    } else {
      console.log("Formulario no es v\xE1lido");
      Object.keys(this.facturaForm.controls).forEach((key) => {
        const control = this.facturaForm.get(key);
        if (control == null ? void 0 : control.invalid) {
          console.log(`Campo ${key} es inv\xE1lido:`, control.errors);
        }
      });
    }
  }
  generarFactura() {
    console.log("Bot\xF3n generar factura clickeado");
    console.log("Formulario v\xE1lido:", this.facturaForm.valid);
    if (this.facturaForm.valid) {
      console.log("Formulario es v\xE1lido, procediendo...");
      this.loading = true;
      const facturaData = this.prepararDatosFactura();
      facturaData.estado = "Pendiente";
      console.log("Datos de factura a generar:", facturaData);
      if (this.isEditing && this.facturaId) {
        this.facturasService.actualizarFactura(this.facturaId, facturaData).subscribe({
          next: (response) => {
            console.log("Factura actualizada exitosamente:", response);
            this.loading = false;
            this.router.navigate(["/facturas"]);
          },
          error: (error) => {
            console.error("Error al actualizar factura:", error);
            this.loading = false;
          }
        });
      } else {
        this.facturasService.crearFactura(facturaData).subscribe({
          next: (response) => {
            console.log("Factura generada exitosamente:", response);
            this.loading = false;
            this.router.navigate(["/facturas"]);
          },
          error: (error) => {
            console.error("Error al generar factura:", error);
            this.loading = false;
          }
        });
      }
    } else {
      console.log("Formulario no es v\xE1lido");
      Object.keys(this.facturaForm.controls).forEach((key) => {
        const control = this.facturaForm.get(key);
        if (control == null ? void 0 : control.invalid) {
          console.log(`Campo ${key} es inv\xE1lido:`, control.errors);
        }
      });
    }
  }
  prepararDatosFactura() {
    const formValue = this.facturaForm.value;
    const todasLasLineas = [
      ...this.repuestos,
      ...this.manoObra,
      ...this.desplazamientos
    ];
    return {
      numero_factura: formValue.numeroFactura,
      fecha_emision: formValue.fecha,
      nombre_cliente: formValue.nombre,
      direccion_cliente: formValue.direccion,
      cif_cliente: formValue.cif,
      email_cliente: formValue.email,
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total,
      estado: "Pendiente",
      notas: formValue.notas,
      lineas: todasLasLineas
    };
  }
  toggleVistaPrevia() {
    this.mostrarVistaPrevia = !this.mostrarVistaPrevia;
  }
  // Método para debug del formulario
  debugFormulario() {
    console.log("=== DEBUG FORMULARIO ===");
    console.log("Formulario v\xE1lido:", this.facturaForm.valid);
    console.log("Valores:", this.facturaForm.value);
    console.log("Errores:", this.facturaForm.errors);
    Object.keys(this.facturaForm.controls).forEach((key) => {
      const control = this.facturaForm.get(key);
      console.log(`Campo ${key}:`, {
        valor: control == null ? void 0 : control.value,
        v\u00E1lido: control == null ? void 0 : control.valid,
        errores: control == null ? void 0 : control.errors,
        touched: control == null ? void 0 : control.touched,
        dirty: control == null ? void 0 : control.dirty
      });
    });
  }
  // Método para descargar factura como PDF
  descargarFactura() {
    return __async(this, null, function* () {
      var _a;
      try {
        console.log("\u{1F527} Iniciando descarga de factura...");
        const numeroFactura = ((_a = this.facturaForm.get("numeroFactura")) == null ? void 0 : _a.value) || "factura";
        const nombreArchivo = `factura_${numeroFactura}.pdf`;
        const datosFactura = this.prepararDatosFactura();
        this.pdfService.generarPdfNativo(datosFactura, nombreArchivo);
        console.log("\u2705 Factura descargada exitosamente");
      } catch (error) {
        console.error("\u274C Error al descargar factura:", error);
      }
    });
  }
  // Método para imprimir factura
  imprimirFactura() {
    return __async(this, null, function* () {
      try {
        console.log("\u{1F527} Iniciando impresi\xF3n de factura...");
        const datosFactura = this.prepararDatosFactura();
        yield this.pdfService.imprimirFacturaNativa(datosFactura);
        console.log("\u2705 Impresi\xF3n iniciada exitosamente");
      } catch (error) {
        console.error("\u274C Error al imprimir factura:", error);
      }
    });
  }
  // Método para generar PDF desde datos (alternativo)
  generarPdfDesdeDatos() {
    var _a;
    try {
      console.log("\u{1F527} Generando PDF desde datos...");
      const datosFactura = this.prepararDatosFactura();
      const numeroFactura = ((_a = this.facturaForm.get("numeroFactura")) == null ? void 0 : _a.value) || "factura";
      const nombreArchivo = `factura_${numeroFactura}.pdf`;
      this.pdfService.generarPdfNativo(datosFactura, nombreArchivo);
      console.log("\u2705 PDF desde datos generado exitosamente");
    } catch (error) {
      console.error("\u274C Error al generar PDF desde datos:", error);
    }
  }
};
_CrearFacturaComponent.\u0275fac = function CrearFacturaComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CrearFacturaComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(FacturasService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(PdfService));
};
_CrearFacturaComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrearFacturaComponent, selectors: [["app-crear-factura"]], inputs: { facturaId: "facturaId" }, decls: 111, vars: 38, consts: [[1, "factura-container"], ["class", "loading-state", 4, "ngIf"], ["class", "factura-formulario", 4, "ngIf"], [1, "factura-preview"], [1, "header-container"], [1, "actions-preview"], ["type", "button", 1, "btn-outline", 3, "click"], ["name", "download"], [1, "button-text"], ["type", "button", 1, "btn-primary", 3, "click"], ["name", "print"], [1, "preview-header"], [1, "logo-box"], ["src", "assets/icon/favicon.png", "alt", "Logo"], [1, "empresa-datos"], [1, "empresa-nombre"], [2, "margin-top", "20px"], [1, "factura-info"], [1, "factura-label"], [2, "color", "#111827", "font-weight", "500"], [1, "preview-tabla"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "total-row", 4, "ngIf"], [1, "preview-totales-box"], [1, "totales-row"], [1, "totales-row", "total-final"], [1, "preview-notas"], [1, "notas-texto"], [1, "preview-footer"], [1, "toggle-preview-btn", 3, "click"], [3, "name"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "factura-formulario"], [3, "formGroup"], [1, "grid-datos"], [1, "form-group"], ["type", "text", "formControlName", "numeroFactura", "placeholder", "#876370A"], ["type", "date", "formControlName", "fecha"], ["type", "text", "formControlName", "nombre", "placeholder", "Ejemplo"], ["type", "text", "formControlName", "direccion", "placeholder", "Calle"], ["type", "text", "formControlName", "cif", "placeholder", "12345678A"], ["type", "email", "formControlName", "email", "placeholder", "ejemplo@gmail.com"], [1, "tabla-section"], [1, "tabla-header"], ["type", "button", 1, "icon-btn", "add-btn", 3, "click"], ["class", "empty-row", 4, "ngIf"], [1, "tabla-header", 2, "margin-bottom", "20px"], ["formControlName", "notas", "placeholder", "Notas"], [1, "botones-footer"], ["type", "button", 1, "btn-outline", 3, "click", "disabled"], ["type", "button", 1, "btn-primary", 3, "click", "disabled"], ["type", "text", "placeholder", "Nombre del repuesto", 1, "table-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "step", "0.01", 1, "table-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "step", "0.01", "placeholder", "0.00", 1, "table-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "success"], [1, "trash-btn"], ["type", "button", 1, "icon-btn", "danger", 3, "click"], ["name", "trash"], [1, "empty-row"], ["colspan", "5", 1, "text-center"], [1, "total-row"], ["colspan", "2"], ["type", "text", "placeholder", "Descripci\xF3n del trabajo", 1, "table-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "step", "0.01", "placeholder", "Horas", 1, "table-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["colspan", "4", 1, "text-center"], ["type", "text", "placeholder", "Tipo de desplazamiento", 1, "table-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "step", "0.01", "placeholder", "Cantidad", 1, "table-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["colspan", "3", 1, "text-center"]], template: function CrearFacturaComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275template(1, CrearFacturaComponent_div_1_Template, 5, 0, "div", 1)(2, CrearFacturaComponent_div_2_Template, 105, 15, "div", 2);
    \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "h2");
    \u0275\u0275text(6, "Vista previa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 5)(8, "button", 6);
    \u0275\u0275listener("click", function CrearFacturaComponent_Template_button_click_8_listener() {
      return ctx.descargarFactura();
    });
    \u0275\u0275element(9, "ion-icon", 7);
    \u0275\u0275elementStart(10, "span", 8);
    \u0275\u0275text(11, "Descargar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 9);
    \u0275\u0275listener("click", function CrearFacturaComponent_Template_button_click_12_listener() {
      return ctx.imprimirFactura();
    });
    \u0275\u0275element(13, "ion-icon", 10);
    \u0275\u0275elementStart(14, "span", 8);
    \u0275\u0275text(15, "Imprimir");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "div", 11)(17, "div", 12);
    \u0275\u0275element(18, "img", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 14)(20, "div")(21, "span", 15);
    \u0275\u0275text(22, "Datos de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24, "Nombre de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "address");
    \u0275\u0275text(26, "Direcci\xF3n de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28, "Ciudad de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span");
    \u0275\u0275text(30, "CIF de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 16);
    \u0275\u0275text(32, "ejemplodominio.es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span");
    \u0275\u0275text(34, "+34 123 45 56 65");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 17)(36, "label", 18);
    \u0275\u0275text(37, "Factura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "label", 19);
    \u0275\u0275text(39, "N\xBA FACTURA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "label");
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "label", 19);
    \u0275\u0275text(43, "FECHA DE EMISI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "label");
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(47, "div", 20)(48, "table")(49, "thead")(50, "tr")(51, "th");
    \u0275\u0275text(52, "Repuestos utilizados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "th");
    \u0275\u0275text(54, "CANTIDAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "th");
    \u0275\u0275text(56, "NETO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "th");
    \u0275\u0275text(58, "PVP");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "tbody");
    \u0275\u0275template(60, CrearFacturaComponent_tr_60_Template, 11, 14, "tr", 21)(61, CrearFacturaComponent_tr_61_Template, 3, 0, "tr", 22)(62, CrearFacturaComponent_tr_62_Template, 11, 12, "tr", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(63, "div", 20)(64, "table")(65, "thead")(66, "tr")(67, "th");
    \u0275\u0275text(68, "Mano de obra/Kilometraje");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "th");
    \u0275\u0275text(70, "CANTIDAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "th");
    \u0275\u0275text(72, "PVP");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(73, "tbody");
    \u0275\u0275template(74, CrearFacturaComponent_tr_74_Template, 8, 8, "tr", 21)(75, CrearFacturaComponent_tr_75_Template, 8, 8, "tr", 21)(76, CrearFacturaComponent_tr_76_Template, 3, 0, "tr", 22)(77, CrearFacturaComponent_tr_77_Template, 7, 6, "tr", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(78, "div", 24)(79, "div", 25)(80, "span");
    \u0275\u0275text(81, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "span");
    \u0275\u0275text(83);
    \u0275\u0275pipe(84, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(85, "div", 25)(86, "span");
    \u0275\u0275text(87, "IVA (21%)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "span");
    \u0275\u0275text(89);
    \u0275\u0275pipe(90, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div", 26)(92, "span");
    \u0275\u0275text(93, "TOTAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "span");
    \u0275\u0275text(95);
    \u0275\u0275pipe(96, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(97, "div", 27)(98, "b");
    \u0275\u0275text(99, "Notas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "div", 28);
    \u0275\u0275text(101);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 29)(103, "span");
    \u0275\u0275text(104, "Nombre de empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "span");
    \u0275\u0275text(106, "+34 698 12 12 12");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "span");
    \u0275\u0275text(108, "ejemploemail.com");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(109, "button", 30);
    \u0275\u0275listener("click", function CrearFacturaComponent_Template_button_click_109_listener() {
      return ctx.toggleVistaPrevia();
    });
    \u0275\u0275element(110, "ion-icon", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_15_0;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading && ctx.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading || !ctx.isEditing);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx.mostrarVistaPrevia);
    \u0275\u0275advance(38);
    \u0275\u0275textInterpolate(((tmp_3_0 = ctx.facturaForm.get("numeroFactura")) == null ? null : tmp_3_0.value) || "N/A");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_4_0 = ctx.facturaForm.get("fecha")) == null ? null : tmp_4_0.value) ? \u0275\u0275pipeBind4(46, 18, (tmp_4_0 = ctx.facturaForm.get("fecha")) == null ? null : tmp_4_0.value, "longDate", "", "es") : "N/A");
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx.repuestos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.repuestos.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.repuestos.length > 0);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx.manoObra);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.desplazamientos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.manoObra.length === 0 && ctx.desplazamientos.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.manoObra.length > 0 || ctx.desplazamientos.length > 0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(84, 23, ctx.subtotal, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(90, 28, ctx.iva, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(96, 33, ctx.total, "EUR", "symbol", "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ((tmp_15_0 = ctx.facturaForm.get("notas")) == null ? null : tmp_15_0.value) || "Sin notas adicionales", " ");
    \u0275\u0275advance(9);
    \u0275\u0275property("name", ctx.mostrarVistaPrevia ? "create-outline" : "eye-outline");
  }
}, dependencies: [CommonModule, NgForOf, NgIf, CurrencyPipe, DatePipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, FormsModule, NgModel, IonIcon], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100%;\n  padding: 20px;\n  gap: 20px;\n}\n.form-column[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 20px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.preview-column[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n}\n.form-section[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-height: calc(85vh - 140px);\n}\n.form-group[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.header-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.header-container[_ngcontent-%COMP%]   .actions-preview[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.header-container[_ngcontent-%COMP%]   .actions-preview[_ngcontent-%COMP%]   .btn-outline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: white;\n  color: #26262A;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  border: 1px solid rgba(125, 131, 152, 0.2431372549);\n}\n.header-container[_ngcontent-%COMP%]   .actions-preview[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n}\n.form-control[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  padding: 10px 12px;\n  background-color: #FAFAFB;\n  border: 1px solid transparent;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #111827;\n  transition: border-color 0.2s;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2563eb;\n}\n.form-control[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n.form-control[readonly][_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n}\n.lineas-factura[_ngcontent-%COMP%] {\n  margin: 20px 0;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n}\n.lineas-factura[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  font-size: 16px;\n  color: #374151;\n}\n.linea-factura[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  margin-bottom: 16px;\n  padding: 10px;\n  background: #f9f9f9;\n  border-radius: 4px;\n}\n.linea-factura[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  flex: 1;\n}\n.button-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 24px;\n}\n.button-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.button-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.button-group[_ngcontent-%COMP%]   .btn-outline[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid #d1d5db;\n  color: #374151;\n}\n.button-group[_ngcontent-%COMP%]   .btn-outline[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f8fafc;\n  border-color: #9ca3af;\n}\n.button-group[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background-color: #4F46E5;\n  border: 1px solid #4F46E5;\n  color: #fff;\n}\n.button-group[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #4338ca;\n  border-color: #4338ca;\n}\n.button-group[_ngcontent-%COMP%]   .btn-danger[_ngcontent-%COMP%] {\n  background-color: #dc2626;\n  border: 1px solid #dc2626;\n  color: #fff;\n}\n.button-group[_ngcontent-%COMP%]   .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #b91c1c;\n  border-color: #b91c1c;\n}\n.factura-preview[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #fff;\n  border-radius: 24px;\n  padding: 32px;\n  min-width: 420px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.factura-preview[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 500;\n  margin-bottom: 5px;\n  color: #111827;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-toolbar[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%] {\n  background: #F3F4F6;\n  border: none;\n  border-radius: 50%;\n  width: 36px;\n  height: 36px;\n  font-size: 1.2rem;\n  color: #4F46E5;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-toolbar[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%]:hover {\n  background: #E5E7EB;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 32px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .logo-box[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .logo-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 44px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%]   address[_ngcontent-%COMP%] {\n  display: block;\n  color: #6B7280;\n  font-size: 13px;\n  margin-bottom: 2px;\n  font-style: normal;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%]   .empresa-nombre[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 8px;\n  text-transform: capitalize;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .factura-info[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .factura-info[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6B7280;\n  margin-bottom: 2px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .factura-info[_ngcontent-%COMP%]   .factura-label[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 8px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   .tabla-titulo[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #6B7280;\n  margin-bottom: 8px;\n  font-size: 1rem;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 8px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  font-size: 13px;\n  text-align: left;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: #9CA3AF;\n  font-weight: 400;\n  background: none;\n  border-bottom: 1px solid #E5E7EB;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: #111827;\n  border-bottom: 1px solid #F3F4F6;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .success[_ngcontent-%COMP%] {\n  color: #27C26C;\n  font-weight: 600;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #4F46E5;\n  border-bottom: none;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%] {\n  margin: 24px 0 0 0;\n  background: #EEF2FF;\n  border-radius: 16px;\n  padding: 15px 15px;\n  width: 300px;\n  align-self: flex-end;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #4F46E5;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%]   .totales-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 14px;\n  margin-bottom: 8px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%]   .totales-row.total-final[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #fff;\n  background: #4F46E5;\n  border-radius: 12px;\n  padding: 10px 16px;\n  margin-top: 12px;\n  margin-bottom: 0;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%]   .totales-row.total-final[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #fff !important;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-notas[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-notas[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  font-size: 1rem;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-notas[_ngcontent-%COMP%]   .notas-texto[_ngcontent-%COMP%] {\n  color: #6B7280;\n  font-size: 0.95rem;\n  margin-top: 4px;\n}\n.factura-preview[_ngcontent-%COMP%]   .preview-footer[_ngcontent-%COMP%] {\n  margin-top: 32px;\n  display: flex;\n  justify-content: space-between;\n  color: #6B7280;\n  font-size: 0.95rem;\n  border-top: 1px solid #E5E7EB;\n  padding-top: 12px;\n}\n.factura-preview[_ngcontent-%COMP%]   .actions-preview[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.factura-preview[_ngcontent-%COMP%]   .actions-preview[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n}\n.factura-preview[_ngcontent-%COMP%]   .actions-preview[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.factura-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n  gap: 32px;\n  display: flex;\n  padding: 25px;\n}\n.factura-formulario[_ngcontent-%COMP%] {\n  flex: 1;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n  border-radius: 24px;\n  padding: 32px;\n  background: #fff;\n}\n.factura-formulario[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 500;\n  margin-bottom: 24px;\n  color: #111827;\n}\n.factura-formulario[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.grid-datos[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px 24px;\n  margin-bottom: 32px;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  padding: 10px 12px;\n  background-color: #FAFAFB;\n  border: 1px solid transparent;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #111827;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2563eb;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  padding: 10px 12px;\n  background-color: #FAFAFB;\n  border: 1px solid transparent;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #111827;\n  transition: border-color 0.2s;\n  resize: vertical;\n  min-height: 80px;\n}\n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2563eb;\n}\n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n.tabla-section[_ngcontent-%COMP%] {\n  margin: 32px 0 0 0;\n  background: #fff;\n  border-radius: 16px;\n}\n.tabla-section[_ngcontent-%COMP%]   .tabla-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-weight: 500;\n  font-size: 1.1rem;\n}\n.tabla-section[_ngcontent-%COMP%]   .tabla-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #111827;\n}\n.tabla-section[_ngcontent-%COMP%]   .tabla-header[_ngcontent-%COMP%]   .icon-btn.add-btn[_ngcontent-%COMP%] {\n  background: #4F46E5;\n  color: #fff;\n  border-radius: 12px;\n  width: 35px;\n  height: 35px;\n  font-size: 1.3rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  cursor: pointer;\n}\n.tabla-section[_ngcontent-%COMP%]   .tabla-header[_ngcontent-%COMP%]   .icon-btn.add-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #fff;\n}\n.tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0 8px;\n  margin: 0 0 8px 0;\n}\n.tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: #111827;\n  font-size: 14px;\n  font-weight: 400;\n  background: none;\n  border: none;\n  padding: 8px 0;\n  text-align: left;\n}\n.tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .trash-btn[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 8px;\n}\n.tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #111827;\n}\n.tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  text-decoration: none;\n}\n.tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.success[_ngcontent-%COMP%] {\n  color: #2B9943;\n  font-weight: 500;\n}\n.tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   .icon-btn.danger[_ngcontent-%COMP%] {\n  background: rgba(231, 29, 53, 0.1137254902);\n  color: #E71D36;\n  border-radius: 50%;\n  width: 32px;\n  height: 32px;\n  font-size: 1.1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  cursor: pointer;\n}\n.tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #111827;\n  background: none;\n}\n.tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%]   .success[_ngcontent-%COMP%] {\n  color: #2B9943;\n  font-weight: 700 !important;\n}\n.botones-footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin: 32px 0 0 0;\n}\n.botones-footer[_ngcontent-%COMP%]   .btn-outline[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #fff;\n  color: #4F46E5;\n  border: 2px solid #4F46E5;\n  border-radius: 12px;\n  padding: 12px 32px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.botones-footer[_ngcontent-%COMP%]   .btn-outline[_ngcontent-%COMP%]:hover {\n  background: #F3F4F6;\n}\n.botones-footer[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #4F46E5;\n  color: #fff;\n  border: none;\n  border-radius: 12px;\n  padding: 12px 32px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.botones-footer[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover {\n  background: #2723B8;\n}\n.factura-info[_ngcontent-%COMP%] {\n  text-align: right;\n  min-width: 180px;\n}\n.factura-info[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 400;\n  color: #6B7280;\n  margin-bottom: 4px;\n}\n.factura-info[_ngcontent-%COMP%]   .factura-label[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  font-weight: 700;\n  font-size: 1.1rem;\n  margin-bottom: 4px;\n}\n.factura-info[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n}\n.factura-info[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   .factura-dato[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.factura-info[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   .factura-dato[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6B7280;\n  font-weight: 600;\n  text-transform: uppercase;\n  margin-bottom: 2px;\n  letter-spacing: 0.5px;\n}\n.factura-info[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   .factura-dato[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  color: #111827;\n  font-weight: 600;\n  margin: 0 0 0 0;\n}\n.toggle-preview-btn[_ngcontent-%COMP%] {\n  display: none;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  background: #f8fafc;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #4F46E5;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #6B7280;\n  margin: 0;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .factura-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding: 0;\n    gap: 0;\n    position: relative;\n    height: 100%;\n  }\n  .factura-formulario[_ngcontent-%COMP%] {\n    border-radius: 0;\n    padding: 16px;\n    box-shadow: none;\n  }\n  .factura-formulario[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n    margin-bottom: 16px;\n  }\n  .grid-datos[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0px;\n    margin-bottom: 24px;\n  }\n  .tabla-section[_ngcontent-%COMP%] {\n    margin: 24px 0 0 0;\n  }\n  .tabla-section[_ngcontent-%COMP%]   .tabla-header[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    margin-bottom: 12px;\n  }\n  .tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n    -webkit-overflow-scrolling: touch;\n  }\n  .tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n    font-size: 13px;\n  }\n  .botones-footer[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: white;\n    padding: 12px 16px;\n    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);\n    margin: 0;\n    z-index: 100;\n  }\n  .factura-preview[_ngcontent-%COMP%] {\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 1000;\n    border-radius: 0;\n    padding: 16px;\n    overflow-y: auto;\n    min-width: unset;\n  }\n  .factura-preview.active[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%] {\n    position: sticky;\n    top: 0;\n    background: white;\n    z-index: 10;\n    padding: 12px 0;\n    margin-bottom: 16px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%]   .actions-preview[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 36px;\n    height: 36px;\n    padding: 0;\n    justify-content: center;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%]   .actions-preview[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .button-text[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%]   .actions-preview[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%] {\n    flex-direction: row;\n    gap: 16px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%]   .empresa-nombre[_ngcontent-%COMP%] {\n    font-size: 13px;\n    text-transform: capitalize;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%]   .factura-label[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .empresa-datos[_ngcontent-%COMP%]   .factura-dato[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .factura-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .factura-info[_ngcontent-%COMP%]   address[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .factura-info[_ngcontent-%COMP%]   .empresa-nombre[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-tabla[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n    -webkit-overflow-scrolling: touch;\n  }\n  .factura-preview[_ngcontent-%COMP%]   .preview-totales-box[_ngcontent-%COMP%] {\n    width: 100%;\n    margin: 16px 0;\n  }\n  .toggle-preview-btn[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: 80px;\n    right: 16px;\n    width: 56px;\n    height: 56px;\n    border-radius: 50%;\n    background: #4F46E5;\n    color: white;\n    border: none;\n    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 100;\n    cursor: pointer;\n  }\n  .toggle-preview-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .toggle-preview-btn[_ngcontent-%COMP%]:active {\n    transform: scale(0.95);\n  }\n}\n.table-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 6px 8px;\n  border: 1px solid #E5E7EB;\n  border-radius: 4px;\n  font-size: 13px;\n  background: #FAFAFB;\n  color: #111827;\n  transition: border-color 0.2s;\n}\n.table-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4F46E5;\n  background: #fff;\n}\n.table-input[_ngcontent-%COMP%]::placeholder {\n  color: #9CA3AF;\n}\n.empty-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: #6B7280;\n  font-style: italic;\n  text-align: center;\n  padding: 20px !important;\n}\n.text-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n@media (max-width: 480px) {\n  .factura-formulario[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n   .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .tabla-section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 6px 10px;\n    font-size: 12px;\n  }\n  .table-input[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding: 4px 6px;\n  }\n  .botones-footer[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n  }\n  .botones-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 10px 24px !important;\n    font-size: 15px !important;\n    font-weight: 500 !important;\n  }\n}\n/*# sourceMappingURL=crear-factura.component.css.map */"] });
var CrearFacturaComponent = _CrearFacturaComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrearFacturaComponent, [{
    type: Component,
    args: [{ selector: "app-crear-factura", standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule, IonIcon], template: `<div class="factura-container">\r
  <!-- Loading State para edici\xF3n -->\r
  <div *ngIf="loading && isEditing" class="loading-state">\r
    <div class="loading-spinner">\r
      <ion-icon name="refresh-outline" class="spinning"></ion-icon>\r
      <p>Cargando factura para editar...</p>\r
    </div>\r
  </div>\r
\r
  <div class="factura-formulario" *ngIf="!loading || !isEditing">\r
    <h2>{{ isEditing ? 'Editar Factura' : 'Crear Factura' }}</h2>\r
    <form [formGroup]="facturaForm">\r
      <div class="grid-datos">\r
        <div class="form-group">\r
          <label>N\xFAmero Factura</label>\r
          <input type="text" formControlName="numeroFactura" placeholder="#876370A" />\r
        </div>\r
        <div class="form-group">\r
          <label>Fecha de emisi\xF3n</label>\r
          <input type="date" formControlName="fecha" />\r
        </div>\r
        <div class="form-group">\r
          <label>Nombre</label>\r
          <input type="text" formControlName="nombre" placeholder="Ejemplo" />\r
        </div>\r
        <div class="form-group">\r
          <label>Direcci\xF3n</label>\r
          <input type="text" formControlName="direccion" placeholder="Calle" />\r
        </div>\r
        <div class="form-group">\r
          <label>CIF</label>\r
          <input type="text" formControlName="cif" placeholder="12345678A" />\r
        </div>\r
        <div class="form-group">\r
          <label>Correo electr\xF3nico</label>\r
          <input type="email" formControlName="email" placeholder="ejemplo@gmail.com" />\r
        </div>\r
      </div>\r
\r
      <!-- Repuestos -->\r
      <section class="tabla-section">\r
        <div class="tabla-header">\r
          <span>Repuestos Utilizados</span>\r
          <button type="button" class="icon-btn add-btn" (click)="agregarRepuesto()"><span>+</span></button>\r
        </div>\r
        <table>\r
          <thead>\r
            <tr>\r
              <th>Nombre</th>\r
              <th>Cantidad</th>\r
              <th>Neto</th>\r
              <th>PVP</th>\r
              <th></th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            <tr *ngFor="let repuesto of repuestos; let i = index">\r
              <td>\r
                <input type="text" [(ngModel)]="repuesto.nombre" [ngModelOptions]="{standalone: true}" placeholder="Nombre del repuesto" class="table-input">\r
              </td>\r
              <td>\r
                <input type="number" [(ngModel)]="repuesto.cantidad" [ngModelOptions]="{standalone: true}" min="0" step="0.01" class="table-input">\r
              </td>\r
              <td>\r
                <input type="number" [(ngModel)]="repuesto.precio_neto" [ngModelOptions]="{standalone: true}" min="0" step="0.01" class="table-input" placeholder="0.00">\r
              </td>\r
              <td class="success">\r
                <input type="number" [(ngModel)]="repuesto.precio_pvp" [ngModelOptions]="{standalone: true}" min="0" step="0.01" class="table-input" placeholder="0.00">\r
              </td>\r
              <td class="trash-btn">\r
                <button type="button" class="icon-btn danger" (click)="eliminarRepuesto(i)">\r
                  <ion-icon name="trash"></ion-icon>\r
                </button>\r
              </td>\r
            </tr>\r
            <tr *ngIf="repuestos.length === 0" class="empty-row">\r
              <td colspan="5" class="text-center">No hay repuestos a\xF1adidos</td>\r
            </tr>\r
            <tr class="total-row" *ngIf="repuestos.length > 0">\r
              <td colspan="2">Total</td>\r
              <td>{{ totalRepuestosNeto | currency:'EUR':'symbol':'1.2-2' }}</td>\r
              <td class="success">{{ totalRepuestosPvp | currency:'EUR':'symbol':'1.2-2' }}</td>\r
              <td></td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </section>\r
\r
      <!-- Mano de obra -->\r
      <section class="tabla-section">\r
        <div class="tabla-header">\r
          <span>Mano de Obra</span>\r
          <button type="button" class="icon-btn add-btn" (click)="agregarManoObra()"><span>+</span></button>\r
        </div>\r
        <table>\r
          <thead>\r
            <tr>\r
              <th>Nombre</th>\r
              <th>Cantidad</th>\r
              <th>PVP</th>\r
              <th></th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            <tr *ngFor="let mano of manoObra; let i = index">\r
              <td>\r
                <input type="text" [(ngModel)]="mano.nombre" [ngModelOptions]="{standalone: true}" placeholder="Descripci\xF3n del trabajo" class="table-input">\r
              </td>\r
              <td>\r
                <input type="number" [(ngModel)]="mano.cantidad" [ngModelOptions]="{standalone: true}" min="0" step="0.01" class="table-input" placeholder="Horas">\r
              </td>\r
              <td class="success">\r
                <input type="number" [(ngModel)]="mano.precio_pvp" [ngModelOptions]="{standalone: true}" min="0" step="0.01" class="table-input" placeholder="0.00">\r
              </td>\r
              <td class="trash-btn">\r
                <button type="button" class="icon-btn danger" (click)="eliminarManoObra(i)">\r
                  <ion-icon name="trash"></ion-icon>\r
                </button>\r
              </td>\r
            </tr>\r
            <tr *ngIf="manoObra.length === 0" class="empty-row">\r
              <td colspan="4" class="text-center">No hay mano de obra a\xF1adida</td>\r
            </tr>\r
            <tr class="total-row" *ngIf="manoObra.length > 0">\r
              <td colspan="2">Total</td>\r
              <td class="success">{{ totalManoObra | currency:'EUR':'symbol':'1.2-2' }}</td>\r
              <td></td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </section>\r
\r
      <!-- Desplazamiento -->\r
      <section class="tabla-section">\r
        <div class="tabla-header">\r
          <span>Desplazamiento</span>\r
          <button type="button" class="icon-btn add-btn" (click)="agregarDesplazamiento()"><span>+</span></button>\r
        </div>\r
        <table>\r
          <thead>\r
            <tr>\r
              <th>Nombre</th>\r
              <th>Cantidad</th>\r
              <th>PVP</th>\r
              <th></th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            <tr *ngFor="let desplazamiento of desplazamientos; let i = index">\r
              <td>\r
                <input type="text" [(ngModel)]="desplazamiento.nombre" [ngModelOptions]="{standalone: true}" placeholder="Tipo de desplazamiento" class="table-input">\r
              </td>\r
              <td>\r
                <input type="number" [(ngModel)]="desplazamiento.cantidad" [ngModelOptions]="{standalone: true}" min="0" step="0.01" class="table-input" placeholder="Cantidad">\r
              </td>\r
              <td class="success">\r
                <input type="number" [(ngModel)]="desplazamiento.precio_pvp" [ngModelOptions]="{standalone: true}" min="0" step="0.01" class="table-input" placeholder="0.00">\r
              </td>\r
              <td class="trash-btn">\r
                <button type="button" class="icon-btn danger" (click)="eliminarDesplazamiento(i)">\r
                  <ion-icon name="trash"></ion-icon>\r
                </button>\r
              </td>\r
            </tr>\r
            <tr *ngIf="desplazamientos.length === 0" class="empty-row">\r
              <td colspan="4" class="text-center">No hay desplazamientos a\xF1adidos</td>\r
            </tr>\r
            <tr class="total-row" *ngIf="desplazamientos.length > 0">\r
              <td colspan="2">Total</td>\r
              <td class="success">{{ totalDesplazamiento | currency:'EUR':'symbol':'1.2-2' }}</td>\r
              <td></td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </section>\r
\r
      <section class="tabla-section">\r
        <div class="tabla-header" style="margin-bottom: 20px;">\r
          <span>Detalles descripci\xF3n</span>\r
        </div>\r
\r
        <div class="form-group">\r
          <textarea formControlName="notas" placeholder="Notas"></textarea>\r
        </div>\r
      </section>\r
\r
      <div class="botones-footer">\r
        <button type="button" class="btn-outline" (click)="enviarFactura()" [disabled]="loading || !facturaForm.valid">\r
          {{ loading ? 'Enviando...' : (isEditing ? 'Actualizar factura' : 'Enviar factura') }}\r
        </button>\r
        <button type="button" class="btn-primary" (click)="generarFactura()" [disabled]="loading || !facturaForm.valid">\r
          {{ loading ? 'Generando...' : (isEditing ? 'Guardar cambios' : 'Generar factura') }}\r
        </button>\r
      </div>\r
\r
    </form>\r
  </div>\r
\r
  <!-- Vista previa -->\r
  <div class="factura-preview" [class.active]="mostrarVistaPrevia">\r
    <div class="header-container">\r
      <h2>Vista previa</h2>\r
      <div class="actions-preview">\r
        <button type="button" class="btn-outline" (click)="descargarFactura()">\r
          <ion-icon name="download"></ion-icon>\r
          <span class="button-text">Descargar</span>\r
        </button>\r
        <button type="button" class="btn-primary" (click)="imprimirFactura()">\r
          <ion-icon name="print"></ion-icon>\r
          <span class="button-text">Imprimir</span>\r
        </button>\r
      </div>  \r
    </div>\r
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
          <label>{{ facturaForm.get('numeroFactura')?.value || 'N/A' }}</label>\r
          <label style="color: #111827; font-weight: 500;">FECHA DE EMISI\xD3N</label>\r
          <label>{{ facturaForm.get('fecha')?.value ? (facturaForm.get('fecha')?.value | date:'longDate':'':'es') : 'N/A' }}</label>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="preview-tabla">\r
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
            <td>{{ repuesto.nombre || 'Sin nombre' }}</td>\r
            <td>{{ repuesto.cantidad || 0 }}</td>\r
            <td>{{ repuesto.precio_neto || 0 | currency:'EUR':'symbol':'1.2-2' }}</td>\r
            <td>{{ repuesto.precio_pvp || 0 | currency:'EUR':'symbol':'1.2-2' }}</td>\r
          </tr>\r
          <tr *ngIf="repuestos.length === 0">\r
            <td colspan="4" class="text-center">No hay repuestos</td>\r
          </tr>\r
          <tr class="total-row" *ngIf="repuestos.length > 0">\r
            <td><b>TOTAL</b></td>\r
            <td></td>\r
            <td class="success">{{ totalRepuestosNeto | currency:'EUR':'symbol':'1.2-2' }}</td>\r
            <td class="success">{{ totalRepuestosPvp | currency:'EUR':'symbol':'1.2-2' }}</td>\r
          </tr>\r
        </tbody>\r
      </table>\r
    </div>\r
\r
    <div class="preview-tabla">\r
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
            <td>{{ mano.nombre || 'Sin descripci\xF3n' }}</td>\r
            <td>{{ mano.cantidad || 0 }}h</td>\r
            <td>{{ mano.precio_pvp || 0 | currency:'EUR':'symbol':'1.2-2' }}</td>\r
          </tr>\r
          <tr *ngFor="let desplazamiento of desplazamientos">\r
            <td>{{ desplazamiento.nombre || 'Sin descripci\xF3n' }}</td>\r
            <td>{{ desplazamiento.cantidad || 0 }}</td>\r
            <td>{{ desplazamiento.precio_pvp || 0 | currency:'EUR':'symbol':'1.2-2' }}</td>\r
          </tr>\r
          <tr *ngIf="manoObra.length === 0 && desplazamientos.length === 0">\r
            <td colspan="3" class="text-center">No hay mano de obra ni desplazamientos</td>\r
          </tr>\r
          <tr class="total-row" *ngIf="manoObra.length > 0 || desplazamientos.length > 0">\r
            <td colspan="2"><b>TOTAL</b></td>\r
            <td class="success">{{ totalManoObra + totalDesplazamiento | currency:'EUR':'symbol':'1.2-2' }}</td>\r
          </tr>\r
        </tbody>\r
      </table>\r
    </div>\r
\r
    <div class="preview-totales-box">\r
      <div class="totales-row">\r
        <span>Subtotal</span>\r
        <span>{{ subtotal | currency:'EUR':'symbol':'1.2-2' }}</span>\r
      </div>\r
      <div class="totales-row">\r
        <span>IVA (21%)</span>\r
        <span>{{ iva | currency:'EUR':'symbol':'1.2-2' }}</span>\r
      </div>\r
      <div class="totales-row total-final">\r
        <span>TOTAL</span>\r
        <span>{{ total | currency:'EUR':'symbol':'1.2-2' }}</span>\r
      </div>\r
    </div>\r
\r
    <div class="preview-notas">\r
      <b>Notas</b>\r
      <div class="notas-texto">\r
        {{ facturaForm.get('notas')?.value || 'Sin notas adicionales' }}\r
      </div>\r
    </div>\r
    <div class="preview-footer">\r
      <span>Nombre de empresa</span>\r
      <span>+34 698 12 12 12</span>\r
      <span>ejemploemail.com</span>\r
    </div>\r
  </div>\r
\r
  <!-- Bot\xF3n flotante para alternar vista en m\xF3vil -->\r
  <button class="toggle-preview-btn" (click)="toggleVistaPrevia()">\r
    <ion-icon [name]="mostrarVistaPrevia ? 'create-outline' : 'eye-outline'"></ion-icon>\r
  </button>\r
</div>`, styles: ["/* src/app/modules/facturas/components/crear-factura/crear-factura.component.scss */\n.container {\n  display: flex;\n  height: 100%;\n  padding: 20px;\n  gap: 20px;\n}\n.form-column {\n  flex: 1;\n  overflow-y: auto;\n  padding: 20px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.preview-column {\n  flex: 1;\n  overflow-y: auto;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n}\n.form-section {\n  padding: 24px;\n  max-height: calc(85vh - 140px);\n}\n.form-group {\n  position: relative;\n  margin-bottom: 20px;\n}\n.form-group label {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n.form-group label .required {\n  color: #dc2626;\n}\n.header-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.header-container .actions-preview {\n  display: flex;\n  gap: 12px;\n}\n.header-container .actions-preview .btn-outline {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: white;\n  color: #26262A;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  border: 1px solid rgba(125, 131, 152, 0.2431372549);\n}\n.header-container .actions-preview .btn-primary {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n}\n.form-control {\n  position: relative;\n  width: 100%;\n  padding: 10px 12px;\n  background-color: #FAFAFB;\n  border: 1px solid transparent;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #111827;\n  transition: border-color 0.2s;\n}\n.form-control:focus {\n  outline: none;\n  border-color: #2563eb;\n}\n.form-control::placeholder {\n  color: #9ca3af;\n}\n.form-control[readonly] {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n}\n.lineas-factura {\n  margin: 20px 0;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n}\n.lineas-factura h3 {\n  margin-bottom: 16px;\n  font-size: 16px;\n  color: #374151;\n}\n.linea-factura {\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  margin-bottom: 16px;\n  padding: 10px;\n  background: #f9f9f9;\n  border-radius: 4px;\n}\n.linea-factura .form-group {\n  margin-bottom: 0;\n  flex: 1;\n}\n.button-group {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 24px;\n}\n.button-group .btn {\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.button-group .btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.button-group .btn-outline {\n  background: none;\n  border: 1px solid #d1d5db;\n  color: #374151;\n}\n.button-group .btn-outline:hover:not(:disabled) {\n  background-color: #f8fafc;\n  border-color: #9ca3af;\n}\n.button-group .btn-primary {\n  background-color: #4F46E5;\n  border: 1px solid #4F46E5;\n  color: #fff;\n}\n.button-group .btn-primary:hover:not(:disabled) {\n  background-color: #4338ca;\n  border-color: #4338ca;\n}\n.button-group .btn-danger {\n  background-color: #dc2626;\n  border: 1px solid #dc2626;\n  color: #fff;\n}\n.button-group .btn-danger:hover:not(:disabled) {\n  background-color: #b91c1c;\n  border-color: #b91c1c;\n}\n.factura-preview {\n  flex: 1;\n  background: #fff;\n  border-radius: 24px;\n  padding: 32px;\n  min-width: 420px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.factura-preview h2 {\n  font-size: 18px;\n  font-weight: 500;\n  margin-bottom: 5px;\n  color: #111827;\n}\n.factura-preview .preview-toolbar {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.factura-preview .preview-toolbar .icon-btn {\n  background: #F3F4F6;\n  border: none;\n  border-radius: 50%;\n  width: 36px;\n  height: 36px;\n  font-size: 1.2rem;\n  color: #4F46E5;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.factura-preview .preview-toolbar .icon-btn:hover {\n  background: #E5E7EB;\n}\n.factura-preview .preview-header {\n  display: flex;\n  align-items: flex-start;\n  gap: 32px;\n}\n.factura-preview .preview-header .logo-box {\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.factura-preview .preview-header .logo-box img {\n  max-width: 44px;\n}\n.factura-preview .preview-header .empresa-datos {\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n}\n.factura-preview .preview-header .empresa-datos span,\n.factura-preview .preview-header .empresa-datos address {\n  display: block;\n  color: #6B7280;\n  font-size: 13px;\n  margin-bottom: 2px;\n  font-style: normal;\n}\n.factura-preview .preview-header .empresa-datos .empresa-nombre {\n  color: #4F46E5;\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 8px;\n  text-transform: capitalize;\n}\n.factura-preview .preview-header .factura-info {\n  text-align: right;\n}\n.factura-preview .preview-header .factura-info label {\n  font-size: 13px;\n  color: #6B7280;\n  margin-bottom: 2px;\n}\n.factura-preview .preview-header .factura-info .factura-label {\n  color: #4F46E5;\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 8px;\n}\n.factura-preview .preview-tabla .tabla-titulo {\n  font-weight: 600;\n  color: #6B7280;\n  margin-bottom: 8px;\n  font-size: 1rem;\n}\n.factura-preview .preview-tabla table {\n  width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 8px;\n}\n.factura-preview .preview-tabla table th,\n.factura-preview .preview-tabla table td {\n  padding: 8px 12px;\n  font-size: 13px;\n  text-align: left;\n}\n.factura-preview .preview-tabla table th {\n  color: #9CA3AF;\n  font-weight: 400;\n  background: none;\n  border-bottom: 1px solid #E5E7EB;\n}\n.factura-preview .preview-tabla table td {\n  color: #111827;\n  border-bottom: 1px solid #F3F4F6;\n}\n.factura-preview .preview-tabla table .success {\n  color: #27C26C;\n  font-weight: 600;\n}\n.factura-preview .preview-tabla table .total-row td {\n  font-weight: 700;\n  color: #4F46E5;\n  border-bottom: none;\n}\n.factura-preview .preview-totales-box {\n  margin: 24px 0 0 0;\n  background: #EEF2FF;\n  border-radius: 16px;\n  padding: 15px 15px;\n  width: 300px;\n  align-self: flex-end;\n}\n.factura-preview .preview-totales-box span {\n  color: #4F46E5;\n}\n.factura-preview .preview-totales-box .totales-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 14px;\n  margin-bottom: 8px;\n}\n.factura-preview .preview-totales-box .totales-row.total-final {\n  font-size: 16px;\n  font-weight: 600;\n  color: #fff;\n  background: #4F46E5;\n  border-radius: 12px;\n  padding: 10px 16px;\n  margin-top: 12px;\n  margin-bottom: 0;\n}\n.factura-preview .preview-totales-box .totales-row.total-final span {\n  color: #fff !important;\n}\n.factura-preview .preview-notas {\n  margin-top: 24px;\n}\n.factura-preview .preview-notas b {\n  color: #4F46E5;\n  font-size: 1rem;\n}\n.factura-preview .preview-notas .notas-texto {\n  color: #6B7280;\n  font-size: 0.95rem;\n  margin-top: 4px;\n}\n.factura-preview .preview-footer {\n  margin-top: 32px;\n  display: flex;\n  justify-content: space-between;\n  color: #6B7280;\n  font-size: 0.95rem;\n  border-top: 1px solid #E5E7EB;\n  padding-top: 12px;\n}\n.factura-preview .actions-preview {\n  display: flex;\n  gap: 8px;\n}\n.factura-preview .actions-preview button {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n}\n.factura-preview .actions-preview button ion-icon {\n  font-size: 20px;\n}\n.factura-container {\n  width: 100%;\n  height: auto;\n  gap: 32px;\n  display: flex;\n  padding: 25px;\n}\n.factura-formulario {\n  flex: 1;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n  border-radius: 24px;\n  padding: 32px;\n  background: #fff;\n}\n.factura-formulario h2 {\n  font-size: 24px;\n  font-weight: 500;\n  margin-bottom: 24px;\n  color: #111827;\n}\n.factura-formulario form {\n  width: 100%;\n}\n.grid-datos {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px 24px;\n  margin-bottom: 32px;\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n}\n.form-group label {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n.form-group input {\n  position: relative;\n  width: 100%;\n  padding: 10px 12px;\n  background-color: #FAFAFB;\n  border: 1px solid transparent;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #111827;\n  transition: border-color 0.2s;\n}\n.form-group input:focus {\n  outline: none;\n  border-color: #2563eb;\n}\n.form-group input::placeholder {\n  color: #9ca3af;\n}\n.form-group textarea {\n  position: relative;\n  width: 100%;\n  padding: 10px 12px;\n  background-color: #FAFAFB;\n  border: 1px solid transparent;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #111827;\n  transition: border-color 0.2s;\n  resize: vertical;\n  min-height: 80px;\n}\n.form-group textarea:focus {\n  outline: none;\n  border-color: #2563eb;\n}\n.form-group textarea::placeholder {\n  color: #9ca3af;\n}\n.tabla-section {\n  margin: 32px 0 0 0;\n  background: #fff;\n  border-radius: 16px;\n}\n.tabla-section .tabla-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-weight: 500;\n  font-size: 1.1rem;\n}\n.tabla-section .tabla-header span {\n  color: #111827;\n}\n.tabla-section .tabla-header .icon-btn.add-btn {\n  background: #4F46E5;\n  color: #fff;\n  border-radius: 12px;\n  width: 35px;\n  height: 35px;\n  font-size: 1.3rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  cursor: pointer;\n}\n.tabla-section .tabla-header .icon-btn.add-btn span {\n  font-size: 20px;\n  color: #fff;\n}\n.tabla-section table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0 8px;\n  margin: 0 0 8px 0;\n}\n.tabla-section table thead th {\n  color: #111827;\n  font-size: 14px;\n  font-weight: 400;\n  background: none;\n  border: none;\n  padding: 8px 0;\n  text-align: left;\n}\n.tabla-section table .trash-btn {\n  display: flex;\n  justify-content: flex-end;\n}\n.tabla-section table tbody tr {\n  background: #ffffff;\n  border-radius: 8px;\n}\n.tabla-section table tbody tr td {\n  font-size: 14px;\n  color: #111827;\n}\n.tabla-section table tbody tr td a {\n  color: #4F46E5;\n  text-decoration: none;\n}\n.tabla-section table tbody tr td.success {\n  color: #2B9943;\n  font-weight: 500;\n}\n.tabla-section table tbody tr .icon-btn.danger {\n  background: rgba(231, 29, 53, 0.1137254902);\n  color: #E71D36;\n  border-radius: 50%;\n  width: 32px;\n  height: 32px;\n  font-size: 1.1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  cursor: pointer;\n}\n.tabla-section table .total-row td {\n  font-weight: 700;\n  color: #111827;\n  background: none;\n}\n.tabla-section table .total-row .success {\n  color: #2B9943;\n  font-weight: 700 !important;\n}\n.botones-footer {\n  display: flex;\n  gap: 16px;\n  margin: 32px 0 0 0;\n}\n.botones-footer .btn-outline {\n  width: 100%;\n  background: #fff;\n  color: #4F46E5;\n  border: 2px solid #4F46E5;\n  border-radius: 12px;\n  padding: 12px 32px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.botones-footer .btn-outline:hover {\n  background: #F3F4F6;\n}\n.botones-footer .btn-primary {\n  width: 100%;\n  background: #4F46E5;\n  color: #fff;\n  border: none;\n  border-radius: 12px;\n  padding: 12px 32px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.botones-footer .btn-primary:hover {\n  background: #2723B8;\n}\n.factura-info {\n  text-align: right;\n  min-width: 180px;\n}\n.factura-info label {\n  display: block;\n  font-size: 14px;\n  font-weight: 400;\n  color: #6B7280;\n  margin-bottom: 4px;\n}\n.factura-info .factura-label {\n  color: #4F46E5;\n  font-weight: 700;\n  font-size: 1.1rem;\n  margin-bottom: 4px;\n}\n.factura-info dl {\n  margin: 0;\n  padding: 0;\n}\n.factura-info dl .factura-dato {\n  margin-bottom: 8px;\n}\n.factura-info dl .factura-dato dt {\n  font-size: 0.85rem;\n  color: #6B7280;\n  font-weight: 600;\n  text-transform: uppercase;\n  margin-bottom: 2px;\n  letter-spacing: 0.5px;\n}\n.factura-info dl .factura-dato dd {\n  font-size: 1.05rem;\n  color: #111827;\n  font-weight: 600;\n  margin: 0 0 0 0;\n}\n.toggle-preview-btn {\n  display: none;\n}\n.loading-state {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  background: #f8fafc;\n}\n.loading-state .loading-spinner {\n  text-align: center;\n  color: #4F46E5;\n}\n.loading-state .loading-spinner ion-icon {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\n.loading-state .loading-spinner ion-icon.spinning {\n  animation: spin 1s linear infinite;\n}\n.loading-state .loading-spinner p {\n  font-size: 16px;\n  color: #6B7280;\n  margin: 0;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .factura-container {\n    flex-direction: column;\n    padding: 0;\n    gap: 0;\n    position: relative;\n    height: 100%;\n  }\n  .factura-formulario {\n    border-radius: 0;\n    padding: 16px;\n    box-shadow: none;\n  }\n  .factura-formulario h2 {\n    font-size: 20px;\n    margin-bottom: 16px;\n  }\n  .grid-datos {\n    grid-template-columns: 1fr;\n    gap: 0px;\n    margin-bottom: 24px;\n  }\n  .tabla-section {\n    margin: 24px 0 0 0;\n  }\n  .tabla-section .tabla-header {\n    font-size: 1rem;\n    margin-bottom: 12px;\n  }\n  .tabla-section table {\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n    -webkit-overflow-scrolling: touch;\n  }\n  .tabla-section table th,\n  .tabla-section table td {\n    padding: 8px 12px;\n    font-size: 13px;\n  }\n  .botones-footer {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: white;\n    padding: 12px 16px;\n    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);\n    margin: 0;\n    z-index: 100;\n  }\n  .factura-preview {\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 1000;\n    border-radius: 0;\n    padding: 16px;\n    overflow-y: auto;\n    min-width: unset;\n  }\n  .factura-preview.active {\n    display: block;\n  }\n  .factura-preview .header-container {\n    position: sticky;\n    top: 0;\n    background: white;\n    z-index: 10;\n    padding: 12px 0;\n    margin-bottom: 16px;\n  }\n  .factura-preview .header-container h2 {\n    font-size: 16px;\n  }\n  .factura-preview .header-container .actions-preview button {\n    width: 36px;\n    height: 36px;\n    padding: 0;\n    justify-content: center;\n  }\n  .factura-preview .header-container .actions-preview button .button-text {\n    display: none;\n  }\n  .factura-preview .header-container .actions-preview button ion-icon {\n    font-size: 18px;\n  }\n  .factura-preview .preview-header {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .factura-preview .preview-header .empresa-datos {\n    flex-direction: row;\n    gap: 16px;\n  }\n  .factura-preview .preview-header .empresa-datos .empresa-nombre {\n    font-size: 13px;\n    text-transform: capitalize;\n  }\n  .factura-preview .preview-header .empresa-datos .factura-label {\n    font-size: 13px;\n  }\n  .factura-preview .preview-header .empresa-datos .factura-dato {\n    font-size: 13px;\n  }\n  .factura-preview .preview-header .factura-info span,\n  .factura-preview .preview-header .factura-info address {\n    font-size: 12px;\n  }\n  .factura-preview .preview-header .factura-info .empresa-nombre {\n    font-size: 13px;\n  }\n  .factura-preview .preview-tabla table {\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n    -webkit-overflow-scrolling: touch;\n  }\n  .factura-preview .preview-totales-box {\n    width: 100%;\n    margin: 16px 0;\n  }\n  .toggle-preview-btn {\n    position: fixed;\n    bottom: 80px;\n    right: 16px;\n    width: 56px;\n    height: 56px;\n    border-radius: 50%;\n    background: #4F46E5;\n    color: white;\n    border: none;\n    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 100;\n    cursor: pointer;\n  }\n  .toggle-preview-btn ion-icon {\n    font-size: 24px;\n  }\n  .toggle-preview-btn:active {\n    transform: scale(0.95);\n  }\n}\n.table-input {\n  width: 100%;\n  padding: 6px 8px;\n  border: 1px solid #E5E7EB;\n  border-radius: 4px;\n  font-size: 13px;\n  background: #FAFAFB;\n  color: #111827;\n  transition: border-color 0.2s;\n}\n.table-input:focus {\n  outline: none;\n  border-color: #4F46E5;\n  background: #fff;\n}\n.table-input::placeholder {\n  color: #9CA3AF;\n}\n.empty-row td {\n  color: #6B7280;\n  font-style: italic;\n  text-align: center;\n  padding: 20px !important;\n}\n.text-center {\n  text-align: center;\n}\n@media (max-width: 480px) {\n  .factura-formulario {\n    padding: 12px;\n  }\n  .form-group input,\n  .form-group textarea {\n    font-size: 13px;\n  }\n  .tabla-section table th,\n  .tabla-section table td {\n    padding: 6px 10px;\n    font-size: 12px;\n  }\n  .table-input {\n    font-size: 12px;\n    padding: 4px 6px;\n  }\n  .botones-footer {\n    padding: 8px 12px;\n  }\n  .botones-footer button {\n    padding: 10px 24px !important;\n    font-size: 15px !important;\n    font-weight: 500 !important;\n  }\n}\n/*# sourceMappingURL=crear-factura.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: FacturasService }, { type: Router }, { type: ActivatedRoute }, { type: PdfService }], { facturaId: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrearFacturaComponent, { className: "CrearFacturaComponent", filePath: "src/app/modules/facturas/components/crear-factura/crear-factura.component.ts", lineNumber: 29 });
})();
export {
  CrearFacturaComponent
};
//# sourceMappingURL=crear-factura.component-TCVQOCYZ.js.map
