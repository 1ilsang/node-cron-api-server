import {Request, Response, NextFunction} from 'express';
import * as cron from 'node-cron';
import * as os from 'os';

export function test(req: Request, res: Response, next: NextFunction) {
    console.info('Cron Test!', new Date());
    // info https://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for
    const used = process.memoryUsage();
    console.info(`Memory\nTotal: ${Math.round(os.totalmem() / 1024 / 1024 * 100) / 100} MB, Free: ${Math.round(os.freemem() / 1024 / 1024 * 100) / 100} MB`);
    for (const key in used) console.info(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    // cron.schedule('* * * * *', () => {
    //     console.info('cron job!');
    // });
    res.status(200).send('good');
}
