import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

import { IServiceResponse } from '../common/types';

import { Track } from '../track/entities/Track';
import { Album } from '../album/entities/Album';
import { Artist } from '../artist/entities/Artist';

import { FavTrack } from './entities/FavTrack';
import { FavAlbum } from './entities/FavAlbum';
import { FavArtist } from './entities/FavArtist';
import { IFavorites } from './entities/type';


@Injectable()
export class FavsService {

    constructor(
      @InjectRepository(FavTrack)
      private favTrackRepository: Repository<FavTrack>,

      @InjectRepository(FavAlbum)
      private favAlbumRepository: Repository<FavAlbum>,

      @InjectRepository(FavArtist)
      private favArtistRepository: Repository<FavArtist>,

      @InjectRepository(Track)
      private trackRepository: Repository<Track>,

      @InjectRepository(Album)
      private albumRepository: Repository<Album>,

      @InjectRepository(Artist)
      private artistRepository: Repository<Artist>,
    ) {}

    async getFavs(): Promise<IFavorites> {
        const favArtists = await this.favArtistRepository.find({ relations: ['artist'] });
        const favAlbums = await this.favAlbumRepository.find({ relations: ['album'] });
        const favTracks = await this.favTrackRepository.find({ relations: ['track'] });

        return {
            artists: favArtists.map(({ artist }) => artist),
            albums: favAlbums.map(({ album }) => album),
            tracks: favTracks.map(({ track }) => track),
        }
    }

    async addTrack(trackId: string): Promise<IServiceResponse> {
        if (!validate(trackId)) {
            return { error: { status: 400, message: 'Invalid track id provided' } }
        }

        const track = await this.trackRepository.findOneBy({ id: trackId });
        if (!track) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no track with id ${trackId}` } };
        }

        const favTrack = new FavTrack();
        favTrack.track = track;
        await this.favTrackRepository.save(favTrack);

        return { data: { message: `Track was added to favorites successfully` } };
    }

    async deleteTrack(trackId: string): Promise<IServiceResponse> {
        if (!validate(trackId)) {
            return { error: { status: 400, message: 'Invalid track id provided' } }
        }

        const favTrack = await this.favTrackRepository.findOneBy({ trackId });

        if (!favTrack) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no track with id ${trackId} in favorites` } };
        }

        await this.favTrackRepository.remove(favTrack);

        return { data: `Track was deleted from favorites successfully` };
    }

    async addAlbum(albumId: string): Promise<IServiceResponse> {
        if (!validate(albumId)) {
            return { error: { status: 400, message: 'Invalid album id provided' } }
        }

        const album = await this.albumRepository.findOneBy({ id: albumId });
        if (!album) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no album with id ${albumId}` } };
        }

        const favAlbum = new FavAlbum();
        favAlbum.album = album;
        await this.favAlbumRepository.save(favAlbum);

        return { data: { message: `Album was added to favorites successfully` } };
    }

    async deleteAlbum(albumId: string): Promise<IServiceResponse> {
        if (!validate(albumId)) {
            return { error: { status: 400, message: 'Invalid album id provided' } }
        }

        const favAlbum = await this.favAlbumRepository.findOneBy({ albumId });

        if (!favAlbum) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no album with id ${albumId} in favorites` } };
        }

        await this.favAlbumRepository.remove(favAlbum);

        return { data: `Album was deleted from favorites successfully` };
    }

    async addArtist(artistId: string): Promise<IServiceResponse> {
        if (!validate(artistId)) {
            return { error: { status: 400, message: 'Invalid artist id provided' } }
        }

        const artist = await this.artistRepository.findOneBy({ id: artistId });
        if (!artist) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no artist with id ${artistId}` } };
        }

        const favArtist = new FavArtist();
        favArtist.artist = artist;
        await this.favArtistRepository.save(favArtist);

        return { data: { message: `Album was added to favorites successfully` } };
    }

    async deleteArtist(artistId: string): Promise<IServiceResponse> {
        if (!validate(artistId)) {
            return { error: { status: 400, message: 'Invalid artist id provided' } }
        }

        const favArtist = await this.favArtistRepository.findOneBy({ artistId });

        if (!favArtist) {
            return { error: { status: HttpStatus.UNPROCESSABLE_ENTITY, message: `There's no artist with id ${artistId} in favorites` } };
        }

        await this.favArtistRepository.remove(favArtist);

        return { data: `Artist was deleted from favorites successfully` };
    }
}
