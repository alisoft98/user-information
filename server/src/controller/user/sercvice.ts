import { Request } from "express";
import { checkUserExist, getUserInfo } from "../../bin/db";
import { User } from "../../types/user";

class UserService {
  // public static async getUserRoles(req: Request) {
  //     const userId = req.query.userId?.toString() || "";
  //     return await getUserRoles(userId)
  // }
  // public static async getLatestTemplates(req: Request) {
  //     const userId = req.query.userId?.toString() || "";
  //     return await getLatestTemplates(userId)
  // }
  public static async getUserInfo(email: string) {
    return await getUserInfo(email);
  }

   /**
   *
   * @param email
   */
   public static async validateUserEmail(email: string) {
    const data = await checkUserExist(email)

    if (data.length) {
      return data[0] as User
    }

    return null
  }
}

export default UserService;
