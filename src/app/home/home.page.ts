import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { gridOutline, notificationsOutline, timeOutline, cubeOutline, documentTextOutline, peopleOutline, settingsOutline, personCircleOutline, receipt, hourglass, alertCircleOutline, hourglassOutline, warningOutline, cashOutline, warning, document, alertCircle  } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

addIcons({
  'grid-outline': gridOutline,
  'notifications-outline': notificationsOutline,
  'time-outline': timeOutline,
  'cube-outline': cubeOutline,  
  'document-text-outline': documentTextOutline,
  'cash-outline': cashOutline,
  'people-outline': peopleOutline,
  'settings-outline': settingsOutline,
  'person-circle-outline': personCircleOutline,
  'receipt': receipt,
  'hourglass-outline': hourglassOutline,
  'alert-circle-outline': alertCircleOutline,
  'warning': warning,
  'document': document,
  'alert-circle': alertCircle
});

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
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, MatTableModule, MatIconModule],
})
export class HomePage {
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
    // Puedes añadir más avisos aquí
  ];
  constructor() {}
}
