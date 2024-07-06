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
        path: '',
        component: DashboardComponent,
        title:'Dashboard'
      },
      {
        path: 'users',
        component: UsersComponent,
        title:'users'
      },
      {
        path: 'schedule',
        component: CalendarComponent,
        title:'Schedule'
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('../core/settings/settings.module').then(
            s => s.SettingsModule
          ),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
