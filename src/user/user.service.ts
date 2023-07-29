import { Injectable, HttpStatus } from '@nestjs/common';
import { validate } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import db from '../db';
import { IUser } from '../db/type';
import { IServiceResponse } from '../common/types';


@Injectable()
export class UserService {
    create({ login, password }: CreateUserDto): IServiceResponse {
        if (typeof login !== 'string' || typeof password !== 'string') {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid input data' } };
        }
        const user = db.users.createUser({ login, password });

        return { data: user };
    }

    findAll(): IUser[] {
        return db.users.getUsers();
    }

    findOne(id: string): IServiceResponse {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid user id provided' } };
        }

        try {
            const user = db.users.getUser(id);
            return { data: user };
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: `User with id ${id} not found` } };
        }
    }

    updatePassword(id: string, { oldPassword, newPassword }: UpdatePasswordDto): IServiceResponse {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid user id provided' } };
        }

        if (typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid request body' } };
        }

        try {
            const password = db.users.getUserPassword(id);

            if (password !== oldPassword) {
                return { error: { status: HttpStatus.FORBIDDEN, message: 'Current password is wrong' } };
            }

            const user = db.users.updateUserPassword(id, newPassword);

            return { data: user };
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: error.message } };
        }
    }

    deleteUser(id: string): IServiceResponse  {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid user id provided' } };
        }

        try {
            const isUserDeleted = db.users.deleteUser(id);

            return { data: isUserDeleted };
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: error.message } };
        }
    }
}
