import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
          // {
  //   path:'profile',
  //   component:
  // },
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: '',
    loadChildren: () => import('./core/core.module').then(c => c.CoreModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile.module').then(m => m.ModulesModule),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'profile',
  },
  // {
  //   path: '',
  //   component: AppComponent,
  //   children: [
  //     {
  //       component: CustomTabComponent,

  //       path: 'demo/:entityId',
  //       data: {
  //         title: 'Demo',
  //         description: 'Some component',
  //       },
  //     },
  //     {
  //       path: ':userId',
  //       loadComponent: () =>
  //         import('./modules/user-profile/user-profile.component').then(
  //           c => c.UserProfileComponent
  //         ),
  //     },
  //     // {
  //     //   path: 'support',
  //     //   loadChildren: () =>
  //     //     import('./modules/modules.module').then(d => d.ModulesModule),
  //     //   canActivate: [authGuard],
  //     // },
  //
  //   ],
  // },
];
