# Integración con Mapas Nativos

## Descripción

Se ha implementado una funcionalidad completa para integrar la aplicación con mapas nativos (Google Maps y Apple Maps) cuando los usuarios están viendo avisos en el modo mapa.

## Características

### 🗺️ **Navegación a Mapas Nativos**
- **Google Maps**: Se abre la aplicación nativa de Google Maps en dispositivos Android e iOS
- **Apple Maps**: Se abre la aplicación nativa de Apple Maps en dispositivos iOS
- **Fallback Web**: Si las aplicaciones nativas no están disponibles, se abre en el navegador web

### 📱 **Detección Automática de Dispositivo**
- **iOS**: Prioriza Apple Maps, con fallback a Google Maps
- **Android**: Prioriza Google Maps
- **Desktop**: Abre en nueva pestaña del navegador

### 🎯 **Múltiples Opciones de Acceso**
1. **Botón de Navegación**: Nuevo botón azul con icono de navegación en cada fila de avisos
2. **Menú de Opciones**: Al hacer clic, se muestra un menú con opciones para elegir entre Google Maps, Apple Maps o mapa predeterminado
3. **Coordenadas Inteligentes**: Usa coordenadas exactas si están disponibles, o geocodifica la dirección

## Cómo Usar

### Para Usuarios

1. **En la Vista de Lista**:
   - Busca el botón azul con icono de navegación (🧭) en la columna de acciones
   - Haz clic para abrir el menú de opciones de mapas

2. **En la Vista de Mapa**:
   - Haz clic en cualquier fila de avisos en la lista lateral
   - Usa el botón de navegación para abrir en mapas nativos
   - O haz clic directamente en el marcador del mapa

3. **Opciones Disponibles**:
   - **Google Maps**: Abre en la aplicación de Google Maps
   - **Apple Maps**: Abre en la aplicación de Apple Maps (solo iOS)
   - **Mapa Predeterminado**: Abre en la aplicación de mapas predeterminada del dispositivo

### Para Desarrolladores

#### Servicio: `MapsIntegrationService`

```typescript
// Inyectar el servicio
constructor(private mapsIntegrationService: MapsIntegrationService) {}

// Abrir en Google Maps
this.mapsIntegrationService.openGoogleMaps(coordinates, options);

// Abrir en Apple Maps
this.mapsIntegrationService.openAppleMaps(coordinates, options);

// Mostrar menú de opciones
this.mapsIntegrationService.showMapsOptions(coordinates, options);

// Abrir mapa predeterminado
this.mapsIntegrationService.openDefaultMaps(coordinates, options);
```

#### Interfaz de Coordenadas

```typescript
interface MapCoordinates {
  latitude: number;
  longitude: number;
  address?: string;
}

interface MapOptions {
  zoom?: number;
  label?: string;
}
```

## Implementación Técnica

### Archivos Modificados

1. **`src/app/core/services/maps-integration.service.ts`** (NUEVO)
   - Servicio principal para manejar la integración con mapas
   - Detección de dispositivo y plataforma
   - Generación de URLs para diferentes aplicaciones de mapas

2. **`src/app/modules/avisos/pages/avisos/avisos.component.ts`**
   - Integración del servicio de mapas
   - Nuevos métodos para manejar la navegación
   - Gestión de coordenadas y direcciones

3. **`src/app/modules/avisos/pages/avisos/avisos.component.html`**
   - Nuevos botones de navegación en las tablas
   - Iconos de navegación añadidos

4. **`src/app/modules/avisos/pages/avisos/avisos.component.scss`**
   - Estilos para los nuevos botones de navegación
   - Estilos para el menú de opciones de mapas

### Esquemas de URL Utilizados

#### Google Maps
- **Android**: `geo:lat,lng?q=lat,lng(label)`
- **iOS**: `comgooglemaps://?center=lat,lng&zoom=15&q=lat,lng`
- **Web**: `https://www.google.com/maps/search/?api=1&query=lat,lng`

#### Apple Maps
- **iOS**: `maps://?q=lat,lng&ll=lat,lng&z=15`
- **Web**: `https://maps.apple.com/?q=lat,lng&ll=lat,lng&z=15`

## Compatibilidad

### Dispositivos Soportados
- ✅ **iOS**: iPhone, iPad (Apple Maps + Google Maps)
- ✅ **Android**: Teléfonos y tablets (Google Maps)
- ✅ **Desktop**: Windows, macOS, Linux (navegador web)

### Aplicaciones Soportadas
- ✅ **Google Maps** (Android, iOS, Web)
- ✅ **Apple Maps** (iOS, Web)
- ✅ **Fallback Web** (todos los dispositivos)

## Características Avanzadas

### 🎯 **Geocodificación Inteligente**
- Si hay coordenadas exactas del marcador, las usa directamente
- Si no hay coordenadas, usa la dirección para geocodificación
- Manejo de errores y fallbacks automáticos

### 🔄 **Fallback Automático**
- Si la aplicación nativa no está instalada, abre en el navegador
- Timeout de 2 segundos para detectar si la app se abrió correctamente
- Fallback a Google Maps si Apple Maps no está disponible en Android

### 🎨 **Interfaz de Usuario**
- Menú modal con opciones de mapas
- Animaciones suaves y diseño responsivo
- Iconos distintivos para cada aplicación de mapas
- Botones con colores que coinciden con las marcas (Google: azul, Apple: azul claro)

## Próximas Mejoras

- [ ] Integración con Waze
- [ ] Opción para guardar ubicaciones favoritas
- [ ] Historial de navegación
- [ ] Compartir ubicación por WhatsApp/Telegram
- [ ] Modo offline con caché de coordenadas

## Troubleshooting

### Problemas Comunes

1. **No se abre la aplicación nativa**:
   - Verificar que la aplicación esté instalada
   - El sistema automáticamente abrirá el navegador como fallback

2. **Coordenadas incorrectas**:
   - Verificar que la dirección del aviso esté completa
   - El sistema usará geocodificación automática

3. **Menú no aparece**:
   - Verificar que el servicio esté inyectado correctamente
   - Revisar la consola para errores de JavaScript

### Logs de Debug

El servicio incluye logs detallados para debugging:
- `console.log('Abriendo Google Maps...')`
- `console.warn('No hay coordenadas ni dirección disponible')`
- `console.error('Error al abrir URL:', error)`
