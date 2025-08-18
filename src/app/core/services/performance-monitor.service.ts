import { Injectable } from '@angular/core';

export interface PerformanceMetrics {
  memoryUsage: number;
  cacheSize: number;
  activeSubscriptions: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitorService {
  private metrics: PerformanceMetrics[] = [];
  private monitoringInterval: any;
  private isMonitoring = false;

  constructor() {}

  /**
   * Inicia el monitoreo de rendimiento
   */
  startMonitoring(): void {
    if (this.isMonitoring) {
      console.warn('⚠️ Monitoreo ya está activo');
      return;
    }

    this.isMonitoring = true;
    console.log('🚀 Iniciando monitoreo de rendimiento...');

    this.monitoringInterval = setInterval(() => {
      this.collectMetrics();
    }, 60000); // Cada minuto para reducir overhead
  }

  /**
   * Detiene el monitoreo de rendimiento
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isMonitoring = false;
    console.log('🛑 Monitoreo de rendimiento detenido');
  }

  /**
   * Recolecta métricas de rendimiento
   */
  private collectMetrics(): void {
    const metrics: PerformanceMetrics = {
      memoryUsage: this.getMemoryUsage(),
      cacheSize: this.getCacheSize(),
      activeSubscriptions: this.getActiveSubscriptions(),
      timestamp: Date.now()
    };

    this.metrics.push(metrics);

    // Mantener solo las últimas 100 métricas
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Verificar si hay problemas de rendimiento
    this.checkPerformanceIssues(metrics);
  }

  /**
   * Obtiene el uso de memoria
   */
  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
    }
    return 0;
  }

  /**
   * Obtiene el tamaño del cache (aproximado)
   */
  private getCacheSize(): number {
    // Esto es una aproximación basada en localStorage
    try {
      return JSON.stringify(localStorage).length;
    } catch {
      return 0;
    }
  }

  /**
   * Obtiene el número de subscripciones activas (aproximado)
   */
  private getActiveSubscriptions(): number {
    // Esta es una aproximación basada en el número de elementos en el DOM
    // Limitamos la búsqueda para evitar ser muy costoso
    const body = document.body;
    if (!body) return 0;
    
    // Solo contar elementos principales para evitar overhead
    return body.children.length + 
           (body.querySelectorAll('ion-content, ion-page, ion-header, ion-footer').length * 2);
  }

  /**
   * Verifica si hay problemas de rendimiento
   */
  private checkPerformanceIssues(metrics: PerformanceMetrics): void {
    const warnings: string[] = [];

    // Verificar uso de memoria
    if (metrics.memoryUsage > 100) { // Más de 100MB
      warnings.push(`⚠️ Alto uso de memoria: ${metrics.memoryUsage.toFixed(2)}MB`);
    }

    // Verificar tamaño de cache
    if (metrics.cacheSize > 5000000) { // Más de 5MB
      warnings.push(`⚠️ Cache muy grande: ${(metrics.cacheSize / 1024 / 1024).toFixed(2)}MB`);
    }

    // Verificar elementos del DOM
    if (metrics.activeSubscriptions > 1000) {
      warnings.push(`⚠️ Muchos elementos en DOM: ${metrics.activeSubscriptions}`);
    }

    if (warnings.length > 0) {
      console.warn('🚨 Problemas de rendimiento detectados:', warnings);
      this.suggestOptimizations(warnings);
    }
  }

  /**
   * Sugiere optimizaciones basadas en los problemas detectados
   */
  private suggestOptimizations(warnings: string[]): void {
    const suggestions: string[] = [];

    warnings.forEach(warning => {
      if (warning.includes('memoria')) {
        suggestions.push('💡 Considera limpiar cache y subscripciones no utilizadas');
      }
      if (warning.includes('Cache')) {
        suggestions.push('💡 Considera limpiar el cache de la aplicación');
      }
      if (warning.includes('DOM')) {
        suggestions.push('💡 Considera usar virtual scrolling para listas grandes');
      }
    });

    if (suggestions.length > 0) {
      console.log('💡 Sugerencias de optimización:', suggestions);
    }
  }

  /**
   * Obtiene las métricas recolectadas
   */
  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  /**
   * Obtiene las métricas más recientes
   */
  getLatestMetrics(): PerformanceMetrics | null {
    return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
  }

  /**
   * Limpia las métricas almacenadas
   */
  clearMetrics(): void {
    this.metrics = [];
    console.log('🧹 Métricas de rendimiento limpiadas');
  }

  /**
   * Genera un reporte de rendimiento
   */
  generateReport(): string {
    if (this.metrics.length === 0) {
      return 'No hay métricas disponibles';
    }

    const latest = this.getLatestMetrics()!;
    const averageMemory = this.metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / this.metrics.length;
    const maxMemory = Math.max(...this.metrics.map(m => m.memoryUsage));

    return `
📊 Reporte de Rendimiento
========================
Memoria actual: ${latest.memoryUsage.toFixed(2)}MB
Memoria promedio: ${averageMemory.toFixed(2)}MB
Memoria máxima: ${maxMemory.toFixed(2)}MB
Cache actual: ${(latest.cacheSize / 1024 / 1024).toFixed(2)}MB
Elementos DOM: ${latest.activeSubscriptions}
Métricas recolectadas: ${this.metrics.length}
    `.trim();
  }

  /**
   * Limpia recursos al destruir el servicio
   */
  ngOnDestroy(): void {
    this.stopMonitoring();
    this.clearMetrics();
  }
} 