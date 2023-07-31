import { Controller, Get, Post, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
    constructor(private readonly favsService: FavsService) {}

    @Get()
    getFavs() {
        return this.favsService.getFavs();
    }

    @Post('track/:id')
    addTrack(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = this.favsService.addTrack(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        } else {
            response.status(HttpStatus.CREATED).send(data);
        }
    }

    @Delete('track/:id')
    deleteTrack(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = this.favsService.deleteTrack(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        }

        if (data) {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }

    @Post('album/:id')
    addAlbum(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = this.favsService.addAlbum(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        } else {
            response.status(HttpStatus.CREATED).send(data);
        }
    }

    @Delete('album/:id')
    deleteAlbum(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = this.favsService.deleteAlbum(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        }

        if (data) {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }

    @Post('artist/:id')
    addArtist(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = this.favsService.addArtist(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        } else {
            response.status(HttpStatus.CREATED).send(data);
        }
    }

    @Delete('artist/:id')
    deleteArtist(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = this.favsService.deleteArtist(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        }

        if (data) {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }
}
