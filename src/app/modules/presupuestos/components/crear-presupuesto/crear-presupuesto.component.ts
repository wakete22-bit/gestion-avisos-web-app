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
  alertCircleOutline, informationCircleOutline, checkmarkCircleOutline, closeCircleOutline, banOutline, checkmarkOutline } from 'ionicons/icons';
import { PresupuestosService, CrearPresupuestoRequest } from '../../services/presupuestos.service';
import { AvisosService } from '../../../../core/services/avisos.service';
import { InventarioService } from '../../../inventario/services/inventario.service';
import { Inventario } from '../../../inventario/models/inventario.model';
import { SupabaseClientService } from '../../../../core/services/supabase-client.service';
import { ConfiguracionService } from '../../../../core/services/configuracion.service';

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

  // Variables para el formulario manual de materiales
  mostrarFormularioMaterial = false;
  materialManualForm: FormGroup;

  // Variables para la selección de avisos
  avisos: any[] = [];
  avisosFiltrados: any[] = [];
  loadingAvisos = false;
  errorAvisos: string | null = null;
  busquedaAviso = '';
  mostrarSelectorAvisos = false;
  
  // Variable para almacenar albaranes del aviso
  albaranesAviso: any[] = [];

  private destroy$ = new Subject<void>();
  private formStatusSubscription: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private presupuestosService: PresupuestosService,
    private avisosService: AvisosService,
    private inventarioService: InventarioService,
    private supabaseClientService: SupabaseClientService,
    private configuracionService: ConfiguracionService
  ) {
    addIcons({arrowBackOutline,refreshOutline,listOutline,close,searchOutline,alertCircleOutline,addCircleOutline,cubeOutline,checkmarkOutline,trashOutline,saveOutline,checkmarkCircleOutline,closeCircleOutline,banOutline,informationCircleOutline,addCircle});
    
    this.presupuestoForm = this.fb.group({
      horas_estimadas: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
      total_estimado: [0, [Validators.required, Validators.min(0), Validators.max(1000000)]],
      estado: ['Pendiente', Validators.required]
    });

    // Inicializar formulario para material manual
    this.materialManualForm = this.fb.group({
      denominacion: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0)]]
    });

    // Suscribirse a cambios en el formulario para debugging
    this.formStatusSubscription = this.presupuestoForm.statusChanges.subscribe(status => {
      console.log('Estado del formulario:', status);
      console.log('Formulario válido:', this.presupuestoForm.valid);
      console.log('Errores:', this.presupuestoForm.errors);
    });
  }

  ngOnInit() {
    console.log('ngOnInit - Iniciando componente crear presupuesto');
    
    // Cargar productos del inventario primero
    this.cargarProductosInventario();
    
    // Cargar aviso si existe en la URL
    this.cargarAviso();
    
    // Solo cargar la lista de avisos si NO estamos en modo edición
    // En modo edición, ya tenemos el aviso y no necesitamos el selector
    if (!this.modoEdicion) {
      console.log('ngOnInit - Cargando lista de avisos para selector...');
      this.cargarAvisos();
    } else {
      console.log('ngOnInit - Modo edición: no se cargan avisos para selector');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.formStatusSubscription) {
      this.formStatusSubscription.unsubscribe();
    }
  }

  cargarAviso() {
    this.route.queryParams.subscribe(params => {
      this.avisoId = params['avisoId'];
      this.presupuestoId = params['id'];
      this.modoEdicion = params['edit'] === 'true';

      console.log('Parámetros de ruta:', {
        avisoId: this.avisoId,
        presupuestoId: this.presupuestoId,
        modoEdicion: this.modoEdicion
      });

      // Solo cargar aviso si hay avisoId en la URL
      if (this.avisoId) {
        console.log('Cargando aviso específico:', this.avisoId);
        this.avisosService.getAviso(this.avisoId).subscribe({
          next: (aviso: any) => {
            this.aviso = aviso;
            console.log('Aviso específico cargado:', aviso);
          },
          error: (error: any) => {
            console.error('Error al cargar aviso específico:', error);
          }
        });
      } else if (!this.modoEdicion) {
        // Solo mostrar selector de avisos si NO estamos editando
        console.log('No hay avisoId en la URL y no es edición, se mostrará el selector de avisos');
      } else {
        console.log('Modo edición sin avisoId: se espera que se cargue desde el presupuesto');
      }

      // Cargar presupuesto para editar si es necesario
      if (this.presupuestoId && this.modoEdicion) {
        this.cargarPresupuestoParaEditar();
      }
    });
  }

  /**
   * Verifica los precios de los productos del inventario
   */
  verificarPreciosInventario() {
    console.log('Verificando precios del inventario...');
    this.productosInventario.forEach((producto, index) => {
      console.log(`Producto ${index + 1}:`, {
        id: producto.id,
        nombre: producto.nombre,
        precio_neto: producto.precio_neto,
        tipo_precio: typeof producto.precio_neto,
        es_valido: !isNaN(producto.precio_neto) && isFinite(producto.precio_neto)
      });
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
          console.log('Productos del inventario cargados:', this.productosInventario.length);
          
          // Verificar precios de los productos
          this.verificarPreciosInventario();
          
          // Si estamos en modo edición y tenemos materiales pendientes de procesar
          if (this.modoEdicion && this.presupuesto && this.presupuesto.materiales_estimados) {
            console.log('Reprocesando materiales después de cargar inventario');
            this.procesarMateriales(this.presupuesto.materiales_estimados);
          }
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
  filtrarProductos(event: any) {
    const termino = event?.target?.value || event || '';
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
    console.log('Agregando material del inventario:', producto);
    console.log('Precio del producto:', producto.precio_neto);
    
    // Verificar si el producto ya está en la lista
    const yaExiste = this.materiales.find(m => m.material_id === producto.id);
    
    if (yaExiste) {
      // Si ya existe, incrementar la cantidad
      yaExiste.cantidad_estimada = (yaExiste.cantidad_estimada || 0) + 1;
      console.log('Material existente actualizado:', yaExiste);
    } else {
      // Si no existe, añadirlo con cantidad 1
      const nuevoMaterial = {
        material_id: producto.id,
        cantidad_estimada: 1,
        precio_neto_al_momento: producto.precio_neto,
        producto: producto // Guardar referencia al producto para mostrar información
      };
      this.materiales.push(nuevoMaterial);
      console.log('Nuevo material agregado:', nuevoMaterial);
    }
    
    this.calcularTotal(true); // Sin verificación para evitar bucle
    this.cerrarSelectorMateriales();
  }

  /**
   * Obtiene el nombre del producto por ID
   */
  getNombreProducto(materialId: string): string {
    // Primero buscar en los productos del inventario
    const producto = this.productosInventario.find(p => p.id === materialId);
    if (producto) {
      return producto.nombre;
    }
    
    // Si no se encuentra en el inventario, buscar en los materiales del presupuesto
    const material = this.materiales.find(m => m.material_id === materialId);
    if (material && material.producto) {
      return material.producto.nombre || 'Producto no encontrado';
    }
    
    return 'Producto no encontrado';
  }

  /**
   * Obtiene el precio del producto por ID
   */
  getPrecioProducto(materialId: string): number {
    // Primero buscar en los productos del inventario
    const producto = this.productosInventario.find(p => p.id === materialId);
    if (producto) {
      return producto.precio_neto;
    }
    
    // Si no se encuentra en el inventario, buscar en los materiales del presupuesto
    const material = this.materiales.find(m => m.material_id === materialId);
    if (material && material.producto) {
      return material.producto.precio_neto || 0;
    }
    
    return 0;
  }

  cargarPresupuestoParaEditar() {
    if (!this.presupuestoId) return;

    this.loading = true;
    this.presupuestosService.getPresupuesto(this.presupuestoId).subscribe({
      next: (presupuesto) => {
        console.log('Presupuesto cargado para editar:', presupuesto);
        this.presupuesto = presupuesto;
        
        // Establecer el avisoId desde el presupuesto
        if (presupuesto.aviso_id) {
          this.avisoId = presupuesto.aviso_id;
          console.log('AvisoId establecido:', this.avisoId);
          
          // Cargar el aviso correspondiente
          this.avisosService.getAviso(this.avisoId).subscribe({
            next: (aviso: any) => {
              this.aviso = aviso;
              console.log('Aviso cargado desde presupuesto:', aviso);
            },
            error: (error: any) => {
              console.error('Error al cargar aviso desde presupuesto:', error);
            }
          });
        }
        
        this.presupuestoForm.patchValue({
          horas_estimadas: presupuesto.horas_estimadas,
          total_estimado: presupuesto.total_estimado,
          estado: presupuesto.estado || 'Pendiente'
        });

        // Cargar materiales si existen - esperar a que los productos del inventario estén cargados
        if (presupuesto.materiales_estimados && presupuesto.materiales_estimados.length > 0) {
          console.log('Materiales encontrados:', presupuesto.materiales_estimados);
          
          // Esperar a que los productos del inventario estén cargados
          if (this.productosInventario.length > 0) {
            this.procesarMateriales(presupuesto.materiales_estimados);
          } else {
            // Si no están cargados, esperar un poco y reintentar
            setTimeout(() => {
              this.procesarMateriales(presupuesto.materiales_estimados);
            }, 500);
          }
        } else {
          console.log('No se encontraron materiales en el presupuesto');
          this.materiales = [];
        }

        setTimeout(() => {
          this.calcularTotal(true);
        }, 100);
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar presupuesto para editar:', error);
        this.loading = false;
      }
    });
  }

  /**
   * Procesa los materiales del presupuesto
   */
  procesarMateriales(materialesPresupuesto: any[]) {
    console.log('Procesando materiales:', materialesPresupuesto);
    this.materiales = materialesPresupuesto.map((material: any) => {
      console.log('Procesando material:', material);
      console.log('Precio del material:', material.precio_neto_al_momento);
      console.log('Material completo:', material);
      
      const materialProcesado = {
        material_id: material.material_id,
        cantidad_estimada: material.cantidad_estimada || 1,
        precio_neto_al_momento: material.precio_neto_al_momento || 0,
        producto: material.producto || material.material // Usar producto si existe, sino material
      };
      
      console.log('Material procesado:', materialProcesado);
      return materialProcesado;
    });
    console.log('Materiales procesados:', this.materiales);
  }

  /**
   * Muestra el formulario para agregar material manual
   */
  mostrarFormularioManual() {
    this.mostrarFormularioMaterial = true;
    this.materialManualForm.reset({
      denominacion: '',
      cantidad: 1,
      precio: 0
    });
  }

  /**
   * Cierra el formulario manual
   */
  cerrarFormularioManual() {
    this.mostrarFormularioMaterial = false;
    this.materialManualForm.reset({
      denominacion: '',
      cantidad: 1,
      precio: 0
    });
  }

  /**
   * Agrega un material desde el formulario manual
   */
  agregarMaterialDesdeFormulario() {
    console.log('🔍 Debug - materialManualForm value:', this.materialManualForm.value);
    console.log('🔍 Debug - materialManualForm valid:', this.materialManualForm.valid);
    
    // Validar el formulario
    if (this.materialManualForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      this.materialManualForm.markAllAsTouched();
      
      if (this.materialManualForm.get('denominacion')?.invalid) {
        alert('Por favor, introduce la denominación del material');
        return;
      }
      
      if (this.materialManualForm.get('cantidad')?.invalid) {
        alert('La cantidad debe ser mayor a 0');
        return;
      }
      
      if (this.materialManualForm.get('precio')?.invalid) {
        alert('El precio debe ser mayor o igual a 0');
        return;
      }
      
      return;
    }

    const formValue = this.materialManualForm.value;
    const materialManual = {
      material_id: this.generarUUID(), // Generar ID temporal
      cantidad_estimada: formValue.cantidad,
      precio_neto_al_momento: formValue.precio || 0,
      producto: {
        id: this.generarUUID(),
        nombre: formValue.denominacion.trim(),
        precio_neto: formValue.precio || 0,
        unidad: 'unidad'
      }
    };

    console.log('🔍 agregarMaterialDesdeFormulario - Material manual creado:', materialManual);
    this.materiales.push(materialManual);
    this.calcularTotal(true);

    // Cerrar formulario y limpiar
    this.cerrarFormularioManual();
  }

  eliminarMaterial(index: number) {
    console.log('Eliminando material en índice:', index);
    console.log('Material a eliminar:', this.materiales[index]);
    
    this.materiales.splice(index, 1);
    console.log('Materiales después de eliminar:', this.materiales);
    
    // Recalcular el total y actualizar el formulario
    this.calcularTotal(true); // Sin verificación para evitar bucle
    
    // Forzar la actualización del formulario
    this.presupuestoForm.updateValueAndValidity();
    
    console.log('Total estimado después de eliminar material:', this.presupuestoForm.get('total_estimado')?.value);
    
    // Verificar el estado después de eliminar
    this.verificarEstadoMateriales();
  }

  /**
   * Actualiza la cantidad de un material
   */
  actualizarCantidadMaterial(index: number, event: any) {
    const nuevaCantidad = event?.target?.value || event || '1';
    console.log('Actualizando cantidad del material:', index, 'Nueva cantidad:', nuevaCantidad);
    
    if (this.materiales[index]) {
      this.materiales[index].cantidad_estimada = parseInt(nuevaCantidad) || 1;
      console.log('Material actualizado:', this.materiales[index]);
      this.calcularTotal(true); // Sin verificación para evitar bucle
      this.verificarEstadoMateriales();
    }
  }

  /**
   * Actualiza el precio de un material
   */
  actualizarPrecioMaterial(index: number, event: any) {
    const nuevoPrecio = event?.target?.value || event || '0';
    console.log('Actualizando precio del material:', index, 'Nuevo precio:', nuevoPrecio);
    
    if (this.materiales[index]) {
      this.materiales[index].precio_neto_al_momento = parseFloat(nuevoPrecio) || 0;
      console.log('Material actualizado:', this.materiales[index]);
      this.calcularTotal(true); // Sin verificación para evitar bucle
      this.verificarEstadoMateriales();
    }
  }

  /**
   * Verifica el estado de los materiales y el total
   */
  verificarEstadoMateriales() {
    console.log('=== Verificación de Estado de Materiales ===');
    console.log('Cantidad de materiales:', this.materiales.length);
    console.log('Materiales:', this.materiales);
    console.log('Total estimado en formulario:', this.presupuestoForm.get('total_estimado')?.value);
    console.log('Costo total calculado:', this.calcularCostoTotalMateriales());
    
    // Calcular el total sin verificación para evitar bucle infinito
    const horasEstimadas = this.presupuestoForm.get('horas_estimadas')?.value || 0;
    const precioPorHora = this.configuracionService.getPrecioHoraManoObraSync();
    const costoManoObra = horasEstimadas * precioPorHora;
    const costoMateriales = this.materiales.reduce((total, material) => {
      const cantidad = material.cantidad_estimada || 0;
      const precio = material.precio_neto_al_momento || 0;
      return total + (cantidad * precio);
    }, 0);
    const totalCalculado = costoManoObra + costoMateriales;
    
    console.log('Total calculado (mano obra + materiales):', totalCalculado);
    console.log('==========================================');
  }

  /**
   * Calcula el costo total de materiales
   */
  calcularCostoTotalMateriales(): number {
    return this.materiales.reduce((total, m) => total + (m.cantidad_estimada * m.precio_neto_al_momento), 0);
  }

  calcularTotal(sinVerificacion: boolean = false) {
    console.log('Calculando total...');
    console.log('Materiales actuales:', this.materiales);
    
    const horasEstimadas = this.presupuestoForm.get('horas_estimadas')?.value || 0;
    const precioPorHora = this.configuracionService.getPrecioHoraManoObraSync();
    const costoManoObra = horasEstimadas * precioPorHora;
    
    const costoMateriales = this.materiales.reduce((total, material) => {
      const cantidad = material.cantidad_estimada || 0;
      const precio = material.precio_neto_al_momento || 0;
      const subtotal = cantidad * precio;
      console.log(`Material: ${material.material_id}, Cantidad: ${cantidad}, Precio: ${precio}, Subtotal: ${subtotal}`);
      return total + subtotal;
    }, 0);
    
    const totalEstimado = costoManoObra + costoMateriales;
    console.log('Calculando total:', {
      horasEstimadas,
      precioPorHora,
      costoManoObra,
      costoMateriales,
      totalEstimado
    });
    
    // Asegurar que el valor sea un número válido
    if (isNaN(totalEstimado) || !isFinite(totalEstimado)) {
      console.error('Error: Total calculado no es un número válido');
      this.presupuestoForm.patchValue({ total_estimado: 0 });
    } else {
      this.presupuestoForm.patchValue({ total_estimado: totalEstimado });
    }
    
    // Forzar la validación del formulario
    this.presupuestoForm.updateValueAndValidity();
    console.log('Formulario después de calcular total:', {
      válido: this.presupuestoForm.valid,
      errores: this.presupuestoForm.errors,
      total_estimado: this.presupuestoForm.get('total_estimado')?.value
    });
    
    // Solo verificar si no se especifica sinVerificacion
    if (!sinVerificacion) {
      this.verificarEstadoMateriales();
    }
  }

  /**
   * Limpia materiales vacíos o inválidos
   */
  limpiarMaterialesInvalidos(): void {
    console.log('Limpiando materiales inválidos...');
    console.log('Materiales antes de limpiar:', this.materiales);
    
    // Filtrar solo materiales válidos
    this.materiales = this.materiales.filter(material => 
      material.material_id && 
      material.cantidad_estimada > 0 && 
      material.precio_neto_al_momento >= 0
    );
    
    console.log('Materiales después de limpiar:', this.materiales);
  }

  /**
   * Verifica el estado de los materiales antes de guardar
   */
  verificarMaterialesAntesDeGuardar(): void {
    console.log('=== Verificación de Materiales Antes de Guardar ===');
    console.log('Cantidad de materiales:', this.materiales.length);
    console.log('Materiales:', this.materiales);
    console.log('Materiales válidos:', this.materiales.filter(m => m.material_id && m.cantidad_estimada > 0));
    console.log('Materiales con precio válido:', this.materiales.filter(m => m.precio_neto_al_momento > 0));
    console.log('==================================================');
  }

  /**
   * Verifica si el formulario está listo para guardar
   */
  verificarFormulario(): boolean {
    console.log('Verificando formulario...');
    console.log('AvisoId actual:', this.avisoId);
    console.log('Modo edición:', this.modoEdicion);
    console.log('PresupuestoId:', this.presupuestoId);
    
    // Verificar avisoId
    if (!this.avisoId) {
      console.error('No hay avisoId');
      return false;
    }
    
    // Verificar si el formulario es válido
    if (!this.presupuestoForm.valid) {
      console.error('Formulario inválido');
      console.log('Errores del formulario:', this.presupuestoForm.errors);
      console.log('Errores de horas_estimadas:', this.presupuestoForm.get('horas_estimadas')?.errors);
      console.log('Errores de total_estimado:', this.presupuestoForm.get('total_estimado')?.errors);
      return false;
    }
    
    // Verificar valores mínimos
    const horasEstimadas = this.presupuestoForm.get('horas_estimadas')?.value;
    const totalEstimado = this.presupuestoForm.get('total_estimado')?.value;
    
    if (horasEstimadas < 0 || totalEstimado < 0) {
      console.error('Valores negativos no permitidos');
      return false;
    }
    
    console.log('Formulario verificado correctamente');
    return true;
  }

  guardarPresupuesto() {
    console.log('Iniciando guardarPresupuesto...');
    console.log('Formulario válido:', this.presupuestoForm.valid);
    console.log('Aviso ID:', this.avisoId);
    console.log('Valores del formulario:', this.presupuestoForm.value);
    console.log('Materiales:', this.materiales);

    // Usar el método de verificación
    if (!this.verificarFormulario()) {
      alert('Por favor, complete todos los campos requeridos correctamente');
      return;
    }

    this.loading = true;
    console.log('Iniciando operación de guardado...');
    
    // Verificar materiales antes de guardar
    this.verificarMaterialesAntesDeGuardar();
    
    // Limpiar materiales inválidos
    this.limpiarMaterialesInvalidos();
    
    if (this.modoEdicion && this.presupuestoId) {
      // Modo edición - actualizar presupuesto existente
      console.log('Modo edición - actualizando presupuesto:', this.presupuestoId);
      const presupuestoData = {
        horas_estimadas: this.presupuestoForm.get('horas_estimadas')?.value,
        total_estimado: this.presupuestoForm.get('total_estimado')?.value,
        estado: this.presupuestoForm.get('estado')?.value,
        materiales: this.materiales // Incluir materiales en la actualización
      };

      console.log('Datos para actualizar:', presupuestoData);
      console.log('Materiales a actualizar:', this.materiales);
      console.log('Cantidad de materiales:', this.materiales.length);
      console.log('Materiales detallados:', JSON.stringify(this.materiales, null, 2));

      this.presupuestosService.actualizarPresupuesto(this.presupuestoId, presupuestoData).subscribe({
        next: (presupuesto) => {
          console.log('Presupuesto actualizado exitosamente:', presupuesto);
          this.loading = false;
          
          // Mostrar mensaje de éxito sin navegación automática
          alert('✅ Presupuesto actualizado correctamente');
        },
        error: (error) => {
          console.error('Error al actualizar presupuesto:', error);
          this.loading = false;
          alert('Error al actualizar el presupuesto: ' + (error.message || 'Error desconocido'));
        }
      });
    } else {
      // Modo creación - crear nuevo presupuesto
      console.log('Modo creación - creando nuevo presupuesto');
      
      // Verificar que tenemos un albarán antes de crear el presupuesto
      if (!this.albaranesAviso || this.albaranesAviso.length === 0) {
        alert('Error: No se ha creado un albarán. Intente seleccionar el aviso nuevamente.');
        this.loading = false;
        return;
      }
      
      const albaranId = this.albaranesAviso[0].id;
      console.log('Usando albarán ID:', albaranId);
      
      const presupuestoData: CrearPresupuestoRequest = {
        aviso_id: this.avisoId || '',
        albaran_id: albaranId,
        horas_estimadas: this.presupuestoForm.get('horas_estimadas')?.value,
        total_estimado: this.presupuestoForm.get('total_estimado')?.value,
        estado: this.presupuestoForm.get('estado')?.value,
        materiales: this.materiales
      };

      console.log('Datos para crear:', presupuestoData);

      this.presupuestosService.crearPresupuesto(presupuestoData).subscribe({
        next: (presupuesto) => {
          console.log('Presupuesto creado exitosamente:', presupuesto);
          this.loading = false;
          
          // Mostrar mensaje de éxito sin navegación automática  
          alert('✅ Presupuesto creado correctamente');
          
          // Cambiar a modo edición para poder continuar editando
          this.modoEdicion = true;
          this.presupuestoId = presupuesto.id;
          this.presupuesto = presupuesto;
        },
        error: (error) => {
          console.error('Error al crear presupuesto:', error);
          this.loading = false;
          alert('Error al crear el presupuesto: ' + (error.message || 'Error desconocido'));
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/presupuestos']);
  }

  /**
   * Vuelve al aviso desde el que se creó el presupuesto
   */
  volverAlAviso() {
    if (this.avisoId) {
      console.log('🔄 Volviendo al aviso:', this.avisoId);
      this.router.navigate(['/avisos', this.avisoId]);
    } else {
      console.warn('No hay avisoId para volver');
      this.volver();
    }
  }

  /**
   * Aprueba el presupuesto (marca como aprobado)
   */
  aprobarPresupuesto() {
    if (!this.modoEdicion || !this.presupuestoId) {
      alert('Primero debes guardar el presupuesto antes de aprobarlo');
      return;
    }

    const confirmar = confirm(
      '¿Estás seguro de que quieres aprobar este presupuesto?\n\n' +
      'Al aprobarlo:\n' +
      '• El presupuesto se marcará como "Aprobado"\n' +
      '• El albarán asociado cambiará de "Presupuesto pendiente" a "Finalizado"\n' +
      '• Esta acción no se puede deshacer'
    );

    if (confirmar) {
      this.loading = true;
      
      // Primero, obtener el presupuesto actual para saber qué albarán actualizar
      this.presupuestosService.getPresupuesto(this.presupuestoId).subscribe({
        next: (presupuestoActual) => {
          console.log('Presupuesto actual:', presupuestoActual);
          
          // Actualizar el estado del presupuesto
          const presupuestoData = {
            estado: 'Aprobado' as const
          };

          this.presupuestosService.actualizarPresupuesto(this.presupuestoId!, presupuestoData).subscribe({
            next: (presupuesto) => {
              console.log('Presupuesto aprobado exitosamente:', presupuesto);
              
              // Ahora actualizar el albarán asociado
              if (presupuestoActual.albaran_id || presupuestoActual.albaran?.id) {
                const albaranId = presupuestoActual.albaran_id || presupuestoActual.albaran.id;
                this.actualizarAlbaranAsociado(albaranId);
              } else {
                console.warn('No se encontró albaran_id en el presupuesto');
                this.finalizarAprobacion();
              }
            },
            error: (error) => {
              console.error('Error al aprobar presupuesto:', error);
              this.loading = false;
              alert('Error al aprobar el presupuesto: ' + (error.message || 'Error desconocido'));
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener presupuesto actual:', error);
          this.loading = false;
          alert('Error al obtener los datos del presupuesto: ' + (error.message || 'Error desconocido'));
        }
      });
    }
  }

  /**
   * Actualiza el albarán asociado cuando se aprueba el presupuesto
   */
  private actualizarAlbaranAsociado(albaranId: string) {
    console.log('Actualizando albarán asociado:', albaranId);
    
    // Usar Supabase directamente para actualizar el albarán
    this.supabaseClientService.getClient()
      .from('albaranes')
      .update({
        estado_cierre: 'Finalizado',
        fecha_actualizacion: new Date().toISOString()
      })
      .eq('id', albaranId)
      .select()
      .single()
      .then(({ data: albaranActualizado, error }) => {
        if (error) {
          console.error('Error al actualizar albarán:', error);
          // Aunque falle la actualización del albarán, el presupuesto ya está aprobado
          alert('⚠️ Presupuesto aprobado, pero hubo un error al actualizar el albarán. Contacta al administrador.');
        } else {
          console.log('Albarán actualizado exitosamente:', albaranActualizado);
        }
        
        this.finalizarAprobacion();
      });
  }

  /**
   * Finaliza el proceso de aprobación
   */
  private finalizarAprobacion() {
    this.loading = false;
    
    // Actualizar el formulario
    this.presupuestoForm.patchValue({ estado: 'Aprobado' });
    
    alert('✅ Presupuesto aprobado exitosamente. El albarán ha sido marcado como finalizado.');
  }

  /**
   * Carga la lista de avisos disponibles
   */
  cargarAvisos() {
    console.log('🔄 Iniciando carga de avisos...');
    this.loadingAvisos = true;
    this.errorAvisos = null;
    
    // Cargar avisos con estado 'Pendiente' y 'En curso'
    this.avisosService.getAvisos(1, 1000, '', 'fecha_creacion', 'desc', 'Pendiente')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.avisos = response.avisos || [];
          this.avisosFiltrados = [...this.avisos];
          this.loadingAvisos = false;
          console.log('✅ Avisos cargados exitosamente:', this.avisos.length);
          console.log('📋 Primeros 3 avisos:', this.avisos.slice(0, 3));
          
          // Verificar que el selector se muestre correctamente
          if (this.avisos.length === 0) {
            console.log('⚠️ No se encontraron avisos');
          } else {
            console.log('🎯 Selector de avisos listo para mostrar');
          }
        },
        error: (error) => {
          console.error('❌ Error al cargar avisos:', error);
          this.errorAvisos = 'Error al cargar avisos: ' + (error.message || 'Error desconocido');
          this.loadingAvisos = false;
        }
      });
  }

  /**
   * Filtra avisos por búsqueda
   */
  filtrarAvisos(event: any) {
    const termino = event?.target?.value || event || '';
    this.busquedaAviso = termino;
    if (!termino.trim()) {
      this.avisosFiltrados = [...this.avisos];
    } else {
      this.avisosFiltrados = this.avisos.filter(aviso =>
        aviso.nombre_cliente_aviso?.toLowerCase().includes(termino.toLowerCase()) ||
        aviso.descripcion_problema?.toLowerCase().includes(termino.toLowerCase())
      );
    }
  }

  /**
   * Abre el selector de avisos
   */
  abrirSelectorAvisos() {
    // No permitir abrir selector en modo edición
    if (this.modoEdicion) {
      console.log('No se puede abrir selector de avisos en modo edición');
      return;
    }
    
    this.mostrarSelectorAvisos = true;
    this.avisosFiltrados = [...this.avisos];
    this.busquedaAviso = '';
  }

  /**
   * Cierra el selector de avisos
   */
  cerrarSelectorAvisos() {
    this.mostrarSelectorAvisos = false;
  }

  /**
   * Selecciona un aviso para el presupuesto
   */
  seleccionarAviso(aviso: any) {
    // No permitir seleccionar aviso si estamos editando
    if (this.modoEdicion) {
      console.log('No se puede cambiar el aviso en modo edición');
      return;
    }
    
    this.avisoId = aviso.id;
    this.aviso = aviso;
    this.cerrarSelectorAvisos();
    this.materiales = [];
    this.calcularTotal(true);
    console.log('Aviso seleccionado:', aviso);
    
    // Cargar albaranes del aviso seleccionado
    this.cargarAlbaranesAviso(aviso.id);
  }

  /**
   * Carga los albaranes del aviso seleccionado
   */
  cargarAlbaranesAviso(avisoId: string) {
    console.log('Cargando albaranes para aviso:', avisoId);
    
    // Crear un albarán real en la base de datos
    this.crearAlbaranParaPresupuesto(avisoId);
  }

  /**
   * Crea un albarán real en la base de datos para el presupuesto
   */
  crearAlbaranParaPresupuesto(avisoId: string) {
    // No permitir crear albarán en modo edición
    if (this.modoEdicion) {
      console.log('No se puede crear albarán en modo edición');
      return;
    }
    
    const albaranData = {
      aviso_id: avisoId,
      fecha_trabajo: new Date().toISOString().split('T')[0],
      hora_entrada: '09:00:00',
      hora_salida: '17:00:00',
      descripcion_trabajo_realizado: 'Presupuesto pendiente - trabajo por realizar',
      estado_cierre: 'Presupuesto pendiente',
      presupuesto_necesario: 0
    };

    console.log('Creando albarán con datos:', albaranData);
    
    // Usar Supabase directamente para crear el albarán
    this.supabaseClientService.getClient()
      .from('albaranes')
      .insert([albaranData])
      .select()
      .single()
      .then(({ data: albaran, error }) => {
        if (error) {
          console.error('Error al crear albarán:', error);
          alert('Error al crear albarán: ' + error.message);
        } else {
          console.log('Albarán creado exitosamente:', albaran);
          this.albaranesAviso = [albaran];
        }
      });
  }

  /**
   * Genera un UUID temporal (formato válido para la base de datos)
   */
  generarUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Método de depuración para ver el estado del componente
   */
  debugEstado() {
    console.log('=== DEBUG ESTADO COMPONENTE ===');
    console.log('avisoId:', this.avisoId);
    console.log('aviso:', this.aviso);
    console.log('loading:', this.loading);
    console.log('loadingAvisos:', this.loadingAvisos);
    console.log('errorAvisos:', this.errorAvisos);
    console.log('avisos.length:', this.avisos?.length);
    console.log('avisosFiltrados.length:', this.avisosFiltrados?.length);
    console.log('mostrarSelectorAvisos:', this.mostrarSelectorAvisos);
    console.log('modoEdicion:', this.modoEdicion);
    console.log('presupuestoId:', this.presupuestoId);
    console.log('================================');
  }
} 