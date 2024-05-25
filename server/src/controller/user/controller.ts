import schema from './schema';
import UserService from './sercvice';
import routes from '../../routes/public';
import { Request, Response } from 'express';
import BuildResponse from '../../modules/response/app_response';

// getAllUserInfo
routes.post(
  '/getUserInfo',
  async function getAllUserData(req: Request, res: Response) {
    try {
      const data = req.body.email
      const userData = await UserService.getUserInfo(data)
      const buildResponse = await BuildResponse.get(userData);
      return res.json(buildResponse)

    } catch (error) {
      console.log(error);

    }
  }
);

// userRoles
// routes.get(
//   '/userRoles',
//   async function getUserRoles(req: Request<{}>, res: Response<any>) {
//     try {
//       await schema.userRoles.validate(req.query)
//         .catch(error => {
//           return res.json(error.message)
//         });
//       const data = await UserService.getUserRoles(req);
//       const buildResponse = BuildResponse.get(data);
//       return res.json(buildResponse);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// latestTemplates
// routes.get(
//   '/latestTemplates',
//   async function getLatestTemplates(req: Request<{}>, res: Response<any>) {
//     try {
//       await schema.latestTemplates.validate(req.query)
//         .catch(error => {
//           return res.json(error.message)
//         });
//       const data = await UserService.getLatestTemplates(req);
//       const buildResponse = BuildResponse.get(data);
//       return res.json(buildResponse);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
