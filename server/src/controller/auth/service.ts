import jwt from "jsonwebtoken";
import ms from "ms";
import { createUser, getUserByPassword } from "../../bin/db";
import { getUniqueCodev2, getUniqueCodev3 } from "../../helper/common";
import useValidation from "../../helper/use_validation";
import ResponseError from "../../modules/error/response_error";
import { CreateUser, User } from "../../types/user";
import UserService from "../user/sercvice";
import schemaAuth from "./schema";
import SendMail from '../../helper/send_email'

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env;

const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || "1d"; // 1 Days
const JWT_REFRESH_TOKEN_EXPIRED =
  process.env.JWT_REFRESH_TOKEN_EXPIRED || "30d"; // 30 Days

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000;



class AuthService {

  public static async signUp(formData: CreateUser) {
    // const currentUser = await UserService.validateUserEmail(formData.email);
    // if (currentUser) {
    //   return { message: "the user already exist !", code: 400, currentUser };
    // }
    const generateToken = {
      code: getUniqueCodev2(),
    };
    const tokenVerify = jwt.sign(
      JSON.parse(JSON.stringify(generateToken)),
      JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn,
      }
    );

    formData.verify_code = getUniqueCodev3();
    formData.tokenVerify = tokenVerify;
    useValidation(schemaAuth.register, formData);
    const newUserId = await createUser(formData);
    if (!newUserId)
      throw new ResponseError.BadRequest("Cannot add user in the database !");
    SendMail.AccountRegister(formData)
    return {
      message:
        null,
      newUser: {
        id: newUserId,
        email: formData.email
      },
    }
  }



  public static async signIn(formData: User) {
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
        id: userData?.id,
        email: userData?.email,
        firstName:userData.firstName,
        lastName:userData.lastName
      };

      return {
        message: "Login successfully",
        token_type: "Bearer",
        payloadToken: payloadToken,
      };
    }
  }

 
}

export default AuthService;
