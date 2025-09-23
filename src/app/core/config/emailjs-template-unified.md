# 📧 Plantilla Unificada EmailJS - Facturas y Albaranes

## 🎯 **Descripción**

Se ha configurado un sistema que envía mensajes simples de texto que se integran perfectamente con la plantilla HTML de EmailJS, adaptándose automáticamente para enviar tanto **facturas** como **albaranes** usando la misma plantilla.

## 🔧 **Configuración en EmailJS**

### **1. Configurar la Plantilla en EmailJS Dashboard**

Ve a [EmailJS Dashboard](https://www.emailjs.com/dashboard) y actualiza tu plantilla con este contenido:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #333; padding: 20px 14px; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <!-- Header con logo -->
    <div style="text-align: center; background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 20px; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">TÉCNICOS CLIMATIZACIÓN S.L.</h1>
      <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 14px;">Servicios de climatización profesional</p>
    </div>
    
    <!-- Contenido principal -->
    <div style="padding: 30px;">
      <h2 style="font-size: 20px; margin-bottom: 20px; color: #1f2937;">{{documento_titulo}} {{factura_numero}}</h2>
      
      <p style="margin-bottom: 16px; line-height: 1.6;">
        Estimado/a <strong>{{to_name}}</strong>,
      </p>
      
      <p style="margin-bottom: 16px; line-height: 1.6;">
        {{message}}
      </p>
      
      <!-- Información del documento -->
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #4f46e5;">
        <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 16px;">Detalles del {{documento_titulo}}</h3>
        <p style="margin: 4px 0; color: #6b7280;"><strong>Número:</strong> {{factura_numero}}</p>
        <p style="margin: 4px 0; color: #6b7280;"><strong>Fecha:</strong> {{fecha_factura}}</p>
        <p style="margin: 4px 0; color: #6b7280;"><strong>Total:</strong> {{total_factura}}</p>
      </div>
      
      <!-- Botón de descarga -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{link_descarga}}" style="display: inline-block; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
          📄 Descargar {{documento_titulo}} PDF
        </a>
      </div>
      
      <!-- Información adicional -->
      <div style="background-color: #fef3c7; padding: 16px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b;">
        <p style="margin: 0; color: #92400e; font-size: 14px;">
          <strong>Importante:</strong> Este {{documento_titulo}} está adjunto en formato PDF. Si no puede ver el archivo adjunto, utilice el botón de descarga anterior.
        </p>
      </div>
      
      <p style="margin-bottom: 16px; line-height: 1.6;">
        Si tiene alguna pregunta sobre este {{documento_titulo}} o necesita aclaraciones, no dude en contactarnos.
      </p>
      
      <p style="margin-bottom: 0; line-height: 1.6;">
        Saludos cordiales,<br>
        <strong>{{from_name}}</strong><br>
        <span style="color: #6b7280; font-size: 13px;">Equipo de TÉCNICOS CLIMATIZACIÓN S.L.</span>
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
      <div style="text-align: center; margin-bottom: 16px;">
        <p style="margin: 0; color: #374151; font-weight: 600;">Información de Contacto</p>
      </div>
      <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 16px;">
        <div style="text-align: center;">
          <p style="margin: 0; color: #6b7280; font-size: 13px;"><strong>Teléfono</strong></p>
          <p style="margin: 4px 0 0 0; color: #374151; font-size: 14px;">+34 91 123 45 67</p>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0; color: #6b7280; font-size: 13px;"><strong>Email</strong></p>
          <p style="margin: 4px 0 0 0; color: #374151; font-size: 14px;">info@tecnicosclimatizacion.es</p>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0; color: #6b7280; font-size: 13px;"><strong>Web</strong></p>
          <p style="margin: 4px 0 0 0; color: #374151; font-size: 14px;">www.tecnicosclimatizacion.es</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Footer legal -->
  <div style="max-width: 600px; margin: 20px auto 0 auto; text-align: center;">
    <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.4;">
      Este correo fue enviado a <strong>{{to_email}}</strong><br>
      TÉCNICOS CLIMATIZACIÓN S.L. - CIF: B12345678<br>
      Calle de la Tecnología, 123 - 28001 Madrid, España
    </p>
  </div>
</div>
```

### **2. Parámetros de la Plantilla**

La plantilla utiliza los siguientes parámetros:

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `to_name` | Nombre del cliente | "Juan Pérez" |
| `to_email` | Email del cliente | "juan@email.com" |
| `from_name` | Nombre del remitente | "TÉCNICOS CLIMATIZACIÓN S.L." |
| `subject` | Asunto del correo | "Factura F001 - TÉCNICOS CLIMATIZACIÓN S.L." |
| `message` | Mensaje HTML del correo | HTML generado automáticamente |
| `factura_numero` | Número del documento | "F001" o "A001" |
| `fecha_factura` | Fecha del documento | "15/12/2023" |
| `total_factura` | Total del documento | "€150.00" |
| `link_descarga` | Enlace de descarga | "https://..." |
| `pdf_url` | URL del PDF | "https://..." |
| `documento_tipo` | Tipo de documento | "factura" o "albaran" |
| `documento_titulo` | Título del documento | "Factura" o "Albarán" |
| `documento_descripcion` | Descripción del documento | "factura con todos los detalles..." |

## 🎨 **Adaptación Automática**

### **Para Facturas:**
- **Mensaje**: "factura con todos los detalles de los servicios realizados"
- **Enfoque**: Servicios realizados y facturación

### **Para Albaranes:**
- **Mensaje**: "albarán con todos los detalles del trabajo realizado"
- **Enfoque**: Trabajo realizado, materiales y tiempo invertido

**Nota**: Los colores y el diseño visual se manejan completamente en la plantilla de EmailJS, no en el código.

## 🚀 **Uso en el Código**

### **Enviar Factura:**
```typescript
await this.emailService.enviarFacturaPorCorreo(
  emailCliente,
  nombreCliente,
  numeroFactura,
  pdfBlob,
  totalFactura
);
```

### **Enviar Albarán:**
```typescript
await this.emailService.enviarAlbaranPorCorreo(
  emailCliente,
  nombreCliente,
  numeroAlbaran,
  pdfBlob,
  totalAlbaran
);
```

## ✅ **Ventajas**

1. **Una sola plantilla** para ambos tipos de documento
2. **Adaptación automática** de colores y textos
3. **Mantenimiento simplificado**
4. **Consistencia visual**
5. **Reutilización de parámetros** de EmailJS

## 🔍 **Verificación**

Para verificar que funciona correctamente:

1. Envía una factura de prueba
2. Envía un albarán de prueba
3. Verifica que los colores y textos cambien automáticamente
4. Confirma que el enlace de descarga funcione

## 📝 **Notas Importantes**

- La plantilla se genera dinámicamente en el código TypeScript
- Los colores se aplican automáticamente según el tipo de documento
- El HTML generado se envía como parámetro `message` a EmailJS
- La plantilla base en EmailJS debe usar los parámetros mostrados arriba
