import { ConsoleLogger, ConsoleLoggerOptions, Injectable } from '@nestjs/common';
import { appendFile, stat, readdir } from 'node:fs/promises';
import process from 'process';


const LOG_LEVELS = {
    error: 0,
    warn: 1,
    log: 2,
    debug: 3,
    verbose: 4,
};

const logsDirPath = '/log';
const getLogFilePath = (num: number, isError?: boolean): string => `${logsDirPath}/${isError ? 'error' : 'log'}${num ? num : 1}.txt`;

@Injectable()
export class LoggingService extends ConsoleLogger {
    constructor(
        context: string,
        options?: ConsoleLoggerOptions,
    ) {
        super(context, options);
    }

    private readonly loggingLevel = LOG_LEVELS[process.env.LOG_LEVEL || 'log'];

    async writeToFile(logMessage: string, isError?: boolean) {
        const files = await readdir(logsDirPath);
        const currentFileNumber = files.filter(file => file.includes(isError ? 'error' : 'log')).length;
        let currentLogFilePath = getLogFilePath(currentFileNumber, isError);
        let logFileSizeKb: number;
        try {
            logFileSizeKb = (await stat(currentLogFilePath)).size / 1024;
        } catch {
            logFileSizeKb = 0
        }
        if (logFileSizeKb > Number(process.env.LOG_FILE_ROTATION_KB)) {
            currentLogFilePath = getLogFilePath(currentFileNumber + 1, isError);
        }
        const date = new Date;
        const dateTimeString = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()} | `;
        await appendFile(currentLogFilePath, dateTimeString + logMessage + '\n');
    }

    error(message: string) {
        if (this.loggingLevel < LOG_LEVELS.error) {
            return;
        }

        super.error(message);
        this.writeToFile(message, true);
    }

    warn(message: string) {
        if (this.loggingLevel < LOG_LEVELS.warn) {
            return;
        }

        super.warn(message);
        this.writeToFile(message);
    }

    log(message: string) {
        if (this.loggingLevel < LOG_LEVELS.log) {
            return;
        }

        super.log(message);
        this.writeToFile(message);
    }

    debug(message: string) {
        if (this.loggingLevel < LOG_LEVELS.debug) {
            return;
        }

        super.debug(message);
        this.writeToFile(message);
    }

    verbose(message: string) {
        if (this.loggingLevel < LOG_LEVELS.verbose) {
            return;
        }

        super.verbose(message);
        this.writeToFile(message);
    }
}
