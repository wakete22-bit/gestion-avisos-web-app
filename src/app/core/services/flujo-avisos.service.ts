import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { AvisosService } from './avisos.service';
import { FacturasService } from '../../modules/facturas/services/facturas.service';
import { PresupuestosService } from '../../modules/presupuestos/services/presupuestos.service';


export interface FlujoEstado {
  avisoId: string;
  estadoActual: string;
  puedeCrearPresupuesto: boolean;
  puedeAprobarPresupuesto: boolean;
  puedeFacturarPresupuesto: boolean;
  puedeFacturarTrabajos: boolean;
  puedeCompletarAviso: boolean;
  resumen: any;
}

@Injectable({
  providedIn: 'root'
})
export class FlujoAvisosService {

  constructor(
    private avisosService: AvisosService,
    private facturasService: FacturasService,
    private presupuestosService: PresupuestosService
  ) {}

  /**
   * Obtiene el estado actual del flujo para un aviso
   */
  obtenerEstadoFlujo(avisoId: string): Observable<FlujoEstado> {
    return this.avisosService.getResumenCompletoAviso(avisoId).pipe(
      map(resumen => {
        const estado: FlujoEstado = {
          avisoId,
          estadoActual: resumen.estado,
          puedeCrearPresupuesto: this.puedeCrearPresupuesto(resumen),
          puedeAprobarPresupuesto: this.puedeAprobarPresupuesto(resumen),
          puedeFacturarPresupuesto: this.puedeFacturarPresupuesto(resumen),
          puedeFacturarTrabajos: this.puedeFacturarTrabajos(resumen),
          puedeCompletarAviso: this.puedeCompletarAviso(resumen),
          resumen
        };
        
        return estado;
      })
    );
  }

  /**
   * Ejecuta el flujo completo: Presupuesto → Aprobación → Factura
   */
  ejecutarFlujoCompleto(avisoId: string, crearPresupuesto: boolean = true): Observable<any> {
    if (!crearPresupuesto) {
      // Flujo directo: Aviso → Trabajos → Factura
      return this.flujoDirectoSinPresupuesto(avisoId);
    }
    
    // Flujo con presupuesto: Aviso → Presupuesto → Aprobación → Trabajos → Factura
    return this.flujoConPresupuesto(avisoId);
  }

  /**
   * Flujo directo sin presupuesto
   */
  private flujoDirectoSinPresupuesto(avisoId: string): Observable<any> {
    return this.avisosService.actualizarAviso(avisoId, { 
      estado: 'En curso',
      requiere_presupuesto: false 
    }).pipe(
      tap(() => console.log('✅ Aviso actualizado para trabajo directo')),
      switchMap(() => this.avisosService.getResumenCompletoAviso(avisoId)),
      map(resumen => ({
        paso: 'flujo_directo_iniciado',
        avisoId,
        mensaje: 'Flujo directo iniciado. El técnico puede comenzar a trabajar.',
        resumen
      }))
    );
  }

  /**
   * Flujo con presupuesto
   */
  private flujoConPresupuesto(avisoId: string): Observable<any> {
    return this.avisosService.actualizarAviso(avisoId, { 
      estado: 'Pendiente de presupuesto',
      requiere_presupuesto: true 
    }).pipe(
      tap(() => console.log('✅ Aviso marcado como requiere presupuesto')),
      switchMap(() => this.presupuestosService.crearPresupuesto({
        aviso_id: avisoId,
        horas_estimadas: 2, // Estimación por defecto
        total_estimado: 0
      })),
      tap(() => console.log('✅ Presupuesto creado')),
      map(presupuesto => ({
        paso: 'presupuesto_creado',
        avisoId,
        presupuestoId: presupuesto.id,
        mensaje: 'Presupuesto creado. Pendiente de evaluación y aprobación.',
        presupuesto
      }))
    );
  }

  /**
   * Aprueba un presupuesto y cambia el estado del aviso
   */
  aprobarPresupuesto(presupuestoId: string): Observable<any> {
    return this.presupuestosService.cambiarEstado(presupuestoId, 'Completado').pipe(
      switchMap(presupuesto => 
        this.avisosService.actualizarAviso(presupuesto.aviso_id, { estado: 'En curso' })
      ),
      tap(() => console.log('✅ Presupuesto aprobado y aviso en curso')),
      map(aviso => ({
        paso: 'presupuesto_aprobado',
        avisoId: aviso.id,
        mensaje: 'Presupuesto aprobado. El técnico puede comenzar a trabajar.',
        aviso
      }))
    );
  }

