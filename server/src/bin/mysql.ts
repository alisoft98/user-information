import { OkPacket, PoolConnection, RowDataPacket } from "mysql2";
import * as dotenv from "dotenv";
import * as mysql from "mysql2/promise";


dotenv.config();

const coreSchema = process.env.DB_DATABASE;

export { OkPacket, RowDataPacket, coreSchema };

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 20,
    queueLimit: 0,
    charset: "utf8",
    timezone: process.env.DB_TIMEZONE
});
// eslint-disable-next-line no-param-reassign
pool.on('connection', (connection): void => {
    connection.config.namedPlaceholders = true
})

export {
    pool,
    mysql
}

export async function query<T extends RowDataPacket[] | OkPacket | any>(sql: string, options: {
    connection?: any;
    nestTables?: boolean;
    values?: any[] | any;
} = {}, attempt: number = 0): Promise<T> {
    const useExternalConnection = Boolean(options.connection);
    const connection = options.connection || await pool.getConnection();

    let result;
    let sqlQuery = sql;



    try {
        sqlQuery = connection.format(sql, options.values);

        [result] = await connection.query({
            sql,
            values: options.values,
            nestTables: options.nestTables,
        });

        if (!result) {
            result = [];
        }

    } catch (e: any) {
        e.message = `${e.code}\nsql: ${sqlQuery}\nerror: ${e.message}\ntime: }`;


        throw e;
    } finally {
        if (!useExternalConnection) {
            connection.release();
        }
    }

    return result as T;
}