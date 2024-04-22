
import { AppResponse } from 'interfaces/response.model';
import { RowDataPacket, coreSchema, query } from './mysql';
import { User } from 'models/user';

// BASIC INFO
export async function getAllCountries() {
  const countries = await query<RowDataPacket[]>(`
        SELECT id,name
        FROM  ${coreSchema}.user
        ORDER BY name LIMIT 0, 10
        `);
  return { data: countries, isSuccessfull: true, message: "the list of countries" } as AppResponse;
}


export async function getUserRoles(userId: string) {
  const userRoles = await query<RowDataPacket[]>(`
        SELECT r.name AS roleName, b.name AS branchName, s.name AS schoolName, 
        ur.assignment_date AS assignmentDate, ur.update_date AS updateDate 
        FROM ${coreSchema}.user_role ur 
        INNER JOIN ${coreSchema}.user u ON u.id = ur.user_id
        INNER JOIN ${coreSchema}.role r ON r.id = ur.role_id
        LEFT JOIN ${coreSchema}.branch b ON b.id = ur.branch_id
        LEFT JOIN ${coreSchema}.school s ON s.id = ur.school_id
        WHERE u.id='${userId}' AND ur.disabled = 0 AND ur.archived = 0 
        ORDER BY r.name, b.name, s.name
        `);
  return { data: userRoles, isSuccessfull: true, message: "the list of user roles" } as AppResponse;
}

export async function getLatestTemplates(userId: string) {
  const latestTemplates = await query<RowDataPacket[]>(`
        SELECT t.id, t.name as name, tt.name as templateType, t.description, 
        s.name as segment, es.name as educationSystem, asst.name as assestmentType, 
        casst.name as createAssestmentType, lvl.name as level, sub.name as subject, sch.name as school, 
        IF(t.is_disabled = 1, 'deleted', t.status) as status, 
        t.creation_date as creationDate, t.update_date as updateDate 
        FROM school_curriculum_builder_v3.template t
        LEFT JOIN school_curriculum_builder_v3.template_type tt ON tt.id = t.type_id 
        LEFT JOIN school_core_v3.segment s ON s.id = t.segment_id 
        LEFT JOIN school_curriculum_builder_v3.education_system es ON es.id = t.education_system_id 
        LEFT JOIN school_curriculum_builder_v3.assessment_type asst ON asst.id = t.assessment_type_id 
        LEFT JOIN school_curriculum_builder_v3.assessment_type casst ON casst.id = t.create_assessment_type_id 
        LEFT JOIN school_core_v3.level lvl ON lvl.id = t.level_id 
        LEFT JOIN school_core_v3.subject sub ON sub.id = t.subject_id 
        LEFT JOIN school_core_v3.school sch ON sch.id = t.school_id 
        WHERE t.creator_user_id = ${userId} ORDER BY t.update_date DESC LIMIT 15;
  `);
  return { data: latestTemplates, isSuccessfull: true, message: "the list of latest templates" } as AppResponse;
}

export async function getUserByPassword(username: string, password: string) {
  const userData = await query<RowDataPacket[]>(`
      SELECT * FROM ${coreSchema}.support_user 
      WHERE username=?`, {
    values: [username]
  });
  const storedPassword = userData[0].password;

  if (userData.length < 1) {
    return null; // User not found
  } else if (password !== storedPassword) {
    return null
  } else {
    return userData[0] as User
  }
}

export async function getUserByEmail(email: string) {

  const user = await query<RowDataPacket[]>(
    `SELECT id,external_id, name, surname, middle_name, activated, disabled, activation_date, email, birthday, address, gender 
    FROM ${coreSchema}.user 
    WHERE email = ?`, {
    values: [email]
  });
  return {
    data: user,
    isSuccessfull: true,
    message: "the list of user roles"
  } as AppResponse;

}


