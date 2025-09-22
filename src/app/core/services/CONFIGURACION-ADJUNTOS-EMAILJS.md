# 📎 Configuración de Adjuntos PDF en EmailJS

## 🔧 **Configuración del Template en EmailJS**

Para que los adjuntos PDF funcionen correctamente, necesitas configurar el template en EmailJS:

### **1. Ir a EmailJS Dashboard:**
- Ve a [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
- Inicia sesión con tu cuenta
- Ve a **"Email Templates"**
- Selecciona tu template `template_s8jrauj`

### **2. Configurar el Template:**

#### **En la sección "To Email" (Destinatario):**
- Configura: `{{to_email}}`

#### **En la sección "Subject" (Asunto):**
- Configura: `{{subject}}`

#### **En el cuerpo del email:**
- Configura: `{{message}}`

#### **En la sección "Attachments" (Adjuntos):**
- Haz clic en **"Add Attachment"**
- Selecciona **"Variable Attachment"**
- Configura los siguientes parámetros:

| Campo | Valor | Descripción |
|-------|-------|-------------|
| **Parameter Name** | `pdf_attachment` | Nombre del parámetro que contiene el PDF en base64 |
| **Filename** | `{{pdf_filename}}` | Nombre del archivo PDF |
| **MIME Type** | `{{pdf_mime_type}}` | Tipo MIME del archivo (application/pdf) |

### **3. Estructura del Template:**

```html
<!-- Cuerpo del email -->
{{message}}

<!-- Adjunto PDF -->
<!-- El PDF se adjunta automáticamente usando los parámetros configurados -->
```

### **4. Parámetros que se envían desde la aplicación:**

```javascript
const templateParams = {
  to_email: 'cliente@email.com',
  to_name: 'Nombre Cliente',
  from_name: 'TÉCNICOS CLIMATIZACIÓN S.L.',
  subject: 'Factura F2025-175 - TÉCNICOS CLIMATIZACIÓN S.L.',
  message: 'Mensaje de texto...',
  factura_numero: 'F2025-175',
  fecha_factura: '15/01/2025',
  total_factura: '€88.26',
  // Parámetros para el adjunto PDF
  pdf_attachment: 'base64_string_del_pdf',
  pdf_filename: 'factura_F2025-175.pdf',
  pdf_mime_type: 'application/pdf'
};
```

## ✅ **Verificación:**

1. **Configura el template** con los parámetros de adjunto
2. **Guarda el template** en EmailJS
3. **Prueba el botón verde** "Enviar con PDF" en la aplicación
4. **Verifica que el PDF** se adjunte correctamente al email

## 🚨 **Notas Importantes:**

- El PDF se convierte a **base64** antes de enviarse
- El **tamaño máximo** del PDF está limitado por EmailJS
- El **tipo MIME** debe ser exactamente `application/pdf`
- El **nombre del archivo** debe incluir la extensión `.pdf`

## 🔍 **Solución de Problemas:**

Si el PDF no se adjunta:
1. Verifica que el template tenga configurado el **Variable Attachment**
2. Confirma que los **nombres de parámetros** coincidan exactamente
3. Revisa la **consola del navegador** para errores
4. Verifica que el **PDF se genere correctamente** antes del envío
