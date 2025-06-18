import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertController, ToastController } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaUpdateService {

  constructor(
    private swUpdate: SwUpdate,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.checkForUpdates();
  }

  private checkForUpdates() {
    if (this.swUpdate.isEnabled) {
      // Verificar actualizaciones cada 6 horas
      setInterval(() => {
        this.swUpdate.checkForUpdate();
      }, 6 * 60 * 60 * 1000);

      // Escuchar actualizaciones disponibles
      this.swUpdate.versionUpdates
        .pipe(
          filter(event => event.type === 'VERSION_READY')
        )
        .subscribe(() => {
          this.promptUser();
        });

      // Escuchar errores de actualización
      this.swUpdate.versionUpdates
        .pipe(
          filter(event => event.type === 'VERSION_INSTALLATION_FAILED')
        )
        .subscribe(() => {
          this.showError();
        });
    }
  }

  private async promptUser() {
    const alert = await this.alertController.create({
      header: 'Nueva versión disponible',
      message: 'Hay una nueva versión de la aplicación disponible. ¿Deseas actualizar ahora?',
      buttons: [
        {
          text: 'Más tarde',
          role: 'cancel'
        },
        {
          text: 'Actualizar',
          handler: () => {
            this.activateUpdate();
          }
        }
      ]
    });

    await alert.present();
  }

  private async showError() {
    const toast = await this.toastController.create({
      message: 'Error al actualizar la aplicación',
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });

    await toast.present();
  }

  private activateUpdate() {
    this.swUpdate.activateUpdate().then(() => {
      window.location.reload();
    });
  }

  // Método público para verificar actualizaciones manualmente
  public checkForUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then(() => {
        console.log('Verificando actualizaciones...');
      });
    }
  }
} 