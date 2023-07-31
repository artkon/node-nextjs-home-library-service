import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { IUser } from "../db/type";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto, @Res() response: Response): void {
        const { error, data } = this.userService.create(createUserDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        response.status(HttpStatus.CREATED).send(data);
    }

    @Get()
    findAll(): IUser[] {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() response: Response): void {
        const { data, error } = this.userService.findOne(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        response.send(data);
    }

    @Put(':id')
    updatePassword(
        @Param('id') id: string,
        @Body() updatePasswordDto: UpdatePasswordDto,
        @Res() response: Response,
    ): void {
        const { error, data } = this.userService.updatePassword(id, updatePasswordDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.status(HttpStatus.OK).send(data);
        }
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string, @Res() response: Response): void {
        const { error, data } = this.userService.deleteUser(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }

        if (data) {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }
}
