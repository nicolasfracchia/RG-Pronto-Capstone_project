import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'catering',
    loadComponent: () => import('./pages/catering/catering.page').then( m => m.CateringPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page').then( m => m.ContactPage)
  },
];
