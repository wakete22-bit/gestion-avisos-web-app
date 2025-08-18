import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton, IonInput, IonTextarea, IonSelect, IonSelectOption, IonDatetime, IonLabel, IonItem, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonModal, ModalController } from '@ionic/angular/standalone';
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
  trashOutline, searchOutline, checkmarkCircleOutline, warningOutline, refreshOutline, checkmarkOutline, createOutline } from 'ionicons/icons';
import { TrabajoRealizado } from '../../models/trabajo-realizado.model';
import { Aviso } from '../../models/aviso.model';
import { InventarioService } from '../../../inventario/services/inventario.service';
import { Inventario } from '../../../inventario/models/inventario.model';
import { AlbaranesService, CrearAlbaranRequest } from '../../../../core/services/albaranes.service';
import { TrabajosService } from '../../../../core/services/trabajos.service';
import { AvisosService } from '../../../../core/services/avisos.service';

export interface AlbaranData {
  trabajo_id: string;
  aviso_id: string;
  fecha_cierre: Date;
  hora_entrada: string;
  hora_salida: string;
  descripcion_trabajo_realizado: string;
  repuestos_utilizados: string[];
  estado_cierre: 'Finalizado' | 'Presupuesto pendiente' | 'Otra visita';
  presupuesto_necesario: number;
  dni_cliente: string;
  nombre_firma: string;
  firma_url?: string;
  observaciones?: string;
}

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
    IonButton, 
    IonInput, 
    IonTextarea, 
    IonLabel, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons
  ]
})
export class HacerAlbaranComponent implements OnInit, AfterViewInit {
  @Input() trabajo!: TrabajoRealizado;
  @Input() aviso!: Aviso;

  albaranForm: FormGroup;
  loading = false;
  error: string | null = null;
  
  // Variables para la selección de repuestos
  productosInventario: Inventario[] = [];
  productosFiltrados: Inventario[] = [];
  busquedaRepuesto = '';
  mostrarSelectorRepuestos = false;
  repuestosSeleccionados: string[] = [];

  // Variables para la firma digital
  @ViewChild('signaturePad') signaturePadElement!: ElementRef;
  private signaturePad: any;
  public firmaCapturada = false;
  public firmaDataUrl = '';
  public mostrarCanvas = false;

