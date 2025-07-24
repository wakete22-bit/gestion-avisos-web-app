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
import { TecnicosService } from '../../services/tecnicos.service';
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
export class TecnicosComponent implements OnInit, OnDestroy {
  tecnicos: Tecnico[] = [];
  loading = false;
  error = '';
  busqueda = '';
  paginaActual = 1;
  porPagina = 10;
  totalTecnicos = 0;
  ordenarPor = 'fecha_creacion';
  orden: 'asc' | 'desc' = 'desc';

  private destroy$ = new Subject<void>();

  constructor(
    private modalController: ModalController,
    private tecnicosService: TecnicosService
  ) {
    addIcons({searchOutline,filterOutline,addCircle,refreshOutline,alertCircleOutline,peopleOutline,eyeOutline,constructOutline,alertCircle,close,add,addCircleOutline,callOutline,mailOutline,locationOutline,pauseCircle,playCircle});
  }

  ngOnInit() {
    this.cargarTecnicos();
    this.setupBusqueda();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupBusqueda() {
    // Debounce para la búsqueda
    const busquedaSubject = new Subject<string>();
    busquedaSubject.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(termino => {
      this.busqueda = termino;
      this.paginaActual = 1;
      this.cargarTecnicos();
    });

    // Escuchar cambios en el input de búsqueda
    const searchInput = document.querySelector('input[placeholder*="Buscar"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        busquedaSubject.next(target.value);
      });
    }
  }

  cargarTecnicos() {
    this.loading = true;
    this.error = '';

    this.tecnicosService.getTecnicos(
      this.paginaActual,
      this.porPagina,
      this.busqueda,
      this.ordenarPor,
      this.orden
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.tecnicos = response.tecnicos;
        this.totalTecnicos = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar técnicos:', error);
        this.error = 'Error al cargar los técnicos. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  async abrirModalCrearTecnico() {
    const modal = await this.modalController.create({
      component: CrearTecnicoModalComponent,
      componentProps: {
        tecnico: null
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm' && data) {
      // El técnico ya fue creado exitosamente en el modal
      // Solo necesitamos recargar la lista y mostrar confirmación
      console.log('✅ Técnico creado desde modal, recargando lista...');
      this.cargarTecnicos();
    }
  }

  // Método ya no es necesario para creación desde modal
  // Se mantiene solo para compatibilidad futura si se necesita
  private crearTecnico(tecnicoData: any) {
    this.loading = true;
    this.error = '';

    this.tecnicosService.crearTecnico(tecnicoData).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (tecnico) => {
        console.log('✅ Técnico creado exitosamente desde componente padre:', tecnico);
        this.cargarTecnicos(); // Recargar la lista
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error al crear técnico desde componente padre:', error);
        this.error = 'Error al crear el técnico. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  toggleEstadoTecnico(tecnico: Tecnico) {
    if (!tecnico.id) return;

    const accion = tecnico.es_activo ? 'desactivar' : 'activar';
    
    this.loading = true;
    this.error = '';

    const observable = tecnico.es_activo 
      ? this.tecnicosService.desactivarTecnico(tecnico.id)
      : this.tecnicosService.activarTecnico(tecnico.id);

    observable.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        console.log(`Técnico ${accion}do exitosamente`);
        this.cargarTecnicos(); // Recargar la lista
        this.loading = false;
      },
      error: (error) => {
        console.error(`Error al ${accion} técnico:`, error);
        this.error = `Error al ${accion} el técnico. Por favor, intenta de nuevo.`;
        this.loading = false;
      }
    });
  }

  onBusquedaChange(event: any) {
    const valor = event.target.value;
    this.busqueda = valor;
    this.paginaActual = 1;
    this.cargarTecnicos();
  }

  onOrdenarChange(event: any) {
    const valor = event.target.value;
    this.ordenarPor = valor;
    this.cargarTecnicos();
  }

  onFiltrarTodos() {
    this.busqueda = '';
    this.paginaActual = 1;
    this.cargarTecnicos();
  }

  onReintentar() {
    this.cargarTecnicos();
  }

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.cargarTecnicos();
  }

  getTotalPaginas(): number {
    return Math.ceil(this.totalTecnicos / this.porPagina);
  }

  getPaginas(): number[] {
    const total = this.getTotalPaginas();
    const paginas: number[] = [];
    
    for (let i = 1; i <= total; i++) {
      paginas.push(i);
    }
    
    return paginas;
  }

  esTecnicoActivo(tecnico: Tecnico): boolean {
    return tecnico.es_activo && tecnico.rol?.nombre_rol !== 'Administrador';
  }

  getRolClass(rol: string): string {
    switch (rol) {
      case 'Administrador':
        return 'rol-admin';
      case 'Técnico':
        return 'rol-tecnico';
      case 'Usuario':
        return 'rol-usuario';
      default:
        return 'rol-default';
    }
  }

  getEstadoClass(tecnico: Tecnico): string {
    return this.esTecnicoActivo(tecnico) ? 'activo' : 'inactivo';
  }

  // Función para usar Math en el template
  get Math() {
    return Math;
  }
} 