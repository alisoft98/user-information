import { addPatient, getPatients } from "../../bin/db";
import { PatientDTO } from "../../models/patients";

class PatientService {
  public static async registerPatient(formData: PatientDTO) {
    const data = await addPatient(formData);
    if (data) {
      return { message: "ok", formData };
    } else {
      return null;
    }
  }

  public static async getPatients() {
    const data = await getPatients();
    if (data) {
      return { message: `ok`, data };
    }
    return null;
  }
}

export default PatientService;
