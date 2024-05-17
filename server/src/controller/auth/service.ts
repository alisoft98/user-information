import { getUserByPassword } from "../../bin/db";
import useValidation from "../../helper/use_validation";
import ResponseError from "../../modules/error/response_error";
import schemaAuth from "./schema";

class AuthService {
  public static async signIn(formData: any) {
    // const { username, password } = req.body;
    const checkValidation = useValidation(schemaAuth.login, formData);
    const userData = await getUserByPassword(
      checkValidation.email,
      checkValidation.password
    );

    if (!userData) {
      throw new ResponseError.BadRequest("incorrect email or password!");
    }
    const comparePassword = true;
    if (comparePassword) {
      const payloadToken = {
        id: userData?.user_id,
        username: userData?.email,
        password: userData?.password,
      };

      return {
        message: "Login successfully",
        token_type: "Bearer",
        payloadToken:payloadToken
      };
    }
  }
}

export default AuthService;
