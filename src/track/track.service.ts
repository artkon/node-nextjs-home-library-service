import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

import { IServiceResponse } from '../common/types';
import { Album } from '../album/entities/Album';
import { Artist } from '../artist/entities/Artist';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/Track';


@Injectable()
export class TrackService {

    constructor(
      @InjectRepository(Track)
      private trackRepository: Repository<Track>,

      @InjectRepository(Album)
      private albumRepository: Repository<Album>,

      @InjectRepository(Artist)
      private artistRepository: Repository<Artist>,
    ) {}

    async create({ name, albumId, duration, artistId }: CreateTrackDto): Promise<IServiceResponse> {
        if (
            typeof name !== 'string' ||
            typeof duration !== 'number' ||
            !(validate(albumId) || albumId === null) ||
            !(validate(artistId) || artistId === null)
        ) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid input data' } };
        }

        let album;
        let artist;
        if (albumId) {
            album = await this.albumRepository.findOneBy({ id: albumId });
        }
        if (artistId) {
            artist = await this.artistRepository.findOneBy({ id: artistId });
        }

        const track = new Track();
        track.name = name;
        track.album = Promise.resolve(album || null);
        track.artist = Promise.resolve(artist || null);
        track.duration = duration;

        const savedTrack = await this.trackRepository.save(track);
        const foundTrack = await this.trackRepository.findOneBy({ id: savedTrack.id });

        return { data: foundTrack };
    }

    async findAll(): Promise<Track[]> {
        return await this.trackRepository.find();
    }

    async findOne(id: string): Promise<IServiceResponse> {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid track id provided' } };
        }

        const track = await this.trackRepository.findOneBy({ id });

        if (track) {
            return { data: track };
        } else {
            return { error: { status: HttpStatus.NOT_FOUND, message: `Track with id ${id} not found` } };
        }
    }

    async update(id: string, { name, artistId, albumId, duration }: UpdateTrackDto): Promise<IServiceResponse> {
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

        let album;
        let artist;
        if (albumId) {
            album = await this.albumRepository.findOneBy({ id: albumId });
        }
        if (artistId) {
            artist = await this.artistRepository.findOneBy({ id: artistId });
        }

        const track = await this.trackRepository.findOneBy({ id });
        if (track) {
            track.name = name ?? track.name;
            track.album = Promise.resolve(album || null);
            track.artist = Promise.resolve(artist || null);
            track.duration = duration ?? track.duration;

            const updatedTrack = await this.trackRepository.save(track);
            const foundTrack = await this.trackRepository.findOneBy({ id: updatedTrack.id });

            return { data: foundTrack };
        } else {
            return { error: { status: HttpStatus.NOT_FOUND, message: 'Track not found' } };
        }
    }

    async deleteTrack(id: string): Promise<IServiceResponse> {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid track id provided' } };
        }

        const track = await this.trackRepository.findOneBy({ id });
        if (track) {
            const removedTrack = await this.trackRepository.remove(track);

            return { data: removedTrack };
        } else {
            return { error: { status: HttpStatus.NOT_FOUND, message: 'Track not found' } };
        }
    }
}
