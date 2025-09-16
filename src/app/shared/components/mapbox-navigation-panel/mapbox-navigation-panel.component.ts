import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonText, IonProgressBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { navigateOutline, closeOutline, playOutline, pauseOutline, stopOutline, chevronBackOutline, chevronForwardOutline, arrowUpOutline, arrowForward, play, stop, speedometerOutline, timeOutline, locationOutline, hourglassOutline } from 'ionicons/icons';
import { MapboxNavigationService, MapboxCoordinates, MapboxNavigationRoute } from '../../../core/services/mapbox-navigation.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-mapbox-navigation-panel',
  templateUrl: './mapbox-navigation-panel.component.html',
  styleUrls: ['./mapbox-navigation-panel.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonText, IonProgressBar]
})
export class MapboxNavigationPanelComponent implements OnInit, OnDestroy {
  @Input() waypoints: MapboxCoordinates[] = [];
  
  navigationRoute: MapboxNavigationRoute | null = null;
  isNavigating = false;
  isMobile = false;
  
  private destroy$ = new Subject<void>();

  constructor(private mapboxService: MapboxNavigationService) {
    addIcons({play,stop,arrowForward,navigateOutline,speedometerOutline,timeOutline,locationOutline,hourglassOutline,playOutline,stopOutline,chevronForwardOutline,closeOutline,pauseOutline,chevronBackOutline,arrowUpOutline});
  }

  ngOnInit() {
    // Detectar si es móvil
    this.isMobile = window.innerWidth <= 768;
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });

    this.mapboxService.getCurrentNavigation()
      .pipe(takeUntil(this.destroy$))
      .subscribe((route: MapboxNavigationRoute | null) => {
        this.navigationRoute = route;
        this.isNavigating = route?.isNavigating || false;
        
        console.log('🧭 Panel de navegación actualizado:', {
          tieneRuta: !!route,
          navegando: this.isNavigating,
          pasoActual: route?.currentStepIndex || 0,
          totalPasos: route?.steps.length || 0,
          esMovil: this.isMobile
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Inicia la navegación
   */
  startNavigation() {
    if (this.waypoints.length < 2) {
      console.warn('Se necesitan al menos 2 waypoints para la navegación');
      return;
    }

    this.mapboxService.startNavigation(this.waypoints);
  }

  /**
   * Detiene la navegación
   */
  stopNavigation() {
    this.mapboxService.stopNavigation();
  }

  /**
   * Avanza al siguiente paso
   */
  nextStep() {
    this.mapboxService.nextStep();
  }

  /**
   * Obtiene el paso actual de navegación
   */
  getCurrentStep() {
    return this.mapboxService.getCurrentStep();
  }

  /**
   * Obtiene el progreso de navegación (0-100)
   */
  getNavigationProgress(): number {
    return this.mapboxService.getNavigationProgress();
  }

  /**
   * Obtiene la distancia restante
   */
  getRemainingDistance(): number {
    return this.mapboxService.getRemainingDistance();
  }

  /**
   * Obtiene el tiempo restante
   */
  getRemainingTime(): number {
    return this.mapboxService.getRemainingTime();
  }

  /**
   * Formatea la distancia
   */
  formatDistance(meters: number): string {
    return this.mapboxService.formatDistance(meters);
  }

  /**
   * Formatea el tiempo
   */
  formatTime(seconds: number): string {
    return this.mapboxService.formatTime(seconds);
  }

  /**
   * Obtiene el icono de la maniobra
   */
  getManeuverIcon(maneuver: any): string {
    return this.mapboxService.getManeuverIcon(maneuver);
  }

  /**
   * Obtiene el color de la maniobra
   */
  getManeuverColor(maneuver: any): string {
    if (!maneuver) return '#4F46E5';
    
    switch (maneuver.type) {
      case 'depart': return '#10B981';
      case 'arrive': return '#DC2626';
      case 'turn': return '#F59E0B';
      default: return '#4F46E5';
    }
  }

  /**
   * Obtiene los próximos pasos para mostrar en móvil
   */
  getUpcomingSteps() {
    if (!this.navigationRoute?.steps) return [];
    
    const currentIndex = this.navigationRoute.currentStepIndex || 0;
    return this.navigationRoute.steps.slice(currentIndex + 1, currentIndex + 4); // Mostrar hasta 3 próximos pasos
  }
}
