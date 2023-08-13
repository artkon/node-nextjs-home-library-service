import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { Response } from 'express';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/Album';


@Controller('album')
export class AlbumController {
    constructor(
        private readonly albumService: AlbumService,
    ) {}

    @Post()
    async create(@Body() createAlbumDto: CreateAlbumDto, @Res() response: Response): Promise<void> {
        const { error, data } = await this.albumService.create(createAlbumDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.status(HttpStatus.CREATED).send(data);
        }
    }

    @Get()
    async findAll(): Promise<Album[]> {
        return await this.albumService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response: Response): Promise<void> {
        const { data, error } = await this.albumService.findOne(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.send(data);
        }
    }

    @Put(':id')
    async updateAlbum(
        @Param('id') id: string,
        @Body() updateAlbumDto: UpdateAlbumDto,
        @Res() response: Response,
    ): Promise<void> {
        const { error, data } = await this.albumService.updateAlbum(id, updateAlbumDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.status(HttpStatus.OK).send(data);
        }
    }

    @Delete(':id')
    async deleteAlbum(@Param('id') id: string, @Res() response: Response): Promise<void> {
        const { error } = await this.albumService.deleteAlbum(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }
}
