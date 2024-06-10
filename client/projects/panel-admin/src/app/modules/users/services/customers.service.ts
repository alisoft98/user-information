import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Customers } from '../models/customers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  #http = inject(HttpClient);

  constructor() {}

  getCustomers(): Observable<Customers[]> {
    return this.#http.get<Customers[]>(`${environment.apiEndPoint}customers`);
  }

  getSkills() {
    return of(['Angular', 'Typescript', 'git', 'docker']).pipe(delay(1000));
  }
}
