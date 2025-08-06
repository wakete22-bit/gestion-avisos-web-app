import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, eyeOutline, printOutline, downloadOutline, refreshOutline, alertCircleOutline, createOutline } from 'ionicons/icons';

import { FacturasService } from '../../services/facturas.service';
import { FacturaCompleta } from '../../models/factura.model';

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
    private facturasService: FacturasService
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
      this.router.navigate(['/crear-factura'], { 
        queryParams: { 
          id: this.facturaId,
          edit: 'true' 
        } 
      });
    }
  }

  imprimirFactura() {
    window.print();
  }

  descargarFactura() {
    // Implementar descarga de PDF usando el servicio existente
    console.log('Descargar factura como PDF');
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
    return this.factura?.lineas.filter(linea => linea.tipo === 'repuesto') || [];
  }

  get manoObra() {
    return this.factura?.lineas.filter(linea => linea.tipo === 'mano_obra') || [];
  }

  get desplazamientos() {
    return this.factura?.lineas.filter(linea => linea.tipo === 'desplazamiento') || [];
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