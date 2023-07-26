import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import process from 'process';
import { AppModule } from './app.module';


dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.port || 4000);
}
bootstrap();
