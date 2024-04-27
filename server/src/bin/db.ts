import { User } from "../types/user";
import { AppResponse } from "../types/response.interface";
import { RowDataPacket, coreSchema, query } from "./mysql";



export async function getUserByPassword(username: string, password: string) {
    const userData = await query<RowDataPacket[]>(
        `SELECT FROM ${coreSchema}.support_user
        WHERE password=?`, {
        values: [password]
    });
    const storedPassword = userData[0].password;
    if (userData.length < 1) {
        return null;
    } else if (password !== storedPassword) {
        return null
    } else {
        return userData[0] as User
    }

}

export async function getAllCountries() {
    const countries = await query<RowDataPacket[]>(
        `SELECT id,name
        FROM ${coreSchema}.user
        ORDER BY name LIMIT 0,10`
    );
    return { data: countries, isSuccessfull: true, message: 'The list of countries' } as AppResponse
}


export async function getUserRoles(userId: string) {
    const userRoles = await query<RowDataPacket[]>(`
    SELECT r.name AS roleName,b.name AS branchName,s.name AS schollName,
    ur.assignment_date AS assignmentDate,ur.update_date AS updateDate
    FROM ${coreSchema}.user_role ur
    INNER JOIN ${coreSchema}.user u ON u.id = ur.user_id
    INNER JOIN ${coreSchema}.role r ON r.id = ur.role_id
    LETT JOIN ${coreSchema}.branch b ON b.id = ur.branch_id
    LEFT JOIN ${coreSchema}.school s ON s.id = ur.school_id
    WHERE u.id ='${userId}'AND ur.disabled = 0 AND ur.archived =0
    ORDER BY r.name,b.name,s.name
    `);

    return { data: userRoles, isSuccessfull: true, message: "the list of user roles" } as AppResponse;

}
