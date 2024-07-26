import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
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
import { RouterLink } from '@angular/router';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { banWords } from '../../../../shared/validators/ban-words.validators';
import { passswordShouldMatch } from '../../../../shared/validators/password-should-math.validator';
import { UniqueNicknameValidator } from '../../../../shared/validators/unique-nickname.validators';

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
export class RegisterComponent extends BaseComponent {
   uniqueNickname=inject( UniqueNicknameValidator);
  title: string = 'Angular';
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  matcher = new ErrorStateMatcher();

  form = this.fb.group({
    userName: [
      'Aliakbar',
      [Validators.required, Validators.minLength(2), banWords(['test'])],
    ],
    email: ['a@gmail.com', [Validators.required, Validators.email]],
    password: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: '',
      },
      {
        validators: passswordShouldMatch,
      }
    ),
  });

  onSubmit() {
    const payload = {
      userName: this.form.value.userName,
      email: this.form.value.email,
      password: this.form.controls.password.value.password,
      confirmPassword: this.form.controls.password.value.confirmPassword,
    };
    this.authService.signUp(payload).subscribe((res: any) => {
      console.log('👉', res);
      this.userService.userEmail.next(res.newUser?.email);
      this.router.navigate(['auth/confirm-email']);
    });
  }

  trackByFn() {}

  // Get Value Form For Validation

  get userName() {
    return this.form.get('userName');
  }
 
  get email() {
    return this.form.get('email');
  }
 
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
