import {NextFunction, Request, Response} from 'express';
import {IError} from '../interface/IError';

export default function (err: IError, req: Request, res: Response, next: NextFunction): Response {
    return res.status(err.status || 500).json({message: err.message, data: err.data});
};
