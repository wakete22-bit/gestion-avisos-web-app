import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  saveOutline, 
  addCircleOutline, 
  trashOutline, 
  refreshOutline,
  listOutline,
  close,
  searchOutline,
  addCircle,
  cubeOutline,
  alertCircleOutline
} from 'ionicons/icons';
import { PresupuestosService, CrearPresupuestoRequest } from '../../services/presupuestos.service';
import { AvisosService } from '../../../../core/services/avisos.service';
import { InventarioService } from '../../../inventario/services/inventario.service';
import { Inventario } from '../../../inventario/models/inventario.model';

@Component({
  selector: 'app-crear-presupuesto',
  templateUrl: './crear-presupuesto.component.html',
  styleUrls: ['./crear-presupuesto.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonContent, IonIcon]
})
export class CrearPresupuestoComponent implements OnInit {
  presupuestoForm: FormGroup;
  avisoId: string | null = null;
  presupuestoId: string | null = null;
  aviso: any = null;
  presupuesto: any = null;
  loading = false;
  materiales: any[] = [];
  modoEdicion = false;
  
  // Variables para la selección de materiales del inventario
  productosInventario: Inventario[] = [];
  productosFiltrados: Inventario[] = [];
  loadingProductos = false;
  errorProductos: string | null = null;
  busquedaProducto = '';
  mostrarSelectorMateriales = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private presupuestosService: PresupuestosService,
    private avisosService: AvisosService,
    private inventarioService: InventarioService
  ) {
    addIcons({
      arrowBackOutline,
      saveOutline,
      addCircleOutline,
      trashOutline,
      refreshOutline,
      listOutline,
      close,
      searchOutline,
      addCircle,
      cubeOutline,
      alertCircleOutline
    });
    
    this.presupuestoForm = this.fb.group({
      horas_estimadas: [0, [Validators.required, Validators.min(0)]],
      total_estimado: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.cargarAviso();
    this.cargarProductosInventario();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarAviso() {
    this.route.queryParams.subscribe(params => {
      this.avisoId = params['avisoId'];
      this.presupuestoId = params['id'];
      this.modoEdicion = params['edit'] === 'true';

      if (this.avisoId) {
        this.avisosService.getAviso(this.avisoId).subscribe({
          next: (aviso: any) => {
            this.aviso = aviso;
          },
          error: (error: any) => {
            console.error('Error al cargar aviso:', error);
          }
        });
      }

      if (this.presupuestoId && this.modoEdicion) {
        this.cargarPresupuestoParaEditar();
      }
    });
  }

  /**
   * Carga los productos del inventario
   */
  cargarProductosInventario() {
    this.loadingProductos = true;
    this.errorProductos = null;

    this.inventarioService.getInventario(1, 1000, '', 'nombre', 'asc', false)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.productosInventario = response.inventario;
          this.productosFiltrados = [...this.productosInventario];
          this.loadingProductos = false;
        },
        error: (error) => {
          console.error('Error al cargar productos del inventario:', error);
          this.errorProductos = 'Error al cargar productos del inventario';
          this.loadingProductos = false;
        }
      });
  }

  /**
   * Filtra productos del inventario por búsqueda
   */
  filtrarProductos(termino: string) {
    this.busquedaProducto = termino;
    if (!termino.trim()) {
      this.productosFiltrados = [...this.productosInventario];
    } else {
      this.productosFiltrados = this.productosInventario.filter(producto =>
        producto.nombre.toLowerCase().includes(termino.toLowerCase()) ||
        producto.codigo.toLowerCase().includes(termino.toLowerCase()) ||
        (producto.descripcion?.toLowerCase() || '').includes(termino.toLowerCase())
      );
    }
  }

  /**
   * Abre el selector de materiales
   */
  abrirSelectorMateriales() {
    this.mostrarSelectorMateriales = true;
    this.productosFiltrados = [...this.productosInventario];
    this.busquedaProducto = '';
  }

  /**
   * Cierra el selector de materiales
   */
  cerrarSelectorMateriales() {
    this.mostrarSelectorMateriales = false;
  }

  /**
   * Añade un producto del inventario como material
   */
  agregarMaterialDelInventario(producto: Inventario) {
    // Verificar si el producto ya está en la lista
    const yaExiste = this.materiales.find(m => m.material_id === producto.id);
    
    if (yaExiste) {
      // Si ya existe, incrementar la cantidad
      yaExiste.cantidad_estimada = (yaExiste.cantidad_estimada || 0) + 1;
    } else {
      // Si no existe, añadirlo con cantidad 1
      this.materiales.push({
        material_id: producto.id,
        cantidad_estimada: 1,
        precio_unitario_al_momento: producto.precio_neto,
        producto: producto // Guardar referencia al producto para mostrar información
      });
    }
    
    this.calcularTotal();
    this.cerrarSelectorMateriales();
  }

  /**
   * Obtiene el nombre del producto por ID
   */
  getNombreProducto(materialId: string): string {
    const producto = this.productosInventario.find(p => p.id === materialId);
    return producto ? producto.nombre : 'Producto no encontrado';
  }

  /**
   * Obtiene el precio del producto por ID
   */
  getPrecioProducto(materialId: string): number {
    const producto = this.productosInventario.find(p => p.id === materialId);
    return producto ? producto.precio_neto : 0;
  }

  cargarPresupuestoParaEditar() {
    if (!this.presupuestoId) return;

    this.loading = true;
    this.presupuestosService.getPresupuesto(this.presupuestoId).subscribe({
      next: (presupuesto) => {
        this.presupuesto = presupuesto;
        this.presupuestoForm.patchValue({
          horas_estimadas: presupuesto.horas_estimadas,
          total_estimado: presupuesto.total_estimado
        });

        // Cargar materiales si existen
        if (presupuesto.materiales && presupuesto.materiales.length > 0) {
          this.materiales = presupuesto.materiales.map((material: any) => ({
            material_id: material.material_id,
            cantidad_estimada: material.cantidad_estimada,
            precio_unitario_al_momento: material.precio_unitario_al_momento
          }));
        }

        setTimeout(() => {
          this.calcularTotal();
        }, 100);
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar presupuesto para editar:', error);
        this.loading = false;
      }
    });
  }

  agregarMaterial() {
    this.materiales.push({
      material_id: '',
      cantidad_estimada: 1,
      precio_unitario_al_momento: 0
    });
  }

  eliminarMaterial(index: number) {
    this.materiales.splice(index, 1);
    this.calcularTotal();
  }

  /**
   * Actualiza la cantidad de un material
   */
  actualizarCantidadMaterial(index: number, nuevaCantidad: string) {
    if (this.materiales[index]) {
      this.materiales[index].cantidad_estimada = parseInt(nuevaCantidad) || 1;
      this.calcularTotal();
    }
  }

  /**
   * Actualiza el precio de un material
   */
  actualizarPrecioMaterial(index: number, nuevoPrecio: string) {
    if (this.materiales[index]) {
      this.materiales[index].precio_unitario_al_momento = parseFloat(nuevoPrecio) || 0;
      this.calcularTotal();
    }
  }

  /**
   * Calcula el costo total de materiales
   */
  calcularCostoTotalMateriales(): number {
    return this.materiales.reduce((total, m) => total + (m.cantidad_estimada * m.precio_unitario_al_momento), 0);
  }

  calcularTotal() {
    const horasEstimadas = this.presupuestoForm.get('horas_estimadas')?.value || 0;
    const precioPorHora = 50; // Esto debería venir de configuración
    const costoManoObra = horasEstimadas * precioPorHora;
    
    const costoMateriales = this.materiales.reduce((total, material) => {
      const cantidad = material.cantidad_estimada || 0;
      const precio = material.precio_unitario_al_momento || 0;
      return total + (cantidad * precio);
    }, 0);
    
    const totalEstimado = costoManoObra + costoMateriales;
    console.log('Calculando total:', {
      horasEstimadas,
      precioPorHora,
      costoManoObra,
      costoMateriales,
      totalEstimado
    });
    
    this.presupuestoForm.patchValue({ total_estimado: totalEstimado });
  }

  guardarPresupuesto() {
    if (!this.presupuestoForm.valid || !this.avisoId) {
      return;
    }

    this.loading = true;
    
    if (this.modoEdicion && this.presupuestoId) {
      // Modo edición - actualizar presupuesto existente
      const presupuestoData = {
        horas_estimadas: this.presupuestoForm.get('horas_estimadas')?.value,
        total_estimado: this.presupuestoForm.get('total_estimado')?.value
      };

      this.presupuestosService.actualizarPresupuesto(this.presupuestoId, presupuestoData).subscribe({
        next: (presupuesto) => {
          console.log('Presupuesto actualizado:', presupuesto);
          this.loading = false;
          this.router.navigate(['/presupuestos']);
        },
        error: (error) => {
          console.error('Error al actualizar presupuesto:', error);
          this.loading = false;
        }
      });
    } else {
      // Modo creación - crear nuevo presupuesto
      const presupuestoData: CrearPresupuestoRequest = {
        aviso_id: this.avisoId,
        horas_estimadas: this.presupuestoForm.get('horas_estimadas')?.value,
        total_estimado: this.presupuestoForm.get('total_estimado')?.value,
        materiales: this.materiales
      };

      this.presupuestosService.crearPresupuesto(presupuestoData).subscribe({
        next: (presupuesto) => {
          console.log('Presupuesto creado:', presupuesto);
          this.loading = false;
          this.router.navigate(['/presupuestos']);
        },
        error: (error) => {
          console.error('Error al crear presupuesto:', error);
          this.loading = false;
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/presupuestos']);
  }
} 