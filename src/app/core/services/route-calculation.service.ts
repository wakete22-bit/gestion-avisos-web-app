import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { MapboxNavigationService, MapboxCoordinates } from './mapbox-navigation.service';

export interface RouteInfo {
  distancia: string;
  tiempo: string;
  paradas: number;
  tieneUbicacion: boolean;
  distanciaKm: number;
  tiempoMinutos: number;
}

export interface GoogleMapsResponse {
  routes: Array<{
    legs: Array<{
      distance: { text: string; value: number };
      duration: { text: string; value: number };
    }>;
  }>;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class RouteCalculationService {
  private readonly GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Configurar en environment
  private readonly GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/directions/json';

  constructor(
    private http: HttpClient,
    private mapboxService: MapboxNavigationService
  ) {}

  /**
   * Calcula la información de la ruta usando Mapbox Navigation Service
   */
  calcularRuta(
    currentLocation: { latitude: number; longitude: number } | null,
    avisos: any[]
  ): Observable<RouteInfo> {
    if (!currentLocation || avisos.length === 0) {
      return of({
        distancia: 'Ubicación requerida',
        tiempo: 'Ubicación requerida',
        paradas: avisos.length,
        tieneUbicacion: !!currentLocation,
        distanciaKm: 0,
        tiempoMinutos: 0
      });
    }

    // Intentar obtener coordenadas reales de los avisos
    const waypoints = this.extraerCoordenadasDeAvisos(currentLocation, avisos);
    
    if (waypoints.length >= 2) {
      // Usar Mapbox para cálculo real de la ruta
      return new Observable<RouteInfo>(observer => {
        this.mapboxService.createRoute(waypoints)
          .then(route => {
            const rutaInfo: RouteInfo = {
              distancia: this.formatearDistancia(route.totalDistance),
              tiempo: this.formatearTiempo(route.totalDuration),
              paradas: avisos.length,
              tieneUbicacion: true,
              distanciaKm: route.totalDistance / 1000,
              tiempoMinutos: route.totalDuration / 60
            };
            observer.next(rutaInfo);
            observer.complete();
          })
          .catch(error => {
            console.error('Error calculando ruta con Mapbox:', error);
            // Fallback a estimación mejorada
            observer.next(this.estimacionMejorada(currentLocation, avisos));
            observer.complete();
          });
      });
    } else {
      // Si no podemos obtener coordenadas, usar estimación mejorada
      return of(this.estimacionMejorada(currentLocation, avisos));
    }
  }

  /**
   * Procesa la respuesta de Google Maps API
   */
  private procesarRespuestaGoogleMaps(response: GoogleMapsResponse, numParadas: number): RouteInfo {
    if (response.status !== 'OK' || !response.routes || response.routes.length === 0) {
      return this.estimacionRuta(numParadas);
    }

    const route = response.routes[0];
    const totalDistance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
    const totalDuration = route.legs.reduce((sum, leg) => sum + leg.duration.value, 0);

    return {
      distancia: this.formatearDistancia(totalDistance),
      tiempo: this.formatearTiempo(totalDuration),
      paradas: numParadas,
      tieneUbicacion: true,
      distanciaKm: totalDistance / 1000,
      tiempoMinutos: totalDuration / 60
    };
  }

  /**
   * Formatea la distancia en metros a texto legible
   */
  private formatearDistancia(metros: number): string {
    if (metros < 1000) {
      return `${metros} m`;
    } else {
      const km = metros / 1000;
      return km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km)} km`;
    }
  }

  /**
   * Formatea el tiempo en segundos a texto legible
   */
  private formatearTiempo(segundos: number): string {
    const minutos = segundos / 60;
    if (minutos < 60) {
      return `${Math.round(minutos)} min`;
    } else {
      const horas = Math.floor(minutos / 60);
      const minsRestantes = Math.round(minutos % 60);
      return minsRestantes > 0 ? `${horas}h ${minsRestantes}min` : `${horas}h`;
    }
  }

  /**
   * Estimación de ruta basada en el número de paradas
   */
  private estimacionRuta(numParadas: number): RouteInfo {
    let distanciaKm: number;
    let tiempoMinutos: number;

    if (numParadas === 1) {
      distanciaKm = 15;
      tiempoMinutos = 25;
    } else if (numParadas <= 3) {
      distanciaKm = 25;
      tiempoMinutos = 45;
    } else if (numParadas <= 5) {
      distanciaKm = 40;
      tiempoMinutos = 75;
    } else {
      distanciaKm = 60;
      tiempoMinutos = 105;
    }

    return {
      distancia: `~${distanciaKm} km`,
      tiempo: this.formatearTiempo(tiempoMinutos * 60),
      paradas: numParadas,
      tieneUbicacion: true,
      distanciaKm,
      tiempoMinutos
    };
  }

  /**
   * Extrae coordenadas de los avisos para crear waypoints
   */
  private extraerCoordenadasDeAvisos(
    currentLocation: { latitude: number; longitude: number },
    avisos: any[]
  ): MapboxCoordinates[] {
    const waypoints: MapboxCoordinates[] = [
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        address: 'Ubicación actual'
      }
    ];

    // Intentar obtener coordenadas de los avisos
    for (const aviso of avisos) {
      const direccion = aviso.direccion_cliente_aviso;
      if (direccion) {
        const coordenadas = this.obtenerCoordenadasPorDireccion(direccion);
        if (coordenadas) {
          waypoints.push({
            latitude: coordenadas.lat,
            longitude: coordenadas.lng,
            address: direccion
          });
        }
      }
    }

    return waypoints;
  }

  /**
   * Obtiene coordenadas aproximadas basándose en la dirección
   */
  private obtenerCoordenadasPorDireccion(direccion: string): { lat: number; lng: number } | null {
    const direccionLower = direccion.toLowerCase();
    
    // Mapeo de ciudades principales de España con coordenadas aproximadas
    const ciudades = {
      'madrid': { lat: 40.4168, lng: -3.7038 },
      'valencia': { lat: 39.4699, lng: -0.3763 },
      'barcelona': { lat: 41.3851, lng: 2.1734 },
      'sevilla': { lat: 37.3891, lng: -5.9845 },
      'bilbao': { lat: 43.2627, lng: -2.9253 },
      'zaragoza': { lat: 41.6488, lng: -0.8891 },
      'málaga': { lat: 36.7202, lng: -4.4203 },
      'murcia': { lat: 37.9922, lng: -1.1307 },
      'palma': { lat: 39.5696, lng: 2.6502 },
      'las palmas': { lat: 28.1248, lng: -15.4300 },
      'alicante': { lat: 38.3452, lng: -0.4810 },
      'córdoba': { lat: 37.8882, lng: -4.7794 },
      'valladolid': { lat: 41.6523, lng: -4.7245 },
      'vigo': { lat: 42.2406, lng: -8.7207 },
      'gijón': { lat: 43.5357, lng: -5.6615 },
      'granada': { lat: 37.1773, lng: -3.5986 },
      'salamanca': { lat: 40.9701, lng: -5.6635 },
      'burgos': { lat: 42.3409, lng: -3.6997 },
      'albacete': { lat: 38.9977, lng: -1.8541 },
      'león': { lat: 42.5994, lng: -5.5667 },
      'cádiz': { lat: 36.5298, lng: -6.2934 },
      'huelva': { lat: 37.2578, lng: -6.9512 },
      'santander': { lat: 43.4623, lng: -3.8099 },
      'castellón': { lat: 39.9864, lng: -0.0513 },
      'tarragona': { lat: 41.1189, lng: 1.2445 },
      'pamplona': { lat: 42.8178, lng: -1.6442 },
      'almería': { lat: 36.8381, lng: -2.4597 },
      'lugo': { lat: 43.0099, lng: -7.5560 },
      'ourense': { lat: 42.3356, lng: -7.8639 },
      'pontevedra': { lat: 42.4310, lng: -8.6444 },
      'palencia': { lat: 42.0095, lng: -4.5290 },
      'zamora': { lat: 41.5035, lng: -5.7448 },
      'segovia': { lat: 40.9429, lng: -4.1088 },
      'soria': { lat: 41.7665, lng: -2.4790 },
      'ávila': { lat: 40.6566, lng: -4.6812 },
      'guadalajara': { lat: 40.6292, lng: -3.1614 },
      'cuenca': { lat: 40.0718, lng: -2.1340 },
      'toledo': { lat: 39.8628, lng: -4.0273 },
      'ciudad real': { lat: 38.9861, lng: -3.9272 },
      'jaén': { lat: 37.7796, lng: -3.7849 },
      'cáceres': { lat: 39.4753, lng: -6.3724 },
      'badajoz': { lat: 38.8794, lng: -6.9707 },
      'mérida': { lat: 38.9160, lng: -6.3376 },
      'teruel': { lat: 40.3454, lng: -1.1065 },
      'huesca': { lat: 42.1364, lng: -0.4087 },
      'lleida': { lat: 41.6148, lng: 0.6267 },
      'gerona': { lat: 41.9794, lng: 2.8214 },
      'logroño': { lat: 42.4627, lng: -2.4449 }
    };

    // Buscar coincidencias en la dirección
    for (const [ciudad, coordenadas] of Object.entries(ciudades)) {
      if (direccionLower.includes(ciudad)) {
        return coordenadas;
      }
    }

    // Si no encuentra coincidencia, intentar extraer código postal
    const codigoPostal = this.extraerCodigoPostal(direccion);
    if (codigoPostal) {
      return this.obtenerCoordenadasPorCodigoPostal(codigoPostal);
    }

    return null;
  }

  /**
   * Extrae código postal de una dirección
   */
  private extraerCodigoPostal(direccion: string): string | null {
    const match = direccion.match(/\b\d{5}\b/);
    return match ? match[0] : null;
  }

  /**
   * Obtiene coordenadas aproximadas por código postal
   */
  private obtenerCoordenadasPorCodigoPostal(cp: string): { lat: number; lng: number } | null {
    const primerosDigitos = cp.substring(0, 2);
    
    // Mapeo aproximado por provincias (primeros 2 dígitos del CP)
    const provincias: { [key: string]: { lat: number; lng: number } } = {
      '01': { lat: 42.8467, lng: -2.6716 }, // Álava
      '02': { lat: 38.9977, lng: -1.8541 }, // Albacete
      '03': { lat: 38.3452, lng: -0.4810 }, // Alicante
      '04': { lat: 36.8381, lng: -2.4597 }, // Almería
      '05': { lat: 40.9701, lng: -5.6635 }, // Ávila
      '06': { lat: 38.8794, lng: -6.9707 }, // Badajoz
      '07': { lat: 39.5696, lng: 2.6502 }, // Islas Baleares
      '08': { lat: 41.3851, lng: 2.1734 }, // Barcelona
      '09': { lat: 42.3409, lng: -3.6997 }, // Burgos
      '10': { lat: 39.4753, lng: -6.3724 }, // Cáceres
      '11': { lat: 36.5298, lng: -6.2934 }, // Cádiz
      '12': { lat: 39.9864, lng: -0.0513 }, // Castellón
      '13': { lat: 38.9861, lng: -3.9272 }, // Ciudad Real
      '14': { lat: 37.8882, lng: -4.7794 }, // Córdoba
      '15': { lat: 43.3623, lng: -8.4115 }, // La Coruña
      '16': { lat: 40.0718, lng: -2.1340 }, // Cuenca
      '17': { lat: 41.9794, lng: 2.8214 }, // Girona
      '18': { lat: 37.1773, lng: -3.5986 }, // Granada
      '19': { lat: 40.6292, lng: -3.1614 }, // Guadalajara
      '20': { lat: 43.2627, lng: -2.9253 }, // Guipúzcoa
      '21': { lat: 37.2578, lng: -6.9512 }, // Huelva
      '22': { lat: 42.1364, lng: -0.4087 }, // Huesca
      '23': { lat: 37.7796, lng: -3.7849 }, // Jaén
      '24': { lat: 42.5994, lng: -5.5667 }, // León
      '25': { lat: 41.6148, lng: 0.6267 }, // Lleida
      '26': { lat: 42.4627, lng: -2.4449 }, // La Rioja
      '27': { lat: 43.0099, lng: -7.5560 }, // Lugo
      '28': { lat: 40.4168, lng: -3.7038 }, // Madrid
      '29': { lat: 36.7202, lng: -4.4203 }, // Málaga
      '30': { lat: 37.9922, lng: -1.1307 }, // Murcia
      '31': { lat: 42.8178, lng: -1.6442 }, // Navarra
      '32': { lat: 42.3356, lng: -7.8639 }, // Ourense
      '33': { lat: 43.3614, lng: -5.8593 }, // Asturias
      '34': { lat: 42.0095, lng: -4.5290 }, // Palencia
      '35': { lat: 28.4698, lng: -16.2549 }, // Las Palmas
      '36': { lat: 42.4310, lng: -8.6444 }, // Pontevedra
      '37': { lat: 40.9701, lng: -5.6635 }, // Salamanca
      '38': { lat: 28.1248, lng: -15.4300 }, // Santa Cruz de Tenerife
      '39': { lat: 43.4623, lng: -3.8099 }, // Cantabria
      '40': { lat: 40.9429, lng: -4.1088 }, // Segovia
      '41': { lat: 37.3891, lng: -5.9845 }, // Sevilla
      '42': { lat: 41.7665, lng: -2.4790 }, // Soria
      '43': { lat: 41.1189, lng: 1.2445 }, // Tarragona
      '44': { lat: 40.3454, lng: -1.1065 }, // Teruel
      '45': { lat: 39.8628, lng: -4.0273 }, // Toledo
      '46': { lat: 39.4699, lng: -0.3763 }, // Valencia
      '47': { lat: 41.6523, lng: -4.7245 }, // Valladolid
      '48': { lat: 43.2627, lng: -2.9253 }, // Vizcaya
      '49': { lat: 41.5035, lng: -5.7448 }, // Zamora
      '50': { lat: 41.6488, lng: -0.8891 }  // Zaragoza
    };

    return provincias[primerosDigitos] || null;
  }

  /**
   * Estimación mejorada basada en ubicaciones reales
   */
  private estimacionMejorada(
    currentLocation: { latitude: number; longitude: number },
    avisos: any[]
  ): RouteInfo {
    const waypoints = this.extraerCoordenadasDeAvisos(currentLocation, avisos);
    
    if (waypoints.length >= 2) {
      // Calcular distancia real usando fórmula de Haversine
      const distanciaTotal = this.calcularDistanciaTotal(waypoints);
      const tiempoEstimado = this.estimacionTiempoPorDistancia(distanciaTotal);

      return {
        distancia: this.formatearDistancia(distanciaTotal * 1000), // Convertir a metros
        tiempo: this.formatearTiempo(tiempoEstimado * 60), // Convertir a segundos
        paradas: avisos.length,
        tieneUbicacion: true,
        distanciaKm: distanciaTotal,
        tiempoMinutos: tiempoEstimado
      };
    }

    // Fallback a estimación básica si no podemos obtener coordenadas
    return this.estimacionRuta(avisos.length);
  }

  /**
   * Calcula la distancia total entre waypoints usando fórmula de Haversine
   */
  private calcularDistanciaTotal(waypoints: MapboxCoordinates[]): number {
    if (waypoints.length < 2) return 0;

    let distanciaTotal = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      distanciaTotal += this.calcularDistanciaHaversine(
        waypoints[i],
        waypoints[i + 1]
      );
    }

    return Math.round(distanciaTotal * 100) / 100; // Redondear a 2 decimales
  }

  /**
   * Calcula la distancia entre dos puntos usando la fórmula de Haversine
   */
  private calcularDistanciaHaversine(
    punto1: { latitude: number; longitude: number },
    punto2: { latitude: number; longitude: number }
  ): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(punto2.latitude - punto1.latitude);
    const dLon = this.toRad(punto2.longitude - punto1.longitude);
    const lat1 = this.toRad(punto1.latitude);
    const lat2 = this.toRad(punto2.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  /**
   * Convierte grados a radianes
   */
  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Estima el tiempo basado en la distancia
   */
  private estimacionTiempoPorDistancia(distanciaKm: number): number {
    // Velocidad media estimada: 80 km/h en carretera, 40 km/h en ciudad
    const velocidadMedia = distanciaKm > 50 ? 80 : 40;
    return Math.round(distanciaKm / velocidadMedia * 60);
  }

  /**
   * Obtiene la ubicación actual del usuario
   */
  obtenerUbicacionActual(): Promise<{ latitude: number; longitude: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.error('Geolocalización no soportada');
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutos de cache
        }
      );
    });
  }
}
