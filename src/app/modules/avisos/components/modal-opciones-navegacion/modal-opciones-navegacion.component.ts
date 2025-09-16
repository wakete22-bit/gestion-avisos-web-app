import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { navigateOutline, logoGoogle, logoApple, playOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-modal-opciones-navegacion',
  templateUrl: './modal-opciones-navegacion.component.html',
  styleUrls: ['./modal-opciones-navegacion.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon]
})
export class ModalOpcionesNavegacionComponent {
  @Input() avisosSeleccionados: any[] = [];

  constructor(private modalController: ModalController) {
    addIcons({ navigateOutline, logoGoogle, logoApple, playOutline, closeOutline });
  }

  async abrirGoogleMaps() {
    try {
      console.log('Abriendo Google Maps con', this.avisosSeleccionados.length, 'avisos');
      
      // Obtener ubicación actual del usuario
      const currentLocation = await this.obtenerUbicacionActual();
      
      if (!currentLocation) {
        console.error('No se pudo obtener la ubicación actual');
        return;
      }

      // Construir URL de Google Maps con múltiples waypoints
      const googleMapsUrl = this.construirUrlGoogleMaps(currentLocation);
      
      // Intentar abrir la aplicación nativa primero
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Para móviles, intentar abrir la app nativa
        const fallbackUrl = this.construirUrlGoogleMapsWeb(currentLocation);
        
        // Crear un enlace temporal para probar si la app nativa está disponible
        const link = document.createElement('a');
        link.href = googleMapsUrl;
        link.target = '_blank';
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Intentar abrir la app nativa
        try {
          link.click();
          
          // Si la app nativa no se abre, mostrar fallback después de un delay
          setTimeout(() => {
            if (confirm('¿No se abrió Google Maps? ¿Quieres abrirlo en el navegador?')) {
              window.open(fallbackUrl, '_blank');
            }
          }, 2000);
        } catch (error) {
          console.log('App nativa no disponible, abriendo en navegador');
          window.open(fallbackUrl, '_blank');
        } finally {
          document.body.removeChild(link);
        }
      } else {
        // Para desktop, abrir directamente en el navegador
        window.open(googleMapsUrl, '_blank');
      }
      
      await this.modalController.dismiss({ opcion: 'google' });
    } catch (error) {
      console.error('Error al abrir Google Maps:', error);
    }
  }

  async abrirAppleMaps() {
    try {
      console.log('Abriendo Apple Maps con', this.avisosSeleccionados.length, 'avisos');
      
      // Obtener ubicación actual del usuario
      const currentLocation = await this.obtenerUbicacionActual();
      
      if (!currentLocation) {
        console.error('No se pudo obtener la ubicación actual');
        return;
      }

      // Construir URL de Apple Maps con múltiples waypoints
      const appleMapsUrl = this.construirUrlAppleMaps(currentLocation);
      
      // Intentar abrir la aplicación nativa primero
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      if (isMobile && isIOS) {
        // Para iOS, intentar abrir la app nativa
        const fallbackUrl = this.construirUrlAppleMapsWeb(currentLocation);
        
        // Crear un enlace temporal para probar si la app nativa está disponible
        const link = document.createElement('a');
        link.href = appleMapsUrl;
        link.target = '_blank';
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Intentar abrir la app nativa
        try {
          link.click();
          
          // Si la app nativa no se abre, mostrar fallback después de un delay
          setTimeout(() => {
            if (confirm('¿No se abrió Apple Maps? ¿Quieres abrirlo en el navegador?')) {
              window.open(fallbackUrl, '_blank');
            }
          }, 2000);
        } catch (error) {
          console.log('App nativa no disponible, abriendo en navegador');
          window.open(fallbackUrl, '_blank');
        } finally {
          document.body.removeChild(link);
        }
      } else {
        // Para Android o desktop, abrir directamente en el navegador
        window.open(appleMapsUrl, '_blank');
      }
      
      await this.modalController.dismiss({ opcion: 'apple' });
    } catch (error) {
      console.error('Error al abrir Apple Maps:', error);
    }
  }

  async iniciarNavegacionApp() {
    // Lógica para iniciar navegación en la app
    console.log('Iniciando navegación en la app con', this.avisosSeleccionados.length, 'avisos');
    await this.modalController.dismiss({ opcion: 'app' });
  }

  async cerrar() {
    await this.modalController.dismiss();
  }

  /**
   * Obtiene la ubicación actual del usuario
   */
  private obtenerUbicacionActual(): Promise<{ latitude: number; longitude: number } | null> {
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
          console.error('Error al obtener ubicación:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutos
        }
      );
    });
  }

  /**
   * Construye la URL de Google Maps con múltiples waypoints
   */
  private construirUrlGoogleMaps(currentLocation: { latitude: number; longitude: number }): string {
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    
    // Preparar waypoints (todos los avisos seleccionados)
    const waypoints = this.avisosSeleccionados.map(aviso => {
      if (aviso.direccion_cliente_aviso) {
        return encodeURIComponent(aviso.direccion_cliente_aviso);
      }
      return null;
    }).filter(waypoint => waypoint !== null);

    // Detectar si es móvil
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isMobile) {
      // Para móviles, usar esquemas de URL nativos
      if (isAndroid) {
        // Android: usar com.google.android.apps.maps
        if (waypoints.length === 1) {
          return `google.navigation:q=${waypoints[0]}`;
        } else {
          // Para múltiples destinos en Android, usar la URL web con parámetros optimizados
          const destination = waypoints[waypoints.length - 1];
          const waypointsString = waypoints.slice(0, -1).join('|');
          let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
          if (waypointsString) {
            url += `&waypoints=${waypointsString}`;
          }
          url += `&travelmode=driving&dir_action=navigate`;
          return url;
        }
      } else if (isIOS) {
        // iOS: usar maps://
        if (waypoints.length === 1) {
          return `maps://maps.google.com/maps?daddr=${waypoints[0]}&dirflg=d`;
        } else {
          // Para múltiples destinos en iOS, usar la URL web
          const destination = waypoints[waypoints.length - 1];
          const waypointsString = waypoints.slice(0, -1).join('|');
          let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
          if (waypointsString) {
            url += `&waypoints=${waypointsString}`;
          }
          url += `&travelmode=driving&dir_action=navigate`;
          return url;
        }
      }
    }

    // Para desktop, usar URL web estándar
    if (waypoints.length === 1) {
      return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${waypoints[0]}&travelmode=driving&dir_action=navigate`;
    }

    const destination = waypoints[waypoints.length - 1];
    const waypointsString = waypoints.slice(0, -1).join('|');
    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    if (waypointsString) {
      url += `&waypoints=${waypointsString}`;
    }
    url += `&travelmode=driving&dir_action=navigate`;

    console.log('URL de Google Maps construida:', url);
    return url;
  }

  /**
   * Construye la URL de Apple Maps con múltiples waypoints
   */
  private construirUrlAppleMaps(currentLocation: { latitude: number; longitude: number }): string {
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    
    // Preparar waypoints para Apple Maps
    const waypoints = this.avisosSeleccionados.map(aviso => {
      if (aviso.direccion_cliente_aviso) {
        return encodeURIComponent(aviso.direccion_cliente_aviso);
      }
      return null;
    }).filter(waypoint => waypoint !== null);

    // Detectar si es móvil
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isMobile && isIOS) {
      // Para iOS, usar esquema nativo de Apple Maps
      if (waypoints.length === 1) {
        return `maps://?saddr=${origin}&daddr=${waypoints[0]}&dirflg=d`;
      } else {
        // Para múltiples destinos en iOS, usar la URL web
        const destination = waypoints[waypoints.length - 1];
        const intermediateWaypoints = waypoints.slice(0, -1);
        let url = `https://maps.apple.com/?saddr=${origin}&daddr=${destination}`;
        if (intermediateWaypoints.length > 0) {
          const viaParams = intermediateWaypoints.map(waypoint => `via=${waypoint}`).join('&');
          url += `&${viaParams}`;
        }
        url += `&dirflg=d`;
        return url;
      }
    }

    // Para Android o desktop, usar URL web
    if (waypoints.length === 1) {
      return `https://maps.apple.com/?saddr=${origin}&daddr=${waypoints[0]}&dirflg=d`;
    }

    const destination = waypoints[waypoints.length - 1];
    const intermediateWaypoints = waypoints.slice(0, -1);
    let url = `https://maps.apple.com/?saddr=${origin}&daddr=${destination}`;
    if (intermediateWaypoints.length > 0) {
      const viaParams = intermediateWaypoints.map(waypoint => `via=${waypoint}`).join('&');
      url += `&${viaParams}`;
    }
    url += `&dirflg=d`;

    console.log('URL de Apple Maps construida:', url);
    return url;
  }

  /**
   * Construye la URL web de Google Maps como fallback
   */
  private construirUrlGoogleMapsWeb(currentLocation: { latitude: number; longitude: number }): string {
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    
    const waypoints = this.avisosSeleccionados.map(aviso => {
      if (aviso.direccion_cliente_aviso) {
        return encodeURIComponent(aviso.direccion_cliente_aviso);
      }
      return null;
    }).filter(waypoint => waypoint !== null);

    if (waypoints.length === 1) {
      return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${waypoints[0]}&travelmode=driving&dir_action=navigate`;
    }

    const destination = waypoints[waypoints.length - 1];
    const waypointsString = waypoints.slice(0, -1).join('|');
    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    if (waypointsString) {
      url += `&waypoints=${waypointsString}`;
    }
    url += `&travelmode=driving&dir_action=navigate`;

    return url;
  }

  /**
   * Construye la URL web de Apple Maps como fallback
   */
  private construirUrlAppleMapsWeb(currentLocation: { latitude: number; longitude: number }): string {
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    
    const waypoints = this.avisosSeleccionados.map(aviso => {
      if (aviso.direccion_cliente_aviso) {
        return encodeURIComponent(aviso.direccion_cliente_aviso);
      }
      return null;
    }).filter(waypoint => waypoint !== null);

    if (waypoints.length === 1) {
      return `https://maps.apple.com/?saddr=${origin}&daddr=${waypoints[0]}&dirflg=d`;
    }

    const destination = waypoints[waypoints.length - 1];
    const intermediateWaypoints = waypoints.slice(0, -1);
    let url = `https://maps.apple.com/?saddr=${origin}&daddr=${destination}`;
    if (intermediateWaypoints.length > 0) {
      const viaParams = intermediateWaypoints.map(waypoint => `via=${waypoint}`).join('&');
      url += `&${viaParams}`;
    }
    url += `&dirflg=d`;

    return url;
  }
}
