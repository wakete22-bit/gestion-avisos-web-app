import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, pencilOutline, mapOutline, navigate, person, call, mail, add, addCircle, gridOutline, listOutline, chevronDownOutline, eyeOutline } from 'ionicons/icons';

addIcons({ close, pencilOutline, navigate, person, call, mail, mapOutline });

@Component({
  selector: 'app-ver-avisos',
  templateUrl: './ver-avisos.component.html',
  styleUrls: ['./ver-avisos.component.scss'],
  standalone: true, 
    imports: [CommonModule, IonIcon, IonSegment, IonSegmentButton],
})
export class VerAvisosComponent implements OnInit {
  // Añadir la propiedad para controlar la vista
  vistaGaleria: 'grid' | 'list' = 'grid';

  // Datos del aviso (estos deberían venir de un servicio)
  aviso = {
    numero: '004',
    estado: 'Pendiente',
    urgente: 'No es urgente',
    fechaCreacion: '27/05/2025',
    cliente: {
      nombre: 'Comercial Papelera S.L.',
      direccion: 'C. del Poeta Querol 9, 46002 Valencia',
      contacto: {
        nombre: 'Ana García',
        telefono: '698 25 25 225',
        email: 'ana.g@papelera.es'
      }
    },
    titulo: 'Fuga de agua importante en baño',
    descripcion: 'Cliente reporta una fuga persistente en el baño de la planta baja, cerca del inodoro. Sospechan de una tubería rota. Necesario inspeccionar y reparar. Acceso limitado por la tarde.',
    imagenes: [
      {
        nombre: 'ejemplo-imagen.png',
        tiempo: 'Hace 3 horas',
        tamano: '929KB'
      },
      {
        nombre: 'ejemplo-imagen.png',
        tiempo: 'Hace 3 horas',
        tamano: '929KB'
      }
    ]
  };  

  // Datos de trabajos realizados (estos deberían venir de un servicio)
  trabajosRealizados = [
    {
      numero: '001',
      fechaTrabajo: '20/10/2025',
      horario: '10:00 - 13:52',
      descripcion: 'Descripción del trabajo realizado',
      repuestos: [
        'Válvula de expansión: 1 Unidad',
        'Gas Refrigerante R410A: 1.5 kg',
        'Filtro de Aire Hepa (FAH-500): 1 unidad'
      ],
      estado: 'Pendiente'
    }
  ];

  constructor() {
    addIcons({close,pencilOutline,navigate,person,call,mail,gridOutline,listOutline,addCircle,chevronDownOutline,eyeOutline,add,mapOutline});
  }

  ngOnInit() { }

  cambiarVistaGaleria(event: any) {
    this.vistaGaleria = event.detail.value;
  }

  verCliente() {
    // Implementar navegación al detalle del cliente
  }

  verMapa() {
    // Implementar apertura del mapa
  }

  editarAviso() {
    // Implementar edición del aviso
  }

  cerrarAlbaran() {
    // Implementar cierre de albarán
  }

  addImagenes() {
    // Implementar añadir imágenes
  }

  realizarOtraVisita(trabajo: any) {
    // Implementar lógica para realizar otra visita
    console.log('Realizar otra visita para el trabajo:', trabajo);
  }
}
