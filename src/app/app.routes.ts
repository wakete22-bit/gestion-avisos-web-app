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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
      
    ]
  }
];
