import { checkUserExist, confirmEmail, getUserInfo } from "../../bin/db";
import useValidation from "../../helper/use_validation";
import BuildResponse from "../../modules/response/app_response";
import { ConfirmEmail, User } from "../../types/user";
import schemaUser from "./schema";

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
    const data = await checkUserExist(email);

    if (data.length) {
      return data[0] as User;
    }

    return null;
  }

  /**
   *
   * @param email
   */
  public static async confrimEmail(formData: ConfirmEmail) {
    const userData = useValidation(schemaUser.confirmEmail, formData);
    const confirmEmailResult = await confirmEmail(userData);
    return BuildResponse.appResponse(confirmEmailResult);
  }
}

export default UserService;
