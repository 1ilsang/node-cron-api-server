import {createPool} from 'mysql2/promise';
import {conf} from '../config/dbConfig';

const pool = createPool(conf);

export class Mysql {
    public static connect = (fn) => async (...args: any) => {
        const con: any = await pool.getConnection();
        const result = await fn(con, ...args).catch((error) => {
            con.connection.release();
            throw error;
        });
        con.connection.release();
        return result;
    }

    public static transaction = (fn) => async (...args: any) => {
        const con: any = await pool.getConnection();
        await con.connection.beginTransaction();
        const result = await fn(con, ...args).catch(async (error) => {
            await con.rollback();
            con.connection.release();
            throw error;
        });
        await con.commit();
        con.connection.release();
        return result;
    }
}
