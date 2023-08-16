import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { Response } from 'express';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/Artist';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Post()
    async create(@Body() createArtistDto: CreateArtistDto, @Res() response: Response): Promise<void> {
        const { error, data } = await this.artistService.create(createArtistDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        response.status(HttpStatus.CREATED).send(data);
    }

    @Get()
    async findAll(): Promise<Artist[]> {
        return this.artistService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response: Response): Promise<void> {
        const { data, error } = await this.artistService.findOne(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        response.send(data);
    }

    @Put(':id')
    async updateArtist(
        @Param('id') id: string,
        @Body() updateArtistDto: UpdateArtistDto,
        @Res() response: Response,
    ): Promise<void> {
        const { error, data } = await this.artistService.updateArtist(id, updateArtistDto);

        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.status(HttpStatus.OK).send(data);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() response: Response): Promise<void> {
        const { error } = await this.artistService.deleteArtist(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }
}
