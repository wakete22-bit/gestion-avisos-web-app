import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
    TrabajoRealizado,
    TrabajoResponse,
    CrearTrabajoRequest,
    ActualizarTrabajoRequest
} from '../../modules/avisos/models/trabajo-realizado.model';

@Injectable({
    providedIn: 'root'
})
export class TrabajosService {
    private supabase: SupabaseClient;
    private trabajosSubject = new BehaviorSubject<TrabajoRealizado[]>([]);
    public trabajos$ = this.trabajosSubject.asObservable();

    constructor() {
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
     * Obtiene un trabajo por su ID
     */
    getTrabajo(id: string): Observable<TrabajoRealizado> {
        return from(
            this.supabase
                .from('trabajos_realizados')
                .select('*')
                .eq('id', id)
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;
                return data as TrabajoRealizado;
            })
        );
    }

    /**
     * Crea un nuevo trabajo realizado
     */
    crearTrabajo(trabajo: CrearTrabajoRequest): Observable<TrabajoRealizado> {
        const trabajoData = {
            ...trabajo,
            fecha_creacion: new Date().toISOString(),
            fecha_actualizacion: new Date().toISOString()
        };

        return from(
            this.supabase
                .from('trabajos_realizados')
                .insert([trabajoData])
                .select()
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error;

                const nuevoTrabajo = data as TrabajoRealizado;
                const trabajosActuales = this.trabajosSubject.value;
                this.trabajosSubject.next([nuevoTrabajo, ...trabajosActuales]);

                return nuevoTrabajo;
            })
        );
    }

    /**
     * Actualiza un trabajo existente
     */
    actualizarTrabajo(id: string, trabajo: ActualizarTrabajoRequest): Observable<TrabajoRealizado> {
        const datosActualizados = {
            ...trabajo,
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
            map(({ data, error }) => {
                if (error) throw error;

                const trabajoActualizado = data as TrabajoRealizado;
                const trabajosActuales = this.trabajosSubject.value;
                const index = trabajosActuales.findIndex(t => t.id === id);
                if (index !== -1) {
                    trabajosActuales[index] = trabajoActualizado;
                    this.trabajosSubject.next([...trabajosActuales]);
                }

                return trabajoActualizado;
            })
        );
    }

    /**
     * Elimina un trabajo
     */
    eliminarTrabajo(id: string): Observable<void> {
        return from(
            this.supabase
                .from('trabajos_realizados')
                .delete()
                .eq('id', id)
        ).pipe(
            map(({ error }) => {
                if (error) throw error;

                const trabajosActuales = this.trabajosSubject.value;
                const trabajosFiltrados = trabajosActuales.filter(t => t.id !== id);
                this.trabajosSubject.next(trabajosFiltrados);
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
    }
} 