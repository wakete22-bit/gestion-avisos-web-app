import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, eyeOutline, printOutline, downloadOutline, refreshOutline, alertCircleOutline, createOutline, mailOutline } from 'ionicons/icons';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';

import { PresupuestosService, Presupuesto } from '../../services/presupuestos.service';
import { ConfiguracionService } from '../../../../core/services/configuracion.service';
import { PresupuestoPdfService } from '../../../../core/services/presupuesto-pdf.service';
import { EmailService } from '../../../../core/services/email.service';
import { UnifiedReconnectionService } from '../../../../core/services/unified-reconnection.service';

@Component({
  selector: 'app-ver-presupuesto',
  templateUrl: './ver-presupuesto.component.html',
  styleUrls: ['./ver-presupuesto.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class VerPresupuestoComponent implements OnInit, OnDestroy {
  presupuesto: Presupuesto | null = null;
  loading = false;
  error: string | null = null;
  presupuestoId: string | null = null;
  ivaPorcentaje: number = 21;
  precioHoraManoObra: number = 50;
  enviandoCorreo = false;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private presupuestosService: PresupuestosService,
    private configuracionService: ConfiguracionService,
    private presupuestoPdfService: PresupuestoPdfService,
    private emailService: EmailService,
    private unifiedReconnectionService: UnifiedReconnectionService
  ) {
    console.log('VerPresupuestoComponent constructor');
    addIcons({arrowBackOutline,createOutline,printOutline,downloadOutline,refreshOutline,alertCircleOutline,eyeOutline,mailOutline});
  }

  ngOnInit() {
    console.log('🔄 VerPresupuestoComponent inicializado');
    
    // Patrón de reconexión
    this.unifiedReconnectionService.appResumed
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe((resumed) => {
        if (resumed) {
          console.log('🔄 VerPresupuestoComponent: App reanudada, recargando presupuesto...');
          if (this.presupuestoId) {
            this.cargarPresupuesto();
          }
        }
      });

    this.unifiedReconnectionService.connectionState
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        console.log('🔄 VerPresupuestoComponent: Estado de conexión:', state);
        if (state === 'connected' && this.presupuestoId) {
          this.cargarPresupuesto();
        }
      });
    
    // Cargar IVA desde configuración
    this.configuracionService.getIvaPorDefecto().subscribe(iva => {
      this.ivaPorcentaje = iva;
    });
    
    // Cargar precio por hora desde configuración
    this.precioHoraManoObra = this.configuracionService.getPrecioHoraManoObraSync();
    
    this.route.params.subscribe(params => {
      this.presupuestoId = params['id'];
      console.log('ID del presupuesto recibido:', this.presupuestoId);
      if (this.presupuestoId) {
        this.cargarPresupuesto();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarPresupuesto() {
    if (!this.presupuestoId) return;
    
    console.log('🔄 Cargando presupuesto con ID:', this.presupuestoId);
    this.loading = true;
    this.error = null;
    
    this.presupuestosService.getPresupuestoDirect(this.presupuestoId).subscribe({
      next: (presupuesto) => {
        console.log('✅ Presupuesto cargado exitosamente:', presupuesto);
        console.log('Materiales estimados:', presupuesto.materiales_estimados);
        this.presupuesto = presupuesto;
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar presupuesto:', error);
        this.error = `Error al cargar el presupuesto: ${error.message || error}`;
        this.loading = false;
      }
    });
  }

  volver() {
    this.router.navigate(['/presupuestos']);
  }

  editarPresupuesto() {
    if (this.presupuestoId) {
      this.router.navigate(['/presupuestos/crear'], { 
        queryParams: { 
          id: this.presupuestoId,
          edit: 'true' 
        } 
      });
    }
  }

  imprimirPresupuesto() {
    window.print();
  }

  descargarPresupuesto() {
    if (!this.presupuesto) {
      console.error('No hay presupuesto para descargar');
      return;
    }

    try {
      console.log('🔧 Iniciando descarga de presupuesto...');
      
      // Generar nombre del archivo
      const numeroPresupuesto = this.presupuesto.id?.substring(0, 8) || 'presupuesto';
      const nombreArchivo = `presupuesto_${numeroPresupuesto}.pdf`;

      // Generar PDF
      this.presupuestoPdfService.generarPdfPresupuesto(this.presupuesto, nombreArchivo);
      
      console.log('✅ Presupuesto descargado exitosamente');
    } catch (error) {
      console.error('❌ Error al descargar presupuesto:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor);
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-ES');
  }

  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pendiente': return 'estado-pendiente';
      case 'en curso': return 'estado-en-curso';
      case 'completado': return 'estado-completado';
      case 'facturado': return 'estado-facturado';
      case 'cancelado': return 'estado-cancelado';
      default: return 'estado-default';
    }
  }

  /**
   * Envía el presupuesto por correo electrónico al cliente
   */
  async enviarPresupuestoPorCorreo() {
    if (!this.presupuesto) {
      console.error('No hay presupuesto para enviar');
      return;
    }

    // Verificar que hay email del cliente
    const emailCliente = this.presupuesto.aviso?.cliente?.email;
    if (!emailCliente) {
      console.error('No hay email del cliente');
      alert('Error: No se encontró email del cliente. Por favor, verifica que el aviso tenga un email válido.');
      return;
    }

    // Validar que el email tenga formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailCliente)) {
      console.error('Email del cliente no es válido:', emailCliente);
      alert('Error: El email del cliente no tiene un formato válido.');
      return;
    }

    try {
      this.enviandoCorreo = true;
      console.log('📧 Iniciando envío de presupuesto por correo...');
      console.log('📧 Datos del presupuesto:', {
        email_cliente: emailCliente,
        nombre_cliente: this.presupuesto.aviso?.nombre_cliente_aviso,
        numero_presupuesto: this.presupuesto.id?.substring(0, 8),
        total: this.presupuesto.total_estimado
      });

      // Generar el PDF como Blob
      const numeroPresupuesto = this.presupuesto.id?.substring(0, 8) || 'presupuesto';
      const nombreArchivo = `presupuesto_${numeroPresupuesto}.pdf`;
      const pdfBlob = await this.presupuestoPdfService.generarPdfPresupuestoBlob(this.presupuesto, nombreArchivo);

      // Enviar por correo
      console.log('📧 Enviando correo con datos:', {
        emailCliente: emailCliente,
        nombreCliente: this.presupuesto.aviso?.nombre_cliente_aviso,
        numeroPresupuesto: numeroPresupuesto,
        totalPresupuesto: this.presupuesto.total_estimado
      });

      const resultado = await this.emailService.enviarPresupuestoPorCorreo(
        emailCliente,
        this.presupuesto.aviso?.nombre_cliente_aviso || 'Cliente',
        numeroPresupuesto,
        pdfBlob,
        this.presupuesto.total_estimado
      );

      if (resultado.success) {
        console.log('✅ Presupuesto enviado exitosamente');
        alert('✅ Presupuesto enviado correctamente al cliente');
      } else {
        console.error('❌ Error al enviar presupuesto:', resultado.message);
        alert('❌ Error al enviar el presupuesto: ' + resultado.message);
      }

    } catch (error) {
      console.error('❌ Error al enviar presupuesto por correo:', error);
      alert('❌ Error inesperado al enviar el presupuesto. Por favor, inténtelo de nuevo.');
    } finally {
      this.enviandoCorreo = false;
    }
  }

  /**
   * Verifica si se puede enviar el presupuesto por correo
   */
  puedeEnviarPorCorreo(): boolean {
    const emailCliente = this.presupuesto?.aviso?.cliente?.email;
    const tieneEmail = !!emailCliente;
    const tienePresupuesto = !!(this.presupuesto);
    
    console.log('🔍 Debug - Puede enviar presupuesto por correo:', {
      tieneEmail,
      tienePresupuesto,
      emailCliente,
      presupuestoId: this.presupuesto?.id,
      presupuestoCompleto: this.presupuesto
    });
    
    return !!(tieneEmail && tienePresupuesto);
  }

  /**
   * Obtiene el título del botón de correo
   */
  getTituloBotonCorreo(): string {
    if (this.enviandoCorreo) {
      return 'Enviando presupuesto...';
    }
    
    if (!this.presupuesto) {
      return 'No hay presupuesto para enviar';
    }
    
    const emailCliente = this.presupuesto.aviso?.cliente?.email;
    if (!emailCliente) {
      return 'No hay email del cliente en el aviso';
    }
    
    return `Enviar presupuesto a ${emailCliente}`;
  }
} 