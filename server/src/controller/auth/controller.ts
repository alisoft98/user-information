import AuthService from './service';
import routes from '../../routes/public';
import { Request, Response } from 'express';
import BuildResponse from '../../modules/response/app_response';


routes.post(
  '/auth/sign-in',
  async function signIn(req: Request, res: Response) {
    try {
      const formData = req.body;
      const data = await AuthService.signIn(req, formData);
      const buildResponse = BuildResponse.get(data);
      return res.json(buildResponse);
    } catch (error) {
    }
  }
);
