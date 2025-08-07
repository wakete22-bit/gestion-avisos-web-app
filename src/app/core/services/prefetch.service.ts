import { Injectable } from '@angular/core';
import { AvisosService } from './avisos.service';
import { ClientesService } from './clientes.service';
import { InventarioService } from '../../modules/inventario/services/inventario.service';
import { Subject, takeUntil, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrefetchService {
  private destroy$ = new Subject<void>();
  private isPrefetching = false;
  private prefetchQueue: (() => void)[] = [];

  constructor(
    private avisosService: AvisosService,
    private clientesService: ClientesService,
    private inventarioService: InventarioService
  ) {}

  /**
   * Prefetch de datos críticos en segundo plano con control de concurrencia
   */
  async prefetchCriticalData(): Promise<void> {
    if (this.isPrefetching) {
      console.log('⚠️ Prefetch ya en progreso, saltando...');
      return;
    }

    this.isPrefetching = true;
    
    try {
      console.log('🚀 Iniciando prefetch de datos críticos...');
      
      // Prefetch secuencial para evitar sobrecarga
      await this.prefetchSequentially([
        () => this.avisosService.getAvisosActivos(1, 20).subscribe(),
        () => this.clientesService.getClientes(1, 10, undefined, 'nombre_completo', 'asc', true).subscribe(),
        () => this.inventarioService.getInventario(1, 10, undefined, 'nombre', 'asc', true).subscribe()
      ]);
      
      console.log('✅ Prefetch de datos críticos completado');
    } catch (error) {
      console.warn('⚠️ Error en prefetch:', error);
    } finally {
      this.isPrefetching = false;
    }
  }

  /**
   * Ejecuta prefetch de forma secuencial para evitar sobrecarga
   */
  private async prefetchSequentially(tasks: (() => void)[]): Promise<void> {
    for (const task of tasks) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          task();
          resolve();
        }, 100); // Delay entre consultas
      });
    }
  }

  /**
   * Prefetch de datos basado en navegación del usuario con debounce
   */
  prefetchBasedOnNavigation(currentRoute: string): void {
    // Debounce para evitar múltiples prefetch simultáneos
    this.prefetchQueue.push(() => {
      switch (currentRoute) {
        case '/avisos':
          this.prefetchAvisosData();
          break;
        case '/clientes':
          this.prefetchClientesData();
          break;
        case '/inventario':
          this.prefetchInventarioData();
          break;
      }
    });

    // Ejecutar con debounce
    setTimeout(() => {
      const task = this.prefetchQueue.shift();
      if (task) task();
    }, 500);
  }

  private prefetchAvisosData(): void {
    // Solo prefetch de la siguiente página para evitar sobrecarga
    this.avisosService.getAvisosActivos(2, 20).subscribe();
  }

  private prefetchClientesData(): void {
    // Solo prefetch de la siguiente página
    this.clientesService.getClientes(2, 10).subscribe();
  }

  private prefetchInventarioData(): void {
    // Solo prefetch de la siguiente página
    this.inventarioService.getInventario(2, 10).subscribe();
  }

  /**
   * Limpia datos prefetcheados no utilizados
   */
  cleanupUnusedPrefetch(): void {
    this.prefetchQueue = [];
    console.log('🧹 Limpieza de prefetch completada');
  }

  /**
   * Limpia recursos al destruir el servicio
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.cleanupUnusedPrefetch();
  }
} 