import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Album } from '../album/entities/Album';
import { Artist } from '../artist/entities/Artist';

import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Track } from './entities/Track';

@Module({
    imports: [TypeOrmModule.forFeature([Track, Album, Artist])],
    controllers: [TrackController],
    providers: [TrackService],
})
export class TrackModule {}
