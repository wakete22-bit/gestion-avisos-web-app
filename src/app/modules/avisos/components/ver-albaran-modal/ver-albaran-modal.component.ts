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
  fecha_trabajo: string;
  fecha_cierre: Date;
  hora_entrada: string;
  hora_salida: string;
  descripcion_trabajo_realizado: string;
  repuestos_utilizados: RepuestoAlbaran[] | string[]; // Legacy
  repuestos?: RepuestoAlbaran[]; // Nueva estructura desde repuestos_albaran
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
   * Obtiene los repuestos del albarán priorizando la nueva estructura
   */
  get materialesUtilizados(): RepuestoAlbaran[] {
    // Priorizar la nueva estructura (repuestos desde repuestos_albaran)
    if (this.albaran.repuestos && this.albaran.repuestos.length > 0) {
      console.log('📋 Usando repuestos de tabla repuestos_albaran:', this.albaran.repuestos);
      return this.albaran.repuestos;
    }
    
    // Fallback a la estructura legacy (repuestos_utilizados)
    if (this.albaran.repuestos_utilizados && this.albaran.repuestos_utilizados.length > 0) {
      console.log('📋 Usando repuestos_utilizados legacy:', this.albaran.repuestos_utilizados);
      
      // Si son objetos RepuestoAlbaran, usarlos directamente
      if (typeof this.albaran.repuestos_utilizados[0] === 'object') {
        return this.albaran.repuestos_utilizados as RepuestoAlbaran[];
      }
      
      // Si son strings o JSON strings, intentar procesarlos
      return this.albaran.repuestos_utilizados.map((item: any) => {
        if (typeof item === 'string') {
          try {
            // Intentar parsear como JSON
            const parsed = JSON.parse(item);
            return {
              nombre: parsed.nombre || item,
              cantidad: Number(parsed.cantidad) || 1,
              precio_neto: Number(parsed.precio_neto) || 0,
              precio_pvp: Number(parsed.precio_pvp) || 0,
              unidad: parsed.unidad || 'unidad',
              codigo: parsed.codigo || ''
            } as RepuestoAlbaran;
          } catch (e) {
            // Si no es JSON, tratarlo como string simple
            return {
              nombre: item,
              cantidad: 1,
              precio_neto: 0,
              precio_pvp: 0,
              unidad: 'unidad',
              codigo: ''
            } as RepuestoAlbaran;
          }
        }
        return item as RepuestoAlbaran;
      });
    }
    
    return [];
  }

  /**
   * Verifica si los repuestos tienen estructura completa
   */
  repuestosCompletos(): boolean {
    const materiales = this.materialesUtilizados;
    return materiales.length > 0 && materiales[0].precio_pvp !== undefined;
  }

  /**
   * Calcula el total de materiales
   */
  calcularTotalMateriales(): number {
    return this.materialesUtilizados
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


}
