import { Component, inject } from '@angular/core';
import { UserInfoService } from './core/services/user-info.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet />
  `,
  styles: ``,
})
export class AppComponent {
  users$ = inject(UserInfoService).users$;
  userId = '2';
}
