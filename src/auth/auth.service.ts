import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import process from 'process';


const CRYPT_SALT = Number(process.env.CRYPT_SALT);

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signUp(login: string, password: string): Promise<any> {
        const hashedPassword = await bcrypt.hash(password, CRYPT_SALT);
        const { data } = await this.userService.create({ login, password: hashedPassword });

        return data;
    }

    async signIn(login: string, password: string): Promise<any> {
        const user = await this.userService.findByLogin(login);

        const isCorrectPassword = bcrypt.compareSync(password, user?.password);

        if (!isCorrectPassword) {
            throw new ForbiddenException();
        }

        return await this.getTokens(user);
    }

    async getTokens({ id, login }) {
        const payload = { sub: id, login };

        return { accessToken: await this.jwtService.signAsync(payload)};
    }

}
