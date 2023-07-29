import { IUsersDB, ITracksDB, IArtistsDB } from './type';
import { UsersDB } from './users';
import { TracksDB } from './tracks';
import { ArtistsDB } from './artists';

interface IDb {
    users: IUsersDB,
    artists: IArtistsDB,
    albums: IUsersDB,
    tracks: ITracksDB,
    favs: IUsersDB,
}

const db: IDb = {
    users: UsersDB,
    artists: ArtistsDB,
    albums: UsersDB,
    tracks: TracksDB,
    favs: UsersDB,
};

export default db;
