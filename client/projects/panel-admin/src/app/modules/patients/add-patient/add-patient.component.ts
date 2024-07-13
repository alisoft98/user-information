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

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
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
      [Validators.required, Validators.minLength(2), banWords(['test'])],
    ],
    lastName: [
      'Esmaeili',
      [Validators.required, Validators.minLength(2), banWords(['test'])],
    ],
    nickName: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[\w.]+$/),
          banWords(['dummy', 'anonymous', 'test']),
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
    this.authService.signUp(payload).subscribe((res: any) => {
      console.log('👉', res);
      this.userService.userEmail.next(res.newUser?.email);
      this.router.navigate(['auth/confirm-email']);
    });
  }

  trackByFn() {}

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
