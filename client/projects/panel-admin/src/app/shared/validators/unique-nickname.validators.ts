import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniqueNicknameValidator implements AsyncValidator {
  #http = inject(HttpClient);

  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.#http
      .get<unknown[]>(
        `https://jsonplaceholder.typicode.com/users?username=${control.value}`
      )
      .pipe(
        map(users =>
          users.length === 0 ? null : { uniqueName: { isTaken: true } }
        ),
        catchError(() => of({ uniqueName: { unknownError: true } }))
      );
  }
}
