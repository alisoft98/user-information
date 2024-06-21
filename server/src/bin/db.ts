import { IAppointment } from "../types/appointment.interface";
import { ConfirmEmail, CreateUser, Register, User } from "../types/user";
import { Menu, Submenu } from "../types/navItem";
import { RowDataPacket, coreSchema, query } from "./mysql";
import schemaUser from "../controller/user/schema";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { AppResponse } from "../types/response.interface";

// Users
export async function checkUserExist(email: string): Promise<RowDataPacket[]> {
  const user = await query<RowDataPacket[]>(
    `SELECT id,email FROM  ${coreSchema}.users
      WHERE email=?`,
    {
      values: [email],
    }
  );
  return user;
}

export async function createUser(data: any) {
  const { password } = data;
  const { confirmPassword } = data;
  const fdPassword = { password, confirmPassword };
  const validPassword = schemaUser.createPassword.validateSyncAt(
    "confirmPassword",
    fdPassword
  );
  const saltRounds = 10;
  const hash = bcrypt.hashSync(validPassword, saltRounds);
  const newId = uuidv4();

  const result = await query<RowDataPacket>(
    `INSERT INTO ${coreSchema}.users
    (id,firstName,lastName,nickName,gender,birthDay,email,phoneNumber,password,signupStatus,verify_code,createdAt,updatedAt,tokenVerify)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    {
      values: [
        newId,
        data.firstName,
        data.lastName,
        data.nickName,
        data.gender,
        data.birthDay,
        data.email,
        data.phoneNumber,
        hash,
        0,
        data.verify_code,
        new Date(),
        new Date(),
        data.tokenVerify,
      ],
    }
  );
  return result;
}

export async function confirmEmail(data: ConfirmEmail) {
  const result = await query<RowDataPacket[]>(
    `
    SELECT * 
    FROM ${coreSchema}.users
    WHERE email=? AND deletedAt IS NULL
    `,
    {
      values: [data.email],
    }
  );
  if (result.length < 1)
    return {
      isSuccessfull: false,
      status: 1,
      message: "user not found!",
    } as AppResponse;
  const user = result[0] as User;
  if (user.email !== data.email)
    return {
      isSuccessfull: false,
      status: 1,
      message: "email is not correct",
    } as AppResponse;
  if (user.emailConfirmed) {
    if (user.signupStatus === 1) {
      const result = await query<RowDataPacket[]>(
        `
        UPDATE ${coreSchema}.users
        SET signupStatus=?,emailConfirmed=?,updatedAt=?
        WHERE email =?
        `,
        {
          values: [1, 1, new Date(), data.email],
        }
      );
    }
    return {
      isSuccessfull: true,
      message: "email already confirmed",
    } as AppResponse;
  }
  if (user.verify_code !== data.verify_code)
    return { status: false, message: "code is not correct",code:400 };
  await query<RowDataPacket[]>(
    `
    UPDATE ${coreSchema}.users
    SET emailConfirmed=1, signupStatus=2,updatedAt=?
    WHERE email=?
  `,
    {
      values: [new Date(), data.email],
    }
  );
  return {
    isSuccessfull: true,
    showToUser: true,
    messageCode: "MSG_01",
    messageKind: 1,
    message: "email confirmed successfully",
  } as AppResponse;
}

export async function getUserByPassword(
  email: string,
  password: string
): Promise<User | null> {
  const userData = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.users WHERE email=?`,
    {
      values: [email],
    }
  );
  return userData[0] as User;
}
export async function getOTP(email: any, tokenVerify: any) {
  const updateData = await query<RowDataPacket[]>(
    `UPDATE  ${coreSchema}.users SET verify_code=? WHERE email = ?`,
    {
      values: [tokenVerify,email],
    }
  );
  // const res = await query<RowDataPacket[]>(
  //   `SELECT Ali_DB.users SET verify_code=${tokenVerify}  WHERE email = ?`,
  //   {
  //     values: [email],
  //   }
  // );
  const result = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.users WHERE email = ?`,
    {
      values: [email],
    }
  );
  return result[0] as User;

}

// export async function getOTP(email: string) {
//   const userData = await query<RowDataPacket>(
//     `SELECT verify_code ${coreSchema}.users WHERE email=?`,
//     {
//       values: [email],
//     }
//   );
//   return userData[0];
// }

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
