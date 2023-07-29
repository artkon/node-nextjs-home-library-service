import { UsersDB } from './users';
import { IUsersDB } from './type';

interface IDb {
    users: IUsersDB,
    artists: IUsersDB,
    albums: IUsersDB,
    tracks: IUsersDB,
    favs: IUsersDB,
}

const db: IDb = {
    users: UsersDB,
    artists: UsersDB,
    albums: UsersDB,
    tracks: UsersDB,
    favs: UsersDB,
};

export default db;
