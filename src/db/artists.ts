import { v4 as uuid } from 'uuid';

import { CreateArtistDto, IArtist, UpdateArtistDto, IArtistsDB } from './type';
import { TracksDB } from './tracks';
import { AlbumsDB } from './albums';
import { FavsDB } from './favs';


export const ArtistsDB: IArtistsDB = {
    artists: [],

    getArtists(): IArtist[] {
        return this.artists;
    },

    getArtist(artistId: string): IArtist {
        const artist = this.artists.find(({ id }) => (id === artistId));

        if (!artist) {
            throw new Error(`No artist with id: ${artistId}`);
        }

        return artist;
    },

    createArtist(artistDto: CreateArtistDto): IArtist {
        const artist = {
            id: uuid(),
            name: artistDto.name,
            grammy: artistDto.grammy,
        };

        this.artists.push(artist);

        return artist;
    },

    updateArtist(artistId: string, { name, grammy }: UpdateArtistDto): IArtist {
        const artist = this.getArtist(artistId);

        Object.assign(
            artist,
            { name, grammy },
        );

        return artist;
    },

    deleteArtist(artistId: string): boolean {
        const artistIndex = this.artists.findIndex(({ id }) => (id === artistId));

        if (artistIndex === -1) {
            throw new Error(`No artist with id: ${artistId}`);
        }

        this.artists.splice(artistIndex, 1);

        TracksDB.removeArtist(artistId);
        AlbumsDB.removeArtist(artistId);
        try {
            FavsDB.deleteArtist(artistId);
        } catch {
            return true;
        }

        return true;
    },
};
