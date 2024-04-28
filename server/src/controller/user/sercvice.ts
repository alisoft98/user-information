import { Request } from "express";
import { getLatestTemplates, getUserDataByEmail, getUserRoles } from "../../bin/db";


class UserService {

    public static async getAllUserInfo(email: string) {
        return await getUserDataByEmail(email);

    }
    public static async getUserRoles(req: Request) {
        const userId = req.query.userId?.toString() || "";
        return await getUserRoles(userId)
    }
    public static async getLatestTemplates(req: Request) {
        const userId = req.query.userId?.toString() || "";
        return await getLatestTemplates(userId)
    }
}

export default UserService