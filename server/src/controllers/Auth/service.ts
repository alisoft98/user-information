/* eslint-disable no-unused-vars */

import { Request, Response } from 'express';
import { getAllCountries, getUserByPassword } from '../../bin/app_db';
import useValidation from '../../helpers/useValidation';
import ResponseError from '../../modules/Response/ResponseError';
import schemaAuth from './schema';




class AuthService {
  public static async signIn(req: Request, formData: Response) {
    // const { username, password } = req.body;
    const checkValidation = useValidation(schemaAuth.login, formData)
    const userData = await getUserByPassword(checkValidation.username, checkValidation
      .password
    );

    if (!userData) {
      throw new ResponseError.BadRequest('incorrect email or password!');

    }
    const comparePassword = true
    if (comparePassword) {

      const payloadToken = {
        id: userData?.id,
        username: userData?.username,
        password: userData?.password,
      }

   

      return {
        message: 'Login successfully',
        token_type: 'Bearer',
        user: payloadToken,
      }
    }

  }









  /**
   *
   * @param req - Request
   * @param formData
   */
  public static async getUsers(req: Request) {
    return await getAllCountries()
  }
}
export default AuthService