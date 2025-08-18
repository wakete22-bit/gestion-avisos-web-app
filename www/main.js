import {
  AuthService
} from "./chunk-HVSDGWD4.js";
import {
  ViewportService
} from "./chunk-IXGWTTVF.js";
import {
  AlertController,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonicModule,
  ToastController
} from "./chunk-N4BFTN3Y.js";
import {
  CacheService
} from "./chunk-7DTAJMEV.js";
import {
  IonApp,
  IonRouterOutlet,
  provideIonicAngular
} from "./chunk-DJA56OJT.js";
import {
  ApplicationRef,
  CommonModule,
  Component,
  Injectable,
  InjectionToken,
  Injector,
  IonicRouteStrategy,
  NEVER,
  NgIf,
  NgModule,
  NgZone,
  Observable,
  Platform,
  PreloadAllModules,
  RouteReuseStrategy,
  Router,
  RuntimeError,
  Subject,
  bootstrapApplication,
  catchError,
  enableProdMode,
  environment,
  filter,
  formatRuntimeError,
  from,
  inject,
  isDevMode,
  makeEnvironmentProviders,
  map,
  of,
  provideAppInitializer,
  provideHttpClient,
  provideRouter,
  setClassMetadata,
  switchMap,
  take,
  throwError,
  timeout,
  withInterceptors,
  withPreloading,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext
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
  __publicField,
  __spreadValues
} from "./chunk-KNQSF6OU.js";

