import {
  checkUserExist,
  confirmEmail,
  getOTP,
  getUserInfo,
} from "../../bin/db";
import useValidation from "../../helper/use_validation";
import BuildResponse from "../../modules/response/app_response";
import { ConfirmEmail, User } from "../../types/user";
import schemaUser from "./schema";
import SendMail from "../../helper/send_email";

class UserService {
  public static async getUserInfo(email: string) {
    return await getUserInfo(email);
  }
  /**
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
   * @param email
   */
  public static async confrimEmail(formData: ConfirmEmail) {
    const userData = useValidation(schemaUser.confirmEmail, formData);
    const confirmEmailResult = await confirmEmail(userData);
    return BuildResponse.appResponse(confirmEmailResult);
  }

  public static async getVerifyCode(userData: any, tokenVerify: any) {
    // const userData = useValidation(schemaUser.confirmEmail,userData)
    const result = await getOTP(userData, tokenVerify);
    SendMail.AccountRegister(result);

    if (result) {
      return result;
    }
    return null;
  }
}

export default UserService;
