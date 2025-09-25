import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from, forkJoin } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
    Aviso,
    AvisoResponse,
    CrearAvisoRequest,
    ActualizarAvisoRequest,
    FotoAviso
} from '../../modules/avisos/models/aviso.model';
import { SupabaseClientService } from './supabase-client.service';
import { CacheService } from './cache.service';

@Injectable({
    providedIn: 'root'
})
export class AvisosService {
    private avisosSubject = new BehaviorSubject<Aviso[]>([]);
    public avisos$ = this.avisosSubject.asObservable();

    constructor(
        private supabaseClientService: SupabaseClientService,
        private cacheService: CacheService
    ) {
        // NO asignar cliente estático - usar método dinámico
    }

    /**
     * Obtiene el cliente Supabase actualizado dinámicamente
     */
    private getSupabaseClient(): SupabaseClient {
        console.log('🔍 AvisosService: Obteniendo cliente Supabase actualizado...');
        return this.supabaseClientService.getClient();
    }

    /**
     * Método de debug para probar la conexión básica
     */
    debugConnection(): Observable<any> {
        console.log('🔍 AvisosService: Probando conexión básica...');
        
        return from(
            this.getSupabaseClient()
                .from('avisos')
                .select('id')
                .limit(1)
        ).pipe(
            map(({ data, error }) => {
                if (error) {
                    console.error('❌ AvisosService: Error en conexión:', error);
                    throw error;
                }
                console.log('✅ AvisosService: Conexión exitosa, datos:', data);
                return { success: true, data };
            }),
            catchError(error => {
                console.error('❌ AvisosService: Error crítico:', error);
                return from(Promise.resolve({ success: false, error }));
            })
        );
    }

    /**
     * Obtiene la lista de avisos con paginación y filtros - VERSIÓN OPTIMIZADA
     */
    getAvisos(
        pagina: number = 1,
        porPagina: number = 15, // Reducido a 15 para mejor rendimiento
        busqueda?: string,
        ordenarPor?: string,
        orden?: 'asc' | 'desc',
        estado?: string,
        incluirCompletados: boolean = false
    ): Observable<AvisoResponse> {
        // Consulta optimizada - incluir solo campos esenciales
        let query = this.getSupabaseClient()
            .from('avisos')
            .select(`
                id,
                numero_secuencial,
                cliente_id,
                tecnico_asignado_id,
                fecha_creacion,
                nombre_cliente_aviso,
                direccion_cliente_aviso,
                telefono_cliente_aviso,
                nombre_contacto,
                tipo,
                descripcion_problema,
                estado,
                urgencia,
                es_urgente,
                latitud,
                longitud,
                cliente:clientes!inner(id, nombre_completo, direccion, telefono_contacto),
                tecnico_asignado:usuarios(id, nombre_completo, email)
            `, { count: 'exact' });

        // Aplicar filtros de manera más eficiente
        if (busqueda) {
            query = query.or(`nombre_cliente_aviso.ilike.%${busqueda}%,descripcion_problema.ilike.%${busqueda}%`);
        }

        if (estado) {
            query = query.eq('estado', estado);
        } else if (!incluirCompletados) {
            query = query.neq('estado', 'Completado');
        }

        // Aplicar paginación y ordenamiento
        const desde = (pagina - 1) * porPagina;
        query = query
            .range(desde, desde + porPagina - 1)
            .order(ordenarPor || 'numero_secuencial', { ascending: orden === 'asc' });

        return from(query).pipe(
            map(({ data, error, count }) => {
                if (error) throw error;

                const avisos = data as unknown as Aviso[];
                this.avisosSubject.next(avisos);

                return {
                    avisos,
                    total: count || 0,
                    pagina,
                    por_pagina: porPagina
                };
            }),
            catchError(error => {
                console.error('Error al obtener avisos:', error);
                throw error;
            })
        );
    }

    /**
     * Obtiene la lista de avisos usando FETCH DIRECTO - EVITA BLOQUEOS
     */
    getAvisosDirect(
        pagina: number = 1,
        porPagina: number = 15,
        busqueda?: string,
        ordenarPor?: string,
        orden?: 'asc' | 'desc',
        estado?: string,
        incluirCompletados: boolean = false
    ): Observable<AvisoResponse> {
        console.log('🚀 AvisosService: Usando FETCH DIRECTO para avisos...');
        
        return from(this.fetchAvisosDirect(pagina, porPagina, busqueda, ordenarPor, orden, estado, incluirCompletados)).pipe(
            map(result => {
                console.log('✅ AvisosService: FETCH DIRECTO completado, avisos:', result.avisos.length);
                
                // Actualizar el subject local
                this.avisosSubject.next(result.avisos);
                
                return result;
            }),
            catchError(error => {
                console.error('❌ AvisosService: Error en FETCH DIRECTO:', error);
                throw error;
            })
        );
    }

