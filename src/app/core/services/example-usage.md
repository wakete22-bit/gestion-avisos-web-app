# 📱 Ejemplos de Uso - Supabase Mobile Service

## 🔐 Autenticación

### Login de Usuario

```typescript
// En tu componente de login
async login(email: string, password: string) {
  try {
    const response = await this.authService.login({ email, password });
    console.log('Usuario autenticado:', response.usuario);
    
    // La sesión se guarda automáticamente en Capacitor Preferences
    // No necesitas hacer nada más
    
  } catch (error) {
    console.error('Error en login:', error);
  }
}
```

### Verificar Estado de Autenticación

```typescript
// En cualquier componente
ngOnInit() {
  // Suscribirse a cambios de autenticación
  this.authService.isAuthenticated$.subscribe(isAuth => {
    if (isAuth) {
      const user = this.authService.getCurrentUser();
      console.log('Usuario actual:', user);
    } else {
      console.log('No hay usuario autenticado');
    }
  });
}
```

## 📊 Operaciones con Base de Datos

### Consulta Simple

```typescript
// En tu servicio o componente
async getAvisos() {
  try {
    const client = this.supabaseClientService.getClient();
    
    const { data, error } = await client
      .from('avisos')
      .select('*')
      .order('fecha_creacion', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error obteniendo avisos:', error);
    return [];
  }
}
```

### Consulta con Filtros

```typescript
async getAvisosPorEstado(estado: string) {
  try {
    const client = this.supabaseClientService.getClient();
    
    const { data, error } = await client
      .from('avisos')
      .select(`
        *,
        cliente:clientes(nombre, telefono),
        tecnico:tecnicos(nombre)
      `)
      .eq('estado', estado)
      .eq('es_activo', true);
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error obteniendo avisos por estado:', error);
    return [];
  }
}
```

## 🔄 Realtime (Tiempo Real)

### Suscripción a Cambios

```typescript
// En tu componente
ngOnInit() {
  this.setupRealtimeSubscription();
}

private setupRealtimeSubscription() {
  const client = this.supabaseClientService.getClient();
  
  // Suscribirse a cambios en la tabla avisos
  const subscription = client
    .channel('avisos_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'avisos'
      },
      (payload) => {
        console.log('Cambio en avisos:', payload);
        
        // Actualizar tu UI aquí
        this.handleAvisoChange(payload);
      }
    )
    .subscribe();
    
  // Guardar la suscripción para limpiarla después
  this.subscriptions.push(subscription);
}

ngOnDestroy() {
  // Limpiar suscripciones
  this.subscriptions.forEach(sub => sub.unsubscribe());
}
```

## 💾 Almacenamiento Local

### Guardar Datos del Usuario

```typescript
// En tu servicio
async saveUserPreferences(preferences: any) {
  try {
    await this.preferencesService.set(
      PREFERENCES_KEYS.USER_PREFERENCES, 
      {
        ...preferences,
        timestamp: Date.now()
      }
    );
    
    console.log('Preferencias guardadas');
  } catch (error) {
    console.error('Error guardando preferencias:', error);
  }
}
```

### Recuperar Datos del Usuario

```typescript
async getUserPreferences() {
  try {
    const preferences = await this.preferencesService.get(
      PREFERENCES_KEYS.USER_PREFERENCES
    );
    
    if (preferences && !this.preferencesService.isExpired(
      preferences.timestamp, 
      'USER_PREFERENCES'
    )) {
      return preferences;
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo preferencias:', error);
    return null;
  }
}
```

## 🚀 Inicialización de la App

### En app.component.ts

```typescript
export class AppComponent implements OnInit {
  constructor(
    private appInitService: AppInitService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    try {
      // Inicializar la app y restaurar sesión
      await this.appInitService.initializeApp();
      
      // Verificar si la app se inicializó correctamente
      if (this.appInitService.isAppInitialized()) {
        console.log('App inicializada correctamente');
        
        // Suscribirse a cambios de autenticación
        this.authService.isAuthenticated$.subscribe(isAuth => {
          if (isAuth) {
            console.log('Usuario autenticado después de inicialización');
          }
        });
      }
      
    } catch (error) {
      console.error('Error en inicialización:', error);
    }
  }
}
```

## 🔍 Debugging y Monitoreo

### Verificar Estado del Sistema

