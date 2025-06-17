import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, arrowForward, mailOutline, chevronDownOutline, copyOutline, shieldOutline, informationCircleOutline, cloudUploadOutline, closeOutline, save, saveOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule]
})
export class MiCuentaComponent implements OnInit {

  constructor() { 
    addIcons({arrowForward,personOutline,mailOutline,chevronDownOutline,copyOutline,shieldOutline,informationCircleOutline,cloudUploadOutline,closeOutline,save,saveOutline});
  }

  ngOnInit() {} 

}
