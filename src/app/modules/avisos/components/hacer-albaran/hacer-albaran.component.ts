import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonInput, IonContent, IonHeader, IonToolbar, IonModal, ModalController, IonFooter } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  close,
  saveOutline,
  timeOutline,
  calendarOutline,
  personOutline,
  pencilOutline,
  documentTextOutline,
  cubeOutline,
  addCircleOutline,
  trashOutline, searchOutline, checkmarkCircleOutline, warningOutline, refreshOutline, checkmarkOutline, createOutline, closeOutline, informationCircleOutline } from 'ionicons/icons';
// TrabajoRealizado eliminado - ahora trabajamos directamente con albaranes
import { Aviso } from '../../models/aviso.model';
import { InventarioService } from '../../../inventario/services/inventario.service';
import { Inventario } from '../../../inventario/models/inventario.model';
import { AlbaranesService } from '../../../../core/services/albaranes.service';
import { AvisosService } from '../../../../core/services/avisos.service';
import { PresupuestosService } from '../../../presupuestos/services/presupuestos.service';
import { RepuestoAlbaran, CrearAlbaranRequest, ESTADOS_CIERRE_ALBARAN } from '../../models/albaran.model';
import { Router } from '@angular/router';
import { ReconnectionService } from '../../../../core/services/reconnection.service';
import { Subscription } from 'rxjs';

// Las interfaces RepuestoAlbaran y CrearAlbaranRequest ahora se importan del modelo

