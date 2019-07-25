import {IJob, IJobForm, IJobUpdateForm} from '../interface/IJob';
import {Mysql as mysql} from '../util/database.util';

export class IndexModel {
    public static getJobList = async (seq: number): Promise<IJob[]> => {
        const SQL = `
            SELECT      *
            FROM        job
            WHERE       seq ${seq === -1 ? '>' : '<'} ?
            ORDER BY    seq DESC
            LIMIT       5
            `;
        const SQL_VALUE = [seq];
        let ret = await mysql.connect(SQL, SQL_VALUE);
        return ret[0];
    }

    public static async insertJob(formData: IJobForm): Promise<boolean> {
        const SQL = `
            INSERT INTO job(created, runtime, type, isloop)
            VALUES      (?, ?, ?, ?)
        `;
        const data = Object.values(formData);
        return await mysql.connect(SQL, data);
    }

    public static async getJob(seq: number): Promise<IJob> {
        let ret;
        const SQL = `
            SELECT  *
            FROM    job
            WHERE   seq = ?
        `;
        ret = await mysql.connect(SQL, seq);
        return ret[0];
    }

    public static async updateJob(formData: IJobUpdateForm): Promise<boolean> {
        const SQL = `
            UPDATE  job
            SET     runtime = ?,
                    type = ?,
                    isloop = ?
            WHERE   seq = ?
        `;
        const {runtime, type, isloop, seq} = formData;
        const SQL_VALUES = [runtime, type, isloop, seq];
        await mysql.connect(SQL, SQL_VALUES);
        return true;
    }

    public static async deleteJob(seq: number): Promise<boolean> {
        const SQL = `
            DELETE FROM job
            WHERE       seq = ?
        `;
        await mysql.connect(SQL, seq);
        return true;
    }
}
