import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, Users } from '../../models/user';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
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
    MatFormFieldModule],
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  matcher = new ErrorStateMatcher();
  form!: FormGroup;

  constructor(
    private router: Router,
    private service: AuthService,
    private toastr: ToastrService,
    private cookieService: CookieService) {

  }

  createForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required,),
    })
  }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(userData: User) {
    if (userData) {
      this.service.signIn(userData).subscribe((res: any) => {
        const dataCookie = res.data
        if (res.code == 200) {
          this.cookieService.set('authorized', dataCookie)
          this.toastr.success('Login is succsessful!');
          this.router.navigate(['/user-info'])
          console.log(res);
        } else {
          this.toastr.success('incorrect email or password!');

          
        }
      })
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
