import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { PatientDTO } from '../model/patients.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-patient-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatListModule,
    CommonModule
  ],
  templateUrl: './delete-patient-dialog.component.html',
  styleUrl: './delete-patient-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePatientDialogComponent {
  patientData!: PatientDTO[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.patientData = data._data.value
    console.log('👉👉👉👉👉👉', data._data.value);
  }
}
