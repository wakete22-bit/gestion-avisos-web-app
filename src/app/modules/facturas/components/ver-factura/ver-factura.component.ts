import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBackOutline, eyeOutline, printOutline, downloadOutline, refreshOutline, alertCircleOutline, createOutline, bugOutline, mailOutline } from 'ionicons/icons';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { FacturasService } from '../../services/facturas.service';
import { FacturaCompleta } from '../../models/factura.model';
import { PdfService } from '../../../../core/services/pdf.service';
import { AvisosService } from '../../../../core/services/avisos.service';
import { ConfiguracionService } from '../../../../core/services/configuracion.service';
import { EmailService } from '../../../../core/services/email.service';
import { UnifiedReconnectionService } from '../../../../core/services/unified-reconnection.service';

@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.component.html',
  styleUrls: ['./ver-factura.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
export class VerFacturaComponent implements OnInit, OnDestroy {
  factura: FacturaCompleta | null = null;
  loading = false;
  error: string | null = null;
  facturaId: string | null = null;
  modoEdicion = false;
  ivaPorcentaje = 21; // Valor por defecto
  enviandoCorreo = false;
  
  // Propiedades calculadas para evitar recálculos constantes
  repuestos: any[] = [];
  manoObra: any[] = [];
  desplazamientos: any[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facturasService: FacturasService,
    private pdfService: PdfService,
    private avisosService: AvisosService,
    private configuracionService: ConfiguracionService,
    private emailService: EmailService,
    private unifiedReconnectionService: UnifiedReconnectionService
  ) {
    addIcons({arrowBackOutline,printOutline,createOutline,downloadOutline,bugOutline,refreshOutline,alertCircleOutline,eyeOutline,mailOutline});
  }

  ngOnInit() {
    // 🔄 CONFIGURAR RECONEXIÓN AUTOMÁTICA
    this.unifiedReconnectionService.appResumed
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe((resumed) => {
        if (resumed && this.facturaId) {
          console.log('🔄 VerFacturaComponent: App reanudada, recargando factura...');
          this.cargarFactura();
        }
      });

    // También suscribirse al estado de conexión
    this.unifiedReconnectionService.connectionState
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        console.log('🔄 VerFacturaComponent: Estado de conexión:', state);
        if (state === 'connected' && this.error && this.facturaId) {
          this.cargarFactura();
        }
      });

    this.route.params.subscribe(params => {
      this.facturaId = params['id'];
      if (this.facturaId) {
        this.cargarFactura();
      }
    });

    // Verificar si está en modo edición
    this.route.queryParams.subscribe(params => {
      this.modoEdicion = params['edit'] === 'true';
    });

    // Cargar configuración de IVA
    this.configuracionService.getIvaPorDefecto().pipe(
      takeUntil(this.destroy$)
    ).subscribe(iva => {
      this.ivaPorcentaje = iva;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarFactura() {
    if (!this.facturaId) return;
    
    this.loading = true;
    this.error = null;
    
    // 🚀 USAR FETCH DIRECTO para evitar bloqueos del cliente Supabase
    this.facturasService.getFacturaDirect(this.facturaId).subscribe({
      next: (facturaCompleta) => {
        console.log('🔍 Factura completa recibida del servicio:', facturaCompleta);
        console.log('🔍 Líneas de la factura:', facturaCompleta.lineas);
        
        this.factura = facturaCompleta;
        
        // Procesar las líneas una sola vez
        this.procesarLineasFactura(facturaCompleta.lineas);
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar factura:', error);
        this.error = 'Error al cargar la factura';
        this.loading = false;
      }
    });
  }

  volver() {
    this.router.navigate(['/facturas']);
  }

  /**
   * Procesa las líneas de la factura una sola vez para evitar recálculos constantes
   */
  private procesarLineasFactura(lineas: any[]) {
    if (!lineas || !Array.isArray(lineas)) {
      this.repuestos = [];
      this.manoObra = [];
      this.desplazamientos = [];
      return;
    }

    // Procesar todas las líneas una sola vez
    const lineasProcesadas = lineas.map(linea => this.parsearLinea(linea)).filter(linea => linea !== null);
    
    // Separar por tipo
    this.repuestos = lineasProcesadas.filter(linea => linea.tipo === 'repuesto');
    this.manoObra = lineasProcesadas.filter(linea => linea.tipo === 'mano_obra');
    this.desplazamientos = lineasProcesadas.filter(linea => linea.tipo === 'desplazamiento');

    console.log('✅ Líneas procesadas:', {
      total: lineasProcesadas.length,
      repuestos: this.repuestos.length,
      manoObra: this.manoObra.length,
      desplazamientos: this.desplazamientos.length
    });
  }


  editarFactura() {
    if (this.facturaId) {
      // Redirigir al componente crear-factura en modo edición
      this.router.navigate(['/facturas/editar', this.facturaId]);
    }
  }

  cambiarEstado(event: any) {
    if (!this.facturaId || !this.factura) return;
    
    const nuevoEstado = event.target.value as 'Pendiente' | 'En curso' | 'Completado';
    
    this.facturasService.cambiarEstado(this.facturaId, nuevoEstado).subscribe({
      next: (facturaActualizada) => {
        console.log('✅ Estado de factura actualizado:', facturaActualizada);
        // Actualizar el estado en la factura local
        if (this.factura) {
          this.factura.factura.estado = facturaActualizada.estado;
        }
        
        // Si la factura tiene un aviso asociado y el estado cambió a "Completado",
        // actualizar automáticamente el estado del aviso
        if (nuevoEstado === 'Completado' && this.factura?.factura?.aviso_id) {
          console.log('🔄 Actualizando estado del aviso asociado...');
          this.actualizarEstadoAvisoAsociado(this.factura?.factura?.aviso_id);
        }
      },
      error: (error) => {
        console.error('❌ Error al cambiar estado:', error);
        // Revertir el cambio en caso de error
        if (this.factura) {
          this.factura.factura.estado = event.target.defaultValue;
        }
      }
    });
  }

  /**
   * Actualiza automáticamente el estado del aviso cuando se completa una factura
   */
  private actualizarEstadoAvisoAsociado(avisoId: string) {
    this.avisosService.actualizarEstadoAutomatico(avisoId).subscribe({
      next: (avisoActualizado) => {
        console.log('✅ Estado del aviso actualizado automáticamente:', avisoActualizado.estado);
        
        // Mostrar mensaje informativo al usuario
        if (avisoActualizado.estado === 'Completado') {
          console.log('🎉 El aviso se ha marcado automáticamente como completado');
          // Opcional: mostrar una notificación toast
        }
      },
      error: (error) => {
        console.error('❌ Error al actualizar estado del aviso:', error);
      }
    });
  }

  imprimirFactura() {
    window.print();
  }



  descargarFactura() {
    if (!this.factura) {
      console.error('No hay factura para descargar');
      return;
    }

    try {
      console.log('🔧 Iniciando descarga de factura...');
      
      // Generar nombre del archivo
      const numeroFactura = this.factura.factura.numero_factura || 'factura';
      const nombreArchivo = `factura_${numeroFactura}.pdf`;

      // Preparar datos de la factura para el PDF
      const datosFactura = {
        numero_factura: this.factura.factura.numero_factura,
        fecha_emision: this.factura.factura.fecha_emision,
        nombre_cliente: this.factura.factura.nombre_cliente,
        direccion_cliente: this.factura.factura.direccion_cliente,
        cif_cliente: this.factura.factura.cif_cliente,
        email_cliente: this.factura.factura.email_cliente,
        cliente_id: this.factura.factura.cliente_id,
        subtotal: this.factura.factura.subtotal,
        iva: this.factura.factura.iva,
        total: this.factura.factura.total,
        estado: this.factura.factura.estado,
        notas: this.factura.factura.notas,
        lineas: this.factura.lineas
      };

      // Generar PDF con HTML/CSS (método recomendado)
      this.pdfService.generarPdfHtml(datosFactura, nombreArchivo);
      
      console.log('✅ Factura descargada exitosamente');
    } catch (error) {
      console.error('❌ Error al descargar factura:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  /**
   * Prueba el envío de correo simple (sin PDF)
   */
  async probarEnvioCorreo() {
    if (!this.factura) {
      console.error('No hay factura para probar');
      return;
    }

    if (!this.factura.factura.email_cliente) {
      console.error('No hay email del cliente');
      alert('Error: No se encontró email del cliente.');
      return;
    }

    try {
      this.enviandoCorreo = true;
      console.log('📧 Probando envío de correo simple...');

      const resultado = await this.emailService.enviarCorreoSimple(
        this.factura.factura.email_cliente,
        `Prueba - Factura ${this.factura.factura.numero_factura}`,
        `Hola ${this.factura.factura.nombre_cliente},\n\nEsta es una prueba de envío de correo para la factura ${this.factura.factura.numero_factura}.\n\nSaludos,\nTÉCNICOS CLIMATIZACIÓN S.L.`,
        this.factura.factura.nombre_cliente
      );

      if (resultado.success) {
        console.log('✅ Correo de prueba enviado exitosamente');
        alert('✅ Correo de prueba enviado correctamente');
      } else {
        console.error('❌ Error al enviar correo de prueba:', resultado.message);
        alert('❌ Error al enviar correo de prueba: ' + resultado.message);
      }

    } catch (error) {
      console.error('❌ Error al probar envío de correo:', error);
      alert('❌ Error inesperado al probar el envío de correo.');
    } finally {
      this.enviandoCorreo = false;
    }
  }

  /**
   * Envía la factura por correo electrónico al cliente
   */
  async enviarFacturaPorCorreo() {
    if (!this.factura) {
      console.error('No hay factura para enviar');
      return;
    }

    if (!this.factura.factura.email_cliente) {
      console.error('No hay email del cliente');
      alert('Error: No se encontró email del cliente. Por favor, verifica que la factura tenga un email válido.');
      return;
    }

    // Validar que el email tenga formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.factura.factura.email_cliente)) {
      console.error('Email del cliente no es válido:', this.factura.factura.email_cliente);
      alert('Error: El email del cliente no tiene un formato válido.');
      return;
    }

    try {
      this.enviandoCorreo = true;
      console.log('📧 Iniciando envío de factura por correo...');
      console.log('📧 Datos de la factura:', {
        email_cliente: this.factura.factura.email_cliente,
        nombre_cliente: this.factura.factura.nombre_cliente,
        numero_factura: this.factura.factura.numero_factura,
        total: this.factura.factura.total
      });

      // Generar el PDF como Blob
      const datosFactura = {
        numero_factura: this.factura.factura.numero_factura,
        fecha_emision: this.factura.factura.fecha_emision,
        nombre_cliente: this.factura.factura.nombre_cliente,
        direccion_cliente: this.factura.factura.direccion_cliente,
        cif_cliente: this.factura.factura.cif_cliente,
        email_cliente: this.factura.factura.email_cliente,
        cliente_id: this.factura.factura.cliente_id,
        subtotal: this.factura.factura.subtotal,
        iva: this.factura.factura.iva,
        total: this.factura.factura.total,
        estado: this.factura.factura.estado,
        notas: this.factura.factura.notas,
        lineas: this.factura.lineas
      };

      const pdfBlob = await this.pdfService.generarPdfBlob(datosFactura, `factura_${this.factura.factura.numero_factura}.pdf`);

      // Enviar por correo
      console.log('📧 Enviando correo con datos:', {
        emailCliente: this.factura.factura.email_cliente,
        nombreCliente: this.factura.factura.nombre_cliente,
        numeroFactura: this.factura.factura.numero_factura,
        totalFactura: this.factura.factura.total
      });

      const resultado = await this.emailService.enviarFacturaPorCorreo(
        this.factura.factura.email_cliente,
        this.factura.factura.nombre_cliente,
        this.factura.factura.numero_factura,
        pdfBlob,
        this.factura.factura.total
      );

      if (resultado.success) {
        console.log('✅ Factura enviada exitosamente');
        alert('✅ Factura enviada correctamente al cliente');
      } else {
        console.error('❌ Error al enviar factura:', resultado.message);
        alert('❌ Error al enviar la factura: ' + resultado.message);
      }

    } catch (error) {
      console.error('❌ Error al enviar factura por correo:', error);
      alert('❌ Error inesperado al enviar la factura. Por favor, inténtelo de nuevo.');
    } finally {
      this.enviandoCorreo = false;
    }
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor);
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES');
  }

  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pendiente': return 'estado-pendiente';
      case 'en curso': return 'estado-en-curso';
      case 'completado': return 'estado-completado';
      default: return 'estado-default';
    }
  }

  // Los getters han sido reemplazados por propiedades calculadas para mejorar el rendimiento

  /**
   * Parsea una línea de factura, ya sea string JSON u objeto
   */
  private parsearLinea(linea: any): any {
    if (!linea) return null;
    
    let lineaParsed;
    
    // Si es string, intentar parsearlo como JSON
    if (typeof linea === 'string') {
      try {
        lineaParsed = JSON.parse(linea);
      } catch (error) {
        console.warn('⚠️ Error al parsear línea JSON:', error);
        return null;
      }
    } else if (typeof linea === 'object' && linea !== null) {
      lineaParsed = linea;
    } else {
      console.warn('⚠️ Línea no es string ni objeto:', linea);
      return null;
    }
    
    // Normalizar la línea con valores por defecto
    const lineaNormalizada = {
      id: lineaParsed.id || '',
      tipo: lineaParsed.tipo || 'repuesto',
      nombre: lineaParsed.nombre || 'Sin nombre',
      cantidad: Number(lineaParsed.cantidad) || 0,
      precio_neto: Number(lineaParsed.precio_neto) || 0,
      precio_pvp: Number(lineaParsed.precio_pvp) || 0,
      descripcion: lineaParsed.descripcion || '',
      fecha_creacion: lineaParsed.fecha_creacion || ''
    };
    
    return lineaNormalizada;
  }

  // Cálculos de totales usando las propiedades calculadas
  get totalRepuestosNeto() {
    return this.repuestos.reduce((sum, r) => {
      const cantidad = Number(r.cantidad) || 0;
      const precioNeto = Number(r.precio_neto) || 0;
      return sum + (cantidad * precioNeto);
    }, 0);
  }

  get totalRepuestosPvp() {
    return this.repuestos.reduce((sum, r) => {
      const cantidad = Number(r.cantidad) || 0;
      const precioPvp = Number(r.precio_pvp) || 0;
      return sum + (cantidad * precioPvp);
    }, 0);
  }

  get totalManoObraDesplazamiento() {
    const todosLosItems = [...this.manoObra, ...this.desplazamientos];
    return todosLosItems.reduce((sum, item) => {
      const cantidad = Number(item.cantidad) || 0;
      const precioPvp = Number(item.precio_pvp) || 0;
      return sum + (cantidad * precioPvp);
    }, 0);
  }
} 