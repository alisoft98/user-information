import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICalendar } from '../models/calendar.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  #http = inject(HttpClient);
  apiEndPoint = 'http://localhost:8080/v1';

  createEvent(eventData: ICalendar): Observable<ICalendar> {
    return this.#http.post<ICalendar>(
      `${this.apiEndPoint}/insertEvent`,
      eventData
    );
  }

  getEventData(): Observable<ICalendar[]> {
    return this.#http.get<ICalendar[]>(`${this.apiEndPoint}/getEventData`);
  }
}