// node_modules/@angular/service-worker/fesm2022/service-worker.mjs
var ERR_SW_NOT_SUPPORTED = "Service workers are disabled or not supported by this browser";
var NgswCommChannel = class {
  serviceWorker;
  worker;
  registration;
  events;
  constructor(serviceWorker, injector) {
    this.serviceWorker = serviceWorker;
    if (!serviceWorker) {
      this.worker = this.events = this.registration = new Observable((subscriber) => subscriber.error(new RuntimeError(5601, (typeof ngDevMode === "undefined" || ngDevMode) && ERR_SW_NOT_SUPPORTED)));
    } else {
      let currentWorker = null;
      const workerSubject = new Subject();
      this.worker = new Observable((subscriber) => {
        if (currentWorker !== null) {
          subscriber.next(currentWorker);
        }
        return workerSubject.subscribe((v) => subscriber.next(v));
      });
      const updateController = () => {
        const {
          controller
        } = serviceWorker;
        if (controller === null) {
          return;
        }
        currentWorker = controller;
        workerSubject.next(currentWorker);
      };
      serviceWorker.addEventListener("controllerchange", updateController);
      updateController();
      this.registration = this.worker.pipe(switchMap(() => serviceWorker.getRegistration()));
      const _events = new Subject();
      this.events = _events.asObservable();
      const messageListener = (event) => {
        const {
          data
        } = event;
        if (data == null ? void 0 : data.type) {
          _events.next(data);
        }
      };
      serviceWorker.addEventListener("message", messageListener);
      const appRef = injector == null ? void 0 : injector.get(ApplicationRef, null, {
        optional: true
      });
      appRef == null ? void 0 : appRef.onDestroy(() => {
        serviceWorker.removeEventListener("controllerchange", updateController);
        serviceWorker.removeEventListener("message", messageListener);
      });
    }
  }
  postMessage(action, payload) {
    return new Promise((resolve) => {
      this.worker.pipe(take(1)).subscribe((sw) => {
        sw.postMessage(__spreadValues({
          action
        }, payload));
        resolve();
      });
    });
  }
  postMessageWithOperation(type, payload, operationNonce) {
    const waitForOperationCompleted = this.waitForOperationCompleted(operationNonce);
    const postMessage = this.postMessage(type, payload);
    return Promise.all([postMessage, waitForOperationCompleted]).then(([, result]) => result);
  }
  generateNonce() {
    return Math.round(Math.random() * 1e7);
  }
  eventsOfType(type) {
    let filterFn;
    if (typeof type === "string") {
      filterFn = (event) => event.type === type;
    } else {
      filterFn = (event) => type.includes(event.type);
    }
    return this.events.pipe(filter(filterFn));
  }
  nextEventOfType(type) {
    return this.eventsOfType(type).pipe(take(1));
  }
  waitForOperationCompleted(nonce) {
    return new Promise((resolve, reject) => {
      this.eventsOfType("OPERATION_COMPLETED").pipe(filter((event) => event.nonce === nonce), take(1), map((event) => {
        if (event.result !== void 0) {
          return event.result;
        }
        throw new Error(event.error);
      })).subscribe({
        next: resolve,
        error: reject
      });
    });
  }
  get isEnabled() {
    return !!this.serviceWorker;
  }
};
var _SwPush = class _SwPush {
  sw;
  /**
   * Emits the payloads of the received push notification messages.
   */
  messages;
  /**
   * Emits the payloads of the received push notification messages as well as the action the user
   * interacted with. If no action was used the `action` property contains an empty string `''`.
   *
   * Note that the `notification` property does **not** contain a
   * [Notification][Mozilla Notification] object but rather a
   * [NotificationOptions](https://notifications.spec.whatwg.org/#dictdef-notificationoptions)
   * object that also includes the `title` of the [Notification][Mozilla Notification] object.
   *
   * [Mozilla Notification]: https://developer.mozilla.org/en-US/docs/Web/API/Notification
   */
  notificationClicks;
  /**
   * Emits the currently active
   * [PushSubscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
   * associated to the Service Worker registration or `null` if there is no subscription.
   */
  subscription;
  /**
   * True if the Service Worker is enabled (supported by the browser and enabled via
   * `ServiceWorkerModule`).
   */
  get isEnabled() {
    return this.sw.isEnabled;
  }
  pushManager = null;
  subscriptionChanges = new Subject();
  constructor(sw) {
    this.sw = sw;
    if (!sw.isEnabled) {
      this.messages = NEVER;
      this.notificationClicks = NEVER;
      this.subscription = NEVER;
      return;
    }
    this.messages = this.sw.eventsOfType("PUSH").pipe(map((message) => message.data));
    this.notificationClicks = this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(map((message) => message.data));
    this.pushManager = this.sw.registration.pipe(map((registration) => registration.pushManager));
    const workerDrivenSubscriptions = this.pushManager.pipe(switchMap((pm) => pm.getSubscription()));
    this.subscription = new Observable((subscriber) => {
      const workerDrivenSubscription = workerDrivenSubscriptions.subscribe(subscriber);
      const subscriptionChanges = this.subscriptionChanges.subscribe(subscriber);
      return () => {
        workerDrivenSubscription.unsubscribe();
        subscriptionChanges.unsubscribe();
      };
    });
  }
  /**
   * Subscribes to Web Push Notifications,
   * after requesting and receiving user permission.
   *
   * @param options An object containing the `serverPublicKey` string.
   * @returns A Promise that resolves to the new subscription object.
   */
  requestSubscription(options) {
    if (!this.sw.isEnabled || this.pushManager === null) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const pushOptions = {
      userVisibleOnly: true
    };
    let key = this.decodeBase64(options.serverPublicKey.replace(/_/g, "/").replace(/-/g, "+"));
    let applicationServerKey = new Uint8Array(new ArrayBuffer(key.length));
    for (let i = 0; i < key.length; i++) {
      applicationServerKey[i] = key.charCodeAt(i);
    }
    pushOptions.applicationServerKey = applicationServerKey;
    return new Promise((resolve, reject) => {
      this.pushManager.pipe(switchMap((pm) => pm.subscribe(pushOptions)), take(1)).subscribe({
        next: (sub) => {
          this.subscriptionChanges.next(sub);
          resolve(sub);
        },
        error: reject
      });
    });
  }
  /**
   * Unsubscribes from Service Worker push notifications.
   *
   * @returns A Promise that is resolved when the operation succeeds, or is rejected if there is no
   *          active subscription or the unsubscribe operation fails.
   */
  unsubscribe() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const doUnsubscribe = (sub) => {
      if (sub === null) {
        throw new RuntimeError(5602, (typeof ngDevMode === "undefined" || ngDevMode) && "Not subscribed to push notifications.");
      }
      return sub.unsubscribe().then((success) => {
        if (!success) {
          throw new RuntimeError(5603, (typeof ngDevMode === "undefined" || ngDevMode) && "Unsubscribe failed!");
        }
        this.subscriptionChanges.next(null);
      });
    };
    return new Promise((resolve, reject) => {
      this.subscription.pipe(take(1), switchMap(doUnsubscribe)).subscribe({
        next: resolve,
        error: reject
      });
    });
  }
  decodeBase64(input) {
    return atob(input);
  }
};
__publicField(_SwPush, "\u0275fac", function SwPush_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SwPush)(\u0275\u0275inject(NgswCommChannel));
});
__publicField(_SwPush, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _SwPush,
  factory: _SwPush.\u0275fac
}));
var SwPush = _SwPush;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwPush, [{
    type: Injectable
  }], () => [{
    type: NgswCommChannel
  }], null);
})();
var _SwUpdate = class _SwUpdate {
  sw;
  /**
   * Emits a `VersionDetectedEvent` event whenever a new version is detected on the server.
   *
   * Emits a `VersionInstallationFailedEvent` event whenever checking for or downloading a new
   * version fails.
   *
   * Emits a `VersionReadyEvent` event whenever a new version has been downloaded and is ready for
   * activation.
   */
  versionUpdates;
  /**
   * Emits an `UnrecoverableStateEvent` event whenever the version of the app used by the service
   * worker to serve this client is in a broken state that cannot be recovered from without a full
   * page reload.
   */
  unrecoverable;
  /**
   * True if the Service Worker is enabled (supported by the browser and enabled via
   * `ServiceWorkerModule`).
   */
  get isEnabled() {
    return this.sw.isEnabled;
  }
  constructor(sw) {
    this.sw = sw;
    if (!sw.isEnabled) {
      this.versionUpdates = NEVER;
      this.unrecoverable = NEVER;
      return;
    }
    this.versionUpdates = this.sw.eventsOfType(["VERSION_DETECTED", "VERSION_INSTALLATION_FAILED", "VERSION_READY", "NO_NEW_VERSION_DETECTED"]);
    this.unrecoverable = this.sw.eventsOfType("UNRECOVERABLE_STATE");
  }
  /**
   * Checks for an update and waits until the new version is downloaded from the server and ready
   * for activation.
   *
   * @returns a promise that
   * - resolves to `true` if a new version was found and is ready to be activated.
   * - resolves to `false` if no new version was found
   * - rejects if any error occurs
   */
  checkForUpdate() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
    }
    const nonce = this.sw.generateNonce();
    return this.sw.postMessageWithOperation("CHECK_FOR_UPDATES", {
      nonce
    }, nonce);
  }
  /**
   * Updates the current client (i.e. browser tab) to the latest version that is ready for
   * activation.
   *
   * In most cases, you should not use this method and instead should update a client by reloading
   * the page.
   *
   * <div class="docs-alert docs-alert-important">
   *
   * Updating a client without reloading can easily result in a broken application due to a version
   * mismatch between the application shell and other page resources,
   * such as lazy-loaded chunks, whose filenames may change between
   * versions.
   *
   * Only use this method, if you are certain it is safe for your specific use case.
   *
   * </div>
   *
   * @returns a promise that
   *  - resolves to `true` if an update was activated successfully
   *  - resolves to `false` if no update was available (for example, the client was already on the
   *    latest version).
   *  - rejects if any error occurs
   */
  activateUpdate() {
    if (!this.sw.isEnabled) {
      return Promise.reject(new RuntimeError(5601, (typeof ngDevMode === "undefined" || ngDevMode) && ERR_SW_NOT_SUPPORTED));
    }
    const nonce = this.sw.generateNonce();
    return this.sw.postMessageWithOperation("ACTIVATE_UPDATE", {
      nonce
    }, nonce);
  }
};
__publicField(_SwUpdate, "\u0275fac", function SwUpdate_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SwUpdate)(\u0275\u0275inject(NgswCommChannel));
});
__publicField(_SwUpdate, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _SwUpdate,
  factory: _SwUpdate.\u0275fac
}));
var SwUpdate = _SwUpdate;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwUpdate, [{
    type: Injectable
  }], () => [{
    type: NgswCommChannel
  }], null);
})();
var SCRIPT = new InjectionToken(ngDevMode ? "NGSW_REGISTER_SCRIPT" : "");
function ngswAppInitializer() {
  if (false) {
    return;
  }
  const options = inject(SwRegistrationOptions);
  if (!("serviceWorker" in navigator && options.enabled !== false)) {
    return;
  }
  const script = inject(SCRIPT);
  const ngZone = inject(NgZone);
  const appRef = inject(ApplicationRef);
  ngZone.runOutsideAngular(() => {
    const sw = navigator.serviceWorker;
    const onControllerChange = () => {
      var _a;
      return (_a = sw.controller) == null ? void 0 : _a.postMessage({
        action: "INITIALIZE"
      });
    };
    sw.addEventListener("controllerchange", onControllerChange);
    appRef.onDestroy(() => {
      sw.removeEventListener("controllerchange", onControllerChange);
    });
  });
  ngZone.runOutsideAngular(() => {
    let readyToRegister;
    const {
      registrationStrategy
    } = options;
    if (typeof registrationStrategy === "function") {
      readyToRegister = new Promise((resolve) => registrationStrategy().subscribe(() => resolve()));
    } else {
      const [strategy, ...args] = (registrationStrategy || "registerWhenStable:30000").split(":");
      switch (strategy) {
        case "registerImmediately":
          readyToRegister = Promise.resolve();
          break;
        case "registerWithDelay":
          readyToRegister = delayWithTimeout(+args[0] || 0);
          break;
        case "registerWhenStable":
          readyToRegister = Promise.race([appRef.whenStable(), delayWithTimeout(+args[0])]);
          break;
        default:
          throw new RuntimeError(5600, (typeof ngDevMode === "undefined" || ngDevMode) && `Unknown ServiceWorker registration strategy: ${options.registrationStrategy}`);
      }
    }
    readyToRegister.then(() => {
      if (appRef.destroyed) {
        return;
      }
      navigator.serviceWorker.register(script, {
        scope: options.scope
      }).catch((err) => console.error(formatRuntimeError(5604, (typeof ngDevMode === "undefined" || ngDevMode) && "Service worker registration failed with: " + err)));
    });
  });
}
function delayWithTimeout(timeout2) {
  return new Promise((resolve) => setTimeout(resolve, timeout2));
}
function ngswCommChannelFactory(opts, injector) {
  const isBrowser = true;
  return new NgswCommChannel(isBrowser && opts.enabled !== false ? navigator.serviceWorker : void 0, injector);
}
var SwRegistrationOptions = class {
  /**
   * Whether the ServiceWorker will be registered and the related services (such as `SwPush` and
   * `SwUpdate`) will attempt to communicate and interact with it.
   *
   * Default: true
   */
  enabled;
  /**
   * A URL that defines the ServiceWorker's registration scope; that is, what range of URLs it can
   * control. It will be used when calling
   * [ServiceWorkerContainer#register()](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register).
   */
  scope;
  /**
   * Defines the ServiceWorker registration strategy, which determines when it will be registered
   * with the browser.
   *
   * The default behavior of registering once the application stabilizes (i.e. as soon as there are
   * no pending micro- and macro-tasks) is designed to register the ServiceWorker as soon as
   * possible but without affecting the application's first time load.
   *
   * Still, there might be cases where you want more control over when the ServiceWorker is
   * registered (for example, there might be a long-running timeout or polling interval, preventing
   * the app from stabilizing). The available option are:
   *
   * - `registerWhenStable:<timeout>`: Register as soon as the application stabilizes (no pending
   *     micro-/macro-tasks) but no later than `<timeout>` milliseconds. If the app hasn't
   *     stabilized after `<timeout>` milliseconds (for example, due to a recurrent asynchronous
   *     task), the ServiceWorker will be registered anyway.
   *     If `<timeout>` is omitted, the ServiceWorker will only be registered once the app
   *     stabilizes.
   * - `registerImmediately`: Register immediately.
   * - `registerWithDelay:<timeout>`: Register with a delay of `<timeout>` milliseconds. For
   *     example, use `registerWithDelay:5000` to register the ServiceWorker after 5 seconds. If
   *     `<timeout>` is omitted, is defaults to `0`, which will register the ServiceWorker as soon
   *     as possible but still asynchronously, once all pending micro-tasks are completed.
   * - An Observable factory function: A function that returns an `Observable`.
   *     The function will be used at runtime to obtain and subscribe to the `Observable` and the
   *     ServiceWorker will be registered as soon as the first value is emitted.
   *
   * Default: 'registerWhenStable:30000'
   */
  registrationStrategy;
};
function provideServiceWorker(script, options = {}) {
  return makeEnvironmentProviders([SwPush, SwUpdate, {
    provide: SCRIPT,
    useValue: script
  }, {
    provide: SwRegistrationOptions,
    useValue: options
  }, {
    provide: NgswCommChannel,
    useFactory: ngswCommChannelFactory,
    deps: [SwRegistrationOptions, Injector]
  }, provideAppInitializer(ngswAppInitializer)]);
}
var _ServiceWorkerModule = class _ServiceWorkerModule {
  /**
   * Register the given Angular Service Worker script.
   *
   * If `enabled` is set to `false` in the given options, the module will behave as if service
   * workers are not supported by the browser, and the service worker will not be registered.
   */
  static register(script, options = {}) {
    return {
      ngModule: _ServiceWorkerModule,
      providers: [provideServiceWorker(script, options)]
    };
  }
};
__publicField(_ServiceWorkerModule, "\u0275fac", function ServiceWorkerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ServiceWorkerModule)();
});
__publicField(_ServiceWorkerModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _ServiceWorkerModule
}));
__publicField(_ServiceWorkerModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  providers: [SwPush, SwUpdate]
}));
var ServiceWorkerModule = _ServiceWorkerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServiceWorkerModule, [{
    type: NgModule,
    args: [{
      providers: [SwPush, SwUpdate]
    }]
  }], null, null);
})();

