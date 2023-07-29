import { IsUUID } from 'class-validator';


export class CreateTrackDto {
    name: string;

    @IsUUID(4) artistId: string | null;

    @IsUUID(4) albumId: string | null;

    duration: number;
}
