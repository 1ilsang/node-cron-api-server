import {IndexModel} from '../model/index.model';
import {IJob, IJobForm, IJobUpdateForm} from '../interface/IJob';
import {Request} from 'express';

export class IndexService {

    public static getJobList = async (seq?: number): Promise<IJob[]> => {
        if (typeof seq === 'undefined') seq = -1;
        return await IndexModel.getJobList(seq);
    }

    public static getJob = async (seq: number): Promise<IJob> => {
        return await IndexModel.getJob(seq);
    }

    public static createJob = async (req: Request): Promise<boolean> => {
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
        return await IndexModel.insertJob(formData);
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
