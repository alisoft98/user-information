import { Component, inject } from '@angular/core';
import { UniqueNicknameValidator } from '../../../shared/validators/unique-nickname.validators';
import { ErrorStateMatcher } from '@angular/material/core';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { banWords } from '../../../shared/validators/ban-words.validators';
import { passswordShouldMatch } from '../../../shared/validators/password-should-math.validator';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatCardModule,
    NgxMatIntlTelInputComponent,
    AsyncPipe,
    MatDatepickerModule,
    MatIconModule,
  ],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss',
})
export class AddPatientComponent extends BaseComponent {
  uniqueNickname = inject(UniqueNicknameValidator);
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  matcher = new ErrorStateMatcher();
  genders: string[] = ['Man', 'Woman'];
  title = 'Patient Information ';

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

  onSubmit() {}

  trackByFn() {}

  // Get Value Form For Validation

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
}
