import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonContent, IonIcon, ModalController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { 
  gridOutline, 
  notificationsOutline, 
  timeOutline, 
  cubeOutline, 
  documentTextOutline, 
  peopleOutline, 
  settingsOutline, 
  personCircleOutline, 
  receipt, 
  hourglass, 
  alertCircleOutline, 
  hourglassOutline, 
  warningOutline, 
  cashOutline, 
  warning, 
  document, 
  alertCircle, 
  close, 
  eyeOutline,
  searchOutline,
  locationOutline,
  calendarOutline,
  createOutline, refreshOutline, phonePortraitOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

// Importar servicios
import { DashboardService, DashboardData } from '../core/services/dashboard.service';
import { AvisosService } from '../core/services/avisos.service';
import { FacturasService } from '../modules/facturas/services/facturas.service';
import { PresupuestosService } from '../modules/presupuestos/services/presupuestos.service';

// Importar solo el servicio de reconexión
import { ReconnectionService } from '../core/services/reconnection.service';

addIcons({
  'grid-outline': gridOutline,
  'notifications-outline': notificationsOutline,
  'time-outline': timeOutline,
  'cube-outline': cubeOutline,  
  'document-text-outline': documentTextOutline,
  'cash-outline': cashOutline,
  'people-outline': peopleOutline,
  'settings-outline': settingsOutline,
  'person-circle-outline': personCircleOutline,
  'receipt': receipt,
  'hourglass-outline': hourglassOutline,
  'alert-circle-outline': alertCircleOutline,
  'warning': warning,
  'document': document,
  'alert-circle': alertCircle,
  'search-outline': searchOutline,
  'location-outline': locationOutline,
  'calendar-outline': calendarOutline,
  'create-outline': createOutline
});

export interface Aviso {
  id: string;
  numero: string;
  estado: string;
  nombre: string;
  detalle: string;
  fecha: string;
  urgente: boolean;
  direccion: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, 
    IonIcon, 
    MatTableModule, 
    MatIconModule
  ],
})
export class HomePage implements OnInit, OnDestroy {
  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'urgente', 'direccion', 'acciones'];
  
  // Datos del dashboard
  dashboardData: DashboardData | null = null;
  loading = true;
  error = false;
  
  // Datos de avisos
  avisos: Aviso[] = [];
  
  // Totales calculados
  totalFacturasPendientes = 0;
  totalPresupuestosPendientes = 0;
  
  // Subject para manejar la destrucción del componente
  private destroy$ = new Subject<void>();
  
  // Variable para controlar el debounce de reconexión
  private lastReconnectionTime = 0;
  private readonly RECONNECTION_DEBOUNCE_MS = 5000; // 5 segundos

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private avisosService: AvisosService,
    private facturasService: FacturasService,
    private presupuestosService: PresupuestosService,
    private modalController: ModalController,
    // Solo inyectar el servicio de reconexión
    private reconnectionService: ReconnectionService
  ) {
    addIcons({hourglassOutline,alertCircleOutline,refreshOutline,warning,receipt,document,alertCircle,searchOutline,close,eyeOutline,createOutline,phonePortraitOutline,locationOutline,calendarOutline});
  }

  ngOnInit() {
    // Suscribirse a reconexiones para recargar datos automáticamente
    // Agregar debounce para evitar recargas excesivas
    this.reconnectionService.appResumed
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(1000), // Esperar 1 segundo antes de procesar
        distinctUntilChanged() // Solo procesar si el valor cambió
      )
      .subscribe(() => {
        // Verificar si han pasado al menos 5 segundos desde la última reconexión
        const now = Date.now();
        if (now - this.lastReconnectionTime >= this.RECONNECTION_DEBOUNCE_MS) {
          console.log('🔄 HomePage: App reanudada, recargando dashboard...');
          this.lastReconnectionTime = now;
          this.cargarDashboard();
        } else {
          console.log('🔄 HomePage: Reconexión ignorada por debounce (última hace', 
            Math.round((now - this.lastReconnectionTime) / 1000), 'segundos)');
        }
      });

    this.cargarDashboard();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga los datos del dashboard
   */
  cargarDashboard() {
    this.loading = true;
    this.error = false;

    this.dashboardService.getDashboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: DashboardData) => {
          this.dashboardData = data;
          this.procesarDatosDashboard(data);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar dashboard:', error);
          this.error = true;
          this.loading = false;
        }
      });
  }

  /**
   * Procesa los datos del dashboard para mostrarlos en la vista
   */
  private procesarDatosDashboard(data: DashboardData) {
    // Procesar avisos recientes
    this.avisos = data.avisosRecientes.map(aviso => ({
      id: aviso.id,
      numero: aviso.id.substring(0, 8).toUpperCase(),
      estado: aviso.estado,
      nombre: aviso.nombre_cliente_aviso,
      detalle: aviso.descripcion_problema,
      fecha: new Date(aviso.fecha_creacion).toLocaleDateString('es-ES'),
      urgente: aviso.es_urgente || false,
      direccion: aviso.direccion_cliente_aviso
    }));

    // Calcular totales
    this.totalFacturasPendientes = this.dashboardService.calcularTotalFacturasPendientes(data.facturasPendientes);
    this.totalPresupuestosPendientes = this.dashboardService.calcularTotalPresupuestosPendientes(data.presupuestosPendientes);
  }

  /**
   * Refresca los datos del dashboard
   */
  refreshDashboard() {
    this.cargarDashboard();
  }

  /**
   * Navega a la página de avisos
   */
  irAAvisos() {
    this.router.navigate(['/avisos']);
  }

  /**
   * Navega a la página de facturas
   */
  irAFacturas() {
    this.router.navigate(['/facturas']);
  }

  /**
   * Navega a la página de presupuestos
   */
  irAPresupuestos() {
    this.router.navigate(['/presupuestos']);
  }

  /**
   * Ver detalles de un aviso
   */
  verAviso(aviso: Aviso) {
    this.router.navigate(['/avisos'], { queryParams: { id: aviso.id } });
  }

  /**
   * Editar un aviso
   */
  editarAviso(aviso: Aviso) {
    this.router.navigate(['/avisos'], { queryParams: { id: aviso.id, edit: 'true' } });
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
   * Obtiene las estadísticas del dashboard
   */
  get stats() {
    return this.dashboardData?.stats;
  }

  /**
   * Obtiene las facturas pendientes
   */
  get facturasPendientes() {
    return this.dashboardData?.facturasPendientes || [];
  }

  /**
   * Obtiene los presupuestos pendientes
   */
  get presupuestosPendientes() {
    return this.dashboardData?.presupuestosPendientes || [];
  }

}
