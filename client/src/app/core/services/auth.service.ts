import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Users } from '../auth/models/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   config = environment.apiEndPoint;


  constructor(private httpClient: HttpClient) {}

  signIn(userData: User): Observable<User> {
    return this.httpClient.post<User>(
      `${this.config}/auth/sign-in`,
      userData
    );
  }

  getAllUsers(): Observable<Users> {
    return this.httpClient.get<Users>(`${this.config}/users`);
  }
}
