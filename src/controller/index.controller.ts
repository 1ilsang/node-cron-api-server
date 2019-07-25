import {NextFunction, Request, Response} from 'express';
import {IndexService} from '../service/index.service';
import {IError} from '../interface/IError';
import {IJob} from '../interface/IJob';

export function indexWelcome(req: Request, res: Response): Response {
    return res.status(200).send('Welcome!');
}

// TODO statusCode, import Message
export class jobList {
    public static get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await IndexService
            .getJobList(req.params.seq)
            .then((e: IJob[]) => res.status(200).json(e))
            .catch((e: Error) => {
                let err = new Error(e.message) as IError;
                err.status = 400;
                next(err);
            });
    }
}

export class job {

    public static get = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let ret: IJob;
        try {
            ret = await IndexService.getJob(req.params.seq);
            return res.status(200).json(ret);
        } catch (e) {
            let err = new Error('ISERT JOB fail') as IError;
            err.status = 400;
            next(err);
        }
    };

    public static post = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const ret = await IndexService.createJob(req);
            if(ret) return res.status(200).send('INSERT JOB SUCCESS!');
            else return res.status(400).send('INSERT JOB Fail - Cron');
        } catch (e) {
            let err = new Error('INSERT JOB fail') as IError;
            err.status = 400;
            next(err);
        }
    };

    public static put = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            await IndexService.updateJob(req);
            return res.status(200).send('UPDATE JOB SUCCESS!');
        } catch (e) {
            let err = new Error('UPDATE JOB fail') as IError;
            err.status = 400;
            next(err);
        }
    };

    public static delete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            await IndexService.deleteJob(req.params.seq);
            return res.status(200).send('DELETE JOB SUCCESS!');
        } catch (e) {
            let err = new Error('UPDATE JOB fail') as IError;
            err.status = 400;
            next(err);
        }
    }
}
