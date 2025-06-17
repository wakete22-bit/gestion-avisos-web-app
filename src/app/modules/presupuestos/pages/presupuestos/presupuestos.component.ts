import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { mapOutline,addCircle,alertCircle,close,eyeOutline,add,addCircleOutline } from 'ionicons/icons';

interface Presupuesto {
  numero: string;
  estado: string;
  nombre: string;
  detalle: string;
  fecha: string;
  pvp: number;
}

  @Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule
  ],
})
export class PresupuestosComponent  implements OnInit {
  
  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'pvp'];
  presupuestos: Presupuesto[] = [
    {
      numero: '001',
      estado: 'En curso',
      nombre: 'Restaurante El Sol',   
      detalle: 'Aviso de incendio',
      fecha: '2025-01-01',
      pvp: 100
    }
  ];

  constructor() { 
    addIcons({mapOutline,addCircle,alertCircle,close,eyeOutline,add,addCircleOutline});
  }

  ngOnInit() {}

}
