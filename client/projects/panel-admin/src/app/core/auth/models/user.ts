export interface User {
  id: number;
  email: string;
  password: string;
  firstName:string;
  lastName:string;
}

export interface Register {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  gender: string;
  birthDay: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  code: number;
  message: string;
  user?: User;
  tokenVerify?: string;
}
export interface CurrentUser extends SignupResponse {
  id: number;
  email: string;
}

export interface ConfirmEmail {
  email: string;
  id: string;
  verify_code: string;
}
