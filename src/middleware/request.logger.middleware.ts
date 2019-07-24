import * as express from 'express';

// Like morgan
const requestLoggerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const start = new Date().getTime();
    res.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        console.info(`${req.method} ${req.originalUrl} \u001b[32m${res.statusCode} \u001b[33m${elapsed}ms\u001b[0m`);
    });
    next();
};

export {requestLoggerMiddleware};
