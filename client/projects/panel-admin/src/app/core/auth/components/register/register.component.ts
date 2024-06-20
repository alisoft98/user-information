import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { banWords } from '../../../../shared/validators/ban-words.validators';
import { passswordShouldMatch } from '../../../../shared/validators/password-should-math.validator';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  router = inject(Router);
  service = inject(AuthService);
  userService = inject(UserService);
  toastr = inject(ToastrService);
  cookieService = inject(CookieService);
  fb = inject(FormBuilder);

  title: string = 'Angular';
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  matcher = new ErrorStateMatcher();
  genders: string[] = ['Man', 'Woman'];
  years = this.getYears();

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
  });

  ngOnInit(): void {}

  onSubmit() {
    const payload = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      nickName: this.form.value.nickName,
      gender: this.form.value.gender,
      birthDay: this.form.value.yearOfBirth?.toString(),
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
      password: this.form.controls.password.value.password,
      confirmPassword: this.form.controls.password.value.confirmPassword,
    };
    this.service.signUp(payload).subscribe((res:any) => {
      console.log('👉', res);
        this.userService.userEmail.next(res.newUser?.email);
        this.router.navigate(['confirm-email']);
    });
  }

  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }

  trackByFn(){}

  // Get Value Form For Validation

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
}
