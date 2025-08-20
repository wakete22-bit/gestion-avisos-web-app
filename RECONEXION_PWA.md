# Sistema de Reconexión para PWA - Gestión Avisos

## 🎯 Problema Resuelto

Este sistema soluciona el problema común en PWAs donde, después de que la pantalla se apaga y vuelve a encenderse, la aplicación se queda mostrando componentes de "cargando..." indefinidamente.

### ¿Por qué ocurre esto?

1. **Ciclo de vida de PWAs en móviles**: Cuando la pantalla se apaga, el navegador/WebView pone la PWA en estado suspendido
2. **Conexiones WebSocket se cierran**: Supabase pierde la conexión realtime
3. **Observables de Angular se quedan "colgados"**: Los componentes esperan respuestas que nunca llegan
4. **Change Detection no se dispara**: Angular no detecta que debe actualizar la vista

## 🚀 Solución Implementada

### 1. SupabaseClientService Mejorado

El servicio existente ahora incluye:

- **Monitoreo de conexión realtime** con `onConnect` y `onDisconnect`
- **Manejo de reconexión automática** cuando la app vuelve del background
- **Timeouts para evitar loadings infinitos** usando `Promise.race`
- **Estado de conexión observable** para que los componentes sepan si están conectados

### 2. ReconnectionService

Nuevo servicio que:

- **Detecta cuando la PWA se reanuda** usando `visibilitychange` y `focus` events
- **Verifica la conexión de Supabase** con timeout de 5 segundos
- **Fuerza refresh automático** si la reconexión falla
- **Notifica a todos los componentes** cuando la app se reanuda

### 3. BasePageComponent

Componente base que las páginas pueden extender para:

- **Manejo automático de reconexión** sin código adicional
- **Loading con timeout automático** para evitar loadings infinitos
- **Métodos helper** para operaciones seguras con timeout
- **Integración automática** con el sistema de reconexión

## 📱 Cómo Usar

### Para Páginas Existentes

1. **Extender BasePageComponent**:

```typescript
import { BasePageComponent } from '../core/components/base-page.component';
import { ReconnectionService } from '../core/services/reconnection.service';

export class MiPagina extends BasePageComponent {
  constructor(
    // ... otros servicios
    reconnectionService: ReconnectionService,
    cdr: ChangeDetectorRef,
    loadingCtrl: LoadingController
  ) {
    super(reconnectionService, cdr, loadingCtrl);
  }

  // Implementar método abstracto
  protected onAppResumed(): void {
    // Recargar datos cuando la app se reanuda
    this.cargarDatos();
  }

  // Usar métodos del BasePageComponent
  async cargarDatos() {
    const loading = await this.showLoading('Cargando...', 8000);
    try {
      // ... lógica de carga
    } finally {
      await this.hideLoading();
    }
  }
}
```

### Para Nuevas Páginas

1. **Crear la página extendiendo BasePageComponent**
2. **Implementar el método `onAppResumed()`**
3. **Usar `showLoading()` y `hideLoading()` del componente base**

### Para Servicios

Los servicios pueden suscribirse al estado de conexión:

```typescript
constructor(private reconnectionService: ReconnectionService) {
  this.reconnectionService.connectionStatus.subscribe(isConnected => {
    if (!isConnected) {
      // Manejar desconexión
    }
  });
}
```

## 🔧 Configuración

### 1. AppComponent

El `ReconnectionService` se inicializa automáticamente en el `AppComponent`:

```typescript
constructor(
  // ... otros servicios
  private reconnectionService: ReconnectionService
) {}
```

### 2. Variables de Entorno

Asegúrate de que tu `environment.ts` tenga configurado Supabase:

```typescript
export const environment = {
  supabaseUrl: 'tu-url-de-supabase',
  supabaseAnonKey: 'tu-anon-key'
};
```

## 📊 Flujo de Funcionamiento

