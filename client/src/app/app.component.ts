import { Component, inject } from '@angular/core';
import { UserInfoService } from './shared/services/user-info.service';

@Component({
  selector: 'app-root',
  template: `
<!-- <section class="header">
  <h2>AliakbarSoft</h2>
</section>

<section class="user-list">
  @for (user of users$ | async; track user.id) {
    <a [routerLink]="[user.id]" class="profile-link">{{ user.name }}</a>
  }
</section> -->
<router-outlet />`,
  styles: ``
})
export class AppComponent {
  users$ = inject(UserInfoService).users$

}
