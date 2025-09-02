import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

export interface MapCoordinates {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface MapOptions {
  zoom?: number;
  label?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapsIntegrationService {

  constructor(private platform: Platform) {}

  /**
   * Detecta si el dispositivo es iOS
   */
  private isIOS(): boolean {
    return this.platform.is('ios');
  }

  /**
   * Detecta si el dispositivo es Android
   */
  private isAndroid(): boolean {
    return this.platform.is('android');
  }

  /**
   * Detecta si el dispositivo es móvil
   */
  private isMobile(): boolean {
    return this.platform.is('mobile');
  }

  /**
   * Abre Google Maps con las coordenadas especificadas
   */
  openGoogleMaps(coordinates: MapCoordinates, options: MapOptions = {}): void {
    const { latitude, longitude, address } = coordinates;
    const { zoom = 15, label = 'Ubicación' } = options;

    let url: string;
    let query: string;

    // Determinar qué usar como query: coordenadas o dirección
    if (latitude !== 0 && longitude !== 0) {
      query = `${latitude},${longitude}`;
    } else if (address) {
      query = encodeURIComponent(address);
    } else {
      console.warn('No hay coordenadas ni dirección disponible');
      return;
    }

    if (this.isMobile()) {
      // En móvil, intentar abrir la app nativa de Google Maps
      if (this.isAndroid()) {
        // Android: intentar abrir la app nativa primero
        if (latitude !== 0 && longitude !== 0) {
          url = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${encodeURIComponent(label)})`;
        } else {
          url = `geo:0,0?q=${encodeURIComponent(address || '')}`;
        }
        this.openUrl(url, `https://www.google.com/maps/search/?api=1&query=${query}`);
      } else if (this.isIOS()) {
        // iOS: usar el esquema de URL de Google Maps
        if (latitude !== 0 && longitude !== 0) {
          url = `comgooglemaps://?center=${latitude},${longitude}&zoom=${zoom}&q=${latitude},${longitude}`;
        } else {
          url = `comgooglemaps://?q=${encodeURIComponent(address || '')}`;
        }
        this.openUrl(url, `https://www.google.com/maps/search/?api=1&query=${query}`);
      } else {
        // Fallback para otros dispositivos móviles
        url = `https://www.google.com/maps/search/?api=1&query=${query}`;
        this.openUrl(url);
      }
    } else {
      // En desktop, abrir en nueva pestaña
      url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      window.open(url, '_blank');
    }
  }

  /**
   * Abre Apple Maps con las coordenadas especificadas
   */
  openAppleMaps(coordinates: MapCoordinates, options: MapOptions = {}): void {
    const { latitude, longitude, address } = coordinates;
    const { zoom = 15, label = 'Ubicación' } = options;

    let url: string;
    let query: string;

    // Determinar qué usar como query: coordenadas o dirección
    if (latitude !== 0 && longitude !== 0) {
      query = `${latitude},${longitude}`;
    } else if (address) {
      query = encodeURIComponent(address);
    } else {
      console.warn('No hay coordenadas ni dirección disponible');
      return;
    }

    if (this.isIOS()) {
      // iOS: usar el esquema de URL de Apple Maps
      if (latitude !== 0 && longitude !== 0) {
        url = `maps://?q=${latitude},${longitude}&ll=${latitude},${longitude}&z=${zoom}`;
      } else {
        url = `maps://?q=${encodeURIComponent(address || '')}`;
      }
      this.openUrl(url, `https://maps.apple.com/?q=${query}`);
    } else if (this.isAndroid()) {
      // Android: intentar abrir Apple Maps (si está instalado) o fallback a Google Maps
      if (latitude !== 0 && longitude !== 0) {
        url = `maps://?q=${latitude},${longitude}&ll=${latitude},${longitude}&z=${zoom}`;
      } else {
        url = `maps://?q=${encodeURIComponent(address || '')}`;
      }
      this.openUrl(url, `https://www.google.com/maps/search/?api=1&query=${query}`);
    } else {
      // Desktop: abrir Apple Maps en el navegador
      url = `https://maps.apple.com/?q=${query}`;
      window.open(url, '_blank');
    }
  }

  /**
   * Abre la aplicación de mapas predeterminada del dispositivo
   */
  openDefaultMaps(coordinates: MapCoordinates, options: MapOptions = {}): void {
    if (this.isIOS()) {
      this.openAppleMaps(coordinates, options);
    } else if (this.isAndroid()) {
      this.openGoogleMaps(coordinates, options);
    } else {
      // Fallback para desktop
      this.openGoogleMaps(coordinates, options);
    }
  }

  /**
   * Muestra un menú de opciones para elegir entre Google Maps y Apple Maps
   */
  showMapsOptions(coordinates: MapCoordinates, options: MapOptions = {}): void {
    const { latitude, longitude, address } = coordinates;
    const { label = 'Ubicación' } = options;

    // Crear un menú de opciones
    const menu = document.createElement('div');
    menu.className = 'maps-options-menu';
    menu.innerHTML = `
      <div class="maps-options-overlay" onclick="this.parentElement.remove()"></div>
      <div class="maps-options-content">
        <h3>Abrir en mapas</h3>
        <div class="maps-options-buttons">
          <button class="maps-option-btn google-maps" onclick="window.mapsIntegration.openGoogleMaps({latitude: ${latitude}, longitude: ${longitude}, address: '${address || ''}'}, {label: '${label}'}); this.closest('.maps-options-menu').remove();">
            <ion-icon name="logo-google"></ion-icon>
            <span>Google Maps</span>
          </button>
          <button class="maps-option-btn apple-maps" onclick="window.mapsIntegration.openAppleMaps({latitude: ${latitude}, longitude: ${longitude}, address: '${address || ''}'}, {label: '${label}'}); this.closest('.maps-options-menu').remove();">
            <ion-icon name="location"></ion-icon>
            <span>Apple Maps</span>
          </button>
          <button class="maps-option-btn default-maps" onclick="window.mapsIntegration.openDefaultMaps({latitude: ${latitude}, longitude: ${longitude}, address: '${address || ''}'}, {label: '${label}'}); this.closest('.maps-options-menu').remove();">
            <ion-icon name="navigate"></ion-icon>
            <span>Mapa predeterminado</span>
          </button>
        </div>
        <button class="maps-options-cancel" onclick="this.closest('.maps-options-menu').remove()">Cancelar</button>
      </div>
    `;

    // Añadir estilos
    const style = document.createElement('style');
    style.textContent = `
      .maps-options-menu {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .maps-options-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }
      .maps-options-content {
        position: relative;
        background: white;
        border-radius: 16px;
        padding: 24px;
        max-width: 320px;
        width: 90%;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideUp 0.3s ease-out;
      }
      .maps-options-content h3 {
        margin: 0 0 20px 0;
        color: #26262A;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
      }
      .maps-options-buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
      }
      .maps-option-btn {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        border: none;
        border-radius: 12px;
        background: #F8FAFC;
        color: #374151;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
      }
      .maps-option-btn:hover {
        background: #F1F5F9;
        transform: translateY(-1px);
      }
      .maps-option-btn:active {
        transform: translateY(0);
      }
      .maps-option-btn ion-icon {
        font-size: 20px;
        color: #4F46E5;
      }
      .maps-option-btn.google-maps ion-icon {
        color: #4285F4;
      }
      .maps-option-btn.apple-maps ion-icon {
        color: #007AFF;
      }
      .maps-options-cancel {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 8px;
        background: #E5E7EB;
        color: #6B7280;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .maps-options-cancel:hover {
        background: #D1D5DB;
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;

    // Añadir al DOM
    document.head.appendChild(style);
    document.body.appendChild(menu);

    // Hacer el servicio disponible globalmente para los botones
    (window as any).mapsIntegration = this;
  }

  /**
   * Abre una URL con fallback
   */
  private openUrl(primaryUrl: string, fallbackUrl?: string): void {
    try {
      // Intentar abrir la URL primaria
      window.location.href = primaryUrl;
      
      // Si hay fallback, configurar un timeout para verificar si se abrió
      if (fallbackUrl) {
        setTimeout(() => {
          // Si después de 2 segundos seguimos en la misma página, abrir el fallback
          if (document.visibilityState === 'visible') {
            window.open(fallbackUrl, '_blank');
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error al abrir URL:', error);
      if (fallbackUrl) {
        window.open(fallbackUrl, '_blank');
      }
    }
  }

  /**
   * Obtiene las coordenadas de una dirección usando geocodificación
   */
  async getCoordinatesFromAddress(address: string): Promise<MapCoordinates | null> {
    try {
      // Usar la API de geocodificación del navegador si está disponible
      if ('geolocation' in navigator) {
        // Para este caso, necesitaríamos usar un servicio de geocodificación
        // Por ahora, retornamos null para que se use la dirección como string
        return null;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      return null;
    }
  }

  /**
   * Verifica si una aplicación de mapas está disponible
   */
  async isAppAvailable(app: 'google' | 'apple'): Promise<boolean> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve(false);
      }, 1000);

      if (app === 'google') {
        // Verificar si Google Maps está disponible
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = 'comgooglemaps://';
        iframe.onload = () => {
          clearTimeout(timeout);
          resolve(true);
        };
        iframe.onerror = () => {
          clearTimeout(timeout);
          resolve(false);
        };
        document.body.appendChild(iframe);
        setTimeout(() => {
          document.body.removeChild(iframe);
          clearTimeout(timeout);
          resolve(false);
        }, 1000);
      } else if (app === 'apple') {
        // Verificar si Apple Maps está disponible
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = 'maps://';
        iframe.onload = () => {
          clearTimeout(timeout);
          resolve(true);
        };
        iframe.onerror = () => {
          clearTimeout(timeout);
          resolve(false);
        };
        document.body.appendChild(iframe);
        setTimeout(() => {
          document.body.removeChild(iframe);
          clearTimeout(timeout);
          resolve(false);
        }, 1000);
      }
    });
  }
}
