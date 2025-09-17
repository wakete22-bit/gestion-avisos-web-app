import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, navigateOutline, playOutline, stopOutline, arrowForwardOutline, refreshOutline, locationOutline, timeOutline, speedometerOutline, volumeHighOutline } from 'ionicons/icons';
import { MapboxNavigationService, MapboxCoordinates, MapboxNavigationRoute } from '../../../../core/services/mapbox-navigation.service';
import { Subject, takeUntil } from 'rxjs';
import { ModalConfiguracionVozComponent } from '../modal-configuracion-voz/modal-configuracion-voz.component';

@Component({
  selector: 'app-modal-mapa-navegacion',
  templateUrl: './modal-mapa-navegacion.component.html',
  styleUrls: ['./modal-mapa-navegacion.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon]
})
export class ModalMapaNavegacionComponent implements OnInit, OnDestroy {
  @Input() waypoints: MapboxCoordinates[] = [];
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  navigationRoute: MapboxNavigationRoute | null = null;
  isNavigating = false;
  currentStepIndex = 0;
  progress = 0;
  remainingDistance = 0;
  remainingTime = 0;

  private destroy$ = new Subject<void>();
  map: any = null;

  constructor(
    private mapboxService: MapboxNavigationService,
    private modalController: ModalController
  ) {
    addIcons({closeOutline,locationOutline,timeOutline,speedometerOutline,arrowForwardOutline,refreshOutline,volumeHighOutline,navigateOutline,playOutline,stopOutline});
  }

  ngOnInit() {
    if (this.waypoints.length > 0) {
      this.initializeMapAndNavigation();
    }
    
    // Suscribirse a cambios en el estado de navegación
    this.mapboxService.getCurrentNavigation()
      .pipe(takeUntil(this.destroy$))
      .subscribe((route: MapboxNavigationRoute | null) => {
        if (route) {
          this.navigationRoute = route;
          this.isNavigating = route.isNavigating;
          this.currentStepIndex = route.currentStepIndex;
          this.progress = route.progress;
          this.remainingDistance = route.remainingDistance;
          this.remainingTime = route.remainingTime;
        } else {
          this.navigationRoute = null;
          this.isNavigating = false;
          this.currentStepIndex = 0;
          this.progress = 0;
          this.remainingDistance = 0;
          this.remainingTime = 0;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.cleanupMap();
  }

  async initializeMapAndNavigation() {
    try {
      console.log('🗺️ Inicializando mapa en modal de pantalla completa...');
      console.log('📍 Waypoints recibidos:', this.waypoints);
      
      if (this.waypoints.length === 0) {
        console.error('❌ No hay waypoints para inicializar el mapa');
        return;
      }

      // Esperar a que el DOM esté listo
      setTimeout(() => {
        const mapContainer = document.getElementById('fullscreen-map');
        console.log('🔍 Buscando contenedor fullscreen-map:', mapContainer);
        
        if (mapContainer) {
          console.log('✅ Contenedor encontrado, inicializando mapa...');
          
          // Limpiar mapa existente si hay uno
          if (this.map) {
            this.mapboxService.destroyMap();
          }

          // Inicializar mapa
          this.map = this.mapboxService.initializeMap('fullscreen-map', {
            center: [this.waypoints[0].longitude, this.waypoints[0].latitude],
            zoom: 15
          });

          console.log('✅ Mapa inicializado:', this.map);

          // Crear ruta después de un pequeño delay
          setTimeout(() => {
            this.createRoute();
          }, 500);

        } else {
          console.error('❌ Contenedor del mapa no encontrado después del delay');
          // Reintentar después de más tiempo
          setTimeout(() => {
            this.initializeMapAndNavigation();
          }, 500);
        }
      }, 200);

    } catch (error) {
      console.error('❌ Error al inicializar mapa:', error);
    }
  }

  async createRoute() {
    try {
      console.log('🛣️ Creando ruta en modal...');
      const route = await this.mapboxService.createRoute(this.waypoints);
      console.log('✅ Ruta creada en modal:', route);

      // Suscribirse a actualizaciones de navegación
      this.mapboxService.getCurrentNavigation()
        .pipe(takeUntil(this.destroy$))
        .subscribe(navigationRoute => {
          if (navigationRoute) {
            this.navigationRoute = navigationRoute;
            this.isNavigating = navigationRoute.isNavigating;
            this.currentStepIndex = navigationRoute.currentStepIndex;
            this.progress = navigationRoute.progress;
            this.remainingDistance = navigationRoute.remainingDistance;
            this.remainingTime = navigationRoute.remainingTime;
          }
        });

    } catch (error) {
      console.error('❌ Error al crear ruta:', error);
    }
  }

  startNavigation() {
    console.log('🚀 Iniciando navegación desde modal...');
    this.mapboxService.startNavigation(this.waypoints).subscribe({
      next: (route) => {
        if (route) {
          console.log('✅ Navegación iniciada correctamente');
        }
      },
      error: (error) => {
        console.error('❌ Error al iniciar navegación:', error);
      }
    });
  }

  stopNavigation() {
    console.log('🛑 Deteniendo navegación desde modal...');
    this.mapboxService.stopNavigation();
    
    // Actualizar estado local inmediatamente
    this.isNavigating = false;
    this.navigationRoute = null;
    this.currentStepIndex = 0;
    this.progress = 0;
    this.remainingDistance = 0;
    this.remainingTime = 0;
  }

  nextStep() {
    console.log('➡️ Siguiente paso desde modal...');
    this.mapboxService.nextStep();
  }

  async closeModal() {
    console.log('❌ Cerrando modal de navegación...');
    
    // Detener navegación y limpiar estado
    this.stopNavigation();
    
    // Limpiar mapa
    this.cleanupMap();
    
    // Cerrar modal
    await this.modalController.dismiss();
  }

  private cleanupMap() {
    try {
      if (this.map) {
        console.log('🧹 Limpiando mapa del modal...');
        this.mapboxService.destroyMap();
        this.map = null;
      }
    } catch (error) {
      console.warn('⚠️ Error al limpiar mapa:', error);
      this.map = null;
    }
  }

  getCurrentStep() {
    if (!this.navigationRoute || !this.navigationRoute.steps) return null;
    return this.navigationRoute.steps[this.currentStepIndex];
  }

  getUpcomingSteps() {
    if (!this.navigationRoute || !this.navigationRoute.steps) return [];
    return this.navigationRoute.steps.slice(this.currentStepIndex + 1, this.currentStepIndex + 4);
  }

  formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    } else {
      return `${(meters / 1000).toFixed(1)} km`;
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}min`;
    }
  }

  getManeuverIcon(maneuver: any): string {
    if (!maneuver) return '📍';
    
    const type = maneuver.type;
    const modifier = maneuver.modifier;
    
    switch (type) {
      case 'turn':
        switch (modifier) {
          case 'left': return '↰';
          case 'right': return '↱';
          case 'slight left': return '↖';
          case 'slight right': return '↗';
          case 'sharp left': return '↶';
          case 'sharp right': return '↷';
          default: return '↗';
        }
      case 'merge':
        return '🔀';
      case 'roundabout':
        return '🔄';
      case 'depart':
        return '🚀';
      case 'arrive':
        return '🏁';
      case 'continue':
        return '➡️';
      default:
        return '📍';
    }
  }

  /**
   * Abre el modal de configuración de voz
   */
  async openVoiceSettings() {
    const modal = await this.modalController.create({
      component: ModalConfiguracionVozComponent,
      cssClass: 'voice-settings-modal'
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    if (result.data?.saved) {
      console.log('🎤 Configuración de voz guardada:', result.data.settings);
    }
  }
}
