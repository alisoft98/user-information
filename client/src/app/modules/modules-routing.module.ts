import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserRolesComponent } from './user-info/user-roles/user-roles.component';
import { LatestTemplatesComponent } from './user-info/latest-templates/latest-templates.component';
import { LayoutComponent } from '../core/layouts/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'user-info',
        component: UserInfoComponent,
      },
      {
        path: 'user-roles',
        component: UserRolesComponent,
      },
      {
        path: 'latest-templates',
        component: LatestTemplatesComponent,
      },
      {
        path: '',
        redirectTo: 'user-info',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'user-info',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
