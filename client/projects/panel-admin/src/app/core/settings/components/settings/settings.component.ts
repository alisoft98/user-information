import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    MatIconModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  matcher = new ErrorStateMatcher();
  genders: string[] = ['Man', 'Woman', 'Custom'];
  skillOption: string[] = [
    'Angular',
    'Rxjs',
    'Leadership',
    'Commnucation',
    'Data Analysis',
    'Project Manager',
    'User Experience',
    'Seo',
  ];
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
      [Validators.required, Validators.minLength(2), banWords(['test'])],
    ],
    lastName: [
      'Esmaeili',
      [Validators.required, Validators.minLength(2), banWords(['test'])],
    ],
    nickName: [
      'aliakbar',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[\w.]+$/),
        banWords(['test', 'dummy']),
      ],
    ],
    gender: 'Man',
    yearOfBirth: this.fb.nonNullable.control(
      this.years[this.years.length - 1],
      Validators.required
    ),
    email: ['a@gmail.com', [Validators.required, Validators.email]],
    phoneNumber: [''],
    password: this.fb.group(
      {
        password: ['11111111', [Validators.required, Validators.minLength(3)]],
        confirmPassword: '11111111',
      },
      {
        validators: passswordShouldMatch,
      }
    ),
    address: [''],
    country: [''],
    city: [''],
    state: [''],
    zipCode: [''],
    skills: [''],
    editor: [''],
  });
  constructor() {
    super();
  }
   ngOnInit() {
  }
  onSubmit() {}

  trackByFn() {}

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get nickName() {
    return this.form.get('nickName');
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
  get zipCode() {
    return this.form.get('zipCode');
  }
  get skills() {
    return this.form.get('skills');
  }

  ngOnDestroy(): void {
  }
}