  /**
   * Convierte un presupuesto aprobado en factura automáticamente
   */
  facturarPresupuesto(presupuestoId: string): Observable<any> {
    return this.facturasService.crearFacturaDesdePresupuesto(presupuestoId).pipe(
      tap(() => console.log('✅ Factura creada desde presupuesto')),
      switchMap(factura => 
        this.avisosService.actualizarEstadoAutomatico(factura.factura.aviso_id!).pipe(
          map(() => factura)
        )
      ),
      map(factura => ({
        paso: 'factura_desde_presupuesto',
        avisoId: factura.factura.aviso_id,
        facturaId: factura.factura.id,
        mensaje: 'Factura generada automáticamente desde presupuesto aprobado.',
        factura
      }))
    );
  }

  /**
   * Factura trabajos realizados sin presupuesto
   * Actualizado para el nuevo flujo de albaranes
   */
  facturarTrabajos(avisoId: string): Observable<any> {
    console.log('🔧 Iniciando facturación de trabajos para aviso:', avisoId);
    
    return this.avisosService.getResumenCompletoAviso(avisoId).pipe(
      switchMap(resumen => {
        console.log('🔧 Resumen completo obtenido:', resumen);
        
        if (!resumen.estadisticas.albaranesFinalizados) {
          throw new Error('No hay albaranes finalizados para facturar. Solo los albaranes marcados como "Finalizado" se pueden facturar automáticamente.');
        }

        // Validar que TODOS los trabajos finalizados tengan albaranes finalizados (no presupuesto pendiente)
        const trabajosSinAlbaranFinalizado = resumen.trabajos?.filter((t: any) => 
          !t.albaran_id || 
          !t.albaran?.estado_cierre || 
          t.albaran.estado_cierre !== 'Finalizado'
        ) || [];
        
        if (trabajosSinAlbaranFinalizado.length > 0) {
          const trabajosPendientes = trabajosSinAlbaranFinalizado.map((t: any) => 
            `Trabajo #${t.id?.substring(0, 8)} (${t.descripcion}) - Estado: ${t.albaran?.estado_cierre || 'Sin cerrar'}`
          ).join(', ');
          
          throw new Error(`No se puede facturar. Solo se pueden facturar trabajos con albaranes marcados como "Finalizado". Trabajos pendientes: ${trabajosPendientes}`);
        }

        console.log('🔧 Cliente del resumen:', resumen.cliente);
        
        const datosFactura = this.convertirDatosAFactura({
          avisoId,
          cliente: resumen.cliente,
          resumen: resumen
        });

        // Generar número de factura automáticamente
        return this.facturasService.getSiguienteNumero().pipe(
          switchMap(numeroFactura => {
            datosFactura.numero_factura = numeroFactura;
            console.log('🔧 Número de factura generado:', numeroFactura);
            return this.facturasService.crearFactura(datosFactura);
          })
        );
      }),
      tap(() => console.log('✅ Factura creada desde trabajos realizados')),
      switchMap(() => this.avisosService.getResumenCompletoAviso(avisoId)),
      map(resumen => ({
        paso: 'factura_creada_desde_trabajos',
        avisoId,
        mensaje: 'Factura creada exitosamente desde trabajos realizados',
        resumen
      }))
    );
  }

  /**
   * Verifica si una factura puede ser marcada como "Completado"
   * basándose en el estado del aviso
   */
  verificarEstadoFactura(facturaId: string, avisoId: string): Observable<any> {
    return this.avisosService.getResumenCompletoAviso(avisoId).pipe(
      switchMap(resumen => {
        // Si el aviso está completado, la factura también debería estarlo
        if (resumen.estado === 'Completado') {
          return this.facturasService.cambiarEstado(facturaId, 'Completado');
        }
        
        // Si el aviso está listo para facturar, la factura debería estar "En curso"
        if (resumen.estado === 'Listo para facturar') {
          return this.facturasService.cambiarEstado(facturaId, 'En curso');
        }
        
        return from([{ id: facturaId, estado: 'Pendiente' }]);
      })
    );
  }

