import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, saveOutline, personOutline, mailOutline, callOutline, shieldOutline, alertCircleOutline, lockClosedOutline, informationCircleOutline, checkmarkCircleOutline, ellipseOutline, refreshOutline } from 'ionicons/icons';
import { TipoRol } from '../../../../core/models/usuario.model';

addIcons({
  'close-outline': closeOutline,
  'save-outline': saveOutline,
  'person-outline': personOutline,
  'mail-outline': mailOutline,
  'call-outline': callOutline,
  'shield-outline': shieldOutline,
  'lock-closed-outline': lockClosedOutline,
  'alert-circle-outline': alertCircleOutline,
  'information-circle-outline': informationCircleOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'ellipse-outline': ellipseOutline,
  'refresh-outline': refreshOutline
});

@Component({
  selector: 'app-crear-tecnico-modal',
  templateUrl: './crear-tecnico-modal.component.html',
  styleUrls: ['./crear-tecnico-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonIcon
  ]
})
export class CrearTecnicoModalComponent {
  modoEdicion = false;
  TipoRol = TipoRol; // Hacer el enum disponible en el template

  tecnicoData = {
    nombre_completo: '',
    email: '',
    password: '',
    telefono: '',
    rol_id: TipoRol.TECNICO
  };

  rolesDisponibles = [
    { value: TipoRol.TECNICO, label: 'Técnico' },
    { value: TipoRol.USUARIO, label: 'Usuario' }
  ];

  loading = false;
  error = '';

  constructor(
    private modalController: ModalController
  ) {
    addIcons({
      personOutline,
      closeOutline,
      alertCircleOutline,
      mailOutline,
      lockClosedOutline,
      callOutline,
      shieldOutline,
      saveOutline,
      informationCircleOutline,
      checkmarkCircleOutline,
      ellipseOutline,
      refreshOutline
    });
  }

  async onClose() {
    await this.modalController.dismiss(null, 'cancel');
  }

  async crearTecnico() {
    if (!this.validarFormulario()) {
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      // Dismiss con los datos del técnico
      await this.modalController.dismiss(this.tecnicoData, 'confirm');
    } catch (error) {
      this.error = 'Error al crear el técnico';
      console.error('Error al crear técnico:', error);
    } finally {
      this.loading = false;
    }
  }

  validarFormulario(): boolean {
    if (!this.tecnicoData.nombre_completo.trim()) {
      this.error = 'El nombre completo es obligatorio';
      return false;
    }

    if (!this.tecnicoData.email.trim()) {
      this.error = 'El email es obligatorio';
      return false;
    }

    if (!this.validarEmail(this.tecnicoData.email)) {
      this.error = 'El formato del email no es válido';
      return false;
    }

    if (!this.tecnicoData.password.trim()) {
      this.error = 'La contraseña es obligatoria';
      return false;
    }

    if (this.tecnicoData.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }

    this.error = '';
    return true;
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isFormValid(): boolean {
    return !!this.tecnicoData.nombre_completo.trim() &&
           this.validarEmail(this.tecnicoData.email) &&
           this.tecnicoData.password.length >= 6 &&
           !!this.tecnicoData.rol_id;
  }

  getRolLabel(rolId: TipoRol): string {
    const rol = this.rolesDisponibles.find(r => r.value === rolId);
    return rol ? rol.label : '';
  }

  onInputChange() {
    if (this.error) {
      this.error = '';
    }
  }
} 