import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseClientService } from '../../../core/services/supabase-client.service';
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

  constructor(private supabaseClientService: SupabaseClientService) {
    this.supabase = this.supabaseClientService.getClient();
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
        .limit(1)
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          console.error('Error al obtener configuración de empresa:', error);
          throw error;
        }
        
        // Si no hay datos, crear configuración por defecto
        if (!data || data.length === 0) {
          console.log('No hay configuración de empresa, creando por defecto...');
          return from(this.crearConfiguracionEmpresaPorDefecto());
        }
        
        return from(Promise.resolve(data[0] as ConfiguracionEmpresa));
      }),
      catchError(error => {
        console.error('Error al obtener configuración de empresa:', error);
        // Si hay error, intentar crear configuración por defecto
        return from(this.crearConfiguracionEmpresaPorDefecto());
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
        .limit(1)
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          console.error('Error al obtener configuración de facturación:', error);
          throw error;
        }
        
        // Si no hay datos, crear configuración por defecto
        if (!data || data.length === 0) {
          console.log('No hay configuración de facturación, creando por defecto...');
          return from(this.crearConfiguracionFacturacionPorDefecto());
        }
        
        return from(Promise.resolve(data[0] as ConfiguracionFacturacion));
      }),
      catchError(error => {
        console.error('Error al obtener configuración de facturación:', error);
        // Si hay error, intentar crear configuración por defecto
        return from(this.crearConfiguracionFacturacionPorDefecto());
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
        .limit(1)
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          console.error('Error al obtener configuración de notificaciones:', error);
          throw error;
        }
        
        // Si no hay datos, crear configuración por defecto
        if (!data || data.length === 0) {
          console.log('No hay configuración de notificaciones, creando por defecto...');
          return from(this.crearConfiguracionNotificacionesPorDefecto());
        }
        
        return from(Promise.resolve(data[0] as ConfiguracionNotificaciones));
      }),
      catchError(error => {
        console.error('Error al obtener configuración de notificaciones:', error);
        // Si hay error, intentar crear configuración por defecto
        return from(this.crearConfiguracionNotificacionesPorDefecto());
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
        .limit(1)
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          console.error('Error al obtener configuración de avisos:', error);
          throw error;
        }
        
        // Si no hay datos, crear configuración por defecto
        if (!data || data.length === 0) {
          console.log('No hay configuración de avisos, creando por defecto...');
          return from(this.crearConfiguracionAvisosPorDefecto());
        }
        
        return from(Promise.resolve(data[0] as ConfiguracionAvisos));
      }),
      catchError(error => {
        console.error('Error al obtener configuración de avisos:', error);
        // Si hay error, intentar crear configuración por defecto
        return from(this.crearConfiguracionAvisosPorDefecto());
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
        .limit(1)
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          console.error('Error al obtener configuración del sistema:', error);
          throw error;
        }
        
        // Si no hay datos, crear configuración por defecto
        if (!data || data.length === 0) {
          console.log('No hay configuración del sistema, creando por defecto...');
          return from(this.crearConfiguracionSistemaPorDefecto());
        }
        
        return from(Promise.resolve(data[0] as ConfiguracionSistema));
      }),
      catchError(error => {
        console.error('Error al obtener configuración del sistema:', error);
        // Si hay error, intentar crear configuración por defecto
        return from(this.crearConfiguracionSistemaPorDefecto());
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

    console.log('🔄 Actualizando configuración de empresa:', datosActualizados);

    // Primero buscar si existe una configuración
    return from(
      this.supabase
        .from('configuracion_empresa')
        .select('id')
        .limit(1)
    ).pipe(
      switchMap(({ data: existingData, error: selectError }) => {
        if (selectError) {
          console.error('❌ Error verificando configuración existente:', selectError);
          throw selectError;
        }

        console.log('📊 Datos existentes encontrados:', existingData);

        if (existingData && existingData.length > 0) {
          // Existe configuración, actualizar
          const idExistente = existingData[0].id;
          console.log('✅ Actualizando configuración existente con ID:', idExistente);
          
          return from(
            this.supabase
              .from('configuracion_empresa')
              .update(datosActualizados)
              .eq('id', idExistente)
              .select('*')
              .single()
          );
        } else {
          // No existe configuración, crear nueva
          console.log('🆕 Creando nueva configuración de empresa');
          
          return from(
            this.supabase
              .from('configuracion_empresa')
              .insert([{
                ...datosActualizados,
                fecha_creacion: new Date().toISOString()
              }])
              .select('*')
              .single()
          );
        }
      }),
      map(({ data, error }) => {
        if (error) {
          console.error('❌ Error en operación de base de datos:', error);
          throw error;
        }
        
        console.log('✅ Configuración actualizada exitosamente:', data);
        const configuracionActualizada = data as ConfiguracionEmpresa;
        this.actualizarAjustesLocales('empresa', configuracionActualizada);
        
        return configuracionActualizada;
      }),
      catchError(error => {
        console.error('❌ Error al actualizar configuración de empresa:', error);
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

    // Primero buscar si existe una configuración
    return from(
      this.supabase
        .from('configuracion_facturacion')
        .select('id')
        .limit(1)
    ).pipe(
      switchMap(({ data: existingData, error: selectError }) => {
        if (selectError) {
          console.error('Error verificando configuración existente:', selectError);
          throw selectError;
        }

        if (existingData && existingData.length > 0) {
          // Existe configuración, actualizar
          const idExistente = existingData[0].id;
          console.log('Actualizando configuración de facturación existente con ID:', idExistente);
          
          return from(
            this.supabase
              .from('configuracion_facturacion')
              .update(datosActualizados)
              .eq('id', idExistente)
              .select('*')
              .single()
          );
        } else {
          // No existe configuración, crear nueva
          console.log('Creando nueva configuración de facturación');
          
          return from(
            this.supabase
              .from('configuracion_facturacion')
              .insert([{
                ...datosActualizados,
                fecha_creacion: new Date().toISOString()
              }])
              .select('*')
              .single()
          );
        }
      }),
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

    // Primero buscar si existe una configuración
    return from(
      this.supabase
        .from('configuracion_notificaciones')
        .select('id')
        .limit(1)
    ).pipe(
      switchMap(({ data: existingData, error: selectError }) => {
        if (selectError) {
          console.error('Error verificando configuración existente:', selectError);
          throw selectError;
        }

        if (existingData && existingData.length > 0) {
          // Existe configuración, actualizar
          const idExistente = existingData[0].id;
          console.log('Actualizando configuración de notificaciones existente con ID:', idExistente);
          
          return from(
            this.supabase
              .from('configuracion_notificaciones')
              .update(datosActualizados)
              .eq('id', idExistente)
              .select('*')
              .single()
          );
        } else {
          // No existe configuración, crear nueva
          console.log('Creando nueva configuración de notificaciones');
          
          return from(
            this.supabase
              .from('configuracion_notificaciones')
              .insert([{
                ...datosActualizados,
                fecha_creacion: new Date().toISOString()
              }])
              .select('*')
              .single()
          );
        }
      }),
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

    // Primero buscar si existe una configuración
    return from(
      this.supabase
        .from('configuracion_avisos')
        .select('id')
        .limit(1)
    ).pipe(
      switchMap(({ data: existingData, error: selectError }) => {
        if (selectError) {
          console.error('Error verificando configuración existente:', selectError);
          throw selectError;
        }

        if (existingData && existingData.length > 0) {
          // Existe configuración, actualizar
          const idExistente = existingData[0].id;
          console.log('Actualizando configuración de avisos existente con ID:', idExistente);
          
          return from(
            this.supabase
              .from('configuracion_avisos')
              .update(datosActualizados)
              .eq('id', idExistente)
              .select('*')
              .single()
          );
        } else {
          // No existe configuración, crear nueva
          console.log('Creando nueva configuración de avisos');
          
          return from(
            this.supabase
              .from('configuracion_avisos')
              .insert([{
                ...datosActualizados,
                fecha_creacion: new Date().toISOString()
              }])
              .select('*')
              .single()
          );
        }
      }),
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

    // Primero buscar si existe una configuración
    return from(
      this.supabase
        .from('configuracion_sistema')
        .select('id')
        .limit(1)
    ).pipe(
      switchMap(({ data: existingData, error: selectError }) => {
        if (selectError) {
          console.error('Error verificando configuración existente:', selectError);
          throw selectError;
        }

        if (existingData && existingData.length > 0) {
          // Existe configuración, actualizar
          const idExistente = existingData[0].id;
          console.log('Actualizando configuración del sistema existente con ID:', idExistente);
          
          return from(
            this.supabase
              .from('configuracion_sistema')
              .update(datosActualizados)
              .eq('id', idExistente)
              .select('*')
              .single()
          );
        } else {
          // No existe configuración, crear nueva
          console.log('Creando nueva configuración del sistema');
          
          return from(
            this.supabase
              .from('configuracion_sistema')
              .insert([{
                ...datosActualizados,
                fecha_creacion: new Date().toISOString()
              }])
              .select('*')
              .single()
          );
        }
      }),
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
      console.log('✅ Ajustes locales actualizados:', tipo, configuracion);
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
      precio_hora_mano_obra: 50.00,
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