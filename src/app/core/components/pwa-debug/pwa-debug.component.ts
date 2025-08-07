import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pwa-debug',
  template: `
    <div class="debug-panel" *ngIf="showDebug">
      <h3>🔧 Panel de Debug - Supabase Locks</h3>
      
      <div class="debug-section">
        <h4>Estado del Token</h4>
        <pre>{{ tokenStatus | json }}</pre>
        <button (click)="refreshTokenStatus()">🔄 Actualizar Estado</button>
      </div>

      <div class="debug-section">
        <h4>LocalStorage</h4>
        <pre>{{ localStorageStatus | json }}</pre>
        <button (click)="refreshLocalStorageStatus()">🔄 Actualizar LocalStorage</button>
      </div>

      <div class="debug-section">
        <h4>Acciones</h4>
        <button (click)="manualRefreshToken()" [disabled]="isRefreshing">
          🔄 Refresh Token Manual
        </button>
        <button (click)="forceClearLocks()" [disabled]="isClearing">
          🧹 Limpiar Locks
        </button>
        <button (click)="logout()">
          🚪 Logout
        </button>
      </div>

      <div class="debug-section">
        <h4>Logs</h4>
        <div class="logs">
          <div *ngFor="let log of logs" class="log-entry">
            <span class="timestamp">{{ log.timestamp }}</span>
            <span class="message">{{ log.message }}</span>
          </div>
        </div>
        <button (click)="clearLogs()">🗑️ Limpiar Logs</button>
      </div>
    </div>
  `,
  styles: [`
    .debug-panel {
      position: fixed;
      top: 10px;
      right: 10px;
      width: 400px;
      max-height: 80vh;
      background: #1a1a1a;
      color: #fff;
      padding: 15px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      overflow-y: auto;
      z-index: 9999;
      border: 1px solid #333;
    }

    .debug-section {
      margin-bottom: 15px;
      padding: 10px;
      border: 1px solid #333;
      border-radius: 4px;
    }

    .debug-section h4 {
      margin: 0 0 10px 0;
      color: #4CAF50;
    }

    pre {
      background: #2a2a2a;
      padding: 8px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 11px;
      margin: 5px 0;
    }

    button {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      margin: 2px;
      font-size: 11px;
    }

    button:disabled {
      background: #666;
      cursor: not-allowed;
    }

    .logs {
      max-height: 150px;
      overflow-y: auto;
      background: #2a2a2a;
      padding: 8px;
      border-radius: 4px;
    }

    .log-entry {
      margin-bottom: 2px;
      font-size: 10px;
    }

    .timestamp {
      color: #888;
      margin-right: 8px;
    }

    .message {
      color: #fff;
    }
  `]
})
export class PwaDebugComponent {
  showDebug = false;
  tokenStatus: any = {};
  localStorageStatus: any = {};
  isRefreshing = false;
  isClearing = false;
  logs: Array<{timestamp: string, message: string}> = [];

  constructor(private authService: AuthService) {
    // Mostrar debug solo en desarrollo
    this.showDebug = !environment.production;
    
    if (this.showDebug) {
      this.addLog('Panel de debug inicializado');
      this.refreshTokenStatus();
      this.refreshLocalStorageStatus();
    }
  }

  async refreshTokenStatus() {
    try {
      this.tokenStatus = await this.authService.debugTokenStatus();
      this.addLog('Estado del token actualizado');
    } catch (error) {
      this.addLog(`Error actualizando estado del token: ${error}`);
    }
  }

  async refreshLocalStorageStatus() {
    try {
      this.localStorageStatus = await this.authService.debugLocalStorage();
      this.addLog('Estado del localStorage actualizado');
    } catch (error) {
      this.addLog(`Error actualizando localStorage: ${error}`);
    }
  }

  async manualRefreshToken() {
    this.isRefreshing = true;
    try {
      const result = await this.authService.manualRefreshToken();
      this.addLog(`Refresh manual: ${result ? '✅ Exitoso' : '❌ Fallido'}`);
      await this.refreshTokenStatus();
    } catch (error) {
      this.addLog(`Error en refresh manual: ${error}`);
    } finally {
      this.isRefreshing = false;
    }
  }

  async forceClearLocks() {
    this.isClearing = true;
    try {
      await this.authService.forceClearLocks();
      this.addLog('Limpieza de locks completada');
      await this.refreshLocalStorageStatus();
    } catch (error) {
      this.addLog(`Error limpiando locks: ${error}`);
    } finally {
      this.isClearing = false;
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.addLog('Logout completado');
    } catch (error) {
      this.addLog(`Error en logout: ${error}`);
    }
  }

  clearLogs() {
    this.logs = [];
    this.addLog('Logs limpiados');
  }

  private addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.unshift({ timestamp, message });
    
    // Mantener solo los últimos 50 logs
    if (this.logs.length > 50) {
      this.logs = this.logs.slice(0, 50);
    }
  }
} 