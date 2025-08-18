import {
  AuthService
} from "./chunk-HVSDGWD4.js";
import {
  IonContent,
  IonIcon,
  IonSpinner,
  IonicModule
} from "./chunk-N4BFTN3Y.js";
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
  Router,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-ANYKLJQR.js";
import "./chunk-VJOUJMK4.js";
import "./chunk-H7W7X3R4.js";
import "./chunk-OXWL2QOR.js";
import "./chunk-XUM7554F.js";
import "./chunk-XZHZ3MXO.js";
import "./chunk-JESFKDT5.js";
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
import "./chunk-2HURGHOF.js";
import "./chunk-EV4ZQC67.js";
import "./chunk-7OBOYUXW.js";
import "./chunk-34HBWEZ3.js";
import {
  __async
} from "./chunk-KNQSF6OU.js";

// src/app/modules/auth/pages/register/register.component.ts
function RegisterComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("nombre_completo"), " ");
  }
}
function RegisterComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("email"), " ");
  }
}
function RegisterComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("telefono"), " ");
  }
}
function RegisterComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("password"), " ");
  }
}
function RegisterComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("confirmPassword"), " ");
  }
}
function RegisterComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function RegisterComponent_ion_spinner_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-spinner", 26);
  }
}
function RegisterComponent_span_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Crear Cuenta");
    \u0275\u0275elementEnd();
  }
}
var _RegisterComponent = class _RegisterComponent {
  constructor(formBuilder, authService, router) {
    this.formBuilder = formBuilder;
    this.authService = authService;
    this.router = router;
    this.isLoading = false;
    this.errorMessage = "";
    this.showPassword = false;
    this.showConfirmPassword = false;
  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.registerForm = this.formBuilder.group({
      nombre_completo: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      telefono: ["", [Validators.pattern(/^[0-9+\-\s()]+$/)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(form) {
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPassword) {
        confirmPassword.setErrors(null);
      }
      return null;
    }
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.registerForm.valid) {
        this.isLoading = true;
        this.errorMessage = "";
        const formValue = this.registerForm.value;
        const userData = {
          nombre_completo: formValue.nombre_completo,
          email: formValue.email,
          password: formValue.password,
          telefono: formValue.telefono || void 0
        };
        try {
          const response = yield this.authService.register(userData);
          console.log("Registro exitoso:", response);
          this.router.navigate(["/home"]);
        } catch (error) {
          console.error("Error en registro:", error);
          this.errorMessage = error.message || "Error al registrar usuario. Int\xE9ntalo de nuevo.";
        } finally {
          this.isLoading = false;
        }
      } else {
        this.markFormGroupTouched();
      }
    });
  }
  markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key);
      control == null ? void 0 : control.markAsTouched();
    });
  }
  getErrorMessage(fieldName) {
    const field = this.registerForm.get(fieldName);
    if ((field == null ? void 0 : field.errors) && field.touched) {
      if (field.errors["required"]) {
        return `${this.getFieldDisplayName(fieldName)} es requerido`;
      }
      if (field.errors["email"]) {
        return "El email no es v\xE1lido";
      }
      if (field.errors["minlength"]) {
        const minLength = field.errors["minlength"].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} debe tener al menos ${minLength} caracteres`;
      }
      if (field.errors["pattern"]) {
        return "El formato del tel\xE9fono no es v\xE1lido";
      }
      if (field.errors["passwordMismatch"]) {
        return "Las contrase\xF1as no coinciden";
      }
    }
    return "";
  }
  getFieldDisplayName(fieldName) {
    const fieldNames = {
      nombre_completo: "El nombre completo",
      email: "El email",
      telefono: "El tel\xE9fono",
      password: "La contrase\xF1a",
      confirmPassword: "La confirmaci\xF3n de contrase\xF1a"
    };
    return fieldNames[fieldName] || fieldName;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  goToLogin() {
    this.router.navigate(["/auth/login"]);
  }
};
_RegisterComponent.\u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RegisterComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
};
_RegisterComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 51, vars: 14, consts: [[1, "register-container"], [1, "register-card"], [1, "logo-container"], ["src", "assets/icon/LogoGestionAvisos.png", "alt", "Logo", 1, "logo"], [1, "app-title"], [1, "register-form", 3, "ngSubmit", "formGroup"], [1, "form-title"], [1, "form-group"], ["type", "text", "formControlName", "nombre_completo", "placeholder", "Tu nombre completo", "autocomplete", "name", 1, "form-control"], ["class", "error-message", 4, "ngIf"], ["type", "email", "formControlName", "email", "placeholder", "tu@email.com", "autocomplete", "email", 1, "form-control"], ["type", "tel", "formControlName", "telefono", "placeholder", "+34 600 000 000", "autocomplete", "tel", 1, "form-control"], [1, "input-with-button"], ["formControlName", "password", "placeholder", "M\xEDnimo 6 caracteres", "autocomplete", "new-password", 1, "form-control", 3, "type"], ["type", "button", 1, "visibility-button", 3, "click"], [3, "name"], ["formControlName", "confirmPassword", "placeholder", "Repite tu contrase\xF1a", "autocomplete", "new-password", 1, "form-control", 3, "type"], ["class", "error-message global-error", 4, "ngIf"], ["type", "submit", 1, "register-button", 3, "disabled"], [1, "button-content"], ["name", "crescent", 4, "ngIf"], [4, "ngIf"], [1, "login-link"], [1, "link", 3, "click"], [1, "error-message"], [1, "error-message", "global-error"], ["name", "crescent"]], template: function RegisterComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content")(1, "div", 0)(2, "div", 1)(3, "div", 2);
    \u0275\u0275element(4, "img", 3);
    \u0275\u0275elementStart(5, "h1", 4);
    \u0275\u0275text(6, "Gesti\xF3n de Avisos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 5);
    \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_7_listener() {
      return ctx.onSubmit();
    });
    \u0275\u0275elementStart(8, "h2", 6);
    \u0275\u0275text(9, "Crear Cuenta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 7)(11, "label");
    \u0275\u0275text(12, "Nombre Completo");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, RegisterComponent_div_14_Template, 2, 1, "div", 9);
    \u0275\u0275elementStart(15, "div", 7)(16, "label");
    \u0275\u0275text(17, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, RegisterComponent_div_19_Template, 2, 1, "div", 9);
    \u0275\u0275elementStart(20, "div", 7)(21, "label");
    \u0275\u0275text(22, "Tel\xE9fono (Opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, RegisterComponent_div_24_Template, 2, 1, "div", 9);
    \u0275\u0275elementStart(25, "div", 7)(26, "label");
    \u0275\u0275text(27, "Contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 12);
    \u0275\u0275element(29, "input", 13);
    \u0275\u0275elementStart(30, "button", 14);
    \u0275\u0275listener("click", function RegisterComponent_Template_button_click_30_listener() {
      return ctx.togglePasswordVisibility();
    });
    \u0275\u0275element(31, "ion-icon", 15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(32, RegisterComponent_div_32_Template, 2, 1, "div", 9);
    \u0275\u0275elementStart(33, "div", 7)(34, "label");
    \u0275\u0275text(35, "Confirmar Contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 12);
    \u0275\u0275element(37, "input", 16);
    \u0275\u0275elementStart(38, "button", 14);
    \u0275\u0275listener("click", function RegisterComponent_Template_button_click_38_listener() {
      return ctx.toggleConfirmPasswordVisibility();
    });
    \u0275\u0275element(39, "ion-icon", 15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(40, RegisterComponent_div_40_Template, 2, 1, "div", 9)(41, RegisterComponent_div_41_Template, 2, 1, "div", 17);
    \u0275\u0275elementStart(42, "button", 18)(43, "div", 19);
    \u0275\u0275template(44, RegisterComponent_ion_spinner_44_Template, 1, 0, "ion-spinner", 20)(45, RegisterComponent_span_45_Template, 2, 0, "span", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 22)(47, "p");
    \u0275\u0275text(48, "\xBFYa tienes cuenta? ");
    \u0275\u0275elementStart(49, "a", 23);
    \u0275\u0275listener("click", function RegisterComponent_Template_a_click_49_listener() {
      return ctx.goToLogin();
    });
    \u0275\u0275text(50, "Inicia sesi\xF3n aqu\xED");
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275property("formGroup", ctx.registerForm);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx.getErrorMessage("nombre_completo"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx.getErrorMessage("email"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx.getErrorMessage("telefono"));
    \u0275\u0275advance(5);
    \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx.showPassword ? "eye-off" : "eye");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.getErrorMessage("password"));
    \u0275\u0275advance(5);
    \u0275\u0275property("type", ctx.showConfirmPassword ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275property("name", ctx.showConfirmPassword ? "eye-off" : "eye");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.getErrorMessage("confirmPassword"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.errorMessage);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.isLoading || !ctx.registerForm.valid);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.isLoading);
  }
}, dependencies: [CommonModule, NgIf, IonicModule, IonContent, IonIcon, IonSpinner, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['\n\n.register-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: #FAFBFF;\n  padding: 20px;\n  font-family: "Inter", sans-serif;\n}\n.register-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  padding: 40px;\n  width: 100%;\n  max-width: 450px;\n  animation: _ngcontent-%COMP%_slideUp 0.4s ease-out;\n  border: 1px solid #F1F5F9;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.logo-container[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.logo[_ngcontent-%COMP%] {\n  width: 100px;\n  height: auto;\n  margin-bottom: 16px;\n}\n.app-title[_ngcontent-%COMP%] {\n  color: #26262A;\n  font-size: 24px;\n  font-weight: 600;\n  margin: 0;\n  font-family: "Poppins", sans-serif;\n}\n.form-title[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #26262A;\n  font-size: 18px;\n  font-weight: 500;\n  margin-bottom: 32px;\n  font-family: "Inter", sans-serif;\n}\n.register-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.form-group[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 0;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #26262A;\n  font-family: "Inter", sans-serif;\n}\n.form-control[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  padding: 12px 16px;\n  background-color: #FAFBFF;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  font-size: 16px;\n  color: #26262A;\n  transition: all 0.2s ease;\n  font-family: "Inter", sans-serif;\n  box-sizing: border-box;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4F46E5;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-control[_ngcontent-%COMP%]::placeholder {\n  color: #ACACAC;\n}\n.form-control[_ngcontent-%COMP%]:hover {\n  border-color: #4F46E5;\n  background: #fff;\n}\n.input-with-button[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-with-button[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  padding-right: 48px;\n}\n.input-with-button[_ngcontent-%COMP%]   .visibility-button[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 8px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n  color: #64748b;\n  border-radius: 6px;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.input-with-button[_ngcontent-%COMP%]   .visibility-button[_ngcontent-%COMP%]:hover {\n  color: #4F46E5;\n  background: rgba(79, 70, 229, 0.1);\n}\n.input-with-button[_ngcontent-%COMP%]   .visibility-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #e74c3c;\n  font-size: 13px;\n  margin-top: 6px;\n  margin-left: 4px;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in;\n  font-family: "Inter", sans-serif;\n}\n.global-error[_ngcontent-%COMP%] {\n  background: #fdf2f2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  padding: 12px 16px;\n  margin: 8px 0;\n  text-align: center;\n  font-size: 14px;\n  font-family: "Inter", sans-serif;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.register-button[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #4F46E5;\n  border: none;\n  border-radius: 12px;\n  padding: 16px;\n  font-weight: 600;\n  font-size: 16px;\n  margin-top: 8px;\n  transition: all 0.2s ease;\n  font-family: "Inter", sans-serif;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);\n  cursor: pointer;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.register-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338ca;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);\n}\n.register-button[_ngcontent-%COMP%]:disabled {\n  background: #ACACAC;\n  transform: none;\n  box-shadow: none;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.register-button[_ngcontent-%COMP%]   .button-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.login-link[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n}\n.login-link[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin: 0;\n  font-size: 14px;\n  font-family: "Inter", sans-serif;\n}\n.link[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  text-decoration: none;\n  font-weight: 600;\n  cursor: pointer;\n  transition: color 0.2s ease;\n  font-family: "Inter", sans-serif;\n}\n.link[_ngcontent-%COMP%]:hover {\n  color: #4338ca;\n  text-decoration: underline;\n}\n@media (max-width: 480px) {\n  .register-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .register-card[_ngcontent-%COMP%] {\n    padding: 32px 24px;\n    margin: 0;\n    border-radius: 12px;\n  }\n  .app-title[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .form-title[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .register-form[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n  .form-control[_ngcontent-%COMP%] {\n    padding: 10px 14px;\n    font-size: 16px;\n  }\n  .input-with-button[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n    padding-right: 44px;\n  }\n  .input-with-button[_ngcontent-%COMP%]   .visibility-button[_ngcontent-%COMP%] {\n    padding: 6px;\n  }\n  .input-with-button[_ngcontent-%COMP%]   .visibility-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .register-button[_ngcontent-%COMP%] {\n    padding: 14px;\n    font-size: 16px;\n  }\n}\n/*# sourceMappingURL=register.component.css.map */'] });
var RegisterComponent = _RegisterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterComponent, [{
    type: Component,
    args: [{ selector: "app-register", standalone: true, imports: [CommonModule, IonicModule, ReactiveFormsModule], template: `<ion-content>\r
  <div class="register-container">\r
    <div class="register-card">\r
      <!-- Logo -->\r
      <div class="logo-container">\r
        <img src="assets/icon/LogoGestionAvisos.png" alt="Logo" class="logo">\r
        <h1 class="app-title">Gesti\xF3n de Avisos</h1>\r
      </div>\r
\r
      <!-- Formulario de Registro -->\r
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">\r
        <h2 class="form-title">Crear Cuenta</h2>\r
\r
        <!-- Campo Nombre Completo -->\r
        <div class="form-group">\r
          <label>Nombre Completo</label>\r
          <input \r
            type="text" \r
            formControlName="nombre_completo"\r
            class="form-control"\r
            placeholder="Tu nombre completo"\r
            autocomplete="name">\r
        </div>\r
        <div class="error-message" *ngIf="getErrorMessage('nombre_completo')">\r
          {{ getErrorMessage('nombre_completo') }}\r
        </div>\r
\r
        <!-- Campo Email -->\r
        <div class="form-group">\r
          <label>Email</label>\r
          <input \r
            type="email" \r
            formControlName="email"\r
            class="form-control"\r
            placeholder="tu@email.com"\r
            autocomplete="email">\r
        </div>\r
        <div class="error-message" *ngIf="getErrorMessage('email')">\r
          {{ getErrorMessage('email') }}\r
        </div>\r
\r
        <!-- Campo Tel\xE9fono -->\r
        <div class="form-group">\r
          <label>Tel\xE9fono (Opcional)</label>\r
          <input \r
            type="tel" \r
            formControlName="telefono"\r
            class="form-control"\r
            placeholder="+34 600 000 000"\r
            autocomplete="tel">\r
        </div>\r
        <div class="error-message" *ngIf="getErrorMessage('telefono')">\r
          {{ getErrorMessage('telefono') }}\r
        </div>\r
\r
        <!-- Campo Contrase\xF1a -->\r
        <div class="form-group">\r
          <label>Contrase\xF1a</label>\r
          <div class="input-with-button">\r
            <input \r
              [type]="showPassword ? 'text' : 'password'" \r
              formControlName="password"\r
              class="form-control"\r
              placeholder="M\xEDnimo 6 caracteres"\r
              autocomplete="new-password">\r
            <button \r
              type="button"\r
              (click)="togglePasswordVisibility()"\r
              class="visibility-button">\r
              <ion-icon [name]="showPassword ? 'eye-off' : 'eye'"></ion-icon>\r
            </button>\r
          </div>\r
        </div>\r
        <div class="error-message" *ngIf="getErrorMessage('password')">\r
          {{ getErrorMessage('password') }}\r
        </div>\r
\r
        <!-- Campo Confirmar Contrase\xF1a -->\r
        <div class="form-group">\r
          <label>Confirmar Contrase\xF1a</label>\r
          <div class="input-with-button">\r
            <input \r
              [type]="showConfirmPassword ? 'text' : 'password'" \r
              formControlName="confirmPassword"\r
              class="form-control"\r
              placeholder="Repite tu contrase\xF1a"\r
              autocomplete="new-password">\r
            <button \r
              type="button"\r
              (click)="toggleConfirmPasswordVisibility()"\r
              class="visibility-button">\r
              <ion-icon [name]="showConfirmPassword ? 'eye-off' : 'eye'"></ion-icon>\r
            </button>\r
          </div>\r
        </div>\r
        <div class="error-message" *ngIf="getErrorMessage('confirmPassword')">\r
          {{ getErrorMessage('confirmPassword') }}\r
        </div>\r
\r
        <!-- Mensaje de Error -->\r
        <div class="error-message global-error" *ngIf="errorMessage">\r
          {{ errorMessage }}\r
        </div>\r
\r
        <!-- Bot\xF3n de Registro -->\r
        <button \r
          type="submit" \r
          class="register-button"\r
          [disabled]="isLoading || !registerForm.valid">\r
          <div class="button-content">\r
            <ion-spinner *ngIf="isLoading" name="crescent"></ion-spinner>\r
            <span *ngIf="!isLoading">Crear Cuenta</span>\r
          </div>\r
        </button>\r
\r
        <!-- Enlace a Login -->\r
        <div class="login-link">\r
          <p>\xBFYa tienes cuenta? \r
            <a (click)="goToLogin()" class="link">Inicia sesi\xF3n aqu\xED</a>\r
          </p>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
</ion-content>\r
`, styles: ['/* src/app/modules/auth/pages/register/register.component.scss */\n.register-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: #FAFBFF;\n  padding: 20px;\n  font-family: "Inter", sans-serif;\n}\n.register-card {\n  background: #fff;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  padding: 40px;\n  width: 100%;\n  max-width: 450px;\n  animation: slideUp 0.4s ease-out;\n  border: 1px solid #F1F5F9;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.logo-container {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.logo {\n  width: 100px;\n  height: auto;\n  margin-bottom: 16px;\n}\n.app-title {\n  color: #26262A;\n  font-size: 24px;\n  font-weight: 600;\n  margin: 0;\n  font-family: "Poppins", sans-serif;\n}\n.form-title {\n  text-align: center;\n  color: #26262A;\n  font-size: 18px;\n  font-weight: 500;\n  margin-bottom: 32px;\n  font-family: "Inter", sans-serif;\n}\n.register-form {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.form-group {\n  position: relative;\n  margin-bottom: 0;\n}\n.form-group label {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #26262A;\n  font-family: "Inter", sans-serif;\n}\n.form-control {\n  position: relative;\n  width: 100%;\n  padding: 12px 16px;\n  background-color: #FAFBFF;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  font-size: 16px;\n  color: #26262A;\n  transition: all 0.2s ease;\n  font-family: "Inter", sans-serif;\n  box-sizing: border-box;\n}\n.form-control:focus {\n  outline: none;\n  border-color: #4F46E5;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-control::placeholder {\n  color: #ACACAC;\n}\n.form-control:hover {\n  border-color: #4F46E5;\n  background: #fff;\n}\n.input-with-button {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-with-button .form-control {\n  padding-right: 48px;\n}\n.input-with-button .visibility-button {\n  position: absolute;\n  right: 8px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n  color: #64748b;\n  border-radius: 6px;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.input-with-button .visibility-button:hover {\n  color: #4F46E5;\n  background: rgba(79, 70, 229, 0.1);\n}\n.input-with-button .visibility-button ion-icon {\n  font-size: 18px;\n}\n.error-message {\n  color: #e74c3c;\n  font-size: 13px;\n  margin-top: 6px;\n  margin-left: 4px;\n  animation: fadeIn 0.3s ease-in;\n  font-family: "Inter", sans-serif;\n}\n.global-error {\n  background: #fdf2f2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  padding: 12px 16px;\n  margin: 8px 0;\n  text-align: center;\n  font-size: 14px;\n  font-family: "Inter", sans-serif;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.register-button {\n  width: 100%;\n  background: #4F46E5;\n  border: none;\n  border-radius: 12px;\n  padding: 16px;\n  font-weight: 600;\n  font-size: 16px;\n  margin-top: 8px;\n  transition: all 0.2s ease;\n  font-family: "Inter", sans-serif;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);\n  cursor: pointer;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.register-button:hover:not(:disabled) {\n  background: #4338ca;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);\n}\n.register-button:disabled {\n  background: #ACACAC;\n  transform: none;\n  box-shadow: none;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.register-button .button-content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.login-link {\n  text-align: center;\n  margin-top: 24px;\n}\n.login-link p {\n  color: #64748b;\n  margin: 0;\n  font-size: 14px;\n  font-family: "Inter", sans-serif;\n}\n.link {\n  color: #4F46E5;\n  text-decoration: none;\n  font-weight: 600;\n  cursor: pointer;\n  transition: color 0.2s ease;\n  font-family: "Inter", sans-serif;\n}\n.link:hover {\n  color: #4338ca;\n  text-decoration: underline;\n}\n@media (max-width: 480px) {\n  .register-container {\n    padding: 16px;\n  }\n  .register-card {\n    padding: 32px 24px;\n    margin: 0;\n    border-radius: 12px;\n  }\n  .app-title {\n    font-size: 22px;\n  }\n  .form-title {\n    font-size: 16px;\n  }\n  .register-form {\n    gap: 14px;\n  }\n  .form-control {\n    padding: 10px 14px;\n    font-size: 16px;\n  }\n  .input-with-button .form-control {\n    padding-right: 44px;\n  }\n  .input-with-button .visibility-button {\n    padding: 6px;\n  }\n  .input-with-button .visibility-button ion-icon {\n    font-size: 16px;\n  }\n  .register-button {\n    padding: 14px;\n    font-size: 16px;\n  }\n}\n/*# sourceMappingURL=register.component.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src/app/modules/auth/pages/register/register.component.ts", lineNumber: 16 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=register.component-F66U4YMZ.js.map
