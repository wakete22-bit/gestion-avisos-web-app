import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonIcon, IonButton, IonInput, IonLabel, IonItem, IonAvatar, IonBadge, IonTextarea, IonSelect, IonSelectOption, IonToast, IonLoading } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  arrowForward, 
  mailOutline, 
  chevronDownOutline, 
  copyOutline, 
  shieldOutline, 
  informationCircleOutline, 
  cloudUploadOutline, 
  closeOutline, 
  save, 
  saveOutline,
  cameraOutline
} from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Usuario } from '../../../../core/models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss'],
  standalone: true,
  imports: [
    IonIcon, 
    CommonModule, 
    ReactiveFormsModule,
    IonButton,
    IonInput,
    IonLabel,
    IonItem,
    IonAvatar,
    IonBadge,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonToast,
    IonLoading
  ]
})
export class MiCuentaComponent implements OnInit, OnDestroy {
  usuario: Usuario | null = null;
  perfilForm: FormGroup;
  isEditing = false;
  isLoading = false;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private authService: AuthService
  ) { 
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
      cameraOutline
    });

    this.perfilForm = this.formBuilder.group({
      nombre_completo: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(/^\+?[0-9\s\-\(\)]+$/)]]
    });
  }

  ngOnInit() {
    this.cargarUsuarioActual();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Carga la información del usuario actual
   */
  private cargarUsuarioActual() {
    // Obtener el usuario actual desde el AuthService
    const usuarioActual = this.authService.getCurrentUser();
    
    if (usuarioActual) {
      this.usuario = usuarioActual;
      this.cargarDatosEnFormulario();
    } else {
      // Si no hay usuario en el AuthService, intentar obtenerlo de la BD
      this.obtenerUsuarioDeBD();
    }
  }

  /**
   * Obtiene el usuario desde la base de datos
   */
  private obtenerUsuarioDeBD() {
    // Obtener el usuario actual desde el AuthService
    const usuarioActual = this.authService.getCurrentUser();
    
    if (usuarioActual?.id) {
      this.subscription.add(
        this.usuariosService.getUsuario(usuarioActual.id).subscribe({
          next: (usuario: Usuario) => {
            this.usuario = usuario;
            this.cargarDatosEnFormulario();
          },
          error: (error: any) => {
            console.error('Error al cargar usuario:', error);
            this.mostrarMensaje('Error al cargar la información del usuario', 'error');
          }
        })
      );
    } else {
      console.error('No se pudo obtener el ID del usuario');
      this.mostrarMensaje('No se pudo identificar al usuario', 'error');
    }
  }

  /**
   * Carga los datos del usuario en el formulario
   */
  private cargarDatosEnFormulario() {
    if (this.usuario) {
      this.perfilForm.patchValue({
        nombre_completo: this.usuario.nombre_completo,
        email: this.usuario.email,
        telefono: this.usuario.telefono || ''
      });
    }
  }

  /**
   * Activa el modo de edición
   */
  activarEdicion() {
    this.isEditing = true;
  }

  /**
   * Cancela la edición
   */
  cancelarEdicion() {
    this.isEditing = false;
    this.cargarDatosEnFormulario(); // Restaura los valores originales
  }

  /**
   * Guarda los cambios del perfil
   */
  async guardarPerfil() {
    if (this.perfilForm.valid && this.usuario) {
      this.isLoading = true;
      
      try {
        const datosActualizados = this.perfilForm.value;
        
        this.subscription.add(
          this.usuariosService.actualizarUsuario(this.usuario.id, datosActualizados).subscribe({
            next: (usuarioActualizado: Usuario) => {
              this.usuario = usuarioActualizado;
              this.isEditing = false;
              this.mostrarMensaje('Perfil actualizado correctamente', 'success');
            },
            error: (error: any) => {
              console.error('Error al actualizar perfil:', error);
              this.mostrarMensaje('Error al actualizar el perfil', 'error');
            }
          })
        );
      } catch (error) {
        console.error('Error al guardar perfil:', error);
        this.mostrarMensaje('Error al guardar el perfil', 'error');
      } finally {
        this.isLoading = false;
      }
    }
  }

  /**
   * Copia el teléfono al portapapeles
   */
  copiarTelefono() {
    if (this.usuario?.telefono) {
      navigator.clipboard.writeText(this.usuario.telefono).then(() => {
        this.mostrarMensaje('Teléfono copiado al portapapeles', 'success');
      }).catch(() => {
        this.mostrarMensaje('Error al copiar el teléfono', 'error');
      });
    }
  }

  /**
   * Muestra un mensaje de notificación
   */
  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error') {
    // TODO: Implementar sistema de notificaciones
    console.log(`${tipo.toUpperCase()}: ${mensaje}`);
  }

  /**
   * Obtiene el nombre del rol del usuario
   */
  getNombreRol(): string {
    return this.usuario?.rol?.nombre_rol || 'Usuario';
  }

  /**
   * Verifica si el formulario es válido
   */
  get isFormValid(): boolean {
    return this.perfilForm.valid && this.perfilForm.dirty;
  }
}
