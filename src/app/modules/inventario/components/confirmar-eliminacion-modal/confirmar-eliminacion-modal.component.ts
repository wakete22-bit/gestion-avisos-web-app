import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline, trashOutline, warningOutline, alertCircleOutline } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';
import { Inventario } from '../../models/inventario.model';

@Component({
  selector: 'app-confirmar-eliminacion-modal',
  templateUrl: './confirmar-eliminacion-modal.component.html',
  styleUrls: ['./confirmar-eliminacion-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, IonHeader, IonToolbar, IonContent, IonFooter, IonModal]
})
export class ConfirmarEliminacionModalComponent implements OnInit {
  @Input() producto!: Inventario;
  
  constructor(private modalController: ModalController) {
      addIcons({warningOutline,closeOutline,trashOutline});}

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
}
