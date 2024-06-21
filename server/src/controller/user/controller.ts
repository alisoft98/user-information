import { Request, Response } from "express";
import BuildResponse from "../../modules/response/app_response";
import routes from "../../routes/public";
import UserService from "./sercvice";
import asyncHandler from "../../helper/async-handler";
import { getUniqueCodev2, getUniqueCodev3 } from "../../helper/common";
import jwt from "jsonwebtoken";
import ms from "ms";


const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env;

const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || "1d"; // 1 Days
const JWT_REFRESH_TOKEN_EXPIRED =
  process.env.JWT_REFRESH_TOKEN_EXPIRED || "30d"; // 30 Days

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000;

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
     res.status(result.code).json(result)

  })
);


routes.get(
  "/user/getOTP/:email",
  asyncHandler(async function getOTP(req: Request, res: Response) {
    // const generateToken = {
    //   code: getUniqueCodev2(),
    // };
    // const tokenVerify = jwt.sign(
    //   JSON.parse(JSON.stringify(generateToken)),
    //   JWT_SECRET_ACCESS_TOKEN,
    //   {
    //     expiresIn,
    //   }
    // );
    const formData = req.params.email;
    const verify_code = getUniqueCodev3();
    const result = await UserService.getVerifyCode(formData,verify_code);
    // res.status(result.code).json(result);
    const buildResponse = await BuildResponse.get(result)
    res.json(buildResponse)
  })
);
