import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { addIcons } from 'ionicons';
import { UnifiedReconnectionService } from '../../../../core/services/unified-reconnection.service';
import { 
  mapOutline,
  addCircle,
  alertCircle,
  close,
  eyeOutline,
  add,
  addCircleOutline, 
  searchOutline, hourglassOutline, alertCircleOutline, refreshOutline, createOutline, documentOutline, trashOutline } from 'ionicons/icons';

import { PresupuestosService, Presupuesto, PresupuestoResponse } from '../../services/presupuestos.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule
  ],
})
export class PresupuestosComponent implements OnInit, OnDestroy {
  
  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'pvp', 'acciones'];
  presupuestos: Presupuesto[] = [];
  loading = false;
  error = false;
  totalPresupuestos = 0;
  paginaActual = 1;
  porPagina = 10;

  // Subject para manejar la destrucción del componente
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private presupuestosService: PresupuestosService,
    private unifiedReconnectionService: UnifiedReconnectionService
  ) { 
    addIcons({hourglassOutline,alertCircleOutline,refreshOutline,searchOutline,addCircle,eyeOutline,createOutline,trashOutline,documentOutline,mapOutline,alertCircle,close,add,addCircleOutline});
  }

  ngOnInit() {
    // 🔄 CONFIGURAR RECONEXIÓN AUTOMÁTICA (patrón del dashboard)
    this.unifiedReconnectionService.appResumed
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe((resumed) => {
        if (resumed) {
          console.log('🔄 PresupuestosComponent: App reanudada, recargando presupuestos...');
          this.cargarPresupuestos();
        }
      });

    // También suscribirse al estado de conexión
    this.unifiedReconnectionService.connectionState
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        console.log('🔄 PresupuestosComponent: Estado de conexión:', state);
        if (state === 'connected' && this.error) {
          this.cargarPresupuestos();
        }
      });

    this.cargarPresupuestos();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga los presupuestos desde el backend
   */
  cargarPresupuestos() {
    this.loading = true;
    this.error = false;
    // 🚀 USAR FETCH DIRECTO para evitar bloqueos del cliente Supabase
    this.presupuestosService.getPresupuestosDirect(this.paginaActual, this.porPagina)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PresupuestoResponse) => {
          this.presupuestos = response.presupuestos;
          this.totalPresupuestos = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar presupuestos:', error);
          this.error = true;
          this.loading = false;
        }
      });
  }

  /**
   * Refresca los presupuestos
   */
  refreshPresupuestos() {
    this.cargarPresupuestos();
  }

  /**
   * Navega a crear nuevo presupuesto
   */
  crearPresupuesto() {
    // Navegar sin parámetros para permitir selección de aviso
    this.router.navigate(['/presupuestos/crear']);
  }

  /**
   * Eliminar un presupuesto
   */
  eliminarPresupuesto(presupuesto: Presupuesto) {
    if (confirm(`¿Estás seguro de que quieres eliminar el presupuesto #${this.getNumeroPresupuesto(presupuesto)}?\n\nEsta acción no se puede deshacer.`)) {
      this.loading = true;
      
      this.presupuestosService.eliminarPresupuestoDirect(presupuesto.id).subscribe({
        next: () => {
          console.log('✅ Presupuesto eliminado exitosamente con FETCH DIRECTO');
          this.loading = false;
          this.cargarPresupuestos(); // Recargar la lista
        },
        error: (error) => {
          console.error('❌ Error al eliminar presupuesto con FETCH DIRECTO:', error);
          this.loading = false;
          alert('Error al eliminar el presupuesto: ' + (error.message || 'Error desconocido'));
        }
      });
    }
  }

  /**
   * Ver detalles de un presupuesto
   */
  verPresupuesto(presupuesto: Presupuesto) {
    console.log('Navegando a presupuesto:', presupuesto.id);
    this.router.navigate(['/presupuestos', presupuesto.id]);
  }

  /**
   * Editar un presupuesto
   */
  editarPresupuesto(presupuesto: Presupuesto) {
    this.router.navigate(['/presupuestos/crear'], { queryParams: { id: presupuesto.id, edit: 'true' } });
  }

  /**
   * Formatea un número como moneda
   */
  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor);
  }

  /**
   * Obtiene el estado de carga
   */
  get isLoading(): boolean {
    return this.loading;
  }

  /**
   * Obtiene si hay error
   */
  get hasError(): boolean {
    return this.error;
  }

  /**
   * Obtiene el número de presupuesto formateado
   */
  getNumeroPresupuesto(presupuesto: Presupuesto): string {
    return presupuesto.id.substring(0, 8).toUpperCase();
  }

  /**
   * Obtiene el nombre del cliente del presupuesto
   */
  getNombreCliente(presupuesto: Presupuesto): string {
    return presupuesto.aviso?.nombre_cliente_aviso || 'N/A';
  }

  /**
   * Obtiene la fecha formateada
   */
  getFechaFormateada(presupuesto: Presupuesto): string {
    return new Date(presupuesto.fecha_creacion).toLocaleDateString('es-ES');
  }

  /**
   * Obtiene el importe formateado
   */
  getImporteFormateado(presupuesto: Presupuesto): string {
    return this.formatearMoneda(presupuesto.total_estimado || 0);
  }

  /**
   * Maneja las acciones ejecutadas desde el botón de flujo
   */
  onAccionFlujoEjecutada(resultado: any) {
    console.log('Acción de flujo ejecutada desde presupuestos:', resultado);
    
    // Recargar presupuestos para reflejar cambios
    this.cargarPresupuestos();
    
    // Mostrar mensaje de éxito (opcional)
    if (resultado.mensaje) {
      console.log('Mensaje de éxito:', resultado.mensaje);
      // Aquí puedes implementar un toast o notificación
    }
  }
}
