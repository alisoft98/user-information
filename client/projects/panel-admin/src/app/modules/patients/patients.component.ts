import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AddUserInfoDialogComponent } from '../users/components/add-user-info-dialog/add-user-info-dialog.component';
import { Customers } from '../users/models/customers';
import { CustomersService } from '../users/services/customers.service';
import { PatientDTO } from './model/patients.model';
import { SelectionModel } from '@angular/cdk/collections';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
})
export class PatientsComponent {
  customers: Customers[] = [];
  displayedColumns: string[] = [
    'select',
    'id',
    'profileImage',
    'firstName',
    'lastName',
    'gender',
    'mobile',
    'dateOfBirth',
    'age',
    'email',
    'maritalStatus',
    'address',
    'bloodGroup',
    'bloodPressure',
    'sugarLevel',
    'injury',
  ];
  dataSource = new MatTableDataSource<PatientDTO>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() title!: string;
  selection = new SelectionModel<any>(true, []);
  imgPatient:any
  constructor(private service: CustomersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * This is the get function
   * @returns returns array of UserData
   */
  getData() {
    this.service
      .getPatients()
      .pipe(take(1))
      .subscribe((response: any) => {
        const data = response.data.map((patient:any)=>{
          patient.profileImage= `${environment.urlProfileImg}${patient.profileImage}`;
          return patient;
        })
        this.dataSource = new MatTableDataSource(data);
        console.log('👉👉👉👉👉',data);
        
      this.dataSource.sort = this.sort;
        // this.customers = data.data;
      });
  }

  /**
   * This is the get function
   * @param event This is the applyFilter
   * @returns returns datauser with filter
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
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
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Customers): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  addUserInfo() {
    this.dialog.open(AddUserInfoDialogComponent, {
      height: '900px',
    });
  }
  ngOnDestroy(): void {}
}
