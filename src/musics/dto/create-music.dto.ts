import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MusicGenre } from 'src/enums/music-genre';

export class CreateMusicDto {
  @MaxLength(255, { message: 'tittle za dlogi' })
  @MinLength(2, { message: 'tittle za dlogi' })
  @IsString({ message: 'niestring' })
  title: string;

  @IsNumber()
  @IsPositive()
  length: number;

  @MaxLength(255)
  @MinLength(2)
  @IsString()
  author: string;

  @IsEnum(MusicGenre)
  genre: MusicGenre;
}