@Component({
  selector: 'app-hacer-albaran',
  templateUrl: './hacer-albaran.component.html',
  styleUrls: ['./hacer-albaran.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonIcon,
    IonInput,
    IonContent,
    IonHeader,
    IonToolbar,
    IonFooter,
  ]
})
export class HacerAlbaranComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() aviso!: Aviso;

  albaranForm: FormGroup;
  loading = false;
  error: string | null = null;

  // Variables para la selección de repuestos
  productosInventario: Inventario[] = [];
  productosFiltrados: Inventario[] = [];
  busquedaRepuesto = '';
  mostrarSelectorRepuestos = false;
  repuestosSeleccionados: RepuestoAlbaran[] = []; // ← CAMBIADO: Ahora incluye cantidades

  // Variables para el formulario manual de repuestos
  mostrarFormularioRepuesto = false;
  repuestoManualForm: FormGroup;

  // Variables para la firma digital
  @ViewChild('signaturePad') signaturePadElement!: ElementRef;
  private signaturePad: any;
  public firmaCapturada = false;
  public firmaDataUrl = '';
  public mostrarCanvas = false;

  // Fecha actual formateada para mostrar en el input
  public fechaActualFormateada: string = '';

  // Estados de cierre disponibles (importados del modelo)
  estadosCierre = ESTADOS_CIERRE_ALBARAN;

  // Variables para manejo de reconexión
  private reconnectionSubscription?: Subscription;
  private isComponentActive = true;



  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private inventarioService: InventarioService,
    private albaranesService: AlbaranesService,
    private avisosService: AvisosService,
    private presupuestosService: PresupuestosService,
    private router: Router,
    private reconnectionService: ReconnectionService
  ) {
    console.log('HacerAlbaranComponent constructor called');
    addIcons({closeOutline,timeOutline,cubeOutline,addCircleOutline,close,searchOutline,trashOutline,informationCircleOutline,createOutline,checkmarkOutline,warningOutline,saveOutline,refreshOutline,checkmarkCircleOutline,calendarOutline,personOutline,pencilOutline,documentTextOutline});

    this.albaranForm = this.fb.group({
      fecha_trabajo: ['', Validators.required],
      fecha_cierre: ['', Validators.required],
      hora_entrada: ['', Validators.required],
      hora_salida: ['', Validators.required],
      descripcion_trabajo_realizado: ['', Validators.required],
      repuestos_utilizados: [[]],
      estado_cierre: ['', Validators.required],
      dni_cliente: [''],
      nombre_firma: [''],
      firma_cliente: [''],
      observaciones: ['']
    });

    // Inicializar formulario para repuesto manual
    this.repuestoManualForm = this.fb.group({
      denominacion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(0)]]
    });
  }

  async ngOnInit() {
    console.log('🎯 HacerAlbaranComponent ngOnInit - Aviso:', this.aviso);
    console.log('🎯 Formulario inicializado:', this.albaranForm);
    
    // Configurar manejo de reconexión
    this.setupReconnectionHandling();
    
    // Establecer fechas por defecto
    this.establecerFechaActual();
    this.establecerFechaTrabajo();
    
    try {
      await this.cargarProductosInventario();
      this.inicializarFormulario();
    } catch (error) {
      console.error('Error al inicializar componente:', error);
    }
  }

  ngAfterViewInit() {
    // No inicializar automáticamente el signature pad
    // Solo se inicializará cuando el usuario haga clic en "Comenzar Firma"
    
    // Asegurar que las fechas se muestren correctamente después de que el DOM esté listo
    setTimeout(() => {
      if (!this.albaranForm.get('fecha_cierre')?.value) {
        this.establecerFechaActual();
      }
      if (!this.albaranForm.get('fecha_trabajo')?.value) {
        this.establecerFechaTrabajo();
      }
    }, 100);
  }

  ngOnDestroy() {
    console.log('🧹 HacerAlbaranComponent ngOnDestroy - Limpiando suscripciones');
    this.isComponentActive = false;
    
    if (this.reconnectionSubscription) {
      this.reconnectionSubscription.unsubscribe();
    }
  }



  /**
   * Inicializa el formulario con valores por defecto
   */
  inicializarFormulario() {
    // Establecer valores por defecto para un nuevo albarán
    const horaActual = this.generarHoraActual();
    
    this.albaranForm.patchValue({
      hora_entrada: horaActual,
      hora_salida: horaActual,
      repuestos_utilizados: []
    });

    // Inicializar lista de repuestos vacía
    this.repuestosSeleccionados = [];
    
    console.log('🔍 Formulario inicializado con valores por defecto');
  }
  /**
   * Carga los productos del inventario
   */
  cargarProductosInventario(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.inventarioService.getInventario(1, 1000, '', 'nombre', 'asc', false)
        .subscribe({
          next: (response) => {
            this.productosInventario = response.inventario;
            this.productosFiltrados = [...this.productosInventario];
            console.log(' Inventario cargado:', this.productosInventario.length, 'productos');
            resolve();
          },
          error: (error) => {
            console.error('Error al cargar productos del inventario:', error);
            reject(error);
          }
        });
    });
  }

  /**
   * Filtra productos del inventario por búsqueda
   */
  filtrarProductos(event: any) {
    const termino = event?.target?.value || event || '';
    this.busquedaRepuesto = termino;

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
   * Abre el selector de repuestos
   */
  abrirSelectorRepuestos() {
    this.mostrarSelectorRepuestos = true;
    this.productosFiltrados = [...this.productosInventario];
    this.busquedaRepuesto = '';
  }

  /**
   * Cierra el selector de repuestos
   */
  cerrarSelectorRepuestos() {
    this.mostrarSelectorRepuestos = false;
  }

  /**
   * Agrega un repuesto del inventario con cantidad
   */
  agregarRepuesto(producto: Inventario) {
    console.log('🔍 agregarRepuesto - Producto recibido:', producto);

    // Verificar stock disponible
    const stockDisponible = producto.cantidad_disponible || 0;
    if (stockDisponible <= 0) {
      alert(`⚠️ No hay stock disponible para ${producto.nombre}`);
      return;
    }

    // Verificar si el repuesto ya existe
    const repuestoExistente = this.repuestosSeleccionados.find(r => r.nombre === producto.nombre);

    if (repuestoExistente) {
      // Verificar que no exceda el stock disponible
      const cantidadTotal = repuestoExistente.cantidad + 1;
      if (cantidadTotal > stockDisponible) {
        alert(`⚠️ No hay suficiente stock. Disponible: ${stockDisponible} ${producto.unidad}, Solicitado: ${cantidadTotal} ${producto.unidad}`);
        return;
      }
      
      // Si ya existe, aumentar la cantidad
      repuestoExistente.cantidad += 1;
      console.log('🔍 agregarRepuesto - Repuesto existente, cantidad aumentada a:', repuestoExistente.cantidad);
    } else {
      // Si no existe, agregarlo con los datos reales del inventario
      const nuevoRepuesto: RepuestoAlbaran = {
        nombre: producto.nombre,
        cantidad: 1,
        precio_neto: producto.precio_neto || 0,
        precio_pvp: producto.pvp || producto.precio_neto || 0, // Usar precio real del inventario
        unidad: producto.unidad || 'unidad', // Usar unidad real del inventario
        codigo: producto.codigo || ''
      };

      console.log('🔍 agregarRepuesto - Nuevo repuesto creado:', nuevoRepuesto);
      this.repuestosSeleccionados.push(nuevoRepuesto);
    }

    // Actualizar el formulario
    this.albaranForm.patchValue({
      repuestos_utilizados: this.repuestosSeleccionados
    });

    console.log('🔍 agregarRepuesto - Repuestos seleccionados actualizados:', this.repuestosSeleccionados);
    this.cerrarSelectorRepuestos();
  }

  /**
   * Elimina un repuesto de la lista
   */
  eliminarRepuesto(repuesto: RepuestoAlbaran) {
    this.repuestosSeleccionados = this.repuestosSeleccionados.filter(r => r !== repuesto);
    this.albaranForm.patchValue({
      repuestos_utilizados: this.repuestosSeleccionados
    });
  }

  /**
   * Actualiza la cantidad de un repuesto
   */
  actualizarCantidadRepuesto(repuesto: RepuestoAlbaran, nuevaCantidad: number) {
    if (nuevaCantidad > 0) {
      repuesto.cantidad = nuevaCantidad;
      this.albaranForm.patchValue({
        repuestos_utilizados: this.repuestosSeleccionados
      });
    }
  }

  /**
   * Muestra el formulario para agregar repuesto manual
   */
  mostrarFormularioManual() {
    this.mostrarFormularioRepuesto = true;
    this.repuestoManualForm.reset({
      denominacion: '',
      cantidad: 1,
      precio: 0
    });
  }

  /**
   * Cierra el formulario manual
   */
  cerrarFormularioManual() {
    this.mostrarFormularioRepuesto = false;
    this.repuestoManualForm.reset({
      denominacion: '',
      cantidad: 1,
      precio: 0
    });
  }

  /**
   * Agrega un repuesto desde el formulario manual
   */
  agregarRepuestoDesdeFormulario() {
    console.log('🔍 Debug - repuestoManualForm value:', this.repuestoManualForm.value);
    console.log('🔍 Debug - repuestoManualForm valid:', this.repuestoManualForm.valid);
    
    // Validar el formulario
    if (this.repuestoManualForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      this.repuestoManualForm.markAllAsTouched();
      
      if (this.repuestoManualForm.get('denominacion')?.invalid) {
        alert('Por favor, introduce la denominación del repuesto');
        return;
      }
      
      if (this.repuestoManualForm.get('cantidad')?.invalid) {
        alert('La cantidad debe ser mayor a 0');
        return;
      }
      
      if (this.repuestoManualForm.get('precio')?.invalid) {
        alert('El precio debe ser mayor o igual a 0');
        return;
      }
      
      return;
    }

    const formValue = this.repuestoManualForm.value;
    const repuestoManual: RepuestoAlbaran = {
      nombre: formValue.denominacion.trim(),
      cantidad: formValue.cantidad,
      precio_neto: formValue.precio || 0,
      precio_pvp: formValue.precio || 0,
      unidad: 'unidad', // Unidad por defecto
      codigo: ''
    };

    console.log('🔍 agregarRepuestoDesdeFormulario - Repuesto manual creado:', repuestoManual);
    this.repuestosSeleccionados.push(repuestoManual);
    this.albaranForm.patchValue({
      repuestos_utilizados: this.repuestosSeleccionados
    });

    // Cerrar formulario y limpiar
    this.cerrarFormularioManual();
  }

  /**
   * Genera hora actual en formato HH:MM
   */
  generarHoraActual(): string {
    const ahora = new Date();
    return `${ahora.getHours().toString().padStart(2, '0')}:${ahora.getMinutes().toString().padStart(2, '0')}`;
  }



  /**
   * Establece la hora actual
   */
  establecerHoraActual() {
    const horaActual = this.generarHoraActual();
    this.albaranForm.patchValue({
      hora_salida: horaActual
    });
  }

  /**
   * Formatea una fecha para el input de tipo date (YYYY-MM-DD)
   */
  formatearFechaParaInput(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Establece la fecha actual para el cierre del albarán
   */
  establecerFechaActual() {
    const fechaActual = new Date();
    const fechaFormateada = this.formatearFechaParaInput(fechaActual);
    
    // Establecer la fecha en el formulario
    this.albaranForm.patchValue({
      fecha_cierre: fechaFormateada
    });
    
    // Actualizar la propiedad local
    this.fechaActualFormateada = fechaFormateada;
    
    console.log('📅 Fecha de cierre establecida:', fechaFormateada);
  }

  /**
   * Establece la fecha actual para el trabajo realizado
   */
  establecerFechaTrabajo() {
    const fechaActual = new Date();
    const fechaFormateada = this.formatearFechaParaInput(fechaActual);
    
    // Establecer la fecha del trabajo en el formulario
    this.albaranForm.patchValue({
      fecha_trabajo: fechaFormateada
    });
    
    console.log('📅 Fecha de trabajo establecida:', fechaFormateada);
  }

  /**
   * Guarda el albarán
   */
  guardarAlbaran() {
    if (this.albaranForm.valid) {
      this.loading = true;
      this.error = null;

      const albaranData: CrearAlbaranRequest = {
        aviso_id: this.aviso.id!,
        fecha_trabajo: this.albaranForm.value.fecha_trabajo,
        fecha_cierre: this.albaranForm.value.fecha_cierre,
        hora_entrada: this.albaranForm.value.hora_entrada,
        hora_salida: this.albaranForm.value.hora_salida,
        descripcion_trabajo_realizado: this.albaranForm.value.descripcion_trabajo_realizado,
        repuestos_utilizados: this.albaranForm.value.repuestos_utilizados,
        estado_cierre: this.albaranForm.value.estado_cierre,
        presupuesto_necesario: 0, // Fijo en 0 ya que ahora se maneja automáticamente
        dni_cliente: this.albaranForm.value.dni_cliente,
        nombre_firma: this.albaranForm.value.nombre_firma,
        firma_cliente: this.albaranForm.value.firma_cliente,
        observaciones: this.albaranForm.value.observaciones
      };

      console.log('Datos del albarán:', albaranData);

      // Guardar albarán usando el servicio
      this.albaranesService.crearAlbaran(albaranData).subscribe({
        next: (albaran) => {
          console.log('Albarán guardado exitosamente:', albaran);

          // Si el estado es "Presupuesto pendiente", preguntar si crear presupuesto
          if (albaranData.estado_cierre === 'Presupuesto pendiente') {
            this.manejarPresupuestoPendiente(albaran);
          } else {
            // Flujo normal para otros estados
            this.finalizarGuardadoAlbaran(albaran);
          }
        },
        error: (error) => {
          this.loading = false;
          
          // Manejar diferentes tipos de errores
          if (error.status === 0 || error.status === 408 || error.name === 'TimeoutError') {
            // Error de conexión o timeout
            this.error = 'Error de conexión. Verifica tu conexión a internet e intenta de nuevo.';
            console.error('Error de conexión al guardar albarán:', error);
          } else if (error.status === 401) {
            // Error de autenticación - no redirigir automáticamente
            this.error = 'Sesión expirada. Por favor, recarga la página e intenta de nuevo.';
            console.error('Error de autenticación al guardar albarán:', error);
          } else {
            // Otros errores
            this.error = 'Error al guardar el albarán: ' + (error.message || 'Error desconocido');
            console.error('Error al guardar albarán:', error);
          }
        }
      });
    } else {
      this.error = 'Por favor, complete todos los campos requeridos';
      this.marcarCamposComoTocados();
    }
  }

  /**
   * Marca todos los campos como tocados para mostrar errores
   */
  marcarCamposComoTocados() {
    Object.keys(this.albaranForm.controls).forEach(key => {
      const control = this.albaranForm.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Cierra el modal
   */
  cancelar() {
    this.modalController.dismiss();
  }

  /**
   * Reintenta la operación cuando hay errores de conexión
   */
  reintentarOperacion() {
    console.log('🔄 Reintentando operación...');
    this.error = null;
    
    // Si había un albarán en proceso de guardado, reintentarlo
    if (this.albaranForm.valid) {
      this.guardarAlbaran();
    } else {
      // Si el formulario no es válido, mostrar mensaje
      this.error = 'Por favor, complete todos los campos requeridos antes de reintentar';
    }
  }

  /**
   * Verifica si el estado requiere presupuesto
   */
  requierePresupuesto(): boolean {
    return this.albaranForm.get('estado_cierre')?.value === 'Presupuesto pendiente';
  }

  /**
   * Verifica si el estado requiere otra visita
   */
  requiereOtraVisita(): boolean {
    return this.albaranForm.get('estado_cierre')?.value === 'Otra visita';
  }

  /**
   * Calcula el precio total de los repuestos seleccionados
   */
  calcularPrecioTotalRepuestos(): number {
    return this.repuestosSeleccionados.reduce((total, repuesto) => {
      return total + (repuesto.precio_pvp * repuesto.cantidad);
    }, 0);
  }

  /**
   * Método de depuración para ver la información del albarán
   */
  debugAlbaran() {
    console.log('Albarán en progreso:', this.albaranForm.value);
    console.log('Repuestos seleccionados:', this.repuestosSeleccionados);
    console.log('Precio total repuestos:', this.calcularPrecioTotalRepuestos());
  }

  // ========================================
  // MÉTODOS PARA LA FIRMA DIGITAL
  // ========================================

  /**
   * Inicia el proceso de firma
   */
  iniciarFirma() {
    this.mostrarCanvas = true;
    this.firmaCapturada = false;
    this.firmaDataUrl = '';
    
    // Esperar a que el DOM se actualice antes de inicializar el canvas
    setTimeout(() => {
      this.inicializarSignaturePad();
    }, 100);
  }

  /**
   * Inicializa el signature pad
   */
  private inicializarSignaturePad() {
    if (!this.signaturePadElement?.nativeElement) {
      console.warn('Canvas no encontrado');
      return;
    }

    const canvas = this.signaturePadElement.nativeElement;

    // Importar signature_pad dinámicamente
    import('signature_pad').then(({ default: SignaturePad }) => {
      // Crear instancia de SignaturePad
      this.signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'white',
        penColor: 'black',
        minWidth: 1,
        maxWidth: 2.5,
        throttle: 16,
        velocityFilterWeight: 0.7,
        dotSize: 1
      });

      // Ajustar tamaño del canvas
      this.ajustarCanvas();

      // Escuchar cambios de tamaño de ventana
      window.addEventListener('resize', () => this.ajustarCanvas());
    });
  }

  private ajustarCanvas() {
    if (!this.signaturePadElement?.nativeElement || !this.signaturePad) {
      return;
    }

    const canvas = this.signaturePadElement.nativeElement;
    const container = canvas.parentElement;

    if (!container) return;

    // Obtener dimensiones del contenedor
    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width - 40, 300);
    const height = 200;

    // Establecer dimensiones del canvas
    canvas.width = width;
    canvas.height = height;

    // Redimensionar el canvas
    this.signaturePad.resizeCanvas();
  }

  /**
   * Limpia el canvas de firma
   */
  limpiarFirma() {
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
  }

  /**
   * Guarda la firma capturada
   */
  guardarFirma() {
    if (this.signaturePad && !this.signaturePad.isEmpty()) {
      this.firmaDataUrl = this.signaturePad.toDataURL();
      this.firmaCapturada = true;
      this.mostrarCanvas = false;

      // Guardar en el formulario
      this.albaranForm.patchValue({
        firma_cliente: this.firmaDataUrl
      });

      console.log('Firma guardada exitosamente');
    } else {
      console.warn('No hay firma para guardar');
    }
  }

  /**
   * Permite editar la firma existente
   */
  editarFirma() {
    this.mostrarCanvas = true;
    this.firmaCapturada = false;

    // Esperar a que el DOM se actualice antes de inicializar el canvas
    setTimeout(() => {
      if (this.signaturePad) {
        this.signaturePad.clear();
      } else {
        this.inicializarSignaturePad();
      }
    }, 100);
  }

  /**
   * Elimina la firma completamente
   */
  eliminarFirma() {
    this.firmaCapturada = false;
    this.firmaDataUrl = '';
    this.mostrarCanvas = false;

    if (this.signaturePad) {
      this.signaturePad.clear();
    }

    // Limpiar del formulario
    this.albaranForm.patchValue({
      firma_cliente: ''
    });

    console.log('Firma eliminada');
  }

  /**
   * Maneja el flujo cuando el albarán se cierra como "Presupuesto pendiente"
   */
  private manejarPresupuestoPendiente(albaran: any) {
    console.log('🔄 Manejando albarán con presupuesto pendiente:', albaran);
    
    // Crear el presupuesto automáticamente
    this.crearPresupuestoDesdeAlbaran(albaran);
  }

  /**
   * Crea un presupuesto basado en el albarán
   */
  private crearPresupuestoDesdeAlbaran(albaran: any) {
    console.log('🎯 Creando presupuesto desde albarán:', albaran);
    
    // Preparar materiales para el presupuesto basados en los repuestos utilizados
    const materiales = this.prepararMaterialesParaPresupuesto();
    
    // Datos del presupuesto con valores por defecto inteligentes
    const presupuestoData = {
      aviso_id: this.aviso.id!,
      albaran_id: albaran.id,
      horas_estimadas: this.calcularHorasEstimadas(),
      total_estimado: this.calcularTotalEstimado(),
      materiales: materiales
    };

    console.log('📋 Datos para el presupuesto:', presupuestoData);

    this.presupuestosService.crearPresupuesto(presupuestoData).subscribe({
      next: (presupuesto) => {
        console.log('✅ Presupuesto creado exitosamente:', presupuesto);
        this.loading = false;
        
        // Cerrar modal con información del presupuesto creado
        this.modalController.dismiss({
          success: true,
          albaran: albaran,
          presupuesto: presupuesto,
          mensaje: 'Albarán guardado y presupuesto creado exitosamente',
          accion: 'presupuesto_creado'
        }, 'confirm');
      },
      error: (error) => {
        console.error('❌ Error al crear presupuesto:', error);
        
        // Mostrar error pero mantener el albarán como exitoso
        alert('⚠️ El albarán se guardó correctamente, pero hubo un error al crear el presupuesto automáticamente.\n\nPuedes crear el presupuesto manualmente desde la sección de presupuestos.');
        
        this.finalizarGuardadoAlbaran(albaran);
      }
    });
  }

  /**
   * Prepara los materiales del albarán para el presupuesto
   */
  private prepararMaterialesParaPresupuesto(): any[] {
    return this.repuestosSeleccionados.map(repuesto => ({
      material_id: repuesto.codigo || this.generarIdTemporal(),
      cantidad_estimada: repuesto.cantidad,
      precio_neto_al_momento: repuesto.precio_neto,
      producto: {
        id: repuesto.codigo || this.generarIdTemporal(),
        nombre: repuesto.nombre,
        precio_neto: repuesto.precio_neto,
        unidad: repuesto.unidad
      }
    }));
  }

  /**
   * Calcula horas estimadas basadas en el tiempo trabajado
   */
  private calcularHorasEstimadas(): number {
    const horaEntrada = this.albaranForm.value.hora_entrada;
    const horaSalida = this.albaranForm.value.hora_salida;
    
    if (horaEntrada && horaSalida) {
      const [horasEntrada, minutosEntrada] = horaEntrada.split(':').map(Number);
      const [horasSalida, minutosSalida] = horaSalida.split(':').map(Number);
      
      const minutosEntradaTotal = horasEntrada * 60 + minutosEntrada;
      const minutosSalidaTotal = horasSalida * 60 + minutosSalida;
      
      const diferenciaMinutos = minutosSalidaTotal - minutosEntradaTotal;
      const horas = diferenciaMinutos / 60;
      
      return Math.max(horas, 1); // Mínimo 1 hora
    }
    
    return 2; // Valor por defecto
  }

  /**
   * Calcula total estimado basado en repuestos + trabajo
   */
  private calcularTotalEstimado(): number {
    const costoRepuestos = this.calcularPrecioTotalRepuestos();
    const horas = this.calcularHorasEstimadas();
    const costoPorHora = 50; // Esto debería venir de configuración
    const costoManoObra = horas * costoPorHora;
    
    return costoRepuestos + costoManoObra;
  }

  /**
   * Genera un ID temporal para materiales sin código
   */
  private generarIdTemporal(): string {
    return 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Finaliza el guardado del albarán sin crear presupuesto
   */
  private finalizarGuardadoAlbaran(albaran: any) {
    // Actualizar automáticamente el estado del aviso
    this.avisosService.actualizarEstadoAutomatico(this.aviso.id!).subscribe({
      next: (avisoActualizado) => {
        this.loading = false;
        console.log('Estado del aviso actualizado automáticamente:', avisoActualizado);

        this.modalController.dismiss({
          success: true,
          albaran: albaran,
          aviso: avisoActualizado,
          mensaje: 'Albarán guardado exitosamente'
        }, 'confirm');
      },
      error: (error) => {
        console.error('Error al actualizar estado del aviso:', error);
        // Aún así, cerrar el modal con éxito
        this.loading = false;
        this.modalController.dismiss({
          success: true,
          albaran: albaran,
          mensaje: 'Albarán guardado exitosamente'
        }, 'confirm');
      }
    });
  }

  // ========================================
  // MÉTODOS PARA MANEJO DE RECONEXIÓN
  // ========================================

  /**
   * Configura el manejo de reconexión para evitar navegación automática
   */
  private setupReconnectionHandling() {
    console.log('🔄 Configurando manejo de reconexión en HacerAlbaranComponent');
    
    // Suscribirse a eventos de reconexión
    this.reconnectionSubscription = this.reconnectionService.appResumed.subscribe({
      next: (isResumed) => {
        if (isResumed && this.isComponentActive) {
          console.log('🔄 App reanudada - verificando estado del componente');
          this.handleAppResume();
        }
      },
      error: (error) => {
        console.error('❌ Error en suscripción de reconexión:', error);
      }
    });
  }

  /**
   * Maneja cuando la app se reanuda
   */
  private async handleAppResume() {
    if (!this.isComponentActive) {
      console.log('🔄 Componente no activo, saltando manejo de reconexión');
      return;
    }

    try {
      console.log('🔄 HacerAlbaranComponent: App reanudada, verificando conexión...');
      
      // Verificar si hay datos del formulario que podrían perderse
      const formData = this.albaranForm.value;
      const hasData = Object.values(formData).some(value => 
        value !== null && value !== undefined && value !== '' && 
        (Array.isArray(value) ? value.length > 0 : true)
      );

      if (hasData) {
        console.log('🔄 Formulario tiene datos, evitando navegación automática');
        
        // Mostrar mensaje de reconexión si es necesario
        if (this.loading) {
          this.loading = false;
          this.error = 'Conexión restablecida. Puedes continuar con el albarán.';
          
          // Limpiar el error después de 3 segundos
          setTimeout(() => {
            if (this.isComponentActive) {
              this.error = null;
            }
          }, 3000);
        }
      }
      
    } catch (error) {
      console.error('❌ Error en handleAppResume:', error);
    }
  }

  /**
   * Verifica si el componente debe mantenerse activo
   */
  private shouldKeepComponentActive(): boolean {
    // Verificar si hay datos importantes en el formulario
    const formData = this.albaranForm.value;
    const hasImportantData = 
      formData.descripcion_trabajo_realizado ||
      formData.repuestos_utilizados?.length > 0 ||
      formData.firma_cliente ||
      formData.observaciones;

    return hasImportantData;
  }


}
