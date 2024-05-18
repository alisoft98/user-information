import asyncHandler from "../../helper/async-handler";
import BuildResponse from "../../modules/response/app_response";
import routes from "../../routes/public";
import CalendarService from "./service";

routes.post(
  "/insertEvent",
  asyncHandler(async function insertEvent(req: any, res: any) {
    const eventData = req.body;
    const data = await CalendarService.insertEvent(eventData);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);

routes.get(
  "/getEventData",
  asyncHandler(async function getEventData(req: any, res: any) {
    const data = await CalendarService.getEventData();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);
