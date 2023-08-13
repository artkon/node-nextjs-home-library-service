import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { Response } from 'express';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/Track';

@Controller('track')
export class TrackController {
    constructor(private readonly trackService: TrackService) {}

    @Post()
    async create(@Body() createTrackDto: CreateTrackDto, @Res() response: Response): Promise<void> {
        const { error, data } = await this.trackService.create(createTrackDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        response.status(HttpStatus.CREATED).send(data);
    }

    @Get()
    async findAll(): Promise<Track[]> {
        return await this.trackService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response: Response): Promise<void> {
        const { data, error } = await this.trackService.findOne(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.send(data);
        }
    }

    @Put(':id')
    async updateTrack(
      @Param('id') id: string,
      @Body() updateTrackDto: UpdateTrackDto,
      @Res() response: Response,
    ): Promise<void> {
        const { error, data } = await this.trackService.update(id, updateTrackDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.status(HttpStatus.OK).send(data);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() response: Response): Promise<void> {
        const { error } = await this.trackService.deleteTrack(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }
}
