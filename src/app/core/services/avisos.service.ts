import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
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

@Injectable({
    providedIn: 'root'
})
export class AvisosService {
    private supabase: SupabaseClient;
    private avisosSubject = new BehaviorSubject<Aviso[]>([]);
    public avisos$ = this.avisosSubject.asObservable();

    constructor() {
        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseAnonKey
        );
    }

    /**
     * Obtiene la lista de avisos con paginación y filtros
     */
    getAvisos(
        pagina: number = 1,
        porPagina: number = 10,
        busqueda?: string,
        ordenarPor?: string,
        orden?: 'asc' | 'desc',
        estado?: string,
        incluirCompletados: boolean = false
    ): Observable<AvisoResponse> {
        let query = this.supabase
            .from('avisos')
            .select(`
        *,
        cliente:clientes(*),
        tecnico_asignado:usuarios(*),
        fotos:fotos_aviso(*)
      `, { count: 'exact' });

        // Aplicar filtros
        if (busqueda) {
            query = query.or(`nombre_cliente_aviso.ilike.%${busqueda}%,descripcion_problema.ilike.%${busqueda}%`);
        }

        if (estado) {
            query = query.eq('estado', estado);
        } else if (!incluirCompletados) {
            // Por defecto, excluir avisos completados si no se especifica estado
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

                const avisos = data as Aviso[];
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
     * Obtiene un aviso por su ID
     */
    getAviso(id: string): Observable<Aviso> {
        return from(
            this.supabase
                .from('avisos')
                .select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `)
                .eq('id', id)
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                return data as Aviso;
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
} 