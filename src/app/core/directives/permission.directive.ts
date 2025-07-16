import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RolesService } from '../services/roles.service';
import { Permiso } from '../models/usuario.model';

@Directive({
  selector: '[appPermission]',
  standalone: true
})
export class PermissionDirective implements OnInit, OnDestroy {
  @Input() appPermission!: Permiso | Permiso[];
  @Input() appPermissionMode: 'all' | 'any' = 'all'; // 'all' = todos los permisos, 'any' = al menos uno

  private subscription?: Subscription;
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private rolesService: RolesService
  ) {}

  ngOnInit() {
    this.checkPermission();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private checkPermission() {
    if (!this.appPermission) {
      this.showElement();
      return;
    }

    const permisos = Array.isArray(this.appPermission) ? this.appPermission : [this.appPermission];

    if (this.appPermissionMode === 'all') {
      this.subscription = this.rolesService.tieneTodosPermisos(permisos).subscribe(
        tienePermisos => {
          if (tienePermisos) {
            this.showElement();
          } else {
            this.hideElement();
          }
        }
      );
    } else {
      this.subscription = this.rolesService.tieneAlgunPermiso(permisos).subscribe(
        tienePermisos => {
          if (tienePermisos) {
            this.showElement();
          } else {
            this.hideElement();
          }
        }
      );
    }
  }

  private showElement() {
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }

  private hideElement() {
    if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
} 