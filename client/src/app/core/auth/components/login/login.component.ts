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
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

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
  ],
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  title: string = 'Angular';
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  matcher = new ErrorStateMatcher();
  form!: FormGroup;

  constructor(
    private router: Router,
    public service: AuthService,
    public toastr: ToastrService,
    private cookieService: CookieService
  ) {
  }

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
      this.service.signIn(this.form.value).subscribe((res: any) => {
        const dataCookie = res.data;
        if (res.code == 200) {
          this.cookieService.set('authorized', dataCookie);
          this.toastr.success('Login is succsessful!');
          this.router.navigate(['/profile/user-info']);
          console.log('✅success login',res);
        } else {
          this.toastr.success('incorrect email or password!');
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
