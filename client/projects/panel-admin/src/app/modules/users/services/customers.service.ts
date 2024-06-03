import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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
}
