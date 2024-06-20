import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  #cookieService = inject(CookieService);
  toast = inject(ToastrService);
  authService = inject(AuthService);
  isRefreshing = false;

  intercept(
    request: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const getDataFromStorage = this.#cookieService.get('userData');

    if (getDataFromStorage) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${getDataFromStorage}`,
        },
      });
    }

    return handler.handle(request).pipe(
      catchError((err:HttpErrorResponse) => {
        if (err.status === 401 && err.message.includes('Unauthorized')) {
          return throwError(() => new Error('test'));
          return this.handle401Error(request, handler);
        } else {
       // Show error message
       this.showError(err);
       return throwError(() => new Error(err.message));
        }
      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler){
  if(!this.isRefreshing){
    this.isRefreshing = true;
    return this.authService.refreshToken().pipe(
      switchMap((token:any)=>{
        this.isRefreshing = false;
        this.#cookieService.set('authorized', token);
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(request);
      }),
      catchError((err) => {
        this.isRefreshing = false;
        this.authService.logout();
        this.toast.error('Session expired. Please log in again.');
        return throwError(() => new Error(err.message));
      })
    );
  } else {
    return next.handle(request);
  }
  }

  private showError(err: HttpErrorResponse) {
    if (err.error.message) {
      this.toast.error(err.error.message);
    } else if (err.error.Message) {
      this.toast.error(err.error.Message);
    } else {
      this.toast.error('An unknown error occurred');
    }
  }
}
