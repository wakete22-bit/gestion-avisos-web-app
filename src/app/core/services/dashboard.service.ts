import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AvisosService } from './avisos.service';
import { FacturasService } from '../../modules/facturas/services/facturas.service';
import { PresupuestosService } from '../../modules/presupuestos/services/presupuestos.service';
import { SupabaseClientService } from './supabase-client.service';
import { DataUpdateService } from './data-update.service';

export interface DashboardStats {
  avisosEnCurso: number;
  avisosUrgentes: number;
  facturasPendientes: number;
  presupuestosPendientes: number;
  totalFacturasPendientes: number;
  totalPresupuestosPendientes: number;
}

export interface DashboardData {
  stats: DashboardStats;
  avisosRecientes: any[];
  facturasPendientes: any[];
  presupuestosPendientes: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardSubject = new BehaviorSubject<DashboardData | null>(null);
  public dashboard$ = this.dashboardSubject.asObservable();

  constructor(
    private avisosService: AvisosService,
    private facturasService: FacturasService,
    private presupuestosService: PresupuestosService,
    private supabaseClientService: SupabaseClientService,
    private dataUpdateService: DataUpdateService
  ) {
    // NO asignar el cliente aquí - obtenerlo dinámicamente en cada uso
    // this.supabase = this.supabaseClientService.getClient();
  }

  /**
   * Obtiene el cliente Supabase actualizado dinámicamente
   */
  private getSupabaseClient() {
    console.log('📊 DashboardService: Obteniendo cliente Supabase actualizado...');
    return this.supabaseClientService.getClient();
  }

  /**
   * Obtiene todas las estadísticas del dashboard
   */
  getDashboardData(): Observable<DashboardData> {
    console.log('📊 DashboardService: INICIANDO getDashboardData...');
    
    const startTime = Date.now();
    
    return forkJoin({
      stats: this.getDashboardStats(),
      avisosRecientes: this.getAvisosRecientes(),
      facturasPendientes: this.getFacturasPendientes(),
      presupuestosPendientes: this.getPresupuestosPendientes()
    }).pipe(
      map(data => {
        const duration = Date.now() - startTime;
        console.log('📊 DashboardService: Todas las queries completadas en', duration, 'ms');
        console.log('📊 DashboardService: Datos recibidos:', {
          stats: data.stats,
          avisosRecientes: data.avisosRecientes?.length || 0,
          facturasPendientes: data.facturasPendientes?.length || 0,
          presupuestosPendientes: data.presupuestosPendientes?.length || 0
        });
        
        const dashboardData: DashboardData = {
          stats: data.stats,
          avisosRecientes: data.avisosRecientes,
          facturasPendientes: data.facturasPendientes,
          presupuestosPendientes: data.presupuestosPendientes
        };
        
        console.log('📊 DashboardService: Enviando datos al Subject...');
        this.dashboardSubject.next(dashboardData);
        console.log('✅ DashboardService: getDashboardData completado exitosamente');
        return dashboardData;
      }),
      catchError(error => {
        const duration = Date.now() - startTime;
        console.error('❌ DashboardService: ERROR en getDashboardData después de', duration, 'ms:', {
          message: error.message,
          stack: error.stack,
          fullError: error
        });
        throw error;
      })
    );
  }

  /**
   * Obtiene las estadísticas generales del dashboard
   */
  private getDashboardStats(): Observable<DashboardStats> {
    return forkJoin({
      avisosEnCurso: this.getAvisosEnCurso(),
      avisosUrgentes: this.getAvisosUrgentes(),
      facturasPendientes: this.getFacturasPendientesCount(),
      presupuestosPendientes: this.getPresupuestosPendientesCount()
    }).pipe(
      map(data => {
        return {
          avisosEnCurso: data.avisosEnCurso,
          avisosUrgentes: data.avisosUrgentes,
          facturasPendientes: data.facturasPendientes,
          presupuestosPendientes: data.presupuestosPendientes,
          totalFacturasPendientes: 0, // Se calculará después
          totalPresupuestosPendientes: 0 // Se calculará después
        };
      })
    );
  }

