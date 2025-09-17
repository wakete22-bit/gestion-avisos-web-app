import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { MAPBOX_CONFIG } from '../../../environments/mapbox.config';
import { VoiceNavigationService, VoiceInstruction } from './voice-navigation.service';

export interface MapboxCoordinates {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface MapboxNavigationStep {
  instruction: string;
  distance: number;
  duration: number;
  maneuver: {
    type: string;
    modifier?: string;
    bearing_after?: number;
    bearing_before?: number;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface MapboxNavigationRoute {
  steps: MapboxNavigationStep[];
  totalDistance: number;
  totalDuration: number;
  currentStepIndex: number;
  isNavigating: boolean;
  coordinates: [number, number][];
  currentLocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  remainingDistance: number;
  remainingTime: number;
  progress: number; // 0-100
}

@Injectable({
  providedIn: 'root'
})
export class MapboxNavigationService {
  private map: mapboxgl.Map | null = null;
  private navigationSubject = new BehaviorSubject<MapboxNavigationRoute | null>(null);
  private currentPosition: GeolocationPosition | null = null;
  private watchId: number | null = null;
  private currentRoute: MapboxNavigationRoute | null = null;
  private routeSource: mapboxgl.GeoJSONSource | null = null;
  private isInitialized = false;
  private htmlArrows: mapboxgl.Marker[] = [];
  private lastArrowUpdate = 0;
  
  // Control de notificaciones para evitar duplicados
  private lastNotificationStepIndex = -1;
  private lastNotificationTime = 0;
  private notificationCooldown = 3000; // 3 segundos entre notificaciones

  // Configuración de voz
  private voiceEnabled = true;
  private voiceCooldown = 2000; // 2 segundos entre instrucciones de voz
  private lastVoiceTime = 0;

  constructor(
    private voiceService: VoiceNavigationService
  ) {
    // Configurar token de Mapbox
    mapboxgl.accessToken = MAPBOX_CONFIG.accessToken;
  }

  /**
   * Inicializa el mapa de Mapbox con configuraciones optimizadas
   */
  initializeMap(containerId: string, options: {
    center?: [number, number];
    zoom?: number;
  } = {}): mapboxgl.Map {
    // Verificar que el contenedor existe
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Contenedor '${containerId}' no encontrado en el DOM`);
    }

    const defaultCenter: [number, number] = options.center || [-3.703790, 40.416775];
    const defaultZoom = options.zoom || 12;

    this.map = new mapboxgl.Map({
      container: containerId,
      style: MAPBOX_CONFIG.defaultStyle,
      center: defaultCenter,
      zoom: defaultZoom,
      accessToken: MAPBOX_CONFIG.accessToken,
      antialias: true,
      pitch: 0,
      bearing: 0,
      interactive: true,
      scrollZoom: true,
      boxZoom: true,
      dragRotate: true,
      dragPan: true,
      keyboard: true,
      doubleClickZoom: true,
      touchZoomRotate: true
    });

    // Añadir controles de navegación mejorados
    this.map.addControl(new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    }), 'top-right');
    
    this.map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    
    // Añadir control de escala
    this.map.addControl(new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 'bottom-left');

    // Configurar eventos del mapa
    this.setupMapEvents();

    this.isInitialized = true;
    return this.map;
  }

  /**
   * Configura eventos del mapa para navegación
   */
  private setupMapEvents() {
    if (!this.map) return;

    // Evento cuando el mapa está listo
    this.map.on('load', () => {
      console.log('🗺️ Mapa Mapbox cargado y listo');
      this.initializeRouteLayer();
    });

    // Evento de click en el mapa para debugging
    this.map.on('click', (e) => {
      console.log('📍 Click en coordenadas:', e.lngLat);
    });

    // Evento de movimiento del mapa (comentado para evitar spam de logs)
    // this.map.on('moveend', () => {
    //   if (this.map) {
    //     const center = this.map.getCenter();
    //     console.log('🗺️ Centro del mapa:', center);
    //   }
    // });
  }

  /**
   * Inicializa la capa de rutas en el mapa
   */
  private initializeRouteLayer() {
    if (!this.map) return;

    // Añadir fuente de datos para rutas
    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      }
    });

    // Añadir capa de línea para la ruta
    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#10B981',
        'line-width': 6,
        'line-opacity': 0.8
      }
    });

    // Añadir capa de puntos de inicio y fin
    this.map.addSource('route-points', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    // Punto de inicio
    this.map.addLayer({
      id: 'route-start',
      type: 'circle',
      source: 'route-points',
      filter: ['==', ['get', 'type'], 'start'],
      paint: {
        'circle-color': '#10B981',
        'circle-radius': 8,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 3
      }
    });

    // Punto de fin
    this.map.addLayer({
      id: 'route-end',
      type: 'circle',
      source: 'route-points',
      filter: ['==', ['get', 'type'], 'end'],
      paint: {
        'circle-color': '#EF4444',
        'circle-radius': 8,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 3
      }
    });

    // Puntos intermedios
    this.map.addLayer({
      id: 'route-waypoints',
      type: 'circle',
      source: 'route-points',
      filter: ['==', ['get', 'type'], 'waypoint'],
      paint: {
        'circle-color': '#3B82F6',
        'circle-radius': 6,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 2
      }
    });
  }

  /**
   * Crea una ruta usando la API de Mapbox Directions con optimizaciones
   */
  private async fetchRoute(waypoints: MapboxCoordinates[]): Promise<any> {
    // Validar que todos los waypoints tengan coordenadas válidas
    const validWaypoints = waypoints.filter(wp => 
      wp.latitude !== 0 || wp.longitude !== 0
    );

    if (validWaypoints.length !== waypoints.length) {
      console.warn('⚠️ Algunos waypoints tienen coordenadas inválidas (0,0), usando solo los válidos');
    }

    if (validWaypoints.length < 2) {
      throw new Error('Se necesitan al menos 2 waypoints con coordenadas válidas para crear una ruta');
    }

    const coordinates = validWaypoints.map(wp => `${wp.longitude},${wp.latitude}`).join(';');
    const profile = MAPBOX_CONFIG.navigation.profile;
    const accessToken = MAPBOX_CONFIG.accessToken;
    
    // Parámetros optimizados para mejor rendimiento y precisión
    const params = new URLSearchParams({
      geometries: 'geojson',
      steps: 'true',
      overview: 'full',
      alternatives: 'false',
      continue_straight: 'false',
      roundabout_exits: 'true',
      voice_instructions: 'true',
      banner_instructions: 'true',
      access_token: accessToken
    });
    
    const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates}?${params}`;
    
    console.log('🛣️ Solicitando ruta a Mapbox:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de API Mapbox:', response.status, errorText);
      throw new Error(`Error de API: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Ruta obtenida de Mapbox:', data);
    
    if (data.code !== 'Ok') {
      throw new Error(`Error de Mapbox: ${data.code} - ${data.message}`);
    }
    
    return data;
  }


  /**
   * Crea una ruta entre waypoints con funcionalidades avanzadas y optimización
   */
  async createRoute(waypoints: MapboxCoordinates[]): Promise<MapboxNavigationRoute> {
    if (waypoints.length < 2) {
      throw new Error('Se necesitan al menos 2 waypoints para crear una ruta');
    }

    console.log('🛣️ Creando ruta profesional para', waypoints.length, 'waypoints');

    try {
      // Optimizar orden de waypoints para menor distancia total
      const optimizedWaypoints = this.optimizeWaypointOrder(waypoints);
      console.log('🎯 Waypoints optimizados:', optimizedWaypoints.length);

      const response = await this.fetchRoute(optimizedWaypoints);
      const route = response.routes[0];
      
      if (!route) {
        throw new Error('No se encontró ninguna ruta');
      }

      // Procesar pasos de la ruta con información detallada y mejorada
      const steps: MapboxNavigationStep[] = [];
      let stepIndex = 0;
      
      route.legs.forEach((leg: any, legIndex: number) => {
        leg.steps.forEach((step: any, stepStepIndex: number) => {
          // Mejorar instrucciones para mayor claridad
          const enhancedInstruction = this.enhanceInstruction(step.maneuver.instruction);
          
          steps.push({
            instruction: enhancedInstruction,
            distance: step.distance,
            duration: step.duration,
            maneuver: {
              type: step.maneuver.type,
              modifier: step.maneuver.modifier,
              bearing_after: step.maneuver.bearing_after,
              bearing_before: step.maneuver.bearing_before
            },
            location: {
              latitude: step.maneuver.location[1],
              longitude: step.maneuver.location[0]
            }
          });
          stepIndex++;
        });
      });

      // Calcular estadísticas avanzadas de la ruta
      const routeStats = this.calculateRouteStats(route, steps);

      const navigationRoute: MapboxNavigationRoute = {
        steps,
        totalDistance: route.distance,
        totalDuration: route.duration,
        currentStepIndex: 0,
        isNavigating: false,
        coordinates: route.geometry.coordinates,
        remainingDistance: route.distance,
        remainingTime: route.duration,
        progress: 0
      };

      this.currentRoute = navigationRoute;
      this.navigationSubject.next(navigationRoute);

      // Dibujar ruta profesional en el mapa
      this.drawProfessionalRouteOnMap(route.geometry.coordinates, optimizedWaypoints, routeStats);

      // Inicializar sistema de navegación avanzado
      this.initializeAdvancedNavigation(steps);

      console.log('✅ Ruta profesional creada exitosamente:', {
        distancia: `${(route.distance / 1000).toFixed(1)} km`,
        duracion: `${Math.round(route.duration / 60)} min`,
        pasos: steps.length,
        waypointsOptimizados: optimizedWaypoints.length,
        estadisticas: routeStats
      });

      return navigationRoute;
    } catch (error) {
      console.error('❌ Error al crear ruta profesional:', error);
      throw error;
    }
  }

  /**
   * Optimiza el orden de waypoints para minimizar la distancia total
   */
  private optimizeWaypointOrder(waypoints: MapboxCoordinates[]): MapboxCoordinates[] {
    if (waypoints.length <= 2) {
      return waypoints;
    }

    console.log('🎯 Optimizando orden de waypoints...');
    
    // Algoritmo Nearest Neighbor mejorado
    const optimized: MapboxCoordinates[] = [];
    const remaining = [...waypoints];
    
    // Empezar con el primer waypoint
    let current = remaining.shift()!;
    optimized.push(current);
    
    while (remaining.length > 0) {
      let nearestIndex = 0;
      let nearestDistance = this.calculateDistance(
        current.latitude, current.longitude,
        remaining[0].latitude, remaining[0].longitude
      );
      
      // Encontrar el waypoint más cercano
      for (let i = 1; i < remaining.length; i++) {
        const distance = this.calculateDistance(
          current.latitude, current.longitude,
          remaining[i].latitude, remaining[i].longitude
        );
        
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = i;
        }
      }
      
      // Mover el waypoint más cercano a la lista optimizada
      current = remaining.splice(nearestIndex, 1)[0];
      optimized.push(current);
    }
    
    console.log('✅ Orden optimizado calculado');
    return optimized;
  }

  /**
   * Mejora las instrucciones de navegación para mayor claridad
   */
  private enhanceInstruction(instruction: string): string {
    // Traducir y mejorar instrucciones comunes
    const enhancements: { [key: string]: string } = {
      'Head': 'Dirígete',
      'Continue': 'Continúa',
      'Turn left': 'Gira a la izquierda',
      'Turn right': 'Gira a la derecha',
      'Sharp left': 'Gira bruscamente a la izquierda',
      'Sharp right': 'Gira bruscamente a la derecha',
      'Slight left': 'Gira ligeramente a la izquierda',
      'Slight right': 'Gira ligeramente a la derecha',
      'U-turn': 'Haz un cambio de sentido',
      'Arrive': 'Has llegado a',
      'Depart': 'Sal de',
      'Roundabout': 'Rotonda',
      'Fork': 'Bifurcación',
      'Merge': 'Incorpórate',
      'Ramp': 'Acceso',
      'End of road': 'Final de la carretera',
      'Go straight': 'Continúa recto',
      'Keep straight': 'Mantente recto',
      'Stay straight': 'Mantente recto',
      'Bear left': 'Inclínate a la izquierda',
      'Bear right': 'Inclínate a la derecha',
      'Keep left': 'Mantente a la izquierda',
      'Keep right': 'Mantente a la derecha',
      'Stay left': 'Mantente a la izquierda',
      'Stay right': 'Mantente a la derecha',
      'Make a U-turn': 'Haz un cambio de sentido',
      'Enter the roundabout': 'Entra en la rotonda',
      'Exit the roundabout': 'Sal de la rotonda',
      'Take the 1st exit': 'Toma la 1ª salida',
      'Take the 2nd exit': 'Toma la 2ª salida',
      'Take the 3rd exit': 'Toma la 3ª salida',
      'Take the 4th exit': 'Toma la 4ª salida',
      'Take the 5th exit': 'Toma la 5ª salida',
      'You have arrived': 'Has llegado',
      'at your destination': 'a tu destino',
      'onto': 'hacia',
      'on': 'en',
      'at': 'en',
      'and': 'y',
      'the': 'la',
      'street': 'calle',
      'avenue': 'avenida',
      'road': 'carretera',
      'highway': 'autopista',
      'boulevard': 'bulevar',
      'drive': 'paseo',
      'lane': 'carril',
      'way': 'vía',
      'place': 'plaza',
      'court': 'patio',
      'circle': 'círculo',
      'square': 'plaza',
      'parkway': 'paseo',
      'terrace': 'terraza',
      'trail': 'sendero',
      'path': 'camino',
      'North': 'Norte',
      'South': 'Sur',
      'East': 'Este',
      'West': 'Oeste',
      'Northeast': 'Noreste',
      'Northwest': 'Noroeste',
      'Southeast': 'Sureste',
      'Southwest': 'Suroeste',
      'miles': 'millas',
      'mile': 'milla',
      'feet': 'pies',
      'foot': 'pie',
      'yards': 'yardas',
      'yard': 'yarda',
      'kilometers': 'kilómetros',
      'kilometer': 'kilómetro',
      'meters': 'metros',
      'meter': 'metro',
      'minutes': 'minutos',
      'minute': 'minuto',
      'hours': 'horas',
      'hour': 'hora',
      'seconds': 'segundos',
      'second': 'segundo'
    };

    let enhanced = instruction;
    
    // Aplicar mejoras (ordenadas por longitud para evitar reemplazos parciales)
    const sortedKeys = Object.keys(enhancements).sort((a, b) => b.length - a.length);
    
    sortedKeys.forEach(original => {
      const translation = enhancements[original];
      const regex = new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      enhanced = enhanced.replace(regex, translation);
    });

    // Traducciones específicas para frases completas
    const phraseTranslations: { [key: string]: string } = {
      'You have arrived at your destination': 'Has llegado a tu destino',
      'Continue straight': 'Continúa recto',
      'Go straight ahead': 'Continúa recto',
      'Enter the freeway': 'Entra en la autopista',
      'Exit the freeway': 'Sal de la autopista',
      'Enter the highway': 'Entra en la carretera',
      'Exit the highway': 'Sal de la carretera',
      'Enter the motorway': 'Entra en la autopista',
      'Exit the motorway': 'Sal de la autopista'
    };

    // Aplicar traducciones de frases completas
    Object.keys(phraseTranslations).forEach(english => {
      const spanish = phraseTranslations[english];
      const regex = new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      enhanced = enhanced.replace(regex, spanish);
    });

    return enhanced;
  }

  /**
   * Calcula estadísticas avanzadas de la ruta
   */
  private calculateRouteStats(route: any, steps: MapboxNavigationStep[]): any {
    const stats = {
      totalDistance: route.distance,
      totalDuration: route.duration,
      averageSpeed: 0,
      maxSpeed: 0,
      turns: 0,
      highways: 0,
      urban: 0,
      rural: 0,
      tolls: 0,
      fuelEstimate: 0
    };

    // Calcular velocidad promedio
    if (route.duration > 0) {
      stats.averageSpeed = (route.distance / 1000) / (route.duration / 3600); // km/h
    }

    // Analizar pasos para estadísticas detalladas
    steps.forEach(step => {
      // Contar giros
      if (step.maneuver.type.includes('turn')) {
        stats.turns++;
      }
      
      // Detectar autopistas (simplificado)
      if (step.instruction.toLowerCase().includes('autopista') || 
          step.instruction.toLowerCase().includes('highway')) {
        stats.highways++;
      }
      
      // Detectar peajes (simplificado)
      if (step.instruction.toLowerCase().includes('peaje') || 
          step.instruction.toLowerCase().includes('toll')) {
        stats.tolls++;
      }
    });

    // Estimar combustible (simplificado: 7L/100km promedio)
    stats.fuelEstimate = (route.distance / 1000) * 0.07;

    return stats;
  }

  /**
   * Dibuja una ruta profesional en el mapa con elementos visuales avanzados
   */
  private drawProfessionalRouteOnMap(coordinates: [number, number][], waypoints: MapboxCoordinates[], stats: any) {
    if (!this.map) return;

    console.log('🎨 Dibujando ruta profesional en el mapa...');

    // Actualizar fuente de datos de la ruta con estilo mejorado
    const routeSource = this.map.getSource('route') as mapboxgl.GeoJSONSource;
    if (routeSource) {
      routeSource.setData({
        type: 'Feature',
        properties: {
          distance: stats.totalDistance,
          duration: stats.totalDuration,
          averageSpeed: stats.averageSpeed,
          turns: stats.turns
        },
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      });
    }

    // Crear puntos de waypoints con información detallada
    const routePoints = {
      type: 'FeatureCollection' as const,
      features: waypoints.map((waypoint, index) => {
        let type = 'waypoint';
        let color = '#3B82F6';
        let size = 'medium';
        
        if (index === 0) {
          type = 'start';
          color = '#10B981';
          size = 'large';
        } else if (index === waypoints.length - 1) {
          type = 'end';
          color = '#EF4444';
          size = 'large';
        }

        return {
          type: 'Feature' as const,
          properties: {
            type: type,
            address: waypoint.address || `${waypoint.latitude.toFixed(4)}, ${waypoint.longitude.toFixed(4)}`,
            index: index,
            totalWaypoints: waypoints.length,
            distance: index === 0 ? 0 : this.calculateDistance(
              waypoints[0].latitude, waypoints[0].longitude,
              waypoint.latitude, waypoint.longitude
            )
          },
          geometry: {
            type: 'Point' as const,
            coordinates: [waypoint.longitude, waypoint.latitude]
          }
        };
      })
    };

    // Actualizar fuente de datos de puntos
    const pointsSource = this.map.getSource('route-points') as mapboxgl.GeoJSONSource;
    if (pointsSource) {
      pointsSource.setData(routePoints);
    }

    // Ajustar la vista del mapa para mostrar toda la ruta con padding inteligente
    this.fitMapToRouteWithStats(coordinates, stats);
  }

  /**
   * Ajusta la vista del mapa para mostrar toda la ruta con estadísticas
   */
  private fitMapToRouteWithStats(coordinates: [number, number][], stats: any) {
    if (!this.map || coordinates.length === 0) return;

    // Calcular bounds de la ruta
    const bounds = coordinates.reduce((bounds, coord) => {
      return bounds.extend(coord as [number, number]);
    }, new mapboxgl.LngLatBounds(coordinates[0] as [number, number], coordinates[0] as [number, number]));

    // Calcular padding dinámico basado en la distancia de la ruta
    const routeDistance = stats.totalDistance || 0;
    let padding = 50;
    
    if (routeDistance > 50000) { // > 50km
      padding = 100;
    } else if (routeDistance > 20000) { // > 20km
      padding = 75;
    }

    // Ajustar la vista con padding dinámico
    this.map.fitBounds(bounds, {
      padding: padding,
      maxZoom: 16,
      duration: 1500,
      easing: (t: number) => t * (2 - t) // Easing suave
    });
  }

  /**
   * Inicializa el sistema de navegación avanzado
   */
  private initializeAdvancedNavigation(steps: MapboxNavigationStep[]) {
    if (!this.map) return;

    console.log('🚀 Inicializando navegación avanzada...');

    // Configurar eventos de navegación avanzados
    this.setupAdvancedNavigationEvents();
    
    // Inicializar sistema de notificaciones
    this.initializeNavigationNotifications();
    
    // Configurar seguimiento de progreso
    this.setupProgressTracking(steps);
  }

  /**
   * Configura eventos avanzados de navegación
   */
  private setupAdvancedNavigationEvents() {
    if (!this.map) return;

    // Evento de cambio de zoom para ajustar densidad de flechas
    this.map.on('zoomend', () => {
      if (this.currentRoute) {
        this.updateDirectionalArrows(this.currentRoute.steps, this.currentRoute.currentStepIndex);
      }
    });

    // Remover el evento moveend que causaba el bucle infinito
    // La cámara se actualizará solo cuando sea necesario desde otros métodos
  }

  /**
   * Inicializa el sistema de notificaciones de navegación profesional
   */
  private initializeNavigationNotifications() {
    // Configurar notificaciones web si están disponibles
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('✅ Notificaciones de navegación profesional habilitadas');
          this.setupNavigationNotifications();
        }
      });
    } else if (Notification.permission === 'granted') {
      this.setupNavigationNotifications();
    }
  }

  /**
   * Configura las notificaciones de navegación
   */
  private setupNavigationNotifications() {
    // Configurar notificaciones para cambios de paso
    this.navigationSubject.subscribe(route => {
      if (route?.isNavigating) {
        this.sendNavigationNotification(route);
      }
    });
  }

  /**
   * Envía notificación de navegación con control de duplicados
   */
  private sendNavigationNotification(route: MapboxNavigationRoute) {
    if (!route || !route.steps || route.steps.length === 0) return;

    const currentStep = route.steps[route.currentStepIndex];
    if (!currentStep) return;

    const currentTime = Date.now();
    const currentStepIndex = route.currentStepIndex;

    // Verificar si ya se envió una notificación para este paso
    if (this.lastNotificationStepIndex === currentStepIndex) {
      return;
    }

    // Verificar cooldown para evitar notificaciones muy frecuentes
    if (currentTime - this.lastNotificationTime < this.notificationCooldown) {
      return;
    }

    // Solo enviar notificación si hay un cambio significativo de paso
    // o si es la primera notificación
    if (this.lastNotificationStepIndex !== -1 && 
        Math.abs(currentStepIndex - this.lastNotificationStepIndex) < 1) {
      return;
    }

    // Actualizar control de notificaciones
    this.lastNotificationStepIndex = currentStepIndex;
    this.lastNotificationTime = currentTime;

    // Enviar notificación visual
    this.sendVisualNotification(currentStep);

    // Enviar notificación de voz
    this.sendVoiceNotification(currentStep, currentTime);

    console.log('📱 Notificación de navegación enviada:', currentStep.instruction);
  }

  /**
   * Envía notificación visual
   */
  private sendVisualNotification(currentStep: MapboxNavigationStep) {
    // Crear notificación personalizada
    const notification = new Notification('🧭 Instrucción de Navegación', {
      body: `${currentStep.instruction}\n${this.formatDistance(currentStep.distance)}`,
      // icon: '/assets/icons/navigation-icon.png', // Icono personalizado (comentado hasta que exista)
      // badge: '/assets/icons/badge-icon.png',
      tag: 'navigation-step',
      requireInteraction: false,
      silent: false
    });

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
      notification.close();
    }, 5000);

    // Manejar clic en la notificación
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }

  /**
   * Envía notificación de voz
   */
  private sendVoiceNotification(currentStep: MapboxNavigationStep, currentTime: number) {
    if (!this.voiceEnabled || !this.voiceService.isVoiceEnabled()) {
      return;
    }

    // Verificar cooldown de voz
    if (currentTime - this.lastVoiceTime < this.voiceCooldown) {
      return;
    }

    // Actualizar tiempo de última voz
    this.lastVoiceTime = currentTime;

    // Crear instrucción de voz
    const voiceInstruction: VoiceInstruction = {
      text: currentStep.instruction,
      distance: currentStep.distance,
      maneuver: currentStep.maneuver.type,
      priority: this.getVoicePriority(currentStep)
    };

    // Reproducir instrucción de voz
    this.voiceService.speak(voiceInstruction);

    console.log('🎤 Instrucción de voz enviada:', currentStep.instruction);
  }

  /**
   * Determina la prioridad de la instrucción de voz
   */
  private getVoicePriority(currentStep: MapboxNavigationStep): 'high' | 'medium' | 'low' {
    const maneuver = currentStep.maneuver.type.toLowerCase();
    
    // Alta prioridad para giros importantes
    if (maneuver.includes('turn') || maneuver.includes('merge') || maneuver.includes('ramp')) {
      return 'high';
    }
    
    // Media prioridad para cambios de carril y continuar
    if (maneuver.includes('lane') || maneuver.includes('continue') || maneuver.includes('straight')) {
      return 'medium';
    }
    
    // Baja prioridad para el resto
    return 'low';
  }

  /**
   * Configura el seguimiento de progreso de navegación
   */
  private setupProgressTracking(steps: MapboxNavigationStep[]) {
    // Configurar intervalos de actualización de progreso
    setInterval(() => {
      if (this.currentRoute?.isNavigating && this.currentPosition) {
        this.updateNavigationProgress(this.currentPosition);
      }
    }, 1000); // Actualizar cada segundo
  }

  /**
   * Actualiza la cámara para navegación
   */
  private updateNavigationCamera() {
    if (!this.map || !this.currentRoute) return;

    const currentStep = this.getCurrentStep();
    if (currentStep) {
      // Verificar si ya estamos en la posición correcta para evitar bucles
      const currentCenter = this.map.getCenter();
      const targetLng = currentStep.location.longitude;
      const targetLat = currentStep.location.latitude;
      
      const distance = this.calculateDistance(
        currentCenter.lat, 
        currentCenter.lng, 
        targetLat, 
        targetLng
      );
      
      // Solo mover la cámara si estamos a más de 50 metros del objetivo
      if (distance > 50) {
        this.map.flyTo({
          center: [targetLng, targetLat],
          zoom: 16,
          duration: 1000,
          essential: true
        });
      }
    }
  }


  /**
   * Dibuja la ruta en el mapa con puntos de inicio/fin
   */
  private drawRouteOnMap(coordinates: [number, number][], waypoints: MapboxCoordinates[]) {
    if (!this.map) return;

    console.log('🎨 Dibujando ruta en el mapa:', coordinates.length, 'puntos');

    // Actualizar fuente de datos de la ruta
    const routeSource = this.map.getSource('route') as mapboxgl.GeoJSONSource;
    if (routeSource) {
      routeSource.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      });
    }

    // Crear puntos de inicio, fin y waypoints
    const routePoints = {
      type: 'FeatureCollection' as const,
      features: waypoints.map((waypoint, index) => {
        let type = 'waypoint';
        if (index === 0) type = 'start';
        if (index === waypoints.length - 1) type = 'end';

        return {
          type: 'Feature' as const,
          properties: {
            type: type,
            address: waypoint.address || `${waypoint.latitude}, ${waypoint.longitude}`,
            index: index
          },
          geometry: {
            type: 'Point' as const,
            coordinates: [waypoint.longitude, waypoint.latitude]
          }
        };
      })
    };

    // Actualizar fuente de datos de puntos
    const pointsSource = this.map.getSource('route-points') as mapboxgl.GeoJSONSource;
    if (pointsSource) {
      pointsSource.setData(routePoints);
    }

    // Ajustar la vista del mapa para mostrar toda la ruta
    this.fitMapToRoute(coordinates);
  }

  /**
   * Ajusta la vista del mapa para mostrar toda la ruta
   */
  private fitMapToRoute(coordinates: [number, number][]) {
    if (!this.map || coordinates.length === 0) return;

    // Calcular bounds de la ruta
    const bounds = coordinates.reduce((bounds, coord) => {
      return bounds.extend(coord as [number, number]);
    }, new mapboxgl.LngLatBounds(coordinates[0] as [number, number], coordinates[0] as [number, number]));

    // Ajustar la vista con padding
    this.map.fitBounds(bounds, {
      padding: 50,
      maxZoom: 16,
      duration: 1000
    });
  }

  /**
   * Inicia la navegación en tiempo real con seguimiento GPS
   */
  startNavigation(waypoints: MapboxCoordinates[]): Observable<MapboxNavigationRoute | null> {
    if (waypoints.length < 2) {
      throw new Error('Se necesitan al menos 2 waypoints para la navegación');
    }

    console.log('🚀 Iniciando navegación en tiempo real para', waypoints.length, 'waypoints');

    // Crear ruta primero
    this.createRoute(waypoints).then(route => {
      // Iniciar seguimiento de GPS
      this.startGPSNavigation();
      
      // Actualizar estado de navegación
      const updatedRoute = { ...route, isNavigating: true };
      this.currentRoute = updatedRoute;
      this.navigationSubject.next(updatedRoute);
      
      // Iniciar navegación interactiva en el mapa
      this.startInteractiveNavigation(route);
      
      console.log('✅ Navegación iniciada exitosamente');
    }).catch(error => {
      console.error('❌ Error al crear ruta:', error);
      this.navigationSubject.next(null);
    });

    return this.navigationSubject.asObservable();
  }

  /**
   * Inicia la navegación interactiva en el mapa
   */
  private startInteractiveNavigation(route: MapboxNavigationRoute) {
    if (!this.map) return;

    // Esperar a que el mapa esté completamente cargado
    if (this.map.isStyleLoaded()) {
      this.initializeNavigationLayers();
    } else {
      this.map.on('styledata', () => {
        this.initializeNavigationLayers();
      });
    }
    
    // Configurar seguimiento de la cámara
    this.setupCameraTracking();
    
  }

  /**
   * Inicializa las capas de navegación después de que el mapa esté listo
   */
  private initializeNavigationLayers() {
    if (!this.map) return;

    // Añadir capa de navegación activa
    this.addNavigationLayer();
    
    // Actualizar las capas con la ruta actual
    if (this.currentRoute) {
      this.updateNavigationLayers();
    }
  }

  /**
   * Añade capa de navegación activa con flechas direccionales
   */
  private addNavigationLayer() {
    if (!this.map) return;

    // Añadir capa de navegación activa
    this.map.addSource('navigation-active', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    // Añadir fuente para flechas direccionales
    this.map.addSource('navigation-arrows', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    // Añadir fuente para etiquetas de texto
    this.map.addSource('navigation-labels', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    // Capa para el paso actual con flechas
    this.map.addLayer({
      id: 'navigation-current-step',
      type: 'line',
      source: 'navigation-active',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#FF6B6B',
        'line-width': 8,
        'line-opacity': 0.9
      }
    });

    // Capa para pasos completados
    this.map.addLayer({
      id: 'navigation-completed-steps',
      type: 'line',
      source: 'navigation-active',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#4ECDC4',
        'line-width': 6,
        'line-opacity': 0.7
      }
    });

    // Añadir flechas direccionales
    this.addDirectionalArrows();
  }

  /**
   * Añade flechas direccionales a la ruta
   */
  private addDirectionalArrows() {
    if (!this.map) return;

    console.log('🎯 Cargando iconos de navegación profesionales...');
    
    // Usar iconos SVG profesionales en lugar de HTML
    this.loadProfessionalIcons();
  }

  /**
   * Carga iconos SVG profesionales para navegación
   */
  private loadProfessionalIcons() {
    if (!this.map) return;

    console.log('🎯 Cargando iconos SVG profesionales...');

    // Crear iconos profesionales elegantes (estilo Google Maps)
    const icons = {
      // Flecha básica de dirección - elegante y sutil
      arrow: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M12 2L20 10L12 18L10.5 16.5L16.5 10.5H4V13.5H16.5L10.5 7.5L12 2Z" fill="#4285F4" stroke="white" stroke-width="1.5" filter="url(#glow)"/>
        </svg>
      `),
      
      // Giro a la derecha - elegante
      turnRight: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M12 2L20 10L12 18L10.5 16.5L16.5 10.5H4V13.5H16.5L10.5 7.5L12 2Z" fill="#4285F4" stroke="white" stroke-width="1.5" filter="url(#glow)"/>
        </svg>
      `),
      
      // Giro a la izquierda - elegante
      turnLeft: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M12 2L4 10L12 18L13.5 16.5L7.5 10.5H20V7.5H7.5L13.5 1.5L12 2Z" fill="#4285F4" stroke="white" stroke-width="1.5" filter="url(#glow)"/>
        </svg>
      `),
      
      // Continuar recto - elegante
      straight: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M12 2L15 5L9 11H20V13H9L15 19L12 22L6 16L12 2Z" fill="#34A853" stroke="white" stroke-width="1.5" filter="url(#glow)"/>
        </svg>
      `),
      
      // Rotonda - elegante y minimalista
      roundabout: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="12" cy="12" r="8" stroke="#4285F4" stroke-width="2.5" fill="none" filter="url(#glow)"/>
          <path d="M12 6L15 9L12 12L9 9L12 6Z" fill="#4285F4"/>
        </svg>
      `),
      
      // Salida de rotonda (1ª salida) - elegante
      roundaboutExit1: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="12" cy="12" r="8" stroke="#4285F4" stroke-width="2.5" fill="none" filter="url(#glow)"/>
          <path d="M12 6L15 9L12 12L9 9L12 6Z" fill="#4285F4"/>
          <path d="M15 9L20 12L15 15" stroke="#4285F4" stroke-width="2" fill="none"/>
          <circle cx="18" cy="10" r="3" fill="white" stroke="#4285F4" stroke-width="1"/>
          <text x="18" y="12" font-family="Arial" font-size="6" fill="#4285F4" font-weight="bold" text-anchor="middle">1</text>
        </svg>
      `),
      
      // Salida de rotonda (2ª salida) - elegante
      roundaboutExit2: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="12" cy="12" r="8" stroke="#4285F4" stroke-width="2.5" fill="none" filter="url(#glow)"/>
          <path d="M12 6L15 9L12 12L9 9L12 6Z" fill="#4285F4"/>
          <path d="M15 9L20 12L15 15" stroke="#4285F4" stroke-width="2" fill="none"/>
          <circle cx="18" cy="10" r="3" fill="white" stroke="#4285F4" stroke-width="1"/>
          <text x="18" y="12" font-family="Arial" font-size="6" fill="#4285F4" font-weight="bold" text-anchor="middle">2</text>
        </svg>
      `),
      
