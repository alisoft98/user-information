export interface PatientDTO {
  id?: number;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  gender: string| undefined | null;
  mobile: string | undefined | null;
  dateOfBirth: any;
  age: number | undefined | null; 
  email: string | null | undefined;
  maritalStatus: string | undefined | null;
  address: string | undefined | null;
  bloodGroup: string | undefined | null;
  bloodPressure?: string | undefined | null;
  sugarLevel?: string | undefined | null;
  injury?: string | undefined | null;
  profileImage?: string ;
}
