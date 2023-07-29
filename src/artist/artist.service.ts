import { HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'uuid';

import { IServiceResponse } from "../common/types";
import db from '../db';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
    create({ name, grammy }: CreateArtistDto): IServiceResponse {
        if (typeof name !== 'string' || typeof grammy !== 'boolean') {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid input data' } };
        }

        const artist = db.artists.createArtist({ name, grammy });

        return { data: artist };
    }

    findAll() {
        return db.artists.getArtists();
    }

    findOne(id: string) {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid artist id provided' } };
        }

        try {
            const artist = db.artists.getArtist(id);
            return { data: artist };
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: `Artist with id ${id} not found` } };
        }
    }

    update(id: string, { name, grammy }: UpdateArtistDto) {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid artist id provided' } };
        }

        if (
            (name && (typeof name !== 'string')) ||
            (grammy && (typeof grammy !== 'boolean'))
        ) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid request body' } };
        }

        try {
            const artist = db.artists.updateArtist(id, { name, grammy });

            return { data: artist };
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: error.message } };
        }
    }

    deleteArtist(id: string) {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid artist id provided' } };
        }

        try {
            const isArtistDeleted = db.artists.deleteArtist(id);

            return { data: isArtistDeleted }
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: error.message } };
        }
    }
}
