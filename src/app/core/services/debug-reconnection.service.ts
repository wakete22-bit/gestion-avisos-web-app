import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebugReconnectionService {
  private debugLog$ = new BehaviorSubject<string[]>([]);
  private maxLogs = 50;

  constructor() {
    console.log('🔍 DebugReconnectionService: Inicializado');
    
    // Log automático de eventos de visibilidad
    this.setupVisibilityDebug();
  }

  private setupVisibilityDebug() {
    // Log automático de cambios de visibilidad
    document.addEventListener('visibilitychange', () => {
      this.log(`👁️ Visibility change: ${document.visibilityState}`);
    });

    // Log automático de focus/blur
    window.addEventListener('focus', () => {
      this.log(`🎯 Window focused`);
    });

    window.addEventListener('blur', () => {
      this.log(`💨 Window blurred`);
    });

    // Log automático de pageshow/pagehide
    window.addEventListener('pageshow', () => {
      this.log(`📄 Page shown`);
    });

    window.addEventListener('pagehide', () => {
      this.log(`📄 Page hidden`);
    });
  }

  log(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    
    console.log(logEntry);
    
    const currentLogs = this.debugLog$.value;
    const newLogs = [...currentLogs, logEntry];
    
    // Mantener solo los últimos logs
    if (newLogs.length > this.maxLogs) {
      newLogs.splice(0, newLogs.length - this.maxLogs);
    }
    
    this.debugLog$.next(newLogs);
  }

  getLogs() {
    return this.debugLog$.asObservable();
  }

  clearLogs() {
    this.debugLog$.next([]);
  }

  getCurrentLogs() {
    return this.debugLog$.value;
  }
}
