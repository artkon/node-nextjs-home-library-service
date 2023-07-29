import { v4 as uuid } from 'uuid';

import { IUserDB, CreateUserDto, IUsersDB, IUser } from './type';


const filterPassword = ({ password: _, ...rest }: IUserDB): IUser => rest;

export const UsersDB: IUsersDB = {
    users: [],

    getUsers(): IUser[] {
        return this.users.map(filterPassword);
    },

    getUser(userId: string): IUser {
        const user = this.users.find(({ id }) => (id === userId));

        if (!user) {
            throw new Error(`No user with id: ${userId}`);
        }

        return filterPassword(user);
    },

    getUserPassword(userId: string): string {
        const user = this.users.find(({ id }) => (id === userId));

        if (!user) {
            throw new Error(`No user with id: ${userId}`);
        }

        return user.password;
    },

    // add dto type
    createUser(userDto: CreateUserDto): IUser {
        const user = {
            login: userDto.login,
            password: userDto.password,
            id: uuid(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            version: 1,
        };

        this.users.push(user);

        return filterPassword(user);
    },

    updateUserPassword(userId: string, newPassword: string): IUser {
        const user = this.getUser(userId);

        Object.assign(
            user,
            {
                password: newPassword,
                updatedAt: Date.now(),
                version: user.version + 1,
            },
        );

        return filterPassword(user);
    },

    deleteUser(userId: string): boolean {
        const userIndex = this.users.findIndex(({ id }) => (id === userId));

        if (userIndex === -1) {
            throw new Error(`No user with id: ${userId}`);
        }

        this.users.splice(userIndex, 1);

        return true;
    },
};
