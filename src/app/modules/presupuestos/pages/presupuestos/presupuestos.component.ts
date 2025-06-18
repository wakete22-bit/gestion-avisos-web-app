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
  searchOutline 
} from 'ionicons/icons';

interface Presupuesto {
  numero: string;
  estado: string;
  nombre: string;
  detalle: string;
  fecha: string;
  pvp: string;
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
export class PresupuestosComponent implements OnInit {
  
  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'pvp', 'acciones'];
  presupuestos: Presupuesto[] = [
    {
      numero: 'P001',
      estado: 'En curso',
      nombre: 'Restaurante El Sol',   
      detalle: 'Instalación sistema de climatización',
      fecha: '2025-01-15',
      pvp: '2.500,00€'
    },
    {
      numero: 'P002',
      estado: 'Pendiente',
      nombre: 'Hotel Marina',   
      detalle: 'Mantenimiento preventivo calderas',
      fecha: '2025-01-20',
      pvp: '1.800,00€'
    },
    {
      numero: 'P003',
      estado: 'Completado',
      nombre: 'Oficinas Centrales',   
      detalle: 'Reparación sistema eléctrico',
      fecha: '2025-01-10',
      pvp: '3.200,00€'
    },
    {
      numero: 'P004',
      estado: 'En curso',
      nombre: 'Residencia Ancianos',   
      detalle: 'Instalación sistema de seguridad',
      fecha: '2025-01-25',
      pvp: '4.500,00€'
    },
    {
      numero: 'P005',
      estado: 'Pendiente',
      nombre: 'Centro Comercial Plaza',   
      detalle: 'Mantenimiento ascensores',
      fecha: '2025-01-30',
      pvp: '2.800,00€'
    }
  ];

  constructor() { 
    addIcons({
      searchOutline,
      addCircle,
      eyeOutline,
      mapOutline,
      alertCircle,
      close,
      add,
      addCircleOutline
    });
  }

  ngOnInit() {}

}
