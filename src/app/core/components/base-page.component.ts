import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReconnectionService } from '../services/reconnection.service';
import { LoadingController } from '@ionic/angular';

@Component({
  template: ''
})
export abstract class BasePageComponent implements OnInit, OnDestroy {
  protected loading = false;
  private subscriptions: Subscription[] = [];
  private loadingElement: any = null;

  constructor(
    protected reconnectionService: ReconnectionService,
    protected cdr: ChangeDetectorRef,
    protected loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    // Suscribirse a reconexiones
    const reconnectSub = this.reconnectionService.appResumed.subscribe(resumed => {
      if (resumed) {
        console.log('🔄 Reloading data after reconnection...');
        this.onAppResumed();
      }
    });

    // Suscribirse al estado de conexión
    const connectionSub = this.reconnectionService.connectionStatus.subscribe(isConnected => {
      if (!isConnected) {
        console.log('🔴 Conexión perdida, ocultando loading...');
        this.hideLoading();
      }
    });

    this.subscriptions.push(reconnectSub, connectionSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.hideLoading();
  }

  /**
   * Método que deben implementar los componentes hijos
   * Se ejecuta cuando la app se reanuda tras estar en background
   */
  protected abstract onAppResumed(): void;

  /**
   * Muestra un loading con timeout automático para evitar loadings infinitos
   */
  protected async showLoading(message = 'Cargando...', timeoutMs = 10000): Promise<any> {
    if (this.loading) {
      return this.loadingElement;
    }
    
    this.loading = true;
    
    try {
      this.loadingElement = await this.loadingCtrl.create({
        message,
        duration: timeoutMs,
        spinner: 'crescent'
      });
      
      await this.loadingElement.present();
      
      // Auto-dismiss si se queda colgado
      setTimeout(() => {
        if (this.loading && this.loadingElement) {
          console.log('⚠️ Loading timeout, auto-dismissing...');
          this.hideLoading();
        }
      }, timeoutMs);
      
      return this.loadingElement;
      
    } catch (error) {
      console.error('❌ Error mostrando loading:', error);
      this.loading = false;
      return null;
    }
  }

  /**
   * Oculta el loading actual
   */
  protected async hideLoading(): Promise<void> {
    this.loading = false;
    
    if (this.loadingElement) {
      try {
        await this.loadingElement.dismiss();
      } catch (error) {
        // Ignorar errores al dismiss
      }
      this.loadingElement = null;
    }
    
    // Forzar detección de cambios
    this.cdr.detectChanges();
  }

  /**
   * Método helper para manejar operaciones con timeout
   */
  protected async withTimeout<T>(
    operation: Promise<T>, 
    timeoutMs: number = 10000,
    errorMessage = 'Operación tardó demasiado'
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs);
    });

    return Promise.race([operation, timeoutPromise]);
  }

  /**
   * Método helper para recargar datos de forma segura
   */
  protected async safeReloadData(): Promise<void> {
    try {
      const loading = await this.showLoading('Recargando datos...', 8000);
      
      await this.onAppResumed();
      
      if (loading) {
        await this.hideLoading();
      }
      
    } catch (error) {
      console.error('❌ Error recargando datos:', error);
      await this.hideLoading();
      
      // Mostrar mensaje de error al usuario
      // Aquí podrías usar un toast o alert
    }
  }
}
