import { Controller, Get, Post, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { FavsService } from './favs.service';
import { IFavorites } from "./entities/type";

@Controller('favs')
export class FavsController {
    constructor(private readonly favsService: FavsService) {}

    @Get()
    async getFavs(): Promise<IFavorites> {
        return await this.favsService.getFavs();
    }

    @Post('track/:id')
    async addTrack(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = await this.favsService.addTrack(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        } else {
            response.status(HttpStatus.CREATED).send(data);
        }
    }

    @Delete('track/:id')
    async deleteTrack(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = await this.favsService.deleteTrack(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        }

        if (data) {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }

    @Post('album/:id')
    async addAlbum(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = await this.favsService.addAlbum(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        } else {
            response.status(HttpStatus.CREATED).send(data);
        }
    }

    @Delete('album/:id')
    async deleteAlbum(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = await this.favsService.deleteAlbum(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        }

        if (data) {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }

    @Post('artist/:id')
    async addArtist(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = await this.favsService.addArtist(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        } else {
            response.status(HttpStatus.CREATED).send(data);
        }
    }

    @Delete('artist/:id')
    async deleteArtist(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = await this.favsService.deleteArtist(id);
        if (error) {
            response.status(error.status).send({ error: { message: error.message } });
        }

        if (data) {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }
}
