import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
import { BaseComponent } from '../../../../shared/components/base/base.component';

@Component({
  selector: 'app-users_settings',
  standalone: true,
  imports: [MatDividerModule, RouterLink, RouterOutlet, SettingsComponent],

  templateUrl: './users_settings.component.html',
  styleUrl: './users_settings.component.scss',
})
export class UsersSettingsComponent extends BaseComponent{

constructor(){
  super()
}

}
