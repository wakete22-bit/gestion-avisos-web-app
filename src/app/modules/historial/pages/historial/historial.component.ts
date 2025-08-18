import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  alertCircle, 
  close, 
  eyeOutline, 
  mapOutline, 
  add, 
  addCircle, 
  addCircleOutline,
  searchOutline,
  locationOutline,
  calendarOutline,
  refreshOutline, alertCircleOutline, chevronBackOutline, chevronForwardOutline, timeOutline } from 'ionicons/icons';
import { Aviso } from 'src/app/modules/avisos/models/aviso.model';
import { AvisosService } from '../../../../core/services/avisos.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { Subject, takeUntil, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  standalone: true, 
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule
  ],
})
export class HistorialComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns: string[] = ['id', 'estado', 'nombre_cliente_aviso', 'descripcion_problema', 'fecha_creacion', 'es_urgente', 'direccion', 'acciones'];
  avisos: Aviso[] = [];
  loading = true; // Cambiar a true para mostrar carga inicial
  error: string | null = null;
  totalAvisos = 0;
  paginaActual = 1;
  porPagina = 10;
  busqueda = '';
  ordenarPor = 'fecha_creacion';
  orden: 'asc' | 'desc' = 'desc';
  
  private destroy$ = new Subject<void>();
  private dataLoaded = false;
  
  // Hacer Math disponible en el template
  Math = Math;

  constructor(
    private avisosService: AvisosService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private navigationService: NavigationService
  ) { 
    addIcons({searchOutline,eyeOutline,refreshOutline,alertCircleOutline,alertCircle,close,timeOutline,chevronBackOutline,chevronForwardOutline,mapOutline,addCircle,add,addCircleOutline,locationOutline,calendarOutline});
  }

  ngOnInit() {
    // Solo marcar que el componente está inicializado
    console.log('🔄 HistorialComponent inicializado');
    
    // Suscribirse a cambios de navegación
    this.navigationService.getCurrentRoute()
      .pipe(takeUntil(this.destroy$))
      .subscribe(route => {
        if (route.includes('/historial') && !this.dataLoaded) {
          console.log('🧭 Ruta de historial detectada, preparando carga...');
          // Pequeño delay para asegurar que el DOM esté listo
          setTimeout(() => {
            if (!this.dataLoaded && !this.destroy$.closed) {
              this.cargarHistorial();
            }
          }, 200);
        }
      });
  }

  ngAfterViewInit() {
    // Cargar datos después de que el DOM esté completamente renderizado
    console.log('📱 DOM renderizado, cargando historial...');
    
    // Esperar un poco más para asegurar que todo esté listo
    setTimeout(() => {
      if (!this.dataLoaded && !this.destroy$.closed) {
        this.cargarHistorial();
      }
    }, 300);
    
    // Forzar detección de cambios para asegurar que la UI se actualice
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    console.log('🧹 Componente HistorialComponent destruido');
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga el historial de avisos completados
   */
  cargarHistorial() {
    if (this.dataLoaded && this.avisos.length > 0) {
      console.log('📊 Datos ya cargados, saltando carga...');
      return;
    }

    this.loading = true;
    this.error = null;
    console.log('🔄 Iniciando carga de historial...');

    this.avisosService.getAvisosCompletados(
      this.paginaActual,
      this.porPagina,
      this.busqueda,
      this.ordenarPor,
      this.orden
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        console.log('✅ Historial cargado exitosamente:', response.avisos.length, 'avisos');
        this.avisos = response.avisos;
        this.totalAvisos = response.total;
        this.loading = false;
        this.dataLoaded = true;
        
        // Forzar detección de cambios
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Error al cargar historial:', error);
        this.error = 'Error al cargar el historial. Por favor, inténtalo de nuevo.';
        this.loading = false;
        
        // Forzar detección de cambios
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Refresca el historial
   */
  refrescarHistorial() {
    console.log('🔄 Refrescando historial...');
    this.dataLoaded = false; // Resetear flag para forzar recarga
    this.cargarHistorial();
  }

  /**
   * Cambia a la página especificada
   */
  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.obtenerTotalPaginas()) {
      this.paginaActual = pagina;
      this.cargarHistorial();
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

  /**
   * Navega al detalle de un aviso
   */
  verDetalleAviso(aviso: Aviso) {
    if (aviso.id) {
      this.router.navigate(['/ver-aviso', aviso.id]);
    }
  }

}
