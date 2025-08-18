import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentRoute$ = new BehaviorSubject<string>('');
  private isNavigating$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.setupRouteTracking();
  }

  /**
   * Configura el tracking de rutas
   */
  private setupRouteTracking() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentRoute = event.urlAfterRedirects;
      console.log('🧭 Navegando a:', currentRoute);
      
      this.currentRoute$.next(currentRoute);
      this.isNavigating$.next(false);
      
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        this.isNavigating$.next(false);
      }, 100);
    });
  }

  /**
   * Obtiene la ruta actual
   */
  getCurrentRoute(): Observable<string> {
    return this.currentRoute$.asObservable();
  }

  /**
   * Verifica si se está navegando
   */
  isNavigating(): Observable<boolean> {
    return this.isNavigating$.asObservable();
  }

  /**
   * Marca que se está iniciando una navegación
   */
  startNavigation() {
    this.isNavigating$.next(true);
  }

  /**
   * Verifica si la ruta actual es la especificada
   */
  isCurrentRoute(route: string): boolean {
    return this.currentRoute$.value === route;
  }

  /**
   * Obtiene el valor actual de la ruta
   */
  getCurrentRouteValue(): string {
    return this.currentRoute$.value;
  }
}
