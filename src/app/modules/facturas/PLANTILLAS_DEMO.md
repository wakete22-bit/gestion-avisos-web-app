# Demostración de Plantillas de Factura

## Resumen de las Plantillas Disponibles

### 1. Plantilla Completa (`generarPdfNativo`)
**Características:**
- Diseño limpio y minimalista
- Título centrado "FACTURA" en azul
- Información básica (número y fecha) en dos columnas
- Datos de empresa y cliente organizados verticalmente
- Tabla única de servicios con columnas bien definidas
- Totales alineados a la derecha
- Footer simple con línea separadora

**Estructura Visual:**
```
┌─────────────────────────────────────────────────────────┐
│                    FACTURA                              │
├─────────────────────────────────────────────────────────┤
│ Nº FACT-001                    Fecha: 15/12/2024      │
├─────────────────────────────────────────────────────────┤
│ DATOS DE LA EMPRESA                                    │
│ TÉCNICOS CLIMATIZACIÓN S.L.                            │
│ Calle de la Tecnología, 123                           │
│ 28001 Madrid, España                                  │
│ CIF: B12345678                                        │
│ Tel: +34 91 123 45 67                                │
│ info@tecnicosclimatizacion.es                         │
├─────────────────────────────────────────────────────────┤
│ DATOS DEL CLIENTE                                      │
│ Nombre: Cliente Ejemplo                               │
│ Dirección: Calle del Cliente, 456                     │
│ CIF: A87654321                                        │
│ Email: cliente@ejemplo.com                            │
├─────────────────────────────────────────────────────────┤
│ DESCRIPCIÓN    CANT.    PRECIO    TOTAL               │
│ ────────────────────────────────────────────────────── │
│ Servicio 1      2        25.00     50.00              │
│ Repuesto A      1        15.50     15.50              │
│ ────────────────────────────────────────────────────── │
│                    Subtotal: 65.50€                   │
│                    IVA (21%): 13.76€                  │
│                    TOTAL: 79.26€                      │
├─────────────────────────────────────────────────────────┤
│ NOTAS: Trabajo realizado según especificaciones       │
├─────────────────────────────────────────────────────────┤
│ TÉCNICOS CLIMATIZACIÓN S.L. | Gracias por su confianza│
└─────────────────────────────────────────────────────────┘
```

### 2. Plantilla Simple (`generarPlantillaFacturaSimple`)
**Características:**
- Diseño ultra minimalista
- Título grande centrado "FACTURA"
- Línea decorativa bajo el título
- Información organizada en secciones simples
- Sin cajas ni bordes complejos
- Espaciado generoso entre elementos
- Footer minimalista

**Estructura Visual:**
```
┌─────────────────────────────────────────────────────────┐
│                    FACTURA                              │
│ ────────────────────────────────────────────────────── │
│                                                         │
│ Nº FACT-001                    Fecha: 15/12/2024      │
│                                                         │
│ DATOS DE LA EMPRESA                                    │
│ TÉCNICOS CLIMATIZACIÓN S.L.                            │
│ Calle de la Tecnología, 123                           │
│ 28001 Madrid, España                                  │
│ CIF: B12345678 | Tel: +34 91 123 45 67               │
│ info@tecnicosclimatizacion.es                         │
│                                                         │
│ DATOS DEL CLIENTE                                      │
│ Nombre: Cliente Ejemplo                               │
│ Dirección: Calle del Cliente, 456                     │
│ CIF: A87654321 | Email: cliente@ejemplo.com           │
│                                                         │
│ DESCRIPCIÓN    CANT.    PRECIO    TOTAL               │
│ ────────────────────────────────────────────────────── │
│ Servicio 1      2        25.00     50.00              │
│ Repuesto A      1        15.50     15.50              │
│ ────────────────────────────────────────────────────── │
│                    Subtotal: 65.50€                   │
│                    IVA (21%): 13.76€                  │
│                    TOTAL: 79.26€                      │
│                                                         │
│ NOTAS: Trabajo realizado según especificaciones       │
│                                                         │
│ ────────────────────────────────────────────────────── │
│ TÉCNICOS CLIMATIZACIÓN S.L. | Gracias por su confianza│
└─────────────────────────────────────────────────────────┘
```

### 3. Plantilla Profesional (`generarPlantillaFacturaProfesional`)
**Características:**
- Header con fondo azul y título blanco
- Cajas organizadas para datos de empresa y factura
- Diseño en dos columnas para optimizar espacio
- Tabla de servicios con filas alternadas
- Caja de totales destacada en azul claro
- Footer profesional con información completa
- Elementos visuales como rectángulos y líneas

