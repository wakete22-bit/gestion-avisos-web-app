# 🗺️ Configuración de Mapbox - Navegación en Tiempo Real

## 📋 Resumen

Se ha implementado **Mapbox** para reemplazar Leaflet y proporcionar navegación en tiempo real real dentro de la aplicación. Mapbox ofrece:

- ✅ **Navegación real** con instrucciones paso a paso
- ✅ **Rutas optimizadas** siguiendo carreteras reales
- ✅ **GPS en tiempo real** (cuando esté disponible)
- ✅ **Interfaz moderna** y responsive
- ✅ **Integración nativa** con Google Maps y Apple Maps

## 🔧 Configuración Requerida

### **1. Obtener Token de Mapbox**

1. **Crear cuenta gratuita** en [Mapbox](https://account.mapbox.com/)
2. **Ir a "Access tokens"** en tu dashboard
3. **Copiar tu token público** (empieza con `pk.eyJ...`)
4. **Reemplazar el token** en `src/environments/mapbox.config.ts`

```typescript
export const MAPBOX_CONFIG = {
  accessToken: 'pk.eyJ1IjoiYWRyaWFuZXNwIiwiYSI6ImNtZ2V0a2V0a2V0a2V0In0.example', // ← TU TOKEN AQUÍ
  // ... resto de configuración
};
```

### **2. Límites del Plan Gratuito**

- **50,000 cargas de mapa** por mes
- **100,000 requests** de direcciones por mes
- **Suficiente para desarrollo** y uso moderado

## 🚀 Funcionalidades Implementadas

### **Servicios Creados**

#### `MapboxNavigationService`
- **Inicialización del mapa** con estilos personalizados
- **Creación de rutas** entre waypoints
- **Navegación GPS** en tiempo real
- **Gestión de marcadores** personalizados
- **Integración con direcciones** nativas

#### `MapboxNavigationPanelComponent`
- **Panel flotante** con instrucciones de navegación
- **Progreso visual** de la ruta
- **Controles de navegación** (iniciar/detener)
- **Lista de pasos** detallada
- **Diseño responsive** para móvil y desktop

### **Características Principales**

#### **🗺️ Mapa Interactivo**
- **Estilo moderno** de Mapbox
- **Controles de zoom** y navegación
- **Pantalla completa** disponible
- **Marcadores personalizados** con colores según selección

#### **🧭 Navegación en Tiempo Real**
- **Instrucciones paso a paso** ("Girar a la izquierda", "Continuar recto")
- **Distancias precisas** en metros y kilómetros
- **Tiempo estimado** para cada segmento
- **Progreso visual** con barra de progreso
- **GPS tracking** (cuando esté disponible)

#### **📱 Interfaz Móvil**
- **Panel responsive** que se adapta al dispositivo
- **Botones táctiles** optimizados para dedos
- **Animaciones suaves** y transiciones
- **Colores distintivos** para diferentes tipos de maniobras

## 🎯 Cómo Usar

### **1. Seleccionar Avisos**
```typescript
// Los avisos se seleccionan con checkboxes
// Aparece automáticamente el botón de navegación
```

### **2. Crear Ruta**
```typescript
// Hacer clic en el botón verde "Navegación"
// Se crea la ruta automáticamente con Mapbox
// Se muestra el panel de navegación
```

### **3. Navegar**
```typescript
// Hacer clic en "Iniciar Navegación"
// Seguir las instrucciones paso a paso
// Ver el progreso en tiempo real
```

## 🔧 Configuración Avanzada

### **Estilos de Mapa Disponibles**
```typescript
// En mapbox.config.ts
defaultStyle: 'mapbox://styles/mapbox/streets-v12',     // Calles
defaultStyle: 'mapbox://styles/mapbox/satellite-v9',    // Satélite
defaultStyle: 'mapbox://styles/mapbox/outdoors-v12',    // Exterior
defaultStyle: 'mapbox://styles/mapbox/light-v11',       // Claro
defaultStyle: 'mapbox://styles/mapbox/dark-v11',        // Oscuro
```

### **Perfiles de Navegación**
```typescript
// En mapbox.config.ts
navigation: {
  profile: 'driving',    // En coche (por defecto)
  profile: 'walking',    // A pie
  profile: 'cycling',    // En bicicleta
}
```

### **Personalización de Marcadores**
```typescript
// Colores según estado
const markerColor = isSelected ? '#10B981' : '#4F46E5';
// Verde para seleccionado, azul para normal
```

## 📊 Comparación: Leaflet vs Mapbox

| Característica | Leaflet | Mapbox |
|----------------|---------|--------|
| **Navegación real** | ❌ Solo líneas rectas | ✅ Rutas reales |
| **Instrucciones** | ❌ No disponibles | ✅ Paso a paso |
| **GPS tracking** | ❌ No soportado | ✅ Tiempo real |
| **Optimización** | ❌ Básica | ✅ Avanzada |
| **Coste** | ✅ Gratuito | ⚠️ Plan gratuito limitado |
| **Personalización** | ⚠️ Limitada | ✅ Muy extensa |

## 🚨 Solución de Problemas

### **Error: "Invalid access token"**
```bash
# Solución: Verificar token en mapbox.config.ts
# Asegúrate de que el token sea válido y esté activo
```

### **Error: "Map container not found"**
```bash
# Solución: Verificar que el div con id="map" existe
# Asegúrate de que el mapa se inicializa después de que el DOM esté listo
```

### **Panel de navegación no aparece**
```bash
# Solución: Verificar que showNavigationPanel = true
# Usar el botón de debug naranja para mostrar/ocultar
```

## 🎉 ¡Mapbox Implementado!

Tu aplicación ahora tiene **navegación en tiempo real real** usando Mapbox. Los técnicos pueden:

- **Ver rutas reales** siguiendo carreteras
- **Recibir instrucciones** paso a paso
- **Navegar sin salir** de la aplicación
- **Optimizar sus rutas** automáticamente
- **Usar GPS** para seguimiento en tiempo real

**Próximo paso:** Obtener tu token de Mapbox y reemplazarlo en la configuración. 🚀

