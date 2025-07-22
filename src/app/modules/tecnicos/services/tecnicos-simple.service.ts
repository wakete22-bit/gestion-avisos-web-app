import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { 
  Tecnico, 
  TecnicoResponse, 
  CrearTecnicoRequest, 
  ActualizarTecnicoRequest 
} from '../models/tecnico.model';

@Injectable({
  providedIn: 'root'
})
export class TecnicosSimpleService {
  private supabase: SupabaseClient;
  private tecnicosSubject = new BehaviorSubject<Tecnico[]>([]);
  public tecnicos$ = this.tecnicosSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  /**
   * Crea un nuevo técnico (versión simplificada)
   */
  crearTecnico(tecnico: CrearTecnicoRequest): Observable<Tecnico> {
    return from(this.crearTecnicoSimple(tecnico)).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const nuevoTecnico = data as Tecnico;
        const tecnicosActuales = this.tecnicosSubject.value;
        this.tecnicosSubject.next([nuevoTecnico, ...tecnicosActuales]);
        
        return nuevoTecnico;
      })
    );
  }

  /**
   * Método simplificado para crear técnico
   */
  private async crearTecnicoSimple(tecnico: CrearTecnicoRequest): Promise<{ data: any, error: any }> {
    try {
      // 1. Verificar si el email ya existe
      const { data: existingUser } = await this.supabase
        .from('usuarios')
        .select('id')
        .eq('email', tecnico.email)
        .maybeSingle();

      if (existingUser) {
        return { 
          data: null, 
          error: new Error('Ya existe un usuario con este email') 
        };
      }

      // 2. Generar un ID único para el usuario
      const userId = crypto.randomUUID();

      // 3. Crear el usuario directamente en la tabla usuarios
      const tecnicoData = {
        id: userId,
        nombre_completo: tecnico.nombre_completo,
        email: tecnico.email,
        telefono: tecnico.telefono,
        rol_id: tecnico.rol_id,
        es_activo: tecnico.es_activo ?? true,
        fecha_creacion: new Date().toISOString()
      };

      console.log('🔧 Creando técnico con datos:', tecnicoData);

      const { data, error } = await this.supabase
        .from('usuarios')
        .insert([tecnicoData])
        .select(`
          *,
          rol:roles(*)
        `)
        .single();

      if (error) {
        console.error('Error al crear usuario:', error);
        return { data: null, error };
      }

      console.log('✅ Técnico creado exitosamente:', data);

      // 4. Crear el usuario en Supabase Auth usando signUp (sin admin)
      try {
        const { data: authData, error: authError } = await this.supabase.auth.signUp({
          email: tecnico.email,
          password: tecnico.password,
          options: {
            data: {
              nombre_completo: tecnico.nombre_completo,
              telefono: tecnico.telefono
            }
          }
        });

        if (authError) {
          console.warn('No se pudo crear usuario en Auth:', authError);
          // Continuar aunque falle la creación en Auth
        } else {
          console.log('✅ Usuario creado en Auth:', authData);
        }
      } catch (authError) {
        console.warn('Error al crear usuario en Auth:', authError);
        // Continuar aunque falle la creación en Auth
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error general al crear técnico:', error);
      return { data: null, error };
    }
  }

  /**
   * Obtiene la lista de técnicos
   */
  getTecnicos(
    pagina: number = 1, 
    porPagina: number = 10, 
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc' = 'desc'
  ): Observable<TecnicoResponse> {
    let query = this.supabase
      .from('usuarios')
      .select(`
        *,
        rol:roles(*)
      `, { count: 'exact' });

    if (busqueda) {
      query = query.or(`nombre_completo.ilike.%${busqueda}%,email.ilike.%${busqueda}%`);
    }

    const desde = (pagina - 1) * porPagina;
    query = query
      .range(desde, desde + porPagina - 1)
      .order(ordenarPor || 'fecha_creacion', { ascending: orden === 'asc' });

    return from(query).pipe(
      map(({ data, error, count }) => {
        if (error) throw error;
        
        const tecnicos = data as Tecnico[];
        this.tecnicosSubject.next(tecnicos);
        
        return {
          tecnicos,
          total: count || 0,
          pagina,
          por_pagina: porPagina
        };
      })
    );
  }

  /**
   * Obtiene un técnico por su ID
   */
  getTecnico(id: string): Observable<Tecnico> {
    return from(
      this.supabase
        .from('usuarios')
        .select(`
          *,
          rol:roles(*)
        `)
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Tecnico;
      })
    );
  }

  /**
   * Actualiza un técnico existente
   */
  actualizarTecnico(id: string, tecnico: ActualizarTecnicoRequest): Observable<Tecnico> {
    const datosActualizados = {
      ...tecnico,
      fecha_actualizacion: new Date().toISOString()
    };

    return from(
      this.supabase
        .from('usuarios')
        .update(datosActualizados)
        .eq('id', id)
        .select(`
          *,
          rol:roles(*)
        `)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const tecnicoActualizado = data as Tecnico;
        const tecnicosActuales = this.tecnicosSubject.value;
        const index = tecnicosActuales.findIndex(t => t.id === id);
        if (index !== -1) {
          tecnicosActuales[index] = tecnicoActualizado;
          this.tecnicosSubject.next([...tecnicosActuales]);
        }
        
        return tecnicoActualizado;
      })
    );
  }

  /**
   * Desactiva un técnico
   */
  desactivarTecnico(id: string): Observable<void> {
    return from(
      this.supabase
        .from('usuarios')
        .update({ 
          es_activo: false,
          fecha_actualizacion: new Date().toISOString()
        })
        .eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
        
        const tecnicosActuales = this.tecnicosSubject.value;
        const index = tecnicosActuales.findIndex(t => t.id === id);
        if (index !== -1) {
          tecnicosActuales[index].es_activo = false;
          this.tecnicosSubject.next([...tecnicosActuales]);
        }
      })
    );
  }

  /**
   * Activa un técnico
   */
  activarTecnico(id: string): Observable<void> {
    return from(
      this.supabase
        .from('usuarios')
        .update({ 
          es_activo: true,
          fecha_actualizacion: new Date().toISOString()
        })
        .eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
        
        const tecnicosActuales = this.tecnicosSubject.value;
        const index = tecnicosActuales.findIndex(t => t.id === id);
        if (index !== -1) {
          tecnicosActuales[index].es_activo = true;
          this.tecnicosSubject.next([...tecnicosActuales]);
        }
      })
    );
  }

  /**
   * Obtiene el valor actual de técnicos
   */
  getTecnicosActuales(): Tecnico[] {
    return this.tecnicosSubject.value;
  }

  /**
   * Limpia el estado de técnicos
   */
  limpiarTecnicos(): void {
    this.tecnicosSubject.next([]);
  }
} 