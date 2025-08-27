import { Component, OnInit, Input, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { arrowForward, personOutline, mailOutline, chevronDownOutline, copyOutline, shieldOutline, informationCircleOutline, cloudUploadOutline, closeOutline, save, saveOutline, trashOutline, addCircle, refreshOutline } from 'ionicons/icons';
import { CrearClienteModalComponent } from '../../../clientes/components/crear-cliente-modal/crear-cliente-modal.component';
import { ViewportService } from 'src/app/core/services/viewport.service';
import { ClientesService } from '../../../../core/services/clientes.service';
import { Cliente } from '../../../clientes/models/cliente.model';
import { Subject, takeUntil } from 'rxjs';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-crear-avisos-modal',
  templateUrl: './crear-avisos-modal.component.html',
  styleUrls: ['./crear-avisos-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonContent, IonFooter, IonModal]
})
export class CrearAvisosModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() clienteData: any;
  @Input() modoEdicion: boolean = false;
  @Input() avisoExistente: any = null;
  avisoForm: FormGroup;
  imagenes: File[] = [];
  clientes: Cliente[] = [];
  loadingClientes = false;
  errorClientes: string | null = null;
  imageUrls: Map<File, string> = new Map();

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private viewportService: ViewportService,
    private elementRef: ElementRef,
    private clientesService: ClientesService
  ) {
    this.avisoForm = this.fb.group({
      tipo: ['', Validators.required],
      cliente: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      direccionLocal: ['', Validators.required],
      telefono: ['', Validators.required],
      nombreContacto: ['', Validators.required],
      esUrgente: [false]
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
      trashOutline
    });
    
    this.cargarClientes();
    
    // Si estamos en modo edición, cargar datos del aviso existente
    if (this.modoEdicion && this.avisoExistente) {
      this.cargarDatosAvisoExistente();
    } else if (this.clienteData) {
      // Si no es edición pero hay datos de cliente, usarlos
      this.avisoForm.patchValue({
        cliente: this.clienteData.id || this.clienteData.nombreContacto,
        direccionLocal: this.clienteData.direccionLocal,
        telefono: this.clienteData.telefono,
        nombreContacto: this.clienteData.nombreContacto
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    
    // Limpiar URLs de objeto para evitar memory leaks
    this.imageUrls.forEach((url, file) => {
      URL.revokeObjectURL(url);
    });
    this.imageUrls.clear();
  }

  /**
   * Carga los datos del aviso existente en el formulario
   */
  cargarDatosAvisoExistente() {
    if (!this.avisoExistente) return;
    
    console.log('Cargando datos del aviso existente:', this.avisoExistente);
    
    // Buscar el cliente correspondiente
    const cliente = this.clientes.find(c => c.id === this.avisoExistente.cliente_id);
    
    this.avisoForm.patchValue({
      tipo: this.avisoExistente.tipo || 'correctivo',
      cliente: cliente?.id || this.avisoExistente.cliente_id,
      descripcion: this.avisoExistente.descripcion_problema || '',
      direccionLocal: this.avisoExistente.direccion_cliente_aviso || '',
      telefono: this.avisoExistente.telefono_cliente_aviso || '',
      nombreContacto: this.avisoExistente.nombre_contacto || this.avisoExistente.nombre_cliente_aviso || '',
      esUrgente: this.avisoExistente.es_urgente || this.avisoExistente.urgencia === 'Alta'
    });
  }

  /**
   * Carga la lista de clientes activos
   */
  cargarClientes() {
    this.loadingClientes = true;
    this.errorClientes = null;
    
    // Deshabilitar el select de cliente mientras se cargan los datos
    this.avisoForm.get('cliente')?.disable();

    this.clientesService.getClientes(1, 100, '', 'nombre_completo', 'asc', true)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.clientes = response.clientes;
          this.loadingClientes = false;
          // Habilitar el select de cliente una vez cargados los datos
          this.avisoForm.get('cliente')?.enable();
          
          // Si estamos en modo edición, cargar datos del aviso después de tener los clientes
          if (this.modoEdicion && this.avisoExistente) {
            this.cargarDatosAvisoExistente();
          }
        },
        error: (error) => {
          console.error('Error al cargar clientes:', error);
          this.errorClientes = 'Error al cargar los clientes';
          this.loadingClientes = false;
          // Habilitar el select de cliente en caso de error
          this.avisoForm.get('cliente')?.enable();
        }
      });
  }

  /**
   * Maneja el cambio de cliente seleccionado
   */
  onClienteChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const clienteId = target.value;
    const clienteSeleccionado = this.clientes.find(c => c.id === clienteId);
    if (clienteSeleccionado) {
      this.avisoForm.patchValue({
        direccionLocal: clienteSeleccionado.direccion || '',
        telefono: clienteSeleccionado.telefono_contacto || '',
        nombreContacto: clienteSeleccionado.nombre_completo
      });
    }
  }

  ngAfterViewInit() {
    // Ya no necesitamos aplicar safe areas manualmente
    // Ionic las maneja automáticamente con ion-header e ion-footer
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        if (file.type.match(/image\/*/) && !this.imagenes.includes(file)) {
          this.imagenes.push(file);
          // Crear URL de objeto una sola vez
          this.imageUrls.set(file, URL.createObjectURL(file));
        }
      }
    }
  }

  removeImage(index: number) {
    const file = this.imagenes[index];
    if (file && this.imageUrls.has(file)) {
      URL.revokeObjectURL(this.imageUrls.get(file)!);
      this.imageUrls.delete(file);
    }
    this.imagenes.splice(index, 1);
  }

  getImagePreview(file: File): string {
    if (file && this.imageUrls.has(file)) {
      return this.imageUrls.get(file)!;
    }
    return 'assets/icon/favicon.png'; // Fallback a una imagen que existe
  }

  async crearAviso() {
    if (this.avisoForm.valid) {
      const avisoData = {
        ...this.avisoForm.value,
        imagenes: this.imagenes
      };
      
      // Si estamos en modo edición, incluir el ID del aviso existente
      if (this.modoEdicion && this.avisoExistente) {
        avisoData.id = this.avisoExistente.id;
      }
      
      await this.modalController.dismiss(avisoData, 'confirm');
    }
  }

  async cerrarModal() {
    await this.modalController.dismiss(null, 'cancel');
  }

  async crearCliente() {
    await this.modalController.dismiss(null, 'crear-cliente');
  }

  /**
   * Obtiene la clase CSS para el modal
   */
  getModalClass(): string {
    return 'crear-avisos-modal';
  }
}
