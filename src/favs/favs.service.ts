import { HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'uuid';

import db from '../db';
import { IServiceResponse } from '../common/types';

@Injectable()
export class FavsService {
    getFavs() {
        return db.favs.getFavs();
    }

    addTrack(trackId: string): IServiceResponse {
        if (!validate(trackId)) {
            return { error: { status: 400, message: 'Invalid track id provided' } }
        }

        try {
            db.favs.addTrack(trackId);

            return { data: { message: `Track was added to favorites successfully` } };
        } catch (error) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no track with id ${trackId}` } };
        }
    }

    deleteTrack(trackId: string): IServiceResponse {
        if (!validate(trackId)) {
            return { error: { status: 400, message: 'Invalid track id provided' } }
        }

        try {
            db.favs.deleteTrack(trackId);

            return { data: `Track was deleted from favorites successfully` };
        } catch (error) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no track with id ${trackId} in favorites` } };
        }
    }

    addAlbum(albumId: string): IServiceResponse {
        if (!validate(albumId)) {
            return { error: { status: 400, message: 'Invalid album id provided' } }
        }

        try {
            db.favs.addAlbum(albumId);

            return { data: { message: `Album was added to favorites successfully` } };
        } catch (error) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no album with id ${albumId}` } };
        }
    }

    deleteAlbum(albumId: string): IServiceResponse {
        if (!validate(albumId)) {
            return { error: { status: 400, message: 'Invalid album id provided' } }
        }

        try {
            db.favs.deleteAlbum(albumId);

            return { data: `Album was deleted from favorites successfully` };
        } catch (error) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no album with id ${albumId} in favorites` } };
        }
    }

    addArtist(artistId: string): IServiceResponse {
        if (!validate(artistId)) {
            return { error: { status: 400, message: 'Invalid artist id provided' } }
        }

        try {
            db.favs.addArtist(artistId);

            return { data: { message: `Artist was added to favorites successfully` } };
        } catch (error) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no artist with id ${artistId}` } };
        }
    }

    deleteArtist(artistId: string): IServiceResponse {
        if (!validate(artistId)) {
            return { error: { status: 400, message: 'Invalid artist id provided' } }
        }

        try {
            db.favs.deleteArtist(artistId);

            return { data: `Artist was deleted from favorites successfully` };
        } catch (error) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no artist with id ${artistId} in favorites` } };
        }
    }
}
