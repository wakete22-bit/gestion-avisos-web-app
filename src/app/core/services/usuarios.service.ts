import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario, RegisterRequest } from '../models/usuario.model';
import { SupabaseClientService } from './supabase-client.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private supabase: SupabaseClient;
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  public usuarios$ = this.usuariosSubject.asObservable();

  constructor(private supabaseClientService: SupabaseClientService) {
    this.supabase = this.supabaseClientService.getClient();
  }

  /**
   * Obtiene la lista de usuarios
   */
  getUsuarios(): Observable<Usuario[]> {
    return from(
      this.supabase
        .from('usuarios')
        .select(`
          *,
          rol:roles(*)
        `)
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        const usuarios = data as Usuario[];
        this.usuariosSubject.next(usuarios);
        return usuarios;
      }),
      catchError(error => {
        console.error('Error al obtener usuarios:', error);
        throw error;
      })
    );
  }

  /**
   * Obtiene un usuario por su ID
   */
  getUsuario(id: string): Observable<Usuario> {
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
        return data as Usuario;
      })
    );
  }

  /**
   * Crea un nuevo usuario en la tabla usuarios
   */
  crearUsuario(userData: RegisterRequest): Observable<Usuario> {
    const usuarioData = {
      id: userData.id, // ID del usuario de Supabase Auth
      nombre_completo: userData.nombre_completo,
      email: userData.email,
      telefono: userData.telefono,
      rol_id: userData.rol_id || 'default-role-id',
      fecha_creacion: new Date().toISOString(),
      es_activo: true
    };

    return from(
      this.supabase
        .from('usuarios')
        .insert([usuarioData])
        .select(`
          *,
          rol:roles(*)
        `)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        
        const nuevoUsuario = data as Usuario;
        const usuariosActuales = this.usuariosSubject.value;
        this.usuariosSubject.next([nuevoUsuario, ...usuariosActuales]);
        
        return nuevoUsuario;
      })
    );
  }

  /**
   * Actualiza un usuario existente
   */
  actualizarUsuario(id: string, usuario: Partial<Usuario>): Observable<Usuario> {
    const datosActualizados = {
      ...usuario,
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
        
        const usuarioActualizado = data as Usuario;
        const usuariosActuales = this.usuariosSubject.value;
        const index = usuariosActuales.findIndex(u => u.id === id);
        if (index !== -1) {
          usuariosActuales[index] = usuarioActualizado;
          this.usuariosSubject.next([...usuariosActuales]);
        }
        
        return usuarioActualizado;
      })
    );
  }

  /**
   * Desactiva un usuario (marcar como inactivo)
   */
  desactivarUsuario(id: string): Observable<void> {
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
        
        const usuariosActuales = this.usuariosSubject.value;
        const index = usuariosActuales.findIndex(u => u.id === id);
        if (index !== -1) {
          usuariosActuales[index].es_activo = false;
          this.usuariosSubject.next([...usuariosActuales]);
        }
      })
    );
  }

  /**
   * Obtiene el valor actual de usuarios
   */
  getUsuariosActuales(): Usuario[] {
    return this.usuariosSubject.value;
  }

  /**
   * Limpia el estado de usuarios
   */
  limpiarUsuarios(): void {
    this.usuariosSubject.next([]);
  }
} 