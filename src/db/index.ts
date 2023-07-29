import { UsersDB } from './users';
import { TracksDB } from './tracks';
import { IUsersDB, ITracksDB } from './type';

interface IDb {
    users: IUsersDB,
    artists: IUsersDB,
    albums: IUsersDB,
    tracks: ITracksDB,
    favs: IUsersDB,
}

const db: IDb = {
    users: UsersDB,
    artists: UsersDB,
    albums: UsersDB,
    tracks: TracksDB,
    favs: UsersDB,
};

export default db;
