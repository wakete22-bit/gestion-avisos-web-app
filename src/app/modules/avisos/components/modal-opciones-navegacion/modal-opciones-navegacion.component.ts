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

  /**
   * Muestra información de debug en pantalla
   */
  private mostrarDebug(app: string, message: any) {
    const debugDiv = document.getElementById('debug-info') || this.crearDebugDiv();
    
    const timestamp = new Date().toLocaleTimeString();
    const messageStr = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
    
    const debugEntry = document.createElement('div');
    debugEntry.style.cssText = `
      padding: 8px;
      margin: 4px 0;
      background: #f0f0f0;
      border-left: 4px solid #007bff;
      font-family: monospace;
      font-size: 12px;
      border-radius: 4px;
      word-break: break-all;
    `;
    debugEntry.innerHTML = `<strong>[${timestamp}] ${app}:</strong> ${messageStr}`;
    
    debugDiv.appendChild(debugEntry);
    debugDiv.scrollTop = debugDiv.scrollHeight;
    
    console.log(`[DEBUG ${app}]`, message);
  }

  /**
   * Crea el div de debug si no existe
   */
  private crearDebugDiv(): HTMLElement {
    const debugDiv = document.createElement('div');
    debugDiv.id = 'debug-info';
    debugDiv.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      width: 300px;
      max-height: 400px;
      background: white;
      border: 2px solid #007bff;
      border-radius: 8px;
      padding: 10px;
      z-index: 10000;
      overflow-y: auto;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    const header = document.createElement('div');
    header.style.cssText = `
      font-weight: bold;
      margin-bottom: 10px;
      color: #007bff;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
    `;
    header.textContent = '🐛 DEBUG INFO';
    
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Limpiar';
    clearBtn.style.cssText = `
      position: absolute;
      top: 5px;
      right: 5px;
      background: #dc3545;
      color: white;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10px;
      cursor: pointer;
    `;
    clearBtn.onclick = () => {
      debugDiv.innerHTML = '';
      debugDiv.appendChild(header);
      debugDiv.appendChild(clearBtn);
    };
    
    debugDiv.appendChild(header);
    debugDiv.appendChild(clearBtn);
    document.body.appendChild(debugDiv);
    
    return debugDiv;
  }

  async abrirGoogleMaps() {
    try {
      console.log('🗺️ Abriendo Google Maps con', this.avisosSeleccionados.length, 'avisos');
      
      // Debug: Mostrar información del dispositivo
      const userAgent = navigator.userAgent;
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isAndroid = /Android/.test(userAgent);
      
      this.mostrarDebug('Google Maps', {
        userAgent: userAgent,
        isMobile: isMobile,
        isIOS: isIOS,
        isAndroid: isAndroid,
        avisosCount: this.avisosSeleccionados.length
      });
      
      // Obtener ubicación actual del usuario
      this.mostrarDebug('Google Maps', 'Obteniendo ubicación actual...');
      const currentLocation = await this.obtenerUbicacionActual();
      
      if (!currentLocation) {
        this.mostrarDebug('Google Maps', '❌ No se pudo obtener la ubicación actual');
        console.error('No se pudo obtener la ubicación actual');
        return;
      }

      this.mostrarDebug('Google Maps', `✅ Ubicación obtenida: ${currentLocation.latitude}, ${currentLocation.longitude}`);

      // Construir URLs
      const nativeUrl = this.construirUrlGoogleMaps(currentLocation);
      const webUrl = this.construirUrlGoogleMapsWeb(currentLocation);
      
      this.mostrarDebug('Google Maps', {
        nativeUrl: nativeUrl,
        webUrl: webUrl,
        urlLength: nativeUrl.length
      });
      
      if (isMobile) {
        this.mostrarDebug('Google Maps', '📱 Dispositivo móvil detectado');
        
        // Para móviles, intentar abrir la app nativa primero
        let appOpened = false;
        
        if (isAndroid || isIOS) {
          this.mostrarDebug('Google Maps', `🚀 Intentando abrir app nativa (${isAndroid ? 'Android' : 'iOS'})`);
          
          // Intentar abrir la app nativa
          try {
            // Crear un iframe oculto para intentar abrir la app
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = nativeUrl;
            document.body.appendChild(iframe);
            
            this.mostrarDebug('Google Maps', '📱 Iframe creado, esperando respuesta...');
            
            // Detectar si la app se abrió
            const startTime = Date.now();
            const checkInterval = setInterval(() => {
              if (Date.now() - startTime > 2000) {
                clearInterval(checkInterval);
                if (!appOpened) {
                  // Si no se abrió la app nativa, abrir en navegador
                  this.mostrarDebug('Google Maps', '⏰ Timeout: App nativa no disponible, abriendo en navegador');
                  console.log('App nativa no disponible, abriendo en navegador');
                  window.open(webUrl, '_blank');
                }
                document.body.removeChild(iframe);
              }
            }, 100);
            
            // Detectar si el usuario cambió de ventana (indicando que se abrió la app)
            const visibilityChangeHandler = () => {
              if (document.hidden) {
                appOpened = true;
                this.mostrarDebug('Google Maps', '✅ App nativa abierta exitosamente');
                clearInterval(checkInterval);
                document.body.removeChild(iframe);
                document.removeEventListener('visibilitychange', visibilityChangeHandler);
              }
            };
            
            document.addEventListener('visibilitychange', visibilityChangeHandler);
            
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.mostrarDebug('Google Maps', `❌ Error al abrir app nativa: ${errorMessage}`);
            console.log('Error al abrir app nativa, usando navegador:', error);
            window.open(webUrl, '_blank');
          }
        } else {
          // Para otros móviles, usar navegador
          this.mostrarDebug('Google Maps', '🌐 Otro móvil detectado, usando navegador');
          window.open(webUrl, '_blank');
        }
      } else {
        // Para desktop, abrir directamente en el navegador
        this.mostrarDebug('Google Maps', '🖥️ Desktop detectado, abriendo en navegador');
        window.open(webUrl, '_blank');
      }
      
      await this.modalController.dismiss({ opcion: 'google' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.mostrarDebug('Google Maps', `❌ Error general: ${errorMessage}`);
      console.error('Error al abrir Google Maps:', error);
    }
  }

  async abrirAppleMaps() {
    try {
      console.log('🍎 Abriendo Apple Maps con', this.avisosSeleccionados.length, 'avisos');
      
      // Debug: Mostrar información del dispositivo
      const userAgent = navigator.userAgent;
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      
      this.mostrarDebug('Apple Maps', {
        userAgent: userAgent,
        isMobile: isMobile,
        isIOS: isIOS,
        avisosCount: this.avisosSeleccionados.length
      });
      
      // Obtener ubicación actual del usuario
      this.mostrarDebug('Apple Maps', 'Obteniendo ubicación actual...');
      const currentLocation = await this.obtenerUbicacionActual();
      
      if (!currentLocation) {
        this.mostrarDebug('Apple Maps', '❌ No se pudo obtener la ubicación actual');
        console.error('No se pudo obtener la ubicación actual');
        return;
      }

      this.mostrarDebug('Apple Maps', `✅ Ubicación obtenida: ${currentLocation.latitude}, ${currentLocation.longitude}`);

      // Construir URLs
      const nativeUrl = this.construirUrlAppleMaps(currentLocation);
      const webUrl = this.construirUrlAppleMapsWeb(currentLocation);
      
      this.mostrarDebug('Apple Maps', {
        nativeUrl: nativeUrl,
        webUrl: webUrl,
        urlLength: nativeUrl.length
      });
      
      if (isMobile && isIOS) {
        this.mostrarDebug('Apple Maps', '🍎 iOS detectado, intentando abrir app nativa');
        
        // Para iOS, intentar abrir la app nativa
        let appOpened = false;
        
        try {
          // Crear un iframe oculto para intentar abrir la app
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = nativeUrl;
          document.body.appendChild(iframe);
          
          this.mostrarDebug('Apple Maps', '📱 Iframe creado, esperando respuesta...');
          
          // Detectar si la app se abrió
          const startTime = Date.now();
          const checkInterval = setInterval(() => {
            if (Date.now() - startTime > 2000) {
              clearInterval(checkInterval);
              if (!appOpened) {
                // Si no se abrió la app nativa, abrir en navegador
                this.mostrarDebug('Apple Maps', '⏰ Timeout: App nativa no disponible, abriendo en navegador');
                console.log('App nativa no disponible, abriendo en navegador');
                window.open(webUrl, '_blank');
              }
              document.body.removeChild(iframe);
            }
          }, 100);
          
          // Detectar si el usuario cambió de ventana (indicando que se abrió la app)
          const visibilityChangeHandler = () => {
            if (document.hidden) {
              appOpened = true;
              this.mostrarDebug('Apple Maps', '✅ App nativa abierta exitosamente');
              clearInterval(checkInterval);
              document.body.removeChild(iframe);
              document.removeEventListener('visibilitychange', visibilityChangeHandler);
            }
          };
          
          document.addEventListener('visibilitychange', visibilityChangeHandler);
          
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          this.mostrarDebug('Apple Maps', `❌ Error al abrir app nativa: ${errorMessage}`);
          console.log('Error al abrir app nativa, usando navegador:', error);
          window.open(webUrl, '_blank');
        }
      } else {
        // Para Android o desktop, abrir directamente en el navegador
        this.mostrarDebug('Apple Maps', isMobile ? '🤖 Android detectado, usando navegador' : '🖥️ Desktop detectado, usando navegador');
        window.open(webUrl, '_blank');
      }
      
      await this.modalController.dismiss({ opcion: 'apple' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.mostrarDebug('Apple Maps', `❌ Error general: ${errorMessage}`);
      console.error('Error al abrir Apple Maps:', error);
    }
  }

  async iniciarNavegacionApp() {
    // Lógica para iniciar navegación en la app
    console.log('🚀 Iniciando navegación en la app con', this.avisosSeleccionados.length, 'avisos');
    
    this.mostrarDebug('App Navegación', {
      avisosCount: this.avisosSeleccionados.length,
      avisos: this.avisosSeleccionados.map(aviso => ({
        id: aviso.id,
        direccion: aviso.direccion_cliente_aviso
      }))
    });
    
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
      // Para móviles, usar esquemas de URL nativos correctos
      if (isAndroid) {
        // Android: usar comgooglemaps:// para la app nativa
        if (waypoints.length === 1) {
          return `comgooglemaps://?daddr=${waypoints[0]}&directionsmode=driving`;
        } else {
          // Para múltiples destinos en Android, usar la URL web
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
        // iOS: usar comgooglemaps:// para Google Maps app
        if (waypoints.length === 1) {
          return `comgooglemaps://?daddr=${waypoints[0]}&directionsmode=driving`;
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
        return `maps://?daddr=${waypoints[0]}&dirflg=d`;
      } else {
        // Para múltiples destinos en iOS, usar la URL web
        const destination = waypoints[waypoints.length - 1];
        const intermediateWaypoints = waypoints.slice(0, -1);
        let url = `https://maps.apple.com/?daddr=${destination}`;
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
      return `https://maps.apple.com/?daddr=${waypoints[0]}&dirflg=d`;
    }

    const destination = waypoints[waypoints.length - 1];
    const intermediateWaypoints = waypoints.slice(0, -1);
    let url = `https://maps.apple.com/?daddr=${destination}`;
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
