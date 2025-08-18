import {
  ClientesService
} from "./chunk-4KIVBTE6.js";
import {
  addIcons,
  arrowForward,
  chevronDownOutline,
  closeOutline,
  cloudUploadOutline,
  copyOutline,
  informationCircleOutline,
  mailOutline,
  personOutline,
  save,
  saveOutline,
  shieldOutline,
  trashOutline
} from "./chunk-YLHOXAZF.js";
import {
  ViewportService
} from "./chunk-IXGWTTVF.js";
import {
  IonIcon,
  IonicModule,
  ModalController
} from "./chunk-N4BFTN3Y.js";
import {
  CheckboxControlValueAccessor,
  CommonModule,
  Component,
  DecimalPipe,
  DefaultValueAccessor,
  ElementRef,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  Input,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Subject,
  Validators,
  setClassMetadata,
  takeUntil,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-ANYKLJQR.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-KNQSF6OU.js";

// src/app/modules/avisos/components/crear-avisos-modal/crear-avisos-modal.component.ts
function CrearAvisosModalComponent_option_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cliente_r2 = ctx.$implicit;
    \u0275\u0275property("value", cliente_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cliente_r2.nombre_completo, " ");
  }
}
function CrearAvisosModalComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "ion-icon", 49);
    \u0275\u0275text(2, " Cargando clientes... ");
    \u0275\u0275elementEnd();
  }
}
function CrearAvisosModalComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.errorClientes, " ");
  }
}
function CrearAvisosModalComponent_div_83_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 55);
    \u0275\u0275element(2, "img", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 57)(4, "span", 58);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 59);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 60);
    \u0275\u0275listener("click", function CrearAvisosModalComponent_div_83_div_4_Template_button_click_9_listener() {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeImage(i_r6));
    });
    \u0275\u0275element(10, "ion-icon", 61);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const imagen_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r2.getImagePreview(imagen_r7), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(imagen_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 3, imagen_r7.size / 1024 / 1024, "1.1-1"), "MB");
  }
}
function CrearAvisosModalComponent_div_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "h4");
    \u0275\u0275text(2, "Archivos adjuntos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 52);
    \u0275\u0275template(4, CrearAvisosModalComponent_div_83_div_4_Template, 11, 6, "div", 53);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.imagenes);
  }
}
var _CrearAvisosModalComponent = class _CrearAvisosModalComponent {
  constructor(fb, modalController, viewportService, elementRef, clientesService) {
    this.fb = fb;
    this.modalController = modalController;
    this.viewportService = viewportService;
    this.elementRef = elementRef;
    this.clientesService = clientesService;
    this.imagenes = [];
    this.clientes = [];
    this.loadingClientes = false;
    this.errorClientes = null;
    this.imageUrls = /* @__PURE__ */ new Map();
    this.destroy$ = new Subject();
    this.avisoForm = this.fb.group({
      tipo: ["", Validators.required],
      cliente: ["", Validators.required],
      descripcion: ["", [Validators.required, Validators.maxLength(200)]],
      direccionLocal: ["", Validators.required],
      telefono: ["", Validators.required],
      nombreContacto: ["", Validators.required],
      esUrgente: [false]
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
      trashOutline
    });
    this.cargarClientes();
    if (this.clienteData) {
      this.avisoForm.patchValue({
        cliente: this.clienteData.id || this.clienteData.nombreContacto,
        direccionLocal: this.clienteData.direccionLocal,
        telefono: this.clienteData.telefono,
        nombreContacto: this.clienteData.nombreContacto
      });
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.imageUrls.forEach((url, file) => {
      URL.revokeObjectURL(url);
    });
    this.imageUrls.clear();
  }
  /**
   * Carga la lista de clientes activos
   */
  cargarClientes() {
    var _a;
    this.loadingClientes = true;
    this.errorClientes = null;
    (_a = this.avisoForm.get("cliente")) == null ? void 0 : _a.disable();
    this.clientesService.getClientes(1, 100, "", "nombre_completo", "asc", true).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        var _a2;
        this.clientes = response.clientes;
        this.loadingClientes = false;
        (_a2 = this.avisoForm.get("cliente")) == null ? void 0 : _a2.enable();
      },
      error: (error) => {
        var _a2;
        console.error("Error al cargar clientes:", error);
        this.errorClientes = "Error al cargar los clientes";
        this.loadingClientes = false;
        (_a2 = this.avisoForm.get("cliente")) == null ? void 0 : _a2.enable();
      }
    });
  }
  /**
   * Maneja el cambio de cliente seleccionado
   */
  onClienteChange(event) {
    const target = event.target;
    const clienteId = target.value;
    const clienteSeleccionado = this.clientes.find((c) => c.id === clienteId);
    if (clienteSeleccionado) {
      this.avisoForm.patchValue({
        direccionLocal: clienteSeleccionado.direccion || "",
        telefono: clienteSeleccionado.telefono_contacto || "",
        nombreContacto: clienteSeleccionado.nombre_completo
      });
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const modalContainer = this.elementRef.nativeElement.querySelector(".modal-container");
      if (modalContainer) {
        this.viewportService.applySafeAreaToModal(modalContainer);
      }
    }, 100);
  }
  onFileSelected(event) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        if (file.type.match(/image\/*/) && !this.imagenes.includes(file)) {
          this.imagenes.push(file);
          this.imageUrls.set(file, URL.createObjectURL(file));
        }
      }
    }
  }
  removeImage(index) {
    const file = this.imagenes[index];
    if (file && this.imageUrls.has(file)) {
      URL.revokeObjectURL(this.imageUrls.get(file));
      this.imageUrls.delete(file);
    }
    this.imagenes.splice(index, 1);
  }
  getImagePreview(file) {
    if (file && this.imageUrls.has(file)) {
      return this.imageUrls.get(file);
    }
    return "assets/icon/favicon.png";
  }
  crearAviso() {
    return __async(this, null, function* () {
      if (this.avisoForm.valid) {
        const avisoData = __spreadProps(__spreadValues({}, this.avisoForm.value), {
          imagenes: this.imagenes
        });
        yield this.modalController.dismiss(avisoData, "confirm");
      }
    });
  }
  cerrarModal() {
    return __async(this, null, function* () {
      yield this.modalController.dismiss(null, "cancel");
    });
  }
  crearCliente() {
    return __async(this, null, function* () {
      yield this.modalController.dismiss(null, "crear-cliente");
    });
  }
};
_CrearAvisosModalComponent.\u0275fac = function CrearAvisosModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CrearAvisosModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ModalController), \u0275\u0275directiveInject(ViewportService), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ClientesService));
};
_CrearAvisosModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrearAvisosModalComponent, selectors: [["app-crear-avisos-modal"]], inputs: { clienteData: "clienteData" }, decls: 91, vars: 7, consts: [["fileInput", ""], [1, "modal-container"], [1, "modal-header"], [1, "header-content"], [1, "close-button", 3, "click"], ["name", "close-outline"], [1, "subtitle"], [1, "modal-body", 3, "ngSubmit", "formGroup"], [1, "modal-content"], [1, "modal-grid"], [1, "form-section"], [1, "form-group"], ["formControlName", "tipo", 1, "form-control"], ["value", ""], ["value", "correctivo"], ["value", "preventivo"], [1, "required"], [1, "input-with-button"], ["formControlName", "cliente", 1, "form-control", 3, "change"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "button", 1, "add-button", 3, "click"], ["name", "add-circle"], ["class", "loading-indicator", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["formControlName", "descripcion", "placeholder", "Ejemplo: 'El trabajador Mathias ha informado que no pudo fichar por error en la app. Adjuntamos justificante.'", "rows", "3", "maxlength", "200", 1, "form-control"], [1, "character-count"], ["type", "text", "formControlName", "direccionLocal", "placeholder", "Ej: Calle Madrid", 1, "form-control"], [1, "form-row"], [1, "form-group", "half"], ["type", "tel", "formControlName", "telefono", "placeholder", "Ej: +34 569 23 56 89", 1, "form-control"], ["type", "text", "formControlName", "nombreContacto", "placeholder", "Ej: David", 1, "form-control"], [1, "form-group", "checkbox-group"], [1, "checkbox-container"], ["type", "checkbox", "formControlName", "esUrgente"], [1, "checkbox-label"], [1, "helper-text"], [1, "images-section"], [1, "imagen-upload-container"], ["type", "file", "multiple", "", "accept", "image/*", 2, "display", "none", 3, "change"], [1, "drop-zone", 3, "click"], ["name", "cloud-upload-outline"], ["class", "uploaded-files", 4, "ngIf"], [1, "modal-footer"], [1, "button-group"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["name", "save-outline"], [3, "value"], [1, "loading-indicator"], ["name", "refresh-outline", 1, "spinning"], [1, "error-message"], [1, "uploaded-files"], [1, "file-list"], ["class", "file-item", 4, "ngFor", "ngForOf"], [1, "file-item"], [1, "file-preview"], ["alt", "Preview", 3, "src"], [1, "file-info"], [1, "file-name"], [1, "file-size"], ["type", "button", 1, "remove-file", 3, "click"], ["name", "trash-outline"]], template: function CrearAvisosModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "div", 3)(3, "h2");
    \u0275\u0275text(4, "A\xF1adir aviso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 4);
    \u0275\u0275listener("click", function CrearAvisosModalComponent_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.cerrarModal());
    });
    \u0275\u0275element(6, "ion-icon", 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 6);
    \u0275\u0275text(8, "A\xF1ade un nuevo aviso");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "form", 7);
    \u0275\u0275listener("ngSubmit", function CrearAvisosModalComponent_Template_form_ngSubmit_9_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.crearAviso());
    });
    \u0275\u0275elementStart(10, "div", 8)(11, "div", 9)(12, "div", 10)(13, "div", 11)(14, "label");
    \u0275\u0275text(15, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "select", 12)(17, "option", 13);
    \u0275\u0275text(18, "Selecciona un tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 14);
    \u0275\u0275text(20, "Correctivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 15);
    \u0275\u0275text(22, "Preventivo");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 11)(24, "label");
    \u0275\u0275text(25, "Cliente ");
    \u0275\u0275elementStart(26, "span", 16);
    \u0275\u0275text(27, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 17)(29, "select", 18);
    \u0275\u0275listener("change", function CrearAvisosModalComponent_Template_select_change_29_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onClienteChange($event));
    });
    \u0275\u0275elementStart(30, "option", 13);
    \u0275\u0275text(31, "Seleccionar cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275template(32, CrearAvisosModalComponent_option_32_Template, 2, 2, "option", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 20);
    \u0275\u0275listener("click", function CrearAvisosModalComponent_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.crearCliente());
    });
    \u0275\u0275element(34, "ion-icon", 21);
    \u0275\u0275text(35, " A\xF1adir cliente ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(36, CrearAvisosModalComponent_div_36_Template, 3, 0, "div", 22)(37, CrearAvisosModalComponent_div_37_Template, 2, 1, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 11)(39, "label");
    \u0275\u0275text(40, "Detalles descripci\xF3n ");
    \u0275\u0275elementStart(41, "span", 16);
    \u0275\u0275text(42, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "textarea", 24);
    \u0275\u0275text(44, "            ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 25);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 11)(48, "label");
    \u0275\u0275text(49, "Direcci\xF3n local ");
    \u0275\u0275elementStart(50, "span", 16);
    \u0275\u0275text(51, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(52, "input", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 27)(54, "div", 28)(55, "label");
    \u0275\u0275text(56, "Tel\xE9fono ");
    \u0275\u0275elementStart(57, "span", 16);
    \u0275\u0275text(58, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(59, "input", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "div", 28)(61, "label");
    \u0275\u0275text(62, "Nombre contacto ");
    \u0275\u0275elementStart(63, "span", 16);
    \u0275\u0275text(64, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(65, "input", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 31)(67, "label", 32);
    \u0275\u0275element(68, "input", 33);
    \u0275\u0275elementStart(69, "span", 34);
    \u0275\u0275text(70, "Aviso Urgente");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "span", 35);
    \u0275\u0275text(72, "Marque si este aviso requiere atenci\xF3n inmediata.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(73, "div", 36)(74, "div", 37)(75, "input", 38, 0);
    \u0275\u0275listener("change", function CrearAvisosModalComponent_Template_input_change_75_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "div", 39);
    \u0275\u0275listener("click", function CrearAvisosModalComponent_Template_div_click_77_listener() {
      \u0275\u0275restoreView(_r1);
      const fileInput_r4 = \u0275\u0275reference(76);
      return \u0275\u0275resetView(fileInput_r4.click());
    });
    \u0275\u0275element(78, "ion-icon", 40);
    \u0275\u0275elementStart(79, "h3");
    \u0275\u0275text(80, "Selecciona una o varias im\xE1genes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "p");
    \u0275\u0275text(82, "Solo se admiten archivos .jpg, .png, .svg y z...");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(83, CrearAvisosModalComponent_div_83_Template, 5, 1, "div", 41);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(84, "footer", 42)(85, "div", 43)(86, "button", 44);
    \u0275\u0275listener("click", function CrearAvisosModalComponent_Template_button_click_86_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.cerrarModal());
    });
    \u0275\u0275text(87, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "button", 45);
    \u0275\u0275listener("click", function CrearAvisosModalComponent_Template_button_click_88_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.crearAviso());
    });
    \u0275\u0275text(89, " Crear aviso ");
    \u0275\u0275element(90, "ion-icon", 46);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    \u0275\u0275advance(9);
    \u0275\u0275property("formGroup", ctx.avisoForm);
    \u0275\u0275advance(23);
    \u0275\u0275property("ngForOf", ctx.clientes);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx.loadingClientes);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.errorClientes);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", ((tmp_5_0 = ctx.avisoForm.get("descripcion")) == null ? null : tmp_5_0.value == null ? null : tmp_5_0.value.length) || 0, "/200");
    \u0275\u0275advance(37);
    \u0275\u0275property("ngIf", ctx.imagenes.length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx.avisoForm.valid);
  }
}, dependencies: [IonicModule, IonIcon, CommonModule, NgForOf, NgIf, DecimalPipe, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName], styles: [`@charset "UTF-8";



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
.step-indicator[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.step-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #6b7280;
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
select.form-control[_ngcontent-%COMP%]   option[value=""][_ngcontent-%COMP%] {
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
.input-with-button[_ngcontent-%COMP%] {
  position: relative;
  display: flex;
  gap: 8px;
}
.input-with-button[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  flex: 1;
}
.input-with-button[_ngcontent-%COMP%]   .add-button[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: none;
  border: none;
  color: #4F46E5;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid #d2d2d2;
  position: absolute;
  right: 8px;
  top: 6px;
  border-radius: 8px;
  font-weight: 500;
}
.input-with-button[_ngcontent-%COMP%]   .add-button[_ngcontent-%COMP%]:hover {
  color: #1d4ed8;
}
.input-with-button[_ngcontent-%COMP%]   .add-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
}
.checkbox-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.checkbox-group[_ngcontent-%COMP%]   .checkbox-container[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.checkbox-group[_ngcontent-%COMP%]   .checkbox-container[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  width: 16px;
  height: 16px;
  margin: 0;
}
.checkbox-group[_ngcontent-%COMP%]   .checkbox-container[_ngcontent-%COMP%]   .checkbox-label[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #374151;
}
.checkbox-group[_ngcontent-%COMP%]   .helper-text[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6b7280;
  margin-left: 24px;
}
.imagen-upload-container[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.imagen-upload-container[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%] {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #fff;
}
.imagen-upload-container[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]:hover {
  border-color: #2563eb;
  background-color: #f8fafc;
}
.imagen-upload-container[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #6b7280;
}
.imagen-upload-container[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 16px 0 8px;
  font-size: 16px;
  color: #374151;
}
.imagen-upload-container[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}
.uploaded-files[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 16px;
  font-size: 16px;
  color: #374151;
}
.file-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.file-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}
.file-item[_ngcontent-%COMP%]   .file-preview[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f3f4f6;
}
.file-item[_ngcontent-%COMP%]   .file-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.file-item[_ngcontent-%COMP%]   .file-info[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.file-item[_ngcontent-%COMP%]   .file-info[_ngcontent-%COMP%]   .file-name[_ngcontent-%COMP%] {
  display: block;
  font-size: 14px;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file-item[_ngcontent-%COMP%]   .file-info[_ngcontent-%COMP%]   .file-size[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6b7280;
}
.file-item[_ngcontent-%COMP%]   .remove-file[_ngcontent-%COMP%] {
  background: none;
  border: none;
  padding: 8px;
  color: #dc2626;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-item[_ngcontent-%COMP%]   .remove-file[_ngcontent-%COMP%]:hover {
  color: #b91c1c;
}
.file-item[_ngcontent-%COMP%]   .remove-file[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 20px;
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
  .input-with-button[_ngcontent-%COMP%] {
    flex-direction: column;
  }
  .input-with-button[_ngcontent-%COMP%]   .add-button[_ngcontent-%COMP%] {
    position: static;
    margin-top: 8px;
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
.loading-indicator[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
}
.loading-indicator[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 14px;
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
.error-message[_ngcontent-%COMP%] {
  margin-top: 8px;
  font-size: 12px;
  color: #dc2626;
  display: flex;
  align-items: center;
  gap: 4px;
}
.error-message[_ngcontent-%COMP%]::before {
  content: "\\26a0";
  font-size: 14px;
}
/*# sourceMappingURL=crear-avisos-modal.component.css.map */`] });
var CrearAvisosModalComponent = _CrearAvisosModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrearAvisosModalComponent, [{
    type: Component,
    args: [{ selector: "app-crear-avisos-modal", standalone: true, imports: [IonicModule, CommonModule, ReactiveFormsModule], template: `<div class="modal-container">
  <header class="modal-header">
    <div class="header-content">
      <h2>A\xF1adir aviso</h2>
      <button class="close-button" (click)="cerrarModal()">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>
    <p class="subtitle">A\xF1ade un nuevo aviso</p>
  </header>

  <form [formGroup]="avisoForm" (ngSubmit)="crearAviso()" class="modal-body">
    <div class="modal-content">
      <div class="modal-grid">
        <!-- Secci\xF3n Izquierda - Formulario -->
        <div class="form-section">
          <div class="form-group">
            <label>Tipo</label>
            <select formControlName="tipo" class="form-control">
              <option value="">Selecciona un tipo</option>
              <option value="correctivo">Correctivo</option>
              <option value="preventivo">Preventivo</option>
            </select>
          </div>

          <div class="form-group">
            <label>Cliente <span class="required">*</span></label>
            <div class="input-with-button">
              <select 
                formControlName="cliente" 
                class="form-control"
                (change)="onClienteChange($event)">
                <option value="">Seleccionar cliente</option>
                <option *ngFor="let cliente of clientes" [value]="cliente.id">
                  {{ cliente.nombre_completo }}
                </option>
              </select>
              <button type="button" class="add-button" (click)="crearCliente()">
                <ion-icon name="add-circle"></ion-icon>
                A\xF1adir cliente
              </button>
            </div>
            <div *ngIf="loadingClientes" class="loading-indicator">
              <ion-icon name="refresh-outline" class="spinning"></ion-icon>
              Cargando clientes...
            </div>
            <div *ngIf="errorClientes" class="error-message">
              {{ errorClientes }}
            </div>
          </div>

          <div class="form-group">
            <label>Detalles descripci\xF3n <span class="required">*</span></label>
            <textarea 
              formControlName="descripcion" 
              class="form-control"
              placeholder="Ejemplo: 'El trabajador Mathias ha informado que no pudo fichar por error en la app. Adjuntamos justificante.'"
              rows="3"
              maxlength="200">
            </textarea>
            <div class="character-count">{{avisoForm.get('descripcion')?.value?.length || 0}}/200</div>
          </div>

          <div class="form-group">
            <label>Direcci\xF3n local <span class="required">*</span></label>
            <input 
              type="text" 
              formControlName="direccionLocal" 
              placeholder="Ej: Calle Madrid"
              class="form-control">
          </div>

          <div class="form-row">
            <div class="form-group half">
              <label>Tel\xE9fono <span class="required">*</span></label>
              <input 
                type="tel" 
                formControlName="telefono" 
                placeholder="Ej: +34 569 23 56 89"
                class="form-control">
            </div>
            <div class="form-group half">
              <label>Nombre contacto <span class="required">*</span></label>
              <input 
                type="text" 
                formControlName="nombreContacto" 
                placeholder="Ej: David"
                class="form-control">
            </div>
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-container">
              <input type="checkbox" formControlName="esUrgente">
              <span class="checkbox-label">Aviso Urgente</span>
            </label>
            <span class="helper-text">Marque si este aviso requiere atenci\xF3n inmediata.</span>
          </div>
        </div>

        <!-- Secci\xF3n Derecha - Im\xE1genes -->
        <div class="images-section">
          <div class="imagen-upload-container">
            <input
              type="file"
              multiple
              accept="image/*"
              #fileInput
              (change)="onFileSelected($event)"
              style="display: none">
            
            <div class="drop-zone" (click)="fileInput.click()">
              <ion-icon name="cloud-upload-outline"></ion-icon>
              <h3>Selecciona una o varias im\xE1genes</h3>
              <p>Solo se admiten archivos .jpg, .png, .svg y z...</p>
            </div>
          </div>

          <div class="uploaded-files" *ngIf="imagenes.length > 0">
            <h4>Archivos adjuntos</h4> 
            <div class="file-list">
              <div class="file-item" *ngFor="let imagen of imagenes; let i = index">
                <div class="file-preview">
                  <img [src]="getImagePreview(imagen)" alt="Preview">
                </div>
                <div class="file-info">
                  <span class="file-name">{{imagen.name}}</span>
                  <span class="file-size">{{imagen.size / 1024 / 1024 | number:'1.1-1'}}MB</span>
                </div>
                <button type="button" class="remove-file" (click)="removeImage(i)">
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>

  <footer class="modal-footer">
    <div class="button-group">
      <button type="button" class="btn btn-outline" (click)="cerrarModal()">
        Cancelar
      </button>
      <button 
        type="button" 
        class="btn btn-primary" 
        (click)="crearAviso()"
        [disabled]="!avisoForm.valid">
        Crear aviso
        <ion-icon name="save-outline"></ion-icon>
      </button>
    </div>
  </footer>
</div>
`, styles: [`@charset "UTF-8";

/* src/app/modules/avisos/components/crear-avisos-modal/crear-avisos-modal.component.scss */
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
.step-indicator {
  margin-bottom: 24px;
}
.step-indicator span {
  font-size: 14px;
  color: #6b7280;
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
select.form-control option[value=""] {
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
.input-with-button {
  position: relative;
  display: flex;
  gap: 8px;
}
.input-with-button input {
  flex: 1;
}
.input-with-button .add-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: none;
  border: none;
  color: #4F46E5;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid #d2d2d2;
  position: absolute;
  right: 8px;
  top: 6px;
  border-radius: 8px;
  font-weight: 500;
}
.input-with-button .add-button:hover {
  color: #1d4ed8;
}
.input-with-button .add-button ion-icon {
  font-size: 18px;
}
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.checkbox-group .checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.checkbox-group .checkbox-container input[type=checkbox] {
  width: 16px;
  height: 16px;
  margin: 0;
}
.checkbox-group .checkbox-container .checkbox-label {
  font-size: 14px;
  color: #374151;
}
.checkbox-group .helper-text {
  font-size: 12px;
  color: #6b7280;
  margin-left: 24px;
}
.imagen-upload-container {
  margin-bottom: 24px;
}
.imagen-upload-container .drop-zone {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #fff;
}
.imagen-upload-container .drop-zone:hover {
  border-color: #2563eb;
  background-color: #f8fafc;
}
.imagen-upload-container .drop-zone ion-icon {
  font-size: 48px;
  color: #6b7280;
}
.imagen-upload-container .drop-zone h3 {
  margin: 16px 0 8px;
  font-size: 16px;
  color: #374151;
}
.imagen-upload-container .drop-zone p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}
.uploaded-files h4 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #374151;
}
.file-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}
.file-item .file-preview {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f3f4f6;
}
.file-item .file-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.file-item .file-info {
  flex: 1;
  min-width: 0;
}
.file-item .file-info .file-name {
  display: block;
  font-size: 14px;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file-item .file-info .file-size {
  font-size: 12px;
  color: #6b7280;
}
.file-item .remove-file {
  background: none;
  border: none;
  padding: 8px;
  color: #dc2626;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-item .remove-file:hover {
  color: #b91c1c;
}
.file-item .remove-file ion-icon {
  font-size: 20px;
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
  .input-with-button {
    flex-direction: column;
  }
  .input-with-button .add-button {
    position: static;
    margin-top: 8px;
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
.loading-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
}
.loading-indicator ion-icon {
  font-size: 14px;
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
.error-message {
  margin-top: 8px;
  font-size: 12px;
  color: #dc2626;
  display: flex;
  align-items: center;
  gap: 4px;
}
.error-message::before {
  content: "\\26a0";
  font-size: 14px;
}
/*# sourceMappingURL=crear-avisos-modal.component.css.map */
`] }]
  }], () => [{ type: FormBuilder }, { type: ModalController }, { type: ViewportService }, { type: ElementRef }, { type: ClientesService }], { clienteData: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrearAvisosModalComponent, { className: "CrearAvisosModalComponent", filePath: "src/app/modules/avisos/components/crear-avisos-modal/crear-avisos-modal.component.ts", lineNumber: 20 });
})();

export {
  CrearAvisosModalComponent
};
//# sourceMappingURL=chunk-GUAVXOYN.js.map
