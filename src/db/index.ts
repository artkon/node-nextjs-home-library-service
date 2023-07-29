import { IUsersDB, ITracksDB, IArtistsDB, IAlbumsDB, IFavsDB } from "./type";
import { UsersDB } from './users';
import { TracksDB } from './tracks';
import { ArtistsDB } from './artists';
import { AlbumsDB } from './albums';
import { FavsDB } from './favs';

interface IDb {
    users: IUsersDB,
    artists: IArtistsDB,
    albums: IAlbumsDB,
    tracks: ITracksDB,
    favs: IFavsDB,
}

const db: IDb = {
    users: UsersDB,
    artists: ArtistsDB,
    albums: AlbumsDB,
    tracks: TracksDB,
    favs: FavsDB,
};

export default db;
