# Servicio de Envío de Facturas por Email

Este servicio permite enviar facturas en formato PDF por correo electrónico a los clientes utilizando EmailJS.

## Características

- ✅ **Gratuito** - EmailJS ofrece 200 emails/mes gratis
- ✅ **Fácil configuración** - Solo necesitas las claves de EmailJS
- ✅ **Seguro** - No expone credenciales de email en el código
- ✅ **Compatible** - Funciona con cualquier proveedor de email
- ✅ **Adjuntos** - Soporta envío de PDFs adjuntos
- ✅ **Templates** - Permite personalizar el contenido del email

## Configuración Inicial

### 1. Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Configurar el servicio de email

1. En el dashboard, ve a "Email Services"
2. Añade tu proveedor de email (Gmail, Outlook, etc.)
3. Sigue las instrucciones para conectar tu cuenta

### 3. Crear un template

1. Ve a "Email Templates"
2. Crea un nuevo template con este contenido:

```html
Subject: {{subject}}

Hola {{to_name}},

{{message}}

{% if pdf_attachment %}
Adjunto encontrará la factura {{factura_numero}} en formato PDF.
{% endif %}

Saludos cordiales,
{{from_name}}
```

### 4. Obtener las claves

1. Ve a "Account" > "General" y copia tu **Public Key**
2. Ve a "Email Services" y copia tu **Service ID**
3. Ve a "Email Templates" y copia tu **Template ID**

### 5. Actualizar el servicio

En `src/app/core/services/email.service.ts`, reemplaza:

```typescript
private readonly SERVICE_ID = 'tu_service_id'; // Tu Service ID
private readonly TEMPLATE_ID = 'tu_template_id'; // Tu Template ID
private readonly PUBLIC_KEY = 'tu_public_key'; // Tu Public Key
```

## Uso

### Enviar factura por correo

```typescript
// En el componente ver-factura
async enviarFacturaPorCorreo() {
  const pdfBlob = await this.pdfService.generarPdfBlob(datosFactura);
  
  const resultado = await this.emailService.enviarFacturaPorCorreo(
    'cliente@email.com',
    'Nombre Cliente',
    'FACT-001',
    pdfBlob
  );
  
  if (resultado.success) {
    console.log('Factura enviada exitosamente');
  }
}
```

### Enviar correo simple

```typescript
const resultado = await this.emailService.enviarCorreoSimple(
  'cliente@email.com',
  'Asunto del correo',
  'Mensaje del correo',
  'Nombre del cliente'
);
```

## Estructura del PDF

El PDF generado incluye:

- **Header** con información de la empresa
- **Datos del cliente** (nombre, dirección, CIF, email)
- **Tabla de servicios** con repuestos, mano de obra y desplazamientos
- **Totales** (subtotal, IVA, total)
- **Notas** si las hay
- **Footer** con información de contacto

## Límites de EmailJS

- **Plan gratuito**: 200 emails/mes
- **Plan pago**: Desde $15/mes para 1,000 emails
- **Adjuntos**: Hasta 10MB por email
- **Templates**: Hasta 5 templates en plan gratuito

## Solución de problemas

### Error: "Service not found"
- Verifica que el SERVICE_ID sea correcto
- Asegúrate de que el servicio esté activo en EmailJS

### Error: "Template not found"
- Verifica que el TEMPLATE_ID sea correcto
- Asegúrate de que el template esté publicado

### Error: "Invalid public key"
- Verifica que el PUBLIC_KEY sea correcto
- Asegúrate de que la cuenta esté verificada

### El PDF no se adjunta
- Verifica que el template incluya la variable `{{pdf_attachment}}`
- Asegúrate de que el PDF se genere correctamente

## Personalización

### Modificar el template de email

1. Ve a EmailJS Dashboard > Email Templates
2. Edita tu template
3. Usa las variables disponibles:
   - `{{to_name}}` - Nombre del cliente
   - `{{to_email}}` - Email del cliente
   - `{{from_name}}` - Nombre de la empresa
   - `{{subject}}` - Asunto del correo
   - `{{message}}` - Mensaje personalizado
   - `{{factura_numero}}` - Número de factura
   - `{{pdf_attachment}}` - PDF adjunto (base64)

### Modificar el diseño del PDF

Edita el método `generarPdfBlob` en `pdf.service.ts` para personalizar:
- Colores corporativos
- Logo de la empresa
- Estructura de la factura
- Información de contacto

## Seguridad

- Las credenciales de email nunca se exponen en el código
- EmailJS maneja la autenticación de forma segura
- Los PDFs se generan localmente antes del envío
- No se almacenan datos sensibles en el cliente
