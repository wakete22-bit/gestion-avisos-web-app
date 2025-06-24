import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { ViewportService } from 'src/app/core/services/viewport.service';

@Component({
  selector: 'app-crear-cliente-modal',
  templateUrl: './crear-cliente-modal.component.html',
  styleUrls: ['./crear-cliente-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class CrearClienteModalComponent implements OnInit, AfterViewInit {
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
      notasImportantes: ['', Validators.maxLength(200)],
      direccionLocal: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      localidad: ['', Validators.required]
    });
  }

  ngOnInit() {
    addIcons({ closeOutline });
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

  async guardarCliente() {
    if (this.clienteForm.valid) {
      const clienteData = {
        ...this.clienteForm.value,
        // Añadimos un nombre completo para mostrar en el select de clientes
        nombre: this.clienteForm.value.nombreContacto
      };
      await this.modalController.dismiss(clienteData, 'confirm');
    }
  }

  async cerrarModal() {
    await this.modalController.dismiss(null, 'cancel');
  }
}
