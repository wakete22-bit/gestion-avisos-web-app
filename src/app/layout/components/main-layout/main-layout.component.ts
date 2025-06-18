import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { menuOutline } from 'ionicons/icons';

addIcons({
  'menu-outline': menuOutline
});

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, IonIcon],
})
export class MainLayoutComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isMobile: boolean = false;

  constructor() {
    addIcons({ menuOutline });
    this.checkScreenSize();
  }

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    // Cerrar sidebar automáticamente en desktop
    if (!this.isMobile) {
      this.isSidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  onOverlayClick() {
    if (this.isMobile && this.isSidebarOpen) {
      this.closeSidebar();
    }
  }
}
