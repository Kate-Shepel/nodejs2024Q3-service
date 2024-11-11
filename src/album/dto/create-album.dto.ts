import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
