import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ThemeManagerService } from '../../../../shared/client-services/theme-manager.service';
import { AuthService } from '../../../services/auth.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    NgOptimizedImage,
    MatIconModule,
    MatCheckboxModule
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
  #route = inject(ActivatedRoute);
  #authService = inject(AuthService);
  #toastrService = inject(ToastrService);

  private themeManager = inject(ThemeManagerService);
  theme = this.themeManager.theme;
  toggleTheme() {
    this.themeManager.toggleTheme();
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      remmeber: new FormControl(false),
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
          const dataJson = JSON.stringify(stroeDataUser);
          localStorage.setItem('userData', dataJson);
          this.#toastrService.success('Login is succsessful!');
          this.#router.navigate(['aliakbar/settings']);
          
        } else {
          this.#toastrService.success('incorrect email or password!');
        }
      });
    }
  }

  navigateRegister(){
    this.#router.navigate(['auth/register'])
  }

  // Get Value Form For Validation
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}
