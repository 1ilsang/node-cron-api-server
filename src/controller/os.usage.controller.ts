import {IJobForm} from '../interface/IJob';
import * as cron from 'node-cron';
import {Request} from 'express';
import * as os from 'os';

export async function setOsUsageCron(req: Request) {
    const HEADER = `Memory\nTotal: ${Math.round(os.totalmem() / 1024 / 1024 * 100) / 100} MB, Free: ${Math.round(os.freemem() / 1024 / 1024 * 100) / 100} MB`;
    let BODY = '';
    const used = process.memoryUsage();
    for (const key in used) BODY += `${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB\n`;

    if (!req.body.isLoop) console.info(`${HEADER}\n${BODY}`);
    else cron.schedule(
        `0-59 
        ${req.body.minute === 0 ? '*' : req.body.minute} 
        ${req.body.hour === 0 ? '*' : req.body.hour} 
        ${req.body.day === 0 ? '*' : req.body.day} 
        ${req.body.month === 0 ? '*' : req.body.month}`, () => {
            console.info(`Cron job start!\n${HEADER}\n${BODY}`);
        });
    return true;
}
