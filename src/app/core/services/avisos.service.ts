import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from } from 'rxjs';
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
    private supabase: SupabaseClient;
    private avisosSubject = new BehaviorSubject<Aviso[]>([]);
    public avisos$ = this.avisosSubject.asObservable();

    constructor(
        private supabaseClientService: SupabaseClientService,
        private cacheService: CacheService
    ) {
        this.supabase = this.supabaseClientService.getClient();
    }

    /**
     * Método de debug para probar la conexión básica
     */
    debugConnection(): Observable<any> {
        console.log('🔍 AvisosService: Probando conexión básica...');
        
        return from(
            this.supabase
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
        let query = this.supabase
            .from('avisos')
            .select(`
                id,
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
            .order(ordenarPor || 'fecha_creacion', { ascending: orden === 'asc' });

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
     * Obtiene un aviso por su ID - VERSIÓN OPTIMIZADA
     */
    getAviso(id: string): Observable<Aviso> {
        return from(
            this.supabase
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
            estado: 'No visitado',
            requiere_presupuesto: false,
            requiere_nueva_visita: false
        };

        return from(
            this.supabase
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
     * Actualiza un aviso existente
     */
    actualizarAviso(id: string, aviso: ActualizarAvisoRequest): Observable<Aviso> {
        const datosActualizados = {
            ...aviso,
            fecha_actualizacion: new Date().toISOString()
        };

        return from(
            this.supabase
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
     * Elimina un aviso
     */
    eliminarAviso(id: string): Observable<void> {
        return from(
            this.supabase
                .from('avisos')
                .delete()
                .eq('id', id)
        ).pipe(
            map(({ error }) => {
                if (error) throw error;

                const avisosActuales = this.avisosSubject.value;
                const avisosFiltrados = avisosActuales.filter(a => a.id !== id);
                this.avisosSubject.next(avisosFiltrados);

                // Limpiar cache de avisos para forzar recarga
                this.cacheService.clearCache('avisos');
            }),
            catchError(error => {
                // Si hay error de clave foránea, intentar eliminar fotos primero
                if (error.code === '23503' && error.message.includes('fotos_aviso')) {
                    return this.eliminarFotosAviso(id).pipe(
                        switchMap(() => from(
                            this.supabase
                                .from('avisos')
                                .delete()
                                .eq('id', id)
                        )),
                        map(({ error: deleteError }) => {
                            if (deleteError) throw deleteError;

                            const avisosActuales = this.avisosSubject.value;
                            const avisosFiltrados = avisosActuales.filter(a => a.id !== id);
                            this.avisosSubject.next(avisosFiltrados);

                            // Limpiar cache de avisos para forzar recarga
                            this.cacheService.clearCache('avisos');
                        })
                    );
                }
                throw error;
            })
        );
    }

    /**
     * Elimina todas las fotos asociadas a un aviso (incluyendo archivos del storage)
     */
    private eliminarFotosAviso(avisoId: string): Observable<void> {
        // Primero obtener todas las fotos del aviso
        return from(
            this.supabase
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
                        this.supabase
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
                    this.supabase.storage
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
                            this.supabase
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
            this.supabase.storage
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
                const { data: urlData } = this.supabase.storage
                    .from('fotos-avisos')
                    .getPublicUrl(fileName);

                return urlData.publicUrl;
            }),
            switchMap((publicUrl: string) => from(
                this.supabase
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
            this.supabase
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
                    this.supabase.storage
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
                            this.supabase
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
            this.supabase
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
            this.supabase
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
     * Obtiene un resumen completo del aviso con todos sus elementos
     * Actualizado para el nuevo esquema de base de datos
     */
    getResumenCompletoAviso(avisoId: string): Observable<any> {
        return from(
            this.supabase
                .from('avisos')
                .select(`
                    *,
                    cliente:clientes(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(*),
                                           trabajos:trabajos_realizados(
                           *,
                           materiales:materiales_trabajo(
                               *,
                               material:inventario(*)
                           ),
                           albaran:albaranes!trabajos_realizados_albaran_id_fkey(*)
                       ),
                    albaranes:albaranes(*),
                    presupuestos:presupuestos(*),
                    facturas:facturas(*)
                `)
                .eq('id', avisoId)
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                
                const avisoCompleto = data as any;
                
                // Calcular estadísticas para el nuevo flujo
                const trabajosFinalizados = avisoCompleto.trabajos?.filter((t: any) => 
                    t.estado === 'Finalizado' || t.albaran?.estado_cierre === 'Finalizado'
                ) || [];
                
                const trabajosConAlbaran = avisoCompleto.trabajos?.filter((t: any) => 
                    t.albaran_id !== null
                ) || [];
                
                const facturasPendientes = avisoCompleto.facturas?.filter((f: any) => 
                    f.estado !== 'Completado'
                ) || [];
                
                // Determinar si tiene presupuesto pendiente
                const presupuestoPendiente = avisoCompleto.albaranes?.some((a: any) => 
                    a.estado_cierre === 'Presupuesto pendiente'
                ) || false;
                
                return {
                    ...avisoCompleto,
                    estadisticas: {
                        totalTrabajos: avisoCompleto.trabajos?.length || 0,
                        trabajosConAlbaran: trabajosConAlbaran.length,
                        trabajosFinalizados: trabajosFinalizados.length,
                        tienePresupuesto: presupuestoPendiente,
                        estadoPresupuesto: presupuestoPendiente ? 'Pendiente' : null,
                        totalFacturas: avisoCompleto.facturas?.length || 0,
                        facturasPendientes: facturasPendientes.length,
                        puedeFacturar: trabajosFinalizados.length > 0 && facturasPendientes.length === 0
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
     * Actualizado para el nuevo flujo de albaranes
     */
    actualizarEstadoAutomatico(avisoId: string): Observable<Aviso> {
        return this.getResumenCompletoAviso(avisoId).pipe(
            switchMap(resumen => {
                let nuevoEstado = resumen.estado;
                
                console.log('🔍 Analizando estado del aviso:', {
                    estadoActual: resumen.estado,
                    estadisticas: resumen.estadisticas,
                    trabajos: resumen.trabajos?.length || 0,
                    albaranes: resumen.albaranes?.length || 0
                });
                
                // Nueva lógica para determinar el estado automáticamente
                if (resumen.estadisticas.trabajosFinalizados > 0 && resumen.estadisticas.totalFacturas > 0) {
                    // Si hay trabajos finalizados y facturas generadas, está completado
                    nuevoEstado = 'Completado';
                } else if (resumen.estadisticas.trabajosFinalizados > 0 && resumen.estadisticas.facturasPendientes === 0) {
                    // Si hay trabajos finalizados pero no hay facturas, está listo para facturar
                    nuevoEstado = 'Listo para facturar';
                } else if (resumen.estadisticas.trabajosConAlbaran > 0 && resumen.estadisticas.tienePresupuesto) {
                    // Si hay trabajos con albarán y requiere presupuesto
                    nuevoEstado = 'Pendiente de presupuesto';
                } else if (resumen.estadisticas.trabajosConAlbaran > 0 || resumen.estadisticas.totalTrabajos > 0) {
                    // Si hay trabajos con albarán o trabajos en general, está en curso
                    nuevoEstado = 'En curso';
                } else if (resumen.estadisticas.totalTrabajos === 0 && resumen.estadisticas.trabajosConAlbaran === 0) {
                    // Si no hay trabajos ni albaranes, mantener el estado original o marcarlo como pendiente
                    if (resumen.estado === 'No visitado' || resumen.estado === 'Pendiente') {
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