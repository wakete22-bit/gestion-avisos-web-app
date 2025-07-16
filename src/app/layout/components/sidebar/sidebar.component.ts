import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
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
import { AuthService } from '../../../core/services/auth.service';
import { RolesService } from '../../../core/services/roles.service';
import { Usuario, TipoRol } from '../../../core/models/usuario.model';

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

  currentUser: Usuario | null = null;
  rolActual: TipoRol | null = null;

  constructor(
    private authService: AuthService,
    private rolesService: RolesService,
    private router: Router
  ) {
      addIcons({gridOutline,notificationsOutline,timeOutline,cubeOutline,documentTextOutline,cashOutline,peopleOutline,settingsOutline,personCircleOutline,chevronDownOutline,chevronForwardOutline,logOutOutline,closeOutline});
  }

  ngOnInit() {
    // Suscribirse al usuario actual
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Suscribirse al rol actual
    this.rolesService.getRolActual().subscribe(rol => {
      this.rolActual = rol;
    });
  }

  onCloseSidebar() {
    this.closeSidebar.emit();
  }

  onNavClick() {
    // Cerrar sidebar en móviles cuando se hace clic en un enlace
    if (window.innerWidth <= 768) {
      this.onCloseSidebar();
    }
  }

  async onLogout() {
    await this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.onCloseSidebar();
  }

  getRolDisplayName(): string {
    if (!this.rolActual) return 'Usuario';
    
    const nombres: Record<TipoRol, string> = {
      [TipoRol.ADMINISTRADOR]: 'Administrador',
      [TipoRol.TECNICO]: 'Técnico',
      [TipoRol.USUARIO]: 'Usuario'
    };
    
    return nombres[this.rolActual];
  }
}
