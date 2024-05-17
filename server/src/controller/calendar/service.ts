import { insertEventDb } from "../../bin/db";
import BuildResponse from "../../modules/response/app_response";

class CalendarService {
  public static async insertEvent(eventData: Response) {
    const data = await insertEventDb(eventData);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return buildResponse;
    }
  }
}
export default CalendarService;
