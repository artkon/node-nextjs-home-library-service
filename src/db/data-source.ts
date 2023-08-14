import process from 'process';
import { FileLogger, DataSource, DataSourceOptions } from 'typeorm';

import { User } from '../user/entities/User';
import { Album } from '../album/entities/Album';
import { Artist } from '../artist/entities/Artist';
import { Track } from '../track/entities/Track';
import { FavAlbum } from '../favs/entities/FavAlbum';
import { FavArtist } from '../favs/entities/FavArtist';
import { FavTrack } from '../favs/entities/FavTrack';


const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export const typeOrmOptions: DataSourceOptions = {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    logging: true,
    logger: new FileLogger(true, { logPath: './typeorm/db.log' }),
    entities: [User, Album, Artist, Track, FavAlbum, FavArtist, FavTrack],
    migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(typeOrmOptions);

export default dataSource;
