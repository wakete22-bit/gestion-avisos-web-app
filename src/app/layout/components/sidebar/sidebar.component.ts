import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import {
  gridOutline,
  notificationsOutline,
  timeOutline,
  cubeOutline,
  documentTextOutline,
  cashOutline,
  peopleOutline,
  settingsOutline,  
  personCircleOutline, logOutOutline, chevronForwardOutline, chevronDownOutline, closeOutline } from 'ionicons/icons';

addIcons({
  'grid-outline': gridOutline,
  'notifications-outline': notificationsOutline,
  'time-outline': timeOutline,
  'cube-outline': cubeOutline,
  'document-text-outline': documentTextOutline,
  'cash-outline': cashOutline,
  'people-outline': peopleOutline,
  'settings-outline': settingsOutline,
  'person-circle-outline': personCircleOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'chevron-down-outline': chevronDownOutline,
  'close-outline': closeOutline
});


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [IonIcon, RouterLink, RouterLinkActive],
})
export class SidebarComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();

  constructor() {
      addIcons({gridOutline,notificationsOutline,timeOutline,cubeOutline,documentTextOutline,cashOutline,peopleOutline,settingsOutline,personCircleOutline,chevronDownOutline,chevronForwardOutline,logOutOutline,closeOutline});
  }

  ngOnInit() {}

  onCloseSidebar() {
    this.closeSidebar.emit();
  }

  onNavClick() {
    // Cerrar sidebar en móviles cuando se hace clic en un enlace
    if (window.innerWidth <= 768) {
      this.onCloseSidebar();
    }
  }
}
