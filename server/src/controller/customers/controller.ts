import { Request, Response } from "express";
import { CustomersService } from "./services";
import BuildResponse from "../../modules/response/app_response";
import asyncHandler from "../../helper/async-handler";
import routes from "../../routes/public";

routes.get(
  "/customers",
  asyncHandler(async function getNavItems(req: any, res: any) {
    const data = await CustomersService.getCustomers();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);
