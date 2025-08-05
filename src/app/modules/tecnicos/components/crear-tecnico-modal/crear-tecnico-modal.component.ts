import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, saveOutline, personOutline, mailOutline, callOutline, shieldOutline, alertCircleOutline, lockClosedOutline, informationCircleOutline, checkmarkCircleOutline, ellipseOutline, refreshOutline } from 'ionicons/icons';
import { TipoRol } from '../../../../core/models/usuario.model';
import { TecnicosService } from '../../services/tecnicos.service';
import { CrearTecnicoRequest, Tecnico } from '../../models/tecnico.model';
import { RolesService } from '../../../../core/services/roles.service';
import { Subject, takeUntil, from } from 'rxjs';

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
export class CrearTecnicoModalComponent implements OnInit {
  @Input() modo: 'crear' | 'editar' = 'crear';
  @Input() tecnico?: Tecnico;
  
  modoEdicion = false;
  TipoRol = TipoRol; // Hacer el enum disponible en el template
  private destroy$ = new Subject<void>();

  tecnicoData: CrearTecnicoRequest = {
    nombre_completo: '',
    email: '',
    password: '',
    telefono: '',
    rol_id: '', // Se asignará dinámicamente
    es_activo: true
  };

  // Roles disponibles - se cargarán dinámicamente
  rolesDisponibles: Array<{value: string, label: string, descripcion: string}> = [];

  loading = false;
  loadingRoles = true;
  error = '';

