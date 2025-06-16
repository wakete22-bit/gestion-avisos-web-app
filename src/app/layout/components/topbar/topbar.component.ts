import { Component, OnInit } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';

addIcons({
  'search-outline': searchOutline,
});

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class TopbarComponent  implements OnInit {

  constructor() {
      addIcons({searchOutline}); }

  ngOnInit() {}

}
