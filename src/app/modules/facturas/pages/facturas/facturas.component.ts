import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { 
  mapOutline,
  addCircle, 
  alertCircle, 
  close, 
  eyeOutline, 
  add, 
  addCircleOutline, 
  searchOutline,
  receipt,
  hourglassOutline,
  warning,
  document
} from 'ionicons/icons';
import { Router } from '@angular/router';

interface Factura {
  numero: string;
  estado: string;
  nombre: string;
  detalle: string;
  fecha: string;
  pvp: string;
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
export class FacturasComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'pvp'];
  facturas: Factura[] = [
    {
      numero: 'F2025-001',
      estado: 'En curso',
      nombre: 'Restaurante El Sol',
      detalle: 'Mantenimiento preventivo de 3 equipos A/C',
      fecha: '2025-01-15',
      pvp: '450,00€'
    },
    {
      numero: 'F2025-002',
      estado: 'Pendiente',
      nombre: 'Hotel Marina',
      detalle: 'Reparación urgente de caldera',
      fecha: '2025-01-14',
      pvp: '1.250,00€'
    },
    {
      numero: 'F2025-003',
      estado: 'Completado',
      nombre: 'Oficinas Centrales',
      detalle: 'Revisión sistema de climatización',
      fecha: '2025-01-13',
      pvp: '320,00€'
    },
    {
      numero: 'F2025-004',
      estado: 'En curso',
      nombre: 'Residencia Ancianos',
      detalle: 'Instalación nuevo sistema de calefacción',
      fecha: '2025-01-12',
      pvp: '2.800,00€'
    }
  ];

  constructor(private router: Router) { 
    addIcons({searchOutline,addCircle,eyeOutline,mapOutline,alertCircle,close,add,addCircleOutline,receipt,hourglassOutline,warning,document});
  }

  ngOnInit() {}

  abrirCrearFactura() {
    this.router.navigate(['/crear-factura']);
  }

}
