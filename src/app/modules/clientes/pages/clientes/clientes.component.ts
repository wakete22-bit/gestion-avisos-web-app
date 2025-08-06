import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  locationOutline,
  refreshOutline,
  alertCircleOutline,
  peopleOutline,
  pauseCircle,
  playCircle,
  filterOutline
} from 'ionicons/icons';
import { CrearClienteModalComponent } from 'src/app/modules/clientes/components/crear-cliente-modal/crear-cliente-modal.component';
import { ClientesService } from '../../../../core/services/clientes.service';
import { Cliente } from '../../models/cliente.model';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
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
export class ClientesComponent implements OnInit, OnDestroy {

  clientes: Cliente[] = [];
  loading = true; // Cambiar a true para mostrar carga inicial
  error: string | null = null;
  totalClientes = 0;
  paginaActual = 1;
  porPagina = 10;
  busqueda = '';
  ordenarPor = 'nombre_completo';
  orden: 'asc' | 'desc' = 'asc';
  mostrarSoloActivos = false;

  // Hacer Math disponible en el template
  Math = Math;

  // Helper para paginación
  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  private destroy$ = new Subject<void>();
  private busquedaSubject = new Subject<string>();

  constructor(
    private modalController: ModalController,
    private clientesService: ClientesService
  ) {
    addIcons({searchOutline,filterOutline,addCircle,refreshOutline,alertCircleOutline,peopleOutline,eyeOutline,mapOutline,alertCircle,close,add,addCircleOutline,callOutline,mailOutline,locationOutline,pauseCircle,playCircle});
  }

  ngOnInit() {
    this.cargarClientes();
    this.suscribirseAClientes();
    this.configurarBusqueda();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga la lista de clientes desde el servicio
   */
  cargarClientes() {
    this.loading = true;
    this.error = null;

    this.clientesService.getClientes(
      this.paginaActual,
      this.porPagina,
      this.busqueda,
      this.ordenarPor,
      this.orden,
      this.mostrarSoloActivos
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.clientes = response.clientes;
        this.totalClientes = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
        this.error = 'Error al cargar los clientes. Por favor, inténtalo de nuevo.';
        this.loading = false;
      }
    });
  }

  /**
   * Se suscribe a los cambios en la lista de clientes
   */
  private suscribirseAClientes() {
    this.clientesService.clientes$
      .pipe(takeUntil(this.destroy$))
      .subscribe(clientes => {
        this.clientes = clientes;
      });
  }

  /**
   * Configura la búsqueda con debounce
   */
  private configurarBusqueda() {
    this.busquedaSubject.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(termino => {
      this.busqueda = termino;
      this.paginaActual = 1;
      this.cargarClientes();
    });
  }

  /**
   * Maneja la búsqueda de clientes
   */
  onBuscar(termino: string) {
    this.busquedaSubject.next(termino);
  }

  /**
   * Filtra clientes por búsqueda
   */
  get clientesFiltrados(): Cliente[] {
    if (!this.busqueda) {
      return this.clientes;
    }
    return this.clientes.filter(cliente => 
      cliente.nombre_completo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      cliente.email?.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      cliente.telefono_contacto?.includes(this.busqueda)
    );
  }

  /**
   * Maneja el cambio de ordenamiento
   */
  onOrdenar(campo: string) {
    if (this.ordenarPor === campo) {
      this.orden = this.orden === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordenarPor = campo;
      this.orden = 'asc';
    }
    this.cargarClientes();
  }

  /**
   * Maneja el cambio de página
   */
  onCambiarPagina(pagina: number | string) {
    if (typeof pagina === 'number') {
      this.paginaActual = pagina;
      this.cargarClientes();
    }
  }

  /**
   * Refresca la lista de clientes
   */
  refrescarClientes() {
    this.cargarClientes();
  }

  /**
   * Cambia el filtro de mostrar solo activos
   */
  cambiarFiltroActivos() {
    this.mostrarSoloActivos = !this.mostrarSoloActivos;
    this.paginaActual = 1; // Volver a la primera página
    this.cargarClientes();
  }

  /**
   * Genera el array de páginas para la paginación
   */
  getPaginas(): (number | string)[] {
    const totalPaginas = Math.ceil(this.totalClientes / this.porPagina);
    const paginas: (number | string)[] = [];

    if (totalPaginas <= 7) {
      // Si hay 7 páginas o menos, mostrar todas
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      // Lógica para mostrar páginas con elipsis
      if (this.paginaActual <= 4) {
        for (let i = 1; i <= 5; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      } else if (this.paginaActual >= totalPaginas - 3) {
        paginas.push(1);
        paginas.push('...');
        for (let i = totalPaginas - 4; i <= totalPaginas; i++) {
          paginas.push(i);
        }
      } else {
        paginas.push(1);
        paginas.push('...');
        for (let i = this.paginaActual - 1; i <= this.paginaActual + 1; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
  }
    }

    return paginas;
  }

  async abrirModalCrearCliente() {
    const modal = await this.modalController.create({
      component: CrearClienteModalComponent,
      cssClass: 'modal-crear-cliente',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        modo: 'crear'
      }
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      console.log('Datos del formulario:', data);
      
      // Crear el cliente en Supabase
      this.loading = true;
      this.error = null;
      
      this.clientesService.crearCliente(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (clienteCreado) => {
            console.log('Cliente creado exitosamente:', clienteCreado);
            this.loading = false;
            // La lista se actualiza automáticamente a través del BehaviorSubject
          },
          error: (error) => {
            console.error('Error al crear cliente:', error);
            this.error = 'Error al crear el cliente. Por favor, inténtalo de nuevo.';
            this.loading = false;
          }
        });
    }
  }

  async abrirModalEditarCliente(cliente: Cliente) {
    const modal = await this.modalController.create({
      component: CrearClienteModalComponent,
      cssClass: 'modal-crear-cliente',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        modo: 'editar',
        cliente: cliente
      }
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      console.log('Datos actualizados del cliente:', data);
      
      // Actualizar el cliente en Supabase
      this.loading = true;
      this.error = null;
      
      this.clientesService.actualizarCliente(cliente.id, data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (clienteActualizado) => {
            console.log('Cliente actualizado exitosamente:', clienteActualizado);
            this.loading = false;
            // La lista se actualiza automáticamente a través del BehaviorSubject
          },
          error: (error) => {
            console.error('Error al actualizar cliente:', error);
            this.error = 'Error al actualizar el cliente. Por favor, inténtalo de nuevo.';
            this.loading = false;
          }
        });
    }
  }

  /**
   * Cambia el estado activo/inactivo de un cliente
   */
  toggleEstadoCliente(cliente: Cliente) {
    const nuevoEstado = !cliente.es_activo;
    const accion = nuevoEstado ? 'activar' : 'desactivar';
    
    if (confirm(`¿Estás seguro de que quieres ${accion} al cliente "${cliente.nombre_completo}"?`)) {
      this.clientesService.actualizarCliente(cliente.id, { es_activo: nuevoEstado })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (clienteActualizado) => {
            console.log(`Cliente ${accion}do:`, clienteActualizado);
            // La lista se actualiza automáticamente a través del BehaviorSubject
          },
          error: (error) => {
            console.error(`Error al ${accion} cliente:`, error);
            this.error = `Error al ${accion} el cliente. Por favor, inténtalo de nuevo.`;
          }
        });
    }
  }

}
