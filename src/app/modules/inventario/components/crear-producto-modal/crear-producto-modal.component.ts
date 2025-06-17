import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-crear-producto-modal',
  templateUrl: './crear-producto-modal.component.html',
  styleUrls: ['./crear-producto-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class CrearProductoModalComponent implements OnInit {
  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
  ) {
    this.productoForm = this.fb.group({
      codigo: [{ value: 'Generado aleatoriamente', disabled: true }],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.maxLength(200)],
      stock: ['', Validators.required],
      unidad: ['', Validators.required],
      precioNeto: ['', Validators.required],
      pvp: ['', Validators.required]
    });
  }

  ngOnInit() {
    addIcons({ closeOutline });
  }

  async guardarProducto() {
    if (this.productoForm.valid) {
      await this.modalController.dismiss(this.productoForm.getRawValue(), 'confirm');
    }
  }

  async cerrarModal() {
    await this.modalController.dismiss(null, 'cancel');
  }
}
