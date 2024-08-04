import { Component, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AgePipe } from '../../../shared/pipes/age.pipe';
import { banWords } from '../../../shared/validators/ban-words.validators';
import { UniqueNicknameValidator } from '../../../shared/validators/unique-nickname.validators';
import { PatientDTO } from '../model/patients.model';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss',
  providers: [AgePipe],
})
export class AddPatientComponent extends BaseComponent implements OnInit {
  uniqueNickname = inject(UniqueNicknameValidator);
  service = inject(PatientsService);
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  matcher = new ErrorStateMatcher();
  genders: string[] = ['Male', 'Female'];
  maritalStatus: string[] = ['Single', 'Married'];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  sugarLevels: string[] = ['Normal', 'Prediabetes', 'Diabetes'];
  title = 'Add New Patient';
  profileImg: File | null = null;

  constructor(private agePipe: AgePipe) {
    super();
  }

  form = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['Man'],
    mobile: [''],
    dateOfBirth: ['', Validators.required],
    age: [null],
    email: ['a@gmail.com', [Validators.required, Validators.email]],
    maritalStatus: ['Single'],
    address: [''],
    bloodGroup: [''],
    bloodPressure: [''],
    sugarLevel: [''],
    injury: [''],
  });

  ngOnInit(): void {
    this.service.getStoreProfileImg$.subscribe(res => {
      this.profileImg = res;
    });
    this.dateOfBirth?.valueChanges.subscribe(date => {
      if (date) {
        const age = this.agePipe.transform(date);
        this.form.get('age')?.setValue(age, { emitEvent: false });
      }
    });
  }
  onSubmit() {
    if (this.profileImg) {
      const imgProfile = this.profileImg;
      const payload: PatientDTO = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        gender: this.form.value.gender,
        mobile: this.form.value.mobile,
        dateOfBirth: this.form.value.dateOfBirth as String,
        address: this.form.value.address,
        email: this.form.value.email,
        age: this.form.value.age,
        maritalStatus: this.form.value.maritalStatus,
        bloodGroup: this.form.value.bloodGroup,
        bloodPressure: this.form.value.bloodPressure,
        sugarLevel: this.form.value.sugarLevel,
        injury: this.form.value.injury,
        profileImage: imgProfile.name,
      };
      this.service.addPatient(payload).subscribe((res: any) => {
        if (res.code === 200) {
          this.form.reset()
          this.toastrService.success('pateint add successfully');
        }else{
          this.toastrService.error('can not add patient...!')
        }
      });
    }
  }

  trackByFn() {}

  // Get Value Form For Validation

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get age() {
    return this.form.get('age');
  }

  get gender() {
    return this.form.get('gender');
  }
  get email() {
    return this.form.get('email');
  }
  get mobile() {
    return this.form.get('mobile');
  }

  get address() {
    return this.form.get('address');
  }

  get injury() {
    return this.form.get('injury');
  }
  get bloodPressure() {
    return this.form.get('bloodPressure');
  }

  get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }
}
