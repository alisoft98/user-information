import { addPatient } from "../../bin/db";
import { PatientDTO } from "../../models/patients";

class PatientService {
  public static async addPatient(formData: PatientDTO) {
    const data = await addPatient(formData);
    if (data) {
      return { message: "ok", formData };
    } else {
      return null;
    }
  }
}

export default PatientService