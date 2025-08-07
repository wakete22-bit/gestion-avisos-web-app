import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton, PopoverController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  ellipsisHorizontalOutline,
  documentTextOutline, 
  checkmarkCircleOutline, 
  receiptOutline,
  createOutline,
  eyeOutline,
  arrowForwardOutline,
  warningOutline
} from 'ionicons/icons';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { FlujoAvisosService } from '../../../core/services/flujo-avisos.service';

@Component({
  selector: 'app-flujo-boton',
  templateUrl: './flujo-boton.component.html',
  styleUrls: ['./flujo-boton.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonIcon,
    IonButton
  ]
})
export class FlujoBotonComponent implements OnInit, OnDestroy {
  @Input() avisoId!: string;
  @Input() size: 'small' | 'medium' = 'small';
  @Input() showText = false;
  @Output() accionEjecutada = new EventEmitter<any>();

  accionesDisponibles: string[] = [];
  loading = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private flujoService: FlujoAvisosService,
    private popoverController: PopoverController
  ) {
    addIcons({
      ellipsisHorizontalOutline,
      documentTextOutline,
      checkmarkCircleOutline,
      receiptOutline,
      createOutline,
      eyeOutline,
      arrowForwardOutline,
      warningOutline
    });
  }

  ngOnInit() {
    if (this.avisoId) {
      this.cargarAccionesDisponibles();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga las acciones disponibles para el aviso
   */
  cargarAccionesDisponibles() {
    this.loading = true;
    this.error = null;

    this.flujoService.obtenerAccionesDisponibles(this.avisoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (acciones) => {
          this.accionesDisponibles = acciones;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar acciones:', error);
          this.error = 'Error al cargar acciones';
          this.loading = false;
        }
      });
  }

  /**
   * Ejecuta la acción más relevante disponible
   */
  ejecutarAccionPrimaria() {
    if (this.accionesDisponibles.length === 0) return;
    
    const accionPrimaria = this.accionesDisponibles[0];
    this.ejecutarAccion(accionPrimaria);
  }

  /**
   * Ejecuta una acción específica
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
        // Obtener presupuesto ID desde el flujo
        accionObservable = this.flujoService.obtenerEstadoFlujo(this.avisoId).pipe(
          takeUntil(this.destroy$),
          switchMap(estado => {
            const presupuestoId = estado.resumen?.presupuesto?.id;
            if (presupuestoId) {
              return this.flujoService.aprobarPresupuesto(presupuestoId);
            }
            throw new Error('No se encontró presupuesto para aprobar');
          })
        );
        break;
      case 'facturar_presupuesto':
        accionObservable = this.flujoService.obtenerEstadoFlujo(this.avisoId).pipe(
          takeUntil(this.destroy$),
          switchMap(estado => {
            const presupuestoId = estado.resumen?.presupuesto?.id;
            if (presupuestoId) {
              return this.flujoService.facturarPresupuesto(presupuestoId);
            }
            throw new Error('No se encontró presupuesto para facturar');
          })
        );
        break;
      case 'facturar_trabajos':
        accionObservable = this.flujoService.facturarTrabajos(this.avisoId);
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
            this.cargarAccionesDisponibles(); // Recargar acciones
            this.loading = false;
          },
          error: (error) => {
            console.error('Error al ejecutar acción:', error);
            this.error = `Error: ${error.message}`;
            this.loading = false;
          }
        });
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
      default:
        return 'arrow-forward-outline';
    }
  }

  /**
   * Obtiene el texto para una acción
   */
  getAccionTexto(accion: string): string {
    switch (accion) {
      case 'crear_presupuesto':
        return 'Crear Presupuesto';
      case 'aprobar_presupuesto':
        return 'Aprobar';
      case 'facturar_presupuesto':
        return 'Generar Factura';
      case 'facturar_trabajos':
        return 'Facturar Trabajos';
      default:
        return 'Acción';
    }
  }

  /**
   * Obtiene el color para una acción
   */
  getAccionColor(accion: string): string {
    switch (accion) {
      case 'crear_presupuesto':
        return 'primary';
      case 'aprobar_presupuesto':
        return 'success';
      case 'facturar_presupuesto':
      case 'facturar_trabajos':
        return 'warning';
      default:
        return 'medium';
    }
  }

  /**
   * Verifica si hay acciones disponibles
   */
  get tieneAcciones(): boolean {
    return this.accionesDisponibles.length > 0;
  }

  /**
   * Obtiene la acción primaria
   */
  get accionPrimaria(): string | null {
    return this.accionesDisponibles.length > 0 ? this.accionesDisponibles[0] : null;
  }
} 