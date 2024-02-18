import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

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
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cms/categories',
    loadComponent: () => import('./pages/cms/categories/categories.page').then( m => m.CategoriesPage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'cms_categories' }
  },
  {
    path: 'cms/orders-status',
    loadComponent: () => import('./pages/cms/orders-status/orders-status.page').then( m => m.OrdersStatusPage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'cms_orders_status' }
  },
  {
    path: 'cms/sections',
    loadComponent: () => import('./pages/cms/sections/sections.page').then( m => m.SectionsPage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'cms_sections' }
  },
  {
    path: 'cms/users',
    loadComponent: () => import('./pages/cms/users/users.page').then( m => m.UsersPage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'cms_users' }
  },
  {
    path: 'cms/products',
    loadComponent: () => import('./pages/cms/products/products.page').then( m => m.ProductsPage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'cms_products' }
  },
];
