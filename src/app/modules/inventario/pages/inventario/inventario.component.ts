import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, ModalController, AlertController, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircle, close, eyeOutline, mapOutline, add, addCircle, addCircleOutline, receipt, hourglassOutline, warning, document, appsOutline, cubeOutline, alertCircleOutline, checkmarkCircleOutline, searchOutline, trashOutline, createOutline, refreshOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { CrearProductoModalComponent } from '../../components/crear-producto-modal/crear-producto-modal.component';
import { ConfirmarEliminacionModalComponent } from '../../components/confirmar-eliminacion-modal/confirmar-eliminacion-modal.component';
import { InventarioService } from '../../services/inventario.service';
import { Inventario } from '../../models/inventario.model';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UnifiedReconnectionService } from '../../../../core/services/unified-reconnection.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule
  ],
})
export class InventarioComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'cantidad', 'unidad', 'enStock', 'precioNeto', 'pvp'];
  productos: Inventario[] = [];
  productosFiltrados: Inventario[] = [];
  loading = true; // Cambiar a true para mostrar carga inicial
  error: string | null = null;
  totalProductos = 0;
  paginaActual = 1;
  porPagina = 10;
  busqueda = '';
  ordenarPor = 'fecha_creacion';
  orden: 'asc' | 'desc' = 'desc';
  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  // Hacer Math disponible en el template
  Math = Math;

  constructor(
    private modalController: ModalController,
    private inventarioService: InventarioService,
    private alertController: AlertController,
    private toastController: ToastController,
    private unifiedReconnectionService: UnifiedReconnectionService
  ) { 
    addIcons({
      appsOutline, cubeOutline, alertCircleOutline, checkmarkCircleOutline, searchOutline, 
      addCircle, eyeOutline, addCircleOutline, receipt, hourglassOutline, warning, 
      document, alertCircle, close, trashOutline, createOutline, refreshOutline,
      chevronBackOutline, chevronForwardOutline
    });
  }

  ngOnInit() {
    // 🔄 CONFIGURAR RECONEXIÓN AUTOMÁTICA (patrón del dashboard)
    this.unifiedReconnectionService.appResumed
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe((resumed) => {
        if (resumed) {
          console.log('🔄 InventarioComponent: App reanudada, recargando inventario...');
          this.cargarInventario();
        }
      });

    // También suscribirse al estado de conexión
    this.unifiedReconnectionService.connectionState
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        console.log('🔄 InventarioComponent: Estado de conexión:', state);
        if (state === 'connected' && this.error) {
          this.cargarInventario();
        }
      });

    this.cargarInventario();
    this.configurarBusqueda();
    this.suscribirseAInventario();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarInventario() {
    this.loading = true;
    this.error = null;

    this.inventarioService.getInventario(
      this.paginaActual,
      this.porPagina,
      this.busqueda,
      this.ordenarPor,
      this.orden
    ).pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.productos = response.inventario;
        this.productosFiltrados = response.inventario;
        this.totalProductos = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar inventario:', error);
        this.error = 'Error al cargar el inventario. Por favor, inténtalo de nuevo.';
        this.loading = false;
      }
    });
  }

  private suscribirseAInventario() {
    this.inventarioService.inventario$
      .pipe(takeUntil(this.destroy$))
      .subscribe(productos => {
        this.productos = productos;
        this.productosFiltrados = productos;
      });
  }

  private configurarBusqueda() {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(termino => {
        this.busqueda = termino || '';
        this.paginaActual = 1; // Resetear a la primera página
        this.cargarInventario();
      });
  }

  /**
   * Refresca la lista de productos
   */
  refrescarInventario() {
    this.cargarInventario();
  }

  /**
   * Cambia a la página especificada
   */
  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.obtenerTotalPaginas()) {
      this.paginaActual = pagina;
      this.cargarInventario();
    }
  }

  /**
   * Calcula el total de páginas
   */
  obtenerTotalPaginas(): number {
    return Math.ceil(this.totalProductos / this.porPagina);
  }

  /**
   * Obtiene el rango de páginas a mostrar
   */
  obtenerRangoPaginas(): number[] {
    const totalPaginas = this.obtenerTotalPaginas();
    const paginaActual = this.paginaActual;
    const rango = 2; // Número de páginas a mostrar antes y después de la actual

    let inicio = Math.max(1, paginaActual - rango);
    let fin = Math.min(totalPaginas, paginaActual + rango);

    // Ajustar para mostrar siempre 5 páginas si es posible
    if (fin - inicio < 4) {
      if (inicio === 1) {
        fin = Math.min(totalPaginas, inicio + 4);
      } else {
        inicio = Math.max(1, fin - 4);
      }
    }

    const paginas: number[] = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  /**
   * Verifica si se puede ir a la página anterior
   */
  puedeAnterior(): boolean {
    return this.paginaActual > 1;
  }

  /**
   * Verifica si se puede ir a la página siguiente
   */
  puedeSiguiente(): boolean {
    return this.paginaActual < this.obtenerTotalPaginas();
  }

  /**
   * Va a la página anterior
   */
  paginaAnterior() {
    if (this.puedeAnterior()) {
      this.cambiarPagina(this.paginaActual - 1);
    }
  }

  /**
   * Va a la página siguiente
   */
  paginaSiguiente() {
    if (this.puedeSiguiente()) {
      this.cambiarPagina(this.paginaActual + 1);
    }
  }

  /**
   * Va a la primera página
   */
  primeraPagina() {
    this.cambiarPagina(1);
  }

  /**
   * Va a la última página
   */
  ultimaPagina() {
    this.cambiarPagina(this.obtenerTotalPaginas());
  }

  async abrirModalCrearProducto() {
    const modal = await this.modalController.create({
      component: CrearProductoModalComponent,
      cssClass: 'modal-crear-producto',
      showBackdrop: true,
      backdropDismiss: true
    });
    
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm' && data) {
      this.crearProducto(data);
    }
  }

  private crearProducto(datosProducto: any) {
    const producto = {
      codigo: this.inventarioService.generarCodigoProducto(),
      nombre: datosProducto.nombre,
      descripcion: datosProducto.descripcion || '',
      cantidad_disponible: datosProducto.stock,
      unidad: datosProducto.unidad,
      precio_neto: datosProducto.precioNeto,
      pvp: datosProducto.pvp
    };

    this.loading = true;
    this.error = null;

    this.inventarioService.crearProducto(producto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.mostrarToast('Producto creado exitosamente', 'success');
          this.loading = false;
          // Recargar la lista para mostrar el nuevo producto
          this.cargarInventario();
        },
        error: (error) => {
          console.error('Error al crear producto:', error);
          this.error = 'Error al crear el producto. Por favor, inténtalo de nuevo.';
          this.loading = false;
          this.mostrarToast('Error al crear el producto', 'danger');
        }
      });
  }

  async verDetallesProducto(producto: Inventario) {
    const alert = await this.alertController.create({
      header: producto.nombre,
      subHeader: `Código: ${producto.codigo}`,
      message: `
        <p><strong>Descripción:</strong> ${producto.descripcion || 'Sin descripción'}</p>
        <p><strong>Cantidad:</strong> ${producto.cantidad_disponible} ${producto.unidad}</p>
        <p><strong>Precio Neto:</strong> ${producto.precio_neto}€</p>
        <p><strong>PVP:</strong> ${producto.pvp}€</p>
        <p><strong>Fecha Creación:</strong> ${new Date(producto.fecha_creacion).toLocaleDateString()}</p>
        <p><strong>Última Actualización:</strong> ${new Date(producto.fecha_actualizacion).toLocaleDateString()}</p>
      `,
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.editarProducto(producto);
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.confirmarEliminarProducto(producto);
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  private editarProducto(producto: Inventario) {
    this.abrirModalEditarProducto(producto);
  }

  async abrirModalEditarProducto(producto: Inventario) {
    const modal = await this.modalController.create({
      component: CrearProductoModalComponent,
      cssClass: 'modal-crear-producto',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        productoParaEditar: producto
      }
    });
    
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm' && data) {
      this.actualizarProducto(producto.id, data);
    }
  }

  private actualizarProducto(id: string, datosProducto: any) {
    const producto = {
      nombre: datosProducto.nombre,
      descripcion: datosProducto.descripcion || '',
      cantidad_disponible: datosProducto.stock,
      unidad: datosProducto.unidad,
      precio_neto: datosProducto.precioNeto,
      pvp: datosProducto.pvp
    };

    this.loading = true;
    this.error = null;

    this.inventarioService.actualizarProducto(id, producto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.mostrarToast('Producto actualizado exitosamente', 'success');
          this.loading = false;
          // Recargar la lista para mostrar el producto actualizado
          this.cargarInventario();
        },
        error: (error) => {
          console.error('Error al actualizar producto:', error);
          this.error = 'Error al actualizar el producto. Por favor, inténtalo de nuevo.';
          this.loading = false;
          this.mostrarToast('Error al actualizar el producto', 'danger');
        }
      });
  }

  async confirmarEliminarProducto(producto: Inventario) {
    const modal = await this.modalController.create({
      component: ConfirmarEliminacionModalComponent,
      cssClass: 'modal-confirmar-eliminacion',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        producto: producto
      }
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data?.confirmado) {
      this.eliminarProducto(producto.id);
    }
  }

  private eliminarProducto(id: string) {
    this.loading = true;
    this.error = null;

    this.inventarioService.eliminarProducto(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.mostrarToast('Producto eliminado exitosamente', 'success');
          this.loading = false;
          // Recargar la lista para actualizar la vista
          this.cargarInventario();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          this.error = 'Error al eliminar el producto. Por favor, inténtalo de nuevo.';
          this.loading = false;
          this.mostrarToast('Error al eliminar el producto', 'danger');
        }
      });
  }

  private async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }

  // Métodos auxiliares para el template
  getEnStock(cantidad: number): boolean {
    return cantidad > 0;
  }

  getPrecioNetoFormateado(precio: number): string {
    return `${precio.toFixed(2)}€`;
  }

  getPvpFormateado(pvp: number): string {
    return `${pvp.toFixed(2)}€`;
  }
}
