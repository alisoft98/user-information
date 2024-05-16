import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'ngx-latest-templates-details',
  templateUrl: './latest-templates-details.component.html',
  styleUrls: ['./latest-templates-details.component.scss'],
})
export class LatestTemplatesDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LatestTemplatesDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {}

  getFormattedDate(date: string) {
    return moment(date).format('YYYY-MM-DD h:mm:ss a');
  }
}
