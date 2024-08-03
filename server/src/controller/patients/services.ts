import {
  addPatient,
  deletePatient,
  getPatients,
  updatePatient,
} from "../../bin/db";
import { PatientDTO } from "../../models/patients";

class PatientService {
  public static async getPatients() {
    const data = await getPatients();
    if (data) {
      return { message: `ok`, data };
    }
    return null;
  }

  public static async registerPatient(formData: PatientDTO) {
    const data = await addPatient(formData);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async updatePatient(formData: PatientDTO) {
    const data = await updatePatient(formData);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async deletePatient(id: number) {
    const data = await deletePatient(id);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}

export default PatientService;