    /**
     * Fetch directo para avisos - BYPASA CLIENTE SUPABASE
     */
    private async fetchAvisosDirect(
        pagina: number = 1,
        porPagina: number = 15,
        busqueda?: string,
        ordenarPor?: string,
        orden?: 'asc' | 'desc',
        estado?: string,
        incluirCompletados: boolean = false
    ): Promise<AvisoResponse> {
        console.log('🚀 AvisosService: Ejecutando fetch directo para avisos...');
        
        try {
            // Construir URL con parámetros - SIMPLIFICADA como el dashboard
            let url = `${environment.supabaseUrl}/rest/v1/avisos?select=*,cliente:clientes(*)`;

            // Aplicar filtros
            const filters: string[] = [];
            
            if (busqueda) {
                filters.push(`or=(nombre_cliente_aviso.ilike.*${busqueda}*,descripcion_problema.ilike.*${busqueda}*)`);
            }
            
            if (estado) {
                filters.push(`estado=eq.${estado}`);
            } else if (!incluirCompletados) {
                // Mostrar avisos activos: Pendiente, En curso, Pendiente de presupuesto, etc.
                // Usar OR en lugar de IN para mejor compatibilidad
                filters.push(`or=(estado.eq.Pendiente,estado.eq.En%20curso,estado.eq.Pendiente%20de%20presupuesto,estado.eq.Listo%20para%20facturar)`);
                console.log('🔍 Filtro aplicado: Mostrando avisos activos (excluyendo Completado)');
            }
            
            if (filters.length > 0) {
                url += '&' + filters.join('&');
            }
            
            // Aplicar paginación y ordenamiento
            const desde = (pagina - 1) * porPagina;
            const hasta = desde + porPagina - 1;
            url += `&limit=${porPagina}&offset=${desde}`;
            url += `&order=${ordenarPor || 'fecha_creacion'}.${orden === 'asc' ? 'asc' : 'desc'}`;
            
            const headers = {
                'apikey': environment.supabaseServiceKey,
                'Authorization': `Bearer ${environment.supabaseServiceKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'count=exact'
            };
            
            console.log('🚀 URL construida:', url);
            console.log('🚀 Headers:', headers);
            
            const startTime = Date.now();
            const response = await fetch(url, { method: 'GET', headers });
            const duration = Date.now() - startTime;
            
            console.log('🚀 Fetch completado en', duration, 'ms');
            console.log('🚀 Status:', response.status);
            console.log('🚀 Response headers:', response.headers);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('🚀 Error response body:', errorText);
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            const contentRange = response.headers.get('content-range');
            const total = contentRange ? parseInt(contentRange.split('/')[1]) : data.length;
            
            console.log('🚀 Datos recibidos:', data?.length || 0, 'avisos, total:', total);
            console.log('🚀 Primer aviso (si existe):', data[0]);
            
            return {
                avisos: data as Aviso[],
                total,
                pagina,
                por_pagina: porPagina
            };
            
        } catch (error) {
            console.error('🚀 Error en fetch directo:', error);
            throw error;
        }
    }

    /**
     * Obtiene un aviso por su ID - VERSIÓN OPTIMIZADA
     */
    getAviso(id: string): Observable<Aviso> {
        return from(
            this.getSupabaseClient()
                .from('avisos')
                .select(`
                    *,
                    cliente:clientes!inner(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(id, url, descripcion, fecha_subida)
                `)
                .eq('id', id)
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                return data as Aviso;
            }),
            catchError(error => {
                console.error('Error al obtener aviso:', error);
                throw error;
            })
        );
    }

    /**
     * Crea un nuevo aviso
     */
    crearAviso(aviso: CrearAvisoRequest): Observable<Aviso> {
        const avisoData = {
            ...aviso,
            urgencia: aviso.es_urgente ? 'Alta' : 'Normal', // Mapear es_urgente a urgencia
            fecha_creacion: new Date().toISOString(),
            estado: 'Pendiente', // ✅ Estado válido después de la migración
            requiere_presupuesto: false,
            requiere_nueva_visita: false
        };

        return from(
            this.getSupabaseClient()
                .from('avisos')
                .insert([avisoData])
                .select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `)
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;

                const nuevoAviso = data as Aviso;
                const avisosActuales = this.avisosSubject.value;
                this.avisosSubject.next([nuevoAviso, ...avisosActuales]);

                // Limpiar cache de avisos para forzar recarga
                this.cacheService.clearCache('avisos');

                return nuevoAviso;
            })
        );
    }

    /**
     * Actualiza un aviso existente usando FETCH DIRECTO - EVITA BLOQUEOS
     */
    actualizarAvisoDirect(id: string, aviso: ActualizarAvisoRequest): Observable<Aviso> {
        console.log('🚀 AvisosService: Usando FETCH DIRECTO para actualizar aviso...');
        
        return from(this.fetchActualizarAvisoDirect(id, aviso)).pipe(
            map(result => {
                console.log('✅ AvisosService: FETCH DIRECTO completado, aviso actualizado:', result.id);
                return result;
            }),
            catchError(error => {
                console.error('❌ AvisosService: Error en FETCH DIRECTO:', error);
                throw error;
            })
        );
    }

    /**
     * Fetch directo para actualizar aviso - BYPASA CLIENTE SUPABASE
     */
    private async fetchActualizarAvisoDirect(id: string, aviso: ActualizarAvisoRequest): Promise<Aviso> {
        console.log('🚀 AvisosService: Ejecutando fetch directo para actualizar aviso:', id);
        
        try {
            const datosActualizados = {
                ...aviso,
                fecha_actualizacion: new Date().toISOString()
            };

            const url = `${environment.supabaseUrl}/rest/v1/avisos?id=eq.${id}`;
            
            const headers = {
                'apikey': environment.supabaseServiceKey,
                'Authorization': `Bearer ${environment.supabaseServiceKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            };
            
            console.log('🚀 URL construida:', url);
            console.log('🚀 Datos a actualizar:', datosActualizados);
            
            const startTime = Date.now();
            const response = await fetch(url, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(datosActualizados)
            });
            const duration = Date.now() - startTime;
            
            console.log('🚀 Fetch completado en', duration, 'ms');
            console.log('🚀 Status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('🚀 Error response body:', errorText);
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('🚀 Datos recibidos:', data?.length || 0, 'avisos');
            
            if (!data || data.length === 0) {
                throw new Error('Aviso no encontrado');
            }
            
            const avisoActualizado = data[0] as Aviso;
            console.log('🚀 Aviso actualizado:', avisoActualizado);
            
            // Actualizar el subject local
            const avisosActuales = this.avisosSubject.value;
            const index = avisosActuales.findIndex(a => a.id === id);
            if (index !== -1) {
                avisosActuales[index] = avisoActualizado;
                this.avisosSubject.next([...avisosActuales]);
            }

            // Limpiar cache de avisos para forzar recarga
            this.cacheService.clearCache('avisos');
            
            return avisoActualizado;
            
        } catch (error) {
            console.error('🚀 Error en fetch directo:', error);
            throw error;
        }
    }

    /**
     * Actualiza un aviso existente
     */
    actualizarAviso(id: string, aviso: ActualizarAvisoRequest): Observable<Aviso> {
        const datosActualizados = {
            ...aviso,
            fecha_actualizacion: new Date().toISOString()
        };

        return from(
            this.getSupabaseClient()
                .from('avisos')
                .update(datosActualizados)
                .eq('id', id)
                .select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `)
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;

                const avisoActualizado = data as Aviso;
                const avisosActuales = this.avisosSubject.value;
                const index = avisosActuales.findIndex(a => a.id === id);
                if (index !== -1) {
                    avisosActuales[index] = avisoActualizado;
                    this.avisosSubject.next([...avisosActuales]);
                }

                // Limpiar cache de avisos para forzar recarga
                this.cacheService.clearCache('avisos');

                return avisoActualizado;
            })
        );
    }

    /**
     * Verifica si un aviso tiene dependencias que impidan su eliminación
     */
    verificarDependenciasAviso(id: string): Observable<{puedeEliminar: boolean, dependencias: string[]}> {
        console.log('🔍 Verificando dependencias para aviso:', id);
        
        return from(Promise.all([
            // Verificar presupuestos
            this.getSupabaseClient()
                .from('presupuestos')
                .select('id')
                .eq('aviso_id', id),
            // Verificar facturas
            this.getSupabaseClient()
                .from('facturas')
                .select('id')
                .eq('aviso_id', id),
            // Verificar albaranes
            this.getSupabaseClient()
                .from('albaranes')
                .select('id')
                .eq('aviso_id', id),
            // Verificar historial de flujo (solo para logging, no como dependencia)
            this.getSupabaseClient()
                .from('historial_flujo')
                .select('id')
                .eq('aviso_id', id)
        ])).pipe(
            map(([presupuestos, facturas, albaranes, historialFlujo]) => {
                console.log('📊 Resultados de verificación:', {
                    presupuestos: presupuestos.data?.length || 0,
                    facturas: facturas.data?.length || 0,
                    albaranes: albaranes.data?.length || 0,
                    historialFlujo: historialFlujo.data?.length || 0,
                    errores: {
                        presupuestos: presupuestos.error,
                        facturas: facturas.error,
                        albaranes: albaranes.error,
                        historialFlujo: historialFlujo.error
                    }
                });

                // Solo considerar como dependencias problemáticas las que NO se eliminan por CASCADE
                const dependencias: string[] = [];
                
                if (!presupuestos.error && presupuestos.data && presupuestos.data.length > 0) {
                    dependencias.push(`${presupuestos.data.length} presupuesto(s)`);
                }
                if (!facturas.error && facturas.data && facturas.data.length > 0) {
                    dependencias.push(`${facturas.data.length} factura(s)`);
                }
                if (!albaranes.error && albaranes.data && albaranes.data.length > 0) {
                    dependencias.push(`${albaranes.data.length} albarán(es)`);
                }
                
                // NO incluir historialFlujo como dependencia problemática
                // porque se elimina automáticamente por CASCADE
                if (!historialFlujo.error && historialFlujo.data && historialFlujo.data.length > 0) {
                    console.log(`ℹ️ Historial encontrado: ${historialFlujo.data.length} registro(s) (se eliminarán automáticamente por CASCADE)`);
                }

                // Si hay errores de permisos pero no hay datos, asumir que se puede eliminar
                const tieneErroresPermisos = presupuestos.error || facturas.error || albaranes.error;
                const puedeEliminar = dependencias.length === 0 || (tieneErroresPermisos && dependencias.length === 0);

                console.log('✅ Resultado de verificación:', {
                    puedeEliminar,
                    dependencias,
                    historialFlujo: historialFlujo.data?.length || 0,
                    historialSeEliminaAutomaticamente: true,
                    tieneErroresPermisos
                });

                return {
                    puedeEliminar: puedeEliminar ?? false,
                    dependencias
                };
            })
        );
    }

    /**
     * Elimina un aviso y todas sus dependencias usando eliminación manual
     */
    eliminarAviso(id: string): Observable<void> {
        console.log('🗑️ Iniciando eliminación de aviso:', id);
        
        // Usar directamente el método manual de eliminación
        return this.eliminarAvisoConDependencias(id);
    }

    /**
     * Elimina un aviso eliminando primero todas sus dependencias
     */
    private eliminarAvisoConDependencias(id: string): Observable<void> {
        console.log('🔄 Eliminando dependencias del aviso:', id);
        
        // Orden de eliminación: de más específico a más general
        const eliminaciones = [
            // 1. Eliminar historial de flujo
            from(this.getSupabaseClient().from('historial_flujo').delete().eq('aviso_id', id)),
            // 2. Eliminar albaranes (esto eliminará automáticamente los repuestos por CASCADE)
            from(this.getSupabaseClient().from('albaranes').delete().eq('aviso_id', id)),
            // 3. Eliminar presupuestos
            from(this.getSupabaseClient().from('presupuestos').delete().eq('aviso_id', id)),
            // 4. Eliminar facturas (si las hay)
            from(this.getSupabaseClient().from('facturas').delete().eq('aviso_id', id)),
            // 5. Eliminar fotos
            this.eliminarFotosAviso(id)
        ];

        // Ejecutar todas las eliminaciones en paralelo
        return forkJoin(eliminaciones).pipe(
            switchMap(() => {
                console.log('✅ Dependencias eliminadas, eliminando aviso...');
                
                // Ahora eliminar el aviso
                return from(
                    this.getSupabaseClient()
                        .from('avisos')
                        .delete()
                        .eq('id', id)
                );
            }),
            map(({ error }) => {
                if (error) {
                    console.error('❌ Error al eliminar aviso después de limpiar dependencias:', error);
                    throw error;
                }
                
                console.log('✅ Aviso eliminado exitosamente');
                this.actualizarEstadoLocal(id);
                return void 0;
            }),
            catchError(error => {
                console.error('❌ Error en eliminación en cascada:', error);
                throw error;
            })
        );
    }

    /**
     * Actualiza el estado local después de eliminar un aviso
     */
    private actualizarEstadoLocal(id: string): void {
        const avisosActuales = this.avisosSubject.value;
        const avisosFiltrados = avisosActuales.filter(a => a.id !== id);
        this.avisosSubject.next(avisosFiltrados);

        // Limpiar cache de avisos para forzar recarga
        this.cacheService.clearCache('avisos');
    }

    /**
     * Elimina todas las fotos asociadas a un aviso (incluyendo archivos del storage)
     */
    private eliminarFotosAviso(avisoId: string): Observable<void> {
        // Primero obtener todas las fotos del aviso
        return from(
            this.getSupabaseClient()
                .from('fotos_aviso')
                .select('*')
                .eq('aviso_id', avisoId)
        ).pipe(
            switchMap(({ data: fotos, error: selectError }) => {
                if (selectError) throw selectError;
                
                const fotosData = fotos as FotoAviso[];
                
                if (fotosData.length === 0) {
                    // No hay fotos, solo eliminar registros
                    return from(
                        this.getSupabaseClient()
                            .from('fotos_aviso')
                            .delete()
                            .eq('aviso_id', avisoId)
                    ).pipe(
                        map(({ error }) => {
                            if (error) throw error;
                        })
                    );
                }
                
                // Preparar rutas de archivos para eliminar del storage
                const archivosAEliminar = fotosData.map(foto => {
                    const urlParts = foto.url.split('/');
                    const fileName = urlParts[urlParts.length - 1];
                    return `${avisoId}/${fileName}`;
                });
                
                // Eliminar archivos del storage
                return from(
                    this.getSupabaseClient().storage
                        .from('fotos-avisos')
                        .remove(archivosAEliminar)
                ).pipe(
                    switchMap(({ error: storageError }) => {
                        if (storageError) {
                            console.warn('Error al eliminar archivos del storage:', storageError);
                            // Continuar aunque falle la eliminación del storage
                        }
                        
                        // Eliminar registros de la base de datos
                        return from(
                            this.getSupabaseClient()
                                .from('fotos_aviso')
                                .delete()
                                .eq('aviso_id', avisoId)
                        );
                    }),
                    map(({ error: deleteError }) => {
                        if (deleteError) throw deleteError;
                    })
                );
            }),
            catchError(error => {
                console.error('Error al eliminar fotos del aviso:', error);
                throw error;
            })
        );
    }

    /**
     * Sube una foto para un aviso
     */
    subirFoto(avisoId: string, file: File, descripcion?: string): Observable<FotoAviso> {
        // Sanitizar el nombre del archivo para evitar caracteres inválidos
        const sanitizedFileName = this.sanitizeFileName(file.name);
        const fileName = `${avisoId}/${Date.now()}_${sanitizedFileName}`;

        return from(
            this.getSupabaseClient().storage
                .from('fotos-avisos')
                .upload(fileName, file)
        ).pipe(
            map(({ data, error }) => {
                if (error) {
                    console.error('Error al subir archivo a storage:', error);
                    // Si el bucket no existe, crear una entrada en la base de datos sin URL
                    if (error.message === 'Bucket not found') {
                        throw new Error('El bucket de storage no está configurado. Contacta al administrador.');
                    }
                    throw error;
                }

                // Obtener URL pública
                const { data: urlData } = this.getSupabaseClient().storage
                    .from('fotos-avisos')
                    .getPublicUrl(fileName);

                return urlData.publicUrl;
            }),
            switchMap((publicUrl: string) => from(
                this.getSupabaseClient()
                    .from('fotos_aviso')
                    .insert([{
                        aviso_id: avisoId,
                        url: publicUrl,
                        descripcion: descripcion
                    }])
                    .select()
                    .single()
            )),
            map(({ data, error }) => {
                if (error) throw error;
                return data as FotoAviso;
            }),
            catchError(error => {
                console.error('Error completo al subir foto:', error);
                throw error;
            })
        );
    }

    /**
     * Elimina una foto de un aviso
     */
    eliminarFoto(fotoId: string): Observable<void> {
        // Primero obtener la información de la foto para eliminar el archivo del storage
        return from(
            this.getSupabaseClient()
                .from('fotos_aviso')
                .select('*')
                .eq('id', fotoId)
                .single()
        ).pipe(
            switchMap(({ data: foto, error: selectError }) => {
                if (selectError) throw selectError;
                
                const fotoData = foto as FotoAviso;
                
                // Extraer el nombre del archivo de la URL
                const urlParts = fotoData.url.split('/');
                const fileName = urlParts[urlParts.length - 1];
                const avisoId = fotoData.aviso_id;
                const fullPath = `${avisoId}/${fileName}`;
                
                // Eliminar el archivo del storage
                return from(
                    this.getSupabaseClient().storage
                        .from('fotos-avisos')
                        .remove([fullPath])
                ).pipe(
                    switchMap(({ error: storageError }) => {
                        if (storageError) {
                            console.warn('Error al eliminar archivo del storage:', storageError);
                            // Continuar aunque falle la eliminación del storage
                        }
                        
                        // Eliminar el registro de la base de datos
                        return from(
                            this.getSupabaseClient()
                                .from('fotos_aviso')
                                .delete()
                                .eq('id', fotoId)
                        );
                    }),
                    map(({ error: deleteError }) => {
                        if (deleteError) throw deleteError;
                    })
                );
            }),
            catchError(error => {
                console.error('Error al eliminar foto:', error);
                throw error;
            })
        );
    }

    /**
     * Busca avisos por término de búsqueda
     */
    buscarAvisos(termino: string): Observable<Aviso[]> {
        return from(
            this.getSupabaseClient()
                .from('avisos')
                .select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `)
                .or(`nombre_cliente_aviso.ilike.%${termino}%,descripcion_problema.ilike.%${termino}%`)
                .neq('estado', 'Completado') // Excluir avisos completados de la búsqueda
                .limit(10)
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                return data as Aviso[];
            })
        );
    }

    /**
     * Obtiene solo avisos activos (no completados)
     */
    getAvisosActivos(
        pagina: number = 1,
        porPagina: number = 10,
        busqueda?: string,
        ordenarPor?: string,
        orden?: 'asc' | 'desc',
        estado?: string
    ): Observable<AvisoResponse> {
        return this.getAvisos(pagina, porPagina, busqueda, ordenarPor, orden, estado, false);
    }

    /**
     * Obtiene solo avisos completados
     */
    getAvisosCompletados(
        pagina: number = 1,
        porPagina: number = 10,
        busqueda?: string,
        ordenarPor?: string,
        orden?: 'asc' | 'desc'
    ): Observable<AvisoResponse> {
        return this.getAvisos(pagina, porPagina, busqueda, ordenarPor, orden, 'Completado', true);
    }

    /**
     * Obtiene el valor actual de avisos
     */
    getAvisosActuales(): Aviso[] {
        return this.avisosSubject.value;
    }

    /**
     * Limpia el estado de avisos
     */
    limpiarAvisos(): void {
        this.avisosSubject.next([]);
    }

    /**
     * Sube una foto usando FETCH DIRECTO - EVITA BLOQUEOS
     */
    subirFotoDirect(avisoId: string, file: File, descripcion?: string): Observable<FotoAviso> {
        console.log('🚀 AvisosService: Usando FETCH DIRECTO para subir foto...');
        
        return from(this.fetchSubirFotoDirect(avisoId, file, descripcion)).pipe(
            map(result => {
                console.log('✅ AvisosService: FETCH DIRECTO completado, foto subida:', result.id);
                return result;
            }),
            catchError(error => {
                console.error('❌ AvisosService: Error en FETCH DIRECTO:', error);
                throw error;
            })
        );
    }

    /**
     * Fetch directo para subir foto - BYPASA CLIENTE SUPABASE
     */
    private async fetchSubirFotoDirect(avisoId: string, file: File, descripcion?: string): Promise<FotoAviso> {
        console.log('🚀 AvisosService: Ejecutando fetch directo para subir foto...');
        
        try {
            // Sanitizar el nombre del archivo
            const sanitizedFileName = this.sanitizeFileName(file.name);
            const fileName = `${avisoId}/${Date.now()}_${sanitizedFileName}`;
            
            // Subir archivo al storage usando fetch directo
            const uploadUrl = `${environment.supabaseUrl}/storage/v1/object/fotos-avisos/${fileName}`;
            
            const headers = {
                'Authorization': `Bearer ${environment.supabaseServiceKey}`,
                'Content-Type': file.type
            };
            
            console.log('🚀 Subiendo archivo a:', uploadUrl);
            
            const uploadResponse = await fetch(uploadUrl, {
                method: 'POST',
                headers,
                body: file
            });
            
            if (!uploadResponse.ok) {
                throw new Error(`HTTP ${uploadResponse.status}: ${uploadResponse.statusText}`);
            }
            
            // Obtener URL pública
            const publicUrl = `${environment.supabaseUrl}/storage/v1/object/public/fotos-avisos/${fileName}`;
            
            // Crear registro en la base de datos
            const insertUrl = `${environment.supabaseUrl}/rest/v1/fotos_aviso`;
            const insertData = {
                aviso_id: avisoId,
                url: publicUrl,
                descripcion: descripcion || null
            };
            
            const insertHeaders = {
                'apikey': environment.supabaseServiceKey,
                'Authorization': `Bearer ${environment.supabaseServiceKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            };
            
            console.log('🚀 Creando registro de foto:', insertUrl);
            
            const insertResponse = await fetch(insertUrl, {
                method: 'POST',
                headers: insertHeaders,
                body: JSON.stringify(insertData)
            });
            
            if (!insertResponse.ok) {
                const errorText = await insertResponse.text();
                console.error('🚀 Error response body:', errorText);
                throw new Error(`HTTP ${insertResponse.status}: ${insertResponse.statusText}`);
            }
            
            const fotoData = await insertResponse.json();
            console.log('🚀 Foto creada:', fotoData);
            
            return fotoData[0] as FotoAviso;
            
        } catch (error) {
            console.error('🚀 Error en fetch directo:', error);
            throw error;
        }
    }

    /**
     * Elimina una foto usando FETCH DIRECTO - EVITA BLOQUEOS
     */
    eliminarFotoDirect(fotoId: string): Observable<void> {
        console.log('🚀 AvisosService: Usando FETCH DIRECTO para eliminar foto...');
        
        return from(this.fetchEliminarFotoDirect(fotoId)).pipe(
            map(() => {
                console.log('✅ AvisosService: FETCH DIRECTO completado, foto eliminada');
                return void 0;
            }),
            catchError(error => {
                console.error('❌ AvisosService: Error en FETCH DIRECTO:', error);
                throw error;
            })
        );
    }

    /**
     * Fetch directo para eliminar foto - BYPASA CLIENTE SUPABASE
     */
    private async fetchEliminarFotoDirect(fotoId: string): Promise<void> {
        console.log('🚀 AvisosService: Ejecutando fetch directo para eliminar foto:', fotoId);
        
        try {
            // Primero obtener la información de la foto
            const getUrl = `${environment.supabaseUrl}/rest/v1/fotos_aviso?select=*&id=eq.${fotoId}`;
            
            const headers = {
                'apikey': environment.supabaseServiceKey,
                'Authorization': `Bearer ${environment.supabaseServiceKey}`,
                'Content-Type': 'application/json'
            };
            
            console.log('🚀 Obteniendo información de la foto:', getUrl);
            
            const getResponse = await fetch(getUrl, { method: 'GET', headers });
            
            if (!getResponse.ok) {
                throw new Error(`HTTP ${getResponse.status}: ${getResponse.statusText}`);
            }
            
            const fotoData = await getResponse.json();
            
            if (!fotoData || fotoData.length === 0) {
                throw new Error('Foto no encontrada');
            }
            
            const foto = fotoData[0];
            console.log('🚀 Foto obtenida:', foto);
            
            // Extraer el nombre del archivo de la URL
            const urlParts = foto.url.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const avisoId = foto.aviso_id;
            const fullPath = `${avisoId}/${fileName}`;
            
            // Eliminar el archivo del storage
            const deleteStorageUrl = `${environment.supabaseUrl}/storage/v1/object/fotos-avisos/${fullPath}`;
            
            const deleteStorageResponse = await fetch(deleteStorageUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${environment.supabaseServiceKey}`
                }
            });
            
            if (!deleteStorageResponse.ok) {
                console.warn('⚠️ Error al eliminar archivo del storage:', deleteStorageResponse.status);
                // Continuar aunque falle la eliminación del storage
            } else {
                console.log('✅ Archivo eliminado del storage');
            }
            
            // Eliminar el registro de la base de datos
            const deleteDbUrl = `${environment.supabaseUrl}/rest/v1/fotos_aviso?id=eq.${fotoId}`;
            
            const deleteDbResponse = await fetch(deleteDbUrl, {
                method: 'DELETE',
                headers
            });
            
            if (!deleteDbResponse.ok) {
                throw new Error(`HTTP ${deleteDbResponse.status}: ${deleteDbResponse.statusText}`);
            }
            
            console.log('✅ Foto eliminada exitosamente');
            
        } catch (error) {
            console.error('🚀 Error en fetch directo:', error);
            throw error;
        }
    }

    /**
     * Sanitiza el nombre del archivo para evitar caracteres inválidos en Supabase Storage
     */
    private sanitizeFileName(fileName: string): string {
        return fileName
            .replace(/[^a-zA-Z0-9.-]/g, '_') // Reemplazar caracteres especiales con guiones bajos
            .replace(/_{2,}/g, '_') // Reemplazar múltiples guiones bajos consecutivos con uno solo
            .replace(/^_+|_+$/g, '') // Eliminar guiones bajos al inicio y final
            .toLowerCase(); // Convertir a minúsculas
    }

    /**
     * Crea una factura automáticamente desde los trabajos realizados de un aviso
     * Actualizado para el nuevo flujo de albaranes
     */
    crearFacturaDesdeTrabajos(avisoId: string): Observable<any> {
        // Obtener el aviso con todos sus trabajos realizados y albaranes
        return from(
            this.getSupabaseClient()
                .from('avisos')
                .select(`
                    *,
                    cliente:clientes(*),
                    trabajos:trabajos_realizados(
                        *,
                        materiales:materiales_trabajo(
                            *,
                            material:inventario(*)
                        ),
                        albaran:albaranes!trabajos_realizados_albaran_id_fkey(*)
                    )
                `)
                .eq('id', avisoId)
                .single()
        ).pipe(
            map(({ data: aviso, error }) => {
                if (error) throw error;
                
                const avisoData = aviso as any;
                
                // Validar que el aviso tenga trabajos finalizados (con albarán)
                const trabajosFinalizados = avisoData.trabajos?.filter((t: any) => 
                    t.estado === 'Finalizado' || t.albaran?.estado_cierre === 'Finalizado'
                ) || [];
                
                if (trabajosFinalizados.length === 0) {
                    throw new Error('No hay trabajos finalizados para facturar. Debes crear un albarán primero.');
                }

                // Preparar datos para la factura
                const facturaData = {
                    avisoId: avisoData.id,
                    cliente: avisoData.cliente || {
                        nombre_completo: avisoData.nombre_cliente_aviso,
                        direccion: avisoData.direccion_cliente_aviso,
                        email: 'sin-email@ejemplo.com',
                        cif: 'Sin CIF'
                    },
                    trabajos: trabajosFinalizados,
                    resumen: this.calcularResumenFacturacion(trabajosFinalizados)
                };

                return facturaData;
            }),
            catchError(error => {
                console.error('Error al preparar factura desde trabajos:', error);
                throw error;
            })
        );
    }

    /**
     * Calcula el resumen de facturación desde trabajos realizados
     */
    private calcularResumenFacturacion(trabajos: any[]): any {
        const materiales: any[] = [];
        let horasTotales = 0;
        
        trabajos.forEach(trabajo => {
            // Calcular horas del trabajo
            const inicio = new Date(`2000-01-01T${trabajo.hora_inicio}`);
            const fin = new Date(`2000-01-01T${trabajo.hora_fin}`);
            const horas = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60);
            horasTotales += Math.max(0, horas);
            
            // Agregar materiales utilizados
            trabajo.materiales?.forEach((mat: any) => {
                const existente = materiales.find(m => m.material_id === mat.material_id);
                if (existente) {
                    existente.cantidad_total += mat.cantidad_utilizada;
                } else {
                    materiales.push({
                        material_id: mat.material_id,
                        nombre: mat.material?.nombre || 'Material desconocido',
                        cantidad_total: mat.cantidad_utilizada,
                        precio_unitario: mat.precio_neto_al_momento,
                        descripcion: mat.material?.descripcion || ''
                    });
                }
            });
        });

        return {
            materiales,
            horasTotales,
            numeroTrabajos: trabajos.length
        };
    }

    /**
     * Obtiene un resumen completo del aviso con todos sus elementos - VERSIÓN DIRECTA
     */
    getResumenCompletoAvisoDirect(avisoId: string): Observable<any> {
        console.log('🚀 AvisosService: Usando FETCH DIRECTO para resumen completo de aviso...');
        
        return from(this.fetchResumenCompletoAvisoDirect(avisoId)).pipe(
            map(result => {
                console.log('✅ AvisosService: FETCH DIRECTO completado, aviso:', result?.id);
                return result;
            }),
            catchError(error => {
                console.error('❌ AvisosService: Error en FETCH DIRECTO:', error);
                throw error;
            })
        );
    }

    /**
     * Fetch directo para resumen completo de aviso - BYPASA CLIENTE SUPABASE
     */
    private async fetchResumenCompletoAvisoDirect(avisoId: string): Promise<any> {
        console.log('🚀 AvisosService: Ejecutando fetch directo para resumen completo de aviso:', avisoId);
        
        try {
            const url = `${environment.supabaseUrl}/rest/v1/avisos?select=*,cliente:clientes(*),tecnico_asignado:usuarios(*),fotos:fotos_aviso(*),albaranes:albaranes(*,repuestos:repuestos_albaran(*)),presupuestos:presupuestos(*),facturas:facturas(*)&id=eq.${avisoId}`;
            
            const headers = {
                'apikey': environment.supabaseServiceKey,
                'Authorization': `Bearer ${environment.supabaseServiceKey}`,
                'Content-Type': 'application/json'
            };
            
            console.log('🚀 URL construida:', url);
            
            const startTime = Date.now();
            const response = await fetch(url, { method: 'GET', headers });
            const duration = Date.now() - startTime;
            
            console.log('🚀 Fetch completado en', duration, 'ms');
            console.log('🚀 Status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('🚀 Error response body:', errorText);
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('🚀 Datos recibidos:', data?.length || 0, 'avisos');
            
            if (!data || data.length === 0) {
                throw new Error('Aviso no encontrado');
            }
            
            const avisoCompleto = data[0];
            console.log('🚀 Estructura de aviso recibida:', avisoCompleto);
            
            // Calcular estadísticas basadas en albaranes (nuevo flujo)
            const albaranesFinalizados = avisoCompleto.albaranes?.filter((a: any) => 
                a.estado_cierre === 'Finalizado'
            ) || [];
            
            const albaranesPresupuestoPendiente = avisoCompleto.albaranes?.filter((a: any) => 
                a.estado_cierre === 'Presupuesto pendiente'
            ) || [];
            
            const albaranesOtraVisita = avisoCompleto.albaranes?.filter((a: any) => 
                a.estado_cierre === 'Otra visita'
            ) || [];
            
            // Los albaranes cerrados incluyen tanto finalizados como presupuesto pendiente
            const albaranesCerrados = [...albaranesFinalizados, ...albaranesPresupuestoPendiente];
            
            const facturasPendientes = avisoCompleto.facturas?.filter((f: any) => 
                f.estado !== 'Completado'
            ) || [];
            
            const facturasCompletadas = avisoCompleto.facturas?.filter((f: any) => 
                f.estado === 'Completado'
            ) || [];
            
            // Determinar si tiene presupuesto pendiente
            const presupuestoPendiente = albaranesPresupuestoPendiente.length > 0;
            
            // Determinar si requiere otra visita
            const requiereOtraVisita = albaranesOtraVisita.length > 0;
            
            return {
                ...avisoCompleto,
                estadisticas: {
                    totalAlbaranes: avisoCompleto.albaranes?.length || 0,
                    albaranesCerrados: albaranesCerrados.length,
                    albaranesFinalizados: albaranesFinalizados.length,
                    albaranesPresupuestoPendiente: albaranesPresupuestoPendiente.length,
                    albaranesOtraVisita: albaranesOtraVisita.length,
                    tienePresupuesto: presupuestoPendiente,
                    requiereOtraVisita: requiereOtraVisita,
                    estadoPresupuesto: presupuestoPendiente ? 'Pendiente' : null,
                    totalFacturas: avisoCompleto.facturas?.length || 0,
                    facturasPendientes: facturasPendientes.length,
                    facturasCompletadas: facturasCompletadas.length,
                    // Mantener compatibilidad con código existente
                    totalTrabajos: avisoCompleto.albaranes?.length || 0,
                    trabajosConAlbaran: albaranesCerrados.length,
                    trabajosFinalizados: albaranesFinalizados.length, // Solo los realmente finalizados
                    puedeFacturar: albaranesFinalizados.length > 0 && facturasPendientes.length === 0
                }
            };
            
        } catch (error) {
            console.error('🚀 Error en fetch directo:', error);
            throw error;
        }
    }

    /**
     * Obtiene un resumen completo del aviso con todos sus elementos
     * Actualizado para el nuevo esquema de base de datos
     */
    getResumenCompletoAviso(avisoId: string): Observable<any> {
        return from(
            this.getSupabaseClient()
                .from('avisos')
                .select(`
                    *,
                    cliente:clientes(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(*),
                    albaranes:albaranes(
                        *,
                        repuestos_utilizados,
                        repuestos:repuestos_albaran(*)
                    ),
                    presupuestos:presupuestos(*),
                    facturas:facturas(*)
                `)
                .eq('id', avisoId)
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                
                const avisoCompleto = data as any;
                
                // Calcular estadísticas basadas en albaranes (nuevo flujo)
                const albaranesFinalizados = avisoCompleto.albaranes?.filter((a: any) => 
                    a.estado_cierre === 'Finalizado'
                ) || [];
                
                const albaranesPresupuestoPendiente = avisoCompleto.albaranes?.filter((a: any) => 
                    a.estado_cierre === 'Presupuesto pendiente'
                ) || [];
                
                const albaranesOtraVisita = avisoCompleto.albaranes?.filter((a: any) => 
                    a.estado_cierre === 'Otra visita'
                ) || [];
                
                // Los albaranes cerrados incluyen tanto finalizados como presupuesto pendiente
                const albaranesCerrados = [...albaranesFinalizados, ...albaranesPresupuestoPendiente];
                
                const facturasPendientes = avisoCompleto.facturas?.filter((f: any) => 
                    f.estado !== 'Completado'
                ) || [];
                
                const facturasCompletadas = avisoCompleto.facturas?.filter((f: any) => 
                    f.estado === 'Completado'
                ) || [];
                
                // Determinar si tiene presupuesto pendiente
                const presupuestoPendiente = albaranesPresupuestoPendiente.length > 0;
                
                // Determinar si requiere otra visita
                const requiereOtraVisita = albaranesOtraVisita.length > 0;
                
                return {
                    ...avisoCompleto,
                    estadisticas: {
                        totalAlbaranes: avisoCompleto.albaranes?.length || 0,
                        albaranesCerrados: albaranesCerrados.length,
                        albaranesFinalizados: albaranesFinalizados.length,
                        albaranesPresupuestoPendiente: albaranesPresupuestoPendiente.length,
                        albaranesOtraVisita: albaranesOtraVisita.length,
                        tienePresupuesto: presupuestoPendiente,
                        requiereOtraVisita: requiereOtraVisita,
                        estadoPresupuesto: presupuestoPendiente ? 'Pendiente' : null,
                        totalFacturas: avisoCompleto.facturas?.length || 0,
                        facturasPendientes: facturasPendientes.length,
                        facturasCompletadas: facturasCompletadas.length,
                        // Mantener compatibilidad con código existente
                        totalTrabajos: avisoCompleto.albaranes?.length || 0,
                        trabajosConAlbaran: albaranesCerrados.length,
                        trabajosFinalizados: albaranesFinalizados.length, // Solo los realmente finalizados
                        puedeFacturar: albaranesFinalizados.length > 0 && facturasPendientes.length === 0
                    }
                };
            }),
            catchError(error => {
                console.error('Error al obtener resumen completo:', error);
                throw error;
            })
        );
    }

    /**
     * Actualiza el estado del aviso basándose en sus elementos relacionados
     * Actualizado para el nuevo flujo de albaranes con generación automática de facturas
     */
    actualizarEstadoAutomatico(avisoId: string): Observable<Aviso> {
        return this.getResumenCompletoAvisoDirect(avisoId).pipe(
            switchMap(resumen => {
                let nuevoEstado = resumen.estado;
                
                console.log('🔍 Analizando estado del aviso:', {
                    estadoActual: resumen.estado,
                    trabajosFinalizados: resumen.estadisticas.trabajosFinalizados,
                    totalFacturas: resumen.estadisticas.totalFacturas,
                    facturasPendientes: resumen.estadisticas.facturasPendientes,
                    facturasCompletadas: resumen.estadisticas.facturasCompletadas,
                    trabajos: resumen.trabajos?.length || 0,
                    albaranes: resumen.albaranes?.length || 0
                });
                
                // Nueva lógica para determinar el estado automáticamente
                if (resumen.estadisticas.trabajosFinalizados > 0 && 
                    resumen.estadisticas.totalFacturas > 0 && 
                    resumen.estadisticas.facturasPendientes === 0) {
                    // Si hay trabajos finalizados, facturas generadas Y todas las facturas están completadas
                    nuevoEstado = 'Completado';
                } else if (resumen.estadisticas.trabajosFinalizados > 0 && resumen.estadisticas.facturasPendientes === 0) {
                    // Si hay trabajos finalizados pero no hay facturas, está listo para facturar
                    nuevoEstado = 'Listo para facturar';
                } else if (resumen.estadisticas.trabajosPresupuestoPendiente > 0) {
                    // Si hay trabajos con presupuesto pendiente
                    nuevoEstado = 'Pendiente de presupuesto';
                } else if (resumen.estadisticas.trabajosOtraVisita > 0) {
                    // Si hay trabajos que requieren otra visita
                    nuevoEstado = 'Otra visita requerida';
                } else if (resumen.estadisticas.trabajosConAlbaran > 0 && resumen.estadisticas.tienePresupuesto) {
                    // Si hay trabajos con albarán y requiere presupuesto (fallback)
                    nuevoEstado = 'Pendiente de presupuesto';
                } else if (resumen.estadisticas.trabajosConAlbaran > 0 || resumen.estadisticas.totalTrabajos > 0) {
                    // Si hay trabajos con albarán o trabajos en general, está en curso
                    nuevoEstado = 'En curso';
                } else if (resumen.estadisticas.totalTrabajos === 0 && resumen.estadisticas.trabajosConAlbaran === 0) {
                    // Si no hay trabajos ni albaranes, mantener el estado original o marcarlo como pendiente
                    if (resumen.estado === 'Pendiente') {
                        nuevoEstado = resumen.estado; // Mantener el estado actual
                    } else {
                        nuevoEstado = 'Pendiente';
                    }
                }
                
                console.log('🔍 Estado calculado:', {
                    estadoAnterior: resumen.estado,
                    estadoNuevo: nuevoEstado,
                    cambio: resumen.estado !== nuevoEstado
                });
                
                // Actualizar el estado si es diferente
                if (nuevoEstado !== resumen.estado) {
                    console.log(`🔄 Actualizando estado del aviso ${avisoId} de "${resumen.estado}" a "${nuevoEstado}"`);
                    return this.actualizarAviso(avisoId, { estado: nuevoEstado });
                }
                
                // NOTA: Después de actualizar el estado del aviso, se debe llamar a
                // flujoAvisosService.sincronizarEstadosFacturas(avisoId) para mantener
                // los estados de las facturas sincronizados con el estado del aviso
                
                return from([resumen]);
            })
        );
    }

} 