import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfirmEmail, CurrentUser } from '../auth/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #http = inject(HttpClient);
  config = environment.apiEndPoint;
  userEmail = new BehaviorSubject<any>('');
  storeEmail$ = this.userEmail.asObservable();


  confirmEmail(data: any): Observable<CurrentUser> {
    debugger;
    return this.#http.post<CurrentUser>(`${this.config}user/confirm`, data);
  }
}
