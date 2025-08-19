import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton, IonModal, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, documentTextOutline, personOutline, timeOutline, calendarOutline, cubeOutline, checkmarkCircleOutline, warningOutline, refreshOutline, downloadOutline, printOutline } from 'ionicons/icons';

// Interfaces para el albarán
export interface RepuestoAlbaran {
  nombre: string;
  cantidad: number;
  precio_neto: number;
  precio_pvp: number;
  unidad: string;
  codigo: string;
}

export interface Albaran {
  id?: string;
  trabajo_id: string;
  aviso_id: string;
  fecha_cierre: Date;
  hora_entrada: string;
  hora_salida: string;
  descripcion_trabajo_realizado: string;
  repuestos_utilizados: RepuestoAlbaran[] | string[];
  estado_cierre: 'Finalizado' | 'Presupuesto pendiente' | 'Otra visita';
  presupuesto_necesario: number;
  dni_cliente?: string;
  nombre_firma?: string;
  firma_url?: string;
  observaciones?: string;
  fecha_creacion?: Date;
}

@Component({
  selector: 'app-ver-albaran-modal',
  templateUrl: './ver-albaran-modal.component.html',
  styleUrls: ['./ver-albaran-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonButton],
})
export class VerAlbaranModalComponent implements OnInit {
  @Input() albaran!: Albaran;
  @Input() aviso: any;

  constructor(private modalController: ModalController) {
    addIcons({ close, documentTextOutline, personOutline, timeOutline, calendarOutline, cubeOutline, checkmarkCircleOutline, warningOutline, refreshOutline, downloadOutline, printOutline });
  }

  ngOnInit() {
    console.log('Modal de albarán cargado:', this.albaran);
  }

  /**
   * Cierra el modal
   */
  cerrarModal() {
    this.modalController.dismiss();
  }

  /**
   * Descarga el albarán como PDF (implementar cuando se tenga el servicio)
   */
  descargarPDF() {
    console.log('Descargando albarán como PDF...');
    // TODO: Implementar descarga de PDF
    alert('Funcionalidad de descarga de PDF en desarrollo');
  }

  /**
   * Imprime el albarán
   */
  imprimirAlbaran() {
    console.log('Imprimiendo albarán...');
    window.print();
  }

  /**
   * Verifica si el albarán tiene firma
   */
  tieneFirma(): boolean {
    return !!(this.albaran.firma_url || this.albaran.nombre_firma);
  }

  /**
   * Obtiene la clase CSS para el estado del albarán
   */
  getEstadoClass(estado: string): string {
    return 'badge-' + estado.toLowerCase().replace(/ /g, '-');
  }

  /**
   * Verifica si los repuestos tienen estructura completa
   */
  repuestosCompletos(): boolean {
    return this.albaran.repuestos_utilizados.length > 0 && 
           typeof this.albaran.repuestos_utilizados[0] === 'object';
  }

  /**
   * Calcula el total de materiales
   */
  calcularTotalMateriales(): number {
    if (!this.repuestosCompletos()) return 0;
    
    return (this.albaran.repuestos_utilizados as RepuestoAlbaran[])
      .reduce((total, repuesto) => total + (repuesto.precio_pvp * repuesto.cantidad), 0);
  }

  /**
   * Formatea la fecha para mostrar
   */
  formatearFecha(fecha: Date | string): string {
    if (!fecha) return 'No especificada';
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Formatea la hora para mostrar
   */
  formatearHora(hora: string): string {
    if (!hora) return 'No especificada';
    return hora;
  }

  /**
   * Obtiene el color del estado
   */
  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'Finalizado':
        return '#10B981';
      case 'Presupuesto pendiente':
        return '#F59E0B';
      case 'Otra visita':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  }

  /**
   * Helper para obtener un material como RepuestoAlbaran
   */
  getMaterialAsRepuesto(material: any): RepuestoAlbaran {
    return material as RepuestoAlbaran;
  }
}
