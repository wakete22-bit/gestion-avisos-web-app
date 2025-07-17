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
  personCircleOutline, logOutOutline, chevronForwardOutline, chevronDownOutline, closeOutline, constructOutline } from 'ionicons/icons';
import { AuthService } from '../../../core/services/auth.service';
import { RolesService } from '../../../core/services/roles.service';
import { Usuario, TipoRol } from '../../../core/models/usuario.model';
import { CommonModule } from '@angular/common';

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
  imports: [IonIcon, RouterLink, RouterLinkActive, CommonModule],
})
export class SidebarComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();

  currentUser: Usuario | null = null;
  rolActual: TipoRol | null = null;
  TipoRol = TipoRol;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private rolesService: RolesService,
    private router: Router
  ) {
      addIcons({closeOutline,gridOutline,notificationsOutline,timeOutline,cubeOutline,documentTextOutline,cashOutline,peopleOutline,constructOutline,settingsOutline,personCircleOutline,logOutOutline,chevronForwardOutline,chevronDownOutline});
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

    // Verificar si es administrador
    this.rolesService.esAdministrador().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      console.log('🔧 SidebarComponent: Rol actual:', this.rolActual);
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
