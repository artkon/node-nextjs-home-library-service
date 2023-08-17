import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    login: string

    @Column()
    password: string

    @VersionColumn()
    version: number

    @CreateDateColumn({ transformer: {
        from: (date: Date) => date.getTime(),
        to: (ms: number) => ms ? new Date(ms) : new Date(),
    }})
    createdAt: number

    @UpdateDateColumn({ transformer: {
        from: (date: Date) => date.getTime(),
        to: () => new Date(),
    }})
    updatedAt: number

}
