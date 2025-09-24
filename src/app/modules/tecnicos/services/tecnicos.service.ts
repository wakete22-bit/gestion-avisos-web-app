import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseClientService } from '../../../core/services/supabase-client.service';
import { DataUpdateService } from '../../../core/services/data-update.service';
import { Observable, BehaviorSubject, from, throwError, of } from 'rxjs';
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
  private tecnicosSubject = new BehaviorSubject<Tecnico[]>([]);
  public tecnicos$ = this.tecnicosSubject.asObservable();

  constructor(
    private supabaseClientService: SupabaseClientService,
    private dataUpdateService: DataUpdateService
  ) {
    // NO asignar cliente estático - usar método dinámico
  }

  /**
   * Obtiene el cliente Supabase actualizado dinámicamente
   */
  private getSupabaseClient() {
    console.log('🔧 TecnicosService: Obteniendo cliente Supabase actualizado...');
    return this.supabaseClientService.getClient();
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
    let query = this.getSupabaseClient()
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
   * Obtiene la lista de técnicos usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  getTecnicosDirect(
    pagina: number = 1, 
    porPagina: number = 10, 
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    soloActivos: boolean = false
  ): Observable<TecnicoResponse> {
    console.log('🚀 TecnicosService: Usando FETCH DIRECTO para técnicos...');
    
    return from(this.fetchTecnicosDirect(pagina, porPagina, busqueda, ordenarPor, orden, soloActivos)).pipe(
      map(result => {
        console.log('✅ TecnicosService: FETCH DIRECTO completado, técnicos:', result.tecnicos.length);
        
        // Actualizar el subject local
        this.tecnicosSubject.next(result.tecnicos);
        
        return result;
      }),
      catchError(error => {
        console.error('❌ TecnicosService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para técnicos - BYPASA CLIENTE SUPABASE
   */
  private async fetchTecnicosDirect(
    pagina: number = 1, 
    porPagina: number = 10, 
    busqueda?: string,
    ordenarPor?: string,
    orden?: 'asc' | 'desc',
    soloActivos: boolean = false
  ): Promise<TecnicoResponse> {
    console.log('🚀 TecnicosService: Ejecutando fetch directo para técnicos...');
    
    try {
      // Construir URL con parámetros
      let url = `${environment.supabaseUrl}/rest/v1/usuarios?select=*,rol:roles(*)`;

      // Aplicar filtros
      const filters: string[] = [];
      
      if (busqueda) {
        filters.push(`or=(nombre_completo.ilike.*${busqueda}*,email.ilike.*${busqueda}*)`);
      }
      
      if (soloActivos) {
        filters.push(`es_activo=eq.true`);
      }
      
      if (filters.length > 0) {
        url += '&' + filters.join('&');
      }
      
      // Aplicar paginación y ordenamiento
      const desde = (pagina - 1) * porPagina;
      url += `&limit=${porPagina}&offset=${desde}`;
      url += `&order=${ordenarPor || 'fecha_creacion'}.${orden === 'asc' ? 'asc' : 'desc'}`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
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
      const contentRange = response.headers.get('content-range');
      const total = contentRange ? parseInt(contentRange.split('/')[1]) : data.length;
      
      console.log('🚀 Datos recibidos:', data?.length || 0, 'técnicos, total:', total);
      
      return {
        tecnicos: data as Tecnico[],
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
   * Obtiene un técnico por su ID
   */
  getTecnico(id: string): Observable<Tecnico> {
    return from(
      this.getSupabaseClient()
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
    // Validar datos de entrada antes de proceder
    if (!this.validarDatosTecnico(tecnico)) {
      // Si la validación falla porque el técnico ya tiene ID, retornarlo directamente
      if ((tecnico as any).id) {
        console.log('🔧 Técnico ya existe, retornando datos existentes');
        return of(tecnico as any);
      }
      return throwError(() => new Error('Datos del técnico no válidos'));
    }

    console.log('🔧 Iniciando creación de técnico:', { 
      email: tecnico.email, 
      nombre: tecnico.nombre_completo,
      rol_id: tecnico.rol_id 
    });

    return from(
      this.crearTecnicoConAuth(tecnico)
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          // Manejar errores específicos con mensajes más claros
          console.error('❌ Error en crearTecnico:', error);
          
          if (error.message?.includes('Ya existe un usuario con este email')) {
            throw new Error('Ya existe un usuario con este email');
          } else if (error.code === '23505') {
            throw new Error('El usuario ya existe en el sistema');
          } else if (error.message?.includes('Invalid login credentials')) {
            throw new Error('Credenciales inválidas. Verifica el email y contraseña.');
          } else if (error.message?.includes('Password should be at least 6 characters')) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
          } else if (error.message?.includes('Unable to validate email address')) {
            throw new Error('El formato del email no es válido');
          } else if (error.message?.includes('Email not confirmed')) {
            throw new Error('El email necesita ser confirmado');
          } else if (error.message?.includes('signup_disabled')) {
            throw new Error('El registro de nuevos usuarios está deshabilitado');
          } else {
            throw error;
          }
        }
        
        if (!data) {
          throw new Error('No se pudo crear el técnico - respuesta vacía');
        }
        
        console.log('✅ Técnico creado exitosamente:', data);
        
        const nuevoTecnico = data as Tecnico;
        const tecnicosActuales = this.tecnicosSubject.value;
        this.tecnicosSubject.next([nuevoTecnico, ...tecnicosActuales]);
        
        // Notificar creación y limpiar cache
        this.dataUpdateService.notifyCreated('tecnicos');
        
        return nuevoTecnico;
      }),
      catchError(error => {
        console.error('❌ Error final en crearTecnico:', error);
        throw error;
      })
    );
  }

  /**
   * Valida los datos del técnico antes de crear
   */
  private validarDatosTecnico(tecnico: CrearTecnicoRequest): boolean {
    // Si el técnico ya tiene ID, significa que ya fue creado
    // No necesita validación de creación
    if ((tecnico as any).id) {
      console.log('✅ Técnico ya creado, saltando validación de creación');
      return false; // No proceder con creación
    }

    if (!tecnico.nombre_completo?.trim()) {
      console.error('❌ Validación fallida: nombre_completo requerido');
      return false;
    }
    
    if (!tecnico.email?.trim()) {
      console.error('❌ Validación fallida: email requerido');
      return false;
    }
    
    if (!tecnico.password?.trim()) {
      console.error('❌ Validación fallida: password requerido');
      return false;
    }
    
    if (tecnico.password.length < 6) {
      console.error('❌ Validación fallida: password debe tener al menos 6 caracteres');
      return false;
    }
    
    if (!tecnico.rol_id?.trim()) {
      console.error('❌ Validación fallida: rol_id requerido');
      return false;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tecnico.email)) {
      console.error('❌ Validación fallida: formato de email inválido');
      return false;
    }
    
    console.log('✅ Validación de datos exitosa');
    return true;
  }

  /**
   * Crea un técnico con autenticación de Supabase
   */
  private async crearTecnicoConAuth(tecnico: CrearTecnicoRequest): Promise<{ data: any, error: any }> {
    const timeoutMs = 30000; // 30 segundos timeout
    
    try {
      console.log('🔧 Paso 1: Verificando usuario existente...');
      
      // 1. Verificar si el usuario ya existe en la tabla usuarios
      const { data: existingUser, error: checkError } = await this.getSupabaseClient()
        .from('usuarios')
        .select('id, email')
        .eq('email', tecnico.email)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Error al verificar usuario existente:', checkError);
        return { data: null, error: checkError };
      }

      if (existingUser) {
        console.warn('⚠️ Usuario ya existe:', existingUser);
        return { 
          data: null, 
          error: new Error('Ya existe un usuario con este email') 
        };
      }

      console.log('🔧 Paso 2: Creando usuario en Supabase Auth...');

      // 2. Crear usuario en Supabase Auth usando signUp
      const { data: authData, error: authError } = await this.getSupabaseClient().auth.signUp({
        email: tecnico.email,
        password: tecnico.password,
        options: {
          data: {
            nombre_completo: tecnico.nombre_completo,
            telefono: tecnico.telefono || null
          }
        }
      });

      if (authError) {
        console.error('❌ Error al crear usuario en Auth:', authError);
        return { data: null, error: authError };
      }

      if (!authData.user) {
        console.error('❌ No se recibió usuario de Auth');
        return { data: null, error: new Error('No se pudo crear el usuario en Auth') };
      }

      console.log('✅ Usuario creado en Auth:', { id: authData.user.id, email: authData.user.email });

      // 3. Crear usuario en la tabla usuarios con estrategia mejorada
      return await this.crearUsuarioEnBD(authData.user.id, tecnico);

    } catch (error) {
      console.error('❌ Error general en crearTecnicoConAuth:', error);
      return { data: null, error };
    }
  }

  /**
   * Crea el usuario en la base de datos con reintentos inteligentes
   */
  private async crearUsuarioEnBD(userId: string, tecnico: CrearTecnicoRequest): Promise<{ data: any, error: any }> {
    console.log('🔧 Paso 3: Creando usuario en base de datos...');
    
    const maxReintentos = 5;
    const delayBase = 1500; // 1.5 segundos
    let lastError = null;

    for (let intento = 1; intento <= maxReintentos; intento++) {
      try {
        console.log(`🔧 Intento ${intento}/${maxReintentos}: Creando usuario en BD...`);

        // Esperar antes de cada intento (excepto el primero)
        if (intento > 1) {
          const delay = delayBase * intento; // Delay progresivo
          console.log(`⏱️ Esperando ${delay}ms antes del intento...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        // Verificar si el usuario ya existe en BD
        const { data: usuarioExistente, error: checkError } = await this.getSupabaseClient()
          .from('usuarios')
          .select(`
            *,
            rol:roles(*)
          `)
          .eq('id', userId)
          .maybeSingle();

        if (usuarioExistente) {
          console.log('✅ Usuario ya existe en BD:', usuarioExistente);
          
          // Verificar si tiene el rol correcto
          if (usuarioExistente.rol_id !== tecnico.rol_id) {
            console.log('🔧 Actualizando rol del usuario existente...');
            
            const { data: usuarioActualizado, error: updateError } = await this.getSupabaseClient()
              .from('usuarios')
              .update({ 
                rol_id: tecnico.rol_id,
                nombre_completo: tecnico.nombre_completo,
                telefono: tecnico.telefono,
                fecha_actualizacion: new Date().toISOString()
              })
              .eq('id', userId)
              .select(`
                *,
                rol:roles(*)
              `)
              .single();

            if (updateError) {
              console.warn('⚠️ Error al actualizar usuario, usando datos existentes:', updateError);
              return { data: usuarioExistente, error: null };
            }

            console.log('✅ Usuario actualizado exitosamente');
            return { data: usuarioActualizado, error: null };
          }
          
          return { data: usuarioExistente, error: null };
        }

        // Crear nuevo usuario en BD
        const tecnicoData = {
          id: userId,
          nombre_completo: tecnico.nombre_completo.trim(),
          email: tecnico.email.trim().toLowerCase(),
          telefono: tecnico.telefono?.trim() || null,
          rol_id: tecnico.rol_id,
          es_activo: tecnico.es_activo ?? true,
          fecha_creacion: new Date().toISOString()
        };

        console.log('🔧 Insertando usuario con datos:', tecnicoData);

        const { data, error } = await this.getSupabaseClient()
          .from('usuarios')
          .insert([tecnicoData])
          .select(`
            *,
            rol:roles(*)
          `)
          .single();

        if (error) {
          lastError = error;
          console.error(`❌ Error en intento ${intento}:`, error);
          
          // Manejo específico de errores conocidos
          if (error.code === '23505') {
            console.log('🔧 Detectado duplicado, intentando obtener usuario existente...');
            const { data: duplicateUser } = await this.getSupabaseClient()
              .from('usuarios')
              .select(`
                *,
                rol:roles(*)
              `)
              .eq('id', userId)
              .single();

            if (duplicateUser) {
              console.log('✅ Usuario duplicado encontrado');
              return { data: duplicateUser, error: null };
            }
          }
          
          // Si es el último intento, no continuar
          if (intento === maxReintentos) {
            break;
          }
          
          continue;
        }

        console.log('✅ Usuario creado exitosamente en BD');
        return { data, error: null };

      } catch (error) {
        lastError = error;
        console.error(`❌ Excepción en intento ${intento}:`, error);
        
        if (intento === maxReintentos) {
          break;
        }
        
        continue;
      }
    }

    // Último intento de recuperación
    console.log('🔧 Último intento: buscando usuario existente...');
    try {
      const { data: finalUser, error: finalError } = await this.getSupabaseClient()
        .from('usuarios')
        .select(`
          *,
          rol:roles(*)
        `)
        .eq('id', userId)
        .single();

      if (finalUser) {
        console.log('✅ Usuario encontrado en búsqueda final');
        return { data: finalUser, error: null };
      }
    } catch (finalError) {
      console.error('❌ Error en búsqueda final:', finalError);
    }
    
    console.error('❌ Todos los intentos fallaron');
    return { data: null, error: lastError || new Error('Error desconocido al crear usuario') };
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
      this.getSupabaseClient()
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
        
        // Notificar actualización y limpiar cache
        this.dataUpdateService.notifyUpdated('tecnicos');
        
        return tecnicoActualizado;
      })
    );
  }

  /**
   * Actualiza un técnico existente usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  actualizarTecnicoDirect(id: string, tecnico: ActualizarTecnicoRequest): Observable<Tecnico> {
    console.log('🚀 TecnicosService: Usando FETCH DIRECTO para actualizar técnico...');
    
    return from(this.fetchActualizarTecnicoDirect(id, tecnico)).pipe(
      map(result => {
        console.log('✅ TecnicosService: FETCH DIRECTO completado, técnico actualizado:', result.id);
        
        // Actualizar el subject local
        const tecnicosActuales = this.tecnicosSubject.value;
        const index = tecnicosActuales.findIndex(t => t.id === id);
        if (index !== -1) {
          tecnicosActuales[index] = result;
          this.tecnicosSubject.next([...tecnicosActuales]);
        }
        
        // Notificar actualización y limpiar cache
        this.dataUpdateService.notifyUpdated('tecnicos');
        
        return result;
      }),
      catchError(error => {
        console.error('❌ TecnicosService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para actualizar técnico - BYPASA CLIENTE SUPABASE
   */
  private async fetchActualizarTecnicoDirect(id: string, tecnico: ActualizarTecnicoRequest): Promise<Tecnico> {
    console.log('🚀 TecnicosService: Ejecutando fetch directo para actualizar técnico:', id);
    
    try {
      const datosActualizados = {
        ...tecnico,
        fecha_actualizacion: new Date().toISOString()
      };

      const url = `${environment.supabaseUrl}/rest/v1/usuarios?id=eq.${id}`;
      
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
      console.log('🚀 Datos recibidos:', data?.length || 0, 'técnicos actualizados');
      
      if (!data || data.length === 0) {
        throw new Error('Técnico no encontrado');
      }
      
      return data[0] as Tecnico;
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Desactiva un técnico (marcar como inactivo)
   */
  desactivarTecnico(id: string): Observable<void> {
    return from(
      this.getSupabaseClient()
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

        // Notificar actualización y limpiar cache
        this.dataUpdateService.notifyUpdated('tecnicos');
      })
    );
  }

  /**
   * Desactiva un técnico usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  desactivarTecnicoDirect(id: string): Observable<void> {
    console.log('🚀 TecnicosService: Usando FETCH DIRECTO para desactivar técnico...');
    
    return from(this.fetchDesactivarTecnicoDirect(id)).pipe(
      map(() => {
        console.log('✅ TecnicosService: FETCH DIRECTO completado, técnico desactivado:', id);
        
        // Actualizar el subject local
        const tecnicosActuales = this.tecnicosSubject.value;
        const index = tecnicosActuales.findIndex(t => t.id === id);
        if (index !== -1) {
          tecnicosActuales[index].es_activo = false;
          this.tecnicosSubject.next([...tecnicosActuales]);
        }

        // Notificar actualización y limpiar cache
        this.dataUpdateService.notifyUpdated('tecnicos');
      }),
      catchError(error => {
        console.error('❌ TecnicosService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para desactivar técnico - BYPASA CLIENTE SUPABASE
   */
  private async fetchDesactivarTecnicoDirect(id: string): Promise<void> {
    console.log('🚀 TecnicosService: Ejecutando fetch directo para desactivar técnico:', id);
    
    try {
      const datosActualizados = {
        es_activo: false,
        fecha_actualizacion: new Date().toISOString()
      };

      const url = `${environment.supabaseUrl}/rest/v1/usuarios?id=eq.${id}`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json'
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
      
      console.log('✅ Técnico desactivado exitosamente');
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Activa un técnico (marcar como activo)
   */
  activarTecnico(id: string): Observable<void> {
    return from(
      this.getSupabaseClient()
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

        // Notificar actualización y limpiar cache
        this.dataUpdateService.notifyUpdated('tecnicos');
      })
    );
  }

  /**
   * Activa un técnico usando FETCH DIRECTO - EVITA BLOQUEOS
   */
  activarTecnicoDirect(id: string): Observable<void> {
    console.log('🚀 TecnicosService: Usando FETCH DIRECTO para activar técnico...');
    
    return from(this.fetchActivarTecnicoDirect(id)).pipe(
      map(() => {
        console.log('✅ TecnicosService: FETCH DIRECTO completado, técnico activado:', id);
        
        // Actualizar el subject local
        const tecnicosActuales = this.tecnicosSubject.value;
        const index = tecnicosActuales.findIndex(t => t.id === id);
        if (index !== -1) {
          tecnicosActuales[index].es_activo = true;
          this.tecnicosSubject.next([...tecnicosActuales]);
        }

        // Notificar actualización y limpiar cache
        this.dataUpdateService.notifyUpdated('tecnicos');
      }),
      catchError(error => {
        console.error('❌ TecnicosService: Error en FETCH DIRECTO:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch directo para activar técnico - BYPASA CLIENTE SUPABASE
   */
  private async fetchActivarTecnicoDirect(id: string): Promise<void> {
    console.log('🚀 TecnicosService: Ejecutando fetch directo para activar técnico:', id);
    
    try {
      const datosActualizados = {
        es_activo: true,
        fecha_actualizacion: new Date().toISOString()
      };

      const url = `${environment.supabaseUrl}/rest/v1/usuarios?id=eq.${id}`;
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json'
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
      
      console.log('✅ Técnico activado exitosamente');
      
    } catch (error) {
      console.error('🚀 Error en fetch directo:', error);
      throw error;
    }
  }

  /**
   * Busca técnicos por término de búsqueda
   */
  buscarTecnicos(termino: string): Observable<Tecnico[]> {
    return from(
      this.getSupabaseClient()
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
   * Obtiene todos los roles disponibles desde la base de datos
   */
  async obtenerRolesDisponibles(): Promise<Array<{id: string, nombre_rol: string}>> {
    try {
      const { data, error } = await this.getSupabaseClient()
        .from('roles')
        .select('id, nombre_rol')
        .order('nombre_rol');

      if (error) {
        console.error('❌ Error al obtener roles:', error);
        throw error;
      }

      console.log('✅ Roles obtenidos desde BD:', data);
      return data || [];
    } catch (error) {
      console.error('❌ Error al obtener roles desde BD:', error);
      throw error;
    }
  }

  /**
   * Método auxiliar para mostrar los UUIDs de roles en consola (solo para desarrollo)
   * Ejecutar en consola del navegador: tecnicosService.mostrarUUIDsRoles()
   */
  async mostrarUUIDsRoles(): Promise<void> {
    try {
      console.log('🔧 Obteniendo UUIDs de roles para configuración...');
      
      const roles = await this.obtenerRolesDisponibles();
      
      console.log('═══════════════════════════════════════');
      console.log('📋 UUIDS DE ROLES PARA CONFIGURACIÓN');
      console.log('═══════════════════════════════════════');
      
      roles.forEach(rol => {
        console.log(`${rol.nombre_rol}: ${rol.id}`);
      });
      
      console.log('═══════════════════════════════════════');
      console.log('💡 Copia estos UUIDs para usar en el código');
      
      // Mostrar código de ejemplo
      console.log('\n🔧 Código de ejemplo para rolesDisponibles:');
      console.log('rolesDisponibles = [');
      roles.forEach(rol => {
        console.log(`  { value: '${rol.id}', label: '${rol.nombre_rol}', descripcion: '...' },`);
      });
      console.log('];');
      
    } catch (error) {
      console.error('❌ Error al mostrar UUIDs de roles:', error);
    }
  }

  /**
   * Limpia el estado de técnicos
   */
  limpiarTecnicos(): void {
    this.tecnicosSubject.next([]);
  }
} 