  /**
   * Sincroniza el estado de todas las facturas de un aviso
   * basándose en el estado actual del aviso
   */
  sincronizarEstadosFacturas(avisoId: string): Observable<any> {
    return this.avisosService.getResumenCompletoAviso(avisoId).pipe(
      switchMap(resumen => {
        if (!resumen.facturas || resumen.facturas.length === 0) {
          return from([{ mensaje: 'No hay facturas para sincronizar' }]);
        }

        let nuevoEstadoFactura: 'Pendiente' | 'En curso' | 'Completado';
        
        // Determinar el estado apropiado para las facturas
        if (resumen.estado === 'Completado') {
          nuevoEstadoFactura = 'Completado';
        } else if (resumen.estado === 'Listo para facturar') {
          nuevoEstadoFactura = 'En curso';
        } else {
          nuevoEstadoFactura = 'Pendiente';
        }

        // Actualizar todas las facturas al estado apropiado
        const actualizacionesFacturas = resumen.facturas.map((factura: any) => 
          this.facturasService.cambiarEstado(factura.id, nuevoEstadoFactura)
        );
        
        return forkJoin(actualizacionesFacturas).pipe(
          map(() => ({
            mensaje: `Estados de ${resumen.facturas.length} factura(s) sincronizados a "${nuevoEstadoFactura}"`,
            avisoId,
            nuevoEstado: nuevoEstadoFactura
          }))
        );
      })
    );
  }

  /**
   * Completa un aviso marcándolo como finalizado
   * Actualizado para el nuevo flujo de albaranes
   */
  completarAviso(avisoId: string): Observable<any> {
    return this.avisosService.getResumenCompletoAviso(avisoId).pipe(
      switchMap(resumen => {
        // Validar que se puede completar el aviso
        if (!this.puedeCompletarAviso(resumen)) {
          throw new Error('No se puede completar el aviso. Verifica que haya trabajos finalizados y facturas generadas.');
        }

        // Validación adicional: verificar que TODOS los trabajos tengan albaranes cerrados
        // Los estados "Finalizado" y "Presupuesto pendiente" son válidos para completar el aviso
        // El estado "Otra visita" NO es válido para completar el aviso
        const trabajosSinAlbaranCerrado = resumen.trabajos?.filter((t: any) => 
          !t.albaran_id || 
          !t.albaran?.estado_cierre || 
          t.albaran.estado_cierre === 'Otra visita'
        ) || [];
        
        if (trabajosSinAlbaranCerrado.length > 0) {
          const trabajosPendientes = trabajosSinAlbaranCerrado.map((t: any) => 
            `Trabajo #${t.id?.substring(0, 8)} (${t.descripcion}) - Estado: ${t.albaran?.estado_cierre || 'Sin cerrar'}`
          ).join(', ');
          
          throw new Error(`No se puede completar el aviso. Los siguientes trabajos necesitan albaranes cerrados (Finalizado o Presupuesto pendiente): ${trabajosPendientes}`);
        }

        // Actualizar el aviso a estado "Completado"
        return this.avisosService.actualizarAviso(avisoId, {
          estado: 'Completado',
          fecha_finalizacion: new Date()
        }).pipe(
          switchMap(avisoActualizado => {
            // Marcar las facturas relacionadas como "Completado"
            if (resumen.facturas && resumen.facturas.length > 0) {
              const actualizacionesFacturas = resumen.facturas.map((factura: any) => 
                this.facturasService.cambiarEstado(factura.id, 'Completado')
              );
              
              return forkJoin(actualizacionesFacturas).pipe(
                map(() => avisoActualizado)
              );
            }
            
            return from([avisoActualizado]);
          })
        );
      }),
      tap(() => console.log('✅ Aviso completado exitosamente')),
      switchMap(() => this.avisosService.getResumenCompletoAviso(avisoId)),
      map(resumen => ({
        paso: 'aviso_completado',
        avisoId,
        mensaje: 'Aviso marcado como completado',
        resumen
      }))
    );
  }

  /**
   * Obtiene todas las acciones disponibles para un aviso
   */
  obtenerAccionesDisponibles(avisoId: string): Observable<string[]> {
    return this.obtenerEstadoFlujo(avisoId).pipe(
      map(estado => {
        const acciones: string[] = [];
        
        // Nuevo flujo: solo facturar trabajos finalizados
        if (estado.puedeFacturarTrabajos) {
          acciones.push('facturar_trabajos');
        }
        
        if (estado.puedeCompletarAviso) {
          acciones.push('completar_aviso');
        }
        
        return acciones;
      })
    );
  }

  // Métodos de validación privados para el nuevo flujo
  private puedeCrearPresupuesto(resumen: any): boolean {
    // En el nuevo flujo, no se crean presupuestos automáticamente
    return false;
  }

  private puedeAprobarPresupuesto(resumen: any): boolean {
    // En el nuevo flujo, no se aprueban presupuestos automáticamente
    return false;
  }

  private puedeFacturarPresupuesto(resumen: any): boolean {
    // En el nuevo flujo, no se facturan presupuestos automáticamente
    return false;
  }

