import { v4 as uuid } from 'uuid';

import { CreateAlbumDto, IAlbum, UpdateAlbumDto, IAlbumsDB } from './type';
import { TracksDB } from './tracks';
import { FavsDB } from './favs';


export const AlbumsDB: IAlbumsDB = {
    albums: [],

    getAlbums(): IAlbum[] {
        return this.albums;
    },

    getAlbum(albumId: string): IAlbum {
        const album = this.albums.find(({ id }) => (id === albumId));

        if (!album) {
            throw new Error(`No album with id: ${albumId}`);
        }

        return album;
    },

    createAlbum(albumDto: CreateAlbumDto): IAlbum {
        const album = {
            id: uuid(),
            name: albumDto.name,
            year: albumDto.year,
            artistId: albumDto.artistId,
        };

        this.albums.push(album);

        return album;
    },

    updateAlbum(albumId: string, { name, year, artistId }: UpdateAlbumDto): IAlbum {
        const album = this.getAlbum(albumId);

        Object.assign(
            album,
            { name, year, artistId },
        );

        return album;
    },

    deleteAlbum(albumId: string): boolean {
        const albumIndex = this.albums.findIndex(({ id }) => (id === albumId));

        if (albumIndex === -1) {
            throw new Error(`No album with id: ${albumId}`);
        }

        this.albums.splice(albumIndex, 1);

        TracksDB.removeAlbum(albumId);

        try {
            FavsDB.deleteAlbum(albumId);
        } catch {
            return true;
        }

        return true;
    },

    removeArtist(artistId: string): boolean {
        this.albums = this.albums.map((album: IAlbum): IAlbum => {
            if (album.artistId === artistId) {
                album.artistId = null;
            }

            return album;
        });

        return true;
    },
};