  // Estados de cierre disponibles
  estadosCierre = [
    { valor: 'Finalizado', label: 'Finalizado', descripcion: 'Trabajo completado, listo para facturar' },
    { valor: 'Presupuesto pendiente', label: 'Presupuesto pendiente', descripcion: 'Se requiere presupuesto adicional' },
    { valor: 'Otra visita', label: 'Otra visita', descripcion: 'Se necesita realizar otra visita' }
  ];

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private inventarioService: InventarioService,
    private albaranesService: AlbaranesService,
    private trabajosService: TrabajosService,
    private avisosService: AvisosService
  ) {
    console.log('HacerAlbaranComponent constructor called');
    addIcons({close,timeOutline,cubeOutline,addCircleOutline,searchOutline,trashOutline,checkmarkCircleOutline,checkmarkOutline,createOutline,warningOutline,saveOutline,refreshOutline,calendarOutline,personOutline,pencilOutline,documentTextOutline});

    this.albaranForm = this.fb.group({
      fecha_cierre: [new Date(), Validators.required],
      hora_entrada: ['', Validators.required],
      hora_salida: ['', Validators.required],
      descripcion_trabajo_realizado: ['', Validators.required],
      repuestos_utilizados: [[]],
      estado_cierre: ['', Validators.required],
      presupuesto_necesario: [0, [Validators.min(0)]],
      dni_cliente: [''],
      nombre_firma: [''],
      firma_cliente: [''],
      observaciones: ['']
    });
  }

  ngOnInit() {
    console.log('🎯 HacerAlbaranComponent ngOnInit - Trabajo:', this.trabajo);
    console.log('🎯 HacerAlbaranComponent ngOnInit - Aviso:', this.aviso);
    console.log('🎯 Formulario inicializado:', this.albaranForm);
    this.cargarProductosInventario();
    this.inicializarFormulario();
  }

  ngAfterViewInit() {
    // Esperar un poco para que el DOM esté listo
    setTimeout(() => {
      this.inicializarSignaturePad();
    }, 100);
  }

  /**
   * Inicializa el formulario con datos del trabajo
   */
  inicializarFormulario() {
    if (this.trabajo) {
      // Establecer hora de entrada como hora de inicio del trabajo
      this.albaranForm.patchValue({
        hora_entrada: this.trabajo.hora_inicio,
        hora_salida: this.trabajo.hora_fin,
        repuestos_utilizados: this.trabajo.repuestos || []
      });
      
      // Si ya hay repuestos, agregarlos a la lista
      if (this.trabajo.repuestos && this.trabajo.repuestos.length > 0) {
        this.repuestosSeleccionados = [...this.trabajo.repuestos];
      }
    }
  }

  /**
   * Carga los productos del inventario
   */
  cargarProductosInventario() {
    this.inventarioService.getInventario(1, 1000, '', 'nombre', 'asc', false)
      .subscribe({
        next: (response) => {
          this.productosInventario = response.inventario;
          this.productosFiltrados = [...this.productosInventario];
        },
        error: (error) => {
          console.error('Error al cargar productos del inventario:', error);
        }
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
   * Agrega un repuesto del inventario
   */
  agregarRepuesto(producto: Inventario) {
    if (!this.repuestosSeleccionados.includes(producto.nombre)) {
      this.repuestosSeleccionados.push(producto.nombre);
      this.albaranForm.patchValue({
        repuestos_utilizados: this.repuestosSeleccionados
      });
    }
    this.cerrarSelectorRepuestos();
  }

  /**
   * Elimina un repuesto de la lista
   */
  eliminarRepuesto(repuesto: string) {
    this.repuestosSeleccionados = this.repuestosSeleccionados.filter(r => r !== repuesto);
    this.albaranForm.patchValue({
      repuestos_utilizados: this.repuestosSeleccionados
    });
  }

  /**
   * Agrega un repuesto manualmente
   */
  agregarRepuestoManual() {
    const repuestoManual = prompt('Introduce el nombre del repuesto:');
    if (repuestoManual && repuestoManual.trim()) {
      if (!this.repuestosSeleccionados.includes(repuestoManual.trim())) {
        this.repuestosSeleccionados.push(repuestoManual.trim());
        this.albaranForm.patchValue({
          repuestos_utilizados: this.repuestosSeleccionados
        });
      }
    }
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
   * Establece la fecha actual
   */
  establecerFechaActual() {
    this.albaranForm.patchValue({
      fecha_cierre: new Date()
    });
  }

  /**
   * Guarda el albarán
   */
  guardarAlbaran() {
    if (this.albaranForm.valid) {
      this.loading = true;
      this.error = null;

             const albaranData: CrearAlbaranRequest = {
         trabajo_id: this.trabajo.id!,
         aviso_id: this.aviso.id!,
         fecha_cierre: this.albaranForm.value.fecha_cierre,
         hora_entrada: this.albaranForm.value.hora_entrada,
         hora_salida: this.albaranForm.value.hora_salida,
         descripcion_trabajo_realizado: this.albaranForm.value.descripcion_trabajo_realizado,
         repuestos_utilizados: this.albaranForm.value.repuestos_utilizados,
         estado_cierre: this.albaranForm.value.estado_cierre,
         presupuesto_necesario: this.albaranForm.value.presupuesto_necesario,
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
          
          // Actualizar el estado del trabajo según el estado del albarán
          let nuevoEstado = 'Abierto';
          if (albaran.estado_cierre === 'Finalizado') {
            nuevoEstado = 'Finalizado';
          } else if (albaran.estado_cierre === 'Presupuesto pendiente') {
            nuevoEstado = 'Cerrado';
          } else if (albaran.estado_cierre === 'Otra visita') {
            nuevoEstado = 'Cerrado';
          }
          
          // Actualizar el trabajo con el nuevo estado y el ID del albarán
          this.trabajosService.actualizarEstadoTrabajo(
            this.trabajo.id!, 
            nuevoEstado, 
            albaran.id
          ).subscribe({
            next: (trabajoActualizado) => {
              console.log('Trabajo actualizado exitosamente:', trabajoActualizado);
              
              // Actualizar automáticamente el estado del aviso
              this.avisosService.actualizarEstadoAutomatico(this.aviso.id!).subscribe({
                next: (avisoActualizado) => {
                  this.loading = false;
                  console.log('Estado del aviso actualizado automáticamente:', avisoActualizado);
                  
                  this.modalController.dismiss({
                    success: true,
                    albaran: albaran,
                    trabajo: trabajoActualizado,
                    aviso: avisoActualizado,
                    mensaje: 'Albarán guardado exitosamente'
                  });
                },
                error: (error) => {
                  console.error('Error al actualizar estado del aviso:', error);
                  // Aún así, cerrar el modal con éxito
                  this.loading = false;
                  this.modalController.dismiss({
                    success: true,
                    albaran: albaran,
                    trabajo: trabajoActualizado,
                    mensaje: 'Albarán guardado exitosamente'
                  });
                }
              });
            },
            error: (error) => {
              this.loading = false;
              this.error = 'Error al actualizar el trabajo: ' + (error.message || 'Error desconocido');
              console.error('Error al actualizar trabajo:', error);
            }
          });
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Error al guardar el albarán: ' + (error.message || 'Error desconocido');
          console.error('Error al guardar albarán:', error);
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
    const width = Math.max(rect.width - 40, 200);
    const height = 150;
    
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
    
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
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
}
