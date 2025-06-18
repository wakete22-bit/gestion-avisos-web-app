import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { mapOutline,addCircle,alertCircle,close,eyeOutline,add,addCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

interface Factura {
  numero: string;
  estado: string;
  nombre: string;
  detalle: string;
  fecha: string;
  pvp: number;
}

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule
  ],
})
export class FacturasComponent  implements OnInit {

  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'pvp'];
  facturas: Factura[] = [
    {
      numero: '001',
      estado: 'En curso',
      nombre: 'Restaurante El Sol',
      detalle: 'Aviso de incendio',
      fecha: '2025-01-01',
      pvp: 100
    },
    
  ];

  constructor(private router: Router) { 
    addIcons({mapOutline,addCircle,alertCircle,close,eyeOutline,add,addCircleOutline});
  }

  ngOnInit() {}

  abrirCrearFactura() {
    this.router.navigate(['/crear-factura']);
  }

}
