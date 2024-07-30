import { getPatients } from "../../bin/db";


class CustomersService {
    public static async getPatients() {
      const data = await getPatients();
      if (data) {
        return { message: `ok`, data };
      }
      return null;
    }
  }

export { CustomersService };
