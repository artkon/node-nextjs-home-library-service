import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artist } from './entities/Artist';

@Module({
    imports: [TypeOrmModule.forFeature([Artist])],
    controllers: [ArtistController],
    providers: [ArtistService],
})
export class ArtistModule {}
