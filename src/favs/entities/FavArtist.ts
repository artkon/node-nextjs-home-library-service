import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';

import { Artist } from '../../artist/entities/Artist';


@Entity()
export class FavArtist {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    artistId: string[]

    @OneToOne(() => Artist,  { onDelete: "CASCADE" })
    @JoinColumn()
    artist: Artist;

}