// src/app/core/guards/auth.guard.ts
var _AuthGuard = class _AuthGuard {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  canActivate() {
    console.log("\u{1F680} AuthGuard: canActivate() llamado");
    return from(this.checkAuthStatus()).pipe(map((isAuthenticated) => {
      console.log("\u{1F680} AuthGuard: Resultado de checkAuthStatus:", isAuthenticated);
      if (!isAuthenticated) {
        console.log("\u{1F680} AuthGuard: Redirigiendo a login");
        return this.router.createUrlTree(["/auth/login"]);
      }
      console.log("\u{1F680} AuthGuard: Permitiendo acceso");
      return true;
    }), catchError((error) => {
      console.error("\u274C AuthGuard: Error en canActivate:", error);
      return of(this.router.createUrlTree(["/auth/login"]));
    }));
  }
  checkAuthStatus() {
    return __async(this, null, function* () {
      try {
        console.log("\u{1F50D} AuthGuard: Verificaci\xF3n r\xE1pida de autenticaci\xF3n");
        const token = yield this.authService.getToken();
        console.log("\u{1F50D} AuthGuard: Token obtenido:", token ? "S\xCD" : "NO");
        if (!token) {
          console.log("\u{1F50D} AuthGuard: No hay token, redirigiendo a login");
          return false;
        }
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          console.log("\u{1F50D} AuthGuard: Usuario ya cargado, acceso inmediato");
          return true;
        }
        const isTokenValid = yield this.authService.ensureValidToken();
        if (!isTokenValid) {
          console.log("\u{1F50D} AuthGuard: Token no v\xE1lido, redirigiendo a login");
          return false;
        }
        console.log("\u{1F50D} AuthGuard: Cargando usuario b\xE1sico...");
        const { data: { session } } = yield this.authService.getCurrentSession();
        if (session == null ? void 0 : session.user) {
          yield this.authService.loadUserData(session.user.id);
          console.log("\u{1F50D} AuthGuard: Usuario b\xE1sico cargado, permitiendo acceso");
          return true;
        }
        console.log("\u{1F50D} AuthGuard: No hay sesi\xF3n v\xE1lida");
        return false;
      } catch (error) {
        console.error("\u274C AuthGuard: Error en verificaci\xF3n r\xE1pida:", error);
        if (error instanceof Error && error.message.includes("NavigatorLockAcquireTimeoutError")) {
          console.log("\u{1F50D} AuthGuard: Error de lock detectado, intentando limpiar...");
          try {
            localStorage.setItem("supabase_lock_issue", "true");
            yield new Promise((resolve) => setTimeout(resolve, 2e3));
            const retryResult = yield this.checkAuthStatus();
            if (retryResult) {
              console.log("\u{1F50D} AuthGuard: Reintento exitoso despu\xE9s de limpiar locks");
              return true;
            }
          } catch (retryError) {
            console.error("\u274C AuthGuard: Error en reintento:", retryError);
          }
        }
        return false;
      }
    });
  }
};
_AuthGuard.\u0275fac = function AuthGuard_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router));
};
_AuthGuard.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthGuard, factory: _AuthGuard.\u0275fac, providedIn: "root" });
var AuthGuard = _AuthGuard;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthGuard, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();

