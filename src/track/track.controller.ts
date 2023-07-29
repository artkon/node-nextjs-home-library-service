import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { Response } from 'express';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
    constructor(private readonly trackService: TrackService) {}

    @Post()
    create(@Body() createTrackDto: CreateTrackDto, @Res() response: Response) {
        const { error, data } = this.trackService.create(createTrackDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        response.status(HttpStatus.CREATED).send(data);
    }

    @Get()
    findAll() {
        return this.trackService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() response: Response) {
        const { data, error } = this.trackService.findOne(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }
        response.send(data);
    }

    @Put(':id')
    updateTrack(
      @Param('id') id: string,
      @Body() updateTrackDto: UpdateTrackDto,
      @Res() response: Response,
    ) {
        const { error, data } = this.trackService.update(id, updateTrackDto);
        if (error) {
            response.status(error.status).send({ error: error.message });
        } else {
            response.status(HttpStatus.OK).send(data);
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() response: Response) {
        const { error, data } = this.trackService.deleteTrack(id);
        if (error) {
            response.status(error.status).send({ error: error.message });
        }

        if (data) {
            response.status(HttpStatus.NO_CONTENT).send();
        }
    }
}
