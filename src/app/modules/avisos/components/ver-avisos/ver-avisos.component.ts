import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonSegment, IonSegmentButton, ModalController } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { close, pencilOutline, mapOutline, navigate, person, call, mail, add, addCircle, gridOutline, listOutline, chevronDownOutline, eyeOutline, arrowBackOutline, refreshOutline, alertCircleOutline, ellipsisVertical, ellipsisVerticalOutline, trashOutline, constructOutline, personOutline, imagesOutline, documentTextOutline, checkmarkCircleOutline, bugOutline, informationCircleOutline } from 'ionicons/icons';
import { AvisosService } from '../../../../core/services/avisos.service';
// TrabajosService eliminado - ya no se gestiona
import { Aviso, Albaran } from '../../models/aviso.model';
// TrabajoRealizado eliminado - ya no se gestiona
// CrearTrabajosRealizadosComponent eliminado - ya no se crea trabajos
import { HacerAlbaranComponent } from '../hacer-albaran/hacer-albaran.component';
import { FlujoEstadoComponent } from '../../../../shared/components/flujo-estado/flujo-estado.component';
import { CrearAvisosModalComponent } from '../crear-avisos-modal/crear-avisos-modal.component';
import { VerAlbaranModalComponent } from '../ver-albaran-modal/ver-albaran-modal.component';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import { FlujoAvisosService } from '../../../../core/services/flujo-avisos.service';

addIcons({ close, pencilOutline, navigate, person, call, mail, mapOutline, arrowBackOutline });

