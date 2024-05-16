import { CommonModule, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Calendar } from '../../shared/models/calendar';
import { DialogCalendarComponent } from './dialog-calendar/dialog-calendar.component';
import { ChunkPipe } from '../../shared/pipes/chunk.pipe';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../shared/shared.module';
import { CalendarDay } from './calnder-day';


@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  calendar: CalendarDay[] = [];
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  weekDayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  displayMonth!: string;
  private monthIndex: number = 0;
  day!: Date;
  isSelected!: boolean;

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
  }
  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date
    this.day = new Date(
      new Date().setMonth(new Date().getMonth() + monthIndex),
    );

    //set the display month for UI
    this.displayMonth = this.monthNames[this.day.getMonth()];
    let startingDateOfCalendar = this.getStartDateForCalendar(this.day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date) {
    //for teh day we selected let's get the previos month las day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days until we encounter our last Monday of previous month

    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(
          startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1),
        );
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }

  public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--;
    this.generateCalendarDays(this.monthIndex);
  }
  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  getValueOfRow(row: any, c: any) {
    if (this.isSelected === false) {
      return;
    } else {
      const dialogRef = this.matDialog.open(DialogCalendarComponent, {
        width: '500px',
        data: { data: c.dataList },
      });
      dialogRef.afterClosed().subscribe((res: Calendar) => {
        c.dataList.push(res);
      });
    }
  }
  dragStarted() {
    this.isSelected = true;
  }

  dragEnded() {
    this.isSelected = false;
  }

  drop(event: CdkDragDrop<Calendar[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
