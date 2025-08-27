# 📋 TODO - Sistema de Gestión de Avisos

## ✅ **COMPLETADAS**

### **1. Sistema de Repuestos en Facturas** ✅
- ✅ Corregir visualización de repuestos en facturas que aparecían como JSON crudo
- ✅ Modificar AlbaranesService para guardar repuestos en tabla repuestos_albaran en lugar de como JSON
- ✅ Mejorar lógica de procesamiento de repuestos en flujo-avisos.service.ts para manejar diferentes formatos
- ✅ Actualizar VerAlbaranModalComponent para usar nueva estructura de repuestos con fallback a legacy
- ✅ **NUEVO**: Implementar sistema de actualización automática de stock del inventario

### **2. Sistema de Consolidación de Albaranes** ✅
- ✅ Sistema que consolida múltiples albaranes en una única factura
- ✅ Suma automática de horas de trabajo de todos los albaranes
- ✅ Consolidación de repuestos utilizados en todos los albaranes
- ✅ Cálculo automático de totales y subtotales

### **3. Gestión de Estados** ✅
- ✅ Botón para cambiar estado de factura (Pendiente → En curso → Completado)
- ✅ Actualización automática del estado del aviso cuando se completa una factura
- ✅ Layout responsive para botones de acción en móvil

## 🔄 **EN PROGRESO**

### **4. Sistema de Stock del Inventario** 🔄
- ✅ **COMPLETADO**: Actualización automática de stock al crear albaranes
- ✅ **COMPLETADO**: Validaciones de stock disponible
- ✅ **COMPLETADO**: Indicadores visuales de stock (normal/bajo/crítico)
- ✅ **COMPLETADO**: Prevención de uso de productos sin stock
- 🔄 **PENDIENTE**: Crear un nuevo albarán y verificar que los repuestos se muestren correctamente en la factura

## 🚀 **PRÓXIMAS MEJORAS SUGERIDAS**

### **5. Sistema de Notificaciones**
- [ ] Alertas de stock bajo por email/notificación
- [ ] Notificaciones cuando se complete un aviso
- [ ] Recordatorios de albaranes pendientes

### **6. Dashboard de Inventario**
- [ ] Métricas en tiempo real del inventario
- [ ] Gráficos de consumo de materiales
- [ ] Alertas de stock crítico

### **7. Historial de Movimientos**
- [ ] Trazabilidad completa de uso de materiales
- [ ] Historial de cambios de estado
- [ ] Auditoría de modificaciones

---

**Última actualización**: Diciembre 2024
**Estado general**: 🟢 **95% COMPLETADO**
**Próximo objetivo**: Probar el sistema completo de stock y facturación
