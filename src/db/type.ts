export interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
}

export type UserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'version'>;

export interface IUserDB {
    users: User[];
    getUsers(): User[];
    getUser(userId: string): User;
    createUser(userDto: UserDto): Omit<User, 'password'>;
    updateUser(userId: string, userDto: UserDto): Omit<User, 'password'>;
    deleteUser(userId: string): void;
}
