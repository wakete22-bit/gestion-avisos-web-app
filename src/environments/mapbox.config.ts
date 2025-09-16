// Configuración de Mapbox
// IMPORTANTE: Reemplaza este token con tu token real de Mapbox
// Obtén tu token en: https://account.mapbox.com/access-tokens/

export const MAPBOX_CONFIG = {
  // Token de acceso de Mapbox (REQUERIDO)
  accessToken: 'pk.eyJ1IjoiYXNodG9vbiIsImEiOiJjbWZtOHF3YzQwZG9yMmpzaGNhNXNpaWtsIn0.udiZl1gx-KPtmFoebM3VOg', // Token de ashtoon
  
  // Estilo del mapa por defecto
  defaultStyle: 'mapbox://styles/mapbox/streets-v12',
  
  // Configuración de navegación
  navigation: {
    unit: 'metric',
    profile: 'driving',
    alternatives: false,
    geometries: 'geojson'
  }
};

// Instrucciones para obtener tu token de Mapbox:
// 1. Ve a https://account.mapbox.com/
// 2. Crea una cuenta gratuita
// 3. Ve a "Access tokens" en tu dashboard
// 4. Copia tu token público (pk.eyJ...)
// 5. Reemplaza el token de arriba con tu token real
// 6. El token gratuito incluye 50,000 cargas de mapa por mes
