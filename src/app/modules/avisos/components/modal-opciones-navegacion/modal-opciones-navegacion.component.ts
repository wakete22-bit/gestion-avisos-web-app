import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { IonIcon, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { navigateOutline, logoGoogle, logoApple, playOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-modal-opciones-navegacion',
  templateUrl: './modal-opciones-navegacion.component.html',
  styleUrls: ['./modal-opciones-navegacion.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonContent]
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
      
      // Abrir Google Maps
      window.open(googleMapsUrl, '_blank');
      
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
      
      // Abrir Apple Maps
      window.open(appleMapsUrl, '_blank');
      
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

    // Si solo hay un aviso, va directo como destino
    if (waypoints.length === 1) {
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${waypoints[0]}&travelmode=driving&dir_action=navigate`;
      console.log('URL de Google Maps (1 destino):', googleMapsUrl);
      return googleMapsUrl;
    }

    // Si hay múltiples avisos, el último será el destino final y el resto waypoints
    const destination = waypoints[waypoints.length - 1];
    const waypointsString = waypoints.slice(0, -1).join('|');

    // Construir URL de Google Maps
    let googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    
    if (waypointsString) {
      googleMapsUrl += `&waypoints=${waypointsString}`;
    }

    // Agregar parámetros adicionales para optimización
    googleMapsUrl += `&travelmode=driving&dir_action=navigate`;

    console.log('URL de Google Maps construida:', googleMapsUrl);
    return googleMapsUrl;
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

    // Si solo hay un aviso, va directo como destino
    if (waypoints.length === 1) {
      const appleMapsUrl = `https://maps.apple.com/?saddr=${origin}&daddr=${waypoints[0]}&dirflg=d`;
      console.log('URL de Apple Maps (1 destino):', appleMapsUrl);
      return appleMapsUrl;
    }

    // Si hay múltiples avisos, el último será el destino final y el resto waypoints
    const destination = waypoints[waypoints.length - 1];
    const intermediateWaypoints = waypoints.slice(0, -1);
    
    // Construir URL de Apple Maps
    let appleMapsUrl = `https://maps.apple.com/?saddr=${origin}&daddr=${destination}`;
    
    // Agregar waypoints intermedios
    if (intermediateWaypoints.length > 0) {
      const viaParams = intermediateWaypoints.map(waypoint => `via=${waypoint}`).join('&');
      appleMapsUrl += `&${viaParams}`;
    }

    // Agregar parámetros adicionales
    appleMapsUrl += `&dirflg=d`; // Modo de conducción

    console.log('URL de Apple Maps construida:', appleMapsUrl);
    return appleMapsUrl;
  }
}
