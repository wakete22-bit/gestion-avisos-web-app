import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonSegment, IonSegmentButton, ModalController } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { close, pencilOutline, mapOutline, navigate, person, call, mail, add, addCircle, gridOutline, listOutline, chevronDownOutline, eyeOutline, arrowBackOutline, refreshOutline, alertCircleOutline, ellipsisVertical, ellipsisVerticalOutline, trashOutline, constructOutline, personOutline, imagesOutline, documentTextOutline, checkmarkCircleOutline, bugOutline } from 'ionicons/icons';
import { AvisosService } from '../../../../core/services/avisos.service';
import { TrabajosService } from '../../../../core/services/trabajos.service';
import { Aviso } from '../../models/aviso.model';
import { TrabajoRealizado } from '../../models/trabajo-realizado.model';
import { CrearTrabajosRealizadosComponent } from '../crear-trabajos-realizados/crear-trabajos-realizados.component';
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

  // Datos de trabajos realizados
  trabajosRealizados: TrabajoRealizado[] = [];
  loadingTrabajos = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private avisosService: AvisosService,
    private trabajosService: TrabajosService,
    private modalController: ModalController,
    private flujoAvisosService: FlujoAvisosService
  ) {
    addIcons({ refreshOutline, alertCircleOutline, arrowBackOutline, close, pencilOutline, checkmarkCircleOutline, navigate, person, call, mail, addCircle, constructOutline, bugOutline, documentTextOutline, trashOutline, imagesOutline, personOutline, gridOutline, listOutline, chevronDownOutline, eyeOutline, ellipsisVerticalOutline, ellipsisVertical, add, mapOutline });
  }

  ngOnInit() {
    this.cargarAviso();
  }

  /**
   * Carga los trabajos realizados del aviso
   */
  cargarTrabajos() {
    if (!this.aviso?.id) return;

    console.log('🔄 cargarTrabajos() ejecutándose para aviso:', this.aviso.id);
    this.loadingTrabajos = true;
    this.error = null; // ← LIMPIAR ERROR AL RECARGAR TRABAJOS
    
    this.trabajosService.getTrabajosAviso(this.aviso.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('✅ Trabajos cargados exitosamente:', response.trabajos.length, 'trabajos');
          console.log('📊 Estados de los trabajos:', response.trabajos.map((t: any) => ({ id: t.id, estado: t.estado, albaran_id: t.albaran_id })));
          this.trabajosRealizados = response.trabajos;
          this.loadingTrabajos = false;
        },
        error: (error) => {
          console.error('❌ Error al cargar trabajos:', error);
          this.loadingTrabajos = false;
          this.error = 'Error al cargar los trabajos realizados';
        }
      });
  }
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
                // Cargar trabajos realizados después de cargar el aviso
                this.cargarTrabajos();
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
   * Abre el modal para crear un nuevo trabajo realizado
   */
  async crearTrabajoRealizado(trabajoExistente?: TrabajoRealizado) {
    if (!this.aviso?.id) return;

    const modal = await this.modalController.create({
      component: CrearTrabajosRealizadosComponent,
      componentProps: {
        avisoId: this.aviso.id,
        trabajoExistente: trabajoExistente // Pasar el trabajo existente si se está editando
      },
      cssClass: 'modal-crear-trabajo'
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      try {
        if (trabajoExistente) {
          // Actualizar trabajo existente
          const resultado = await firstValueFrom(this.trabajosService.actualizarTrabajo(trabajoExistente.id!, data));
          console.log('Trabajo actualizado exitosamente:', resultado);
          alert('Trabajo actualizado exitosamente.');
        } else {
          // Crear nuevo trabajo
          const resultado = await firstValueFrom(this.trabajosService.crearTrabajo(data));
          console.log('Trabajo creado exitosamente:', resultado);
          alert('Trabajo creado exitosamente. Los materiales han sido descontados del inventario.');
        }

        // Recargar trabajos para mostrar los cambios
        this.cargarTrabajos();
      } catch (error) {
        console.error('Error al procesar trabajo:', error);
        alert('Error al procesar el trabajo. Por favor, inténtalo de nuevo.');
      }
    }
  }

  /**
   * Edita un trabajo existente
   */
  async editarTrabajo(trabajo: TrabajoRealizado) {
    try {
      // Cargar los datos completos del trabajo con sus materiales
      const trabajoCompleto = await firstValueFrom(this.trabajosService.getTrabajo(trabajo.id!));
      await this.crearTrabajoRealizado(trabajoCompleto.trabajo);
    } catch (error) {
      console.error('Error al cargar el trabajo para editar:', error);
      alert('Error al cargar el trabajo para editar. Por favor, inténtalo de nuevo.');
    }
  }

  /**
   * Elimina un trabajo
   */
  async eliminarTrabajo(trabajo: TrabajoRealizado) {
    const confirmacion = confirm(
      `¿Estás seguro de que quieres eliminar este trabajo?\n\n` +
      `Fecha: ${trabajo.fecha_trabajo}\n` +
      `Descripción: ${trabajo.descripcion}\n\n` +
      `Esta acción no se puede deshacer y los materiales serán devueltos al inventario.`
    );

    if (confirmacion) {
      try {
        await firstValueFrom(this.trabajosService.eliminarTrabajo(trabajo.id!));
        console.log('Trabajo eliminado exitosamente');
        alert('Trabajo eliminado exitosamente. Los materiales han sido devueltos al inventario.');

        // Recargar trabajos para actualizar la lista
        this.cargarTrabajos();
      } catch (error) {
        console.error('Error al eliminar el trabajo:', error);
        alert('Error al eliminar el trabajo. Por favor, inténtalo de nuevo.');
      }
    }
  }

  /**
   * Abre el modal para hacer albarán
   */
  async hacerAlbaran(trabajo: TrabajoRealizado) {
    console.log('Abriendo modal de hacer albarán para trabajo:', trabajo);
    if (!this.aviso?.id) return;

    const modal = await this.modalController.create({
      component: HacerAlbaranComponent,
      componentProps: {
        trabajo: trabajo,
        aviso: this.aviso
      },
      cssClass: 'modal-hacer-albaran modal-fullscreen',
      backdropDismiss: false,
      showBackdrop: true,
      breakpoints: [0, 1], // Solo dos breakpoints: cerrado (0) y abierto (1)
      initialBreakpoint: 1, // Siempre abierto al máximo
      backdropBreakpoint: 0, // Backdrop solo cuando está cerrado
      handle: false, // Deshabilitar el handle de arrastre
      handleBehavior: 'none' // Sin comportamiento de arrastre
    });

    console.log('Modal creado:', modal);
    console.log('Presentando modal...');
    await modal.present();
    console.log('Modal presentado');

    const { data, role } = await modal.onWillDismiss();
    console.log('🔍 Modal cerrado con:', { role, data });
    
    if (role === 'confirm' && data?.success) {
      try {
        console.log('✅ Albarán creado exitosamente:', data.albaran);
        console.log('✅ Trabajo actualizado:', data.trabajo);
        console.log('✅ Aviso actualizado:', data.aviso);
        alert(data.mensaje || 'Albarán creado exitosamente');

        console.log('🔄 Recargando datos...');
        // Recargar trabajos y aviso para mostrar los cambios
        this.cargarTrabajos();
        this.cargarAviso();

        // Procesar el estado del albarán
        if (data.albaran.estado_cierre === 'Finalizado') {
          console.log('Trabajo finalizado, listo para facturar');
          // El trabajo ya está marcado como "Finalizado" y listo para facturar
        }

        if (data.albaran.estado_cierre === 'Presupuesto pendiente') {
          console.log('Presupuesto pendiente, se puede crear presupuesto');
          // Aquí se podría mostrar opción para crear presupuesto
        }

        if (data.albaran.estado_cierre === 'Otra visita') {
          console.log('Otra visita requerida');
          // Aquí se podría programar nueva visita
        }

      } catch (error) {
        console.error('Error al procesar albarán:', error);
        alert('Error al procesar el albarán. Por favor, inténtalo de nuevo.');
      }
    }
  }

  realizarOtraVisita(trabajo: any) {
    // Implementar lógica para realizar otra visita
    console.log('Realizar otra visita para el trabajo:', trabajo);
  }

  /**
   * Elimina una foto del aviso
   */
  async eliminarFoto(foto: any) {
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

  /**
   * Calcula las horas de trabajo de un trabajo
   */
  calcularHorasTrabajo(trabajo: TrabajoRealizado): number {
    const inicio = new Date(`2000-01-01T${trabajo.hora_inicio}`);
    const fin = new Date(`2000-01-01T${trabajo.hora_fin}`);
    const horas = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60);
    return Math.max(0, horas);
  }

  /**
   * Obtiene el estado del albarán asociado al trabajo
   */
  getAlbaranEstado(trabajo: TrabajoRealizado): string {
    // Validaciones básicas
    if (!trabajo || !trabajo.albaran_id || !this.aviso?.albaranes) {
      return 'pendiente';
    }

    const albaran = this.aviso.albaranes.find(a => a.id === trabajo.albaran_id);

    if (!albaran || !albaran.estado_cierre) {
      return 'pendiente';
    }

    // Convertir el estado del albarán a un formato válido para CSS
    return albaran.estado_cierre.toLowerCase().replace(/ /g, '-');
  }

  /**
   * Verifica si se puede crear un albarán para un trabajo
   */
  puedeCrearAlbaran(trabajo: TrabajoRealizado): boolean {
    // Validaciones básicas
    if (!trabajo || !trabajo.estado) {
      return false;
    }

    // No se puede crear si ya tiene albarán
    if (trabajo.albaran_id) {
      return false;
    }

    // Estados válidos para crear albarán
    const estadosValidos = ['En curso', 'Abierto', 'Pendiente'];
    return estadosValidos.includes(trabajo.estado);
  }

  /**
   * Convierte el estado del aviso a una clase CSS válida
   */
  getEstadoClass(estado: string | undefined): string {
    if (!estado) return 'badge-pendiente';
    return 'badge-' + estado.toLowerCase().replace(/ /g, '-');
  }

  /**
   * Maneja las acciones ejecutadas desde el componente de flujo
   */
  onAccionFlujoEjecutada(resultado: any) {
    console.log('Acción de flujo ejecutada:', resultado);

    // Recargar aviso y trabajos para reflejar cambios
    this.cargarAviso();
    this.cargarTrabajos();

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
  async verAlbaran(albaran: any) {
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
