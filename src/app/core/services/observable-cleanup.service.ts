import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObservableCleanupService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private subscriptions: Subscription[] = [];
  private cleanupInterval: any;

  constructor() {
    // Limpieza automática cada 45 segundos
    this.cleanupInterval = setInterval(() => {
      this.cleanupSubscriptions();
    }, 45000);
  }

  /**
   * Método helper para usar en componentes
   */
  getDestroy$(): Subject<void> {
    return this.destroy$;
  }

  /**
   * Método helper para usar takeUntil
   */
  takeUntilDestroy<T>(source: Observable<T>): Observable<T> {
    return source.pipe(takeUntil(this.destroy$));
  }

  /**
   * Registra una subscripción para limpieza automática
   */
  registerSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  /**
   * Limpia todas las subscripciones registradas
   */
  private cleanupSubscriptions(): void {
    // Limpiar subscripciones completadas
    this.subscriptions = this.subscriptions.filter(sub => !sub.closed);
    
    // Si hay muchas subscripciones activas, limpiar las más antiguas
    if (this.subscriptions.length > 20) {
      const toUnsubscribe = this.subscriptions.splice(0, this.subscriptions.length - 10);
      toUnsubscribe.forEach(sub => {
        if (!sub.closed) {
          sub.unsubscribe();
        }
      });
    }
  }

  /**
   * Limpia todas las subscripciones
   */
  cleanupAll(): void {
    this.subscriptions.forEach(sub => {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    });
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.destroy$.next();
    this.destroy$.complete();
    this.cleanupAll();
  }
}
