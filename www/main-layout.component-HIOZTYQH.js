import {
  RolesService,
  TipoRol
} from "./chunk-7DHOVE7F.js";
import {
  addIcons,
  cashOutline,
  chevronDownOutline,
  chevronForwardOutline,
  closeOutline,
  constructOutline,
  cubeOutline,
  documentTextOutline,
  gridOutline,
  logOutOutline,
  menuOutline,
  notificationsOutline,
  peopleOutline,
  personCircleOutline,
  settingsOutline,
  timeOutline
} from "./chunk-YLHOXAZF.js";
import {
  AuthService
} from "./chunk-HVSDGWD4.js";
import {
  IonIcon
} from "./chunk-DJA56OJT.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  HostListener,
  Input,
  NgIf,
  Output,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  setClassMetadata,
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
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext
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

// src/app/layout/components/sidebar/sidebar.component.ts
function SidebarComponent_a_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 29);
    \u0275\u0275listener("click", function SidebarComponent_a_27_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNavClick());
    });
    \u0275\u0275element(1, "ion-icon", 30);
    \u0275\u0275text(2, "T\xE9cnicos");
    \u0275\u0275elementEnd();
  }
}
addIcons({
  "grid-outline": gridOutline,
  "notifications-outline": notificationsOutline,
  "time-outline": timeOutline,
  "cube-outline": cubeOutline,
  "document-text-outline": documentTextOutline,
  "cash-outline": cashOutline,
  "people-outline": peopleOutline,
  "settings-outline": settingsOutline,
  "person-circle-outline": personCircleOutline,
  "chevron-forward-outline": chevronForwardOutline,
  "chevron-down-outline": chevronDownOutline,
  "close-outline": closeOutline
});
var _SidebarComponent = class _SidebarComponent {
  constructor(authService, rolesService, router) {
    this.authService = authService;
    this.rolesService = rolesService;
    this.router = router;
    this.isOpen = false;
    this.closeSidebar = new EventEmitter();
    this.currentUser = null;
    this.rolActual = null;
    this.TipoRol = TipoRol;
    this.isAdmin = false;
    addIcons({ closeOutline, gridOutline, notificationsOutline, timeOutline, cubeOutline, documentTextOutline, cashOutline, peopleOutline, constructOutline, settingsOutline, personCircleOutline, logOutOutline, chevronForwardOutline, chevronDownOutline });
  }
  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
    this.rolesService.getRolActual().subscribe((rol) => {
      this.rolActual = rol;
    });
    this.rolesService.esAdministrador().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
      console.log("\u{1F527} SidebarComponent: Rol actual:", this.rolActual);
    });
  }
  onCloseSidebar() {
    this.closeSidebar.emit();
  }
  onNavClick() {
    if (window.innerWidth <= 768) {
      this.onCloseSidebar();
    }
  }
  onLogout() {
    return __async(this, null, function* () {
      yield this.authService.logout();
      this.router.navigate(["/auth/login"]);
      this.onCloseSidebar();
    });
  }
  getRolDisplayName() {
    if (!this.rolActual)
      return "Usuario";
    const nombres = {
      [TipoRol.ADMINISTRADOR]: "Administrador",
      [TipoRol.TECNICO]: "T\xE9cnico",
      [TipoRol.USUARIO]: "Usuario"
    };
    return nombres[this.rolActual];
  }
};
_SidebarComponent.\u0275fac = function SidebarComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SidebarComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(RolesService), \u0275\u0275directiveInject(Router));
};
_SidebarComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], inputs: { isOpen: "isOpen" }, outputs: { closeSidebar: "closeSidebar" }, decls: 39, vars: 3, consts: [[1, "sidebar"], [1, "sidebar-close-btn", 3, "click"], ["name", "close-outline"], [1, "sidebar-header"], ["src", "assets/icon/LogoGestionAvisosLargo.png", "alt", "Logo", 1, "logo", 2, "width", "180px"], [1, "sidebar-menu"], ["routerLink", "/home", "routerLinkActive", "active", 3, "click"], ["name", "grid-outline", 1, "icon"], ["routerLink", "/avisos", "routerLinkActive", "active", 3, "click"], ["name", "notifications-outline", 1, "icon"], ["routerLink", "/historial", "routerLinkActive", "active", 3, "click"], ["name", "time-outline", 1, "icon"], ["routerLink", "/inventario", "routerLinkActive", "active", 3, "click"], ["name", "cube-outline", 1, "icon"], ["routerLink", "/facturas", "routerLinkActive", "active", 3, "click"], ["name", "document-text-outline", 1, "icon"], ["routerLink", "/presupuestos", "routerLinkActive", "active", 3, "click"], ["name", "cash-outline", 1, "icon"], ["routerLink", "/clientes", "routerLinkActive", "active", 3, "click"], ["name", "people-outline", 1, "icon"], ["routerLink", "/tecnicos", "routerLinkActive", "active", 3, "click", 4, "ngIf"], [1, "sidebar-footer"], ["routerLink", "/ajustes", "routerLinkActive", "active", 3, "click"], ["name", "settings-outline", 1, "icon"], ["routerLink", "/cuenta", "routerLinkActive", "active", 3, "click"], ["name", "person-circle-outline", 1, "icon"], [1, "logout-link", 3, "click"], ["name", "log-out-outline", 1, "icon"], [1, "sidebar-spacer"], ["routerLink", "/tecnicos", "routerLinkActive", "active", 3, "click"], ["name", "construct-outline", 1, "icon"]], template: function SidebarComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1);
    \u0275\u0275listener("click", function SidebarComponent_Template_div_click_1_listener() {
      return ctx.onCloseSidebar();
    });
    \u0275\u0275element(2, "ion-icon", 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3);
    \u0275\u0275element(4, "img", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "nav", 5)(6, "a", 6);
    \u0275\u0275listener("click", function SidebarComponent_Template_a_click_6_listener() {
      return ctx.onNavClick();
    });
    \u0275\u0275element(7, "ion-icon", 7);
    \u0275\u0275text(8, "Inicio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "a", 8);
    \u0275\u0275listener("click", function SidebarComponent_Template_a_click_9_listener() {
      return ctx.onNavClick();
    });
    \u0275\u0275element(10, "ion-icon", 9);
    \u0275\u0275text(11, "Avisos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "a", 10);
    \u0275\u0275listener("click", function SidebarComponent_Template_a_click_12_listener() {
      return ctx.onNavClick();
    });
    \u0275\u0275element(13, "ion-icon", 11);
    \u0275\u0275text(14, "Historial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "a", 12);
    \u0275\u0275listener("click", function SidebarComponent_Template_a_click_15_listener() {
      return ctx.onNavClick();
    });
    \u0275\u0275element(16, "ion-icon", 13);
    \u0275\u0275text(17, "Inventario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "a", 14);
    \u0275\u0275listener("click", function SidebarComponent_Template_a_click_18_listener() {
      return ctx.onNavClick();
    });
    \u0275\u0275element(19, "ion-icon", 15);
    \u0275\u0275text(20, "Facturas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "a", 16);
    \u0275\u0275listener("click", function SidebarComponent_Template_a_click_21_listener() {
      return ctx.onNavClick();
    });
    \u0275\u0275element(22, "ion-icon", 17);
    \u0275\u0275text(23, "Presupuestos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "a", 18);
    \u0275\u0275listener("click", function SidebarComponent_Template_a_click_24_listener() {
      return ctx.onNavClick();
    });
    \u0275\u0275element(25, "ion-icon", 19);
    \u0275\u0275text(26, "Clientes");
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, SidebarComponent_a_27_Template, 3, 0, "a", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 21)(29, "a", 22);
    \u0275\u0275listener("click", function SidebarComponent_Template_a_click_29_listener() {
      return ctx.onNavClick();
    });
    \u0275\u0275element(30, "ion-icon", 23);
    \u0275\u0275text(31, "Ajustes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "a", 24);
    \u0275\u0275listener("click", function SidebarComponent_Template_a_click_32_listener() {
      return ctx.onNavClick();
    });
    \u0275\u0275element(33, "ion-icon", 25);
    \u0275\u0275text(34, "Mi cuenta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "a", 26);
    \u0275\u0275listener("click", function SidebarComponent_Template_a_click_35_listener() {
      return ctx.onLogout();
    });
    \u0275\u0275element(36, "ion-icon", 27);
    \u0275\u0275text(37, "Cerrar Sesi\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(38, "div", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275classProp("open", ctx.isOpen);
    \u0275\u0275advance(27);
    \u0275\u0275property("ngIf", ctx.rolActual === ctx.TipoRol.ADMINISTRADOR);
  }
}, dependencies: [IonIcon, RouterLink, RouterLinkActive, CommonModule, NgIf], styles: ["\n\n.sidebar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: #fff;\n  background-color: #FFFFFF;\n  border-right: 1px solid #E2E8F0;\n  padding: 24px 0 0 0;\n  box-sizing: border-box;\n  z-index: 1001;\n  position: relative;\n  transition: transform 0.3s ease;\n}\n.sidebar[_ngcontent-%COMP%]   .sidebar-close-btn[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: #f1f5f9;\n  border: none;\n  cursor: pointer;\n  align-items: center;\n  justify-content: center;\n  z-index: 1002;\n  transition: background-color 0.2s ease;\n}\n.sidebar[_ngcontent-%COMP%]   .sidebar-close-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #64748b;\n}\n.sidebar[_ngcontent-%COMP%]   .sidebar-close-btn[_ngcontent-%COMP%]:hover {\n  background: #e2e8f0;\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0 32px 32px 32px;\n  font-weight: bold;\n  font-size: 1.1rem;\n}\n.sidebar-menu[_ngcontent-%COMP%], \n.sidebar-footer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 0 24px;\n}\n.sidebar-menu[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  padding-top: 16px;\n  flex: 0 0 auto;\n}\n.sidebar-spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\na[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 12px;\n  border-radius: 8px;\n  color: #64748B;\n  text-decoration: none;\n  font-size: 1rem;\n  transition: background 0.2s, color 0.2s;\n}\na.active[_ngcontent-%COMP%], \na[_ngcontent-%COMP%]:hover {\n  background: #EEF2FF;\n  color: #4F46E5;\n  font-weight: 500;\n}\na.active[_ngcontent-%COMP%] {\n  background: #EEF2FF;\n  color: #4F46E5;\n  font-weight: 600;\n}\n.logout-link[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #e74c3c !important;\n}\n.logout-link[_ngcontent-%COMP%]:hover {\n  background: #fdf2f2 !important;\n  color: #c53030 !important;\n}\n.icon[_ngcontent-%COMP%] {\n  font-size: 1.2em;\n}\n.sidebar-user[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 16px 24px;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  border-top: 1px solid #f0f0f0;\n}\n.icon-user[_ngcontent-%COMP%] {\n  font-size: 1.2em;\n  display: flex;\n  align-items: center;\n  color: #888;\n}\n.topbar-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.topbar-right[_ngcontent-%COMP%]   .user-info-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.topbar-right[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 14px;\n}\n.topbar-right[_ngcontent-%COMP%]   .username[_ngcontent-%COMP%] {\n  font-weight: 500;\n  margin-right: 8px;\n  color: #222;\n  font-size: 14px;\n}\n.topbar-right[_ngcontent-%COMP%]   .user-role[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  font-weight: 400;\n}\n.topbar-right[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  background: #ffe7a0;\n  border-radius: 50%;\n  display: inline-block;\n  background-image: url(https://randomuser.me/api/portraits/men/1.jpg);\n  background-size: cover;\n  background-position: center;\n}\n@media (max-width: 768px) {\n  .sidebar[_ngcontent-%COMP%] {\n    position: fixed;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    transform: translateX(-100%);\n    width: 280px;\n    max-width: 85vw;\n    background: #fff !important;\n    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);\n    z-index: 1000;\n  }\n  .sidebar[_ngcontent-%COMP%]   .sidebar-close-btn[_ngcontent-%COMP%] {\n    display: flex;\n  }\n  .sidebar.open[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n  .sidebar[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%] {\n    padding: 16px 24px 24px 24px;\n  }\n  .sidebar[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {\n    width: 140px !important;\n  }\n  .sidebar[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%], \n   .sidebar[_ngcontent-%COMP%]   .sidebar-footer[_ngcontent-%COMP%] {\n    padding: 0 16px;\n  }\n  .sidebar[_ngcontent-%COMP%]   .sidebar-user[_ngcontent-%COMP%] {\n    padding: 16px;\n    background: #fff;\n  }\n}\n@media (max-width: 480px) {\n  .sidebar[_ngcontent-%COMP%] {\n    width: 100vw;\n    max-width: 100vw;\n  }\n}\n/*# sourceMappingURL=sidebar.component.css.map */"] });
var SidebarComponent = _SidebarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{ selector: "app-sidebar", standalone: true, imports: [IonIcon, RouterLink, RouterLinkActive, CommonModule], template: '<aside class="sidebar" [class.open]="isOpen">\r\n  <!-- Bot\xF3n de cerrar para m\xF3viles -->\r\n  <div class="sidebar-close-btn" (click)="onCloseSidebar()">\r\n    <ion-icon name="close-outline"></ion-icon>\r\n  </div>\r\n\r\n  <div class="sidebar-header">\r\n    <img style="width: 180px;" src="assets/icon/LogoGestionAvisosLargo.png" alt="Logo" class="logo">\r\n  </div>\r\n  <nav class="sidebar-menu">\r\n    <a routerLink="/home" routerLinkActive="active" (click)="onNavClick()"><ion-icon name="grid-outline" class="icon"></ion-icon>Inicio</a>\r\n    <a routerLink="/avisos" routerLinkActive="active" (click)="onNavClick()"><ion-icon name="notifications-outline" class="icon"></ion-icon>Avisos</a>\r\n    <a routerLink="/historial" routerLinkActive="active" (click)="onNavClick()"><ion-icon name="time-outline" class="icon"></ion-icon>Historial</a>\r\n    <a routerLink="/inventario" routerLinkActive="active" (click)="onNavClick()"><ion-icon name="cube-outline" class="icon"></ion-icon>Inventario</a>\r\n    <a routerLink="/facturas" routerLinkActive="active" (click)="onNavClick()"><ion-icon name="document-text-outline" class="icon"></ion-icon>Facturas</a>\r\n    <a routerLink="/presupuestos" routerLinkActive="active" (click)="onNavClick()"><ion-icon name="cash-outline" class="icon"></ion-icon>Presupuestos</a>\r\n    <a routerLink="/clientes" routerLinkActive="active" (click)="onNavClick()"><ion-icon name="people-outline" class="icon"></ion-icon>Clientes</a>\r\n    <a *ngIf="this.rolActual === TipoRol.ADMINISTRADOR" routerLink="/tecnicos" routerLinkActive="active" (click)="onNavClick()"><ion-icon name="construct-outline" class="icon"></ion-icon>T\xE9cnicos</a>\r\n  </nav>\r\n  <div class="sidebar-footer">\r\n    <a routerLink="/ajustes" routerLinkActive="active" (click)="onNavClick()"><ion-icon name="settings-outline" class="icon"></ion-icon>Ajustes</a>\r\n    <a routerLink="/cuenta" routerLinkActive="active" (click)="onNavClick()"><ion-icon name="person-circle-outline" class="icon"></ion-icon>Mi cuenta</a>\r\n    <a (click)="onLogout()" class="logout-link"><ion-icon name="log-out-outline" class="icon"></ion-icon>Cerrar Sesi\xF3n</a>\r\n  </div>\r\n  <div class="sidebar-spacer"></div>\r\n</aside>\r\n', styles: ["/* src/app/layout/components/sidebar/sidebar.component.scss */\n.sidebar {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: #fff;\n  background-color: #FFFFFF;\n  border-right: 1px solid #E2E8F0;\n  padding: 24px 0 0 0;\n  box-sizing: border-box;\n  z-index: 1001;\n  position: relative;\n  transition: transform 0.3s ease;\n}\n.sidebar .sidebar-close-btn {\n  display: none;\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: #f1f5f9;\n  border: none;\n  cursor: pointer;\n  align-items: center;\n  justify-content: center;\n  z-index: 1002;\n  transition: background-color 0.2s ease;\n}\n.sidebar .sidebar-close-btn ion-icon {\n  font-size: 18px;\n  color: #64748b;\n}\n.sidebar .sidebar-close-btn:hover {\n  background: #e2e8f0;\n}\n.sidebar-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0 32px 32px 32px;\n  font-weight: bold;\n  font-size: 1.1rem;\n}\n.sidebar-menu,\n.sidebar-footer {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 0 24px;\n}\n.sidebar-menu {\n  flex: 0 0 auto;\n}\n.sidebar-footer {\n  margin-top: 24px;\n  padding-top: 16px;\n  flex: 0 0 auto;\n}\n.sidebar-spacer {\n  flex: 1 1 auto;\n}\na {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 12px;\n  border-radius: 8px;\n  color: #64748B;\n  text-decoration: none;\n  font-size: 1rem;\n  transition: background 0.2s, color 0.2s;\n}\na.active,\na:hover {\n  background: #EEF2FF;\n  color: #4F46E5;\n  font-weight: 500;\n}\na.active {\n  background: #EEF2FF;\n  color: #4F46E5;\n  font-weight: 600;\n}\n.logout-link {\n  cursor: pointer;\n  color: #e74c3c !important;\n}\n.logout-link:hover {\n  background: #fdf2f2 !important;\n  color: #c53030 !important;\n}\n.icon {\n  font-size: 1.2em;\n}\n.sidebar-user {\n  display: flex;\n  gap: 8px;\n  padding: 16px 24px;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  border-top: 1px solid #f0f0f0;\n}\n.icon-user {\n  font-size: 1.2em;\n  display: flex;\n  align-items: center;\n  color: #888;\n}\n.topbar-right {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.topbar-right .user-info-container {\n  display: flex;\n  flex-direction: column;\n}\n.topbar-right .welcome {\n  color: #888;\n  font-size: 14px;\n}\n.topbar-right .username {\n  font-weight: 500;\n  margin-right: 8px;\n  color: #222;\n  font-size: 14px;\n}\n.topbar-right .user-role {\n  font-size: 12px;\n  color: #666;\n  font-weight: 400;\n}\n.topbar-right .avatar {\n  width: 36px;\n  height: 36px;\n  background: #ffe7a0;\n  border-radius: 50%;\n  display: inline-block;\n  background-image: url(https://randomuser.me/api/portraits/men/1.jpg);\n  background-size: cover;\n  background-position: center;\n}\n@media (max-width: 768px) {\n  .sidebar {\n    position: fixed;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    transform: translateX(-100%);\n    width: 280px;\n    max-width: 85vw;\n    background: #fff !important;\n    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);\n    z-index: 1000;\n  }\n  .sidebar .sidebar-close-btn {\n    display: flex;\n  }\n  .sidebar.open {\n    transform: translateX(0);\n  }\n  .sidebar .sidebar-header {\n    padding: 16px 24px 24px 24px;\n  }\n  .sidebar .sidebar-header .logo {\n    width: 140px !important;\n  }\n  .sidebar .sidebar-menu,\n  .sidebar .sidebar-footer {\n    padding: 0 16px;\n  }\n  .sidebar .sidebar-user {\n    padding: 16px;\n    background: #fff;\n  }\n}\n@media (max-width: 480px) {\n  .sidebar {\n    width: 100vw;\n    max-width: 100vw;\n  }\n}\n/*# sourceMappingURL=sidebar.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: RolesService }, { type: Router }], { isOpen: [{
    type: Input
  }], closeSidebar: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/layout/components/sidebar/sidebar.component.ts", lineNumber: 43 });
})();

// src/app/layout/components/main-layout/main-layout.component.ts
function MainLayoutComponent_header_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 6)(1, "button", 7);
    \u0275\u0275listener("click", function MainLayoutComponent_header_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSidebar());
    });
    \u0275\u0275element(2, "ion-icon", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 9);
    \u0275\u0275element(4, "img", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 11);
    \u0275\u0275element(6, "span", 12);
    \u0275\u0275elementEnd()();
  }
}
function MainLayoutComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275listener("click", function MainLayoutComponent_div_2_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOverlayClick());
    });
    \u0275\u0275elementEnd();
  }
}
function MainLayoutComponent_app_sidebar_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-sidebar", 14);
    \u0275\u0275listener("closeSidebar", function MainLayoutComponent_app_sidebar_4_Template_app_sidebar_closeSidebar_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebar());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("open", ctx_r1.isSidebarOpen);
    \u0275\u0275property("isOpen", ctx_r1.isSidebarOpen);
  }
}
addIcons({
  "menu-outline": menuOutline
});
var _MainLayoutComponent = class _MainLayoutComponent {
  constructor() {
    this.isSidebarOpen = false;
    this.isMobile = false;
    addIcons({ menuOutline });
    this.checkScreenSize();
  }
  ngOnInit() {
  }
  onResize() {
    this.checkScreenSize();
  }
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.isSidebarOpen = false;
    }
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  closeSidebar() {
    this.isSidebarOpen = false;
  }
  onOverlayClick() {
    if (this.isMobile && this.isSidebarOpen) {
      this.closeSidebar();
    }
  }
};
_MainLayoutComponent.\u0275fac = function MainLayoutComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MainLayoutComponent)();
};
_MainLayoutComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MainLayoutComponent, selectors: [["app-main-layout"]], hostBindings: function MainLayoutComponent_HostBindings(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275listener("resize", function MainLayoutComponent_resize_HostBindingHandler($event) {
      return ctx.onResize($event);
    }, false, \u0275\u0275resolveWindow);
  }
}, decls: 7, vars: 5, consts: [[1, "main-layout"], ["class", "mobile-header", 4, "ngIf"], ["class", "sidebar-overlay", 3, "click", 4, "ngIf"], [1, "content-wrapper"], ["class", "sidebar", 3, "open", "isOpen", "closeSidebar", 4, "ngIf"], [1, "main-content"], [1, "mobile-header"], [1, "hamburger-btn", 3, "click"], ["name", "menu-outline"], [1, "mobile-title"], ["src", "assets/icon/LogoGestionAvisosLargo.png", "alt", "Logo", 1, "mobile-logo"], ["routerLink", "/cuenta", 1, "mobile-profile"], [1, "avatar"], [1, "sidebar-overlay", 3, "click"], [1, "sidebar", 3, "closeSidebar", "isOpen"]], template: function MainLayoutComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275template(1, MainLayoutComponent_header_1_Template, 7, 0, "header", 1)(2, MainLayoutComponent_div_2_Template, 1, 0, "div", 2);
    \u0275\u0275elementStart(3, "div", 3);
    \u0275\u0275template(4, MainLayoutComponent_app_sidebar_4_Template, 1, 3, "app-sidebar", 4);
    \u0275\u0275elementStart(5, "main", 5);
    \u0275\u0275element(6, "router-outlet");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isMobile);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isMobile && ctx.isSidebarOpen);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx.isMobile || ctx.isMobile && ctx.isSidebarOpen);
    \u0275\u0275advance();
    \u0275\u0275classProp("mobile", ctx.isMobile);
  }
}, dependencies: [CommonModule, NgIf, RouterOutlet, SidebarComponent, IonIcon], styles: ['@charset "UTF-8";\n\n\n\n.main-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n  background-color: #FAFBFF;\n}\n.main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%] {\n  display: none;\n  align-items: center;\n  padding: 12px 16px;\n  padding-top: calc(12px + var(--safe-area-top, 0px));\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  z-index: 999;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  height: calc(100px + var(--safe-area-top, 0px));\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n}\n.main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%]   .hamburger-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  border: none;\n  background: transparent;\n  border-radius: 8px;\n  cursor: pointer;\n  margin-right: 12px;\n  transition: background-color 0.2s ease;\n}\n.main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%]   .hamburger-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #64748b;\n}\n.main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%]   .hamburger-btn[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%]   .mobile-title[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%]   .mobile-title[_ngcontent-%COMP%]   .mobile-logo[_ngcontent-%COMP%] {\n  height: 32px;\n  width: auto;\n}\n.main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%]   .mobile-profile[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: 12px;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 50%;\n  transition: background-color 0.2s ease;\n}\n.main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%]   .mobile-profile[_ngcontent-%COMP%]:hover {\n  background-color: #f1f5f9;\n}\n.main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%]   .mobile-profile[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  background: #ffe7a0;\n  border-radius: 50%;\n  display: inline-block;\n  background-image: url(https://randomuser.me/api/portraits/men/1.jpg);\n  background-size: cover;\n  background-position: center;\n  border: 2px solid #fff;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.main-layout[_ngcontent-%COMP%]   .sidebar-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n.main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n  position: relative;\n  height: 100vh;\n  padding-top: 0;\n}\n.main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n  width: 250px;\n  height: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-color: #FAFBFF;\n  transition: transform 0.3s ease;\n  z-index: 1000;\n  flex-shrink: 0;\n}\n.main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  background-color: #FAFBFF;\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .main-content.mobile[_ngcontent-%COMP%] {\n  margin-top: 60px;\n  padding: 0px;\n  padding-bottom: var(--safe-area-bottom, 0px);\n  min-height: calc(100vh - 60px - var(--safe-area-bottom, 0px));\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@media (max-width: 768px) {\n  .main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%] {\n    display: flex;\n    height: 50px !important;\n  }\n  .main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%] {\n    padding-top: 0;\n  }\n  .main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .main-content[_ngcontent-%COMP%] {\n    padding: 16px;\n    width: 100%;\n    margin-left: 0;\n    min-height: 100%;\n  }\n  .main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .main-content.mobile[_ngcontent-%COMP%] {\n    margin-top: calc(50px + var(--safe-area-top, 0px)) !important;\n    padding: 0px;\n    padding-bottom: 80px;\n    min-height: calc(100vh - 50px - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n  }\n}\n@media (max-width: 480px) {\n  .main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n    width: 100vw;\n    max-width: 100vw;\n  }\n}\n@media all and (display-mode: standalone) {\n  .main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%] {\n    top: 0;\n    padding-top: 12px;\n    height: 55px;\n  }\n  .main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%] {\n    padding-top: 0;\n  }\n  .main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .main-content.mobile[_ngcontent-%COMP%] {\n    margin-top: 50px !important;\n    padding-bottom: 16px;\n    min-height: calc(100vh - 50px - var(--safe-area-bottom, 0px));\n  }\n}\n@supports (-webkit-touch-callout: none) {\n  @media all and (display-mode: standalone) {\n    .main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%] {\n      top: 0;\n      padding-top: 12px;\n      height: 55px;\n    }\n    .main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .main-content.mobile[_ngcontent-%COMP%] {\n      margin-top: 50px !important;\n      padding-bottom: calc(16px + var(--safe-area-bottom, 0px));\n      min-height: calc(100vh - 50px - var(--safe-area-bottom, 0px));\n    }\n  }\n}\n@supports not (padding-top: env(safe-area-inset-top)) {\n  .main-layout[_ngcontent-%COMP%]   .mobile-header[_ngcontent-%COMP%] {\n    padding-top: 39px;\n    height: 100px;\n  }\n  .main-layout[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .main-content.mobile[_ngcontent-%COMP%] {\n    margin-top: 100px !important;\n    padding-bottom: 20px;\n    min-height: calc(100vh - 100px - 20px);\n  }\n}\n/*# sourceMappingURL=main-layout.component.css.map */'] });
var MainLayoutComponent = _MainLayoutComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MainLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-main-layout", standalone: true, imports: [CommonModule, RouterOutlet, SidebarComponent, IonIcon], template: '<div class="main-layout">\r\n    <!-- Header m\xF3vil con bot\xF3n hamburguesa -->\r\n    <header class="mobile-header" *ngIf="isMobile">\r\n        <button class="hamburger-btn" (click)="toggleSidebar()">\r\n            <ion-icon name="menu-outline"></ion-icon>\r\n        </button>\r\n        <div class="mobile-title">\r\n            <img src="assets/icon/LogoGestionAvisosLargo.png" alt="Logo" class="mobile-logo">\r\n        </div>\r\n        <div class="mobile-profile" routerLink="/cuenta">\r\n            <span class="avatar"></span>\r\n        </div>\r\n    </header>\r\n\r\n    <!-- Overlay para cerrar sidebar en m\xF3viles -->\r\n    <div class="sidebar-overlay" \r\n         *ngIf="isMobile && isSidebarOpen" \r\n         (click)="onOverlayClick()"></div>\r\n\r\n    <div class="content-wrapper">\r\n        <!-- Sidebar -->\r\n        <app-sidebar \r\n            *ngIf="!isMobile || (isMobile && isSidebarOpen)"\r\n            class="sidebar" \r\n            [class.open]="isSidebarOpen"\r\n            [isOpen]="isSidebarOpen"\r\n            (closeSidebar)="closeSidebar()">\r\n        </app-sidebar>\r\n\r\n        <!-- Main Content -->\r\n        <main class="main-content" [class.mobile]="isMobile">\r\n            <router-outlet></router-outlet>\r\n        </main>\r\n    </div>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/layout/components/main-layout/main-layout.component.scss */\n.main-layout {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n  background-color: #FAFBFF;\n}\n.main-layout .mobile-header {\n  display: none;\n  align-items: center;\n  padding: 12px 16px;\n  padding-top: calc(12px + var(--safe-area-top, 0px));\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  z-index: 999;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  height: calc(100px + var(--safe-area-top, 0px));\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n}\n.main-layout .mobile-header .hamburger-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  border: none;\n  background: transparent;\n  border-radius: 8px;\n  cursor: pointer;\n  margin-right: 12px;\n  transition: background-color 0.2s ease;\n}\n.main-layout .mobile-header .hamburger-btn ion-icon {\n  font-size: 24px;\n  color: #64748b;\n}\n.main-layout .mobile-header .hamburger-btn:hover {\n  background: #f1f5f9;\n}\n.main-layout .mobile-header .mobile-title {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.main-layout .mobile-header .mobile-title .mobile-logo {\n  height: 32px;\n  width: auto;\n}\n.main-layout .mobile-header .mobile-profile {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: 12px;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 50%;\n  transition: background-color 0.2s ease;\n}\n.main-layout .mobile-header .mobile-profile:hover {\n  background-color: #f1f5f9;\n}\n.main-layout .mobile-header .mobile-profile .avatar {\n  width: 36px;\n  height: 36px;\n  background: #ffe7a0;\n  border-radius: 50%;\n  display: inline-block;\n  background-image: url(https://randomuser.me/api/portraits/men/1.jpg);\n  background-size: cover;\n  background-position: center;\n  border: 2px solid #fff;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.main-layout .sidebar-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n  animation: fadeIn 0.3s ease;\n}\n.main-layout .content-wrapper {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n  position: relative;\n  height: 100vh;\n  padding-top: 0;\n}\n.main-layout .content-wrapper .sidebar {\n  width: 250px;\n  height: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-color: #FAFBFF;\n  transition: transform 0.3s ease;\n  z-index: 1000;\n  flex-shrink: 0;\n}\n.main-layout .content-wrapper .main-content {\n  flex: 1;\n  overflow-y: auto;\n  background-color: #FAFBFF;\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.main-layout .content-wrapper .main-content.mobile {\n  margin-top: 60px;\n  padding: 0px;\n  padding-bottom: var(--safe-area-bottom, 0px);\n  min-height: calc(100vh - 60px - var(--safe-area-bottom, 0px));\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@media (max-width: 768px) {\n  .main-layout .mobile-header {\n    display: flex;\n    height: 50px !important;\n  }\n  .main-layout .content-wrapper {\n    padding-top: 0;\n  }\n  .main-layout .content-wrapper .main-content {\n    padding: 16px;\n    width: 100%;\n    margin-left: 0;\n    min-height: 100%;\n  }\n  .main-layout .content-wrapper .main-content.mobile {\n    margin-top: calc(50px + var(--safe-area-top, 0px)) !important;\n    padding: 0px;\n    padding-bottom: 80px;\n    min-height: calc(100vh - 50px - var(--safe-area-top, 0px) - var(--safe-area-bottom, 0px));\n  }\n}\n@media (max-width: 480px) {\n  .main-layout .content-wrapper .sidebar {\n    width: 100vw;\n    max-width: 100vw;\n  }\n}\n@media all and (display-mode: standalone) {\n  .main-layout .mobile-header {\n    top: 0;\n    padding-top: 12px;\n    height: 55px;\n  }\n  .main-layout .content-wrapper {\n    padding-top: 0;\n  }\n  .main-layout .content-wrapper .main-content.mobile {\n    margin-top: 50px !important;\n    padding-bottom: 16px;\n    min-height: calc(100vh - 50px - var(--safe-area-bottom, 0px));\n  }\n}\n@supports (-webkit-touch-callout: none) {\n  @media all and (display-mode: standalone) {\n    .main-layout .mobile-header {\n      top: 0;\n      padding-top: 12px;\n      height: 55px;\n    }\n    .main-layout .content-wrapper .main-content.mobile {\n      margin-top: 50px !important;\n      padding-bottom: calc(16px + var(--safe-area-bottom, 0px));\n      min-height: calc(100vh - 50px - var(--safe-area-bottom, 0px));\n    }\n  }\n}\n@supports not (padding-top: env(safe-area-inset-top)) {\n  .main-layout .mobile-header {\n    padding-top: 39px;\n    height: 100px;\n  }\n  .main-layout .content-wrapper .main-content.mobile {\n    margin-top: 100px !important;\n    padding-bottom: 20px;\n    min-height: calc(100vh - 100px - 20px);\n  }\n}\n/*# sourceMappingURL=main-layout.component.css.map */\n'] }]
  }], () => [], { onResize: [{
    type: HostListener,
    args: ["window:resize", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MainLayoutComponent, { className: "MainLayoutComponent", filePath: "src/app/layout/components/main-layout/main-layout.component.ts", lineNumber: 20 });
})();
export {
  MainLayoutComponent
};
//# sourceMappingURL=main-layout.component-HIOZTYQH.js.map
