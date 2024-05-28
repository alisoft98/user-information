import { getCustomers } from "../../bin/db";


class CustomersService {
    public static async getCustomers() {
      const data = await getCustomers();
      if (data) {
        return { message: `ok`, data };
      }
      return null;
    }
  }

export { CustomersService };
