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
        message: mensaje || this.crearMensajeConEnlace(nombreCliente, numeroFactura, enlaceDescarga, totalFactura),
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 28px;">TÉCNICOS CLIMATIZACIÓN S.L.</h1>
            <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Servicios profesionales de climatización</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Hola ${nombreCliente},</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            Le enviamos la factura <strong>${numeroFactura}</strong> con todos los detalles de los servicios realizados.
          </p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h3 style="color: #2563eb; margin: 0 0 10px 0; font-size: 18px;">📄 Factura ${numeroFactura}</h3>
            <p style="margin: 5px 0; color: #555;">
              <strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')}
            </p>
            <p style="margin: 5px 0; color: #555;">
              <strong>Total:</strong> €${(totalFactura || 0).toFixed(2)}
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${pdfUrl}" 
               style="background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
              📥 Descargar Factura PDF
            </a>
          </div>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            Si tiene alguna pregunta sobre esta factura o necesita asistencia, no dude en contactarnos.
          </p>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              <strong>TÉCNICOS CLIMATIZACIÓN S.L.</strong><br>
              📧 info@tecnicosclimatizacion.es<br>
              📞 +34 91 123 45 67<br>
              🌐 www.tecnicosclimatizacion.es
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