  /**
   * Obtiene el número de avisos en curso usando fetch directo
   */
  private getAvisosEnCurso(): Observable<number> {
    console.log('📊 DashboardService: Iniciando getAvisosEnCurso con FETCH DIRECTO...');
    
    return from(this.fetchAvisosEnCursoDirect()).pipe(
      map(count => {
        console.log('✅ DashboardService: getAvisosEnCurso completado, count:', count);
        return count || 0;
      }),
      catchError(error => {
        console.error('❌ DashboardService: Error en getAvisosEnCurso:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para count de avisos en curso
   */
  private async fetchAvisosEnCursoDirect(): Promise<number> {
    console.log('🚀 DashboardService: Ejecutando fetch directo para avisos en curso...');
    
    try {
      // SOLUCIÓN: Usar filtro simple que funciona
      const url = `${environment.supabaseUrl}/rest/v1/avisos?estado=eq.Pendiente&select=id`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      };
      
      console.log('🚀 URL construida:', url);
      
      const startTime = Date.now();
      const response = await fetch(url, { method: 'HEAD', headers });
      const duration = Date.now() - startTime;
      
      console.log('🚀 Fetch completado en', duration, 'ms');
      console.log('🚀 Status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentRange = response.headers.get('content-range');
      const count = contentRange ? parseInt(contentRange.split('/')[1]) : 0;
      console.log('🚀 Count recibido:', count);
      return count;
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Obtiene el número de avisos urgentes usando fetch directo
   */
  private getAvisosUrgentes(): Observable<number> {
    console.log('📊 DashboardService: Iniciando getAvisosUrgentes con FETCH DIRECTO...');
    
    return from(this.fetchAvisosUrgentesDirect()).pipe(
      map(count => {
        console.log('✅ DashboardService: getAvisosUrgentes completado, count:', count);
        return count || 0;
      }),
      catchError(error => {
        console.error('❌ DashboardService: Error en getAvisosUrgentes:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para count de avisos urgentes
   */
  private async fetchAvisosUrgentesDirect(): Promise<number> {
    console.log('🚀 DashboardService: Ejecutando fetch directo para avisos urgentes...');
    
    try {
      const url = `${environment.supabaseUrl}/rest/v1/avisos?es_urgente=eq.true&estado=neq.Completado&select=id`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      };
      
      console.log('🚀 URL construida:', url);
      
      const startTime = Date.now();
      const response = await fetch(url, { method: 'HEAD', headers });
      const duration = Date.now() - startTime;
      
      console.log('🚀 Fetch completado en', duration, 'ms');
      console.log('🚀 Status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentRange = response.headers.get('content-range');
      const count = contentRange ? parseInt(contentRange.split('/')[1]) : 0;
      console.log('🚀 Count recibido:', count);
      return count;
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Obtiene el número de facturas pendientes usando fetch directo
   */
  private getFacturasPendientesCount(): Observable<number> {
    console.log('📊 DashboardService: Iniciando getFacturasPendientesCount con FETCH DIRECTO...');
    
    return from(this.fetchFacturasPendientesDirect()).pipe(
      map(count => {
        console.log('✅ DashboardService: getFacturasPendientesCount completado, count:', count);
        return count || 0;
      }),
      catchError(error => {
        console.error('❌ DashboardService: Error en getFacturasPendientesCount:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para count de facturas pendientes
   */
  private async fetchFacturasPendientesDirect(): Promise<number> {
    console.log('🚀 DashboardService: Ejecutando fetch directo para facturas pendientes...');
    
    try {
      const url = `${environment.supabaseUrl}/rest/v1/facturas?estado=eq.Pendiente&select=id`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      };
      
      console.log('🚀 URL construida:', url);
      
      const startTime = Date.now();
      const response = await fetch(url, { method: 'HEAD', headers });
      const duration = Date.now() - startTime;
      
      console.log('🚀 Fetch completado en', duration, 'ms');
      console.log('🚀 Status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentRange = response.headers.get('content-range');
      const count = contentRange ? parseInt(contentRange.split('/')[1]) : 0;
      console.log('🚀 Count recibido:', count);
      return count;
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Obtiene el número de presupuestos pendientes usando fetch directo
   */
  private getPresupuestosPendientesCount(): Observable<number> {
    console.log('📊 DashboardService: Iniciando getPresupuestosPendientesCount con FETCH DIRECTO...');
    
    return from(this.fetchPresupuestosPendientesDirect()).pipe(
      map(count => {
        console.log('✅ DashboardService: getPresupuestosPendientesCount completado, count:', count);
        return count || 0;
      }),
      catchError(error => {
        console.error('❌ DashboardService: Error en getPresupuestosPendientesCount:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para count de presupuestos pendientes
   */
  private async fetchPresupuestosPendientesDirect(): Promise<number> {
    console.log('🚀 DashboardService: Ejecutando fetch directo para presupuestos pendientes...');
    
    try {
      const url = `${environment.supabaseUrl}/rest/v1/presupuestos?estado=eq.Pendiente&select=id`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      };
      
      console.log('🚀 URL construida:', url);
      
      const startTime = Date.now();
      const response = await fetch(url, { method: 'HEAD', headers });
      const duration = Date.now() - startTime;
      
      console.log('🚀 Fetch completado en', duration, 'ms');
      console.log('🚀 Status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentRange = response.headers.get('content-range');
      const count = contentRange ? parseInt(contentRange.split('/')[1]) : 0;
      console.log('🚀 Count recibido:', count);
      return count;
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Obtiene los avisos más recientes usando fetch directo
   */
  private getAvisosRecientes(): Observable<any[]> {
    console.log('📊 DashboardService: Iniciando getAvisosRecientes con FETCH DIRECTO...');
    
    return from(this.fetchAvisosRecientesDirect()).pipe(
      map(data => {
        console.log('✅ DashboardService: getAvisosRecientes completado, registros:', data?.length || 0);
        console.log('📊 DashboardService: Datos de avisos:', data);
        return data || [];
      }),
      catchError(error => {
        console.error('❌ DashboardService: Error en getAvisosRecientes:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para avisos recientes - BYPASA CLIENTE SUPABASE
   */
  private async fetchAvisosRecientesDirect(): Promise<any[]> {
    console.log('🚀 DashboardService: Ejecutando fetch directo para avisos...');
    
    try {
      const url = `${environment.supabaseUrl}/rest/v1/avisos?select=*,cliente:clientes(*)&or=(estado.eq.Pendiente,estado.eq.Pendiente%20de%20presupuesto,estado.eq.Listo%20para%20facturar)&order=fecha_creacion.desc&limit=10`;
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      };
      
      console.log('🚀 URL construida:', url);
      
      const startTime = Date.now();
      const response = await fetch(url, { method: 'GET', headers });
      const duration = Date.now() - startTime;
      
      console.log('🚀 Fetch completado en', duration, 'ms');
      console.log('🚀 Status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('🚀 Datos recibidos:', data?.length || 0, 'avisos');
      return data || [];
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Obtiene las facturas pendientes con detalles usando fetch directo
   */
  private getFacturasPendientes(): Observable<any[]> {
    console.log('📊 DashboardService: Iniciando getFacturasPendientes con FETCH DIRECTO...');
    
    return from(this.fetchFacturasPendientesDetailsDirect()).pipe(
      map(data => {
        console.log('✅ DashboardService: getFacturasPendientes completado, registros:', data?.length || 0);
        return data || [];
      }),
      catchError(error => {
        console.error('❌ DashboardService: Error en getFacturasPendientes:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para facturas pendientes con detalles
   */
  private async fetchFacturasPendientesDetailsDirect(): Promise<any[]> {
    console.log('🚀 DashboardService: Ejecutando fetch directo para facturas pendientes...');
    
    try {
      const url = `${environment.supabaseUrl}/rest/v1/facturas?estado=eq.Pendiente&select=*,cliente:clientes(*),aviso:avisos(*)&order=fecha_creacion.desc&limit=5`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      };
      
      console.log('🚀 URL construida:', url);
      
      const startTime = Date.now();
      const response = await fetch(url, { method: 'GET', headers });
      const duration = Date.now() - startTime;
      
      console.log('🚀 Fetch completado en', duration, 'ms');
      console.log('🚀 Status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('🚀 Datos recibidos:', data?.length || 0, 'facturas');
      return data || [];
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Obtiene los presupuestos pendientes con detalles usando fetch directo
   */
  private getPresupuestosPendientes(): Observable<any[]> {
    console.log('📊 DashboardService: Iniciando getPresupuestosPendientes con FETCH DIRECTO...');
    
    return from(this.fetchPresupuestosPendientesDetailsDirect()).pipe(
      map(data => {
        console.log('✅ DashboardService: getPresupuestosPendientes completado, registros:', data?.length || 0);
        return data || [];
      }),
      catchError(error => {
        console.error('❌ DashboardService: Error en getPresupuestosPendientes:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para presupuestos pendientes con detalles
   */
  private async fetchPresupuestosPendientesDetailsDirect(): Promise<any[]> {
    console.log('🚀 DashboardService: Ejecutando fetch directo para presupuestos pendientes...');
    
    try {
      const url = `${environment.supabaseUrl}/rest/v1/presupuestos?estado=eq.Pendiente&select=*,aviso:avisos(*,cliente:clientes(*))&order=fecha_creacion.desc&limit=5`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      };
      
      console.log('🚀 URL construida:', url);
      
      const startTime = Date.now();
      const response = await fetch(url, { method: 'GET', headers });
      const duration = Date.now() - startTime;
      
      console.log('🚀 Fetch completado en', duration, 'ms');
      console.log('🚀 Status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('🚀 Datos recibidos:', data?.length || 0, 'presupuestos');
      return data || [];
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Calcula el total de facturas pendientes
   */
  calcularTotalFacturasPendientes(facturas: any[]): number {
    return facturas.reduce((total, factura) => total + (factura.total || 0), 0);
  }

  /**
   * Calcula el total de presupuestos pendientes
   */
  calcularTotalPresupuestosPendientes(presupuestos: any[]): number {
    return presupuestos.reduce((total, presupuesto) => total + (presupuesto.total_estimado || 0), 0);
  }

  /**
   * Refresca los datos del dashboard
   */
  refreshDashboard(): Observable<DashboardData> {
    return this.getDashboardData();
  }

  /**
   * Limpia el cache del dashboard cuando se actualizan datos
   */
  clearDashboardCache(): void {
    console.log('🧹 Clearing dashboard cache');
    this.dashboardSubject.next(null);
  }

  /**
   * Suscribe a las actualizaciones de datos para refrescar el dashboard
   */
  subscribeToDataUpdates(): void {
    // El dashboard se actualizará automáticamente cuando se limpien los caches
    // de avisos, facturas, presupuestos, etc.
  }

  /**
   * Obtiene el valor actual del dashboard
   */
  getDashboardActual(): DashboardData | null {
    return this.dashboardSubject.value;
  }
} 