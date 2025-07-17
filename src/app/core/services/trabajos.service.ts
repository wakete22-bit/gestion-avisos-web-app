import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from, forkJoin } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
    TrabajoRealizado,
    TrabajoResponse,
    CrearTrabajoRequest,
    ActualizarTrabajoRequest,
    TrabajoCompleto,
    MaterialTrabajo
} from '../../modules/avisos/models/trabajo-realizado.model';
import { MaterialesTrabajoService } from './materiales-trabajo.service';

@Injectable({
    providedIn: 'root'
})
export class TrabajosService {
    private supabase: SupabaseClient;
    private trabajosSubject = new BehaviorSubject<TrabajoRealizado[]>([]);
    public trabajos$ = this.trabajosSubject.asObservable();

    constructor(private materialesTrabajoService: MaterialesTrabajoService) {
        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseAnonKey
        );
    }

    /**
     * Obtiene los trabajos realizados de un aviso
     */
    getTrabajosAviso(
        avisoId: string,
        pagina: number = 1,
        porPagina: number = 10
    ): Observable<TrabajoResponse> {
        const desde = (pagina - 1) * porPagina;

        return from(
            this.supabase
                .from('trabajos_realizados')
                .select('*', { count: 'exact' })
                .eq('aviso_id', avisoId)
                .order('fecha_trabajo', { ascending: false })
                .range(desde, desde + porPagina - 1)
        ).pipe(
            map(({ data, error, count }) => {
                if (error) throw error;

                const trabajos = data as TrabajoRealizado[];
                this.trabajosSubject.next(trabajos);

                return {
                    trabajos,
                    total: count || 0,
                    pagina,
                    por_pagina: porPagina
                };
            }),
            catchError(error => {
                console.error('Error al obtener trabajos:', error);
                throw error;
            })
        );
    }

    /**
     * Obtiene un trabajo por su ID con sus materiales
     */
    getTrabajo(id: string): Observable<TrabajoCompleto> {
        return from(
            this.supabase
                .from('trabajos_realizados')
                .select('*')
                .eq('id', id)
                .single()
        ).pipe(
            switchMap(({ data: trabajo, error: trabajoError }) => {
                if (trabajoError) throw trabajoError;

                const trabajoData = trabajo as TrabajoRealizado;

                // Obtener los materiales del trabajo
                return this.materialesTrabajoService.getMaterialesTrabajo(id).pipe(
                    map(materiales => ({
                        trabajo: trabajoData,
                        materiales
                    }))
                );
            }),
            catchError(error => {
                console.error('Error al obtener trabajo:', error);
                throw error;
            })
        );
    }

    /**
     * Crea un nuevo trabajo realizado con materiales
     */
    crearTrabajo(trabajo: CrearTrabajoRequest): Observable<TrabajoCompleto> {
        const { materiales, ...trabajoData } = trabajo;
        
        const trabajoInsert = {
            ...trabajoData,
            fecha_creacion: new Date().toISOString(),
            fecha_actualizacion: new Date().toISOString()
        };

        return from(
            this.supabase
                .from('trabajos_realizados')
                .insert([trabajoInsert])
                .select()
                .single()
        ).pipe(
            switchMap(({ data: trabajoCreado, error: trabajoError }) => {
                if (trabajoError) throw trabajoError;

                const nuevoTrabajo = trabajoCreado as TrabajoRealizado;

                // Actualizar el estado local
                const trabajosActuales = this.trabajosSubject.value;
                this.trabajosSubject.next([nuevoTrabajo, ...trabajosActuales]);

                // Si no hay materiales, devolver solo el trabajo
                if (!materiales || materiales.length === 0) {
                    return from([{
                        trabajo: nuevoTrabajo,
                        materiales: []
                    }]);
                }

                // Agregar los materiales al trabajo
                return this.materialesTrabajoService.agregarMateriales(nuevoTrabajo.id!, materiales).pipe(
                    map(materialesCreados => ({
                        trabajo: nuevoTrabajo,
                        materiales: materialesCreados
                    }))
                );
            }),
            catchError(error => {
                console.error('Error al crear trabajo:', error);
                throw error;
            })
        );
    }

    /**
     * Actualiza un trabajo existente
     */
    actualizarTrabajo(id: string, trabajo: ActualizarTrabajoRequest): Observable<TrabajoCompleto> {
        const { materiales, ...trabajoData } = trabajo;
        
        const datosActualizados = {
            ...trabajoData,
            fecha_actualizacion: new Date().toISOString()
        };

        return from(
            this.supabase
                .from('trabajos_realizados')
                .update(datosActualizados)
                .eq('id', id)
                .select()
                .single()
        ).pipe(
            switchMap(({ data: trabajoActualizado, error: trabajoError }) => {
                if (trabajoError) throw trabajoError;

                const trabajo = trabajoActualizado as TrabajoRealizado;

                // Actualizar el estado local
                const trabajosActuales = this.trabajosSubject.value;
                const index = trabajosActuales.findIndex(t => t.id === id);
                if (index !== -1) {
                    trabajosActuales[index] = trabajo;
                    this.trabajosSubject.next([...trabajosActuales]);
                }

                // Si no hay materiales para actualizar, devolver solo el trabajo
                if (!materiales) {
                    return this.getTrabajo(id);
                }

                // Eliminar materiales existentes y crear nuevos
                return this.materialesTrabajoService.eliminarMaterialesTrabajo(id).pipe(
                    switchMap(() => {
                        if (materiales.length === 0) {
                            return from([{
                                trabajo,
                                materiales: []
                            }]);
                        }

                        return this.materialesTrabajoService.agregarMateriales(id, materiales).pipe(
                            map(materialesCreados => ({
                                trabajo,
                                materiales: materialesCreados
                            }))
                        );
                    })
                );
            }),
            catchError(error => {
                console.error('Error al actualizar trabajo:', error);
                throw error;
            })
        );
    }

    /**
     * Elimina un trabajo y sus materiales
     */
    eliminarTrabajo(id: string): Observable<void> {
        // Primero eliminar los materiales del trabajo
        return this.materialesTrabajoService.eliminarMaterialesTrabajo(id).pipe(
            switchMap(() => {
                // Luego eliminar el trabajo
                return from(
                    this.supabase
                        .from('trabajos_realizados')
                        .delete()
                        .eq('id', id)
                );
            }),
            map(({ error }) => {
                if (error) throw error;

                const trabajosActuales = this.trabajosSubject.value;
                const trabajosFiltrados = trabajosActuales.filter(t => t.id !== id);
                this.trabajosSubject.next(trabajosFiltrados);
            }),
            catchError(error => {
                console.error('Error al eliminar trabajo:', error);
                throw error;
            })
        );
    }

    /**
     * Obtiene estadísticas de trabajos para un aviso
     */
    getEstadisticasTrabajos(avisoId: string): Observable<any> {
        return from(
            this.supabase
                .from('trabajos_realizados')
                .select('*')
                .eq('aviso_id', avisoId)
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;

                const trabajos = data as TrabajoRealizado[];
                
                const estadisticas = {
                    totalTrabajos: trabajos.length,
                    trabajosCompletados: trabajos.filter(t => t.estado === 'Completado').length,
                    trabajosPendientes: trabajos.filter(t => t.estado === 'Pendiente').length,
                    trabajosEnCurso: trabajos.filter(t => t.estado === 'En curso').length,
                    trabajosCancelados: trabajos.filter(t => t.estado === 'Cancelado').length,
                    totalHoras: trabajos.reduce((total, trabajo) => {
                        const inicio = new Date(`2000-01-01T${trabajo.hora_inicio}`);
                        const fin = new Date(`2000-01-01T${trabajo.hora_fin}`);
                        const horas = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60);
                        return total + Math.max(0, horas);
                    }, 0)
                };

                return estadisticas;
            })
        );
    }

    /**
     * Obtiene el valor actual de trabajos
     */
    getTrabajosActuales(): TrabajoRealizado[] {
        return this.trabajosSubject.value;
    }

    /**
     * Limpia el estado de trabajos
     */
    limpiarTrabajos(): void {
        this.trabajosSubject.next([]);
        this.materialesTrabajoService.limpiarMateriales();
    }
} 