import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

import { IServiceResponse } from '../common/types';
import { Artist } from '../artist/entities/Artist';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/Album';

@Injectable()
export class AlbumService {

    constructor(
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>,
    ) {}

    async create({ name, year, artistId }: CreateAlbumDto): Promise<IServiceResponse> {
        if (
            typeof name !== 'string' ||
            typeof year !== 'number' ||
            !(artistId === null || validate(artistId))
        ) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid input data' } };
        }

        const album = new Album();
        album.name = name;
        album.year = year;
        album.artist = Promise.resolve(artistId ? await this.artistRepository.findOneBy({ id: artistId }) : null);

        const savedAlbum = await this.albumRepository.save(album);
        const foundAlbum = await this.albumRepository.findOneBy({ id: savedAlbum.id });

        return { data: foundAlbum };
    }

    async findAll(): Promise<Album[]> {
        return this.albumRepository.find();
    }

    async findOne(id: string): Promise<IServiceResponse> {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid album id provided' } };
        }

        const album = await this.albumRepository.findOneBy({ id });

        if (album) {
            return { data: album };
        } else {
            return { error: { status: HttpStatus.NOT_FOUND, message: `Album with id ${id} not found` } };
        }
    }

    async updateAlbum(id: string, { name, artistId, year }: UpdateAlbumDto): Promise<IServiceResponse> {
        const { error, data } = await this.findOne(id);

        if (error) {
            return { error };
        }

        if (
            (name && (typeof name !== 'string')) ||
            (year && (typeof year !== 'number')) ||
            !(validate(artistId) || artistId === null)
        ) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid request body' } };
        }

        const album = data as Album;
        album.name = name ?? album.name;
        album.artist = Promise.resolve(await this.artistRepository.findOneBy({ id: artistId }) || null);
        album.year = year ?? album.year;

        const updatedAlbum = await this.albumRepository.save(album);

        return { data: updatedAlbum };
    }

    async deleteAlbum(id: string): Promise<IServiceResponse> {
        const { error , data } = await this.findOne(id);

        if (error) {
            return { error };
        }

        const album = data as Album;
        const removedAlbum = await this.albumRepository.remove(album);

        return { data: removedAlbum }
    }
}