**Estructura Visual:**
```
┌─────────────────────────────────────────────────────────┐
│ ██████████████████████████████████████████████████████ │
│ ████████████████████ FACTURA ████████████████████████ │
│ ██████████████████████████████████████████████████████ │
│                                                         │
│ ┌─────────────────────┐  ┌─────────────────────────────┐ │
│ │ DATOS DE LA EMPRESA │  │ INFORMACIÓN DE LA FACTURA   │ │
│ │ ┌─────────────────┐ │  │ ┌─────────────────────────┐ │ │
│ │ │ TÉCNICOS       │ │  │ │ Fecha: 15/12/2024      │ │ │
│ │ │ CLIMATIZACIÓN   │ │  │ │ Estado: Completado      │ │ │
│ │ │ Calle de la    │ │  │ │ Cliente ID: CL001       │ │ │
│ │ │ Tecnología, 123│ │  │ │                         │ │ │
│ │ │ 28001 Madrid   │ │  │ │                         │ │ │
│ │ │ CIF: B12345678 │ │  │ │                         │ │ │
│ │ │ info@...       │ │  │ │                         │ │ │
│ │ │ +34 91 123...  │ │  │ │                         │ │ │
│ │ └─────────────────┘ │  │ └─────────────────────────┘ │ │
│ └─────────────────────┘  └─────────────────────────────┘ │
│                                                         │
│ DATOS DEL CLIENTE                                        │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Nombre: Cliente Ejemplo                             │ │
│ │ Dirección: Calle del Cliente, 456                   │ │
│ │ ────────────────────────────────────────────────── │ │
│ │ CIF: A87654321 | Email: cliente@ejemplo.com         │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ DETALLE DE SERVICIOS                                    │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ DESCRIPCIÓN    CANT.    PRECIO    TOTAL           │ │
│ │ Servicio 1      2        25.00     50.00          │ │
│ │ Repuesto A      1        15.50     15.50          │ │
│ │ ────────────────────────────────────────────────── │ │
│ │ TOTAL SERVICIOS                   65.50€          │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│                    ┌─────────────────────────┐          │
│                    │ RESUMEN DE LA FACTURA   │          │
│                    │ ──────────────────────── │          │
│                    │ Subtotal: 65.50€        │          │
│                    │ IVA (21%): 13.76€       │          │
│                    │ ──────────────────────── │          │
│                    │ TOTAL: 79.26€            │          │
│                    └─────────────────────────┘          │
│                                                         │
│ NOTAS ADICIONALES                                        │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Trabajo realizado según especificaciones           │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ────────────────────────────────────────────────────── │
│ TÉCNICOS CLIMATIZACIÓN S.L. | +34 91 123 45 67 | info@│
│ CIF: B12345678 | www.tecnicosclimatizacion.es         │
└─────────────────────────────────────────────────────────┘
```

## Ventajas de Cada Plantilla

### Plantilla Completa
✅ **Ventajas:**
- Diseño limpio y fácil de leer
- Espaciado consistente
- Sin elementos que se superpongan
- Ideal para facturas básicas

❌ **Desventajas:**
- Menos visualmente atractiva
- No destaca elementos importantes

### Plantilla Simple
✅ **Ventajas:**
- Ultra minimalista
- Máxima legibilidad
- Espaciado generoso
- Perfecta para facturas informales

❌ **Desventajas:**
- Puede parecer muy básica
- No aprovecha bien el espacio

### Plantilla Profesional
✅ **Ventajas:**
- Diseño visual atractivo
- Organización clara en columnas
- Elementos destacados
- Ideal para empresas profesionales

❌ **Desventajas:**
- Más compleja de mantener
- Requiere más espacio

## Recomendaciones de Uso

- **Plantilla Completa**: Para uso interno y facturas básicas
- **Plantilla Simple**: Para facturas informales o clientes que prefieren simplicidad
- **Plantilla Profesional**: Para facturas oficiales y presentación a clientes importantes

## Notas Técnicas

- Todas las plantillas usan coordenadas en milímetros (mm)
- El tamaño de página es A4 (210mm x 297mm)
- Los márgenes están optimizados para evitar cortes
- Se incluyen funciones helper para dibujar elementos comunes
- El sistema maneja automáticamente el salto de página si es necesario
