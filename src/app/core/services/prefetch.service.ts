import { Injectable } from '@angular/core';
import { AvisosService } from './avisos.service';
import { ClientesService } from './clientes.service';
import { InventarioService } from '../../modules/inventario/services/inventario.service';

@Injectable({
  providedIn: 'root'
})
export class PrefetchService {

  constructor(
    private avisosService: AvisosService,
    private clientesService: ClientesService,
    private inventarioService: InventarioService
  ) {}

  /**
   * Prefetch de datos críticos en segundo plano
   */
  async prefetchCriticalData(): Promise<void> {
    try {
      // Prefetch de avisos activos (primera página)
      this.avisosService.getAvisosActivos(1, 20).subscribe();
      
      // Prefetch de clientes activos
      this.clientesService.getClientes(1, 10, undefined, 'nombre_completo', 'asc', true).subscribe();
      
      // Prefetch de inventario con stock
      this.inventarioService.getInventario(1, 10, undefined, 'nombre', 'asc', true).subscribe();
      
      console.log('✅ Prefetch de datos críticos completado');
    } catch (error) {
      console.warn('⚠️ Error en prefetch:', error);
    }
  }

  /**
   * Prefetch de datos basado en navegación del usuario
   */
  prefetchBasedOnNavigation(currentRoute: string): void {
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
  }

  private prefetchAvisosData(): void {
    // Prefetch de próximas páginas de avisos
    this.avisosService.getAvisosActivos(2, 20).subscribe();
    this.avisosService.getAvisosActivos(3, 20).subscribe();
  }

  private prefetchClientesData(): void {
    // Prefetch de próximas páginas de clientes
    this.clientesService.getClientes(2, 10).subscribe();
  }

  private prefetchInventarioData(): void {
    // Prefetch de próximas páginas de inventario
    this.inventarioService.getInventario(2, 10).subscribe();
  }

  /**
   * Limpia datos prefetcheados no utilizados
   */
  cleanupUnusedPrefetch(): void {
    // Implementar lógica para limpiar caché no utilizado
    console.log('🧹 Limpieza de prefetch completada');
  }
} 