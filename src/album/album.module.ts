import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Album } from './entities/Album';
import { Artist } from "../artist/entities/Artist";


@Module({
    imports: [TypeOrmModule.forFeature([Album, Artist])],
    controllers: [AlbumController],
    providers: [AlbumService],
})
export class AlbumModule {}
