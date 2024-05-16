import { Component } from '@angular/core';
import { Calendar } from '../../shared/models/calendar';

@Component({
  standalone: true,
  selector: 'calendar-day',
  template: '',
  styles: [],
  providers: [],
})
export class CalendarDay {
  public date: Date;
  public title!: string;
  public isPastDate: boolean;
  public isToday: boolean;
  dataList: Array<Calendar> = [];

  public getDateString() {
    return this.date.toISOString().split('T')[0];
  }

  constructor(d: Date) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }
}
