import routes from '../../routes/public';
import { Request, Response } from 'express';
import AuthService from './service';
import BuildResponse from '../../modules/response/app_response';

require('dotenv').config()



routes.post(
    '/auth/sign-in',
    async function signIn(req, res) {
      try {
        const formData = req.body;
        const data = await AuthService.signIn( formData);
        const buildResponse = BuildResponse.get(data);
        return res.json(buildResponse);
      } catch (error) {
        console.log(error);
      }
    }
  );


// routes.post(
//     '/auth/sign-in',
//     async function signIn(req: Request, res: Response) {
//         const formData = req.body;
//         const data = await AuthService.signIn(formData);
//         const buildResponse = BuildResponse.get(data);
//         return res.json(buildResponse);
//     }
// )