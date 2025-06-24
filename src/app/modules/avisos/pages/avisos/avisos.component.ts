import { Component, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, ModalController } from '@ionic/angular/standalone';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { alertCircle, close, eyeOutline, mapOutline, add, addCircle, addCircleOutline, searchOutline, locationOutline, calendarOutline, listOutline, optionsOutline, expandOutline, createOutline } from 'ionicons/icons';
import { CrearAvisosModalComponent } from '../../components/crear-avisos-modal/crear-avisos-modal.component';
import { CrearClienteModalComponent } from '../../../clientes/components/crear-cliente-modal/crear-cliente-modal.component';
import { Map as MapLibreMap, Marker, Popup } from 'maplibre-gl';
import { environment } from 'src/environments/environment';
import { GeocodingService } from 'src/app/core/services/geocoding.service';

export interface Aviso {
  numero: string;
  estado: string;
  nombre: string;
  detalle: string;
  fecha: string;
  urgente: boolean;
  direccion: string;
}

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule,
    CrearAvisosModalComponent
  ],
})
export class AvisosComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'urgente', 'direccion', 'acciones'];
  isMapView = false;
  private map: MapLibreMap | null = null;
  private avisoMarkers: Map<string, Marker> = new Map();
  selectedAviso: string | null = null; // Para rastrear el aviso seleccionado

  avisos: Aviso[] = [
    {
      numero: '001',
      estado: 'No visitado',
      nombre: 'Restaurante El Sol',
      detalle: 'Mantenimiento preventivo de 3 equipos A/C. Revisión completa del sistema de climatización y limpieza de filtros.',
      fecha: '2025-05-27',
      urgente: false,
      direccion: 'Pza. de la Virgen 3'
    },
    {
      numero: '002',
      estado: 'Pendiente de presupuesto',
      nombre: 'Hotel Marina',
      detalle: 'Reparación urgente de caldera. Necesita revisión técnica completa y presupuesto para reparación o sustitución.',
      fecha: '2025-05-26',
      urgente: true,
      direccion: 'Av. del Mar 45'
    },
    {
      numero: '003',
      estado: 'Visitado pendiente',
      nombre: 'Oficinas Centrales',
      detalle: 'Revisión sistema de climatización. Primera visita realizada, pendiente segunda visita para completar mantenimiento.',
      fecha: '2025-05-25',
      urgente: false,
      direccion: 'Calle Mayor 12'
    },
    {
      numero: '004',
      estado: 'No visitado',
      nombre: 'Residencia Ancianos',
      detalle: 'Instalación nuevo sistema de calefacción. Requiere visita técnica para evaluar instalación actual y planificar nueva instalación.',
      fecha: '2025-05-24',
      urgente: true,
      direccion: 'Calle San Juan 8'
    },
    {
      numero: '005',
      estado: 'Pendiente de presupuesto',
      nombre: 'Centro Comercial Plaza',
      detalle: 'Mantenimiento ascensores. Evaluación técnica completada, pendiente envío de presupuesto detallado.',
      fecha: '2025-05-23',
      urgente: false,
      direccion: 'Av. Principal 100'
    }
  ];

  constructor(
    private modalController: ModalController, 
    private cdr: ChangeDetectorRef,
    private geocodingService: GeocodingService
  ) {
    addIcons({searchOutline,addCircle,mapOutline,alertCircle,close,eyeOutline,createOutline,listOutline,expandOutline,locationOutline,calendarOutline,optionsOutline,add,addCircleOutline});
  }

  ngAfterViewInit() {
    // No inicializamos el mapa aquí para evitar que se cargue innecesariamente
    
    // Listener para detectar cambios en pantalla completa
    document.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange.bind(this));
    
    // Listener para ajustar posición del botón en resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  // ngAfterViewChecked() {
  //   if (this.isMapView && this.map) {
  //     this.map.resize();
  //   }
  // }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
    
    // Remover listeners
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange.bind(this));
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange.bind(this));
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange.bind(this));
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

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

  private handleResize() {
    // Ajustar posición del botón de cerrar si está visible
    const closeButton = document.querySelector('.btn-close-expanded') as HTMLElement;
    if (closeButton && window.innerWidth <= 992) {
      const headerHeight = this.getHeaderHeight();
      closeButton.style.top = `${headerHeight + 10}px`;
    }
  }

  private plotAvisosOnMap() {
    if (!this.map) return;

    this.avisoMarkers.clear();

    this.avisos.forEach(aviso => {
      // Añadir "España" para mejorar la precisión de la geocodificación
      const fullAddress = `${aviso.direccion}, España`;

      this.geocodingService.geocode(fullAddress).subscribe(coordinates => {
        if (coordinates && this.map) {
          const popup = new Popup({ offset: 25 }).setHTML(
            `<h3>${aviso.nombre}</h3><p>${aviso.detalle}</p>`
          );

          const marker = new Marker({color: '#4F46E5'})
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(this.map);

          this.avisoMarkers.set(aviso.numero, marker);
        }
      });
    });
  }

  centrarAvisoEnMapa(aviso: Aviso, event?: Event) {
    // Prevenir comportamiento por defecto para evitar scroll
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Establecer el aviso seleccionado
    this.selectedAviso = aviso.numero;

    const marker = this.avisoMarkers.get(aviso.numero);
    if (marker && this.map) {
      const lngLat = marker.getLngLat();
      
      // Usar una transición más suave y evitar scroll
      this.map.flyTo({ 
        center: [lngLat.lng, lngLat.lat], 
        zoom: 15, 
        essential: true,
        duration: 1000 // Transición más suave
      });
      
      // Mostrar popup después de un pequeño delay
      setTimeout(() => {
        marker.togglePopup();
      }, 500);
    }
  }

  private initMap(): void {
    if (this.isMapView && !this.map && document.getElementById('map')) {
      setTimeout(() => {
        this.map = new MapLibreMap({
          container: 'map',
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${environment.maptilerApiKey}`,
          center: [ -3.703790, 40.416775 ], // MapLibre usa [lng, lat]
          zoom: 12
        });

        this.map.on('load', () => {
          this.map!.resize();
          this.plotAvisosOnMap(); // Llamar a la función para pintar los marcadores
        });

      }, 0);
    }
  }

  toggleView() {
    this.isMapView = !this.isMapView;
    this.cdr.detectChanges();

    if (this.isMapView) {
      this.initMap();
    } else {
      if (this.map) {
        this.map.remove();
        this.map = null;
      }
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
        // Reabrir modal de aviso con los datos del cliente
        this.abrirModalCrearAviso(cliente);
      } else {
        this.abrirModalCrearAviso(clienteData);
      }

    } else if (data) {
      // Aquí manejaremos los datos del nuevo aviso cuando se cree
      console.log('Nuevo aviso creado:', data);
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
}
