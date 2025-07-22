import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from, forkJoin } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { 
  ConfiguracionEmpresa,
  ConfiguracionFacturacion,
  ConfiguracionNotificaciones,
  ConfiguracionAvisos,
  ConfiguracionSistema,
  AjustesCompletos,
  ActualizarEmpresaRequest,
  ActualizarFacturacionRequest,
  ActualizarNotificacionesRequest,
  ActualizarAvisosRequest,
  ActualizarSistemaRequest
} from '../models/ajustes.model';

@Injectable({
  providedIn: 'root'
})
export class AjustesService {
  private supabase: SupabaseClient;
  private ajustesSubject = new BehaviorSubject<AjustesCompletos | null>(null);
  public ajustes$ = this.ajustesSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  /**
   * Obtiene todas las configuraciones del sistema
   */
  getAjustesCompletos(): Observable<AjustesCompletos> {
    return forkJoin({
      empresa: this.getConfiguracionEmpresa(),
      facturacion: this.getConfiguracionFacturacion(),
      notificaciones: this.getConfiguracionNotificaciones(),
      avisos: this.getConfiguracionAvisos(),
      sistema: this.getConfiguracionSistema()
    }).pipe(
      map(ajustes => {
        this.ajustesSubject.next(ajustes);
        return ajustes;
      }),
      catchError(error => {
        console.error('Error al obtener ajustes completos:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene la configuración de empresa
   */
  getConfiguracionEmpresa(): Observable<ConfiguracionEmpresa> {
    return from(
      this.supabase
        .from('configuracion_empresa')
        .select('*')
        .single()
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          // Si no existe, crear configuración por defecto
          if (error.code === 'PGRST116') {
            return from(this.crearConfiguracionEmpresaPorDefecto());
          }
          throw error;
        }
        return from(Promise.resolve(data as ConfiguracionEmpresa));
      }),
      catchError(error => {
        console.error('Error al obtener configuración de empresa:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene la configuración de facturación
   */
  getConfiguracionFacturacion(): Observable<ConfiguracionFacturacion> {
    return from(
      this.supabase
        .from('configuracion_facturacion')
        .select('*')
        .single()
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          if (error.code === 'PGRST116') {
            return from(this.crearConfiguracionFacturacionPorDefecto());
          }
          throw error;
        }
        return from(Promise.resolve(data as ConfiguracionFacturacion));
      }),
      catchError(error => {
        console.error('Error al obtener configuración de facturación:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene la configuración de notificaciones
   */
  getConfiguracionNotificaciones(): Observable<ConfiguracionNotificaciones> {
    return from(
      this.supabase
        .from('configuracion_notificaciones')
        .select('*')
        .single()
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          if (error.code === 'PGRST116') {
            return from(this.crearConfiguracionNotificacionesPorDefecto());
          }
          throw error;
        }
        return from(Promise.resolve(data as ConfiguracionNotificaciones));
      }),
      catchError(error => {
        console.error('Error al obtener configuración de notificaciones:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene la configuración de avisos
   */
  getConfiguracionAvisos(): Observable<ConfiguracionAvisos> {
    return from(
      this.supabase
        .from('configuracion_avisos')
        .select('*')
        .single()
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          if (error.code === 'PGRST116') {
            return from(this.crearConfiguracionAvisosPorDefecto());
          }
          throw error;
        }
        return from(Promise.resolve(data as ConfiguracionAvisos));
      }),
      catchError(error => {
        console.error('Error al obtener configuración de avisos:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene la configuración del sistema
   */
  getConfiguracionSistema(): Observable<ConfiguracionSistema> {
    return from(
      this.supabase
        .from('configuracion_sistema')
        .select('*')
        .single()
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          if (error.code === 'PGRST116') {
            return from(this.crearConfiguracionSistemaPorDefecto());
          }
          throw error;
        }
        return from(Promise.resolve(data as ConfiguracionSistema));
      }),
      catchError(error => {
        console.error('Error al obtener configuración del sistema:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza la configuración de empresa
   */
  actualizarConfiguracionEmpresa(datos: ActualizarEmpresaRequest): Observable<ConfiguracionEmpresa> {
    const datosActualizados = {
      ...datos,
      fecha_actualizacion: new Date().toISOString()
    };

    return from(
      this.supabase
        .from('configuracion_empresa')
        .update(datosActualizados)
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const configuracionActualizada = data as ConfiguracionEmpresa;
        this.actualizarAjustesLocales('empresa', configuracionActualizada);
        
        return configuracionActualizada;
      }),
      catchError(error => {
        console.error('Error al actualizar configuración de empresa:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza la configuración de facturación
   */
  actualizarConfiguracionFacturacion(datos: ActualizarFacturacionRequest): Observable<ConfiguracionFacturacion> {
    const datosActualizados = {
      ...datos,
      fecha_actualizacion: new Date().toISOString()
    };

    return from(
      this.supabase
        .from('configuracion_facturacion')
        .update(datosActualizados)
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const configuracionActualizada = data as ConfiguracionFacturacion;
        this.actualizarAjustesLocales('facturacion', configuracionActualizada);
        
        return configuracionActualizada;
      }),
      catchError(error => {
        console.error('Error al actualizar configuración de facturación:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza la configuración de notificaciones
   */
  actualizarConfiguracionNotificaciones(datos: ActualizarNotificacionesRequest): Observable<ConfiguracionNotificaciones> {
    const datosActualizados = {
      ...datos,
      fecha_actualizacion: new Date().toISOString()
    };

    return from(
      this.supabase
        .from('configuracion_notificaciones')
        .update(datosActualizados)
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const configuracionActualizada = data as ConfiguracionNotificaciones;
        this.actualizarAjustesLocales('notificaciones', configuracionActualizada);
        
        return configuracionActualizada;
      }),
      catchError(error => {
        console.error('Error al actualizar configuración de notificaciones:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza la configuración de avisos
   */
  actualizarConfiguracionAvisos(datos: ActualizarAvisosRequest): Observable<ConfiguracionAvisos> {
    const datosActualizados = {
      ...datos,
      fecha_actualizacion: new Date().toISOString()
    };

    return from(
      this.supabase
        .from('configuracion_avisos')
        .update(datosActualizados)
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const configuracionActualizada = data as ConfiguracionAvisos;
        this.actualizarAjustesLocales('avisos', configuracionActualizada);
        
        return configuracionActualizada;
      }),
      catchError(error => {
        console.error('Error al actualizar configuración de avisos:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza la configuración del sistema
   */
  actualizarConfiguracionSistema(datos: ActualizarSistemaRequest): Observable<ConfiguracionSistema> {
    const datosActualizados = {
      ...datos,
      fecha_actualizacion: new Date().toISOString()
    };

    return from(
      this.supabase
        .from('configuracion_sistema')
        .update(datosActualizados)
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const configuracionActualizada = data as ConfiguracionSistema;
        this.actualizarAjustesLocales('sistema', configuracionActualizada);
        
        return configuracionActualizada;
      }),
      catchError(error => {
        console.error('Error al actualizar configuración del sistema:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza los ajustes locales en el BehaviorSubject
   */
  private actualizarAjustesLocales(tipo: keyof AjustesCompletos, configuracion: any) {
    const ajustesActuales = this.ajustesSubject.value;
    if (ajustesActuales) {
      ajustesActuales[tipo] = configuracion;
      this.ajustesSubject.next({ ...ajustesActuales });
    }
  }

  /**
   * Crea configuración de empresa por defecto
   */
  private async crearConfiguracionEmpresaPorDefecto(): Promise<ConfiguracionEmpresa> {
    const configuracionPorDefecto = {
      nombre_empresa: 'Mi Empresa',
      cif: '',
      direccion: '',
      telefono: '',
      email: '',
      web: '',
      logo_url: '',
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString()
    };

    const { data, error } = await this.supabase
      .from('configuracion_empresa')
      .insert([configuracionPorDefecto])
      .select()
      .single();

    if (error) throw error;
    return data as ConfiguracionEmpresa;
  }

  /**
   * Crea configuración de facturación por defecto
   */
  private async crearConfiguracionFacturacionPorDefecto(): Promise<ConfiguracionFacturacion> {
    const configuracionPorDefecto = {
      iva_por_defecto: 21,
      moneda: 'EUR',
      formato_numero_factura: 'FAC-{YEAR}-{NUMBER}',
      dias_vencimiento: 30,
      texto_pie_factura: 'Gracias por confiar en nuestros servicios',
      condiciones_pago: 'Pago a 30 días',
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString()
    };

    const { data, error } = await this.supabase
      .from('configuracion_facturacion')
      .insert([configuracionPorDefecto])
      .select()
      .single();

    if (error) throw error;
    return data as ConfiguracionFacturacion;
  }

  /**
   * Crea configuración de notificaciones por defecto
   */
  private async crearConfiguracionNotificacionesPorDefecto(): Promise<ConfiguracionNotificaciones> {
    const configuracionPorDefecto = {
      email_notificaciones: true,
      email_avisos_nuevos: true,
      email_facturas_generadas: true,
      email_recordatorios: false,
      sms_notificaciones: false,
      sms_avisos_urgentes: false,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString()
    };

    const { data, error } = await this.supabase
      .from('configuracion_notificaciones')
      .insert([configuracionPorDefecto])
      .select()
      .single();

    if (error) throw error;
    return data as ConfiguracionNotificaciones;
  }

  /**
   * Crea configuración de avisos por defecto
   */
  private async crearConfiguracionAvisosPorDefecto(): Promise<ConfiguracionAvisos> {
    const configuracionPorDefecto = {
      tipos_urgencia: ['Baja', 'Media', 'Alta', 'Crítica'],
      estados_disponibles: ['Pendiente', 'En curso', 'Completado', 'Cancelado'],
      tiempo_maximo_respuesta: 24,
      asignacion_automatica: false,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString()
    };

    const { data, error } = await this.supabase
      .from('configuracion_avisos')
      .insert([configuracionPorDefecto])
      .select()
      .single();

    if (error) throw error;
    return data as ConfiguracionAvisos;
  }

  /**
   * Crea configuración del sistema por defecto
   */
  private async crearConfiguracionSistemaPorDefecto(): Promise<ConfiguracionSistema> {
    const configuracionPorDefecto = {
      backup_automatico: true,
      frecuencia_backup: 'diario',
      retencion_backup_dias: 30,
      modo_mantenimiento: false,
      mensaje_mantenimiento: 'Sistema en mantenimiento. Volveremos pronto.',
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString()
    };

    const { data, error } = await this.supabase
      .from('configuracion_sistema')
      .insert([configuracionPorDefecto])
      .select()
      .single();

    if (error) throw error;
    return data as ConfiguracionSistema;
  }

  /**
   * Obtiene el valor actual de ajustes
   */
  getAjustesActuales(): AjustesCompletos | null {
    return this.ajustesSubject.value;
  }

  /**
   * Limpia el estado de ajustes
   */
  limpiarAjustes(): void {
    this.ajustesSubject.next(null);
  }
} 