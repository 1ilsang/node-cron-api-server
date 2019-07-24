import {conf} from '../config/dbConfig';

const mysql = require('mysql2');

const originPool = mysql.createPool(conf);
const pool = originPool.promise();

export class Mysql {
    public static connect = async (SQL, data) => {
        const con: any = await pool.getConnection();
        let result;
        try {
            result = await con.query(SQL, data);
        } catch (e) {
            throw Error;
        } finally {
            con.connection.release();
        }
        return result;
    }
}
