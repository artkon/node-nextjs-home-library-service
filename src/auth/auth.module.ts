import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import process from 'process';
import { config } from 'dotenv';

import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


config();
const { JWT_SECRET_KEY, TOKEN_EXPIRE_TIME } = process.env;

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: JWT_SECRET_KEY,
            signOptions: { expiresIn: TOKEN_EXPIRE_TIME },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
