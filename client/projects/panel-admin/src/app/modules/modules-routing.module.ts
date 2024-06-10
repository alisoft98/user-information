import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../core/layouts/layout.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/components/users.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      // {
      //   path: 'user-info',
      //   // component: UserInfoComponent,
      // },
      // {
      //   path: 'user-roles',
      //   // component: UserRolesComponent,
      // },
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
