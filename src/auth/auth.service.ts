import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import process from 'process';

import { UserService } from '../user/user.service';

import { accessTokenOptions, refreshTokenOptions } from './config';


const { CRYPT_SALT, JWT_SECRET_REFRESH_KEY } = process.env;

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signUp(login: string, password: string): Promise<any> {
        const hashedPassword = await bcrypt.hash(password, Number(CRYPT_SALT));
        const { data } = await this.userService.create({ login, password: hashedPassword });

        return data;
    }

    async signIn(login: string, password: string): Promise<any> {
        const user = await this.userService.findByLogin(login);

        const isCorrectPassword = bcrypt.compareSync(password, user?.password);

        if (!isCorrectPassword) {
            throw new ForbiddenException();
        }

        return await this.getTokens({ id: user.id, login: user.login });
    }

    async refresh(refreshToken: string): Promise<any> {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, { secret: JWT_SECRET_REFRESH_KEY });
            const { data, error } = await this.userService.findOne(payload.sub);
            if (error) {
                throw new ForbiddenException();
            }

            return await this.getTokens({ id: data.id, login: data.login });
        } catch {
            throw new ForbiddenException();
        }
    }

    async getTokens({ id, login }): Promise<{ accessToken: string, refreshToken: string }> {
        const payload = { sub: id, login };

        return {
            accessToken: await this.jwtService.signAsync(payload, accessTokenOptions),
            refreshToken: await this.jwtService.signAsync(payload, refreshTokenOptions),
        };
    }

}
