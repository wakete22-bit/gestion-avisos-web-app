# Ejemplos de Uso del Sistema de Permisos

## 🔐 Uso en Rutas

### Proteger rutas con permisos específicos
```typescript
// En app.routes.ts
{
  path: 'admin',
  loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
  canActivate: [AuthGuard, PermissionGuard],
  data: {
    permisos: [Permiso.GESTIONAR_USUARIOS, Permiso.CONFIGURACION_SISTEMA]
  }
}
```

### Rutas con diferentes niveles de acceso
```typescript
export const routes: Routes = [
  // Rutas públicas
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  
  // Rutas protegidas con permisos
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      
      // Solo administradores
      {
        path: 'admin',
        canActivate: [PermissionGuard],
        data: { permisos: [Permiso.GESTIONAR_USUARIOS] },
        children: [
          { path: 'usuarios', component: UsuariosComponent },
          { path: 'roles', component: RolesComponent }
        ]
      },
      
      // Técnicos y administradores
      {
        path: 'avisos',
        canActivate: [PermissionGuard],
        data: { permisos: [Permiso.VER_AVISOS] },
        children: [
          { path: '', component: AvisosComponent },
          { 
            path: 'crear', 
            component: CrearAvisoComponent,
            canActivate: [PermissionGuard],
            data: { permisos: [Permiso.CREAR_AVISOS] }
          }
        ]
      },
      
      // Solo técnicos y administradores
      {
        path: 'inventario',
        canActivate: [PermissionGuard],
        data: { permisos: [Permiso.VER_INVENTARIO] },
        component: InventarioComponent
      }
    ]
  }
];
```

## 🎨 Uso en Templates

### Mostrar/ocultar elementos basado en permisos
```html
<!-- Mostrar solo si tiene permiso para crear avisos -->
<div *appPermission="Permiso.CREAR_AVISOS">
  <button (click)="crearAviso()">Crear Aviso</button>
</div>

<!-- Mostrar si tiene al menos uno de estos permisos -->
<div *appPermission="[Permiso.EDITAR_AVISOS, Permiso.ELIMINAR_AVISOS]" appPermissionMode="any">
  <button (click)="editarAviso()">Editar</button>
  <button (click)="eliminarAviso()">Eliminar</button>
</div>

<!-- Mostrar solo para administradores -->
<div *appPermission="Permiso.GESTIONAR_USUARIOS">
  <h3>Panel de Administración</h3>
  <a routerLink="/admin/usuarios">Gestionar Usuarios</a>
</div>
```

### Usar en componentes
```typescript
// En un componente
export class AvisosComponent implements OnInit {
  puedeCrearAvisos = false;
  puedeEditarAvisos = false;
  esAdministrador = false;

  constructor(private rolesService: RolesService) {}

  ngOnInit() {
    // Verificar permisos específicos
    this.rolesService.tienePermiso(Permiso.CREAR_AVISOS)
      .subscribe(puede => this.puedeCrearAvisos = puede);

    this.rolesService.tienePermiso(Permiso.EDITAR_AVISOS)
      .subscribe(puede => this.puedeEditarAvisos = puede);

    // Verificar si es administrador
    this.rolesService.esAdministrador()
      .subscribe(es => this.esAdministrador = es);
  }

  crearAviso() {
    if (this.puedeCrearAvisos) {
      // Lógica para crear aviso
    }
  }
}
```

## 🛡️ Uso en Servicios

### Verificar permisos antes de realizar acciones
```typescript
@Injectable()
export class AvisosService {
  constructor(
    private supabase: SupabaseClient,
    private rolesService: RolesService
  ) {}

  async crearAviso(aviso: any) {
    // Verificar permiso antes de crear
    const puedeCrear = await firstValueFrom(
      this.rolesService.tienePermiso(Permiso.CREAR_AVISOS)
    );

    if (!puedeCrear) {
      throw new Error('No tienes permisos para crear avisos');
    }

    // Crear aviso
    return this.supabase.from('avisos').insert(aviso);
  }

  async eliminarAviso(id: string) {
    // Verificar múltiples permisos
    const tienePermisos = await firstValueFrom(
      this.rolesService.tieneAlgunPermiso([
        Permiso.ELIMINAR_AVISOS,
        Permiso.GESTIONAR_USUARIOS
      ])
    );

    if (!tienePermisos) {
      throw new Error('No tienes permisos para eliminar avisos');
    }

    return this.supabase.from('avisos').delete().eq('id', id);
  }
}
```

## 📋 Menús Dinámicos

### Generar menús basados en permisos
```typescript
export class SidebarComponent {
  menuItems: MenuItem[] = [];

  constructor(private rolesService: RolesService) {}

  ngOnInit() {
    this.generarMenu();
  }

  private generarMenu() {
    this.rolesService.getPermisosUsuario().subscribe(permisos => {
      this.menuItems = [
        {
          label: 'Inicio',
          icon: 'home',
          route: '/home',
          visible: true // Siempre visible
        },
        {
          label: 'Avisos',
          icon: 'notifications',
          route: '/avisos',
          visible: permisos.includes(Permiso.VER_AVISOS)
        },
        {
          label: 'Clientes',
          icon: 'people',
          route: '/clientes',
          visible: permisos.includes(Permiso.VER_CLIENTES)
        },
        {
          label: 'Inventario',
          icon: 'cube',
          route: '/inventario',
          visible: permisos.includes(Permiso.VER_INVENTARIO)
        },
        {
          label: 'Administración',
          icon: 'settings',
          route: '/admin',
          visible: permisos.includes(Permiso.GESTIONAR_USUARIOS)
        }
      ].filter(item => item.visible);
    });
  }
}
```

## 🔧 Configuración Avanzada

### Crear roles personalizados
```typescript
// En roles.service.ts
export class RolesService {
  // Agregar nuevos roles
  private readonly ROLES_PERMISOS: Record<TipoRol, Permiso[]> = {
    [TipoRol.ADMINISTRADOR]: [...],
    [TipoRol.TECNICO]: [...],
    [TipoRol.USUARIO]: [...],
    [TipoRol.SUPERVISOR]: [
      Permiso.VER_AVISOS,
      Permiso.EDITAR_AVISOS,
      Permiso.ASIGNAR_AVISOS,
      Permiso.VER_REPORTES,
      Permiso.GENERAR_REPORTES
    ]
  };
}
```

### Permisos condicionales
```typescript
// Verificar permisos basados en contexto
async puedeEditarAviso(avisoId: string): Promise<boolean> {
  const permisos = await firstValueFrom(this.rolesService.getPermisosUsuario());
  
  // Verificar permiso básico
  if (!permisos.includes(Permiso.EDITAR_AVISOS)) {
    return false;
  }

  // Verificar si es el técnico asignado o administrador
  const aviso = await this.obtenerAviso(avisoId);
  const esTecnicoAsignado = aviso.tecnico_asignado_id === this.authService.getCurrentUser()?.id;
  const esAdmin = await firstValueFrom(this.rolesService.esAdministrador());

  return esTecnicoAsignado || esAdmin;
}
```

## 🎯 Mejores Prácticas

1. **Siempre verificar permisos en el backend** (RLS en Supabase)
2. **Usar permisos granulares** para mayor control
3. **Documentar los permisos** de cada rol
4. **Probar con diferentes roles** durante el desarrollo
5. **Mantener consistencia** entre frontend y backend
6. **Usar enums** para evitar errores de tipeo
7. **Implementar logging** de acciones sensibles 