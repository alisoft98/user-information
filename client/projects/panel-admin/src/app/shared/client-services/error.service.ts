import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { COMMON_MESSAGES } from '../data/common-message.data';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  #router = inject(Router);
  #notificationService = inject(NotificationService);
  #dialog = inject(MatDialog);

  handle400Error(error: HttpErrorResponse) {
    this.#notificationService.showError(this.getErrorMessage(error));
  }

  handle401Error(error: HttpErrorResponse) {
    this.#notificationService.showError(this.getErrorMessage(error));
    this.#dialog.closeAll();
    this.#router.navigate(['/login']);
  }

  handle405Error(error: HttpErrorResponse) {
    this.#notificationService.showError(this.getErrorMessage(error));
  }

  getErrorMessage(error: HttpErrorResponse): string {
    return error.error && error.error.message
      ? error.error.message
      : error.statusText
      ? error.statusText
      : COMMON_MESSAGES.unknownError;
  }
}
