import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'uuid';
import { Repository } from 'typeorm';

import { IServiceResponse } from '../common/types';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/User';


@Injectable()
export class UserService {

    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>
    ) {}

    async create({ login, password }: CreateUserDto): Promise<IServiceResponse> {
        if (typeof login !== 'string' || typeof password !== 'string') {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid input data' } };
        }

        const user = new User();
        user.login = login;
        user.password = password;
        const savedUser = await this.userRepository.save(user);

        return { data: excludePassword(savedUser) };
    }

    async findAll(): Promise<Omit<User, 'password'>[]> {
        return (await this.userRepository.find()).map(excludePassword);
    }

    async findOne(id: string) {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid user id provided' } };
        }

        try {
            const user = await this.userRepository.findOneBy({ id });
            return { data: excludePassword(user) };
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: `User with id ${id} not found` } };
        }
    }

    async findByLogin(login: string): Promise<User> {
        if (!login) throw new BadRequestException();

        return await this.userRepository.findOneBy({ login });
    }

    async updatePassword(id: string, { oldPassword, newPassword }: UpdatePasswordDto): Promise<IServiceResponse> {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid user id provided' } };
        }

        if (typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid request body' } };
        }

        try {
            const user = await this.userRepository.findOneBy({ id });

            if (user.password !== oldPassword) {
                return { error: { status: HttpStatus.FORBIDDEN, message: 'Current password is wrong' } };
            }

            user.password = newPassword;
            const savedUser = await this.userRepository.save(user);

            return { data: excludePassword(savedUser) };
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: `No user with id: ${id}` } };
        }
    }

    async deleteUser(id: string): Promise<IServiceResponse>  {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid user id provided' } };
        }

        try {
            const user = await this.userRepository.findOneBy({ id });
            const deletedUser = await this.userRepository.remove(user);

            return { data: deletedUser };
        } catch {
            return { error: { status: HttpStatus.NOT_FOUND, message: `No user with id: ${id}` } };
        }
    }
}

const excludePassword = ({ password: _, ...rest}: User) => ({ ...rest });
