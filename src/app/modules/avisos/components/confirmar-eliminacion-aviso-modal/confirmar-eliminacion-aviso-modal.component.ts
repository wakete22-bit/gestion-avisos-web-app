import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline, trashOutline, warningOutline, alertCircleOutline } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';
import { Aviso } from '../../models/aviso.model';

@Component({
  selector: 'app-confirmar-eliminacion-aviso-modal',
  templateUrl: './confirmar-eliminacion-aviso-modal.component.html',
  styleUrls: ['./confirmar-eliminacion-aviso-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, IonHeader, IonToolbar, IonContent, IonFooter, IonModal]
})
export class ConfirmarEliminacionAvisoModalComponent implements OnInit {
  @Input() aviso!: Aviso;
  @Input() dependencias?: string[];
  
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
   * Obtiene la clase CSS para el estado del aviso
   */
  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Pendiente':
        return 'pendiente';
      case 'En curso':
        return 'en-curso';
      case 'Pendiente de presupuesto':
        return 'pendiente-presupuesto';
      case 'Listo para facturar':
        return 'listo-para-facturar';
      case 'Completado':
        return 'completado';
      case 'Cancelado':
        return 'cancelado';
      default:
        return '';
    }
  }
}
