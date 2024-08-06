import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { PatientsService } from '../services/patients.service';
import { PatientDTO } from '../model/patients.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PatientDetailComponent extends BaseComponent implements OnInit {
  service = inject(PatientsService);
  patientId!: number;
  patientDetailSignal!: Signal<PatientDTO[]>;
  dataSource = new MatTableDataSource<PatientDTO>();
  selection = new SelectionModel<any>(true, []);

  displayedColumns: string[] = [
    'select',
    'id',
    'Date',
    'Doctor',
    'Treatment',
    'Charges',
    'action',
  ];

  constructor() {
    super();
    this.route.params.subscribe((param: any) => {
      this.patientId = +param.id;
      this.getData(this.patientId);
    });
  }

  ngOnInit(): void {}

  getData(patientId: number) {
    this.patientDetailSignal = toSignal(this.service.patientDetial(patientId), {
      initialValue: [],
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: PatientDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'}all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}row${
      row.position + 1
    }`;
  }

  editPatient(
    row: PatientDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {}
  deletePatient(
    row: PatientDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {}
}
