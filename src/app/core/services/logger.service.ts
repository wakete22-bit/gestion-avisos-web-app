import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private logLevels: { [key in LogLevel]: number } = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  };

  private currentLogLevel = this.logLevels[environment.logLevel as LogLevel] || 3;

  debug(message: string, ...args: any[]): void {
    if (environment.enableLogging && environment.enableDebug && this.shouldLog('debug')) {
      console.log(`🔍 [DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (environment.enableLogging && this.shouldLog('info')) {
      console.info(`ℹ️ [INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (environment.enableLogging && this.shouldLog('warn')) {
      console.warn(`⚠️ [WARN] ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (environment.enableLogging && this.shouldLog('error')) {
      console.error(`❌ [ERROR] ${message}`, ...args);
    }
  }

  // Método para logging de desarrollo que solo funciona en desarrollo
  dev(message: string, ...args: any[]): void {
    if (!environment.production && environment.enableDebug) {
      console.log(`🛠️ [DEV] ${message}`, ...args);
    }
  }

  // Método para logging de producción que solo muestra errores críticos
  prod(message: string, level: LogLevel = 'info', ...args: any[]): void {
    if (environment.production && level === 'error') {
      console.error(`🚨 [PROD] ${message}`, ...args);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return this.logLevels[level] >= this.currentLogLevel;
  }

  // Método para limpiar logs en producción
  clearLogs(): void {
    if (environment.production) {
      console.clear();
    }
  }
}
