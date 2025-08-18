import {
  RolesService,
  TipoRol
} from "./chunk-7DHOVE7F.js";
import {
  DataUpdateService
} from "./chunk-VHAQXQOQ.js";
import {
  MatIconModule,
  MatTableModule
} from "./chunk-776UXQBH.js";
import {
  add,
  addCircle,
  addCircleOutline,
  addIcons,
  alertCircle,
  alertCircleOutline,
  callOutline,
  checkmarkCircleOutline,
  close,
  closeOutline,
  constructOutline,
  ellipseOutline,
  eyeOutline,
  filterOutline,
  informationCircleOutline,
  locationOutline,
  lockClosedOutline,
  mailOutline,
  pauseCircle,
  peopleOutline,
  personOutline,
  playCircle,
  refreshOutline,
  saveOutline,
  searchOutline,
  shieldOutline
} from "./chunk-YLHOXAZF.js";
import "./chunk-HVSDGWD4.js";
import "./chunk-7DTAJMEV.js";
import {
  IonContent,
  IonIcon,
  ModalController
} from "./chunk-DJA56OJT.js";
import {
  BehaviorSubject,
  CommonModule,
  Component,
  DatePipe,
  DefaultValueAccessor,
  FormsModule,
  Injectable,
  Input,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  Subject,
  SupabaseClientService,
  catchError,
  debounceTime,
  distinctUntilChanged,
  from,
  map,
  of,
  setClassMetadata,
  takeUntil,
  throwError,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
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
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-KNQSF6OU.js";

// src/app/modules/tecnicos/services/tecnicos.service.ts
var _TecnicosService = class _TecnicosService {
  constructor(supabaseClientService, dataUpdateService) {
    this.supabaseClientService = supabaseClientService;
    this.dataUpdateService = dataUpdateService;
    this.tecnicosSubject = new BehaviorSubject([]);
    this.tecnicos$ = this.tecnicosSubject.asObservable();
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Obtiene la lista de técnicos con paginación y filtros
   */
  getTecnicos(pagina = 1, porPagina = 10, busqueda, ordenarPor, orden, soloActivos = false) {
    let query = this.supabase.from("usuarios").select(`
        *,
        rol:roles(*)
      `, { count: "exact" });
    if (busqueda) {
      query = query.or(`nombre_completo.ilike.%${busqueda}%,email.ilike.%${busqueda}%`);
    }
    if (soloActivos) {
      query = query.eq("es_activo", true);
    }
    const desde = (pagina - 1) * porPagina;
    query = query.range(desde, desde + porPagina - 1).order(ordenarPor || "fecha_creacion", { ascending: orden === "asc" });
    return from(query).pipe(map(({ data, error, count }) => {
      if (error)
        throw error;
      const tecnicos = data;
      this.tecnicosSubject.next(tecnicos);
      return {
        tecnicos,
        total: count || 0,
        pagina,
        por_pagina: porPagina
      };
    }), catchError((error) => {
      console.error("Error al obtener t\xE9cnicos:", error);
      throw error;
    }));
  }
  /**
   * Obtiene un técnico por su ID
   */
  getTecnico(id) {
    return from(this.supabase.from("usuarios").select(`
          *,
          rol:roles(*)
        `).eq("id", id).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Crea un nuevo técnico
   */
  crearTecnico(tecnico) {
    if (!this.validarDatosTecnico(tecnico)) {
      if (tecnico.id) {
        console.log("\u{1F527} T\xE9cnico ya existe, retornando datos existentes");
        return of(tecnico);
      }
      return throwError(() => new Error("Datos del t\xE9cnico no v\xE1lidos"));
    }
    console.log("\u{1F527} Iniciando creaci\xF3n de t\xE9cnico:", {
      email: tecnico.email,
      nombre: tecnico.nombre_completo,
      rol_id: tecnico.rol_id
    });
    return from(this.crearTecnicoConAuth(tecnico)).pipe(map(({ data, error }) => {
      var _a, _b, _c, _d, _e, _f;
      if (error) {
        console.error("\u274C Error en crearTecnico:", error);
        if ((_a = error.message) == null ? void 0 : _a.includes("Ya existe un usuario con este email")) {
          throw new Error("Ya existe un usuario con este email");
        } else if (error.code === "23505") {
          throw new Error("El usuario ya existe en el sistema");
        } else if ((_b = error.message) == null ? void 0 : _b.includes("Invalid login credentials")) {
          throw new Error("Credenciales inv\xE1lidas. Verifica el email y contrase\xF1a.");
        } else if ((_c = error.message) == null ? void 0 : _c.includes("Password should be at least 6 characters")) {
          throw new Error("La contrase\xF1a debe tener al menos 6 caracteres");
        } else if ((_d = error.message) == null ? void 0 : _d.includes("Unable to validate email address")) {
          throw new Error("El formato del email no es v\xE1lido");
        } else if ((_e = error.message) == null ? void 0 : _e.includes("Email not confirmed")) {
          throw new Error("El email necesita ser confirmado");
        } else if ((_f = error.message) == null ? void 0 : _f.includes("signup_disabled")) {
          throw new Error("El registro de nuevos usuarios est\xE1 deshabilitado");
        } else {
          throw error;
        }
      }
      if (!data) {
        throw new Error("No se pudo crear el t\xE9cnico - respuesta vac\xEDa");
      }
      console.log("\u2705 T\xE9cnico creado exitosamente:", data);
      const nuevoTecnico = data;
      const tecnicosActuales = this.tecnicosSubject.value;
      this.tecnicosSubject.next([nuevoTecnico, ...tecnicosActuales]);
      this.dataUpdateService.notifyCreated("tecnicos");
      return nuevoTecnico;
    }), catchError((error) => {
      console.error("\u274C Error final en crearTecnico:", error);
      throw error;
    }));
  }
  /**
   * Valida los datos del técnico antes de crear
   */
  validarDatosTecnico(tecnico) {
    var _a, _b, _c, _d;
    if (tecnico.id) {
      console.log("\u2705 T\xE9cnico ya creado, saltando validaci\xF3n de creaci\xF3n");
      return false;
    }
    if (!((_a = tecnico.nombre_completo) == null ? void 0 : _a.trim())) {
      console.error("\u274C Validaci\xF3n fallida: nombre_completo requerido");
      return false;
    }
    if (!((_b = tecnico.email) == null ? void 0 : _b.trim())) {
      console.error("\u274C Validaci\xF3n fallida: email requerido");
      return false;
    }
    if (!((_c = tecnico.password) == null ? void 0 : _c.trim())) {
      console.error("\u274C Validaci\xF3n fallida: password requerido");
      return false;
    }
    if (tecnico.password.length < 6) {
      console.error("\u274C Validaci\xF3n fallida: password debe tener al menos 6 caracteres");
      return false;
    }
    if (!((_d = tecnico.rol_id) == null ? void 0 : _d.trim())) {
      console.error("\u274C Validaci\xF3n fallida: rol_id requerido");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tecnico.email)) {
      console.error("\u274C Validaci\xF3n fallida: formato de email inv\xE1lido");
      return false;
    }
    console.log("\u2705 Validaci\xF3n de datos exitosa");
    return true;
  }
  /**
   * Crea un técnico con autenticación de Supabase
   */
  crearTecnicoConAuth(tecnico) {
    return __async(this, null, function* () {
      const timeoutMs = 3e4;
      try {
        console.log("\u{1F527} Paso 1: Verificando usuario existente...");
        const { data: existingUser, error: checkError } = yield this.supabase.from("usuarios").select("id, email").eq("email", tecnico.email).maybeSingle();
        if (checkError && checkError.code !== "PGRST116") {
          console.error("\u274C Error al verificar usuario existente:", checkError);
          return { data: null, error: checkError };
        }
        if (existingUser) {
          console.warn("\u26A0\uFE0F Usuario ya existe:", existingUser);
          return {
            data: null,
            error: new Error("Ya existe un usuario con este email")
          };
        }
        console.log("\u{1F527} Paso 2: Creando usuario en Supabase Auth...");
        const { data: authData, error: authError } = yield this.supabase.auth.signUp({
          email: tecnico.email,
          password: tecnico.password,
          options: {
            data: {
              nombre_completo: tecnico.nombre_completo,
              telefono: tecnico.telefono || null
            }
          }
        });
        if (authError) {
          console.error("\u274C Error al crear usuario en Auth:", authError);
          return { data: null, error: authError };
        }
        if (!authData.user) {
          console.error("\u274C No se recibi\xF3 usuario de Auth");
          return { data: null, error: new Error("No se pudo crear el usuario en Auth") };
        }
        console.log("\u2705 Usuario creado en Auth:", { id: authData.user.id, email: authData.user.email });
        return yield this.crearUsuarioEnBD(authData.user.id, tecnico);
      } catch (error) {
        console.error("\u274C Error general en crearTecnicoConAuth:", error);
        return { data: null, error };
      }
    });
  }
  /**
   * Crea el usuario en la base de datos con reintentos inteligentes
   */
  crearUsuarioEnBD(userId, tecnico) {
    return __async(this, null, function* () {
      var _a, _b;
      console.log("\u{1F527} Paso 3: Creando usuario en base de datos...");
      const maxReintentos = 5;
      const delayBase = 1500;
      let lastError = null;
      for (let intento = 1; intento <= maxReintentos; intento++) {
        try {
          console.log(`\u{1F527} Intento ${intento}/${maxReintentos}: Creando usuario en BD...`);
          if (intento > 1) {
            const delay = delayBase * intento;
            console.log(`\u23F1\uFE0F Esperando ${delay}ms antes del intento...`);
            yield new Promise((resolve) => setTimeout(resolve, delay));
          }
          const { data: usuarioExistente, error: checkError } = yield this.supabase.from("usuarios").select(`
            *,
            rol:roles(*)
          `).eq("id", userId).maybeSingle();
          if (usuarioExistente) {
            console.log("\u2705 Usuario ya existe en BD:", usuarioExistente);
            if (usuarioExistente.rol_id !== tecnico.rol_id) {
              console.log("\u{1F527} Actualizando rol del usuario existente...");
              const { data: usuarioActualizado, error: updateError } = yield this.supabase.from("usuarios").update({
                rol_id: tecnico.rol_id,
                nombre_completo: tecnico.nombre_completo,
                telefono: tecnico.telefono,
                fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
              }).eq("id", userId).select(`
                *,
                rol:roles(*)
              `).single();
              if (updateError) {
                console.warn("\u26A0\uFE0F Error al actualizar usuario, usando datos existentes:", updateError);
                return { data: usuarioExistente, error: null };
              }
              console.log("\u2705 Usuario actualizado exitosamente");
              return { data: usuarioActualizado, error: null };
            }
            return { data: usuarioExistente, error: null };
          }
          const tecnicoData = {
            id: userId,
            nombre_completo: tecnico.nombre_completo.trim(),
            email: tecnico.email.trim().toLowerCase(),
            telefono: ((_a = tecnico.telefono) == null ? void 0 : _a.trim()) || null,
            rol_id: tecnico.rol_id,
            es_activo: (_b = tecnico.es_activo) != null ? _b : true,
            fecha_creacion: (/* @__PURE__ */ new Date()).toISOString()
          };
          console.log("\u{1F527} Insertando usuario con datos:", tecnicoData);
          const { data, error } = yield this.supabase.from("usuarios").insert([tecnicoData]).select(`
            *,
            rol:roles(*)
          `).single();
          if (error) {
            lastError = error;
            console.error(`\u274C Error en intento ${intento}:`, error);
            if (error.code === "23505") {
              console.log("\u{1F527} Detectado duplicado, intentando obtener usuario existente...");
              const { data: duplicateUser } = yield this.supabase.from("usuarios").select(`
                *,
                rol:roles(*)
              `).eq("id", userId).single();
              if (duplicateUser) {
                console.log("\u2705 Usuario duplicado encontrado");
                return { data: duplicateUser, error: null };
              }
            }
            if (intento === maxReintentos) {
              break;
            }
            continue;
          }
          console.log("\u2705 Usuario creado exitosamente en BD");
          return { data, error: null };
        } catch (error) {
          lastError = error;
          console.error(`\u274C Excepci\xF3n en intento ${intento}:`, error);
          if (intento === maxReintentos) {
            break;
          }
          continue;
        }
      }
      console.log("\u{1F527} \xDAltimo intento: buscando usuario existente...");
      try {
        const { data: finalUser, error: finalError } = yield this.supabase.from("usuarios").select(`
          *,
          rol:roles(*)
        `).eq("id", userId).single();
        if (finalUser) {
          console.log("\u2705 Usuario encontrado en b\xFAsqueda final");
          return { data: finalUser, error: null };
        }
      } catch (finalError) {
        console.error("\u274C Error en b\xFAsqueda final:", finalError);
      }
      console.error("\u274C Todos los intentos fallaron");
      return { data: null, error: lastError || new Error("Error desconocido al crear usuario") };
    });
  }
  /**
   * Actualiza un técnico existente
   */
  actualizarTecnico(id, tecnico) {
    const datosActualizados = __spreadProps(__spreadValues({}, tecnico), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("usuarios").update(datosActualizados).eq("id", id).select(`
          *,
          rol:roles(*)
        `).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const tecnicoActualizado = data;
      const tecnicosActuales = this.tecnicosSubject.value;
      const index = tecnicosActuales.findIndex((t) => t.id === id);
      if (index !== -1) {
        tecnicosActuales[index] = tecnicoActualizado;
        this.tecnicosSubject.next([...tecnicosActuales]);
      }
      this.dataUpdateService.notifyUpdated("tecnicos");
      return tecnicoActualizado;
    }));
  }
  /**
   * Desactiva un técnico (marcar como inactivo)
   */
  desactivarTecnico(id) {
    return from(this.supabase.from("usuarios").update({
      es_activo: false,
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", id)).pipe(map(({ error }) => {
      if (error)
        throw error;
      const tecnicosActuales = this.tecnicosSubject.value;
      const index = tecnicosActuales.findIndex((t) => t.id === id);
      if (index !== -1) {
        tecnicosActuales[index].es_activo = false;
        this.tecnicosSubject.next([...tecnicosActuales]);
      }
      this.dataUpdateService.notifyUpdated("tecnicos");
    }));
  }
  /**
   * Activa un técnico (marcar como activo)
   */
  activarTecnico(id) {
    return from(this.supabase.from("usuarios").update({
      es_activo: true,
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", id)).pipe(map(({ error }) => {
      if (error)
        throw error;
      const tecnicosActuales = this.tecnicosSubject.value;
      const index = tecnicosActuales.findIndex((t) => t.id === id);
      if (index !== -1) {
        tecnicosActuales[index].es_activo = true;
        this.tecnicosSubject.next([...tecnicosActuales]);
      }
      this.dataUpdateService.notifyUpdated("tecnicos");
    }));
  }
  /**
   * Busca técnicos por término de búsqueda
   */
  buscarTecnicos(termino) {
    return from(this.supabase.from("usuarios").select(`
          *,
          rol:roles(*)
        `).or(`nombre_completo.ilike.%${termino}%,email.ilike.%${termino}%`).eq("es_activo", true).limit(10)).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      return data;
    }));
  }
  /**
   * Obtiene el valor actual de técnicos
   */
  getTecnicosActuales() {
    return this.tecnicosSubject.value;
  }
  /**
   * Obtiene todos los roles disponibles desde la base de datos
   */
  obtenerRolesDisponibles() {
    return __async(this, null, function* () {
      try {
        const { data, error } = yield this.supabase.from("roles").select("id, nombre_rol").order("nombre_rol");
        if (error) {
          console.error("\u274C Error al obtener roles:", error);
          throw error;
        }
        console.log("\u2705 Roles obtenidos desde BD:", data);
        return data || [];
      } catch (error) {
        console.error("\u274C Error al obtener roles desde BD:", error);
        throw error;
      }
    });
  }
  /**
   * Método auxiliar para mostrar los UUIDs de roles en consola (solo para desarrollo)
   * Ejecutar en consola del navegador: tecnicosService.mostrarUUIDsRoles()
   */
  mostrarUUIDsRoles() {
    return __async(this, null, function* () {
      try {
        console.log("\u{1F527} Obteniendo UUIDs de roles para configuraci\xF3n...");
        const roles = yield this.obtenerRolesDisponibles();
        console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
        console.log("\u{1F4CB} UUIDS DE ROLES PARA CONFIGURACI\xD3N");
        console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
        roles.forEach((rol) => {
          console.log(`${rol.nombre_rol}: ${rol.id}`);
        });
        console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
        console.log("\u{1F4A1} Copia estos UUIDs para usar en el c\xF3digo");
        console.log("\n\u{1F527} C\xF3digo de ejemplo para rolesDisponibles:");
        console.log("rolesDisponibles = [");
        roles.forEach((rol) => {
          console.log(`  { value: '${rol.id}', label: '${rol.nombre_rol}', descripcion: '...' },`);
        });
        console.log("];");
      } catch (error) {
        console.error("\u274C Error al mostrar UUIDs de roles:", error);
      }
    });
  }
  /**
   * Limpia el estado de técnicos
   */
  limpiarTecnicos() {
    this.tecnicosSubject.next([]);
  }
};
_TecnicosService.\u0275fac = function TecnicosService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TecnicosService)(\u0275\u0275inject(SupabaseClientService), \u0275\u0275inject(DataUpdateService));
};
_TecnicosService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TecnicosService, factory: _TecnicosService.\u0275fac, providedIn: "root" });
var TecnicosService = _TecnicosService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TecnicosService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SupabaseClientService }, { type: DataUpdateService }], null);
})();

