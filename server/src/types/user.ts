export interface User {
  id: number;
  firstName:string;
  lastName:string;
  email: string;
  password: string;
  emailConfirmed: boolean;
  signupStatus: number;
  verify_code: string


}

export interface CreateUser {
  id: string;
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  language_Id?: number;
  tokenVerify?: string | null;
  verify_code: string;
}
export interface Register {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface ConfirmEmail {
  email: string;
  id?: string;
  verify_code: string;
}
