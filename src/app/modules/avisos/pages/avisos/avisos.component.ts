import { Component, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, ModalController } from '@ionic/angular/standalone';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { alertCircle, close, eyeOutline, mapOutline, add, addCircle, addCircleOutline, searchOutline, locationOutline, calendarOutline, listOutline, optionsOutline } from 'ionicons/icons';
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

  avisos: Aviso[] = [
    {
      numero: '001',
      estado: 'En curso',
      nombre: 'Restaurante El Sol',
      detalle: 'Mantenimiento preventivo de 3 equipos A/C.',
      fecha: '2025-05-27',
      urgente: false,
      direccion: 'Pza. de la Virgen 3'
    },
    {
      numero: '002',
      estado: 'Pendiente',
      nombre: 'Hotel Marina',
      detalle: 'Reparación urgente de caldera',
      fecha: '2025-05-26',
      urgente: true,
      direccion: 'Av. del Mar 45'
    },
    {
      numero: '003',
      estado: 'Completado',
      nombre: 'Oficinas Centrales',
      detalle: 'Revisión sistema de climatización',
      fecha: '2025-05-25',
      urgente: false,
      direccion: 'Calle Mayor 12'
    },
    {
      numero: '004',
      estado: 'En curso',
      nombre: 'Residencia Ancianos',
      detalle: 'Instalación nuevo sistema de calefacción',
      fecha: '2025-05-24',
      urgente: true,
      direccion: 'Calle San Juan 8'
    },
    {
      numero: '005',
      estado: 'Pendiente',
      nombre: 'Centro Comercial Plaza',
      detalle: 'Mantenimiento ascensores',
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
    addIcons({searchOutline,mapOutline,addCircle,alertCircle,close,eyeOutline,locationOutline,calendarOutline,add,addCircleOutline, listOutline, optionsOutline});
  }

  ngAfterViewInit() {
    // No inicializamos el mapa aquí para evitar que se cargue innecesariamente
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

  centrarAvisoEnMapa(aviso: Aviso) {
    const marker = this.avisoMarkers.get(aviso.numero);
    if (marker && this.map) {
      const lngLat = marker.getLngLat();
      this.map.flyTo({ center: [lngLat.lng, lngLat.lat], zoom: 15, essential: true });
      marker.togglePopup();
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
}
