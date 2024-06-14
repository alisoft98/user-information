import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Register, SignupResponse, User } from '../auth/models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  config = environment.apiEndPoint;
  #http = inject(HttpClient);
  tokenKey!: any;

  constructor() {
  if (typeof localStorage !== 'undefined') {
    this.tokenKey = localStorage.getItem('tokenKey');
    }
  }

  signIn(userData: User): Observable<User> {
    return this.#http.post<User>(`${this.config}auth/sign-in`, userData);
  }

  signUp(userData: any): Observable<SignupResponse> {
    return this.#http.post<SignupResponse>(
      `${this.config}auth/sign-up`,
      userData
    );
  }

 
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  isAuthDataAvailable(): boolean {
    return !!this.getToken();
  }

  // refreshToken(): Observable<any> {
  //   const refreshToken = 'get_from_local_storage_or_other_storage'; // Implement logic to get refresh token
  //   return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
  //     catchError(error => {
  //       // Handle error, e.g., redirect to login page
  //       console.error('Error refreshing token:', error);
  //       throw error;
  //     })
  //   );
  // }
  // getAllUsers(): Observable<Users> {
  //   return this.httpClient.get<Users>(`${this.config}/users`);
  // }
}
