import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AvisosService } from './avisos.service';
import { FacturasService } from '../../modules/facturas/services/facturas.service';
import { PresupuestosService } from '../../modules/presupuestos/services/presupuestos.service';

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
  private supabase: SupabaseClient;
  private dashboardSubject = new BehaviorSubject<DashboardData | null>(null);
  public dashboard$ = this.dashboardSubject.asObservable();

  constructor(
    private avisosService: AvisosService,
    private facturasService: FacturasService,
    private presupuestosService: PresupuestosService
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  /**
   * Obtiene todas las estadísticas del dashboard
   */
  getDashboardData(): Observable<DashboardData> {
    return forkJoin({
      stats: this.getDashboardStats(),
      avisosRecientes: this.getAvisosRecientes(),
      facturasPendientes: this.getFacturasPendientes(),
      presupuestosPendientes: this.getPresupuestosPendientes()
    }).pipe(
      map(data => {
        const dashboardData: DashboardData = {
          stats: data.stats,
          avisosRecientes: data.avisosRecientes,
          facturasPendientes: data.facturasPendientes,
          presupuestosPendientes: data.presupuestosPendientes
        };
        
        this.dashboardSubject.next(dashboardData);
        return dashboardData;
      }),
      catchError(error => {
        console.error('Error al obtener datos del dashboard:', error);
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
   * Obtiene el número de avisos en curso
   */
  private getAvisosEnCurso(): Observable<number> {
    return from(
      this.supabase
        .from('avisos')
        .select('*', { count: 'exact', head: true })
        .in('estado', ['En curso', 'Visitado pendiente', 'Pendiente de presupuesto'])
    ).pipe(
      map(({ count, error }) => {
        if (error) throw error;
        return count || 0;
      })
    );
  }

  /**
   * Obtiene el número de avisos urgentes
   */
  private getAvisosUrgentes(): Observable<number> {
    return from(
      this.supabase
        .from('avisos')
        .select('*', { count: 'exact', head: true })
        .eq('es_urgente', true)
        .neq('estado', 'Completado')
    ).pipe(
      map(({ count, error }) => {
        if (error) throw error;
        return count || 0;
      })
    );
  }

  /**
   * Obtiene el número de facturas pendientes
   */
  private getFacturasPendientesCount(): Observable<number> {
    return from(
      this.supabase
        .from('facturas')
        .select('*', { count: 'exact', head: true })
        .eq('estado', 'Pendiente')
    ).pipe(
      map(({ count, error }) => {
        if (error) throw error;
        return count || 0;
      })
    );
  }

  /**
   * Obtiene el número de presupuestos pendientes
   */
  private getPresupuestosPendientesCount(): Observable<number> {
    return from(
      this.supabase
        .from('presupuestos')
        .select('*', { count: 'exact', head: true })
        .eq('estado', 'Pendiente')
    ).pipe(
      map(({ count, error }) => {
        if (error) throw error;
        return count || 0;
      })
    );
  }

  /**
   * Obtiene los avisos más recientes
   */
  private getAvisosRecientes(): Observable<any[]> {
    return from(
      this.supabase
        .from('avisos')
        .select(`
          *,
          cliente:clientes(*)
        `)
        .order('fecha_creacion', { ascending: false })
        .limit(10)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data || [];
      })
    );
  }

  /**
   * Obtiene las facturas pendientes con detalles
   */
  private getFacturasPendientes(): Observable<any[]> {
    return from(
      this.supabase
        .from('facturas')
        .select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `)
        .eq('estado', 'Pendiente')
        .order('fecha_creacion', { ascending: false })
        .limit(5)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data || [];
      })
    );
  }

  /**
   * Obtiene los presupuestos pendientes con detalles
   */
  private getPresupuestosPendientes(): Observable<any[]> {
    return from(
      this.supabase
        .from('presupuestos')
        .select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `)
        .eq('estado', 'Pendiente')
        .order('fecha_creacion', { ascending: false })
        .limit(5)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data || [];
      })
    );
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
   * Obtiene el valor actual del dashboard
   */
  getDashboardActual(): DashboardData | null {
    return this.dashboardSubject.value;
  }
} 