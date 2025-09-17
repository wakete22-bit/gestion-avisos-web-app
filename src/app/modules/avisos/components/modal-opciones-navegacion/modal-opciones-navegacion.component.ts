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
        
        // Preguntar al usuario si quiere continuar sin ubicación actual
        const continuarSinUbicacion = confirm(
          '🔒 No se pudo obtener tu ubicación actual.\n\n' +
          'Esto puede ser porque:\n' +
          '• El permiso de ubicación está denegado\n' +
          '• El GPS está desactivado\n' +
          '• No hay señal GPS\n\n' +
          '¿Quieres continuar sin incluir tu ubicación como punto de partida?\n\n' +
          'Nota: La ruta será solo entre los destinos seleccionados.'
        );
        
        if (!continuarSinUbicacion) {
          this.mostrarDebug('Google Maps', '❌ Usuario canceló la operación');
          return;
        }
        
        // Usar ubicación por defecto (Madrid) o sin origen
        this.mostrarDebug('Google Maps', '📍 Continuando sin ubicación actual');
      }

      if (currentLocation) {
        this.mostrarDebug('Google Maps', `✅ Ubicación obtenida: ${currentLocation.latitude}, ${currentLocation.longitude}`);
      } else {
        this.mostrarDebug('Google Maps', '📍 Sin ubicación actual, usando solo destinos');
      }

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
          this.mostrarDebug('Google Maps', `URL nativa: ${nativeUrl}`);
          
          // Intentar abrir directamente la app nativa
          this.mostrarDebug('Google Maps', '🚀 Intentando abrir Google Maps nativo...');
          this.abrirAppNativa(nativeUrl, webUrl, 'Google Maps');
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

  /**
   * Abre la app nativa con detección mejorada
   */
  private abrirAppNativa(nativeUrl: string, webUrl: string, appName: string) {
    this.mostrarDebug(appName, '📍 Intentando abrir app nativa...');
    this.mostrarDebug(appName, `URL completa: ${nativeUrl}`);
    
    // Método 1: Intentar con window.location (más directo)
    try {
      this.mostrarDebug(appName, '🔄 Método 1: window.location...');
      window.location.href = nativeUrl;
      
      // Esperar un poco para ver si funciona
      setTimeout(() => {
        this.mostrarDebug(appName, '⏰ Método 1 timeout, probando método 2...');
        this.intentarMetodoAlternativo(nativeUrl, webUrl, appName);
      }, 2000);
      
    } catch (error) {
      this.mostrarDebug(appName, `❌ Error en método 1: ${error}`);
      this.intentarMetodoAlternativo(nativeUrl, webUrl, appName);
    }
  }

  /**
   * Intenta método alternativo para abrir la app
   */
  private intentarMetodoAlternativo(nativeUrl: string, webUrl: string, appName: string) {
    this.mostrarDebug(appName, '🔄 Método 2: Enlace directo...');
    
    try {
      // Crear un enlace temporal
      const link = document.createElement('a');
      link.href = nativeUrl;
      link.target = '_blank';
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Intentar hacer clic en el enlace
      link.click();
      
      this.mostrarDebug(appName, '📍 Enlace clickeado');
      
      // Esperar un poco más
      setTimeout(() => {
        this.mostrarDebug(appName, '⏰ Método 2 timeout, probando método 3...');
        document.body.removeChild(link);
        this.intentarMetodoIframe(nativeUrl, webUrl, appName);
      }, 2000);
      
    } catch (error) {
      this.mostrarDebug(appName, `❌ Error en método 2: ${error}`);
      this.intentarMetodoIframe(nativeUrl, webUrl, appName);
    }
  }

  /**
   * Intenta método con iframe
   */
  private intentarMetodoIframe(nativeUrl: string, webUrl: string, appName: string) {
    this.mostrarDebug(appName, '🔄 Método 3: Iframe...');
    
    try {
      // Crear iframe oculto
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.style.width = '1px';
      iframe.style.height = '1px';
      iframe.src = nativeUrl;
      document.body.appendChild(iframe);
      
      this.mostrarDebug(appName, '📍 Iframe creado');
      
      // Esperar un poco más
      setTimeout(() => {
        this.mostrarDebug(appName, '⏰ Todos los métodos fallaron, abriendo en navegador');
        document.body.removeChild(iframe);
        window.open(webUrl, '_blank');
      }, 2000);
      
    } catch (error) {
      this.mostrarDebug(appName, `❌ Error en método 3: ${error}`);
      this.mostrarDebug(appName, '🌐 Abriendo en navegador como último recurso');
      window.open(webUrl, '_blank');
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
        
        // Preguntar al usuario si quiere continuar sin ubicación actual
        const continuarSinUbicacion = confirm(
          '🔒 No se pudo obtener tu ubicación actual.\n\n' +
          'Esto puede ser porque:\n' +
          '• El permiso de ubicación está denegado\n' +
          '• El GPS está desactivado\n' +
          '• No hay señal GPS\n\n' +
          '¿Quieres continuar sin incluir tu ubicación como punto de partida?\n\n' +
          'Nota: La ruta será solo entre los destinos seleccionados.'
        );
        
        if (!continuarSinUbicacion) {
          this.mostrarDebug('Apple Maps', '❌ Usuario canceló la operación');
          return;
        }
        
        // Usar ubicación por defecto (Madrid) o sin origen
        this.mostrarDebug('Apple Maps', '📍 Continuando sin ubicación actual');
      }

      if (currentLocation) {
        this.mostrarDebug('Apple Maps', `✅ Ubicación obtenida: ${currentLocation.latitude}, ${currentLocation.longitude}`);
      } else {
        this.mostrarDebug('Apple Maps', '📍 Sin ubicación actual, usando solo destinos');
      }

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
        this.mostrarDebug('Apple Maps', `URL nativa: ${nativeUrl}`);
        
        // Intentar abrir directamente Apple Maps
        this.mostrarDebug('Apple Maps', '🚀 Intentando abrir Apple Maps nativo...');
        this.abrirAppNativa(nativeUrl, webUrl, 'Apple Maps');
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
   * Obtiene la ubicación actual del usuario con solicitud de permiso nativa
   */
  private async obtenerUbicacionActual(): Promise<{ latitude: number; longitude: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.error('Geolocalización no soportada');
        this.mostrarDebug('Ubicación', '❌ Geolocalización no soportada en este navegador');
        resolve(null);
        return;
      }

      // Mostrar mensaje informativo antes de solicitar ubicación
      this.mostrarDebug('Ubicación', '🌍 Solicitando permiso de ubicación...');
      
      // Verificar si ya tenemos permiso
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((result) => {
          this.mostrarDebug('Ubicación', `Estado de permiso: ${result.state}`);
          
          if (result.state === 'denied') {
            this.mostrarDebug('Ubicación', '❌ Permiso de ubicación denegado. Ve a configuración del navegador para habilitarlo.');
            // Mostrar instrucciones al usuario
            this.mostrarInstruccionesUbicacion();
            resolve(null);
            return;
          }
          
          if (result.state === 'prompt') {
            this.mostrarDebug('Ubicación', '📍 Aparecerá una ventana del navegador pidiendo permiso de ubicación');
          }
          
          this.solicitarUbicacion(resolve);
        }).catch(() => {
          // Si no soporta permissions API, intentar directamente
          this.mostrarDebug('Ubicación', '📍 Solicitando ubicación directamente...');
          this.solicitarUbicacion(resolve);
        });
      } else {
        // Si no soporta permissions API, intentar directamente
        this.mostrarDebug('Ubicación', '📍 Solicitando ubicación directamente...');
        this.solicitarUbicacion(resolve);
      }
    });
  }

  /**
   * Solicita la ubicación al usuario
   */
  private solicitarUbicacion(resolve: (value: { latitude: number; longitude: number } | null) => void) {
    this.mostrarDebug('Ubicación', '🌍 Solicitando ubicación GPS...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.mostrarDebug('Ubicación', `✅ Ubicación obtenida: ${position.coords.latitude}, ${position.coords.longitude}`);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        let errorMessage = '';
        let mostrarInstrucciones = false;
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permiso de ubicación denegado por el usuario';
            mostrarInstrucciones = true;
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Ubicación no disponible (GPS desactivado o sin señal)';
            break;
          case error.TIMEOUT:
            errorMessage = 'Timeout al obtener ubicación (tardó más de 15 segundos)';
            break;
          default:
            errorMessage = `Error desconocido: ${error.message}`;
            break;
        }
        
        this.mostrarDebug('Ubicación', `❌ Error: ${errorMessage}`);
        console.error('Error al obtener ubicación:', error);
        
        if (mostrarInstrucciones) {
          this.mostrarInstruccionesUbicacion();
        }
        
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // 15 segundos para dar más tiempo
        maximumAge: 0 // No usar cache, obtener ubicación fresca
      }
    );
  }

  /**
   * Verifica si una app nativa está instalada
   */
  private async verificarAppInstalada(scheme: string, appName: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.mostrarDebug(appName, `🔍 Verificando si ${appName} está instalado...`);
      
      // Para verificación más precisa, usar un esquema de prueba simple
      const testScheme = scheme.includes('?') ? scheme.split('?')[0] : scheme;
      
      // Crear un enlace temporal para probar
      const link = document.createElement('a');
      link.href = testScheme;
      link.target = '_blank';
      link.style.display = 'none';
      document.body.appendChild(link);
      
      let resolved = false;
      let appOpened = false;
      
      // Timeout más corto para verificación
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          this.mostrarDebug(appName, `❌ ${appName} no está instalado (timeout)`);
          document.body.removeChild(link);
          resolve(false);
        }
      }, 500); // Reducir a 500ms
      
      // Detectar si la app se abrió (indicando que está instalada)
      const visibilityChangeHandler = () => {
        if (document.hidden && !resolved) {
          resolved = true;
          appOpened = true;
          this.mostrarDebug(appName, `✅ ${appName} está instalado (página oculta)`);
          clearTimeout(timeout);
          document.body.removeChild(link);
          document.removeEventListener('visibilitychange', visibilityChangeHandler);
          window.removeEventListener('blur', blurHandler);
          resolve(true);
        }
      };
      
      document.addEventListener('visibilitychange', visibilityChangeHandler);
      
      // También detectar cuando la página pierde el foco
      const blurHandler = () => {
        if (!resolved) {
          resolved = true;
          appOpened = true;
          this.mostrarDebug(appName, `✅ ${appName} está instalado (página perdió foco)`);
          clearTimeout(timeout);
          document.body.removeChild(link);
          document.removeEventListener('visibilitychange', visibilityChangeHandler);
          window.removeEventListener('blur', blurHandler);
          resolve(true);
        }
      };
      
      window.addEventListener('blur', blurHandler);
      
      // Intentar hacer clic en el enlace
      try {
        link.click();
        this.mostrarDebug(appName, `📍 Enlace de prueba clickeado: ${testScheme}`);
      } catch (error) {
        if (!resolved) {
          resolved = true;
          this.mostrarDebug(appName, `❌ Error al hacer clic: ${error}`);
          clearTimeout(timeout);
          document.body.removeChild(link);
          resolve(false);
        }
      }
    });
  }

  /**
   * Intenta abrir la app nativa con métodos alternativos
   */
  private intentarAbrirAppAlternativo(nativeUrl: string, webUrl: string, appName: string) {
    this.mostrarDebug(appName, '🔄 Método alternativo: Intentando con iframe...');
    
    try {
      // Método 2: Usar iframe oculto
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.style.width = '1px';
      iframe.style.height = '1px';
      iframe.src = nativeUrl;
      document.body.appendChild(iframe);
      
      this.mostrarDebug(appName, '📍 Iframe creado, esperando respuesta...');
      
      // Esperar un poco más para ver si la app se abre
      setTimeout(() => {
        this.mostrarDebug(appName, '⏰ Método alternativo timeout: Abriendo en navegador');
        document.body.removeChild(iframe);
        window.open(webUrl, '_blank');
      }, 2000);
      
      // Detectar si la app se abrió
      const visibilityChangeHandler = () => {
        if (document.hidden) {
          this.mostrarDebug(appName, '✅ App nativa abierta con método alternativo');
          document.body.removeChild(iframe);
          document.removeEventListener('visibilitychange', visibilityChangeHandler);
        }
      };
      
      document.addEventListener('visibilitychange', visibilityChangeHandler);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.mostrarDebug(appName, `❌ Error en método alternativo: ${errorMessage}`);
      window.open(webUrl, '_blank');
    }
  }

  /**
   * Muestra instrucciones para habilitar la ubicación
   */
  private mostrarInstruccionesUbicacion() {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    let instrucciones = '';
    
    if (isMobile) {
      if (isIOS) {
        instrucciones = `
          📱 Para habilitar la ubicación en iOS:
          1. Ve a Configuración > Privacidad y Seguridad > Servicios de Ubicación
          2. Activa "Servicios de Ubicación"
          3. Busca tu navegador (Safari/Chrome) en la lista
          4. Selecciona "Permitir" o "Mientras uso la app"
          5. Recarga esta página e intenta de nuevo
        `;
      } else if (isAndroid) {
        instrucciones = `
          📱 Para habilitar la ubicación en Android:
          1. Ve a Configuración > Ubicación
          2. Activa "Ubicación"
          3. En tu navegador, toca el ícono de ubicación en la barra de direcciones
          4. Selecciona "Permitir" o "Permitir siempre"
          5. Recarga esta página e intenta de nuevo
        `;
      } else {
        instrucciones = `
          📱 Para habilitar la ubicación en móvil:
          1. Ve a la configuración de tu navegador
          2. Busca "Ubicación" o "Permisos"
          3. Permite el acceso a la ubicación para este sitio
          4. Recarga la página e intenta de nuevo
        `;
      }
    } else {
      instrucciones = `
        🖥️ Para habilitar la ubicación en desktop:
        1. Busca el ícono de ubicación en la barra de direcciones (🔒 o 📍)
        2. Haz clic en él y selecciona "Permitir"
        3. O ve a Configuración del navegador > Privacidad > Ubicación
        4. Permite el acceso para este sitio
        5. Recarga la página e intenta de nuevo
      `;
    }
    
    this.mostrarDebug('Ubicación', instrucciones);
    
    // Mostrar también un alert más visible
    alert(`🔒 Permiso de Ubicación Requerido\n\n${instrucciones}\n\nDespués de habilitar la ubicación, recarga la página e intenta de nuevo.`);
  }

  /**
   * Construye la URL de Google Maps con múltiples waypoints
   */
  private construirUrlGoogleMaps(currentLocation: { latitude: number; longitude: number } | null): string {
    const origin = currentLocation ? `${currentLocation.latitude},${currentLocation.longitude}` : null;
    
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
          let url = `https://www.google.com/maps/dir/?api=1`;
          if (origin) {
            url += `&origin=${origin}`;
          }
          url += `&destination=${destination}`;
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
          let url = `https://www.google.com/maps/dir/?api=1`;
          if (origin) {
            url += `&origin=${origin}`;
          }
          url += `&destination=${destination}`;
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
      let url = `https://www.google.com/maps/dir/?api=1`;
      if (origin) {
        url += `&origin=${origin}`;
      }
      url += `&destination=${waypoints[0]}&travelmode=driving&dir_action=navigate`;
      return url;
    }

    const destination = waypoints[waypoints.length - 1];
    const waypointsString = waypoints.slice(0, -1).join('|');
    let url = `https://www.google.com/maps/dir/?api=1`;
    if (origin) {
      url += `&origin=${origin}`;
    }
    url += `&destination=${destination}`;
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
  private construirUrlAppleMaps(currentLocation: { latitude: number; longitude: number } | null): string {
    const origin = currentLocation ? `${currentLocation.latitude},${currentLocation.longitude}` : null;
    
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
          let url = `https://maps.apple.com/?`;
          if (origin) {
            url += `saddr=${origin}&`;
          }
          url += `daddr=${destination}`;
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
      let url = `https://maps.apple.com/?`;
      if (origin) {
        url += `saddr=${origin}&`;
      }
      url += `daddr=${waypoints[0]}&dirflg=d`;
      return url;
    }

    const destination = waypoints[waypoints.length - 1];
    const intermediateWaypoints = waypoints.slice(0, -1);
    let url = `https://maps.apple.com/?`;
    if (origin) {
      url += `saddr=${origin}&`;
    }
    url += `daddr=${destination}`;
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
  private construirUrlGoogleMapsWeb(currentLocation: { latitude: number; longitude: number } | null): string {
    const origin = currentLocation ? `${currentLocation.latitude},${currentLocation.longitude}` : null;
    
    const waypoints = this.avisosSeleccionados.map(aviso => {
      if (aviso.direccion_cliente_aviso) {
        return encodeURIComponent(aviso.direccion_cliente_aviso);
      }
      return null;
    }).filter(waypoint => waypoint !== null);

    if (waypoints.length === 1) {
      let url = `https://www.google.com/maps/dir/?api=1`;
      if (origin) {
        url += `&origin=${origin}`;
      }
      url += `&destination=${waypoints[0]}&travelmode=driving&dir_action=navigate`;
      return url;
    }

    const destination = waypoints[waypoints.length - 1];
    const waypointsString = waypoints.slice(0, -1).join('|');
    let url = `https://www.google.com/maps/dir/?api=1`;
    if (origin) {
      url += `&origin=${origin}`;
    }
    url += `&destination=${destination}`;
    if (waypointsString) {
      url += `&waypoints=${waypointsString}`;
    }
    url += `&travelmode=driving&dir_action=navigate`;

    return url;
  }

  /**
   * Construye la URL web de Apple Maps como fallback
   */
  private construirUrlAppleMapsWeb(currentLocation: { latitude: number; longitude: number } | null): string {
    const origin = currentLocation ? `${currentLocation.latitude},${currentLocation.longitude}` : null;
    
    const waypoints = this.avisosSeleccionados.map(aviso => {
      if (aviso.direccion_cliente_aviso) {
        return encodeURIComponent(aviso.direccion_cliente_aviso);
      }
      return null;
    }).filter(waypoint => waypoint !== null);

    if (waypoints.length === 1) {
      let url = `https://maps.apple.com/?`;
      if (origin) {
        url += `saddr=${origin}&`;
      }
      url += `daddr=${waypoints[0]}&dirflg=d`;
      return url;
    }

    const destination = waypoints[waypoints.length - 1];
    const intermediateWaypoints = waypoints.slice(0, -1);
    let url = `https://maps.apple.com/?`;
    if (origin) {
      url += `saddr=${origin}&`;
    }
    url += `daddr=${destination}`;
    if (intermediateWaypoints.length > 0) {
      const viaParams = intermediateWaypoints.map(waypoint => `via=${waypoint}`).join('&');
      url += `&${viaParams}`;
    }
    url += `&dirflg=d`;

    return url;
  }
}
