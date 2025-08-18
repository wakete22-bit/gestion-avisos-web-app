import { environment } from '../../../environments/environment';

export class ProductionConfig {
  static initialize(): void {
    if (environment.production) {
      // Configuración de producción
      this.disableConsoleLogs();
      this.setupErrorHandling();
      this.optimizePerformance();
    }
  }

  private static disableConsoleLogs(): void {
    // Guardar referencias originales
    const originalLog = console.log;
    const originalDebug = console.debug;
    const originalInfo = console.info;
    const originalWarn = console.warn;
    const originalError = console.error;

    // Reemplazar métodos de console
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
    
    // Solo permitir errores críticos
    console.error = (...args: any[]) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('ERROR') || message.includes('CRITICAL') || message.includes('FATAL'))) {
        originalError(...args);
      }
    };

    // Limpiar logs existentes
    console.clear();
  }

  private static setupErrorHandling(): void {
    // Configurar manejo global de errores
    window.addEventListener('error', (event) => {
      // Solo loggear errores críticos en producción
      if (event.error && event.error.message && 
          event.error.message.includes('CRITICAL')) {
        console.error('Error crítico:', event.error);
      }
    });

    // Configurar manejo de promesas rechazadas
    window.addEventListener('unhandledrejection', (event) => {
      // Solo loggear errores críticos en producción
      if (event.reason && event.reason.message && 
          event.reason.message.includes('CRITICAL')) {
        console.error('Promesa rechazada crítica:', event.reason);
      }
    });
  }

  private static optimizePerformance(): void {
    // Deshabilitar logs de performance en producción
    if (window.performance && window.performance.getEntriesByType) {
      const originalGetEntries = window.performance.getEntriesByType;
      window.performance.getEntriesByType = (type) => {
        // Solo permitir métricas esenciales
        if (type === 'navigation' || type === 'resource') {
          return originalGetEntries.call(window.performance, type);
        }
        return [];
      };
    }
  }
}
