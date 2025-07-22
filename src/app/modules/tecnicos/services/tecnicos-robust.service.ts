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
export class TecnicosRobustService {
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
   * Crea un nuevo técnico (versión robusta)
   */
  crearTecnico(tecnico: CrearTecnicoRequest): Observable<Tecnico> {
    return from(this.crearTecnicoRobust(tecnico)).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('Error en crearTecnico:', error);
          throw error;
        }
        
        if (!data) {
          throw new Error('No se pudo crear el técnico');
        }
        
        const nuevoTecnico = data as Tecnico;
        const tecnicosActuales = this.tecnicosSubject.value;
        this.tecnicosSubject.next([nuevoTecnico, ...tecnicosActuales]);
        
        return nuevoTecnico;
      })
    );
  }

  /**
   * Método robusto para crear técnico
   */
  private async crearTecnicoRobust(tecnico: CrearTecnicoRequest): Promise<{ data: any, error: any }> {
    try {
      console.log('🔧 Iniciando creación de técnico:', tecnico.email);

      // 1. Verificar si el email ya existe
      const { data: existingUser, error: checkError } = await this.supabase
        .from('usuarios')
        .select('id, rol_id')
        .eq('email', tecnico.email)
        .maybeSingle();

      if (existingUser) {
        console.log('⚠️ Usuario ya existe con email:', tecnico.email);
        
        // Si el usuario existe, verificar si necesita actualización de rol
        if (existingUser.rol_id !== tecnico.rol_id) {
          console.log('🔄 Actualizando rol del usuario existente...');
          
          const { data: updatedUser, error: updateError } = await this.supabase
            .from('usuarios')
            .update({ 
              rol_id: tecnico.rol_id,
              fecha_actualizacion: new Date().toISOString()
            })
            .eq('id', existingUser.id)
            .select(`
              *,
              rol:roles(*)
            `)
            .single();

          if (updateError) {
            console.error('Error al actualizar rol:', updateError);
            return { data: null, error: updateError };
          }

          console.log('✅ Usuario actualizado exitosamente:', updatedUser);
          return { data: updatedUser, error: null };
        } else {
          // El usuario ya existe con el rol correcto
          const { data: userData, error: userError } = await this.supabase
            .from('usuarios')
            .select(`
              *,
              rol:roles(*)
            `)
            .eq('id', existingUser.id)
            .single();

          if (userError) {
            return { data: null, error: userError };
          }

          console.log('✅ Usuario ya existe con rol correcto:', userData);
          return { data: userData, error: null };
        }
      }

      // 2. Crear usuario en Supabase Auth
      console.log('🔧 Creando usuario en Supabase Auth...');
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

      console.log('✅ Usuario creado en Auth:', authData.user.id);

      // 3. Crear usuario en la tabla usuarios
      const tecnicoData = {
        id: authData.user.id,
        nombre_completo: tecnico.nombre_completo,
        email: tecnico.email,
        telefono: tecnico.telefono,
        rol_id: tecnico.rol_id,
        es_activo: tecnico.es_activo ?? true,
        fecha_creacion: new Date().toISOString()
      };

      console.log('🔧 Creando usuario en tabla usuarios:', tecnicoData);

      // Intentar crear con reintentos
      let retries = 3;
      let lastError = null;

      while (retries > 0) {
        try {
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
            console.error(`❌ Error en intento ${4 - retries}:`, error);
            
            // Si es un error de clave duplicada, intentar obtener el usuario existente
            if (error.code === '23505') {
              console.log('🔄 Usuario ya existe, intentando obtener...');
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
            if (retries > 0) {
              console.log(`⏳ Esperando antes del siguiente intento... (${retries} restantes)`);
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
            continue;
          }

          console.log('✅ Técnico creado exitosamente:', data);
          return { data, error: null };
        } catch (error) {
          lastError = error;
          console.error(`❌ Excepción en intento ${4 - retries}:`, error);
          retries--;
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
          continue;
        }
      }

      // Si llegamos aquí, todos los reintentos fallaron
      console.error('❌ Todos los reintentos fallaron:', lastError);
      
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
   * Obtiene la lista de técnicos
   */
  getTecnicos(
    pagina: number = 1, 
    porPagina: number = 10, 
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc' = 'desc',
    soloActivos: boolean = false
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

    if (soloActivos) {
      query = query.eq('es_activo', true);
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
   * Busca técnicos por término
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
        .order('nombre_completo', { ascending: true })
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