// src/app/modules/tecnicos/components/crear-tecnico-modal/crear-tecnico-modal.component.ts
function CrearTecnicoModalComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275element(1, "ion-icon", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error, " ");
  }
}
function CrearTecnicoModalComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275element(1, "ion-icon", 38);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando roles disponibles...");
    \u0275\u0275elementEnd()();
  }
}
function CrearTecnicoModalComponent_select_38_option_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " (Requiere configuraci\xF3n)");
    \u0275\u0275elementEnd();
  }
}
function CrearTecnicoModalComponent_select_38_option_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 42);
    \u0275\u0275text(1);
    \u0275\u0275template(2, CrearTecnicoModalComponent_select_38_option_3_span_2_Template, 2, 0, "span", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rol_r3 = ctx.$implicit;
    \u0275\u0275property("value", rol_r3.value)("disabled", rol_r3.value === "admin-uuid-placeholder");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", rol_r3.label, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", rol_r3.value === "admin-uuid-placeholder");
  }
}
function CrearTecnicoModalComponent_select_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function CrearTecnicoModalComponent_select_38_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.tecnicoData.rol_id, $event) || (ctx_r0.tecnicoData.rol_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CrearTecnicoModalComponent_select_38_Template_select_change_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onInputChange());
    });
    \u0275\u0275elementStart(1, "option", 40);
    \u0275\u0275text(2, "Selecciona el rol");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CrearTecnicoModalComponent_select_38_option_3_Template, 3, 4, "option", 41);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.tecnicoData.rol_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.rolesDisponibles);
  }
}
function CrearTecnicoModalComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275element(1, "ion-icon", 36);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "El rol de Administrador requiere configuraci\xF3n adicional en la base de datos. Contacta al administrador del sistema.");
    \u0275\u0275elementEnd()();
  }
}
function CrearTecnicoModalComponent_div_40_p_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Permisos:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getRolDescripcion(ctx_r0.tecnicoData.rol_id), " ");
  }
}
function CrearTecnicoModalComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 46)(2, "div", 47);
    \u0275\u0275element(3, "ion-icon", 48);
    \u0275\u0275elementStart(4, "span", 49);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 50);
    \u0275\u0275template(7, CrearTecnicoModalComponent_div_40_p_7_Template, 4, 1, "p", 43);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.getRolLabel(ctx_r0.tecnicoData.rol_id));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.tecnicoData.rol_id);
  }
}
function CrearTecnicoModalComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275element(1, "ion-icon", 52);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "El t\xE9cnico recibir\xE1 un email con sus credenciales de acceso al sistema.");
    \u0275\u0275elementEnd()();
  }
}
function CrearTecnicoModalComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "label");
    \u0275\u0275text(2, "Contrase\xF1a ");
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function CrearTecnicoModalComponent_div_46_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.tecnicoData.password, $event) || (ctx_r0.tecnicoData.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function CrearTecnicoModalComponent_div_46_Template_input_input_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onInputChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 54);
    \u0275\u0275text(7, "M\xEDnimo 6 caracteres");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.tecnicoData.password);
  }
}
function CrearTecnicoModalComponent_ion_icon_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 55);
  }
}
function CrearTecnicoModalComponent_ion_icon_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 56);
  }
}
function CrearTecnicoModalComponent_ion_icon_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 55);
  }
}
function CrearTecnicoModalComponent_ion_icon_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 56);
  }
}
function CrearTecnicoModalComponent_div_58_ion_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 55);
  }
}
function CrearTecnicoModalComponent_div_58_ion_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 56);
  }
}
function CrearTecnicoModalComponent_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275template(1, CrearTecnicoModalComponent_div_58_ion_icon_1_Template, 1, 0, "ion-icon", 26)(2, CrearTecnicoModalComponent_div_58_ion_icon_2_Template, 1, 0, "ion-icon", 27);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Contrase\xF1a (m\xEDn. 6 caracteres)");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("valid", ctx_r0.modoEdicion || ctx_r0.tecnicoData.password.length >= 6);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.tecnicoData.password.length >= 6);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.tecnicoData.password.length < 6);
  }
}
function CrearTecnicoModalComponent_ion_icon_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 55);
  }
}
function CrearTecnicoModalComponent_ion_icon_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 56);
  }
}
function CrearTecnicoModalComponent_ion_icon_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 57);
  }
}
function CrearTecnicoModalComponent_ion_icon_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-icon", 38);
  }
}
addIcons({
  "close-outline": closeOutline,
  "save-outline": saveOutline,
  "person-outline": personOutline,
  "mail-outline": mailOutline,
  "call-outline": callOutline,
  "shield-outline": shieldOutline,
  "lock-closed-outline": lockClosedOutline,
  "alert-circle-outline": alertCircleOutline,
  "information-circle-outline": informationCircleOutline,
  "checkmark-circle-outline": checkmarkCircleOutline,
  "ellipse-outline": ellipseOutline,
  "refresh-outline": refreshOutline
});
var _CrearTecnicoModalComponent = class _CrearTecnicoModalComponent {
  constructor(modalController, tecnicosService, rolesService) {
    this.modalController = modalController;
    this.tecnicosService = tecnicosService;
    this.rolesService = rolesService;
    this.modo = "crear";
    this.modoEdicion = false;
    this.TipoRol = TipoRol;
    this.destroy$ = new Subject();
    this.tecnicoData = {
      nombre_completo: "",
      email: "",
      password: "",
      telefono: "",
      rol_id: "",
      // Se asignará dinámicamente
      es_activo: true
    };
    this.rolesDisponibles = [];
    this.loading = false;
    this.loadingRoles = true;
    this.error = "";
    addIcons({
      personOutline,
      closeOutline,
      alertCircleOutline,
      mailOutline,
      lockClosedOutline,
      callOutline,
      shieldOutline,
      saveOutline,
      informationCircleOutline,
      checkmarkCircleOutline,
      ellipseOutline,
      refreshOutline
    });
  }
  ngOnInit() {
    this.modoEdicion = this.modo === "editar";
    this.cargarRolesDisponibles();
    if (this.modoEdicion && this.tecnico) {
      this.cargarDatosTecnico();
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarDatosTecnico() {
    var _a, _b;
    if (!this.tecnico)
      return;
    this.tecnicoData = {
      nombre_completo: this.tecnico.nombre_completo || "",
      email: this.tecnico.email || "",
      password: "",
      // No cargar contraseña por seguridad
      telefono: this.tecnico.telefono || "",
      rol_id: ((_a = this.tecnico.rol) == null ? void 0 : _a.id) || "",
      es_activo: (_b = this.tecnico.es_activo) != null ? _b : true
    };
  }
  /**
   * Carga los roles disponibles desde la base de datos
   */
  cargarRolesDisponibles() {
    this.loadingRoles = true;
    from(this.tecnicosService.obtenerRolesDisponibles()).pipe(takeUntil(this.destroy$)).subscribe({
      next: (roles) => {
        this.rolesDisponibles = roles.map((rol) => ({
          value: rol.id,
          label: rol.nombre_rol,
          descripcion: this.rolesService.getDescripcionRol(rol.nombre_rol)
        }));
        if (!this.modoEdicion) {
          const rolTecnico = this.rolesDisponibles.find((r) => r.label === "T\xE9cnico");
          if (rolTecnico) {
            this.tecnicoData.rol_id = rolTecnico.value;
          }
        }
        this.loadingRoles = false;
        console.log("\u2705 Roles cargados:", this.rolesDisponibles);
      },
      error: (error) => {
        console.error("\u274C Error al cargar roles:", error);
        this.loadingRoles = false;
        this.rolesDisponibles = [
          {
            value: "admin-uuid-placeholder",
            label: "Administrador",
            descripcion: this.rolesService.getDescripcionRol(TipoRol.ADMINISTRADOR)
          },
          {
            value: "a0472297-ee16-44d8-a434-810a3868a209",
            label: "T\xE9cnico",
            descripcion: this.rolesService.getDescripcionRol(TipoRol.TECNICO)
          },
          {
            value: "70c12fd8-92c2-4479-bba0-c7b2e934f48a",
            label: "Usuario",
            descripcion: this.rolesService.getDescripcionRol(TipoRol.USUARIO)
          }
        ];
        if (!this.modoEdicion) {
          this.tecnicoData.rol_id = this.rolesDisponibles[1].value;
        }
        this.error = "No se pudieron cargar los roles desde la base de datos. Usando valores por defecto.";
      }
    });
  }
  onClose() {
    return __async(this, null, function* () {
      yield this.modalController.dismiss(null, "cancel");
    });
  }
  crearTecnico() {
    return __async(this, null, function* () {
      if (!this.validarFormulario()) {
        return;
      }
      if (this.tecnicoData.rol_id === "admin-uuid-placeholder") {
        this.error = "Por favor, contacta al administrador para configurar correctamente el UUID del rol Administrador en la base de datos.";
        return;
      }
      this.loading = true;
      this.error = "";
      try {
        if (this.modoEdicion && this.tecnico) {
          this.tecnicosService.actualizarTecnico(this.tecnico.id, this.tecnicoData).pipe(takeUntil(this.destroy$)).subscribe({
            next: (tecnico) => {
              console.log("\u2705 T\xE9cnico actualizado exitosamente:", tecnico);
              this.modalController.dismiss(tecnico, "confirm");
            },
            error: (error) => {
              console.error("\u274C Error al actualizar t\xE9cnico:", error);
              this.manejarErrorCreacion(error);
              this.loading = false;
            }
          });
        } else {
          this.tecnicosService.crearTecnico(this.tecnicoData).pipe(takeUntil(this.destroy$)).subscribe({
            next: (tecnico) => {
              console.log("\u2705 T\xE9cnico creado exitosamente:", tecnico);
              this.modalController.dismiss(tecnico, "confirm");
            },
            error: (error) => {
              console.error("\u274C Error al crear t\xE9cnico:", error);
              this.manejarErrorCreacion(error);
              this.loading = false;
            }
          });
        }
      } catch (error) {
        this.error = "Error inesperado al procesar el t\xE9cnico";
        console.error("\u274C Error inesperado:", error);
        this.loading = false;
      }
    });
  }
  /**
   * Maneja los errores de creación/actualización de técnico de forma más detallada
   */
  manejarErrorCreacion(error) {
    console.log("\u{1F50D} Analizando error:", error);
    if (typeof error === "string") {
      this.error = error;
    } else if (error == null ? void 0 : error.message) {
      if (error.message.includes("Ya existe un usuario con este email")) {
        this.error = "\u{1F4E7} Ya existe un usuario registrado con este email. Por favor, usa un email diferente.";
      } else if (error.message.includes("duplicate key value") || error.code === "23505") {
        this.error = "\u26A0\uFE0F El usuario ya existe en el sistema. Por favor, verifica el email ingresado.";
      } else if (error.message.includes("Invalid login credentials")) {
        this.error = "\u{1F510} Error en las credenciales. Por favor, verifica el email y contrase\xF1a.";
      } else if (error.message.includes("Email not confirmed")) {
        this.error = "\u{1F4E7} El email necesita ser confirmado. Revisa la bandeja de entrada.";
      } else if (error.message.includes("Password should be at least 6 characters")) {
        this.error = "\u{1F512} La contrase\xF1a debe tener al menos 6 caracteres.";
      } else if (error.message.includes("Unable to validate email address")) {
        this.error = "\u{1F4E7} El formato del email no es v\xE1lido.";
      } else if (error.message.includes("Network request failed")) {
        this.error = "\u{1F310} Error de conexi\xF3n. Por favor, verifica tu conexi\xF3n a internet.";
      } else {
        this.error = `\u274C Error: ${error.message}`;
      }
    } else {
      this.error = "\u274C Error desconocido al procesar el t\xE9cnico. Por favor, intenta de nuevo.";
    }
  }
  validarFormulario() {
    if (!this.tecnicoData.nombre_completo.trim()) {
      this.error = "El nombre completo es obligatorio";
      return false;
    }
    if (!this.tecnicoData.email.trim()) {
      this.error = "El email es obligatorio";
      return false;
    }
    if (!this.validarEmail(this.tecnicoData.email)) {
      this.error = "El formato del email no es v\xE1lido";
      return false;
    }
    if (!this.modoEdicion) {
      if (!this.tecnicoData.password.trim()) {
        this.error = "La contrase\xF1a es obligatoria";
        return false;
      }
      if (this.tecnicoData.password.length < 6) {
        this.error = "La contrase\xF1a debe tener al menos 6 caracteres";
        return false;
      }
    }
    if (!this.tecnicoData.rol_id) {
      this.error = "Debe seleccionar un rol";
      return false;
    }
    if (!this.tecnicoData.email || !this.validarEmail(this.tecnicoData.email)) {
      this.error = "El email debe tener un formato v\xE1lido";
      return false;
    }
    this.error = "";
    return true;
  }
  validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  isFormValid() {
    const baseValidation = !!this.tecnicoData.nombre_completo.trim() && this.validarEmail(this.tecnicoData.email) && !!this.tecnicoData.rol_id;
    if (this.modoEdicion) {
      return baseValidation;
    } else {
      return baseValidation && this.tecnicoData.password.length >= 6;
    }
  }
  getRolLabel(rolId) {
    const rol = this.rolesDisponibles.find((r) => r.value === rolId);
    return rol ? rol.label : "";
  }
  getRolDescripcion(rolId) {
    const rol = this.rolesDisponibles.find((r) => r.value === rolId);
    return rol ? rol.descripcion : "";
  }
  onInputChange() {
    if (this.error) {
      this.error = "";
    }
  }
  get tituloModal() {
    return this.modoEdicion ? "Editar T\xE9cnico" : "Crear Nuevo T\xE9cnico";
  }
  get subtituloModal() {
    return this.modoEdicion ? "Modifica los datos del t\xE9cnico" : "Registra un nuevo t\xE9cnico en el sistema";
  }
  get textoBotonGuardar() {
    return this.loading ? "Procesando..." : this.modoEdicion ? "Actualizar T\xE9cnico" : "Crear T\xE9cnico";
  }
};
_CrearTecnicoModalComponent.\u0275fac = function CrearTecnicoModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CrearTecnicoModalComponent)(\u0275\u0275directiveInject(ModalController), \u0275\u0275directiveInject(TecnicosService), \u0275\u0275directiveInject(RolesService));
};
_CrearTecnicoModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CrearTecnicoModalComponent, selectors: [["app-crear-tecnico-modal"]], inputs: { modo: "modo", tecnico: "tecnico" }, decls: 72, vars: 29, consts: [[1, "modal-container"], [1, "modal-header"], [1, "header-content"], [1, "close-button", 3, "click"], ["name", "close-outline"], [1, "subtitle"], [1, "modal-body", 3, "ngSubmit"], [1, "modal-content"], ["class", "error-message", 4, "ngIf"], [1, "modal-grid"], [1, "form-section"], [1, "form-group"], [1, "required"], ["type", "text", "name", "nombre_completo", "placeholder", "Ingresa el nombre completo", "required", "", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], ["type", "email", "name", "email", "placeholder", "Ingresa el email", "required", "", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], ["type", "tel", "name", "telefono", "placeholder", "Ingresa el tel\xE9fono", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], ["class", "loading-roles", 4, "ngIf"], ["name", "rol_id", "class", "form-control", "required", "", 3, "ngModel", "ngModelChange", "change", 4, "ngIf"], ["class", "warning-message", 4, "ngIf"], ["class", "role-info", 4, "ngIf"], [1, "images-section"], [1, "repuestos-container"], ["class", "info-message", 4, "ngIf"], ["class", "form-group", 4, "ngIf"], [1, "validation-status"], [1, "validation-item"], ["name", "checkmark-circle-outline", 4, "ngIf"], ["name", "ellipse-outline", 4, "ngIf"], ["class", "validation-item", 3, "valid", 4, "ngIf"], [1, "modal-footer"], [1, "button-group"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["name", "save-outline", 4, "ngIf"], ["name", "refresh-outline", "class", "spinning", 4, "ngIf"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "loading-roles"], ["name", "refresh-outline", 1, "spinning"], ["name", "rol_id", "required", "", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", "disabled", 4, "ngFor", "ngForOf"], [3, "value", "disabled"], [4, "ngIf"], [1, "warning-message"], [1, "role-info"], [1, "role-card"], [1, "role-header"], ["name", "shield-outline"], [1, "role-title"], [1, "role-description"], [1, "info-message"], ["name", "information-circle-outline"], ["type", "password", "name", "password", "placeholder", "Ingresa la contrase\xF1a", "required", "", 1, "form-control", 2, "background-color", "#fff", "border", "1px solid #D1D5DB", 3, "ngModelChange", "input", "ngModel"], [1, "password-hint"], ["name", "checkmark-circle-outline"], ["name", "ellipse-outline"], ["name", "save-outline"]], template: function CrearTecnicoModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 3);
    \u0275\u0275listener("click", function CrearTecnicoModalComponent_Template_button_click_5_listener() {
      return ctx.onClose();
    });
    \u0275\u0275element(6, "ion-icon", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 5);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "form", 6);
    \u0275\u0275listener("ngSubmit", function CrearTecnicoModalComponent_Template_form_ngSubmit_9_listener() {
      return ctx.crearTecnico();
    });
    \u0275\u0275elementStart(10, "div", 7);
    \u0275\u0275template(11, CrearTecnicoModalComponent_div_11_Template, 3, 1, "div", 8);
    \u0275\u0275elementStart(12, "div", 9)(13, "div", 10)(14, "h3");
    \u0275\u0275text(15, "Informaci\xF3n Personal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 11)(17, "label");
    \u0275\u0275text(18, "Nombre Completo ");
    \u0275\u0275elementStart(19, "span", 12);
    \u0275\u0275text(20, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function CrearTecnicoModalComponent_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.tecnicoData.nombre_completo, $event) || (ctx.tecnicoData.nombre_completo = $event);
      return $event;
    });
    \u0275\u0275listener("input", function CrearTecnicoModalComponent_Template_input_input_21_listener() {
      return ctx.onInputChange();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 11)(23, "label");
    \u0275\u0275text(24, "Email ");
    \u0275\u0275elementStart(25, "span", 12);
    \u0275\u0275text(26, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function CrearTecnicoModalComponent_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.tecnicoData.email, $event) || (ctx.tecnicoData.email = $event);
      return $event;
    });
    \u0275\u0275listener("input", function CrearTecnicoModalComponent_Template_input_input_27_listener() {
      return ctx.onInputChange();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 11)(29, "label");
    \u0275\u0275text(30, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function CrearTecnicoModalComponent_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.tecnicoData.telefono, $event) || (ctx.tecnicoData.telefono = $event);
      return $event;
    });
    \u0275\u0275listener("input", function CrearTecnicoModalComponent_Template_input_input_31_listener() {
      return ctx.onInputChange();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 11)(33, "label");
    \u0275\u0275text(34, "Rol ");
    \u0275\u0275elementStart(35, "span", 12);
    \u0275\u0275text(36, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(37, CrearTecnicoModalComponent_div_37_Template, 4, 0, "div", 16)(38, CrearTecnicoModalComponent_select_38_Template, 4, 2, "select", 17)(39, CrearTecnicoModalComponent_div_39_Template, 4, 0, "div", 18)(40, CrearTecnicoModalComponent_div_40_Template, 8, 2, "div", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 20)(42, "div", 21)(43, "h3");
    \u0275\u0275text(44, "Credenciales de Acceso");
    \u0275\u0275elementEnd();
    \u0275\u0275template(45, CrearTecnicoModalComponent_div_45_Template, 4, 0, "div", 22)(46, CrearTecnicoModalComponent_div_46_Template, 8, 1, "div", 23);
    \u0275\u0275elementStart(47, "div", 24)(48, "div", 25);
    \u0275\u0275template(49, CrearTecnicoModalComponent_ion_icon_49_Template, 1, 0, "ion-icon", 26)(50, CrearTecnicoModalComponent_ion_icon_50_Template, 1, 0, "ion-icon", 27);
    \u0275\u0275elementStart(51, "span");
    \u0275\u0275text(52, "Nombre completo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 25);
    \u0275\u0275template(54, CrearTecnicoModalComponent_ion_icon_54_Template, 1, 0, "ion-icon", 26)(55, CrearTecnicoModalComponent_ion_icon_55_Template, 1, 0, "ion-icon", 27);
    \u0275\u0275elementStart(56, "span");
    \u0275\u0275text(57, "Email v\xE1lido");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(58, CrearTecnicoModalComponent_div_58_Template, 5, 4, "div", 28);
    \u0275\u0275elementStart(59, "div", 25);
    \u0275\u0275template(60, CrearTecnicoModalComponent_ion_icon_60_Template, 1, 0, "ion-icon", 26)(61, CrearTecnicoModalComponent_ion_icon_61_Template, 1, 0, "ion-icon", 27);
    \u0275\u0275elementStart(62, "span");
    \u0275\u0275text(63, "Rol seleccionado");
    \u0275\u0275elementEnd()()()()()()()();
    \u0275\u0275elementStart(64, "footer", 29)(65, "div", 30)(66, "button", 31);
    \u0275\u0275listener("click", function CrearTecnicoModalComponent_Template_button_click_66_listener() {
      return ctx.onClose();
    });
    \u0275\u0275text(67, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "button", 32);
    \u0275\u0275listener("click", function CrearTecnicoModalComponent_Template_button_click_68_listener() {
      return ctx.crearTecnico();
    });
    \u0275\u0275template(69, CrearTecnicoModalComponent_ion_icon_69_Template, 1, 0, "ion-icon", 33)(70, CrearTecnicoModalComponent_ion_icon_70_Template, 1, 0, "ion-icon", 34);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.tituloModal);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.subtituloModal);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.error);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx.tecnicoData.nombre_completo);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx.tecnicoData.email);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.tecnicoData.telefono);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.loadingRoles);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loadingRoles);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loadingRoles && ctx.tecnicoData.rol_id === "admin-uuid-placeholder");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.tecnicoData.rol_id && !ctx.loadingRoles);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx.modoEdicion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.modoEdicion);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("valid", ctx.tecnicoData.nombre_completo.trim());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.tecnicoData.nombre_completo.trim());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.tecnicoData.nombre_completo.trim());
    \u0275\u0275advance(3);
    \u0275\u0275classProp("valid", ctx.validarEmail(ctx.tecnicoData.email));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.validarEmail(ctx.tecnicoData.email));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.validarEmail(ctx.tecnicoData.email));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx.modoEdicion);
    \u0275\u0275advance();
    \u0275\u0275classProp("valid", ctx.tecnicoData.rol_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.tecnicoData.rol_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.tecnicoData.rol_id);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx.loading || !ctx.isFormValid());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.textoBotonGuardar, " ");
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, IonIcon], styles: [`

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
.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 20px;
  font-size: 16px;
  color: #374151;
  font-weight: 600;
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
.form-group.half[_ngcontent-%COMP%] {
  flex: 1;
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
.password-hint[_ngcontent-%COMP%] {
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
}
.repuestos-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 16px;
  font-size: 16px;
  color: #374151;
  font-weight: 600;
}
.info-message[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background-color: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 6px;
  margin-bottom: 16px;
}
.info-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #3B82F6;
  font-size: 18px;
  margin-top: 2px;
  flex-shrink: 0;
}
.info-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 14px;
  color: #1E40AF;
  line-height: 1.4;
}
.role-info[_ngcontent-%COMP%] {
  margin-top: 20px;
}
.role-card[_ngcontent-%COMP%] {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}
.role-card[_ngcontent-%COMP%]   .role-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.role-card[_ngcontent-%COMP%]   .role-header[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #4F46E5;
  font-size: 20px;
}
.role-card[_ngcontent-%COMP%]   .role-header[_ngcontent-%COMP%]   .role-title[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}
.role-card[_ngcontent-%COMP%]   .role-description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}
.role-card[_ngcontent-%COMP%]   .role-description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #374151;
}
.validation-status[_ngcontent-%COMP%] {
  margin-top: 20px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.validation-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #6b7280;
}
.validation-item[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0;
}
.validation-item.valid[_ngcontent-%COMP%] {
  color: #059669;
}
.validation-item.valid[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #059669;
}
.validation-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #d1d5db;
}
.validation-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  flex: 1;
}
.error-message[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #FEF2F2;
  border: 1px solid #FEE2E2;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  margin-bottom: 20px;
}
.error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 18px;
  flex-shrink: 0;
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
@keyframes _ngcontent-%COMP%_spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.spinning[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
}
.loading-roles[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  color: #64748B;
  font-size: 14px;
}
.loading-roles[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #4F46E5;
  font-size: 18px;
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
}
.warning-message[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background-color: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 6px;
  margin-top: 8px;
}
.warning-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  color: #D97706;
  font-size: 18px;
  margin-top: 2px;
  flex-shrink: 0;
}
.warning-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 14px;
  color: #92400E;
  line-height: 1.4;
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
/*# sourceMappingURL=crear-tecnico-modal.component.css.map */`] });
var CrearTecnicoModalComponent = _CrearTecnicoModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CrearTecnicoModalComponent, [{
    type: Component,
    args: [{ selector: "app-crear-tecnico-modal", standalone: true, imports: [
      CommonModule,
      FormsModule,
      IonIcon
    ], template: `<div class="modal-container">
  <header class="modal-header">
    <div class="header-content">
      <h2>{{ tituloModal }}</h2>
      <button class="close-button" (click)="onClose()">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>
    <p class="subtitle">{{ subtituloModal }}</p>
  </header>

  <form (ngSubmit)="crearTecnico()" class="modal-body">
    <div class="modal-content">
      <!-- Mensaje de error -->
      <div *ngIf="error" class="error-message">
        <ion-icon name="alert-circle-outline"></ion-icon>
        {{ error }}
      </div>

      <div class="modal-grid">
        <!-- Secci\xF3n Izquierda - Informaci\xF3n Personal -->
        <div class="form-section">
          <h3>Informaci\xF3n Personal</h3>

          <div class="form-group">
            <label>Nombre Completo <span class="required">*</span></label>
            <input type="text" [(ngModel)]="tecnicoData.nombre_completo" name="nombre_completo"
              placeholder="Ingresa el nombre completo" class="form-control" (input)="onInputChange()" required>
          </div>

          <div class="form-group">
            <label>Email <span class="required">*</span></label>
            <input type="email" [(ngModel)]="tecnicoData.email" name="email" placeholder="Ingresa el email"
              class="form-control" (input)="onInputChange()" required>
          </div>

          <div class="form-group">
            <label>Tel\xE9fono</label>
            <input type="tel" [(ngModel)]="tecnicoData.telefono" name="telefono" placeholder="Ingresa el tel\xE9fono"
              class="form-control" (input)="onInputChange()">
          </div>

          <div class="form-group">
            <label>Rol <span class="required">*</span></label>

            <!-- Estado de carga de roles -->
            <div *ngIf="loadingRoles" class="loading-roles">
              <ion-icon name="refresh-outline" class="spinning"></ion-icon>
              <span>Cargando roles disponibles...</span>
            </div>

            <!-- Selector de rol -->
            <select *ngIf="!loadingRoles" [(ngModel)]="tecnicoData.rol_id" name="rol_id" class="form-control"
              (change)="onInputChange()" required>
              <option value="">Selecciona el rol</option>
              <option *ngFor="let rol of rolesDisponibles" [value]="rol.value"
                [disabled]="rol.value === 'admin-uuid-placeholder'">
                {{ rol.label }}
                <span *ngIf="rol.value === 'admin-uuid-placeholder'"> (Requiere configuraci\xF3n)</span>
              </option>
            </select>

            <!-- Mensaje de advertencia para rol de administrador no configurado -->
            <div *ngIf="!loadingRoles && tecnicoData.rol_id === 'admin-uuid-placeholder'" class="warning-message">
              <ion-icon name="alert-circle-outline"></ion-icon>
              <p>El rol de Administrador requiere configuraci\xF3n adicional en la base de datos. Contacta al administrador
                del sistema.</p>
            </div>

            <!-- Informaci\xF3n adicional del rol -->
            <div class="role-info" *ngIf="tecnicoData.rol_id && !loadingRoles">
              <div class="role-card">
                <div class="role-header">
                  <ion-icon name="shield-outline"></ion-icon>
                  <span class="role-title">{{ getRolLabel(tecnicoData.rol_id) }}</span>
                </div>
                <div class="role-description">
                  <p *ngIf="tecnicoData.rol_id">
                    <strong>Permisos:</strong> {{ getRolDescripcion(tecnicoData.rol_id) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Secci\xF3n Derecha - Informaci\xF3n de Acceso -->
        <div class="images-section">
          <div class="repuestos-container">
            <h3>Credenciales de Acceso</h3>

            <!-- Mensaje informativo -->
            <div class="info-message" *ngIf="!modoEdicion">
              <ion-icon name="information-circle-outline"></ion-icon>
              <p>El t\xE9cnico recibir\xE1 un email con sus credenciales de acceso al sistema.</p>
            </div>

            <div class="form-group" *ngIf="!modoEdicion">
              <label>Contrase\xF1a <span class="required">*</span></label>
              <input type="password" [(ngModel)]="tecnicoData.password" name="password"
                placeholder="Ingresa la contrase\xF1a" class="form-control" (input)="onInputChange()" style="background-color: #fff; border: 1px solid #D1D5DB;" required>
              <div class="password-hint">M\xEDnimo 6 caracteres</div>
            </div>



            <!-- Estado de validaci\xF3n -->
            <div class="validation-status">
              <div class="validation-item" [class.valid]="tecnicoData.nombre_completo.trim()">
                <ion-icon name="checkmark-circle-outline" *ngIf="tecnicoData.nombre_completo.trim()"></ion-icon>
                <ion-icon name="ellipse-outline" *ngIf="!tecnicoData.nombre_completo.trim()"></ion-icon>
                <span>Nombre completo</span>
              </div>
              <div class="validation-item" [class.valid]="validarEmail(tecnicoData.email)">
                <ion-icon name="checkmark-circle-outline" *ngIf="validarEmail(tecnicoData.email)"></ion-icon>
                <ion-icon name="ellipse-outline" *ngIf="!validarEmail(tecnicoData.email)"></ion-icon>
                <span>Email v\xE1lido</span>
              </div>
              <div class="validation-item" [class.valid]="modoEdicion || tecnicoData.password.length >= 6"
                *ngIf="!modoEdicion">
                <ion-icon name="checkmark-circle-outline" *ngIf="tecnicoData.password.length >= 6"></ion-icon>
                <ion-icon name="ellipse-outline" *ngIf="tecnicoData.password.length < 6"></ion-icon>
                <span>Contrase\xF1a (m\xEDn. 6 caracteres)</span>
              </div>
              <div class="validation-item" [class.valid]="tecnicoData.rol_id">
                <ion-icon name="checkmark-circle-outline" *ngIf="tecnicoData.rol_id"></ion-icon>
                <ion-icon name="ellipse-outline" *ngIf="!tecnicoData.rol_id"></ion-icon>
                <span>Rol seleccionado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>

  <footer class="modal-footer">
    <div class="button-group">
      <button type="button" class="btn btn-outline" (click)="onClose()">
        Cancelar
      </button>
      <button type="button" class="btn btn-primary" (click)="crearTecnico()" [disabled]="loading || !isFormValid()">
        <ion-icon name="save-outline" *ngIf="!loading"></ion-icon>
        <ion-icon name="refresh-outline" class="spinning" *ngIf="loading"></ion-icon>
        {{ textoBotonGuardar }}
      </button>
    </div>
  </footer>
</div>`, styles: [`/* src/app/modules/tecnicos/components/crear-tecnico-modal/crear-tecnico-modal.component.scss */
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
.form-section h3 {
  margin: 0 0 20px;
  font-size: 16px;
  color: #374151;
  font-weight: 600;
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
.form-group.half {
  flex: 1;
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
.password-hint {
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
}
.repuestos-container h3 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #374151;
  font-weight: 600;
}
.info-message {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background-color: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 6px;
  margin-bottom: 16px;
}
.info-message ion-icon {
  color: #3B82F6;
  font-size: 18px;
  margin-top: 2px;
  flex-shrink: 0;
}
.info-message p {
  margin: 0;
  font-size: 14px;
  color: #1E40AF;
  line-height: 1.4;
}
.role-info {
  margin-top: 20px;
}
.role-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}
.role-card .role-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.role-card .role-header ion-icon {
  color: #4F46E5;
  font-size: 20px;
}
.role-card .role-header .role-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}
.role-card .role-description p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}
.role-card .role-description p strong {
  color: #374151;
}
.validation-status {
  margin-top: 20px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.validation-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #6b7280;
}
.validation-item:last-child {
  margin-bottom: 0;
}
.validation-item.valid {
  color: #059669;
}
.validation-item.valid ion-icon {
  color: #059669;
}
.validation-item ion-icon {
  font-size: 16px;
  color: #d1d5db;
}
.validation-item span {
  flex: 1;
}
.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #FEF2F2;
  border: 1px solid #FEE2E2;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  margin-bottom: 20px;
}
.error-message ion-icon {
  font-size: 18px;
  flex-shrink: 0;
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
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.spinning {
  animation: spin 1s linear infinite;
}
.loading-roles {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  color: #64748B;
  font-size: 14px;
}
.loading-roles ion-icon {
  color: #4F46E5;
  font-size: 18px;
  animation: spin 1s linear infinite;
}
.warning-message {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background-color: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 6px;
  margin-top: 8px;
}
.warning-message ion-icon {
  color: #D97706;
  font-size: 18px;
  margin-top: 2px;
  flex-shrink: 0;
}
.warning-message p {
  margin: 0;
  font-size: 14px;
  color: #92400E;
  line-height: 1.4;
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
/*# sourceMappingURL=crear-tecnico-modal.component.css.map */
`] }]
  }], () => [{ type: ModalController }, { type: TecnicosService }, { type: RolesService }], { modo: [{
    type: Input
  }], tecnico: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CrearTecnicoModalComponent, { className: "CrearTecnicoModalComponent", filePath: "src/app/modules/tecnicos/components/crear-tecnico-modal/crear-tecnico-modal.component.ts", lineNumber: 39 });
})();

