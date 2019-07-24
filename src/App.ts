import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';

import { Application } from 'express';
import { requestLoggerMiddleware } from './middleware/request.logger.middleware';

import IndexRoutes from './routes/index.route';
import CronRoutes from './routes/cron.route';
import NotFoundHandler from './error/NotFoundHandler';
import ErrorHandler from './error/ErrorHandler';

export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

    public async listen() {
        await this.app.listen(this.app.get('port'));
        console.info(`Server on port \u001b[32m${this.app.get(`port`)}\u001b[0m.`);
    }

    private settings() {
        this.app.set('port', process.env.PORT || this.port || 3000);
    }

    private middleware() {
        this.app.use(cors());
        this.app.use(bodyparser.json());
        this.app.use(requestLoggerMiddleware);
    }

    private routes() {
        this.app.use(IndexRoutes);
        this.app.use('/cron', CronRoutes);
        this.app.use(NotFoundHandler);
        this.app.use(ErrorHandler);
    }
}
