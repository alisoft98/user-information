import { Request, Response } from "express";
import BuildResponse from "../../modules/response/app_response";
import routes from "../../routes/public";
import UserService from "./sercvice";
import asyncHandler from "../../helper/async-handler";

// getAllUserInfo
routes.post(
  "/getUserInfo",
  async function getAllUserData(req: Request, res: Response) {
    try {
      const data = req.body.email;
      const userData = await UserService.getUserInfo(data);
      const buildResponse = await BuildResponse.get(userData);
      return res.json(buildResponse);
    } catch (error) {
      console.log(error);
    }
  }
);

routes.post(
  "/user/confirm",
  asyncHandler(async function confirmEmail(req: Request, res: Response) {
    const formData = req.body;
    const result = await UserService.confrimEmail(formData);
    res.status(result.code).json(result);
  })
);
