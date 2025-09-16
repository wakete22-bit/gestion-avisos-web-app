import { Component, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, ModalController, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { addIcons } from 'ionicons';
import { alertCircle, close, eyeOutline, mapOutline, add, addCircle, addCircleOutline, searchOutline, locationOutline, calendarOutline, listOutline, optionsOutline, expandOutline, createOutline, refreshOutline, alertCircleOutline, chevronBackOutline, chevronForwardOutline, chevronDownCircleOutline, trashOutline, navigateOutline, checkmarkCircleOutline, closeCircleOutline, play, stop, arrowForward } from 'ionicons/icons';
import { CrearAvisosModalComponent } from '../../components/crear-avisos-modal/crear-avisos-modal.component';
import { CrearClienteModalComponent } from '../../../clientes/components/crear-cliente-modal/crear-cliente-modal.component';
import { ConfirmarEliminacionAvisoModalComponent } from '../../components/confirmar-eliminacion-aviso-modal/confirmar-eliminacion-aviso-modal.component';
import { ModalOpcionesNavegacionComponent } from '../../components/modal-opciones-navegacion/modal-opciones-navegacion.component';
import { GeocodingService } from 'src/app/core/services/geocoding.service';
import { AvisosService } from '../../../../core/services/avisos.service';
import { ClientesService } from '../../../../core/services/clientes.service';
import { CacheService } from '../../../../core/services/cache.service';
import { ImageOptimizationService } from '../../../../core/services/image-optimization.service';
import { PrefetchService } from '../../../../core/services/prefetch.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { DebugService } from '../../../../core/services/debug.service';
import { MapboxNavigationService, MapboxCoordinates } from '../../../../core/services/mapbox-navigation.service';
import { MapboxNavigationPanelComponent } from '../../../../shared/components/mapbox-navigation-panel/mapbox-navigation-panel.component';
import mapboxgl from 'mapbox-gl';
import { Aviso } from '../../models/aviso.model';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

// Importar CSS de Mapbox directamente
import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss'],
  standalone: true,
  imports: [IonRefresherContent, 
    CommonModule,
    IonContent,
    IonIcon,
    IonRefresher,
    MatTableModule,
    MatIconModule,
    ScrollingModule,
    MapboxNavigationPanelComponent,
  ],
})
export class AvisosComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'urgente', 'direccion', 'acciones'];
  isMapView = false;
  private map: mapboxgl.Map | null = null;
  private avisoMarkers: Map<string, mapboxgl.Marker> = new Map();
  selectedAviso: string | null = null;

  avisos: Aviso[] = [];
  loading = true; // Cambiar a true para mostrar carga inicial
  error: string | null = null;
  totalAvisos = 0;
  paginaActual = 1;
  porPagina = 20; // Aumentado de 10 a 20
  busqueda = '';
  ordenarPor = 'fecha_creacion';
  orden: 'asc' | 'desc' = 'desc';
  estadoFiltro = '';

  // Estado para selección de avisos
  avisosSeleccionados: Set<string> = new Set();
  modoSeleccion = false;
  
  // Navegación en tiempo real
  showNavigationPanel = false;
  navigationWaypoints: MapboxCoordinates[] = [];
  isMobile = false;
  isNavigating = false;
  showFullscreenMap = false;

  private destroy$ = new Subject<void>();
  private busquedaSubject = new Subject<string>();
  private dataLoaded = false;
  
  Math = Math;

  constructor(
    private modalController: ModalController, 
    private cdr: ChangeDetectorRef,
    private geocodingService: GeocodingService,
    private avisosService: AvisosService,
    private clientesService: ClientesService,
    private cacheService: CacheService,
    private imageOptimizationService: ImageOptimizationService,
    private prefetchService: PrefetchService,
    private router: Router,
    private navigationService: NavigationService,
    private debugService: DebugService,
    private mapboxService: MapboxNavigationService
  ) {
    addIcons({refreshOutline,alertCircleOutline,checkmarkCircleOutline,navigateOutline,addCircle,searchOutline,closeCircleOutline,alertCircle,close,eyeOutline,createOutline,trashOutline,chevronBackOutline,chevronForwardOutline,mapOutline,expandOutline,listOutline,play,stop,arrowForward,chevronDownCircleOutline,locationOutline,calendarOutline,optionsOutline,add,addCircleOutline});
    
    // Configurar debounce para búsqueda
    this.configurarBusqueda();
  }

  ngAfterViewInit() {
    // Detectar si es móvil
    this.isMobile = window.innerWidth <= 768;
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });

    // Suscribirse a cambios de navegación de Mapbox
    this.mapboxService.getCurrentNavigation()
      .pipe(takeUntil(this.destroy$))
      .subscribe(navigationRoute => {
        if (navigationRoute) {
          this.isNavigating = navigationRoute.isNavigating;
          console.log('🧭 Estado de navegación actualizado:', {
            navegando: this.isNavigating,
            pasoActual: navigationRoute.currentStepIndex + 1,
            totalPasos: navigationRoute.steps.length
          });
        }
      });
    
    // Primero probar la conexión a Supabase
    this.probarConexionSupabase();
    
    // Cargar avisos al inicializar usando método simplificado
    this.cargarAvisosSimple();
    this.suscribirseAAvisos();
    
    // Suscribirse a cambios de navegación
    this.navigationService.getCurrentRoute()
      .pipe(takeUntil(this.destroy$))
      .subscribe(route => {
        if (route.includes('/avisos') && !this.dataLoaded) {
          console.log('🧭 Ruta de avisos detectada, preparando carga...');
          // Pequeño delay para asegurar que el DOM esté listo
          setTimeout(() => {
            if (!this.dataLoaded && !this.destroy$.closed) {
              this.cargarAvisosSimple();
            }
          }, 200);
        }
      });
    
    // Prefetch de datos críticos en segundo plano
    this.prefetchService.prefetchCriticalData();
    
    // Listener para detectar cambios en pantalla completa
    document.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange.bind(this));
    
    // Listener para ajustar posición del botón en resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * Prueba la conexión a Supabase antes de cargar datos
   */
  probarConexionSupabase() {
    console.log('🔍 Iniciando pruebas de conexión...');
    
    // Probar conexión básica usando el servicio de avisos
    this.avisosService.debugConnection()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (result.success) {
            console.log('✅ Conexión básica exitosa');
            // Si la conexión básica funciona, intentar cargar avisos
            this.cargarAvisos();
          } else {
            console.error('❌ Error en conexión básica:', result.error);
          }
        },
        error: (error) => {
          console.error('❌ Error al probar conexión:', error);
        }
      });
  }

  /**
   * Carga avisos con caché y optimizaciones
   */
  cargarAvisos() {
    if (this.dataLoaded && this.avisos.length > 0) {
      console.log('📊 Avisos ya cargados, saltando carga...');
      return;
    }

    this.loading = true;
    this.error = null;
    console.log('🔄 Cargando avisos...');

    // Cargar directamente sin cache por ahora para debuggear
    this.avisosService.getAvisosActivos(
      this.paginaActual,
      this.porPagina,
      this.busqueda,
      this.ordenarPor,
      this.orden,
      this.estadoFiltro
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        console.log('✅ Avisos cargados exitosamente:', response.avisos.length, 'avisos');
        this.avisos = response.avisos;
        this.totalAvisos = response.total;
        this.loading = false;
        this.dataLoaded = true;
        
        // Actualizar marcadores del mapa si está en vista de mapa
        if (this.isMapView && this.map) {
          this.plotAvisosOnMap();
        }
        
        // Forzar detección de cambios
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Error al cargar avisos:', error);
        console.error('❌ Detalles del error:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        this.error = 'Error al cargar los avisos. Por favor, inténtalo de nuevo.';
        this.loading = false;
        
        // Forzar detección de cambios
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Método de carga simplificado para debug
   */
  cargarAvisosSimple() {
    console.log('🔍 Cargando avisos de forma simplificada...');
    
    this.loading = true;
    this.error = null;
    
    // Usar el método de debug del servicio
    this.avisosService.debugConnection()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (result.success) {
            console.log('✅ Conexión exitosa, intentando cargar avisos completos...');
            // Si la conexión funciona, cargar avisos completos
            this.cargarAvisos();
          } else {
            console.error('❌ Conexión falló:', result.error);
            this.error = 'Error de conexión a la base de datos';
            this.loading = false;
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('❌ Error en conexión:', error);
          this.error = 'Error de conexión: ' + (error.message || 'Desconocido');
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    
    // Limpiar mapa y marcadores usando Mapbox
    this.mapboxService.destroyMap();
    this.avisoMarkers.clear();
    this.map = null;
    
    // Remover listeners de eventos
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange.bind(this));
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange.bind(this));
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange.bind(this));
    window.removeEventListener('resize', this.handleResize.bind(this));
    
    // Limpiar cache específico de este componente
    this.cacheService.clearCache('avisos');
    
    // Limpiar subscripciones pendientes
    this.busquedaSubject.complete();
    
    console.log('🧹 Componente AvisosComponent destruido y recursos limpiados');
  }

  /**
   * Se suscribe a los cambios en la lista de avisos
   */
  private suscribirseAAvisos() {
    this.avisosService.avisos$
      .pipe(takeUntil(this.destroy$))
      .subscribe(avisos => {
        this.avisos = avisos;
      });
  }

  /**
   * Refresca la lista de avisos
   */
  refrescarAvisos() {
    this.cargarAvisos();
  }

  /**
   * Maneja el pull-to-refresh desde el IonRefresher
   */
  async handleRefresh(event: any) {
    try {
      console.log('🔄 Iniciando refresh manual...');
      console.log('📱 Usuario deslizó hacia abajo para actualizar');
      
      // Mostrar indicador de carga sutil (sin bloquear la UI)
      const wasLoading = this.loading;
      this.loading = false; // Evitar mostrar el loading state completo
      
      // Limpiar caché antes de recargar para obtener datos frescos
      this.cacheService.clearCache('avisos');
      console.log('🗑️ Caché limpiado');
      
      // Recargar avisos sin caché
      await this.recargarAvisosSinCache();
      console.log('📊 Avisos recargados');
      
      // Si estamos en vista de mapa, actualizar marcadores
      if (this.isMapView && this.map) {
        this.plotAvisosOnMap();
        console.log('🗺️ Marcadores del mapa actualizados');
      }
      
      // Restaurar estado de loading si estaba activo
      this.loading = wasLoading;
      
      console.log('✅ Refresh completado exitosamente');
      console.log('📈 Total de avisos actualizados:', this.totalAvisos);
      
      // Completar el refresh
      event.target.complete();
      
    } catch (error) {
      console.error('❌ Error durante el refresh:', error);
      this.error = 'Error al actualizar los avisos. Por favor, inténtalo de nuevo.';
      
      // Restaurar estado de loading si estaba activo
      this.loading = false;
      
      // Completar el refresh incluso si hay error
      event.target.complete();
    }
  }

  /**
   * Recarga avisos sin caché (útil después de crear/editar)
   */
  async recargarAvisosSinCache(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.loading = true;
      this.error = null;
      this.dataLoaded = false; // Resetear flag para forzar recarga

      // Limpiar caché antes de cargar
      this.cacheService.clearCache('avisos');

      this.avisosService.getAvisosActivos(
        this.paginaActual,
        this.porPagina,
        this.busqueda,
        this.ordenarPor,
        this.orden,
        this.estadoFiltro
      ).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (response) => {
          this.avisos = response.avisos;
          this.totalAvisos = response.total;
          this.loading = false;
          this.dataLoaded = true;
          
          // Actualizar marcadores del mapa si está en vista de mapa
          if (this.isMapView && this.map) {
            this.plotAvisosOnMap();
          }
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar avisos:', error);
          this.error = 'Error al cargar los avisos. Por favor, inténtalo de nuevo.';
          this.loading = false;
          reject(error);
        }
      });
    });
  }

  /**
   * Cambia a la página especificada
   */
  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.obtenerTotalPaginas()) {
      this.paginaActual = pagina;
      this.cargarAvisos();
    }
  }

  /**
   * Calcula el total de páginas
   */
  obtenerTotalPaginas(): number {
    return Math.ceil(this.totalAvisos / this.porPagina);
  }

  /**
   * Obtiene el rango de páginas a mostrar
   */
  obtenerRangoPaginas(): number[] {
    const totalPaginas = this.obtenerTotalPaginas();
    const paginaActual = this.paginaActual;
    const rango = 2; // Número de páginas a mostrar antes y después de la actual

    let inicio = Math.max(1, paginaActual - rango);
    let fin = Math.min(totalPaginas, paginaActual + rango);

    // Ajustar para mostrar siempre 5 páginas si es posible
    if (fin - inicio < 4) {
      if (inicio === 1) {
        fin = Math.min(totalPaginas, inicio + 4);
      } else {
        inicio = Math.max(1, fin - 4);
      }
    }

    const paginas: number[] = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  /**
   * Verifica si se puede ir a la página anterior
   */
  puedeAnterior(): boolean {
    return this.paginaActual > 1;
  }

  /**
   * Verifica si se puede ir a la página siguiente
   */
  puedeSiguiente(): boolean {
    return this.paginaActual < this.obtenerTotalPaginas();
  }

  /**
   * Va a la página anterior
   */
  paginaAnterior() {
    if (this.puedeAnterior()) {
      this.cambiarPagina(this.paginaActual - 1);
    }
  }

  /**
   * Va a la página siguiente
   */
  paginaSiguiente() {
    if (this.puedeSiguiente()) {
      this.cambiarPagina(this.paginaActual + 1);
    }
  }

  /**
   * Va a la primera página
   */
  primeraPagina() {
    this.cambiarPagina(1);
  }

  /**
   * Va a la última página
   */
  ultimaPagina() {
    this.cambiarPagina(this.obtenerTotalPaginas());
  }

  private handleResize() {
    // Ajustar posición del botón de cerrar si está visible
    const closeButton = document.querySelector('.btn-close-expanded') as HTMLElement;
    if (closeButton && window.innerWidth <= 992) {
      const headerHeight = this.getHeaderHeight();
      closeButton.style.top = `${headerHeight + 10}px`;
    }
  }

  private plotAvisosOnMap() {
    if (!this.map) {
      console.log('Mapa no disponible para pintar marcadores');
      return;
    }

    console.log('Pintando marcadores en el mapa...');
    
    // Limpiar marcadores existentes
    this.avisoMarkers.forEach(marker => marker.remove());
    this.avisoMarkers.clear();

    // Obtener avisos para mostrar (seleccionados o todos)
    const avisosParaMostrar = this.getAvisosParaMapa();

    if (!avisosParaMostrar || avisosParaMostrar.length === 0) {
      console.log('No hay avisos para mostrar en el mapa');
      return;
    }

    // Cache local para geocodificación
    const geocodeCache = new Map<string, [number, number]>();
    let processedCount = 0;
    const totalAvisos = avisosParaMostrar.length;

    avisosParaMostrar.forEach((aviso, index) => {
      if (!aviso.direccion_cliente_aviso) {
        console.log(`Aviso ${aviso.id} no tiene dirección`);
        processedCount++;
        return;
      }

      // Añadir "España" para mejorar la precisión de la geocodificación
      const fullAddress = `${aviso.direccion_cliente_aviso}, España`;

      // Verificar cache primero
      if (geocodeCache.has(fullAddress)) {
        const coordinates = geocodeCache.get(fullAddress)!;
        this.addMarkerToMap(aviso, coordinates);
        processedCount++;
        return;
      }

      // Delay progresivo para evitar sobrecarga de la API
      setTimeout(() => {
        this.geocodingService.geocode(fullAddress).subscribe({
          next: (coordinates) => {
            if (coordinates && this.map) {
              // Guardar en cache
              geocodeCache.set(fullAddress, coordinates);
              
              this.addMarkerToMap(aviso, coordinates);
              console.log(`Marcador añadido para aviso ${aviso.id}`);
            }
            processedCount++;
          },
          error: (error) => {
            console.error(`Error al geocodificar dirección para aviso ${aviso.id}:`, error);
            processedCount++;
          }
        });
      }, index * 200); // Delay de 200ms entre requests
    });

    // Si hay avisos seleccionados, crear líneas de ruta después de un delay
    if (this.avisosSeleccionados.size > 1) {
      setTimeout(() => {
        this.crearLineasDeRuta();
        // Mostrar panel de navegación automáticamente
        this.showNavigationPanel = true;
      }, (avisosParaMostrar.length * 200) + 1000); // Esperar a que se procesen todos los marcadores
    } else {
      // Ocultar panel si no hay avisos seleccionados
      this.showNavigationPanel = false;
    }
  }

  /**
   * Añade un marcador al mapa con funcionalidades mejoradas
   */
  private addMarkerToMap(aviso: Aviso, coordinates: [number, number]): void {
    if (!this.map) return;

    const isSelected = this.estaSeleccionado(aviso);
    const markerColor = isSelected ? '#10B981' : '#4F46E5';
    const markerSize = isSelected ? 'large' : 'medium';

    // Crear marcador personalizado con Mapbox
    const marker = this.mapboxService.addMarker({
      latitude: coordinates[1],
      longitude: coordinates[0],
      address: aviso.direccion_cliente_aviso
    }, {
      label: `${aviso.nombre_cliente_aviso} - ${aviso.descripcion_problema}`,
      color: markerColor,
      size: markerSize as 'small' | 'medium' | 'large'
    });

    // Añadir evento de click al marcador
    marker.getElement().addEventListener('click', () => {
      this.centrarAvisoEnMapa(aviso);
    });

    this.avisoMarkers.set(aviso.id!, marker);
  }

  centrarAvisoEnMapa(aviso: Aviso, event?: Event) {
    // Prevenir comportamiento por defecto para evitar scroll
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Establecer el aviso seleccionado
    this.selectedAviso = aviso.id;

    const marker = this.avisoMarkers.get(aviso.id!);
    if (marker && this.map) {
      const lngLat = marker.getLngLat();
      
      // Usar una transición más suave con Mapbox
      this.map.flyTo({
        center: [lngLat.lng, lngLat.lat],
        zoom: 15,
        duration: 1000
      });
      
      // Mostrar popup después de un pequeño delay
      setTimeout(() => {
        marker.togglePopup();
      }, 500);
    }
  }

  /**
   * Abre el aviso en mapas nativos (Google Maps o Apple Maps)
   */
  abrirEnMapasNativos(aviso: Aviso, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!aviso.direccion_cliente_aviso) {
      console.warn('El aviso no tiene dirección');
      return;
    }

    // Obtener coordenadas del marcador si existe
    const marker = this.avisoMarkers.get(aviso.id!);
    let coordinates: MapboxCoordinates;

    if (marker) {
      const lngLat = marker.getLngLat();
      coordinates = {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
        address: aviso.direccion_cliente_aviso
      };
    } else {
      // Si no hay marcador, usar la dirección para geocodificación
      coordinates = {
        latitude: 0, // Se usará la dirección
        longitude: 0,
        address: aviso.direccion_cliente_aviso
      };
    }

    // Usar el servicio de Mapbox para abrir Google Maps
    this.mapboxService.openGoogleMaps(coordinates, {
      label: aviso.nombre_cliente_aviso
    });
  }

  /**
   * Abre directamente en Google Maps
   */
  abrirEnGoogleMaps(aviso: Aviso, event?: Event) {
    this.abrirEnMapasNativos(aviso, event);
  }

  /**
   * Abre directamente en Apple Maps
   */
  abrirEnAppleMaps(aviso: Aviso, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!aviso.direccion_cliente_aviso) {
      console.warn('El aviso no tiene dirección');
      return;
    }

    const marker = this.avisoMarkers.get(aviso.id!);
    let coordinates: MapboxCoordinates;

    if (marker) {
      const lngLat = marker.getLngLat();
      coordinates = {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
        address: aviso.direccion_cliente_aviso
      };
    } else {
      coordinates = {
        latitude: 0,
        longitude: 0,
        address: aviso.direccion_cliente_aviso
      };
    }

    // Usar el servicio de Mapbox para abrir Apple Maps
    this.mapboxService.openAppleMaps(coordinates, {
      label: aviso.nombre_cliente_aviso
    });
  }

  private initMap(): void {
    if (this.isMapView && !this.map) {
      // Usar un delay más largo para asegurar que el DOM esté completamente renderizado
      setTimeout(() => {
        const mapContainer = document.getElementById('map');
        if (mapContainer && !this.map) {
          console.log('Inicializando mapa con Mapbox...');
          this.map = this.mapboxService.initializeMap('map', {
            center: [-3.703790, 40.416775], // Mapbox usa [lng, lat]
            zoom: 12
          });

          // El mapa de Mapbox se inicializa inmediatamente
          console.log('Mapa Mapbox cargado correctamente');
          this.plotAvisosOnMap(); // Llamar a la función para pintar los marcadores
        } else if (this.isMapView && !this.map) {
          // Si el contenedor no está disponible, reintentar después de un delay
          console.log('Contenedor del mapa no disponible, reintentando...');
          setTimeout(() => {
            this.initMap();
          }, 200);
        }
      }, 100); // Aumentar el delay a 100ms
    }
  }

  toggleView() {
    this.isMapView = !this.isMapView;
    
    if (this.isMapView) {
      // Forzar la detección de cambios y esperar a que se complete
      this.cdr.detectChanges();
      
      // Usar setTimeout para asegurar que el DOM esté completamente actualizado
      setTimeout(() => {
        this.initMap();
      }, 50);
    } else {
      if (this.map) {
        // Limpiar marcadores y mapa usando Mapbox
        this.mapboxService.destroyMap();
        this.avisoMarkers.clear();
        this.map = null;
      }
      this.cdr.detectChanges();
    }
  }

  async abrirModalCrearAviso(clienteData?: any) {
    const modal = await this.modalController.create({
      component: CrearAvisosModalComponent,
      cssClass: 'modal-crear-aviso',
      componentProps: clienteData ? {
        clienteData
      } : {}
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'crear-cliente') {
      // Abrir modal de cliente
      const clienteModal = await this.modalController.create({
        component: CrearClienteModalComponent,
        cssClass: 'modal-crear-cliente',
        showBackdrop: true,
        backdropDismiss: true
      });
      await clienteModal.present();
      const { data: cliente, role: clienteRole } = await clienteModal.onWillDismiss();
      if (clienteRole === 'confirm' && cliente) {
        // Crear el cliente en la base de datos
        this.loading = true;
        this.error = null;
        
        this.clientesService.crearCliente(cliente).subscribe({
          next: (clienteCreado) => {
            console.log('✅ Cliente creado exitosamente:', clienteCreado);
            this.loading = false;
            // Reabrir modal de aviso con los datos del cliente creado
            this.abrirModalCrearAviso(clienteCreado);
          },
          error: (error) => {
            console.error('❌ Error al crear cliente:', error);
            this.loading = false;
            this.error = 'Error al crear el cliente: ' + (error.message || 'Error desconocido');
            // Reabrir modal de aviso sin datos de cliente
            this.abrirModalCrearAviso(clienteData);
          }
        });
      } else {
        this.abrirModalCrearAviso(clienteData);
      }

    } else if (data) {
      console.log('Datos del formulario:', data);
      
      // Crear el aviso en Supabase
      this.loading = true;
      this.error = null;
      
      // Preparar datos del aviso
      const avisoData = {
        cliente_id: data.cliente || clienteData?.id || 'cliente-temp-id', // Usar el ID del cliente seleccionado
        nombre_cliente_aviso: data.nombreContacto || clienteData?.nombreContacto || 'Cliente',
        direccion_cliente_aviso: data.direccionLocal || clienteData?.direccionLocal || '',
        telefono_cliente_aviso: data.telefono || clienteData?.telefono || '',
        nombre_contacto: data.nombreContacto || clienteData?.nombreContacto || '',
        tipo: data.tipo || 'correctivo',
        descripcion_problema: data.descripcion || '',
        es_urgente: data.esUrgente || false,
        urgencia: data.esUrgente ? 'Alta' : 'Normal' // Asegurar que urgencia tenga un valor
      };
      
      this.avisosService.crearAviso(avisoData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (avisoCreado) => {
            console.log('Aviso creado exitosamente:', avisoCreado);
            
            // Subir imágenes si las hay
            if (data.imagenes && data.imagenes.length > 0) {
              const subidasCompletadas = new Promise<void>((resolve) => {
                let fotosSubidas = 0;
                const totalFotos = data.imagenes.length;
                
                data.imagenes.forEach((file: File) => {
                  this.avisosService.subirFoto(avisoCreado.id, file)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe({
                      next: (foto) => {
                        console.log('Foto subida:', foto);
                        fotosSubidas++;
                        if (fotosSubidas === totalFotos) {
                          resolve();
                        }
                      },
                      error: (error) => {
                        console.error('Error al subir foto:', error);
                        fotosSubidas++;
                        if (fotosSubidas === totalFotos) {
                          resolve();
                        }
                      }
                    });
                });
              });
              
              // Esperar a que todas las fotos se suban y luego recargar avisos
              subidasCompletadas.then(() => {
                this.loading = false;
                this.recargarAvisosSinCache(); // Usar método sin caché
              });
            } else {
              this.loading = false;
              this.recargarAvisosSinCache(); // Usar método sin caché
            }
          },
          error: (error) => {
            console.error('Error al crear aviso:', error);
            this.error = 'Error al crear el aviso. Por favor, inténtalo de nuevo.';
            this.loading = false;
          }
        });
    }
  }

  async toggleFullscreen() {
    const mapContainer = document.querySelector('.map-display-container') as HTMLElement;
    if (!mapContainer) {
      console.warn('Contenedor del mapa no encontrado');
      return;
    }

    try {
      // Verificar si ya estamos en pantalla completa
      const isFullscreen = !!(document.fullscreenElement || 
                             (document as any).webkitFullscreenElement || 
                             (document as any).mozFullScreenElement || 
                             (document as any).msFullscreenElement);

      if (!isFullscreen) {
        // Entrar en pantalla completa
        if (mapContainer.requestFullscreen) {
          await mapContainer.requestFullscreen();
        } else if ((mapContainer as any).webkitRequestFullscreen) {
          await (mapContainer as any).webkitRequestFullscreen();
        } else if ((mapContainer as any).mozRequestFullScreen) {
          await (mapContainer as any).mozRequestFullScreen();
        } else if ((mapContainer as any).msRequestFullscreen) {
          await (mapContainer as any).msRequestFullscreen();
        } else {
          console.warn('Pantalla completa no soportada en este navegador');
          // Fallback: hacer el mapa más grande
          this.expandMap();
        }
      } else {
        // Salir de pantalla completa
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error al cambiar pantalla completa:', error);
      // Fallback: hacer el mapa más grande
      this.expandMap();
    }
  }

  private expandMap() {
    const mapContainer = document.querySelector('.map-display-container') as HTMLElement;
    const listContainer = document.querySelector('.map-list-container') as HTMLElement;
    
    if (mapContainer && listContainer) {
      // Ocultar la lista y expandir el mapa
      listContainer.style.display = 'none';
      mapContainer.style.position = 'fixed';
      mapContainer.style.top = '0';
      mapContainer.style.left = '0';
      mapContainer.style.width = '100vw';
      mapContainer.style.height = '100vh';
      mapContainer.style.zIndex = '9999';
      
      // Añadir botón para cerrar con posición ajustada para móvil
      const closeButton = document.createElement('button');
      closeButton.innerHTML = '<ion-icon name="close"></ion-icon>';
      closeButton.className = 'btn-close-expanded';
      closeButton.onclick = () => this.closeExpandedMap();
      
      // Ajustar posición del botón según el dispositivo
      if (window.innerWidth <= 992) {
        // En móvil, posicionar debajo del header
        const headerHeight = this.getHeaderHeight();
        closeButton.style.top = `${headerHeight + 10}px`; // 10px de margen
        closeButton.style.right = '16px';
      }
      
      mapContainer.appendChild(closeButton);
      
      // Redimensionar el mapa
      if (this.map) {
        setTimeout(() => this.map!.resize(), 100);
      }
    }
  }

  private getHeaderHeight(): number {
    // Intentar obtener la altura del header de diferentes maneras
    const header = document.querySelector('ion-header') || 
                   document.querySelector('.header') || 
                   document.querySelector('[data-header]') ||
                   document.querySelector('header') ||
                   document.querySelector('.topbar') ||
                   document.querySelector('.main-layout-header');
    
    if (header) {
      return header.getBoundingClientRect().height;
    }
    
    // Valores por defecto según el dispositivo
    if (window.innerWidth <= 480) {
      return 60; // Móvil pequeño
    } else if (window.innerWidth <= 768) {
      return 70; // Tablet
    } else {
      return 80; // Desktop
    }
  }

  private closeExpandedMap() {
    const mapContainer = document.querySelector('.map-display-container') as HTMLElement;
    const listContainer = document.querySelector('.map-list-container') as HTMLElement;
    
    if (mapContainer && listContainer) {
      // Restaurar estado normal
      listContainer.style.display = 'flex';
      mapContainer.style.position = '';
      mapContainer.style.top = '';
      mapContainer.style.left = '';
      mapContainer.style.width = '';
      mapContainer.style.height = '';
      mapContainer.style.zIndex = '';
      
      // Remover botón de cerrar
      const closeButton = mapContainer.querySelector('.btn-close-expanded');
      if (closeButton) {
        closeButton.remove();
      }
      
      // Redimensionar el mapa
      if (this.map) {
        setTimeout(() => this.map!.resize(), 100);
      }
    }
  }

  /**
   * Maneja los cambios en pantalla completa
   */
  private handleFullscreenChange() {
    // Si salimos de pantalla completa, restaurar el estado normal
    const isFullscreen = !!(document.fullscreenElement || 
                           (document as any).webkitFullscreenElement || 
                           (document as any).mozFullScreenElement || 
                           (document as any).msFullscreenElement);
    
    if (!isFullscreen) {
      this.closeExpandedMap();
    }
  }

  /**
   * Configura la búsqueda con debounce para optimizar rendimiento
   */
  private configurarBusqueda() {
    this.busquedaSubject.pipe(
      takeUntil(this.destroy$),
      debounceTime(500), // Aumentado de 300ms a 500ms para reducir consultas
      distinctUntilChanged()
    ).subscribe(termino => {
      this.busqueda = termino;
      this.paginaActual = 1; // Resetear a la primera página
      this.cargarAvisos();
    });
  }

  /**
   * Activa/desactiva el modo de selección de avisos
   */
  toggleModoSeleccion() {
    this.modoSeleccion = !this.modoSeleccion;
    if (!this.modoSeleccion) {
      this.avisosSeleccionados.clear();
    }
    this.actualizarMapaConSeleccion();
  }

  /**
   * Selecciona o deselecciona un aviso
   */
  toggleSeleccionAviso(aviso: Aviso, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.modoSeleccion) {
      this.modoSeleccion = true;
    }

    const avisoId = aviso.id!;
    if (this.avisosSeleccionados.has(avisoId)) {
      this.avisosSeleccionados.delete(avisoId);
    } else {
      this.avisosSeleccionados.add(avisoId);
    }

    this.actualizarMapaConSeleccion();
  }

  /**
   * Verifica si un aviso está seleccionado
   */
  estaSeleccionado(aviso: Aviso): boolean {
    return this.avisosSeleccionados.has(aviso.id!);
  }

  /**
   * Obtiene el número de avisos seleccionados
   */
  getNumeroAvisosSeleccionados(): number {
    return this.avisosSeleccionados.size;
  }

  /**
   * Limpia la selección de avisos
   */
  limpiarSeleccion() {
    this.avisosSeleccionados.clear();
    this.actualizarMapaConSeleccion();
    this.ocultarPanelNavegacion();
  }

  /**
   * Muestra el panel de navegación
   */
  mostrarPanelNavegacion() {
    this.showNavigationPanel = true;
  }

  /**
   * Oculta el panel de navegación
   */
  ocultarPanelNavegacion() {
    this.showNavigationPanel = false;
    this.mapboxService.stopNavigation();
  }

  /**
   * Alterna la visibilidad del panel de navegación (para debug)
   */
  toggleNavigationPanel() {
    this.showNavigationPanel = !this.showNavigationPanel;
    console.log('Panel de navegación:', this.showNavigationPanel ? 'Mostrado' : 'Oculto');
    console.log('Waypoints:', this.navigationWaypoints);
  }

  /**
   * Obtiene los avisos que deben mostrarse en el mapa
   */
  getAvisosParaMapa(): Aviso[] {
    if (this.avisosSeleccionados.size === 0) {
      // Si no hay avisos seleccionados, mostrar todos
      return this.avisos;
    } else {
      // Mostrar solo los avisos seleccionados
      return this.avisos.filter(aviso => this.avisosSeleccionados.has(aviso.id!));
    }
  }

  /**
   * Actualiza el mapa con la selección actual
   */
  private actualizarMapaConSeleccion() {
    if (this.isMapView && this.map) {
      this.plotAvisosOnMap();
    }
  }

  /**
   * Crea líneas de conexión entre los avisos seleccionados usando Mapbox
   */
  private crearLineasDeRuta() {
    if (!this.map || this.avisosSeleccionados.size < 2) {
      return;
    }

    console.log('🛣️ Creando ruta real con Mapbox para', this.avisosSeleccionados.size, 'avisos seleccionados');

    // Obtener puntos de ruta de los avisos seleccionados
    const routePoints: MapboxCoordinates[] = [];
    
    this.avisosSeleccionados.forEach(avisoId => {
      const marker = this.avisoMarkers.get(avisoId);
      if (marker) {
        const lngLat = marker.getLngLat();
        const aviso = this.avisos.find(a => a.id === avisoId);
        routePoints.push({
          latitude: lngLat.lat,
          longitude: lngLat.lng,
          address: aviso?.direccion_cliente_aviso
        });
      }
    });

    if (routePoints.length < 2) {
      console.log('⚠️ No hay suficientes coordenadas para crear la ruta');
      return;
    }

    // Preparar waypoints para navegación en tiempo real
    this.navigationWaypoints = routePoints;

    // Usar Mapbox para crear ruta real
    this.mapboxService.createRoute(routePoints).then(route => {
      console.log('✅ Ruta real creada con Mapbox:', {
        distancia: this.mapboxService.formatDistance(route.totalDistance),
        duracion: this.mapboxService.formatTime(route.totalDuration),
        pasos: route.steps.length
      });
      
      // Mostrar panel de navegación
      this.showNavigationPanel = true;
      
      // Iniciar navegación en tiempo real automáticamente
      console.log('🚀 Iniciando navegación en tiempo real...');
      this.mapboxService.startNavigation(routePoints).subscribe(navigationRoute => {
        if (navigationRoute) {
          console.log('🧭 Navegación activa:', {
            pasoActual: navigationRoute.currentStepIndex + 1,
            totalPasos: navigationRoute.steps.length,
            navegando: navigationRoute.isNavigating,
            progreso: `${navigationRoute.progress.toFixed(1)}%`
          });
        }
      });
    }).catch(error => {
      console.error('❌ Error al crear ruta con Mapbox:', error);
      // Mostrar mensaje de error al usuario
      this.error = 'Error al crear la ruta. Verifica tu conexión a internet.';
    });
  }


  /**
   * Maneja la búsqueda de avisos con debounce
   */
  onBuscar(termino: string) {
    this.busquedaSubject.next(termino);
  }

  /**
   * Navega al detalle de un aviso
   */
  verDetalleAviso(aviso: Aviso) {
    if (aviso.id) {
      this.router.navigate(['/ver-aviso', aviso.id]);
    }
  }

  /**
   * Abre el modal para editar un aviso
   */
  async editarAviso(aviso: Aviso) {
    if (!aviso?.id) {
      console.error('No se puede editar el aviso: ID no válido');
      return;
    }

    try {
      console.log('Abriendo modal de edición para aviso:', aviso.id);
      
      const modal = await this.modalController.create({
        component: CrearAvisosModalComponent,
        cssClass: 'modal-crear-aviso',
        componentProps: {
          modoEdicion: true,
          avisoExistente: aviso
        }
      });

      await modal.present();

      const { data, role } = await modal.onWillDismiss();
      if (role === 'confirm' && data) {
        try {
          console.log('Datos del formulario de edición:', data);

          // Preparar datos para actualizar
          const datosActualizacion = {
            tipo: data.tipo,
            nombre_cliente_aviso: data.nombreContacto,
            direccion_cliente_aviso: data.direccionLocal,
            telefono_cliente_aviso: data.telefono,
            nombre_contacto: data.nombreContacto,
            descripcion_problema: data.descripcion,
            es_urgente: data.esUrgente,
            urgencia: data.esUrgente ? 'Alta' : 'Normal'
          };

          // Actualizar el aviso usando el ID del formulario o del aviso original
          const avisoId = data.id || aviso.id;
          
          // Actualizar el aviso
          this.loading = true;
          this.avisosService.actualizarAviso(avisoId, datosActualizacion)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (avisoActualizado) => {
                console.log('Aviso actualizado exitosamente:', avisoActualizado);
                this.loading = false;

                // Mostrar mensaje de éxito
                console.log('✅ Aviso actualizado exitosamente');

                // Recargar la lista de avisos sin caché
                this.recargarAvisosSinCache();
              },
              error: (error) => {
                console.error('Error al actualizar aviso:', error);
                this.loading = false;

                // Mostrar mensaje de error
                this.error = error.message || 'Error al actualizar el aviso. Por favor, inténtalo de nuevo.';
              }
            });
        } catch (error) {
          console.error('Error al procesar la edición:', error);
          this.error = 'Error al procesar la edición. Por favor, inténtalo de nuevo.';
        }
      }
    } catch (error) {
      console.error('Error al abrir el modal de edición:', error);
      this.error = 'Error al abrir el modal de edición. Por favor, inténtalo de nuevo.';
    }
  }



  /**
   * Elimina un aviso con confirmación
   */
  async eliminarAviso(aviso: Aviso) {
    // Primero verificar si se puede eliminar
    this.loading = true;
    this.error = null;

    this.avisosService.verificarDependenciasAviso(aviso.id!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async (verificacion) => {
          this.loading = false;
          
          if (!verificacion.puedeEliminar) {
            // No se puede eliminar - mostrar mensaje específico
            const dependenciasTexto = verificacion.dependencias.join(', ');
            this.error = `No se puede eliminar el aviso porque tiene los siguientes elementos asociados: ${dependenciasTexto}. Debes eliminar primero estos elementos o contactar al administrador.`;
            return;
          }

          // Se puede eliminar - mostrar modal de confirmación
          const modal = await this.modalController.create({
            component: ConfirmarEliminacionAvisoModalComponent,
            cssClass: 'modal-confirmar-eliminacion',
            showBackdrop: true,
            backdropDismiss: true,
            componentProps: {
              aviso: aviso,
              dependencias: verificacion.dependencias
            }
          });
          
          await modal.present();
          const { data, role } = await modal.onWillDismiss();

          if (role === 'confirm' && data?.confirmado) {
            this.loading = true;
            this.error = null;

            this.avisosService.eliminarAviso(aviso.id!)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: () => {
                  console.log('Aviso eliminado exitosamente');
                  this.loading = false;
                  
                  // Recargar la lista de avisos sin caché
                  this.recargarAvisosSinCache();
                  
                  // Mostrar mensaje de éxito (opcional)
                  // Puedes implementar un toast o notificación aquí
                },
                error: (error) => {
                  console.error('Error al eliminar aviso:', error);
                  
                  // Mostrar mensaje de error más específico
                  if (error.code === '23503') {
                    if (error.message.includes('presupuestos')) {
                      this.error = 'No se puede eliminar el aviso porque tiene presupuestos asociados. Elimina primero los presupuestos.';
                    } else if (error.message.includes('facturas')) {
                      this.error = 'No se puede eliminar el aviso porque tiene facturas asociadas. Elimina primero las facturas.';
                    } else if (error.message.includes('albaranes')) {
                      this.error = 'No se puede eliminar el aviso porque tiene albaranes asociados. Elimina primero los albaranes.';
                    } else {
                      this.error = 'No se puede eliminar el aviso porque tiene datos relacionados. Contacta al administrador.';
                    }
                  } else {
                    this.error = 'Error al eliminar el aviso. Por favor, inténtalo de nuevo.';
                  }
                  this.loading = false;
                }
              });
          }
        },
        error: (error) => {
          console.error('Error al verificar dependencias:', error);
          this.error = 'Error al verificar las dependencias del aviso. Por favor, inténtalo de nuevo.';
          this.loading = false;
        }
      });
  }

  /**
   * Obtiene el paso actual de navegación
   */
  getCurrentStep() {
    return this.mapboxService.getCurrentStep();
  }

  /**
   * Obtiene los próximos pasos para mostrar en móvil
   */
  getUpcomingSteps() {
    const currentRoute = this.mapboxService.getCurrentNavigationValue();
    if (!currentRoute?.steps) return [];
    
    const currentIndex = currentRoute.currentStepIndex || 0;
    return currentRoute.steps.slice(currentIndex + 1, currentIndex + 4); // Mostrar hasta 3 próximos pasos
  }

  /**
   * Obtiene el icono de la maniobra
   */
  getManeuverIcon(maneuver: any): string {
    return this.mapboxService.getManeuverIcon(maneuver);
  }

  /**
   * Formatea la distancia
   */
  formatDistance(meters: number): string {
    return this.mapboxService.formatDistance(meters);
  }

  /**
   * Inicia la navegación
   */
  startNavigation() {
    if (this.navigationWaypoints.length < 2) {
      console.warn('Se necesitan al menos 2 waypoints para la navegación');
      return;
    }

    console.log('🚀 Iniciando navegación desde componente avisos...');
    this.mapboxService.startNavigation(this.navigationWaypoints);
    // El estado isNavigating se actualizará automáticamente via la suscripción
  }

  /**
   * Detiene la navegación
   */
  stopNavigation() {
    console.log('🛑 Deteniendo navegación desde componente avisos...');
    this.mapboxService.stopNavigation();
    // El estado isNavigating se actualizará automáticamente via la suscripción
  }

  /**
   * Avanza al siguiente paso
   */
  nextStep() {
    console.log('➡️ Siguiente paso desde componente avisos...');
    this.mapboxService.nextStep();
  }

  /**
   * Abre el modal de opciones de navegación profesional
   */
  async abrirModalOpcionesNavegacion() {
    if (this.avisosSeleccionados.size < 1) {
      console.warn('Se necesita al menos 1 aviso seleccionado para la navegación');
      return;
    }

    const avisosSeleccionados = this.avisos.filter(aviso => this.avisosSeleccionados.has(aviso.id!));

    console.log('🚀 Abriendo modal de navegación profesional para', avisosSeleccionados.length, 'avisos');

    const modal = await this.modalController.create({
      component: ModalOpcionesNavegacionComponent,
      cssClass: 'modal-opciones-navegacion',
      componentProps: {
        avisosSeleccionados: avisosSeleccionados
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.opcion) {
      console.log('🎯 Opción de navegación seleccionada:', data.opcion);
      
      switch (data.opcion) {
        case 'google':
          this.abrirRutaEnGoogleMaps();
          break;
        case 'apple':
          this.abrirRutaEnAppleMaps();
          break;
        case 'app':
          this.abrirModalMapaNavegacion();
          break;
      }
    }
  }

  /**
   * Abre el modal de mapa de navegación en pantalla completa
   */
  async abrirModalMapaNavegacion() {
    if (this.avisosSeleccionados.size < 1) {
      console.warn('Se necesita al menos 1 aviso seleccionado');
      return;
    }

    console.log('🗺️ Abriendo modal de mapa de navegación...');

    try {
      // Obtener ubicación actual del usuario PRIMERO
      const currentLocation = await this.obtenerUbicacionActual();
      if (!currentLocation) {
        console.error('❌ No se pudo obtener la ubicación actual del usuario');
        this.error = 'No se pudo obtener tu ubicación actual. Verifica que tengas habilitado el GPS.';
        return;
      }

      console.log('📍 Ubicación actual obtenida:', currentLocation);

      // Crear array de waypoints empezando por la ubicación actual
      const waypoints: MapboxCoordinates[] = [
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          address: 'Tu ubicación actual'
        }
      ];
      
      // Agregar avisos seleccionados como destinos
      for (const avisoId of this.avisosSeleccionados) {
        const aviso = this.avisos.find(a => a.id === avisoId);
        if (aviso && aviso.direccion_cliente_aviso) {
          // Usar coordenadas del marcador si existe, sino geocodificar la dirección
          const marker = this.avisoMarkers.get(avisoId);
          if (marker) {
            const lngLat = marker.getLngLat();
            waypoints.push({
              latitude: lngLat.lat,
              longitude: lngLat.lng,
              address: aviso.direccion_cliente_aviso
            });
          } else {
            // Si no hay marcador, geocodificar la dirección
            try {
              const coordinates = await this.geocodingService.geocode(`${aviso.direccion_cliente_aviso}, España`).toPromise();
              if (coordinates && coordinates.length === 2) {
                waypoints.push({
                  latitude: coordinates[1],
                  longitude: coordinates[0],
                  address: aviso.direccion_cliente_aviso
                });
                console.log(`✅ Dirección geocodificada para aviso ${avisoId}:`, coordinates);
              } else {
                console.warn(`⚠️ No se pudo geocodificar la dirección del aviso ${avisoId}: ${aviso.direccion_cliente_aviso}`);
                continue;
              }
            } catch (geocodeError) {
              console.error(`❌ Error al geocodificar aviso ${avisoId}:`, geocodeError);
              continue;
            }
          }
        }
      }

      console.log('🎯 Waypoints para navegación:', waypoints.length, 'puntos');

      // Validar que tenemos al menos un destino válido
      if (waypoints.length < 2) {
        console.error('❌ No se encontraron destinos válidos para la navegación');
        this.error = 'No se pudieron geocodificar las direcciones de los avisos seleccionados. Verifica que las direcciones sean válidas.';
        return;
      }

      // Importar el componente dinámicamente
      const { ModalMapaNavegacionComponent } = await import('../../components/modal-mapa-navegacion/modal-mapa-navegacion.component');
      
      // Usar ModalController de Ionic para abrir el modal
      const modal = await this.modalController.create({
        component: ModalMapaNavegacionComponent,
        cssClass: 'modal-mapa-navegacion-fullscreen',
        componentProps: {
          waypoints: waypoints
        }
      });

      await modal.present();
      console.log('✅ Modal de mapa presentado');

    } catch (error) {
      console.error('❌ Error al abrir modal de mapa:', error);
      this.error = 'Error al preparar la navegación. Verifica tu conexión a internet y el GPS.';
    }
  }

  /**
   * Cierra el modal de mapa de navegación
   */
  cerrarModalMapaNavegacion() {
    console.log('❌ Cerrando modal de mapa de navegación...');
    this.showFullscreenMap = false;
    this.mapboxService.stopNavigation();
  }

  /**
   * Inicia la navegación profesional con Mapbox
   */
  private async iniciarNavegacionProfesional() {
    if (this.avisosSeleccionados.size < 1) {
      console.warn('Se necesita al menos 1 aviso seleccionado');
      return;
    }

    console.log('🚀 Iniciando navegación profesional...');

    try {
      // Obtener ubicación actual del usuario PRIMERO
      const currentLocation = await this.obtenerUbicacionActual();
      if (!currentLocation) {
        console.error('❌ No se pudo obtener la ubicación actual del usuario');
        this.error = 'No se pudo obtener tu ubicación actual. Verifica que tengas habilitado el GPS.';
        return;
      }

      console.log('📍 Ubicación actual obtenida:', currentLocation);

      // Crear array de waypoints empezando por la ubicación actual
      const waypoints: MapboxCoordinates[] = [
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          address: 'Tu ubicación actual'
        }
      ];
      
      // Agregar avisos seleccionados como destinos
      for (const avisoId of this.avisosSeleccionados) {
        const aviso = this.avisos.find(a => a.id === avisoId);
        if (aviso && aviso.direccion_cliente_aviso) {
          // Usar coordenadas del marcador si existe, sino geocodificar la dirección
          const marker = this.avisoMarkers.get(avisoId);
          if (marker) {
            const lngLat = marker.getLngLat();
            waypoints.push({
              latitude: lngLat.lat,
              longitude: lngLat.lng,
              address: aviso.direccion_cliente_aviso
            });
          } else {
            // Si no hay marcador, geocodificar la dirección
            try {
              const coordinates = await this.geocodingService.geocode(`${aviso.direccion_cliente_aviso}, España`).toPromise();
              if (coordinates && coordinates.length === 2) {
                waypoints.push({
                  latitude: coordinates[1],
                  longitude: coordinates[0],
                  address: aviso.direccion_cliente_aviso
                });
                console.log(`✅ Dirección geocodificada para aviso ${avisoId}:`, coordinates);
              } else {
                console.warn(`⚠️ No se pudo geocodificar la dirección del aviso ${avisoId}: ${aviso.direccion_cliente_aviso}`);
                // Saltar este aviso si no se puede geocodificar
                continue;
              }
            } catch (geocodeError) {
              console.error(`❌ Error al geocodificar aviso ${avisoId}:`, geocodeError);
              // Saltar este aviso si hay error de geocodificación
              continue;
            }
          }
        }
      }

      console.log('🎯 Waypoints para navegación:', waypoints.length, 'puntos');
      console.log('📍 Punto de partida:', waypoints[0]);
      console.log('🎯 Destinos:', waypoints.slice(1));

      // Validar que tenemos al menos un destino válido
      if (waypoints.length < 2) {
        console.error('❌ No se encontraron destinos válidos para la navegación');
        this.error = 'No se pudieron geocodificar las direcciones de los avisos seleccionados. Verifica que las direcciones sean válidas.';
        return;
      }

      // Crear ruta profesional
      const route = await this.mapboxService.createRoute(waypoints);
      console.log('✅ Ruta profesional creada:', route);

      // Mostrar panel de navegación
      this.showNavigationPanel = true;
      this.navigationWaypoints = waypoints;
      
      console.log('🎯 Panel de navegación activado:', this.showNavigationPanel);
      console.log('🎯 Waypoints para panel:', this.navigationWaypoints);
      
      // Forzar detección de cambios para renderizar el DOM
      this.cdr.detectChanges();

      // Si no estamos en vista de mapa, inicializar el mapa para la navegación
      if (!this.isMapView) {
        console.log('🗺️ Inicializando mapa para navegación...');
        
        // Esperar a que el DOM se renderice
        setTimeout(() => {
          const mapContainer = document.getElementById('map');
          if (mapContainer) {
            this.map = this.mapboxService.initializeMap('map', {
              center: [currentLocation.longitude, currentLocation.latitude],
              zoom: 15
            });
            
            // Plotear waypoints en el mapa después de un pequeño delay
            setTimeout(() => {
              this.plotAvisosOnMap();
            }, 500);
          } else {
            console.error('❌ Contenedor del mapa no encontrado después del delay');
          }
        }, 100);
      }

      // Iniciar navegación en tiempo real
      this.mapboxService.startNavigation(waypoints).subscribe(navigationRoute => {
        if (navigationRoute) {
          console.log('🧭 Navegación profesional activa:', {
            pasoActual: navigationRoute.currentStepIndex + 1,
            totalPasos: navigationRoute.steps.length,
            navegando: navigationRoute.isNavigating,
            progreso: `${navigationRoute.progress.toFixed(1)}%`
          });
        }
      });

    } catch (error) {
      console.error('❌ Error al iniciar navegación profesional:', error);
      this.error = 'Error al crear la ruta de navegación. Verifica tu conexión a internet y el GPS.';
    }
  }

  /**
   * Obtiene la ubicación actual del usuario
   */
  private async obtenerUbicacionActual(): Promise<{ latitude: number; longitude: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.error('❌ Geolocalización no soportada');
        resolve(null);
        return;
      }

      console.log('📍 Obteniendo ubicación actual del usuario...');

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000 // 30 segundos de cache máximo
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log('✅ Ubicación actual obtenida:', location);
          resolve(location);
        },
        (error) => {
          console.error('❌ Error al obtener ubicación:', error);
          resolve(null);
        },
        options
      );
    });
  }

  /**
   * Abre ruta en Google Maps
   */
  abrirRutaEnGoogleMaps() {
    if (this.avisosSeleccionados.size < 1) {
      console.warn('Se necesita al menos 1 aviso seleccionado');
      return;
    }

    const avisosSeleccionados = this.avisos.filter(aviso => this.avisosSeleccionados.has(aviso.id!));
    console.log('Abriendo ruta en Google Maps para', avisosSeleccionados.length, 'avisos');
    
    // La funcionalidad real se maneja en el modal
    // Este método se mantiene para compatibilidad
  }

  /**
   * Abre ruta en Apple Maps
   */
  abrirRutaEnAppleMaps() {
    if (this.avisosSeleccionados.size < 1) {
      console.warn('Se necesita al menos 1 aviso seleccionado');
      return;
    }

    const avisosSeleccionados = this.avisos.filter(aviso => this.avisosSeleccionados.has(aviso.id!));
    console.log('Abriendo ruta en Apple Maps para', avisosSeleccionados.length, 'avisos');
    
    // La funcionalidad real se maneja en el modal
    // Este método se mantiene para compatibilidad
  }
}
