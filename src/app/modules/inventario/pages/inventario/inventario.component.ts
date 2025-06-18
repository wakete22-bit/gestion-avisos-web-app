import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircle, close, eyeOutline, mapOutline, add, addCircle, addCircleOutline, receipt, hourglassOutline, warning, document, appsOutline, cubeOutline, alertCircleOutline, checkmarkCircleOutline, searchOutline } from 'ionicons/icons';
import { CrearProductoModalComponent } from '../../components/crear-producto-modal/crear-producto-modal.component';

export interface Producto {
  codigo: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  unidad: string;
  enStock: boolean;
  precioNeto: string;
  pvp: string;
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule
  ],
})
export class InventarioComponent  implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'cantidad', 'unidad', 'enStock', 'precioNeto', 'pvp'];
  productos: Producto[] = [
    {
      codigo: 'P001',
      nombre: 'Filtro de aire',
      descripcion: 'Filtro de aire para sistemas de climatización',
      cantidad: 15,
      unidad: 'unidades',
      enStock: true,
      precioNeto: '25,00€',
      pvp: '30,25€'
    },
    {
      codigo: 'P002',
      nombre: 'Refrigerante R410A',
      descripcion: 'Gas refrigerante para equipos de aire acondicionado',
      cantidad: 0,
      unidad: 'kg',
      enStock: false,
      precioNeto: '45,00€',
      pvp: '54,45€'
    },
    {
      codigo: 'P003',
      nombre: 'Termostato digital',
      descripcion: 'Termostato programable con pantalla LCD',
      cantidad: 8,
      unidad: 'unidades',
      enStock: true,
      precioNeto: '65,00€',
      pvp: '78,65€'
    }
  ];

  constructor(private modalController: ModalController) { 
    addIcons({appsOutline,cubeOutline,alertCircleOutline,checkmarkCircleOutline,searchOutline,addCircle,eyeOutline,addCircleOutline,receipt,hourglassOutline,warning,document,alertCircle,close});
  }

  ngOnInit() {}

  async abrirModalCrearProducto() {
    const modal = await this.modalController.create({
      component: CrearProductoModalComponent,
      cssClass: 'modal-crear-producto',
      showBackdrop: true,
      backdropDismiss: true
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      console.log('Producto creado:', data);
    }
  }

}
