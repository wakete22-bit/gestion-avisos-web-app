import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoPdfService {

  constructor(private configuracionService: ConfiguracionService) { }

  /**
   * Genera un PDF del presupuesto usando jsPDF y lo retorna como Blob
   */
  async generarPdfPresupuestoBlob(datosPresupuesto: any, nombreArchivo: string = 'presupuesto.pdf'): Promise<Blob> {
    try {
      console.log('🔧 Generando PDF de presupuesto como Blob...');
      
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      const maxContentHeight = pageHeight - 60; // Espacio para footer
      
      let yPos = margin;
      let currentPage = 1;

      // Función helper para texto con estilos
      const addText = (text: string, x: number, y: number, options: any = {}) => {
        const defaultOptions = {
          fontSize: 12,
          fontStyle: 'normal',
          color: [17, 24, 39] as [number, number, number], // #111827
          align: 'left'
        };
        const finalOptions = { ...defaultOptions, ...options };
        
        doc.setFontSize(finalOptions.fontSize);
        doc.setFont('helvetica', finalOptions.fontStyle);
        doc.setTextColor(finalOptions.color[0], finalOptions.color[1], finalOptions.color[2]);
        doc.text(text, x, y, { align: finalOptions.align });
      };

      // Función helper para dibujar líneas
      const drawLine = (x1: number, y1: number, x2: number, y2: number, color: [number, number, number] = [79, 70, 229]) => {
        doc.setDrawColor(color[0], color[1], color[2]);
        doc.line(x1, y1, x2, y2);
      };

      // Función helper para dibujar rectángulos
      const drawRect = (x: number, y: number, w: number, h: number, fillColor?: [number, number, number], strokeColor?: [number, number, number]) => {
        if (fillColor) {
          doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
          doc.rect(x, y, w, h, 'F');
        }
        if (strokeColor) {
          doc.setDrawColor(strokeColor[0], strokeColor[1], strokeColor[2]);
          doc.rect(x, y, w, h, 'S');
        }
      };

      // Función para verificar si necesitamos nueva página
      const checkNewPage = (requiredHeight: number = 10): boolean => {
        return (yPos + requiredHeight) > maxContentHeight;
      };

      // Función para agregar nueva página
      const addNewPage = () => {
        doc.addPage();
        currentPage++;
        yPos = margin;
        
        // Agregar número de página
        addText(`Página ${currentPage}`, pageWidth - margin, pageHeight - 20, { 
          fontSize: 10, 
          color: [107, 114, 128] as [number, number, number], 
          align: 'right' 
        });
      };

      // ===== HEADER PRINCIPAL =====
      // Título principal
      addText('PRESUPUESTO', pageWidth / 2, yPos, { 
        fontSize: 28, 
        fontStyle: 'bold', 
        color: [79, 70, 229] as [number, number, number], 
        align: 'center' 
      });
      
      yPos += 20;

      // ===== INFORMACIÓN BÁSICA =====
      // Número de presupuesto y fecha
      addText(`Nº ${datosPresupuesto.id?.substring(0, 8) || 'N/A'}`, margin, yPos, { fontSize: 14, fontStyle: 'bold' });
      addText(`Fecha: ${this.formatearFecha(datosPresupuesto.fecha_creacion) || 'N/A'}`, pageWidth - margin, yPos, { fontSize: 14, align: 'right' });
      
      yPos += 25;

      // ===== DATOS DE LA EMPRESA =====
      addText('DATOS DE LA EMPRESA', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      yPos += 8;
      const empresa = this.obtenerDatosEmpresa();
      addText(empresa.nombre_empresa, margin, yPos, { fontSize: 12, fontStyle: 'bold' });
      yPos += 6;
      addText(empresa.direccion, margin, yPos, { fontSize: 11 });
      yPos += 5;
      addText(`CIF: ${empresa.cif}`, margin, yPos, { fontSize: 11 });
      yPos += 5;
      addText(`Tel: ${empresa.telefono}`, margin, yPos, { fontSize: 11 });
      yPos += 5;
      addText(empresa.email, margin, yPos, { fontSize: 11 });

      yPos += 20;

      // ===== DATOS DEL CLIENTE =====
      if (datosPresupuesto.aviso) {
        addText('DATOS DEL CLIENTE', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        yPos += 8;
        addText(`Nombre: ${datosPresupuesto.aviso.nombre_cliente_aviso || 'N/A'}`, margin, yPos, { fontSize: 11 });
        yPos += 5;
        addText(`Dirección: ${datosPresupuesto.aviso.direccion_cliente_aviso || 'N/A'}`, margin, yPos, { fontSize: 11 });
        yPos += 5;
        addText(`Teléfono: ${datosPresupuesto.aviso.telefono_cliente_aviso || 'N/A'}`, margin, yPos, { fontSize: 11 });
        if (datosPresupuesto.aviso.cliente?.email) {
          yPos += 5;
          addText(`Email: ${datosPresupuesto.aviso.cliente.email}`, margin, yPos, { fontSize: 11 });
        }
      }

      yPos += 25;

      // ===== DESCRIPCIÓN DEL TRABAJO =====
      if (datosPresupuesto.aviso?.descripcion_problema) {
        addText('DESCRIPCIÓN DEL TRABAJO', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        yPos += 8;
        
        // Caja con descripción del trabajo
        const descripcionBoxHeight = 30;
        drawRect(margin, yPos, contentWidth, descripcionBoxHeight, [249, 250, 251], [229, 231, 235]);
        addText(datosPresupuesto.aviso.descripcion_problema, margin + 10, yPos + 12, { fontSize: 10 });
        yPos += descripcionBoxHeight + 15;
      }

      // ===== MANO DE OBRA Y DESPLAZAMIENTOS =====
      if ((datosPresupuesto.horas_estimadas && datosPresupuesto.horas_estimadas > 0) || 
          (datosPresupuesto.horas_desplazamiento && datosPresupuesto.horas_desplazamiento > 0)) {
        // Verificar si necesitamos nueva página para la sección de mano de obra
        if (checkNewPage(50)) {
          addNewPage();
        }
        
        addText('MANO DE OBRA Y DESPLAZAMIENTOS', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        yPos += 10;

        // Header de tabla
        const tableY = yPos;
        drawRect(margin, tableY, contentWidth, 18, [79, 70, 229]);
        
        // Columnas del header
        const col1 = margin + 8;
        const col2 = margin + 60;
        const col3 = margin + 100;
        const col4 = margin + 140;
        
        addText('CONCEPTO', col1, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('HORAS', col2, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('PRECIO/HORA', col3, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('TOTAL', col4, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        
        yPos += 22;

        // Filas de mano de obra y desplazamientos
        const precioPorHora = this.configuracionService.getPrecioHoraManoObraSync();
        let totalManoObra = 0;
        let totalDesplazamientos = 0;
        
        if (datosPresupuesto.horas_estimadas && datosPresupuesto.horas_estimadas > 0) {
          totalManoObra = datosPresupuesto.horas_estimadas * precioPorHora;
          
          drawRect(margin, yPos, contentWidth, 15, [255, 255, 255], [229, 231, 235]);
          addText('Trabajo técnico especializado', col1, yPos + 10, { fontSize: 9 });
          addText(`${datosPresupuesto.horas_estimadas}h`, col2, yPos + 10, { fontSize: 9 });
          addText(`€${precioPorHora.toFixed(2)}`, col3, yPos + 10, { fontSize: 9 });
          addText(`€${totalManoObra.toFixed(2)}`, col4, yPos + 10, { fontSize: 9 });
          
          yPos += 15;
        }

        if (datosPresupuesto.horas_desplazamiento && datosPresupuesto.horas_desplazamiento > 0) {
          totalDesplazamientos = datosPresupuesto.horas_desplazamiento * precioPorHora;
          
          drawRect(margin, yPos, contentWidth, 15, [249, 250, 251], [229, 231, 235]);
          addText('Desplazamiento y traslados', col1, yPos + 10, { fontSize: 9 });
          addText(`${datosPresupuesto.horas_desplazamiento}h`, col2, yPos + 10, { fontSize: 9 });
          addText(`€${precioPorHora.toFixed(2)}`, col3, yPos + 10, { fontSize: 9 });
          addText(`€${totalDesplazamientos.toFixed(2)}`, col4, yPos + 10, { fontSize: 9 });
          
          yPos += 15;
        }

        // Total de mano de obra y desplazamientos
        const totalManoObraDesplazamiento = totalManoObra + totalDesplazamientos;
        drawRect(margin, yPos, contentWidth, 18, [79, 70, 229]);
        addText('TOTAL MANO DE OBRA', col1, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText(`€${totalManoObraDesplazamiento.toFixed(2)}`, col4, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        
        yPos += 25;
      }

      // ===== MATERIALES ESTIMADOS =====
      if (datosPresupuesto.materiales_estimados && datosPresupuesto.materiales_estimados.length > 0) {
        // Verificar si necesitamos nueva página para la sección de materiales
        if (checkNewPage(50)) {
          addNewPage();
        }
        
        addText('MATERIALES ESTIMADOS', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        yPos += 10;

        // Header de tabla
        const tableY = yPos;
        drawRect(margin, tableY, contentWidth, 18, [79, 70, 229]);
        
        // Columnas del header
        const col1 = margin + 8;
        const col2 = margin + 60;
        const col3 = margin + 80;
        const col4 = margin + 100;
        
        addText('MATERIAL', col1, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('CANTIDAD', col2, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('PRECIO UNIT.', col3, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('TOTAL', col4, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        
        yPos += 22;

        // Filas de materiales
        let totalMateriales = 0;
        datosPresupuesto.materiales_estimados.forEach((material: any, index: number) => {
          // Verificar si necesitamos nueva página para cada fila
          if (checkNewPage(20)) {
            addNewPage();
            // Re-dibujar header de tabla en nueva página
            drawRect(margin, yPos, contentWidth, 18, [79, 70, 229]);
            addText('MATERIAL', col1, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
            addText('CANTIDAD', col2, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
            addText('PRECIO UNIT.', col3, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
            addText('TOTAL', col4, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
            yPos += 22;
          }
          
          const rowColor = index % 2 === 0 ? [255, 255, 255] as [number, number, number] : [249, 250, 251] as [number, number, number];
          drawRect(margin, yPos, contentWidth, 15, rowColor);
          
          const nombreMaterial = material.material?.nombre || material.producto?.nombre || 'Material sin nombre';
          const cantidad = material.cantidad_estimada || 0;
          const precioUnitario = material.precio_neto_al_momento || 0;
          const totalMaterial = cantidad * precioUnitario;
          totalMateriales += totalMaterial;
          
          addText(nombreMaterial, col1, yPos + 10, { fontSize: 9 });
          addText(cantidad.toString(), col2, yPos + 10, { fontSize: 9 });
          addText(`€${precioUnitario.toFixed(2)}`, col3, yPos + 10, { fontSize: 9 });
          addText(`€${totalMaterial.toFixed(2)}`, col4, yPos + 10, { fontSize: 9 });
          
          yPos += 15;
        });

        // Total materiales
        drawRect(margin, yPos, contentWidth, 18, [79, 70, 229]);
        addText('TOTAL MATERIALES', col1, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText(`€${totalMateriales.toFixed(2)}`, col4, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        yPos += 25;
      }

      // ===== RESUMEN DE TOTALES =====
      const totalManoObra = (datosPresupuesto.horas_estimadas || 0) * this.configuracionService.getPrecioHoraManoObraSync();
      const totalMateriales = (datosPresupuesto.materiales_estimados || []).reduce((acc: number, m: any) => {
        return acc + ((m.cantidad_estimada || 0) * (m.precio_neto_al_momento || 0));
      }, 0);
      const subtotal = totalManoObra + totalMateriales;
      const ivaPorcentaje = 21; // Valor por defecto, se puede obtener de configuracion si es necesario
      const iva = subtotal * (ivaPorcentaje / 100);
      const total = subtotal + iva;

      // Caja de totales profesional
      const totalesBoxWidth = 140;
      const totalesBoxX = pageWidth - margin - totalesBoxWidth;
      drawRect(totalesBoxX, yPos, totalesBoxWidth, 70, [238, 242, 255], [79, 70, 229]);

      // Título del resumen
      addText('RESUMEN DEL PRESUPUESTO', totalesBoxX + 5, yPos + 10, { fontSize: 11, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      
      // Línea separadora
      drawLine(totalesBoxX + 5, yPos + 13, totalesBoxX + totalesBoxWidth - 5, yPos + 13, [79, 70, 229]);
      
      // Detalles del resumen
      addText('Subtotal:', totalesBoxX + 5, yPos + 23, { fontSize: 10 });
      addText(`€${subtotal.toFixed(2)}`, totalesBoxX + totalesBoxWidth - 5, yPos + 23, { fontSize: 10, align: 'right' });
      
      addText(`IVA (${ivaPorcentaje}%):`, totalesBoxX + 5, yPos + 33, { fontSize: 10 });
      addText(`€${iva.toFixed(2)}`, totalesBoxX + totalesBoxWidth - 5, yPos + 33, { fontSize: 10, align: 'right' });
      
      // Línea separadora antes del total
      drawLine(totalesBoxX + 5, yPos + 43, totalesBoxX + totalesBoxWidth - 5, yPos + 43, [79, 70, 229]);
      
      // Total final destacado
      addText('TOTAL', totalesBoxX + 5, yPos + 53, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      addText(`€${total.toFixed(2)}`, totalesBoxX + totalesBoxWidth - 5, yPos + 53, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number], align: 'right' });

      yPos += 80;

      // ===== CONDICIONES =====
      // Verificar si necesitamos nueva página para las condiciones
      if (checkNewPage(30)) {
        addNewPage();
      }
      
      addText('CONDICIONES', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      yPos += 10;
      
      const condiciones = [
        'Este presupuesto tiene una validez de 30 días desde su emisión.',
        'Los precios incluyen IVA.',
        'El pago se realizará según las condiciones acordadas.',
        'Los materiales podrán variar según disponibilidad.'
      ];

      condiciones.forEach(condicion => {
        addText(`• ${condicion}`, margin + 10, yPos, { fontSize: 10 });
        yPos += 6;
      });

      // ===== FOOTER EN TODAS LAS PÁGINAS =====
      const addFooter = () => {
        const footerY = pageHeight - 30;
        drawLine(margin, footerY, pageWidth - margin, footerY, [229, 231, 235]);
        
        addText(empresa.nombre_empresa, margin, footerY + 8, { 
          fontSize: 10, 
          fontStyle: 'bold', 
          color: [79, 70, 229] as [number, number, number] 
        });
        addText('Gracias por su confianza', pageWidth / 2, footerY + 8, { 
          fontSize: 10, 
          color: [107, 114, 128] as [number, number, number], 
          align: 'center' 
        });
        addText(empresa.web, pageWidth - margin, footerY + 8, { 
          fontSize: 10, 
          color: [107, 114, 128] as [number, number, number], 
          align: 'right' 
        });
      };

      // Agregar footer a todas las páginas
      for (let i = 1; i <= currentPage; i++) {
        doc.setPage(i);
        addFooter();
      }

      // Convertir PDF a blob
      const pdfBlob = doc.output('blob');
      
      console.log('✅ PDF de presupuesto generado como Blob exitosamente');
      return pdfBlob;
      
    } catch (error) {
      console.error('❌ Error al generar PDF de presupuesto:', error);
      throw error;
    }
  }

  /**
   * Genera un PDF del presupuesto usando jsPDF
   */
  generarPdfPresupuesto(datosPresupuesto: any, nombreArchivo: string = 'presupuesto.pdf'): void {
    try {
      console.log('🔧 Generando PDF de presupuesto...');
      
      // Usar el método que genera Blob pero descargar directamente
      this.generarPdfPresupuestoBlob(datosPresupuesto, nombreArchivo).then(pdfBlob => {
        // Crear enlace de descarga
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = nombreArchivo;
        link.click();
        
        // Limpiar
        URL.revokeObjectURL(url);
        
        console.log('✅ PDF de presupuesto descargado exitosamente');
      }).catch(error => {
        console.error('❌ Error al descargar PDF de presupuesto:', error);
      });
      
    } catch (error) {
      console.error('❌ Error al generar PDF de presupuesto:', error);
      throw error;
    }
  }

  /**
   * Obtiene los datos de la empresa para usar en métodos síncronos
   */
  private obtenerDatosEmpresa(): any {
    const configuracion = this.configuracionService.getConfiguracionActual();
    return configuracion?.empresa || {
      nombre_empresa: 'TÉCNICOS CLIMATIZACIÓN S.L.',
      direccion: 'Calle de la Tecnología, 123',
      cif: 'B12345678',
      telefono: '+34 91 123 45 67',
      email: 'info@tecnicosclimatizacion.es',
      web: 'www.tecnicosclimatizacion.es'
    };
  }

  /**
   * Método helper para formatear fechas
   */
  private formatearFecha(fecha: Date | string): string {
    if (!fecha) return 'N/A';
    try {
      return new Date(fecha).toLocaleDateString('es-ES');
    } catch {
      return fecha.toString();
    }
  }
}
