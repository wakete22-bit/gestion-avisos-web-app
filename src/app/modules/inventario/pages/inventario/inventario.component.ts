import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircle, close, eyeOutline, mapOutline, add, addCircle, addCircleOutline, receipt, hourglassOutline, warning, document } from 'ionicons/icons';
import { CrearProductoModalComponent } from '../../components/crear-producto-modal/crear-producto-modal.component';

export interface Producto {
  codigo: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  unidad: string;
  enStock: boolean;
  precioNeto: number;   
  pvp: number;
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
      codigo: '001',
      nombre: 'Producto 1',
      descripcion: 'Detalle 1',
      cantidad: 10,
      unidad: 'Unidad',
      enStock: true,
      precioNeto: 100,
      pvp: 120
    }
  ];

  constructor(private modalController: ModalController) { 
    addIcons({receipt,hourglassOutline,warning,document,alertCircle,close,eyeOutline,mapOutline,add,addCircle,addCircleOutline});
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
