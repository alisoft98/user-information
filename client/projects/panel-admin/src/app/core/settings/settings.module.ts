import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersSettingsComponent } from './components/users_settings/users_settings.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConnectionsComponent } from './connections/connections.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LayoutSettingsComponent } from './components/layout-settings/layout-settings.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutSettingsComponent,
    children: [
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'settings',
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        title: 'change-password',
      },
      {
        path: 'connections',
        component: ConnectionsComponent,
        title: 'connections',
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        title: 'privacy-policy',
      },
      {
        path: 'terms-conditions',
        component: TermsConditionsComponent,
        title: 'terms-conditions',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SettingsModule {}
