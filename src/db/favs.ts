import { IFavs, IFavsDB } from './type';
import { TracksDB } from './tracks';
import { AlbumsDB } from './albums';
import { ArtistsDB } from './artists';


export const FavsDB: IFavsDB = {
    artists: [],
    albums: [],
    tracks: [],

    getFavs(): IFavs {
        return {
            artists: this.artists.map((artistId: string) => ArtistsDB.getArtist(artistId)),
            albums: this.albums.map((albumId: string) => AlbumsDB.getAlbum(albumId)),
            tracks: this.tracks.map((trackId: string) => TracksDB.getTrack(trackId)),
        };
    },

    addTrack(trackId: string): boolean {
        const track = TracksDB.getTrack(trackId);
        this.tracks.push(track.id);

        return true;
    },
    deleteTrack(trackId: string): boolean {
        const trackIndex = this.tracks.findIndex((id: string) => (id === trackId));
        if (trackIndex === -1) {
            throw new Error(`Corresponding track id is not in favorites`);
        }

        this.tracks.splice(trackIndex, 1);

        return true;
    },
    addAlbum(albumId: string): boolean {
        const album = AlbumsDB.getAlbum(albumId);
        this.albums.push(album.id);

        return true;
    },
    deleteAlbum(albumId: string): boolean {
        const albumIndex = this.albums.findIndex((id: string) => (id === albumId));

        if (albumIndex === -1) {
            throw new Error(`Corresponding album id is not in favorites`);
        }

        this.albums.splice(albumIndex, 1);

        return true;
    },
    addArtist(artistId: string): boolean {
        const artist = ArtistsDB.getArtist(artistId);
        this.artists.push(artist.id);

        return true;
    },
    deleteArtist(artistId: string): boolean {
        const artistIndex = this.artists.findIndex((id: string) => (id === artistId));

        if (artistIndex === -1) {
            throw new Error(`Corresponding artist id is not in favorites`);
        }

        this.artists.splice(artistIndex, 1);

        return true;
    },
};
