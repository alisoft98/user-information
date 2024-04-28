import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Users } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiEndPoint = 'http://localhost:8080/v1';


  constructor(private httpClient: HttpClient) {
  }

  signIn(userData: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiEndPoint}/auth/sign-in`, userData)
  }

  getAllUsers(): Observable<Users> {
    return this.httpClient.get<Users>(`${this.apiEndPoint}/users`)
  }


}
