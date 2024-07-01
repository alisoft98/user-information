import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-users_settings',
  standalone: true,
  imports: [
    MatDividerModule,
    RouterLink,
    RouterOutlet,
    SettingsComponent,
    ChangePasswordComponent,
  ],

  templateUrl: './users_settings.component.html',
  styleUrl: './users_settings.component.scss',
})
export class UsersSettingsComponent extends BaseComponent implements OnInit {
  hasSetting = false;
  hasTemp = false;
  changePasswordTemp = false;
  showAccountSettingTemp = true;

  constructor() {
    super();
    // const id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {}
  showAccountSetting() {}
  changePassword() {
    debugger;
    this.changePasswordTemp = true;
    this.showAccountSettingTemp = false;
  }
  connections() {}

  privacyPolicy() {}

  terms() {}
}
