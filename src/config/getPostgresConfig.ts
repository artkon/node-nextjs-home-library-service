import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import process from 'process';
import { FileLogger } from 'typeorm';


export const getPostgresConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    logger: new FileLogger(true, { logPath: './typeorm/db.log' }),
    autoLoadEntities: true,
    migrations: [],
    subscribers: [],
});
