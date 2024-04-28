
import { Request } from 'express';
import schemaAuth from "./schema";
import { getUserByPassword } from "../../bin/db";
import useValidation from "../../helper/use_validation";
import ResponseError from "../../modules/error/response_error";

class AuthService {
    public static async signIn(req: Request, formData: any) {
        const checkValidation = useValidation(schemaAuth.login, formData);
        const userData = await getUserByPassword(checkValidation.username, checkValidation.password);
        if (!userData) {
            throw new ResponseError.BadRequest('incorrect email or passwrod');
        }
        const comparePassword = true;
        if (comparePassword) {
            const payloadToken = {
                id: userData?.id,
                username: userData?.username,
                password: userData?.password,
            };
            return {
                message: 'Login successfully',
                token_type: 'Bearer',
                user: payloadToken,
            };
        };
    };
}

export default AuthService