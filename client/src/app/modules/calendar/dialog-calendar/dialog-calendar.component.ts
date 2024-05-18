import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  @Input() getValueFromPicker: any;
  date: Date = new Date();

  selectedColor: any;

  // colors = ['#FF0000', '#2E3192', '#FFD400', '#F15A24'];
  colors: string[] = ['#FF0000', '#00FF00', '#0000FF'];
  compareObjects(o1: any, o2: any): boolean {
    return o1.color === o2.color;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Calendar
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    // if (this.data) {
    //   this.form.patchValue({
    //     title: this.data.dataList.title,
    //     describe: this.data.dataList.describe,
    //     selectedColor: this.data.dataList.selectedColor,
    //   });
    // }

    this.form = this.fb.group({
      event_title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          banWords(['test', 'dummy']),
        ],
      ],
      event_description: [''],
      color: [''],
    });

    this.form.get('color')?.valueChanges.subscribe(value => {
      debugger;
      this.selectedColor = value;
    });
  }

  onColorChange(event: any) {
    this.selectedColor = event.value;
  }

  submit() {
    const payload = {
      event_description: this.form.value.event_title,
      event_title: this.form.value.event_title,
      color: this.form.value.color.name,
    };
    this.dialogRef.close(this.form.value);
  }
  getFormattedDate(date: string) {
    return moment(date).format('YYYY-MM-DD h:mm:ss a');
  }
}
