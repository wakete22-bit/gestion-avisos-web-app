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
  private ajustesSubject = new BehaviorSubject<AjustesCompletos | null>(null);
  public ajustes$ = this.ajustesSubject.asObservable();

  constructor(private supabaseClientService: SupabaseClientService) {
    // NO asignar cliente estático - usar método dinámico
  }

  /**
   * Obtiene el cliente Supabase actualizado dinámicamente
   */
  private getSupabaseClient(): SupabaseClient {
    console.log('⚙️ AjustesService: Obteniendo cliente Supabase actualizado...');
    return this.supabaseClientService.getClient();
  }

  /**
   * Obtiene todas las configuraciones del sistema usando fetch directo
   */
  getAjustesCompletos(): Observable<AjustesCompletos> {
    console.log('🚀 AjustesService: Usando FETCH DIRECTO para obtener ajustes completos...');
    
    return from(this.fetchAjustesCompletosDirect()).pipe(
      map(ajustes => {
        console.log('✅ AjustesService: FETCH DIRECTO completado para ajustes completos');
        this.ajustesSubject.next(ajustes);
        return ajustes;
      }),
      catchError(error => {
        console.error('❌ AjustesService: Error en FETCH DIRECTO para ajustes completos:', error);
        throw error;
      })
    );
  }

  /**
   * Método privado para obtener ajustes completos con fetch directo
   */
  private async fetchAjustesCompletosDirect(): Promise<AjustesCompletos> {
    console.log('🚀 AjustesService: Ejecutando fetch directo para ajustes completos...');
    
    try {
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json'
      };

      // Obtener todas las configuraciones en paralelo
      const [empresaData, facturacionData, notificacionesData, avisosData, sistemaData] = await Promise.all([
        this.fetchConfiguracionDirect('configuracion_empresa', headers),
        this.fetchConfiguracionDirect('configuracion_facturacion', headers),
        this.fetchConfiguracionDirect('configuracion_notificaciones', headers),
        this.fetchConfiguracionDirect('configuracion_avisos', headers),
        this.fetchConfiguracionDirect('configuracion_sistema', headers)
      ]);

      const ajustes: AjustesCompletos = {
        empresa: empresaData as ConfiguracionEmpresa,
        facturacion: facturacionData as ConfiguracionFacturacion,
        notificaciones: notificacionesData as ConfiguracionNotificaciones,
        avisos: avisosData as ConfiguracionAvisos,
        sistema: sistemaData as ConfiguracionSistema
      };

      console.log('✅ Ajustes completos obtenidos con FETCH DIRECTO:', ajustes);
      return ajustes;

    } catch (error) {
      console.error('🚀 Error en fetch directo para ajustes completos:', error);
      throw error;
    }
  }

  /**
   * Método helper para obtener una configuración específica con fetch directo
   */
  private async fetchConfiguracionDirect(tabla: string, headers: any): Promise<any> {
    const url = `${environment.supabaseUrl}/rest/v1/${tabla}?select=*&limit=1`;
    
    const response = await fetch(url, { method: 'GET', headers });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data || data.length === 0) {
      // Si no hay datos, crear configuración por defecto
      return await this.crearConfiguracionPorDefecto(tabla, headers);
    }
    
    return data[0];
  }

  /**
   * Crea una configuración por defecto usando fetch directo
   */
  private async crearConfiguracionPorDefecto(tabla: string, headers: any): Promise<any> {
    console.log(`🆕 Creando configuración por defecto para ${tabla}...`);
    
    let configuracionPorDefecto: any;
    
    switch (tabla) {
      case 'configuracion_empresa':
        configuracionPorDefecto = {
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
        break;
      case 'configuracion_facturacion':
        configuracionPorDefecto = {
          iva_por_defecto: 21,
          moneda: 'EUR',
          formato_numero_factura: 'FAC-{YEAR}-{NUMBER}',
          dias_vencimiento: 30,
          texto_pie_factura: 'Gracias por confiar en nuestros servicios',
          condiciones_pago: 'Pago a 30 días',
          fecha_creacion: new Date().toISOString(),
          fecha_actualizacion: new Date().toISOString()
        };
        break;
      case 'configuracion_notificaciones':
        configuracionPorDefecto = {
          email_notificaciones: true,
          email_avisos_nuevos: true,
          email_facturas_generadas: true,
          email_recordatorios: false,
          sms_notificaciones: false,
          sms_avisos_urgentes: false,
          fecha_creacion: new Date().toISOString(),
          fecha_actualizacion: new Date().toISOString()
        };
        break;
      case 'configuracion_avisos':
        configuracionPorDefecto = {
          tipos_urgencia: ['Baja', 'Media', 'Alta', 'Crítica'],
          estados_disponibles: ['Pendiente', 'En curso', 'Completado', 'Cancelado'],
          tiempo_maximo_respuesta: 24,
          asignacion_automatica: false,
          fecha_creacion: new Date().toISOString(),
          fecha_actualizacion: new Date().toISOString()
        };
        break;
      case 'configuracion_sistema':
        configuracionPorDefecto = {
          backup_automatico: true,
          frecuencia_backup: 'diario',
          retencion_backup_dias: 30,
          modo_mantenimiento: false,
          mensaje_mantenimiento: 'Sistema en mantenimiento. Volveremos pronto.',
          fecha_creacion: new Date().toISOString(),
          fecha_actualizacion: new Date().toISOString()
        };
        break;
      default:
        throw new Error(`Tabla no reconocida: ${tabla}`);
    }

    const url = `${environment.supabaseUrl}/rest/v1/${tabla}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(configuracionPorDefecto)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log(`✅ Configuración por defecto creada para ${tabla}:`, data[0]);
    return data[0];
  }

  /**
   * Obtiene la configuración de empresa usando fetch directo
   */
  getConfiguracionEmpresa(): Observable<ConfiguracionEmpresa> {
    console.log('🚀 AjustesService: Usando FETCH DIRECTO para configuración de empresa...');
    
    return from(this.fetchConfiguracionEmpresaDirect()).pipe(
      map(configuracion => {
        console.log('✅ AjustesService: FETCH DIRECTO completado para configuración de empresa');
        return configuracion;
      }),
      catchError(error => {
        console.error('❌ AjustesService: Error en FETCH DIRECTO para configuración de empresa:', error);
        throw error;
      })
    );
  }

  /**
   * Método privado para obtener configuración de empresa con fetch directo
   */
  private async fetchConfiguracionEmpresaDirect(): Promise<ConfiguracionEmpresa> {
    console.log('🚀 AjustesService: Ejecutando fetch directo para configuración de empresa...');
    
    try {
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json'
      };

      const url = `${environment.supabaseUrl}/rest/v1/configuracion_empresa?select=*&limit=1`;
      
      const response = await fetch(url, { method: 'GET', headers });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }
      
      const data = await response.json();
      
      if (!data || data.length === 0) {
        console.log('No hay configuración de empresa, creando por defecto...');
        return await this.crearConfiguracionPorDefecto('configuracion_empresa', headers) as ConfiguracionEmpresa;
      }
      
      console.log('✅ Configuración de empresa obtenida con FETCH DIRECTO:', data[0]);
      return data[0] as ConfiguracionEmpresa;

    } catch (error) {
      console.error('🚀 Error en fetch directo para configuración de empresa:', error);
      throw error;
    }
  }

  /**
   * Obtiene la configuración de facturación
   */
  getConfiguracionFacturacion(): Observable<ConfiguracionFacturacion> {
    return from(
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
      this.getSupabaseClient()
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
   * Actualiza la configuración de empresa usando fetch directo
   */
  actualizarConfiguracionEmpresa(datos: ActualizarEmpresaRequest): Observable<ConfiguracionEmpresa> {
    console.log('🚀 AjustesService: Usando FETCH DIRECTO para actualizar configuración de empresa...');
    
    return from(this.fetchActualizarConfiguracionEmpresaDirect(datos)).pipe(
      map(configuracion => {
        console.log('✅ AjustesService: FETCH DIRECTO completado, configuración de empresa actualizada');
        return configuracion;
      }),
      catchError(error => {
        console.error('❌ AjustesService: Error en FETCH DIRECTO para actualizar configuración de empresa:', error);
        throw error;
      })
    );
  }

  /**
   * Método privado para actualizar configuración de empresa con fetch directo
   */
  private async fetchActualizarConfiguracionEmpresaDirect(datos: ActualizarEmpresaRequest): Promise<ConfiguracionEmpresa> {
    console.log('🚀 AjustesService: Ejecutando fetch directo para actualizar configuración de empresa...');
    
    try {
      const datosActualizados = {
        ...datos,
        fecha_actualizacion: new Date().toISOString()
      };

      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      };

      // Primero verificar si existe una configuración
      const getUrl = `${environment.supabaseUrl}/rest/v1/configuracion_empresa?select=id&limit=1`;
      
      const getResponse = await fetch(getUrl, { method: 'GET', headers });
      
      if (!getResponse.ok) {
        const errorText = await getResponse.text();
        throw new Error(`HTTP ${getResponse.status}: ${getResponse.statusText} - ${errorText}`);
      }
      
      const existingData = await getResponse.json();
      
      let response;
      
      if (existingData && existingData.length > 0) {
        // Existe configuración, actualizar
        const idExistente = existingData[0].id;
        console.log('✅ Actualizando configuración existente con ID:', idExistente);
        
        const updateUrl = `${environment.supabaseUrl}/rest/v1/configuracion_empresa?id=eq.${idExistente}`;
        
        response = await fetch(updateUrl, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(datosActualizados)
        });
      } else {
        // No existe configuración, crear nueva
        console.log('🆕 Creando nueva configuración de empresa');
        
        const createUrl = `${environment.supabaseUrl}/rest/v1/configuracion_empresa`;
        
        response = await fetch(createUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            ...datosActualizados,
            fecha_creacion: new Date().toISOString()
          })
        });
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }
      
      const data = await response.json();
      const configuracionActualizada = data[0] as ConfiguracionEmpresa;
      
      console.log('✅ Configuración de empresa actualizada con FETCH DIRECTO:', configuracionActualizada);
      
      // Actualizar ajustes locales
      this.actualizarAjustesLocales('empresa', configuracionActualizada);
      
      return configuracionActualizada;

    } catch (error) {
      console.error('🚀 Error en fetch directo para actualizar configuración de empresa:', error);
      throw error;
    }
  }

  /**
   * Método helper genérico para actualizar configuraciones con fetch directo
   */
  private async fetchActualizarConfiguracionDirect<T>(
    tabla: string, 
    datos: any, 
    tipo: keyof AjustesCompletos
  ): Promise<T> {
    console.log(`🚀 AjustesService: Ejecutando fetch directo para actualizar ${tabla}...`);
    
    try {
      const datosActualizados = {
        ...datos,
        fecha_actualizacion: new Date().toISOString()
      };

      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      };

      // Primero verificar si existe una configuración
      const getUrl = `${environment.supabaseUrl}/rest/v1/${tabla}?select=id&limit=1`;
      
      const getResponse = await fetch(getUrl, { method: 'GET', headers });
      
      if (!getResponse.ok) {
        const errorText = await getResponse.text();
        throw new Error(`HTTP ${getResponse.status}: ${getResponse.statusText} - ${errorText}`);
      }
      
      const existingData = await getResponse.json();
      
      let response;
      
      if (existingData && existingData.length > 0) {
        // Existe configuración, actualizar
        const idExistente = existingData[0].id;
        console.log(`✅ Actualizando configuración existente de ${tabla} con ID:`, idExistente);
        
        const updateUrl = `${environment.supabaseUrl}/rest/v1/${tabla}?id=eq.${idExistente}`;
        
        response = await fetch(updateUrl, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(datosActualizados)
        });
      } else {
        // No existe configuración, crear nueva
        console.log(`🆕 Creando nueva configuración de ${tabla}`);
        
        const createUrl = `${environment.supabaseUrl}/rest/v1/${tabla}`;
        
        response = await fetch(createUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            ...datosActualizados,
            fecha_creacion: new Date().toISOString()
          })
        });
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }
      
      const data = await response.json();
      const configuracionActualizada = data[0] as T;
      
      console.log(`✅ Configuración de ${tabla} actualizada con FETCH DIRECTO:`, configuracionActualizada);
      
      // Actualizar ajustes locales
      this.actualizarAjustesLocales(tipo, configuracionActualizada);
      
      return configuracionActualizada;

    } catch (error) {
      console.error(`🚀 Error en fetch directo para actualizar ${tabla}:`, error);
      throw error;
    }
  }

  /**
   * Actualiza la configuración de facturación usando fetch directo
   */
  actualizarConfiguracionFacturacion(datos: ActualizarFacturacionRequest): Observable<ConfiguracionFacturacion> {
    console.log('🚀 AjustesService: Usando FETCH DIRECTO para actualizar configuración de facturación...');
    
    return from(this.fetchActualizarConfiguracionDirect<ConfiguracionFacturacion>(
      'configuracion_facturacion', 
      datos, 
      'facturacion'
    )).pipe(
      map(configuracion => {
        console.log('✅ AjustesService: FETCH DIRECTO completado, configuración de facturación actualizada');
        return configuracion;
      }),
      catchError(error => {
        console.error('❌ AjustesService: Error en FETCH DIRECTO para actualizar configuración de facturación:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza la configuración de notificaciones usando fetch directo
   */
  actualizarConfiguracionNotificaciones(datos: ActualizarNotificacionesRequest): Observable<ConfiguracionNotificaciones> {
    console.log('🚀 AjustesService: Usando FETCH DIRECTO para actualizar configuración de notificaciones...');
    
    return from(this.fetchActualizarConfiguracionDirect<ConfiguracionNotificaciones>(
      'configuracion_notificaciones', 
      datos, 
      'notificaciones'
    )).pipe(
      map(configuracion => {
        console.log('✅ AjustesService: FETCH DIRECTO completado, configuración de notificaciones actualizada');
        return configuracion;
      }),
      catchError(error => {
        console.error('❌ AjustesService: Error en FETCH DIRECTO para actualizar configuración de notificaciones:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza la configuración de avisos usando fetch directo
   */
  actualizarConfiguracionAvisos(datos: ActualizarAvisosRequest): Observable<ConfiguracionAvisos> {
    console.log('🚀 AjustesService: Usando FETCH DIRECTO para actualizar configuración de avisos...');
    
    return from(this.fetchActualizarConfiguracionDirect<ConfiguracionAvisos>(
      'configuracion_avisos', 
      datos, 
      'avisos'
    )).pipe(
      map(configuracion => {
        console.log('✅ AjustesService: FETCH DIRECTO completado, configuración de avisos actualizada');
        return configuracion;
      }),
      catchError(error => {
        console.error('❌ AjustesService: Error en FETCH DIRECTO para actualizar configuración de avisos:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza la configuración del sistema usando fetch directo
   */
  actualizarConfiguracionSistema(datos: ActualizarSistemaRequest): Observable<ConfiguracionSistema> {
    console.log('🚀 AjustesService: Usando FETCH DIRECTO para actualizar configuración del sistema...');
    
    return from(this.fetchActualizarConfiguracionDirect<ConfiguracionSistema>(
      'configuracion_sistema', 
      datos, 
      'sistema'
    )).pipe(
      map(configuracion => {
        console.log('✅ AjustesService: FETCH DIRECTO completado, configuración del sistema actualizada');
        return configuracion;
      }),
      catchError(error => {
        console.error('❌ AjustesService: Error en FETCH DIRECTO para actualizar configuración del sistema:', error);
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

    const { data, error } = await this.getSupabaseClient()
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

    const { data, error } = await this.getSupabaseClient()
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

    const { data, error } = await this.getSupabaseClient()
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

    const { data, error } = await this.getSupabaseClient()
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

    const { data, error } = await this.getSupabaseClient()
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