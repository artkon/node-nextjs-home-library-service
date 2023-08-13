import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Track } from '../track/entities/Track';
import { Album } from '../album/entities/Album';
import { Artist } from '../artist/entities/Artist';

import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { FavTrack } from './entities/FavTrack';
import { FavAlbum } from './entities/FavAlbum';
import { FavArtist } from './entities/FavArtist';

@Module({
    imports: [TypeOrmModule.forFeature([Track, Album, Artist, FavTrack, FavAlbum, FavArtist])],
    controllers: [FavsController],
    providers: [FavsService],
})
export class FavsModule {}