// src/app/app.routes.ts
var routes = [
  // Rutas de autenticación (públicas)
  {
    path: "auth",
    children: [
      {
        path: "login",
        loadComponent: () => import("./login.component-LNETHITD.js").then((m) => m.LoginComponent)
      },
      {
        path: "register",
        loadComponent: () => import("./register.component-F66U4YMZ.js").then((m) => m.RegisterComponent)
      },
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      }
    ]
  },
  // Rutas protegidas de la aplicación
  {
    path: "",
    loadComponent: () => import("./main-layout.component-HIOZTYQH.js").then((m) => m.MainLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: "home",
        loadComponent: () => import("./home.page-DIPYMFHB.js").then((m) => m.HomePage)
      },
      {
        path: "avisos",
        loadComponent: () => import("./avisos.component-QZQOHK22.js").then((m) => m.AvisosComponent)
      },
      {
        path: "historial",
        loadComponent: () => import("./historial.component-PFTXA77S.js").then((m) => m.HistorialComponent)
      },
      {
        path: "inventario",
        loadComponent: () => import("./inventario.component-RO7C57PT.js").then((m) => m.InventarioComponent)
      },
      {
        path: "facturas",
        loadComponent: () => import("./facturas.component-3QLH2HGE.js").then((m) => m.FacturasComponent)
      },
      {
        path: "facturas/:id",
        loadComponent: () => import("./ver-factura.component-K5WMLO7O.js").then((m) => m.VerFacturaComponent)
      },
      {
        path: "presupuestos",
        loadComponent: () => import("./presupuestos.component-YVFTXDFW.js").then((m) => m.PresupuestosComponent)
      },
      {
        path: "presupuestos/crear",
        loadComponent: () => import("./crear-presupuesto.component-GZOBC3NN.js").then((m) => m.CrearPresupuestoComponent)
      },
      {
        path: "presupuestos/:id",
        loadComponent: () => import("./ver-presupuesto.component-UPCV3VKZ.js").then((m) => m.VerPresupuestoComponent)
      },
      {
        path: "clientes",
        loadComponent: () => import("./clientes.component-GV2EWMET.js").then((m) => m.ClientesComponent)
      },
      {
        path: "tecnicos",
        loadComponent: () => import("./tecnicos.component-7WE6FI57.js").then((m) => m.TecnicosComponent)
      },
      {
        path: "cuenta",
        loadComponent: () => import("./mi-cuenta.component-LTWAFEY4.js").then((m) => m.MiCuentaComponent)
      },
      {
        path: "ajustes",
        loadComponent: () => import("./ajustes.component-PCD5XBKQ.js").then((m) => m.AjustesComponent)
      },
      {
        path: "crear-factura",
        loadComponent: () => import("./crear-factura.component-TCVQOCYZ.js").then((m) => m.CrearFacturaComponent)
      },
      {
        path: "facturas/editar/:id",
        loadComponent: () => import("./crear-factura.component-TCVQOCYZ.js").then((m) => m.CrearFacturaComponent)
      },
      {
        path: "ver-aviso/:id-aviso",
        loadComponent: () => import("./ver-avisos.component-BLKKIHO3.js").then((m) => m.VerAvisosComponent)
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      }
    ]
  },
  // Redirección por defecto
  {
    path: "**",
    redirectTo: "auth/login"
  }
];

