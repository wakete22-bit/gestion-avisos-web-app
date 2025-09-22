import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { configurarJsPDF, estilosPDF, aplicarEstilosPDF, dibujarLinea } from '../config/jspdf.config';
import { ConfiguracionService } from './configuracion.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private configuracionService: ConfiguracionService) { }

  /**
   * Genera un PDF de la factura a partir del elemento HTML
   */
  async generarPdfFactura(elementoHtml: HTMLElement, nombreArchivo: string = 'factura.pdf'): Promise<void> {
    try {
      console.log('🔧 Generando PDF de factura...');
      
      // Configurar opciones de html2canvas
      const canvas = await html2canvas(elementoHtml, {
        scale: 2, // Mejor calidad
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: elementoHtml.offsetWidth,
        height: elementoHtml.offsetHeight,
        scrollX: 0,
        scrollY: 0
      });

      // Crear PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Calcular dimensiones
      const imgWidth = 210; // A4 width en mm
      const pageHeight = 295; // A4 height en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Agregar primera página
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Agregar páginas adicionales si es necesario
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Descargar el PDF
      pdf.save(nombreArchivo);
      
      console.log('✅ PDF generado exitosamente:', nombreArchivo);
    } catch (error) {
      console.error('❌ Error al generar PDF:', error);
      throw error;
    }
  }

  /**
   * Genera un PDF optimizado para facturas
   */
  async generarPdfFacturaOptimizado(elementoHtml: HTMLElement, nombreArchivo: string = 'factura.pdf'): Promise<void> {
    try {
      console.log('🔧 Generando PDF optimizado de factura...');
      
      // Configurar opciones específicas para facturas
      const canvas = await html2canvas(elementoHtml, {
        scale: 1.5, // Calidad balanceada
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: elementoHtml.offsetWidth,
        height: elementoHtml.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        logging: false, // Desactivar logs
        removeContainer: true // Limpiar contenedor temporal
      });

      // Crear PDF con orientación y tamaño optimizados
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95); // JPEG para mejor compresión
      const imgWidth = 190; // Margen de 10mm en cada lado
      const pageHeight = 277; // A4 height menos márgenes
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 10; // Margen superior

      // Agregar primera página
      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Agregar páginas adicionales si es necesario
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Descargar el PDF
      pdf.save(nombreArchivo);
      
      console.log('✅ PDF optimizado generado exitosamente:', nombreArchivo);
    } catch (error) {
      console.error('❌ Error al generar PDF optimizado:', error);
      throw error;
    }
  }

  /**
   * Imprime la factura usando PDF nativo
   */
  async imprimirFacturaNativa(datosFactura: any, nombreArchivo: string = 'factura_imprimir.pdf'): Promise<void> {
    try {
      console.log('🔧 Imprimiendo factura nativa...');
      
      // Generar PDF nativo usando la misma plantilla profesional
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      
      let yPos = margin;

      // Función helper para dibujar rectángulos redondeados
      const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number, color: [number, number, number]) => {
        pdf.setFillColor(color[0], color[1], color[2]);
        pdf.roundedRect(x, y, w, h, r, r, 'F');
      };

      // Función helper para texto con estilos
      const addText = (text: string, x: number, y: number, options: any = {}) => {
        const defaultOptions = {
          fontSize: 12,
          fontStyle: 'normal',
          color: [17, 24, 39] as [number, number, number], // #111827
          align: 'left'
        };
        const finalOptions = { ...defaultOptions, ...options };
        
        pdf.setFontSize(finalOptions.fontSize);
        pdf.setFont('helvetica', finalOptions.fontStyle);
        pdf.setTextColor(finalOptions.color[0], finalOptions.color[1], finalOptions.color[2]);
        pdf.text(text, x, y, { align: finalOptions.align });
      };

      // Función helper para dibujar líneas
      const drawLine = (x1: number, y1: number, x2: number, y2: number, color: [number, number, number] = [229, 231, 235]) => {
        pdf.setDrawColor(color[0], color[1], color[2]);
        pdf.line(x1, y1, x2, y2);
      };

      // ===== HEADER PROFESIONAL =====
      // Fondo del header
      drawRoundedRect(margin, yPos, contentWidth, 35, 6, [79, 70, 229]); // #4F46E5
      
      // Logo/Icono (círculo)
      pdf.setFillColor(255, 255, 255);
      pdf.circle(margin + 20, yPos + 17.5, 12, 'F');
      
      // Título principal
      addText('FACTURA', pageWidth / 2, yPos + 22, { 
        fontSize: 28, 
        fontStyle: 'bold', 
        color: [255, 255, 255] as [number, number, number], 
        align: 'center' 
      });
      
      yPos += 45;

      // ===== INFORMACIÓN DE LA EMPRESA Y FACTURA =====
      const leftColumn = margin;
      const rightColumn = pageWidth / 2 + 5;

      // Datos de la empresa (izquierda)
      addText('DATOS DE LA EMPRESA', leftColumn, yPos, { fontSize: 13, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      yPos += 8;
      addText('TECNICOS CLIMATIZACIÓN S.L.', leftColumn, yPos, { fontSize: 11, fontStyle: 'bold' });
      yPos += 6;
      addText('Calle de la Tecnología, 123', leftColumn, yPos, { fontSize: 10 });
      yPos += 5;
      addText('28001 Madrid, España', leftColumn, yPos, { fontSize: 10 });
      yPos += 5;
      addText('CIF: B12345678', leftColumn, yPos, { fontSize: 10 });
      yPos += 5;
      addText('info@tecnicosclimatizacion.es', leftColumn, yPos, { fontSize: 10 });
      yPos += 5;
      addText('+34 91 123 45 67', leftColumn, yPos, { fontSize: 10 });

      // Información de la factura (derecha)
      yPos = margin + 45;
      addText('INFORMACIÓN DE LA FACTURA', rightColumn, yPos, { fontSize: 13, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      yPos += 8;
      addText('Número:', rightColumn, yPos, { fontSize: 10, fontStyle: 'bold' });
      addText(datosFactura.numero_factura || 'N/A', rightColumn + 25, yPos, { fontSize: 10 });
      yPos += 6;
      addText('Fecha de emisión:', rightColumn, yPos, { fontSize: 10, fontStyle: 'bold' });
      addText(datosFactura.fecha_emision || 'N/A', rightColumn + 35, yPos, { fontSize: 10 });
      yPos += 6;
      addText('Estado:', rightColumn, yPos, { fontSize: 10, fontStyle: 'bold' });
      addText(datosFactura.estado || 'Pendiente', rightColumn + 20, yPos, { fontSize: 10 });

      yPos += 20;

      // ===== DATOS DEL CLIENTE =====
      addText('DATOS DEL CLIENTE', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      yPos += 10;
      
      // Caja con datos del cliente
      const clienteBoxHeight = 50;
      drawRoundedRect(margin, yPos, contentWidth, clienteBoxHeight, 6, [249, 250, 251]); // #F9FAFB
      
      // Línea separadora en la caja
      drawLine(margin + 10, yPos + 25, pageWidth - margin - 10, yPos + 25, [229, 231, 235]);
      
      addText('Nombre:', margin + 15, yPos + 12, { fontSize: 10, fontStyle: 'bold' });
      addText(datosFactura.nombre_cliente || 'N/A', margin + 35, yPos + 12, { fontSize: 10 });
      
      addText('Dirección:', margin + 15, yPos + 22, { fontSize: 10, fontStyle: 'bold' });
      addText(datosFactura.direccion_cliente || 'N/A', margin + 35, yPos + 22, { fontSize: 10 });
      
      addText('CIF:', margin + 15, yPos + 32, { fontSize: 10, fontStyle: 'bold' });
      addText(datosFactura.cif_cliente || 'N/A', margin + 35, yPos + 32, { fontSize: 10 });
      
      addText('Email:', margin + 15, yPos + 42, { fontSize: 10, fontStyle: 'bold' });
      addText(datosFactura.email_cliente || 'N/A', margin + 35, yPos + 42, { fontSize: 10 });

      yPos += clienteBoxHeight + 20;

      // ===== TABLA DE REPUESTOS =====
      const repuestos = datosFactura.lineas?.filter((l: any) => l.tipo === 'repuesto') || [];
      if (repuestos.length > 0) {
        addText('REPUESTOS UTILIZADOS', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        yPos += 10;

        // Header de tabla
        const tableY = yPos;
        drawRoundedRect(margin, tableY, contentWidth, 18, 4, [79, 70, 229]);
        
        // Columnas del header
        const col1 = margin + 8;
        const col2 = margin + 100;
        const col3 = margin + 140;
        const col4 = margin + 170;
        
        addText('DESCRIPCIÓN', col1, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('CANT.', col2, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('NETO', col3, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('PVP', col4, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        
        yPos += 22;

        // Filas de repuestos
        repuestos.forEach((repuesto: any, index: number) => {
          const rowColor = index % 2 === 0 ? [255, 255, 255] as [number, number, number] : [249, 250, 251] as [number, number, number];
          drawRoundedRect(margin, yPos, contentWidth, 15, 2, rowColor);
          
          addText(repuesto.nombre || 'Sin nombre', col1, yPos + 10, { fontSize: 9 });
          addText(repuesto.cantidad?.toString() || '0', col2, yPos + 10, { fontSize: 9 });
          addText(`${repuesto.precio_neto || 0}€`, col3, yPos + 10, { fontSize: 9 });
          addText(`${repuesto.precio_pvp || 0}€`, col4, yPos + 10, { fontSize: 9, color: [39, 194, 108] as [number, number, number] });
          
          yPos += 15;
        });

        // Total repuestos
        const totalRepuestos = repuestos.reduce((acc: number, r: any) => acc + (r.cantidad * r.precio_pvp), 0);
        drawRoundedRect(margin, yPos, contentWidth, 18, 4, [79, 70, 229]);
        addText('TOTAL REPUESTOS', col1, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText(`${totalRepuestos.toFixed(2)}€`, col4, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        yPos += 25;
      }

      // ===== TABLA DE MANO DE OBRA Y DESPLAZAMIENTOS =====
      const otrosServicios = datosFactura.lineas?.filter((l: any) => l.tipo !== 'repuesto') || [];
      if (otrosServicios.length > 0) {
        addText('MANO DE OBRA Y DESPLAZAMIENTOS', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        yPos += 10;

        // Header de tabla
        const tableY = yPos;
        drawRoundedRect(margin, tableY, contentWidth, 18, 4, [79, 70, 229]);
        
        const col1 = margin + 8;
        const col2 = margin + 100;
        const col3 = margin + 170;
        
        addText('DESCRIPCIÓN', col1, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('CANT.', col2, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('PVP', col3, tableY + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        
        yPos += 22;

        // Filas de servicios
        otrosServicios.forEach((servicio: any, index: number) => {
          const rowColor = index % 2 === 0 ? [255, 255, 255] as [number, number, number] : [249, 250, 251] as [number, number, number];
          drawRoundedRect(margin, yPos, contentWidth, 15, 2, rowColor);
          
          addText(servicio.nombre || 'Sin descripción', col1, yPos + 10, { fontSize: 9 });
          addText(servicio.cantidad?.toString() || '0', col2, yPos + 10, { fontSize: 9 });
          addText(`${servicio.precio_pvp || 0}€`, col3, yPos + 10, { fontSize: 9, color: [39, 194, 108] as [number, number, number] });
          
          yPos += 15;
        });

        // Total servicios
        const totalServicios = otrosServicios.reduce((acc: number, s: any) => acc + (s.cantidad * s.precio_pvp), 0);
        drawRoundedRect(margin, yPos, contentWidth, 18, 4, [79, 70, 229]);
        addText('TOTAL SERVICIOS', col1, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText(`${totalServicios.toFixed(2)}€`, col3, yPos + 12, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        yPos += 25;
      }

      // ===== RESUMEN DE TOTALES =====
      const totalServicios = (datosFactura.lineas?.filter((l: any) => l.tipo !== 'repuesto') || [])
        .reduce((acc: number, s: any) => acc + (s.cantidad * s.precio_pvp), 0);
      const totalRepuestos = (datosFactura.lineas?.filter((l: any) => l.tipo === 'repuesto') || [])
        .reduce((acc: number, r: any) => acc + (r.cantidad * r.precio_pvp), 0);

      // Caja de totales profesional
      const totalesBoxWidth = 140;
      const totalesBoxX = pageWidth - margin - totalesBoxWidth;
      drawRoundedRect(totalesBoxX, yPos, totalesBoxWidth, 90, 8, [238, 242, 255]); // #EEF2FF

      // Título del resumen
      addText('RESUMEN DE LA FACTURA', totalesBoxX + 10, yPos + 15, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      
      // Línea separadora
      drawLine(totalesBoxX + 10, yPos + 20, totalesBoxX + totalesBoxWidth - 10, yPos + 20, [79, 70, 229]);
      
      // Detalles del resumen
      addText('Subtotal:', totalesBoxX + 10, yPos + 35, { fontSize: 11 });
      addText(`${datosFactura.subtotal || 0}€`, totalesBoxX + totalesBoxWidth - 10, yPos + 35, { fontSize: 11, align: 'right' });
      
      addText('IVA (${ivaPorcentaje}%):', totalesBoxX + 10, yPos + 50, { fontSize: 11 });
      addText(`${datosFactura.iva || 0}€`, totalesBoxX + totalesBoxWidth - 10, yPos + 50, { fontSize: 11, align: 'right' });
      
      // Línea separadora antes del total
      drawLine(totalesBoxX + 10, yPos + 60, totalesBoxX + totalesBoxWidth - 10, yPos + 60, [79, 70, 229]);
      
      // Total final destacado
      addText('TOTAL', totalesBoxX + 10, yPos + 75, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      addText(`${datosFactura.total || 0}€`, totalesBoxX + totalesBoxWidth - 10, yPos + 75, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number], align: 'right' });

      // ===== NOTAS ADICIONALES =====
      if (datosFactura.notas) {
        yPos += 110;
        addText('NOTAS ADICIONALES', margin, yPos, { fontSize: 13, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        yPos += 10;
        
        // Caja de notas
        const notasBoxHeight = 30;
        drawRoundedRect(margin, yPos, contentWidth - 150, notasBoxHeight, 6, [249, 250, 251]);
        addText(datosFactura.notas, margin + 10, yPos + 10, { fontSize: 10 });
      }

      // ===== FOOTER PROFESIONAL =====
      yPos = pageHeight - 40;
      
      // Línea separadora del footer
      drawLine(margin, yPos, pageWidth - margin, yPos, [229, 231, 235]);
      yPos += 10;
      
      // Información del footer
      addText('TECNICOS CLIMATIZACIÓN S.L.', margin, yPos, { fontSize: 10, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      addText('+34 91 123 45 67', pageWidth / 2, yPos, { fontSize: 10, color: [107, 114, 128] as [number, number, number], align: 'center' });
      addText('info@tecnicosclimatizacion.es', pageWidth - margin, yPos, { fontSize: 10, color: [107, 114, 128] as [number, number, number], align: 'right' });
      
      yPos += 8;
      addText('CIF: B12345678', margin, yPos, { fontSize: 9, color: [107, 114, 128] as [number, number, number] });
      addText('www.tecnicosclimatizacion.es', pageWidth - margin, yPos, { fontSize: 9, color: [107, 114, 128] as [number, number, number], align: 'right' });

      // Convertir PDF a blob y abrir para impresión
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Abrir en nueva ventana para impresión
      const printWindow = window.open(pdfUrl, '_blank');
      if (printWindow) {
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
            URL.revokeObjectURL(pdfUrl);
          }, 1000);
        };
      }

      console.log('✅ Impresión nativa iniciada');
    } catch (error) {
      console.error('❌ Error al imprimir factura nativa:', error);
      throw error;
    }
  }

  /**
   * Imprime la factura directamente
   */
  async imprimirFactura(elementoHtml: HTMLElement): Promise<void> {
    try {
      console.log('🔧 Imprimiendo factura...');
      
      // Crear una ventana de impresión
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('No se pudo abrir la ventana de impresión');
      }

      // Clonar el elemento para la impresión
      const elementoClonado = elementoHtml.cloneNode(true) as HTMLElement;
      
      // Agregar estilos de impresión
      const estilosImpresion = `
        <style>
          @media print {
            body { margin: 0; padding: 0; }
            * { box-sizing: border-box; }
            .factura-preview { 
              width: 100% !important; 
              height: auto !important; 
              padding: 20px !important;
              border-radius: 0 !important;
            }
            .toggle-preview-btn { display: none !important; }
            .header-container .actions-preview { display: none !important; }
          }
        </style>
      `;

      // Escribir el contenido en la ventana
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Factura</title>
            <meta charset="utf-8">
            ${estilosImpresion}
          </head>
          <body>
            ${elementoClonado.outerHTML}
          </body>
        </html>
      `);

      printWindow.document.close();
      
      // Esperar a que se cargue el contenido
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };

      console.log('✅ Impresión iniciada');
    } catch (error) {
      console.error('❌ Error al imprimir factura:', error);
      throw error;
    }
  }

  /**
   * Genera un PDF usando HTML/CSS (método recomendado)
   * Reutiliza los estilos de la vista previa para mantener consistencia
   */
  generarPdfHtml(datosFactura: any, nombreArchivo: string = 'factura.pdf'): void {
    try {
      console.log('🔧 Generando PDF con HTML/CSS...');
      
      // Generar HTML usando configuración de BD
      this.generarHtmlFactura(datosFactura).subscribe({
        next: (html) => {
          // Crear elemento HTML temporal
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;
          tempDiv.style.position = 'absolute';
          tempDiv.style.left = '-9999px';
          tempDiv.style.top = '0';
          tempDiv.style.width = '794px'; // A4 width en px
          tempDiv.style.backgroundColor = 'white';
          tempDiv.style.padding = '20px';
          tempDiv.style.boxSizing = 'border-box';
          
          // Agregar estilos CSS
          const style = document.createElement('style');
          style.textContent = this.obtenerEstilosCss();
          tempDiv.appendChild(style);
          
          // Agregar al DOM temporalmente
          document.body.appendChild(tempDiv);
          
          // Generar PDF usando html2canvas
          this.generarPdfDesdeElemento(tempDiv, nombreArchivo).finally(() => {
            // Limpiar elemento temporal
            document.body.removeChild(tempDiv);
          });
        },
        error: (error) => {
          console.error('❌ Error al generar HTML de factura:', error);
          throw error;
        }
      });
      
    } catch (error) {
      console.error('❌ Error al generar PDF con HTML:', error);
      throw error;
    }
  }

  /**
   * Genera el HTML de la factura usando configuraciones de BD
   */
  private generarHtmlFactura(datosFactura: any): Observable<string> {
    return combineLatest([
      this.configuracionService.getDatosEmpresa(),
      this.configuracionService.getIvaPorDefecto()
    ]).pipe(
      map(([empresa, ivaPorcentaje]) => {
        const subtotal = this.calcularSubtotal(datosFactura);
        const iva = subtotal * (ivaPorcentaje / 100);
        const total = subtotal + iva;

    return `
      <div class="pdf-preview">
        <!-- Header Principal -->
        <div class="header-principal">
          <h1 class="titulo-factura">FACTURA</h1>
        </div>

        <!-- Información Básica -->
        <div class="info-basica">
          <div class="numero-factura">Nº ${datosFactura.numero_factura || 'N/A'}</div>
          <div class="fecha-factura">Fecha: ${this.formatearFecha(datosFactura.fecha_emision) || 'N/A'}</div>
        </div>

        <!-- Datos de la Empresa -->
        <div class="seccion-empresa">
          <h2 class="titulo-seccion">DATOS DE LA EMPRESA</h2>
          <div class="datos-empresa">
            <div class="nombre-empresa">${empresa?.nombre_empresa || 'Mi Empresa'}</div>
            <div class="direccion-empresa">${empresa?.direccion || 'Dirección no configurada'}</div>
            <div class="cif-empresa">CIF: ${empresa?.cif || 'Sin CIF'}</div>
            <div class="telefono-empresa">Tel: ${empresa?.telefono || 'Sin teléfono'}</div>
            <div class="email-empresa">${empresa?.email || 'sin-email@empresa.com'}</div>
            ${empresa?.web ? `<div class="web-empresa">${empresa.web}</div>` : ''}
          </div>
        </div>

        <!-- Datos del Cliente -->
        <div class="seccion-cliente">
          <h2 class="titulo-seccion">DATOS DEL CLIENTE</h2>
          <div class="datos-cliente">
            <div>Nombre: ${datosFactura.nombre_cliente || 'N/A'}</div>
            <div>Dirección: ${datosFactura.direccion_cliente || 'N/A'}</div>
            <div>CIF: ${datosFactura.cif_cliente || 'N/A'}</div>
            <div>Email: ${datosFactura.email_cliente || 'N/A'}</div>
          </div>
        </div>

        <!-- Tabla de Servicios -->
        <div class="seccion-servicios" ${datosFactura.lineas && datosFactura.lineas.length > 0 ? '' : 'style="display: none;"'}>
          <div class="tabla-header">
            <div class="col-descripcion">DESCRIPCIÓN</div>
            <div class="col-cantidad">CANT.</div>
            <div class="col-precio">PRECIO</div>
            <div class="col-total">TOTAL</div>
          </div>
          
          <div class="linea-separadora"></div>
          
          <div class="tabla-body">
            ${datosFactura.lineas ? datosFactura.lineas.map((linea: any) => `
              <div class="fila-servicio">
                <div class="col-descripcion">${linea.nombre || 'Sin descripción'}</div>
                <div class="col-cantidad">${linea.cantidad || '0'}</div>
                <div class="col-precio">${this.formatearMoneda(linea.precio_pvp || 0)}</div>
                <div class="col-total">${this.formatearMoneda((linea.cantidad || 0) * (linea.precio_pvp || 0))}</div>
              </div>
            `).join('') : ''}
          </div>
          
          <div class="linea-separadora"></div>
        </div>

        <!-- Caja de Totales -->
        <div class="caja-totales" ${datosFactura.lineas && datosFactura.lineas.length > 0 ? '' : 'style="display: none;"'}>
          <div class="caja-totales-inner">
            <div class="titulo-caja">RESUMEN</div>
            <div class="linea-separadora-caja"></div>
            
            <div class="fila-total">
              <span class="etiqueta-total">Subtotal:</span>
              <span class="valor-total">${this.formatearMoneda(subtotal)}</span>
            </div>
            
            <div class="fila-total">
              <span class="etiqueta-total">IVA (${ivaPorcentaje}%):</span>
              <span class="valor-total">${this.formatearMoneda(iva)}</span>
            </div>
            
            <div class="linea-separadora-total"></div>
            
            <div class="fila-total-final">
              <span class="etiqueta-total-final">TOTAL:</span>
              <span class="valor-total-final">${this.formatearMoneda(total)}</span>
            </div>
          </div>
        </div>


        <!-- Notas -->
        <div class="seccion-notas" ${datosFactura.notas ? '' : 'style="display: none;"'}>
          <h2 class="titulo-seccion">NOTAS:</h2>
          <div class="contenido-notas">${datosFactura.notas}</div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="linea-footer"></div>
          <div class="info-footer">
            <span class="nombre-empresa-footer">TÉCNICOS CLIMATIZACIÓN S.L.</span>
            <span class="mensaje-footer">Gracias por su confianza</span>
            <span class="web-footer">www.tecnicosclimatizacion.es</span>
          </div>
        </div>
      </div>
    `;
      })
    );
  }

  /**
   * Obtiene los datos de la empresa para usar en métodos síncronos
   */
  private obtenerDatosEmpresa(): any {
    const configuracion = this.configuracionService.getConfiguracionActual();
    return configuracion?.empresa || {
      nombre_empresa: 'Mi Empresa',
      direccion: 'Dirección no configurada',
      cif: 'Sin CIF',
      telefono: 'Sin teléfono',
      email: 'sin-email@empresa.com',
      web: ''
    };
  }

  /**
   * Obtiene los estilos CSS para el PDF
   */
  private obtenerEstilosCss(): string {
    return `
      .pdf-preview {
        width: 794px;
        background: white;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        font-family: 'Helvetica', Arial, sans-serif;
        overflow: visible;
      }

      .header-principal {
        text-align: center;
        margin-bottom: 20px;
      }

      .titulo-factura {
        font-size: 28px;
        font-weight: bold;
        color: #4F46E5;
        margin: 0;
        padding: 0;
      }

      .info-basica {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
        padding-right: 20px;
      }

      .numero-factura {
        font-size: 14px;
        font-weight: bold;
        color: #111827;
      }

      .fecha-factura {
        font-size: 14px;
        color: #111827;
      }

      .seccion-empresa {
        margin-bottom: 20px;
      }

      .titulo-seccion {
        font-size: 14px;
        font-weight: bold;
        color: #4F46E5;
        margin: 0 0 8px 0;
      }

      .datos-empresa .nombre-empresa {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 6px;
      }

      .datos-empresa .direccion-empresa,
      .datos-empresa .ciudad-empresa,
      .datos-empresa .cif-empresa,
      .datos-empresa .telefono-empresa,
      .datos-empresa .email-empresa {
        font-size: 11px;
        margin-bottom: 5px;
        color: #111827;
      }

      .seccion-cliente {
        margin-bottom: 25px;
      }

      .datos-cliente div {
        font-size: 11px;
        margin-bottom: 5px;
        color: #111827;
      }

      .seccion-servicios {
        margin-bottom: 15px;
        width: calc(100% - 20px);
        padding-right: 20px;
      }

      .tabla-header {
        display: flex;
        font-size: 12px;
        font-weight: bold;
        color: #4F46E5;
        margin-bottom: 8px;
        width: 100%;
        max-width: calc(100% - 20px);
      }

      .col-descripcion {
        width: 200px;
        flex: 0 0 200px;
      }

      .col-cantidad {
        width: 80px;
        flex: 0 0 80px;
        text-align: center;
      }

      .col-precio {
        width: 100px;
        flex: 0 0 100px;
        text-align: right;
      }

      .col-total {
        width: 100px;
        flex: 0 0 100px;
        text-align: right;
      }

      .linea-separadora {
        height: 1px;
        background-color: #4F46E5;
        margin: 8px 0;
        width: calc(100% - 20px);
      }

      .tabla-body {
        width: 100%;
        max-width: calc(100% - 20px);
      }

      .tabla-body .fila-servicio {
        display: flex;
        font-size: 10px;
        margin-bottom: 6px;
        width: 100%;
        max-width: calc(100% - 20px);
        align-items: center;
      }

      .fila-servicio .col-descripcion {
        width: 200px;
        flex: 0 0 200px;
        color: #111827;
      }

      .fila-servicio .col-cantidad {
        width: 80px;
        flex: 0 0 80px;
        text-align: center;
        color: #111827;
      }

      .fila-servicio .col-precio {
        width: 100px;
        flex: 0 0 100px;
        text-align: right;
        color: #111827;
      }

      .fila-servicio .col-total {
        width: 100px;
        flex: 0 0 100px;
        text-align: right;
        color: #111827;
        font-weight: bold;
      }

      .caja-totales {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        margin-bottom: 20px;
        width: calc(100% - 20px);
        padding-right: 20px;
      }

      .caja-totales-inner {
        width: 180px;
        height: 120px;
        background-color: #F8FAFC;
        border: 1px solid #4F46E5;
        border-radius: 4px;
        padding: 10px;
        box-sizing: border-box;
      }

      .titulo-caja {
        font-size: 11px;
        font-weight: bold;
        color: #4F46E5;
        margin-bottom: 4px;
        display: block;
      }

      .linea-separadora-caja {
        height: 1px;
        background-color: #4F46E5;
        margin-bottom: 8px;
        display: block;
      }

      .fila-total {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        margin-bottom: 6px;
        color: #111827;
      }

      .etiqueta-total {
        color: #111827;
        font-weight: normal;
      }

      .valor-total {
        color: #111827;
        font-weight: normal;
      }

      .linea-separadora-total {
        height: 1px;
        background-color: #4F46E5;
        margin-bottom: 6px;
        display: block;
      }

      .fila-total-final {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-weight: bold;
        color: #4F46E5;
      }

      .etiqueta-total-final {
        color: #4F46E5;
        font-weight: bold;
      }

      .valor-total-final {
        color: #4F46E5;
        font-weight: bold;
      }

      .seccion-notas {
        margin-top: 25px;
        margin-bottom: 25px;
      }

      .contenido-notas {
        font-size: 11px;
        color: #111827;
      }

      .footer {
        position: absolute;
        bottom: 0;
        left: 20px;
        right: 20px;
      }

      .linea-footer {
        height: 1px;
        background-color: #E5E7EB;
        margin-bottom: 10px;
      }

      .info-footer {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
      }

      .nombre-empresa-footer {
        font-weight: bold;
        color: #4F46E5;
      }

      .mensaje-footer,
      .web-footer {
        color: #6B7280;
      }

      /* Estilos adicionales para asegurar visibilidad */
      * {
        box-sizing: border-box;
      }
    `;
  }

  /**
   * Genera PDF desde un elemento HTML
   */
  private async generarPdfDesdeElemento(elemento: HTMLElement, nombreArchivo: string): Promise<void> {
    try {
      // Calcular la altura real del contenido
      const contenido = elemento.querySelector('.pdf-preview');
      const alturaReal = contenido ? contenido.scrollHeight : elemento.scrollHeight;
      
      const canvas = await html2canvas(elemento, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: elemento.offsetWidth,
        height: Math.min(alturaReal, elemento.offsetHeight), // Usar la altura real del contenido
        scrollX: 0,
        scrollY: 0
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width en mm
      const pageHeight = 295; // A4 height en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      console.log('📏 Dimensiones del canvas:', {
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        imgHeight: imgHeight,
        pageHeight: pageHeight,
        fitsInOnePage: imgHeight <= pageHeight
      });

      // Solo agregar una página si el contenido cabe en una página
      if (imgHeight <= pageHeight) {
        // El contenido cabe en una página
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        console.log('✅ Contenido cabe en una sola página');
      } else {
        // El contenido es más alto que una página, dividir en múltiples páginas
        console.log('📄 Contenido requiere múltiples páginas');
        let heightLeft = imgHeight;
        let position = 0;

        // Agregar primera página
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Agregar páginas adicionales solo si es necesario
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      }

      // Descargar el PDF
      pdf.save(nombreArchivo);
      
      console.log('✅ PDF generado exitosamente con HTML/CSS:', nombreArchivo);
    } catch (error) {
      console.error('❌ Error al generar PDF desde elemento:', error);
      throw error;
    }
  }

  /**
   * Calcula el subtotal de las líneas
   */
  private calcularSubtotal(datosFactura: any): number {
    if (!datosFactura?.lineas) return 0;
    return datosFactura.lineas.reduce((acc: number, linea: any) => {
      return acc + ((linea.cantidad || 0) * (linea.precio_pvp || 0));
    }, 0);
  }

  /**
   * Formatea moneda
   */
  private formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor);
  }

  /**
   * Genera un PDF nativo con el estilo exacto de la factura
   * Versión mejorada con soporte para múltiples páginas y diseño optimizado
   */
  generarPdfNativo(datosFactura: any, nombreArchivo: string = 'factura.pdf'): void {
    try {
      console.log('🔧 Generando PDF nativo mejorado con estilos...');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
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
        
        pdf.setFontSize(finalOptions.fontSize);
        pdf.setFont('helvetica', finalOptions.fontStyle);
        pdf.setTextColor(finalOptions.color[0], finalOptions.color[1], finalOptions.color[2]);
        pdf.text(text, x, y, { align: finalOptions.align });
      };

      // Función helper para dibujar líneas
      const drawLine = (x1: number, y1: number, x2: number, y2: number, color: [number, number, number] = [79, 70, 229]) => {
        pdf.setDrawColor(color[0], color[1], color[2]);
        pdf.line(x1, y1, x2, y2);
      };

      // Función helper para dibujar rectángulos
      const drawRect = (x: number, y: number, w: number, h: number, fillColor?: [number, number, number], strokeColor?: [number, number, number]) => {
        if (fillColor) {
          pdf.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
          pdf.rect(x, y, w, h, 'F');
        }
        if (strokeColor) {
          pdf.setDrawColor(strokeColor[0], strokeColor[1], strokeColor[2]);
          pdf.rect(x, y, w, h, 'S');
        }
      };

      // Función para verificar si necesitamos nueva página
      const checkNewPage = (requiredHeight: number = 10): boolean => {
        return (yPos + requiredHeight) > maxContentHeight;
      };

      // Función para agregar nueva página
      const addNewPage = () => {
        pdf.addPage();
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
      addText('FACTURA', pageWidth / 2, yPos, { 
        fontSize: 28, 
        fontStyle: 'bold', 
        color: [79, 70, 229] as [number, number, number], 
        align: 'center' 
      });
      
      yPos += 20;

      // ===== INFORMACIÓN BÁSICA =====
      // Número de factura y fecha
      addText(`Nº ${datosFactura.numero_factura || 'N/A'}`, margin, yPos, { fontSize: 14, fontStyle: 'bold' });
      addText(`Fecha: ${this.formatearFecha(datosFactura.fecha_emision) || 'N/A'}`, pageWidth - margin, yPos, { fontSize: 14, align: 'right' });
      
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
      addText('DATOS DEL CLIENTE', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      yPos += 8;
      addText(`Nombre: ${datosFactura.nombre_cliente || 'N/A'}`, margin, yPos, { fontSize: 11 });
      yPos += 5;
      addText(`Dirección: ${datosFactura.direccion_cliente || 'N/A'}`, margin, yPos, { fontSize: 11 });
      yPos += 5;
      addText(`CIF: ${datosFactura.cif_cliente || 'N/A'}`, margin, yPos, { fontSize: 11 });
      yPos += 5;
      addText(`Email: ${datosFactura.email_cliente || 'N/A'}`, margin, yPos, { fontSize: 11 });

      yPos += 25;

      // ===== TABLA DE SERVICIOS =====
      if (datosFactura.lineas && datosFactura.lineas.length > 0) {
        // Verificar si necesitamos nueva página para la tabla
        if (checkNewPage(50)) {
          addNewPage();
        }

        // Header de tabla
        addText('DESCRIPCIÓN', margin, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        addText('CANT.', margin + 100, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        addText('PRECIO', margin + 140, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        addText('TOTAL', margin + 180, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        
        yPos += 8;
        drawLine(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;

        // Filas de servicios
        let subtotal = 0;
        datosFactura.lineas.forEach((linea: any) => {
          // Verificar si necesitamos nueva página para cada fila
          if (checkNewPage(8)) {
            addNewPage();
            // Re-dibujar header de tabla en nueva página
            addText('DESCRIPCIÓN', margin, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
            addText('CANT.', margin + 100, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
            addText('PRECIO', margin + 140, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
            addText('TOTAL', margin + 180, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
            yPos += 8;
            drawLine(margin, yPos, pageWidth - margin, yPos);
            yPos += 8;
          }

          const totalLinea = (linea.cantidad || 0) * (linea.precio_pvp || 0);
          subtotal += totalLinea;
          
          addText(linea.nombre || 'Sin descripción', margin, yPos, { fontSize: 10 });
          addText(linea.cantidad?.toString() || '0', margin + 100, yPos, { fontSize: 10 });
          addText(`${(linea.precio_pvp || 0).toFixed(2)}€`, margin + 140, yPos, { fontSize: 10 });
          addText(`${totalLinea.toFixed(2)}€`, margin + 180, yPos, { fontSize: 10 });
          
          yPos += 6;
        });

        // Línea separadora
        yPos += 5;
        drawLine(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;

        // ===== TOTALES EN CAJA =====
        // Verificar si necesitamos nueva página para los totales
        if (checkNewPage(40)) {
          addNewPage();
        }

        // Crear caja para los totales
        const totalesBoxWidth = 120;
        const totalesBoxHeight = 50;
        const totalesBoxX = pageWidth - margin - totalesBoxWidth;
        
        // Dibujar caja de totales con borde
        drawRect(totalesBoxX, yPos, totalesBoxWidth, totalesBoxHeight, [248, 250, 252], [79, 70, 229]);
        
        // Título de la caja
        addText('RESUMEN', totalesBoxX + 5, yPos + 8, { 
          fontSize: 11, 
          fontStyle: 'bold', 
          color: [79, 70, 229] as [number, number, number] 
        });
        
        // Línea separadora dentro de la caja
        drawLine(totalesBoxX + 5, yPos + 12, totalesBoxX + totalesBoxWidth - 5, yPos + 12, [79, 70, 229]);

        const iva = subtotal * 0.21;
        const total = subtotal + iva;

        // Subtotal
        addText('Subtotal:', totalesBoxX + 5, yPos + 22, { fontSize: 10 });
        addText(`${subtotal.toFixed(2)}€`, totalesBoxX + totalesBoxWidth - 5, yPos + 22, { fontSize: 10, align: 'right' });
        
        // IVA
        addText('IVA (${ivaPorcentaje}%):', totalesBoxX + 5, yPos + 32, { fontSize: 10 });
        addText(`${iva.toFixed(2)}€`, totalesBoxX + totalesBoxWidth - 5, yPos + 32, { fontSize: 10, align: 'right' });
        
        // Línea separadora antes del total
        drawLine(totalesBoxX + 5, yPos + 38, totalesBoxX + totalesBoxWidth - 5, yPos + 38, [79, 70, 229]);
        
        // Total final destacado
        addText('TOTAL:', totalesBoxX + 5, yPos + 45, { 
          fontSize: 12, 
          fontStyle: 'bold', 
          color: [79, 70, 229] as [number, number, number] 
        });
        addText(`${total.toFixed(2)}€`, totalesBoxX + totalesBoxWidth - 5, yPos + 45, { 
          fontSize: 12, 
          fontStyle: 'bold', 
          color: [79, 70, 229] as [number, number, number], 
          align: 'right' 
        });

        yPos += totalesBoxHeight + 15;
      }

      // ===== NOTAS =====
      if (datosFactura.notas) {
        // Verificar si necesitamos nueva página para las notas
        if (checkNewPage(30)) {
          addNewPage();
        }
        
        addText('NOTAS:', margin, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        yPos += 8;
        addText(datosFactura.notas, margin, yPos, { fontSize: 11 });
      }

      // ===== FOOTER EN TODAS LAS PÁGINAS =====
      const addFooter = () => {
        const footerY = pageHeight - 30;
        drawLine(margin, footerY, pageWidth - margin, footerY, [229, 231, 235]);
        
        const empresa = this.obtenerDatosEmpresa();
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
        pdf.setPage(i);
        addFooter();
      }

      // Descargar el PDF
      pdf.save(nombreArchivo);
      
      console.log('✅ PDF nativo mejorado generado exitosamente:', nombreArchivo);
    } catch (error) {
      console.error('❌ Error al generar PDF nativo:', error);
      throw error;
    }
  }

  /**
   * Método helper para formatear fechas
   */
  private formatearFecha(fecha: string): string {
    if (!fecha) return 'N/A';
    try {
      return new Date(fecha).toLocaleDateString('es-ES');
    } catch {
      return fecha;
    }
  }

  /**
   * Genera una plantilla de factura simple y elegante
   */
  generarPlantillaFacturaSimple(datosFactura: any, nombreArchivo: string = 'factura.pdf'): void {
    try {
      console.log('🔧 Generando plantilla de factura simple...');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 25;
      const contentWidth = pageWidth - (margin * 2);
      
      let yPos = margin;

      // Función helper para texto con estilos
      const addText = (text: string, x: number, y: number, options: any = {}) => {
        const defaultOptions = {
          fontSize: 12,
          fontStyle: 'normal',
          color: [17, 24, 39] as [number, number, number], // #111827
          align: 'left'
        };
        const finalOptions = { ...defaultOptions, ...options };
        
        pdf.setFontSize(finalOptions.fontSize);
        pdf.setFont('helvetica', finalOptions.fontStyle);
        pdf.setTextColor(finalOptions.color[0], finalOptions.color[1], finalOptions.color[2]);
        pdf.text(text, x, y, { align: finalOptions.align });
      };

      // Función helper para dibujar líneas
      const drawLine = (x1: number, y1: number, x2: number, y2: number, color: [number, number, number] = [79, 70, 229]) => {
        pdf.setDrawColor(color[0], color[1], color[2]);
        pdf.line(x1, y1, x2, y2);
      };

      // ===== HEADER SIMPLE =====
      // Título principal
      addText('FACTURA', pageWidth / 2, yPos, { 
        fontSize: 36, 
        fontStyle: 'bold', 
        color: [79, 70, 229] as [number, number, number], 
        align: 'center' 
      });
      
      // Línea decorativa
      yPos += 15;
      drawLine(margin + 30, yPos, pageWidth - margin - 30, yPos);
      
      yPos += 20;

      // ===== INFORMACIÓN BÁSICA =====
      // Número de factura y fecha
      addText(`Nº ${datosFactura.numero_factura || 'N/A'}`, margin, yPos, { fontSize: 16, fontStyle: 'bold' });
      addText(`Fecha: ${this.formatearFecha(datosFactura.fecha_emision) || 'N/A'}`, pageWidth - margin, yPos, { fontSize: 14, align: 'right' });
      
      yPos += 25;

      // ===== DATOS DE LA EMPRESA =====
      addText('DATOS DE LA EMPRESA', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      yPos += 8;
      addText(this.obtenerDatosEmpresa().nombre_empresa, margin, yPos, { fontSize: 12, fontStyle: 'bold' });
      yPos += 6;
      addText(this.obtenerDatosEmpresa().direccion, margin, yPos, { fontSize: 11 });
      yPos += 5;
      // Ciudad no disponible en el modelo actual
      yPos += 5;
      addText(`CIF: ${this.obtenerDatosEmpresa().cif} | Tel: ${this.obtenerDatosEmpresa().telefono}`, margin, yPos, { fontSize: 11 });
      yPos += 5;
      addText(this.obtenerDatosEmpresa().email, margin, yPos, { fontSize: 11 });

      yPos += 20;

      // ===== DATOS DEL CLIENTE =====
      addText('DATOS DEL CLIENTE', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      yPos += 8;
      addText(`Nombre: ${datosFactura.nombre_cliente || 'N/A'}`, margin, yPos, { fontSize: 11 });
      yPos += 5;
      addText(`Dirección: ${datosFactura.direccion_cliente || 'N/A'}`, margin, yPos, { fontSize: 11 });
      yPos += 5;
      addText(`CIF: ${datosFactura.cif_cliente || 'N/A'} | Email: ${datosFactura.email_cliente || 'N/A'}`, margin, yPos, { fontSize: 11 });

      yPos += 25;

      // ===== TABLA DE SERVICIOS =====
      if (datosFactura.lineas && datosFactura.lineas.length > 0) {
        // Header de tabla
        addText('DESCRIPCIÓN', margin, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        addText('CANT.', margin + 100, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        addText('PRECIO', margin + 140, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        addText('TOTAL', margin + 180, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        
        yPos += 8;
        drawLine(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;

        // Filas de servicios
        let subtotal = 0;
        datosFactura.lineas.forEach((linea: any) => {
          const totalLinea = (linea.cantidad || 0) * (linea.precio_pvp || 0);
          subtotal += totalLinea;
          
          addText(linea.nombre || 'Sin descripción', margin, yPos, { fontSize: 10 });
          addText(linea.cantidad?.toString() || '0', margin + 100, yPos, { fontSize: 10 });
          addText(`${(linea.precio_pvp || 0).toFixed(2)}€`, margin + 140, yPos, { fontSize: 10 });
          addText(`${totalLinea.toFixed(2)}€`, margin + 180, yPos, { fontSize: 10 });
          
          yPos += 6;
        });

        // Línea separadora
        yPos += 5;
        drawLine(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;

        // ===== TOTALES =====
        const iva = subtotal * 0.21;
        const total = subtotal + iva;

        addText('Subtotal:', pageWidth - margin - 80, yPos, { fontSize: 12, align: 'right' });
        addText(`${subtotal.toFixed(2)}€`, pageWidth - margin, yPos, { fontSize: 12, align: 'right' });
        yPos += 8;
        
        addText('IVA (${ivaPorcentaje}%):', pageWidth - margin - 80, yPos, { fontSize: 12, align: 'right' });
        addText(`${iva.toFixed(2)}€`, pageWidth - margin, yPos, { fontSize: 12, align: 'right' });
        yPos += 8;
        
        // Línea separadora antes del total
        drawLine(pageWidth - margin - 80, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        addText('TOTAL:', pageWidth - margin - 80, yPos, { fontSize: 16, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number], align: 'right' });
        addText(`${total.toFixed(2)}€`, pageWidth - margin, yPos, { fontSize: 16, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number], align: 'right' });
      }

      // ===== NOTAS =====
      if (datosFactura.notas) {
        yPos += 25;
        addText('NOTAS:', margin, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        yPos += 8;
        addText(datosFactura.notas, margin, yPos, { fontSize: 11 });
      }

      // ===== FOOTER =====
      yPos = pageHeight - 40;
      drawLine(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;
      
      addText(this.obtenerDatosEmpresa().nombre_empresa, margin, yPos, { fontSize: 10, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      addText('Gracias por su confianza', pageWidth / 2, yPos, { fontSize: 10, color: [107, 114, 128] as [number, number, number], align: 'center' });
      addText(this.obtenerDatosEmpresa().web, pageWidth - margin, yPos, { fontSize: 10, color: [107, 114, 128] as [number, number, number], align: 'right' });

      // Descargar el PDF
      pdf.save(nombreArchivo);
      
      console.log('✅ Plantilla de factura simple generada exitosamente:', nombreArchivo);
    } catch (error) {
      console.error('❌ Error al generar plantilla de factura simple:', error);
      throw error;
    }
  }

  /**
   * Genera una plantilla de factura profesional bien estructurada
   */
  generarPlantillaFacturaProfesional(datosFactura: any, nombreArchivo: string = 'factura.pdf'): void {
    try {
      console.log('🔧 Generando plantilla de factura profesional...');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      
      let yPos = margin;

      // Función helper para texto con estilos
      const addText = (text: string, x: number, y: number, options: any = {}) => {
        const defaultOptions = {
          fontSize: 12,
          fontStyle: 'normal',
          color: [17, 24, 39] as [number, number, number], // #111827
          align: 'left'
        };
        const finalOptions = { ...defaultOptions, ...options };
        
        pdf.setFontSize(finalOptions.fontSize);
        pdf.setFont('helvetica', finalOptions.fontStyle);
        pdf.setTextColor(finalOptions.color[0], finalOptions.color[1], finalOptions.color[2]);
        pdf.text(text, x, y, { align: finalOptions.align });
      };

      // Función helper para dibujar líneas
      const drawLine = (x1: number, y1: number, x2: number, y2: number, color: [number, number, number] = [79, 70, 229]) => {
        pdf.setDrawColor(color[0], color[1], color[2]);
        pdf.line(x1, y1, x2, y2);
      };

      // Función helper para dibujar rectángulos
      const drawRect = (x: number, y: number, w: number, h: number, fillColor?: [number, number, number]) => {
        if (fillColor) {
          pdf.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
          pdf.rect(x, y, w, h, 'F');
        }
        pdf.setDrawColor(79, 70, 229);
        pdf.rect(x, y, w, h, 'S');
      };

      // ===== HEADER PROFESIONAL =====
      // Fondo del header
      drawRect(margin, yPos, contentWidth, 40, [79, 70, 229]);
      
      // Título principal
      addText('FACTURA', pageWidth / 2, yPos + 25, { 
        fontSize: 24, 
        fontStyle: 'bold', 
        color: [255, 255, 255] as [number, number, number], 
        align: 'center' 
      });
      
      // Número de factura en la esquina derecha
      addText(`Nº ${datosFactura.numero_factura || 'N/A'}`, pageWidth - margin - 5, yPos + 15, { 
        fontSize: 12, 
        fontStyle: 'bold', 
        color: [255, 255, 255] as [number, number, number], 
        align: 'right' 
      });
      
      yPos += 50;

      // ===== INFORMACIÓN DE LA EMPRESA Y FACTURA =====
      const leftColumn = margin;
      const rightColumn = pageWidth / 2 + 10;

      // Datos de la empresa (izquierda)
      addText('DATOS DE LA EMPRESA', leftColumn, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      yPos += 8;
      
      // Caja de datos de empresa
      const empresaBoxHeight = 60;
      drawRect(leftColumn, yPos, contentWidth / 2 - 10, empresaBoxHeight);
      
      addText(this.obtenerDatosEmpresa().nombre_empresa, leftColumn + 8, yPos + 8, { fontSize: 12, fontStyle: 'bold' });
      addText(this.obtenerDatosEmpresa().direccion, leftColumn + 8, yPos + 18, { fontSize: 10 });
      // Ciudad no disponible en el modelo actual
      addText(`CIF: ${this.obtenerDatosEmpresa().cif}`, leftColumn + 8, yPos + 38, { fontSize: 10 });
      addText(this.obtenerDatosEmpresa().email, leftColumn + 8, yPos + 48, { fontSize: 10 });
      addText(this.obtenerDatosEmpresa().telefono, leftColumn + 8, yPos + 58, { fontSize: 10 });

      // Información de la factura (derecha)
      yPos = margin + 50;
      addText('INFORMACIÓN DE LA FACTURA', rightColumn, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      yPos += 8;
      
      // Caja de información de factura
      drawRect(rightColumn, yPos, contentWidth / 2 - 10, empresaBoxHeight);
      
      addText('Fecha de emisión:', rightColumn + 8, yPos + 8, { fontSize: 10, fontStyle: 'bold' });
      addText(this.formatearFecha(datosFactura.fecha_emision) || 'N/A', rightColumn + 8, yPos + 18, { fontSize: 10 });
      addText('Estado:', rightColumn + 8, yPos + 28, { fontSize: 10, fontStyle: 'bold' });
      addText(datosFactura.estado || 'Pendiente', rightColumn + 8, yPos + 38, { fontSize: 10 });
      addText('Cliente ID:', rightColumn + 8, yPos + 48, { fontSize: 10, fontStyle: 'bold' });
      addText(datosFactura.cliente_id || 'N/A', rightColumn + 8, yPos + 58, { fontSize: 10 });

      yPos += empresaBoxHeight + 25;

      // ===== DATOS DEL CLIENTE =====
      addText('DATOS DEL CLIENTE', margin, yPos, { fontSize: 16, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      yPos += 12;
      
      // Caja con datos del cliente
      const clienteBoxHeight = 55;
      drawRect(margin, yPos, contentWidth, clienteBoxHeight);
      
      // Línea separadora en la caja
      drawLine(margin + 15, yPos + 28, pageWidth - margin - 15, yPos + 28, [229, 231, 235]);
      
      // Primera columna
      addText('Nombre:', margin + 15, yPos + 12, { fontSize: 11, fontStyle: 'bold' });
      addText(datosFactura.nombre_cliente || 'N/A', margin + 35, yPos + 12, { fontSize: 11 });
      
      addText('Dirección:', margin + 15, yPos + 22, { fontSize: 11, fontStyle: 'bold' });
      addText(datosFactura.direccion_cliente || 'N/A', margin + 35, yPos + 22, { fontSize: 11 });
      
      // Segunda columna
      addText('CIF:', margin + 15, yPos + 42, { fontSize: 11, fontStyle: 'bold' });
      addText(datosFactura.cif_cliente || 'N/A', margin + 35, yPos + 42, { fontSize: 11 });
      
      addText('Email:', margin + 15, yPos + 52, { fontSize: 11, fontStyle: 'bold' });
      addText(datosFactura.email_cliente || 'N/A', margin + 35, yPos + 52, { fontSize: 11 });

      yPos += clienteBoxHeight + 25;

      // ===== TABLA DE SERVICIOS =====
      if (datosFactura.lineas && datosFactura.lineas.length > 0) {
        addText('DETALLE DE SERVICIOS', margin, yPos, { fontSize: 16, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        yPos += 12;

        // Header de tabla
        const tableY = yPos;
        drawRect(margin, tableY, contentWidth, 20, [79, 70, 229]);
        
        // Columnas del header
        const col1 = margin + 10;
        const col2 = margin + 110;
        const col3 = margin + 150;
        const col4 = margin + 180;
        
        addText('DESCRIPCIÓN', col1, tableY + 13, { fontSize: 11, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('CANT.', col2, tableY + 13, { fontSize: 11, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('PRECIO', col3, tableY + 13, { fontSize: 11, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText('TOTAL', col4, tableY + 13, { fontSize: 11, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        
        yPos += 25;

        // Filas de servicios
        let subtotal = 0;
        datosFactura.lineas.forEach((linea: any, index: number) => {
          const totalLinea = (linea.cantidad || 0) * (linea.precio_pvp || 0);
          subtotal += totalLinea;
          
          // Fondo alternado para las filas
          const rowColor = index % 2 === 0 ? [249, 250, 251] as [number, number, number] : [255, 255, 255] as [number, number, number];
          drawRect(margin, yPos, contentWidth, 18, rowColor);
          
          addText(linea.nombre || 'Sin descripción', col1, yPos + 12, { fontSize: 10 });
          addText(linea.cantidad?.toString() || '0', col2, yPos + 12, { fontSize: 10 });
          addText(`${(linea.precio_pvp || 0).toFixed(2)}€`, col3, yPos + 12, { fontSize: 10 });
          addText(`${totalLinea.toFixed(2)}€`, col4, yPos + 12, { fontSize: 10 });
          
          yPos += 18;
        });

        // Total servicios
        drawRect(margin, yPos, contentWidth, 20, [79, 70, 229]);
        addText('TOTAL SERVICIOS', col1, yPos + 13, { fontSize: 11, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        addText(`${subtotal.toFixed(2)}€`, col4, yPos + 13, { fontSize: 11, fontStyle: 'bold', color: [255, 255, 255] as [number, number, number] });
        yPos += 30;
      }

      // ===== RESUMEN DE TOTALES =====
      // Caja de totales profesional
      const totalesBoxWidth = 160;
      const totalesBoxX = pageWidth - margin - totalesBoxWidth;
      drawRect(totalesBoxX, yPos, totalesBoxWidth, 100, [238, 242, 255]); // #EEF2FF

      // Título del resumen
      addText('RESUMEN DE LA FACTURA', totalesBoxX + 10, yPos + 15, { fontSize: 13, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      
      // Línea separadora
      drawLine(totalesBoxX + 10, yPos + 20, totalesBoxX + totalesBoxWidth - 10, yPos + 20, [79, 70, 229]);
      
      // Detalles del resumen
      addText('Subtotal:', totalesBoxX + 10, yPos + 35, { fontSize: 11 });
      addText(`${(datosFactura.subtotal || 0).toFixed(2)}€`, totalesBoxX + totalesBoxWidth - 10, yPos + 35, { fontSize: 11, align: 'right' });
      
      addText('IVA (${ivaPorcentaje}%):', totalesBoxX + 10, yPos + 50, { fontSize: 11 });
      addText(`${(datosFactura.iva || 0).toFixed(2)}€`, totalesBoxX + totalesBoxWidth - 10, yPos + 50, { fontSize: 11, align: 'right' });
      
      // Línea separadora antes del total
      drawLine(totalesBoxX + 10, yPos + 60, totalesBoxX + totalesBoxWidth - 10, yPos + 60, [79, 70, 229]);
      
      // Total final destacado
      addText('TOTAL', totalesBoxX + 10, yPos + 75, { fontSize: 16, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      addText(`${(datosFactura.total || 0).toFixed(2)}€`, totalesBoxX + totalesBoxWidth - 10, yPos + 75, { fontSize: 16, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number], align: 'right' });

      // ===== NOTAS ADICIONALES =====
      if (datosFactura.notas) {
        yPos += 120;
        addText('NOTAS ADICIONALES', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
        yPos += 12;
        
        // Caja de notas
        const notasBoxHeight = 35;
        drawRect(margin, yPos, contentWidth - 170, notasBoxHeight);
        addText(datosFactura.notas, margin + 10, yPos + 12, { fontSize: 10 });
      }

      // ===== FOOTER PROFESIONAL =====
      yPos = pageHeight - 50;
      
      // Línea separadora del footer
      drawLine(margin, yPos, pageWidth - margin, yPos, [79, 70, 229]);
      yPos += 10;
      
      // Información del footer
      addText(this.obtenerDatosEmpresa().nombre_empresa, margin, yPos, { fontSize: 11, fontStyle: 'bold', color: [79, 70, 229] as [number, number, number] });
      addText(this.obtenerDatosEmpresa().telefono, pageWidth / 2, yPos, { fontSize: 10, color: [107, 114, 128] as [number, number, number], align: 'center' });
      addText(this.obtenerDatosEmpresa().email, pageWidth - margin, yPos, { fontSize: 10, color: [107, 114, 128] as [number, number, number], align: 'right' });
      
      yPos += 8;
      addText(`CIF: ${this.obtenerDatosEmpresa().cif}`, margin, yPos, { fontSize: 9, color: [107, 114, 128] as [number, number, number] });
      addText(this.obtenerDatosEmpresa().web, pageWidth - margin, yPos, { fontSize: 9, color: [107, 114, 128] as [number, number, number], align: 'right' });

      // Descargar el PDF
      pdf.save(nombreArchivo);
      
      console.log('✅ Plantilla de factura profesional generada exitosamente:', nombreArchivo);
    } catch (error) {
      console.error('❌ Error al generar plantilla de factura profesional:', error);
      throw error;
    }
  }

  /**
   * Genera un PDF con datos específicos de factura (método alternativo)
   */
  generarPdfDesdeDatos(datosFactura: any, nombreArchivo: string = 'factura.pdf'): void {
    try {
      console.log('🔧 Generando PDF desde datos...');
      
      const pdf = configurarJsPDF();
      
      // Título
      aplicarEstilosPDF(pdf, 'titulo');
      pdf.text('FACTURA', 105, 30, { align: 'center' });
      
      // Información de la empresa
      aplicarEstilosPDF(pdf, 'normal');
      pdf.text('Nombre de empresa', estilosPDF.márgenes.izquierda, 50);
      pdf.text('Dirección de empresa', estilosPDF.márgenes.izquierda, 55);
      pdf.text('Ciudad de empresa', estilosPDF.márgenes.izquierda, 60);
      pdf.text('CIF de empresa', estilosPDF.márgenes.izquierda, 65);
      
      // Información de la factura
      pdf.text(`Nº Factura: ${datosFactura.numero_factura}`, 120, 50);
      pdf.text(`Fecha: ${datosFactura.fecha_emision}`, 120, 55);
      
      // Información del cliente
      aplicarEstilosPDF(pdf, 'subtitulo');
      pdf.text('DATOS DEL CLIENTE:', estilosPDF.márgenes.izquierda, 80);
      
      aplicarEstilosPDF(pdf, 'normal');
      pdf.text(`Nombre: ${datosFactura.nombre_cliente}`, estilosPDF.márgenes.izquierda, 90);
      pdf.text(`Dirección: ${datosFactura.direccion_cliente}`, estilosPDF.márgenes.izquierda, 95);
      pdf.text(`CIF: ${datosFactura.cif_cliente}`, estilosPDF.márgenes.izquierda, 100);
      pdf.text(`Email: ${datosFactura.email_cliente}`, estilosPDF.márgenes.izquierda, 105);
      
      // Tabla de productos/servicios
      let yPos = 130;
      aplicarEstilosPDF(pdf, 'subtitulo');
      pdf.text('DESCRIPCIÓN', estilosPDF.márgenes.izquierda, yPos);
      pdf.text('CANTIDAD', 80, yPos);
      pdf.text('PRECIO', 120, yPos);
      pdf.text('TOTAL', 160, yPos);
      
      yPos += 10;
      dibujarLinea(pdf, estilosPDF.márgenes.izquierda, yPos, 190, yPos);
      yPos += 5;
      
      // Agregar líneas de factura
      aplicarEstilosPDF(pdf, 'normal');
      if (datosFactura.lineas) {
        datosFactura.lineas.forEach((linea: any) => {
          pdf.text(linea.nombre || 'Sin descripción', estilosPDF.márgenes.izquierda, yPos);
          pdf.text(linea.cantidad?.toString() || '0', 80, yPos);
          pdf.text(`${linea.precio_pvp || 0}€`, 120, yPos);
          pdf.text(`${(linea.cantidad * linea.precio_pvp) || 0}€`, 160, yPos);
          yPos += 8;
        });
      }
      
      // Totales
      yPos += 10;
      dibujarLinea(pdf, estilosPDF.márgenes.izquierda, yPos, 190, yPos);
      yPos += 10;
      
      pdf.text('Subtotal:', 140, yPos);
      pdf.text(`${datosFactura.subtotal || 0}€`, 160, yPos);
      yPos += 8;
      
      pdf.text('IVA (${ivaPorcentaje}%):', 140, yPos);
      pdf.text(`${datosFactura.iva || 0}€`, 160, yPos);
      yPos += 8;
      
      aplicarEstilosPDF(pdf, 'subtitulo');
      pdf.setFont('helvetica', 'bold');
      pdf.text('TOTAL:', 140, yPos);
      pdf.text(`${datosFactura.total || 0}€`, 160, yPos);
      
      // Notas
      if (datosFactura.notas) {
        yPos += 20;
        aplicarEstilosPDF(pdf, 'normal');
        pdf.text('NOTAS:', estilosPDF.márgenes.izquierda, yPos);
        yPos += 8;
        pdf.text(datosFactura.notas, estilosPDF.márgenes.izquierda, yPos);
      }
      
      // Descargar el PDF
      pdf.save(nombreArchivo);
      
      console.log('✅ PDF desde datos generado exitosamente:', nombreArchivo);
    } catch (error) {
      console.error('❌ Error al generar PDF desde datos:', error);
      throw error;
    }
  }

  /**
   * Genera un PDF y lo retorna como Blob para envío por correo
   */
  async generarPdfBlob(datosFactura: any, nombreArchivo: string = 'factura.pdf'): Promise<Blob> {
    try {
      console.log('🔧 Generando PDF como Blob...');
      
      // Usar el método nativo existente pero retornar Blob
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
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
        
        pdf.setFontSize(finalOptions.fontSize);
        pdf.setFont('helvetica', finalOptions.fontStyle);
        pdf.setTextColor(finalOptions.color[0], finalOptions.color[1], finalOptions.color[2]);
        pdf.text(text, x, y, { align: finalOptions.align });
      };

      // Función helper para dibujar líneas
      const drawLine = (x1: number, y1: number, x2: number, y2: number, color: [number, number, number] = [79, 70, 229]) => {
        pdf.setDrawColor(color[0], color[1], color[2]);
        pdf.line(x1, y1, x2, y2);
      };

      // Función helper para dibujar rectángulos
      const drawRect = (x: number, y: number, w: number, h: number, fillColor?: [number, number, number], strokeColor?: [number, number, number]) => {
        if (fillColor) {
          pdf.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
          pdf.rect(x, y, w, h, 'F');
        }
        if (strokeColor) {
          pdf.setDrawColor(strokeColor[0], strokeColor[1], strokeColor[2]);
          pdf.rect(x, y, w, h, 'S');
        }
      };

      // Función para verificar si necesitamos nueva página
      const checkNewPage = (requiredHeight: number): boolean => {
        if (yPos + requiredHeight > maxContentHeight) {
          pdf.addPage();
          currentPage++;
          yPos = margin;
          return true;
        }
        return false;
      };

      // Header de la factura
      addText('FACTURA', margin, yPos, { fontSize: 24, fontStyle: 'bold', color: [79, 70, 229] });
      yPos += 15;
      
      // Información de la empresa
      addText('TÉCNICOS CLIMATIZACIÓN S.L.', margin, yPos, { fontSize: 16, fontStyle: 'bold' });
      yPos += 8;
      addText('Calle de la Tecnología, 123', margin, yPos, { fontSize: 10 });
      yPos += 5;
      addText('28001 Madrid, España', margin, yPos, { fontSize: 10 });
      yPos += 5;
      addText('CIF: B12345678', margin, yPos, { fontSize: 10 });
      yPos += 5;
      addText('Tel: +34 91 123 45 67', margin, yPos, { fontSize: 10 });
      yPos += 5;
      addText('Email: info@tecnicosclimatizacion.es', margin, yPos, { fontSize: 10 });
      yPos += 15;

      // Información de la factura
      const facturaInfoX = pageWidth - margin - 80;
      addText(`Nº FACTURA: ${datosFactura.numero_factura}`, facturaInfoX, yPos - 35, { fontSize: 12, fontStyle: 'bold' });
      addText(`FECHA: ${new Date(datosFactura.fecha_emision).toLocaleDateString('es-ES')}`, facturaInfoX, yPos - 25, { fontSize: 10 });
      addText(`ESTADO: ${datosFactura.estado}`, facturaInfoX, yPos - 15, { fontSize: 10 });

      // Línea separadora
      drawLine(margin, yPos, pageWidth - margin, yPos, [79, 70, 229]);
      yPos += 10;

      // Datos del cliente
      addText('DATOS DEL CLIENTE', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] });
      yPos += 8;
      addText(`Nombre: ${datosFactura.nombre_cliente}`, margin, yPos, { fontSize: 11 });
      yPos += 6;
      addText(`Dirección: ${datosFactura.direccion_cliente}`, margin, yPos, { fontSize: 11 });
      yPos += 6;
      addText(`CIF: ${datosFactura.cif_cliente}`, margin, yPos, { fontSize: 11 });
      yPos += 6;
      addText(`Email: ${datosFactura.email_cliente}`, margin, yPos, { fontSize: 11 });
      yPos += 15;

      // Tabla de productos/servicios
      if (datosFactura.lineas && datosFactura.lineas.length > 0) {
        addText('DETALLE DE SERVICIOS', margin, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] });
        yPos += 10;

        // Headers de la tabla
        const colWidths = [80, 20, 25, 25, 30];
        const colX = [margin, margin + colWidths[0], margin + colWidths[0] + colWidths[1], margin + colWidths[0] + colWidths[1] + colWidths[2], margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3]];

        // Fondo de header
        drawRect(margin, yPos - 5, contentWidth, 15, [79, 70, 229]);
        
        addText('DESCRIPCIÓN', colX[0], yPos, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] });
        addText('CANT.', colX[1], yPos, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] });
        addText('NETO', colX[2], yPos, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] });
        addText('PVP', colX[3], yPos, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] });
        addText('TOTAL', colX[4], yPos, { fontSize: 10, fontStyle: 'bold', color: [255, 255, 255] });
        
        yPos += 15;

        // Filas de productos
        let subtotal = 0;
        for (const linea of datosFactura.lineas) {
          checkNewPage(20);
          
          const cantidad = Number(linea.cantidad) || 0;
          const precioNeto = Number(linea.precio_neto) || 0;
          const precioPvp = Number(linea.precio_pvp) || 0;
          const total = cantidad * precioPvp;
          subtotal += total;

          addText(linea.nombre || 'Sin nombre', colX[0], yPos, { fontSize: 9 });
          addText(cantidad.toString(), colX[1], yPos, { fontSize: 9 });
          addText(`€${precioNeto.toFixed(2)}`, colX[2], yPos, { fontSize: 9 });
          addText(`€${precioPvp.toFixed(2)}`, colX[3], yPos, { fontSize: 9 });
          addText(`€${total.toFixed(2)}`, colX[4], yPos, { fontSize: 9 });
          
          yPos += 12;
        }

        yPos += 10;

        // Totales
        const totalX = pageWidth - margin - 60;
        addText(`Subtotal: €${datosFactura.subtotal?.toFixed(2) || '0.00'}`, totalX, yPos, { fontSize: 11, fontStyle: 'bold' });
        yPos += 8;
        addText(`IVA (21%): €${datosFactura.iva?.toFixed(2) || '0.00'}`, totalX, yPos, { fontSize: 11, fontStyle: 'bold' });
        yPos += 8;
        drawLine(totalX - 20, yPos, totalX + 40, yPos);
        yPos += 5;
        addText(`TOTAL: €${datosFactura.total?.toFixed(2) || '0.00'}`, totalX, yPos, { fontSize: 14, fontStyle: 'bold', color: [79, 70, 229] });
      }

      // Notas si existen
      if (datosFactura.notas) {
        yPos += 20;
        checkNewPage(30);
        addText('NOTAS', margin, yPos, { fontSize: 12, fontStyle: 'bold', color: [79, 70, 229] });
        yPos += 8;
        addText(datosFactura.notas, margin, yPos, { fontSize: 10 });
      }

      // Footer
      const footerY = pageHeight - 20;
      addText('TÉCNICOS CLIMATIZACIÓN S.L. - +34 91 123 45 67 - info@tecnicosclimatizacion.es', 
        margin, footerY, { fontSize: 8, align: 'center' });

      // Convertir a Blob
      const pdfBlob = pdf.output('blob');
      
      console.log('✅ PDF generado como Blob exitosamente');
      return pdfBlob;
      
    } catch (error) {
      console.error('❌ Error al generar PDF Blob:', error);
      throw error;
    }
  }
} 