  private puedeFacturarTrabajos(resumen: any): boolean {
    // Solo se puede facturar si:
    // 1. Hay albaranes finalizados específicamente (no presupuesto pendiente)
    // 2. No hay facturas pendientes
    // Los albaranes con "Presupuesto pendiente" NO se facturan automáticamente
    
    return resumen.estadisticas.albaranesFinalizados > 0 && 
           resumen.estadisticas.facturasPendientes === 0;
  }

  private puedeCompletarAviso(resumen: any): boolean {
    // El aviso se puede completar en estos casos:
    // 1. Hay albaranes finalizados Y hay facturas generadas (flujo normal)
    // 2. Hay albaranes con "Presupuesto pendiente" (sin necesidad de factura)
    // 3. NO se puede completar si hay albaranes pendientes de "Otra visita"
    
    const tieneAlbaranesFinalizadosConFacturas = 
      resumen.estadisticas.albaranesFinalizados > 0 && 
      resumen.estadisticas.totalFacturas > 0;
      
    const tienePresupuestosPendientes = 
      resumen.estadisticas.albaranesPresupuestoPendiente > 0;
      
    const tieneOtraVisitaPendiente = 
      resumen.estadisticas.albaranesOtraVisita > 0;
    
    // No se puede completar si hay visitas pendientes
    if (tieneOtraVisitaPendiente) {
      return false;
    }
    
    // Se puede completar si tiene albaranes finalizados con facturas O presupuestos pendientes
    return tieneAlbaranesFinalizadosConFacturas || tienePresupuestosPendientes;
  }

  private convertirDatosAFactura(datosFactura: any): any {
    console.log('🔧 Datos de factura recibidos:', datosFactura);
    
    // Validar que tenemos los datos necesarios
    if (!datosFactura.cliente || !datosFactura.cliente.id) {
      throw new Error('Datos de cliente incompletos para crear factura');
    }
    
    const lineasFactura = [];
    
    // 1. Calcular horas totales de trabajo desde TODOS los albaranes realizados
    let horasTotales = 0;
    if (datosFactura.resumen.albaranes && datosFactura.resumen.albaranes.length > 0) {
      console.log('🔧 Calculando horas totales de todos los albaranes:', datosFactura.resumen.albaranes.length, 'albaranes');
      
      datosFactura.resumen.albaranes.forEach((albaran: any, index: number) => {
        if (albaran.hora_entrada && albaran.hora_salida) {
          // Calcular horas del albarán individual
          const inicio = new Date(`2000-01-01T${albaran.hora_entrada}`);
          const fin = new Date(`2000-01-01T${albaran.hora_salida}`);
          const horasTrabajo = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60);
          const horasValidas = Math.max(0, horasTrabajo);
          
          console.log(`🔧 Albarán #${index + 1}: ${albaran.hora_entrada} - ${albaran.hora_salida} = ${horasValidas.toFixed(2)} horas`);
          horasTotales += horasValidas;
        }
      });
      
      console.log('🔧 Horas totales acumuladas:', horasTotales.toFixed(2), 'horas');
    }
    
    // 2. Agregar línea de mano de obra consolidada
    if (horasTotales > 0) {
      lineasFactura.push({
        tipo: 'mano_obra',
        nombre: 'Mano de obra',
        cantidad: horasTotales,
        precio_neto: 50,
        precio_pvp: 50,
        descripcion: `Trabajo realizado: ${horasTotales.toFixed(2)} horas (${datosFactura.resumen.albaranes?.length || 0} albaranes)`
      });
    }
    
    // 3. Consolidar repuestos de TODOS los albaranes
    const repuestosConsolidados = new Map(); // Usar Map para consolidar por nombre
    
