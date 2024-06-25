import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import { NgOtpInputModule } from 'ali';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [NgOtpInputModule, RouterLink, CommonModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit {
  #service = inject(UserService);
  matcher = new ErrorStateMatcher();
  userData: any;
  form!: FormGroup;
  #router = inject(Router);
  #toastrService = inject(ToastrService);
  otp!: string;
  showOtpComponent = true;

  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  ngOnInit(): void {
    this.form = new FormGroup({
      verify_code: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    this.#service.storeEmail$.subscribe(res => {
      console.log('email', res);
      this.userData = res;
    });
  }
  onOtpChange(otp: any) {
    this.otp = otp;

    this.onSubmit();
  }
  onSubmit() {
    const payload = {
      email: this.userData,
      verify_code: this.otp,
    };
    this.#service.confirmEmail(payload).subscribe(res => {
      if (res) {
        this.#toastrService.success('Login is succsessful!');
      this.#router.navigate(['aliakbar/settings']);


      }
    });
  }

  getOtp() {
    this.#service.getOTP(this.userData).subscribe(res => {
      console.log('resultOTP', res);
    });
  }
  get verify_code() {
    return this.form.get('verify_code');
  }
}
