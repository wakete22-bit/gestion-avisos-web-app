import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, saveOutline, personOutline, mailOutline, callOutline, shieldOutline, alertCircleOutline, lockClosedOutline, informationCircleOutline, checkmarkCircleOutline, ellipseOutline, refreshOutline } from 'ionicons/icons';
import { TipoRol } from '../../../../core/models/usuario.model';
import { TecnicosService } from '../../services/tecnicos.service';
import { CrearTecnicoRequest } from '../../models/tecnico.model';

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

  tecnicoData: CrearTecnicoRequest = {
    nombre_completo: '',
    email: '',
    password: '',
    telefono: '',
    rol_id: 'a0472297-ee16-44d8-a434-810a3868a209', // UUID del rol Técnico
    es_activo: true
  };

  // Roles disponibles con sus UUIDs correspondientes
  rolesDisponibles = [
    { 
      value: 'a0472297-ee16-44d8-a434-810a3868a209', 
      label: 'Técnico',
      descripcion: 'Crear y gestionar avisos, ver historial, acceder a inventario básico.'
    },
    { 
      value: '70c12fd8-92c2-4479-bba0-c7b2e934f48a', 
      label: 'Usuario',
      descripcion: 'Ver avisos asignados, actualizar estado de trabajos, registrar materiales utilizados.'
    }
  ];

  loading = false;
  error = '';

  constructor(
    private modalController: ModalController,
    private tecnicosService: TecnicosService
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
      // Crear el técnico usando el servicio
      this.tecnicosService.crearTecnico(this.tecnicoData).subscribe({
        next: (tecnico) => {
          console.log('Técnico creado exitosamente:', tecnico);
          this.modalController.dismiss(tecnico, 'confirm');
        },
        error: (error) => {
          console.error('Error al crear técnico:', error);
          
          // Manejar errores específicos
          if (error.message?.includes('Ya existe un usuario con este email')) {
            this.error = 'Ya existe un usuario con este email. Por favor, usa un email diferente.';
          } else if (error.message?.includes('duplicate key value')) {
            this.error = 'El usuario ya existe en el sistema. Por favor, verifica el email.';
          } else if (error.message?.includes('Invalid login credentials')) {
            this.error = 'Error en las credenciales. Por favor, verifica el email y contraseña.';
          } else {
            this.error = 'Error al crear el técnico. Por favor, intenta de nuevo.';
          }
          
          this.loading = false;
        }
      });
    } catch (error) {
      this.error = 'Error al crear el técnico';
      console.error('Error al crear técnico:', error);
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

    if (!this.tecnicoData.rol_id) {
      this.error = 'Debe seleccionar un rol';
      return false;
    }

    // Validar que el email no esté vacío y tenga formato válido
    if (!this.tecnicoData.email || !this.validarEmail(this.tecnicoData.email)) {
      this.error = 'El email debe tener un formato válido';
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

  getRolLabel(rolId: string): string {
    const rol = this.rolesDisponibles.find(r => r.value === rolId);
    return rol ? rol.label : '';
  }

  getRolDescripcion(rolId: string): string {
    const rol = this.rolesDisponibles.find(r => r.value === rolId);
    return rol ? rol.descripcion : '';
  }

  onInputChange() {
    if (this.error) {
      this.error = '';
    }
  }
} 