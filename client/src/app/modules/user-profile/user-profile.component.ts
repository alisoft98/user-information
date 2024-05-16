import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { CustomTabComponent } from '../../shared/custom-tab/custom-tab.component';
import { UserInfoService } from '../../shared/services/user-info.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AsyncPipe, CustomTabComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  #user = inject(UserInfoService);
  userId = input.required<string>();
  profile$ = toObservable(this.userId).pipe(
    switchMap(id => this.#user.profile(id))
  )

}
