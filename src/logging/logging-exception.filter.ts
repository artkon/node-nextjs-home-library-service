import { Catch, ArgumentsHost, HttpException, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggingService } from './logging.service';


@Catch()
export class LoggingExceptionFilter implements ExceptionFilter {
    private static readonly logger = new LoggingService('ExceptionsHandler');

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const isHttpException = exception instanceof HttpException;
        const status = isHttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const logMessage = [
            status,
            request.method,
            request.path,
            exception?.message,
            `query: ${JSON.stringify(request.query)}`,
            `body ${JSON.stringify(request.body)}`
        ].join(' ');
        isHttpException
            ? LoggingExceptionFilter.logger.log(logMessage)
            : LoggingExceptionFilter.logger.error(logMessage);

        const responseMessage = isHttpException ? exception?.message : 'Internal server error';

        response
            .status(status)
            .json({
                statusCode: status,
                message: responseMessage || 'Internal server error',
                path: request.url,
            });
    }
}
