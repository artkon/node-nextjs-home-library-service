import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';

import { Artist } from '../../artist/entities/Artist';
import { Track } from '../../track/entities/Track';


@Entity()
export class Album extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    year: number

    @Column({ nullable: true })
    artistId: string | null

    @ManyToOne(() => Artist, artist => artist.albums, { onDelete: 'SET NULL' })
    @JoinColumn()
    artist: Promise<Artist>;

    @OneToMany(() => Track, track => track.album, { onDelete: 'SET NULL' })
    tracks: Promise<Track[]>;

}
