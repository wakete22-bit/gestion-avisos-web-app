import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBackOutline, eyeOutline, printOutline, downloadOutline, refreshOutline, alertCircleOutline, createOutline, bugOutline } from 'ionicons/icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FacturasService } from '../../services/facturas.service';
import { FacturaCompleta } from '../../models/factura.model';
import { PdfService } from '../../../../core/services/pdf.service';
import { AvisosService } from '../../../../core/services/avisos.service';
import { ConfiguracionService } from '../../../../core/services/configuracion.service';

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
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facturasService: FacturasService,
    private pdfService: PdfService,
    private avisosService: AvisosService,
    private configuracionService: ConfiguracionService
  ) {
    addIcons({arrowBackOutline,printOutline,createOutline,downloadOutline,bugOutline,refreshOutline,alertCircleOutline,eyeOutline});
  }

  ngOnInit() {
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
    
    this.facturasService.getFactura(this.facturaId).subscribe({
      next: (facturaCompleta) => {
        console.log('🔍 Factura completa recibida del servicio:', facturaCompleta);
        console.log('🔍 Líneas de la factura:', facturaCompleta.lineas);
        
        // No procesar las líneas aquí, dejar que los getters se encarguen del procesamiento
        console.log('🔍 Líneas de factura recibidas sin procesar:', facturaCompleta.lineas);
        
        this.factura = facturaCompleta;
        this.loading = false;
        
        // Debug: mostrar los repuestos procesados
        setTimeout(() => {
          console.log('🔍 Repuestos procesados después de cargar:', this.repuestos);
          console.log('🔍 Mano de obra procesada después de cargar:', this.manoObra);
          console.log('🔍 Desplazamientos procesados después de cargar:', this.desplazamientos);
        }, 100);
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

  // Separar líneas por tipo
  get repuestos() {
    if (!this.factura?.lineas || !Array.isArray(this.factura.lineas)) {
      return [];
    }
    
    const repuestos = this.factura.lineas
      .map(linea => this.parsearLinea(linea))
      .filter(linea => linea && linea.tipo === 'repuesto');
    
    console.log('🔍 Repuestos filtrados y parseados:', repuestos);
    return repuestos;
  }

  get manoObra() {
    if (!this.factura?.lineas || !Array.isArray(this.factura.lineas)) {
      return [];
    }
    
    const manoObra = this.factura.lineas
      .map(linea => this.parsearLinea(linea))
      .filter(linea => linea && linea.tipo === 'mano_obra');
    
    console.log('🔍 Mano de obra filtrada y parseada:', manoObra);
    return manoObra;
  }

  get desplazamientos() {
    if (!this.factura?.lineas || !Array.isArray(this.factura.lineas)) {
      return [];
    }
    
    const desplazamientos = this.factura.lineas
      .map(linea => this.parsearLinea(linea))
      .filter(linea => linea && linea.tipo === 'desplazamiento');
    
    console.log('🔍 Desplazamientos filtrados y parseados:', desplazamientos);
    return desplazamientos;
  }

  /**
   * Parsea una línea de factura, ya sea string JSON u objeto
   */
  private parsearLinea(linea: any): any {
    if (!linea) return null;
    
    console.log('🔍 Parseando línea:', { tipo: typeof linea, valor: linea });
    
    let lineaParsed;
    
    // Si es string, intentar parsearlo como JSON
    if (typeof linea === 'string') {
      try {
        lineaParsed = JSON.parse(linea);
        console.log('✅ Línea parseada exitosamente de JSON:', lineaParsed);
      } catch (error) {
        console.warn('⚠️ Error al parsear línea JSON:', linea, error);
        return null;
      }
    } else if (typeof linea === 'object' && linea !== null) {
      lineaParsed = linea;
      console.log('✅ Línea ya es objeto:', lineaParsed);
    } else {
      console.warn('⚠️ Línea no es string ni objeto:', linea);
      return null;
    }
    
    // Verificar que tenga las propiedades mínimas
    if (!lineaParsed.nombre) {
      console.warn('⚠️ Línea sin nombre:', lineaParsed);
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
    
    console.log('✅ Línea normalizada:', lineaNormalizada);
    return lineaNormalizada;
  }

  // Cálculos de totales
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