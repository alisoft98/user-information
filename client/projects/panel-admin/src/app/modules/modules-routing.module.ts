import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../core/layouts/layout.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UsersComponent } from './users/components/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        data: { icon: 'dashboard' },
      },
      {
        path: 'dashboard/doctor-dashboard',
        component: DoctorDashboardComponent,
        title: 'Dashboard',
        data: { icon: 'dashboard' },
      },
      {
        path: 'users',
        component: UsersComponent,
        title: 'Users',
        data: { icon: 'people' },
      },
      {
        path: 'schedule',
        component: CalendarComponent,
        title: 'Schedule',
        data: { icon: 'calendar_today' },
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('../core/settings/settings.module').then(
            s => s.SettingsModule
          ),
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./patients/patients.module').then(p => p.PatientsModule),
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
