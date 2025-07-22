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
export class TecnicosService {
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
   * Obtiene la lista de técnicos con paginación y filtros
   */
  getTecnicos(
    pagina: number = 1, 
    porPagina: number = 10, 
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    soloActivos: boolean = false
  ): Observable<TecnicoResponse> {
    let query = this.supabase
      .from('usuarios')
      .select(`
        *,
        rol:roles(*)
      `, { count: 'exact' });

    // Aplicar filtros
    if (busqueda) {
      query = query.or(`nombre_completo.ilike.%${busqueda}%,email.ilike.%${busqueda}%`);
    }

    // Filtrar por estado activo solo si se solicita explícitamente
    if (soloActivos) {
      query = query.eq('es_activo', true);
    }

    // Aplicar paginación y ordenamiento
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
      }),
      catchError(error => {
        console.error('Error al obtener técnicos:', error);
        throw error;
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
   * Crea un nuevo técnico
   */
  crearTecnico(tecnico: CrearTecnicoRequest): Observable<Tecnico> {
    return from(
      this.crearTecnicoConAuth(tecnico)
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          // Manejar errores específicos
          if (error.message?.includes('Ya existe un usuario con este email')) {
            throw new Error('Ya existe un usuario con este email');
          } else if (error.code === '23505') {
            throw new Error('El usuario ya existe en el sistema');
          } else {
            throw error;
          }
        }
        
        if (!data) {
          throw new Error('No se pudo crear el técnico');
        }
        
        const nuevoTecnico = data as Tecnico;
        const tecnicosActuales = this.tecnicosSubject.value;
        this.tecnicosSubject.next([nuevoTecnico, ...tecnicosActuales]);
        
        return nuevoTecnico;
      }),
      catchError(error => {
        console.error('Error en crearTecnico:', error);
        throw error;
      })
    );
  }

  /**
   * Crea un técnico con autenticación de Supabase
   */
  private async crearTecnicoConAuth(tecnico: CrearTecnicoRequest): Promise<{ data: any, error: any }> {
    try {
      // 1. Verificar si el usuario ya existe en la tabla usuarios
      const { data: existingUser, error: checkError } = await this.supabase
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

      // 2. Crear usuario en Supabase Auth usando signUp
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
        console.error('Error al crear usuario en Auth:', authError);
        return { data: null, error: authError };
      }

      if (!authData.user) {
        return { data: null, error: new Error('No se pudo crear el usuario en Auth') };
      }

      // 3. Intentar crear el usuario en la tabla usuarios con reintentos
      let retries = 5; // Aumentar el número de reintentos
      let lastError = null;

      while (retries > 0) {
        try {
          // Esperar un momento antes de intentar
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Verificar si el usuario ya existe
          const { data: checkUser, error: checkError } = await this.supabase
            .from('usuarios')
            .select(`
              *,
              rol:roles(*)
            `)
            .eq('id', authData.user.id)
            .single();

          if (checkUser) {
            // El usuario ya existe, verificar que tenga el rol correcto
            if (checkUser.rol_id !== tecnico.rol_id) {
              console.warn('⚠️ Usuario existe pero con rol diferente, actualizando rol...');
              
              // Actualizar el rol del usuario existente
              const { data: updatedUser, error: updateError } = await this.supabase
                .from('usuarios')
                .update({ 
                  rol_id: tecnico.rol_id,
                  fecha_actualizacion: new Date().toISOString()
                })
                .eq('id', authData.user.id)
                .select(`
                  *,
                  rol:roles(*)
                `)
                .single();

              if (updateError) {
                console.error('Error al actualizar rol:', updateError);
                return { data: checkUser, error: null }; // Retornar el usuario original
              }

              console.log('✅ Rol actualizado exitosamente:', updatedUser);
              return { data: updatedUser, error: null };
            }
            
            console.log('✅ Usuario ya existe con el rol correcto:', checkUser);
            return { data: checkUser, error: null };
          }

          // Crear usuario en la tabla usuarios
          const tecnicoData = {
            id: authData.user.id,
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
            lastError = error;
            console.error(`❌ Error en intento ${6 - retries}:`, error);
            
            // Si es un error de clave duplicada, intentar obtener el usuario existente
            if (error.code === '23505') {
              const { data: existingData, error: fetchError } = await this.supabase
                .from('usuarios')
                .select(`
                  *,
                  rol:roles(*)
                `)
                .eq('id', authData.user.id)
                .single();

              if (existingData) {
                console.log('✅ Usuario encontrado después de error de duplicado:', existingData);
                return { data: existingData, error: null };
              }
            }
            
            retries--;
            continue;
          }

          console.log('✅ Técnico creado exitosamente:', data);
          return { data, error: null };
        } catch (error) {
          lastError = error;
          console.error(`❌ Excepción en intento ${6 - retries}:`, error);
          retries--;
          continue;
        }
      }

      // Si llegamos aquí, todos los reintentos fallaron
      console.error('Error después de reintentos:', lastError);
      
      // Como último recurso, intentar obtener el usuario existente
      try {
        const { data: existingData, error: fetchError } = await this.supabase
          .from('usuarios')
          .select(`
            *,
            rol:roles(*)
          `)
          .eq('id', authData.user.id)
          .single();

        if (existingData) {
          console.log('✅ Usuario encontrado como último recurso:', existingData);
          return { data: existingData, error: null };
        }
      } catch (finalError) {
        console.error('Error final al buscar usuario:', finalError);
      }
      
      return { data: null, error: lastError };
    } catch (error) {
      console.error('Error general al crear técnico:', error);
      return { data: null, error };
    }
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
   * Desactiva un técnico (marcar como inactivo)
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
   * Activa un técnico (marcar como activo)
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
   * Busca técnicos por término de búsqueda
   */
  buscarTecnicos(termino: string): Observable<Tecnico[]> {
    return from(
      this.supabase
        .from('usuarios')
        .select(`
          *,
          rol:roles(*)
        `)
        .or(`nombre_completo.ilike.%${termino}%,email.ilike.%${termino}%`)
        .eq('es_activo', true)
        .limit(10)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Tecnico[];
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