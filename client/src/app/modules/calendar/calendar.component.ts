import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Calendar } from '../../shared/models/calendar';
import { CalendarDay } from './classes/calnder-day';
import { DialogCalendarComponent } from './dialog-calendar/dialog-calendar.component';
import { CalendarService } from './services/calendar.service';
import { ICalendar } from './models/calendar.interface';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
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
  dataEvent: ICalendar[] = [];

  constructor(
    private matDialog: MatDialog,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
    this.getEventData();
  }

  getEventData() {
    this.calendarService.getEventData().subscribe(
      (res: any) => {
        console.log('API response:', res);
        if (Array.isArray(res)) {
          this.assignEventsToCalendar(res);
        } else {
          console.error('Expected an array of events, but got:', res);
        }
      },
      (error) => {
        console.error('Error fetching event data:', error);
      }
    );
  }

  // getEventData() {
  //   this.calendarService.getEventData().subscribe((res: ICalendar[]) => {
  //     this.assignEventsToCalendar(res)

  //       console.log('result', res);

  //       // Code to execute for each element
  //     // this.calendar.dataList.push(res);
  //   });
  // }

  private assignEventsToCalendar(events: ICalendar[]) {
    debugger;
    events.forEach((event:any) => {
      const eventDate = new Date(event.date);
      const calendarDay = this.calendar.find(day => 
        day.date.toISOString().split('T')[0] === eventDate.toISOString().split('T')[0]
      );
      if (calendarDay) {
        calendarDay.dataList.push(event);
      }
    });


  }
  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date
    this.day = new Date(
      new Date().setMonth(new Date().getMonth() + monthIndex)
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
          startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1)
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
      dialogRef.afterClosed().subscribe((res: ICalendar[]) => {
        debugger;
        c.dataList.push(res);
        if (res) {
          this.sendEventData(c);
        }
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
      event.currentIndex
    );
  }

  sendEventData(dataList: any) {
    const eventData = {
      event_title: dataList.dataList[0].event_title,
      event_description: dataList.dataList[0].event_description,
      color: dataList.dataList[0].color,
      date: dataList.date.toISOString(),
    };
    this.calendarService.createEvent(eventData).subscribe(res => {
      debugger;
    });
  }
}
