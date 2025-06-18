import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, ModalController } from '@ionic/angular/standalone';
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
  callOutline,
  mailOutline,
  locationOutline
} from 'ionicons/icons';
import { CrearClienteModalComponent } from 'src/app/modules/clientes/components/crear-cliente-modal/crear-cliente-modal.component';
  

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
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [
    {
      nombre: 'Restaurante El Sol',
      telefono: '963 123 456',
      email: 'info@restauranteelsol.com',
      direccion: 'Plaza de la Virgen 3, Valencia',
      ultimoAviso: '001 (27/05/25)',  
      estado: 'Activo'
    },
    {
      nombre: 'Hotel Marina',
      telefono: '963 234 567',
      email: 'recepcion@hotelmarina.com',
      direccion: 'Avenida del Mar 45, Valencia',
      ultimoAviso: '002 (26/05/25)',  
      estado: 'Activo'
    },
    {
      nombre: 'Oficinas Centrales',
      telefono: '963 345 678',
      email: 'admin@oficinacentral.com',
      direccion: 'Calle Mayor 12, Valencia',
      ultimoAviso: '003 (25/05/25)',  
      estado: 'Activo'
    },
    {
      nombre: 'Residencia Ancianos',
      telefono: '963 456 789',
      email: 'gerencia@residenciaancianos.com',
      direccion: 'Calle San Juan 8, Valencia',
      ultimoAviso: '004 (24/05/25)',  
      estado: 'Activo'
    },
    {
      nombre: 'Centro Comercial Plaza',
      telefono: '963 567 890',
      email: 'info@centrocomercialplaza.com',
      direccion: 'Avenida Principal 100, Valencia',
      ultimoAviso: '005 (23/05/25)',  
      estado: 'Inactivo'
    }
  ];

  constructor(private modalController: ModalController) { 
    addIcons({
      mapOutline,
      addCircle,
      alertCircle,
      close,
      eyeOutline,
      add,
      addCircleOutline,
      searchOutline,
      callOutline,
      mailOutline,
      locationOutline
    });
  }

  ngOnInit() {}

  async abrirModalCrearCliente() {
    const modal = await this.modalController.create({
      component: CrearClienteModalComponent,
      cssClass: 'modal-crear-cliente',
      showBackdrop: true,
      backdropDismiss: true
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      console.log('Cliente creado:', data);
    }
  }

}
