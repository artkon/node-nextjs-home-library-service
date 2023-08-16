import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';

import { Track } from '../../track/entities/Track';


@Entity()
export class FavTrack {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    trackId: string[]

    @OneToOne(() => Track, { onDelete: "CASCADE" })
    @JoinColumn()
    track: Track;

}
