import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { CookieService } from "ngx-cookie-service";
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private cookieService:CookieService) { }


 
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const cookieData = this.cookieService.get('authorized');

    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${cookieData}`


      },
    });


    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = "";
        if (error.error instanceof ErrorEvent) {
          console.log("This is client side error");
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // handle error message based on API response here

        }
        !environment.production ?
          console.log(errorMsg) : null;
        return throwError(errorMsg);
      })
    );
  }
}
