import { Component, input } from '@angular/core';
import { UserInfo } from '../models/userInfo';

@Component({
  selector: 'app-custom-tab',
  standalone: true,
  imports: [],
  templateUrl: './custom-tab.component.html',
  styleUrl: './custom-tab.component.scss'
})
export class CustomTabComponent {
  data = input.required<UserInfo>()

}
