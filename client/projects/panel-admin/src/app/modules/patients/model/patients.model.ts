export interface PatientDTO {
  id: number;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  gender: 'Male' | 'Female' | 'Other' | any;
  mobile: string | undefined | null;
  dateOfBirth: number | undefined | null;
  age: number;
  email: string | null | undefined;
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  address: string | undefined | null;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  bloodPressure?: string;
  sugarLevel?: string;
  injury?: string;
  profileImage?: string;
}
