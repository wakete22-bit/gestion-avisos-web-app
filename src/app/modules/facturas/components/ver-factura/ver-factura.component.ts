import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, eyeOutline, printOutline, downloadOutline, refreshOutline, alertCircleOutline, createOutline } from 'ionicons/icons';

import { FacturasService } from '../../services/facturas.service';
import { FacturaCompleta } from '../../models/factura.model';
import { PdfService } from '../../../../core/services/pdf.service';

@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.component.html',
  styleUrls: ['./ver-factura.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class VerFacturaComponent implements OnInit {
  factura: FacturaCompleta | null = null;
  loading = false;
  error: string | null = null;
  facturaId: string | null = null;
  modoEdicion = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facturasService: FacturasService,
    private pdfService: PdfService
  ) {
    addIcons({arrowBackOutline,createOutline,printOutline,downloadOutline,refreshOutline,alertCircleOutline,eyeOutline});
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
  }

  cargarFactura() {
    if (!this.facturaId) return;
    
    this.loading = true;
    this.error = null;
    
    this.facturasService.getFactura(this.facturaId).subscribe({
      next: (facturaCompleta) => {
        console.log('🔍 Factura completa recibida del servicio:', facturaCompleta);
        console.log('🔍 Líneas de la factura:', facturaCompleta.lineas);
        this.factura = facturaCompleta;
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

  editarFactura() {
    if (this.facturaId) {
      // Redirigir al componente crear-factura en modo edición
      this.router.navigate(['/facturas/editar', this.facturaId]);
    }
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
        subtotal: this.factura.factura.subtotal,
        iva: this.factura.factura.iva,
        total: this.factura.factura.total,
        estado: this.factura.factura.estado,
        notas: this.factura.factura.notas,
        lineas: this.factura.lineas
      };

      // Generar PDF nativo con estilos
      this.pdfService.generarPdfNativo(datosFactura, nombreArchivo);
      
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
    const repuestos = this.factura?.lineas.filter(linea => linea.tipo === 'repuesto') || [];
    console.log('🔍 Repuestos en componente ver-factura:', repuestos);
    return repuestos;
  }

  get manoObra() {
    const manoObra = this.factura?.lineas.filter(linea => linea.tipo === 'mano_obra') || [];
    console.log('🔍 Mano de obra en componente ver-factura:', manoObra);
    return manoObra;
  }

  get desplazamientos() {
    const desplazamientos = this.factura?.lineas.filter(linea => linea.tipo === 'desplazamiento') || [];
    console.log('🔍 Desplazamientos en componente ver-factura:', desplazamientos);
    return desplazamientos;
  }

  // Cálculos de totales
  get totalRepuestosNeto() {
    return this.repuestos.reduce((sum, r) => sum + (r.cantidad * (r.precio_neto || 0)), 0);
  }

  get totalRepuestosPvp() {
    return this.repuestos.reduce((sum, r) => sum + (r.cantidad * r.precio_pvp), 0);
  }

  get totalManoObraDesplazamiento() {
    return [...this.manoObra, ...this.desplazamientos].reduce((sum, item) => sum + (item.cantidad * item.precio_pvp), 0);
  }
} 