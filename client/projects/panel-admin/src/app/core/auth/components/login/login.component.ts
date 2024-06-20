import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
  ],
  providers: [],
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  title: string = 'Angular';
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  matcher = new ErrorStateMatcher();
  form!: FormGroup;

  #router = inject(Router);
  #authService = inject(AuthService);
  #toastrService = inject(ToastrService);
  #cookieService = inject(CookieService);

  createForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  login() {
    if (this.form.value) {
      this.#authService.signIn(this.form.value).subscribe((res: any) => {
        const stroeDataUser = res.payloadToken;
        if (res.code == 200) {
         this.setCookie(stroeDataUser)
          this.#cookieService.set('authorized', res);
          this.#toastrService.success('Login is succsessful!');
          this.#router.navigate(['/profile/dashboard']);
        } else {
          this.#toastrService.success('incorrect email or password!');
        }
      });
    }
  }
  setCookie(dataUser:any) {
    debugger;
    const date = new Date();
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); //7days
    this.#cookieService.set('userData', dataUser, date);
  }

  // Get Value Form For Validation
  get userName() {
    return this.form.get('userName');
  }
  get password() {
    return this.form.get('password');
  }
}