// src/app/core/services/pwa-ios.service.ts
var _PwaIosService = class _PwaIosService {
  constructor(platform) {
    this.platform = platform;
    this.initializeMobilePWA();
  }
  initializeMobilePWA() {
    if (this.platform.is("ios") || this.platform.is("android")) {
      this.setupMobilePWA();
    }
  }
  setupMobilePWA() {
    document.addEventListener("gesturestart", (e) => {
      e.preventDefault();
    });
    document.addEventListener("touchend", (e) => {
      const now = Date.now();
      const lastTouch = window.lastTouch || 0;
      const timeDiff = now - lastTouch;
      if (timeDiff < 500 && timeDiff > 0) {
        e.preventDefault();
      }
      window.lastTouch = now;
    });
    this.setupViewport();
    this.addMobileStyles();
  }
  setupViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const content = [
        "viewport-fit=cover",
        "width=device-width",
        "initial-scale=1.0",
        "minimum-scale=1.0",
        "maximum-scale=1.0",
        "user-scalable=no"
      ].join(", ");
      viewport.setAttribute("content", content);
    }
  }
  addMobileStyles() {
    const style = document.createElement("style");
    style.textContent = `
      /* Estilos espec\xEDficos para dispositivos m\xF3viles */
      
      /* Configuraci\xF3n base */
      html {
        height: 100%;
        overflow: hidden;
      }
      
      body {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Configuraci\xF3n para PWA standalone */
      @media all and (display-mode: standalone) {
        body {
          /* Aplicar safe areas solo en modo standalone */
          padding-top: env(safe-area-inset-top, 0px);
          padding-bottom: env(safe-area-inset-bottom, 0px);
          padding-left: env(safe-area-inset-left, 0px);
          padding-right: env(safe-area-inset-right, 0px);
        }
        
        /* Configurar ion-app */
        ion-app {
          height: 100vh;
          height: calc(100vh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
          margin: 0;
          padding: 0;
        }
        
        /* Configurar ion-content */
        ion-content {
          --offset-top: 0px;
          --offset-bottom: 0px;
          --padding-top: 0px;
          --padding-bottom: 0px;
        }
        
        /* Configurar ion-header */
        ion-header {
          padding-top: 0px;
        }
        
        /* Configurar ion-footer */
        ion-footer {
          padding-bottom: 0px;
        }
        
        /* Configurar ion-toolbar */
        ion-toolbar {
          --padding-top: 0px;
          --padding-bottom: 0px;
        }
      }
      
      /* Configuraci\xF3n espec\xEDfica para iOS */
      @supports (-webkit-touch-callout: none) {
        body {
          /* Prevenir el bounce scroll en iOS */
          position: fixed;
          width: 100%;
          height: 100%;
        }
        
        ion-content {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
      }
      
      /* Configuraci\xF3n para Android */
      @supports not (-webkit-touch-callout: none) {
        body {
          /* Configuraci\xF3n espec\xEDfica para Android */
          position: relative;
        }
      }
      
      /* Asegurar que el contenido principal ocupe todo el espacio */
      .ion-page {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      
      /* Configurar el router outlet para que ocupe el espacio disponible */
      ion-router-outlet {
        flex: 1;
        height: 100%;
      }
    `;
    document.head.appendChild(style);
  }
  // Método para mostrar instrucciones de instalación específicas de iOS
  showIOSInstallInstructions() {
    const isStandalone = window.navigator.standalone === true;
    if (!isStandalone) {
      const instructions = `
        Para instalar esta aplicaci\xF3n en tu iPhone:
        
        1. Toca el bot\xF3n compartir (\u25A1\u2191) en Safari
        2. Despl\xE1zate hacia abajo y toca "Agregar a pantalla de inicio"
        3. Toca "Agregar"
        
        La aplicaci\xF3n aparecer\xE1 en tu pantalla de inicio como una app nativa.
      `;
      alert(instructions);
    }
  }
  // Método para verificar si la app está en modo standalone
  isStandalone() {
    return window.navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
  }
  // Método para obtener información de las safe areas
  getSafeAreaInfo() {
    return {
      top: this.getComputedValue("env(safe-area-inset-top)"),
      bottom: this.getComputedValue("env(safe-area-inset-bottom)"),
      left: this.getComputedValue("env(safe-area-inset-left)"),
      right: this.getComputedValue("env(safe-area-inset-right)")
    };
  }
  getComputedValue(property) {
    const testElement = document.createElement("div");
    testElement.style.position = "absolute";
    testElement.style.visibility = "hidden";
    testElement.style[property] = property;
    document.body.appendChild(testElement);
    const computedValue = getComputedStyle(testElement)[property];
    document.body.removeChild(testElement);
    return computedValue || "0px";
  }
};
_PwaIosService.\u0275fac = function PwaIosService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PwaIosService)(\u0275\u0275inject(Platform));
};
_PwaIosService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PwaIosService, factory: _PwaIosService.\u0275fac, providedIn: "root" });
var PwaIosService = _PwaIosService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PwaIosService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: Platform }], null);
})();

