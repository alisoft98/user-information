import { getEventDb, insertEventDb } from "../../bin/db";
import BuildResponse from "../../modules/response/app_response";

class CalendarService {
  public static async insertEvent(eventData: Response) {
    const data = await insertEventDb(eventData);
    if (data) {
      return data;
    }
  }

  public static async getEventData() {
    const data = await getEventDb();
    if (data) {
      return data;
    }
  }
}
export default CalendarService;
