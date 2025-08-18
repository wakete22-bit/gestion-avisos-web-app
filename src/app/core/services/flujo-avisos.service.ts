import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { AvisosService } from './avisos.service';
import { FacturasService } from '../../modules/facturas/services/facturas.service';
import { PresupuestosService } from '../../modules/presupuestos/services/presupuestos.service';
import { TrabajosService } from './trabajos.service';

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
    private presupuestosService: PresupuestosService,
    private trabajosService: TrabajosService
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
        
        if (!resumen.estadisticas.trabajosFinalizados) {
          throw new Error('No hay trabajos finalizados para facturar. Debes crear un albarán primero.');
        }

        // Validar que TODOS los trabajos tengan albaranes cerrados
        const trabajosSinAlbaranCerrado = resumen.trabajos?.filter((t: any) => 
          !t.albaran_id || !t.albaran?.estado_cierre || t.albaran.estado_cierre === 'Otra visita'
        ) || [];
        
        if (trabajosSinAlbaranCerrado.length > 0) {
          const trabajosPendientes = trabajosSinAlbaranCerrado.map((t: any) => 
            `Trabajo #${t.id?.substring(0, 8)} (${t.descripcion})`
          ).join(', ');
          
          throw new Error(`No se puede facturar. Los siguientes trabajos no tienen albaranes cerrados: ${trabajosPendientes}. Debes cerrar todos los albaranes antes de facturar.`);
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
        const trabajosSinAlbaranCerrado = resumen.trabajos?.filter((t: any) => 
          !t.albaran_id || !t.albaran?.estado_cierre || t.albaran.estado_cierre === 'Otra visita'
        ) || [];
        
        if (trabajosSinAlbaranCerrado.length > 0) {
          const trabajosPendientes = trabajosSinAlbaranCerrado.map((t: any) => 
            `Trabajo #${t.id?.substring(0, 8)} (${t.descripcion})`
          ).join(', ');
          
          throw new Error(`No se puede completar el aviso. Los siguientes trabajos no tienen albaranes cerrados: ${trabajosPendientes}. Debes cerrar todos los albaranes antes de completar el aviso.`);
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
    // 1. Hay trabajos finalizados (con albaranes cerrados)
    // 2. No hay facturas pendientes
    // 3. TODOS los trabajos tienen albaranes cerrados (no puede haber trabajos abiertos)
    const todosLosTrabajosTienenAlbaranesCerrados = resumen.trabajos?.every((t: any) => 
      t.albaran_id && t.albaran?.estado_cierre && t.albaran.estado_cierre !== 'Otra visita'
    ) || false;
    
    return resumen.estadisticas.trabajosFinalizados > 0 && 
           resumen.estadisticas.facturasPendientes === 0 &&
           todosLosTrabajosTienenAlbaranesCerrados;
  }

  private puedeCompletarAviso(resumen: any): boolean {
    // Solo se puede completar si:
    // 1. Hay trabajos finalizados (con albaranes cerrados)
    // 2. Hay facturas generadas
    // 3. TODOS los trabajos tienen albaranes cerrados (no puede haber trabajos abiertos)
    const todosLosTrabajosTienenAlbaranesCerrados = resumen.trabajos?.every((t: any) => 
      t.albaran_id && t.albaran?.estado_cierre && t.albaran.estado_cierre !== 'Otra visita'
    ) || false;
    
    return resumen.estadisticas.trabajosFinalizados > 0 && 
           resumen.estadisticas.totalFacturas > 0 &&
           todosLosTrabajosTienenAlbaranesCerrados;
  }

  private convertirDatosAFactura(datosFactura: any): any {
    console.log('🔧 Datos de factura recibidos:', datosFactura);
    
    // Validar que tenemos los datos necesarios
    if (!datosFactura.cliente || !datosFactura.cliente.id) {
      throw new Error('Datos de cliente incompletos para crear factura');
    }
    
    const lineasFactura = [];
    
    // 1. Calcular horas totales de trabajo desde los albaranes
    let horasTotales = 0;
    if (datosFactura.resumen.albaranes && datosFactura.resumen.albaranes.length > 0) {
      datosFactura.resumen.albaranes.forEach((albaran: any) => {
        if (albaran.estado_cierre === 'Finalizado') {
          // Calcular horas entre hora_entrada y hora_salida
          const horaEntrada = new Date(`2000-01-01T${albaran.hora_entrada}`);
          const horaSalida = new Date(`2000-01-01T${albaran.hora_salida}`);
          const horasTrabajo = (horaSalida.getTime() - horaEntrada.getTime()) / (1000 * 60 * 60);
          horasTotales += Math.max(0, horasTrabajo);
        }
      });
    }
    
    // 2. Agregar línea de mano de obra con horas reales
    if (horasTotales > 0) {
      lineasFactura.push({
        tipo: 'mano_obra' as const,
        nombre: 'Mano de obra técnica',
        cantidad: Math.round(horasTotales * 10) / 10, // Redondear a 1 decimal
        precio_pvp: 50, // Precio por hora
        descripcion: `${Math.round(horasTotales * 10) / 10} horas de trabajo técnico`
      });
    }
    
    // 3. Agregar repuestos utilizados desde los albaranes
    const repuestosUtilizados = new Map<string, number>(); // nombre -> cantidad
    
    if (datosFactura.resumen.albaranes) {
      datosFactura.resumen.albaranes.forEach((albaran: any) => {
        if (albaran.repuestos_utilizados && albaran.repuestos_utilizados.length > 0) {
          albaran.repuestos_utilizados.forEach((repuesto: string) => {
            const cantidadActual = repuestosUtilizados.get(repuesto) || 0;
            repuestosUtilizados.set(repuesto, cantidadActual + 1);
          });
        }
      });
    }
    
    // Agregar líneas de repuestos
    repuestosUtilizados.forEach((cantidad, nombre) => {
      lineasFactura.push({
        tipo: 'repuesto' as const,
        nombre: nombre,
        cantidad: cantidad,
        precio_pvp: 25, // Precio base por repuesto (se puede ajustar)
        descripcion: `Repuesto utilizado: ${nombre}`
      });
    });
    
    // Si no hay líneas, agregar una línea básica
    if (lineasFactura.length === 0) {
      lineasFactura.push({
        tipo: 'mano_obra' as const,
        nombre: 'Servicio técnico básico',
        cantidad: 1,
        precio_pvp: 50,
        descripcion: 'Servicio técnico realizado'
      });
    }

    console.log('🔧 Líneas de factura creadas:', lineasFactura);
    console.log('🔧 Horas totales calculadas:', horasTotales);
    
    const totales = this.facturasService.calcularTotales(lineasFactura);
    
    console.log('🔧 Totales calculados:', totales);

    return {
      numero_factura: '', // Se generará automáticamente por el servicio
      fecha_emision: new Date().toISOString().split('T')[0],
      cliente_id: datosFactura.cliente.id,
      nombre_cliente: datosFactura.cliente.nombre_completo,
      direccion_cliente: datosFactura.cliente.direccion || 'Sin dirección',
      cif_cliente: 'Sin CIF', // El modelo de cliente no tiene CIF
      email_cliente: datosFactura.cliente.email || 'Sin email',
      aviso_id: datosFactura.avisoId,
      subtotal: totales.subtotal,
      iva: totales.iva,
      total: totales.total,
      estado: 'En curso', // Cambiar a 'En curso' para indicar que está siendo procesada
      notas: `Factura generada desde ${datosFactura.resumen.albaranes?.length || 0} albarán(es) con ${Math.round(horasTotales * 10) / 10}h de trabajo técnico`,
      lineas: lineasFactura
    };
  }
} 