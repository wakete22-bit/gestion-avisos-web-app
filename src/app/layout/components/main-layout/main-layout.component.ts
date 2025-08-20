import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { menuOutline } from 'ionicons/icons';
import { SafeAreaService } from '../../../core/services/safe-area.service';
import { IonContent } from '@ionic/angular/standalone';


addIcons({
  'menu-outline': menuOutline
});

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, IonIcon, IonContent],
})
export class MainLayoutComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isMobile: boolean = false;
  isIOS: boolean = false;
  isAndroid: boolean = false;
  isStandalone: boolean = false;

  constructor(private safeAreaService: SafeAreaService) {
    addIcons({ menuOutline });
    this.checkScreenSize();
  }

  ngOnInit() {
    this.initializePlatformInfo();
  }

  private initializePlatformInfo() {
    const platformInfo = this.safeAreaService.getPlatformInfo();
    this.isIOS = platformInfo.isIOS;
    this.isAndroid = platformInfo.isAndroid;
    this.isStandalone = platformInfo.isStandalone;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
    // Recalcular safe areas cuando cambie la orientación
    setTimeout(() => {
      this.safeAreaService.recalculateSafeAreas();
    }, 100);
  }

  checkScreenSize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    // Si cambiamos de desktop a móvil, cerrar sidebar
    if (wasMobile === false && this.isMobile === true) {
      this.isSidebarOpen = false;
    }
    
    // Si cambiamos de móvil a desktop, abrir sidebar
    if (wasMobile === true && this.isMobile === false) {
      this.isSidebarOpen = true;
    }
  }

  toggleSidebar() {
    // Solo permitir toggle en móvil
    if (this.isMobile) {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }

  closeSidebar() {
    // Solo cerrar en móvil
    if (this.isMobile) {
      this.isSidebarOpen = false;
    }
  }

  onOverlayClick() {
    if (this.isMobile && this.isSidebarOpen) {
      this.closeSidebar();
    }
  }
}
