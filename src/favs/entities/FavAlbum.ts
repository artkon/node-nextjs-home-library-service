import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';

import { Album } from '../../album/entities/Album';


@Entity()
export class FavAlbum {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    albumId: string[]

    @OneToOne(() => Album,  { onDelete: "CASCADE" })
    @JoinColumn()
    album: Album;

}
