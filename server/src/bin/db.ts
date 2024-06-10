import { IAppointment } from "../types/appointment.interface";
import { User } from "../types/user";
import { Menu, Submenu } from "../types/navItem";
import { RowDataPacket, coreSchema, query } from "./mysql";

export async function getUserByPassword(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const userData = await query<RowDataPacket[]>(
      `SELECT * FROM ${coreSchema}.users WHERE email=?`,
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
  const getManu = await query<RowDataPacket[]>(`
  SELECT
  m.menu_id, 
  m.icon, 
  m.menu_name, 
  m.path, 
  s.submenu_id, 
  s.submenu_name, 
  s.url
FROM 
  ${coreSchema}.menu m
LEFT JOIN 
  ${coreSchema}.submenu s ON m.menu_id = s.menu_id
ORDER BY 
  m.menu_id, s.submenu_id;
  `);

  try {
    const menuMap = new Map<number, Menu>();

    getManu.forEach((row) => {
      const menuId = row.menu_id;
      if (!menuMap.has(menuId)) {
        menuMap.set(menuId, {
          menu_id: row.menu_id,
          icon: row.icon,
          menu_name: row.menu_name,
          path: row.path,
          submenus: [],
        });
      }

      if (row.submenu_id) {
        const submenu: Submenu = {
          submenu_id: row.submenu_id,
          submenu_name: row.submenu_name,
          url: row.url,
        };
        menuMap.get(menuId)?.submenus.push(submenu);
      }
    });

    return Array.from(menuMap.values());
  } catch (error) {
    console.error("Error fetching navigation items:", error);
    throw error;
  }
}

export async function getUserInfo(email: string) {
  const data = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.user_info WHERE email=?`,
    {
      values: [email],
    }
  );
  if (data) return data;
}

export async function saveAppointment(eventData: IAppointment) {
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

export async function getAppointment() {
  const getEventData = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.calendar_events`
  );
  return getEventData;
}

export async function updateAppointment(
  data: IAppointment
): Promise<IAppointment[] | undefined> {
  const result = await query<RowDataPacket[]>(
    `UPDATE ${coreSchema}.calendar_events
    SET date = ?, updated_at = ?
    WHERE event_id = ?`,
    {
      values: [data.date, new Date(), data.event_id],
    }
  );
  if (result) {
    return result as IAppointment[];
  }
}

export async function deleteAppointment(event_id: string) {
  const result = await query<RowDataPacket[]>(
    `DELETE FROM ${coreSchema}.calendar_events
      WHERE event_id=?`,
    {
      values: [event_id],
    }
  );
  return result;
}

export async function getCustomers() {
  const customers = await query<RowDataPacket[]>(`
  SELECT * FROM ${coreSchema}.user_info
  `);
    return customers;
}
