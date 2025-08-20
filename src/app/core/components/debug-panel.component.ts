import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { DebugReconnectionService } from '../services/debug-reconnection.service';
import { trashOutline, refreshOutline } from 'ionicons/icons';

@Component({
  selector: 'app-debug-panel',
  template: `
    <ion-card *ngIf="showDebug" style="position: fixed; top: 10px; right: 10px; z-index: 9999; max-width: 400px; max-height: 500px; overflow: auto;">
      <ion-card-header>
        <ion-card-title>🔍 Debug Reconexión</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-button size="small" (click)="clearLogs()" fill="outline">
          <ion-icon [name]="trashOutline"></ion-icon>
          Limpiar
        </ion-button>
        <ion-button size="small" (click)="toggleDebug()" fill="outline">
          <ion-icon [name]="refreshOutline"></ion-icon>
          Ocultar
        </ion-button>
        
        <ion-list>
          <ion-item *ngFor="let log of logs" lines="none">
            <ion-label class="ion-text-wrap">
              <small style="color: #666;">{{ log }}</small>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
    
    <ion-button 
      *ngIf="!showDebug" 
      (click)="toggleDebug()" 
      style="position: fixed; top: 10px; right: 10px; z-index: 9999;"
      size="small"
      fill="outline"
    >
      🔍 Debug
    </ion-button>
  `,
  standalone: true,
  imports: [CommonModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonList, IonItem, IonLabel]
})
export class DebugPanelComponent implements OnInit, OnDestroy {
  logs: string[] = [];
  showDebug = false;
  private subscription: Subscription | null = null;

  constructor(private debugService: DebugReconnectionService) {}

  ngOnInit() {
    this.subscription = this.debugService.getLogs().subscribe(logs => {
      this.logs = logs;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleDebug() {
    this.showDebug = !this.showDebug;
  }

  clearLogs() {
    this.debugService.clearLogs();
  }
}
