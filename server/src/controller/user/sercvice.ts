import { Request } from "express";
import { getUserInfo } from "../../bin/db";

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
}

export default UserService;
