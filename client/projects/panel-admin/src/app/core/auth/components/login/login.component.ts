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
import { HotToastService } from '@ngneat/hot-toast';


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
  providers: [HotToastService],
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
  #toastrService = inject(HotToastService);
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

  onSubmit() {
    if (this.form.value) {
      this.#authService.signIn(this.form.value).subscribe((res: any) => {
        const dataCookie = res.data;
        if (res.code == 200) {
          this.#cookieService.set('authorized', dataCookie);
          this.#toastrService.success('Login is succsessful!');
          this.#router.navigate(['/profile/dashboard']);
        } else {
          this.#toastrService.success('incorrect email or password!');
        }
      });
    }
  }

  // Get Value Form For Validation
  get userName() {
    return this.form.get('userName');
  }
  get password() {
    return this.form.get('password');
  }
}
