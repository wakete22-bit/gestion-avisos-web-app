import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { configurarJsPDF, estilosPDF, aplicarEstilosPDF, dibujarLinea } from '../config/jspdf.config';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

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
      
      addText('IVA (21%):', totalesBoxX + 10, yPos + 50, { fontSize: 11 });
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
   * Genera un PDF nativo con el estilo exacto de la factura
   */
  generarPdfNativo(datosFactura: any, nombreArchivo: string = 'factura.pdf'): void {
    try {
      console.log('🔧 Generando PDF nativo con estilos...');
      
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
      
      addText('IVA (21%):', totalesBoxX + 10, yPos + 50, { fontSize: 11 });
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

      // Descargar el PDF
      pdf.save(nombreArchivo);
      
      console.log('✅ PDF nativo generado exitosamente:', nombreArchivo);
    } catch (error) {
      console.error('❌ Error al generar PDF nativo:', error);
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
      
      pdf.text('IVA (21%):', 140, yPos);
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
} 