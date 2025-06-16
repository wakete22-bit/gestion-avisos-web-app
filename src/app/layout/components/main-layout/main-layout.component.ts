import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, RouterOutlet],
})
export class MainLayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
