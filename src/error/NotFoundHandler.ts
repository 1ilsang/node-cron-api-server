import {NextFunction, Request, Response} from 'express';
import {IError} from '../interface/IError';

export default function(req: Request, res: Response, next: NextFunction): void {
    let err = new Error('404 Not Found') as IError;
    err.status = 404;
    next(err);
};
