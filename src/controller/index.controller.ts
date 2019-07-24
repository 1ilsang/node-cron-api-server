import {Request, Response} from 'express';

export function indexWelcome(req: Request, res: Response): Response {
    return res.status(200).send('Welcome!');
}

export class jobList {
    public static get = (req: Request, res: Response): Response => {
        return res.send('jobList-get');
    }
}

export class job {

    public static get = (req: Request, res: Response): Response => {
        return res.send('job-get');
    };

    public static post = (req: Request, res: Response): Response => {
        return res.send('job-post');
    };

    public static put = (req: Request, res: Response): Response => {
        return res.send('job-put');
    };
}
