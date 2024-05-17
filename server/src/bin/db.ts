import { User } from "../types/user";
import { AppResponse } from "../types/response.interface";
import { RowDataPacket, coreSchema, query } from "./mysql";

export async function getUserByPassword(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const userData = await query<RowDataPacket[]>(
      `SELECT * FROM mydb.users WHERE email=?`,
      {
        values: [email],
      }
    );
    const storedPassword = userData[0].password;

    if (userData.length < 1) {
      return null; // User not found
    } else if (password !== storedPassword) {
      return null;
    } else {
      return userData[0] as User;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export async function getNavItems() {
  const getManu = await query<RowDataPacket[]>(
    `SELECT m.menu_id, m.menu_name, m.url, s.submenu_id, s.submenu_name, s.url FROM 
      ${coreSchema}.menu m
      LEFT JOIN 
       ${coreSchema}.submenu s ON m.menu_id = s.menu_id`
  );
  return getManu;
}

// export async function insertEventDb(eventData: any) {
//   try {
//     const values = [
//       eventData.event_title,
//       eventData.color,
//       eventData.date,
//       eventData.event_description,
//     ];
//     const insertEvent = await query<RowDataPacket[]>(
//       `INSERT INTO ${coreSchema}.calendar_events (event_title, color ,date, event_description)
//       VALUES (?, ?, ?, ?)`,
//       values
//     );
//     return insertEvent;
//   } catch (error) {
//     throw new Error(`Error inserting event:${error}`);
//   }
// }

export async function insertEventDb(eventData: any) {
  try {
    const insertEvent = await query<RowDataPacket[]>(
      `INSERT INTO ${coreSchema}.calendar_events 
      (event_title, color, date, event_description)
       VALUES (?, ?, ?, ?)`,
      {
        values: [
          eventData.event_title,
          eventData.color,
          eventData.date,
          eventData.event_description,
        ],
      }
    );

    return insertEvent;
  } catch (error) {
    throw new Error(`Error inserting event: ${error}`);
  }
}
