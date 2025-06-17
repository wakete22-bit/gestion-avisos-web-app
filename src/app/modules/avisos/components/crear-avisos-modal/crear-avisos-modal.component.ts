import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { arrowForward, personOutline, mailOutline, chevronDownOutline, copyOutline, shieldOutline, informationCircleOutline, cloudUploadOutline, closeOutline, save, saveOutline } from 'ionicons/icons';

@Component({
  selector: 'app-crear-avisos-modal',
  templateUrl: './crear-avisos-modal.component.html',
  styleUrls: ['./crear-avisos-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class CrearAvisosModalComponent implements OnInit {
  avisoForm: FormGroup;
  paso = 1;
  imagenes: File[] = [];

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
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
    addIcons({arrowForward,personOutline,mailOutline,chevronDownOutline,copyOutline,shieldOutline,informationCircleOutline,cloudUploadOutline,closeOutline,save,saveOutline});
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        if (file.type.match(/image\/*/) && !this.imagenes.includes(file)) {
          this.imagenes.push(file);
        }
      }
    }
  }

  removeImage(index: number) {
    this.imagenes.splice(index, 1);
  }

  async crearAviso() {
    if (this.avisoForm.valid) {
      const avisoData = {
        ...this.avisoForm.value,
        imagenes: this.imagenes
      };
      await this.modalController.dismiss(avisoData);
    }
  }

  async cerrarModal() {
    await this.modalController.dismiss();
  }
}
