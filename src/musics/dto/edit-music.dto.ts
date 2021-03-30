import { IsEnum, IsOptional, MaxLength, MinLength } from 'class-validator';
import { MusicGenre } from 'src/enums/music-genre';

export class EditMusicDto {
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  length?: number;

  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  author?: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  @IsEnum(MusicGenre)
  genre?: MusicGenre;
}
