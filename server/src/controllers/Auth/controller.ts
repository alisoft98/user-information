import AuthService from 'controllers/Auth/service';
import { Request, Response } from 'express';
import asyncHandler from 'helpers/asyncHandler';
import BuildResponse from 'modules/Response/BuildResponse';
import routes from 'routes/public';

require('dotenv').config()



routes.post(
  '/auth/sign-in',
  async function signIn(req: Request<{}>, res: Response<any>) {
    try {
      const formData = req.body;
      const data = await AuthService.signIn(req, formData);
      const buildResponse = BuildResponse.get(data);
      return res.json(buildResponse);
    } catch (error) {
      console.log(error);
    }
  }
);
routes.get(
  '/users',
  async function getUsers(req: Request<{}>, res: Response<any>) {
    try {
      
      const data = await AuthService.getUsers(req);
      const buildResponse = BuildResponse.get(data);
      return res.json(buildResponse);
    } catch (error) {
      console.log(error);
    }
  }
);