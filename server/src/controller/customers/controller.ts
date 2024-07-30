import asyncHandler from "../../helper/async-handler";
import BuildResponse from "../../modules/response/app_response";
import routes from "../../routes/public";
import { CustomersService } from "./services";

routes.get(
  "/patients",
  asyncHandler(async function getNavItems(req: any, res: any) {
    const data = await CustomersService.getPatients();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);
