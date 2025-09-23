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
        message: mensaje || this.crearMensajeSimple(nombreCliente, numeroFactura, enlaceDescarga, totalFactura, 'factura'),
        factura_numero: numeroFactura,
        fecha_factura: new Date().toLocaleDateString('es-ES'),
        total_factura: '€' + (totalFactura || 0).toFixed(2),
        link_descarga: enlaceDescarga,
        pdf_url: enlaceDescarga,
        // Parámetros para identificar el tipo de documento
        documento_tipo: 'factura',
        documento_titulo: 'Factura',
        documento_descripcion: 'factura con todos los detalles de los servicios realizados'
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
      // Para albaranes, usar enlace directo con data URL (más simple y confiable)
      if (nombreArchivo.includes('albaran_')) {
        return await this.publicDownloadService.crearEnlaceDirecto(pdfBlob, nombreArchivo);
      }
      
      // Para facturas, usar el servicio de descarga pública
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
   * Crea un mensaje simple que se integra con la plantilla de EmailJS
   */
  private crearMensajeSimple(nombreCliente: string, numeroDocumento: string, pdfUrl: string, total?: number, tipo: 'factura' | 'albaran' | 'presupuesto' = 'factura'): string {
    const config = tipo === 'factura' ? {
      descripcion: 'factura con todos los detalles de los servicios realizados',
      mensajeAdicional: 'Si tiene alguna pregunta sobre esta factura o necesita asistencia, no dude en contactarnos.'
    } : tipo === 'albaran' ? {
      descripcion: 'albarán con todos los detalles del trabajo realizado',
      mensajeAdicional: 'Este albarán contiene el detalle del trabajo realizado, materiales utilizados y tiempo invertido. Si tiene alguna pregunta sobre este trabajo o necesita asistencia adicional, no dude en contactarnos.'
    } : {
      descripcion: 'presupuesto con la estimación detallada de materiales, mano de obra y desplazamientos',
      mensajeAdicional: 'Este presupuesto incluye todos los materiales estimados, trabajo técnico especializado, desplazamientos y condiciones del trabajo. Si tiene alguna pregunta sobre este presupuesto o desea realizar alguna modificación, no dude en contactarnos.'
    };

    return `Le enviamos el ${config.descripcion}.

${config.mensajeAdicional}

Gracias por confiar en nuestros servicios de climatización profesional.`;
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
   * Envía un albarán por correo electrónico con enlace de descarga público
   */
  async enviarAlbaranPorCorreo(
    emailCliente: string,
    nombreCliente: string,
    numeroAlbaran: string,
    pdfBlob: Blob,
    totalAlbaran?: number,
    asunto?: string,
    mensaje?: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📧 Iniciando envío de albarán por correo con enlace de descarga...');
      
      // Crear enlace de descarga público
      const nombreArchivo = `albaran_${numeroAlbaran}.pdf`;
      const enlaceDescarga = await this.crearEnlaceDescargaPublico(pdfBlob, nombreArchivo);
      
      // Preparar los parámetros del template
      const templateParams = {
        to_email: emailCliente,
        to_name: nombreCliente,
        from_name: 'TÉCNICOS CLIMATIZACIÓN S.L.',
        subject: asunto || `Albarán ${numeroAlbaran} - TÉCNICOS CLIMATIZACIÓN S.L.`,
        message: mensaje || this.crearMensajeSimple(nombreCliente, numeroAlbaran, enlaceDescarga, totalAlbaran, 'albaran'),
        factura_numero: numeroAlbaran, // Reutilizamos el campo factura_numero
        fecha_factura: new Date().toLocaleDateString('es-ES'),
        total_factura: '€' + (totalAlbaran || 0).toFixed(2),
        link_descarga: enlaceDescarga,
        pdf_url: enlaceDescarga,
        // Parámetros para identificar el tipo de documento
        documento_tipo: 'albaran',
        documento_titulo: 'Albarán',
        documento_descripcion: 'albarán con todos los detalles del trabajo realizado'
      };

      console.log('📧 Parámetros del template (albarán):', {
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

      console.log('✅ Albarán enviado exitosamente con enlace de descarga:', response);
      return {
        success: true,
        message: 'Albarán enviado correctamente con enlace de descarga'
      };

    } catch (error) {
      console.error('❌ Error al enviar albarán por correo:', error);
      return {
        success: false,
        message: 'Error al enviar el albarán. Inténtelo de nuevo.'
      };
    }
  }


  /**
   * Envía un presupuesto por correo electrónico con enlace de descarga público
   */
  async enviarPresupuestoPorCorreo(
    emailCliente: string,
    nombreCliente: string,
    numeroPresupuesto: string,
    pdfBlob: Blob,
    totalPresupuesto?: number,
    asunto?: string,
    mensaje?: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📧 Iniciando envío de presupuesto por correo con enlace de descarga...');
      
      // Crear enlace de descarga público
      const nombreArchivo = `presupuesto_${numeroPresupuesto}.pdf`;
      const enlaceDescarga = await this.crearEnlaceDescargaPublico(pdfBlob, nombreArchivo);
      
      // Preparar los parámetros del template
      const templateParams = {
        to_email: emailCliente,
        to_name: nombreCliente,
        from_name: 'TÉCNICOS CLIMATIZACIÓN S.L.',
        subject: asunto || `Presupuesto ${numeroPresupuesto} - TÉCNICOS CLIMATIZACIÓN S.L.`,
        message: mensaje || this.crearMensajeSimple(nombreCliente, numeroPresupuesto, enlaceDescarga, totalPresupuesto, 'presupuesto'),
        factura_numero: numeroPresupuesto, // Reutilizamos el campo factura_numero
        fecha_factura: new Date().toLocaleDateString('es-ES'),
        total_factura: '€' + (totalPresupuesto || 0).toFixed(2),
        link_descarga: enlaceDescarga,
        pdf_url: enlaceDescarga,
        // Parámetros para identificar el tipo de documento
        documento_tipo: 'presupuesto',
        documento_titulo: 'Presupuesto',
        documento_descripcion: 'presupuesto con la estimación detallada de materiales, mano de obra y desplazamientos'
      };

      console.log('📧 Parámetros del template (presupuesto):', {
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

      console.log('✅ Presupuesto enviado exitosamente con enlace de descarga:', response);
      return {
        success: true,
        message: 'Presupuesto enviado correctamente con enlace de descarga'
      };

    } catch (error) {
      console.error('❌ Error al enviar presupuesto por correo:', error);
      return {
        success: false,
        message: 'Error al enviar el presupuesto. Inténtelo de nuevo.'
      };
    }
  }

  /**
   * Verifica si el servicio de correo está configurado correctamente
   */
  verificarConfiguracion(): boolean {
    return !!(this.SERVICE_ID && this.TEMPLATE_ID && this.PUBLIC_KEY);
  }
}
