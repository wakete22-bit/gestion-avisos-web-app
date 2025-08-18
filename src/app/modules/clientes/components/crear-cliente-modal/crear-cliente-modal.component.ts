import { Component, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { ViewportService } from 'src/app/core/services/viewport.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-crear-cliente-modal',
  templateUrl: './crear-cliente-modal.component.html',
  styleUrls: ['./crear-cliente-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class CrearClienteModalComponent implements OnInit, AfterViewInit {
  @Input() modo: 'crear' | 'editar' = 'crear';
  @Input() cliente?: Cliente;
  
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private viewportService: ViewportService,
    private elementRef: ElementRef
  ) {
    this.clienteForm = this.fb.group({
      nombreContacto: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      // notasImportantes: ['', Validators.maxLength(200)], // Comentado temporalmente
      direccionLocal: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      localidad: ['', Validators.required],
      esActivo: [true, Validators.required]
    });
  }

  ngOnInit() {
    addIcons({ closeOutline });
    
    // Si estamos en modo editar y tenemos datos del cliente, cargar los datos
    if (this.modo === 'editar' && this.cliente) {
      this.cargarDatosCliente();
    }
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

  private cargarDatosCliente() {
    if (!this.cliente) return;

    // Separar la dirección en sus componentes
    const direccionCompleta = this.cliente.direccion || '';
    const partes = direccionCompleta.split(', ');
    
    let direccionLocal = '';
    let codigoPostal = '';
    let localidad = '';
    
    if (partes.length >= 2) {
      direccionLocal = partes[0];
      const ultimaParte = partes[partes.length - 1];
      const codigoLocalidad = ultimaParte.split(' ');
      if (codigoLocalidad.length >= 2) {
        codigoPostal = codigoLocalidad[0];
        localidad = codigoLocalidad.slice(1).join(' ');
      } else {
        localidad = ultimaParte;
      }
    } else {
      direccionLocal = direccionCompleta;
    }

    this.clienteForm.patchValue({
      nombreContacto: this.cliente.nombre_completo || '',
      telefono: this.cliente.telefono_contacto || '',
      email: this.cliente.email || '',
      // notasImportantes: this.cliente.notas_importantes || '', // Comentado temporalmente
      direccionLocal: direccionLocal,
      codigoPostal: codigoPostal,
      localidad: localidad,
      esActivo: this.cliente.es_activo ?? true
    });
  }

  async guardarCliente() {
    if (this.clienteForm.valid) {
      // Deshabilitar el botón mientras se procesa
      this.clienteForm.disable();
      
      const clienteData = {
        nombre_completo: this.clienteForm.value.nombreContacto,
        telefono_contacto: this.clienteForm.value.telefono,
        email: this.clienteForm.value.correoElectronico,
        direccion: `${this.clienteForm.value.direccionLocal}, ${this.clienteForm.value.codigoPostal} ${this.clienteForm.value.localidad}`,
        nivel_urgencia_habitual: this.cliente?.nivel_urgencia_habitual || 'Media',
        es_activo: this.clienteForm.value.esActivo,
        // notas_importantes: this.clienteForm.value.notasImportantes // Comentado temporalmente
      };
      await this.modalController.dismiss(clienteData, 'confirm');
    }
  }

  async cerrarModal() {
    await this.modalController.dismiss(null, 'cancel');
  }

  get tituloModal(): string {
    return this.modo === 'editar' ? 'Editar cliente' : 'Añadir nuevo cliente';
  }

  get subtituloModal(): string {
    return this.modo === 'editar' ? 'Modifica los datos del cliente' : 'Añade un nuevo cliente';
  }

  get textoBotonGuardar(): string {
    return this.modo === 'editar' ? 'Guardar cambios' : 'Guardar cliente';
  }

  get botonDeshabilitado(): boolean {
    return !this.clienteForm.valid || this.clienteForm.disabled;
  }
}