// src/app/core/services/pwa-install.service.ts
var _PwaInstallService = class _PwaInstallService {
  constructor(platform) {
    this.platform = platform;
  }
  // Verificar si la PWA puede ser instalada
  canInstall() {
    return "serviceWorker" in navigator && "PushManager" in window && this.isStandalone() === false;
  }
  // Verificar si la app está en modo standalone
  isStandalone() {
    return window.navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
  }
  // Obtener instrucciones específicas del navegador
  getInstallInstructions() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (this.platform.is("ios")) {
      return 'Para instalar en iOS:\n1. Toca el bot\xF3n compartir (\u25A1\u2191)\n2. Selecciona "Agregar a pantalla de inicio"\n3. Toca "Agregar"';
    } else if (this.platform.is("android")) {
      return 'Para instalar en Android:\n1. Toca el men\xFA (\u22EE)\n2. Selecciona "Agregar a pantalla de inicio"\n3. Toca "Agregar"';
    } else if (userAgent.includes("chrome")) {
      return 'Para instalar en Chrome:\n1. Busca el \xEDcono de instalaci\xF3n (\u2B07\uFE0F) en la barra de direcciones\n2. Haz clic en "Instalar"';
    } else if (userAgent.includes("edge")) {
      return 'Para instalar en Edge:\n1. Busca el \xEDcono de instalaci\xF3n (\u2B07\uFE0F) en la barra de direcciones\n2. Haz clic en "Instalar"';
    } else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
      return "Para instalar en Safari:\n1. Ve a Archivo > Agregar a pantalla de inicio\n2. La app aparecer\xE1 en tu Launchpad";
    } else {
      return "Para instalar la aplicaci\xF3n:\nBusca el \xEDcono de instalaci\xF3n en tu navegador o usa las opciones del men\xFA para agregar a pantalla de inicio.";
    }
  }
  // Verificar si el navegador soporta PWA
  isPwaSupported() {
    return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  }
  // Obtener información del navegador
  getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = "Unknown";
    let browserVersion = "Unknown";
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
      browserName = "Chrome";
      const match = userAgent.match(/Chrome\/(\d+)/);
      browserVersion = match ? match[1] : "Unknown";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
      browserName = "Safari";
      const match = userAgent.match(/Version\/(\d+)/);
      browserVersion = match ? match[1] : "Unknown";
    } else if (userAgent.includes("Firefox")) {
      browserName = "Firefox";
      const match = userAgent.match(/Firefox\/(\d+)/);
      browserVersion = match ? match[1] : "Unknown";
    } else if (userAgent.includes("Edg")) {
      browserName = "Edge";
      const match = userAgent.match(/Edg\/(\d+)/);
      browserVersion = match ? match[1] : "Unknown";
    }
    return { name: browserName, version: browserVersion, isMobile };
  }
  // Mostrar información de debug
  getDebugInfo() {
    return {
      isStandalone: this.isStandalone(),
      canInstall: this.canInstall(),
      isPwaSupported: this.isPwaSupported(),
      browser: this.getBrowserInfo(),
      userAgent: navigator.userAgent,
      platform: this.platform.platforms()
    };
  }
};
_PwaInstallService.\u0275fac = function PwaInstallService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PwaInstallService)(\u0275\u0275inject(Platform));
};
_PwaInstallService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PwaInstallService, factory: _PwaInstallService.\u0275fac, providedIn: "root" });
var PwaInstallService = _PwaInstallService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PwaInstallService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: Platform }], null);
})();

// src/app/core/components/pwa-install-banner/pwa-install-banner.component.ts
function PwaInstallBannerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "ion-card")(2, "ion-card-content")(3, "div", 2)(4, "div", 3)(5, "h3");
    \u0275\u0275text(6, "Instalar aplicaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Agrega esta aplicaci\xF3n a tu pantalla de inicio para un acceso m\xE1s r\xE1pido");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 4)(10, "ion-button", 5);
    \u0275\u0275listener("click", function PwaInstallBannerComponent_div_0_Template_ion_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissBanner());
    });
    \u0275\u0275element(11, "ion-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "ion-button", 7);
    \u0275\u0275listener("click", function PwaInstallBannerComponent_div_0_Template_ion_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.installPWA());
    });
    \u0275\u0275text(13, " Instalar ");
    \u0275\u0275elementEnd()()()()()();
  }
}
var _PwaInstallBannerComponent = class _PwaInstallBannerComponent {
  constructor(pwaIosService, pwaInstallService) {
    this.pwaIosService = pwaIosService;
    this.pwaInstallService = pwaInstallService;
    this.showBanner = false;
  }
  ngOnInit() {
    this.checkPWAInstallation();
    window.addEventListener("beforeinstallprompt", this.handleBeforeInstallPrompt.bind(this));
  }
  ngOnDestroy() {
    window.removeEventListener("beforeinstallprompt", this.handleBeforeInstallPrompt.bind(this));
  }
  checkPWAInstallation() {
    if (this.pwaInstallService.isStandalone()) {
      this.showBanner = false;
      return;
    }
    if (!this.pwaInstallService.isPwaSupported()) {
      this.showBanner = false;
      return;
    }
    const dismissed = localStorage.getItem("pwa-banner-dismissed");
    if (dismissed) {
      this.showBanner = false;
      return;
    }
    setTimeout(() => {
      this.showBanner = true;
    }, 3e3);
  }
  handleBeforeInstallPrompt(e) {
    e.preventDefault();
    this.deferredPrompt = e;
  }
  installPWA() {
    return __async(this, null, function* () {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        const { outcome } = yield this.deferredPrompt.userChoice;
        if (outcome === "accepted") {
          console.log("Usuario acept\xF3 instalar la PWA");
        }
        this.deferredPrompt = null;
        this.showBanner = false;
      } else {
        this.showInstallInstructions();
      }
    });
  }
  dismissBanner() {
    this.showBanner = false;
    localStorage.setItem("pwa-banner-dismissed", "true");
  }
  showInstallInstructions() {
    const instructions = this.pwaInstallService.getInstallInstructions();
    alert(instructions);
  }
};
_PwaInstallBannerComponent.\u0275fac = function PwaInstallBannerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PwaInstallBannerComponent)(\u0275\u0275directiveInject(PwaIosService), \u0275\u0275directiveInject(PwaInstallService));
};
_PwaInstallBannerComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PwaInstallBannerComponent, selectors: [["app-pwa-install-banner"]], decls: 1, vars: 1, consts: [["class", "pwa-banner", 4, "ngIf"], [1, "pwa-banner"], [1, "banner-content"], [1, "banner-text"], [1, "banner-actions"], ["fill", "clear", 3, "click"], ["name", "close", "slot", "icon-only"], [3, "click"]], template: function PwaInstallBannerComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, PwaInstallBannerComponent_div_0_Template, 14, 0, "div", 0);
  }
  if (rf & 2) {
    \u0275\u0275property("ngIf", ctx.showBanner);
  }
}, dependencies: [CommonModule, NgIf, IonicModule, IonButton, IonCard, IonCardContent, IonIcon], styles: ["\n\n.banner-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n.banner-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 16px;\n  font-weight: 600;\n}\n.banner-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  opacity: 0.8;\n}\n.banner-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n/*# sourceMappingURL=pwa-install-banner.component.css.map */"] });
var PwaInstallBannerComponent = _PwaInstallBannerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PwaInstallBannerComponent, [{
    type: Component,
    args: [{ selector: "app-pwa-install-banner", standalone: true, imports: [CommonModule, IonicModule], template: `
    <div *ngIf="showBanner" class="pwa-banner">
      <ion-card>
        <ion-card-content>
          <div class="banner-content">
            <div class="banner-text">
              <h3>Instalar aplicaci\xF3n</h3>
              <p>Agrega esta aplicaci\xF3n a tu pantalla de inicio para un acceso m\xE1s r\xE1pido</p>
            </div>
            <div class="banner-actions">
              <ion-button fill="clear" (click)="dismissBanner()">
                <ion-icon name="close" slot="icon-only"></ion-icon>
              </ion-button>
              <ion-button (click)="installPWA()">
                Instalar
              </ion-button>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </div>
  `, styles: ["/* angular:styles/component:scss;b7f8830ba423904e1de3deb6fbeeb71a51a37c1650db33f4527524233312d88f;C:/Users/adria/gestion-avisos-web-app/src/app/core/components/pwa-install-banner/pwa-install-banner.component.ts */\n.banner-content {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n.banner-text h3 {\n  margin: 0 0 4px 0;\n  font-size: 16px;\n  font-weight: 600;\n}\n.banner-text p {\n  margin: 0;\n  font-size: 14px;\n  opacity: 0.8;\n}\n.banner-actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n/*# sourceMappingURL=pwa-install-banner.component.css.map */\n"] }]
  }], () => [{ type: PwaIosService }, { type: PwaInstallService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PwaInstallBannerComponent, { className: "PwaInstallBannerComponent", filePath: "src/app/core/components/pwa-install-banner/pwa-install-banner.component.ts", lineNumber: 60 });
})();

