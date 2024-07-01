import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersSettingsComponent } from './components/users_settings/users_settings.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConnectionsComponent } from './connections/connections.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes = [
  {
    path: '',
    component: UsersSettingsComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'connections',
    component: ConnectionsComponent,
  },
  {
    path: 'terms-conditions',
    component: TermsConditionsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SettingsModule {}
