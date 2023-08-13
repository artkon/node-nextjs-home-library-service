import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import process from 'process';

import { AppModule } from './app.module';


dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const port = process.env.port || 4000;

    await app.listen(port);

    console.log(`Server started on port ${port}`);
}
bootstrap();
