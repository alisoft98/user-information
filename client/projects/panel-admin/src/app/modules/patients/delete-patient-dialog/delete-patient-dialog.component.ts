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
import { CommonModule, NgFor } from '@angular/common';
import { PatientsService } from '../services/patients.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-patient-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatListModule,
  ],
  templateUrl: './delete-patient-dialog.component.html',
  styleUrl: './delete-patient-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePatientDialogComponent {
  service = inject(PatientsService);
  #toastrService = inject(ToastrService);

  patientData: PatientDTO;

  constructor(
    public dialogRef: MatDialogRef<DeletePatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.patientData = data;
    console.log(this.patientData);
  }

  deletePatient(id: number | undefined) {
    this.service.deletePatient(id).subscribe((res: any) => {
      if (res.code === 200) {
        this.#toastrService.success('data has been deleted');
      }
    });
  }
}
