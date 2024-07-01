import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { CommonModule } from '@angular/common';
import { ConnectionsComponent } from '../../connections/connections.component';
import { PrivacyPolicyComponent } from '../../privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from '../../terms-conditions/terms-conditions.component';

@Component({
  selector: 'app-users_settings',
  standalone: true,
  imports: [
    MatDividerModule,
    RouterLink,
    RouterOutlet,
    SettingsComponent,
    ChangePasswordComponent,
    CommonModule,
    ConnectionsComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent
  ],

  templateUrl: './users_settings.component.html',
  styleUrl: './users_settings.component.scss',
})
export class UsersSettingsComponent extends BaseComponent implements OnInit {
  hasSetting = false;
  hasTemp = false;
  changePasswordTemp = false;
  showAccountSettingTemp = true;
  temp:any

  constructor() {
    super();
    // const id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {}
  showAccountSetting() {}
  changePassword() {
    this.changePasswordTemp = true;
    this.showAccountSettingTemp = false;
  }
  connections() {}

  privacyPolicy() {}

  terms() {}

  hasTempTest() {
    this.hasTemp = true;
  }
}
