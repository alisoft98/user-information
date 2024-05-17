import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NavItem } from '../../shared/models/nav-items';

@Injectable({
  providedIn: 'root',
})
export class NavItemsService {
  #http = inject(HttpClient);
  apiEndPoint = 'http://localhost:8080/v1/';



  constructor() {}

  getNavItems(): Observable<NavItem[]> {
    return this.#http.get<NavItem[]>(this.apiEndPoint + 'navItem');
  }

  getSubmenuItems(menuId: number): Observable<any> {
    return this.#http.get<NavItem>(
      `${this.apiEndPoint}submenu/${menuId}`
    );
  }
}
