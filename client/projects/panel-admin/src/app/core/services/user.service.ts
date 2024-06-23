import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CurrentUser, User } from '../auth/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #http = inject(HttpClient);
  config = environment.apiEndPoint;
  userEmail = new BehaviorSubject<any>('');
  storeEmail$ = this.userEmail.asObservable();

  confirmEmail(data: any): Observable<CurrentUser> {
    return this.#http.post<CurrentUser>(`${this.config}user/confirm`, data);
  }

  getOTP(email: string): Observable<CurrentUser> {
    return this.#http.get<CurrentUser>(`${this.config}user/getOTP/${email}`);
  }

  updateProfile(data: User): Observable<User> {
    debugger;
    return this.#http.put<User>(
      `${this.config}/usre/updateProfile/${data.id}`,
      data
    );
  }
}
