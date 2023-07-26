import { v4 as uuid } from 'uuid';

import { IUserDB, User, UserDto } from './type';


export const UserDB: IUserDB = {
    users: [],
    getUsers(): [User] {
        return this.users;
    },
    getUser(userId): User {
        const user = this.users.find(({ id }) => (id === userId));

        if (!user) {
            throw new Error(`No user with id:${userId}`)
        }

        return user;
    },
    // add dto type
    createUser(userDto: UserDto): Omit<User, 'password'> {
        const user = {
            ...userDto,
            id: uuid(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            version: 1,
        };

        this.users.push(user);

        return user;
    },
    // add dto type
    updateUser(userId: string, userDto: UserDto): Omit<User, 'password'> {
        const user = this.getUser(userId);
        Object.assign(
            user,
            userDto,
            {
                updatedAt: Date.now(),
                version: user.version + 1,
            },
        );

        return user;
    },
    deleteUser(userId: string): void {
        const userIndex = this.users.findIndex(({ id }) => (id === userId));

        if (!userIndex) {
            throw new Error(`No user with id:${userId}`);
        }

        this.users.splice(userIndex, 1);
    },
};