// src/app/core/services/pwa-update.service.ts
var _PwaUpdateService = class _PwaUpdateService {
  constructor(swUpdate, alertController, toastController) {
    this.swUpdate = swUpdate;
    this.alertController = alertController;
    this.toastController = toastController;
    this.checkForUpdates();
  }
  checkForUpdates() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      setInterval(() => {
        this.swUpdate.checkForUpdate();
      }, 30 * 60 * 1e3);
      this.swUpdate.versionUpdates.pipe(filter((event) => event.type === "VERSION_READY")).subscribe(() => {
        this.promptUser();
      });
      this.swUpdate.versionUpdates.pipe(filter((event) => event.type === "VERSION_INSTALLATION_FAILED")).subscribe(() => {
        this.showError();
      });
      this.swUpdate.versionUpdates.pipe(filter((event) => event.type === "VERSION_DETECTED")).subscribe(() => {
        console.log("Nueva versi\xF3n detectada");
      });
    }
  }
  promptUser() {
    return __async(this, null, function* () {
      const alert2 = yield this.alertController.create({
        header: "Nueva versi\xF3n disponible",
        message: "Hay una nueva versi\xF3n de la aplicaci\xF3n disponible. \xBFDeseas actualizar ahora?",
        buttons: [
          {
            text: "M\xE1s tarde",
            role: "cancel"
          },
          {
            text: "Actualizar",
            handler: () => {
              this.activateUpdate();
            }
          }
        ]
      });
      yield alert2.present();
    });
  }
  showError() {
    return __async(this, null, function* () {
      const toast = yield this.toastController.create({
        message: "Error al actualizar la aplicaci\xF3n",
        duration: 3e3,
        position: "bottom",
        color: "danger"
      });
      yield toast.present();
    });
  }
  activateUpdate() {
    this.swUpdate.activateUpdate().then(() => {
      window.location.reload();
    });
  }
  // Método público para verificar actualizaciones manualmente
  checkForUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then(() => {
        console.log("Verificando actualizaciones...");
      });
    }
  }
  // Método para forzar la actualización sin preguntar al usuario
  forceUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.activateUpdate().then(() => {
        window.location.reload();
      });
    }
  }
  // Método para limpiar el cache del Service Worker
  clearCache() {
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
        console.log("Cache limpiado");
        window.location.reload();
      });
    }
  }
};
_PwaUpdateService.\u0275fac = function PwaUpdateService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PwaUpdateService)(\u0275\u0275inject(SwUpdate), \u0275\u0275inject(AlertController), \u0275\u0275inject(ToastController));
};
_PwaUpdateService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PwaUpdateService, factory: _PwaUpdateService.\u0275fac, providedIn: "root" });
var PwaUpdateService = _PwaUpdateService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PwaUpdateService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SwUpdate }, { type: AlertController }, { type: ToastController }], null);
})();

// src/app/core/services/performance-fix.service.ts
var _PerformanceFixService = class _PerformanceFixService {
  constructor(cacheService) {
    this.cacheService = cacheService;
    this.cleanupInterval = setInterval(() => {
      this.performCleanup();
    }, 3e4);
  }
  /**
   * Realiza limpieza preventiva para mantener el rendimiento
   */
  performCleanup() {
    this.cacheService.clearAllDataCache();
    this.cleanupTemporaryElements();
    this.forceGarbageCollection();
  }
  /**
   * Limpia elementos temporales del DOM
   */
  cleanupTemporaryElements() {
    try {
      const tempElements = document.querySelectorAll("[data-temp], [data-temp-listener]");
      tempElements.forEach((el) => el.remove());
      const tempClassElements = document.querySelectorAll(".temp-element, .temp-listener");
      tempClassElements.forEach((el) => el.remove());
    } catch (error) {
    }
  }
  /**
   * Fuerza la recolección de basura si está disponible
   */
  forceGarbageCollection() {
    if ("gc" in window) {
      try {
        window.gc();
      } catch (error) {
      }
    }
  }
  /**
   * Fuerza una limpieza inmediata (útil cuando se detecta lentitud)
   */
  forceCleanup() {
    this.performCleanup();
  }
  ngOnDestroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
};
_PerformanceFixService.\u0275fac = function PerformanceFixService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PerformanceFixService)(\u0275\u0275inject(CacheService));
};
_PerformanceFixService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PerformanceFixService, factory: _PerformanceFixService.\u0275fac, providedIn: "root" });
var PerformanceFixService = _PerformanceFixService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PerformanceFixService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: CacheService }], null);
})();

