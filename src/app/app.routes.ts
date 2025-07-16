import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Rutas de autenticación (públicas)
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./modules/auth/pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./modules/auth/pages/register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      }
    ]
  },
  
  // Rutas protegidas de la aplicación
  {
    path: '',
    loadComponent: () => import('./layout/components/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'avisos',
        loadComponent: () => import('./modules/avisos/pages/avisos/avisos.component').then((m) => m.AvisosComponent),
      },
      {
        path: 'historial',
        loadComponent: () => import('./modules/historial/pages/historial/historial.component').then((m) => m.HistorialComponent),
      },
      {
        path: 'inventario',
        loadComponent: () => import('./modules/inventario/pages/inventario/inventario.component').then((m) => m.InventarioComponent),
      },
      {
        path: 'facturas',
        loadComponent: () => import('./modules/facturas/pages/facturas/facturas.component').then((m) => m.FacturasComponent),
      },
      {
        path: 'presupuestos',
        loadComponent: () => import('./modules/presupuestos/pages/presupuestos/presupuestos.component').then((m) => m.PresupuestosComponent),
      },
      {
        path: 'clientes',
        loadComponent: () => import('./modules/clientes/pages/clientes/clientes.component').then((m) => m.ClientesComponent),
      },
      {
        path: 'cuenta',
        loadComponent: () => import('./modules/mi-cuenta/pages/mi-cuenta/mi-cuenta.component').then((m) => m.MiCuentaComponent),
      },
      {
        path: 'crear-factura',
        loadComponent: () => import('./modules/facturas/components/crear-factura/crear-factura.component').then((m) => m.CrearFacturaComponent),
      },
      {
        path: 'ver-aviso/:id-aviso',
        loadComponent: () => import('./modules/avisos/components/ver-avisos/ver-avisos.component').then((m) => m.VerAvisosComponent),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  },
  
  // Redirección por defecto
  {
    path: '**',
    redirectTo: 'auth/login',
  }
];
