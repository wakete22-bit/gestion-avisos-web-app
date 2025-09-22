import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton, IonModal, ModalController, IonHeader, IonToolbar, IonContent, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, documentTextOutline, personOutline, timeOutline, calendarOutline, cubeOutline, checkmarkCircleOutline, warningOutline, refreshOutline, downloadOutline, printOutline, createOutline, calculator } from 'ionicons/icons';
import { Router } from '@angular/router';
import { PresupuestosService } from '../../../presupuestos/services/presupuestos.service';
import { AlbaranPdfService } from '../../../../core/services/albaran-pdf.service';

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
  imports: [CommonModule, IonIcon, IonHeader, IonToolbar, IonContent, IonFooter],
})
export class VerAlbaranModalComponent implements OnInit {
  @Input() albaran!: Albaran;
  @Input() aviso: any;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private presupuestosService: PresupuestosService,
    private albaranPdfService: AlbaranPdfService
  ) {
    addIcons({ close, documentTextOutline, personOutline, timeOutline, calendarOutline, cubeOutline, checkmarkCircleOutline, warningOutline, refreshOutline, downloadOutline, printOutline, createOutline, calculator });
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
   * Descarga el albarán como PDF
   */
  descargarPDF() {
    if (!this.albaran) {
      console.error('No hay albarán para descargar');
      return;
    }

    try {
      console.log('🔧 Iniciando descarga de albarán...');
      
      // Generar nombre del archivo
      const albaranId = this.albaran.id?.substring(0, 8) || 'albaran';
      const nombreArchivo = `albaran_${albaranId}.pdf`;

      // Preparar datos del albarán para el PDF
      const datosAlbaran = {
        id: this.albaran.id,
        trabajo_id: this.albaran.trabajo_id,
        aviso_id: this.albaran.aviso_id,
        fecha_cierre: this.albaran.fecha_cierre,
        hora_entrada: this.albaran.hora_entrada,
        hora_salida: this.albaran.hora_salida,
        descripcion_trabajo_realizado: this.albaran.descripcion_trabajo_realizado,
        materialesUtilizados: this.materialesUtilizados,
        estado_cierre: this.albaran.estado_cierre,
        presupuesto_necesario: this.albaran.presupuesto_necesario,
        dni_cliente: this.albaran.dni_cliente,
        nombre_firma: this.albaran.nombre_firma,
        firma_url: this.albaran.firma_url,
        observaciones: this.albaran.observaciones,
        fecha_creacion: this.albaran.fecha_creacion,
        aviso: this.aviso
      };

      // Generar PDF usando el servicio
      this.albaranPdfService.generarPdfAlbaran(datosAlbaran, nombreArchivo);
      
      console.log('✅ Albarán descargado exitosamente');
    } catch (error) {
      console.error('❌ Error al descargar albarán:', error);
      alert('Error al generar el PDF del albarán: ' + (error as Error).message);
    }
  }

  /**
   * Imprime el albarán
   */
  imprimirAlbaran() {
    if (!this.albaran) {
      console.error('No hay albarán para imprimir');
      return;
    }

    try {
      console.log('🖨️ Iniciando impresión de albarán...');
      
      // Preparar datos del albarán para la impresión
      const datosAlbaran = {
        id: this.albaran.id,
        trabajo_id: this.albaran.trabajo_id,
        aviso_id: this.albaran.aviso_id,
        fecha_cierre: this.albaran.fecha_cierre,
        hora_entrada: this.albaran.hora_entrada,
        hora_salida: this.albaran.hora_salida,
        descripcion_trabajo_realizado: this.albaran.descripcion_trabajo_realizado,
        materialesUtilizados: this.materialesUtilizados,
        estado_cierre: this.albaran.estado_cierre,
        presupuesto_necesario: this.albaran.presupuesto_necesario,
        dni_cliente: this.albaran.dni_cliente,
        nombre_firma: this.albaran.nombre_firma,
        firma_url: this.albaran.firma_url,
        observaciones: this.albaran.observaciones,
        fecha_creacion: this.albaran.fecha_creacion,
        aviso: this.aviso
      };

      // Generar HTML para impresión
      this.albaranPdfService.generarPdfHtml(datosAlbaran, 'albaran_imprimir.pdf');
      
      console.log('✅ Albarán enviado a impresión');
    } catch (error) {
      console.error('❌ Error al imprimir albarán:', error);
      // Fallback a impresión nativa si hay error
      window.print();
    }
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

  /**
   * Obtiene el color del estado del aviso
   */
  getEstadoAvisoColor(estado: string): string {
    if (!estado) return '#6B7280';
    
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return '#F59E0B';
      case 'en_progreso':
      case 'en progreso':
        return '#3B82F6';
      case 'completado':
      case 'finalizado':
        return '#10B981';
      case 'cancelado':
        return '#EF4444';
      case 'pausado':
        return '#8B5CF6';
      case 'reagendado':
        return '#F97316';
      default:
        return '#6B7280';
    }
  }

  /**
   * Verifica si se puede crear un presupuesto desde este albarán
   */
  puedeCrearPresupuesto(): boolean {
    return this.albaran.estado_cierre === 'Presupuesto pendiente' && this.aviso?.id;
  }

  /**
   * Crea un presupuesto basado en este albarán
   */
  crearPresupuestoDesdeAlbaran() {
    if (!this.puedeCrearPresupuesto()) {
      console.warn('No se puede crear presupuesto desde este albarán');
      return;
    }

    console.log('🎯 Creando presupuesto desde albarán:', this.albaran);

    // Preparar materiales para el presupuesto
    const materiales = this.prepararMaterialesParaPresupuesto();
    
    // Datos del presupuesto con valores inteligentes basados en el albarán
    const presupuestoData = {
      aviso_id: this.aviso.id,
      albaran_id: this.albaran.id,
      horas_estimadas: this.calcularHorasEstimadas(),
      total_estimado: this.calcularTotalEstimado(),
      materiales: materiales
    };

    console.log('📋 Datos para el presupuesto:', presupuestoData);

    this.presupuestosService.crearPresupuesto(presupuestoData).subscribe({
      next: (presupuesto) => {
        console.log('✅ Presupuesto creado exitosamente:', presupuesto);
        
        // Preguntar si quiere ir a editarlo
        const irAEditar = confirm(
          '✅ Presupuesto creado exitosamente.\n\n' +
          '¿Deseas ir a editarlo ahora para ajustar detalles?'
        );
        
        if (irAEditar) {
          // Cerrar este modal y navegar al presupuesto
          this.modalController.dismiss({
            accion_realizada: 'presupuesto_creado',
            presupuesto: presupuesto
          }, 'confirm');
          
          this.router.navigate(['/presupuestos/crear'], {
            queryParams: {
              id: presupuesto.id,
              edit: 'true'
            }
          });
        } else {
          // Solo cerrar el modal con confirmación
          this.modalController.dismiss({
            accion_realizada: 'presupuesto_creado',
            presupuesto: presupuesto,
            mensaje: 'Presupuesto creado exitosamente'
          }, 'confirm');
        }
      },
      error: (error) => {
        console.error('❌ Error al crear presupuesto:', error);
        alert('Error al crear el presupuesto: ' + (error.message || 'Error desconocido'));
      }
    });
  }

  /**
   * Prepara los materiales del albarán para el presupuesto
   */
  private prepararMaterialesParaPresupuesto(): any[] {
    const materiales = this.materialesUtilizados;
    
    return materiales.map(repuesto => ({
      material_id: repuesto.codigo || this.generarIdTemporal(),
      cantidad_estimada: repuesto.cantidad,
      precio_neto_al_momento: repuesto.precio_neto || repuesto.precio_pvp,
      producto: {
        id: repuesto.codigo || this.generarIdTemporal(),
        nombre: repuesto.nombre,
        precio_neto: repuesto.precio_neto || repuesto.precio_pvp,
        unidad: repuesto.unidad || 'unidad'
      }
    }));
  }

  /**
   * Calcula horas estimadas basadas en el tiempo trabajado del albarán
   */
  private calcularHorasEstimadas(): number {
    const horaEntrada = this.albaran.hora_entrada;
    const horaSalida = this.albaran.hora_salida;
    
    if (horaEntrada && horaSalida) {
      const [horasEntrada, minutosEntrada] = horaEntrada.split(':').map(Number);
      const [horasSalida, minutosSalida] = horaSalida.split(':').map(Number);
      
      const minutosEntradaTotal = horasEntrada * 60 + minutosEntrada;
      const minutosSalidaTotal = horasSalida * 60 + minutosSalida;
      
      const diferenciaMinutos = minutosSalidaTotal - minutosEntradaTotal;
      const horas = diferenciaMinutos / 60;
      
      return Math.max(horas, 1); // Mínimo 1 hora
    }
    
    return 2; // Valor por defecto
  }

  /**
   * Calcula total estimado basado en repuestos + trabajo
   */
  private calcularTotalEstimado(): number {
    const costoRepuestos = this.calcularTotalMateriales();
    const horas = this.calcularHorasEstimadas();
    const costoPorHora = 50; // Esto debería venir de configuración
    const costoManoObra = horas * costoPorHora;
    
    return costoRepuestos + costoManoObra;
  }

  /**
   * Genera un ID temporal para materiales sin código
   */
  private generarIdTemporal(): string {
    return 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }


}
