import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline, trashOutline, warningOutline, alertCircleOutline } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonIcon, ModalController } from '@ionic/angular/standalone';
import { Cliente } from '../../models/cliente.model';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { UnifiedReconnectionService } from '../../../../core/services/unified-reconnection.service';

@Component({
  selector: 'app-confirmar-eliminacion-cliente-modal',
  templateUrl: './confirmar-eliminacion-cliente-modal.component.html',
  styleUrls: ['./confirmar-eliminacion-cliente-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, IonHeader, IonToolbar, IonContent, IonFooter]
})
export class ConfirmarEliminacionClienteModalComponent implements OnInit, OnDestroy {
  @Input() cliente!: Cliente;
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private modalController: ModalController,
    private unifiedReconnectionService: UnifiedReconnectionService
  ) {
    addIcons({ warningOutline, closeOutline, trashOutline });
  }

  ngOnInit() {
    addIcons({ closeOutline, trashOutline, warningOutline, alertCircleOutline });
    
    // 🔄 CONFIGURAR RECONEXIÓN AUTOMÁTICA
    this.unifiedReconnectionService.appResumed
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe((resumed) => {
        if (resumed) {
          console.log('🔄 ConfirmarEliminacionClienteModalComponent: App reanudada, actualizando datos del cliente...');
          // En este modal solo mostramos información, no necesitamos recargar datos
          // pero podríamos actualizar la información del cliente si fuera necesario
        }
      });

    // También suscribirse al estado de conexión
    this.unifiedReconnectionService.connectionState
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        console.log('🔄 ConfirmarEliminacionClienteModalComponent: Estado de conexión:', state);
        // No hay acciones específicas para este modal en caso de reconexión
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
   * Obtiene la clase CSS para el estado del cliente
   */
  getEstadoClass(esActivo: boolean): string {
    return esActivo ? 'activo' : 'inactivo';
  }
}
