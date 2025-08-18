import {
  BehaviorSubject,
  HttpClient,
  HttpHeaders,
  Injectable,
  SupabaseClientService,
  catchError,
  from,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-ANYKLJQR.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-KNQSF6OU.js";

// src/app/core/services/usuarios.service.ts
var _UsuariosService = class _UsuariosService {
  constructor(supabaseClientService) {
    this.supabaseClientService = supabaseClientService;
    this.usuariosSubject = new BehaviorSubject([]);
    this.usuarios$ = this.usuariosSubject.asObservable();
    this.supabase = this.supabaseClientService.getClient();
  }
  /**
   * Obtiene la lista de usuarios
   */
  getUsuarios() {
    return from(this.supabase.from("usuarios").select(`
          *,
          rol:roles(*)
        `).order("fecha_creacion", { ascending: false })).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const usuarios = data;
      this.usuariosSubject.next(usuarios);
      return usuarios;
    }), catchError((error) => {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }));
  }
  /**
   * Obtiene un usuario por su ID
   */
  getUsuario(id) {
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
   * Crea un nuevo usuario en la tabla usuarios
   */
  crearUsuario(userData) {
    const usuarioData = {
      id: userData.id,
      // ID del usuario de Supabase Auth
      nombre_completo: userData.nombre_completo,
      email: userData.email,
      telefono: userData.telefono,
      rol_id: userData.rol_id || "default-role-id",
      fecha_creacion: (/* @__PURE__ */ new Date()).toISOString(),
      es_activo: true
    };
    return from(this.supabase.from("usuarios").insert([usuarioData]).select(`
          *,
          rol:roles(*)
        `).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const nuevoUsuario = data;
      const usuariosActuales = this.usuariosSubject.value;
      this.usuariosSubject.next([nuevoUsuario, ...usuariosActuales]);
      return nuevoUsuario;
    }));
  }
  /**
   * Actualiza un usuario existente
   */
  actualizarUsuario(id, usuario) {
    const datosActualizados = __spreadProps(__spreadValues({}, usuario), {
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    });
    return from(this.supabase.from("usuarios").update(datosActualizados).eq("id", id).select(`
          *,
          rol:roles(*)
        `).single()).pipe(map(({ data, error }) => {
      if (error)
        throw error;
      const usuarioActualizado = data;
      const usuariosActuales = this.usuariosSubject.value;
      const index = usuariosActuales.findIndex((u) => u.id === id);
      if (index !== -1) {
        usuariosActuales[index] = usuarioActualizado;
        this.usuariosSubject.next([...usuariosActuales]);
      }
      return usuarioActualizado;
    }));
  }
  /**
   * Desactiva un usuario (marcar como inactivo)
   */
  desactivarUsuario(id) {
    return from(this.supabase.from("usuarios").update({
      es_activo: false,
      fecha_actualizacion: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", id)).pipe(map(({ error }) => {
      if (error)
        throw error;
      const usuariosActuales = this.usuariosSubject.value;
      const index = usuariosActuales.findIndex((u) => u.id === id);
      if (index !== -1) {
        usuariosActuales[index].es_activo = false;
        this.usuariosSubject.next([...usuariosActuales]);
      }
    }));
  }
  /**
   * Obtiene el valor actual de usuarios
   */
  getUsuariosActuales() {
    return this.usuariosSubject.value;
  }
  /**
   * Limpia el estado de usuarios
   */
  limpiarUsuarios() {
    this.usuariosSubject.next([]);
  }
};
_UsuariosService.\u0275fac = function UsuariosService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UsuariosService)(\u0275\u0275inject(SupabaseClientService));
};
_UsuariosService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UsuariosService, factory: _UsuariosService.\u0275fac, providedIn: "root" });
var UsuariosService = _UsuariosService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsuariosService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SupabaseClientService }], null);
})();

