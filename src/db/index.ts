import { UserDB } from './users';
import { IUserDB } from './type';

interface IDb {
    users: IUserDB,
    artists: IUserDB,
    albums: IUserDB,
    tracks: IUserDB,
    favs: IUserDB,
}

const db: IDb = {
    users: UserDB,
    artists: UserDB,
    albums: UserDB,
    tracks: UserDB,
    favs: UserDB,
};

export default db;
