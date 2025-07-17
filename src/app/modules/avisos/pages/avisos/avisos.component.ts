import { Component, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, ModalController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { alertCircle, close, eyeOutline, mapOutline, add, addCircle, addCircleOutline, searchOutline, locationOutline, calendarOutline, listOutline, optionsOutline, expandOutline, createOutline, refreshOutline, alertCircleOutline, chevronBackOutline, chevronForwardOutline, trashOutline } from 'ionicons/icons';
import { CrearAvisosModalComponent } from '../../components/crear-avisos-modal/crear-avisos-modal.component';
import { CrearClienteModalComponent } from '../../../clientes/components/crear-cliente-modal/crear-cliente-modal.component';
import { Map as MapLibreMap, Marker, Popup } from 'maplibre-gl';
import { environment } from 'src/environments/environment';
import { GeocodingService } from 'src/app/core/services/geocoding.service';
import { AvisosService } from '../../../../core/services/avisos.service';
import { Aviso } from '../../models/aviso.model';
import { Subject, takeUntil } from 'rxjs';



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

  avisos: Aviso[] = [];
  loading = false;
  error: string | null = null;
  totalAvisos = 0;
  paginaActual = 1;
  porPagina = 10;
  busqueda = '';
  ordenarPor = 'fecha_creacion';
  orden: 'asc' | 'desc' = 'desc';
  estadoFiltro = '';

  private destroy$ = new Subject<void>();
  
  // Hacer Math disponible en el template
  Math = Math;

  constructor(
    private modalController: ModalController, 
    private cdr: ChangeDetectorRef,
    private geocodingService: GeocodingService,
    private avisosService: AvisosService,
    private router: Router
  ) {
    addIcons({addCircle,searchOutline,refreshOutline,alertCircleOutline,alertCircle,close,eyeOutline,createOutline,trashOutline,chevronBackOutline,chevronForwardOutline,mapOutline,expandOutline,listOutline,locationOutline,calendarOutline,optionsOutline,add,addCircleOutline});
  }

  ngAfterViewInit() {
    // Cargar avisos al inicializar
    this.cargarAvisos();
    this.suscribirseAAvisos();
    
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
    this.destroy$.next();
    this.destroy$.complete();
    
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

  /**
   * Carga la lista de avisos desde el servicio
   */
  cargarAvisos() {
    this.loading = true;
    this.error = null;

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
        
        // Actualizar marcadores del mapa si está en vista de mapa
        if (this.isMapView && this.map) {
          this.plotAvisosOnMap();
        }
      },
      error: (error) => {
        console.error('Error al cargar avisos:', error);
        this.error = 'Error al cargar los avisos. Por favor, inténtalo de nuevo.';
        this.loading = false;
      }
    });
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

    if (!this.avisos || this.avisos.length === 0) {
      console.log('No hay avisos para mostrar en el mapa');
      return;
    }

    this.avisos.forEach(aviso => {
      if (!aviso.direccion_cliente_aviso) {
        console.log(`Aviso ${aviso.id} no tiene dirección`);
        return;
      }

      // Añadir "España" para mejorar la precisión de la geocodificación
      const fullAddress = `${aviso.direccion_cliente_aviso}, España`;

      this.geocodingService.geocode(fullAddress).subscribe({
        next: (coordinates) => {
          if (coordinates && this.map) {
            const popup = new Popup({ offset: 25 }).setHTML(
              `<h3>${aviso.nombre_cliente_aviso}</h3><p>${aviso.descripcion_problema}</p>`
            );

            const marker = new Marker({color: '#4F46E5'})
              .setLngLat(coordinates)
              .setPopup(popup)
              .addTo(this.map);

            this.avisoMarkers.set(aviso.id, marker);
            console.log(`Marcador añadido para aviso ${aviso.id}`);
          }
        },
        error: (error) => {
          console.error(`Error al geocodificar dirección para aviso ${aviso.id}:`, error);
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
    this.selectedAviso = aviso.id;

    const marker = this.avisoMarkers.get(aviso.id);
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
    if (this.isMapView && !this.map) {
      // Usar un delay más largo para asegurar que el DOM esté completamente renderizado
      setTimeout(() => {
        const mapContainer = document.getElementById('map');
        if (mapContainer && !this.map) {
          console.log('Inicializando mapa...');
          this.map = new MapLibreMap({
            container: 'map',
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${environment.maptilerApiKey}`,
            center: [ -3.703790, 40.416775 ], // MapLibre usa [lng, lat]
            zoom: 12
          });

          this.map.on('load', () => {
            console.log('Mapa cargado correctamente');
            this.map!.resize();
            this.plotAvisosOnMap(); // Llamar a la función para pintar los marcadores
          });

          this.map.on('error', (error) => {
            console.error('Error al cargar el mapa:', error);
          });
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
        // Limpiar marcadores antes de remover el mapa
        this.avisoMarkers.forEach(marker => marker.remove());
        this.avisoMarkers.clear();
        
        this.map.remove();
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
        // Reabrir modal de aviso con los datos del cliente
        this.abrirModalCrearAviso(cliente);
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
                this.cargarAvisos(); // Recargar la lista para mostrar las fotos
              });
            } else {
              this.loading = false;
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
   * Navega al detalle de un aviso
   */
  verDetalleAviso(aviso: Aviso) {
    if (aviso.id) {
      this.router.navigate(['/ver-aviso', aviso.id]);
    }
  }

  /**
   * Elimina un aviso con confirmación
   */
  async eliminarAviso(aviso: Aviso) {
    // Mostrar confirmación antes de eliminar
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar el aviso #${aviso.id?.substring(0, 8)}?\n\nEsta acción eliminará también todas las fotos asociadas y no se puede deshacer.`);
    
    if (confirmacion) {
      this.loading = true;
      this.error = null;

      this.avisosService.eliminarAviso(aviso.id!)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            console.log('Aviso eliminado exitosamente');
            this.loading = false;
            
            // Recargar la lista de avisos
            this.cargarAvisos();
            
            // Mostrar mensaje de éxito (opcional)
            // Puedes implementar un toast o notificación aquí
          },
          error: (error) => {
            console.error('Error al eliminar aviso:', error);
            
            // Mostrar mensaje de error más específico
            if (error.code === '23503') {
              this.error = 'No se puede eliminar el aviso porque tiene datos relacionados (fotos, facturas, etc.). Contacta al administrador.';
            } else {
              this.error = 'Error al eliminar el aviso. Por favor, inténtalo de nuevo.';
            }
            this.loading = false;
          }
        });
    }
  }
}
