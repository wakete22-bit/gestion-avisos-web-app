import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonSegment, IonSegmentButton, ModalController } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { close, pencilOutline, mapOutline, navigate, person, call, mail, add, addCircle, gridOutline, listOutline, chevronDownOutline, eyeOutline, arrowBackOutline, refreshOutline, alertCircleOutline, ellipsisVertical, ellipsisVerticalOutline, trashOutline, constructOutline, personOutline, imagesOutline, documentTextOutline, checkmarkCircleOutline, bugOutline, informationCircleOutline, calculator } from 'ionicons/icons';
import { AvisosService } from '../../../../core/services/avisos.service';
import { AlbaranesService } from '../../../../core/services/albaranes.service';
// TrabajosService eliminado - ya no se gestiona
import { Aviso, Albaran } from '../../models/aviso.model';
// TrabajoRealizado eliminado - ya no se gestiona
// CrearTrabajosRealizadosComponent eliminado - ya no se crea trabajos
import { HacerAlbaranComponent } from '../hacer-albaran/hacer-albaran.component';
import { FlujoEstadoComponent } from '../../../../shared/components/flujo-estado/flujo-estado.component';
import { CrearAvisosModalComponent } from '../crear-avisos-modal/crear-avisos-modal.component';
import { VerAlbaranModalComponent } from '../ver-albaran-modal/ver-albaran-modal.component';
import { VerImagenModalComponent } from '../ver-imagen-modal/ver-imagen-modal.component';
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
  @ViewChild(FlujoEstadoComponent, { static: false }) flujoComponent!: FlujoEstadoComponent;

  // Añadir la propiedad para controlar la vista
  vistaGaleria: 'grid' | 'list' = 'grid';

  // Datos del aviso
  aviso: Aviso | null = null;
  loading = false;
  error: string | null = null;
  subiendoImagenes = false;

  // Cache para la clase CSS del estado
  private estadoClassCache: string = 'estado-pendiente';
  private ultimoEstado: string | undefined = undefined;

  private destroy$ = new Subject<void>();

  // Ya no gestionamos trabajos - directamente albaranes

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private avisosService: AvisosService,
    private albaranesService: AlbaranesService,
    private modalController: ModalController,
    private flujoAvisosService: FlujoAvisosService
  ) {
    addIcons({refreshOutline,alertCircleOutline,arrowBackOutline,close,pencilOutline,checkmarkCircleOutline,navigate,person,call,mail,addCircle,documentTextOutline,calculator,eyeOutline,imagesOutline,trashOutline,informationCircleOutline,constructOutline,bugOutline,personOutline,gridOutline,listOutline,chevronDownOutline,ellipsisVerticalOutline,ellipsisVertical,add,mapOutline});
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
                console.log('📊 Facturas cargadas:', aviso.facturas?.length || 0);
                this.aviso = aviso;
                this.loading = false;
                
                // Actualizar cache del estado
                this.getEstadoClass(aviso.estado);
                
                // Verificar el estado real del aviso basándose en sus facturas relacionadas
                this.verificarEstadoRealAviso(aviso);
                
                // Recargar el flujo después de cargar el aviso
                // Esto asegura que las acciones estén actualizadas
                setTimeout(() => {
                  if (this.flujoComponent) {
                    this.flujoComponent.recargarFlujo();
                  }
                }, 100);
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
   * Verifica si se debe generar una factura automáticamente para un aviso
   */
  private verificarGeneracionFacturaAutomatica(avisoId: string) {
    console.log('🔍 Verificando generación automática de factura para aviso:', avisoId);
    
    this.flujoAvisosService.actualizarEstadoConFacturaAutomatica(avisoId).subscribe({
      next: (resultado) => {
        console.log('🔍 Resultado de verificación automática:', resultado);
        
        // Si se generó una factura automáticamente, mostrar mensaje y recargar
        if (resultado.facturaGenerada) {
          console.log('💰 Factura generada automáticamente al cargar aviso:', resultado.facturaGenerada);
          this.mostrarMensaje('Factura generada automáticamente para el aviso.', 'success');
          
          // Recargar el aviso para mostrar la factura generada
          this.cargarAviso();
        } else {
          console.log('ℹ️ No se generó factura automática - condiciones no cumplidas');
        }
      },
      error: (error) => {
        console.error('❌ Error al verificar generación automática:', error);
      }
    });
  }

  /**
   * Verifica el estado real del aviso basándose en sus facturas relacionadas
   */
  private verificarEstadoRealAviso(aviso: Aviso) {
    console.log('🔍 Verificando estado real del aviso basándose en facturas:', {
      avisoId: aviso.id,
      estadoActual: aviso.estado,
      facturas: aviso.facturas?.length || 0,
      albaranes: aviso.albaranes?.length || 0,
      albaranesDetalle: aviso.albaranes?.map(a => ({ id: a.id, estado: a.estado_cierre })) || []
    });

    // Si el aviso está en "Listo para facturar" pero ya tiene facturas, debería estar "En curso"
    if (aviso.estado === 'Listo para facturar' && aviso.facturas && aviso.facturas.length > 0) {
      console.log('⚠️ Aviso en estado "Listo para facturar" pero tiene facturas - actualizando a "En curso"');
      
      // Actualizar el estado del aviso
      this.avisosService.actualizarAviso(aviso.id, { estado: 'En curso' }).subscribe({
        next: (avisoActualizado) => {
          console.log('✅ Estado del aviso actualizado a "En curso"');
          this.aviso = avisoActualizado;
        },
        error: (error) => {
          console.error('❌ Error al actualizar estado del aviso:', error);
        }
      });
    }
    // Si el aviso está en "Listo para facturar" sin facturas, verificar si se debe generar factura automáticamente
    else if (aviso.estado === 'Listo para facturar' && (!aviso.facturas || aviso.facturas.length === 0)) {
      console.log('💰 Aviso en estado "Listo para facturar" sin facturas - verificando generación automática');
      
      // Verificar si tiene albaranes finalizados
      const albaranesFinalizados = aviso.albaranes?.filter(albaran => albaran.estado_cierre === 'Finalizado') || [];
      console.log('🔍 Albaranes finalizados encontrados:', albaranesFinalizados.length);
      
      if (albaranesFinalizados.length > 0) {
        console.log('✅ Aviso tiene albaranes finalizados sin facturas - generando factura automáticamente');
        this.verificarGeneracionFacturaAutomatica(aviso.id);
      } else {
        console.log('⚠️ Aviso en "Listo para facturar" pero no tiene albaranes finalizados');
      }
    }
    // Si el aviso está en "En curso" pero no tiene facturas y tiene albaranes finalizados, debería estar "Listo para facturar"
    else if (aviso.estado === 'En curso' && (!aviso.facturas || aviso.facturas.length === 0)) {
      console.log('🔍 Aviso en estado "En curso" sin facturas - verificando si debería estar "Listo para facturar"');
      
      // Verificar si tiene albaranes finalizados
      const albaranesFinalizados = aviso.albaranes?.filter(albaran => albaran.estado_cierre === 'Finalizado') || [];
      
      if (albaranesFinalizados.length > 0) {
        console.log('💰 Aviso tiene albaranes finalizados sin facturas - actualizando a "Listo para facturar"');
        
        // Actualizar el estado del aviso
        this.avisosService.actualizarAviso(aviso.id, { estado: 'Listo para facturar' }).subscribe({
          next: (avisoActualizado) => {
            console.log('✅ Estado del aviso actualizado a "Listo para facturar"');
            this.aviso = avisoActualizado;
            
            // Ahora verificar si se debe generar factura automáticamente
            this.verificarGeneracionFacturaAutomatica(aviso.id);
          },
          error: (error) => {
            console.error('❌ Error al actualizar estado del aviso:', error);
          }
        });
      }
    }
  }

  /**
   * Fuerza la recarga de todos los datos del aviso
   */
  forzarRecargaDatos() {
    this.error = null;
    this.cargarAviso();
    
    // También recargar el flujo después de un breve delay
    setTimeout(() => {
      if (this.flujoComponent) {
        this.flujoComponent.recargarFlujo();
      }
    }, 200);
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
        
        // Verificar si también se creó un presupuesto
        if (data.presupuesto && data.accion === 'presupuesto_creado') {
          console.log('✅ Presupuesto creado junto con el albarán:', data.presupuesto);
          
          // Mostrar mensaje simple sin preguntar
          alert(data.mensaje || 'Albarán y presupuesto creados exitosamente. Puedes editarlo desde la sección de presupuestos.');
        }
        
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
   * Abre una imagen en pantalla completa
   */
  async verImagenCompleta(foto: { id: string; url: string; descripcion?: string }) {
    if (!foto?.url) {
      console.error('No se puede mostrar la imagen: URL no válida');
      return;
    }

    const modal = await this.modalController.create({
      component: VerImagenModalComponent,
      componentProps: {
        imagen: foto
      },
      cssClass: 'modal-imagen-completa',
      backdropDismiss: true,
      showBackdrop: true
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    
    // Si se eliminó la imagen desde el modal, recargar el aviso
    if (role === 'confirm' && data?.accion === 'eliminar') {
      console.log('Imagen eliminada desde el modal');
      this.cargarAviso();
    }
  }

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
    // Si no hay estado, devolver clase por defecto
    if (!estado) {
      if (this.ultimoEstado !== undefined) {
        this.ultimoEstado = undefined;
        this.estadoClassCache = 'estado-pendiente';
      }
      return this.estadoClassCache;
    }
    
    // Solo recalcular si el estado ha cambiado
    if (this.ultimoEstado !== estado) {
      this.ultimoEstado = estado;
      
      // Convertir el estado a una clase CSS válida
      const estadoNormalizado = estado.toLowerCase().replace(/ /g, '-');
      this.estadoClassCache = `estado-${estadoNormalizado}`;
    }
    
    return this.estadoClassCache;
  }

  /**
   * Maneja las acciones ejecutadas desde el componente de flujo
   */
  onAccionFlujoEjecutada(resultado: { mensaje?: string; facturaId?: string }) {
    console.log('Acción de flujo ejecutada:', resultado);

    // Recargar aviso para reflejar cambios
    this.cargarAviso();

    // Actualizar estado automáticamente para verificar si se debe generar factura
    if (this.aviso?.id) {
      this.flujoAvisosService.actualizarEstadoConFacturaAutomatica(this.aviso.id).subscribe({
        next: (resultado) => {
          console.log('Estado del aviso actualizado automáticamente:', resultado.aviso.estado);
          
          // Si se generó una factura automáticamente, mostrar mensaje
          if (resultado.facturaGenerada) {
            console.log('💰 Factura generada automáticamente:', resultado.facturaGenerada);
            this.mostrarMensaje('Factura generada automáticamente para el aviso.', 'success');
          } else if (resultado.aviso.estado === 'Listo para facturar') {
            console.log('💰 Aviso listo para facturar - verificando si se generó factura automáticamente...');
            
            // Mostrar mensaje informativo al usuario
            setTimeout(() => {
              this.mostrarMensaje('El aviso está listo para facturar. Se generará la factura automáticamente si hay albaranes finalizados.', 'info');
            }, 1000);
          }
          
          // Recargar nuevamente para mostrar la factura generada si es el caso
          this.cargarAviso();
        },
        error: (error) => {
          console.error('Error al actualizar estado automático:', error);
        }
      });
    }

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
      
      // Manejar acciones específicas del modal
      if (role === 'confirm' && data) {
        console.log('Modal de albarán cerrado con datos:', data);
        
        if (data.accion === 'presupuesto_creado') {
          console.log('✅ Presupuesto creado desde el modal del albarán:', data.presupuesto);
          
          if (data.mensaje) {
            alert(data.mensaje);
          }
          
          // El modal ya navegó al presupuesto si el usuario quiso editarlo
          // Solo recargar si no se navegó
          if (!data.navegoAPresupuesto) {
            this.cargarAviso();
          }
          return;
        }
      }
      
      // Siempre recargar el aviso y el flujo cuando se cierra el modal
      // Esto asegura que se detecten cambios en el albarán
      console.log('Modal de albarán cerrado. Recargando datos...');
      
      // Recargar el aviso completo para obtener los datos más recientes
      this.cargarAviso();

      // Actualizar estado automáticamente para verificar si se debe generar factura
      if (this.aviso?.id) {
        this.flujoAvisosService.actualizarEstadoConFacturaAutomatica(this.aviso.id).subscribe({
          next: (resultado) => {
            console.log('Estado del aviso actualizado automáticamente después de cerrar albarán:', resultado.aviso.estado);
            
            // Si se generó una factura automáticamente, mostrar mensaje
            if (resultado.facturaGenerada) {
              console.log('💰 Factura generada automáticamente después de cerrar albarán:', resultado.facturaGenerada);
              this.mostrarMensaje('Factura generada automáticamente después de cerrar el albarán.', 'success');
            }
            
            // Recargar nuevamente para mostrar la factura generada si es el caso
            this.cargarAviso();
          },
          error: (error) => {
            console.error('Error al actualizar estado automático después de cerrar albarán:', error);
          }
        });
      }
    } catch (error) {
      console.error('Error al abrir el modal del albarán:', error);
      this.mostrarMensaje('Error al abrir el albarán. Por favor, inténtalo de nuevo.', 'error');
    }
  }

  /**
   * Verifica si un albarán tiene un presupuesto asociado
   */
  tienePresupuestoAsociado(albaran: any): boolean {
    if (!this.aviso?.presupuestos || this.aviso.presupuestos.length === 0) {
      return false;
    }
    
    // Buscar si hay algún presupuesto que tenga el ID de este albarán
    return this.aviso.presupuestos.some((presupuesto: any) => 
      presupuesto.albaran_id === albaran.id
    );
  }

  /**
   * Elimina un albarán
   */
  eliminarAlbaran(albaran: Albaran) {
    if (!albaran?.id) {
      console.error('No se puede eliminar el albarán: ID no válido');
      return;
    }

    // Verificar si tiene presupuesto asociado
    if (this.tienePresupuestoAsociado(albaran)) {
      alert('⚠️ No se puede eliminar este albarán porque tiene un presupuesto asociado.\n\nPrimero debes eliminar el presupuesto.');
      return;
    }

    // Confirmar antes de eliminar
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar el albarán #${albaran.id?.substring(0, 8)}?\n\nLos repuestos utilizados se devolverán automáticamente al inventario.\n\nEsta acción no se puede deshacer.`);

    if (confirmacion) {
      this.loading = true;
      
      // Usar el servicio de albaranes para eliminar
      this.albaranesService.eliminarAlbaran(albaran.id).subscribe({
        next: () => {
          console.log('Albarán eliminado exitosamente y repuestos devueltos al inventario');
          this.loading = false;
          
          // Mostrar mensaje de éxito
          alert('✅ Albarán eliminado exitosamente.\n\nLos repuestos utilizados han sido devueltos automáticamente al inventario.');
          
          // Recargar el aviso para actualizar la lista
          this.cargarAviso();
        },
        error: (error) => {
          console.error('Error al eliminar albarán:', error);
          this.loading = false;
          alert('Error al eliminar el albarán: ' + (error.message || 'Error desconocido'));
        }
      });
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
    } else if (tipo === 'info') {
      // Para información, mostrar alerta informativa
      console.log(`ℹ️ ${mensaje}`);
      alert(`ℹ️ ${mensaje}`);
    } else {
      // Para otros tipos, solo en consola
      console.log(`ℹ️ ${mensaje}`);
    }

    // Si tienes un servicio de notificaciones, lo usarías aquí
    // this.notificationService.show(mensaje, tipo);
  }
}
