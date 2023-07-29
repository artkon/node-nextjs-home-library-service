import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { Response } from 'express';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Post()
    create(@Body() createArtistDto: CreateArtistDto, @Res() response: Response) {
        const { error, data } = this.artistService.create(createArtistDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        response.status(HttpStatus.CREATED).send(data);
    }

    @Get()
    findAll() {
        return this.artistService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() response: Response) {
        const { data, error } = this.artistService.findOne(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        response.send(data);
    }

    @Put(':id')
    updateTrack(
        @Param('id') id: string,
        @Body() updateArtistDto: UpdateArtistDto,
        @Res() response: Response,
    ) {
        const { error, data } = this.artistService.update(id, updateArtistDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.status(HttpStatus.OK).send(data);
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() response: Response) {
        try {
            const { error, data } = this.artistService.deleteArtist(id);
            if (error) {
                response.status(error.status).send({ error: error.message });
            }

            if (data) {
                response.status(HttpStatus.NO_CONTENT).send();
            }
        } catch (error) {
            response.status(HttpStatus.NOT_FOUND).send({ error: error.message });
        }
    }
}
