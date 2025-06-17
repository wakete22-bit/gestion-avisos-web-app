import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, ModalController } from '@ionic/angular/standalone';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { alertCircle, close, eyeOutline, mapOutline, add, addCircle, addCircleOutline } from 'ionicons/icons';
import { CrearAvisosModalComponent } from '../../components/crear-avisos-modal/crear-avisos-modal.component';

export interface Aviso {
  numero: string;
  estado: string;
  nombre: string;
  detalle: string;
  fecha: string;
  urgente: boolean;
  direccion: string;
}

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule,
    CrearAvisosModalComponent
  ],
})
export class AvisosComponent {
  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'urgente', 'direccion', 'acciones'];
  avisos: Aviso[] = [
    {
      numero: '001',
      estado: 'En curso',
      nombre: 'Restaurante El Sol',
      detalle: 'Mantenimiento preventivo de 3 equipos A/C.',
      fecha: '2025-05-27',
      urgente: false,
      direccion: 'Pza. de la Virgen 3'
    },
    {
      numero: '002',
      estado: 'Pendiente',
      nombre: 'Hotel Marina',
      detalle: 'Reparación urgente de caldera',
      fecha: '2025-05-26',
      urgente: true,
      direccion: 'Av. del Mar 45'
    },
    {
      numero: '003',
      estado: 'Completado',
      nombre: 'Oficinas Centrales',
      detalle: 'Revisión sistema de climatización',
      fecha: '2025-05-25',
      urgente: false,
      direccion: 'Calle Mayor 12'
    },
    {
      numero: '004',
      estado: 'En curso',
      nombre: 'Residencia Ancianos',
      detalle: 'Instalación nuevo sistema de calefacción',
      fecha: '2025-05-24',
      urgente: true,
      direccion: 'Calle San Juan 8'
    },
    {
      numero: '005',
      estado: 'Pendiente',
      nombre: 'Centro Comercial Plaza',
      detalle: 'Mantenimiento ascensores',
      fecha: '2025-05-23',
      urgente: false,
      direccion: 'Av. Principal 100'
    }
  ];

  constructor(private modalController: ModalController) {
    addIcons({mapOutline,addCircle,alertCircle,close,eyeOutline,add,addCircleOutline});
  }

  async abrirModalCrearAviso() {
    const modal = await this.modalController.create({
      component: CrearAvisosModalComponent,
      cssClass: 'modal-crear-aviso'
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      // Aquí manejaremos los datos del nuevo aviso cuando se cree
      console.log('Nuevo aviso creado:', data);
    }
  }
}
