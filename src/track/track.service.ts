import { HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'uuid';

import db from '../db';
import { ITrack } from '../db/type';
import { IServiceResponse } from '../common/types';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';


@Injectable()
export class TrackService {
    create({ name, albumId, duration, artistId }: CreateTrackDto): IServiceResponse {
        if (
            typeof name !== 'string' ||
            typeof duration !== 'number' ||
            !(validate(albumId) || albumId === null) ||
            !(validate(artistId) || artistId === null)
        ) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid input data' } };
        }

        const track = db.tracks.createTrack({ name, albumId, duration, artistId });

        return { data: track };
    }

    findAll(): ITrack[] {
        return db.tracks.getTracks();
    }

    findOne(id: string): IServiceResponse {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid track id provided' } };
        }

        try {
            const track = db.tracks.getTrack(id);
            return { data: track };
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: `Track with id ${id} not found` } };
        }
    }

    update(id: string, { name, artistId, albumId, duration }: UpdateTrackDto): IServiceResponse {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid track id provided' } };
        }

        if (
            (name && (typeof name !== 'string')) ||
            (duration && (typeof duration !== 'number')) ||
            ((albumId !== undefined) && !(validate(albumId) || albumId === null)) ||
            ((artistId !== undefined) && !(validate(artistId) || artistId === null))
        ) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid request body' } };
        }

        try {
            const track = db.tracks.updateTrack(id, { name, artistId, albumId, duration });

            return { data: track };
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: error.message } };
        }
    }

    deleteTrack(id: string) {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid track id provided' } };
        }

        try {
            const isTrackDeleted = db.tracks.deleteTrack(id);

            return { data: isTrackDeleted }
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: error.message } };
        }
    }
}
