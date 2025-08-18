import {
  addIcons,
  arrowForward,
  cameraOutline,
  chevronDownOutline,
  closeOutline,
  cloudUploadOutline,
  copyOutline,
  informationCircleOutline,
  mailOutline,
  personOutline,
  save,
  saveOutline,
  shieldOutline
} from "./chunk-YLHOXAZF.js";
import {
  AuthService,
  UsuariosService
} from "./chunk-HVSDGWD4.js";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToast
} from "./chunk-DJA56OJT.js";
import {
  CommonModule,
  Component,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgIf,
  ReactiveFormsModule,
  Subscription,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
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
import {
  __async
} from "./chunk-KNQSF6OU.js";

// src/app/modules/mi-cuenta/pages/mi-cuenta/mi-cuenta.component.ts
function MiCuentaComponent_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function MiCuentaComponent_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activarEdicion());
    });
    \u0275\u0275text(1, " Ajustes de Perfil ");
    \u0275\u0275element(2, "ion-icon", 45);
    \u0275\u0275elementEnd();
  }
}
function MiCuentaComponent_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function MiCuentaComponent_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelarEdicion());
    });
    \u0275\u0275text(1, " Cancelar ");
    \u0275\u0275element(2, "ion-icon", 46);
    \u0275\u0275elementEnd();
  }
}
function MiCuentaComponent_div_32_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El nombre es requerido");
    \u0275\u0275elementEnd();
  }
}
function MiCuentaComponent_div_32_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El nombre debe tener al menos 2 caracteres");
    \u0275\u0275elementEnd();
  }
}
function MiCuentaComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, MiCuentaComponent_div_32_span_1_Template, 2, 0, "span", 48)(2, MiCuentaComponent_div_32_span_2_Template, 2, 0, "span", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_1_0 = ctx_r1.perfilForm.get("nombre_completo")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.perfilForm.get("nombre_completo")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["minlength"]);
  }
}
function MiCuentaComponent_div_39_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El correo es requerido");
    \u0275\u0275elementEnd();
  }
}
function MiCuentaComponent_div_39_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Ingrese un correo v\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function MiCuentaComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, MiCuentaComponent_div_39_span_1_Template, 2, 0, "span", 48)(2, MiCuentaComponent_div_39_span_2_Template, 2, 0, "span", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_1_0 = ctx_r1.perfilForm.get("email")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.perfilForm.get("email")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["email"]);
  }
}
function MiCuentaComponent_div_50_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Ingrese un n\xFAmero de tel\xE9fono v\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function MiCuentaComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, MiCuentaComponent_div_50_span_1_Template, 2, 0, "span", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_1_0 = ctx_r1.perfilForm.get("telefono")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["pattern"]);
  }
}
function MiCuentaComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "ion-icon", 50);
    \u0275\u0275elementStart(2, "p", 51)(3, "span", 52);
    \u0275\u0275text(4, "Selecciona aqu\xED");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " para subir una nueva imagen ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 53);
    \u0275\u0275text(7, "Formatos compatibles: SVG, JPG, PNG (10MB)");
    \u0275\u0275elementEnd()();
  }
}
function MiCuentaComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275element(1, "ion-icon", 55);
    \u0275\u0275elementStart(2, "p", 51);
    \u0275\u0275text(3, "Habilita la edici\xF3n para cambiar el avatar");
    \u0275\u0275elementEnd()();
  }
}
function MiCuentaComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56)(1, "button", 57);
    \u0275\u0275listener("click", function MiCuentaComponent_div_66_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelarEdicion());
    });
    \u0275\u0275text(2, " Cancelar ");
    \u0275\u0275element(3, "ion-icon", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 59);
    \u0275\u0275element(5, "ion-icon", 60);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.isFormValid || ctx_r1.isLoading);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isLoading ? "Guardando..." : "Guardar", " ");
  }
}
var _MiCuentaComponent = class _MiCuentaComponent {
  constructor(formBuilder, usuariosService, authService) {
    this.formBuilder = formBuilder;
    this.usuariosService = usuariosService;
    this.authService = authService;
    this.usuario = null;
    this.isEditing = false;
    this.isLoading = false;
    this.subscription = new Subscription();
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
      cameraOutline
    });
    this.perfilForm = this.formBuilder.group({
      nombre_completo: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      telefono: ["", [Validators.pattern(/^\+?[0-9\s\-\(\)]+$/)]]
    });
  }
  ngOnInit() {
    this.cargarUsuarioActual();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  /**
   * Carga la información del usuario actual
   */
  cargarUsuarioActual() {
    const usuarioActual = this.authService.getCurrentUser();
    if (usuarioActual) {
      this.usuario = usuarioActual;
      this.cargarDatosEnFormulario();
    } else {
      this.obtenerUsuarioDeBD();
    }
  }
  /**
   * Obtiene el usuario desde la base de datos
   */
  obtenerUsuarioDeBD() {
    const usuarioActual = this.authService.getCurrentUser();
    if (usuarioActual == null ? void 0 : usuarioActual.id) {
      this.subscription.add(this.usuariosService.getUsuario(usuarioActual.id).subscribe({
        next: (usuario) => {
          this.usuario = usuario;
          this.cargarDatosEnFormulario();
        },
        error: (error) => {
          console.error("Error al cargar usuario:", error);
          this.mostrarMensaje("Error al cargar la informaci\xF3n del usuario", "error");
        }
      }));
    } else {
      console.error("No se pudo obtener el ID del usuario");
      this.mostrarMensaje("No se pudo identificar al usuario", "error");
    }
  }
  /**
   * Carga los datos del usuario en el formulario
   */
  cargarDatosEnFormulario() {
    if (this.usuario) {
      this.perfilForm.patchValue({
        nombre_completo: this.usuario.nombre_completo,
        email: this.usuario.email,
        telefono: this.usuario.telefono || ""
      });
    }
  }
  /**
   * Activa el modo de edición
   */
  activarEdicion() {
    this.isEditing = true;
  }
  /**
   * Cancela la edición
   */
  cancelarEdicion() {
    this.isEditing = false;
    this.cargarDatosEnFormulario();
  }
  /**
   * Guarda los cambios del perfil
   */
  guardarPerfil() {
    return __async(this, null, function* () {
      if (this.perfilForm.valid && this.usuario) {
        this.isLoading = true;
        try {
          const datosActualizados = this.perfilForm.value;
          this.subscription.add(this.usuariosService.actualizarUsuario(this.usuario.id, datosActualizados).subscribe({
            next: (usuarioActualizado) => {
              this.usuario = usuarioActualizado;
              this.isEditing = false;
              this.mostrarMensaje("Perfil actualizado correctamente", "success");
            },
            error: (error) => {
              console.error("Error al actualizar perfil:", error);
              this.mostrarMensaje("Error al actualizar el perfil", "error");
            }
          }));
        } catch (error) {
          console.error("Error al guardar perfil:", error);
          this.mostrarMensaje("Error al guardar el perfil", "error");
        } finally {
          this.isLoading = false;
        }
      }
    });
  }
  /**
   * Copia el teléfono al portapapeles
   */
  copiarTelefono() {
    var _a;
    if ((_a = this.usuario) == null ? void 0 : _a.telefono) {
      navigator.clipboard.writeText(this.usuario.telefono).then(() => {
        this.mostrarMensaje("Tel\xE9fono copiado al portapapeles", "success");
      }).catch(() => {
        this.mostrarMensaje("Error al copiar el tel\xE9fono", "error");
      });
    }
  }
  /**
   * Muestra un mensaje de notificación
   */
  mostrarMensaje(mensaje, tipo) {
    console.log(`${tipo.toUpperCase()}: ${mensaje}`);
  }
  /**
   * Obtiene el nombre del rol del usuario
   */
  getNombreRol() {
    var _a, _b;
    return ((_b = (_a = this.usuario) == null ? void 0 : _a.rol) == null ? void 0 : _b.nombre_rol) || "Usuario";
  }
  /**
   * Verifica si el formulario es válido
   */
  get isFormValid() {
    return this.perfilForm.valid && this.perfilForm.dirty;
  }
};
_MiCuentaComponent.\u0275fac = function MiCuentaComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MiCuentaComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UsuariosService), \u0275\u0275directiveInject(AuthService));
};
_MiCuentaComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MiCuentaComponent, selectors: [["app-mi-cuenta"]], decls: 69, vars: 27, consts: [[1, "profile-card"], [1, "profile-info"], [1, "avatar-container"], ["alt", "Foto de perfil", 1, "profile-avatar", 3, "src"], [1, "user-info"], [1, "user-name"], [1, "badge"], [1, "user-email"], ["class", "profile-settings-btn desktop-only", 3, "click", 4, "ngIf"], [1, "personal-info-section"], [1, "section-title-container", "desktop-only"], [1, "section-title"], [1, "section-description"], [1, "mobile-section-header"], [1, "mobile-section-title"], [1, "mobile-section-description"], [1, "form-container", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "form-group"], [1, "input-container"], ["name", "person-outline"], ["type", "text", "formControlName", "nombre_completo", "placeholder", "Ingrese su nombre completo", 3, "readonly"], ["class", "error-message", 4, "ngIf"], ["name", "mail-outline"], ["type", "email", "formControlName", "email", "placeholder", "Ingrese su correo electr\xF3nico", 3, "readonly"], [1, "input-container", "phone-input"], [1, "country-select"], ["src", "assets/spain-flag.png", "alt", "Espa\xF1a", 1, "flag-icon"], ["name", "chevron-down-outline"], ["type", "tel", "formControlName", "telefono", "placeholder", "+34 XXX XXX XXX", 3, "readonly"], ["type", "button", 1, "copy-btn", 3, "click", "disabled"], ["name", "copy-outline"], ["name", "shield-outline"], ["type", "text", "readonly", "", 3, "value"], ["type", "button", 1, "info-btn"], ["name", "information-circle-outline"], [1, "form-group", "avatar-upload"], [1, "upload-container"], ["alt", "Avatar actual", 1, "current-avatar", 3, "src"], ["class", "upload-area", 4, "ngIf"], ["class", "upload-disabled", 4, "ngIf"], ["class", "action-buttons", 4, "ngIf"], ["message", "Guardando cambios...", 3, "isOpen"], ["message", "Mensaje de ejemplo", "duration", "3000", 3, "isOpen"], [1, "profile-settings-btn", "desktop-only", 3, "click"], ["name", "arrow-forward"], ["name", "close-outline"], [1, "error-message"], [4, "ngIf"], [1, "upload-area"], ["name", "cloud-upload-outline"], [1, "upload-text"], [1, "upload-link"], [1, "upload-format"], [1, "upload-disabled"], ["name", "camera-outline"], [1, "action-buttons"], ["type", "button", 1, "btn-cancel", 3, "click"], ["name", "close-outline", 2, "font-size", "18px"], ["type", "submit", 1, "btn-save", 3, "disabled"], ["name", "save", 2, "font-size", "18px"]], template: function MiCuentaComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
    \u0275\u0275element(3, "img", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4)(5, "h2", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementStart(7, "span", 6);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p", 7);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(11, MiCuentaComponent_button_11_Template, 3, 0, "button", 8)(12, MiCuentaComponent_button_12_Template, 3, 0, "button", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 9)(14, "div", 10)(15, "h3", 11);
    \u0275\u0275text(16, "Informaci\xF3n Personal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 12);
    \u0275\u0275text(18, "Puede cambiar la configuraci\xF3n de su informaci\xF3n personal aqu\xED.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 13)(20, "h3", 14);
    \u0275\u0275text(21, "Informaci\xF3n Personal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 15);
    \u0275\u0275text(23, "Configuraci\xF3n de tu informaci\xF3n personal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "form", 16);
    \u0275\u0275listener("ngSubmit", function MiCuentaComponent_Template_form_ngSubmit_24_listener() {
      return ctx.guardarPerfil();
    });
    \u0275\u0275elementStart(25, "div", 17)(26, "div", 18)(27, "label");
    \u0275\u0275text(28, "Nombre completo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 19);
    \u0275\u0275element(30, "ion-icon", 20)(31, "input", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(32, MiCuentaComponent_div_32_Template, 3, 2, "div", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 18)(34, "label");
    \u0275\u0275text(35, "Correo electr\xF3nico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 19);
    \u0275\u0275element(37, "ion-icon", 23)(38, "input", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275template(39, MiCuentaComponent_div_39_Template, 3, 2, "div", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 18)(41, "label");
    \u0275\u0275text(42, "N\xFAmero de tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 25)(44, "div", 26);
    \u0275\u0275element(45, "img", 27)(46, "ion-icon", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275element(47, "input", 29);
    \u0275\u0275elementStart(48, "button", 30);
    \u0275\u0275listener("click", function MiCuentaComponent_Template_button_click_48_listener() {
      return ctx.copiarTelefono();
    });
    \u0275\u0275element(49, "ion-icon", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(50, MiCuentaComponent_div_50_Template, 2, 1, "div", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 18)(52, "label");
    \u0275\u0275text(53, "Rol de cuenta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 19);
    \u0275\u0275element(55, "ion-icon", 32)(56, "input", 33);
    \u0275\u0275elementStart(57, "button", 34);
    \u0275\u0275element(58, "ion-icon", 35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 36)(60, "label");
    \u0275\u0275text(61, "Cambiar avatar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 37);
    \u0275\u0275element(63, "img", 38);
    \u0275\u0275template(64, MiCuentaComponent_div_64_Template, 8, 0, "div", 39)(65, MiCuentaComponent_div_65_Template, 4, 0, "div", 40);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(66, MiCuentaComponent_div_66_Template, 7, 2, "div", 41);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(67, "ion-loading", 42)(68, "ion-toast", 43);
  }
  if (rf & 2) {
    let tmp_9_0;
    let tmp_12_0;
    let tmp_16_0;
    \u0275\u0275advance(3);
    \u0275\u0275property("src", (ctx.usuario == null ? null : ctx.usuario.avatar) || "assets/default-avatar.jpg", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (ctx.usuario == null ? null : ctx.usuario.nombre_completo) || "Cargando...", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.getNombreRol());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx.usuario == null ? null : ctx.usuario.email) || "Cargando...");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isEditing);
    \u0275\u0275advance(12);
    \u0275\u0275property("formGroup", ctx.perfilForm);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("readonly", !ctx.isEditing);
    \u0275\u0275property("readonly", !ctx.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_9_0 = ctx.perfilForm.get("nombre_completo")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx.perfilForm.get("nombre_completo")) == null ? null : tmp_9_0.touched));
    \u0275\u0275advance(6);
    \u0275\u0275classProp("readonly", !ctx.isEditing);
    \u0275\u0275property("readonly", !ctx.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_12_0 = ctx.perfilForm.get("email")) == null ? null : tmp_12_0.invalid) && ((tmp_12_0 = ctx.perfilForm.get("email")) == null ? null : tmp_12_0.touched));
    \u0275\u0275advance(8);
    \u0275\u0275classProp("readonly", !ctx.isEditing);
    \u0275\u0275property("readonly", !ctx.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !(ctx.usuario == null ? null : ctx.usuario.telefono));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ((tmp_16_0 = ctx.perfilForm.get("telefono")) == null ? null : tmp_16_0.invalid) && ((tmp_16_0 = ctx.perfilForm.get("telefono")) == null ? null : tmp_16_0.touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx.getNombreRol());
    \u0275\u0275advance(7);
    \u0275\u0275property("src", (ctx.usuario == null ? null : ctx.usuario.avatar) || "assets/default-avatar.jpg", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("isOpen", ctx.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("isOpen", false);
  }
}, dependencies: [
  IonIcon,
  CommonModule,
  NgIf,
  ReactiveFormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  FormGroupDirective,
  FormControlName,
  IonToast,
  IonLoading
], styles: ['@charset "UTF-8";\n\n\n\n.header-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0px 2rem;\n  color: white;\n  gap: 2rem;\n  padding-top: 20px;\n  margin-bottom: 2rem;\n}\n.header-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 500;\n  color: #26262A;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n}\n.btn-map[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: white;\n  color: black;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  border: 1px solid rgba(125, 131, 152, 0.2431372549);\n  text-wrap: nowrap;\n}\n.btn-add[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  text-wrap: nowrap;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin-bottom: 0px;\n  margin-top: 0px;\n}\n.header-left[_ngcontent-%COMP%]   .header-subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748b;\n}\n.profile-card[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 35px;\n  display: flex;\n  justify-content: space-between;\n  align-items: end;\n  margin: 2rem;\n  border-radius: 18px;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n}\n.profile-card[_ngcontent-%COMP%]   .profile-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.profile-card[_ngcontent-%COMP%]   .profile-info[_ngcontent-%COMP%]   .avatar-container[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n.profile-card[_ngcontent-%COMP%]   .profile-info[_ngcontent-%COMP%]   .avatar-container[_ngcontent-%COMP%]   .profile-avatar[_ngcontent-%COMP%] {\n  width: 128px;\n  height: 128px;\n  border-radius: 50%;\n  object-fit: cover;\n  background-color: #4F46E5;\n}\n.profile-card[_ngcontent-%COMP%]   .profile-info[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 500;\n  margin-bottom: 0.25rem;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  color: #26262A;\n}\n.profile-card[_ngcontent-%COMP%]   .profile-info[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  background: #e8eaf6;\n  color: #4F46E5;\n  border: 1px solid #4F46E5;\n  padding: 7px 12px;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.profile-card[_ngcontent-%COMP%]   .profile-info[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]   .user-email[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.875rem;\n  margin: 0px;\n}\n.profile-card[_ngcontent-%COMP%]   .profile-settings-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  text-wrap: nowrap;\n}\n.profile-card[_ngcontent-%COMP%]   .profile-settings-btn[_ngcontent-%COMP%]:hover {\n  background: #303f9f;\n}\n.profile-card[_ngcontent-%COMP%]   .profile-settings-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n}\n.mobile-profile-card[_ngcontent-%COMP%] {\n  display: none;\n  background: #fff;\n  margin: 16px;\n  border-radius: 16px;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n  overflow: hidden;\n}\n.mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n}\n.mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-avatar-container[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  margin-bottom: 16px;\n}\n.mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-avatar-container[_ngcontent-%COMP%]   .mobile-profile-avatar[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  object-fit: cover;\n  background-color: #4F46E5;\n  border: 3px solid #fff;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-avatar-container[_ngcontent-%COMP%]   .mobile-edit-avatar[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: #4F46E5;\n  border: 2px solid #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-avatar-container[_ngcontent-%COMP%]   .mobile-edit-avatar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 14px;\n}\n.mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-avatar-container[_ngcontent-%COMP%]   .mobile-edit-avatar[_ngcontent-%COMP%]:hover {\n  background: #4338CA;\n}\n.mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-user-info[_ngcontent-%COMP%]   .mobile-user-name[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #26262A;\n  margin: 0 0 8px 0;\n}\n.mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-user-info[_ngcontent-%COMP%]   .mobile-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: #e8eaf6;\n  color: #4F46E5;\n  border: 1px solid #4F46E5;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  margin-bottom: 8px;\n}\n.mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-user-info[_ngcontent-%COMP%]   .mobile-user-email[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.875rem;\n  margin: 0;\n}\n.mobile-section-header[_ngcontent-%COMP%] {\n  display: none;\n  padding: 16px;\n  background: #fff;\n  margin: 16px;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n}\n.mobile-section-header[_ngcontent-%COMP%]   .mobile-section-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #26262A;\n  margin: 0 0 4px 0;\n}\n.mobile-section-header[_ngcontent-%COMP%]   .mobile-section-description[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #64748b;\n  margin: 0;\n}\n.personal-info-section[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n  display: flex;\n  flex-direction: row;\n  border-radius: 1rem;\n  padding: 2rem;\n  gap: 2rem;\n}\n.personal-info-section[_ngcontent-%COMP%]   .section-title-container[_ngcontent-%COMP%] {\n  width: 20%;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.personal-info-section[_ngcontent-%COMP%]   .section-title-container[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  color: #26262A;\n  margin: 0px;\n}\n.personal-info-section[_ngcontent-%COMP%]   .section-title-container[_ngcontent-%COMP%]   .section-description[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0px;\n  color: #64748b;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {\n  width: 80%;\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  background: #fff;\n  border-radius: 18px;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n  padding: 2rem;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-grid[_ngcontent-%COMP%] {\n  width: 100%;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 2rem;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.875rem;\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n  color: #1a1a1a;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  border: 1px solid #e0e0e0;\n  border-radius: 0.5rem;\n  padding: 0.75rem;\n  gap: 0.75rem;\n  background: #f8f9fa;\n  transition: all 0.2s ease;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]:focus-within {\n  border-color: #4F46E5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container.readonly[_ngcontent-%COMP%] {\n  background: #f1f3f4;\n  cursor: default;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 1.25rem;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  font-size: 0.875rem;\n  color: #1a1a1a;\n  outline: none;\n  transition: all 0.2s ease;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:read-only {\n  cursor: default;\n  color: #666;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  color: #1a1a1a;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #999;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container.phone-input[_ngcontent-%COMP%]   .country-select[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding-right: 0.75rem;\n  border-right: 1px solid #e0e0e0;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container.phone-input[_ngcontent-%COMP%]   .country-select[_ngcontent-%COMP%]   .flag-icon[_ngcontent-%COMP%] {\n  width: 1.5rem;\n  height: 1rem;\n  object-fit: cover;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container.phone-input[_ngcontent-%COMP%]   .copy-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #666;\n  cursor: pointer;\n  padding: 0.25rem;\n  transition: color 0.2s ease;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container.phone-input[_ngcontent-%COMP%]   .copy-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #4F46E5;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container.phone-input[_ngcontent-%COMP%]   .copy-btn[_ngcontent-%COMP%]:disabled {\n  color: #ccc;\n  cursor: not-allowed;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   .info-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #666;\n  cursor: pointer;\n  padding: 0.25rem;\n  transition: color 0.2s ease;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   .info-btn[_ngcontent-%COMP%]:hover {\n  color: #4F46E5;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  color: #dc3545;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 0.875rem;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2rem;\n  align-items: center;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .current-avatar[_ngcontent-%COMP%] {\n  width: 5rem;\n  height: 5rem;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 3px solid #e0e0e0;\n  transition: border-color 0.2s ease;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-area[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 2px dashed #e0e0e0;\n  border-radius: 0.5rem;\n  padding: 2rem;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  background: #f8f9fa;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-area[_ngcontent-%COMP%]:hover {\n  border-color: #4F46E5;\n  background: #f0f4ff;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-area[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #4F46E5;\n  margin-bottom: 1rem;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-area[_ngcontent-%COMP%]   .upload-text[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n  color: #1a1a1a;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-area[_ngcontent-%COMP%]   .upload-text[_ngcontent-%COMP%]   .upload-link[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  text-decoration: underline;\n  font-weight: 500;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-area[_ngcontent-%COMP%]   .upload-format[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #666;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-disabled[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 2px dashed #e0e0e0;\n  border-radius: 0.5rem;\n  padding: 2rem;\n  text-align: center;\n  background: #f8f9fa;\n  opacity: 0.7;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-disabled[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #999;\n  margin-bottom: 1rem;\n}\n.personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-disabled[_ngcontent-%COMP%]   .upload-text[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.875rem;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  margin-top: 2rem;\n  padding-top: 2rem;\n  border-top: 1px solid #e0e0e0;\n}\n.action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border-radius: 0.5rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 1px solid #e0e0e0;\n  color: #666;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  text-wrap: nowrap;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  text-wrap: nowrap;\n  transition: all 0.2s ease;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #303f9f;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]:disabled {\n  background: #ccc;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n@media (max-width: 768px) {\n  .desktop-only[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .profile-card[_ngcontent-%COMP%] {\n    margin: 15px;\n  }\n  .mobile-profile-card[_ngcontent-%COMP%], \n   .mobile-section-header[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .personal-info-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding: 0;\n    gap: 0;\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {\n    width: 100%;\n    margin: 0 16px 16px 16px;\n    border-radius: 12px;\n    padding: 20px;\n    box-sizing: border-box;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%] {\n    width: 100%;\n    box-sizing: border-box;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    width: 100%;\n    box-sizing: border-box;\n    min-width: 0;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container.phone-input[_ngcontent-%COMP%]   .country-select[_ngcontent-%COMP%] {\n    flex-shrink: 0;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%] {\n    grid-column: span 1;\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    text-align: center;\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .current-avatar[_ngcontent-%COMP%] {\n    width: 4rem;\n    height: 4rem;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-area[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-area[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    margin-bottom: 0.75rem;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-area[_ngcontent-%COMP%]   .upload-text[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n    word-wrap: break-word;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .avatar-upload[_ngcontent-%COMP%]   .upload-container[_ngcontent-%COMP%]   .upload-area[_ngcontent-%COMP%]   .upload-format[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    word-wrap: break-word;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.75rem;\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    padding: 12px;\n    font-size: 16px;\n    box-sizing: border-box;\n  }\n}\n@media (max-width: 480px) {\n  .mobile-profile-card[_ngcontent-%COMP%] {\n    margin: 12px;\n    width: calc(100% - 24px);\n    box-sizing: border-box;\n  }\n  .mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%] {\n    padding: 20px;\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-avatar-container[_ngcontent-%COMP%]   .mobile-profile-avatar[_ngcontent-%COMP%] {\n    width: 70px;\n    height: 70px;\n  }\n  .mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-avatar-container[_ngcontent-%COMP%]   .mobile-edit-avatar[_ngcontent-%COMP%] {\n    width: 24px;\n    height: 24px;\n  }\n  .mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-avatar-container[_ngcontent-%COMP%]   .mobile-edit-avatar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-user-info[_ngcontent-%COMP%]   .mobile-user-name[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n    word-wrap: break-word;\n  }\n  .mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-user-info[_ngcontent-%COMP%]   .mobile-badge[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n    padding: 3px 10px;\n  }\n  .mobile-profile-card[_ngcontent-%COMP%]   .mobile-avatar-section[_ngcontent-%COMP%]   .mobile-user-info[_ngcontent-%COMP%]   .mobile-user-email[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n    word-wrap: break-word;\n  }\n  .mobile-section-header[_ngcontent-%COMP%] {\n    margin: 12px;\n    padding: 16px;\n    width: calc(100% - 24px);\n    box-sizing: border-box;\n  }\n  .mobile-section-header[_ngcontent-%COMP%]   .mobile-section-title[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    word-wrap: break-word;\n  }\n  .mobile-section-header[_ngcontent-%COMP%]   .mobile-section-description[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n    word-wrap: break-word;\n  }\n  .personal-info-section[_ngcontent-%COMP%] {\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {\n    margin: 0 12px 12px 12px;\n    padding: 16px;\n    width: calc(100% - 24px);\n    box-sizing: border-box;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-grid[_ngcontent-%COMP%] {\n    gap: 1.25rem;\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n    word-wrap: break-word;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%] {\n    padding: 0.625rem;\n    width: 100%;\n    box-sizing: border-box;\n    overflow: hidden;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n    flex-shrink: 0;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n    width: 100%;\n    box-sizing: border-box;\n    min-width: 0;\n  }\n  .personal-info-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-container.phone-input[_ngcontent-%COMP%]   .country-select[_ngcontent-%COMP%] {\n    flex-shrink: 0;\n  }\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #dc3545;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.error-message[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 0.875rem;\n}\n.input-container.readonly[_ngcontent-%COMP%] {\n  background: #f1f3f4;\n  cursor: default;\n}\n.input-container[_ngcontent-%COMP%]:focus-within {\n  border-color: #4F46E5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:read-only {\n  cursor: default;\n  color: #666;\n}\n.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  color: #1a1a1a;\n}\n.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #999;\n}\n.upload-disabled[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 2px dashed #e0e0e0;\n  border-radius: 0.5rem;\n  padding: 2rem;\n  text-align: center;\n  background: #f8f9fa;\n  opacity: 0.7;\n}\n.upload-disabled[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #999;\n  margin-bottom: 1rem;\n}\n.upload-disabled[_ngcontent-%COMP%]   .upload-text[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.875rem;\n}\n.btn-save[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #303f9f;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);\n}\n.btn-save[_ngcontent-%COMP%]:disabled {\n  background: #ccc;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.copy-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #4F46E5;\n}\n.copy-btn[_ngcontent-%COMP%]:disabled {\n  color: #ccc;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=mi-cuenta.component.css.map */'] });
var MiCuentaComponent = _MiCuentaComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MiCuentaComponent, [{
    type: Component,
    args: [{ selector: "app-mi-cuenta", standalone: true, imports: [
      IonIcon,
      CommonModule,
      ReactiveFormsModule,
      IonButton,
      IonInput,
      IonLabel,
      IonItem,
      IonAvatar,
      IonBadge,
      IonTextarea,
      IonSelect,
      IonSelectOption,
      IonToast,
      IonLoading
    ], template: `<!-- Tarjeta de perfil -->\r
<div class="profile-card">  \r
  <div class="profile-info">\r
    <div class="avatar-container">\r
      <img [src]="usuario?.avatar || 'assets/default-avatar.jpg'" alt="Foto de perfil" class="profile-avatar">\r
    </div>\r
    <div class="user-info">\r
      <h2 class="user-name">\r
        {{ usuario?.nombre_completo || 'Cargando...' }} \r
        <span class="badge">{{ getNombreRol() }}</span>\r
      </h2>\r
      <p class="user-email">{{ usuario?.email || 'Cargando...' }}</p>\r
    </div>\r
  </div>\r
  <button class="profile-settings-btn desktop-only" (click)="activarEdicion()" *ngIf="!isEditing">\r
    Ajustes de Perfil\r
    <ion-icon name="arrow-forward"></ion-icon>\r
  </button>\r
  <button class="profile-settings-btn desktop-only" (click)="cancelarEdicion()" *ngIf="isEditing">\r
    Cancelar\r
    <ion-icon name="close-outline"></ion-icon>\r
  </button>\r
</div>\r
\r
<!-- Informaci\xF3n Personal -->\r
<div class="personal-info-section">\r
  <div class="section-title-container desktop-only">\r
    <h3 class="section-title">Informaci\xF3n Personal</h3>\r
    <p class="section-description">Puede cambiar la configuraci\xF3n de su informaci\xF3n personal aqu\xED.</p>\r
  </div>\r
\r
  <!-- Mobile Section Header -->\r
  <div class="mobile-section-header">\r
    <h3 class="mobile-section-title">Informaci\xF3n Personal</h3>\r
    <p class="mobile-section-description">Configuraci\xF3n de tu informaci\xF3n personal</p>\r
  </div>\r
\r
  <form [formGroup]="perfilForm" (ngSubmit)="guardarPerfil()" class="form-container">\r
    <div class="form-grid">\r
      <!-- Nombre completo -->\r
      <div class="form-group">\r
        <label>Nombre completo</label>\r
        <div class="input-container">\r
          <ion-icon name="person-outline"></ion-icon>\r
          <input \r
            type="text" \r
            formControlName="nombre_completo"\r
            [readonly]="!isEditing"\r
            [class.readonly]="!isEditing"\r
            placeholder="Ingrese su nombre completo">\r
        </div>\r
        <div class="error-message" *ngIf="perfilForm.get('nombre_completo')?.invalid && perfilForm.get('nombre_completo')?.touched">\r
          <span *ngIf="perfilForm.get('nombre_completo')?.errors?.['required']">El nombre es requerido</span>\r
          <span *ngIf="perfilForm.get('nombre_completo')?.errors?.['minlength']">El nombre debe tener al menos 2 caracteres</span>\r
        </div>\r
      </div>\r
  \r
      <!-- Correo electr\xF3nico -->\r
      <div class="form-group">\r
        <label>Correo electr\xF3nico</label>\r
        <div class="input-container">\r
          <ion-icon name="mail-outline"></ion-icon>\r
          <input \r
            type="email" \r
            formControlName="email"\r
            [readonly]="!isEditing"\r
            [class.readonly]="!isEditing"\r
            placeholder="Ingrese su correo electr\xF3nico">\r
        </div>\r
        <div class="error-message" *ngIf="perfilForm.get('email')?.invalid && perfilForm.get('email')?.touched">\r
          <span *ngIf="perfilForm.get('email')?.errors?.['required']">El correo es requerido</span>\r
          <span *ngIf="perfilForm.get('email')?.errors?.['email']">Ingrese un correo v\xE1lido</span>\r
        </div>\r
      </div>\r
  \r
      <!-- N\xFAmero de tel\xE9fono -->\r
      <div class="form-group">\r
        <label>N\xFAmero de tel\xE9fono</label>\r
        <div class="input-container phone-input">\r
          <div class="country-select">\r
            <img src="assets/spain-flag.png" alt="Espa\xF1a" class="flag-icon">\r
            <ion-icon name="chevron-down-outline"></ion-icon>\r
          </div>\r
          <input \r
            type="tel" \r
            formControlName="telefono"\r
            [readonly]="!isEditing"\r
            [class.readonly]="!isEditing"\r
            placeholder="+34 XXX XXX XXX">\r
          <button \r
            type="button"\r
            class="copy-btn" \r
            (click)="copiarTelefono()"\r
            [disabled]="!usuario?.telefono">\r
            <ion-icon name="copy-outline"></ion-icon>\r
          </button>\r
        </div>\r
        <div class="error-message" *ngIf="perfilForm.get('telefono')?.invalid && perfilForm.get('telefono')?.touched">\r
          <span *ngIf="perfilForm.get('telefono')?.errors?.['pattern']">Ingrese un n\xFAmero de tel\xE9fono v\xE1lido</span>\r
        </div>\r
      </div>\r
  \r
      <!-- Rol de cuenta -->\r
      <div class="form-group">\r
        <label>Rol de cuenta</label>\r
        <div class="input-container">\r
          <ion-icon name="shield-outline"></ion-icon>\r
          <input type="text" [value]="getNombreRol()" readonly>\r
          <button type="button" class="info-btn">\r
            <ion-icon name="information-circle-outline"></ion-icon>\r
          </button>\r
        </div>\r
      </div>\r
  \r
      <!-- Cambiar avatar -->\r
      <div class="form-group avatar-upload">\r
        <label>Cambiar avatar</label>\r
        <div class="upload-container">\r
          <img [src]="usuario?.avatar || 'assets/default-avatar.jpg'" alt="Avatar actual" class="current-avatar">\r
          <div class="upload-area" *ngIf="isEditing">\r
            <ion-icon name="cloud-upload-outline"></ion-icon>\r
            <p class="upload-text">\r
              <span class="upload-link">Selecciona aqu\xED</span> para subir una nueva imagen\r
            </p>\r
            <p class="upload-format">Formatos compatibles: SVG, JPG, PNG (10MB)</p>\r
          </div>\r
          <div class="upload-disabled" *ngIf="!isEditing">\r
            <ion-icon name="camera-outline"></ion-icon>\r
            <p class="upload-text">Habilita la edici\xF3n para cambiar el avatar</p>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  \r
    <!-- Botones de acci\xF3n -->\r
    <div class="action-buttons" *ngIf="isEditing">\r
      <button type="button" class="btn-cancel" (click)="cancelarEdicion()">\r
        Cancelar\r
        <ion-icon name="close-outline" style="font-size: 18px;"></ion-icon>\r
      </button>\r
      <button \r
        type="submit" \r
        class="btn-save" \r
        [disabled]="!isFormValid || isLoading">\r
        <ion-icon name="save" style="font-size: 18px;"></ion-icon>\r
        {{ isLoading ? 'Guardando...' : 'Guardar' }}\r
      </button>\r
    </div>\r
  </form>\r
</div>\r
\r
<!-- Loading indicator -->\r
<ion-loading [isOpen]="isLoading" message="Guardando cambios..."></ion-loading>\r
\r
<!-- Toast notifications -->\r
<ion-toast \r
  [isOpen]="false" \r
  message="Mensaje de ejemplo" \r
  duration="3000">\r
</ion-toast>`, styles: ['@charset "UTF-8";\n\n/* src/app/modules/mi-cuenta/pages/mi-cuenta/mi-cuenta.component.scss */\n.header-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0px 2rem;\n  color: white;\n  gap: 2rem;\n  padding-top: 20px;\n  margin-bottom: 2rem;\n}\n.header-title {\n  font-size: 1.5rem;\n  font-weight: 500;\n  color: #26262A;\n}\n.header-actions {\n  display: flex;\n  gap: 1rem;\n}\n.btn-map {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: white;\n  color: black;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  border: 1px solid rgba(125, 131, 152, 0.2431372549);\n  text-wrap: nowrap;\n}\n.btn-add {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  text-wrap: nowrap;\n}\n.header-left {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.header-left h1 {\n  margin-bottom: 0px;\n  margin-top: 0px;\n}\n.header-left .header-subtitle {\n  font-size: 14px;\n  color: #64748b;\n}\n.profile-card {\n  background: #fff;\n  padding: 35px;\n  display: flex;\n  justify-content: space-between;\n  align-items: end;\n  margin: 2rem;\n  border-radius: 18px;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n}\n.profile-card .profile-info {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.profile-card .profile-info .avatar-container {\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n.profile-card .profile-info .avatar-container .profile-avatar {\n  width: 128px;\n  height: 128px;\n  border-radius: 50%;\n  object-fit: cover;\n  background-color: #4F46E5;\n}\n.profile-card .profile-info .user-info .user-name {\n  font-size: 1.5rem;\n  font-weight: 500;\n  margin-bottom: 0.25rem;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  color: #26262A;\n}\n.profile-card .profile-info .user-info .user-name .badge {\n  background: #e8eaf6;\n  color: #4F46E5;\n  border: 1px solid #4F46E5;\n  padding: 7px 12px;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.profile-card .profile-info .user-info .user-email {\n  color: #666;\n  font-size: 0.875rem;\n  margin: 0px;\n}\n.profile-card .profile-settings-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  text-wrap: nowrap;\n}\n.profile-card .profile-settings-btn:hover {\n  background: #303f9f;\n}\n.profile-card .profile-settings-btn ion-icon {\n  font-size: 1.25rem;\n}\n.mobile-profile-card {\n  display: none;\n  background: #fff;\n  margin: 16px;\n  border-radius: 16px;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n  overflow: hidden;\n}\n.mobile-profile-card .mobile-avatar-section {\n  padding: 24px;\n  text-align: center;\n}\n.mobile-profile-card .mobile-avatar-section .mobile-avatar-container {\n  position: relative;\n  display: inline-block;\n  margin-bottom: 16px;\n}\n.mobile-profile-card .mobile-avatar-section .mobile-avatar-container .mobile-profile-avatar {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  object-fit: cover;\n  background-color: #4F46E5;\n  border: 3px solid #fff;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.mobile-profile-card .mobile-avatar-section .mobile-avatar-container .mobile-edit-avatar {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: #4F46E5;\n  border: 2px solid #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.mobile-profile-card .mobile-avatar-section .mobile-avatar-container .mobile-edit-avatar ion-icon {\n  color: white;\n  font-size: 14px;\n}\n.mobile-profile-card .mobile-avatar-section .mobile-avatar-container .mobile-edit-avatar:hover {\n  background: #4338CA;\n}\n.mobile-profile-card .mobile-avatar-section .mobile-user-info .mobile-user-name {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #26262A;\n  margin: 0 0 8px 0;\n}\n.mobile-profile-card .mobile-avatar-section .mobile-user-info .mobile-badge {\n  display: inline-block;\n  background: #e8eaf6;\n  color: #4F46E5;\n  border: 1px solid #4F46E5;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  margin-bottom: 8px;\n}\n.mobile-profile-card .mobile-avatar-section .mobile-user-info .mobile-user-email {\n  color: #64748b;\n  font-size: 0.875rem;\n  margin: 0;\n}\n.mobile-section-header {\n  display: none;\n  padding: 16px;\n  background: #fff;\n  margin: 16px;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n}\n.mobile-section-header .mobile-section-title {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #26262A;\n  margin: 0 0 4px 0;\n}\n.mobile-section-header .mobile-section-description {\n  font-size: 0.875rem;\n  color: #64748b;\n  margin: 0;\n}\n.personal-info-section {\n  width: 100%;\n  height: auto;\n  display: flex;\n  flex-direction: row;\n  border-radius: 1rem;\n  padding: 2rem;\n  gap: 2rem;\n}\n.personal-info-section .section-title-container {\n  width: 20%;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.personal-info-section .section-title-container .section-title {\n  font-size: 16px;\n  font-weight: 500;\n  color: #26262A;\n  margin: 0px;\n}\n.personal-info-section .section-title-container .section-description {\n  font-size: 14px;\n  margin: 0px;\n  color: #64748b;\n}\n.personal-info-section .form-container {\n  width: 80%;\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  background: #fff;\n  border-radius: 18px;\n  box-shadow: 0 2px 8px 0 rgba(224, 231, 239, 0.2);\n  padding: 2rem;\n}\n.personal-info-section .form-grid {\n  width: 100%;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 2rem;\n}\n.personal-info-section .form-group label {\n  display: block;\n  font-size: 0.875rem;\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n  color: #1a1a1a;\n}\n.personal-info-section .form-group .input-container {\n  display: flex;\n  align-items: center;\n  border: 1px solid #e0e0e0;\n  border-radius: 0.5rem;\n  padding: 0.75rem;\n  gap: 0.75rem;\n  background: #f8f9fa;\n  transition: all 0.2s ease;\n}\n.personal-info-section .form-group .input-container:focus-within {\n  border-color: #4F46E5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.personal-info-section .form-group .input-container.readonly {\n  background: #f1f3f4;\n  cursor: default;\n}\n.personal-info-section .form-group .input-container ion-icon {\n  color: #666;\n  font-size: 1.25rem;\n}\n.personal-info-section .form-group .input-container input {\n  flex: 1;\n  border: none;\n  background: transparent;\n  font-size: 0.875rem;\n  color: #1a1a1a;\n  outline: none;\n  transition: all 0.2s ease;\n}\n.personal-info-section .form-group .input-container input:read-only {\n  cursor: default;\n  color: #666;\n}\n.personal-info-section .form-group .input-container input:focus {\n  color: #1a1a1a;\n}\n.personal-info-section .form-group .input-container input::placeholder {\n  color: #999;\n}\n.personal-info-section .form-group .input-container.phone-input .country-select {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding-right: 0.75rem;\n  border-right: 1px solid #e0e0e0;\n}\n.personal-info-section .form-group .input-container.phone-input .country-select .flag-icon {\n  width: 1.5rem;\n  height: 1rem;\n  object-fit: cover;\n}\n.personal-info-section .form-group .input-container.phone-input .copy-btn {\n  background: none;\n  border: none;\n  color: #666;\n  cursor: pointer;\n  padding: 0.25rem;\n  transition: color 0.2s ease;\n}\n.personal-info-section .form-group .input-container.phone-input .copy-btn:hover:not(:disabled) {\n  color: #4F46E5;\n}\n.personal-info-section .form-group .input-container.phone-input .copy-btn:disabled {\n  color: #ccc;\n  cursor: not-allowed;\n}\n.personal-info-section .form-group .input-container .info-btn {\n  background: none;\n  border: none;\n  color: #666;\n  cursor: pointer;\n  padding: 0.25rem;\n  transition: color 0.2s ease;\n}\n.personal-info-section .form-group .input-container .info-btn:hover {\n  color: #4F46E5;\n}\n.personal-info-section .form-group .error-message {\n  color: #dc3545;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.personal-info-section .form-group .error-message::before {\n  content: "\\26a0";\n  font-size: 0.875rem;\n}\n.personal-info-section .avatar-upload {\n  grid-column: span 2;\n}\n.personal-info-section .avatar-upload .upload-container {\n  display: flex;\n  gap: 2rem;\n  align-items: center;\n}\n.personal-info-section .avatar-upload .upload-container .current-avatar {\n  width: 5rem;\n  height: 5rem;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 3px solid #e0e0e0;\n  transition: border-color 0.2s ease;\n}\n.personal-info-section .avatar-upload .upload-container .upload-area {\n  flex: 1;\n  border: 2px dashed #e0e0e0;\n  border-radius: 0.5rem;\n  padding: 2rem;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  background: #f8f9fa;\n}\n.personal-info-section .avatar-upload .upload-container .upload-area:hover {\n  border-color: #4F46E5;\n  background: #f0f4ff;\n}\n.personal-info-section .avatar-upload .upload-container .upload-area ion-icon {\n  font-size: 2rem;\n  color: #4F46E5;\n  margin-bottom: 1rem;\n}\n.personal-info-section .avatar-upload .upload-container .upload-area .upload-text {\n  margin-bottom: 0.5rem;\n  color: #1a1a1a;\n}\n.personal-info-section .avatar-upload .upload-container .upload-area .upload-text .upload-link {\n  color: #4F46E5;\n  text-decoration: underline;\n  font-weight: 500;\n}\n.personal-info-section .avatar-upload .upload-container .upload-area .upload-format {\n  font-size: 0.75rem;\n  color: #666;\n}\n.personal-info-section .avatar-upload .upload-container .upload-disabled {\n  flex: 1;\n  border: 2px dashed #e0e0e0;\n  border-radius: 0.5rem;\n  padding: 2rem;\n  text-align: center;\n  background: #f8f9fa;\n  opacity: 0.7;\n}\n.personal-info-section .avatar-upload .upload-container .upload-disabled ion-icon {\n  font-size: 2rem;\n  color: #999;\n  margin-bottom: 1rem;\n}\n.personal-info-section .avatar-upload .upload-container .upload-disabled .upload-text {\n  color: #666;\n  font-size: 0.875rem;\n}\n.action-buttons {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  margin-top: 2rem;\n  padding-top: 2rem;\n  border-top: 1px solid #e0e0e0;\n}\n.action-buttons button {\n  padding: 0.75rem 1.5rem;\n  border-radius: 0.5rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.action-buttons .btn-cancel {\n  background: #f8f9fa;\n  border: 1px solid #e0e0e0;\n  color: #666;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  text-wrap: nowrap;\n}\n.action-buttons .btn-cancel:hover {\n  background: #e9ecef;\n}\n.action-buttons .btn-save {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 10px 15px;\n  background-color: #4F46E5;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  text-wrap: nowrap;\n  transition: all 0.2s ease;\n}\n.action-buttons .btn-save:hover:not(:disabled) {\n  background: #303f9f;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);\n}\n.action-buttons .btn-save:disabled {\n  background: #ccc;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n@media (max-width: 768px) {\n  .desktop-only {\n    display: none !important;\n  }\n  .profile-card {\n    margin: 15px;\n  }\n  .mobile-profile-card,\n  .mobile-section-header {\n    display: block;\n  }\n  .personal-info-section {\n    flex-direction: column;\n    padding: 0;\n    gap: 0;\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section .form-container {\n    width: 100%;\n    margin: 0 16px 16px 16px;\n    border-radius: 12px;\n    padding: 20px;\n    box-sizing: border-box;\n    overflow: hidden;\n  }\n  .personal-info-section .form-grid {\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section .form-group {\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section .form-group .input-container {\n    width: 100%;\n    box-sizing: border-box;\n    overflow: hidden;\n  }\n  .personal-info-section .form-group .input-container input {\n    width: 100%;\n    box-sizing: border-box;\n    min-width: 0;\n  }\n  .personal-info-section .form-group .input-container.phone-input .country-select {\n    flex-shrink: 0;\n  }\n  .personal-info-section .avatar-upload {\n    grid-column: span 1;\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section .avatar-upload .upload-container {\n    flex-direction: column;\n    gap: 1rem;\n    text-align: center;\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section .avatar-upload .upload-container .current-avatar {\n    width: 4rem;\n    height: 4rem;\n  }\n  .personal-info-section .avatar-upload .upload-container .upload-area {\n    padding: 1.5rem;\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .personal-info-section .avatar-upload .upload-container .upload-area ion-icon {\n    font-size: 1.5rem;\n    margin-bottom: 0.75rem;\n  }\n  .personal-info-section .avatar-upload .upload-container .upload-area .upload-text {\n    font-size: 0.875rem;\n    word-wrap: break-word;\n  }\n  .personal-info-section .avatar-upload .upload-container .upload-area .upload-format {\n    font-size: 0.75rem;\n    word-wrap: break-word;\n  }\n  .action-buttons {\n    flex-direction: column;\n    gap: 0.75rem;\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .action-buttons button {\n    width: 100%;\n    justify-content: center;\n    padding: 12px;\n    font-size: 16px;\n    box-sizing: border-box;\n  }\n}\n@media (max-width: 480px) {\n  .mobile-profile-card {\n    margin: 12px;\n    width: calc(100% - 24px);\n    box-sizing: border-box;\n  }\n  .mobile-profile-card .mobile-avatar-section {\n    padding: 20px;\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .mobile-profile-card .mobile-avatar-section .mobile-avatar-container .mobile-profile-avatar {\n    width: 70px;\n    height: 70px;\n  }\n  .mobile-profile-card .mobile-avatar-section .mobile-avatar-container .mobile-edit-avatar {\n    width: 24px;\n    height: 24px;\n  }\n  .mobile-profile-card .mobile-avatar-section .mobile-avatar-container .mobile-edit-avatar ion-icon {\n    font-size: 12px;\n  }\n  .mobile-profile-card .mobile-avatar-section .mobile-user-info .mobile-user-name {\n    font-size: 1.125rem;\n    word-wrap: break-word;\n  }\n  .mobile-profile-card .mobile-avatar-section .mobile-user-info .mobile-badge {\n    font-size: 0.7rem;\n    padding: 3px 10px;\n  }\n  .mobile-profile-card .mobile-avatar-section .mobile-user-info .mobile-user-email {\n    font-size: 0.8rem;\n    word-wrap: break-word;\n  }\n  .mobile-section-header {\n    margin: 12px;\n    padding: 16px;\n    width: calc(100% - 24px);\n    box-sizing: border-box;\n  }\n  .mobile-section-header .mobile-section-title {\n    font-size: 1rem;\n    word-wrap: break-word;\n  }\n  .mobile-section-header .mobile-section-description {\n    font-size: 0.8rem;\n    word-wrap: break-word;\n  }\n  .personal-info-section {\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section .form-container {\n    margin: 0 12px 12px 12px;\n    padding: 16px;\n    width: calc(100% - 24px);\n    box-sizing: border-box;\n    overflow: hidden;\n  }\n  .personal-info-section .form-grid {\n    gap: 1.25rem;\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section .form-group {\n    width: 100%;\n    overflow: hidden;\n  }\n  .personal-info-section .form-group label {\n    font-size: 0.8rem;\n    word-wrap: break-word;\n  }\n  .personal-info-section .form-group .input-container {\n    padding: 0.625rem;\n    width: 100%;\n    box-sizing: border-box;\n    overflow: hidden;\n  }\n  .personal-info-section .form-group .input-container ion-icon {\n    font-size: 1.125rem;\n    flex-shrink: 0;\n  }\n  .personal-info-section .form-group .input-container input {\n    font-size: 0.8rem;\n    width: 100%;\n    box-sizing: border-box;\n    min-width: 0;\n  }\n  .personal-info-section .form-group .input-container.phone-input .country-select {\n    flex-shrink: 0;\n  }\n}\n.error-message {\n  color: #dc3545;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.error-message::before {\n  content: "\\26a0";\n  font-size: 0.875rem;\n}\n.input-container.readonly {\n  background: #f1f3f4;\n  cursor: default;\n}\n.input-container:focus-within {\n  border-color: #4F46E5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.input-container input:read-only {\n  cursor: default;\n  color: #666;\n}\n.input-container input:focus {\n  color: #1a1a1a;\n}\n.input-container input::placeholder {\n  color: #999;\n}\n.upload-disabled {\n  flex: 1;\n  border: 2px dashed #e0e0e0;\n  border-radius: 0.5rem;\n  padding: 2rem;\n  text-align: center;\n  background: #f8f9fa;\n  opacity: 0.7;\n}\n.upload-disabled ion-icon {\n  font-size: 2rem;\n  color: #999;\n  margin-bottom: 1rem;\n}\n.upload-disabled .upload-text {\n  color: #666;\n  font-size: 0.875rem;\n}\n.btn-save:hover:not(:disabled) {\n  background: #303f9f;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);\n}\n.btn-save:disabled {\n  background: #ccc;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.copy-btn:hover:not(:disabled) {\n  color: #4F46E5;\n}\n.copy-btn:disabled {\n  color: #ccc;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=mi-cuenta.component.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: UsuariosService }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MiCuentaComponent, { className: "MiCuentaComponent", filePath: "src/app/modules/mi-cuenta/pages/mi-cuenta/mi-cuenta.component.ts", lineNumber: 47 });
})();
export {
  MiCuentaComponent
};
//# sourceMappingURL=mi-cuenta.component-LTWAFEY4.js.map
