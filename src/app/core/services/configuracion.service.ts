import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AjustesService } from '../../modules/ajustes/services/ajustes.service';
import { AjustesCompletos } from '../../modules/ajustes/models/ajustes.model';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private configuracionSubject = new BehaviorSubject<AjustesCompletos | null>(null);
  public configuracion$ = this.configuracionSubject.asObservable();

  constructor(private ajustesService: AjustesService) {
    this.cargarConfiguracion();
  }

  /**
   * Carga la configuración completa del sistema
   */
  private cargarConfiguracion(): void {
    this.ajustesService.getAjustesCompletos().pipe(
      tap(configuracion => {
        this.configuracionSubject.next(configuracion);
      }),
      catchError(error => {
        console.error('Error al cargar configuración:', error);
        return of(null);
      })
    ).subscribe();
  }

  /**
   * Obtiene el precio por hora de mano de obra
   */
  getPrecioHoraManoObra(): Observable<number> {
    return this.configuracion$.pipe(
      map(config => config?.empresa?.precio_hora_mano_obra || 50)
    );
  }

  /**
   * Obtiene el precio por hora de mano de obra de forma síncrona
   */
  getPrecioHoraManoObraSync(): number {
    const config = this.configuracionSubject.value;
    return config?.empresa?.precio_hora_mano_obra || 50;
  }

  /**
   * Obtiene el IVA por defecto
   */
  getIvaPorDefecto(): Observable<number> {
    return this.configuracion$.pipe(
      map(config => config?.facturacion?.iva_por_defecto || 21)
    );
  }

  /**
   * Obtiene la moneda por defecto
   */
  getMonedaPorDefecto(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.facturacion?.moneda || 'EUR')
    );
  }

  /**
   * Obtiene el formato de número de factura
   */
  getFormatoNumeroFactura(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.facturacion?.formato_numero_factura || 'FAC-{YEAR}-{NUMBER}')
    );
  }

  /**
   * Obtiene los días de vencimiento por defecto
   */
  getDiasVencimiento(): Observable<number> {
    return this.configuracion$.pipe(
      map(config => config?.facturacion?.dias_vencimiento || 30)
    );
  }

  /**
   * Obtiene el texto del pie de factura
   */
  getTextoPieFactura(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.facturacion?.texto_pie_factura || '')
    );
  }

  /**
   * Obtiene las condiciones de pago
   */
  getCondicionesPago(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.facturacion?.condiciones_pago || '')
    );
  }

  /**
   * Obtiene los datos de la empresa
   */
  getDatosEmpresa(): Observable<any> {
    return this.configuracion$.pipe(
      map(config => config?.empresa || null)
    );
  }

  /**
   * Obtiene el nombre de la empresa
   */
  getNombreEmpresa(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.empresa?.nombre_empresa || 'Mi Empresa')
    );
  }

  /**
   * Obtiene el CIF de la empresa
   */
  getCifEmpresa(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.empresa?.cif || '')
    );
  }

  /**
   * Obtiene la dirección de la empresa
   */
  getDireccionEmpresa(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.empresa?.direccion || '')
    );
  }

  /**
   * Obtiene el teléfono de la empresa
   */
  getTelefonoEmpresa(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.empresa?.telefono || '')
    );
  }

  /**
   * Obtiene el email de la empresa
   */
  getEmailEmpresa(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.empresa?.email || '')
    );
  }

  /**
   * Obtiene la web de la empresa
   */
  getWebEmpresa(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.empresa?.web || '')
    );
  }

  /**
   * Obtiene la URL del logo de la empresa
   */
  getLogoEmpresa(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.empresa?.logo_url || '')
    );
  }

  /**
   * Obtiene los tipos de urgencia disponibles
   */
  getTiposUrgencia(): Observable<string[]> {
    return this.configuracion$.pipe(
      map(config => config?.avisos?.tipos_urgencia || ['Baja', 'Media', 'Alta', 'Crítica'])
    );
  }

  /**
   * Obtiene los estados disponibles para avisos
   */
  getEstadosDisponibles(): Observable<string[]> {
    return this.configuracion$.pipe(
      map(config => config?.avisos?.estados_disponibles || ['Pendiente', 'En curso', 'Completado', 'Cancelado'])
    );
  }

  /**
   * Obtiene el tiempo máximo de respuesta en horas
   */
  getTiempoMaximoRespuesta(): Observable<number> {
    return this.configuracion$.pipe(
      map(config => config?.avisos?.tiempo_maximo_respuesta || 24)
    );
  }

  /**
   * Obtiene si está habilitada la asignación automática
   */
  getAsignacionAutomatica(): Observable<boolean> {
    return this.configuracion$.pipe(
      map(config => config?.avisos?.asignacion_automatica || false)
    );
  }

  /**
   * Obtiene si están habilitadas las notificaciones por email
   */
  getEmailNotificaciones(): Observable<boolean> {
    return this.configuracion$.pipe(
      map(config => config?.notificaciones?.email_notificaciones || true)
    );
  }

  /**
   * Obtiene si están habilitadas las notificaciones de avisos nuevos
   */
  getEmailAvisosNuevos(): Observable<boolean> {
    return this.configuracion$.pipe(
      map(config => config?.notificaciones?.email_avisos_nuevos || true)
    );
  }

  /**
   * Obtiene si están habilitadas las notificaciones de facturas generadas
   */
  getEmailFacturasGeneradas(): Observable<boolean> {
    return this.configuracion$.pipe(
      map(config => config?.notificaciones?.email_facturas_generadas || true)
    );
  }

  /**
   * Obtiene si está habilitado el backup automático
   */
  getBackupAutomatico(): Observable<boolean> {
    return this.configuracion$.pipe(
      map(config => config?.sistema?.backup_automatico || true)
    );
  }

  /**
   * Obtiene la frecuencia de backup
   */
  getFrecuenciaBackup(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.sistema?.frecuencia_backup || 'diario')
    );
  }

  /**
   * Obtiene los días de retención de backup
   */
  getRetencionBackupDias(): Observable<number> {
    return this.configuracion$.pipe(
      map(config => config?.sistema?.retencion_backup_dias || 30)
    );
  }

  /**
   * Obtiene si está en modo mantenimiento
   */
  getModoMantenimiento(): Observable<boolean> {
    return this.configuracion$.pipe(
      map(config => config?.sistema?.modo_mantenimiento || false)
    );
  }

  /**
   * Obtiene el mensaje de mantenimiento
   */
  getMensajeMantenimiento(): Observable<string> {
    return this.configuracion$.pipe(
      map(config => config?.sistema?.mensaje_mantenimiento || '')
    );
  }

  /**
   * Obtiene la configuración completa actual
   */
  getConfiguracionActual(): AjustesCompletos | null {
    return this.configuracionSubject.value;
  }

  /**
   * Recarga la configuración desde la base de datos
   */
  recargarConfiguracion(): void {
    this.cargarConfiguracion();
  }
}
