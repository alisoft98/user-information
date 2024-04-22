import { getLatestTemplates, getUserByEmail, getUserRoles } from '../../bin/app_db'
import { Request } from 'express'

class UserService {

    /**
     *
     * @param req - Request
     * @param formData
     */
    public static async getUserRoles(req: Request ) {
        const userId = req.query.userId?.toString() || "";
        return await getUserRoles(userId)
    }

    public static async getLatestTemplates(req: Request) {
        const userId = req.query.userId?.toString() || "";
        return await getLatestTemplates(userId)
    }

    public static async getAllUserInfo(email: string) {
        return await getUserByEmail(email);
    
    }
}
export default UserService