@Component({
  selector: 'app-ver-avisos',
  templateUrl: './ver-avisos.component.html',
  styleUrls: ['./ver-avisos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, FlujoEstadoComponent],
})
export class VerAvisosComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  // Añadir la propiedad para controlar la vista
  vistaGaleria: 'grid' | 'list' = 'grid';

  // Datos del aviso
  aviso: Aviso | null = null;
  loading = false;
  error: string | null = null;
  subiendoImagenes = false;

  private destroy$ = new Subject<void>();

  // Ya no gestionamos trabajos - directamente albaranes

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private avisosService: AvisosService,
    private modalController: ModalController,
    private flujoAvisosService: FlujoAvisosService
  ) {
    addIcons({refreshOutline,alertCircleOutline,arrowBackOutline,close,pencilOutline,checkmarkCircleOutline,navigate,person,call,mail,addCircle,informationCircleOutline,documentTextOutline,eyeOutline,imagesOutline,trashOutline,constructOutline,bugOutline,personOutline,gridOutline,listOutline,chevronDownOutline,ellipsisVerticalOutline,ellipsisVertical,add,mapOutline});
  }

  ngOnInit() {
    this.cargarAviso();
  }

  // Método cargarTrabajos eliminado - ya no gestionamos trabajos
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga el aviso basado en el ID de la URL
   */
  cargarAviso() {
    console.log('🔄 cargarAviso() ejecutándose...');
    this.loading = true;
    this.error = null; // ← LIMPIAR ERROR AL RECARGAR

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const avisoId = params['id-aviso'];
        console.log('🔍 ID de aviso obtenido de la URL:', avisoId);
        if (avisoId) {
          this.avisosService.getResumenCompletoAviso(avisoId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (aviso) => {
                console.log('✅ Aviso cargado exitosamente:', aviso.id, 'Estado:', aviso.estado);
                console.log('📊 Albaranes cargados:', aviso.albaranes?.length || 0);
                this.aviso = aviso;
                this.loading = false;
                // Ya no cargamos trabajos - solo albaranes que vienen con el aviso
              },
              error: (error) => {
                console.error('❌ Error al cargar el aviso:', error);
                this.error = 'Error al cargar el aviso. Por favor, inténtalo de nuevo.';
                this.loading = false;
              }
            });
        } else {
          this.error = 'ID de aviso no válido';
          this.loading = false;
        }
      });
  }

  cambiarVistaGaleria(event: any) {
    this.vistaGaleria = event.detail.value;
  }

  /**
   * Fuerza la recarga de todos los datos del aviso
   */
  forzarRecargaDatos() {
    this.error = null;
    this.cargarAviso();
  }

  /**
   * Recarga específicamente los albaranes del aviso
   */
  recargarAlbaranes() {
    if (!this.aviso?.id) return;
    
    console.log('🔄 Recargando albaranes del aviso:', this.aviso.id);
    this.avisosService.getResumenCompletoAviso(this.aviso.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (avisoActualizado) => {
          console.log('✅ Albaranes recargados:', avisoActualizado.albaranes?.length || 0);
          this.aviso = avisoActualizado;
        },
        error: (error) => {
          console.error('❌ Error al recargar albaranes:', error);
        }
      });
  }

  /**
   * Navega de vuelta a la lista de avisos
   */
  volverALista() {
    // Verificar si vino desde el historial
    const referrer = document.referrer;
    if (referrer && referrer.includes('/historial')) {
      this.router.navigate(['/historial']);
    } else {
      this.router.navigate(['/avisos']);
    }
  }

  verCliente() {
    if (this.aviso?.cliente?.id) {
      // Implementar navegación al detalle del cliente
      console.log('Navegar al cliente:', this.aviso.cliente.id);
    }
  }

  verMapa() {
    if (this.aviso?.direccion_cliente_aviso) {
      // Abrir Google Maps con la dirección
      const direccion = encodeURIComponent(this.aviso.direccion_cliente_aviso);
      window.open(`https://www.google.com/maps/search/?api=1&query=${direccion}`, '_blank');
    }
  }

  editarAviso() {
    if (this.aviso?.id) {
      this.abrirModalEditarAviso();
    }
  }

  /**
   * Abre el modal para editar el aviso
   */
  async abrirModalEditarAviso() {
    if (!this.aviso?.id) return;

    const modal = await this.modalController.create({
      component: CrearAvisosModalComponent,
      cssClass: 'modal-crear-aviso',
      componentProps: {
        modoEdicion: true,
        avisoExistente: this.aviso
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

        // Actualizar el aviso
        this.loading = true;
        this.avisosService.actualizarAviso(this.aviso.id, datosActualizacion)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (avisoActualizado) => {
              console.log('Aviso actualizado exitosamente:', avisoActualizado);
              this.loading = false;

              // Mostrar mensaje de éxito
              this.mostrarMensaje('Aviso actualizado exitosamente', 'success');

              // Recargar los datos del aviso
              this.cargarAviso();
            },
            error: (error) => {
              console.error('Error al actualizar aviso:', error);
              this.loading = false;

              // Mostrar mensaje de error
              this.mostrarMensaje(
                error.message || 'Error al actualizar el aviso. Por favor, inténtalo de nuevo.',
                'error'
              );
            }
          });
      } catch (error) {
        console.error('Error al procesar la edición:', error);
        this.mostrarMensaje('Error al procesar la edición. Por favor, inténtalo de nuevo.', 'error');
      }
    }
  }

  cerrarAlbaran() {
    if (this.aviso?.id) {
      // Implementar cierre de albarán
      console.log('Cerrar albarán para aviso:', this.aviso.id);
    }
  }

  /**
   * Abre el selector de archivos
   */
  seleccionarImagenes() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  /**
   * Maneja la selección de archivos
   */
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0 && this.aviso?.id) {
      this.subirImagenes(Array.from(files));
    }

    // Limpiar el input para permitir seleccionar los mismos archivos de nuevo
    event.target.value = '';
  }

  /**
   * Sube múltiples imágenes al aviso
   */
  async subirImagenes(files: File[]) {
    if (!this.aviso?.id) {
      console.error('No se puede subir imágenes: aviso no válido');
      return;
    }

    this.subiendoImagenes = true;
    this.error = null;

    try {
      const subidasCompletadas = new Promise<void>((resolve) => {
        let fotosSubidas = 0;
        const totalFotos = files.length;

        files.forEach((file: File) => {
          this.avisosService.subirFoto(this.aviso!.id!, file)
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

      // Esperar a que todas las fotos se suban
      await subidasCompletadas;

      // Recargar el aviso para mostrar las nuevas imágenes
      this.cargarAviso();

    } catch (error) {
      console.error('Error al subir imágenes:', error);
      this.error = 'Error al subir las imágenes. Por favor, inténtalo de nuevo.';
    } finally {
      this.subiendoImagenes = false;
    }
  }

  /**
   * Abre el modal para crear un nuevo albarán directamente
   */
  async crearAlbaran() {
    if (!this.aviso?.id) return;

    const modal = await this.modalController.create({
      component: HacerAlbaranComponent,
      componentProps: {
        aviso: this.aviso
      },
      backdropDismiss: false,
      showBackdrop: true,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data?.success) {
      try {
        console.log('✅ Albarán creado exitosamente:', data.albaran);
        alert(data.mensaje || 'Albarán creado exitosamente');

        // Recargar aviso para mostrar el nuevo albarán
        this.cargarAviso();
      } catch (error) {
        console.error('Error al procesar albarán:', error);
        alert('Error al procesar el albarán. Por favor, inténtalo de nuevo.');
      }
    }
  }

  // Métodos editarTrabajo y eliminarTrabajo eliminados - ya no gestionamos trabajos

  // Método hacerAlbaran eliminado - ahora se crea directamente desde crearAlbaran()

  // realizarOtraVisita eliminado - ahora se gestiona con múltiples albaranes

  /**
   * Elimina una foto del aviso
   */
  async eliminarFoto(foto: { id: string; descripcion?: string }) {
    if (!this.aviso?.id || !foto?.id) {
      console.error('No se puede eliminar la foto: faltan datos');
      return;
    }

    // Confirmar antes de eliminar
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar esta imagen?\n\nEsta acción no se puede deshacer.`);

    if (confirmacion) {
      try {
        await firstValueFrom(this.avisosService.eliminarFoto(foto.id));
        console.log('Foto eliminada exitosamente');

        // Recargar el aviso para actualizar la lista de fotos
        this.cargarAviso();
      } catch (error) {
        console.error('Error al eliminar la foto:', error);
        alert('Error al eliminar la imagen. Por favor, inténtalo de nuevo.');
      }
    }
  }

  // Métodos calcularHorasTrabajo, getAlbaranEstado y puedeCrearAlbaran eliminados - ya no gestionamos trabajos

  /**
   * Convierte el estado del aviso a una clase CSS válida
   */
  getEstadoClass(estado: string | undefined): string {
    if (!estado) return 'estado-pendiente';
    
    // Convertir el estado a una clase CSS válida
    const estadoNormalizado = estado.toLowerCase().replace(/ /g, '-');
    const claseCSS = `estado-${estadoNormalizado}`;
    
    // Debug: mostrar qué clase se está generando
    console.log(`🔍 Estado: "${estado}" → Clase CSS: "${claseCSS}"`);
    
    return claseCSS;
  }

  /**
   * Maneja las acciones ejecutadas desde el componente de flujo
   */
  onAccionFlujoEjecutada(resultado: { mensaje?: string; facturaId?: string }) {
    console.log('Acción de flujo ejecutada:', resultado);

    // Recargar aviso para reflejar cambios
    this.cargarAviso();

    // Mostrar mensaje de éxito (opcional)
    if (resultado.mensaje) {
      console.log('Mensaje de éxito:', resultado.mensaje);
      // Aquí puedes implementar un toast o notificación
      alert(resultado.mensaje);
    }

    // Navegar si se creó una factura
    if (resultado.facturaId) {
      const navegarFactura = confirm('Se ha generado una factura. ¿Deseas ver la factura creada?');
      if (navegarFactura) {
        this.router.navigate(['/facturas', resultado.facturaId]);
      }
    }
  }

  completarAviso() {
    if (this.aviso?.id) {
      console.log('🔄 Completando aviso:', this.aviso.id);

      // Mostrar confirmación antes de completar
      if (confirm('¿Estás seguro de que quieres marcar este aviso como completado? Esta acción no se puede deshacer.')) {
        this.loading = true;
        this.error = null; // ← LIMPIAR ERROR AL INICIAR

        this.flujoAvisosService.completarAviso(this.aviso.id).subscribe({
          next: (resultado) => {
            console.log('✅ Aviso completado exitosamente:', resultado);
            this.loading = false;

            // Mostrar mensaje de éxito
            this.mostrarMensaje('Aviso completado exitosamente', 'success');

            // Recargar los datos del aviso
            this.cargarAviso();
          },
          error: (error) => {
            console.error('❌ Error al completar aviso:', error);
            this.loading = false;

            // Mostrar mensaje de error más detallado
            const mensajeError = error.message || 
              'Error al completar el aviso. Verifica que haya trabajos realizados y facturas generadas.';
            
            this.mostrarMensaje(mensajeError, 'error');
            this.error = mensajeError;
          }
        });
      }
    } else {
      console.error('No hay aviso seleccionado para completar');
      this.mostrarMensaje('No hay aviso seleccionado para completar', 'error');
    }
  }

  /**
   * Abre el modal para ver los detalles completos de un albarán
   */
  async verAlbaran(albaran: Albaran) {
    if (!albaran?.id) {
      console.error('No se puede abrir el albarán: ID no válido');
      return;
    }

    try {
      console.log('Abriendo modal de albarán:', albaran);
      
      const modal = await this.modalController.create({
        component: VerAlbaranModalComponent,
        componentProps: {
          albaran: albaran,
          aviso: this.aviso
        },
        cssClass: 'modal-ver-albaran modal-fullscreen',
        backdropDismiss: true
      });

      await modal.present();

      const { data, role } = await modal.onWillDismiss();
      if (role === 'confirm' && data) {
        console.log('Modal de albarán cerrado con datos:', data);
        // Aquí se pueden manejar acciones adicionales si es necesario
      }
    } catch (error) {
      console.error('Error al abrir el modal del albarán:', error);
      this.mostrarMensaje('Error al abrir el albarán. Por favor, inténtalo de nuevo.', 'error');
    }
  }

  /**
   * Muestra un mensaje al usuario
   */
  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error' | 'info' = 'info') {
    // Aquí podrías implementar un sistema de notificaciones
    // Por ahora, usamos console.log y alert para errores
    console.log(`[${tipo.toUpperCase()}] ${mensaje}`);

    if (tipo === 'error') {
      // Para errores críticos, mostrar alerta
      alert(`ERROR: ${mensaje}`);
    } else if (tipo === 'success') {
      // Para éxitos, mostrar en consola y opcionalmente alerta
      console.log(`✅ ${mensaje}`);
      // Opcional: mostrar alerta de éxito
      // alert(`✅ ${mensaje}`);
    } else {
      // Para info, solo en consola
      console.log(`ℹ️ ${mensaje}`);
    }

    // Si tienes un servicio de notificaciones, lo usarías aquí
    // this.notificationService.show(mensaje, tipo);
  }
}
