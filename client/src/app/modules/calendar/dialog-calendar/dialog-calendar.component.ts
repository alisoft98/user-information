import { DatePipe, CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Calendar } from '../../../shared/models/calendar';
import { banWords } from '../../../shared/functions/ban-words.validators';
import moment from 'moment';

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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Calendar
  ) {}

  form = this.fb.group({
    title: [
      'ssaass',
      [
        Validators.required,
        Validators.minLength(3),
        banWords(['test', 'dummy']),
      ],
    ],
    describe: ['asdas'],
    selectedColor: ['red'],
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

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.events.push(`${type}: ${event.value}`);
  // }
  submit() {
    this.dialogRef.close(this.form.value);
  }
  getFormattedDate(date: string) {
    return moment(date).format('YYYY-MM-DD h:mm:ss a');
  }
}
