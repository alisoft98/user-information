import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {

const router = inject(Router);
const cookie = inject(CookieService);

  const cookieData = cookie.get('authorized');
  if(cookieData){
    return true
  }else{
    router.navigateByUrl('/login')
    return false;

  }
};
