import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  settingsOutline,
  businessOutline,
  cardOutline,
  notificationsOutline,
  warningOutline,
  saveOutline,
  refreshOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  closeOutline,
  informationCircleOutline,
  shieldCheckmarkOutline,
  timeOutline,
  mailOutline,
  callOutline,
  globeOutline,
  imageOutline,
  calculatorOutline,
  documentTextOutline,
  calendarOutline,
  cogOutline,
  serverOutline,
  constructOutline, locationOutline, cashOutline, documentOutline, listOutline } from 'ionicons/icons';
import { AjustesService } from '../../services/ajustes.service';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { AjustesCompletos } from '../../models/ajustes.model';
import { UnifiedReconnectionService } from '../../../../core/services/unified-reconnection.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonIcon
  ],
})
export class AjustesComponent implements OnInit, OnDestroy {
  ajustes: AjustesCompletos | null = null;
  loading = false;
  error = '';
  mensajeExito = '';
  mostrarExito = false;
  mostrarError = false;
  tabActivo = 'empresa';

  // Formularios
  empresaForm: FormGroup = new FormGroup({});
  facturacionForm: FormGroup = new FormGroup({});
  notificacionesForm: FormGroup = new FormGroup({});
  avisosForm: FormGroup = new FormGroup({});
  sistemaForm: FormGroup = new FormGroup({});

  // Opciones para selects
  monedas = [
    { valor: 'EUR', texto: 'Euro (€)' },
    { valor: 'USD', texto: 'Dólar ($)' },
    { valor: 'GBP', texto: 'Libra (£)' }
  ];

  frecuenciasBackup = [
    { valor: 'diario', texto: 'Diario' },
    { valor: 'semanal', texto: 'Semanal' },
    { valor: 'mensual', texto: 'Mensual' }
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private ajustesService: AjustesService,
    private formBuilder: FormBuilder,
    private unifiedReconnectionService: UnifiedReconnectionService
  ) {
    addIcons({settingsOutline,refreshOutline,alertCircleOutline,businessOutline,cardOutline,notificationsOutline,warningOutline,cogOutline,locationOutline,callOutline,mailOutline,globeOutline,imageOutline,saveOutline,calculatorOutline,cashOutline,documentTextOutline,informationCircleOutline,calendarOutline,documentOutline,listOutline,timeOutline,constructOutline,checkmarkCircleOutline,closeOutline,shieldCheckmarkOutline,serverOutline});

    this.inicializarFormularios();
  }

