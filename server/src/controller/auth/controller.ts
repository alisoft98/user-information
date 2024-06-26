import { Request, Response } from "express";
import BuildResponse from "../../modules/response/app_response";
import routes from "../../routes/public";
import AuthService from "./service";

routes.post(
  `/auth/sign-up`,
  async function signUp(req: Request, res: Response) {
    const formData = req.body;
    const data = await AuthService.signUp(formData);
    const buildResponse = BuildResponse.get(data);
    res.status(buildResponse.code).json(buildResponse);
  }
);

routes.post(
  "/auth/sign-in",
  async function signIn(req: Request, res: Response) {
    const formData = req.body;
    const data = await AuthService.signIn(formData);
    const buildResponse = await BuildResponse.get(data);
    if (buildResponse.statusCode === 400) {
      res.status(buildResponse.statusCode).json(buildResponse);
    } else {
      res.json(buildResponse);
    }
  }
);

// routes.post(
//   `/auth/refresh-token`,
//   Authorization,
//   asyncHandler(async function authRefreshToken(req: Request, res: Response) {
//     const { email, refreshToken } = req.body();
//   })
// );
