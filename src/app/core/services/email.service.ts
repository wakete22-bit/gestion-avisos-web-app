import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { PublicDownloadService } from './public-download.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly SERVICE_ID = 'service_ylignlb'; // Tu Service ID de EmailJS
  private readonly TEMPLATE_ID = 'template_s8jrauj'; // Tu Template ID de EmailJS
  private readonly PUBLIC_KEY = 'hSwFP37-p0NR3D4wV'; // Tu Public Key de EmailJS

  constructor(private publicDownloadService: PublicDownloadService) {
    // Inicializar EmailJS
    emailjs.init(this.PUBLIC_KEY);
  }

  /**
   * Envía una factura por correo electrónico con enlace de descarga público
   */
  async enviarFacturaPorCorreo(
    emailCliente: string,
    nombreCliente: string,
    numeroFactura: string,
    pdfBlob: Blob,
    totalFactura?: number,
    asunto?: string,
    mensaje?: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📧 Iniciando envío de factura por correo con enlace de descarga...');
      
      // Crear enlace de descarga público
      const nombreArchivo = `factura_${numeroFactura}.pdf`;
      const enlaceDescarga = await this.crearEnlaceDescargaPublico(pdfBlob, nombreArchivo);
      
      // Preparar los parámetros del template
      const templateParams = {
        to_email: emailCliente,
        to_name: nombreCliente,
        from_name: 'TÉCNICOS CLIMATIZACIÓN S.L.',
        subject: asunto || `Factura ${numeroFactura} - TÉCNICOS CLIMATIZACIÓN S.L.`,
        message: mensaje || this.crearMensajeHTML(nombreCliente, numeroFactura, enlaceDescarga, totalFactura),
        factura_numero: numeroFactura,
        fecha_factura: new Date().toLocaleDateString('es-ES'),
        total_factura: '€' + (totalFactura || 0).toFixed(2),
        link_descarga: enlaceDescarga,
        pdf_url: enlaceDescarga
      };

      console.log('📧 Parámetros del template:', {
        to_email: templateParams.to_email,
        to_name: templateParams.to_name,
        from_name: templateParams.from_name,
        subject: templateParams.subject,
        factura_numero: templateParams.factura_numero,
        total_factura: templateParams.total_factura,
        link_descarga: templateParams.link_descarga
      });

      // Enviar el correo
      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams
      );

      console.log('✅ Factura enviada exitosamente con enlace de descarga:', response);
      return {
        success: true,
        message: 'Factura enviada correctamente con enlace de descarga'
      };

    } catch (error) {
      console.error('❌ Error al enviar factura por correo:', error);
      return {
        success: false,
        message: 'Error al enviar la factura. Inténtelo de nuevo.'
      };
    }
  }

  /**
   * Envía un correo simple sin adjuntos (para pruebas)
   */
  async enviarCorreoSimple(
    emailDestino: string,
    asunto: string,
    mensaje: string,
    nombreDestinatario?: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📧 Enviando correo simple de prueba...');
      console.log('📧 Datos:', { emailDestino, asunto, mensaje, nombreDestinatario });

      // Intentar con diferentes formatos de parámetros
      const templateParams1 = {
        to_email: emailDestino,
        to_name: nombreDestinatario || 'Cliente',
        from_name: 'TÉCNICOS CLIMATIZACIÓN S.L.',
        subject: asunto,
        message: mensaje
      };

      console.log('📧 Parámetros del template (formato 1):', templateParams1);

      try {
        const response = await emailjs.send(
          this.SERVICE_ID,
          this.TEMPLATE_ID,
          templateParams1
        );

        console.log('✅ Correo simple enviado exitosamente:', response);
        return {
          success: true,
          message: 'Correo enviado correctamente'
        };
      } catch (error1) {
        console.log('❌ Error con formato 1, probando formato 2...');
        
        // Intentar con formato alternativo
        const templateParams2 = {
          to: emailDestino,
          name: nombreDestinatario || 'Cliente',
          from: 'TÉCNICOS CLIMATIZACIÓN S.L.',
          subject: asunto,
          message: mensaje
        };

        console.log('📧 Parámetros del template (formato 2):', templateParams2);

        const response = await emailjs.send(
          this.SERVICE_ID,
          this.TEMPLATE_ID,
          templateParams2
        );

        console.log('✅ Correo simple enviado exitosamente (formato 2):', response);
        return {
          success: true,
          message: 'Correo enviado correctamente'
        };
      }

    } catch (error) {
      console.error('❌ Error al enviar correo:', error);
      return {
        success: false,
        message: 'Error al enviar el correo. Verifica la configuración del template en EmailJS.'
      };
    }
  }

  /**
   * Crea un enlace de descarga público para el PDF
   */
  private async crearEnlaceDescargaPublico(pdfBlob: Blob, nombreArchivo: string): Promise<string> {
    try {
      // Usar el servicio de descarga pública
      return await this.publicDownloadService.crearEnlaceDescargaPublico(pdfBlob, nombreArchivo);
    } catch (error) {
      console.error('❌ Error al crear enlace público, usando fallback:', error);
      // Fallback: usar enlace directo con data URL
      return await this.publicDownloadService.crearEnlaceDirecto(pdfBlob, nombreArchivo);
    }
  }

  /**
   * Crea un mensaje con enlace de descarga
   */
  private crearMensajeConEnlace(nombreCliente: string, numeroFactura: string, enlaceDescarga: string, totalFactura?: number): string {
    return `Hola ${nombreCliente},

Le enviamos la factura ${numeroFactura} con todos los detalles de los servicios realizados.

DETALLES DE LA FACTURA:
- Número: ${numeroFactura}
- Fecha: ${new Date().toLocaleDateString('es-ES')}
- Total: €${(totalFactura || 0).toFixed(2)}

Puede descargar la factura en PDF haciendo clic en el siguiente enlace:
${enlaceDescarga}

Si tiene alguna pregunta sobre esta factura o necesita asistencia, no dude en contactarnos.

Gracias por confiar en nuestros servicios de climatización profesional.

Saludos,
TÉCNICOS CLIMATIZACIÓN S.L.

📧 info@tecnicosclimatizacion.es
📞 +34 91 123 45 67
🌐 www.tecnicosclimatizacion.es`;
  }

  /**
   * Crea un mensaje de texto simple para la factura
   */
  private crearMensajeTexto(nombreCliente: string, numeroFactura: string, totalFactura?: number): string {
    return `Hola ${nombreCliente},

Adjunto encontrará la factura ${numeroFactura} con todos los detalles de los servicios realizados.

DETALLES DE LA FACTURA:
- Número: ${numeroFactura}
- Fecha: ${new Date().toLocaleDateString('es-ES')}
- Total: €${(totalFactura || 0).toFixed(2)}

El archivo PDF está adjunto a este correo electrónico.

Si tiene alguna pregunta sobre esta factura o necesita asistencia, no dude en contactarnos.

Gracias por confiar en nuestros servicios de climatización profesional.

Saludos,
TÉCNICOS CLIMATIZACIÓN S.L.

📧 info@tecnicosclimatizacion.es
📞 +34 91 123 45 67
🌐 www.tecnicosclimatizacion.es`;
  }

  /**
   * Crea un mensaje HTML profesional para la factura
   */
  private crearMensajeHTML(nombreCliente: string, numeroFactura: string, pdfUrl: string, totalFactura?: number): string {
    return `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
        <div style="background-color: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 35px; padding-bottom: 20px; border-bottom: 3px solid #2563eb;">
            <h1 style="color: #2563eb; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 1px;">TÉCNICOS CLIMATIZACIÓN S.L.</h1>
            <p style="color: #64748b; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">Servicios profesionales de climatización</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Hola ${nombreCliente},</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            Le enviamos la factura <strong>${numeroFactura}</strong> con todos los detalles de los servicios realizados.
          </p>
          
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #2563eb; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);">
            <h3 style="color: #2563eb; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">📄 Factura ${numeroFactura}</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 8px 0;">
              <span style="color: #64748b; font-weight: 500;">Fecha:</span>
              <span style="color: #1e293b; font-weight: 600;">${new Date().toLocaleDateString('es-ES')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 8px 0; padding-top: 8px; border-top: 1px solid #cbd5e1;">
              <span style="color: #64748b; font-weight: 500;">Total:</span>
              <span style="color: #1e293b; font-weight: 700; font-size: 18px;">€${(totalFactura || 0).toFixed(2)}</span>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${pdfUrl}" 
               style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
                      color: white; 
                      padding: 18px 35px; 
                      text-decoration: none; 
                      border-radius: 12px; 
                      font-weight: bold; 
                      display: inline-block; 
                      font-size: 18px; 
                      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
                      transition: all 0.3s ease;
                      border: none;
                      cursor: pointer;
                      text-align: center;
                      min-width: 200px;">
              📥 DESCARGAR FACTURA PDF
            </a>
            <p style="color: #666; font-size: 12px; margin-top: 10px; font-style: italic;">
              Haga clic en el botón para descargar su factura
            </p>
          </div>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            Si tiene alguna pregunta sobre esta factura o necesita asistencia, no dude en contactarnos.
          </p>
          
          <div style="border-top: 2px solid #e2e8f0; padding-top: 25px; margin-top: 35px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 20px; border-radius: 8px;">
            <p style="color: #475569; font-size: 15px; margin: 0; text-align: center;">
              <strong style="color: #2563eb; font-size: 16px;">TÉCNICOS CLIMATIZACIÓN S.L.</strong><br>
              <span style="margin: 5px 0; display: block;">📧 info@tecnicosclimatizacion.es</span>
              <span style="margin: 5px 0; display: block;">📞 +34 91 123 45 67</span>
              <span style="margin: 5px 0; display: block;">🌐 www.tecnicosclimatizacion.es</span>
            </p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Crea un enlace de descarga temporal para el PDF
   */
  private async crearEnlaceDescargaPDF(pdfBlob: Blob, numeroFactura: string): Promise<string> {
    try {
      // Crear un objeto URL temporal para el PDF
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Crear un enlace de descarga
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `factura_${numeroFactura}.pdf`;
      
      // Simular clic para descargar (opcional)
      // link.click();
      
      console.log('📄 Enlace de descarga creado:', pdfUrl);
      return pdfUrl;
      
    } catch (error) {
      console.error('❌ Error al crear enlace de descarga:', error);
      // Fallback: crear un enlace de descarga directo
      return `data:application/pdf;base64,${await this.convertirBlobABase64(pdfBlob)}`;
    }
  }

  /**
   * Convierte un Blob a base64
   */
  private async convertirBlobABase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remover el prefijo "data:application/pdf;base64,"
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Verifica si el servicio de correo está configurado correctamente
   */
  verificarConfiguracion(): boolean {
    return !!(this.SERVICE_ID && this.TEMPLATE_ID && this.PUBLIC_KEY);
  }
}