  ngOnInit() {
    // 🔄 CONFIGURAR RECONEXIÓN AUTOMÁTICA (patrón del dashboard)
    this.unifiedReconnectionService.appResumed
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe((resumed) => {
        if (resumed) {
          console.log('🔄 AjustesComponent: App reanudada, recargando ajustes...');
          this.cargarAjustes();
        }
      });

    // También suscribirse al estado de conexión
    this.unifiedReconnectionService.connectionState
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        console.log('🔄 AjustesComponent: Estado de conexión:', state);
        if (state === 'connected' && this.error) {
          this.cargarAjustes();
        }
      });

    this.cargarAjustes();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private inicializarFormularios() {
    // Formulario de empresa
    this.empresaForm = this.formBuilder.group({
      nombre_empresa: ['', [Validators.required, Validators.minLength(2)]],
      cif: ['', [Validators.required, Validators.minLength(9)]],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[+]?[\d\s\-\(\)]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      web: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      logo_url: [''],
      precio_hora_mano_obra: [50, [Validators.required, Validators.min(0), Validators.max(1000)]]
    });

    // Formulario de facturación
    this.facturacionForm = this.formBuilder.group({
      iva_por_defecto: [21, [Validators.required, Validators.min(0), Validators.max(100)]],
      moneda: ['EUR', [Validators.required]],
      formato_numero_factura: ['FAC-{YEAR}-{NUMBER}', [Validators.required]],
      dias_vencimiento: [30, [Validators.required, Validators.min(1), Validators.max(365)]],
      texto_pie_factura: [''],
      condiciones_pago: ['']
    });

    // Formulario de notificaciones
    this.notificacionesForm = this.formBuilder.group({
      email_notificaciones: [true],
      email_avisos_nuevos: [true],
      email_facturas_generadas: [true],
      email_recordatorios: [false],
      sms_notificaciones: [false],
      sms_avisos_urgentes: [false]
    });

    // Formulario de avisos
    this.avisosForm = this.formBuilder.group({
      tipos_urgencia: [['Baja', 'Media', 'Alta', 'Crítica'], [Validators.required]],
      estados_disponibles: [['Pendiente', 'En curso', 'Completado', 'Cancelado'], [Validators.required]],
      tiempo_maximo_respuesta: [24, [Validators.required, Validators.min(1), Validators.max(168)]],
      asignacion_automatica: [false]
    });

    // Formulario de sistema
    this.sistemaForm = this.formBuilder.group({
      backup_automatico: [true],
      frecuencia_backup: ['diario', [Validators.required]],
      retencion_backup_dias: [30, [Validators.required, Validators.min(1), Validators.max(365)]],
      modo_mantenimiento: [false],
      mensaje_mantenimiento: ['']
    });
  }

  cargarAjustes() {
    this.loading = true;
    this.error = '';

    this.ajustesService.getAjustesCompletos().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (ajustes) => {
        this.ajustes = ajustes;
        this.cargarDatosEnFormularios();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar ajustes:', error);
        this.error = 'Error al cargar los ajustes. Por favor, intenta de nuevo.';
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }

  private cargarDatosEnFormularios() {
    if (!this.ajustes) return;

    // Cargar datos de empresa
    this.empresaForm.patchValue({
      nombre_empresa: this.ajustes.empresa.nombre_empresa,
      cif: this.ajustes.empresa.cif,
      direccion: this.ajustes.empresa.direccion,
      telefono: this.ajustes.empresa.telefono,
      email: this.ajustes.empresa.email,
      web: this.ajustes.empresa.web || '',
      logo_url: this.ajustes.empresa.logo_url || '',
      precio_hora_mano_obra: this.ajustes.empresa.precio_hora_mano_obra || 50
    });

    // Cargar datos de facturación
    this.facturacionForm.patchValue({
      iva_por_defecto: this.ajustes.facturacion.iva_por_defecto,
      moneda: this.ajustes.facturacion.moneda,
      formato_numero_factura: this.ajustes.facturacion.formato_numero_factura,
      dias_vencimiento: this.ajustes.facturacion.dias_vencimiento,
      texto_pie_factura: this.ajustes.facturacion.texto_pie_factura || '',
      condiciones_pago: this.ajustes.facturacion.condiciones_pago || ''
    });

    // Cargar datos de notificaciones
    this.notificacionesForm.patchValue({
      email_notificaciones: this.ajustes.notificaciones.email_notificaciones,
      email_avisos_nuevos: this.ajustes.notificaciones.email_avisos_nuevos,
      email_facturas_generadas: this.ajustes.notificaciones.email_facturas_generadas,
      email_recordatorios: this.ajustes.notificaciones.email_recordatorios,
      sms_notificaciones: this.ajustes.notificaciones.sms_notificaciones,
      sms_avisos_urgentes: this.ajustes.notificaciones.sms_avisos_urgentes
    });

    // Cargar datos de avisos
    this.avisosForm.patchValue({
      tipos_urgencia: this.ajustes.avisos.tipos_urgencia,
      estados_disponibles: this.ajustes.avisos.estados_disponibles,
      tiempo_maximo_respuesta: this.ajustes.avisos.tiempo_maximo_respuesta,
      asignacion_automatica: this.ajustes.avisos.asignacion_automatica
    });

    // Cargar datos de sistema
    this.sistemaForm.patchValue({
      backup_automatico: this.ajustes.sistema.backup_automatico,
      frecuencia_backup: this.ajustes.sistema.frecuencia_backup,
      retencion_backup_dias: this.ajustes.sistema.retencion_backup_dias,
      modo_mantenimiento: this.ajustes.sistema.modo_mantenimiento,
      mensaje_mantenimiento: this.ajustes.sistema.mensaje_mantenimiento || ''
    });
  }

  guardarEmpresa() {
    if (this.empresaForm.invalid) return;

    this.loading = true;
    this.error = '';

    console.log('🔄 Guardando configuración de empresa:', this.empresaForm.value);

    this.ajustesService.actualizarConfiguracionEmpresa(this.empresaForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (configuracionActualizada) => {
        console.log('✅ Configuración de empresa guardada exitosamente:', configuracionActualizada);
        this.mensajeExito = 'Configuración de empresa actualizada correctamente';
        this.mostrarExito = true;
        this.loading = false;
        
        // Recargar la configuración para asegurar que se actualice
        this.cargarAjustes();
      },
      error: (error) => {
        console.error('❌ Error al actualizar empresa:', error);
        this.error = 'Error al actualizar la configuración de empresa: ' + (error.message || 'Error desconocido');
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }

  guardarFacturacion() {
    if (this.facturacionForm.invalid) return;

    this.loading = true;
    this.error = '';

    this.ajustesService.actualizarConfiguracionFacturacion(this.facturacionForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.mensajeExito = 'Configuración de facturación actualizada correctamente';
        this.mostrarExito = true;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al actualizar facturación:', error);
        this.error = 'Error al actualizar la configuración de facturación';
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }

  guardarNotificaciones() {
    this.loading = true;
    this.error = '';

    this.ajustesService.actualizarConfiguracionNotificaciones(this.notificacionesForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.mensajeExito = 'Configuración de notificaciones actualizada correctamente';
        this.mostrarExito = true;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al actualizar notificaciones:', error);
        this.error = 'Error al actualizar la configuración de notificaciones';
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }

  guardarAvisos() {
    if (this.avisosForm.invalid) return;

    this.loading = true;
    this.error = '';

    this.ajustesService.actualizarConfiguracionAvisos(this.avisosForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.mensajeExito = 'Configuración de avisos actualizada correctamente';
        this.mostrarExito = true;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al actualizar avisos:', error);
        this.error = 'Error al actualizar la configuración de avisos';
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }

  guardarSistema() {
    if (this.sistemaForm.invalid) return;

    this.loading = true;
    this.error = '';

    this.ajustesService.actualizarConfiguracionSistema(this.sistemaForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.mensajeExito = 'Configuración del sistema actualizada correctamente';
        this.mostrarExito = true;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al actualizar sistema:', error);
        this.error = 'Error al actualizar la configuración del sistema';
        this.mostrarError = true;
        this.loading = false;
      }
    });
  }

  onReintentar() {
    this.cargarAjustes();
  }

  cambiarTab(tab: string) {
    this.tabActivo = tab;
    
    // Actualizar clases de botones
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-tab') === tab) {
        btn.classList.add('active');
      }
    });
    
    // Mostrar/ocultar paneles
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === tab) {
        panel.classList.add('active');
      }
    });
  }

  // Métodos helper para el template
  getMonedaTexto(valor: string): string {
    const moneda = this.monedas.find(m => m.valor === valor);
    return moneda ? moneda.texto : valor;
  }

  getFrecuenciaTexto(valor: string): string {
    const frecuencia = this.frecuenciasBackup.find(f => f.valor === valor);
    return frecuencia ? frecuencia.texto : valor;
  }

  // Validaciones de formularios
  get empresaFormErrors() {
    return {
      nombre_empresa: this.empresaForm.get('nombre_empresa')?.errors,
      cif: this.empresaForm.get('cif')?.errors,
      direccion: this.empresaForm.get('direccion')?.errors,
      telefono: this.empresaForm.get('telefono')?.errors,
      email: this.empresaForm.get('email')?.errors,
      web: this.empresaForm.get('web')?.errors,
      precio_hora_mano_obra: this.empresaForm.get('precio_hora_mano_obra')?.errors
    };
  }

  get facturacionFormErrors() {
    return {
      iva_por_defecto: this.facturacionForm.get('iva_por_defecto')?.errors,
      formato_numero_factura: this.facturacionForm.get('formato_numero_factura')?.errors,
      dias_vencimiento: this.facturacionForm.get('dias_vencimiento')?.errors
    };
  }

  get avisosFormErrors() {
    return {
      tipos_urgencia: this.avisosForm.get('tipos_urgencia')?.errors,
      estados_disponibles: this.avisosForm.get('estados_disponibles')?.errors,
      tiempo_maximo_respuesta: this.avisosForm.get('tiempo_maximo_respuesta')?.errors
    };
  }

  get sistemaFormErrors() {
    return {
      retencion_backup_dias: this.sistemaForm.get('retencion_backup_dias')?.errors
    };
  }
} 