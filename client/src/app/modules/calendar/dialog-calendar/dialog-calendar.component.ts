import { Component, Inject, Input } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import moment from 'moment';
import { banWords } from '../../../shared/functions/ban-words.validators';
import { Calendar } from '../../../shared/models/calendar';

@Component({
  selector: 'app-dialog-calendar',
  standalone: false,
  templateUrl: './dialog-calendar.component.html',
  styleUrl: './dialog-calendar.component.scss',
})
export class DialogCalendarComponent {
  value = 'Clear me';
  events: string[] = [];
  // @Input() form!: FormGroup;
  @Input() getValueFromPicker: any;
  date: Date = new Date();

  dataColor = [
    { name: 'Red', color: 'red' },
    { name: 'Green', color: '#008000' },
    { name: 'Yellow', color: 'yellow' },
    { name: 'Pink', color: 'pink' },
  ];

  colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Calendar
  ) {}

  form = this.fb.group({
    event_title: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        banWords(['test', 'dummy']),
      ],
    ],
    event_description: [''],
    color: ['red'],
  });

  ngOnInit(): void {
    // if (this.data) {
    //   this.form.patchValue({
    //     title: this.data.dataList.title,
    //     describe: this.data.dataList.describe,
    //     selectedColor: this.data.dataList.selectedColor,
    //   });
    // }
  }

 
  submit() {
    this.dialogRef.close(this.form.value);
  }
  getFormattedDate(date: string) {
    return moment(date).format('YYYY-MM-DD h:mm:ss a');
  }
}
