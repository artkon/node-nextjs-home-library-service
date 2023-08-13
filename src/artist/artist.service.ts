import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

import { IServiceResponse } from "../common/types";

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/Artist';

@Injectable()
export class ArtistService {

    constructor(
      @InjectRepository(Artist)
      private artistRepository: Repository<Artist>
    ) {}

    async create({ name, grammy }: CreateArtistDto): Promise<IServiceResponse> {
        if (typeof name !== 'string' || typeof grammy !== 'boolean') {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid input data' } };
        }

        const artist = new Artist();
        artist.name = name;
        artist.grammy = grammy;
        const savedArtist = await this.artistRepository.save(artist);

        return { data: savedArtist };
    }

    async findAll(): Promise<Artist[]> {
        return await this.artistRepository.find();
    }

    async findOne(id: string): Promise<IServiceResponse> {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid artist id provided' } };
        }

        const artist = await this.artistRepository.findOneBy({ id });

        if (artist) {
            return { data: artist };
        } else {
            return { error: { status: HttpStatus.NOT_FOUND, message: `Artist with id ${id} not found` } };
        }
    }

    async updateArtist(id: string, { name, grammy }: UpdateArtistDto): Promise<IServiceResponse> {
        const { error, data } = await this.findOne(id);

        if (error) {
            return { error };
        }

        if (
            (name && (typeof name !== 'string')) ||
            (grammy && (typeof grammy !== 'boolean'))
        ) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid request body' } };
        }

        const artist = data as Artist;
        artist.name = name ?? artist.name;
        artist.grammy = grammy ?? artist.grammy;
        const updatedArtist = await this.artistRepository.save(artist);

        return { data: updatedArtist };
    }

    async deleteArtist(id: string): Promise<IServiceResponse> {
        if (!validate(id)) {
            return { error: { status: HttpStatus.BAD_REQUEST, message: 'Invalid artist id provided' } };
        }

        try {
            const artist = await this.artistRepository.findOneBy({ id });
            const deletedArtist = await this.artistRepository.remove(artist);

            return { data: deletedArtist }
        } catch (error) {
            return { error: { status: HttpStatus.NOT_FOUND, message: `No artist with id: ${id}` } };
        }
    }
}
