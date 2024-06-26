import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { COMMON_MESSAGES } from '../data/common-message.data';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: UserService,
    private notificationService: NotificationService
  ) {}

  handle400Error(error: HttpErrorResponse) {
    this.notificationService.showError(this.getErrorMessage(error));
  }
  handle401Error(error: HttpErrorResponse) {
    this.notificationService.showError(this.getErrorMessage(error));
    this.dialog.closeAll();
    this.router.navigate(['/login']);
  }

  handle404Error(error: HttpErrorResponse) {
    this.notificationService.showError(this.getErrorMessage(error));
  }
  handle422Error(error: HttpErrorResponse) {
    this.notificationService.showError(this.getErrorMessage(error));
  }

  handle500Error(error?: HttpErrorResponse) {
    this.notificationService.showError(COMMON_MESSAGES.serverIsNotResponsible);
  }

  getErrorMessage(error: HttpErrorResponse): string {
    debugger
    return error.error && error.error.message
      ? error.error.message
      : error.statusText
      ? error.statusText
      : COMMON_MESSAGES.unknownError;
  }
}
