import { environment } from '../../../environments/environment';

export class LoggingConfig {
  static initialize(): void {
    if (environment.production) {
      this.setupProductionLogging();
    } else {
      this.setupDevelopmentLogging();
    }
  }

  private static setupProductionLogging(): void {
    // Deshabilitar completamente el logging en producción
    const noop = () => {};
    
    // Reemplazar métodos de console
    console.log = noop;
    console.debug = noop;
    console.info = noop;
    console.warn = noop;
    
    // Solo permitir errores críticos
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('ERROR') || message.includes('CRITICAL') || message.includes('FATAL'))) {
        originalError(...args);
      }
    };

    // Limpiar logs existentes
    console.clear();
    
    // Deshabilitar logs de performance
    if (window.performance && window.performance.getEntriesByType) {
      const originalGetEntries = window.performance.getEntriesByType;
      window.performance.getEntriesByType = (type) => {
        if (type === 'navigation' || type === 'resource') {
          return originalGetEntries.call(window.performance, type);
        }
        return [];
      };
    }

    // Deshabilitar logs de errores no críticos
    window.addEventListener('error', (event) => {
      if (event.error && event.error.message && 
          event.error.message.includes('CRITICAL')) {
        console.error('Error crítico:', event.error);
      }
    });

    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason && event.reason.message && 
          event.reason.message.includes('CRITICAL')) {
        console.error('Promesa rechazada crítica:', event.reason);
      }
    });
  }

  private static setupDevelopmentLogging(): void {
    // Habilitar todo el logging en desarrollo
    console.log('🛠️ Modo desarrollo: Logging habilitado');
    console.debug('🔍 Debug habilitado');
    console.info('ℹ️ Info habilitado');
    console.warn('⚠️ Warning habilitado');
    console.error('❌ Error habilitado');
  }
}
