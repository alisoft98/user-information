import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state): any => {
  const router = inject(Router);
  const getStoreItem = localStorage.getItem('storeUser');
  const getItem = JSON.parse(getStoreItem || '{}');
  if (getItem) {
      return getItem;
  } else {
      router.navigateByUrl('/login')
      return false;
  }
}