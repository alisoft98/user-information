export interface User {
    id: number;
    email: string;
    password: string;
}


export interface CreateUser {
    id: string
    email: string
    newPassword: string
    confirmNewPassword: string
    language_Id?: number
    tokenVerify?: string | null
    verify_code: string
  }
export interface Register {
    firstName: string;
    lastName: string;
    nickName: string;
    email: string;
    gender:string;
    phoneNumber: string;
    password:string;
    confirmPassword:string
  }