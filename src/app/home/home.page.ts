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

// Importar el servicio unificado de reconexión
import { UnifiedReconnectionService } from '../core/services/unified-reconnection.service';

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

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private avisosService: AvisosService,
    private facturasService: FacturasService,
    private presupuestosService: PresupuestosService,
    private modalController: ModalController,
    // Inyectar el servicio unificado de reconexión
    private unifiedReconnectionService: UnifiedReconnectionService
  ) {
    addIcons({hourglassOutline,alertCircleOutline,refreshOutline,warning,receipt,document,alertCircle,searchOutline,close,eyeOutline,createOutline,phonePortraitOutline,locationOutline,calendarOutline});
  }

  ngOnInit() {
    // Suscribirse al servicio unificado de reconexión para recargar datos automáticamente
    // El nuevo servicio ya incluye debounce inteligente
    this.unifiedReconnectionService.appResumed
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged() // Solo procesar si el valor cambió
      )
      .subscribe((resumed) => {
        if (resumed) {
          console.log('🔄 HomePage: App reanudada exitosamente, recargando dashboard...');
          this.cargarDashboard();
        }
      });

    // También suscribirse al estado de conexión para mostrar feedback al usuario
    this.unifiedReconnectionService.connectionState
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        console.log('🔄 HomePage: Estado de conexión:', state);
        // Aquí podrías mostrar un indicador visual del estado de conexión
        if (state === 'connected' && this.error) {
          // Si había error y ahora está conectado, recargar
          this.cargarDashboard();
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
    console.log('🏠 HomePage: INICIANDO cargarDashboard...');
    this.loading = true;
    this.error = false;

    console.log('🏠 HomePage: Llamando a dashboardService.getDashboardData()...');
    this.dashboardService.getDashboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: DashboardData) => {
          console.log('✅ HomePage: Datos recibidos del DashboardService:', data);
          console.log('🏠 HomePage: Avisos recientes count:', data.avisosRecientes?.length || 0);
          console.log('🏠 HomePage: Stats:', data.stats);
          
          this.dashboardData = data;
          console.log('🏠 HomePage: Procesando datos del dashboard...');
          this.procesarDatosDashboard(data);
          this.loading = false;
          console.log('✅ HomePage: Dashboard cargado exitosamente, loading=false');
        },
        error: (error) => {
          console.error('❌ HomePage: ERROR al cargar dashboard:', {
            message: error.message,
            stack: error.stack,
            fullError: error
          });
          this.error = true;
          this.loading = false;
          console.log('❌ HomePage: Error establecido, loading=false');
        }
      });
  }

  /**
   * Procesa los datos del dashboard para mostrarlos en la vista
   */
  private procesarDatosDashboard(data: DashboardData) {
    console.log('🏠 HomePage: INICIANDO procesarDatosDashboard con:', data);
    
    // Procesar avisos recientes
    console.log('🏠 HomePage: Procesando avisos recientes, cantidad:', data.avisosRecientes?.length || 0);
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
    console.log('🏠 HomePage: Avisos procesados:', this.avisos);

    // Calcular totales
    console.log('🏠 HomePage: Calculando totales de facturas y presupuestos...');
    this.totalFacturasPendientes = this.dashboardService.calcularTotalFacturasPendientes(data.facturasPendientes);
    this.totalPresupuestosPendientes = this.dashboardService.calcularTotalPresupuestosPendientes(data.presupuestosPendientes);
    
    console.log('✅ HomePage: procesarDatosDashboard completado:', {
      avisosCount: this.avisos.length,
      totalFacturas: this.totalFacturasPendientes,
      totalPresupuestos: this.totalPresupuestosPendientes
    });
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
