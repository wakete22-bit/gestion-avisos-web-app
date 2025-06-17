import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircle, close, eyeOutline, mapOutline, add, addCircle, addCircleOutline, receipt, hourglassOutline, warning, document } from 'ionicons/icons';

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
    MatIconModule,
    IonHeader,
    IonToolbar,
    IonTitle
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

  constructor() { 
    addIcons({receipt,hourglassOutline,warning,document,alertCircle,close,eyeOutline,mapOutline,add,addCircle,addCircleOutline});
  }

  ngOnInit() {}

}