```typescript
// En tu componente de debug o admin
async checkSystemStatus() {
  try {
    // Estado del token
    const tokenStatus = await this.authService.debugTokenStatus();
    console.log('Estado del token:', tokenStatus);
    
    // Información de almacenamiento
    const storageInfo = await this.preferencesService.getStorageInfo();
    console.log('Información de almacenamiento:', storageInfo);
    
    // Sesión actual
    const currentSession = await this.supabaseClientService.getCurrentSession();
    console.log('Sesión actual:', currentSession);
    
  } catch (error) {
    console.error('Error verificando estado del sistema:', error);
  }
}
```

### Limpiar Datos Expirados

```typescript
// Limpieza manual de datos expirados
async cleanupExpiredData() {
  try {
    await this.preferencesService.cleanupExpiredData();
    console.log('Limpieza completada');
  } catch (error) {
    console.error('Error en limpieza:', error);
  }
}
```

## 📱 Manejo de Estados de la App

### Detectar Cambios de Estado

```typescript
// En tu componente principal
ngOnInit() {
  // El servicio ya maneja esto automáticamente,
  // pero puedes agregar lógica adicional si es necesario
  
  // Por ejemplo, mostrar un indicador cuando la app está reconectando
  this.platform.resume.subscribe(() => {
    console.log('App resumida, verificando conexión...');
    // Mostrar spinner o indicador de reconexión
  });
  
  this.platform.pause.subscribe(() => {
    console.log('App pausada');
    // Pausar operaciones no críticas
  });
}
```

## 🛡️ Manejo de Errores

### Interceptor de Errores

```typescript
// En tu interceptor HTTP
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token expirado, intentar refresh
        this.authService.refreshToken().subscribe(
          () => {
            // Reintentar la request original
            return next.handle(request);
          },
          (refreshError) => {
            // Refresh falló, redirigir al login
            this.router.navigate(['/login']);
            return throwError(refreshError);
          }
        );
      }
      
      return throwError(error);
    })
  );
}
```

## 🔄 Sincronización Offline

### Guardar Datos para Sincronización

```typescript
// En tu servicio
async saveOfflineData(data: any, table: string) {
  try {
    const offlineKey = `offline_${table}_${Date.now()}`;
    
    await this.preferencesService.set(offlineKey, {
      data,
      table,
      timestamp: Date.now(),
      synced: false
    });
    
    console.log('Datos offline guardados');
  } catch (error) {
    console.error('Error guardando datos offline:', error);
  }
}

// Sincronizar cuando hay conexión
async syncOfflineData() {
  try {
    const keys = await this.preferencesService.keys();
    const offlineKeys = keys.filter(key => key.startsWith('offline_'));
    
    for (const key of offlineKeys) {
      const offlineData = await this.preferencesService.get(key);
      
      if (offlineData && !offlineData.synced) {
        // Intentar sincronizar
        await this.syncDataToServer(offlineData);
        
        // Marcar como sincronizado
        offlineData.synced = true;
        await this.preferencesService.set(key, offlineData);
      }
    }
    
    console.log('Sincronización offline completada');
  } catch (error) {
    console.error('Error en sincronización offline:', error);
  }
}
```

---

## 💡 Consejos de Uso

1. **Siempre usa try-catch** para operaciones asíncronas
2. **Limpia las suscripciones** en `ngOnDestroy`
3. **Verifica el estado de la app** antes de operaciones críticas
4. **Usa los logs del sistema** para debugging
5. **Implementa manejo offline** para mejor experiencia del usuario
6. **Mantén las suscripciones realtime** solo cuando sean necesarias

## 🚨 Casos Especiales

### App en Background por Mucho Tiempo

```typescript
// El servicio maneja esto automáticamente, pero puedes agregar lógica adicional
this.platform.resume.subscribe(() => {
  const timeInBackground = Date.now() - this.lastPauseTime;
  
  if (timeInBackground > 30 * 60 * 1000) { // 30 minutos
    console.log('App estuvo en background por mucho tiempo, verificando sesión...');
    this.authService.ensureValidToken();
  }
});
```

### Cambios de Red

```typescript
// Puedes agregar un listener para cambios de conectividad
window.addEventListener('online', () => {
  console.log('Conexión restaurada, sincronizando...');
  this.syncOfflineData();
});

window.addEventListener('offline', () => {
  console.log('Conexión perdida, guardando datos offline...');
});
```
