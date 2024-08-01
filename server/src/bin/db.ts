import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import schemaUser from "../controller/user/schema";
import { IAppointment } from "../types/appointment.interface";
import { Menu, Submenu } from "../types/navItem";
import { AppResponse } from "../types/response.interface";
import { ConfirmEmail, CreateUser, User } from "../types/user";
import { RowDataPacket, coreSchema, query } from "./mysql";
import { AdminDTO } from "../models/admin";
import { PatientDTO } from "../models/patients";

// Users
export async function checkUserExist(email: string): Promise<RowDataPacket[]> {
  const user = await query<RowDataPacket[]>(
    `SELECT user_id,email FROM  ${coreSchema}.users
      WHERE email=?`,
    {
      values: [email],
    }
  );
  return user;
}

export async function checkNickName(): Promise<any> {
  const getData = await query<RowDataPacket>(`SELECT * FROM Ali_DB.users`);
  return getData;
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
    (user_id,firstName,lastName,nickName,gender,birthDay,email,phoneNumber,password,signupStatus,verify_code,createdAt,updatedAt,tokenVerify)
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
    return { status: false, message: "code is not correct", code: 400 };
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
  try {
    const user = await query<RowDataPacket[]>(
      `SELECT * FROM ${coreSchema}.users WHERE email=?`,
      {
        values: [email],
      }
    );
    if (user.length < 1) return null;
    const match = await new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(password, user[0].password, (err, isMatch) => {
        if (err) reject(err);
        resolve(isMatch);
      });
    });
    if (!match) return null;
    return user[0] as User;
  } catch (error) {
    console.error("Error fetching user by password:", error);
    throw new Error("Could not fetch user");
  }
}

export async function updateUserVerifyCode(userId: string, newCode: string) {
  const result = await query<RowDataPacket>(
    `
    UPDATE ${coreSchema}.users
    SET verify_code=?,updatedAt=?
    WHERE user_id=?
    `,
    {
      values: [newCode, new Date(), userId],
    }
  );
  const user = await query<RowDataPacket[]>(
    `
      SELECT user_id,email,verify_code
      FROM ${coreSchema}.users
      WHERE user_id=?
      `,
    {
      values: [userId],
    }
  );
  return user[0] as CreateUser;
}

export async function getAdmins() {
  const userAdmin = await query<RowDataPacket[]>(`
    SELECT * FROM ${coreSchema}.admin
    `);
  return userAdmin as AdminDTO[];
}

export async function getOTP(email: any, tokenVerify: any) {
  const updateData = await query<RowDataPacket[]>(
    `UPDATE  ${coreSchema}.users SET verify_code=? WHERE email = ?`,
    {
      values: [tokenVerify, email],
    }
  );

  const result = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.users WHERE email = ?`,
    {
      values: [email],
    }
  );
  return result[0] as User;
}

export async function updateProfileUser(data: User): Promise<any> {
  const updateUsersql = `
      UPDATE ${coreSchema}.users SET
        firstName = ?,
        lastName = ?,
        email = ?,
        address = ?,
        country = ?,
        city = ?,
        state = ?,
        zipcode = ?,
      
    `;
  const updateUservalues = [
    data.firstName,
    data.lastName,
    data.email,
    data.address,
    data.country,
    data.city,
    data.state,
    data.zipcode,
  ];
  const result = await query<RowDataPacket[]>(updateUsersql, updateUservalues);
  const insertSkillSql = `UPDATE ${coreSchema}.user_skill SET (user_id, skill_name) VALUES (?, ?)`;
  for (const skill of data.skills) {
    await query<RowDataPacket[]>(insertSkillSql, [data.user_id, skill]);
  }
  return result;
}

export async function getNavItems() {
  const getManu = await query<RowDataPacket[]>(`
  SELECT
  m.menu_id, 
  m.icon, 
  m.menu_name, 
  m.path, 
  s.submenu_id, 
  s.icon,
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
          icon: row.icon,
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
    `SELECT * FROM ${coreSchema}.patients WHERE email=?`,
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
export async function getPatients() {
  const patients = await query<RowDataPacket[]>(`
  SELECT * FROM ${coreSchema}.patients
  `);
  return patients;
}
export async function addPatient(patientData: PatientDTO) {
  try {
    const result = await query<RowDataPacket[]>(
      `INSERT INTO ${coreSchema}.patients
      (firstName, lastName, gender, mobile, dateOfBirth, age, email, maritalStatus, address,
        bloodGroup, bloodPressure, sugarLevel, injury, profileImage)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        values: [
          patientData.firstName,
          patientData.lastName,
          patientData.gender,
          patientData.mobile,
          patientData.dateOfBirth,
          patientData.age,
          patientData.email,
          patientData.maritalStatus,
          patientData.address,
          patientData.bloodGroup,
          patientData.bloodPressure,
          patientData.sugarLevel,
          patientData.injury,
          patientData.profileImage,
        ],
      }
    );
    return result;
  } catch (error) {
    console.log();
    console.error("Error inserting patient data:", error);
    throw error;
  }
}
export async function deletePatient(id: number) {
  const result = await query<RowDataPacket>(
    `DELETE FROM ${coreSchema}.patients
    WHERE id =?`,
    {
      values: [id],
    }
  );
  return result;
}
