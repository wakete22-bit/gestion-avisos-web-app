import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { mapOutline,addCircle,alertCircle,close,eyeOutline,add,addCircleOutline } from 'ionicons/icons';
  

interface Cliente {
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  ultimoAviso: string;
  estado: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule
  ],
})
export class ClientesComponent  implements OnInit {

  clientes: Cliente[] = [
    {
      nombre: 'Cliente 1',
      telefono: '1234567890',
      email: 'cliente1@gmail.com',
      direccion: 'Calle 123, Ciudad',
      ultimoAviso: '001 (04/06/25)',  
      estado: 'Activo'
    }
  ];

  constructor() { 
    addIcons({mapOutline,addCircle,alertCircle,close,eyeOutline,add,addCircleOutline});
  }

  ngOnInit() {}

}
