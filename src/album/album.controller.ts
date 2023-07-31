import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { Response } from 'express';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Post()
    create(@Body() createAlbumDto: CreateAlbumDto, @Res() response: Response) {
        const { error, data } = this.albumService.create(createAlbumDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        response.status(HttpStatus.CREATED).send(data);
    }

    @Get()
    findAll() {
        return this.albumService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() response: Response) {
        const { data, error } = this.albumService.findOne(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        response.send(data);
    }

    @Put(':id')
    updateAlbum(
        @Param('id') id: string,
        @Body() updateAlbumDto: UpdateAlbumDto,
        @Res() response: Response,
    ) {
        const { error, data } = this.albumService.updateAlbum(id, updateAlbumDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.status(HttpStatus.OK).send(data);
        }
    }

    @Delete(':id')
    deleteAlbum(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = this.albumService.deleteAlbum(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        if (data) {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }
}
