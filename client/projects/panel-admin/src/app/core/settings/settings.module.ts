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
        path: '',
        component: SettingsComponent,
        title: 'Settings',
        data: { icon: 'settings' },
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        title: 'Change Password',
        data: { icon: 'lock' },
      },
      {
        path: 'connections',
        component: ConnectionsComponent,
        title: 'Connections',
        data: { icon: 'link' },
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        title: 'Privacy Policy',
        data: { icon: 'privacy_tip' },
      },
      {
        path: 'terms-conditions',
        component: TermsConditionsComponent,
        title: 'Terms & Conditions',
        data: { icon: 'gavel' },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SettingsModule {}
