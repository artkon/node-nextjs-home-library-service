import { Injectable } from '@nestjs/common';
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
            return { error: { status: 400, message: 'Invalid input data' } };
        }
        const user = db.users.createUser({ login, password });

        return { data: user };
    }

    findAll(): IUser[] {
        return db.users.getUsers();
    }

    findOne(id: string): IServiceResponse {
        if (!validate(id)) {
            return { error: { status: 400, message: 'Invalid user id provided' } };
        }

        try {
            const user = db.users.getUser(id);
            return { data: user };
        } catch (error) {
            return { error: { status: 404, message: `User with id ${id} not found` } };
        }
    }

    updatePassword(id: string, { oldPassword, newPassword }: UpdatePasswordDto): IServiceResponse {
        if (!validate(id)) {
            return { error: { status: 400, message: 'Invalid user id provided' } };
        }
        try {
            const password = db.users.getUserPassword(id);

            if (password !== oldPassword) {
                return { error: { status: 403, message: 'Current password is wrong' } };
            }

            const user = db.users.updateUserPassword(id, newPassword);

            return { data: user };
        } catch (error) {
            return { error: { status: 404, message: error.message } };
        }
    }

    deleteUser(id: string): IServiceResponse  {
        if (!validate(id)) {
            return { error: { status: 400, message: 'Invalid user id provided' } };
        }

        try {
            const isPasswordChanged = db.users.deleteUser(id);

            return {
                data: isPasswordChanged,
            }
        } catch (error) {
            return { error: { status: 404, message: error.message } };
        }
    }
}
