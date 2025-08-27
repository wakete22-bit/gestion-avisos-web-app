import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  documentTextOutline, 
  checkmarkCircleOutline, 
  timeOutline, 
  receiptOutline,
  createOutline,
  eyeOutline,
  arrowForwardOutline,
  warningOutline,
  refreshOutline
} from 'ionicons/icons';
import { Subject, takeUntil } from 'rxjs';
import { FlujoAvisosService, FlujoEstado } from '../../../core/services/flujo-avisos.service';

@Component({
  selector: 'app-flujo-estado',
  templateUrl: './flujo-estado.component.html',
  styleUrls: ['./flujo-estado.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonIcon
  ]
})
export class FlujoEstadoComponent implements OnInit, OnDestroy {
  @Input() avisoId!: string;
  @Output() accionEjecutada = new EventEmitter<any>();

  estadoFlujo: FlujoEstado | null = null;
  accionesDisponibles: string[] = [];
  loading = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private flujoService: FlujoAvisosService) {
    addIcons({
      documentTextOutline,
      checkmarkCircleOutline,
      timeOutline,
      receiptOutline,
      createOutline,
      eyeOutline,
      arrowForwardOutline,
      warningOutline,
      refreshOutline
    });
  }

  ngOnInit() {
    if (this.avisoId) {
      this.cargarEstadoFlujo();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga el estado actual del flujo
   */
  cargarEstadoFlujo() {
    this.loading = true;
    this.error = null;

    this.flujoService.obtenerEstadoFlujo(this.avisoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (estado) => {
          this.estadoFlujo = estado;
          this.cargarAccionesDisponibles();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar estado del flujo:', error);
          this.error = 'Error al cargar el estado del flujo';
          this.loading = false;
        }
      });
  }

  /**
   * Carga las acciones disponibles
   */
  cargarAccionesDisponibles() {
    this.flujoService.obtenerAccionesDisponibles(this.avisoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (acciones) => {
          this.accionesDisponibles = acciones;
        },
        error: (error) => {
          console.error('Error al cargar acciones:', error);
        }
      });
  }

  /**
   * Método público para recargar el estado del flujo
   * Se puede llamar desde el componente padre
   */
  recargarFlujo() {
    console.log('🔄 Recargando flujo desde componente padre...');
    this.cargarEstadoFlujo();
  }

  /**
   * Ejecuta una acción del flujo
   */
  ejecutarAccion(accion: string) {
    this.loading = true;
    this.error = null;

    let accionObservable;

    switch (accion) {
      case 'crear_presupuesto':
        accionObservable = this.flujoService.ejecutarFlujoCompleto(this.avisoId, true);
        break;
      case 'aprobar_presupuesto':
        const presupuestoId = this.estadoFlujo?.resumen?.presupuesto?.id;
        if (presupuestoId) {
          accionObservable = this.flujoService.aprobarPresupuesto(presupuestoId);
        }
        break;
      case 'facturar_presupuesto':
        const presupuestoIdFacturar = this.estadoFlujo?.resumen?.presupuesto?.id;
        if (presupuestoIdFacturar) {
          accionObservable = this.flujoService.facturarPresupuesto(presupuestoIdFacturar);
        }
        break;
      case 'facturar_trabajos':
        accionObservable = this.flujoService.facturarTrabajos(this.avisoId);
        break;
      case 'completar_aviso':
        // Implementar completar aviso
        this.completarAviso();
        break;
      default:
        this.loading = false;
        return;
    }

    if (accionObservable) {
      accionObservable
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (resultado) => {
            console.log('Acción ejecutada:', resultado);
            this.accionEjecutada.emit(resultado);
            
            // Actualización automática: recargar estado y acciones inmediatamente
            this.cargarEstadoFlujo();
            this.cargarAccionesDisponibles();
            
            this.loading = false;
          },
          error: (error) => {
            console.error('Error al ejecutar acción:', error);
            this.error = `Error al ejecutar ${accion}: ${error.message}`;
            this.loading = false;
          }
        });
    }
  }

  /**
   * Inicia flujo directo sin presupuesto
   */
  iniciarFlujoDirecto() {
    this.loading = true;
    this.flujoService.ejecutarFlujoCompleto(this.avisoId, false)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resultado) => {
          console.log('Flujo directo iniciado:', resultado);
          this.accionEjecutada.emit(resultado);
          
          // Actualización automática: recargar estado y acciones inmediatamente
          this.cargarEstadoFlujo();
          this.cargarAccionesDisponibles();
          
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al iniciar flujo directo:', error);
          this.error = `Error al iniciar flujo directo: ${error.message}`;
          this.loading = false;
        }
      });
  }

  /**
   * Completa el aviso actual
   */
  completarAviso() {
    if (!this.avisoId) {
      console.error('No hay aviso seleccionado para completar');
      return;
    }

    console.log('🔄 Completando aviso:', this.avisoId);
    this.loading = true;

    this.flujoService.completarAviso(this.avisoId).subscribe({
      next: (resultado) => {
        console.log('✅ Aviso completado exitosamente:', resultado);
        this.loading = false;
        
        // Mostrar mensaje de éxito
        this.mostrarMensaje('Aviso completado exitosamente', 'success');
        
        // Actualización automática: recargar estado y acciones inmediatamente
        this.cargarEstadoFlujo();
        this.cargarAccionesDisponibles();
        
        // Emitir evento para que el componente padre sepa que se completó
        this.accionEjecutada.emit(resultado);
      },
      error: (error) => {
        console.error('❌ Error al completar aviso:', error);
        this.loading = false;
        
        // Mostrar mensaje de error
        this.mostrarMensaje(
          error.message || 'Error al completar el aviso. Verifica que haya trabajos realizados y facturas generadas.',
          'error'
        );
      }
    });
  }

  /**
   * Muestra un mensaje al usuario
   */
  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error' | 'info' = 'info') {
    // Aquí podrías implementar un sistema de notificaciones
    // Por ahora, usamos console.log
    console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
    
    // Si tienes un servicio de notificaciones, lo usarías aquí
    // this.notificationService.show(mensaje, tipo);
  }

  /**
   * Obtiene el icono para el estado actual
   */
  getEstadoIcon(): string {
    if (!this.estadoFlujo) return 'time-outline';
    
    switch (this.estadoFlujo.estadoActual) {
      case 'No visitado':
        return 'time-outline';
      case 'Visitado pendiente':
        return 'eye-outline';
      case 'Pendiente de presupuesto':
        return 'document-text-outline';
      case 'En curso':
        return 'create-outline';
      case 'Completado':
        return 'checkmark-circle-outline';
      default:
        return 'time-outline';
    }
  }

  /**
   * Obtiene la clase CSS para el estado
   */
  getEstadoClass(): string {
    if (!this.estadoFlujo) return 'pendiente';
    
    switch (this.estadoFlujo.estadoActual) {
      case 'Pendiente':
        return 'pendiente';
      case 'Pendiente de presupuesto':
        return 'presupuesto';
      case 'En curso':
        return 'en-curso';
      case 'Listo para facturar':
        return 'listo-facturar';
      case 'Completado':
        return 'completado';
      case 'Cancelado':
        return 'cancelado';
      default:
        return 'pendiente';
    }
  }

  /**
   * Obtiene el texto descriptivo para una acción
   */
  getAccionTexto(accion: string): string {
    switch (accion) {
      case 'crear_presupuesto':
        return 'Crear Presupuesto';
      case 'aprobar_presupuesto':
        return 'Aprobar Presupuesto';
      case 'facturar_presupuesto':
        return 'Generar Factura desde Presupuesto';
      case 'facturar_trabajos':
        return 'Facturar Trabajos Realizados';
      case 'completar_aviso':
        return 'Completar Aviso';
      default:
        return accion;
    }
  }

  /**
   * Obtiene el icono para una acción
   */
  getAccionIcon(accion: string): string {
    switch (accion) {
      case 'crear_presupuesto':
        return 'document-text-outline';
      case 'aprobar_presupuesto':
        return 'checkmark-circle-outline';
      case 'facturar_presupuesto':
      case 'facturar_trabajos':
        return 'receipt-outline';
      case 'completar_aviso':
        return 'checkmark-circle-outline';
      default:
        return 'arrow-forward-outline';
    }
  }

  /**
   * Recarga el estado del flujo
   */
  recargar() {
    this.cargarEstadoFlujo();
  }
} 