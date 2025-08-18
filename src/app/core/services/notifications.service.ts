import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  /**
   * Muestra una notificación de éxito
   */
  showSuccess(message: string, duration: number = 3000): void {
    this.showNotification(message, 'success', duration);
  }

  /**
   * Muestra una notificación de error
   */
  showError(message: string, duration: number = 5000): void {
    this.showNotification(message, 'error', duration);
  }

  /**
   * Muestra una notificación de advertencia
   */
  showWarning(message: string, duration: number = 4000): void {
    this.showNotification(message, 'warning', duration);
  }

  /**
   * Muestra una notificación informativa
   */
  showInfo(message: string, duration: number = 3000): void {
    this.showNotification(message, 'info', duration);
  }

  /**
   * Muestra una notificación
   */
  private showNotification(message: string, type: Notification['type'], duration: number): void {
    const notification: Notification = {
      id: this.generateId(),
      message,
      type,
      duration,
      timestamp: new Date()
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, duration);
    }
  }

  /**
   * Elimina una notificación específica
   */
  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(filteredNotifications);
  }

  /**
   * Limpia todas las notificaciones
   */
  clearAll(): void {
    this.notificationsSubject.next([]);
  }

  /**
   * Genera un ID único para la notificación
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Obtiene las notificaciones actuales
   */
  getCurrentNotifications(): Notification[] {
    return this.notificationsSubject.value;
  }
}