  constructor(
    private modalController: ModalController,
    private tecnicosService: TecnicosService,
    private rolesService: RolesService
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

  ngOnInit() {
    this.modoEdicion = this.modo === 'editar';
    this.cargarRolesDisponibles();
    
    // Si estamos en modo editar y tenemos datos del técnico, cargar los datos
    if (this.modoEdicion && this.tecnico) {
      this.cargarDatosTecnico();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarDatosTecnico() {
    if (!this.tecnico) return;

    this.tecnicoData = {
      nombre_completo: this.tecnico.nombre_completo || '',
      email: this.tecnico.email || '',
      password: '', // No cargar contraseña por seguridad
      telefono: this.tecnico.telefono || '',
      rol_id: this.tecnico.rol?.id || '',
      es_activo: this.tecnico.es_activo ?? true
    };
  }

  /**
   * Carga los roles disponibles desde la base de datos
   */
  cargarRolesDisponibles() {
    this.loadingRoles = true;
    
    // Usar el servicio de técnicos para obtener roles desde la BD
    from(this.tecnicosService.obtenerRolesDisponibles()).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (roles) => {
        this.rolesDisponibles = roles.map(rol => ({
          value: rol.id,
          label: rol.nombre_rol,
          descripcion: this.rolesService.getDescripcionRol(rol.nombre_rol as TipoRol)
        }));
        
        // Establecer rol por defecto (Técnico si existe) solo si no estamos editando
        if (!this.modoEdicion) {
          const rolTecnico = this.rolesDisponibles.find(r => r.label === 'Técnico');
          if (rolTecnico) {
            this.tecnicoData.rol_id = rolTecnico.value;
          }
        }
        
        this.loadingRoles = false;
        console.log('✅ Roles cargados:', this.rolesDisponibles);
      },
      error: (error) => {
        console.error('❌ Error al cargar roles:', error);
        this.loadingRoles = false;
        
        // Roles por defecto como fallback (con UUIDs placeholders)
        this.rolesDisponibles = [
          { 
            value: 'admin-uuid-placeholder', 
            label: 'Administrador',
            descripcion: this.rolesService.getDescripcionRol(TipoRol.ADMINISTRADOR)
          },
          { 
            value: 'a0472297-ee16-44d8-a434-810a3868a209', 
            label: 'Técnico',
            descripcion: this.rolesService.getDescripcionRol(TipoRol.TECNICO)
          },
          { 
            value: '70c12fd8-92c2-4479-bba0-c7b2e934f48a', 
            label: 'Usuario',
            descripcion: this.rolesService.getDescripcionRol(TipoRol.USUARIO)
          }
        ];
        
        // Establecer rol por defecto solo si no estamos editando
        if (!this.modoEdicion) {
          this.tecnicoData.rol_id = this.rolesDisponibles[1].value; // Técnico por defecto
        }
        this.error = 'No se pudieron cargar los roles desde la base de datos. Usando valores por defecto.';
      }
    });
  }

  async onClose() {
    await this.modalController.dismiss(null, 'cancel');
  }

  async crearTecnico() {
    if (!this.validarFormulario()) {
      return;
    }

    // Validar que el rol seleccionado no sea un placeholder
    if (this.tecnicoData.rol_id === 'admin-uuid-placeholder') {
      this.error = 'Por favor, contacta al administrador para configurar correctamente el UUID del rol Administrador en la base de datos.';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      if (this.modoEdicion && this.tecnico) {
        // Actualizar técnico existente
        this.tecnicosService.actualizarTecnico(this.tecnico.id, this.tecnicoData).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (tecnico) => {
            console.log('✅ Técnico actualizado exitosamente:', tecnico);
            this.modalController.dismiss(tecnico, 'confirm');
          },
          error: (error) => {
            console.error('❌ Error al actualizar técnico:', error);
            this.manejarErrorCreacion(error);
            this.loading = false;
          }
        });
      } else {
        // Crear nuevo técnico
        this.tecnicosService.crearTecnico(this.tecnicoData).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (tecnico) => {
            console.log('✅ Técnico creado exitosamente:', tecnico);
            this.modalController.dismiss(tecnico, 'confirm');
          },
          error: (error) => {
            console.error('❌ Error al crear técnico:', error);
            this.manejarErrorCreacion(error);
            this.loading = false;
          }
        });
      }
    } catch (error) {
      this.error = 'Error inesperado al procesar el técnico';
      console.error('❌ Error inesperado:', error);
      this.loading = false;
    }
  }

  /**
   * Maneja los errores de creación/actualización de técnico de forma más detallada
   */
  private manejarErrorCreacion(error: any) {
    console.log('🔍 Analizando error:', error);
    
    if (typeof error === 'string') {
      this.error = error;
    } else if (error?.message) {
      // Errores específicos con mensajes más claros
      if (error.message.includes('Ya existe un usuario con este email')) {
        this.error = '📧 Ya existe un usuario registrado con este email. Por favor, usa un email diferente.';
      } else if (error.message.includes('duplicate key value') || error.code === '23505') {
        this.error = '⚠️ El usuario ya existe en el sistema. Por favor, verifica el email ingresado.';
      } else if (error.message.includes('Invalid login credentials')) {
        this.error = '🔐 Error en las credenciales. Por favor, verifica el email y contraseña.';
      } else if (error.message.includes('Email not confirmed')) {
        this.error = '📧 El email necesita ser confirmado. Revisa la bandeja de entrada.';
      } else if (error.message.includes('Password should be at least 6 characters')) {
        this.error = '🔒 La contraseña debe tener al menos 6 caracteres.';
      } else if (error.message.includes('Unable to validate email address')) {
        this.error = '📧 El formato del email no es válido.';
      } else if (error.message.includes('Network request failed')) {
        this.error = '🌐 Error de conexión. Por favor, verifica tu conexión a internet.';
      } else {
        this.error = `❌ Error: ${error.message}`;
      }
    } else {
      this.error = '❌ Error desconocido al procesar el técnico. Por favor, intenta de nuevo.';
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

    // Solo validar contraseña si estamos creando un nuevo técnico
    if (!this.modoEdicion) {
      if (!this.tecnicoData.password.trim()) {
        this.error = 'La contraseña es obligatoria';
        return false;
      }

      if (this.tecnicoData.password.length < 6) {
        this.error = 'La contraseña debe tener al menos 6 caracteres';
        return false;
      }
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
    const baseValidation = !!this.tecnicoData.nombre_completo.trim() &&
           this.validarEmail(this.tecnicoData.email) &&
           !!this.tecnicoData.rol_id;
    
    // Solo validar contraseña si estamos creando un nuevo técnico
    if (this.modoEdicion) {
      return baseValidation;
    } else {
      return baseValidation && this.tecnicoData.password.length >= 6;
    }
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

  get tituloModal(): string {
    return this.modoEdicion ? 'Editar Técnico' : 'Crear Nuevo Técnico';
  }

  get subtituloModal(): string {
    return this.modoEdicion ? 'Modifica los datos del técnico' : 'Registra un nuevo técnico en el sistema';
  }

  get textoBotonGuardar(): string {
    return this.loading ? 'Procesando...' : (this.modoEdicion ? 'Actualizar Técnico' : 'Crear Técnico');
  }
} 