import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  alertCircle, 
  close, 
  eyeOutline, 
  mapOutline, 
  add, 
  addCircle, 
  addCircleOutline,
  searchOutline,
  locationOutline,
  calendarOutline
} from 'ionicons/icons';
import { Aviso } from 'src/app/modules/avisos/pages/avisos/avisos.component';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  standalone: true, 
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule
  ],
})
export class HistorialComponent  implements OnInit {

  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'urgente', 'direccion', 'acciones'];
  avisos: Aviso[] = [
    {
      numero: '001',
      estado: 'En curso',
      nombre: 'Restaurante El Sol',
      detalle: 'Aviso de incendio',
      fecha: '2025-01-01',
      urgente: true,
      direccion: 'Calle 123, Ciudad'
    }
  ];

  constructor() { 
    addIcons({
      mapOutline,
      addCircle,
      alertCircle,
      close,
      eyeOutline,
      add,
      addCircleOutline,
      searchOutline,
      locationOutline,
      calendarOutline
    });
  }

  ngOnInit() {}

}
