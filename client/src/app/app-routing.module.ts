import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: '', component: AppComponent,
    children: [
      {
        path: 'support',
        loadChildren: () => import('./modules/modules.module')
          .then(d => d.ModulesModule),
          canActivate:[authGuard]
      },
      { path: '', redirectTo: 'support', pathMatch: 'full' },
      { path: '**', redirectTo: 'support' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