1. **Usuario apaga pantalla** → PWA va a background
2. **WebSocket se cierra** → Supabase se desconecta
3. **Usuario vuelve a la app** → Se detecta `visibilitychange` o `focus`
4. **ReconnectionService verifica conexión** → Timeout de 5 segundos
5. **Si la conexión está OK** → Notifica a todos los componentes
6. **Si la conexión falla** → Fuerza refresh de la app
7. **Componentes recargan datos** → Usuario ve contenido actualizado

## 🎨 Características del Sistema

### ✅ Ventajas

- **Automático**: No requiere intervención manual
- **Robusto**: Maneja fallos de conexión graciosamente
- **Eficiente**: Evita loadings infinitos
- **Integrado**: Funciona con tu stack Angular + Ionic + Supabase existente
- **Configurable**: Timeouts y comportamientos personalizables

### 🔧 Métodos Disponibles

#### BasePageComponent
- `showLoading(message, timeoutMs)`: Muestra loading con timeout automático
- `hideLoading()`: Oculta loading actual
- `withTimeout(operation, timeoutMs)`: Ejecuta operación con timeout
- `safeReloadData()`: Recarga datos de forma segura

#### ReconnectionService
- `appResumed`: Observable que emite cuando la app se reanuda
- `connectionStatus`: Observable del estado de conexión de Supabase

#### SupabaseClientService
- `testConnection(timeoutMs)`: Verifica conexión con timeout
- `getConnectionStatus()`: Observable del estado de conexión

## 🚨 Troubleshooting

### Problema: La reconexión no funciona

**Solución**: Verifica que:
1. El `ReconnectionService` esté inyectado en `AppComponent`
2. Las páginas extiendan `BasePageComponent`
3. El método `onAppResumed()` esté implementado

### Problema: Loadings siguen siendo infinitos

**Solución**: Asegúrate de:
1. Usar `showLoading()` y `hideLoading()` del componente base
2. Implementar timeouts en operaciones largas
3. Manejar errores correctamente en los observables

### Problema: La app se refresca demasiado

**Solución**: Ajusta:
1. El timeout en `testConnection()` (por defecto 5 segundos)
2. La lógica de reconexión en `handleAppResume()`

## 🔄 Migración de Páginas Existentes

### Paso 1: Cambiar la herencia

```typescript
// Antes
export class MiPagina implements OnInit, OnDestroy {

// Después  
export class MiPagina extends BasePageComponent implements OnInit, OnDestroy {
```

### Paso 2: Actualizar constructor

```typescript
constructor(
  // ... otros servicios
  reconnectionService: ReconnectionService,
  cdr: ChangeDetectorRef,
  loadingCtrl: LoadingController
) {
  super(reconnectionService, cdr, loadingCtrl);
}
```

### Paso 3: Llamar métodos del padre

```typescript
ngOnInit() {
  super.ngOnInit(); // Importante!
  // ... tu lógica
}

ngOnDestroy() {
  super.ngOnDestroy(); // Importante!
  // ... tu lógica
}
```

### Paso 4: Implementar onAppResumed

```typescript
protected onAppResumed(): void {
  // Recargar datos cuando la app se reanuda
  this.cargarDatos();
}
```

### Paso 5: Usar métodos del componente base

```typescript
// Reemplazar tu loading manual
// this.loading = true;

// Por el del componente base
const loading = await this.showLoading('Cargando...', 8000);

// Y al final
await this.hideLoading();
```

## 🎯 Resultado Esperado

Después de implementar este sistema:

1. **No más loadings infinitos** cuando la pantalla se apaga y vuelve
2. **Reconexión automática** de Supabase al volver a la app
3. **Datos actualizados** automáticamente tras la reconexión
4. **Mejor experiencia de usuario** en dispositivos móviles
5. **Manejo robusto de fallos** de conexión

## 📝 Notas Técnicas

- **Timeouts**: Configurados para evitar esperas indefinidas
- **NgZone**: Asegura que Angular detecte cambios en la reconexión
- **Capacitor**: Compatible con apps nativas y PWA
- **RxJS**: Uso de observables para comunicación entre servicios
- **Error Handling**: Manejo gracioso de fallos de conexión

---

**¡Con este sistema, tu PWA manejará perfectamente los ciclos de vida móviles y nunca más se quedará en loading infinito!** 🚀
