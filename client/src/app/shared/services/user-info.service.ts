import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo, UserRole } from '../models/userInfo';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {

  #http = inject(HttpClient);
  apiURL = 'http://localhost:8080/v1';
  isEducator = new BehaviorSubject<boolean>(false);
  userRoles = new BehaviorSubject<UserRole[]>([]);
  users$ = this.#http.get<UserInfo[]>(`https://jsonplaceholder.typicode.com/users`)


  getDataByEmail(email: string): Observable<string> {
    return this.#http.post<string>(`${this.apiURL}/getAllUserInfo`, email);
  }

  getUserRoles(id: number | undefined): BehaviorSubject<UserRole[]> {
    this.#http
      .get<UserRole>(`${this.apiURL}/userRoles?userId=${id}`)
      .subscribe((res: any) => {
        this.userRoles.next(res.data);
        this.checkRoles(res.data.map((role: UserRole) => role.roleName));
      });
    return this.userRoles;
  }

  checkRoles(roles: string[]) {
    const acceptableRoles = [
      'Educator',
      'HOD',
      'Institution Administrator',
      'Account Administrator',
      'Director',
      'Curriculum Director',
      'Account Curriculum Director',
      'Account Director',
      'Homeroom Educator',
    ];
    acceptableRoles.forEach(role => {
      if (roles.includes(role)) {
        this.isEducator.next(true);
        return;
      }
    });
  }

  profile(id: string | number) {
    return this.#http.get<UserInfo>(`https://jsonplaceholder.typicode.com/users/${id}`);

  }

}
