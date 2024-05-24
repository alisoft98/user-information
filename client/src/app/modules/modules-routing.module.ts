import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserRolesComponent } from './user-info/user-roles/user-roles.component';
import { LayoutComponent } from '../core/layouts/layout.component';
import { CalendarComponent } from './calendar/calendar.component';

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
        path: 'schedule',
        component: CalendarComponent,
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
