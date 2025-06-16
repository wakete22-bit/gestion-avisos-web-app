import { Component, OnInit } from '@angular/core';
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
  personCircleOutline
} from 'ionicons/icons';

addIcons({
  'grid-outline': gridOutline,
  'notifications-outline': notificationsOutline,
  'time-outline': timeOutline,
  'cube-outline': cubeOutline,
  'document-text-outline': documentTextOutline,
  'cash-outline': cashOutline,
  'people-outline': peopleOutline,
  'settings-outline': settingsOutline,
  'person-circle-outline': personCircleOutline
});


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [IonIcon, RouterLink, RouterLinkActive],
})
export class SidebarComponent  implements OnInit {

  constructor() {
    
  }

  ngOnInit() {}

}
