import {Request} from 'express';
import * as cron from 'node-cron';

export async function setTimeLogCron(req: Request) {
    if (!req.body.isLoop) console.info(new Date());
    else cron.schedule(
        `0-59 
        ${req.body.minute === 0 ? '*':req.body.minute} 
        ${req.body.hour === 0 ? '*':req.body.hour} 
        ${req.body.day === 0 ? '*' : req.body.day} 
        ${req.body.month === 0 ? '*' : req.body.month}`, () => {
            console.info(`Cron job start!\n${new Date()}`);
        });
    return true;
}
