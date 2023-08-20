import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { Artist } from '../../artist/entities/Artist';
import { Album } from '../../album/entities/Album';


@Entity()
export class Track extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ nullable: true })
    artistId: string | null

    @ManyToOne(() => Artist, artist => artist.tracks, { onDelete: 'SET NULL' })
    @JoinColumn()
    artist: Promise<Artist>;

    @Column({ nullable: true })
    albumId: string | null

    @ManyToOne(() => Album, album => album.tracks, { onDelete: 'SET NULL' })
    @JoinColumn()
    album: Promise<Album>;

    @Column()
    duration: number

}
