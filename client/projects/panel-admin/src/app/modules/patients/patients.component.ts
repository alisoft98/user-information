import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { take } from 'rxjs';
import { AddUserInfoDialogComponent } from '../users/components/add-user-info-dialog/add-user-info-dialog.component';
import { FilterComponent } from '../users/filter/filter.component';
import { Customers } from '../users/models/customers';
import { CustomersService } from '../users/services/customers.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
})
export class PatientsComponent {
  customers: Customers[] = [];
  displayedColumns: string[] = [
    'position',
    'customer_id',
    'first_name',
    'last_name',
    'email',
    'phone_number',
    'address',
    'city',
    'state',
    'zip_code',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() title!: string;
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
      .getCustomers()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data.data);
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

  ngOnDestroy(): void {}

  addUserInfo() {
    this.dialog.open(AddUserInfoDialogComponent, {
      height: '900px',
    });
  }
}
