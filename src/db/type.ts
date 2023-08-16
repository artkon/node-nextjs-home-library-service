export interface ITrack {
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
}

export type CreateTrackDto = Omit<ITrack, 'id'>


export interface IArtist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
}

export type CreateArtistDto = Omit<IArtist, 'id'>


export interface IAlbum {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
}

export type CreateAlbumDto = Omit<IAlbum, 'id'>
