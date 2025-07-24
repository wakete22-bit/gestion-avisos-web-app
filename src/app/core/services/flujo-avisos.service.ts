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
   * Crea una factura desde trabajos realizados
   */
  facturarTrabajos(avisoId: string): Observable<any> {
    return this.avisosService.crearFacturaDesdeTrabajos(avisoId).pipe(
      switchMap(datosFactura => {
        // Usar el servicio de facturas para crear la factura
        const facturaRequest = this.convertirDatosAFactura(datosFactura);
        return this.facturasService.crearFactura(facturaRequest).pipe(
          map(factura => ({ datosFactura, factura }))
        );
      }),
      tap(() => console.log('✅ Factura creada desde trabajos')),
      switchMap(({ factura }) => 
        this.avisosService.actualizarEstadoAutomatico(avisoId).pipe(
          map(() => factura)
        )
      ),
      map(factura => ({
        paso: 'factura_desde_trabajos',
        avisoId,
        facturaId: factura.factura.id,
        mensaje: 'Factura generada automáticamente desde trabajos realizados.',
        factura
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
        
        if (estado.puedeCrearPresupuesto) {
          acciones.push('crear_presupuesto');
        }
        
        if (estado.puedeAprobarPresupuesto) {
          acciones.push('aprobar_presupuesto');
        }
        
        if (estado.puedeFacturarPresupuesto) {
          acciones.push('facturar_presupuesto');
        }
        
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

  // Métodos de validación privados
  private puedeCrearPresupuesto(resumen: any): boolean {
    return resumen.estado === 'No visitado' || resumen.estado === 'Visitado pendiente';
  }

  private puedeAprobarPresupuesto(resumen: any): boolean {
    return resumen.estadisticas.tienePresupuesto && 
           resumen.presupuesto?.estado === 'Pendiente';
  }

  private puedeFacturarPresupuesto(resumen: any): boolean {
    return resumen.estadisticas.tienePresupuesto && 
           resumen.presupuesto?.estado === 'Completado';
  }

  private puedeFacturarTrabajos(resumen: any): boolean {
    return resumen.estadisticas.trabajosCompletados > 0 && 
           resumen.estadisticas.facturasPendientes === 0;
  }

  private puedeCompletarAviso(resumen: any): boolean {
    return resumen.estadisticas.trabajosCompletados > 0 && 
           (resumen.estadisticas.totalFacturas > 0 || !resumen.requiere_presupuesto);
  }

  private convertirDatosAFactura(datosFactura: any): any {
    const lineasFactura = [
      // Convertir materiales a líneas de factura
      ...datosFactura.resumen.materiales.map((mat: any) => ({
        tipo: 'repuesto',
        nombre: mat.nombre,
        cantidad: mat.cantidad_total,
        precio_pvp: mat.precio_unitario,
        descripcion: mat.descripcion
      })),
      // Agregar mano de obra si hay horas
      ...(datosFactura.resumen.horasTotales > 0 ? [{
        tipo: 'mano_obra',
        nombre: 'Mano de obra técnica',
        cantidad: datosFactura.resumen.horasTotales,
        precio_pvp: 50, // Precio por hora por defecto
        descripcion: `${datosFactura.resumen.horasTotales} horas de trabajo técnico`
      }] : [])
    ];

    const totales = this.facturasService.calcularTotales(lineasFactura);

    return {
      numero_factura: '', // Se generará automáticamente
      fecha_emision: new Date().toISOString().split('T')[0],
      cliente_id: datosFactura.cliente.id,
      nombre_cliente: datosFactura.cliente.nombre_completo,
      direccion_cliente: datosFactura.cliente.direccion,
      cif_cliente: datosFactura.cliente.cif || 'Sin CIF',
      email_cliente: datosFactura.cliente.email,
      aviso_id: datosFactura.avisoId,
      subtotal: totales.subtotal,
      iva: totales.iva,
      total: totales.total,
      estado: 'Pendiente',
      notas: `Factura generada desde ${datosFactura.resumen.numeroTrabajos} trabajo(s) realizado(s)`,
      lineas: lineasFactura
    };
  }
} 