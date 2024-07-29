import { Component, inject, OnInit } from '@angular/core';
import { UniqueNicknameValidator } from '../../../shared/validators/unique-nickname.validators';
import { ErrorStateMatcher } from '@angular/material/core';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { banWords } from '../../../shared/validators/ban-words.validators';
import { passswordShouldMatch } from '../../../shared/validators/password-should-math.validator';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImgUploaderComponent } from '../../../shared/components/img-uploader/img-uploader.component';
import { PatientsService } from '../services/patients.service';
import { PatientDTO } from '../model/patients.model';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatCardModule,
    NgxMatIntlTelInputComponent,
    AsyncPipe,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    ImgUploaderComponent,
  ],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss',
})
export class AddPatientComponent extends BaseComponent implements OnInit {
  uniqueNickname = inject(UniqueNicknameValidator);
  service = inject(PatientsService);
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  matcher = new ErrorStateMatcher();
  genders: string[] = ['Man', 'Woman'];
  title = 'Patient Information ';
  profileImg: any;

  form = this.fb.group({
    firstName: [
      'Aliakbar',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    lastName: ['Esmaeili', [Validators.required, Validators.minLength(2)]],
    // nickname: [
    //   '',
    //   {
    //     validators: [
    //       Validators.required,
    //       Validators.minLength(2),
    //       Validators.pattern(/^[\w.]+$/),
    //       banWords(['dummy', 'anonymous']),
    //     ],
    //     asyncValidators: [
    //       this.uniqueNickname.validate.bind(this.uniqueNickname),
    //     ],
    //     updateOn: 'blur',
    //   },
    // ],
    gender: 'Man',
    yearOfBirth: this.fb.nonNullable.control(
      this.years[this.years.length - 1],
      Validators.required
    ),
    email: ['a@gmail.com', [Validators.required, Validators.email]],
    phoneNumber: ['1121956540'],
    address: [''],
    country: [''],
    city: [''],
    state: [''],
    zipcode: [''],
    skills: [''],
  });

  ngOnInit(): void {
    this.service.getStoreProfileImg$.subscribe(res => {
      this.profileImg = res;
      console.log('profileImg', this.profileImg);
    });
  }
  onSubmit() {
    console.log(this.form.value);
    const imgProfile = this.profileImg;
    const payload: PatientDTO = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      gender: this.form.value.gender,
      mobile: this.form.value.phoneNumber,
      dateOfBirth: this.form.value.yearOfBirth,
      address: this.form.value.address,
      email: this.form.value.email,
      maritalStatus: this.form.value.maritalStatus,
      bloodGroup: this.form.value.bloodGroup,
      bloodPressure: this.form.value.bloodPressure,
      sugarLevel: this.form.value.sugarLevel,
      injury: this.form.value.injury,
      profileImage: imgProfile,
      zipcode: this.form.value.zipcode,
    };
    debugger;
    this.service.addPatient(payload).subscribe(res => {
      console.log('result patient', res);
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
  get nickname() {
    return this.form.get('nickname');
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
  get address() {
    return this.form.get('address');
  }
  get city() {
    return this.form.get('city');
  }
  get state() {
    return this.form.get('state');
  }
  get zipcode() {
    return this.form.get('zipcode');
  }
}
