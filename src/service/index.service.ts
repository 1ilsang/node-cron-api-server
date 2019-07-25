import {IndexModel} from '../model/index.model';
import {IJob, IJobForm, IJobUpdateForm} from '../interface/IJob';
import {Request} from 'express';
import {setOsUsageCron} from '../controller/os.usage.controller';
import {setMailSenderCron} from '../controller/mail.controller';
import {setBackupDBCron} from '../controller/db.controller';
import {setTimeLogCron} from '../controller/time.log.controller';

/**
 * @description createJob 에서 실질적인 cron 작업들이 일어나게 된다.
 * @return Promise<>
 */
export class IndexService {

    public static getJobList = async (seq?: number): Promise<IJob[]> => {
        if (typeof seq === 'undefined') seq = -1;
        return await IndexModel.getJobList(seq);
    }

    public static getJob = async (seq: number): Promise<IJob> => {
        return await IndexModel.getJob(seq);
    }

    public static createJob = async (req: Request): Promise<boolean> => {
        let type: string = req.body.type;
        const formData: IJobForm = {
            craeted: new Date(),
            runtime: new Date(
                req.body.year,
                Number(req.body.month) - 1,
                req.body.day,
                req.body.hour,
                req.body.minute
            ),
            type: req.body.type,
            isloop: req.body.isLoop
        };

        let fn;
        // TODO mail-sender, db-backup
        if (type === 'mail') fn = setMailSenderCron;
        else if (type === 'backup') fn = setBackupDBCron;
        else if (type === 'os') fn = setOsUsageCron;
        else if(type ===  'time') fn = setTimeLogCron;

        const first: boolean = await IndexModel.insertJob(formData);
        const second: boolean = await fn(req);
        if (first && second) return true;
        // TODO 두개 다 동시에 안됐을 경우 rollback 작업 추가해줘야함.
        else return false;
    }

    public static updateJob = async (req: Request): Promise<boolean> => {
        const formData: IJobUpdateForm = {
            seq: req.body.seq,
            runtime: new Date(
                req.body.year,
                Number(req.body.month) - 1,
                req.body.day,
                req.body.hour,
                req.body.minute
            ),
            type: req.body.type,
            isloop: req.body.isLoop
        };
        return await IndexModel.updateJob(formData);
    }

    public static deleteJob = async (seq: number): Promise<boolean> => {
        return await IndexModel.deleteJob(seq);
    }
}
