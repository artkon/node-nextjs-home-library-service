import { Artist } from "../../artist/entities/Artist";
import { Album } from "../../album/entities/Album";
import { Track } from "../../track/entities/Track";

export interface IFavorites {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
}
