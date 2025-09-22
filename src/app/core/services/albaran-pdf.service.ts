import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class AlbaranPdfService {

  constructor(private configuracionService: ConfiguracionService) { }

  /**
   * Genera un PDF del albarán usando jsPDF
   */
  generarPdfAlbaran(datosAlbaran: any, nombreArchivo: string = 'albaran.pdf'): void {
    const doc = new jsPDF();
    let yPosition = 20;

    // Configuración de colores profesionales (escala de grises)
    const colorPrincipal: [number, number, number] = [0, 0, 0]; // Negro
    const colorSecundario: [number, number, number] = [64, 64, 64]; // Gris oscuro
    const colorTexto: [number, number, number] = [32, 32, 32]; // Gris medio
    const colorTextoClaro: [number, number, number] = [128, 128, 128]; // Gris claro

    // Función para agregar texto
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      // Validar que x e y sean números válidos
      if (typeof x !== 'number' || isNaN(x) || typeof y !== 'number' || isNaN(y)) {
        console.warn('Coordenadas inválidas para addText:', { x, y, text });
        return;
      }
      
      doc.setFontSize(options.fontSize || 10);
      
      // Validar que el color sea un array de 3 números
      const color = options.color || colorTexto;
      if (Array.isArray(color) && color.length === 3 && 
          typeof color[0] === 'number' && typeof color[1] === 'number' && typeof color[2] === 'number') {
        doc.setTextColor(color[0], color[1], color[2]);
      } else {
        doc.setTextColor(colorTexto[0], colorTexto[1], colorTexto[2]);
      }
      
      doc.setFont(options.font || 'helvetica', options.style || 'normal');
      doc.text(text, x, y);
    };

    // Función para dibujar líneas
    const drawLine = (x1: number, y1: number, x2: number, y2: number, color: [number, number, number] = [229, 231, 235]) => {
      // Validar que las coordenadas sean números válidos
      if (typeof x1 !== 'number' || isNaN(x1) || typeof y1 !== 'number' || isNaN(y1) ||
          typeof x2 !== 'number' || isNaN(x2) || typeof y2 !== 'number' || isNaN(y2)) {
        console.warn('Coordenadas inválidas para drawLine:', { x1, y1, x2, y2 });
        return;
      }
      
      doc.setDrawColor(color[0], color[1], color[2]);
      doc.setLineWidth(0.5);
      doc.line(x1, y1, x2, y2);
    };

    // Función para dibujar rectángulos
    const drawRect = (x: number, y: number, w: number, h: number, fillColor?: [number, number, number]) => {
      // Validar coordenadas
      if (typeof x !== 'number' || isNaN(x) || typeof y !== 'number' || isNaN(y) ||
          typeof w !== 'number' || isNaN(w) || typeof h !== 'number' || isNaN(h)) {
        console.warn('Coordenadas inválidas para drawRect:', { x, y, w, h });
        return;
      }
      
      if (fillColor && Array.isArray(fillColor) && fillColor.length === 3) {
        doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
        doc.rect(x, y, w, h, 'F');
      } else {
        doc.rect(x, y, w, h);
      }
    };

    // Función para verificar nueva página
    const checkNewPage = (requiredHeight: number = 10): boolean => {
      if (yPosition + requiredHeight > 250) {
        doc.addPage();
        yPosition = 20;
        return true;
      }
      return false;
    };

    // Función para agregar sección con control de página
    const addSection = (title: string, content: () => void, requiredHeight: number = 50) => {
      // Verificar si necesitamos nueva página
      if (yPosition + requiredHeight > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Agregar título de sección
      addText(title, 20, yPosition, { fontSize: 14, style: 'bold', color: colorSecundario });
      yPosition += 8;
      
      // Línea separadora bajo el título
      drawLine(20, yPosition, 190, yPosition, colorTextoClaro);
      yPosition += 10;
      
      // Ejecutar contenido de la sección
      content();
      
      yPosition += 15; // Espacio entre secciones
    };

    // Asegurar que yPosition siempre sea un número válido
    if (typeof yPosition !== 'number' || isNaN(yPosition)) {
      yPosition = 20;
    }

    // Header del albarán
    addText('ALBARÁN DE TRABAJO', 20, yPosition, { fontSize: 18, style: 'bold', color: colorPrincipal });
    yPosition += 8;
    
    // Línea separadora
    drawLine(20, yPosition, 190, yPosition, colorTextoClaro);
    yPosition += 10;
    
    addText(`Nº ${datosAlbaran.id?.substring(0, 8) || 'N/A'}`, 20, yPosition, { fontSize: 12, color: colorTextoClaro });
    addText(`Fecha: ${this.formatearFecha(new Date())}`, 120, yPosition, { fontSize: 12, color: colorTextoClaro });
    yPosition += 15;

    // Información del aviso
    if (datosAlbaran.aviso) {
      addSection('INFORMACIÓN DEL AVISO', () => {
        addText(`Cliente: ${datosAlbaran.aviso.nombre_cliente_aviso || 'No especificado'}`, 20, yPosition);
        yPosition += 6;
        
        addText(`Dirección: ${datosAlbaran.aviso.direccion_cliente_aviso || 'No especificada'}`, 20, yPosition);
        yPosition += 6;
        
        addText(`Estado: ${datosAlbaran.aviso.estado || 'No especificado'}`, 20, yPosition);
        yPosition += 6;
        
        addText(`Fecha de creación: ${this.formatearFecha(datosAlbaran.aviso.fecha_creacion)}`, 20, yPosition);
        yPosition += 6;
      }, 30);
    }

    // Fechas y horarios
    addSection('FECHAS Y HORARIOS', () => {
      addText(`Fecha de cierre: ${this.formatearFecha(datosAlbaran.fecha_cierre)}`, 20, yPosition);
      yPosition += 6;
      
      addText(`Hora de entrada: ${datosAlbaran.hora_entrada || 'No especificada'}`, 20, yPosition);
      yPosition += 6;
      
      addText(`Hora de salida: ${datosAlbaran.hora_salida || 'No especificada'}`, 20, yPosition);
      yPosition += 6;
    }, 25);

    // Descripción del trabajo
    if (datosAlbaran.descripcion_trabajo_realizado) {
      addSection('DESCRIPCIÓN DEL TRABAJO REALIZADO', () => {
        const descripcion = datosAlbaran.descripcion_trabajo_realizado;
        const maxWidth = 170;
        const lineHeight = 6;
        
        // Dividir texto en líneas
        const lines = doc.splitTextToSize(descripcion, maxWidth);
        lines.forEach((line: string) => {
          checkNewPage(lineHeight);
          addText(line, 20, yPosition);
          yPosition += lineHeight;
        });
      }, 40);
    }

    // Materiales utilizados
    if (datosAlbaran.materialesUtilizados && datosAlbaran.materialesUtilizados.length > 0) {
      addSection('MATERIALES UTILIZADOS', () => {
        // Tabla de materiales
        const tableData = [
          ['Código', 'Material', 'Cantidad', 'Unidad', 'Precio Unit.', 'Total']
        ];
        
        let totalMateriales = 0;
        datosAlbaran.materialesUtilizados.forEach((material: any) => {
          const total = material.precio_pvp * material.cantidad;
          totalMateriales += total;
          
          tableData.push([
            material.codigo || '-',
            material.nombre,
            material.cantidad.toString(),
            material.unidad,
            this.formatearMoneda(material.precio_pvp),
            this.formatearMoneda(total)
          ]);
        });
        
        // Agregar fila de total
        tableData.push(['', '', '', '', 'TOTAL:', this.formatearMoneda(totalMateriales)]);
        
        // Dibujar tabla
        const startX = 20;
        const colWidths = [25, 60, 20, 20, 30, 30];
        const rowHeight = 8;
        
        tableData.forEach((row, rowIndex) => {
          checkNewPage(rowHeight);
          
          let xPos = startX;
          row.forEach((cell, colIndex) => {
            const isHeader = rowIndex === 0;
            const isTotal = rowIndex === tableData.length - 1;
            
            // Dibujar celda
            if (isHeader) {
              drawRect(xPos, yPosition - 5, colWidths[colIndex], rowHeight, [243, 244, 246] as [number, number, number]);
              addText(cell, xPos + 2, yPosition, { fontSize: 8, style: 'bold', color: [55, 65, 81] as [number, number, number] });
            } else if (isTotal) {
              addText(cell, xPos + 2, yPosition, { fontSize: 9, style: 'bold', color: colorSecundario });
            } else {
              addText(cell, xPos + 2, yPosition, { fontSize: 8 });
            }
            
            xPos += colWidths[colIndex];
          });
          
          yPosition += rowHeight;
        });
      }, 60);
    }

    // Presupuesto si es necesario
    if (datosAlbaran.estado_cierre === 'Presupuesto pendiente') {
      addSection('INFORMACIÓN DE PRESUPUESTO', () => {
        // Marco para presupuesto
        drawRect(15, yPosition - 5, 180, 25);
        addText('Este albarán requiere presupuesto', 20, yPosition, { style: 'bold' });
        yPosition += 6;
        
        if (datosAlbaran.presupuesto_necesario > 0) {
          addText(`Monto estimado: ${this.formatearMoneda(datosAlbaran.presupuesto_necesario)}`, 20, yPosition, { style: 'bold' });
          yPosition += 6;
        }
      }, 35);
    }

    // Información del cliente y firma
    addSection('INFORMACIÓN DEL CLIENTE', () => {
      if (datosAlbaran.dni_cliente) {
        addText(`DNI: ${datosAlbaran.dni_cliente}`, 20, yPosition);
        yPosition += 6;
      }
      
      if (datosAlbaran.nombre_firma) {
        addText(`Firmado por: ${datosAlbaran.nombre_firma}`, 20, yPosition);
        yPosition += 6;
      }
    }, 20);

    // Sección de firma
    addSection('FIRMA DEL CLIENTE', () => {
      // Marco para la firma
      drawRect(20, yPosition, 170, 40);
      addText('Firma:', 25, yPosition + 8, { fontSize: 10, color: colorTextoClaro });
      
      if (datosAlbaran.firma_url) {
        // Nota: jsPDF no puede cargar imágenes directamente desde URL
        // Se mostraría un mensaje indicando que hay firma digital
        addText('✓ Firma digital registrada', 25, yPosition + 20, { fontSize: 10, style: 'bold' });
      } else if (datosAlbaran.nombre_firma) {
        addText(`Firmado por: ${datosAlbaran.nombre_firma}`, 25, yPosition + 20, { fontSize: 10 });
      } else {
        addText('_________________________', 25, yPosition + 20, { fontSize: 10 });
      }
      
      yPosition += 50;
    }, 60);

    // Observaciones
    if (datosAlbaran.observaciones) {
      addSection('OBSERVACIONES', () => {
        const observaciones = datosAlbaran.observaciones;
        const maxWidth = 170;
        const lineHeight = 6;
        
        const lines = doc.splitTextToSize(observaciones, maxWidth);
        lines.forEach((line: string) => {
          checkNewPage(lineHeight);
          addText(line, 20, yPosition, { style: 'italic' });
          yPosition += lineHeight;
        });
      }, 30);
    }

    // Información adicional
    addSection('INFORMACIÓN ADICIONAL', () => {
      addText(`ID del trabajo: ${datosAlbaran.trabajo_id?.substring(0, 8) || 'N/A'}`, 20, yPosition);
      yPosition += 6;
      
      addText(`ID del aviso: ${datosAlbaran.aviso_id?.substring(0, 8) || 'N/A'}`, 20, yPosition);
      yPosition += 6;
      
      if (datosAlbaran.fecha_creacion) {
        addText(`Fecha de creación: ${this.formatearFecha(datosAlbaran.fecha_creacion)}`, 20, yPosition);
        yPosition += 6;
      }
    }, 25);

    // Footer profesional - siempre en nueva página si es necesario
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Línea separadora
    drawLine(20, yPosition, 190, yPosition, colorTextoClaro);
    yPosition += 10;
    
    // Información de la empresa (simulada)
    addText('EMPRESA DE SERVICIOS TÉCNICOS', 20, yPosition, { fontSize: 10, style: 'bold', color: colorSecundario });
    yPosition += 6;
    addText('CIF: 12345678A | Tel: 900 123 456 | Email: info@empresa.com', 20, yPosition, { fontSize: 8, color: colorTextoClaro });
    yPosition += 6;
    addText('Dirección: Calle Principal 123, 28001 Madrid', 20, yPosition, { fontSize: 8, color: colorTextoClaro });
    yPosition += 10;
    
    // Información del documento
    addText('Este albarán ha sido generado automáticamente por el sistema de gestión', 20, yPosition, { fontSize: 8, color: colorTextoClaro });
    yPosition += 4;
    addText(`Generado el: ${this.formatearFecha(new Date())} | Página ${doc.getCurrentPageInfo().pageNumber} de ${doc.getNumberOfPages()}`, 20, yPosition, { fontSize: 8, color: colorTextoClaro });

    // Descargar el PDF
    doc.save(nombreArchivo);
  }

  /**
   * Genera un PDF del albarán usando HTML/CSS (método alternativo)
   */
  generarPdfHtml(datosAlbaran: any, nombreArchivo: string = 'albaran.pdf'): void {
    const html = this.generarHtmlAlbaran(datosAlbaran);
    const css = this.obtenerEstilosCss();
    
    const ventana = window.open('', '_blank');
    if (ventana) {
      ventana.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Albarán ${datosAlbaran.id?.substring(0, 8) || 'N/A'}</title>
          <style>${css}</style>
        </head>
        <body>
          ${html}
        </body>
        </html>
      `);
      
      ventana.document.close();
      ventana.focus();
      
      // Esperar a que se cargue el contenido y luego imprimir
      setTimeout(() => {
        ventana.print();
      }, 500);
    }
  }

  /**
   * Genera el HTML del albarán
   */
  private generarHtmlAlbaran(datosAlbaran: any): string {
    const materiales = datosAlbaran.materialesUtilizados || [];
    const totalMateriales = materiales.reduce((total: number, material: any) => 
      total + (material.precio_pvp * material.cantidad), 0);

    return `
      <div class="albaran-container">
        <!-- Header -->
        <div class="albaran-header">
          <h1>ALBARÁN DE TRABAJO</h1>
          <div class="albaran-info">
            <span class="albaran-numero">Nº ${datosAlbaran.id?.substring(0, 8) || 'N/A'}</span>
            <span class="fecha-emision">${this.formatearFecha(new Date())}</span>
          </div>
        </div>

        <!-- Información del aviso -->
        ${datosAlbaran.aviso ? `
        <div class="section">
          <h2>INFORMACIÓN DEL AVISO</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Cliente:</label>
              <span>${datosAlbaran.aviso.nombre_cliente_aviso || 'No especificado'}</span>
            </div>
            <div class="info-item">
              <label>Dirección:</label>
              <span>${datosAlbaran.aviso.direccion_cliente_aviso || 'No especificada'}</span>
            </div>
            <div class="info-item">
              <label>Estado:</label>
              <span>${datosAlbaran.aviso.estado || 'No especificado'}</span>
            </div>
            <div class="info-item">
              <label>Fecha de creación:</label>
              <span>${this.formatearFecha(datosAlbaran.aviso.fecha_creacion)}</span>
            </div>
          </div>
        </div>
        ` : ''}

        <!-- Fechas y horarios -->
        <div class="section">
          <h2>FECHAS Y HORARIOS</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Fecha de cierre:</label>
              <span>${this.formatearFecha(datosAlbaran.fecha_cierre)}</span>
            </div>
            <div class="info-item">
              <label>Hora de entrada:</label>
              <span>${datosAlbaran.hora_entrada || 'No especificada'}</span>
            </div>
            <div class="info-item">
              <label>Hora de salida:</label>
              <span>${datosAlbaran.hora_salida || 'No especificada'}</span>
            </div>
          </div>
        </div>

        <!-- Descripción del trabajo -->
        ${datosAlbaran.descripcion_trabajo_realizado ? `
        <div class="section">
          <h2>DESCRIPCIÓN DEL TRABAJO REALIZADO</h2>
          <div class="descripcion">
            <p>${datosAlbaran.descripcion_trabajo_realizado}</p>
          </div>
        </div>
        ` : ''}

        <!-- Materiales utilizados -->
        ${materiales.length > 0 ? `
        <div class="section">
          <h2>MATERIALES UTILIZADOS</h2>
          <table class="materiales-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Material</th>
                <th>Cantidad</th>
                <th>Unidad</th>
                <th>Precio Unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${materiales.map((material: any) => `
                <tr>
                  <td>${material.codigo || '-'}</td>
                  <td>${material.nombre}</td>
                  <td>${material.cantidad}</td>
                  <td>${material.unidad}</td>
                  <td>${this.formatearMoneda(material.precio_pvp)}</td>
                  <td>${this.formatearMoneda(material.precio_pvp * material.cantidad)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="5"><strong>TOTAL MATERIALES:</strong></td>
                <td><strong>${this.formatearMoneda(totalMateriales)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
        ` : ''}

        <!-- Presupuesto -->
        ${datosAlbaran.estado_cierre === 'Presupuesto pendiente' ? `
        <div class="section presupuesto-section">
          <h2>INFORMACIÓN DE PRESUPUESTO</h2>
          <div class="presupuesto-warning">
            <p>Este albarán requiere presupuesto</p>
            ${datosAlbaran.presupuesto_necesario > 0 ? `
              <p><strong>Monto estimado: ${this.formatearMoneda(datosAlbaran.presupuesto_necesario)}</strong></p>
            ` : ''}
          </div>
        </div>
        ` : ''}

        <!-- Información del cliente -->
        <div class="section">
          <h2>INFORMACIÓN DEL CLIENTE</h2>
          <div class="info-grid">
            ${datosAlbaran.dni_cliente ? `
              <div class="info-item">
                <label>DNI:</label>
                <span>${datosAlbaran.dni_cliente}</span>
              </div>
            ` : ''}
            ${datosAlbaran.nombre_firma ? `
              <div class="info-item">
                <label>Firmado por:</label>
                <span>${datosAlbaran.nombre_firma}</span>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Sección de firma -->
        <div class="section">
          <h2>FIRMA DEL CLIENTE</h2>
          <div class="firma-section">
            <div class="firma-box">
              <label>Firma:</label>
              ${datosAlbaran.firma_url ? `
                <div class="firma-digital">
                  <p>✓ Firma digital registrada</p>
                  <img src="${datosAlbaran.firma_url}" alt="Firma del cliente" class="firma-imagen" />
                </div>
              ` : datosAlbaran.nombre_firma ? `
                <div class="firma-texto">
                  <p>Firmado por: ${datosAlbaran.nombre_firma}</p>
                </div>
              ` : `
                <div class="firma-lugar">
                  <p>_________________________</p>
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- Observaciones -->
        ${datosAlbaran.observaciones ? `
        <div class="section">
          <h2>OBSERVACIONES</h2>
          <div class="observaciones">
            <p>${datosAlbaran.observaciones}</p>
          </div>
        </div>
        ` : ''}

        <!-- Información adicional -->
        <div class="section">
          <h2>INFORMACIÓN ADICIONAL</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>ID del trabajo:</label>
              <span>${datosAlbaran.trabajo_id?.substring(0, 8) || 'N/A'}</span>
            </div>
            <div class="info-item">
              <label>ID del aviso:</label>
              <span>${datosAlbaran.aviso_id?.substring(0, 8) || 'N/A'}</span>
            </div>
            ${datosAlbaran.fecha_creacion ? `
              <div class="info-item">
                <label>Fecha de creación:</label>
                <span>${this.formatearFecha(datosAlbaran.fecha_creacion)}</span>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Footer -->
        <div class="albaran-footer">
          <p>Este albarán ha sido generado automáticamente por el sistema de gestión de avisos</p>
          <p>Generado el: ${this.formatearFecha(new Date())}</p>
        </div>
      </div>
    `;
  }

  /**
   * Obtiene los estilos CSS para el albarán
   */
  private obtenerEstilosCss(): string {
    return `
      @media print {
        body { margin: 0; padding: 0; }
        .no-print { display: none !important; }
      }

      .albaran-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: 'Arial', sans-serif;
        color: #111827;
        background: white;
      }

      .albaran-header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid #000;
      }

      .albaran-header h1 {
        font-size: 24px;
        font-weight: bold;
        color: #000;
        margin: 0 0 10px 0;
      }

      .albaran-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
      }

      .albaran-numero {
        font-size: 16px;
        font-weight: bold;
        color: #000;
      }

      .fecha-emision {
        font-size: 14px;
        color: #6B7280;
      }

      .section {
        margin-bottom: 25px;
        padding: 20px;
        background: #f9fafb;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
      }

      .section h2 {
        font-size: 16px;
        font-weight: bold;
        color: #000;
        margin: 0 0 15px 0;
        padding-bottom: 8px;
        border-bottom: 1px solid #666;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
      }

      .info-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 12px;
        background: white;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
      }

      .info-item label {
        font-size: 12px;
        font-weight: bold;
        color: #6B7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .info-item span {
        font-size: 14px;
        color: #1F2937;
        font-weight: 500;
      }

      .descripcion, .observaciones {
        background: white;
        padding: 15px;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
      }

      .descripcion p, .observaciones p {
        margin: 0;
        line-height: 1.6;
        color: #374151;
      }

      .observaciones p {
        font-style: italic;
      }

      .materiales-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 6px;
        overflow: hidden;
        border: 1px solid #e5e7eb;
      }

      .materiales-table th,
      .materiales-table td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
      }

      .materiales-table th {
        background: #f3f4f6;
        font-weight: bold;
        color: #374151;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .materiales-table td {
        font-size: 13px;
        color: #1F2937;
      }

      .materiales-table .total-row {
        background: #f0f9ff;
        font-weight: bold;
      }

      .materiales-table .total-row td {
        color: #1e40af;
        font-size: 14px;
      }

      .presupuesto-section {
        background: #fef3c7;
        border: 1px solid #f59e0b;
      }

      .presupuesto-warning {
        background: white;
        padding: 15px;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
      }

      .presupuesto-warning p {
        margin: 0 0 8px 0;
        color: #92400e;
        font-weight: 500;
      }

      .albaran-footer {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 2px solid #10B981;
        text-align: center;
        color: #6B7280;
        font-size: 12px;
      }

      .albaran-footer p {
        margin: 5px 0;
      }

      .firma-section {
        margin-top: 20px;
      }

      .firma-box {
        border: 2px solid #000;
        padding: 20px;
        min-height: 100px;
        background: white;
      }

      .firma-box label {
        font-weight: bold;
        color: #000;
        margin-bottom: 10px;
        display: block;
      }

      .firma-digital p {
        color: #000;
        font-weight: bold;
        margin: 10px 0;
      }

      .firma-imagen {
        max-width: 200px;
        max-height: 80px;
        border: 1px solid #ccc;
        margin-top: 10px;
      }

      .firma-texto p {
        color: #000;
        font-style: italic;
        margin: 20px 0;
      }

      .firma-lugar p {
        color: #000;
        font-size: 16px;
        margin: 20px 0;
      }
    `;
  }

  /**
   * Formatea una fecha para mostrar
   */
  private formatearFecha(fecha: Date | string): string {
    if (!fecha) return 'No especificada';
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Formatea un valor monetario
   */
  private formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor);
  }
}
