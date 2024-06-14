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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,

  ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent implements OnInit {
 
  matcher = new ErrorStateMatcher();
  form!: FormGroup;


  ngOnInit(): void {
    this.form = new FormGroup({
      otpCode: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {}

  get otpCode() {
    return this.form.get('otpCode');
  }
}
