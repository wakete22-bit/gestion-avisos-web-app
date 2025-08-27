import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline, trashOutline, warningOutline, alertCircleOutline } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';
import { Factura } from '../../models/factura.model';

@Component({
  selector: 'app-confirmar-eliminacion-factura-modal',
  templateUrl: './confirmar-eliminacion-factura-modal.component.html',
  styleUrls: ['./confirmar-eliminacion-factura-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, IonHeader, IonToolbar, IonContent, IonFooter, IonModal]
})
export class ConfirmarEliminacionFacturaModalComponent implements OnInit {
  @Input() factura!: Factura;
  
  constructor(private modalController: ModalController) {
    addIcons({ warningOutline, closeOutline, trashOutline });
  }

  ngOnInit() {
    addIcons({ closeOutline, trashOutline, warningOutline, alertCircleOutline });
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
