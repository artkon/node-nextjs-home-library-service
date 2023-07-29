export interface IUserDB {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
}

export type IUser = Omit<IUserDB, 'password'>;

export type CreateUserDto = Omit<IUserDB, 'id' | 'createdAt' | 'updatedAt' | 'version'>;


export interface IUsersDB {
    users: IUser[];
    getUsers(): IUser[];
    getUser(userId: string): IUser;
    getUserPassword(userId: string): string;
    createUser(userDto: CreateUserDto): IUser;
    updateUserPassword(userId: string, password: string): IUser;
    deleteUser(userId: string): boolean;
}

export interface ITrack {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
}

export type CreateTrackDto = Omit<ITrack, 'id'>

export interface UpdateTrackDto {
    name?: string;
    artistId?: string | null;
    albumId?: string | null;
    duration?: number;
}

export interface ITracksDB {
    tracks: ITrack[];
    getTracks(): ITrack[];
    getTrack(trackId: string): ITrack;
    createTrack(trackDto: CreateTrackDto): ITrack;
    updateTrack(trackId: string, updateTrackDto: UpdateTrackDto): ITrack;
    deleteTrack(trackId: string): boolean;
    removeArtist(artistId: string): boolean;
    removeAlbum(albumId: string): boolean;
}

export interface IArtist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
}

export type CreateArtistDto = Omit<IArtist, 'id'>

export interface UpdateArtistDto {
    name?: string;
    grammy?: boolean;
}

export interface IArtistsDB {
    artists: IArtist[];
    getArtists(): IArtist[];
    getArtist(artistId: string): IArtist;
    createArtist(artistDto: CreateArtistDto): IArtist;
    updateArtist(artistId: string, updateArtistDto: UpdateArtistDto): IArtist;
    deleteArtist(artistId: string): boolean;
}

export interface IAlbum {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
}

export type CreateAlbumDto = Omit<IAlbum, 'id'>

export interface UpdateAlbumDto {
    name?: string;
    year?: number;
    artistId?: string | null;
}

export interface IAlbumsDB {
    albums: IAlbum[];
    getAlbums(): IAlbum[];
    getAlbum(albumId: string): IAlbum;
    createAlbum(artistDto: CreateAlbumDto): IAlbum;
    updateAlbum(albumId: string, updateAlbumDto: UpdateAlbumDto): IAlbum;
    deleteAlbum(albumId: string): boolean;
    removeArtist(artistId: string): boolean;
}

export interface IFavs {
    artists: IArtist[];
    albums: IAlbum[];
    tracks: ITrack[];
}

export interface IFavsDB {
    artistIds: string[];
    albumIds: string[];
    trackIds: string[];
    getFavs(): IFavs;
    addTrack(trackId: string): boolean;
    addAlbum(albumId: string): boolean;
    addArtist(artistId: string): boolean;
    deleteTrack(trackId: string): boolean;
    deleteAlbum(albumId: string): boolean;
    deleteArtist(artistId: string): boolean;
}
