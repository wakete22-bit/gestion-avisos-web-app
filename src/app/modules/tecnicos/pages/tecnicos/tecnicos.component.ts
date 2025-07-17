import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, ModalController } from '@ionic/angular/standalone';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { 
  constructOutline,
  addCircle,
  alertCircle,
  close,
  eyeOutline,
  add,
  addCircleOutline,
  searchOutline,
  callOutline,
  mailOutline,
  locationOutline,
  refreshOutline,
  alertCircleOutline,
  peopleOutline,
  pauseCircle,
  playCircle,
  filterOutline
} from 'ionicons/icons';
import { CrearTecnicoModalComponent } from '../../components/crear-tecnico-modal/crear-tecnico-modal.component';
import { Tecnico } from '../../models/tecnico.model';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { TipoRol } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule
  ],
})
export class TecnicosComponent implements OnInit {

  tecnicos: Tecnico[] = [];
  loading = false;
  error = '';
  busqueda = '';
  paginaActual = 1;
  porPagina = 10;
  totalTecnicos = 0;

  constructor(
    private modalController: ModalController,
  ) {
    addIcons({searchOutline,filterOutline,addCircle,refreshOutline,alertCircleOutline,peopleOutline,eyeOutline,constructOutline,alertCircle,close,add,addCircleOutline,callOutline,mailOutline,locationOutline,pauseCircle,playCircle});
  }

  ngOnInit() {
  }

  abrirModalCrearTecnico() {
    this.modalController.create({
      component: CrearTecnicoModalComponent,
      componentProps: {
        tecnico: null
      }
    });
  }

} 