// src/app/core/services/auth.service.ts
var _AuthService = class _AuthService {
  constructor(http, usuariosService, supabaseClientService) {
    this.http = http;
    this.usuariosService = usuariosService;
    this.supabaseClientService = supabaseClientService;
    this.currentUserSubject = new BehaviorSubject(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isAuthenticatedSubject = new BehaviorSubject(false);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    this.TOKEN_KEY = "auth_token";
    this.USER_KEY = "current_user";
    this.isInitializing = false;
    this.supabase = this.supabaseClientService.getClient();
    this.initializeAuth();
  }
  initializeAuth() {
    return __async(this, null, function* () {
      if (this.isInitializing) {
        console.log("\u{1F527} AuthService: Ya se est\xE1 inicializando, esperando...");
        return;
      }
      this.isInitializing = true;
      try {
        console.log("\u{1F527} AuthService: Iniciando autenticaci\xF3n...");
        yield this.clearProblematicLocks();
        yield this.loadStoredAuth();
        this.setupAuthListener();
        console.log("\u{1F527} AuthService: Inicializaci\xF3n completada");
      } catch (error) {
        console.error("\u274C AuthService: Error en inicializaci\xF3n:", error);
        this.clearAuth();
      } finally {
        this.isInitializing = false;
      }
    });
  }
  loadStoredAuth() {
    return __async(this, null, function* () {
      try {
        console.log("\u{1F527} AuthService: Cargando autenticaci\xF3n almacenada...");
        const sessionPromise = this.supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout getting session")), 5e3));
        const { data: { session } } = yield Promise.race([sessionPromise, timeoutPromise]);
        if (session == null ? void 0 : session.user) {
          console.log("\u{1F527} AuthService: Sesi\xF3n encontrada, cargando datos del usuario...");
          yield this.loadUserData(session.user.id);
        } else {
          console.log("\u{1F527} AuthService: No hay sesi\xF3n almacenada");
        }
      } catch (error) {
        console.error("\u274C AuthService: Error loading stored auth:", error);
        if (error instanceof Error && error.message.includes("NavigatorLockAcquireTimeoutError")) {
          localStorage.setItem("supabase_lock_issue", "true");
          console.log("\u{1F527} AuthService: Problema de Navigator Lock detectado");
        }
        this.clearAuth();
      }
    });
  }
  setupAuthListener() {
    this.supabase.auth.onAuthStateChange((event, session) => __async(this, null, function* () {
      var _a;
      console.log("Auth state change:", event, (_a = session == null ? void 0 : session.user) == null ? void 0 : _a.id);
      if (event === "SIGNED_IN" && (session == null ? void 0 : session.user)) {
        yield this.loadUserData(session.user.id);
      } else if (event === "SIGNED_OUT") {
        this.clearAuth();
      } else if (event === "TOKEN_REFRESHED" && (session == null ? void 0 : session.user)) {
        yield this.loadUserData(session.user.id);
      }
    }));
  }
  loadUserData(userId) {
    return __async(this, null, function* () {
      try {
        console.log("\u{1F527} AuthService: Cargando datos del usuario:", userId);
        try {
          const usuario = yield this.usuariosService.getUsuario(userId).toPromise();
          console.log("\u{1F527} AuthService: Usuario encontrado en BD:", usuario);
          this.currentUserSubject.next(usuario || null);
          this.isAuthenticatedSubject.next(true);
          console.log("\u{1F527} AuthService: Usuario cargado exitosamente desde BD");
        } catch (dbError) {
          console.warn("\u26A0\uFE0F AuthService: Usuario no encontrado en BD, esperando a que se complete la creaci\xF3n:", dbError);
          yield new Promise((resolve) => setTimeout(resolve, 3e3));
          try {
            const usuario = yield this.usuariosService.getUsuario(userId).toPromise();
            console.log("\u{1F527} AuthService: Usuario encontrado despu\xE9s de esperar:", usuario);
            this.currentUserSubject.next(usuario || null);
            this.isAuthenticatedSubject.next(true);
            console.log("\u{1F527} AuthService: Usuario cargado exitosamente despu\xE9s de esperar");
          } catch (finalError) {
            console.error("\u274C AuthService: Usuario no encontrado despu\xE9s de esperar, creando usuario por defecto:", finalError);
            const usuarioDefault = {
              id: userId,
              nombre_completo: "Usuario",
              email: "usuario@example.com",
              telefono: "",
              rol_id: "default-role-id",
              rol: {
                id: "default-role-id",
                nombre_rol: "Cliente",
                descripcion: "",
                permisos: [],
                es_activo: true,
                fecha_creacion: /* @__PURE__ */ new Date(),
                fecha_actualizacion: /* @__PURE__ */ new Date()
              },
              es_activo: true,
              fecha_creacion: /* @__PURE__ */ new Date()
            };
            console.log("\u{1F527} AuthService: Usuario por defecto creado:", usuarioDefault);
            this.currentUserSubject.next(usuarioDefault);
            this.isAuthenticatedSubject.next(true);
            console.log("\u{1F527} AuthService: Usuario por defecto cargado exitosamente");
          }
        }
      } catch (error) {
        console.error("\u274C AuthService: Error loading user data:", error);
        this.clearAuth();
      }
    });
  }
  login(credentials) {
    return __async(this, null, function* () {
      var _a;
      try {
        const { data, error } = yield this.supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });
        if (error)
          throw error;
        if (data.user) {
          yield this.loadUserData(data.user.id);
          return {
            usuario: this.currentUserSubject.value,
            token: ((_a = data.session) == null ? void 0 : _a.access_token) || ""
          };
        }
        throw new Error("No se pudo obtener informaci\xF3n del usuario");
      } catch (error) {
        console.error("Error en login:", error);
        throw error;
      }
    });
  }
  register(userData) {
    return __async(this, null, function* () {
      var _a;
      try {
        const { data, error } = yield this.supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              nombre_completo: userData.nombre_completo,
              telefono: userData.telefono
            }
          }
        });
        if (error)
          throw error;
        if (data.user) {
          yield new Promise((resolve) => setTimeout(resolve, 2e3));
          const userDataWithId = __spreadProps(__spreadValues({}, userData), {
            id: data.user.id
          });
          try {
            yield this.usuariosService.crearUsuario(userDataWithId).toPromise();
            console.log("\u{1F527} AuthService: Usuario creado en tabla usuarios");
          } catch (createError) {
            console.warn("\u26A0\uFE0F AuthService: Error al crear usuario en tabla usuarios:", createError);
          }
          yield this.loadUserData(data.user.id);
          return {
            usuario: this.currentUserSubject.value,
            token: ((_a = data.session) == null ? void 0 : _a.access_token) || ""
          };
        }
        throw new Error("No se pudo crear el usuario");
      } catch (error) {
        console.error("Error en registro:", error);
        throw error;
      }
    });
  }
  logout() {
    return __async(this, null, function* () {
      yield this.supabase.auth.signOut();
      this.clearAuth();
    });
  }
  refreshToken() {
    return __async(this, null, function* () {
      var _a;
      try {
        const { data, error } = yield this.supabase.auth.refreshSession();
        if (error)
          throw error;
        if (data.user) {
          yield this.loadUserData(data.user.id);
          return {
            usuario: this.currentUserSubject.value,
            token: ((_a = data.session) == null ? void 0 : _a.access_token) || ""
          };
        }
        throw new Error("No se pudo refrescar la sesi\xF3n");
      } catch (error) {
        this.clearAuth();
        throw error;
      }
    });
  }
  getCurrentUser() {
    return this.currentUserSubject.value;
  }
  isAuthenticated() {
    const isAuth = this.isAuthenticatedSubject.value;
    console.log("\u{1F527} AuthService: isAuthenticated() - Estado:", isAuth);
    return isAuth;
  }
  getToken() {
    return __async(this, null, function* () {
      const { data: { session } } = yield this.supabase.auth.getSession();
      const token = (session == null ? void 0 : session.access_token) || null;
      console.log("\u{1F527} AuthService: getToken() - Token obtenido:", token ? "S\xCD" : "NO");
      return token;
    });
  }
  clearAuth() {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
  // Método para obtener headers con token para requests autenticados
  getAuthHeaders() {
    return __async(this, null, function* () {
      const token = yield this.getToken();
      return new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
    });
  }
  // Verificar si el token ha expirado
  isTokenExpired() {
    return __async(this, null, function* () {
      const { data: { session } } = yield this.supabase.auth.getSession();
      if (!session)
        return true;
      return new Date(session.expires_at * 1e3) < /* @__PURE__ */ new Date();
    });
  }
  // Método público para obtener la sesión actual
  getCurrentSession() {
    return __async(this, null, function* () {
      return yield this.supabase.auth.getSession();
    });
  }
  // Método para refresh manual de token (solución para NavigatorLockAcquireTimeoutError)
  manualRefreshToken() {
    return __async(this, null, function* () {
      try {
        console.log("\u{1F504} AuthService: Iniciando refresh manual de token...");
        const { data: { session } } = yield this.supabase.auth.getSession();
        if (!session) {
          console.log("\u{1F504} AuthService: No hay sesi\xF3n activa para refrescar");
          return false;
        }
        const expiresAt = session.expires_at * 1e3;
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now;
        const fiveMinutes = 5 * 60 * 1e3;
        if (timeUntilExpiry > fiveMinutes) {
          console.log("\u{1F504} AuthService: Token a\xFAn v\xE1lido, no es necesario refrescar");
          return true;
        }
        console.log("\u{1F504} AuthService: Token pr\xF3ximo a expirar, refrescando...");
        const refreshPromise = this.supabase.auth.refreshSession();
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Refresh timeout")), 1e4));
        const { data, error } = yield Promise.race([refreshPromise, timeoutPromise]);
        if (error) {
          console.error("\u274C AuthService: Error en refresh manual:", error);
          return false;
        }
        if (data.session) {
          console.log("\u{1F504} AuthService: Token refrescado exitosamente");
          if (data.user) {
            yield this.loadUserData(data.user.id);
          }
          return true;
        }
        console.log("\u{1F504} AuthService: No se pudo refrescar el token");
        return false;
      } catch (error) {
        console.error("\u274C AuthService: Error en refresh manual:", error);
        if (error instanceof Error && error.message.includes("NavigatorLockAcquireTimeoutError")) {
          console.log("\u{1F504} AuthService: Error de lock detectado, limpiando...");
          yield this.clearProblematicLocks();
          localStorage.setItem("supabase_lock_issue", "true");
        }
        return false;
      }
    });
  }
  // Método para asegurar que el token sea válido
  ensureValidToken() {
    return __async(this, null, function* () {
      try {
        const { data: { session } } = yield this.supabase.auth.getSession();
        if (!session) {
          return false;
        }
        const expiresAt = session.expires_at * 1e3;
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now;
        const fiveMinutes = 5 * 60 * 1e3;
        if (timeUntilExpiry <= fiveMinutes) {
          return yield this.manualRefreshToken();
        }
        return true;
      } catch (error) {
        console.error("\u274C AuthService: Error verificando validez del token:", error);
        return false;
      }
    });
  }
  // Método para limpiar locks problemáticos de forma más agresiva
  clearProblematicLocks() {
    return __async(this, null, function* () {
      try {
        console.log("\u{1F527} AuthService: Limpiando locks problem\xE1ticos...");
        const hasLockIssues = localStorage.getItem("supabase_lock_issue");
        if (hasLockIssues) {
          console.log("\u{1F527} AuthService: Detectados problemas de locks, limpiando...");
          localStorage.removeItem("supabase_lock_issue");
          const keysToRemove = Object.keys(localStorage).filter((key) => key.includes("supabase") || key.includes("sb-") || key.includes("auth") || key.includes("token"));
          keysToRemove.forEach((key) => {
            try {
              localStorage.removeItem(key);
              console.log(`\u{1F527} AuthService: Eliminado ${key}`);
            } catch (error) {
              console.warn(`\u26A0\uFE0F AuthService: Error eliminando ${key}:`, error);
            }
          });
          yield new Promise((resolve) => setTimeout(resolve, 1e3));
        }
      } catch (error) {
        console.warn("\u26A0\uFE0F AuthService: Error al limpiar locks:", error);
      }
    });
  }
  // Métodos de debug para diagnóstico
  debugTokenStatus() {
    return __async(this, null, function* () {
      try {
        const { data: { session } } = yield this.supabase.auth.getSession();
        if (!session) {
          return {
            hasSession: false,
            message: "No hay sesi\xF3n activa"
          };
        }
        const expiresAt = session.expires_at * 1e3;
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now;
        const fiveMinutes = 5 * 60 * 1e3;
        return {
          hasSession: true,
          userId: session.user.id,
          expiresAt: new Date(expiresAt).toISOString(),
          timeUntilExpiry: Math.floor(timeUntilExpiry / 1e3),
          // en segundos
          needsRefresh: timeUntilExpiry <= fiveMinutes,
          isExpired: timeUntilExpiry <= 0
        };
      } catch (error) {
        return {
          hasSession: false,
          error: error instanceof Error ? error.message : "Error desconocido"
        };
      }
    });
  }
  debugLocalStorage() {
    return __async(this, null, function* () {
      try {
        const supabaseKeys = Object.keys(localStorage).filter((key) => key.includes("supabase") || key.includes("sb-") || key.includes("auth"));
        return {
          totalKeys: Object.keys(localStorage).length,
          supabaseKeys,
          hasLockIssue: localStorage.getItem("supabase_lock_issue") !== null
        };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Error desconocido"
        };
      }
    });
  }
  forceClearLocks() {
    return __async(this, null, function* () {
      try {
        console.log("\u{1F527} AuthService: Forzando limpieza de locks...");
        const keysToRemove = Object.keys(localStorage).filter((key) => key.includes("supabase") || key.includes("sb-") || key.includes("auth") || key.includes("token"));
        keysToRemove.forEach((key) => {
          try {
            localStorage.removeItem(key);
            console.log(`\u{1F527} AuthService: Eliminado ${key}`);
          } catch (error) {
            console.warn(`\u26A0\uFE0F AuthService: Error eliminando ${key}:`, error);
          }
        });
        localStorage.setItem("supabase_lock_issue", "true");
        yield new Promise((resolve) => setTimeout(resolve, 2e3));
        console.log("\u{1F527} AuthService: Limpieza de locks completada");
      } catch (error) {
        console.error("\u274C AuthService: Error en limpieza forzada:", error);
      }
    });
  }
};
_AuthService.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(UsuariosService), \u0275\u0275inject(SupabaseClientService));
};
_AuthService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
var AuthService = _AuthService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: UsuariosService }, { type: SupabaseClientService }], null);
})();

export {
  UsuariosService,
  AuthService
};
//# sourceMappingURL=chunk-HVSDGWD4.js.map
