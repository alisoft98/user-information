import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import moment from 'moment';
import { Observable, Subject, concatMap, defer, of } from 'rxjs';
import { UserInfoService } from '../../../shared/services/user-info.service';
import { UserRole } from '../../../shared/models/userInfo';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.scss',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
})

export class UserRolesComponent implements OnInit {

  userRoles!: UserRole[];
  dataSource: any;
  displayedColumns: string[] =
    ['roleName', 'branchName', 'schoolName', 'assignmentDate', 'updateDate'];

  @ViewChild(MatSort) sort: MatSort | any;
  @Input() userId: number | undefined;

  constructor(private userService: UserInfoService) { }

  ngOnInit(): void {
    this.userService.userRoles.subscribe(data => {
      if(data){
        this.userRoles = data;
        this.dataSource = new MatTableDataSource(this.userRoles);
        this.dataSource.sort = this.sort;
      }
    })
  }

  announceSortChange(sortState: Sort) {
  }
  getFormattedDate(date: string) {
    return moment(date).format('YYYY-MM-DD h:mm:ss a');
  }
}


