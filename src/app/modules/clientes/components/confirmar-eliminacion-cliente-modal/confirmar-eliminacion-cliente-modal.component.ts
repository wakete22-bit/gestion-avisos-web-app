import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline, trashOutline, warningOutline, alertCircleOutline } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-confirmar-eliminacion-cliente-modal',
  templateUrl: './confirmar-eliminacion-cliente-modal.component.html',
  styleUrls: ['./confirmar-eliminacion-cliente-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, IonHeader, IonToolbar, IonContent, IonFooter, IonModal]
})
export class ConfirmarEliminacionClienteModalComponent implements OnInit {
  @Input() cliente!: Cliente;
  
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
   * Obtiene la clase CSS para el estado del cliente
   */
  getEstadoClass(esActivo: boolean): string {
    return esActivo ? 'activo' : 'inactivo';
  }
}
