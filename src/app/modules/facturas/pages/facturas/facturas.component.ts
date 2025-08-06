import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { addIcons } from 'ionicons';
import { 
  mapOutline,
  addCircle, 
  alertCircle, 
  close, 
  eyeOutline, 
  add, 
  addCircleOutline, 
  searchOutline,
  receipt,
  hourglassOutline,
  warning,
  document, receiptOutline, refreshOutline, alertCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { FacturasService } from '../../services/facturas.service';
import { Factura, FacturaResponse } from '../../models/factura.model';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    MatTableModule,
    MatIconModule
  ],
})
export class FacturasComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'estado', 'nombre', 'detalle', 'fecha', 'pvp'];
  facturas: Factura[] = [];
  loading = true; // Cambiar a true para mostrar carga inicial
  error: string | null = null;
  totalFacturas = 0;
  paginaActual = 1;
  porPagina = 10;

  constructor(
    private router: Router,
    private facturasService: FacturasService
  ) { 
    addIcons({refreshOutline,alertCircleOutline,searchOutline,addCircle,eyeOutline,receiptOutline,mapOutline,alertCircle,close,add,addCircleOutline,receipt,hourglassOutline,warning,document});
  }

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas() {
    this.loading = true;
    this.error = null;
    this.facturasService.getFacturas(this.paginaActual, this.porPagina)
      .subscribe({
        next: (response: FacturaResponse) => {
          this.facturas = response.facturas;
          this.totalFacturas = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar facturas:', error);
          this.error = 'Error al cargar las facturas. Por favor, inténtalo de nuevo.';
          this.loading = false;
        }
      });
  }

  abrirCrearFactura() {
    this.router.navigate(['/crear-factura']);
  }

  verFactura(id: string) {
    this.router.navigate(['/facturas', id]);
  }

  cambiarPagina(pagina: number) {
    if (pagina !== this.paginaActual) {
      this.paginaActual = pagina;
      this.cargarFacturas();
    }
  }

  // Función helper para manejar el cambio de página de forma segura
  onCambiarPagina(pagina: number | string) {
    if (typeof pagina === 'number') {
      this.cambiarPagina(pagina);
    }
  }

  getPaginas(): (number | string)[] {
    const totalPaginas = Math.ceil(this.totalFacturas / this.porPagina);
    const paginas: (number | string)[] = [];
    
    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      if (this.paginaActual <= 4) {
        for (let i = 1; i <= 5; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      } else if (this.paginaActual >= totalPaginas - 3) {
        paginas.push(1);
        paginas.push('...');
        for (let i = totalPaginas - 4; i <= totalPaginas; i++) {
          paginas.push(i);
        }
      } else {
        paginas.push(1);
        paginas.push('...');
        for (let i = this.paginaActual - 1; i <= this.paginaActual + 1; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      }
    }
    
    return paginas;
  }

  // Propiedad para usar Math en el template
  get Math() {
    return Math;
  }

}
