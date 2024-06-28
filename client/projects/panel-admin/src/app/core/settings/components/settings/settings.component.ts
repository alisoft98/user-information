import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { banWords } from '../../../../shared/validators/ban-words.validators';
import { passswordShouldMatch } from '../../../../shared/validators/password-should-math.validator';
import { NgxEditorModule, Editor } from 'ngx-editor';
import { MatIconModule } from '@angular/material/icon';
import { Observable, tap } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UniqueNicknameValidator } from '../../../../shared/validators/unique-nickname.validators';
import { User } from '../../../auth/models/user';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
    CommonModule,
    MatSelectModule,
    NgxMatIntlTelInputComponent,
    NgxEditorModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  matcher = new ErrorStateMatcher();
  genders: string[] = ['Man', 'Woman', 'Custom'];
  skills$!: Observable<string[]>;

  country: string[] = [
    'Spanish',
    'UK',
    'Malaysia',
    'Iran',
    'Netherland',
    'Autria',
    'England',
  ];

  form = this.fb.group({
    firstName: [
      'Aliakbar',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    lastName: ['Esmaeili', [Validators.required, Validators.minLength(2)]],
    nickname: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[\w.]+$/),
          banWords(['dummy', 'anonymous']),
        ],
        asyncValidators: [
          this.uniqueNickname.validate.bind(this.uniqueNickname),
        ],
        updateOn: 'blur',
      },
    ],
    gender: 'Man',
    yearOfBirth: this.fb.nonNullable.control(
      this.years[this.years.length - 1],
      Validators.required
    ),
    email: ['a@gmail.com', [Validators.required, Validators.email]],
    phoneNumber: [''],
    address: [''],
    country: [''],
    city: [''],
    state: [''],
    zipcode: [''],
    skills: [''],
  });

  constructor(private uniqueNickname: UniqueNicknameValidator) {
    super();
  }
  ngOnInit() {
    this.getuserSkills();
  }

  onSubmit() {
    if (this.form.value) {
      this.userService.updateProfile(this.form.value).subscribe(res => {
        console.log(res);
      });
      console.log(this.form.value);
    }
  }

  trackByFn() {}

  getuserSkills() {
    this.skills$ = this.userService.getSkills();
    console.log(this.skills$);
    
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get nickname() {
    return this.form.get('nickname');
  }
  get gender() {
    return this.form.get('gender');
  }
  get email() {
    return this.form.get('email');
  }
  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  get address() {
    return this.form.get('address');
  }
  get city() {
    return this.form.get('city');
  }
  get state() {
    return this.form.get('state');
  }
  get zipcode() {
    return this.form.get('zipcode');
  }
  // get skills() {
  //   return this.form.controls.ski.get('skills');
  // }

  ngOnDestroy(): void {}
}
