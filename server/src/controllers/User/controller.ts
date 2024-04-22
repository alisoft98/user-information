import UserService from 'controllers/User/service';
import { Request, Response } from 'express';
import BuildResponse from 'modules/Response/BuildResponse';
import routes from 'routes/public';
import schema from './schema';

require('dotenv').config()


routes.get(
  '/userRoles',
  async function getUserRoles(req: Request<{}>, res: Response<any>) {
    try {
      await schema.userRoles.validate(req.query)
        .catch(error => {
          return res.json(error.message)
        });
      const data = await UserService.getUserRoles(req);
      const buildResponse = BuildResponse.get(data);
      return res.json(buildResponse);
    } catch (error) {
      console.log(error);
    }
  }
);

routes.get(
  '/latestTemplates',
  async function getLatestTemplates(req: Request<{}>, res: Response<any>) {
    try {
      await schema.latestTemplates.validate(req.query)
        .catch(error => {
          return res.json(error.message)
        });
      const data = await UserService.getLatestTemplates(req);
      const buildResponse = BuildResponse.get(data);
      return res.json(buildResponse);
    } catch (error) {
      console.log(error);
    }
  }
);

routes.post(
  '/getAllUserInfo',
  async function getAllUserData(req: Request, res: Response) {
    try {
      const data = req.body.email
      const userData = await UserService.getAllUserInfo(data)
      const buildResponse = await BuildResponse.get(userData);
      return res.json(buildResponse)

    } catch (error) {
      console.log(error);

    }
  }
)