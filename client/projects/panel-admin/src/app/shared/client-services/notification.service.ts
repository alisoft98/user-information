import { Injectable, inject } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // #toastrService = inject(ToastrService);

  showSuccess(message: string) {
    // return this.#toastrService.success(message);
  }
  showError(message: string) {
    // return this.#toastrService.error(message);
  }
  showWarning(message: string) {
    // return this.#toastrService.warning(message);
  }

  showInfo(message: string) {
    // return this.#toastrService.info(message);
  }
}
