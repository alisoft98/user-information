import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/core.module').then(c => c.CoreModule),
  },
  {
    path: 'aliakbar',
    loadChildren: () => import('./modules/profile.module').then(m => m.ModulesModule),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'trinta/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'trinta/dashboard',
  },

];
