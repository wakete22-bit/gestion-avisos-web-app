import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, ModalController } from '@ionic/angular/standalone';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { 
  mapOutline,
  addCircle, 
  alertCircle, 
  close, 
  eyeOutline, 
  add, 
  addCircleOutline, 
  searchOutline,
  receipt,
  hourglassOutline,
  warning,
  document, receiptOutline, refreshOutline, alertCircleOutline, trashOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { FacturasService } from '../../services/facturas.service';
import { Factura, FacturaResponse } from '../../models/factura.model';
import { ConfirmarEliminacionFacturaModalComponent } from '../../components/confirmar-eliminacion-factura-modal/confirmar-eliminacion-factura-modal.component';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { UnifiedReconnectionService } from '../../../../core/services/unified-reconnection.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule
  ],
})
export class FacturasComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'pvp'];
  facturas: Factura[] = [];
  loading = true; // Cambiar a true para mostrar carga inicial
  error: string | null = null;
  totalFacturas = 0;
  paginaActual = 1;
  porPagina = 10;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private facturasService: FacturasService,
    private unifiedReconnectionService: UnifiedReconnectionService,
    private modalController: ModalController
  ) { 
    addIcons({refreshOutline,alertCircleOutline,searchOutline,addCircle,eyeOutline,receiptOutline,mapOutline,alertCircle,close,add,addCircleOutline,receipt,hourglassOutline,warning,document,trashOutline});
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
          console.log('🔄 FacturasComponent: App reanudada, recargando facturas...');
          this.cargarFacturas();
        }
      });

    // También suscribirse al estado de conexión
    this.unifiedReconnectionService.connectionState
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        console.log('🔄 FacturasComponent: Estado de conexión:', state);
        if (state === 'connected' && this.error) {
          this.cargarFacturas();
        }
      });

    this.cargarFacturas();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarFacturas() {
    this.loading = true;
    this.error = null;
    // 🚀 USAR FETCH DIRECTO para evitar bloqueos del cliente Supabase
    this.facturasService.getFacturasDirect(this.paginaActual, this.porPagina)
      .subscribe({
        next: (response: FacturaResponse) => {
          this.facturas = response.facturas;
          this.totalFacturas = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar facturas:', error);
          this.error = 'Error al cargar las facturas. Por favor, inténtalo de nuevo.';
          this.loading = false;
        }
      });
  }

  abrirCrearFactura() {
    this.router.navigate(['/crear-factura']);
  }

  verFactura(id: string) {
    this.router.navigate(['/facturas', id]);
  }

  cambiarPagina(pagina: number) {
    if (pagina !== this.paginaActual) {
      this.paginaActual = pagina;
      this.cargarFacturas();
    }
  }

  // Función helper para manejar el cambio de página de forma segura
  onCambiarPagina(pagina: number | string) {
    if (typeof pagina === 'number') {
      this.cambiarPagina(pagina);
    }
  }

  getPaginas(): (number | string)[] {
    const totalPaginas = Math.ceil(this.totalFacturas / this.porPagina);
    const paginas: (number | string)[] = [];
    
    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      if (this.paginaActual <= 4) {
        for (let i = 1; i <= 5; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      } else if (this.paginaActual >= totalPaginas - 3) {
        paginas.push(1);
        paginas.push('...');
        for (let i = totalPaginas - 4; i <= totalPaginas; i++) {
          paginas.push(i);
        }
      } else {
        paginas.push(1);
        paginas.push('...');
        for (let i = this.paginaActual - 1; i <= this.paginaActual + 1; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      }
    }
    
    return paginas;
  }

  // Propiedad para usar Math en el template
  get Math() {
    return Math;
  }

  /**
   * Elimina una factura con confirmación
   */
  async eliminarFactura(factura: Factura) {
    // Mostrar modal de confirmación antes de eliminar
    const modal = await this.modalController.create({
      component: ConfirmarEliminacionFacturaModalComponent,
      cssClass: 'modal-confirmar-eliminacion',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        factura: factura
      }
    });
    
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data?.confirmado) {
      this.loading = true;
      this.error = null;

      this.facturasService.eliminarFacturaDirect(factura.id!)
        .subscribe({
          next: () => {
            console.log('✅ Factura eliminada exitosamente con FETCH DIRECTO');
            this.loading = false;
            
            // Recargar la lista de facturas
            this.cargarFacturas();
            
            // Mostrar mensaje de éxito
            console.log('✅ Factura eliminada. El aviso asociado se actualizará automáticamente.');
            
            // Mostrar mensaje de éxito (opcional)
            // Puedes implementar un toast o notificación aquí
          },
          error: (error) => {
            console.error('❌ Error al eliminar factura con FETCH DIRECTO:', error);
            
            // Mostrar mensaje de error más específico
            if (error.message && error.message.includes('23503')) {
              this.error = 'No se puede eliminar la factura porque tiene datos relacionados. Contacta al administrador.';
            } else {
              this.error = 'Error al eliminar la factura. Por favor, inténtalo de nuevo.';
            }
            this.loading = false;
          }
        });
    }
  }
}
