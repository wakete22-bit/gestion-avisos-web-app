import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline, trashOutline, warningOutline, alertCircleOutline } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { Factura } from '../../models/factura.model';
import { UnifiedReconnectionService } from '../../../../core/services/unified-reconnection.service';

@Component({
  selector: 'app-confirmar-eliminacion-factura-modal',
  templateUrl: './confirmar-eliminacion-factura-modal.component.html',
  styleUrls: ['./confirmar-eliminacion-factura-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, IonHeader, IonToolbar, IonContent, IonFooter]
})
export class ConfirmarEliminacionFacturaModalComponent implements OnInit, OnDestroy {
  @Input() factura!: Factura;
  
  private destroy$ = new Subject<void>();

  constructor(
    private modalController: ModalController,
    private unifiedReconnectionService: UnifiedReconnectionService
  ) {
    addIcons({ warningOutline, closeOutline, trashOutline });
  }

  ngOnInit() {
    addIcons({ closeOutline, trashOutline, warningOutline, alertCircleOutline });
    
    console.log('🔄 ConfirmarEliminacionFacturaModalComponent inicializado');

    // Patrón de reconexión
    this.unifiedReconnectionService.appResumed
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe((resumed) => {
        if (resumed) {
          console.log('🔄 ConfirmarEliminacionFacturaModalComponent: App reanudada exitosamente');
          // No hay datos que recargar en este modal
        }
      });

    this.unifiedReconnectionService.connectionState
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        console.log('🔄 ConfirmarEliminacionFacturaModalComponent: Estado de conexión:', state);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async confirmarEliminacion() {
    await this.modalController.dismiss({ confirmado: true }, 'confirm');
  }

  async cancelarEliminacion() {
    await this.modalController.dismiss({ confirmado: false }, 'cancel');
  }

  async cerrarModal() {
    await this.modalController.dismiss({ confirmado: false }, 'cancel');
  }

  /**
   * Obtiene la clase CSS para el estado de la factura
   */
  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Pendiente':
        return 'pendiente';
      case 'En curso':
        return 'en-curso';
      case 'Completado':
        return 'completado';
      default:
        return '';
    }
  }
}
