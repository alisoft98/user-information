import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';

const routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  // {
  //   path: 'otp',
  //   component: OtpComponent,
  //   canActivate: [RegistrationGuard],
  // },
  // {
  //   path: 'request-otp',
  //   component: RequestOtpComponent
  // },
  // {
  //   path: 'change-password-otp',
  //   component: ChangePasswordOtpComponent,
  //   canActivate: [ChangePasswordGuard]
  // },
  // {
  //   path: 'change-password',
  //   component: ChangePasswordComponent,
  //   canActivate: [ChangePasswordGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
