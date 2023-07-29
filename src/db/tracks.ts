import { v4 as uuid } from 'uuid';

import { CreateTrackDto, ITrack, UpdateTrackDto, ITracksDB } from './type';
import { FavsDB } from './favs';


export const TracksDB: ITracksDB = {
    tracks: [],

    getTracks(): ITrack[] {
        return this.tracks;
    },

    getTrack(trackId: string): ITrack {
        const track = this.tracks.find(({ id }) => (id === trackId));

        if (!track) {
            throw new Error(`No track with id: ${trackId}`);
        }

        return track;
    },

    createTrack(trackDto: CreateTrackDto): ITrack {
        const track = {
            id: uuid(),
            name: trackDto.name,
            artistId: trackDto.artistId,
            albumId: trackDto.albumId,
            duration: trackDto.duration,
        };

        this.tracks.push(track);

        return track;
    },

    updateTrack(trackId: string, { name, artistId, duration, albumId }: UpdateTrackDto): ITrack {
        const track = this.getTrack(trackId);

        Object.assign(
            track,
            {
                name,
                artistId,
                duration,
                albumId,
            },
        );

        return track;
    },

    deleteTrack(trackId: string): boolean {
        const trackIndex = this.tracks.findIndex(({ id }) => (id === trackId));

        if (trackIndex === -1) {
            throw new Error(`No track with id: ${trackId}`);
        }

        this.tracks.splice(trackIndex, 1);
        try {
            FavsDB.deleteTrack(trackId);
        } catch {
            return true;
        }

        return true;
    },

    removeArtist(artistId: string): boolean {
        this.tracks = this.tracks.map((track: ITrack): ITrack => {
            if (track.artistId === artistId) {
                track.artistId = null;
            }

            return track;
        });

        return true;
    },

    removeAlbum(albumId: string): boolean {
        this.tracks = this.tracks.map((track: ITrack): ITrack => {
            if (track.albumId === albumId) {
                track.albumId = null;
            }

            return track;
        });

        return true;
    },
};
