import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { SupabaseClientService } from './supabase-client.service';
import { ConfiguracionService } from './configuracion.service';
import { LineaFactura } from '../../modules/facturas/models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaDebugService {

  constructor(
    private supabaseClientService: SupabaseClientService,
    private configuracionService: ConfiguracionService
  ) {
    // NO asignar cliente estático - usar método dinámico
  }

  /**
   * Obtiene el cliente Supabase actualizado dinámicamente
   */
  private getSupabaseClient(): SupabaseClient {
    console.log('🐛 FacturaDebugService: Obteniendo cliente Supabase actualizado...');
    return this.getSupabaseClient()ClientService.getClient();
  }

  /**
   * Prueba la creación de una factura simple para debug
   */
  testCrearFacturaSimple(): Observable<any> {
    const facturaData = {
      numero_factura: 'TEST-' + Date.now(),
      fecha_emision: new Date().toISOString().split('T')[0],
      nombre_cliente: 'Cliente de Prueba',
      direccion_cliente: 'Dirección de Prueba',
      cif_cliente: 'TEST-CIF',
      email_cliente: 'test@ejemplo.com',
      subtotal: 100.00,
      iva: 21.00,
      total: 121.00,
      estado: 'Pendiente' as const,
      notas: 'Factura de prueba para debug',
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString()
    };

    console.log('🧪 Probando creación de factura simple:', facturaData);

    return from(
      this.getSupabaseClient()
        .from('facturas')
        .insert([facturaData])
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        console.log('✅ Factura de prueba creada exitosamente:', data);
        return data;
      }),
      catchError(error => {
        console.error('❌ Error al crear factura de prueba:', error);
        throw error;
      })
    );
  }

  /**
   * Verifica la estructura de la tabla facturas
   */
  verificarEstructuraFacturas(): Observable<any> {
    return from(
      this.getSupabaseClient()
        .from('facturas')
        .select('*')
        .limit(1)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        console.log('📋 Estructura de tabla facturas:', data);
        return data;
      }),
      catchError(error => {
        console.error('❌ Error al verificar estructura:', error);
        throw error;
      })
    );
  }

  /**
   * Prueba el cálculo de totales con datos de prueba
   */
  testCalcularTotales(): void {
    const lineasPrueba: LineaFactura[] = [
      {
        tipo: 'repuesto',
        nombre: 'Material de prueba 1',
        cantidad: 2,
        precio_pvp: 25.50,
        descripcion: 'Material de prueba'
      },
      {
        tipo: 'mano_obra',
        nombre: 'Mano de obra',
        cantidad: 3,
        precio_pvp: 50.00,
        descripcion: 'Horas de trabajo'
      }
    ];

    // Simular el cálculo de totales
    const subtotal = lineasPrueba.reduce((acc, linea) => {
      const cantidad = linea.cantidad || 0;
      const precio = linea.precio_pvp || 0;
      return acc + (cantidad * precio);
    }, 0);

    // Obtener IVA de la configuración
    return this.configuracionService.getIvaPorDefecto().pipe(
      map(ivaPorcentaje => {
        const iva = +(subtotal * (ivaPorcentaje / 100)).toFixed(2);
        const total = +(subtotal + iva).toFixed(2);

        console.log('🧮 Prueba de cálculo de totales:', {
          lineas: lineasPrueba,
          subtotal,
          iva,
          total
        });

        return {
          lineas: lineasPrueba,
          subtotal,
          iva,
          total
        };
      })
    );
  }

  /**
   * Limpia facturas de prueba
   */
  limpiarFacturasPrueba(): Observable<any> {
    return from(
      this.getSupabaseClient()
        .from('facturas')
        .delete()
        .like('numero_factura', 'TEST-%')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        console.log('🧹 Facturas de prueba limpiadas');
        return data;
      }),
      catchError(error => {
        console.error('❌ Error al limpiar facturas de prueba:', error);
        throw error;
      })
    );
  }
} 