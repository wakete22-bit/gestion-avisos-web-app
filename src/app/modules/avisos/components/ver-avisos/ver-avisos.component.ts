import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonSegment, IonSegmentButton, ModalController } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { close, pencilOutline, mapOutline, navigate, person, call, mail, add, addCircle, gridOutline, listOutline, chevronDownOutline, eyeOutline, arrowBackOutline, refreshOutline, alertCircleOutline, ellipsisVertical, ellipsisVerticalOutline, trashOutline, constructOutline } from 'ionicons/icons';
import { AvisosService } from '../../../../core/services/avisos.service';
import { TrabajosService } from '../../../../core/services/trabajos.service';
import { Aviso } from '../../models/aviso.model';
import { TrabajoRealizado } from '../../models/trabajo-realizado.model';
import { CrearTrabajosRealizadosComponent } from '../crear-trabajos-realizados/crear-trabajos-realizados.component';
import { FlujoEstadoComponent } from '../../../../shared/components/flujo-estado/flujo-estado.component';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';

addIcons({ close, pencilOutline, navigate, person, call, mail, mapOutline, arrowBackOutline });

@Component({
  selector: 'app-ver-avisos',
  templateUrl: './ver-avisos.component.html',
  styleUrls: ['./ver-avisos.component.scss'],
  standalone: true, 
    imports: [CommonModule, IonIcon, IonSegment, IonSegmentButton, FlujoEstadoComponent],
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
    private modalController: ModalController
  ) {
    addIcons({arrowBackOutline,refreshOutline,alertCircleOutline,close,pencilOutline,navigate,person,call,mail,gridOutline,listOutline,addCircle,trashOutline,constructOutline,chevronDownOutline,eyeOutline,ellipsisVerticalOutline,ellipsisVertical,add,mapOutline});
  }

  ngOnInit() {
    this.cargarAviso();
  }

  /**
   * Carga los trabajos realizados del aviso
   */
  cargarTrabajos() {
    if (!this.aviso?.id) return;

    this.loadingTrabajos = true;
    this.trabajosService.getTrabajosAviso(this.aviso.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.trabajosRealizados = response.trabajos;
          this.loadingTrabajos = false;
        },
        error: (error) => {
          console.error('Error al cargar trabajos:', error);
          this.loadingTrabajos = false;
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
    this.loading = true;
    this.error = null;

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const avisoId = params['id-aviso'];
        if (avisoId) {
          this.avisosService.getAviso(avisoId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (aviso) => {
                this.aviso = aviso;
                this.loading = false;
                // Cargar trabajos realizados después de cargar el aviso
                this.cargarTrabajos();
              },
              error: (error) => {
                console.error('Error al cargar el aviso:', error);
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
      // Implementar edición del aviso
      console.log('Editar aviso:', this.aviso.id);
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
   * Maneja las acciones ejecutadas desde el componente de flujo
   */
  onAccionFlujoEjecutada(resultado: any) {
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
}
