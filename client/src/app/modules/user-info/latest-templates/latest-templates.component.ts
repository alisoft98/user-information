import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import moment from 'moment';
import { LatestTemplatesDetailsComponent } from './latest-templates-details/latest-templates-details.component';

@Component({
  selector: 'app-latest-templates',
  templateUrl: './latest-templates.component.html',
  styleUrl: './latest-templates.component.scss',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatButtonModule],
})
export class LatestTemplatesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;

  latestTemplates: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'templateType',
    'creationDate',
    'updateDate',
    'status',
    'details',
  ];
  dataSource: any;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: any | null;

  constructor(
    private http: HttpClient,
    protected dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:8080/v1/latestTemplates?userId=36834')
      .subscribe((res: any) => {
        if (res.data) {
          this.latestTemplates = res.data;
          this.dataSource = new MatTableDataSource(this.latestTemplates);
          this.dataSource.sort = this.sort;
        }
      });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {}

  getFormattedDate(date: string) {
    return moment(date).format('YYYY-MM-DD h:mm:ss a');
  }

  getDataDetails(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = row;
    dialogConfig.panelClass = 'custom-dialog-container';
    this.dialog
      .open(LatestTemplatesDetailsComponent, dialogConfig)
      .afterClosed()
      .subscribe(data => {
        // this.service.showDeliveryMessage.next(false)
      });
  }
}
