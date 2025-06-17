import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/components/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
      
    ]
  }
];
