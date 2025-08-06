import{a as V}from"./chunk-57CCKAHA.js";import{a as W}from"./chunk-AXRRPIFT.js";import{a as Se,b as xe,c as Ee,e as ye,g as Pe,i as Ae,j as Me}from"./chunk-CENH7PAC.js";import{a as we,b as be,g as Ie}from"./chunk-HRZTQKZO.js";import{a as Ce}from"./chunk-EZQHEP6E.js";import{$ as ie,B as p,D as X,E as c,F as P,G as ee,Gc as ve,I as N,J as R,M as te,Na as se,O as ne,Ta as ce,V as d,X as k,Ya as le,_a as pe,a as _,b as D,ba as oe,bb as de,ca as j,e as Y,ea as re,eb as ue,f as $,fb as me,ha as f,i as m,ia as g,ib as he,ja as T,jb as fe,kb as ge,n as w,na as ae,o as h,oa as F,oc as O,p as J,pa as B,r as b,v as y,xa as U,y as I,z as Q}from"./chunk-YCXETNVK.js";import"./chunk-WSRQKSRN.js";import"./chunk-QUJFQN2Y.js";import"./chunk-K4IZC2RK.js";import"./chunk-XEKAQYZJ.js";import"./chunk-3PHZVRGI.js";import"./chunk-67GB35HJ.js";import"./chunk-3RJWN2F5.js";import"./chunk-2ELISCRH.js";import"./chunk-MSFXF37Z.js";import"./chunk-55RMRGVQ.js";import"./chunk-G2E2NLL6.js";import"./chunk-CFQAPMCR.js";import"./chunk-CW65YK7W.js";import"./chunk-LBMIQEU6.js";import"./chunk-WI5MSH4N.js";import"./chunk-VAE5WQLH.js";import"./chunk-CKP3SGE2.js";import"./chunk-I2N4S4X5.js";import"./chunk-CALWKLRW.js";import"./chunk-IQN6SQ4S.js";import"./chunk-SGF4SMHT.js";import"./chunk-QXK7JUJJ.js";import"./chunk-JCSW2JUV.js";import"./chunk-4U6PRYVA.js";import"./chunk-FXFZIWDD.js";import"./chunk-CSG5OQLY.js";import"./chunk-VMHM3MLJ.js";import"./chunk-2MILALDA.js";import"./chunk-C5RQ2IC2.js";import"./chunk-42C7ZIID.js";import{a as Z,j as E,k as u}from"./chunk-CRC5ZNR6.js";var L="Service workers are disabled or not supported by this browser",C=class{serviceWorker;worker;registration;events;constructor(t,s){if(this.serviceWorker=t,!t)this.worker=this.events=this.registration=new _(e=>e.error(new I(5601,!1)));else{let e=null,n=new D;this.worker=new _(l=>(e!==null&&l.next(e),n.subscribe(v=>l.next(v))));let o=()=>{let{controller:l}=t;l!==null&&(e=l,n.next(e))};t.addEventListener("controllerchange",o),o(),this.registration=this.worker.pipe(y(()=>t.getRegistration()));let a=new D;this.events=a.asObservable();let r=l=>{let{data:v}=l;v!=null&&v.type&&a.next(v)};t.addEventListener("message",r);let x=s==null?void 0:s.get(j,null,{optional:!0});x==null||x.onDestroy(()=>{t.removeEventListener("controllerchange",o),t.removeEventListener("message",r)})}}postMessage(t,s){return new Promise(e=>{this.worker.pipe(b(1)).subscribe(n=>{n.postMessage(Z({action:t},s)),e()})})}postMessageWithOperation(t,s,e){let n=this.waitForOperationCompleted(e),o=this.postMessage(t,s);return Promise.all([o,n]).then(([,a])=>a)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(t){let s;return typeof t=="string"?s=e=>e.type===t:s=e=>t.includes(e.type),this.events.pipe(h(s))}nextEventOfType(t){return this.eventsOfType(t).pipe(b(1))}waitForOperationCompleted(t){return new Promise((s,e)=>{this.eventsOfType("OPERATION_COMPLETED").pipe(h(n=>n.nonce===t),b(1),m(n=>{if(n.result!==void 0)return n.result;throw new Error(n.error)})).subscribe({next:s,error:e})})}get isEnabled(){return!!this.serviceWorker}},je=(()=>{let t=class t{sw;messages;notificationClicks;subscription;get isEnabled(){return this.sw.isEnabled}pushManager=null;subscriptionChanges=new D;constructor(e){if(this.sw=e,!e.isEnabled){this.messages=w,this.notificationClicks=w,this.subscription=w;return}this.messages=this.sw.eventsOfType("PUSH").pipe(m(o=>o.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(m(o=>o.data)),this.pushManager=this.sw.registration.pipe(m(o=>o.pushManager));let n=this.pushManager.pipe(y(o=>o.getSubscription()));this.subscription=new _(o=>{let a=n.subscribe(o),r=this.subscriptionChanges.subscribe(o);return()=>{a.unsubscribe(),r.unsubscribe()}})}requestSubscription(e){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(L));let n={userVisibleOnly:!0},o=this.decodeBase64(e.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),a=new Uint8Array(new ArrayBuffer(o.length));for(let r=0;r<o.length;r++)a[r]=o.charCodeAt(r);return n.applicationServerKey=a,new Promise((r,x)=>{this.pushManager.pipe(y(l=>l.subscribe(n)),b(1)).subscribe({next:l=>{this.subscriptionChanges.next(l),r(l)},error:x})})}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(L));let e=n=>{if(n===null)throw new I(5602,!1);return n.unsubscribe().then(o=>{if(!o)throw new I(5603,!1);this.subscriptionChanges.next(null)})};return new Promise((n,o)=>{this.subscription.pipe(b(1),y(e)).subscribe({next:n,error:o})})}decodeBase64(e){return atob(e)}};E(t,"\u0275fac",function(n){return new(n||t)(c(C))}),E(t,"\u0275prov",p({token:t,factory:t.\u0275fac}));let i=t;return i})(),z=(()=>{let t=class t{sw;versionUpdates;unrecoverable;get isEnabled(){return this.sw.isEnabled}constructor(e){if(this.sw=e,!e.isEnabled){this.versionUpdates=w,this.unrecoverable=w;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(L));let e=this.sw.generateNonce();return this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:e},e)}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new I(5601,!1));let e=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:e},e)}};E(t,"\u0275fac",function(n){return new(n||t)(c(C))}),E(t,"\u0275prov",p({token:t,factory:t.\u0275fac}));let i=t;return i})();var De=new X("");function Fe(){let i=P(A);if(!("serviceWorker"in navigator&&i.enabled!==!1))return;let t=P(De),s=P(ne),e=P(j);s.runOutsideAngular(()=>{let n=navigator.serviceWorker,o=()=>{var a;return(a=n.controller)==null?void 0:a.postMessage({action:"INITIALIZE"})};n.addEventListener("controllerchange",o),e.onDestroy(()=>{n.removeEventListener("controllerchange",o)})}),s.runOutsideAngular(()=>{let n,{registrationStrategy:o}=i;if(typeof o=="function")n=new Promise(a=>o().subscribe(()=>a()));else{let[a,...r]=(o||"registerWhenStable:30000").split(":");switch(a){case"registerImmediately":n=Promise.resolve();break;case"registerWithDelay":n=_e(+r[0]||0);break;case"registerWhenStable":n=Promise.race([e.whenStable(),_e(+r[0])]);break;default:throw new I(5600,!1)}}n.then(()=>{e.destroyed||navigator.serviceWorker.register(t,{scope:i.scope}).catch(a=>console.error(Q(5604,!1)))})})}function _e(i){return new Promise(t=>setTimeout(t,i))}function Be(i,t){return new C(i.enabled!==!1?navigator.serviceWorker:void 0,t)}var A=class{enabled;scope;registrationStrategy};function ke(i,t={}){return ee([je,z,{provide:De,useValue:i},{provide:A,useValue:t},{provide:C,useFactory:Be,deps:[A,te]},oe(Fe)])}var Te=(()=>{let t=class t{constructor(e,n){this.authService=e,this.router=n}canActivate(){return console.log("\u{1F680} AuthGuard: canActivate() llamado"),Y(this.checkAuthStatus()).pipe(m(e=>(console.log("\u{1F680} AuthGuard: Resultado de checkAuthStatus:",e),e?(console.log("\u{1F680} AuthGuard: Permitiendo acceso"),!0):(console.log("\u{1F680} AuthGuard: Redirigiendo a login"),this.router.createUrlTree(["/auth/login"])))),J(e=>(console.error("\u274C AuthGuard: Error en canActivate:",e),$(this.router.createUrlTree(["/auth/login"])))))}checkAuthStatus(){return u(this,null,function*(){try{console.log("\u{1F50D} AuthGuard: Verificaci\xF3n r\xE1pida de autenticaci\xF3n");let e=yield this.authService.getToken();if(console.log("\u{1F50D} AuthGuard: Token obtenido:",e?"S\xCD":"NO"),!e)return console.log("\u{1F50D} AuthGuard: No hay token, redirigiendo a login"),!1;if(this.authService.getCurrentUser())return console.log("\u{1F50D} AuthGuard: Usuario ya cargado, acceso inmediato"),!0;console.log("\u{1F50D} AuthGuard: Cargando usuario b\xE1sico...");let{data:{session:o}}=yield this.authService.getCurrentSession();return o!=null&&o.user?(yield this.authService.loadUserData(o.user.id),console.log("\u{1F50D} AuthGuard: Usuario b\xE1sico cargado, permitiendo acceso"),!0):(console.log("\u{1F50D} AuthGuard: No hay sesi\xF3n v\xE1lida"),!1)}catch(e){return console.error("\u274C AuthGuard: Error en verificaci\xF3n r\xE1pida:",e),!1}})}};t.\u0275fac=function(n){return new(n||t)(c(V),c(me))},t.\u0275prov=p({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();var Ue=[{path:"auth",children:[{path:"login",loadComponent:()=>import("./chunk-D66OQXPI.js").then(i=>i.LoginComponent)},{path:"register",loadComponent:()=>import("./chunk-LO2OENVP.js").then(i=>i.RegisterComponent)},{path:"",redirectTo:"login",pathMatch:"full"}]},{path:"",loadComponent:()=>import("./chunk-Z55GWA7M.js").then(i=>i.MainLayoutComponent),canActivate:[Te],children:[{path:"home",loadComponent:()=>import("./chunk-MCE5KGO2.js").then(i=>i.HomePage)},{path:"avisos",loadComponent:()=>import("./chunk-5U7CYOOW.js").then(i=>i.AvisosComponent)},{path:"historial",loadComponent:()=>import("./chunk-M5UK43SR.js").then(i=>i.HistorialComponent)},{path:"inventario",loadComponent:()=>import("./chunk-YV2NB5RP.js").then(i=>i.InventarioComponent)},{path:"facturas",loadComponent:()=>import("./chunk-SNYFEH5X.js").then(i=>i.FacturasComponent)},{path:"facturas/:id",loadComponent:()=>import("./chunk-Z6S2PYUX.js").then(i=>i.VerFacturaComponent)},{path:"presupuestos",loadComponent:()=>import("./chunk-YLPBLHNX.js").then(i=>i.PresupuestosComponent)},{path:"presupuestos/crear",loadComponent:()=>import("./chunk-CMA7MYRF.js").then(i=>i.CrearPresupuestoComponent)},{path:"presupuestos/:id",loadComponent:()=>import("./chunk-JPNCEGWY.js").then(i=>i.VerPresupuestoComponent)},{path:"clientes",loadComponent:()=>import("./chunk-RCQSDH74.js").then(i=>i.ClientesComponent)},{path:"tecnicos",loadComponent:()=>import("./chunk-7U7PYUBA.js").then(i=>i.TecnicosComponent)},{path:"cuenta",loadComponent:()=>import("./chunk-DVXFHYLZ.js").then(i=>i.MiCuentaComponent)},{path:"ajustes",loadComponent:()=>import("./chunk-B6JCNXJD.js").then(i=>i.AjustesComponent)},{path:"crear-factura",loadComponent:()=>import("./chunk-C3YINGBW.js").then(i=>i.CrearFacturaComponent)},{path:"ver-aviso/:id-aviso",loadComponent:()=>import("./chunk-3S2YG2OP.js").then(i=>i.VerAvisosComponent)},{path:"",redirectTo:"home",pathMatch:"full"}]},{path:"**",redirectTo:"auth/login"}];var M=(()=>{let t=class t{constructor(e){this.platform=e,this.initializeMobilePWA()}initializeMobilePWA(){(this.platform.is("ios")||this.platform.is("android"))&&this.setupMobilePWA()}setupMobilePWA(){document.addEventListener("gesturestart",e=>{e.preventDefault()}),document.addEventListener("touchend",e=>{let n=Date.now(),o=window.lastTouch||0,a=n-o;a<500&&a>0&&e.preventDefault(),window.lastTouch=n}),this.setupViewport(),this.addMobileStyles()}setupViewport(){let e=document.querySelector('meta[name="viewport"]');if(e){let n=["viewport-fit=cover","width=device-width","initial-scale=1.0","minimum-scale=1.0","maximum-scale=1.0","user-scalable=no"].join(", ");e.setAttribute("content",n)}}addMobileStyles(){let e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}showIOSInstallInstructions(){window.navigator.standalone===!0||alert(`
        Para instalar esta aplicaci\xF3n en tu iPhone:
        
        1. Toca el bot\xF3n compartir (\u25A1\u2191) en Safari
        2. Despl\xE1zate hacia abajo y toca "Agregar a pantalla de inicio"
        3. Toca "Agregar"
        
        La aplicaci\xF3n aparecer\xE1 en tu pantalla de inicio como una app nativa.
      `)}isStandalone(){return window.navigator.standalone===!0||window.matchMedia("(display-mode: standalone)").matches}getSafeAreaInfo(){return{top:this.getComputedValue("env(safe-area-inset-top)"),bottom:this.getComputedValue("env(safe-area-inset-bottom)"),left:this.getComputedValue("env(safe-area-inset-left)"),right:this.getComputedValue("env(safe-area-inset-right)")}}getComputedValue(e){let n=document.createElement("div");n.style.position="absolute",n.style.visibility="hidden",n.style[e]=e,document.body.appendChild(n);let o=getComputedStyle(n)[e];return document.body.removeChild(n),o||"0px"}};t.\u0275fac=function(n){return new(n||t)(c(O))},t.\u0275prov=p({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();var q=(()=>{let t=class t{constructor(e){this.platform=e}canInstall(){return"serviceWorker"in navigator&&"PushManager"in window&&this.isStandalone()===!1}isStandalone(){return window.navigator.standalone===!0||window.matchMedia("(display-mode: standalone)").matches}getInstallInstructions(){let e=navigator.userAgent.toLowerCase();return this.platform.is("ios")?`Para instalar en iOS:
1. Toca el bot\xF3n compartir (\u25A1\u2191)
2. Selecciona "Agregar a pantalla de inicio"
3. Toca "Agregar"`:this.platform.is("android")?`Para instalar en Android:
1. Toca el men\xFA (\u22EE)
2. Selecciona "Agregar a pantalla de inicio"
3. Toca "Agregar"`:e.includes("chrome")?`Para instalar en Chrome:
1. Busca el \xEDcono de instalaci\xF3n (\u2B07\uFE0F) en la barra de direcciones
2. Haz clic en "Instalar"`:e.includes("edge")?`Para instalar en Edge:
1. Busca el \xEDcono de instalaci\xF3n (\u2B07\uFE0F) en la barra de direcciones
2. Haz clic en "Instalar"`:e.includes("safari")&&!e.includes("chrome")?`Para instalar en Safari:
1. Ve a Archivo > Agregar a pantalla de inicio
2. La app aparecer\xE1 en tu Launchpad`:`Para instalar la aplicaci\xF3n:
Busca el \xEDcono de instalaci\xF3n en tu navegador o usa las opciones del men\xFA para agregar a pantalla de inicio.`}isPwaSupported(){return"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window}getBrowserInfo(){let e=navigator.userAgent,n="Unknown",o="Unknown",a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e);if(e.includes("Chrome")&&!e.includes("Edg")){n="Chrome";let r=e.match(/Chrome\/(\d+)/);o=r?r[1]:"Unknown"}else if(e.includes("Safari")&&!e.includes("Chrome")){n="Safari";let r=e.match(/Version\/(\d+)/);o=r?r[1]:"Unknown"}else if(e.includes("Firefox")){n="Firefox";let r=e.match(/Firefox\/(\d+)/);o=r?r[1]:"Unknown"}else if(e.includes("Edg")){n="Edge";let r=e.match(/Edg\/(\d+)/);o=r?r[1]:"Unknown"}return{name:n,version:o,isMobile:a}}getDebugInfo(){return{isStandalone:this.isStandalone(),canInstall:this.canInstall(),isPwaSupported:this.isPwaSupported(),browser:this.getBrowserInfo(),userAgent:navigator.userAgent,platform:this.platform.platforms()}}};t.\u0275fac=function(n){return new(n||t)(c(O))},t.\u0275prov=p({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();function ze(i,t){if(i&1){let s=ae();f(0,"div",1)(1,"ion-card")(2,"ion-card-content")(3,"div",2)(4,"div",3)(5,"h3"),U(6,"Instalar aplicaci\xF3n"),g(),f(7,"p"),U(8,"Agrega esta aplicaci\xF3n a tu pantalla de inicio para un acceso m\xE1s r\xE1pido"),g()(),f(9,"div",4)(10,"ion-button",5),F("click",function(){N(s);let n=B();return R(n.dismissBanner())}),T(11,"ion-icon",6),g(),f(12,"ion-button",7),F("click",function(){N(s);let n=B();return R(n.installPWA())}),U(13," Instalar "),g()()()()()()}}var Ve=(()=>{let t=class t{constructor(e,n){this.pwaIosService=e,this.pwaInstallService=n,this.showBanner=!1}ngOnInit(){this.checkPWAInstallation(),window.addEventListener("beforeinstallprompt",this.handleBeforeInstallPrompt.bind(this))}ngOnDestroy(){window.removeEventListener("beforeinstallprompt",this.handleBeforeInstallPrompt.bind(this))}checkPWAInstallation(){if(this.pwaInstallService.isStandalone()){this.showBanner=!1;return}if(!this.pwaInstallService.isPwaSupported()){this.showBanner=!1;return}if(localStorage.getItem("pwa-banner-dismissed")){this.showBanner=!1;return}setTimeout(()=>{this.showBanner=!0},3e3)}handleBeforeInstallPrompt(e){e.preventDefault(),this.deferredPrompt=e}installPWA(){return u(this,null,function*(){if(this.deferredPrompt){this.deferredPrompt.prompt();let{outcome:e}=yield this.deferredPrompt.userChoice;e==="accepted"&&console.log("Usuario acept\xF3 instalar la PWA"),this.deferredPrompt=null,this.showBanner=!1}else this.showInstallInstructions()})}dismissBanner(){this.showBanner=!1,localStorage.setItem("pwa-banner-dismissed","true")}showInstallInstructions(){let e=this.pwaInstallService.getInstallInstructions();alert(e)}};t.\u0275fac=function(n){return new(n||t)(d(M),d(q))},t.\u0275cmp=k({type:t,selectors:[["app-pwa-install-banner"]],decls:1,vars:1,consts:[["class","pwa-banner",4,"ngIf"],[1,"pwa-banner"],[1,"banner-content"],[1,"banner-text"],[1,"banner-actions"],["fill","clear",3,"click"],["name","close","slot","icon-only"],[3,"click"]],template:function(n,o){n&1&&ie(0,ze,14,0,"div",0),n&2&&re("ngIf",o.showBanner)},dependencies:[le,ce,Me,Se,xe,Ee,ye],styles:[".banner-content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:16px}.banner-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 4px;font-size:16px;font-weight:600}.banner-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:14px;opacity:.8}.banner-actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}"]});let i=t;return i})();var K=(()=>{let t=class t{constructor(e,n,o){this.swUpdate=e,this.alertController=n,this.toastController=o,this.checkForUpdates()}checkForUpdates(){this.swUpdate.isEnabled&&(this.swUpdate.checkForUpdate(),setInterval(()=>{this.swUpdate.checkForUpdate()},30*60*1e3),this.swUpdate.versionUpdates.pipe(h(e=>e.type==="VERSION_READY")).subscribe(()=>{this.promptUser()}),this.swUpdate.versionUpdates.pipe(h(e=>e.type==="VERSION_INSTALLATION_FAILED")).subscribe(()=>{this.showError()}),this.swUpdate.versionUpdates.pipe(h(e=>e.type==="VERSION_DETECTED")).subscribe(()=>{console.log("Nueva versi\xF3n detectada")}))}promptUser(){return u(this,null,function*(){yield(yield this.alertController.create({header:"Nueva versi\xF3n disponible",message:"Hay una nueva versi\xF3n de la aplicaci\xF3n disponible. \xBFDeseas actualizar ahora?",buttons:[{text:"M\xE1s tarde",role:"cancel"},{text:"Actualizar",handler:()=>{this.activateUpdate()}}]})).present()})}showError(){return u(this,null,function*(){yield(yield this.toastController.create({message:"Error al actualizar la aplicaci\xF3n",duration:3e3,position:"bottom",color:"danger"})).present()})}activateUpdate(){this.swUpdate.activateUpdate().then(()=>{window.location.reload()})}checkForUpdate(){this.swUpdate.isEnabled&&this.swUpdate.checkForUpdate().then(()=>{console.log("Verificando actualizaciones...")})}forceUpdate(){this.swUpdate.isEnabled&&this.swUpdate.activateUpdate().then(()=>{window.location.reload()})}clearCache(){"caches"in window&&caches.keys().then(e=>{e.forEach(n=>{caches.delete(n)}),console.log("Cache limpiado"),window.location.reload()})}};t.\u0275fac=function(n){return new(n||t)(c(z),c(Pe),c(Ae))},t.\u0275prov=p({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();var Re=(()=>{let t=class t{constructor(e,n,o,a){this.pwaUpdateService=e,this.pwaIosService=n,this.viewportService=o,this.authService=a}ngOnInit(){this.authService.isAuthenticated$.subscribe(e=>{console.log("Estado de autenticaci\xF3n:",e)})}};t.\u0275fac=function(n){return new(n||t)(d(K),d(M),d(W),d(V))},t.\u0275cmp=k({type:t,selectors:[["app-root"]],decls:3,vars:0,template:function(n,o){n&1&&(f(0,"ion-app"),T(1,"ion-router-outlet")(2,"app-pwa-install-banner"),g())},dependencies:[be,we,Ve],encapsulation:2});let i=t;return i})();Ce.production&&void 0;pe(Re,{providers:[{provide:ue,useClass:ve},Ie(),fe(Ue,ge(he)),de(),ke("ngsw-worker.js",{enabled:!se(),registrationStrategy:"registerWhenStable:30000"})]});
