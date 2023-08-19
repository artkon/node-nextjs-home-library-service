import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './decorators/Public';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    signUp(@Body() { login, password }: AuthDto) {
        if (!login || !password) throw new BadRequestException();

        return this.authService.signUp(login, password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() { login, password }: AuthDto) {
        if (!login || !password) throw new BadRequestException();

        return this.authService.signIn(login, password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    refresh(@Body() { refreshToken }: { refreshToken: string }) {
        if (!refreshToken) throw new BadRequestException();

        return this.authService.refresh(refreshToken);
    }

}
