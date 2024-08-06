import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { MatCardModule } from '@angular/material/card';
import { FilterComponent } from '../users/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ImgUploaderComponent } from '../../shared/components/img-uploader/img-uploader.component';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { DeletePatientDialogComponent } from './delete-patient-dialog/delete-patient-dialog.component';
import { EditPatientDialogComponent } from './edit-patient-dialog/edit-patient-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


export const routes: Routes = [
  { path: 'all-patients', component: PatientsComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'patient-profile', component: PatientProfileComponent },
  { path: 'patient-detail/:id', component: PatientDetailComponent },
];

@NgModule({
  declarations: [
    PatientsComponent,
    AddPatientComponent,
    EditPatientDialogComponent,
    DeletePatientDialogComponent,
    PatientDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FilterComponent,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    LoaderComponent,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    NgxMatIntlTelInputComponent,
    AsyncPipe,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    ImgUploaderComponent,
    AgePipe,
    MatRadioModule,
    MatDialogActions,
    MatDialogModule,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatListModule,
    MatTooltipModule,
    NgOptimizedImage,
    AsyncPipe,
    MatProgressBarModule

    
  ],
  exports: [PatientsComponent],
})
export class PatientsModule {}
