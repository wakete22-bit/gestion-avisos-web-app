import { Component, Input, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { arrowForward, personOutline, mailOutline, chevronDownOutline, copyOutline, shieldOutline, informationCircleOutline, cloudUploadOutline, closeOutline, save, saveOutline, trashOutline, timeOutline, calendarOutline, documentTextOutline, addOutline, searchOutline } from 'ionicons/icons';
import { ViewportService } from 'src/app/core/services/viewport.service';
import { InventarioService } from '../../../inventario/services/inventario.service';
import { Inventario } from '../../../inventario/models/inventario.model';
import { MaterialTrabajo, TrabajoRealizado } from '../../models/trabajo-realizado.model';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import { TrabajosService } from '../../../../core/services/trabajos.service';

@Component({
  selector: 'app-crear-trabajos-realizados',
  templateUrl: './crear-trabajos-realizados.component.html',
  styleUrls: ['./crear-trabajos-realizados.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class CrearTrabajosRealizadosComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() avisoId: string = '';
  @Input() trabajoExistente?: TrabajoRealizado;
  
  trabajoForm: FormGroup;
  materiales: { producto: Inventario, cantidad: number }[] = [];
  productosInventario: Inventario[] = [];
  productosFiltrados: Inventario[] = [];
  loadingProductos = false;
  errorProductos: string | null = null;
  busquedaProducto = '';
  modoEdicion = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private viewportService: ViewportService,
    private elementRef: ElementRef,
    private inventarioService: InventarioService,
    private trabajosService: TrabajosService
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
    
    this.modoEdicion = !!this.trabajoExistente;
    
    if (this.modoEdicion && this.trabajoExistente) {
      this.cargarDatosTrabajoExistente();
    }
    
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
   * Carga los datos de un trabajo existente para editar
   */
  async cargarDatosTrabajoExistente() {
    if (!this.trabajoExistente?.id) return;

    try {
      const trabajoCompleto = await firstValueFrom(this.trabajosService.getTrabajo(this.trabajoExistente.id));
      
      // Cargar datos del formulario
      this.trabajoForm.patchValue({
        fecha_trabajo: this.trabajoExistente.fecha_trabajo,
        hora_inicio: this.trabajoExistente.hora_inicio,
        hora_fin: this.trabajoExistente.hora_fin,
        descripcion: this.trabajoExistente.descripcion,
        estado: this.trabajoExistente.estado
      });

      // Cargar materiales del trabajo
      if (trabajoCompleto.materiales && trabajoCompleto.materiales.length > 0) {
        // Necesitamos obtener los datos completos de los productos del inventario
        const materialesConProductos = await Promise.all(
          trabajoCompleto.materiales.map(async (material) => {
            const producto = await firstValueFrom(this.inventarioService.getProducto(material.material_id));
            return {
              producto,
              cantidad: material.cantidad_utilizada
            };
          })
        );
        
        this.materiales = materialesConProductos;
      }
    } catch (error) {
      console.error('Error al cargar datos del trabajo existente:', error);
      alert('Error al cargar los datos del trabajo para editar.');
    }
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
   * Añade un producto del inventario como material
   */
  agregarMaterial(producto: Inventario) {
    // Verificar si el producto ya está en la lista
    const yaExiste = this.materiales.find(m => m.producto.id === producto.id);
    
    if (yaExiste) {
      // Si ya existe, verificar si se puede incrementar la cantidad
      const nuevaCantidad = yaExiste.cantidad + 1;
      if (nuevaCantidad > producto.cantidad_disponible) {
        alert(`No hay suficiente stock. Solo quedan ${producto.cantidad_disponible} ${producto.unidad} de ${producto.nombre}`);
        return;
      }
      yaExiste.cantidad = nuevaCantidad;
    } else {
      // Si no existe, verificar que haya stock disponible
      if (producto.cantidad_disponible <= 0) {
        alert(`No hay stock disponible para ${producto.nombre}`);
        return;
      }
      // Si no existe, añadirlo con cantidad 1
      this.materiales.push({ producto, cantidad: 1 });
    }
  }

  /**
   * Elimina un material de la lista
   */
  eliminarMaterial(index: number) {
    this.materiales.splice(index, 1);
  }

  /**
   * Actualiza la cantidad de un material
   */
  actualizarCantidadMaterial(index: number, nuevaCantidad: number) {
    const material = this.materiales[index];
    const cantidadNueva = parseInt(nuevaCantidad.toString());
    
    if (isNaN(cantidadNueva) || cantidadNueva <= 0) {
      // Restaurar el valor anterior
      return;
    }
    
    if (cantidadNueva > material.producto.cantidad_disponible) {
      alert(`No hay suficiente stock. Solo quedan ${material.producto.cantidad_disponible} ${material.producto.unidad} de ${material.producto.nombre}`);
      // Restaurar el valor anterior
      return;
    }
    
    material.cantidad = cantidadNueva;
  }

  /**
   * Calcula el costo total de los materiales
   */
  calcularCostoTotal(): number {
    return this.materiales.reduce((total, material) => {
      return total + (material.cantidad * material.producto.precio_neto);
    }, 0);
  }

  /**
   * Crea o actualiza el trabajo realizado
   */
  async crearTrabajo() {
    if (this.trabajoForm.valid) {
      // Validar que todos los materiales tengan suficiente stock
      const materialesSinStock = this.materiales.filter(material => 
        material.cantidad > material.producto.cantidad_disponible
      );
      
      if (materialesSinStock.length > 0) {
        const mensaje = materialesSinStock.map(m => 
          `${m.producto.nombre}: solicitado ${m.cantidad} ${m.producto.unidad}, disponible ${m.producto.cantidad_disponible} ${m.producto.unidad}`
        ).join('\n');
        
        alert(`No hay suficiente stock para los siguientes materiales:\n\n${mensaje}`);
        return;
      }
      
      const trabajoData = {
        ...this.trabajoForm.value,
        aviso_id: this.avisoId,
        repuestos: this.materiales.map(m => m.producto.nombre),
        materiales: this.materiales.map(m => ({
          material_id: m.producto.id,
          cantidad_utilizada: m.cantidad,
          precio_neto_al_momento: m.producto.precio_neto
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