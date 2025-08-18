import {
  addIcons,
  closeOutline
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
  DefaultValueAccessor,
  ElementRef,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  Input,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  setClassMetadata,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-ANYKLJQR.js";
import {
  __async
} from "./chunk-KNQSF6OU.js";

// src/app/modules/clientes/components/crear-cliente-modal/crear-cliente-modal.component.ts
var _CrearClienteModalComponent = class _CrearClienteModalComponent {
  constructor(fb, modalController, viewportService, elementRef) {
    this.fb = fb;
    this.modalController = modalController;
    this.viewportService = viewportService;
    this.elementRef = elementRef;
    this.modo = "crear";
    this.clienteForm = this.fb.group({
      nombreContacto: ["", Validators.required],
      telefono: ["", Validators.required],
      correoElectronico: ["", [Validators.required, Validators.email]],
      // notasImportantes: ['', Validators.maxLength(200)], // Comentado temporalmente
      direccionLocal: ["", Validators.required],
      codigoPostal: ["", Validators.required],
      localidad: ["", Validators.required],
      esActivo: [true, Validators.required]
    });
  }
  ngOnInit() {
    addIcons({ closeOutline });
    if (this.modo === "editar" && this.cliente) {
      this.cargarDatosCliente();
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
  cargarDatosCliente() {
    var _a;
    if (!this.cliente)
      return;
    const direccionCompleta = this.cliente.direccion || "";
    const partes = direccionCompleta.split(", ");
    let direccionLocal = "";
    let codigoPostal = "";
    let localidad = "";
    if (partes.length >= 2) {
      direccionLocal = partes[0];
      const ultimaParte = partes[partes.length - 1];
      const codigoLocalidad = ultimaParte.split(" ");
      if (codigoLocalidad.length >= 2) {
        codigoPostal = codigoLocalidad[0];
        localidad = codigoLocalidad.slice(1).join(" ");
      } else {
        localidad = ultimaParte;
      }
    } else {
      direccionLocal = direccionCompleta;
    }
    this.clienteForm.patchValue({
      nombreContacto: this.cliente.nombre_completo || "",
      telefono: this.cliente.telefono_contacto || "",
      email: this.cliente.email || "",
      // notasImportantes: this.cliente.notas_importantes || '', // Comentado temporalmente
      direccionLocal,
      codigoPostal,
      localidad,
      esActivo: (_a = this.cliente.es_activo) != null ? _a : true
    });
  }
  guardarCliente() {
    return __async(this, null, function* () {
      var _a;
      if (this.clienteForm.valid) {
        this.clienteForm.disable();
        const clienteData = {
          nombre_completo: this.clienteForm.value.nombreContacto,
          telefono_contacto: this.clienteForm.value.telefono,
          email: this.clienteForm.value.correoElectronico,
          direccion: `${this.clienteForm.value.direccionLocal}, ${this.clienteForm.value.codigoPostal} ${this.clienteForm.value.localidad}`,
          nivel_urgencia_habitual: ((_a = this.cliente) == null ? void 0 : _a.nivel_urgencia_habitual) || "Media",
          es_activo: this.clienteForm.value.esActivo
          // notas_importantes: this.clienteForm.value.notasImportantes // Comentado temporalmente
        };
        yield this.modalController.dismiss(clienteData, "confirm");
      }
    });
  }
  cerrarModal() {
    return __async(this, null, function* () {
      yield this.modalController.dismiss(null, "cancel");
    });
  }
  get tituloModal() {
    return this.modo === "editar" ? "Editar cliente" : "A\xF1adir nuevo cliente";
  }
  get subtituloModal() {
    return this.modo === "editar" ? "Modifica los datos del cliente" : "A\xF1ade un nuevo cliente";
  }
  get textoBotonGuardar() {
    return this.modo === "editar" ? "Guardar cambios" : "Guardar cliente";
  }
  get botonDeshabilitado() {
    return !this.clienteForm.valid || this.clienteForm.disabled;
  }
};
_CrearClienteModalComponent.\u0275fac = function CrearClienteModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CrearClienteModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ModalController), \u0275\u0275directiveInject(ViewportService), \u0275\u0275directiveInject(ElementRef));
};
_CrearClienteModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrearClienteModalComponent, selectors: [["app-crear-cliente-modal"]], inputs: { modo: "modo", cliente: "cliente" }, decls: 57, vars: 5, consts: [[1, "modal-container"], [1, "modal-header"], [1, "header-content"], [1, "close-button", 3, "click"], ["name", "close-outline"], [1, "subtitle"], [1, "modal-content"], [3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "form-group"], ["type", "text", "formControlName", "nombreContacto", "placeholder", "Ej: Luis P\xE9rez", 1, "form-control"], [1, "form-row"], [1, "form-group", "half"], ["type", "tel", "formControlName", "telefono", "placeholder", "Ej: +34 569 23 56 89", 1, "form-control"], ["type", "email", "formControlName", "correoElectronico", "placeholder", "Ej: ejemplo@dominio.es", 1, "form-control"], [1, "required"], ["type", "text", "formControlName", "direccionLocal", "placeholder", "Ej: Calle Azorin", 1, "form-control"], ["type", "text", "formControlName", "codigoPostal", "placeholder", "28004", 1, "form-control"], ["type", "text", "formControlName", "localidad", "placeholder", "Ej: Madrid", 1, "form-control"], [1, "checkbox-label"], ["type", "checkbox", "formControlName", "esActivo", 1, "form-checkbox"], [1, "checkmark"], [1, "form-help"], [1, "modal-footer"], [1, "button-group"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"]], template: function CrearClienteModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 3);
    \u0275\u0275listener("click", function CrearClienteModalComponent_Template_button_click_5_listener() {
      return ctx.cerrarModal();
    });
    \u0275\u0275element(6, "ion-icon", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 5);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 6)(10, "form", 7);
    \u0275\u0275listener("ngSubmit", function CrearClienteModalComponent_Template_form_ngSubmit_10_listener() {
      return ctx.guardarCliente();
    });
    \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "label");
    \u0275\u0275text(14, "Nombre de contacto");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 11)(17, "div", 12)(18, "label");
    \u0275\u0275text(19, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "input", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 12)(22, "label");
    \u0275\u0275text(23, "Correo electr\xF3nico");
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "input", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 9)(26, "label");
    \u0275\u0275text(27, "Direccion local ");
    \u0275\u0275elementStart(28, "span", 15);
    \u0275\u0275text(29, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(30, "input", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 11)(32, "div", 12)(33, "label");
    \u0275\u0275text(34, "C\xF3digo Postal ");
    \u0275\u0275elementStart(35, "span", 15);
    \u0275\u0275text(36, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(37, "input", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 12)(39, "label");
    \u0275\u0275text(40, "Localidad ");
    \u0275\u0275elementStart(41, "span", 15);
    \u0275\u0275text(42, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(43, "input", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 9)(45, "label", 19);
    \u0275\u0275element(46, "input", 20)(47, "span", 21);
    \u0275\u0275text(48, " Cliente activo ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "small", 22);
    \u0275\u0275text(50, "Los clientes inactivos no aparecer\xE1n en las b\xFAsquedas principales");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(51, "footer", 23)(52, "div", 24)(53, "button", 25);
    \u0275\u0275listener("click", function CrearClienteModalComponent_Template_button_click_53_listener() {
      return ctx.cerrarModal();
    });
    \u0275\u0275text(54, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "button", 26);
    \u0275\u0275listener("click", function CrearClienteModalComponent_Template_button_click_55_listener() {
      return ctx.guardarCliente();
    });
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.tituloModal);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.subtituloModal);
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx.clienteForm);
    \u0275\u0275advance(45);
    \u0275\u0275property("disabled", ctx.botonDeshabilitado);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.textoBotonGuardar, " ");
  }
}, dependencies: [IonicModule, IonIcon, CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  max-height: 85vh;\n  background: #fff;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  color: #6b7280;\n  font-size: 14px;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n  color: #6b7280;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover {\n  color: #111827;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.modal-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.modal-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  height: 100%;\n}\n.form-section[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-height: calc(85vh - 140px);\n}\n.form-group[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.form-control[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  padding: 10px 12px;\n  background-color: #FAFAFB;\n  border: 1px solid transparent;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #111827;\n  transition: border-color 0.2s;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2563eb;\n}\n.form-control[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\ntextarea.form-control[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.character-count[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 13px;\n  right: 13px;\n  font-size: 12px;\n  color: #6b7280;\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 4px;\n}\n.checkbox-label[_ngcontent-%COMP%]   .form-checkbox[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  accent-color: #4F46E5;\n  cursor: pointer;\n}\n.checkbox-label[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%] {\n  display: none;\n}\n.form-help[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: #6b7280;\n  margin-top: 4px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.form-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  flex: 1;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  background-color: #fff;\n  flex-shrink: 0;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-outline[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid #d1d5db;\n  color: #374151;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-outline[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f8fafc;\n  border-color: #9ca3af;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background-color: #4F46E5;\n  border: 1px solid #4F46E5;\n  color: #fff;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #4338ca;\n  border-color: #4338ca;\n}\n.modal-footer[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:disabled {\n  background-color: #9ca3af;\n  border-color: #9ca3af;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n@media (max-width: 768px) {\n  .modal-container[_ngcontent-%COMP%] {\n    max-height: none;\n    height: 100vh;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    overflow-y: auto;\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    height: auto;\n    overflow: auto;\n  }\n  .form-control[_ngcontent-%COMP%] {\n    font-size: 16px;\n    padding: 12px;\n  }\n  textarea[_ngcontent-%COMP%], \n   select[_ngcontent-%COMP%], \n   input[_ngcontent-%COMP%] {\n    font-size: 14px !important;\n    padding: 12px;\n  }\n  .input-with-button[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .input-with-button[_ngcontent-%COMP%]   .add-button[_ngcontent-%COMP%] {\n    position: static;\n    margin-top: 8px;\n    width: 100%;\n    justify-content: center;\n  }\n}\n@media (display-mode: standalone) and (max-width: 768px) {\n  .modal-container[_ngcontent-%COMP%] {\n    height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n    max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n  }\n  .modal-header[_ngcontent-%COMP%] {\n    padding-top: calc(16px + var(--safe-area-top, 0px));\n  }\n  .modal-footer[_ngcontent-%COMP%] {\n    padding-bottom: calc(16px + var(--safe-area-bottom, 0px));\n  }\n}\n@supports (-webkit-touch-callout: none) {\n  @media (display-mode: standalone) and (max-width: 768px) {\n    .modal-container[_ngcontent-%COMP%] {\n      height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n      max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n    }\n    .modal-header[_ngcontent-%COMP%] {\n      padding-top: calc(16px + var(--safe-area-top, 0px));\n    }\n    .modal-footer[_ngcontent-%COMP%] {\n      padding-bottom: calc(16px + var(--safe-area-bottom, 0px));\n    }\n  }\n}\n@supports not (padding-top: env(safe-area-inset-top)) {\n  @media (display-mode: standalone) and (max-width: 768px) {\n    .modal-container[_ngcontent-%COMP%] {\n      height: calc(100vh - 40px);\n      max-height: calc(100vh - 40px);\n    }\n    .modal-header[_ngcontent-%COMP%] {\n      padding-top: 36px;\n    }\n    .modal-footer[_ngcontent-%COMP%] {\n      padding-bottom: 36px;\n    }\n  }\n}\n/*# sourceMappingURL=crear-cliente-modal.component.css.map */"] });
var CrearClienteModalComponent = _CrearClienteModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrearClienteModalComponent, [{
    type: Component,
    args: [{ selector: "app-crear-cliente-modal", standalone: true, imports: [IonicModule, CommonModule, ReactiveFormsModule], template: `<div class="modal-container">
  <header class="modal-header">
    <div class="header-content">
      <h2>{{ tituloModal }}</h2>
      <button class="close-button" (click)="cerrarModal()">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>
    <p class="subtitle">{{ subtituloModal }}</p>
  </header>

  <div class="modal-content">
    <form [formGroup]="clienteForm" (ngSubmit)="guardarCliente()">
      <div class="form-section">
        <div class="form-group">
          <label>Nombre de contacto</label>
          <input 
            type="text" 
            formControlName="nombreContacto" 
            class="form-control"
            placeholder="Ej: Luis P\xE9rez">
        </div>

        <div class="form-row">
          <div class="form-group half">
            <label>Tel\xE9fono</label>
            <input 
              type="tel" 
              formControlName="telefono" 
              class="form-control"
              placeholder="Ej: +34 569 23 56 89">
          </div>
          <div class="form-group half">
            <label>Correo electr\xF3nico</label>
            <input 
              type="email" 
              formControlName="correoElectronico" 
              class="form-control"
              placeholder="Ej: ejemplo@dominio.es">
          </div>
        </div>

        <!-- Comentado temporalmente hasta que se ejecute la migraci\xF3n SQL
        <div class="form-group">
          <label>Notas importantes</label>
          <textarea 
            formControlName="notasImportantes" 
            class="form-control"
            placeholder="Descripci\xF3n m\xE1s detallada del art\xEDculo"
            rows="3"
            maxlength="200">
          </textarea>
          <div class="character-count">{{clienteForm.get('notasImportantes')?.value?.length || 0}}/200</div>
        </div>
        -->

        <div class="form-group">
          <label>Direccion local <span class="required">*</span></label>
          <input 
            type="text" 
            formControlName="direccionLocal" 
            class="form-control"
            placeholder="Ej: Calle Azorin">
        </div>

                  <div class="form-row">
            <div class="form-group half">
              <label>C\xF3digo Postal <span class="required">*</span></label>
              <input 
                type="text" 
                formControlName="codigoPostal" 
                class="form-control"
                placeholder="28004">
            </div>
            <div class="form-group half">
              <label>Localidad <span class="required">*</span></label>
              <input 
                type="text" 
                formControlName="localidad" 
                class="form-control"
                placeholder="Ej: Madrid">
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                formControlName="esActivo"
                class="form-checkbox">
              <span class="checkmark"></span>
              Cliente activo
            </label>
            <small class="form-help">Los clientes inactivos no aparecer\xE1n en las b\xFAsquedas principales</small>
          </div>
      </div>
    </form>
  </div>

  <footer class="modal-footer">
    <div class="button-group">
      <button type="button" class="btn btn-outline" (click)="cerrarModal()">
        Cancelar
      </button>
      <button 
        type="button" 
        class="btn btn-primary" 
        (click)="guardarCliente()"
        [disabled]="botonDeshabilitado">
        {{ textoBotonGuardar }}
      </button>
    </div>
  </footer>
</div>
`, styles: ["/* src/app/modules/clientes/components/crear-cliente-modal/crear-cliente-modal.component.scss */\n.modal-container {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  max-height: 85vh;\n  background: #fff;\n}\n.modal-header {\n  padding: 16px 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header .header-content {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header .header-content h2 {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header .subtitle {\n  margin: 8px 0 0;\n  color: #6b7280;\n  font-size: 14px;\n}\n.modal-header .close-button {\n  background: none;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n  color: #6b7280;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-header .close-button:hover {\n  color: #111827;\n}\n.modal-header .close-button ion-icon {\n  font-size: 24px;\n}\n.modal-content {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.modal-content form {\n  height: 100%;\n}\n.form-section {\n  padding: 24px;\n  max-height: calc(85vh - 140px);\n}\n.form-group {\n  position: relative;\n  margin-bottom: 20px;\n}\n.form-group label {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n.form-group label .required {\n  color: #dc2626;\n}\n.form-control {\n  position: relative;\n  width: 100%;\n  padding: 10px 12px;\n  background-color: #FAFAFB;\n  border: 1px solid transparent;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #111827;\n  transition: border-color 0.2s;\n}\n.form-control:focus {\n  outline: none;\n  border-color: #2563eb;\n}\n.form-control::placeholder {\n  color: #9ca3af;\n}\ntextarea.form-control {\n  resize: vertical;\n  min-height: 80px;\n}\n.character-count {\n  position: absolute;\n  bottom: 13px;\n  right: 13px;\n  font-size: 12px;\n  color: #6b7280;\n}\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 4px;\n}\n.checkbox-label .form-checkbox {\n  width: 16px;\n  height: 16px;\n  accent-color: #4F46E5;\n  cursor: pointer;\n}\n.checkbox-label .checkmark {\n  display: none;\n}\n.form-help {\n  display: block;\n  font-size: 12px;\n  color: #6b7280;\n  margin-top: 4px;\n}\n.form-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.form-row .form-group {\n  margin-bottom: 0;\n  flex: 1;\n}\n.modal-footer {\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  background-color: #fff;\n  flex-shrink: 0;\n}\n.modal-footer .button-group {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n}\n.modal-footer .button-group .btn {\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.modal-footer .button-group .btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-footer .button-group .btn-outline {\n  background: none;\n  border: 1px solid #d1d5db;\n  color: #374151;\n}\n.modal-footer .button-group .btn-outline:hover:not(:disabled) {\n  background-color: #f8fafc;\n  border-color: #9ca3af;\n}\n.modal-footer .button-group .btn-primary {\n  background-color: #4F46E5;\n  border: 1px solid #4F46E5;\n  color: #fff;\n}\n.modal-footer .button-group .btn-primary:hover:not(:disabled) {\n  background-color: #4338ca;\n  border-color: #4338ca;\n}\n.modal-footer .button-group .btn-primary:disabled {\n  background-color: #9ca3af;\n  border-color: #9ca3af;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n@media (max-width: 768px) {\n  .modal-container {\n    max-height: none;\n    height: 100vh;\n  }\n  .modal-body {\n    overflow-y: auto;\n  }\n  .modal-content {\n    height: auto;\n    overflow: auto;\n  }\n  .form-control {\n    font-size: 16px;\n    padding: 12px;\n  }\n  textarea,\n  select,\n  input {\n    font-size: 14px !important;\n    padding: 12px;\n  }\n  .input-with-button {\n    flex-direction: column;\n  }\n  .input-with-button .add-button {\n    position: static;\n    margin-top: 8px;\n    width: 100%;\n    justify-content: center;\n  }\n}\n@media (display-mode: standalone) and (max-width: 768px) {\n  .modal-container {\n    height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n    max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n  }\n  .modal-header {\n    padding-top: calc(16px + var(--safe-area-top, 0px));\n  }\n  .modal-footer {\n    padding-bottom: calc(16px + var(--safe-area-bottom, 0px));\n  }\n}\n@supports (-webkit-touch-callout: none) {\n  @media (display-mode: standalone) and (max-width: 768px) {\n    .modal-container {\n      height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n      max-height: calc(100vh - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n    }\n    .modal-header {\n      padding-top: calc(16px + var(--safe-area-top, 0px));\n    }\n    .modal-footer {\n      padding-bottom: calc(16px + var(--safe-area-bottom, 0px));\n    }\n  }\n}\n@supports not (padding-top: env(safe-area-inset-top)) {\n  @media (display-mode: standalone) and (max-width: 768px) {\n    .modal-container {\n      height: calc(100vh - 40px);\n      max-height: calc(100vh - 40px);\n    }\n    .modal-header {\n      padding-top: 36px;\n    }\n    .modal-footer {\n      padding-bottom: 36px;\n    }\n  }\n}\n/*# sourceMappingURL=crear-cliente-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ModalController }, { type: ViewportService }, { type: ElementRef }], { modo: [{
    type: Input
  }], cliente: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrearClienteModalComponent, { className: "CrearClienteModalComponent", filePath: "src/app/modules/clientes/components/crear-cliente-modal/crear-cliente-modal.component.ts", lineNumber: 17 });
})();

export {
  CrearClienteModalComponent
};
//# sourceMappingURL=chunk-BRDIOUAH.js.map