      // Salida de rotonda (3ª salida) - elegante
      roundaboutExit3: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="12" cy="12" r="8" stroke="#4285F4" stroke-width="2.5" fill="none" filter="url(#glow)"/>
          <path d="M12 6L15 9L12 12L9 9L12 6Z" fill="#4285F4"/>
          <path d="M15 9L20 12L15 15" stroke="#4285F4" stroke-width="2" fill="none"/>
          <circle cx="18" cy="10" r="3" fill="white" stroke="#4285F4" stroke-width="1"/>
          <text x="18" y="12" font-family="Arial" font-size="6" fill="#4285F4" font-weight="bold" text-anchor="middle">3</text>
        </svg>
      `),
      
      // Giro brusco a la derecha - elegante
      sharpRight: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M12 2L20 10L12 18L8 14L14 10H4V14H14L8 6L12 2Z" fill="#FF6B35" stroke="white" stroke-width="1.5" filter="url(#glow)"/>
        </svg>
      `),
      
      // Giro brusco a la izquierda - elegante
      sharpLeft: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M12 2L4 10L12 18L16 14L10 10H20V14H10L16 6L12 2Z" fill="#FF6B35" stroke="white" stroke-width="1.5" filter="url(#glow)"/>
        </svg>
      `),
      
      // Llegada al destino - elegante
      arrive: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="12" cy="12" r="9" fill="#34A853" stroke="white" stroke-width="2" filter="url(#glow)"/>
          <path d="M8 12L10.5 14.5L16 9" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `)
    };

    // Cargar todos los iconos
    let loadedIcons = 0;
    const totalIcons = Object.keys(icons).length;

    Object.entries(icons).forEach(([name, dataUrl]) => {
      this.map!.loadImage(dataUrl, (error, image) => {
        if (error) {
          console.error(`❌ Error cargando icono ${name}:`, error);
        } else {
          console.log(`✅ Icono ${name} cargado correctamente`);
          this.map!.addImage(`${name}-icon`, image!);
        }
        
        loadedIcons++;
        if (loadedIcons === totalIcons) {
          console.log('🎯 Todos los iconos cargados, creando capas...');
          this.createArrowLayers();
        }
      });
    });
  }

  /**
   * Crea las fuentes de datos para las flechas
   */
  private createArrowSources() {
    if (!this.map) return;

    console.log('🎯 Creando fuentes de flechas...');

    // Crear fuente para flechas
    if (!this.map.getSource('navigation-arrows')) {
      this.map.addSource('navigation-arrows', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
    }

    // Crear fuente para etiquetas
    if (!this.map.getSource('navigation-labels')) {
      this.map.addSource('navigation-labels', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
    }

    console.log('✅ Fuentes de flechas creadas');
  }

  /**
   * Crea las capas de flechas después de cargar los iconos
   */
  private createArrowLayers() {
    if (!this.map) return;

    console.log('🎯 Creando capas de flechas profesionales...');

    try {
      // Capa para flechas de dirección (usando iconos SVG profesionales)
      this.map.addLayer({
        id: 'navigation-arrows',
        type: 'symbol',
        source: 'navigation-arrows',
        filter: ['==', ['get', 'type'], 'arrow'],
        layout: {
          'icon-image': 'arrow-icon',
          'icon-size': 0.6,
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-rotation-alignment': 'map',
          'icon-pitch-alignment': 'map',
          'icon-rotate': ['get', 'bearing']
        },
        paint: {
          'icon-opacity': 0.7
        }
      });

      // Capa para maniobras (usando iconos SVG específicos)
      this.map.addLayer({
        id: 'navigation-maneuvers',
        type: 'symbol',
        source: 'navigation-arrows',
        filter: ['==', ['get', 'type'], 'maneuver'],
        layout: {
          'icon-image': [
            'case',
            ['==', ['get', 'maneuverType'], 'turn'],
            'turnRight-icon',
            ['==', ['get', 'maneuverType'], 'turn-left'],
            'turnLeft-icon',
            ['==', ['get', 'maneuverType'], 'turn-right'],
            'turnRight-icon',
            ['==', ['get', 'maneuverType'], 'straight'],
            'straight-icon',
            ['==', ['get', 'maneuverType'], 'arrive'],
            'arrive-icon',
            ['==', ['get', 'maneuverType'], 'roundabout'],
            'roundabout-icon',
            ['==', ['get', 'maneuverType'], 'roundabout-exit-1'],
            'roundaboutExit1-icon',
            ['==', ['get', 'maneuverType'], 'roundabout-exit-2'],
            'roundaboutExit2-icon',
            ['==', ['get', 'maneuverType'], 'roundabout-exit-3'],
            'roundaboutExit3-icon',
            ['==', ['get', 'maneuverType'], 'sharp-right'],
            'sharpRight-icon',
            ['==', ['get', 'maneuverType'], 'sharp-left'],
            'sharpLeft-icon',
            'arrow-icon'
          ],
          'icon-size': 0.8,
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-rotation-alignment': 'map',
          'icon-pitch-alignment': 'map',
          'icon-rotate': ['get', 'bearing']
        },
        paint: {
          'icon-opacity': 0.8
        }
      });

      // Capa para etiquetas de texto
      this.map.addLayer({
        id: 'navigation-labels',
        type: 'symbol',
        source: 'navigation-labels',
        layout: {
          'text-field': ['get', 'instruction'],
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          'text-size': 12,
          'text-offset': [0, -2],
          'text-anchor': 'bottom',
          'text-allow-overlap': true,
          'text-ignore-placement': true
        },
        paint: {
          'text-color': '#1F2937',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 1
        }
      });

      console.log('✅ Capas de flechas profesionales creadas correctamente');
    } catch (error) {
      console.error('❌ Error creando capas de flechas:', error);
    }
  }

  /**
   * Método alternativo para añadir flechas usando marcadores HTML
   * DESHABILITADO - Usar iconos SVG profesionales en su lugar
   */
  // private addHTMLArrows() {
  //   console.log('⚠️ addHTMLArrows deshabilitado - usando iconos SVG profesionales');
  //   return;
    
  //   if (!this.map || !this.currentRoute) return;

  //   console.log('🎯 Añadiendo flechas HTML...');

  //   // Limpiar flechas existentes
  //   this.clearHTMLArrows();

  //   const coordinates = this.currentRoute.coordinates;
  //   if (!coordinates || coordinates.length < 2) return;

  //   // Crear flechas cada 5 puntos
  //   for (let i = 0; i < coordinates.length - 1; i += 5) {
  //     const start = coordinates[i];
  //     const end = coordinates[i + 1];
      
  //     if (start && end) {
  //       const bearing = this.calculateBearing(start[1], start[0], end[1], end[0]);
        
  //       // Crear elemento HTML para la flecha
  //       const arrowEl = document.createElement('div');
  //       arrowEl.className = 'mapbox-arrow';
  //       arrowEl.innerHTML = '→';
  //       arrowEl.style.cssText = `
  //         position: absolute;
  //         width: 20px;
  //         height: 20px;
  //         background: #FF6B6B;
  //         color: white;
  //         border-radius: 50%;
  //         display: flex;
  //         align-items: center;
  //         justify-content: center;
  //         font-size: 12px;
  //         font-weight: bold;
  //         transform: rotate(${bearing}deg);
  //         z-index: 1000;
  //         box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  //       `;

  //       // Crear marcador Mapbox
  //       const marker = new mapboxgl.Marker(arrowEl)
  //         .setLngLat(start)
  //         .addTo(this.map);

  //       // Guardar referencia para limpiar después
  //       if (!this.htmlArrows) this.htmlArrows = [];
  //       this.htmlArrows.push(marker);
  //     }
  //   }

  //   console.log(`✅ Añadidas ${this.htmlArrows.length} flechas HTML`);
  // }

  /**
   * Limpia las flechas HTML
   */
  private clearHTMLArrows() {
    if (this.htmlArrows) {
      this.htmlArrows.forEach(marker => marker.remove());
      this.htmlArrows = [];
    }
  }

  /**
   * Configura el seguimiento de la cámara
   */
  private setupCameraTracking() {
    if (!this.map) return;

    // Configurar seguimiento de la cámara para seguir al usuario
    this.map.on('move', () => {
      if (this.currentRoute?.isNavigating) {
        // Actualizar vista para seguir la navegación
        this.updateCameraForNavigation();
      }
    });
  }

  /**
   * Actualiza la cámara para la navegación
   */
  private updateCameraForNavigation() {
    if (!this.map || !this.currentRoute) return;

    const currentStep = this.getCurrentStep();
    if (currentStep) {
      // Centrar en el paso actual
      this.map.flyTo({
        center: [currentStep.location.longitude, currentStep.location.latitude],
        zoom: 16,
        duration: 1000
      });
    }
  }


  /**
   * Avanza al siguiente paso de navegación
   */
  nextStep() {
    if (!this.currentRoute) return;

    const nextIndex = Math.min(
      this.currentRoute.currentStepIndex + 1,
      this.currentRoute.steps.length - 1
    );

    if (nextIndex !== this.currentRoute.currentStepIndex) {
      const updatedRoute = {
        ...this.currentRoute,
        currentStepIndex: nextIndex
      };

      this.currentRoute = updatedRoute;
      this.navigationSubject.next(updatedRoute);

      // Actualizar vista del mapa
      this.updateCameraForNavigation();

      console.log('➡️ Avanzando al paso:', nextIndex + 1);
    }
  }

  /**
   * Inicia el seguimiento GPS para navegación con configuraciones optimizadas
   */
  private startGPSNavigation() {
    if (!navigator.geolocation) {
      console.warn('⚠️ Geolocalización no soportada en este dispositivo');
      return;
    }

    console.log('📍 Iniciando seguimiento GPS para navegación');

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000 // 1 segundo de cache máximo
    };

    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.handlePositionUpdate(position),
      (error) => this.handleGPSError(error),
      options
    );
  }

  /**
   * Maneja errores de GPS
   */
  private handleGPSError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error('❌ GPS: Permiso denegado por el usuario');
        break;
      case error.POSITION_UNAVAILABLE:
        console.error('❌ GPS: Posición no disponible');
        break;
      case error.TIMEOUT:
        console.error('❌ GPS: Timeout al obtener posición');
        break;
      default:
        console.error('❌ GPS: Error desconocido:', error.message);
        break;
    }
  }

  /**
   * Maneja las actualizaciones de posición GPS con cálculo de progreso
   */
  private handlePositionUpdate(position: GeolocationPosition) {
    this.currentPosition = position;
    
    console.log('📍 Nueva posición GPS:', {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracy: position.coords.accuracy
    });

    const currentRoute = this.navigationSubject.value;
    if (currentRoute) {
      // Calcular progreso real basado en la posición actual
      this.updateNavigationProgress(position);
    }
  }

  /**
   * Calcula la distancia entre dos puntos en metros
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Radio de la Tierra en metros
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  /**
   * Actualiza el progreso de navegación basado en la posición GPS
   */
  private updateNavigationProgress(position: GeolocationPosition) {
    const currentRoute = this.navigationSubject.value;
    if (!currentRoute || !this.currentPosition) return;

    const currentLat = position.coords.latitude;
    const currentLng = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    // Calcular distancia al siguiente waypoint
    const nextStep = currentRoute.steps[currentRoute.currentStepIndex];
    if (!nextStep) return;

    const distanceToNextStep = this.calculateDistance(
      currentLat, currentLng,
      nextStep.location.latitude, nextStep.location.longitude
    );

    // Calcular progreso total
    const totalDistance = currentRoute.totalDistance;
    const remainingDistance = currentRoute.remainingDistance;
    const progress = Math.max(0, Math.min(100, ((totalDistance - remainingDistance) / totalDistance) * 100));

    // Actualizar paso actual si estamos cerca del siguiente
    let newStepIndex = currentRoute.currentStepIndex;
    if (distanceToNextStep < 50) { // 50 metros de proximidad
      newStepIndex = Math.min(currentRoute.steps.length - 1, currentRoute.currentStepIndex + 1);
    }

    // Calcular distancia y tiempo restantes
    const remainingSteps = currentRoute.steps.slice(newStepIndex);
    const newRemainingDistance = remainingSteps.reduce((sum, step) => sum + step.distance, 0);
    const newRemainingTime = remainingSteps.reduce((sum, step) => sum + step.duration, 0);

    const updatedRoute: MapboxNavigationRoute = {
      ...currentRoute,
      currentStepIndex: newStepIndex,
      isNavigating: true,
      currentLocation: {
        latitude: currentLat,
        longitude: currentLng,
        accuracy: accuracy
      },
      remainingDistance: newRemainingDistance,
      remainingTime: newRemainingTime,
      progress: progress
    };

    this.currentRoute = updatedRoute;
    this.navigationSubject.next(updatedRoute);

    // Actualizar marcador de posición actual en el mapa
    this.updateCurrentLocationMarker(currentLat, currentLng);

    // Actualizar capas de navegación
    this.updateNavigationLayers();

    // Actualizar cámara para seguir la navegación
    this.updateCameraForNavigation();

    console.log('📊 Progreso de navegación actualizado:', {
      pasoActual: newStepIndex + 1,
      totalPasos: currentRoute.steps.length,
      distanciaRestante: `${(newRemainingDistance / 1000).toFixed(1)} km`,
      tiempoRestante: `${Math.round(newRemainingTime / 60)} min`,
      progreso: `${progress.toFixed(1)}%`
    });
  }

  /**
   * Actualiza las capas de navegación en el mapa con flechas direccionales
   */
  private updateNavigationLayers() {
    if (!this.map || !this.currentRoute) return;

    const currentStepIndex = this.currentRoute.currentStepIndex;
    const steps = this.currentRoute.steps;

    // Crear geometría para pasos completados
    const completedSteps = steps.slice(0, currentStepIndex);
    const currentStep = steps[currentStepIndex];

    const completedGeometry: [number, number][] = completedSteps.map(step => [
      step.location.longitude,
      step.location.latitude
    ]);

    const currentGeometry: [number, number][] = currentStep ? [
      [currentStep.location.longitude, currentStep.location.latitude]
    ] : [];

    // Actualizar fuente de datos de rutas
    const source = this.map.getSource('navigation-active') as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { type: 'completed' },
            geometry: {
              type: 'LineString',
              coordinates: completedGeometry
            }
          },
          {
            type: 'Feature',
            properties: { type: 'current' },
            geometry: {
              type: 'LineString',
              coordinates: currentGeometry
            }
          }
        ]
      });
    }

    // Actualizar flechas direccionales
    this.updateDirectionalArrows(steps, currentStepIndex);
  }

  /**
   * Actualiza las flechas direccionales en la ruta
   */
  private updateDirectionalArrows(steps: MapboxNavigationStep[], currentStepIndex: number) {
    if (!this.map) return;

    // Throttling para evitar actualizaciones excesivas
    const now = Date.now();
    if (now - this.lastArrowUpdate < 2000) { // Máximo una actualización cada 2 segundos
      return;
    }
    this.lastArrowUpdate = now;

    console.log('🎯 Actualizando flechas direccionales...', {
      currentStepIndex,
      totalSteps: steps.length,
      hasCoordinates: !!this.currentRoute?.coordinates
    });

    const arrowFeatures: any[] = [];
    const maneuverFeatures: any[] = [];
    const labelFeatures: any[] = [];

    // Generar flechas para el paso actual
    const currentStep = steps[currentStepIndex];
    if (currentStep && this.currentRoute?.coordinates) {
      const coordinates = this.currentRoute.coordinates;
      
      // Calcular puntos para las flechas basándose en la geometría de la ruta
      const maxArrows = 20; // Límite máximo de flechas
      const stepSize = Math.max(10, Math.floor(coordinates.length / maxArrows));
      
      for (let i = 0; i < coordinates.length - 1 && arrowFeatures.length < maxArrows; i += stepSize) {
        const start = coordinates[i];
        const end = coordinates[i + 1];
        
        if (start && end) {
          // Calcular el bearing (dirección) entre los puntos
          const bearing = this.calculateBearing(start[1], start[0], end[1], end[0]);
          
          arrowFeatures.push({
            type: 'Feature',
            properties: {
              bearing: bearing,
              stepIndex: currentStepIndex,
              type: 'arrow'
            },
            geometry: {
              type: 'Point',
              coordinates: start
            }
          });
        }
      }

      console.log(`✅ Generadas ${arrowFeatures.length} flechas direccionales`);

      // Añadir marcador de maniobra en el punto de la maniobra
      if (currentStep.maneuver) {
        const maneuverBearing = currentStep.maneuver.bearing_after || 0;
        
        // Determinar el tipo de maniobra específico para rotondas
        let maneuverType = currentStep.maneuver.type;
        if (currentStep.maneuver.type === 'turn') {
          if (currentStep.maneuver.modifier === 'left') {
            maneuverType = 'turn-left';
          } else if (currentStep.maneuver.modifier === 'right') {
            maneuverType = 'turn-right';
          } else if (currentStep.maneuver.modifier === 'sharp left') {
            maneuverType = 'sharp-left';
          } else if (currentStep.maneuver.modifier === 'sharp right') {
            maneuverType = 'sharp-right';
          }
        } else if (currentStep.maneuver.type === 'roundabout') {
          // Detectar salida de rotonda basándose en la instrucción
          const instruction = currentStep.instruction.toLowerCase();
          if (instruction.includes('1st exit') || instruction.includes('primera salida')) {
            maneuverType = 'roundabout-exit-1';
          } else if (instruction.includes('2nd exit') || instruction.includes('segunda salida')) {
            maneuverType = 'roundabout-exit-2';
          } else if (instruction.includes('3rd exit') || instruction.includes('tercera salida')) {
            maneuverType = 'roundabout-exit-3';
          } else if (instruction.includes('4th exit') || instruction.includes('cuarta salida')) {
            maneuverType = 'roundabout-exit-4';
          } else if (instruction.includes('5th exit') || instruction.includes('quinta salida')) {
            maneuverType = 'roundabout-exit-5';
          } else {
            maneuverType = 'roundabout';
          }
        }
        
        maneuverFeatures.push({
          type: 'Feature',
          properties: {
            bearing: maneuverBearing,
            maneuverType: maneuverType,
            modifier: currentStep.maneuver.modifier,
            stepIndex: currentStepIndex,
            type: 'maneuver'
          },
          geometry: {
            type: 'Point',
            coordinates: [currentStep.location.longitude, currentStep.location.latitude]
          }
        });

        // Añadir etiqueta de texto para la maniobra
        labelFeatures.push({
          type: 'Feature',
          properties: {
            instruction: currentStep.instruction,
            distance: this.formatDistance(currentStep.distance),
            stepIndex: currentStepIndex
          },
          geometry: {
            type: 'Point',
            coordinates: [currentStep.location.longitude, currentStep.location.latitude]
          }
        });

        console.log(`✅ Añadida maniobra: ${maneuverType} - ${currentStep.instruction}`);
      }
    }

    // Actualizar fuente de flechas
    const arrowSource = this.map.getSource('navigation-arrows') as mapboxgl.GeoJSONSource;
    if (arrowSource) {
      arrowSource.setData({
        type: 'FeatureCollection',
        features: [...arrowFeatures, ...maneuverFeatures]
      });
      console.log('✅ Fuente de flechas actualizada');
    } else {
      console.warn('⚠️ Fuente de flechas no encontrada, usando flechas HTML');
      // Crear fuentes si no existen
      this.createArrowSources();
    }

    // Actualizar fuente de etiquetas
    const labelSource = this.map.getSource('navigation-labels') as mapboxgl.GeoJSONSource;
    if (labelSource) {
      labelSource.setData({
        type: 'FeatureCollection',
        features: labelFeatures
      });
      console.log('✅ Fuente de etiquetas actualizada');
    } else {
      console.warn('⚠️ Fuente de etiquetas no encontrada');
    }
  }

  /**
   * Calcula el bearing (dirección) entre dos puntos
   */
  private calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;

    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);

    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360;
  }

  /**
   * Actualiza el marcador de posición actual en el mapa
   */
  private updateCurrentLocationMarker(lat: number, lng: number) {
    if (!this.map) return;

    // Eliminar marcador anterior si existe
    const existingMarker = document.querySelector('.current-location-marker');
    if (existingMarker) {
      existingMarker.remove();
    }

    // Crear nuevo marcador de posición actual estilo Google Maps
    const el = document.createElement('div');
    el.className = 'current-location-marker';
    el.innerHTML = `
      <div class="location-pulse"></div>
      <div class="location-dot"></div>
      <div class="location-arrow"></div>
    `;

    // Añadir estilos CSS
    const style = document.createElement('style');
    style.textContent = `
      .current-location-marker {
        position: relative;
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
      
      .location-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #4285F4;
        opacity: 0.3;
        animation: locationPulse 2s infinite;
      }
      
      .location-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #4285F4;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        z-index: 2;
      }
      
      .location-arrow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 8px solid #4285F4;
        z-index: 3;
      }
      
      @keyframes locationPulse {
        0% {
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 0.3;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.2);
          opacity: 0.1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1.6);
          opacity: 0;
        }
      }
      
      /* Responsive para móvil */
      @media (max-width: 768px) {
        .current-location-marker {
          width: 35px;
          height: 35px;
        }
        
        .location-pulse {
          width: 35px;
          height: 35px;
        }
        
        .location-dot {
          width: 14px;
          height: 14px;
          border-width: 2px;
        }
        
        .location-arrow {
          border-left-width: 3px;
          border-right-width: 3px;
          border-bottom-width: 6px;
        }
      }
      
      @media (max-width: 480px) {
        .current-location-marker {
          width: 30px;
          height: 30px;
        }
        
        .location-pulse {
          width: 30px;
          height: 30px;
        }
        
        .location-dot {
          width: 12px;
          height: 12px;
          border-width: 2px;
        }
        
        .location-arrow {
          border-left-width: 3px;
          border-right-width: 3px;
          border-bottom-width: 5px;
        }
      }
    `;
    document.head.appendChild(style);

    const marker = new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .addTo(this.map);

    // Centrar la cámara en la posición actual
    this.map.flyTo({
      center: [lng, lat],
      zoom: 16,
      duration: 1000
    });
  }

  /**
   * Detiene la navegación y limpia recursos
   */
  stopNavigation() {
    console.log('🛑 Deteniendo navegación...');

    // Detener seguimiento GPS
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
    
    // Limpiar ruta del mapa
    this.clearRouteFromMap();
    
    // Limpiar flechas HTML
    this.clearHTMLArrows();
    
    // Limpiar controles de navegación
    this.clearNavigationControls();
    
    // Limpiar marcador de posición actual
    const currentMarker = document.querySelector('.current-location-marker');
    if (currentMarker) {
      currentMarker.remove();
    }
    
    // Resetear estado
    this.currentRoute = null;
    this.currentPosition = null;
    this.navigationSubject.next(null);
    
    // Resetear control de notificaciones
    this.lastNotificationStepIndex = -1;
    this.lastNotificationTime = 0;
    
    console.log('✅ Navegación detenida y recursos limpiados');
  }

  /**
   * Limpia los controles de navegación del mapa
   */
  private clearNavigationControls() {
    const controls = document.querySelector('.mapbox-navigation-controls');
    if (controls) {
      controls.remove();
    }
  }

  /**
   * Limpia la ruta del mapa
   */
  private clearRouteFromMap() {
    if (!this.map) return;

    // Limpiar capas de ruta
    const layersToRemove = [
      'route', 
      'route-start', 
      'route-end', 
      'route-waypoints',
      'navigation-current-step',
      'navigation-completed-steps',
      'navigation-arrows',
      'navigation-maneuvers',
      'navigation-labels'
    ];
    layersToRemove.forEach(layerId => {
      if (this.map!.getLayer(layerId)) {
        this.map!.removeLayer(layerId);
      }
    });

    // Limpiar fuentes de datos
    const sourcesToRemove = [
      'route', 
      'route-points',
      'navigation-active',
      'navigation-arrows',
      'navigation-labels'
    ];
    sourcesToRemove.forEach(sourceId => {
      if (this.map!.getSource(sourceId)) {
        this.map!.removeSource(sourceId);
      }
    });
  }

  /**
   * Añade un marcador personalizado al mapa
   */
  addMarker(coordinates: MapboxCoordinates, options: {
    label?: string;
    color?: string;
    size?: 'small' | 'medium' | 'large';
    draggable?: boolean;
  } = {}): mapboxgl.Marker {
    if (!this.map) {
      throw new Error('Mapa no inicializado');
    }

    const size = options.size || 'medium';
    const sizeMap = {
      small: '16px',
      medium: '20px',
      large: '24px'
    };

    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.background = options.color || '#4F46E5';
    el.style.width = sizeMap[size];
    el.style.height = sizeMap[size];
    el.style.borderRadius = '50%';
    el.style.border = '2px solid white';
    el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    el.style.cursor = options.draggable ? 'move' : 'pointer';
    el.style.transition = 'all 0.2s ease';

    const marker = new mapboxgl.Marker({
      element: el,
      draggable: options.draggable || false
    }).setLngLat([coordinates.longitude, coordinates.latitude]);

    if (options.label) {
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false
      }).setHTML(`
        <div class="marker-popup">
          <h4>${options.label}</h4>
          <p>${coordinates.address || 'Sin dirección'}</p>
        </div>
      `);
      marker.setPopup(popup);
    }

    marker.addTo(this.map);
    return marker;
  }

  /**
   * Añade un marcador de navegación (punto de partida)
   */
  addStartMarker(coordinates: MapboxCoordinates, label: string = 'Punto de partida'): mapboxgl.Marker {
    return this.addMarker(coordinates, {
      label: label,
      color: '#10B981',
      size: 'large'
    });
  }

  /**
   * Añade un marcador de destino
   */
  addEndMarker(coordinates: MapboxCoordinates, label: string = 'Destino'): mapboxgl.Marker {
    return this.addMarker(coordinates, {
      label: label,
      color: '#EF4444',
      size: 'large'
    });
  }

  /**
   * Añade un marcador de waypoint
   */
  addWaypointMarker(coordinates: MapboxCoordinates, label: string = 'Waypoint'): mapboxgl.Marker {
    return this.addMarker(coordinates, {
      label: label,
      color: '#3B82F6',
      size: 'medium'
    });
  }

  /**
   * Centra el mapa en una ubicación
   */
  centerMap(coordinates: MapboxCoordinates, zoom?: number) {
    if (this.map) {
      this.map.setCenter([coordinates.longitude, coordinates.latitude]);
      if (zoom) {
        this.map.setZoom(zoom);
      }
    }
  }

  /**
   * Obtiene el mapa actual
   */
  getMap(): mapboxgl.Map | null {
    return this.map;
  }

  /**
   * Destruye el mapa
   */
  destroyMap() {
    this.stopNavigation();
    
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  /**
   * Obtiene la navegación actual
   */
  getCurrentNavigation(): Observable<MapboxNavigationRoute | null> {
    return this.navigationSubject.asObservable();
  }

  /**
   * Obtiene el paso actual de navegación
   */
  getCurrentStep(): MapboxNavigationStep | null {
    const route = this.currentRoute;
    if (!route || !route.steps || route.currentStepIndex >= route.steps.length) {
      return null;
    }
    return route.steps[route.currentStepIndex];
  }

  /**
   * Obtiene el valor actual de navegación (para uso interno)
   */
  getCurrentNavigationValue() {
    return this.currentRoute;
  }

  /**
   * Obtiene el progreso de navegación (0-100)
   */
  getNavigationProgress(): number {
    return this.currentRoute?.progress || 0;
  }

  /**
   * Obtiene la distancia restante en metros
   */
  getRemainingDistance(): number {
    return this.currentRoute?.remainingDistance || 0;
  }

  /**
   * Obtiene el tiempo restante en segundos
   */
  getRemainingTime(): number {
    return this.currentRoute?.remainingTime || 0;
  }

  /**
   * Formatea la distancia en formato legible
   */
  formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    } else {
      return `${(meters / 1000).toFixed(1)} km`;
    }
  }

  /**
   * Formatea el tiempo en formato legible
   */
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes} min`;
    }
  }

  /**
   * Obtiene el icono de maniobra para el paso actual
   */
  getManeuverIcon(maneuver: any): string {
    const type = maneuver?.type || 'straight';
    const modifier = maneuver?.modifier || '';
    
    const iconMap: { [key: string]: string } = {
      'turn': '↗️',
      'turn-left': '↖️',
      'turn-right': '↗️',
      'turn-sharp-left': '↖️',
      'turn-sharp-right': '↗️',
      'turn-slight-left': '↖️',
      'turn-slight-right': '↗️',
      'straight': '⬆️',
      'uturn': '↩️',
      'arrive': '🏁',
      'depart': '🚀',
      'merge': '🔀',
      'ramp': '🛣️',
      'roundabout': '🔄',
      'fork': '🔀',
      'end-of-road': '🛑',
      'continue': '➡️'
    };

    const key = modifier ? `${type}-${modifier}` : type;
    return iconMap[key] || iconMap[type] || '📍';
  }

  /**
   * Genera URL para Google Maps
   */
  generateGoogleMapsUrl(waypoints: MapboxCoordinates[]): string {
    const coordinates = waypoints.map(wp => `${wp.latitude},${wp.longitude}`).join('/');
    return `https://www.google.com/maps/dir/${coordinates}`;
  }

  /**
   * Genera URL para Apple Maps
   */
  generateAppleMapsUrl(waypoints: MapboxCoordinates[]): string {
    const coordinates = waypoints.map(wp => `${wp.latitude},${wp.longitude}`).join('/');
    return `https://maps.apple.com/?dir=${coordinates}`;
  }

  // ===== MÉTODOS DE CONTROL DE VOZ =====

  /**
   * Habilita o deshabilita las notificaciones de voz
   */
  setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    this.voiceService.setEnabled(enabled);
    console.log('🎤 Notificaciones de voz:', enabled ? 'Habilitadas' : 'Deshabilitadas');
  }

  /**
   * Verifica si las notificaciones de voz están habilitadas
   */
  isVoiceEnabled(): boolean {
    return this.voiceEnabled && this.voiceService.isVoiceEnabled();
  }

  /**
   * Configura el volumen de las notificaciones de voz (0.0 - 1.0)
   */
  setVoiceVolume(volume: number) {
    this.voiceService.setVolume(volume);
    console.log('🎤 Volumen de voz configurado:', volume);
  }

  /**
   * Configura la velocidad de las notificaciones de voz (0.1 - 10.0)
   */
  setVoiceRate(rate: number) {
    this.voiceService.setRate(rate);
    console.log('🎤 Velocidad de voz configurada:', rate);
  }

  /**
   * Configura el tono de las notificaciones de voz (0 - 2)
   */
  setVoicePitch(pitch: number) {
    this.voiceService.setPitch(pitch);
    console.log('🎤 Tono de voz configurado:', pitch);
  }

  /**
   * Detiene la reproducción de voz actual
   */
  stopVoice() {
    this.voiceService.stopSpeaking();
    console.log('🎤 Reproducción de voz detenida');
  }

  /**
   * Pausa la reproducción de voz actual
   */
  pauseVoice() {
    this.voiceService.pauseSpeaking();
    console.log('🎤 Reproducción de voz pausada');
  }

  /**
   * Reanuda la reproducción de voz pausada
   */
  resumeVoice() {
    this.voiceService.resumeSpeaking();
    console.log('🎤 Reproducción de voz reanudada');
  }

  /**
   * Obtiene la configuración actual de voz
   */
  getVoiceSettings() {
    return this.voiceService.getSettings();
  }

  /**
   * Obtiene las voces disponibles
   */
  getAvailableVoices() {
    return this.voiceService.getAvailableVoices();
  }

  /**
   * Cambia la voz actual
   */
  setVoice(voice: SpeechSynthesisVoice) {
    this.voiceService.setVoice(voice);
    console.log('🎤 Voz cambiada a:', voice.name);
  }

  /**
   * Reproduce una instrucción de voz personalizada
   */
  speakCustomInstruction(text: string, options: {
    distance?: number;
    maneuver?: string;
    priority?: 'high' | 'medium' | 'low';
  } = {}) {
    const voiceInstruction: VoiceInstruction = {
      text,
      distance: options.distance,
      maneuver: options.maneuver,
      priority: options.priority || 'medium'
    };

    this.voiceService.speak(voiceInstruction);
    console.log('🎤 Instrucción personalizada:', text);
  }

  /**
   * Abre Google Maps con la ruta
   */
  openGoogleMaps(coordinates: MapboxCoordinates, options: {
    label?: string;
  } = {}): void {
    const url = this.generateGoogleMapsUrl([coordinates]);
    window.open(url, '_blank');
  }

  /**
   * Abre Apple Maps con la ruta
   */
  openAppleMaps(coordinates: MapboxCoordinates, options: {
    label?: string;
  } = {}): void {
    const url = this.generateAppleMapsUrl([coordinates]);
    window.open(url, '_blank');
  }

  /**
   * Verifica si el mapa está inicializado
   */
  isMapReady(): boolean {
    return this.isInitialized && this.map !== null;
  }

  /**
   * Obtiene el estado actual del servicio
   */
  getServiceStatus(): {
    isInitialized: boolean;
    hasMap: boolean;
    isNavigating: boolean;
    hasRoute: boolean;
    currentStep: number;
    totalSteps: number;
  } {
    return {
      isInitialized: this.isInitialized,
      hasMap: this.map !== null,
      isNavigating: this.currentRoute?.isNavigating || false,
      hasRoute: this.currentRoute !== null,
      currentStep: this.currentRoute?.currentStepIndex || 0,
      totalSteps: this.currentRoute?.steps.length || 0
    };
  }
}
