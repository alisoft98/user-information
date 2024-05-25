import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import moment from 'moment';
import { MyErrorStateMatcher } from '../../shared/input-validation/input-validation';
import { UserInfo } from '../../shared/models/userInfo';

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { UserInfoService } from '../../core/services/user-info.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { ChipComponent } from '../../shared/chip/chip.component';
import { CanCopyToClipboardDirective } from '../../shared/directives/can-copy-to-clipboard/can-copy-to-clipboard.directive';
import { UserRolesComponent } from './user-roles/user-roles.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    UserRolesComponent,
    MatExpansionModule,
    ButtonComponent,
    ChipComponent,
    NgFor,
    CanCopyToClipboardDirective,
    AsyncPipe,
    NgIf,
    RouterLink
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          transform: 'translateY(-20%)',
        }),
        animate(
          '900ms ease',
          style({
            transform: 'translateY(0)',
          })
        ),
      ]),
    ]),
  ],
})
export class UserInfoComponent implements OnInit {
  value = 'Clear me';
  form!: FormGroup;
  matcher = new MyErrorStateMatcher();
  userInfo!: UserInfo;
  stateOfElement: any;
  isShowUserRoleTable = false;
  isShowLastThemDC = false;
  panelOpenState = false;
  loading = true;


  tags = ['Angular', 'Angular CDK', 'Angular Forms'];

  titleInfo = [
    'LMS ID',
    'External ID',
    'Name',
    'Surname',
    'Middle_name',
    'Gender',
    'Birthday',
    'Address',
    'Activation_date',
    'Activated',
    'Email',
  ];

  createForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  constructor(public userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(email: string) {
    if (email) {
      this.userInfoService.getDataByEmail(email).subscribe((res: any) => {
        debugger;
        this.stateOfElement = true;
        this.userInfo = res[0];
        // if (this.userInfo) {
        //   this.userInfoService.getUserRoles(this.userInfo.user_id);
        // }
      });
    }
  }

  get email() {
    return this.form.get('email');
  }

  getFormattedDate(date: string) {
    return moment(date).format('YYYY-MM-DD h:mm:ss a');
  }

  clearValue() {
    window.location.reload();
  }

  onRemove(e: ChipComponent<string>) {
    alert(`Removed Chip: ${e.value}`);
  }
}
