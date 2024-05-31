import { Component, signal } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { UserListComponent } from './user-list/user-list.component';




@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FilterComponent,UserListComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  keyword = signal('');

}


