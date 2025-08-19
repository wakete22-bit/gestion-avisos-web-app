import { Injectable, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SupabaseClientService } from './supabase-client.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService implements OnInit {
  private isInitialized = false;

  constructor(
    private platform: Platform,
    private supabaseClientService: SupabaseClientService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Este método se ejecuta cuando el servicio se inicializa
    this.initializeApp();
  }

  /**
   * Inicializa la aplicación y restaura la sesión si existe
   */
  async initializeApp(): Promise<void> {
    if (this.isInitialized) {
      console.log('🔧 AppInitService: App ya inicializada');
      return;
    }

    try {
      console.log('🚀 AppInitService: Iniciando aplicación...');

      // Esperar a que la plataforma esté lista
      await this.platform.ready();

      console.log('📱 Plataforma lista:', this.platform.is('mobile') ? 'Móvil' : 'Web');

      // Inicializar el cliente Supabase
      const supabaseClient = this.supabaseClientService.getClient();
      console.log('🔧 Cliente Supabase inicializado');

      // Restaurar sesión si existe
      await this.restoreUserSession();

      this.isInitialized = true;
      console.log('✅ AppInitService: Aplicación inicializada correctamente');

    } catch (error) {
      console.error('❌ AppInitService: Error en inicialización:', error);
    }
  }

  /**
   * Restaura la sesión del usuario si existe una válida
   */
  private async restoreUserSession(): Promise<void> {
    try {
      console.log('🔐 AppInitService: Verificando sesión existente...');

      // Intentar restaurar la sesión desde Capacitor Preferences
      const storedSession = await this.supabaseClientService.restoreSession();
      
      if (storedSession) {
        console.log('✅ Sesión encontrada en almacenamiento, restaurando...');
        
        // Verificar si la sesión es válida en Supabase
        const currentSession = await this.supabaseClientService.getCurrentSession();
        
        if (currentSession && currentSession.user) {
          console.log('✅ Sesión válida en Supabase, cargando datos del usuario...');
          
          // Cargar los datos del usuario en el AuthService
          await this.authService.loadUserData(currentSession.user.id);
          
          console.log('✅ Usuario restaurado exitosamente');
        } else {
          console.log('⚠️ Sesión en almacenamiento pero no válida en Supabase, limpiando...');
          await this.supabaseClientService.clearSessionFromPreferences();
        }
      } else {
        console.log('ℹ️ No hay sesión almacenada para restaurar');
      }

    } catch (error) {
      console.error('❌ AppInitService: Error restaurando sesión:', error);
      // En caso de error, limpiar cualquier sesión corrupta
      await this.supabaseClientService.clearSessionFromPreferences();
    }
  }

  /**
   * Verifica si la app está inicializada
   */
  isAppInitialized(): boolean {
    return this.isInitialized;
  }

  /**
   * Método para reinicializar la app si es necesario
   */
  async reinitializeApp(): Promise<void> {
    console.log('🔄 AppInitService: Reinicializando aplicación...');
    this.isInitialized = false;
    await this.initializeApp();
  }
}
