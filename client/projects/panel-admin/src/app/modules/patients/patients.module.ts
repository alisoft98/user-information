import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { MatCardModule } from '@angular/material/card';
import { FilterComponent } from '../users/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

export const routes: Routes = [
  { path: 'all-patients', component: PatientsComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'edit-patient', component: EditPatientComponent },
  { path: 'patient-profile', component: PatientProfileComponent },
];

@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FilterComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    LoaderComponent,
    MatCheckboxModule
  ],
  exports:[PatientsComponent]
})
export class PatientsModule {}