// src/app/modules/tecnicos/pages/tecnicos/tecnicos.component.ts
function TecnicosComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28);
    \u0275\u0275element(2, "ion-icon", 29);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Cargando t\xE9cnicos...");
    \u0275\u0275elementEnd()()();
  }
}
function TecnicosComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31);
    \u0275\u0275element(2, "ion-icon", 32);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 33);
    \u0275\u0275listener("click", function TecnicosComponent_div_39_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onReintentar());
    });
    \u0275\u0275element(6, "ion-icon", 34);
    \u0275\u0275text(7, " Reintentar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function TecnicosComponent_div_40_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 45);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 46)(8, "span", 47);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 48);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 49)(14, "span", 50);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 51)(17, "button", 52);
    \u0275\u0275listener("click", function TecnicosComponent_div_40_div_19_Template_button_click_17_listener() {
      const tecnico_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.abrirModalEditarTecnico(tecnico_r4));
    });
    \u0275\u0275element(18, "ion-icon", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 54);
    \u0275\u0275listener("click", function TecnicosComponent_div_40_div_19_Template_button_click_19_listener() {
      const tecnico_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleEstadoTecnico(tecnico_r4));
    });
    \u0275\u0275element(20, "ion-icon", 55);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tecnico_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.getEstadoClass(tecnico_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tecnico_r4.nombre_completo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tecnico_r4.email || "No especificado");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tecnico_r4.telefono || "No especificado");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getRolClass((tecnico_r4.rol == null ? null : tecnico_r4.rol.nombre_rol) || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tecnico_r4.rol == null ? null : tecnico_r4.rol.nombre_rol) || "Sin rol", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 14, tecnico_r4.fecha_creacion, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.esTecnicoActivo(tecnico_r4) ? "activo" : "inactivo");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.esTecnicoActivo(tecnico_r4) ? "Activo" : "Inactivo", " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("title", ctx_r1.esTecnicoActivo(tecnico_r4) ? "Desactivar t\xE9cnico" : "Activar t\xE9cnico");
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.esTecnicoActivo(tecnico_r4) ? "pause-circle" : "play-circle");
  }
}
function TecnicosComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36)(2, "div", 1)(3, "div", 37)(4, "div", 38);
    \u0275\u0275text(5, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 39);
    \u0275\u0275text(7, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 39);
    \u0275\u0275text(9, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 39);
    \u0275\u0275text(11, "Rol");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 39);
    \u0275\u0275text(13, "Fecha Creaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 39);
    \u0275\u0275text(15, "Activo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 38);
    \u0275\u0275text(17, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 40);
    \u0275\u0275template(19, TecnicosComponent_div_40_div_19_Template, 21, 17, "div", 41);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r1.tecnicos);
  }
}
function TecnicosComponent_div_41_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 61);
    \u0275\u0275listener("click", function TecnicosComponent_div_41_button_6_Template_button_click_0_listener() {
      const pagina_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cambiarPagina(pagina_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pagina_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", pagina_r7 === ctx_r1.paginaActual);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pagina_r7, " ");
  }
}
function TecnicosComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 57);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 58)(4, "button", 59);
    \u0275\u0275listener("click", function TecnicosComponent_div_41_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarPagina(ctx_r1.paginaActual - 1));
    });
    \u0275\u0275text(5, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, TecnicosComponent_div_41_button_6_Template, 2, 3, "button", 60);
    \u0275\u0275elementStart(7, "button", 59);
    \u0275\u0275listener("click", function TecnicosComponent_div_41_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarPagina(ctx_r1.paginaActual + 1));
    });
    \u0275\u0275text(8, " Siguiente ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Mostrando ", (ctx_r1.paginaActual - 1) * ctx_r1.porPagina + 1, " - ", ctx_r1.Math.min(ctx_r1.paginaActual * ctx_r1.porPagina, ctx_r1.totalTecnicos), " de ", ctx_r1.totalTecnicos, " t\xE9cnicos ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.paginaActual === 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.getPaginas());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.paginaActual === ctx_r1.getTotalPaginas());
  }
}
function TecnicosComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 63);
    \u0275\u0275element(2, "ion-icon", 64);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay t\xE9cnicos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "A\xFAn no se han creado t\xE9cnicos. Crea el primero para comenzar.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 65);
    \u0275\u0275listener("click", function TecnicosComponent_div_42_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirModalCrearTecnico());
    });
    \u0275\u0275element(8, "ion-icon", 18);
    \u0275\u0275text(9, " Crear t\xE9cnico ");
    \u0275\u0275elementEnd()()();
  }
}
var _TecnicosComponent = class _TecnicosComponent {
  constructor(modalController, tecnicosService) {
    this.modalController = modalController;
    this.tecnicosService = tecnicosService;
    this.tecnicos = [];
    this.loading = false;
    this.error = "";
    this.busqueda = "";
    this.paginaActual = 1;
    this.porPagina = 10;
    this.totalTecnicos = 0;
    this.ordenarPor = "fecha_creacion";
    this.orden = "desc";
    this.destroy$ = new Subject();
    addIcons({ searchOutline, filterOutline, addCircle, refreshOutline, alertCircleOutline, peopleOutline, eyeOutline, constructOutline, alertCircle, close, add, addCircleOutline, callOutline, mailOutline, locationOutline, pauseCircle, playCircle });
  }
  ngOnInit() {
    this.cargarTecnicos();
    this.setupBusqueda();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  setupBusqueda() {
    const busquedaSubject = new Subject();
    busquedaSubject.pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged()).subscribe((termino) => {
      this.busqueda = termino;
      this.paginaActual = 1;
      this.cargarTecnicos();
    });
    const searchInput = document.querySelector('input[placeholder*="Buscar"]');
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const target = e.target;
        busquedaSubject.next(target.value);
      });
    }
  }
  cargarTecnicos() {
    this.loading = true;
    this.error = "";
    this.tecnicosService.getTecnicos(this.paginaActual, this.porPagina, this.busqueda, this.ordenarPor, this.orden).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.tecnicos = response.tecnicos;
        this.totalTecnicos = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error al cargar t\xE9cnicos:", error);
        this.error = "Error al cargar los t\xE9cnicos. Por favor, intenta de nuevo.";
        this.loading = false;
      }
    });
  }
  abrirModalCrearTecnico() {
    return __async(this, null, function* () {
      const modal = yield this.modalController.create({
        component: CrearTecnicoModalComponent,
        componentProps: {
          tecnico: null,
          modo: "crear"
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        console.log("\u2705 T\xE9cnico creado desde modal, recargando lista...");
        this.cargarTecnicos();
      }
    });
  }
  abrirModalEditarTecnico(tecnico) {
    return __async(this, null, function* () {
      const modal = yield this.modalController.create({
        component: CrearTecnicoModalComponent,
        componentProps: {
          tecnico,
          modo: "editar"
        }
      });
      yield modal.present();
      const { data, role } = yield modal.onWillDismiss();
      if (role === "confirm" && data) {
        console.log("\u2705 T\xE9cnico actualizado desde modal, recargando lista...");
        this.cargarTecnicos();
      }
    });
  }
  // Método ya no es necesario para creación desde modal
  // Se mantiene solo para compatibilidad futura si se necesita
  crearTecnico(tecnicoData) {
    this.loading = true;
    this.error = "";
    this.tecnicosService.crearTecnico(tecnicoData).pipe(takeUntil(this.destroy$)).subscribe({
      next: (tecnico) => {
        console.log("\u2705 T\xE9cnico creado exitosamente desde componente padre:", tecnico);
        this.cargarTecnicos();
        this.loading = false;
      },
      error: (error) => {
        console.error("\u274C Error al crear t\xE9cnico desde componente padre:", error);
        this.error = "Error al crear el t\xE9cnico. Por favor, intenta de nuevo.";
        this.loading = false;
      }
    });
  }
  toggleEstadoTecnico(tecnico) {
    if (!tecnico.id)
      return;
    const accion = tecnico.es_activo ? "desactivar" : "activar";
    this.loading = true;
    this.error = "";
    const observable = tecnico.es_activo ? this.tecnicosService.desactivarTecnico(tecnico.id) : this.tecnicosService.activarTecnico(tecnico.id);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        console.log(`T\xE9cnico ${accion}do exitosamente`);
        this.cargarTecnicos();
        this.loading = false;
      },
      error: (error) => {
        console.error(`Error al ${accion} t\xE9cnico:`, error);
        this.error = `Error al ${accion} el t\xE9cnico. Por favor, intenta de nuevo.`;
        this.loading = false;
      }
    });
  }
  onBusquedaChange(event) {
    const valor = event.target.value;
    this.busqueda = valor;
    this.paginaActual = 1;
    this.cargarTecnicos();
  }
  onOrdenarChange(event) {
    const valor = event.target.value;
    this.ordenarPor = valor;
    this.cargarTecnicos();
  }
  onFiltrarTodos() {
    this.busqueda = "";
    this.paginaActual = 1;
    this.cargarTecnicos();
  }
  onReintentar() {
    this.cargarTecnicos();
  }
  cambiarPagina(pagina) {
    this.paginaActual = pagina;
    this.cargarTecnicos();
  }
  getTotalPaginas() {
    return Math.ceil(this.totalTecnicos / this.porPagina);
  }
  getPaginas() {
    const total = this.getTotalPaginas();
    const paginas = [];
    for (let i = 1; i <= total; i++) {
      paginas.push(i);
    }
    return paginas;
  }
  esTecnicoActivo(tecnico) {
    var _a;
    return tecnico.es_activo && ((_a = tecnico.rol) == null ? void 0 : _a.nombre_rol) !== "Administrador";
  }
  getRolClass(rol) {
    switch (rol) {
      case "Administrador":
        return "rol-admin";
      case "T\xE9cnico":
        return "rol-tecnico";
      case "Usuario":
        return "rol-usuario";
      default:
        return "rol-default";
    }
  }
  getEstadoClass(tecnico) {
    return this.esTecnicoActivo(tecnico) ? "activo" : "inactivo";
  }
  // Función para usar Math en el template
  get Math() {
    return Math;
  }
};
_TecnicosComponent.\u0275fac = function TecnicosComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TecnicosComponent)(\u0275\u0275directiveInject(ModalController), \u0275\u0275directiveInject(TecnicosService));
};
_TecnicosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TecnicosComponent, selectors: [["app-tecnicos"]], decls: 43, vars: 11, consts: [[1, "dashboard-table"], [1, "table-header"], [1, "table-header-left"], [1, "table-title"], [1, "table-meta"], [1, "mobile-search"], ["type", "text", "placeholder", "Buscar t\xE9cnico...", 3, "input", "value"], ["name", "search-outline"], [1, "table-search", "desktop-only"], ["type", "text", "placeholder", "Buscar...", 3, "input", "value"], [3, "change", "value"], ["value", "nombre_completo"], ["value", "fecha_creacion"], ["value", "rol_id"], [1, "btn-filter", 3, "click", "title"], ["name", "filter-outline"], [1, "header-actions"], [1, "btn-add", 3, "click"], ["name", "add-circle"], [1, "mobile-actions"], [1, "mobile-filter", 3, "change", "value"], [1, "mobile-buttons"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "compact-tecnicos-table", 4, "ngIf"], ["class", "table-pagination", 4, "ngIf"], ["class", "no-data-container", 4, "ngIf"], [1, "loading-state"], [1, "loading-spinner"], ["name", "refresh-outline", 1, "spinning"], [1, "error-state"], [1, "error-message"], ["name", "alert-circle-outline"], [1, "btn-retry", 3, "click"], ["name", "refresh-outline"], [1, "compact-tecnicos-table"], [1, "tecnicos-table"], [1, "header-row"], [1, "header-cell"], [1, "header-cell", "desktop-only"], [1, "table-body"], ["class", "tecnico-row", 3, "class", 4, "ngFor", "ngForOf"], [1, "tecnico-row"], [1, "tecnico-cell", "nombre-tecnico"], [1, "tecnico-cell", "email-tecnico", "desktop-only"], [1, "tecnico-cell", "telefono-tecnico", "desktop-only"], [1, "tecnico-cell", "rol-tecnico", "desktop-only"], [1, "badge-rol"], [1, "tecnico-cell", "fecha-tecnico", "desktop-only"], [1, "tecnico-cell", "estado-activo", "desktop-only"], [1, "badge-estado"], [1, "tecnico-cell", "acciones"], ["title", "Ver detalles", 1, "btn-ver", 3, "click"], ["name", "eye-outline"], [1, "btn-toggle-estado", 3, "click", "title"], [3, "name"], [1, "table-pagination"], [1, "pagination-info"], [1, "pagination"], [3, "click", "disabled"], [3, "active", "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "no-data-container"], [1, "no-data-message"], ["name", "construct-outline"], [1, "btn-create", 3, "click"]], template: function TecnicosComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content")(1, "section", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3);
    \u0275\u0275text(5, "Tabla de t\xE9cnicos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 4);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 5)(9, "input", 6);
    \u0275\u0275listener("input", function TecnicosComponent_Template_input_input_9_listener($event) {
      return ctx.onBusquedaChange($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "ion-icon", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 8)(12, "input", 9);
    \u0275\u0275listener("input", function TecnicosComponent_Template_input_input_12_listener($event) {
      return ctx.onBusquedaChange($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 10);
    \u0275\u0275listener("change", function TecnicosComponent_Template_select_change_13_listener($event) {
      return ctx.onOrdenarChange($event);
    });
    \u0275\u0275elementStart(14, "option", 11);
    \u0275\u0275text(15, "Ordenar por: Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 12);
    \u0275\u0275text(17, "Ordenar por: Recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 13);
    \u0275\u0275text(19, "Ordenar por: Rol");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "button", 14);
    \u0275\u0275listener("click", function TecnicosComponent_Template_button_click_20_listener() {
      return ctx.onFiltrarTodos();
    });
    \u0275\u0275element(21, "ion-icon", 15);
    \u0275\u0275text(22, " Todos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 16)(24, "button", 17);
    \u0275\u0275listener("click", function TecnicosComponent_Template_button_click_24_listener() {
      return ctx.abrirModalCrearTecnico();
    });
    \u0275\u0275element(25, "ion-icon", 18);
    \u0275\u0275text(26, " A\xF1adir t\xE9cnico ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(27, "div", 19)(28, "select", 20);
    \u0275\u0275listener("change", function TecnicosComponent_Template_select_change_28_listener($event) {
      return ctx.onOrdenarChange($event);
    });
    \u0275\u0275elementStart(29, "option", 11);
    \u0275\u0275text(30, "Ordenar: Alfab\xE9tico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 12);
    \u0275\u0275text(32, "Ordenar: Recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 13);
    \u0275\u0275text(34, "Ordenar: Rol");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 21)(36, "button", 17);
    \u0275\u0275listener("click", function TecnicosComponent_Template_button_click_36_listener() {
      return ctx.abrirModalCrearTecnico();
    });
    \u0275\u0275element(37, "ion-icon", 18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(38, TecnicosComponent_div_38_Template, 5, 0, "div", 22)(39, TecnicosComponent_div_39_Template, 8, 1, "div", 23)(40, TecnicosComponent_div_40_Template, 20, 1, "div", 24)(41, TecnicosComponent_div_41_Template, 9, 6, "div", 25)(42, TecnicosComponent_div_42_Template, 10, 0, "div", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("T\xE9cnicos: ", ctx.totalTecnicos, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx.busqueda);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx.busqueda);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx.ordenarPor);
    \u0275\u0275advance(7);
    \u0275\u0275property("title", "Mostrar todos los t\xE9cnicos");
    \u0275\u0275advance(8);
    \u0275\u0275property("value", ctx.ordenarPor);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.tecnicos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.tecnicos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.tecnicos.length === 0);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  DatePipe,
  FormsModule,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  IonContent,
  IonIcon,
  MatTableModule,
  MatIconModule
], styles: [`

ion-content[_ngcontent-%COMP%] {
  --background: #FFF;
}
.dashboard-table[_ngcontent-%COMP%] {
  background: #fff;
  padding: 25px;
}
.table-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
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
.table-search[_ngcontent-%COMP%]   .btn-filter[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 1rem;
  border: 1px solid #E2E8F0;
  background: #F9FBFF;
  color: #26262A;
  cursor: pointer;
  transition: all 0.2s ease;
}
.table-search[_ngcontent-%COMP%]   .btn-filter[_ngcontent-%COMP%]:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
}
.table-search[_ngcontent-%COMP%]   .btn-filter.active[_ngcontent-%COMP%] {
  background: #4F46E5;
  color: white;
  border-color: #4F46E5;
}
.table-search[_ngcontent-%COMP%]   .btn-filter.active[_ngcontent-%COMP%]:hover {
  background: #4338CA;
}
.table-search[_ngcontent-%COMP%]   .btn-filter[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.mobile-search[_ngcontent-%COMP%] {
  display: none;
  position: relative;
  width: 100%;
  padding: 0px 16px;
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
.loading-state[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #6B7280;
}
.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 32px;
  color: #4F46E5;
}
.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   ion-icon.spinning[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
}
.loading-state[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 14px;
}
.error-state[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  color: #DC2626;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 32px;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 14px;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #DC2626;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]:hover {
  background: #B91C1C;
}
.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   .btn-retry[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
}
.table-header-left[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
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
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  background: #f3f4f6;
  min-width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 14px;
  color: #26262A;
  cursor: pointer;
}
.table-pagination[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {
  background: #4F46E5;
  color: #fff;
}
.header-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 1rem;
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
.compact-tecnicos-table[_ngcontent-%COMP%] {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%] {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {
  display: contents;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%] {
  display: contents;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
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
  min-width: 0;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%] {
  display: contents;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%] {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]:hover:not(.activo):not(.inactivo)   .tecnico-cell[_ngcontent-%COMP%] {
  background-color: #F9FAFB;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row.activo[_ngcontent-%COMP%]   .tecnico-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #10B981;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row.activo[_ngcontent-%COMP%]   .tecnico-cell[_ngcontent-%COMP%] {
  background-color: #ECFDF5;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row.activo[_ngcontent-%COMP%]:hover   .tecnico-cell[_ngcontent-%COMP%] {
  background-color: #D1FAE5;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row.inactivo[_ngcontent-%COMP%]   .tecnico-cell[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid #EF4444;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row.inactivo[_ngcontent-%COMP%]   .tecnico-cell[_ngcontent-%COMP%] {
  background-color: #FEF2F2;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row.inactivo[_ngcontent-%COMP%]:hover   .tecnico-cell[_ngcontent-%COMP%] {
  background-color: #FEE2E2;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell[_ngcontent-%COMP%] {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.nombre-tecnico[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: start;
  flex-shrink: 0;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.email-tecnico[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.telefono-tecnico[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.rol-tecnico[_ngcontent-%COMP%] {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.rol-tecnico[_ngcontent-%COMP%]   .badge-rol[_ngcontent-%COMP%] {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.rol-tecnico[_ngcontent-%COMP%]   .badge-rol.rol-admin[_ngcontent-%COMP%] {
  background: #FEE4E2;
  color: #D92D20;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.rol-tecnico[_ngcontent-%COMP%]   .badge-rol.rol-tecnico[_ngcontent-%COMP%] {
  background: #E6F4EA;
  color: #137333;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.rol-tecnico[_ngcontent-%COMP%]   .badge-rol.rol-usuario[_ngcontent-%COMP%] {
  background: #FEF3C7;
  color: #B45309;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.rol-tecnico[_ngcontent-%COMP%]   .badge-rol.rol-default[_ngcontent-%COMP%] {
  background: #F3F4F6;
  color: #6B7280;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.fecha-tecnico[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.estado-activo[_ngcontent-%COMP%] {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.estado-activo[_ngcontent-%COMP%]   .badge-estado[_ngcontent-%COMP%] {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.estado-activo[_ngcontent-%COMP%]   .badge-estado.activo[_ngcontent-%COMP%] {
  background: #E6F4EA;
  color: #137333;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.estado-activo[_ngcontent-%COMP%]   .badge-estado.inactivo[_ngcontent-%COMP%] {
  background: #FEE4E2;
  color: #D92D20;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%] {
  justify-content: start;
  gap: 4px;
  flex-shrink: 0;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
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
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
  font-size: 16px;
  color: #6B7280;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover {
  background-color: #10B981;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {
  color: white;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button.btn-ver[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background-color: #059669;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button.btn-toggle-estado[_ngcontent-%COMP%]:hover   ion-icon[name=pause-circle][_ngcontent-%COMP%] {
  color: #DC2626;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button.btn-toggle-estado[_ngcontent-%COMP%]:hover   ion-icon[name=play-circle][_ngcontent-%COMP%] {
  color: #059669;
}
.compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button.btn-toggle-estado[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
}
@media (min-width: 769px) {
  .compact-tecnicos-table[_ngcontent-%COMP%] {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%] {
    grid-template-columns: 2fr 180px 140px 120px 140px 80px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell[_ngcontent-%COMP%] {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.nombre-tecnico[_ngcontent-%COMP%] {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.email-tecnico[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.telefono-tecnico[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.rol-tecnico[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.fecha-tecnico[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.estado-activo[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%] {
    flex-shrink: 0;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 28px;
    height: 28px;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .dashboard-table[_ngcontent-%COMP%] {
    height: 100%;
    margin: 0;
    padding: 0px;
    border-radius: 0;
    box-shadow: none;
  }
  .desktop-only[_ngcontent-%COMP%] {
    display: none !important;
  }
  .mobile-search[_ngcontent-%COMP%], 
   .mobile-actions[_ngcontent-%COMP%] {
    display: flex;
  }
  .table-header[_ngcontent-%COMP%] {
    margin-bottom: 12px;
    align-items: center;
    gap: 12px;
  }
  .table-header-left[_ngcontent-%COMP%] {
    flex: 1;
    padding: 0px 16px;
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
  .compact-tecnicos-table[_ngcontent-%COMP%] {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    max-height: none;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell[_ngcontent-%COMP%] {
    padding: 8px 4px;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.nombre-tecnico[_ngcontent-%COMP%] {
    font-size: 13px;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 24px;
    height: 24px;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 14px;
  }
}
@media (max-width: 480px) {
  .dashboard-table[_ngcontent-%COMP%] {
    height: 100%;
    padding: 0px;
  }
  .mobile-actions[_ngcontent-%COMP%] {
    gap: 12px;
    padding: 0px 16px;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%] {
    display: flex;
    width: 20%;
    justify-content: stretch;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    flex: 1;
    height: 40px;
  }
  .mobile-actions[_ngcontent-%COMP%]   .mobile-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 20px;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%] {
    border-radius: 0px !important;
    border-left: none !important;
    border-right: none !important;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 70px;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%]   .header-cell[_ngcontent-%COMP%] {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell[_ngcontent-%COMP%] {
    padding: 6px 2px;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.nombre-tecnico[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    width: 22px;
    height: 22px;
  }
  .compact-tecnicos-table[_ngcontent-%COMP%]   .tecnicos-table[_ngcontent-%COMP%]   .table-body[_ngcontent-%COMP%]   .tecnico-row[_ngcontent-%COMP%]   .tecnico-cell.acciones[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {
    font-size: 12px;
  }
}
.mobile-only[_ngcontent-%COMP%] {
  display: none;
}
@media (max-width: 768px) {
  .mobile-only[_ngcontent-%COMP%] {
    display: flex !important;
  }
}
@keyframes _ngcontent-%COMP%_spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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
/*# sourceMappingURL=tecnicos.component.css.map */`] });
var TecnicosComponent = _TecnicosComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TecnicosComponent, [{
    type: Component,
    args: [{ selector: "app-tecnicos", standalone: true, imports: [
      CommonModule,
      FormsModule,
      IonContent,
      IonIcon,
      MatTableModule,
      MatIconModule
    ], template: `<ion-content>
  <section class="dashboard-table">
    <!-- Header Section -->
    <div class="table-header">
      <div class="table-header-left">
        <div class="table-title">Tabla de t\xE9cnicos</div>
        <div class="table-meta">T\xE9cnicos: {{ totalTecnicos }}</div>  
      </div>
      
      <!-- Mobile Search Bar -->
      <div class="mobile-search">
        <input 
          type="text" 
          placeholder="Buscar t\xE9cnico..." 
          [value]="busqueda"
          (input)="onBusquedaChange($event)"
          />
        <ion-icon name="search-outline"></ion-icon>
      </div>

      <!-- Desktop Search and Actions -->
      <div class="table-search desktop-only">
        <input 
          type="text" 
          placeholder="Buscar..." 
          [value]="busqueda"
          (input)="onBusquedaChange($event)"
          />
        <select [value]="ordenarPor" (change)="onOrdenarChange($event)">
          <option value="nombre_completo">Ordenar por: Nombre</option>
          <option value="fecha_creacion">Ordenar por: Recientes</option>
          <option value="rol_id">Ordenar por: Rol</option>
        </select>
        <button 
          class="btn-filter" 
          [title]="'Mostrar todos los t\xE9cnicos'"
          (click)="onFiltrarTodos()">
          <ion-icon name="filter-outline"></ion-icon>
          Todos
        </button>
        <div class="header-actions">
          <button class="btn-add" (click)="abrirModalCrearTecnico()">
            <ion-icon name="add-circle"></ion-icon>
            A\xF1adir t\xE9cnico
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Actions -->
    <div class="mobile-actions">
      <select class="mobile-filter" [value]="ordenarPor" (change)="onOrdenarChange($event)">
        <option value="nombre_completo">Ordenar: Alfab\xE9tico</option>
        <option value="fecha_creacion">Ordenar: Recientes</option>
        <option value="rol_id">Ordenar: Rol</option>
      </select>
      <div class="mobile-buttons">
        <button class="btn-add" (click)="abrirModalCrearTecnico()">
          <ion-icon name="add-circle"></ion-icon>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div *ngIf="loading" class="loading-state">
      <div class="loading-spinner">
        <ion-icon name="refresh-outline" class="spinning"></ion-icon>
        <p>Cargando t\xE9cnicos...</p>
      </div>
    </div>

    <!-- Error State -->
    <div *ngIf="error && !loading" class="error-state">
      <div class="error-message">
        <ion-icon name="alert-circle-outline"></ion-icon>
        <p>{{ error }}</p>
        <button class="btn-retry" (click)="onReintentar()">
          <ion-icon name="refresh-outline"></ion-icon>
          Reintentar
        </button>
      </div>
    </div>

    <!-- Compact Table View (replaces desktop table and mobile cards) -->
    <div *ngIf="!loading && !error && tecnicos.length > 0" class="compact-tecnicos-table">
      <div class="tecnicos-table">
        <div class="table-header">
          <div class="header-row">
            <div class="header-cell">Nombre</div>
            <div class="header-cell desktop-only">Email</div>
            <div class="header-cell desktop-only">Tel\xE9fono</div>
            <div class="header-cell desktop-only">Rol</div>
            <div class="header-cell desktop-only">Fecha Creaci\xF3n</div>
            <div class="header-cell desktop-only">Activo</div>
            <div class="header-cell">Acciones</div>
          </div>
        </div>
        <div class="table-body">
          <div class="tecnico-row" 
               *ngFor="let tecnico of tecnicos"
               [class]="getEstadoClass(tecnico)">
            <div class="tecnico-cell nombre-tecnico">{{ tecnico.nombre_completo }}</div>
            <div class="tecnico-cell email-tecnico desktop-only">{{ tecnico.email || 'No especificado' }}</div>
            <div class="tecnico-cell telefono-tecnico desktop-only">{{ tecnico.telefono || 'No especificado' }}</div>
            <div class="tecnico-cell rol-tecnico desktop-only">
              <span class="badge-rol" [class]="getRolClass(tecnico.rol?.nombre_rol || '')">
                {{ tecnico.rol?.nombre_rol || 'Sin rol' }}
              </span>
            </div>
            <div class="tecnico-cell fecha-tecnico desktop-only">{{ tecnico.fecha_creacion | date:'dd/MM/yyyy' }}</div>
            <div class="tecnico-cell estado-activo desktop-only">
              <span class="badge-estado" [class]="esTecnicoActivo(tecnico) ? 'activo' : 'inactivo'">
                {{ esTecnicoActivo(tecnico) ? 'Activo' : 'Inactivo' }}
              </span>
            </div>
            <div class="tecnico-cell acciones">
              <button class="btn-ver" title="Ver detalles" (click)="abrirModalEditarTecnico(tecnico)">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
              <button 
                class="btn-toggle-estado" 
                [title]="esTecnicoActivo(tecnico) ? 'Desactivar t\xE9cnico' : 'Activar t\xE9cnico'"
                (click)="toggleEstadoTecnico(tecnico)">
                <ion-icon [name]="esTecnicoActivo(tecnico) ? 'pause-circle' : 'play-circle'"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginaci\xF3n -->
    <div *ngIf="!loading && !error && tecnicos.length > 0" class="table-pagination">
      <div class="pagination-info">
        Mostrando {{ (paginaActual - 1) * porPagina + 1 }} - {{ Math.min(paginaActual * porPagina, totalTecnicos) }} de {{ totalTecnicos }} t\xE9cnicos
      </div>
      <div class="pagination">
        <button 
          [disabled]="paginaActual === 1"
          (click)="cambiarPagina(paginaActual - 1)">
          Anterior
        </button>
        <button 
          *ngFor="let pagina of getPaginas()"
          [class.active]="pagina === paginaActual"
          (click)="cambiarPagina(pagina)">
          {{ pagina }}
        </button>
        <button 
          [disabled]="paginaActual === getTotalPaginas()"
          (click)="cambiarPagina(paginaActual + 1)">
          Siguiente
        </button>
      </div>
    </div>

    <!-- Estado de datos vac\xEDos -->
    <div *ngIf="!loading && !error && tecnicos.length === 0" class="no-data-container">
      <div class="no-data-message">
        <ion-icon name="construct-outline"></ion-icon>
        <h3>No hay t\xE9cnicos</h3>
        <p>A\xFAn no se han creado t\xE9cnicos. Crea el primero para comenzar.</p>
        <button class="btn-create" (click)="abrirModalCrearTecnico()">
          <ion-icon name="add-circle"></ion-icon>
          Crear t\xE9cnico
        </button>
      </div>
    </div>

  </section>
</ion-content> `, styles: [`/* src/app/modules/tecnicos/pages/tecnicos/tecnicos.component.scss */
ion-content {
  --background: #FFF;
}
.dashboard-table {
  background: #fff;
  padding: 25px;
}
.table-header {
  display: flex;
  align-items: center;
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
.table-search .btn-filter {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 1rem;
  border: 1px solid #E2E8F0;
  background: #F9FBFF;
  color: #26262A;
  cursor: pointer;
  transition: all 0.2s ease;
}
.table-search .btn-filter:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
}
.table-search .btn-filter.active {
  background: #4F46E5;
  color: white;
  border-color: #4F46E5;
}
.table-search .btn-filter.active:hover {
  background: #4338CA;
}
.table-search .btn-filter ion-icon {
  font-size: 16px;
}
.mobile-search {
  display: none;
  position: relative;
  width: 100%;
  padding: 0px 16px;
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
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
.loading-state .loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #6B7280;
}
.loading-state .loading-spinner ion-icon {
  font-size: 32px;
  color: #4F46E5;
}
.loading-state .loading-spinner ion-icon.spinning {
  animation: spin 1s linear infinite;
}
.loading-state .loading-spinner p {
  margin: 0;
  font-size: 14px;
}
.error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
.error-state .error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  color: #DC2626;
}
.error-state .error-message ion-icon {
  font-size: 32px;
}
.error-state .error-message p {
  margin: 0;
  font-size: 14px;
}
.error-state .error-message .btn-retry {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #DC2626;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.error-state .error-message .btn-retry:hover {
  background: #B91C1C;
}
.error-state .error-message .btn-retry ion-icon {
  font-size: 16px;
}
.table-header-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
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
}
.table-pagination .pagination button {
  background: #f3f4f6;
  min-width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 14px;
  color: #26262A;
  cursor: pointer;
}
.table-pagination .pagination button.active {
  background: #4F46E5;
  color: #fff;
}
.header-actions {
  display: flex;
  gap: 1rem;
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
.compact-tecnicos-table {
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #fff;
  margin-bottom: 16px;
  max-width: 100%;
  overflow-x: auto;
}
.compact-tecnicos-table .tecnicos-table {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 80px;
  font-size: 12px;
  min-width: 0;
}
.compact-tecnicos-table .tecnicos-table .table-header {
  display: contents;
}
.compact-tecnicos-table .tecnicos-table .table-header .header-row {
  display: contents;
}
.compact-tecnicos-table .tecnicos-table .table-header .header-row .header-cell {
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
  min-width: 0;
}
.compact-tecnicos-table .tecnicos-table .table-body {
  display: contents;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row {
  display: contents;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row:hover:not(.activo):not(.inactivo) .tecnico-cell {
  background-color: #F9FAFB;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row:active {
  transform: scale(0.98);
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row.activo .tecnico-cell:first-child {
  border-left: 4px solid #10B981;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row.activo .tecnico-cell {
  background-color: #ECFDF5;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row.activo:hover .tecnico-cell {
  background-color: #D1FAE5;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row.inactivo .tecnico-cell:first-child {
  border-left: 4px solid #EF4444;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row.inactivo .tecnico-cell {
  background-color: #FEF2F2;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row.inactivo:hover .tecnico-cell {
  background-color: #FEE2E2;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell {
  padding: 12px 8px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  min-width: 0;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.nombre-tecnico {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  justify-content: start;
  flex-shrink: 0;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.email-tecnico {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.telefono-tecnico {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.rol-tecnico {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.rol-tecnico .badge-rol {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.rol-tecnico .badge-rol.rol-admin {
  background: #FEE4E2;
  color: #D92D20;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.rol-tecnico .badge-rol.rol-tecnico {
  background: #E6F4EA;
  color: #137333;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.rol-tecnico .badge-rol.rol-usuario {
  background: #FEF3C7;
  color: #B45309;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.rol-tecnico .badge-rol.rol-default {
  background: #F3F4F6;
  color: #6B7280;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.fecha-tecnico {
  font-size: 12px;
  color: #6B7280;
  justify-content: start;
  flex-shrink: 0;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.estado-activo {
  justify-content: start;
  font-size: 11px;
  flex-shrink: 0;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.estado-activo .badge-estado {
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.estado-activo .badge-estado.activo {
  background: #E6F4EA;
  color: #137333;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.estado-activo .badge-estado.inactivo {
  background: #FEE4E2;
  color: #D92D20;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones {
  justify-content: start;
  gap: 4px;
  flex-shrink: 0;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button {
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
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button ion-icon {
  font-size: 16px;
  color: #6B7280;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button.btn-ver:hover {
  background-color: #10B981;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button.btn-ver:hover ion-icon {
  color: white;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button.btn-ver:active {
  transform: scale(0.9);
  background-color: #059669;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button.btn-toggle-estado:hover ion-icon[name=pause-circle] {
  color: #DC2626;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button.btn-toggle-estado:hover ion-icon[name=play-circle] {
  color: #059669;
}
.compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button.btn-toggle-estado:active {
  transform: scale(0.9);
}
@media (min-width: 769px) {
  .compact-tecnicos-table {
    max-width: 100%;
    overflow-x: auto;
  }
  .compact-tecnicos-table .tecnicos-table {
    grid-template-columns: 2fr 180px 140px 120px 140px 80px 120px;
    font-size: 13px;
    min-width: 0;
  }
  .compact-tecnicos-table .tecnicos-table .table-header .header-row .header-cell {
    font-size: 12px;
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell {
    padding: 12px 8px;
    min-width: 0;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.nombre-tecnico {
    font-size: 14px;
    flex-shrink: 0;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.email-tecnico {
    flex-shrink: 0;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.telefono-tecnico {
    flex-shrink: 0;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.rol-tecnico {
    flex-shrink: 0;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.fecha-tecnico {
    flex-shrink: 0;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.estado-activo {
    flex-shrink: 0;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones {
    flex-shrink: 0;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button {
    width: 28px;
    height: 28px;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button ion-icon {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .dashboard-table {
    height: 100%;
    margin: 0;
    padding: 0px;
    border-radius: 0;
    box-shadow: none;
  }
  .desktop-only {
    display: none !important;
  }
  .mobile-search,
  .mobile-actions {
    display: flex;
  }
  .table-header {
    margin-bottom: 12px;
    align-items: center;
    gap: 12px;
  }
  .table-header-left {
    flex: 1;
    padding: 0px 16px;
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
  .compact-tecnicos-table {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    max-height: none;
  }
  .compact-tecnicos-table .tecnicos-table .table-header .header-row .header-cell {
    font-size: 11px;
    padding: 8px 4px;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell {
    padding: 8px 4px;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.nombre-tecnico {
    font-size: 13px;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button {
    width: 24px;
    height: 24px;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button ion-icon {
    font-size: 14px;
  }
}
@media (max-width: 480px) {
  .dashboard-table {
    height: 100%;
    padding: 0px;
  }
  .mobile-actions {
    gap: 12px;
    padding: 0px 16px;
  }
  .mobile-actions .mobile-buttons {
    display: flex;
    width: 20%;
    justify-content: stretch;
  }
  .mobile-actions .mobile-buttons button {
    flex: 1;
    height: 40px;
  }
  .mobile-actions .mobile-buttons button ion-icon {
    font-size: 20px;
  }
  .compact-tecnicos-table {
    border-radius: 0px !important;
    border-left: none !important;
    border-right: none !important;
  }
  .compact-tecnicos-table .tecnicos-table {
    grid-template-columns: 1fr 70px;
  }
  .compact-tecnicos-table .tecnicos-table .table-header .header-row .header-cell {
    font-size: 10px;
    padding: 6px 2px;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell {
    padding: 6px 2px;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.nombre-tecnico {
    font-size: 12px;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button {
    width: 22px;
    height: 22px;
  }
  .compact-tecnicos-table .tecnicos-table .table-body .tecnico-row .tecnico-cell.acciones button ion-icon {
    font-size: 12px;
  }
}
.mobile-only {
  display: none;
}
@media (max-width: 768px) {
  .mobile-only {
    display: flex !important;
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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
/*# sourceMappingURL=tecnicos.component.css.map */
`] }]
  }], () => [{ type: ModalController }, { type: TecnicosService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TecnicosComponent, { className: "TecnicosComponent", filePath: "src/app/modules/tecnicos/pages/tecnicos/tecnicos.component.ts", lineNumber: 47 });
})();
export {
  TecnicosComponent
};
//# sourceMappingURL=tecnicos.component-7WE6FI57.js.map
