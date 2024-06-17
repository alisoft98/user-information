import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit {
  #service = inject(UserService);
  matcher = new ErrorStateMatcher();
  userData: any;
  form!: FormGroup;
  #router = inject(Router);
  #toastrService = inject(HotToastService);

  ngOnInit(): void {
    this.form = new FormGroup({
      verify_code: new FormControl('', [Validators.required]),
    });
    this.#service.storeEmail$.subscribe(res => {
      console.log('email', res);
      this.userData = res;
    });
  }


  onSubmit() {
    const payload = {
      email: this.userData,
      verify_code: this.form.value.verify_code,
      id: 7813,
    };
    this.#service.confirmEmail(payload).subscribe(res => {
      if (res) {
        this.#toastrService.success('Login is succsessful!');
        this.#router.navigate(['/profile/dashboard']);
      }
      console.log();
    });
  }
  get verify_code() {
    return this.form.get('verify_code');
  }
}
