import { IFavs, IFavsDB } from './type';
import { TracksDB } from './tracks';
import { AlbumsDB } from './albums';
import { ArtistsDB } from './artists';


export const FavsDB: IFavsDB = {
    artistIds: [],
    albumIds: [],
    trackIds: [],

    getFavs(): IFavs {
        return {
            artists: this.artistIds.map((artistId: string) => ArtistsDB.getArtist(artistId)),
            albums: this.albumIds.map((albumId: string) => AlbumsDB.getAlbum(albumId)),
            tracks: this.trackIds.map((trackId: string) => TracksDB.getTrack(trackId)),
        };
    },

    addTrack(trackId: string): boolean {
        const track = TracksDB.getTrack(trackId);
        this.trackIds.push(track.id);

        return true;
    },
    deleteTrack(trackId: string): boolean {
        console.log('fav tracks: ')
        console.log(this.trackIds);
        console.log(`delete track: ${trackId}`);
        const trackIndex = this.trackIds.findIndex((id: string) => (id === trackId));
        console.log(`trackIndex: ${trackIndex}`);
        if (trackIndex === -1) {
            throw new Error(`Corresponding track id is not in favorites`);
        }

        this.trackIds.splice(trackIndex, 1);

        return true;
    },
    addAlbum(albumId: string): boolean {
        const album = AlbumsDB.getAlbum(albumId);
        this.albumIds.push(album.id);

        return true;
    },
    deleteAlbum(albumId: string): boolean {
        const albumIndex = this.albumIds.findIndex((id: string) => (id === albumId));

        if (albumIndex === -1) {
            throw new Error(`Corresponding album id is not in favorites`);
        }

        this.albumIds.splice(albumIndex, 1);

        return true;
    },
    addArtist(artistId: string): boolean {
        const artist = ArtistsDB.getArtist(artistId);
        this.artistIds.push(artist.id);

        return true;
    },
    deleteArtist(artistId: string): boolean {
        const artistIndex = this.artistIds.findIndex((id: string) => (id === artistId));

        if (artistIndex === -1) {
            throw new Error(`Corresponding artist id is not in favorites`);
        }

        this.artistIds.splice(artistIndex, 1);

        return true;
    },
};
