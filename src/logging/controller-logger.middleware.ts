import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { LoggingService } from './logging.service';

@Injectable()
export class ControllerLoggerMiddleware implements NestMiddleware {

    constructor(private readonly logger: LoggingService) {}

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.setContext(req.baseUrl);
        res.on('finish', () => {
            const logMessage = [
                `${res.statusCode}`,
                req.method,
                req.path,
                `query: ${JSON.stringify(req.query)}`,
                `body: ${JSON.stringify(req.body)}`,
            ].join(' ');

            if (res.statusCode < 400) {
                this.logger.log(logMessage);
            }
        });

        next();
    }

}
