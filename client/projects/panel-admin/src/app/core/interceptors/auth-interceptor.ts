import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  cookieService = inject(CookieService);
  toast = inject(HotToastService)
  authService = inject(AuthService);
  isRefreshing = false;

  intercept(
    request: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const cookieData = this.cookieService.get('authorized');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${cookieData}`,
      },
    });

    return handler.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 && err.message.includes('Unauthorized')) {
          return throwError(() => new Error('test'));
          // TODO send to the login
        } else {
          if (err.error.message) this.toast.error(err.error.message)
          else if (err.error.Message) this.toast.error(err.error.Message);
          return throwError(() => new Error('test'));
        }
        })
        );
        
        }

}
