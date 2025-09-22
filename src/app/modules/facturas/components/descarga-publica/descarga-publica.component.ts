import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfService } from '../../../../core/services/pdf.service';
import { FacturasService } from '../../services/facturas.service';

@Component({
  selector: 'app-descarga-publica',
  template: `
    <div class="descarga-container">
      <div class="descarga-content" *ngIf="!cargando && !error">
        <div class="header">
          <h1>📄 Descarga de Factura</h1>
          <p>Factura: <strong>{{numeroFactura}}</strong></p>
        </div>
        
        <div class="factura-info" *ngIf="datosFactura">
          <h3>Información de la Factura</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Cliente:</span>
              <span class="value">{{datosFactura.nombre_cliente}}</span>
            </div>
            <div class="info-item">
              <span class="label">Fecha:</span>
              <span class="value">{{datosFactura.fecha_emision | date:'dd/MM/yyyy'}}</span>
            </div>
            <div class="info-item">
              <span class="label">Total:</span>
              <span class="value">{{datosFactura.total | currency:'EUR'}}</span>
            </div>
          </div>
        </div>

        <div class="download-section">
          <button 
            class="btn-download" 
            (click)="descargarPDF()" 
            [disabled]="descargando">
            <ion-icon name="download-outline" *ngIf="!descargando"></ion-icon>
            <ion-icon name="refresh-outline" class="spinning" *ngIf="descargando"></ion-icon>
            {{ descargando ? 'Generando PDF...' : 'Descargar PDF' }}
          </button>
        </div>

        <div class="footer">
          <p>TÉCNICOS CLIMATIZACIÓN S.L.</p>
          <p>📧 info@tecnicosclimatizacion.es | 📞 +34 91 123 45 67</p>
        </div>
      </div>

      <div class="loading" *ngIf="cargando">
        <ion-icon name="refresh-outline" class="spinning"></ion-icon>
        <p>Cargando factura...</p>
      </div>

      <div class="error" *ngIf="error">
        <ion-icon name="alert-circle-outline"></ion-icon>
        <h3>Error</h3>
        <p>{{error}}</p>
        <button class="btn-retry" (click)="reintentar()">Reintentar</button>
      </div>
    </div>
  `,
  styles: [`
    .descarga-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .descarga-content {
      background: white;
      border-radius: 15px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      max-width: 500px;
      width: 100%;
      text-align: center;
    }

    .header h1 {
      color: #2563eb;
      margin-bottom: 10px;
      font-size: 28px;
    }

    .header p {
      color: #666;
      font-size: 16px;
      margin-bottom: 30px;
    }

    .factura-info {
      background: #f8fafc;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
      text-align: left;
    }

    .factura-info h3 {
      color: #2563eb;
      margin-bottom: 15px;
      text-align: center;
    }

    .info-grid {
      display: grid;
      gap: 10px;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .info-item:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 600;
      color: #374151;
    }

    .value {
      color: #6b7280;
    }

    .download-section {
      margin: 30px 0;
    }

    .btn-download {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0 auto;
      transition: all 0.3s ease;
    }

    .btn-download:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
    }

    .btn-download:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
    }

    .loading, .error {
      text-align: center;
      color: white;
    }

    .loading ion-icon, .error ion-icon {
      font-size: 48px;
      margin-bottom: 20px;
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .error h3 {
      margin: 20px 0 10px 0;
      color: #ef4444;
    }

    .btn-retry {
      background: #ef4444;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 15px;
    }
  `]
})
export class DescargaPublicaComponent implements OnInit {
  numeroFactura: string = '';
  datosFactura: any = null;
  cargando = true;
  descargando = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pdfService: PdfService,
    private facturasService: FacturasService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.numeroFactura = params['factura'] || '';
      const fileBase64 = params['file'];
      const fileName = params['name'];
      
      if (this.numeroFactura && fileBase64) {
        // Si tenemos el PDF en base64, descargarlo directamente
        this.descargarPDFDesdeBase64(fileBase64, fileName);
      } else if (this.numeroFactura) {
        // Si solo tenemos el número de factura, cargar desde la base de datos
        this.cargarFactura();
      } else {
        this.error = 'Número de factura no proporcionado';
        this.cargando = false;
      }
    });
  }

  async descargarPDFDesdeBase64(fileBase64: string, fileName: string) {
    try {
      this.cargando = true;
      this.error = null;
      
      // Convertir base64 a Blob
      const byteCharacters = atob(fileBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
      
      // Crear enlace de descarga
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || `factura_${this.numeroFactura}.pdf`;
      link.click();
      
      // Limpiar
      URL.revokeObjectURL(url);
      
      // Mostrar información básica
      this.datosFactura = {
        nombre_cliente: 'Cliente',
        fecha_emision: new Date(),
        total: 0
      };
      
    } catch (error) {
      console.error('Error al descargar PDF desde base64:', error);
      this.error = 'Error al procesar el archivo PDF';
    } finally {
      this.cargando = false;
    }
  }

  async cargarFactura() {
    try {
      this.cargando = true;
      this.error = null;
      
      // Buscar la factura por número
      const facturas = await this.facturasService.buscarFacturas(this.numeroFactura).toPromise();
      const factura = facturas?.find(f => f.numero_factura === this.numeroFactura);
      
      if (factura) {
        this.datosFactura = factura;
      } else {
        this.error = 'Factura no encontrada';
      }
    } catch (error) {
      console.error('Error al cargar factura:', error);
      this.error = 'Error al cargar la factura';
    } finally {
      this.cargando = false;
    }
  }

  async descargarPDF() {
    if (!this.datosFactura) return;

    try {
      this.descargando = true;
      
      // Generar el PDF
      const pdfBlob = await this.pdfService.generarPdfBlob(
        this.datosFactura, 
        `factura_${this.numeroFactura}.pdf`
      );
      
      // Crear enlace de descarga
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `factura_${this.numeroFactura}.pdf`;
      link.click();
      
      // Limpiar
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error al descargar PDF:', error);
      this.error = 'Error al generar el PDF';
    } finally {
      this.descargando = false;
    }
  }

  reintentar() {
    this.cargarFactura();
  }
}
