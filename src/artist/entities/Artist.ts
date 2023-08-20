import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";

import { Album } from '../../album/entities/Album';
import { Track } from '../../track/entities/Track';

@Entity()
export class Artist {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    grammy: boolean

    @OneToMany(() => Album, album => album.artist, { onDelete: 'SET NULL' })
    albums: Promise<Album[]>;

    @OneToMany(() => Track, track => track.artist, { onDelete: 'SET NULL' })
    tracks: Promise<Track[]>;

}