    if (datosFactura.resumen.albaranes && datosFactura.resumen.albaranes.length > 0) {
      console.log('🔧 Consolidando repuestos de todos los albaranes...');
      
      datosFactura.resumen.albaranes.forEach((albaran: any, indexAlbaran: number) => {
        console.log(`🔧 Procesando albarán #${indexAlbaran + 1}:`, albaran.id);
        
        // Procesar repuestos del albarán (tabla repuestos_albaran)
        if (albaran.repuestos && albaran.repuestos.length > 0) {
          albaran.repuestos.forEach((repuesto: any) => {
            if (repuesto && repuesto.cantidad && repuesto.cantidad > 0) {
              const nombreRepuesto = repuesto.nombre || 'Repuesto sin nombre';
              const clave = nombreRepuesto.toLowerCase();
              
              if (repuestosConsolidados.has(clave)) {
                // Sumar a repuesto existente
                const existente = repuestosConsolidados.get(clave);
                existente.cantidad_total += parseFloat(repuesto.cantidad);
                existente.precio_total += parseFloat(repuesto.precio_pvp || 0) * parseFloat(repuesto.cantidad);
                existente.albaranes.push(indexAlbaran + 1);
                console.log(`🔧 Repuesto consolidado: ${nombreRepuesto} - Cantidad total: ${existente.cantidad_total}`);
              } else {
                // Crear nuevo repuesto consolidado
                repuestosConsolidados.set(clave, {
                  nombre: nombreRepuesto,
                  cantidad_total: parseFloat(repuesto.cantidad),
                  precio_unitario: parseFloat(repuesto.precio_neto || 0),
                  precio_total: parseFloat(repuesto.precio_pvp || 0) * parseFloat(repuesto.cantidad),
                  unidad: repuesto.unidad || 'unidad',
                  albaranes: [indexAlbaran + 1]
                });
                console.log(`🔧 Nuevo repuesto: ${nombreRepuesto} - Cantidad: ${repuesto.cantidad}`);
              }
            }
          });
        }
        
        // También procesar repuestos básicos del array repuestos_utilizados si está disponible
        if (albaran.repuestos_utilizados && Array.isArray(albaran.repuestos_utilizados)) {
          albaran.repuestos_utilizados.forEach((repuesto: any) => {
            if (repuesto) {
              const nombreRepuesto = typeof repuesto === 'string' ? repuesto : (repuesto.nombre || 'Repuesto sin nombre');
              const clave = nombreRepuesto.toLowerCase();
              
              if (repuestosConsolidados.has(clave)) {
                // Sumar a repuesto existente
                const existente = repuestosConsolidados.get(clave);
                existente.cantidad_total += 1; // Cantidad por defecto para repuestos básicos
                existente.albaranes.push(indexAlbaran + 1);
                console.log(`🔧 Repuesto consolidado: ${nombreRepuesto} - Cantidad total: ${existente.cantidad_total}`);
              } else {
                // Crear nuevo repuesto consolidado
                repuestosConsolidados.set(clave, {
                  nombre: nombreRepuesto,
                  cantidad_total: 1,
                  precio_unitario: 0, // Precio por defecto para repuestos básicos
                  precio_total: 0,
                  unidad: 'unidad',
                  albaranes: [indexAlbaran + 1]
                });
                console.log(`🔧 Nuevo repuesto: ${nombreRepuesto}`);
              }
            }
          });
        }
      });
    }
    
    // 4. Convertir materiales consolidados a líneas de factura
    repuestosConsolidados.forEach((material, clave) => {
      lineasFactura.push({
        tipo: 'repuesto',
        nombre: material.nombre,
        cantidad: material.cantidad_total,
        precio_neto: material.precio_unitario,
        precio_pvp: material.precio_unitario > 0 ? material.precio_unitario : 0,
        descripcion: `${material.nombre} - ${material.cantidad_total} ${material.unidad} (usado en albaranes: ${material.albaranes.join(', ')})`
      });
    });
    
    // 5. Calcular totales consolidados
    const subtotal = lineasFactura.reduce((total, linea) => {
      const subtotalLinea = (linea.precio_pvp || 0) * (linea.cantidad || 0);
      return total + subtotalLinea;
    }, 0);
    
    const iva = +(subtotal * 0.21).toFixed(2);
    const total = +(subtotal + iva).toFixed(2);
    
    console.log('🔧 Líneas de factura consolidadas:', lineasFactura.length, 'líneas');
    console.log('🔧 Subtotal consolidado:', subtotal.toFixed(2), '€');
    console.log('🔧 IVA:', iva.toFixed(2), '€');
    console.log('🔧 Total consolidado:', total.toFixed(2), '€');
    
    // Log detallado de cada línea para debugging
    lineasFactura.forEach((linea, index) => {
      console.log(`🔧 Línea ${index + 1}:`, {
        tipo: linea.tipo,
        nombre: linea.nombre,
        cantidad: linea.cantidad,
        precio_neto: linea.precio_neto,
        precio_pvp: linea.precio_pvp,
        descripcion: linea.descripcion
      });
    });
    
    return {
      cliente_id: datosFactura.cliente.id,
      nombre_cliente: datosFactura.cliente.nombre_completo,
      direccion_cliente: datosFactura.cliente.direccion || '',
      cif_cliente: datosFactura.cliente.cif || '',
      email_cliente: datosFactura.cliente.email || '',
      aviso_id: datosFactura.avisoId,
      fecha_emision: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      subtotal: subtotal,
      iva: iva,
      total: total,
      lineas: lineasFactura
    };
  }} 