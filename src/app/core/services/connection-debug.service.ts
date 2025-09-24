import { Injectable } from '@angular/core';
import { SupabaseClientService } from './supabase-client.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionDebugService {

  constructor(private supabaseService: SupabaseClientService) {}

  /**
   * Test de conexión alternativo para debugging
   */
  async testAlternativeConnection(): Promise<boolean> {
    console.log('🧪 INICIANDO test alternativo de conexión...');
    
    try {
      const client = this.supabaseService.getClient();
      
      // Test 1: Verificar que el cliente se puede crear
      console.log('🧪 Test 1: Cliente creado:', !!client);
      
      // Test 2: Intentar hacer una query directa con fetch usando environment
      const url = `${environment.supabaseUrl}/rest/v1/avisos?select=id&limit=1`;
      console.log('🧪 Test 2: URL construida:', url);
      
      const headers = {
        'apikey': environment.supabaseServiceKey,
        'Authorization': `Bearer ${environment.supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      };
      
      console.log('🧪 Test 2: Headers preparados');
      
      const startTime = Date.now();
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
      const endTime = Date.now();
      
      console.log('🧪 Test 2: Fetch completado en', endTime - startTime, 'ms');
      console.log('🧪 Test 2: Status:', response.status);
      console.log('🧪 Test 2: StatusText:', response.statusText);
      console.log('🧪 Test 2: Headers:', response.headers);
      
      const responseText = await response.text();
      console.log('🧪 Test 2: Response body:', responseText);
      
      return response.ok;
      
    } catch (error) {
      console.error('🧪 ERROR en test alternativo:', {
        message: (error as any).message,
        stack: (error as any).stack,
        fullError: error
      });
      return false;
    }
  }

  /**
   * Test de conectividad básica
   */
  async testBasicConnectivity(): Promise<boolean> {
    console.log('🌐 INICIANDO test de conectividad básica...');
    
    try {
      // Test de conectividad a Google (para verificar que hay internet)
      const response = await fetch('https://www.google.com', {
        method: 'HEAD',
        mode: 'no-cors'
      });
      
      console.log('🌐 Conectividad a internet:', response.type === 'opaque' ? 'OK' : 'FAIL');
      return response.type === 'opaque';
      
    } catch (error) {
      console.error('🌐 Sin conectividad a internet:', error);
      return false;
    }
  }

  /**
   * Diagnóstico completo
   */
  async runCompleteDiagnostic(): Promise<void> {
    console.log('🩺 INICIANDO diagnóstico completo...');
    
    // Test 1: Conectividad básica
    const hasInternet = await this.testBasicConnectivity();
    console.log('🩺 Resultado conectividad:', hasInternet ? '✅' : '❌');
    
    // Test 2: Conexión alternativa
    const altConnection = await this.testAlternativeConnection();
    console.log('🩺 Resultado conexión alternativa:', altConnection ? '✅' : '❌');
    
    // Test 3: Variables de entorno
    console.log('🩺 Variables de entorno disponibles:', {
      nodeEnv: (window as any).process?.env?.NODE_ENV,
      location: window.location.href,
      userAgent: navigator.userAgent
    });
    
    console.log('🩺 DIAGNÓSTICO COMPLETO TERMINADO');
  }
}
