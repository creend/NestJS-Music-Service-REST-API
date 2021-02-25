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
import { MusicGenre } from '../../schemas/music.schema';

export class CreateMusicDto {
  @MaxLength(255)
  @MinLength(2)
  @IsString()
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
