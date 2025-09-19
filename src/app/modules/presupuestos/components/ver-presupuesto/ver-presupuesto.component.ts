import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, eyeOutline, printOutline, downloadOutline, refreshOutline, alertCircleOutline, createOutline } from 'ionicons/icons';

import { PresupuestosService, Presupuesto } from '../../services/presupuestos.service';
import { ConfiguracionService } from '../../../../core/services/configuracion.service';

@Component({
  selector: 'app-ver-presupuesto',
  templateUrl: './ver-presupuesto.component.html',
  styleUrls: ['./ver-presupuesto.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class VerPresupuestoComponent implements OnInit {
  presupuesto: Presupuesto | null = null;
  loading = false;
  error: string | null = null;
  presupuestoId: string | null = null;
  ivaPorcentaje: number = 21;
  precioHoraManoObra: number = 50;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private presupuestosService: PresupuestosService,
    private configuracionService: ConfiguracionService
  ) {
    console.log('VerPresupuestoComponent constructor');
    addIcons({arrowBackOutline,createOutline,printOutline,downloadOutline,refreshOutline,alertCircleOutline,eyeOutline});
  }

  ngOnInit() {
    console.log('VerPresupuestoComponent ngOnInit');
    
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

  cargarPresupuesto() {
    if (!this.presupuestoId) return;
    
    console.log('Cargando presupuesto con ID:', this.presupuestoId);
    this.loading = true;
    this.error = null;
    
    this.presupuestosService.getPresupuesto(this.presupuestoId).subscribe({
      next: (presupuesto) => {
        console.log('Presupuesto cargado:', presupuesto);
        this.presupuesto = presupuesto;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar presupuesto:', error);
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
    // Implementar descarga de PDF
    console.log('Descargar presupuesto como PDF');
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
} 