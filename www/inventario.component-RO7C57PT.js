import {
  InventarioService
} from "./chunk-F77G4CBW.js";
import "./chunk-VHAQXQOQ.js";
import {
  MatIconModule,
  MatTableModule
} from "./chunk-776UXQBH.js";
import {
  addCircle,
  addCircleOutline,
  addIcons,
  alertCircle,
  alertCircleOutline,
  appsOutline,
  checkmarkCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  close,
  closeOutline,
  createOutline,
  cubeOutline,
  document,
  eyeOutline,
  hourglassOutline,
  receipt,
  refreshOutline,
  searchOutline,
  trashOutline,
  warning
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
  AlertController,
  IonContent,
  IonIcon,
  ModalController,
  ToastController
} from "./chunk-DJA56OJT.js";
import {
  CommonModule,
  Component,
  DefaultValueAccessor,
  ElementRef,
  FormBuilder,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  MaxLengthValidator,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Subject,
  Validators,
  debounceTime,
  distinctUntilChanged,
  setClassMetadata,
  takeUntil,
  ɵNgNoValidate,
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
  ɵɵpureFunction0,
  ɵɵpureFunction2,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
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

// src/app/modules/inventario/components/crear-producto-modal/crear-producto-modal.component.ts
var _c0 = () => [1, 2, 3, 4, 5, 10, 20, 50, 100];
function CrearProductoModalComponent_option_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r1 = ctx.$implicit;
    \u0275\u0275property("value", n_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(n_r1);
  }
}
var _CrearProductoModalComponent = class _CrearProductoModalComponent {
  constructor(fb, modalController, viewportService, elementRef, inventarioService) {
    this.fb = fb;
    this.modalController = modalController;
    this.viewportService = viewportService;
    this.elementRef = elementRef;
    this.inventarioService = inventarioService;
    this.codigoGenerado = "";
    this.productoForm = this.fb.group({
      codigo: [{ value: "", disabled: true }],
      nombre: ["", Validators.required],
      descripcion: ["", Validators.maxLength(200)],
      stock: ["", [Validators.required, Validators.min(0)]],
      unidad: ["", Validators.required],
      precioNeto: ["", [Validators.required, Validators.min(0)]],
      pvp: ["", [Validators.required, Validators.min(0)]]
    });
  }
  ngOnInit() {
    addIcons({ closeOutline });
    this.generarCodigo();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const modalContainer = this.elementRef.nativeElement.querySelector(".modal-container");
      if (modalContainer) {
        this.viewportService.applySafeAreaToModal(modalContainer);
      }
    }, 100);
  }
  generarCodigo() {
    this.codigoGenerado = this.inventarioService.generarCodigoProducto();
    this.productoForm.patchValue({ codigo: this.codigoGenerado });
  }
  guardarProducto() {
    return __async(this, null, function* () {
      if (this.productoForm.valid) {
        const formData = this.productoForm.getRawValue();
        if (formData.pvp < formData.precioNeto) {
          formData.pvp = formData.precioNeto;
        }
        yield this.modalController.dismiss(formData, "confirm");
      }
    });
  }
  cerrarModal() {
    return __async(this, null, function* () {
      yield this.modalController.dismiss(null, "cancel");
    });
  }
  // Método para recalcular PVP automáticamente si se desea
  recalcularPVP() {
    var _a;
    const precioNeto = (_a = this.productoForm.get("precioNeto")) == null ? void 0 : _a.value;
    if (precioNeto && precioNeto > 0) {
      const pvp = precioNeto * 1.21;
      this.productoForm.patchValue({ pvp: Math.round(pvp * 100) / 100 });
    }
  }
};
_CrearProductoModalComponent.\u0275fac = function CrearProductoModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CrearProductoModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ModalController2), \u0275\u0275directiveInject(ViewportService), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(InventarioService));
};
_CrearProductoModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrearProductoModalComponent, selectors: [["app-crear-producto-modal"]], decls: 69, vars: 6, consts: [[1, "modal-container"], [1, "modal-header"], [1, "header-content"], [1, "close-button", 3, "click"], ["name", "close-outline"], [1, "subtitle"], [1, "modal-content"], [3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "form-group"], ["type", "text", "formControlName", "codigo", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "nombre", "placeholder", "Nombre del repuesto o material", 1, "form-control"], ["formControlName", "descripcion", "placeholder", "Descripci\xF3n m\xE1s detallada del art\xEDculo", "maxlength", "200", 1, "form-control"], [1, "character-count"], [1, "form-row"], [1, "form-group", "half"], ["formControlName", "stock", 1, "form-control"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "unidad", 1, "form-control"], ["value", "kg"], ["value", "m"], ["value", "cm"], ["value", "unidad"], [1, "input-currency"], ["type", "number", "formControlName", "precioNeto", "placeholder", "Precio art\xEDculo sin IVA", 1, "form-control"], [1, "currency"], ["type", "number", "formControlName", "pvp", "placeholder", "Precio de venta al p\xFAblico", 1, "form-control"], [1, "modal-footer"], [1, "button-group"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [3, "value"]], template: function CrearProductoModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "h2");
    \u0275\u0275text(4, "A\xF1adir producto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 3);
    \u0275\u0275listener("click", function CrearProductoModalComponent_Template_button_click_5_listener() {
      return ctx.cerrarModal();
    });
    \u0275\u0275element(6, "ion-icon", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 5);
    \u0275\u0275text(8, "A\xF1ade un nuevo producto a tu inventario");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 6)(10, "form", 7);
    \u0275\u0275listener("ngSubmit", function CrearProductoModalComponent_Template_form_ngSubmit_10_listener() {
      return ctx.guardarProducto();
    });
    \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "label");
    \u0275\u0275text(14, "C\xF3digo");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 9)(17, "label");
    \u0275\u0275text(18, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "input", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 9)(21, "label");
    \u0275\u0275text(22, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "textarea", 12);
    \u0275\u0275elementStart(24, "div", 13);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 14)(27, "div", 15)(28, "label");
    \u0275\u0275text(29, "Stock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "select", 16)(31, "option", 17);
    \u0275\u0275text(32, "Cantidad disponible");
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, CrearProductoModalComponent_option_33_Template, 2, 2, "option", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 15)(35, "label");
    \u0275\u0275text(36, "Unidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 19)(38, "option", 17);
    \u0275\u0275text(39, "Ej: kg, m, cm, unidad..");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "option", 20);
    \u0275\u0275text(41, "kg");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "option", 21);
    \u0275\u0275text(43, "m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "option", 22);
    \u0275\u0275text(45, "cm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "option", 23);
    \u0275\u0275text(47, "unidad");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(48, "div", 14)(49, "div", 15)(50, "label");
    \u0275\u0275text(51, "Precio Neto (\u20AC)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div", 24);
    \u0275\u0275element(53, "input", 25);
    \u0275\u0275elementStart(54, "span", 26);
    \u0275\u0275text(55, "\u20AC");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(56, "div", 15)(57, "label");
    \u0275\u0275text(58, "PVP (\u20AC)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 24);
    \u0275\u0275element(60, "input", 27);
    \u0275\u0275elementStart(61, "span", 26);
    \u0275\u0275text(62, "\u20AC");
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(63, "footer", 28)(64, "div", 29)(65, "button", 30);
    \u0275\u0275listener("click", function CrearProductoModalComponent_Template_button_click_65_listener() {
      return ctx.cerrarModal();
    });
    \u0275\u0275text(66, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "button", 31);
    \u0275\u0275listener("click", function CrearProductoModalComponent_Template_button_click_67_listener() {
      return ctx.guardarProducto();
    });
    \u0275\u0275text(68, " Guardar producto ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    \u0275\u0275advance(10);
    \u0275\u0275property("formGroup", ctx.productoForm);
    \u0275\u0275advance(5);
    \u0275\u0275property("placeholder", ctx.codigoGenerado || "Generando c\xF3digo...");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", ((tmp_2_0 = ctx.productoForm.get("descripcion")) == null ? null : tmp_2_0.value == null ? null : tmp_2_0.value.length) || 0, "/200");
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(5, _c0));
    \u0275\u0275advance(34);
    \u0275\u0275property("disabled", !ctx.productoForm.valid);
  }
}, dependencies: [IonicModule, IonIcon2, CommonModule, NgForOf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  max-height: 85vh;\n  background: #fff;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  color: #6b7280;\n  font-size: 14px;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n  color: #6b7280;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover {\n  color: #111827;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.modal-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  margin-bottom: 20px;\n}\n.modal-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  height: 100%;\n}\n.form-section[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-height: calc(85vh - 140px);\n}\n.form-group[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n.form-control[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  padding: 10px 12px;\n  background-color: #FAFAFB;\n  border: 1px solid transparent;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #111827;\n  transition: border-color 0.2s;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2563eb;\n}\n.form-control[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\ntextarea.form-control[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.character-count[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 13px;\n  right: 13px;\n  font-size: 12px;\n  color: #6b7280;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.form-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  flex: 1;\n}\n.input-currency[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-currency[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  padding-right: 32px;\n}\n.input-currency[_ngcontent-%COMP%]   .currency[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  color: #6b7280;\n  font-size: 15px;\n  pointer-events: none;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  background-color: #fff;\n  flex-shrink: 0;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-outline[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid #d1d5db;\n  color: #374151;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-outline[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f8fafc;\n  border-color: #9ca3af;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background-color: #4F46E5;\n  border: 1px solid #4F46E5;\n  color: #fff;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #4338ca;\n  border-color: #4338ca;\n}\n@media (max-width: 768px) {\n  .modal-container[_ngcontent-%COMP%] {\n    max-height: none;\n    height: 100vh;\n  }\n}\n@media (display-mode: standalone) and (max-width: 768px) {\n  .modal-container[_ngcontent-%COMP%] {\n    height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n    max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n  }\n  .modal-header[_ngcontent-%COMP%] {\n    padding-top: calc(16px + var(--safe-area-top, 0px));\n  }\n  .modal-footer[_ngcontent-%COMP%] {\n    padding-bottom: calc(16px + var(--safe-area-bottom, 0px));\n  }\n}\n@supports (-webkit-touch-callout: none) {\n  @media (display-mode: standalone) and (max-width: 768px) {\n    .modal-container[_ngcontent-%COMP%] {\n      height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n      max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n    }\n    .modal-header[_ngcontent-%COMP%] {\n      padding-top: calc(16px + var(--safe-area-top, 0px));\n    }\n    .modal-footer[_ngcontent-%COMP%] {\n      padding-bottom: calc(16px + var(--safe-area-bottom, 0px));\n    }\n  }\n}\n@supports not (padding-top: env(safe-area-inset-top)) {\n  @media (display-mode: standalone) and (max-width: 768px) {\n    .modal-container[_ngcontent-%COMP%] {\n      height: calc(100vh - 40px);\n      max-height: calc(100vh - 40px);\n    }\n    .modal-header[_ngcontent-%COMP%] {\n      padding-top: 36px;\n    }\n    .modal-footer[_ngcontent-%COMP%] {\n      padding-bottom: 36px;\n    }\n  }\n}\n/*# sourceMappingURL=crear-producto-modal.component.css.map */"] });
var CrearProductoModalComponent = _CrearProductoModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrearProductoModalComponent, [{
    type: Component,
    args: [{ selector: "app-crear-producto-modal", standalone: true, imports: [IonicModule, CommonModule, ReactiveFormsModule], template: `<div class="modal-container">\r
  <header class="modal-header">\r
    <div class="header-content">\r
      <h2>A\xF1adir producto</h2>\r
      <button class="close-button" (click)="cerrarModal()">\r
        <ion-icon name="close-outline"></ion-icon>\r
      </button>\r
    </div>\r
    <p class="subtitle">A\xF1ade un nuevo producto a tu inventario</p>\r
  </header>\r
\r
  <div class="modal-content">\r
    <form [formGroup]="productoForm" (ngSubmit)="guardarProducto()">\r
      <div class="form-section">\r
        <div class="form-group">\r
          <label>C\xF3digo</label>\r
          <input type="text" formControlName="codigo" class="form-control" [placeholder]="codigoGenerado || 'Generando c\xF3digo...'">\r
        </div>\r
\r
        <div class="form-group">\r
          <label>Nombre</label>\r
          <input type="text" formControlName="nombre" class="form-control" placeholder="Nombre del repuesto o material">\r
        </div>\r
\r
        <div class="form-group">\r
          <label>Descripci\xF3n</label>\r
          <textarea formControlName="descripcion" class="form-control" placeholder="Descripci\xF3n m\xE1s detallada del art\xEDculo" maxlength="200"></textarea>\r
          <div class="character-count">{{productoForm.get('descripcion')?.value?.length || 0}}/200</div>\r
        </div>\r
\r
        <div class="form-row">\r
          <div class="form-group half">\r
            <label>Stock</label>\r
            <select formControlName="stock" class="form-control">\r
              <option value="">Cantidad disponible</option>\r
              <option *ngFor="let n of [1,2,3,4,5,10,20,50,100]" [value]="n">{{n}}</option>\r
            </select>\r
          </div>\r
          <div class="form-group half">\r
            <label>Unidad</label>\r
            <select formControlName="unidad" class="form-control">\r
              <option value="">Ej: kg, m, cm, unidad..</option>\r
              <option value="kg">kg</option>\r
              <option value="m">m</option>\r
              <option value="cm">cm</option>\r
              <option value="unidad">unidad</option>\r
            </select>\r
          </div>\r
        </div>\r
\r
        <div class="form-row">\r
          <div class="form-group half">\r
            <label>Precio Neto (\u20AC)</label>\r
            <div class="input-currency">\r
              <input type="number" formControlName="precioNeto" class="form-control" placeholder="Precio art\xEDculo sin IVA">\r
              <span class="currency">\u20AC</span>\r
            </div>\r
          </div>\r
          <div class="form-group half">\r
            <label>PVP (\u20AC)</label>\r
            <div class="input-currency">\r
              <input type="number" formControlName="pvp" class="form-control" placeholder="Precio de venta al p\xFAblico">\r
              <span class="currency">\u20AC</span>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <footer class="modal-footer">\r
    <div class="button-group">\r
      <button type="button" class="btn btn-outline" (click)="cerrarModal()">\r
        Cancelar\r
      </button>\r
      <button \r
        type="button" \r
        class="btn btn-primary" \r
        (click)="guardarProducto()"\r
        [disabled]="!productoForm.valid">\r
        Guardar producto\r
      </button>\r
    </div>\r
  </footer>\r
</div>\r
`, styles: ["/* src/app/modules/inventario/components/crear-producto-modal/crear-producto-modal.component.scss */\n.modal-container {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  max-height: 85vh;\n  background: #fff;\n}\n.modal-header {\n  padding: 16px 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header .header-content {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header .header-content h2 {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header .subtitle {\n  margin: 8px 0 0;\n  color: #6b7280;\n  font-size: 14px;\n}\n.modal-header .close-button {\n  background: none;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n  color: #6b7280;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-header .close-button:hover {\n  color: #111827;\n}\n.modal-header .close-button ion-icon {\n  font-size: 24px;\n}\n.modal-content {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  margin-bottom: 20px;\n}\n.modal-content form {\n  height: 100%;\n}\n.form-section {\n  padding: 24px;\n  max-height: calc(85vh - 140px);\n}\n.form-group {\n  position: relative;\n  margin-bottom: 20px;\n}\n.form-group label {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n.form-control {\n  position: relative;\n  width: 100%;\n  padding: 10px 12px;\n  background-color: #FAFAFB;\n  border: 1px solid transparent;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #111827;\n  transition: border-color 0.2s;\n}\n.form-control:focus {\n  outline: none;\n  border-color: #2563eb;\n}\n.form-control::placeholder {\n  color: #9ca3af;\n}\ntextarea.form-control {\n  resize: vertical;\n  min-height: 80px;\n}\n.character-count {\n  position: absolute;\n  bottom: 13px;\n  right: 13px;\n  font-size: 12px;\n  color: #6b7280;\n}\n.form-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.form-row .form-group {\n  margin-bottom: 0;\n  flex: 1;\n}\n.input-currency {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-currency .form-control {\n  padding-right: 32px;\n}\n.input-currency .currency {\n  position: absolute;\n  right: 12px;\n  color: #6b7280;\n  font-size: 15px;\n  pointer-events: none;\n}\n.modal-footer {\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  background-color: #fff;\n  flex-shrink: 0;\n}\n.modal-footer .button-group {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n}\n.modal-footer .button-group .btn {\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.modal-footer .button-group .btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-footer .button-group .btn-outline {\n  background: none;\n  border: 1px solid #d1d5db;\n  color: #374151;\n}\n.modal-footer .button-group .btn-outline:hover:not(:disabled) {\n  background-color: #f8fafc;\n  border-color: #9ca3af;\n}\n.modal-footer .button-group .btn-primary {\n  background-color: #4F46E5;\n  border: 1px solid #4F46E5;\n  color: #fff;\n}\n.modal-footer .button-group .btn-primary:hover:not(:disabled) {\n  background-color: #4338ca;\n  border-color: #4338ca;\n}\n@media (max-width: 768px) {\n  .modal-container {\n    max-height: none;\n    height: 100vh;\n  }\n}\n@media (display-mode: standalone) and (max-width: 768px) {\n  .modal-container {\n    height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n    max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n  }\n  .modal-header {\n    padding-top: calc(16px + var(--safe-area-top, 0px));\n  }\n  .modal-footer {\n    padding-bottom: calc(16px + var(--safe-area-bottom, 0px));\n  }\n}\n@supports (-webkit-touch-callout: none) {\n  @media (display-mode: standalone) and (max-width: 768px) {\n    .modal-container {\n      height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n      max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n    }\n    .modal-header {\n      padding-top: calc(16px + var(--safe-area-top, 0px));\n    }\n    .modal-footer {\n      padding-bottom: calc(16px + var(--safe-area-bottom, 0px));\n    }\n  }\n}\n@supports not (padding-top: env(safe-area-inset-top)) {\n  @media (display-mode: standalone) and (max-width: 768px) {\n    .modal-container {\n      height: calc(100vh - 40px);\n      max-height: calc(100vh - 40px);\n    }\n    .modal-header {\n      padding-top: 36px;\n    }\n    .modal-footer {\n      padding-bottom: 36px;\n    }\n  }\n}\n/*# sourceMappingURL=crear-producto-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ModalController2 }, { type: ViewportService }, { type: ElementRef }, { type: InventarioService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrearProductoModalComponent, { className: "CrearProductoModalComponent", filePath: "src/app/modules/inventario/components/crear-producto-modal/crear-producto-modal.component.ts", lineNumber: 17 });
})();

// src/app/modules/inventario/pages/inventario/inventario.component.ts
var _c02 = (a0, a1) => ({ "no-visitado": a0, "completado": a1 });
var _c1 = (a0, a1) => ({ "yellow": a0, "red": a1 });
function InventarioComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275element(2, "ion-icon", 5);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando productos...");
    \u0275\u0275elementEnd()()();
  }
}
function InventarioComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7);
    \u0275\u0275element(2, "ion-icon", 8);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 9);
    \u0275\u0275listener("click", function InventarioComponent_div_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refrescarInventario());
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
function InventarioComponent_section_3_div_34_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
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
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 43);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 44)(13, "span", 45);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 46);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 47);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 48)(20, "button", 49);
    \u0275\u0275listener("click", function InventarioComponent_section_3_div_34_div_23_Template_button_click_20_listener() {
      const producto_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.verDetallesProducto(producto_r5));
    });
    \u0275\u0275element(21, "ion-icon", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 51);
    \u0275\u0275element(23, "ion-icon", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 53);
    \u0275\u0275listener("click", function InventarioComponent_section_3_div_34_div_23_Template_button_click_24_listener() {
      const producto_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confirmarEliminarProducto(producto_r5));
    });
    \u0275\u0275element(25, "ion-icon", 54);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const producto_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(11, _c02, !ctx_r1.getEnStock(producto_r5.cantidad_disponible), ctx_r1.getEnStock(producto_r5.cantidad_disponible)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(producto_r5.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(producto_r5.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", producto_r5.descripcion);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(producto_r5.descripcion || "Sin descripci\xF3n");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(producto_r5.cantidad_disponible);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(producto_r5.unidad);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(14, _c1, ctx_r1.getEnStock(producto_r5.cantidad_disponible), !ctx_r1.getEnStock(producto_r5.cantidad_disponible)));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getEnStock(producto_r5.cantidad_disponible) ? "En Stock" : "Sin Stock", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getPrecioNetoFormateado(producto_r5.precio_neto));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getPvpFormateado(producto_r5.pvp));
  }
}
function InventarioComponent_section_3_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "div", 12)(3, "div", 33)(4, "div", 34);
    \u0275\u0275text(5, "C\xF3digo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 34);
    \u0275\u0275text(7, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 34);
    \u0275\u0275text(9, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 34);
    \u0275\u0275text(11, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 34);
    \u0275\u0275text(13, "Unidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 34);
    \u0275\u0275text(15, "Stock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 34);
    \u0275\u0275text(17, "Precio Neto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 34);
    \u0275\u0275text(19, "PVP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 34);
    \u0275\u0275text(21, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 35);
    \u0275\u0275template(23, InventarioComponent_section_3_div_34_div_23_Template, 26, 17, "div", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(23);
    \u0275\u0275property("ngForOf", ctx_r1.productosFiltrados);
  }
}
function InventarioComponent_section_3_div_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 56);
    \u0275\u0275element(2, "ion-icon", 57);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay productos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "A\xFAn no se han creado productos en el inventario. Crea el primero para comenzar.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 58);
    \u0275\u0275listener("click", function InventarioComponent_section_3_div_35_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.abrirModalCrearProducto());
    });
    \u0275\u0275element(8, "ion-icon", 24);
    \u0275\u0275text(9, " Crear producto ");
    \u0275\u0275elementEnd()()();
  }
}
function InventarioComponent_section_3_div_36_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "button", 69);
    \u0275\u0275listener("click", function InventarioComponent_section_3_div_36_ng_container_9_Template_button_click_1_listener() {
      const pagina_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cambiarPagina(pagina_r9));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const pagina_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", pagina_r9 === ctx_r1.paginaActual);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pagina_r9, " ");
  }
}
function InventarioComponent_section_3_div_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "span", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 61)(4, "button", 62);
    \u0275\u0275listener("click", function InventarioComponent_section_3_div_36_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.primeraPagina());
    });
    \u0275\u0275element(5, "ion-icon", 63)(6, "ion-icon", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 64);
    \u0275\u0275listener("click", function InventarioComponent_section_3_div_36_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.paginaAnterior());
    });
    \u0275\u0275element(8, "ion-icon", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, InventarioComponent_section_3_div_36_ng_container_9_Template, 3, 3, "ng-container", 65);
    \u0275\u0275elementStart(10, "button", 66);
    \u0275\u0275listener("click", function InventarioComponent_section_3_div_36_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.paginaSiguiente());
    });
    \u0275\u0275element(11, "ion-icon", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 68);
    \u0275\u0275listener("click", function InventarioComponent_section_3_div_36_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ultimaPagina());
    });
    \u0275\u0275element(13, "ion-icon", 67)(14, "ion-icon", 67);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Mostrando datos ", (ctx_r1.paginaActual - 1) * ctx_r1.porPagina + 1, " a ", ctx_r1.Math.min(ctx_r1.paginaActual * ctx_r1.porPagina, ctx_r1.totalProductos), " de ", ctx_r1.totalProductos, " productos ");
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
function InventarioComponent_section_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 11)(1, "div", 12)(2, "div", 13)(3, "div", 14);
    \u0275\u0275text(4, "Tabla de inventario");
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
    \u0275\u0275listener("click", function InventarioComponent_section_3_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refrescarInventario());
    });
    \u0275\u0275element(17, "ion-icon", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 23);
    \u0275\u0275listener("click", function InventarioComponent_section_3_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirModalCrearProducto());
    });
    \u0275\u0275element(19, "ion-icon", 24);
    \u0275\u0275text(20, " A\xF1adir producto ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(21, "div", 25)(22, "select", 26)(23, "option");
    \u0275\u0275text(24, "Ordenar: Recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option");
    \u0275\u0275text(26, "Ordenar: Antiguos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "option");
    \u0275\u0275text(28, "Ordenar: Stock");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 27)(30, "button", 22);
    \u0275\u0275listener("click", function InventarioComponent_section_3_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refrescarInventario());
    });
    \u0275\u0275element(31, "ion-icon", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 23);
    \u0275\u0275listener("click", function InventarioComponent_section_3_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirModalCrearProducto());
    });
    \u0275\u0275element(33, "ion-icon", 24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(34, InventarioComponent_section_3_div_34_Template, 24, 1, "div", 28)(35, InventarioComponent_section_3_div_35_Template, 10, 0, "div", 29)(36, InventarioComponent_section_3_div_36_Template, 15, 8, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Productos: ", ctx_r1.totalProductos, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r1.searchControl);
    \u0275\u0275advance(3);
    \u0275\u0275property("formControl", ctx_r1.searchControl);
    \u0275\u0275advance(23);
    \u0275\u0275property("ngIf", !ctx_r1.loading && !ctx_r1.error && ctx_r1.productosFiltrados.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.productosFiltrados.length === 0 && !ctx_r1.loading && !ctx_r1.error);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.productosFiltrados.length > 0 && ctx_r1.totalProductos > 0 && !ctx_r1.loading && !ctx_r1.error);
  }
}
var _InventarioComponent = class _InventarioComponent {
  constructor(modalController, inventarioService, alertController, toastController) {
    this.modalController = modalController;
    this.inventarioService = inventarioService;
    this.alertController = alertController;
    this.toastController = toastController;
    this.displayedColumns = ["codigo", "nombre", "descripcion", "cantidad", "unidad", "enStock", "precioNeto", "pvp"];
    this.productos = [];
    this.productosFiltrados = [];
    this.loading = true;
    this.error = null;
    this.totalProductos = 0;
    this.paginaActual = 1;
    this.porPagina = 10;
    this.busqueda = "";
    this.ordenarPor = "fecha_creacion";
    this.orden = "desc";
    this.searchControl = new FormControl("");
    this.destroy$ = new Subject();
    this.Math = Math;
    addIcons({
      appsOutline,
      cubeOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
      searchOutline,
      addCircle,
      eyeOutline,
      addCircleOutline,
      receipt,
      hourglassOutline,
      warning,
      document,
      alertCircle,
      close,
      trashOutline,
      createOutline,
      refreshOutline,
      chevronBackOutline,
      chevronForwardOutline
    });
  }
  ngOnInit() {
    this.cargarInventario();
    this.configurarBusqueda();
    this.suscribirseAInventario();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarInventario() {
    this.loading = true;
    this.error = null;
    this.inventarioService.getInventario(this.paginaActual, this.porPagina, this.busqueda, this.ordenarPor, this.orden).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.productos = response.inventario;
        this.productosFiltrados = response.inventario;
        this.totalProductos = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar inventario:", error);
        this.error = "Error al cargar el inventario. Por favor, int\xE9ntalo de nuevo.";
        this.loading = false;
      }
    });
  }
  suscribirseAInventario() {
    this.inventarioService.inventario$.pipe(takeUntil(this.destroy$)).subscribe((productos) => {
      this.productos = productos;
      this.productosFiltrados = productos;
    });
  }
  configurarBusqueda() {
    this.searchControl.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged()).subscribe((termino) => {
      this.busqueda = termino || "";
      this.paginaActual = 1;
      this.cargarInventario();
    });
  }
  /**
   * Refresca la lista de productos
   */
  refrescarInventario() {
    this.cargarInventario();
  }
  /**
   * Cambia a la página especificada
   */
  cambiarPagina(pagina) {
    if (pagina >= 1 && pagina <= this.obtenerTotalPaginas()) {
      this.paginaActual = pagina;
      this.cargarInventario();
    }
  }
  /**
   * Calcula el total de páginas
   */
  obtenerTotalPaginas() {
    return Math.ceil(this.totalProductos / this.porPagina);
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
  abrirModalCrearProducto() {
    return __async(this, null, function* () {
      const modal = yield this.modalController.create({
        component: CrearProductoModalComponent,
        cssClass: "modal-crear-producto",
        showBackdrop: true,
        backdropDismiss: true
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        this.crearProducto(data);
      }
    });
  }
  crearProducto(datosProducto) {
    const producto = {
      codigo: this.inventarioService.generarCodigoProducto(),
      nombre: datosProducto.nombre,
      descripcion: datosProducto.descripcion || "",
      cantidad_disponible: datosProducto.stock,
      unidad: datosProducto.unidad,
      precio_neto: datosProducto.precioNeto,
      pvp: datosProducto.pvp
    };
    this.loading = true;
    this.error = null;
    this.inventarioService.crearProducto(producto).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.mostrarToast("Producto creado exitosamente", "success");
        this.loading = false;
        this.cargarInventario();
      },
      error: (error) => {
        console.error("Error al crear producto:", error);
        this.error = "Error al crear el producto. Por favor, int\xE9ntalo de nuevo.";
        this.loading = false;
        this.mostrarToast("Error al crear el producto", "danger");
      }
    });
  }
  verDetallesProducto(producto) {
    return __async(this, null, function* () {
      const alert = yield this.alertController.create({
        header: producto.nombre,
        subHeader: `C\xF3digo: ${producto.codigo}`,
        message: `
        <p><strong>Descripci\xF3n:</strong> ${producto.descripcion || "Sin descripci\xF3n"}</p>
        <p><strong>Cantidad:</strong> ${producto.cantidad_disponible} ${producto.unidad}</p>
        <p><strong>Precio Neto:</strong> ${producto.precio_neto}\u20AC</p>
        <p><strong>PVP:</strong> ${producto.pvp}\u20AC</p>
        <p><strong>Fecha Creaci\xF3n:</strong> ${new Date(producto.fecha_creacion).toLocaleDateString()}</p>
      `,
        buttons: [
          {
            text: "Editar",
            handler: () => {
              this.editarProducto(producto);
            }
          },
          {
            text: "Eliminar",
            role: "destructive",
            handler: () => {
              this.confirmarEliminarProducto(producto);
            }
          },
          {
            text: "Cerrar",
            role: "cancel"
          }
        ]
      });
      yield alert.present();
    });
  }
  editarProducto(producto) {
    console.log("Editar producto:", producto);
  }
  confirmarEliminarProducto(producto) {
    return __async(this, null, function* () {
      const alert = yield this.alertController.create({
        header: "Confirmar eliminaci\xF3n",
        message: `\xBFEst\xE1s seguro de que quieres eliminar el producto "${producto.nombre}"?`,
        buttons: [
          {
            text: "Cancelar",
            role: "cancel"
          },
          {
            text: "Eliminar",
            role: "destructive",
            handler: () => {
              this.eliminarProducto(producto.id);
            }
          }
        ]
      });
      yield alert.present();
    });
  }
  eliminarProducto(id) {
    this.loading = true;
    this.error = null;
    this.inventarioService.eliminarProducto(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.mostrarToast("Producto eliminado exitosamente", "success");
        this.loading = false;
        this.cargarInventario();
      },
      error: (error) => {
        console.error("Error al eliminar producto:", error);
        this.error = "Error al eliminar el producto. Por favor, int\xE9ntalo de nuevo.";
        this.loading = false;
        this.mostrarToast("Error al eliminar el producto", "danger");
      }
    });
  }
  mostrarToast(mensaje, color) {
    return __async(this, null, function* () {
      const toast = yield this.toastController.create({
        message: mensaje,
        duration: 2e3,
        color,
        position: "top"
      });
      yield toast.present();
    });
  }
  // Métodos auxiliares para el template
  getEnStock(cantidad) {
    return cantidad > 0;
  }
  getPrecioNetoFormateado(precio) {
    return `${precio.toFixed(2)}\u20AC`;
  }
  getPvpFormateado(pvp) {
    return `${pvp.toFixed(2)}\u20AC`;
  }
};
_InventarioComponent.\u0275fac = function InventarioComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _InventarioComponent)(\u0275\u0275directiveInject(ModalController), \u0275\u0275directiveInject(InventarioService), \u0275\u0275directiveInject(AlertController), \u0275\u0275directiveInject(ToastController));
};
_InventarioComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InventarioComponent, selectors: [["app-inventario"]], decls: 4, vars: 3, consts: [["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "dashboard-table", 4, "ngIf"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "error-state"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "dashboard-table"], [1, "table-header"], [1, "table-header-left"], [1, "table-title"], [1, "table-meta"], [1, "mobile-search"], ["type", "text", "placeholder", "Buscar producto...", 3, "formControl"], ["name", "search-outline"], [1, "table-search", "desktop-only"], ["type", "text", "placeholder", "Buscar...", 3, "formControl"], [1, "header-actions"], ["title", "Refrescar", 1, "btn-refresh", 3, "click"], [1, "btn-add", 3, "click"], ["name", "add-circle"], [1, "mobile-actions"], [1, "mobile-filter"], [1, "mobile-buttons"], ["class", "compact-inventario-table", 4, "ngIf"], ["class", "no-data-container", 4, "ngIf"], ["class", "table-pagination", 4, "ngIf"], [1, "compact-inventario-table"], [1, "inventario-table"], [1, "header-row"], [1, "header-cell"], [1, "table-body"], ["class", "aviso-row", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "aviso-row", 3, "ngClass"], [1, "aviso-cell", "numero-aviso"], [1, "aviso-cell", "nombre-cliente"], [1, "aviso-cell", "detalle-servicio"], [1, "detalle-texto", 3, "title"], [1, "aviso-cell", "cantidad-aviso"], [1, "aviso-cell", "unidad-aviso"], [1, "aviso-cell", "estado-aviso"], [1, "badge", 3, "ngClass"], [1, "aviso-cell", "precio-neto-aviso"], [1, "aviso-cell", "pvp-aviso"], [1, "aviso-cell", "acciones"], ["title", "Ver detalles", 1, "btn-ver", 3, "click"], ["name", "eye-outline"], ["title", "Editar producto", 1, "btn-editar"], ["name", "create-outline"], ["title", "Eliminar producto", 1, "btn-eliminar", 3, "click"], ["name", "trash-outline"], [1, "no-data-container"], [1, "no-data-message"], ["name", "cube-outline"], [1, "btn-create", 3, "click"], [1, "table-pagination"], [1, "pagination-info"], [1, "pagination"], ["title", "Primera p\xE1gina", 1, "pagination-btn", 3, "click", "disabled"], ["name", "chevron-back-outline"], ["title", "P\xE1gina anterior", 1, "pagination-btn", 3, "click", "disabled"], [4, "ngFor", "ngForOf"], ["title", "P\xE1gina siguiente", 1, "pagination-btn", 3, "click", "disabled"], ["name", "chevron-forward-outline"], ["title", "\xDAltima p\xE1gina", 1, "pagination-btn", 3, "click", "disabled"], [1, "pagination-btn", 3, "click"]], template: function InventarioComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content");
    \u0275\u0275template(1, InventarioComponent_div_1_Template, 5, 0, "div", 0)(2, InventarioComponent_div_2_Template, 8, 1, "div", 1)(3, InventarioComponent_section_3_Template, 37, 6, "section", 2);
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
  IonContent,
  IonIcon,
  MatTableModule,
  MatIconModule,
  ReactiveFormsModule,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  DefaultValueAccessor,
  NgControlStatus,
  FormControlDirective
], styles: [`

ion-content[_ngcontent-%COMP%] {
  --background: #FFF;
}
.home-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
}
.home-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: 2.2rem;
  color: #4F46E5;
  margin-bottom: 12px;
}
.home-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 1.1rem;
  color: #64748B;
}
#container[_ngcontent-%COMP%] {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-size: 20px;
  line-height: 26px;
}
#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}
#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  text-decoration: none;
}
.table-header-container[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
}
.dashboard-main[_ngcontent-%COMP%] {
  padding: 32px 24px;
  background: #fafbff;
}
.dashboard-summary[_ngcontent-%COMP%] {
  width: fit-content;
  max-width: 100%;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  margin-bottom: 32px;
  padding: 30px;
  margin-right: auto;
}
.summary-cards-desktop[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 24px;
}
.summary-cards-mobile[_ngcontent-%COMP%] {
  display: none;
}
.summary-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.summary-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 120px;
}
.summary-card-mobile[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
}
.summary-card-mobile[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 24px;
  flex-shrink: 0;
}
.summary-card-mobile[_ngcontent-%COMP%]   .mobile-card-content[_ngcontent-%COMP%] {
  flex: 1;
}
.summary-card[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {
  width: 74px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 36px;
}
.purple-bg[_ngcontent-%COMP%] {
  background: rgba(78, 70, 229, 0.13);
  color: #605BFF;
}
.yellow-bg[_ngcontent-%COMP%] {
  background: #FEF0C7;
  color: #DC6803;
}
.red-bg[_ngcontent-%COMP%] {
  background: #FEE4E2;
  color: #D92D20;
}
.blue-bg[_ngcontent-%COMP%] {
  background: #EEF2FF;
  color: #0F5FC2;
}
.summary-title[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #ACACAC;
  margin-bottom: 2px;
  font-weight: 500;
}
.summary-value[_ngcontent-%COMP%] {
  font-size: 31px;
  color: #333333;
  font-weight: 600;
  line-height: 30px;
}
.summary-subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748B;
  font-weight: 400;
}
.summary-value[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 400;
  margin-left: 4px;
}
.dashboard-cards[_ngcontent-%COMP%] {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
}
.pending-card[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  padding: 24px 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pending-title[_ngcontent-%COMP%] {
  font-size: 18px;
  color: #26262A;
  font-weight: 500;
}
.pending-details-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: row;
  gap: 40px;
}
.pending-details-container[_ngcontent-%COMP%]   .pending-details-subtitle[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #64748b;
  font-weight: 400;
  text-wrap: nowrap;
}
.pending-amount[_ngcontent-%COMP%] {
  font-size: 30px;
  color: #4F46E5;
  font-weight: 500;
}
.pending-details[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: #64748b;
  font-size: 0.98rem;
}
.pending-status.orange[_ngcontent-%COMP%] {
  color: #DC6803;
  font-weight: 600;
  font-size: 16px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.pending-more[_ngcontent-%COMP%] {
  color: #4F46E5;
  font-size: 0.98rem;
  text-decoration: none;
  margin-top: 8px;
  align-self: flex-end;
}
.dashboard-table[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
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
.mobile-buttons[_ngcontent-%COMP%] {
  display: none;
}
@media (max-width: 768px) {
  .mobile-buttons[_ngcontent-%COMP%] {
    display: flex !important;
    width: auto;
    justify-content: stretch;
    gap: 8px;
  }
  .table-header-container[_ngcontent-%COMP%] {
    width: 100%;
    padding: 0px 16px;
  }
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
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%] {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-number[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #64748b;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
  padding: 16px;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
  color: #334155;
  font-size: 14px;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row.detail[_ngcontent-%COMP%] {
  color: #64748b;
  margin: 8px 0;
  justify-content: flex-start;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   .item-label[_ngcontent-%COMP%] {
  color: #64748b;
  font-weight: 500;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   .item-value[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%] {
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {
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
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:hover {
  background: #F1F5F9;
}
.mobile-cards[_ngcontent-%COMP%]   .producto-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.summary-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: row;
  gap: 60px;
  margin-right: 60px;
}
.summary-container[_ngcontent-%COMP%]   .value-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
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
ion-icon[name=close][_ngcontent-%COMP%] {
  font-size: 20px;
  color: #64748B;
}
ion-icon[name=alert-circle][_ngcontent-%COMP%] {
  font-size: 20px;
  color: #D92D20;
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
.header-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
  align-items: center;
}
.btn-refresh[_ngcontent-%COMP%] {
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
  background-color: #F8FAFC;
  color: #64748b;
  border: 1px solid #E2E8F0;
}
.btn-refresh[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
}
.btn-refresh[_ngcontent-%COMP%]:hover {
  background-color: #F1F5F9;
  border-color: #CBD5E1;
}
.btn-refresh[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.btn-editar[_ngcontent-%COMP%]:hover {
  background-color: #F59E0B;
}
.btn-editar[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.btn-editar[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #D97706;
}
.btn-eliminar[_ngcontent-%COMP%]:hover {
  background-color: #EF4444;
}
.btn-eliminar[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.btn-eliminar[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #DC2626;
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
  align-items: center;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%] {
  background: #f3f4f6;
  min-width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 14px;
  color: #26262A;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #e5e7eb;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn.active[_ngcontent-%COMP%] {
  background: #4F46E5;
  color: #fff;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.table-header-left[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
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
@media (max-width: 768px) {
  .dashboard-main[_ngcontent-%COMP%] {
    padding: 0px;
  }
  .dashboard-summary[_ngcontent-%COMP%] {
    margin-bottom: 5px;
    grid-template-columns: 2fr;
    background-color: transparent;
    padding: 0px !important;
  }
  .desktop-only[_ngcontent-%COMP%] {
    display: none !important;
  }
  .summary-cards-desktop[_ngcontent-%COMP%] {
    display: none;
  }
  .summary-cards-mobile[_ngcontent-%COMP%] {
    display: flex;
    padding: 15px;
    overflow-x: auto;
  }
  .mobile-search[_ngcontent-%COMP%], 
   .mobile-actions[_ngcontent-%COMP%], 
   .mobile-cards[_ngcontent-%COMP%] {
    display: flex;
  }
  .dashboard-table[_ngcontent-%COMP%] {
    height: 100%;
    margin: 0;
    padding: 16px;
    border-radius: 0;
    box-shadow: none;
  }
  .table-header[_ngcontent-%COMP%] {
    margin-bottom: 12px;
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
  .dashboard-main[_ngcontent-%COMP%] {
    padding: 0px;
    margin-top: 10px;
  }
  .dashboard-summary[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .mobile-search[_ngcontent-%COMP%] {
    padding: 0px 16px;
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
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-filter[_ngcontent-%COMP%] {
    padding: 8px 16px !important;
    height: 40px !important;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%] {
    width: 20%;
    justify-content: stretch;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    flex: 1;
    height: 40px !important;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 20px !important;
  }
  .summary-title[_ngcontent-%COMP%] {
    font-size: 12px;
    color: #ACACAC;
    margin-bottom: 2px;
  }
  .summary-value[_ngcontent-%COMP%] {
    font-size: 28px;
    color: #333333;
    font-weight: 600;
    line-height: 30px;
  }
  .summary-subtitle[_ngcontent-%COMP%] {
    font-size: 12px;
    color: #26262A;
    font-weight: 500;
  }
  .summary-card-mobile[_ngcontent-%COMP%] {
    padding: 12px;
    background-color: #fff;
  }
  .summary-card-mobile[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
  .dashboard-table[_ngcontent-%COMP%] {
    width: 100%;
    padding: 0px;
  }
}
.compact-inventario-table[_ngcontent-%COMP%] {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%] {
  width: 100%;
  display: grid;
  grid-template-columns: 80px 140px minmax(200px, 1fr) 80px 80px 100px 120px 120px 80px;
  font-size: 13px;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  display: contents;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%] {
  display: contents;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
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
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%] {
  display: contents;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%] {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #F9FAFB;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.no-visitado[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #EF4444;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.no-visitado[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEF2F2;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.no-visitado[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEE2E2;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.visitado-pendiente[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.visitado-pendiente[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FFFBEB;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.visitado-pendiente[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEF3C7;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente-presupuesto[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #3B82F6;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente-presupuesto[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #EFF6FF;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente-presupuesto[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #DBEAFE;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.en-curso[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.en-curso[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FFFBEB;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.en-curso[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEF3C7;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #EF4444;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEF2F2;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.pendiente[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #FEE2E2;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.completado[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #10B981;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.completado[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #ECFDF5;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row.completado[_ngcontent-%COMP%]:hover   .aviso-cell[_ngcontent-%COMP%] {
  background-color: #D1FAE5;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.numero-aviso[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: center;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%] {
  justify-content: center;
  font-size: 11px;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.yellow[_ngcontent-%COMP%] {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.red[_ngcontent-%COMP%] {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.green[_ngcontent-%COMP%] {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.no-visitado[_ngcontent-%COMP%] {
  background: var(--estado-no-visitado-bg);
  color: var(--estado-no-visitado-color);
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.visitado-pendiente[_ngcontent-%COMP%] {
  background: var(--estado-visitado-pendiente-bg);
  color: var(--estado-visitado-pendiente-color);
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.estado-aviso[_ngcontent-%COMP%]   .badge.pendiente-presupuesto[_ngcontent-%COMP%] {
  background: var(--estado-pendiente-presupuesto-bg);
  color: var(--estado-pendiente-presupuesto-color);
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.nombre-cliente[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #374151;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.detalle-servicio[_ngcontent-%COMP%]   .detalle-texto[_ngcontent-%COMP%] {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.fecha-aviso[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: center;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.urgente-aviso[_ngcontent-%COMP%] {
  justify-content: center;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.urgente-aviso[_ngcontent-%COMP%]   .urgente-icon[_ngcontent-%COMP%] {
  color: #D92D20;
  font-size: 18px;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.urgente-aviso[_ngcontent-%COMP%]   .no-urgente-icon[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 18px;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%] {
  justify-content: center;
  gap: 4px;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
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
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #6B7280;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover {
  background-color: #10B981;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #059669;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-editar[_ngcontent-%COMP%]:hover {
  background-color: #F59E0B;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-editar[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .aviso-row[_ngcontent-%COMP%]   .aviso-cell.acciones[_ngcontent-%COMP%]   button.btn-editar[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #D97706;
}
@media (max-width: 768px) {
  .compact-inventario-table[_ngcontent-%COMP%] {
    border-radius: 0px !important;
    border-left: none !important;
    border-right: none !important;
    max-height: none;
  }
  .compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%] {
    grid-template-columns: 60px 100px minmax(100px, 1fr) 60px 60px 80px 80px 80px 60px;
    font-size: 12px;
  }
  .compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .producto-row[_ngcontent-%COMP%]   .producto-cell[_ngcontent-%COMP%] {
    padding: 8px 4px;
  }
  .compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .producto-row[_ngcontent-%COMP%]   .producto-cell.nombre[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .producto-row[_ngcontent-%COMP%]   .producto-cell.descripcion[_ngcontent-%COMP%]   .descripcion-texto[_ngcontent-%COMP%] {
    font-size: 11px;
  }
  .compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .producto-row[_ngcontent-%COMP%]   .producto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 24px;
    height: 24px;
  }
  .compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .producto-row[_ngcontent-%COMP%]   .producto-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 14px;
  }
}
.compact-inventario-table[_ngcontent-%COMP%]   .inventario-table[_ngcontent-%COMP%]   .aviso-cell[_ngcontent-%COMP%] {
  color: #26262A !important;
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
/*# sourceMappingURL=inventario.component.css.map */`] });
var InventarioComponent = _InventarioComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventarioComponent, [{
    type: Component,
    args: [{ selector: "app-inventario", standalone: true, imports: [
      CommonModule,
      IonContent,
      IonIcon,
      MatTableModule,
      MatIconModule,
      ReactiveFormsModule
    ], template: `<!-- <ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>
      Blank
    </ion-title>
  </ion-toolbar>
</ion-header> -->


<ion-content>
  <!-- Loading State -->
  <div *ngIf="loading" class="loading-state">
    <div class="loading-spinner">
      <ion-icon name="refresh-outline" class="spinning"></ion-icon>
      <p>Cargando productos...</p>
    </div>
  </div>

  <!-- Error State -->
  <div *ngIf="error && !loading" class="error-state">
    <div class="error-message">
      <ion-icon name="alert-circle-outline"></ion-icon>
      <p>{{ error }}</p>
      <button class="btn-retry" (click)="refrescarInventario()">
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
        <div class="table-title">Tabla de inventario</div>
        <div class="table-meta">Productos: {{ totalProductos }}</div>
      </div>
      
      <!-- Mobile Search Bar -->
      <div class="mobile-search">
        <input type="text" placeholder="Buscar producto..." [formControl]="searchControl" />
        <ion-icon name="search-outline"></ion-icon>
      </div>

      <!-- Desktop Search and Actions -->
      <div class="table-search desktop-only">
        <input type="text" placeholder="Buscar..." [formControl]="searchControl" />
        <select>
          <option>Ordenar por: Recientes</option>
        </select>
        <div class="header-actions">
          <button class="btn-refresh" (click)="refrescarInventario()" title="Refrescar">
            <ion-icon name="refresh-outline"></ion-icon>
          </button>
          <button class="btn-add" (click)="abrirModalCrearProducto()">
            <ion-icon name="add-circle"></ion-icon>
            A\xF1adir producto
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Actions -->
    <div class="mobile-actions">
      <select class="mobile-filter">
        <option>Ordenar: Recientes</option>
        <option>Ordenar: Antiguos</option>
        <option>Ordenar: Stock</option>
      </select>
      <div class="mobile-buttons">
        <button class="btn-refresh" (click)="refrescarInventario()" title="Refrescar">
          <ion-icon name="refresh-outline"></ion-icon>
        </button>
        <button class="btn-add" (click)="abrirModalCrearProducto()">
          <ion-icon name="add-circle"></ion-icon>
        </button>
      </div>
    </div>

      <!-- Compact Table View (grid, igual que avisos) -->
      <div *ngIf="!loading && !error && productosFiltrados.length > 0" class="compact-inventario-table">
        <div class="inventario-table">
          <div class="table-header">
            <div class="header-row">
              <div class="header-cell">C\xF3digo</div>
              <div class="header-cell">Nombre</div>
              <div class="header-cell">Descripci\xF3n</div>
              <div class="header-cell">Cantidad</div>
              <div class="header-cell">Unidad</div>
              <div class="header-cell">Stock</div>
              <div class="header-cell">Precio Neto</div>
              <div class="header-cell">PVP</div>
              <div class="header-cell">Acciones</div>
            </div>
          </div>
          <div class="table-body">
            <div *ngFor="let producto of productosFiltrados"
                 class="aviso-row"
                 [ngClass]="{ 'no-visitado': !getEnStock(producto.cantidad_disponible), 'completado': getEnStock(producto.cantidad_disponible) }">
              <div class="aviso-cell numero-aviso">{{ producto.codigo }}</div>
              <div class="aviso-cell nombre-cliente">{{ producto.nombre }}</div>
              <div class="aviso-cell detalle-servicio">
                <div class="detalle-texto" [title]="producto.descripcion">{{ producto.descripcion || 'Sin descripci\xF3n' }}</div>
              </div>
              <div class="aviso-cell cantidad-aviso">{{ producto.cantidad_disponible }}</div>
              <div class="aviso-cell unidad-aviso">{{ producto.unidad }}</div>
              <div class="aviso-cell estado-aviso">
                <span class="badge" [ngClass]="{ 'yellow': getEnStock(producto.cantidad_disponible), 'red': !getEnStock(producto.cantidad_disponible) }">
                  {{ getEnStock(producto.cantidad_disponible) ? 'En Stock' : 'Sin Stock' }}
                </span>
              </div>
              <div class="aviso-cell precio-neto-aviso">{{ getPrecioNetoFormateado(producto.precio_neto) }}</div>
              <div class="aviso-cell pvp-aviso">{{ getPvpFormateado(producto.pvp) }}</div>
              <div class="aviso-cell acciones">
                <button class="btn-ver" title="Ver detalles" (click)="verDetallesProducto(producto)">
                  <ion-icon name="eye-outline"></ion-icon>
                </button>
                <button class="btn-editar" title="Editar producto">
                  <ion-icon name="create-outline"></ion-icon>
                </button>
                <button class="btn-eliminar" title="Eliminar producto" (click)="confirmarEliminarProducto(producto)">
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado de datos vac\xEDos -->
      <div *ngIf="productosFiltrados.length === 0 && !loading && !error" class="no-data-container">
        <div class="no-data-message">
          <ion-icon name="cube-outline"></ion-icon>
          <h3>No hay productos</h3>
          <p>A\xFAn no se han creado productos en el inventario. Crea el primero para comenzar.</p>
          <button class="btn-create" (click)="abrirModalCrearProducto()">
            <ion-icon name="add-circle"></ion-icon>
            Crear producto
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div *ngIf="productosFiltrados.length > 0 && totalProductos > 0 && !loading && !error" class="table-pagination">
        <span class="pagination-info">
          Mostrando datos {{ ((paginaActual - 1) * porPagina) + 1 }} a {{ Math.min(paginaActual * porPagina, totalProductos) }} de {{ totalProductos }} productos
        </span>
        <div class="pagination">
          <!-- Bot\xF3n Primera P\xE1gina -->
          <button 
            class="pagination-btn" 
            [disabled]="!puedeAnterior()"
            (click)="primeraPagina()"
            title="Primera p\xE1gina">
            <ion-icon name="chevron-back-outline"></ion-icon>
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>

          <!-- Bot\xF3n P\xE1gina Anterior -->
          <button 
            class="pagination-btn" 
            [disabled]="!puedeAnterior()"
            (click)="paginaAnterior()"
            title="P\xE1gina anterior">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>

          <!-- P\xE1ginas -->
          <ng-container *ngFor="let pagina of obtenerRangoPaginas()">
            <button 
              class="pagination-btn" 
              [class.active]="pagina === paginaActual"
              (click)="cambiarPagina(pagina)">
              {{ pagina }}
            </button>
          </ng-container>

          <!-- Bot\xF3n P\xE1gina Siguiente -->
          <button 
            class="pagination-btn" 
            [disabled]="!puedeSiguiente()"
            (click)="paginaSiguiente()"
            title="P\xE1gina siguiente">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>

          <!-- Bot\xF3n \xDAltima P\xE1gina -->
          <button 
            class="pagination-btn" 
            [disabled]="!puedeSiguiente()"
            (click)="ultimaPagina()"
            title="\xDAltima p\xE1gina">
            <ion-icon name="chevron-forward-outline"></ion-icon>
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>
        </div>
      </div>
    </section>
</ion-content>`, styles: [`/* src/app/modules/inventario/pages/inventario/inventario.component.scss */
ion-content {
  --background: #FFF;
}
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
}
.home-container h1 {
  font-size: 2.2rem;
  color: #4F46E5;
  margin-bottom: 12px;
}
.home-container p {
  font-size: 1.1rem;
  color: #64748B;
}
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
#container strong {
  font-size: 20px;
  line-height: 26px;
}
#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}
#container a {
  text-decoration: none;
}
.table-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
}
.dashboard-main {
  padding: 32px 24px;
  background: #fafbff;
}
.dashboard-summary {
  width: fit-content;
  max-width: 100%;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  margin-bottom: 32px;
  padding: 30px;
  margin-right: auto;
}
.summary-cards-desktop {
  display: inline-flex;
  align-items: center;
  gap: 24px;
}
.summary-cards-mobile {
  display: none;
}
.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.summary-card {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 120px;
}
.summary-card-mobile {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
}
.summary-card-mobile .icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 24px;
  flex-shrink: 0;
}
.summary-card-mobile .mobile-card-content {
  flex: 1;
}
.summary-card .icon {
  width: 74px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 36px;
}
.purple-bg {
  background: rgba(78, 70, 229, 0.13);
  color: #605BFF;
}
.yellow-bg {
  background: #FEF0C7;
  color: #DC6803;
}
.red-bg {
  background: #FEE4E2;
  color: #D92D20;
}
.blue-bg {
  background: #EEF2FF;
  color: #0F5FC2;
}
.summary-title {
  font-size: 14px;
  color: #ACACAC;
  margin-bottom: 2px;
  font-weight: 500;
}
.summary-value {
  font-size: 31px;
  color: #333333;
  font-weight: 600;
  line-height: 30px;
}
.summary-subtitle {
  font-size: 14px;
  color: #64748B;
  font-weight: 400;
}
.summary-value span {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 400;
  margin-left: 4px;
}
.dashboard-cards {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
}
.pending-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
  padding: 24px 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pending-title {
  font-size: 18px;
  color: #26262A;
  font-weight: 500;
}
.pending-details-container {
  display: flex;
  flex-direction: row;
  gap: 40px;
}
.pending-details-container .pending-details-subtitle {
  font-size: 14px;
  color: #64748b;
  font-weight: 400;
  text-wrap: nowrap;
}
.pending-amount {
  font-size: 30px;
  color: #4F46E5;
  font-weight: 500;
}
.pending-details {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: #64748b;
  font-size: 0.98rem;
}
.pending-status.orange {
  color: #DC6803;
  font-weight: 600;
  font-size: 16px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.pending-more {
  color: #4F46E5;
  font-size: 0.98rem;
  text-decoration: none;
  margin-top: 8px;
  align-self: flex-end;
}
.dashboard-table {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);
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
.mobile-buttons {
  display: none;
}
@media (max-width: 768px) {
  .mobile-buttons {
    display: flex !important;
    width: auto;
    justify-content: stretch;
    gap: 8px;
  }
  .table-header-container {
    width: 100%;
    padding: 0px 16px;
  }
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
.mobile-cards .producto-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.mobile-cards .producto-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.mobile-cards .producto-card .card-header .card-number {
  font-weight: 500;
  color: #64748b;
}
.mobile-cards .producto-card .card-body {
  padding: 16px;
}
.mobile-cards .producto-card .card-body .card-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
  color: #334155;
  font-size: 14px;
}
.mobile-cards .producto-card .card-body .card-row.detail {
  color: #64748b;
  margin: 8px 0;
  justify-content: flex-start;
}
.mobile-cards .producto-card .card-body .card-row .item-label {
  color: #64748b;
  font-weight: 500;
}
.mobile-cards .producto-card .card-body .card-row .item-value {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards .producto-card .card-body .card-row strong {
  color: #0f172a;
  font-weight: 500;
}
.mobile-cards .producto-card .card-actions {
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
}
.mobile-cards .producto-card .card-actions .action-btn {
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
.mobile-cards .producto-card .card-actions .action-btn ion-icon {
  font-size: 20px;
}
.mobile-cards .producto-card .card-actions .action-btn:hover {
  background: #F1F5F9;
}
.mobile-cards .producto-card .card-actions .action-btn:active {
  transform: scale(0.98);
}
.summary-container {
  display: flex;
  flex-direction: row;
  gap: 60px;
  margin-right: 60px;
}
.summary-container .value-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
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
ion-icon[name=close] {
  font-size: 20px;
  color: #64748B;
}
ion-icon[name=alert-circle] {
  font-size: 20px;
  color: #D92D20;
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
.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}
.btn-refresh {
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
  background-color: #F8FAFC;
  color: #64748b;
  border: 1px solid #E2E8F0;
}
.btn-refresh ion-icon {
  font-size: 20px;
}
.btn-refresh:hover {
  background-color: #F1F5F9;
  border-color: #CBD5E1;
}
.btn-refresh:active {
  transform: scale(0.98);
}
.btn-editar:hover {
  background-color: #F59E0B;
}
.btn-editar:hover ion-icon {
  color: white;
}
.btn-editar:active {
  transform: scale(0.9);
  background-color: #D97706;
}
.btn-eliminar:hover {
  background-color: #EF4444;
}
.btn-eliminar:hover ion-icon {
  color: white;
}
.btn-eliminar:active {
  transform: scale(0.9);
  background-color: #DC2626;
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
  align-items: center;
}
.table-pagination .pagination .pagination-btn {
  background: #f3f4f6;
  min-width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 14px;
  color: #26262A;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.table-pagination .pagination .pagination-btn:hover:not(:disabled) {
  background: #e5e7eb;
}
.table-pagination .pagination .pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.table-pagination .pagination .pagination-btn.active {
  background: #4F46E5;
  color: #fff;
}
.table-pagination .pagination .pagination-btn ion-icon {
  font-size: 16px;
}
.table-header-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
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
@media (max-width: 768px) {
  .dashboard-main {
    padding: 0px;
  }
  .dashboard-summary {
    margin-bottom: 5px;
    grid-template-columns: 2fr;
    background-color: transparent;
    padding: 0px !important;
  }
  .desktop-only {
    display: none !important;
  }
  .summary-cards-desktop {
    display: none;
  }
  .summary-cards-mobile {
    display: flex;
    padding: 15px;
    overflow-x: auto;
  }
  .mobile-search,
  .mobile-actions,
  .mobile-cards {
    display: flex;
  }
  .dashboard-table {
    height: 100%;
    margin: 0;
    padding: 16px;
    border-radius: 0;
    box-shadow: none;
  }
  .table-header {
    margin-bottom: 12px;
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
  .dashboard-main {
    padding: 0px;
    margin-top: 10px;
  }
  .dashboard-summary {
    padding: 16px;
  }
  .mobile-search {
    padding: 0px 16px;
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
  }
  .mobile-actions .mobile-filter {
    padding: 8px 16px !important;
    height: 40px !important;
  }
  .mobile-actions .mobile-buttons {
    width: 20%;
    justify-content: stretch;
  }
  .mobile-actions .mobile-buttons button {
    flex: 1;
    height: 40px !important;
  }
  .mobile-actions .mobile-buttons button ion-icon {
    font-size: 20px !important;
  }
  .summary-title {
    font-size: 12px;
    color: #ACACAC;
    margin-bottom: 2px;
  }
  .summary-value {
    font-size: 28px;
    color: #333333;
    font-weight: 600;
    line-height: 30px;
  }
  .summary-subtitle {
    font-size: 12px;
    color: #26262A;
    font-weight: 500;
  }
  .summary-card-mobile {
    padding: 12px;
    background-color: #fff;
  }
  .summary-card-mobile .icon {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
  .dashboard-table {
    width: 100%;
    padding: 0px;
  }
}
.compact-inventario-table {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
}
.compact-inventario-table .inventario-table {
  width: 100%;
  display: grid;
  grid-template-columns: 80px 140px minmax(200px, 1fr) 80px 80px 100px 120px 120px 80px;
  font-size: 13px;
}
.compact-inventario-table .inventario-table .table-header {
  display: contents;
}
.compact-inventario-table .inventario-table .table-header .header-row {
  display: contents;
}
.compact-inventario-table .inventario-table .table-header .header-row .header-cell {
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
.compact-inventario-table .inventario-table .table-body {
  display: contents;
}
.compact-inventario-table .inventario-table .table-body .aviso-row {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-inventario-table .inventario-table .table-body .aviso-row:hover .aviso-cell {
  background-color: #F9FAFB;
}
.compact-inventario-table .inventario-table .table-body .aviso-row:active {
  transform: scale(0.98);
}
.compact-inventario-table .inventario-table .table-body .aviso-row.no-visitado .aviso-cell:first-child {
  border-left: 4px solid #EF4444;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.no-visitado .aviso-cell {
  background-color: #FEF2F2;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.no-visitado:hover .aviso-cell {
  background-color: #FEE2E2;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.visitado-pendiente .aviso-cell:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.visitado-pendiente .aviso-cell {
  background-color: #FFFBEB;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.visitado-pendiente:hover .aviso-cell {
  background-color: #FEF3C7;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.pendiente-presupuesto .aviso-cell:first-child {
  border-left: 4px solid #3B82F6;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.pendiente-presupuesto .aviso-cell {
  background-color: #EFF6FF;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.pendiente-presupuesto:hover .aviso-cell {
  background-color: #DBEAFE;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.en-curso .aviso-cell:first-child {
  border-left: 4px solid #F59E0B;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.en-curso .aviso-cell {
  background-color: #FFFBEB;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.en-curso:hover .aviso-cell {
  background-color: #FEF3C7;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.pendiente .aviso-cell:first-child {
  border-left: 4px solid #EF4444;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.pendiente .aviso-cell {
  background-color: #FEF2F2;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.pendiente:hover .aviso-cell {
  background-color: #FEE2E2;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.completado .aviso-cell:first-child {
  border-left: 4px solid #10B981;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.completado .aviso-cell {
  background-color: #ECFDF5;
}
.compact-inventario-table .inventario-table .table-body .aviso-row.completado:hover .aviso-cell {
  background-color: #D1FAE5;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.numero-aviso {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: center;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.estado-aviso {
  justify-content: center;
  font-size: 11px;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.estado-aviso .badge {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.yellow {
  background: var(--estado-en-curso-bg);
  color: var(--estado-en-curso-color);
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.red {
  background: var(--estado-pendiente-bg);
  color: var(--estado-pendiente-color);
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.green {
  background: var(--estado-completado-bg);
  color: var(--estado-completado-color);
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.no-visitado {
  background: var(--estado-no-visitado-bg);
  color: var(--estado-no-visitado-color);
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.visitado-pendiente {
  background: var(--estado-visitado-pendiente-bg);
  color: var(--estado-visitado-pendiente-color);
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.estado-aviso .badge.pendiente-presupuesto {
  background: var(--estado-pendiente-presupuesto-bg);
  color: var(--estado-pendiente-presupuesto-color);
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.nombre-cliente {
  font-weight: 500;
  color: #374151;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.detalle-servicio .detalle-texto {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6B7280;
  font-size: 12px;
  line-height: 1.4;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.fecha-aviso {
  font-size: 12px;
  color: #6B7280;
  justify-content: center;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.urgente-aviso {
  justify-content: center;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.urgente-aviso .urgente-icon {
  color: #D92D20;
  font-size: 18px;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.urgente-aviso .no-urgente-icon {
  color: #64748b;
  font-size: 18px;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.acciones {
  justify-content: center;
  gap: 4px;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.acciones button {
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
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.acciones button ion-icon {
  font-size: 16px;
  color: #6B7280;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.acciones button.btn-ver:hover {
  background-color: #10B981;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.acciones button.btn-ver:hover ion-icon {
  color: white;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.acciones button.btn-ver:active {
  transform: scale(0.9);
  background-color: #059669;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.acciones button.btn-editar:hover {
  background-color: #F59E0B;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.acciones button.btn-editar:hover ion-icon {
  color: white;
}
.compact-inventario-table .inventario-table .table-body .aviso-row .aviso-cell.acciones button.btn-editar:active {
  transform: scale(0.9);
  background-color: #D97706;
}
@media (max-width: 768px) {
  .compact-inventario-table {
    border-radius: 0px !important;
    border-left: none !important;
    border-right: none !important;
    max-height: none;
  }
  .compact-inventario-table .inventario-table {
    grid-template-columns: 60px 100px minmax(100px, 1fr) 60px 60px 80px 80px 80px 60px;
    font-size: 12px;
  }
  .compact-inventario-table .inventario-table .table-header .header-row .header-cell {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-inventario-table .inventario-table .table-body .producto-row .producto-cell {
    padding: 8px 4px;
  }
  .compact-inventario-table .inventario-table .table-body .producto-row .producto-cell.nombre {
    font-size: 12px;
  }
  .compact-inventario-table .inventario-table .table-body .producto-row .producto-cell.descripcion .descripcion-texto {
    font-size: 11px;
  }
  .compact-inventario-table .inventario-table .table-body .producto-row .producto-cell.acciones button {
    width: 24px;
    height: 24px;
  }
  .compact-inventario-table .inventario-table .table-body .producto-row .producto-cell.acciones button ion-icon {
    font-size: 14px;
  }
}
.compact-inventario-table .inventario-table .aviso-cell {
  color: #26262A !important;
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
/*# sourceMappingURL=inventario.component.css.map */
`] }]
  }], () => [{ type: ModalController }, { type: InventarioService }, { type: AlertController }, { type: ToastController }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InventarioComponent, { className: "InventarioComponent", filePath: "src/app/modules/inventario/pages/inventario/inventario.component.ts", lineNumber: 28 });
})();
export {
  InventarioComponent
};
//# sourceMappingURL=inventario.component-RO7C57PT.js.map