// src/app/app.component.ts
var _AppComponent = class _AppComponent {
  constructor(pwaUpdateService, pwaIosService, viewportService, authService, performanceFix) {
    this.pwaUpdateService = pwaUpdateService;
    this.pwaIosService = pwaIosService;
    this.viewportService = viewportService;
    this.authService = authService;
    this.performanceFix = performanceFix;
  }
  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      console.log("Estado de autenticaci\xF3n:", isAuthenticated);
    });
    if (!this.isDevMode()) {
      setInterval(() => {
        this.performanceFix.forceCleanup();
      }, 2 * 60 * 1e3);
    }
  }
  /**
   * Verifica si estamos en modo desarrollo
   */
  isDevMode() {
    return !environment.production;
  }
};
_AppComponent.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AppComponent)(\u0275\u0275directiveInject(PwaUpdateService), \u0275\u0275directiveInject(PwaIosService), \u0275\u0275directiveInject(ViewportService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(PerformanceFixService));
};
_AppComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-app");
    \u0275\u0275element(1, "ion-router-outlet")(2, "app-pwa-install-banner");
    \u0275\u0275elementEnd();
  }
}, dependencies: [IonApp, IonRouterOutlet, PwaInstallBannerComponent], encapsulation: 2 });
var AppComponent = _AppComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", imports: [IonApp, IonRouterOutlet, PwaInstallBannerComponent], template: "<ion-app>\r\n  <ion-router-outlet></ion-router-outlet>\r\n  <app-pwa-install-banner></app-pwa-install-banner>\r\n</ion-app>\r\n" }]
  }], () => [{ type: PwaUpdateService }, { type: PwaIosService }, { type: ViewportService }, { type: AuthService }, { type: PerformanceFixService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 16 });
})();

// src/app/core/interceptors/performance.interceptor.ts
var requestCount = 0;
var MAX_CONCURRENT_REQUESTS = 5;
var REQUEST_TIMEOUT = 3e4;
function PerformanceInterceptor(request, next) {
  const performanceFix = inject(PerformanceFixService);
  requestCount++;
  if (requestCount > MAX_CONCURRENT_REQUESTS) {
    performanceFix.forceCleanup();
    requestCount = 0;
  }
  return next(request).pipe(timeout(REQUEST_TIMEOUT), catchError((error) => {
    requestCount--;
    if (error.name === "TimeoutError") {
      performanceFix.forceCleanup();
    }
    return throwError(() => error);
  }), switchMap((event) => {
    requestCount--;
    return [event];
  }));
}

// src/app/core/config/production.config.ts
var ProductionConfig = class {
  static initialize() {
    if (environment.production) {
      this.disableConsoleLogs();
      this.setupErrorHandling();
      this.optimizePerformance();
    }
  }
  static disableConsoleLogs() {
    const originalLog = console.log;
    const originalDebug = console.debug;
    const originalInfo = console.info;
    const originalWarn = console.warn;
    const originalError = console.error;
    console.log = () => {
    };
    console.debug = () => {
    };
    console.info = () => {
    };
    console.warn = () => {
    };
    console.error = (...args) => {
      const message = args[0];
      if (typeof message === "string" && (message.includes("ERROR") || message.includes("CRITICAL") || message.includes("FATAL"))) {
        originalError(...args);
      }
    };
    console.clear();
  }
  static setupErrorHandling() {
    window.addEventListener("error", (event) => {
      if (event.error && event.error.message && event.error.message.includes("CRITICAL")) {
        console.error("Error cr\xEDtico:", event.error);
      }
    });
    window.addEventListener("unhandledrejection", (event) => {
      if (event.reason && event.reason.message && event.reason.message.includes("CRITICAL")) {
        console.error("Promesa rechazada cr\xEDtica:", event.reason);
      }
    });
  }
  static optimizePerformance() {
    if (window.performance && window.performance.getEntriesByType) {
      const originalGetEntries = window.performance.getEntriesByType;
      window.performance.getEntriesByType = (type) => {
        if (type === "navigation" || type === "resource") {
          return originalGetEntries.call(window.performance, type);
        }
        return [];
      };
    }
  }
};

// src/app/core/config/logging.config.ts
var LoggingConfig = class {
  static initialize() {
    if (environment.production) {
      this.setupProductionLogging();
    } else {
      this.setupDevelopmentLogging();
    }
  }
  static setupProductionLogging() {
    const noop = () => {
    };
    console.log = noop;
    console.debug = noop;
    console.info = noop;
    console.warn = noop;
    const originalError = console.error;
    console.error = (...args) => {
      const message = args[0];
      if (typeof message === "string" && (message.includes("ERROR") || message.includes("CRITICAL") || message.includes("FATAL"))) {
        originalError(...args);
      }
    };
    console.clear();
    if (window.performance && window.performance.getEntriesByType) {
      const originalGetEntries = window.performance.getEntriesByType;
      window.performance.getEntriesByType = (type) => {
        if (type === "navigation" || type === "resource") {
          return originalGetEntries.call(window.performance, type);
        }
        return [];
      };
    }
    window.addEventListener("error", (event) => {
      if (event.error && event.error.message && event.error.message.includes("CRITICAL")) {
        console.error("Error cr\xEDtico:", event.error);
      }
    });
    window.addEventListener("unhandledrejection", (event) => {
      if (event.reason && event.reason.message && event.reason.message.includes("CRITICAL")) {
        console.error("Promesa rechazada cr\xEDtica:", event.reason);
      }
    });
  }
  static setupDevelopmentLogging() {
    console.log("\u{1F6E0}\uFE0F Modo desarrollo: Logging habilitado");
    console.debug("\u{1F50D} Debug habilitado");
    console.info("\u2139\uFE0F Info habilitado");
    console.warn("\u26A0\uFE0F Warning habilitado");
    console.error("\u274C Error habilitado");
  }
};

// src/main.ts
if (environment.production) {
  enableProdMode();
  ProductionConfig.initialize();
  LoggingConfig.initialize();
  console.clear();
  console.log = () => {
  };
  console.debug = () => {
  };
  console.info = () => {
  };
  console.warn = () => {
  };
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === "string" && (args[0].includes("ERROR") || args[0].includes("CRITICAL") || args[0].includes("FATAL"))) {
      originalError(...args);
    }
  };
}
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([PerformanceInterceptor])),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000"
    })
  ]
});
/*! Bundled license information:

@angular/service-worker/fesm2022/service-worker.mjs:
  (**
   * @license Angular v19.2.14
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
  (*!
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.dev/license
   *)
*/
//# sourceMappingURL=main.js.map
