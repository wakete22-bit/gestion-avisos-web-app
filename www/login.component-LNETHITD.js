import {
  AuthService
} from "./chunk-HVSDGWD4.js";
import {
  IonContent,
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

// src/app/modules/auth/pages/login/login.component.ts
function LoginComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("email"), " ");
  }
}
function LoginComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("password"), " ");
  }
}
function LoginComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function LoginComponent_ion_spinner_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-spinner", 20);
  }
}
function LoginComponent_span_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Iniciar Sesi\xF3n");
    \u0275\u0275elementEnd();
  }
}
var _LoginComponent = class _LoginComponent {
  constructor(formBuilder, authService, router) {
    this.formBuilder = formBuilder;
    this.authService = authService;
    this.router = router;
    this.isLoading = false;
    this.errorMessage = "";
  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.loginForm.valid) {
        this.isLoading = true;
        this.errorMessage = "";
        const credentials = this.loginForm.value;
        try {
          const response = yield this.authService.login(credentials);
          console.log("Login exitoso:", response);
          this.router.navigate(["/home"]);
        } catch (error) {
          console.error("Error en login:", error);
          this.errorMessage = error.message || "Error al iniciar sesi\xF3n. Int\xE9ntalo de nuevo.";
        } finally {
          this.isLoading = false;
        }
      } else {
        this.markFormGroupTouched();
      }
    });
  }
  markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control == null ? void 0 : control.markAsTouched();
    });
  }
  getErrorMessage(fieldName) {
    const field = this.loginForm.get(fieldName);
    if ((field == null ? void 0 : field.errors) && field.touched) {
      if (field.errors["required"]) {
        return `${fieldName === "email" ? "El email" : "La contrase\xF1a"} es requerido`;
      }
      if (field.errors["email"]) {
        return "El email no es v\xE1lido";
      }
      if (field.errors["minlength"]) {
        return "La contrase\xF1a debe tener al menos 6 caracteres";
      }
    }
    return "";
  }
  goToRegister() {
    this.router.navigate(["/auth/register"]);
  }
};
_LoginComponent.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
};
_LoginComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 30, vars: 7, consts: [[1, "login-container"], [1, "login-card"], [1, "logo-container"], ["src", "assets/icon/LogoGestionAvisos.png", "alt", "Logo", 1, "logo"], [1, "app-title"], [1, "login-form", 3, "ngSubmit", "formGroup"], [1, "form-title"], [1, "form-group"], ["type", "email", "formControlName", "email", "placeholder", "tu@email.com", "autocomplete", "email", 1, "form-control"], ["class", "error-message", 4, "ngIf"], ["type", "password", "formControlName", "password", "placeholder", "Tu contrase\xF1a", "autocomplete", "current-password", 1, "form-control"], ["class", "error-message global-error", 4, "ngIf"], ["type", "submit", 1, "login-button", 3, "disabled"], [1, "button-content"], ["name", "crescent", 4, "ngIf"], [4, "ngIf"], [1, "register-link"], [1, "link", 3, "click"], [1, "error-message"], [1, "error-message", "global-error"], ["name", "crescent"]], template: function LoginComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content")(1, "div", 0)(2, "div", 1)(3, "div", 2);
    \u0275\u0275element(4, "img", 3);
    \u0275\u0275elementStart(5, "h1", 4);
    \u0275\u0275text(6, "Gesti\xF3n de Avisos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 5);
    \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_7_listener() {
      return ctx.onSubmit();
    });
    \u0275\u0275elementStart(8, "h2", 6);
    \u0275\u0275text(9, "Iniciar Sesi\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 7)(11, "label");
    \u0275\u0275text(12, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, LoginComponent_div_14_Template, 2, 1, "div", 9);
    \u0275\u0275elementStart(15, "div", 7)(16, "label");
    \u0275\u0275text(17, "Contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, LoginComponent_div_19_Template, 2, 1, "div", 9)(20, LoginComponent_div_20_Template, 2, 1, "div", 11);
    \u0275\u0275elementStart(21, "button", 12)(22, "div", 13);
    \u0275\u0275template(23, LoginComponent_ion_spinner_23_Template, 1, 0, "ion-spinner", 14)(24, LoginComponent_span_24_Template, 2, 0, "span", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 16)(26, "p");
    \u0275\u0275text(27, "\xBFNo tienes cuenta? ");
    \u0275\u0275elementStart(28, "a", 17);
    \u0275\u0275listener("click", function LoginComponent_Template_a_click_28_listener() {
      return ctx.goToRegister();
    });
    \u0275\u0275text(29, "Reg\xEDstrate aqu\xED");
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275property("formGroup", ctx.loginForm);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx.getErrorMessage("email"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx.getErrorMessage("password"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.errorMessage);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.isLoading || !ctx.loginForm.valid);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.isLoading);
  }
}, dependencies: [CommonModule, NgIf, IonicModule, IonContent, IonSpinner, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['\n\n.login-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: #FAFBFF;\n  padding: 20px;\n  font-family: "Inter", sans-serif;\n}\n.login-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  padding: 40px;\n  width: 100%;\n  max-width: 400px;\n  animation: _ngcontent-%COMP%_slideUp 0.4s ease-out;\n  border: 1px solid #F1F5F9;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.logo-container[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.logo[_ngcontent-%COMP%] {\n  width: 100px;\n  height: auto;\n  margin-bottom: 16px;\n}\n.app-title[_ngcontent-%COMP%] {\n  color: #26262A;\n  font-size: 24px;\n  font-weight: 600;\n  margin: 0;\n  font-family: "Poppins", sans-serif;\n}\n.form-title[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #26262A;\n  font-size: 18px;\n  font-weight: 500;\n  margin-bottom: 32px;\n  font-family: "Inter", sans-serif;\n}\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-group[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 0;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #26262A;\n  font-family: "Inter", sans-serif;\n}\n.form-control[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  padding: 12px 16px;\n  background-color: #FAFBFF;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  font-size: 16px;\n  color: #26262A;\n  transition: all 0.2s ease;\n  font-family: "Inter", sans-serif;\n  box-sizing: border-box;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4F46E5;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-control[_ngcontent-%COMP%]::placeholder {\n  color: #ACACAC;\n}\n.form-control[_ngcontent-%COMP%]:hover {\n  border-color: #4F46E5;\n  background: #fff;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #e74c3c;\n  font-size: 13px;\n  margin-top: 6px;\n  margin-left: 4px;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in;\n  font-family: "Inter", sans-serif;\n}\n.global-error[_ngcontent-%COMP%] {\n  background: #fdf2f2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  padding: 12px 16px;\n  margin: 8px 0;\n  text-align: center;\n  font-size: 14px;\n  font-family: "Inter", sans-serif;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.login-button[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #4F46E5;\n  border: none;\n  border-radius: 12px;\n  padding: 16px;\n  font-weight: 600;\n  font-size: 16px;\n  margin-top: 8px;\n  transition: all 0.2s ease;\n  font-family: "Inter", sans-serif;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);\n  cursor: pointer;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.login-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338ca;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);\n}\n.login-button[_ngcontent-%COMP%]:disabled {\n  background: #ACACAC;\n  transform: none;\n  box-shadow: none;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.login-button[_ngcontent-%COMP%]   .button-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.register-link[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n}\n.register-link[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin: 0;\n  font-size: 14px;\n  font-family: "Inter", sans-serif;\n}\n.link[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  text-decoration: none;\n  font-weight: 600;\n  cursor: pointer;\n  transition: color 0.2s ease;\n  font-family: "Inter", sans-serif;\n}\n.link[_ngcontent-%COMP%]:hover {\n  color: #4338ca;\n  text-decoration: underline;\n}\n@media (max-width: 480px) {\n  .login-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .login-card[_ngcontent-%COMP%] {\n    padding: 32px 24px;\n    margin: 0;\n    border-radius: 12px;\n  }\n  .app-title[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .form-title[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .login-form[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n  .form-control[_ngcontent-%COMP%] {\n    padding: 10px 14px;\n    font-size: 16px;\n  }\n  .login-button[_ngcontent-%COMP%] {\n    padding: 14px;\n    font-size: 16px;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
var LoginComponent = _LoginComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, IonicModule, ReactiveFormsModule], template: `<ion-content>\r
  <div class="login-container">\r
    <div class="login-card">\r
      <!-- Logo -->\r
      <div class="logo-container">\r
        <img src="assets/icon/LogoGestionAvisos.png" alt="Logo" class="logo">\r
        <h1 class="app-title">Gesti\xF3n de Avisos</h1>\r
      </div>\r
\r
      <!-- Formulario de Login -->\r
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">\r
        <h2 class="form-title">Iniciar Sesi\xF3n</h2>\r
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
        <!-- Campo Contrase\xF1a -->\r
        <div class="form-group">\r
          <label>Contrase\xF1a</label>\r
          <input \r
            type="password" \r
            formControlName="password"\r
            class="form-control"\r
            placeholder="Tu contrase\xF1a"\r
            autocomplete="current-password">\r
        </div>\r
        <div class="error-message" *ngIf="getErrorMessage('password')">\r
          {{ getErrorMessage('password') }}\r
        </div>\r
\r
        <!-- Mensaje de Error -->\r
        <div class="error-message global-error" *ngIf="errorMessage">\r
          {{ errorMessage }}\r
        </div>\r
\r
        <!-- Bot\xF3n de Login -->\r
        <button \r
          type="submit" \r
          class="login-button"\r
          [disabled]="isLoading || !loginForm.valid">\r
          <div class="button-content">\r
            <ion-spinner *ngIf="isLoading" name="crescent"></ion-spinner>\r
            <span *ngIf="!isLoading">Iniciar Sesi\xF3n</span>\r
          </div>\r
        </button>\r
\r
        <!-- Enlace a Registro -->\r
        <div class="register-link">\r
          <p>\xBFNo tienes cuenta? \r
            <a (click)="goToRegister()" class="link">Reg\xEDstrate aqu\xED</a>\r
          </p>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
</ion-content>\r
`, styles: ['/* src/app/modules/auth/pages/login/login.component.scss */\n.login-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: #FAFBFF;\n  padding: 20px;\n  font-family: "Inter", sans-serif;\n}\n.login-card {\n  background: #fff;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  padding: 40px;\n  width: 100%;\n  max-width: 400px;\n  animation: slideUp 0.4s ease-out;\n  border: 1px solid #F1F5F9;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.logo-container {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.logo {\n  width: 100px;\n  height: auto;\n  margin-bottom: 16px;\n}\n.app-title {\n  color: #26262A;\n  font-size: 24px;\n  font-weight: 600;\n  margin: 0;\n  font-family: "Poppins", sans-serif;\n}\n.form-title {\n  text-align: center;\n  color: #26262A;\n  font-size: 18px;\n  font-weight: 500;\n  margin-bottom: 32px;\n  font-family: "Inter", sans-serif;\n}\n.login-form {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-group {\n  position: relative;\n  margin-bottom: 0;\n}\n.form-group label {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #26262A;\n  font-family: "Inter", sans-serif;\n}\n.form-control {\n  position: relative;\n  width: 100%;\n  padding: 12px 16px;\n  background-color: #FAFBFF;\n  border: 1px solid #E2E8F0;\n  border-radius: 12px;\n  font-size: 16px;\n  color: #26262A;\n  transition: all 0.2s ease;\n  font-family: "Inter", sans-serif;\n  box-sizing: border-box;\n}\n.form-control:focus {\n  outline: none;\n  border-color: #4F46E5;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-control::placeholder {\n  color: #ACACAC;\n}\n.form-control:hover {\n  border-color: #4F46E5;\n  background: #fff;\n}\n.error-message {\n  color: #e74c3c;\n  font-size: 13px;\n  margin-top: 6px;\n  margin-left: 4px;\n  animation: fadeIn 0.3s ease-in;\n  font-family: "Inter", sans-serif;\n}\n.global-error {\n  background: #fdf2f2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  padding: 12px 16px;\n  margin: 8px 0;\n  text-align: center;\n  font-size: 14px;\n  font-family: "Inter", sans-serif;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.login-button {\n  width: 100%;\n  background: #4F46E5;\n  border: none;\n  border-radius: 12px;\n  padding: 16px;\n  font-weight: 600;\n  font-size: 16px;\n  margin-top: 8px;\n  transition: all 0.2s ease;\n  font-family: "Inter", sans-serif;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);\n  cursor: pointer;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.login-button:hover:not(:disabled) {\n  background: #4338ca;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);\n}\n.login-button:disabled {\n  background: #ACACAC;\n  transform: none;\n  box-shadow: none;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.login-button .button-content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.register-link {\n  text-align: center;\n  margin-top: 24px;\n}\n.register-link p {\n  color: #64748b;\n  margin: 0;\n  font-size: 14px;\n  font-family: "Inter", sans-serif;\n}\n.link {\n  color: #4F46E5;\n  text-decoration: none;\n  font-weight: 600;\n  cursor: pointer;\n  transition: color 0.2s ease;\n  font-family: "Inter", sans-serif;\n}\n.link:hover {\n  color: #4338ca;\n  text-decoration: underline;\n}\n@media (max-width: 480px) {\n  .login-container {\n    padding: 16px;\n  }\n  .login-card {\n    padding: 32px 24px;\n    margin: 0;\n    border-radius: 12px;\n  }\n  .app-title {\n    font-size: 22px;\n  }\n  .form-title {\n    font-size: 16px;\n  }\n  .login-form {\n    gap: 16px;\n  }\n  .form-control {\n    padding: 10px 14px;\n    font-size: 16px;\n  }\n  .login-button {\n    padding: 14px;\n    font-size: 16px;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/modules/auth/pages/login/login.component.ts", lineNumber: 16 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=login.component-LNETHITD.js.map
