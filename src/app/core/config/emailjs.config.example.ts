/**
 * Configuración de ejemplo para EmailJS
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 
 * 1. Ve a https://www.emailjs.com/ y crea una cuenta gratuita
 * 2. En el dashboard, ve a "Email Services" y conecta tu proveedor de email
 * 3. Ve a "Email Templates" y crea un template con este contenido:
 * 
 * Subject: {{subject}}
 * 
 * Hola {{to_name}},
 * 
 * {{message}}
 * 
 * {% if pdf_attachment %}
 * Adjunto encontrará la factura {{factura_numero}} en formato PDF.
 * {% endif %}
 * 
 * Saludos cordiales,
 * {{from_name}}
 * 
 * 4. Ve a "Account" > "General" y copia tu Public Key
 * 5. Ve a "Email Services" y copia tu Service ID
 * 6. Ve a "Email Templates" y copia tu Template ID
 * 7. Reemplaza los valores en email.service.ts
 */

export const EMAILJS_CONFIG = {
  // Reemplazar con tus claves de EmailJS
  SERVICE_ID: 'tu_service_id',
  TEMPLATE_ID: 'tu_template_id', 
  PUBLIC_KEY: 'tu_public_key'
};

/**
 * Template de correo recomendado para EmailJS:
 * 
 * Subject: Factura {{factura_numero}} - {{from_name}}
 * 
 * Estimado/a {{to_name}},
 * 
 * {{message}}
 * 
 * Adjunto encontrará la factura {{factura_numero}} en formato PDF.
 * 
 * Si tiene alguna pregunta, no dude en contactarnos.
 * 
 * Saludos cordiales,
 * {{from_name}}
 * 
 * ---
 * {{from_name}}
 * Teléfono: +34 91 123 45 67
 * Email: info@tecnicosclimatizacion.es
 * Web: www.tecnicosclimatizacion.es
 */
