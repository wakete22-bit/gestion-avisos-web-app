import { Component, Input, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { arrowForward, personOutline, mailOutline, chevronDownOutline, copyOutline, shieldOutline, informationCircleOutline, cloudUploadOutline, closeOutline, save, saveOutline, trashOutline, timeOutline, calendarOutline, documentTextOutline, addOutline, searchOutline } from 'ionicons/icons';
import { ViewportService } from 'src/app/core/services/viewport.service';
import { InventarioService } from '../../../inventario/services/inventario.service';
import { Inventario } from '../../../inventario/models/inventario.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-crear-trabajos-realizados',
  templateUrl: './crear-trabajos-realizados.component.html',
  styleUrls: ['./crear-trabajos-realizados.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class CrearTrabajosRealizadosComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() avisoId: string = '';
  
  trabajoForm: FormGroup;
  repuestos: { producto: Inventario, cantidad: number }[] = [];
  productosInventario: Inventario[] = [];
  productosFiltrados: Inventario[] = [];
  loadingProductos = false;
  errorProductos: string | null = null;
  busquedaProducto = '';
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private viewportService: ViewportService,
    private elementRef: ElementRef,
    private inventarioService: InventarioService
  ) {
    this.trabajoForm = this.fb.group({
      fecha_trabajo: [new Date().toISOString().split('T')[0], Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      estado: ['Pendiente', Validators.required]
    });
  }

  ngOnInit() {
    addIcons({
      arrowForward,
      personOutline,
      mailOutline,
      chevronDownOutline,
      copyOutline,
      shieldOutline,
      informationCircleOutline,
      cloudUploadOutline,
      closeOutline,
      save,
      saveOutline,
      trashOutline,
      timeOutline,
      calendarOutline,
      documentTextOutline,
      addOutline,
      searchOutline
    });
    
    this.cargarProductosInventario();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    // Aplicar safe areas al modal después de que se renderice
    setTimeout(() => {
      const modalContainer = this.elementRef.nativeElement.querySelector('.modal-container');
      if (modalContainer) {
        this.viewportService.applySafeAreaToModal(modalContainer);
      }
    }, 100);
  }

  /**
   * Carga los productos del inventario
   */
  cargarProductosInventario() {
    this.loadingProductos = true;
    this.errorProductos = null;

    this.inventarioService.getProductosConStock(1, 100, '', 'nombre', 'asc')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.productosInventario = response.inventario;
          this.productosFiltrados = response.inventario;
          this.loadingProductos = false;
        },
        error: (error) => {
          console.error('Error al cargar productos:', error);
          this.errorProductos = 'Error al cargar los productos del inventario';
          this.loadingProductos = false;
        }
      });
  }

  /**
   * Filtra productos por búsqueda
   */
  filtrarProductos(event: any) {
    const busqueda = event.target.value.toLowerCase();
    this.busquedaProducto = busqueda;
    
    if (!busqueda) {
      this.productosFiltrados = this.productosInventario;
    } else {
      this.productosFiltrados = this.productosInventario.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.codigo.toLowerCase().includes(busqueda) ||
        (producto.descripcion && producto.descripcion.toLowerCase().includes(busqueda))
      );
    }
  }

  /**
   * Añade un producto del inventario como repuesto
   */
  agregarRepuesto(producto: Inventario) {
    // Verificar si el producto ya está en la lista
    const yaExiste = this.repuestos.find(r => r.producto.id === producto.id);
    if (yaExiste) {
      // Si ya existe, incrementar cantidad
      yaExiste.cantidad += 1;
    } else {
      // Si no existe, añadirlo con cantidad 1
      this.repuestos.push({ producto, cantidad: 1 });
    }
  }

  /**
   * Elimina un repuesto de la lista
   */
  eliminarRepuesto(index: number) {
    this.repuestos.splice(index, 1);
  }

  /**
   * Actualiza la cantidad de un repuesto
   */
  actualizarCantidadRepuesto(index: number, nuevaCantidad: number) {
    if (nuevaCantidad > 0 && nuevaCantidad <= this.repuestos[index].producto.cantidad_disponible) {
      this.repuestos[index].cantidad = nuevaCantidad;
    }
  }

  /**
   * Crea el trabajo realizado
   */
  async crearTrabajo() {
    if (this.trabajoForm.valid) {
      const trabajoData = {
        ...this.trabajoForm.value,
        aviso_id: this.avisoId,
        repuestos: this.repuestos.map(r => ({
          producto_id: r.producto.id,
          nombre: r.producto.nombre,
          cantidad: r.cantidad,
          precio_unitario: r.producto.precio_neto
        }))
      };
      await this.modalController.dismiss(trabajoData, 'confirm');
    }
  }

  /**
   * Cierra el modal
   */
  async cerrarModal() {
    await this.modalController.dismiss(null, 'cancel');
  }
} 