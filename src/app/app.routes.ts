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
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page').then( m => m.ContactPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cms/categories',
    loadComponent: () => import('./pages/cms/categories/categories.page').then( m => m.CategoriesPage)
  },
  {
    path: 'cms/orders-status',
    loadComponent: () => import('./pages/cms/orders-status/orders-status.page').then( m => m.OrdersStatusPage)
  },
];
