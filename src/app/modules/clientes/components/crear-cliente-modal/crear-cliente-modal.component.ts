import { Component, OnInit, AfterViewInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline, saveOutline, informationCircleOutline } from 'ionicons/icons';
import { ViewportService } from 'src/app/core/services/viewport.service';
import { Cliente } from '../../models/cliente.model';
import { Subject } from 'rxjs';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonIcon, IonModal, ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-crear-cliente-modal',
  templateUrl: './crear-cliente-modal.component.html',
  styleUrls: ['./crear-cliente-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonContent, IonFooter, IonModal]
})
export class CrearClienteModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() modo: 'crear' | 'editar' = 'crear';
  @Input() cliente?: Cliente;
  
  clienteForm: FormGroup;
  private destroy$ = new Subject<void>();

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
    addIcons({ closeOutline, saveOutline, informationCircleOutline });
    
    // Si estamos en modo editar y tenemos datos del cliente, cargar los datos
    if (this.modo === 'editar' && this.cliente) {
      this.cargarDatosCliente();
    }
  }

  ngAfterViewInit() {
    // Ya no necesitamos aplicar safe areas manualmente
    // Ionic las maneja automáticamente con ion-header e ion-footer
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
