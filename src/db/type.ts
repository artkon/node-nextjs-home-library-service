export interface IUserDB {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
}

export type IUser = Omit<IUserDB, 'password'>;

export type CreateUserDto = Omit<IUserDB, 'id' | 'createdAt' | 'updatedAt' | 'version'>;


export interface IUsersDB {
    users: IUser[];
    getUsers(): IUser[];
    getUser(userId: string): IUser;
    getUserPassword(userId: string): string;
    createUser(userDto: CreateUserDto): IUser;
    updateUserPassword(userId: string, password: string): IUser;
    deleteUser(userId: string): boolean;
}
