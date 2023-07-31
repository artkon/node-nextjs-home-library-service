import { HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'uuid';

import db from '../db';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
    create({ name, year, artistId }: CreateAlbumDto) {
        if (
            typeof name !== 'string' ||
            typeof year !== 'number' ||
            !(artistId === null || validate(artistId))
        ) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid input data' } };
        }

        const album = db.albums.createAlbum({ name, year, artistId });

        return { data: album };
    }

    findAll() {
        return db.albums.getAlbums();
    }

    findOne(id: string) {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid album id provided' } };
        }

        try {
            const album = db.albums.getAlbum(id);
            return { data: album };
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: `Album with id ${id} not found` } };
        }
    }

    updateAlbum(id: string, { name, artistId, year }: UpdateAlbumDto) {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid album id provided' } };
        }

        if (
            (name && (typeof name !== 'string')) ||
            (year && (typeof year !== 'number')) ||
            !(validate(artistId) || artistId === null)
        ) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid request body' } };
        }

        try {
            const album = db.albums.updateAlbum(id, { name, year, artistId });

            return { data: album };
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: error.message } };
        }
    }

    deleteAlbum(id: string) {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid album id provided' } };
        }

        try {
            const isAlbumDeleted = db.albums.deleteAlbum(id);

            return { data: isAlbumDeleted }
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: error.message } };
        }
    }
}
