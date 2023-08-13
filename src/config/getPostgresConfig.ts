import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const getPostgresConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    logging: true,
    autoLoadEntities: true,
    migrations: [],
    migrationsTableName: 'user',
    subscribers: [],
});
